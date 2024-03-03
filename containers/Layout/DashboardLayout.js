import React from 'react';
import { withRouter } from 'next/router';
import { Layout as LayoutWrapper } from 'antd';
import Header from './Header/Header';
import Footer from './Footer/Footer';

const { Content } = LayoutWrapper;

const DashboardLayout = ({ children, router }) => {
  return (
    <LayoutWrapper>
          <>
            <Header />
            <Content>{children}</Content>
            <Footer />
          </>
    </LayoutWrapper>
  );
};

export default withRouter(DashboardLayout);
