// import { useState, useEffect } from "react";
// import { Layout, Drawer } from "antd";
// import Sidenav from "./Sidenav";
// import Header from "./Header";
// import Footer from "./Footer";
// import { useRouter } from "next/router";
// import Head from "next/head";

// const { Header: AntHeader, Content, Sider } = Layout;

// function DashboardLayout({ children }) {
//   const [visible, setVisible] = useState(false);
//   const [placement, setPlacement] = useState("right");
//   const [sidenavColor, setSidenavColor] = useState("#1890ff");
//   const [sidenavType, setSidenavType] = useState("transparent");
//   const [fixed, setFixed] = useState(false);

//   const router = useRouter();

//   const openDrawer = () => setVisible(!visible);
//   const handleSidenavType = (type) => setSidenavType(type);
//   const handleSidenavColor = (color) => setSidenavColor(color);
//   const handleFixedNavbar = (type) => setFixed(type);

//   useEffect(() => {
//     const { pathname } = router;
//     if (pathname === "/rtl") {
//       setPlacement("left");
//     } else {
//       setPlacement("right");
//     }
//   }, [router]);

//   return (
//     <>
//       <Head>
//         <title>Your Page Title</title>
//       </Head>
//       <Layout className={`layout-dashboard ${router.pathname === "/profile" ? "layout-profile" : ""} ${router.pathname === "/rtl" ? "layout-dashboard-rtl" : ""}`}>
//         <Drawer
//           title={false}
//           placement={placement === "right" ? "left" : "right"}
//           closable={false}
//           onClose={() => setVisible(false)}
//           visible={visible}
//           key={placement === "right" ? "left" : "right"}
//           width={250}
//           className={`drawer-sidebar ${router.pathname === "/rtl" ? "drawer-sidebar-rtl" : ""} `}
//         >
//           <Layout className={`layout-dashboard ${router.pathname === "/rtl" ? "layout-dashboard-rtl" : ""}`}>
//             <Sider
//               trigger={null}
//               width={250}
//               theme="light"
//               className={`sider-primary ant-layout-sider-primary ${sidenavType === "#fff" ? "active-route" : ""}`}
//               style={{ background: sidenavType }}
//             >
//               <Sidenav color={sidenavColor} />
//             </Sider>
//           </Layout>
//         </Drawer>
//         <Sider
//           breakpoint="lg"
//           collapsedWidth="0"
//           onCollapse={(collapsed, type) => {
//             console.log(collapsed, type);
//           }}
//           trigger={null}
//           width={250}
//           theme="light"
//           className={`sider-primary ant-layout-sider-primary ${sidenavType === "#fff" ? "active-route" : ""}`}
//           style={{ background: sidenavType }}
//         >
//           <Sidenav color={sidenavColor} />
//         </Sider>
//         <Layout>
//           {fixed ? (
//             <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
//               <Header
//                 onPress={openDrawer}
//                 name={router.pathname}
//                 subName={router.pathname}
//                 handleSidenavColor={handleSidenavColor}
//                 handleSidenavType={handleSidenavType}
//                 handleFixedNavbar={handleFixedNavbar}
//               />
//             </AntHeader>
//           ) : (
//             <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
//               <Header
//                 onPress={openDrawer}
//                 name={router.pathname}
//                 subName={router.pathname}
//                 handleSidenavColor={handleSidenavColor}
//                 handleSidenavType={handleSidenavType}
//                 handleFixedNavbar={handleFixedNavbar}
//               />
//             </AntHeader>
//           )}
//           <Content className="content-ant">{children}</Content>
//           {/* <Footer /> */}
//         </Layout>
//       </Layout>
//     </>
//   );
// }

// export default DashboardLayout;
