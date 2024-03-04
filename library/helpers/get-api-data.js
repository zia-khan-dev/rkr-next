import fetch from 'isomorphic-unfetch';
import shuffle from 'lodash/shuffle';

const fetchAPIData = (url) => {
  return fetch(url)
    .then((r) => r.json())
    .then((data) => {
      return data;
    });
};

export const processAPIData = (apiData) => {
  let fetchData = {};
  if (apiData) {
    apiData.forEach((item, key) => {
      fetchData.data = item.data ? [...item.data] : [];
      fetchData.name = item.name ? item.name : '';
    });
  }
  const data = fetchData ? fetchData.data : [];
  return data;
};

export const searchedData = (processedData) => {
  const randNumber = Math.floor(Math.random() * 50 + 1);
  const data = shuffle(processedData.slice(0, randNumber));
  return data;
};

export const searchStateKeyCheck = (state) => {
  console.log('state key check', state);
  for (var key in state) {
    if (
      state[key] !== null &&
      state[key] != '' &&
      state[key] != [] &&
      state[key] != 0 &&
      state[key] != 100
    ) {
      return true;
    }
  }
  return false;
};

export const paginator = (posts, processedData, limit) => {
  return [...posts, ...processedData.slice(posts.length, posts.length + limit)];
};

export const getAPIData = async (apiUrl) => {
  const promises = apiUrl.map(async (repo) => {
    const apiPath = `${process.env.NEXT_PUBLIC_SERVER_API}/data`;
    const api = `${apiPath}/${repo.endpoint}.json`;
    const response = await fetchAPIData(api);
    return {
      name: repo.name,
      data: response,
    };
  });
  const receviedData = await Promise.all(promises);
  return receviedData;
};


export const calculateDistance =(lat1, lon1, lat2, lon2) =>{
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;  // Convert degrees to radians
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
  }
  
export const  filterByDistance =(data, targetLat, targetLng, maxDistance) => {
  return data.filter(item => {
      const distance = calculateDistance(item.location.lat, item.location.lng, targetLat, targetLng);
      return distance <= maxDistance;
  });
  }
  
  
  