import React from 'react';
import { withRouter } from 'next/router';
import ActiveLink from 'library/helpers/activeLink';

import {
  HOME_PAGE,
  LISTING_POSTS_PAGE,
  AGENT_PROFILE_PAGE,
  PRICING_PLAN_PAGE,
} from 'settings/constant';

const MainMenu = ({ className, router }) => {
  return (
    <ul className={`ant-menu ${className}`}>
      <li>
        <ActiveLink
          className={router.pathname === HOME_PAGE ? 'active' : ''}
          href={HOME_PAGE}
        >
          Home
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
