import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Sticky from 'react-stickynode';
import Toolbar from 'components/UI/Toolbar/Toolbar';
import CategorySearch from 'containers/Listing/Search/CategorySearch/CategorySearch';
import { Checkbox } from 'antd';
import SectionGrid from 'components/SectionGrid/SectionGrid';
import { PostPlaceholder } from 'components/UI/ContentLoader/ContentLoader';
import ListingMap from 'containers/Listing/ListingMap';
import {
  getAPIData,
  paginator,
  searchedData,
  searchStateKeyCheck,
  processAPIData,
} from 'library/helpers/get-api-data';
import { getDeviceType } from 'library/helpers/get-device-type';
import { SINGLE_POST_PAGE } from 'settings/constant';
import {
  LISTING_PAGE_POST_LIMIT,
  LISTING_PAGE_COLUMN_WIDTH_WITHOUT_MAP,
  LISTING_PAGE_COLUMN_WIDTH_WITH_MAP,
} from 'settings/config';
import ListingWrapper, {
  PostsWrapper,
  ShowMapCheckbox,
} from 'containers/Listing/Listing.style';
import { useSelector } from 'react-redux';
import {  filterByDistance } from '../library/helpers/get-api-data';
import { useRouter } from 'next/router';

const FilterDrawer = dynamic(() =>
  import('containers/Listing/Search/MobileSearchView')
);

export default function ListingPage({ processedData, deviceType }) {

  const router = useRouter();
  console.log("processedData", processedData);
  const { query } = useSelector(state => state.search); // Accessing query state from Redux
  console.log("query", query);

  const statekey = searchStateKeyCheck(query);
  console.log("statekey", statekey);

  const { location_lat, location_lng } = router.query;



  const filteredData = filterByDistance(processedData, location_lat, location_lng, 50); // Filter within 50 km
  // console.log(filteredData);
  
  console.log("nearestLocation", filteredData, location_lat, location_lng);  
  
  const [posts, setPosts] = useState(
    processedData.slice(0, LISTING_PAGE_POST_LIMIT) || []
  );
  console.log(posts, "posts");
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    if (statekey === true) {
      const filteredLocations = filterByDistance(processedData, location_lat, location_lng, 50); // Filter within 50 km
      const newData = searchedData(filteredLocations);
      setPosts(newData);
    } else {
      setPosts(filteredData.slice(0, LISTING_PAGE_POST_LIMIT) || []);
    }
  }, [statekey]);

  const handleMapToggle = () => {
    setShowMap((showMap) => !showMap);
  };

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      const data = paginator(posts, processedData, LISTING_PAGE_POST_LIMIT);
      setPosts(data);
      setLoading(false);
    }, 1000);
  };

  let columnWidth = LISTING_PAGE_COLUMN_WIDTH_WITHOUT_MAP;
  if (showMap) {
    columnWidth = LISTING_PAGE_COLUMN_WIDTH_WITH_MAP;
  }

  let columnCount = 'col-24';
  if (deviceType === 'desktop' && showMap === true) {
    columnCount = 'col-12';
  }

  return (
    <ListingWrapper>
      <Head>
        <title>Listing | A react next listing template</title>
      </Head>

      <Sticky top={82} innerZ={999} activeClass="isHeaderSticky">
        <Toolbar
          // left={
          //   deviceType === 'desktop' ? <CategorySearch /> : <FilterDrawer />
          // }
          right={
            <ShowMapCheckbox>
              <Checkbox defaultChecked={false} onChange={handleMapToggle}>
                Show Map View
              </Checkbox>
            </ShowMapCheckbox>
          }
        />
      </Sticky>

      <PostsWrapper className={columnCount}>
        <SectionGrid
          link={SINGLE_POST_PAGE}
          columnWidth={columnWidth}
          deviceType={deviceType}
          data={posts}
          totalItem={processedData.length}
          limit={LISTING_PAGE_POST_LIMIT}
          loading={loading}
          handleLoadMore={handleLoadMore}
          placeholder={<PostPlaceholder />}
          
        />
      {showMap && <ListingMap loading={loading} mapData={posts} />}
      </PostsWrapper>
    </ListingWrapper>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const apiUrl = [
    {
      endpoint: 'hotel',
      name: 'listingHotel',
    },
  ];
  const pageData = await getAPIData(apiUrl);
  const processedData = processAPIData(pageData);
  const deviceType = getDeviceType(req);
  return {
    props: { processedData, deviceType },
  };
}
