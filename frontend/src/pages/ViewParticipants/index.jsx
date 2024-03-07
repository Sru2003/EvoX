import React, { useState, useEffect } from 'react';
import moment from 'moment';
import api from '../../Services/api';
import "./participants.css";
import { Container } from 'reactstrap';
import TopNav from '../../components/TopNav'
import '../../../src/index.css'

export default function ViewParticipants() {
    const [eventParticipants, setEventParticipants] = useState([]);
    const user = localStorage.getItem("user");
    const eventId = localStorage.getItem("eventId");

    useEffect(() => {
        getParticipants();
    }, []);

    const getParticipants = async () => {
        try {
            const response = await api.get(`/event/participants/${eventId}`, { headers: { user: user } });
            setEventParticipants(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='bg-primary-black h-[1000px] '>
        <TopNav/>
        <Container className='pt-4 p'>
            <ul className="participants pl-4">
                <h1 className='pl-4 font-bold text-[23px] fontype'>TOTAL PARTICIPANTS: {(eventParticipants.length)}</h1>
                {eventParticipants.map(participant => (
                    <li key={participant._id}>
                        <div className="participant-name">{participant.user.firstName + " " + participant.user.lastName}</div>
                        <div>Email: {participant.userEmail}</div>
                        <div>Request Time: {moment(participant.date).format('l')}</div>
                    </li>
                ))}
            </ul>
            </Container>
        </div>
    );
}