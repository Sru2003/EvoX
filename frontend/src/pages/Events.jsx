import React from 'react';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import { Outlet } from 'react-router-dom';
import MyRegistrations from './MyRegistrations';
import ViewParticipants from './ViewParticipants';
import ViewEvent from '../components/DetailedEvents/ViewEvent';
import EventsPage from './EventsPage/index';

const Events = () => {
  return (
    <div>
      <Navbar color="dark" dark expand="md" className="bg-primary flex-shrink-0 text-white">
        <Nav navbar className="ml-auto">
          {/* <NavItem>
            <NavLink to="/createevent">Create Event</NavLink>
          </NavItem> */}
          <NavItem>
            <NavLink to="/myregistrations">My Registrations</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/event/participants">View Participants</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/eventdetails">Event Details</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
      <div className="w-full max-w-screen-lg p-4">
        <Outlet /> {/* Renders the selected route's component */}
      </div>
    </div>
  );
};

export default Events;
