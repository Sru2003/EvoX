import React, { useState } from 'react';
import axios from 'axios';
import '../../backend/controllers/RegistrationController'

const ContactForm = () => {
    const [toEmail, setToEmail] = useState('');
    const [eventInfo, setEventInfo] = useState({});

    const handleSendEmail = () => {
        axios.post('http://localhost:5000/sendEmail', {
            toEmail: toEmail,
            eventInfo: event
        })
            .then(response => {
                console.log('Email sent successfully:', response);
                // Handle success (e.g., show a success message to the user)
            })
            .catch(error => {
                console.error('Error sending email:', error);
                // Handle error (e.g., show an error message to the user)
            });
    };

    return (
        <div>
            <input type="text" placeholder="Event Title" value={event.title} onChange={e => setEventInfo({ ...eventInfo, title: e.target.value })} />
            <input type="date" placeholder="Event Date" value={event.date} onChange={e => setEventInfo({ ...eventInfo, date: e.target.value })} />
            <input type="text" placeholder="Event ID" value={event.id} onChange={e => setEventInfo({ ...eventInfo, id: e.target.value })} />
            <input type="number" placeholder="Event Price" value={event.price} onChange={e => setEventInfo({ ...eventInfo, price: e.target.value })} />
            <button onClick={handleSendEmail}>Send Email</button>
        </div>
    );
};

export default ContactForm;
