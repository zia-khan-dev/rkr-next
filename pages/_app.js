import "antd/dist/reset.css";
import "react-image-gallery/styles/css/image-gallery.css";
import "react-dates/lib/css/_datepicker.css";
import "react-multi-carousel/lib/styles.css";
import "@glidejs/glide/dist/css/glide.core.min.css";
// import 'antd/lib/date-picker/style/index.css';
import { ThemeProvider } from "styled-components";
import theme from "themes/default.theme";
import GlobalStyles from "themes/global.style";
import Layout from "containers/Layout/Layout";
import AuthProvider from "context/AuthProvider";
import { SearchProvider } from "context/SearchProvider";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App({ Component, router, pageProps }) {
  const { query } = router;

  return (
    <Provider store={store}>
      {/* <AuthProvider> */}
        {/* <SearchProvider query={query}> */}
          <ThemeProvider theme={theme}>
            <Layout>
              <GlobalStyles />
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        {/* </SearchProvider> */}
      {/* </AuthProvider> */}
      <ToastContainer />
    </Provider>
  );
}

export default App;
