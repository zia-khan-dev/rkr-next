import React, { useEffect, useState } from 'react';
import { withRouter } from 'next/router';
import { Layout as LayoutWrapper, Menu } from 'antd';
import { HomeOutlined, UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Loader from '../../../components/Loader/Loader';


const { Sider } = LayoutWrapper;
const { SubMenu } = Menu;

const Sidebar = ({ router }) => {
    const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Adjust time as necessary

    return () => clearTimeout(timer);
  }, []);
  const { pathname } = router;
  const { user } = useSelector((state) => state.auth);

  if (isLoading) {
    return <Loader fill="#008489" />; 
  }
  // Dummy user data
 
 const   usrImageUrl ='http://s3.amazonaws.com/redqteam.com/isomorphic-reloaded-image/profilepic.png';

  return (
    <Sider style={{ margin: '24px 0px', backgroundColor: 'black' }}>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
        <img src={usrImageUrl} alt="User" style={{ borderRadius: '50%', width: '80px', height: '80px' }} />
      </div>
      <div style={{ textAlign: 'center', marginBottom: '16px', color: 'white' }}>
        <p>{`${user?.firstName} ${user?.lastName}`}</p>
      </div>
      <Menu theme = {'dark'} mode="inline" defaultSelectedKeys={[pathname]}>
        <Menu.Item key="/dashboard" icon={<HomeOutlined />}>
          <Link href="/dashboard">
            <a>Home</a>
          </Link>
        </Menu.Item>
        <SubMenu key="userSubMenu" icon={<UserOutlined />} title="User">
          <Menu.Item key="/dashboard/profile">
            <Link href="/dashboard/profile">
              <a>Profile</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="/dashboard/account-settings">
            <Link href="/dashboard/account-settings">
              <a>Account Settings</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="/dashboard/logout" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </SubMenu>
        <SubMenu key="settingsSubMenu" icon={<SettingOutlined />} title="Settings">
          <Menu.Item key="/dashboard/settings">
            <Link href="/dashboard/settings">
              <a>Settings</a>
            </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default withRouter(Sidebar);
