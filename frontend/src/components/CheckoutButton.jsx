import React from 'react'
import api from '../Services/api';
import { useState } from 'react';
const CheckoutButton = ({event}) => {
    const closedEvent=new Date(event.date)<new Date();
    const user = localStorage.getItem("user");
    const user_id = localStorage.getItem("user_id");
    const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
    const registrationRequestHandler = async (event) => {
        try {
          await api.post(`/registration/${event.id}`, {}, { headers: { user } });
          setSuccess(true);
          setMessageHandler(`The registration request for the event ${event.title} made successfully!`);
          setTimeout(() => {
            setSuccess(false);
            filterHandler(null);
            setMessageHandler('');
          }, 2500);
        } catch (error) {
          setError(true);
          setMessageHandler('Error while registering for event!');
          setTimeout(() => {
            setError(false);
            setMessageHandler('');
          }, 2000);
        }
      }
      const handleCheckout = async (event) => {
        try {
       
            const response=await api.post(`/checkout`, {}, 
            { headers: { user } },
           );
          
         
            const data = await response.data;
            if (data.url) {
                window.location.assign(data.url);
            }
        } catch (error) {
            console.error("Error during checkout:", error);
            // Handle errors as needed
        }
      }
  return (
    <div> 
        {closedEvent ? <p>Not Available</p> :
       
       
            <button type="submit"
              onClick={() => registrationRequestHandler(event)} 
            // onClick={()=>handleCheckout(event)}
             style={{ width: "100%" }}
             className=" hover:bg-blue-200 font-bold py-2 px-4 rounded">
              {event.price === 0 ? 'Register' : 'Buy Ticket'}
            </button>
          
            }
    </div>
  )
}

export default CheckoutButton