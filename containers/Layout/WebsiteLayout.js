import React from 'react';
import { withRouter } from 'next/router';
import { Layout as LayoutWrapper } from 'antd';
import Header from './Header/Header';
import Footer from './Footer/Footer';

import {
  LISTING_POSTS_PAGE,
  LOGIN_PAGE,
  REGISTRATION_PAGE,
  AGENT_PROFILE_PAGE,
  AGENT_ACCOUNT_SETTINGS_PAGE,
  ADD_HOTEL_PAGE,
  PRICING_PLAN_PAGE,
  SINGLE_POST_PAGE,
  PRIVACY_PAGE,
  CHANGE_PASSWORD_PAGE,
  FORGET_PASSWORD_PAGE,
  AGENT_IMAGE_EDIT_PAGE,
  AGENT_PASSWORD_CHANGE_PAGE,
  USER_SIGN_UP
} from 'settings/constant';

const { Content } = LayoutWrapper;

const WebsiteLayout = ({ children, router }) => {
  return (
    <LayoutWrapper>
        {router.pathname === LOGIN_PAGE ||
        router.pathname === CHANGE_PASSWORD_PAGE ||
        router.pathname === USER_SIGN_UP ||
        router.pathname === FORGET_PASSWORD_PAGE ||
        router.pathname === REGISTRATION_PAGE ? (
          <Content>{children}</Content>
        ) : (
          <>
            <Header />
            <Content>{children}</Content>
            {router.pathname === LISTING_POSTS_PAGE ||
            router.pathname === PRICING_PLAN_PAGE ||
            router.pathname === ADD_HOTEL_PAGE ||
            router.pathname === AGENT_PROFILE_PAGE ||
            router.pathname === CHANGE_PASSWORD_PAGE ||
            router.pathname === FORGET_PASSWORD_PAGE ||
            router.pathname === PRIVACY_PAGE ||
            router.pathname ===
              `${AGENT_ACCOUNT_SETTINGS_PAGE + AGENT_IMAGE_EDIT_PAGE}` ||
            router.pathname ===
              `${AGENT_ACCOUNT_SETTINGS_PAGE + AGENT_PASSWORD_CHANGE_PAGE}` ||
            router.pathname === AGENT_ACCOUNT_SETTINGS_PAGE ? (
              <div style={{ height: '33px' }} />
            ) : (
              <Footer path={router.pathname === SINGLE_POST_PAGE} />
            )}
          </>
        )}
    </LayoutWrapper>
  );
};

export default withRouter(WebsiteLayout);
