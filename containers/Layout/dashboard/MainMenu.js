import React from 'react';
import { withRouter } from 'next/router';
import ActiveLink from 'library/helpers/activeLink';

import {
  HOME_PAGE,
  LISTING_POSTS_PAGE,
  AGENT_ACCOUNT_SETTINGS_PAGE
} from 'settings/constant';
import { useSelector } from 'react-redux';

const MainMenu = ({ className, router }) => {

  const { role } = useSelector((state) => state.auth);

  const host = [
    {
      title: 'Overview',
      href: HOME_PAGE,
    },
    {
      title: 'Add Location',
      href: HOME_PAGE,
    },
    {
      title: 'Account Settings',
      href: AGENT_ACCOUNT_SETTINGS_PAGE,
    },
    {
      title: 'Account Settings',
      href: HOME_PAGE,
    },
  ]
  return (
    <ul className={`ant-menu ${className}`}>
      <li>
        <ActiveLink
          className={router.pathname === HOME_PAGE ? 'active' : ''}
          href={HOME_PAGE}
        >
          OverView
        </ActiveLink>
      </li>
      <li>
        <ActiveLink
          className={router.pathname === LISTING_POSTS_PAGE ? 'active' : ''}
          href={LISTING_POSTS_PAGE}
        >
          listing
        </ActiveLink>
      </li>
      <li>
        <ActiveLink
          className={router.pathname === "about" ? 'active' : ''}
          href={"#"}
        >
          About
        </ActiveLink>
      </li>
      <li>
        <ActiveLink
          className={router.pathname === "reviews" ? 'active' : ''}
          href={"#"}
        >
          Reviews
        </ActiveLink>
      </li>
      <li>
        <ActiveLink
          className={router.pathname === "contact" ? 'active' : ''}
          href={"#"}
        >
          Contact
        </ActiveLink>
      </li>
    </ul>
  );
};

export default withRouter(MainMenu);
