import React, { useState, useContext } from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import dynamic from "next/dynamic";
import Sticky from "react-stickynode";
import { IoIosClose } from "react-icons/io";
import Logo from "components/UI/Logo/Logo";
import Text from "components/UI/Text/Text";
import { Button, Drawer } from "antd";
import Navbar from "components/Navbar/Navbar";
import { LayoutContext } from "context/LayoutProvider";
import { useSelector } from "react-redux";
import { AGENT_PROFILE_PAGE } from "settings/constant";
import HeaderWrapper, {
  MobileNavbar,
  CloseDrawer,
  AvatarWrapper,
  AvatarImage,
  AvatarInfo,
  LogoArea,
} from "./Header.style";


const AuthMenu = dynamic(() => import("./AuthMenu"));
const MainMenu = dynamic(() => import("./MainMenu"));
const MobileMenu = dynamic(() => import("./MobileMenu"));
const ProfileMenu = dynamic(() => import("./ProfileMenu"));
const NavbarSearch = dynamic(() => import("./NavbarSearch"));

const avatarImg =
  "http://s3.amazonaws.com/redqteam.com/isomorphic-reloaded-image/profilepic.png";

  const LogoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width="1080" height="1080" viewBox="0 0 1080 1080" xmlSpace="preserve">
      <defs />
      <g transform="matrix(1 0 0 1 540 540)" id="4f64b11c-2e47-4477-a4d2-d6dc786966b7" />
      <g transform="matrix(1 0 0 1 540 540)" id="37fb69c8-970b-494d-b7ee-596be66add96">
        <rect style={{ stroke: "none", strokeWidth: 59, strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: 0, strokeLinejoin: "miter", strokeMiterlimit: 4, fill: "rgb(255,255,255)", fillRule: "nonzero", opacity: 1, visibility: "hidden" }} vectorEffect="non-scaling-stroke" x="-540" y="-540" rx="0" ry="0" width="1080" height="1080" />
      </g>
      <g transform="matrix(10.53 0 0 10.53 557.62 540)">
        <path style={{ stroke: "none", strokeWidth: 50, strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: 0, strokeLinejoin: "miter", strokeMiterlimit: 4, fill: "rgb(255,255,255)", fillRule: "nonzero", opacity: 1 }} vectorEffect="non-scaling-stroke" transform="translate(-50, -50)" d="M 20.88 87.5 C 20.88 92.82 38.29 94.75 50 94.75 C 61.71 94.75 79.12 92.82 79.12 87.5 C 79.12 83.29 67.96000000000001 81.13 57.620000000000005 80.5 C 67.4 69.08 82.25 49.730000000000004 82.25 37.5 C 82.25 19.688816817956912 67.8111831820431 5.25 50 5.25 C 32.18881681795691 5.25 17.75 19.68881681795691 17.75 37.49999999999999 C 17.75 49.71 32.6 69.06 42.379999999999995 80.5 C 31.999999999999993 81.13 20.879999999999995 83.29 20.879999999999995 87.5 z M 77.12 87.5 C 77.12 89.33 67.81 92.75 50 92.75 C 32.19 92.75 22.88 89.33 22.88 87.5 C 22.88 85.67 30.41 83.05 44 82.39 L 44.69 83.18 C 44.77187836819195 83.26191280726388 44.848687471067734 83.34874048877565 44.919999999999995 83.44000000000001 L 45.71999999999999 84.34000000000002 C 45.809999999999995 84.44000000000001 45.89999999999999 84.55000000000001 45.989999999999995 84.64000000000001 L 46.62 85.35000000000001 L 46.94 85.69000000000001 L 47.41 86.21000000000001 L 47.73 86.57000000000001 L 48.04 86.9 L 48.38 87.27000000000001 L 48.49 87.39000000000001 L 49.25 88.19000000000001 C 49.4384832323171 88.3855518722099 49.69840017748626 88.49602593708411 49.97 88.49602593708411 C 50.241599822513734 88.49602593708411 50.5015167676829 88.3855518722099 50.69 88.19000000000001 L 51.489999999999995 87.35000000000001 L 51.55 87.28000000000002 L 51.949999999999996 86.84000000000002 L 52.199999999999996 86.58000000000001 L 52.599999999999994 86.14000000000001 L 52.989999999999995 85.71000000000001 L 53.379999999999995 85.27000000000001 L 53.919999999999995 84.67000000000002 L 54.32999999999999 84.22000000000001 L 54.99999999999999 83.50000000000001 L 55.43999999999999 82.99000000000001 L 55.96999999999999 82.39000000000001 C 69.58999999999999 83.05000000000001 77.11999999999999 85.81000000000002 77.11999999999999 87.50000000000001 z M 19.750000000000007 37.5 C 19.750000278585013 20.79338651460785 33.293386514607846 7.250000504422779 50 7.250000504422779 C 66.70661348539215 7.250000504422779 80.24999972141498 20.79338651460784 80.25 37.49999999999999 C 80.25 50.08 62.44 71.91 54.78 80.71000000000001 C 52.63 83.19000000000001 50.910000000000004 85.06 50 86.00000000000001 L 49.17 85.10000000000001 C 48.17 84.10000000000001 46.83 82.53000000000002 45.17 80.67000000000002 C 37.56 71.91000000000001 19.75 50.08000000000001 19.75 37.500000000000014 z" />
      </g>
      <g transform="matrix(10.53 0 0 10.53 540 396.08)">
        <path style={{ stroke: "none", strokeWidth: 50, strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: 0, strokeLinejoin: "miter", strokeMiterlimit: 4, fill: "rgb(255,255,255)", fillRule: "nonzero", opacity: 1 }} vectorEffect="non-scaling-stroke" transform="translate(-50, -37.5)" d="M 72.88 37.5 C 72.88 24.863724923871445 62.63627507612855 14.620000000000005 50 14.620000000000005 C 37.363724923871445 14.620000000000005 27.119999999999997 24.863724923871448 27.119999999999997 37.5 C 27.119999999999997 50.136275076128555 37.363724923871445 60.38 50 60.38 C 62.62942300326367 60.36347292577942 72.8634729257794 50.129423003263675 72.88 37.5 z M 29.129999999999995 37.5 C 29.13000096864425 29.053918521984485 34.21833232409091 21.439680967375427 42.02188134775383 18.20844049836557 C 49.82543037141676 14.97720002935571 58.80707471859494 16.765437804832665 64.77792554829529 22.73914960761863 C 70.74877637799563 28.712861410404596 72.5327113644176 37.69536136782515 69.29773303929939 45.49736159656733 C 66.06275471418118 53.299361825309504 58.44608050937133 58.38404505817907 50.000000000000014 58.38 C 38.47448617603054 58.36896683347684 29.13551196134691 49.02551778687434 29.13 37.5 z" />
      </g>
      <g transform="matrix(10.53 0 0 10.53 540 376.09)">
        <path style={{ stroke: "none", strokeWidth: 50, strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: 0, strokeLinejoin: "miter", strokeMiterlimit: 4, fill: "rgb(255,255,255)", fillRule: "nonzero", opacity: 1 }} vectorEffect="non-scaling-stroke" transform="translate(-50.06, -38.24)" d="M 50.42 54.83 L 65.3 47.39 C 65.64016542448728 47.223341187248295 65.85696450308969 46.8787855087552 65.86 46.5 L 65.86 30 C 65.87037341243001 29.913643740118264 65.87037341243001 29.826356259881734 65.86 29.74 L 65.86 29.65 C 65.84085210989154 29.59815142405265 65.81743858499948 29.54797958499821 65.79 29.5 L 65.72000000000001 29.41 L 65.63000000000001 29.29 L 65.53000000000002 29.22 L 65.45000000000002 29.15 L 50.45000000000002 21.669999999999998 C 50.16695242970494 21.52737140663278 49.83304757029509 21.52737140663278 49.55000000000002 21.669999999999998 L 34.670000000000016 29.119999999999997 L 34.59000000000002 29.189999999999998 L 34.490000000000016 29.259999999999998 L 34.40000000000001 29.38 L 34.33000000000001 29.47 C 34.30256141500054 29.51797958499821 34.27914789010847 29.568151424052648 34.26000000000001 29.619999999999997 L 34.26000000000001 29.709999999999997 C 34.249626587570006 29.796356259881733 34.249626587570006 29.883643740118263 34.26000000000001 29.97 L 34.26000000000001 46.489999999999995 C 34.26303549691033 46.868785508755195 34.479834575512726 47.21334118724829 34.820000000000014 47.379999999999995 L 49.70000000000002 54.81999999999999 C 49.964050384366416 54.95365466512485 50.27594961563362 54.95365466512485 50.54000000000002 54.81999999999999 z M 63.89 45.83 L 51 52.31 L 51 38.07 L 54.61 36.27 L 54.61 39.86 C 54.61 40.412284749830796 55.0577152501692 40.86 55.61 40.86 C 55.76654225477095 40.85906141738519 55.9206777027621 40.8213838634318 56.06 40.75 L 59.43 39.07 C 59.766279651191184 38.900549756284235 59.97885869598526 38.556558211071994 59.98 38.18 L 59.98 33.58 L 63.89 31.63 z M 56.61 35.23 L 58 34.58 L 58 37.58 L 56.63 38.26 z M 55.339999999999996 33.629999999999995 L 42.69 27.339999999999996 L 44.11 26.629999999999995 L 56.879999999999995 32.89999999999999 z M 50 23.69 L 62.65 30 L 59.129999999999995 31.76 L 46.36 25.51 z M 40.45 28.46 L 53.1 34.79 L 50 36.339999999999996 L 37.35 30 z M 36.11 31.630000000000003 L 49 38.07 L 49 52.31 L 36.11 45.870000000000005 z" />
      </g>
    </svg>
  );
  
  

