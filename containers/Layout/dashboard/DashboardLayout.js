import React from 'react';
import { withRouter } from 'next/router';
import { Layout as LayoutWrapper } from 'antd';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Sidebar from '../sidebar/Sidebar';
import { Container } from '../../../components/Navbar/Navbar.style';
import DashboardHeader from './DashboardHeader';

const { Content } = LayoutWrapper;

const DashboardLayout = ({ children, router }) => {
  return (
    <LayoutWrapper>
          <>
          <DashboardHeader />
          {/* <Header /> */}

            <Content>{children}</Content>
            <Footer />
          </>
    </LayoutWrapper>
  );
};

export default withRouter(DashboardLayout);
