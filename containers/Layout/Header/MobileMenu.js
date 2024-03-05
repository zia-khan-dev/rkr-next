import React, { useContext } from 'react';
import ActiveLink from 'library/helpers/activeLink';
import { AuthContext } from 'context/AuthProvider';

import {
  HOME_PAGE,
  LISTING_POSTS_PAGE,
  PRICING_PLAN_PAGE,
  AGENT_ACCOUNT_SETTINGS_PAGE,
} from 'settings/constant';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { signOut } from '../../../redux/features/authSlice';

const MobileMenu = ({ className }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {isLoggedIn} = useSelector((state) => state.auth);

  const logOut = () =>{
    const isLocalStorageAvailable =
      typeof window !== "undefined" && window.localStorage;
    if (isLocalStorageAvailable) {
      localStorage.removeItem("persist:root");
      localStorage.removeItem("user");
    }
    dispatch(signOut());
    router.push('/');
  }
  // auth context
  // const { loggedIn, logOut } = useContext(AuthContext);

  return (
    <ul className={className}>
      <li>
        <ActiveLink href={HOME_PAGE}>Home</ActiveLink>
      </li>
      <li>
        <ActiveLink href={LISTING_POSTS_PAGE}>Listing</ActiveLink>
      </li>
      <li>
        <ActiveLink href={"#"}>About Us</ActiveLink>
      </li>
      <li>
        <ActiveLink href={"#"}>Reviews</ActiveLink>
      </li>
      <li>
        <ActiveLink href={"#"}>Contact</ActiveLink>
      </li>
      
      {isLoggedIn && (
        <li>
          <button onClick={logOut}>Log Out</button>
        </li>
      )}
    </ul>
  );
};

export default MobileMenu;
