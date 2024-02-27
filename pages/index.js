import Head from "next/head";
import Link from "next/link";
import Container from "components/UI/Container/Container";
import Heading from "components/UI/Heading/Heading";
import SectionTitle from "components/SectionTitle/SectionTitle";
import SearchArea from "containers/Home/Search/Search";
import LocationGrid from "containers/Home/Location/Location";
import SectionGrid from "components/SectionGrid/SectionGrid";
import { getAPIData } from "library/helpers/get-api-data";
import { getDeviceType } from "library/helpers/get-device-type";
import { LISTING_POSTS_PAGE, SINGLE_POST_PAGE } from "settings/constant";
import {
  HOME_PAGE_SECTIONS_ITEM_LIMIT_FOR_MOBILE_DEVICE,
  HOME_PAGE_SECTIONS_ITEM_LIMIT_FOR_TABLET_DEVICE,
  HOME_PAGE_SECTIONS_ITEM_LIMIT_FOR_DESKTOP_DEVICE,
  HOME_PAGE_SECTIONS_COLUMNS_RESPONSIVE_WIDTH,
} from "settings/config";
import { useSelector, useDispatch } from "react-redux";
import { fetchApiData } from "../redux/features/apiSlice";
import DataTable from 'react-data-table-component';
import { useEffect } from "react";

export default function HomePage({
  deviceType,
  locationData,
  topHotelData,
  luxaryHotelData,
}) {
  let old_limit;

  if (deviceType === "mobile") {
    old_limit = HOME_PAGE_SECTIONS_ITEM_LIMIT_FOR_MOBILE_DEVICE;
  }
  if (deviceType === "tablet") {
    old_limit = HOME_PAGE_SECTIONS_ITEM_LIMIT_FOR_TABLET_DEVICE;
  }

  if (deviceType === "desktop") {
    old_limit = HOME_PAGE_SECTIONS_ITEM_LIMIT_FOR_DESKTOP_DEVICE;
  }
  const url = "https://jsonplaceholder.typicode.com/posts";

  // const { data, loading, error, page, limit } = useSelector(
  //   (state) => state.api
  // );

  // console.log("data: " + (data));

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchApiData({ url, page, limit }));
  // }, [dispatch, page, limit, url]);

  // const columns = [
  //   {
  //     name: 'Title',
  //     selector: row => row.title,
  //     sortable: true,
  //   },
  //   {
  //     name: 'Body',
  //     selector: row => row.body,
  //     sortable: true,
  //   },
  // ]  

  
  return (
    <>
      <Head>
        <title>GoRACKER | RECIEVE NEAR BY</title>
      </Head>
      <SearchArea />
      <LocationGrid data={locationData} deviceType={deviceType} />
      <Container fluid={true}>
        <SectionTitle
          title={<Heading content="Travelers’ Choice: Top hotels" />}
          link={
            <Link href={LISTING_POSTS_PAGE}>
              <a>Show all</a>
            </Link>
          }
        />
        {/* <SectionGrid
          link={SINGLE_POST_PAGE}
          columnWidth={HOME_PAGE_SECTIONS_COLUMNS_RESPONSIVE_WIDTH}
          data={topHotelData.slice(0, old_limit)}
          old_limit={old_limit}
          deviceType={deviceType}
        /> */}
        <SectionTitle
          title={<Heading content="Best Rated: Luxary hotels" />}
          link={
            <Link href={LISTING_POSTS_PAGE}>
              <a>Show all</a>
            </Link>
          }
        />
        <SectionGrid
          link={SINGLE_POST_PAGE}
          columnWidth={HOME_PAGE_SECTIONS_COLUMNS_RESPONSIVE_WIDTH}
          data={luxaryHotelData.slice(0, old_limit)}
          limit={old_limit}
          deviceType={deviceType}
        />
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const apiUrl = [
    {
      endpoint: "hotel",
      name: "luxaryHotelData",
    },
    {
      endpoint: "top-hotel",
      name: "topHotelData",
    },
    {
      endpoint: "location",
      name: "locationData",
    },
  ];
  const deviceType = getDeviceType(req);
  // const pageData = await getAPIData(apiUrl);
  const pageData = null;
  let locationData = [],
    topHotelData = [],
    luxaryHotelData = [];

  if (pageData) {
    pageData.forEach((item, key) => {
      if (item.name === "locationData") {
        locationData = item.data ? [...item.data] : [];
      } else if (item.name === "topHotelData") {
        topHotelData = item.data ? [...item.data] : [];
      } else if (item.name === "luxaryHotelData") {
        luxaryHotelData = item.data ? [...item.data] : [];
      }
    });
  }
  return {
    props: { deviceType, locationData, topHotelData, luxaryHotelData },
  };
}
