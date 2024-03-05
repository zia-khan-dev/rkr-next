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
import { useEffect, useState } from "react";
import axios from "axios";
import { filterByDistance } from "../library/helpers/get-api-data";

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

  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  console.log("location", location);
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

  
  useEffect(() => {
    // Check if geolocation is supported by the browser
    if ('geolocation' in navigator) {
      // Get the user's current position
      navigator.geolocation.getCurrentPosition(
        position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          setLocation({latitude, longitude});
          // Now you have the latitude and longitude, you can send it to your server
          // for further processing or display it on your website
          console.log('Latitude:', latitude);
          console.log('Longitude:', longitude);

          // Optionally, you can use reverse geocoding to get the address
          // You can use the code from the previous example to implement reverse geocoding
        },
        error => {
          console.error('Error getting user location:', error.message);
          // Handle errors here
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      // Handle unsupported browser
    }
  }, []); 

  const getGeocodingData = async (latitude, longitude) => {
    try {
      const apiKey = 'my-api-key';
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
      
      const response = await axios.get(url);
  
      if (response.status === 200) {
        const data = response.data;
        if (data.results.length > 0) {
          const address = data.results[0];
          return address;
        } else {
          throw new Error('No results found');
        }
      } else {
        throw new Error('Failed to fetch geocoding data');
      }
    } catch (error) {
      console.error('Error fetching geocoding data:', error.message);
      return null;
    }
  };

  getGeocodingData("40.706877", "-74.011265")
  .then(address => {
    console.log('Address:', address);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });

  // getting locations near me 

  const filteredData = filterByDistance(luxaryHotelData, "38.907", "-77.037", 50); // Filter within 50 km
  console.log("filteredData in in", filteredData);
  return (
    <>
      <Head>
        <title>GoRACKER | RECIEVE NEAR BY</title>
      </Head>
      <SearchArea />
      {/* <LocationGrid data={locationData} deviceType={deviceType} /> */}
      <Container fluid={true}>
        <SectionTitle
          title={<Heading content="Locations Near you" />}
          link={
            <Link href={LISTING_POSTS_PAGE}>
              <a>Show all</a>
            </Link>
          }
        />
         <SectionGrid
          link={SINGLE_POST_PAGE}
          columnWidth={HOME_PAGE_SECTIONS_COLUMNS_RESPONSIVE_WIDTH}
          data={filteredData.slice(0, old_limit)}
          old_limit={old_limit}
          deviceType={deviceType}
        /> 
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
  const pageData = await getAPIData(apiUrl);
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