const Header = ({ router }) => {
  // const { loggedIn } = useContext(AuthContext);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [{ searchVisibility }] = useContext(LayoutContext);
  const [state, setState] = useState(false);
  const sidebarHandler = () => {
    setState((state) => !state);
  };

  const headerType = router.pathname === "/" ? "transparent" : "default";

  return (
    <HeaderWrapper>
      <Sticky top={0} innerZ={1001} activeClass="isHeaderSticky">
        <Navbar
          logo={
            <>
              {headerType === "transparent" && <Logo
              imageOnly
              linkTo="/"
              src="/images/logo-white.svg"
              title="GoRACKER"
            />}
              <Logo
                withLink
                linkTo="/"
                src="/images/logo-color.svg"
                title="GoRACKER"
              />
            </>
          }
          navMenu={<MainMenu />}
          authMenu={<AuthMenu />}
          isLogin={isLoggedIn}
          avatar={<Logo src={avatarImg} />}
          profileMenu={<ProfileMenu avatar={<Logo src={avatarImg} />} />}
          headerType={headerType}
          searchComponent={<NavbarSearch />}
          location={router}
          searchVisibility={searchVisibility}
        />
        <MobileNavbar className={headerType}>
          <LogoArea>
            <>
              {headerType === "transparent" && <LogoIcon />}
              <Logo
                withLink
                linkTo="/"
                src="/images/logo-color.svg"
                title="GoRACKER"
              />
            </>
            <NavbarSearch />
          </LogoArea>
          <Button
            className={`hamburg-btn ${state ? "active" : ""}`}
            onClick={sidebarHandler}
          >
            <span />
            <span />
            <span />
          </Button>
          <Drawer
            placement="right"
            closable={false}
            onClose={sidebarHandler}
            width="285px"
            className="mobile-header"
            open={state}
          >
            <CloseDrawer>
              <button onClick={sidebarHandler}>
                <IoIosClose />
              </button>
            </CloseDrawer>
            {isLoggedIn ? (
              <AvatarWrapper>
                <AvatarImage>
                  <Logo src={avatarImg} />
                </AvatarImage>
                <AvatarInfo>
                  <Text as="h3" content="Nova Scotia" />
                  <Link href={AGENT_PROFILE_PAGE}>
                    <a>View Profile</a>
                  </Link>
                </AvatarInfo>
              </AvatarWrapper>
            ) : (
              <AuthMenu className="auth-menu" />
            )}
            <MobileMenu className="main-menu" />
          </Drawer>
        </MobileNavbar>
      </Sticky>
    </HeaderWrapper>
  );
};

export default withRouter(Header);
