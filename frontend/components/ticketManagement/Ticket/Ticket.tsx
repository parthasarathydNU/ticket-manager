/**
 * File Name: components/ticketManagement/Ticket/Ticket.tsx
 * Author: Dhruv Parthasarathy
 * File Created:
 * Last Modified: Dec, 8th, Thu
 * 
 * About: 
 * This file contains the individual ticket component
 * This component does the following:
 * 
 * Display the information of the selected ticket
 * Allows user to edit the ticket details and submit an update request
 * 
 * This accesses state data from the redux store
 */

import { Breadcrumbs, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { RootState, AppDispatch } from '../../../store'
import ticketManagementStyles from '../_ticketManagement.module.scss'
import styles from './_ticket.module.scss'
import { fetchTicketDataAsync, toggleUpdateTicketDialogue, unselectTicket, updateTicketDataAsync } from "../../../store/slice/ticketManagementSlice";
import RandomPic from './randomProfilePic.jpg'
import Image from "next/image";
import { useEffect, useState } from "react";
import Tags from "../../reusable/Tags";
import SelectLabels from "../../reusable/SimpleSelect";
import TextEditor from "../../reusable/TextEditor";
import { TicketData, resolutionTypes, statusOptions, priorities, emptyTicket } from "../../../service/models/Ticket"
import AlertDialogSlide from "../../reusable/AlertDialogSlide";
import { setCurrentView } from '../../../store/slice/appSlice';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function Ticket() {

    // TYPES Required:
    type user = {
        name: string, id: string
    }

    // SELECTORS
    const selectedTicket = useSelector((state: RootState) => {
        return state.ticketManagement.selectedTicket
    });

    let ticketData: any = useSelector((state: RootState): TicketData => {
        return state.ticketManagement.rows.filter((ticket: TicketData) => ticket.id === selectedTicket)[0];
    });

    let alertDialogueOpen = useSelector((state: RootState) => {
        return state.ticketManagement.updateTicketAlertOpen;
    })

    let users: Array<user> = useSelector((state: RootState) => {
        return state.ticketManagement.dropDownValues.agent;
    })

    // Local objects
    let tempData: any = emptyTicket;
    const dispatch = useDispatch<AppDispatch>();

    // State variables
    const [compTicketData, setCompTicketData] = useState(tempData);



    // let compTicketData:any={};

    // LIFECYCLE HOOKS
    useEffect(() => {
        // console.log("Use effect called");
        // if( !ticketData || (Object.keys(ticketData).length == 0))
        dispatch(fetchTicketDataAsync({ id: selectedTicket }));
    }, [selectedTicket])

    useEffect(() => {
        setCompTicketData(ticketData);
    }, [ticketData])

    useEffect(() => {
        dispatch(setCurrentView("Ticket Information"));
    }, [])




    // Functions

    /**
     * This function takes in a date string and returns either the
     * firstResponse date or the resolution date depending on the value of
     * the type field
     * @param date string
     * @param type string
     * @returns 
     */
    const getResolutionDate = (date: string, type: string) => {

        const numWeeks = 1;
        const now = new Date(date);

        if (type == resolutionTypes.firstResponse) {
            now.setDate(now.getDate() + 1);
        } else if (type == resolutionTypes.resolution) {
            now.setDate(now.getDate() + 7);
        }

        return `${now.toDateString()}, ${now.getHours()}:${now.getMinutes()} Hrs `;


    }


    /**
     * This function is used when a user updates a ticket
     * We get the new data to be stored and the key that has to be updated
     * and we use this single function to update the key of the data based on the key param
     * @param data string | Array<string>
     * @param key string
     */
    const updateTicketKey = (data: string | Array<string>, key: string) => {
        // dispatch(setTicketKey({ key: key, value: data, id: selectedTicket }));
        // console.log(compTicketData);
        let temp: any = Object.assign({}, compTicketData);
        temp[key] = data;
        setCompTicketData(temp);
    }

    /**
     * This function is used to get the update toggle modal
     * when the user tries to update a ticket
     * @param okayToUpdateTicket boolean
     */
    const getAlertOutput = (okayToUpdateTicket: boolean) => {
        // console.log("Update ? ", okayToUpdateTicket);
        dispatch(toggleUpdateTicketDialogue())
        if (okayToUpdateTicket) {
            const firstName = compTicketData.agent.split(" ")[0];
            const lastName = compTicketData.agent.split(" ")[1];
            const agentId = users.find(user => user.name === `${firstName} ${lastName}`)?.id;
            let tempData = Object.assign({}, compTicketData);
            tempData.responder_id = agentId;
            // console.log(agentId);
            dispatch(updateTicketDataAsync({ ticketData: tempData }));
        }

    }




    return (

        <div className={styles.wrapper}>
            {/* HEADER WITH BREADCRUMBS FOR NAVIGATING BACK TO ALL TICKETS */}
            <div className={ticketManagementStyles.TicketHeader}>

                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    <Link color="gray" href={""} onClick={() => dispatch(unselectTicket())} >
                        Tickets
                    </Link>

                    <Typography color="text.primary">{selectedTicket}</Typography>
                </Breadcrumbs>


            </div>
            {/*  LAYOUT - Flex - Row */}
            <section className={styles.ticketInfoLayout}>

                {ticketData
                    ? (
                        <>
                            <section className={styles.mainPanel}>

                                {/* TICKET STATUS HEADER */}
                                <header className={styles.header}>
                                    <span className={styles.chip_red}>{ticketData.status}</span>
                                </header>

                                {/* Ticket Details header */}
                                <div className={styles.ticketDetailsHeader}>

                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 32 32" ><path d="M2.56 5.333h26.347c1.119 0 2.027.912 2.027 2.036v18.327a2.03 2.03 0 01-2.027 2.036H2.56a2.032 2.032 0 01-2.027-2.036V7.369A2.03 2.03 0 012.56 5.333zm.405 2.444V25.29h25.536V7.777H2.965zm4.323 3.667l8.445 5.657 8.445-5.657c.559-.374 1.314-.223 1.686.339s.222 1.32-.337 1.694l-9.12 6.109a1.21 1.21 0 01-1.349 0l-9.12-6.109c-.559-.374-.71-1.133-.337-1.694s1.128-.713 1.686-.339z"></path></svg>
                                    <div className={styles.ticketSubjectInfo}>
                                        <span className={styles.ticketSubjectHeading}>{ticketData.subject}</span>

                                        <div className={styles.ticketCreatedInfo}>
                                            <span>Raised by&nbsp;</span>
                                            <b>{ticketData.customer}&nbsp;</b>
                                            <span>and assigned to&nbsp;</span>
                                            <b>{ticketData.agent}&nbsp;</b>

                                        </div>
                                    </div>

                                </div>
                                {/* TICKET DETAILS WRAPPER */}
                                <div className={styles.ticketDetailsWrapper}>
                                    <div className={styles.ticketDetailsItemHeader}>
                                        <div className={styles.ticketDetailsAvatar}>
                                            <Image src={RandomPic} width={30} alt={`User's profile picture`} />
                                        </div>
                                        <div className={styles.ticketDetailsEmail}>
                                            <div className={styles.senderInfo}>{ticketData.requester_id}</div>
                                            {/* <div className={styles.createdTime}>Last updated at Sun, 30 Oct 2022 at 2:51 PM</div> */}
                                            <div className={styles.createdTime}>Last updated at {ticketData.updatedAt}</div>
                                        </div>
                                    </div>
                                    <div className={styles.ticketDetailsItemContent}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="15" viewBox="0 0 32 32">
                                            <path d="M2.56 5.333h26.347c1.119 0 2.027.912 2.027 2.036v18.327a2.03 2.03 0 01-2.027 2.036H2.56a2.032 2.032 0 01-2.027-2.036V7.369A2.03 2.03 0 012.56 5.333zm.405 2.444V25.29h25.536V7.777H2.965zm4.323 3.667l8.445 5.657 8.445-5.657c.559-.374 1.314-.223 1.686.339s.222 1.32-.337 1.694l-9.12 6.109a1.21 1.21 0 01-1.349 0l-9.12-6.109c-.559-.374-.71-1.133-.337-1.694s1.128-.713 1.686-.339z"></path>
                                        </svg>
                                        <TextEditor text={ticketData.description} reportUpdate={(d: string) => updateTicketKey(d, 'description')} />
                                    </div>
                                </div>


                            </section>

                            {/* INFORMATION UPDATE RIGHT SIDE PANEL HERE */}
                            <section className={styles.informationUpdatePanel}>

                                {/* STATUS AND RESOLUTION TIME */}
                                <div className={styles.statusCardWrapper}>
                                    <div className={styles.statusTitle}>
                                        <span>{ticketData.status}</span>
                                    </div>
                                    <div className={styles.resolutionWrapper} >
                                        <div className={styles.resolutionTitle}><span>FIRST RESPONSE DUE</span></div>
                                        <div className={styles.resolutionDate}>
                                            by {getResolutionDate(ticketData.createdAt, resolutionTypes.firstResponse)}
                                        </div>
                                    </div>
                                    <div className={styles.resolutionWrapper} >
                                        <div className={styles.resolutionTitle}><span>RESOLUTION DUE</span></div>
                                        <div className={styles.resolutionDate}>
                                            by {getResolutionDate(ticketData.createdAt, resolutionTypes.resolution)}
                                        </div>
                                    </div>
                                </div>

                                {/* OPTIONS */}
                                <div className={styles.stickyHeader}>
                                    <div className={styles.properties}>PROPERTIES</div>
                                </div>

                                {/* OPTION CONTAINERS */}
                                {/* TAGS */}
                                <div className={styles.tags}>
                                    <span className={styles.optionsTitle}>Tags ({ticketData.tags.length})</span>
                                    <div className={styles.tagsContainer} title={ticketData.tags.join(", ")}>
                                        <Tags tags={ticketData.tags} />
                                    </div>
                                </div>

                                {/* STATUS */}
                                <div className={styles.tags}>
                                    <span className={styles.optionsTitle}>Status</span>
                                    <SelectLabels selectChanged={(d: string) => updateTicketKey(d, 'status')} selected={ticketData.status} options={statusOptions} />
                                </div>

                                {/* PRIOROTY */}
                                <div className={styles.tags}>
                                    <span className={styles.optionsTitle}>Priority</span>
                                    <SelectLabels selectChanged={(d: string) => updateTicketKey(d, 'priority')} selected={ticketData.priority} options={priorities} />
                                </div>

                                {/* AGENT */}
                                <div className={styles.tags}>
                                    <span className={styles.optionsTitle}>Agent</span>
                                    <SelectLabels selectChanged={(d: string) => updateTicketKey(d, 'agent')} selected={ticketData.agent} options={users.map((user: user) => user.name)} />
                                </div>

                                {/* UPDATE BUTTON */}
                                <div className={styles.updateButtonContainer}>
                                    <Button onClick={() => dispatch(toggleUpdateTicketDialogue())} className={styles.updateButton}>Update</Button>
                                </div>

                            </section>

                            {/* THIS DIALOG SLIDES IN FORM BOTTOM WHENEVER A USER CLICKS THE UPDATE BUTTON */}
                            <AlertDialogSlide description={""} title={`Are you sure you want to update task ${ticketData.subject}?`} open={alertDialogueOpen} getAlertOutput={getAlertOutput} />
                        </>
                    )
                    : null


                }


            </section>

        </div>

    )

}

export default Ticket;