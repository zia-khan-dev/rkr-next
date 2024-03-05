import React, { useEffect } from 'react';
import { withRouter } from 'next/router';
import DashboardLayout from './dashboard/DashboardLayout';
import WebsiteLayout from './WebsiteLayout';
import { useSelector } from 'react-redux';

const Layout = ({ children, router }) => {
  const isDashboardRoute = router.pathname.startsWith('/dashboard/') || router.pathname.startsWith('/dashboard');
  // console.log("isDashboardRoute", isDashboardRoute, router.pathname);
  
  const {role} = useSelector((state) => state.auth);
  const restrictedUrls = [
    { url: '/admin/dashboard', allowedRoles: ['admin'] },
  ];

  useEffect(() => {
    const { pathname } = router;
  
    const isUrlRestricted = restrictedUrls.some(
      (item) => pathname.startsWith(item.url) && !item.allowedRoles.includes(role)
    );
  
    if (isUrlRestricted) {
      router.push('/unauthorized'); // Redirect to unauthorized page
    }
  }, [router, role]);
  

  return (
    <>
    {isDashboardRoute ? (
        <DashboardLayout>
         {children}
        </DashboardLayout>
      ) : (
        <WebsiteLayout>
         {children}
        </WebsiteLayout>
      )}
    </>
  );
};

export default withRouter(Layout);
