import React, { useContext, useState, useRef } from 'react';
import useOnClickOutside from 'library/hooks/useOnClickOutside';
import ActiveLink from 'library/helpers/activeLink';
import { AuthContext } from 'context/AuthProvider';
import {
  AGENT_PROFILE_PAGE,
  AGENT_ACCOUNT_SETTINGS_PAGE,
  ADD_HOTEL_PAGE,
} from 'settings/constant';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { signOut } from '../../../redux/features/authSlice';

export default function ProfileMenu({ avatar }) {
  // const { logOut } = useContext(AuthContext);
  const [state, setState] = useState(false);
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

  const handleDropdown = () => {
    setState(!state);
  };

  const closeDropdown = () => {
    setState(false);
  };

  const dropdownRef = useRef(null);
  useOnClickOutside(dropdownRef, () => setState(false));

  return (
    <div className="avatar-dropdown" ref={dropdownRef}>
      <div className="dropdown-handler" onClick={handleDropdown}>
        {avatar}
      </div>

      <ul className={`dropdown-menu ${state ? 'active' : 'hide'}`}>
        <li onClick={closeDropdown}>
          <ActiveLink href={AGENT_PROFILE_PAGE}>View Profile</ActiveLink>
        </li>
        <li onClick={closeDropdown}>
          <ActiveLink href={ADD_HOTEL_PAGE}>Add Hotel</ActiveLink>
        </li>
        <li onClick={closeDropdown}>
          <ActiveLink href={AGENT_ACCOUNT_SETTINGS_PAGE}>
            Account Settings
          </ActiveLink>
        </li>
        <li>
          <button onClick={logOut}>Log Out</button>
        </li>
      </ul>
    </div>
  );
}
