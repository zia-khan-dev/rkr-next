import React, { useContext } from 'react';
import Router, { withRouter } from 'next/router';
import isEmpty from 'lodash/isEmpty';
import { FiSearch } from 'react-icons/fi';
import MapAutoComplete from 'components/Map/MapAutoComplete';
import { mapDataHelper } from 'components/Map/mapDataHelper';
import { NavbarSearchWrapper } from './Header.style';
import { SearchContext } from 'context/SearchProvider';
import { setStateToUrl } from 'library/helpers/url-handler';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearch } from '../../../redux/features/searchSlice';

const NavbarSearch = () => {
  // const { state, dispatch } = useContext(SearchContext);


  const dispatch = useDispatch();
  const searchState = useSelector((state) => state.search); // Assuming 'search' is the key for your search slice in the global state
  const initialState = {
    amenities: searchState?.property || [],
    setStartDate: searchState?.setStartDate || null,
    setEndDate: searchState?.setEndDate || null,
    minPrice: parseInt(searchState?.minPrice) || 0,
    maxPrice: parseInt(searchState?.maxPrice) || 100,
    location_lat: searchState?.location_lat || null,
    location_lng: searchState?.location_lng || null,
    room: parseInt(searchState?.room) || 0,
    guest: parseInt(searchState?.guest) || 0,
  };

  const handleUpdate = (value) => {
    const { searchedPlaceAPIData } = value;
    let tempLocation = [];
    const mapData = !isEmpty(searchedPlaceAPIData)
      ? mapDataHelper(searchedPlaceAPIData)
      : [];
    if (!isEmpty(mapData) && mapData.length !== 0) {
      mapData.forEach((singleMapData) =>
        tempLocation.push({
          location_lat: singleMapData ? singleMapData.lat.toFixed(3) : null,
          location_lng: singleMapData ? singleMapData.lng.toFixed(3) : null,
        })
      );
    }

    const searchLocation = tempLocation.length ? tempLocation[0] : {};
    if (!isEmpty(searchLocation)) {
      const query = {
        location_lat: parseFloat(searchLocation?.location_lat),
        location_lng: parseFloat(searchLocation?.location_lng),
      };
      dispatch(updateSearch({
        ...initialState,
        ...query,
      }));
      const params = setStateToUrl(query);
      Router.push({
        pathname: '/listing',
        query: params,
      });
    }
  };

  return (
    <NavbarSearchWrapper className="navbar_search">
      <MapAutoComplete updateValue={(value) => handleUpdate(value)} />
      <FiSearch />
    </NavbarSearchWrapper>
  );
};

export default withRouter(NavbarSearch);
