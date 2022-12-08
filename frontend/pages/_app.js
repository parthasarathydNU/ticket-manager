/**
 * File Name: _app.js
 * Author: Dhruv Parthasarathy
 * File Created: First commit
 * Last Modified: Dec, 8th, Thu
 * 
 * About: 
 * This file acts as the NextJS wrapper for the application.
 * The various components that are present under the different pages are rendered in place of the 
 * <Component /> tag present in this file
 * 
 * Static content that needs to stay across all pages should reside outside the <Component /> tag
 * in this file
 */
import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from './theme';
import createEmotionCache from './createEmotionCache';
import { wrapper } from '../store/index';
import FooterComponent from '../components/footer/footer';
import ResponsiveAppBarComponent from '../components/header/Header';
import { useDispatch } from 'react-redux';
import { fetchRows } from '../store/slice/ticketManagementSlice';
import { AnimatePresence } from 'framer-motion'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRows());
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <div style={{ 'minWidth':'900px', "height": '100vh', 'display':'flex', 'flexDirection':'column', 'justifyContent':'space-between' }} suppressHydrationWarning>
          <div style={{'flexFlow':'1'}}>
          <ResponsiveAppBarComponent />
          
          {/* <Layout /> */}
          {typeof window === 'undefined' ? null : <Hydrated > 
          <AnimatePresence
                exitBeforeEnter
                initial={false}
                onExitComplete={() => window.scrollTo(0, 0)}
            >
            <Component {...pageProps} />
            </AnimatePresence>
          </Hydrated>}
          </div> 
          <FooterComponent />
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

/*
  Reference link to solve hydration error:
  https://github.com/vercel/next.js/discussions/35773#discussioncomment-3941192
 */
const Hydrated = ({ children }) => {
  const [hydration, setHydration] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHydration(true);
    }
  }, []);
  return hydration ? children : null;
};

export default wrapper.withRedux(MyApp);