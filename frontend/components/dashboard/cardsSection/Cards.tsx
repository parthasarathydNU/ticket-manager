/**
 * Author: Dhruv Parthasarathy
 * Date: Nov 20th 2022
 * 
 * This component acts as the holder for the various cards that we show up in the Dashboard view
 * 
 * The main focus of this component will be to arrange the cards and maybe later have a carousel implementation
 * if required
 */
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import styles from './_cards.module.scss'
import FocusCard from "./focusCard/FocusCard";
import { TicketData } from "../../../service/models/Ticket";

function CardsSection(){

    // accessing multiple state objects with single use selector hook
    const cards = useSelector( 
        (state:RootState) =>  state.dashboard.cards
        );

    const ticketsData = useSelector((state:RootState) => state.ticketManagement.rows);

    /**
     * 
     * @param type string
     * @returns number of tickets of this type
     */
    const getCountOfType = (type:string):number => {

        // we receive a type
        // we iterate through the tickets and see how many tickets have that type

        return ticketsData.filter((ticket:TicketData) => ticket.ticketTypes.includes(type)).length;
    }
    
    return(
        <div className={styles.wrapper}>
            {cards.map( c => {
                return (
                    <FocusCard key={c.type} type={c.type} number={getCountOfType(c.type)}  />
                )
            })}
        </div>
    )

}

export default CardsSection;

