import React from "react";
import { Layout as LayoutWrapper, Row, Col } from "antd"; // Import Row and Col for responsive grid
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Sidebar from "./sidebar/Sidebar";
import { backgroundColor } from "styled-system";

const { Content } = LayoutWrapper;

const DashboardLayout = ({ children }) => {
  return (
    <LayoutWrapper style={{ minHeight: "100vh" }}>
      {/* Use responsive grid */}
      <Row>
        <Col
          xs={24}
          sm={24}
          md={6}
          lg={4}
          xl={4}
          style={{ backgroundColor: "black" }}
        >
          {/* Render sidebar */}
          <Sidebar />
        </Col>
        <Col xs={24} sm={24} md={18} lg={20} xl={20}>
          <LayoutWrapper>
            {/* <Header /> */}
            <Content style={{ margin: "24px 16px 0" }}>
              <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
                {children}
              </div>
            </Content>
            {/* <Footer /> */}
          </LayoutWrapper>
        </Col>
      </Row>
    </LayoutWrapper>
  );
};

export default DashboardLayout;
