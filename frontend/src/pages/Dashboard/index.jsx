import React, { useEffect, useState, useMemo } from "react";
import api from "../../Services/api";
import moment from "moment";
import { Container } from 'reactstrap';
import { Button, ButtonGroup, Alert, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';
import { useNavigate } from "react-router-dom"
import TopNav from '../../components/TopNav'
import CheckoutButton from "../../components/CheckoutButton";
import axios from "axios";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const user = localStorage.getItem("user");
  const user_id = localStorage.getItem("user_id");
  const [rSelected, setRSelected] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [messageHandler, setMessageHandler] = useState('');
  const [eventRequests, setEventRequests] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [eventRequestMessage, setEventRequestMessage] = useState('');
  const [eventRequestSuccess, setEventRequestSuccess] = useState(false);
  const [showEventLink,setShowEventLink]=useState(false);
  const navigate = useNavigate();
  const toggle = () => setDropdownOpen(!dropdownOpen);
  // const closedEvent=new Date(event.date)<new Date();
  useEffect(() => {
    getEvents();
  }, []);

  // const socket = useMemo(() =>
  //   socketio('http://localhost:3000/', { query: { user: user_id } }),
  //   [user_id]
  // );

  // useEffect(() => {
  //   socket.on('registration_request', data => (setEventRequests([...eventRequests, data])));
  // }, [eventRequests, socket]);

  
  
  const updateParticipantStatus = (eventId, userId, approved) => {
    setEvents(prevEvents => {
      const updatedEvents = prevEvents.map(event => {
        if (event._id === eventId) {
          const updatedParticipants = event.participants.map(participant => {
            if (participant.user === userId) {
              return { ...participant, approved: approved };
            }
            return participant;
          });
          return { ...event, participants: updatedParticipants };
        }
        return event;
      });
      return updatedEvents;
    });
  };

  const filterHandler = (query) => {
    setRSelected(query);
    getEvents(query);
  };

  const myEventsHandler = async () => {
    try {
      setRSelected("myevents");
      const response = await api.get("/user/events", {
        headers: { user: user },
      });
      setEvents(response.data.events);
    } catch (error) {
      navigate("/login");
    }
  };

  const deleteEventHandler = async (eventId) => {
    try {
      await api.delete(`/event/${eventId}`, {
        headers: { user: user },
      });
      setSuccess(true);
      setMessageHandler('The event was deleted successfully!');
      setTimeout(() => {
        setSuccess(false);
        filterHandler(null);
        setMessageHandler('');
      }, 2500);
    } catch (error) {
      setError(true);
      setMessageHandler('Error while deleting event!');
      setTimeout(() => {
        setError(false);
        setMessageHandler('');
      }, 2000);
    }
  };
  const registrationRequestHandler = async (event) => {
    try {
      
      const {data:{key}}=await axios.get('http://localhost:3000/api/getkey')
      console.log(key)
      const {data:{registration,order}}=await api.post(`/registration/${event.id}`, {}, { headers: { user } });
      console.log(registration)
      console.log(order)
      const options = {
        key, // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "EvoX",
        description: "Test Transaction",
        // image: "https://example.com/your_logo",
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        // callback_url: "http://localhost:3000/api/paymentVerification",
        handler:async (response)=>{
        try{
          setShowEventLink(true);
        // const {data}=await api.post(`/paymentVerification/${event.id}`,response);
        // console.log(data)
      }
          catch(error){
            console.log(error);
          }
         
      },
        prefill: {
            name: user.name,
            email: user.email,
            contact: "9000090000"
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            "color": "#3399cc"
        }
    };
    const razor = new window.Razorpay(options);
    razor.open();
      setSuccess(true);
      setMessageHandler(`The registration for the event ${event.title} made successfully!`);
   
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

  
  
  const getEvents = async (filter) => {
    try {
      const url = filter ? `/dashboard/${filter}` : "/dashboard";
      const response = await api.get(url, { headers: { user: user } });
      response.data.events.sort((a, b) => { return new Date(a.date) - new Date(b.date); });
      setEvents(response.data.events);
    } catch (error) {
      navigate("/login");
    }
  };

  


  const viewParticipantsHandler = async (event) => {
    try {
      localStorage.setItem("eventId", event);
      navigate('/event/participants')
    } catch (error) {
      console.log(error);
    }
  }

  const acceptEventHandler = async (eventId) => {
    try {
      await api.post(`/registration/${eventId}/approval`, {}, { headers: { user } });

      setEventRequestSuccess(true);
      setEventRequestMessage("Event approved successfully!");
      removeNotificationFromDashboard(eventId);
      setTimeout(() => {
        setEventRequestSuccess(false);
        setEventRequestMessage('');
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }

  const rejectEventHandler = async (eventId) => {
    try {
      await api.post(`/registration/${eventId}/rejection`, {}, { headers: { user } });

      setEventRequestSuccess(true);
      setEventRequestMessage("Event rejected!");
      removeNotificationFromDashboard(eventId);
      setTimeout(() => {
        setEventRequestSuccess(false);
        setEventRequestMessage('');
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  }

  const removeNotificationFromDashboard = (eventId) => {
    const newEvent = eventRequests.filter((event) => event._id !== eventId);
    console.log(newEvent);
    setEventRequests(newEvent);
  }
  const redirectHandler = (e) => {
    navigate("/events");
  }

  const linkToEvent = (_id) => {
    console.log(_id)
    localStorage.setItem("eventId", _id)
    // navigate('/eventdetails')
    navigate(`/room/${_id}`)
    // console.log('abc')
  }
  return (
    <div className="bg-primary-black h-auto">
      <TopNav />
      <ul className="notifications">
        {eventRequests.map(request => {
          return (
            <li key={request._id}>
              <div>
                <strong>{request.user.email}</strong> is requesting to register to your event
                <strong>{request.event.title}</strong>
                <ButtonGroup>
                  <Button color="secondary" onClick={() => acceptEventHandler(request._id)}>
                    Accept
                  </Button>
                  <Button color="danger" onClick={() => rejectEventHandler(request._id)}>
                    Reject
                  </Button>
                </ButtonGroup>
              </div>
            </li>
          )
        })}
      </ul>
      {eventRequestSuccess ?
        <Alert className="event-validation">{eventRequestMessage}</Alert>
        : ""}
      
         
        <div className="bg-primary-black">
          {/* <div className="filter-panel">
            <Dropdown isOpen={dropdownOpen} toggle={toggle} size="lg">
              <DropdownToggle color="success" caret>
                Filter
            </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => filterHandler(null)} active={rSelected === null}>All Events</DropdownItem>
                <DropdownItem onClick={() => filterHandler("webinar")} active={rSelected === "webinar"}>Webinar</DropdownItem>
                <DropdownItem onClick={() => filterHandler("workshop")} active={rSelected === "workshop"}>Workshop</DropdownItem>
                <DropdownItem onClick={() => filterHandler("seminar")} active={rSelected === "seminar"}>Seminar</DropdownItem>
                <DropdownItem onClick={myEventsHandler} active={rSelected === "myEvents"}>My Events</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div> */}
        <ul className="events-list  grid grid-cols-1 md:grid-cols-3 gap-4">
            {events.map((event) => (
              <li className="mx-8 md:w-[350px]"
                key={event._id}>
                
                <li className="li-card  mx-auto md:ml-4">
                  <div className="li-picture" style={{ backgroundImage: `url(${event.thumbnail })`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                  <div>
                    <h2 className="text-[18px]" style={{ height: "48px"}}>{event.title}</h2>
                    <p><b>Date:</b> {moment(event.date).format("LL")}</p>
                    <p><b>Price:</b> ₹{event.price} </p>
                    {event.user !== user_id ? (
                    <div>
                       {showEventLink && <Button onClick={() => { linkToEvent(event._id) }} >
                      Link to Event
                      </Button>}
                    </div>
                    ):(<div>
                      <Button onClick={() => { linkToEvent(event._id) }} >
                     <u> Link to Event</u>
                      </Button>
                    </div>)}
                  </div>
                  <center>
                    {event.user !== user_id ? (
                      <div> 
                      {/* {closedEvent ? <p>Not Available</p> : */}
                     
                     
                          <button type="submit"
                            onClick={() => registrationRequestHandler(event)} 
                          // onClick={()=>handleCheckout(event)}
                           style={{ width: "100%" }}
                           className=" hover:bg-blue-200 font-bold py-2 px-4 rounded">
                            {event.price === 0 ? 'Register' : 'Buy Ticket'}
                          </button>
                        
                          {/* } */}
                  </div>
                    ) : (
                      <div>
                          <button style={{ width: "100%" }}
                            className=" hover:bg-blue-200 font-bold py-2 px-4 rounded"
                            onClick={() => viewParticipantsHandler(event._id)}>View Participants
                          </button>
                      </div>
                    )}
                  </center>
                </li>
                <header>
                  {event.user === user_id ? (
                    <div className="flex justify-center">
                      <Button className="delete-btn px-8 mb-8"
                        size="sm"
                        onClick={() => deleteEventHandler(event._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  ) : (
                    
                      event.approved?(<Button className="delete-btn px-8 mb-8"
                      size="sm"
                      onClick={() => deleteEventHandler(event._id)}
                    >
                      Payment
                    </Button>)
                      :("")
                    
                  )}
                </header>
              </li>
            ))}
          </ul>
          {error ? (
            <Alert className="event-validation" color="danger">
              {messageHandler}
            </Alert>
          ) : (
            ""
          )}
          {success ? (
            <Alert className="event-validation" color="success">
              {messageHandler}
            </Alert>
          ) : (
            ""
          )}
          </div>
        
      
    </div>
  );
}
