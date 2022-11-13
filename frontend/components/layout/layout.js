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

 export default function Layout({children}){
    return (
        // This will be the wrapper container for the entire app
        <section id='appContainer' className='flex flex-col h-screen w-screen justify-between'>
            <Head>
                <title>Hail Mary</title>
            </Head>
            <header className='h-10perc'>Header here</header>
            <div className='flex'>
                <section id='leftNav'>Left Nav</section>
                <main className='w-4/5'>{children}</main>
            </div>
            <footer className='h-10perc'>Footer </footer>
        </section>
    )
 }