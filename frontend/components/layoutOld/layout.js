/**
 * File Name: app-layout.js
 * Author: Dhruv Parthasarathy
 * File Created: Nov, 12th 2022, Sat
 * 
 * About: 
 * This file holds global styles, the markup for the overall 
 * app layout and the static components that will remain
 * on all views of the app
 */

 import Head from 'next/head';
 import styles from './layout.module.scss';
 import ResponsiveAppBar from '../header/Header'
 import TemporaryDrawer from '../drawer/Drawer'
 import FooterComponent from '../footer/footer';

 export default function Layout({children}){
    return (
        // This will be the wrapper container for the entire app
        <section className={styles.appContainer}>
            <Head>
                <title>Hail Mary</title>
            </Head>
            {/* <header >
                <ResponsiveAppBar />
            </header> */}
            <div name="mainSection">
                {/* <section id='leftNav' className={`h-perc-100 flex align-center-elements`}>Left Nav</section> */}
                {/* <main className={`h-perc-100 flex align-center-elements w-perc-100`}>{children}</main> */}
                <main className={styles.main} >{children}</main>
            </div>
            {/* <footer >
                <FooterComponent />
            </footer> */}
            <TemporaryDrawer/>
        </section>
    )
 }