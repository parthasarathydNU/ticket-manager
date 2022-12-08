import CardsSection from "./cardsSection/Cards";
import styles from "./_dashboard.module.scss";
import {useDispatch} from 'react-redux';
import {setCurrentView} from '../../store/slice/appSlice'
import {useEffect} from 'react';
import Charts from '../chart';
import {getAllUserDetails} from '../../store/slice/ticketManagementSlice';

function Dashboard(){

    const dispatch:any = useDispatch();

    useEffect(()=>{
        dispatch(getAllUserDetails());
        dispatch(setCurrentView("Dashboard"));
    }, []);

    return (

        <div className={styles.wrapper}>
            <h2>Current Trends</h2>
            <CardsSection />
            <Charts />
        </div>


    )
}

export default Dashboard;