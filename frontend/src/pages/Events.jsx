import React, { useState } from 'react';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import MyRegistrations from './MyRegistrations';
import ViewParticipants from './ViewParticipants';
import ViewEvent from '../components/DetailedEvents/ViewEvent';

const Tab = ({ tabName, selectedTab, onClick }) => {
  const isActive = selectedTab === tabName;

  return (
    <NavItem className="mr-4">
      <NavLink
        onClick={() => onClick(tabName)}
        className={`text-lg font-bold text-white py-3 px-4 border-white ${isActive ? 'bg-gray-600 border-b-4' : 'border-b-2'}`}
      >
        {tabName}
      </NavLink>
    </NavItem>
  );
};

const Events = () => {
  const [selectedTab, setSelectedTab] = useState('My Registrations');

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="flex flex-col items-center">
      <Navbar color="dark" dark expand="md" className="my-4">
        <Nav className="ml-auto flex text-white" navbar>
          <Tab tabName="My Registrations" selectedTab={selectedTab} onClick={handleTabClick} />
          <Tab tabName="View Participants" selectedTab={selectedTab} onClick={handleTabClick} />
          <Tab tabName="Event Details" selectedTab={selectedTab} onClick={handleTabClick} />
        </Nav>
      </Navbar>

      <div className="w-full max-w-screen-lg p-4">
        {selectedTab === 'My Registrations' && <MyRegistrations />}
        {selectedTab === 'View Participants' && <ViewParticipants />}
        {selectedTab === 'Event Details' && <ViewEvent />}
      </div>
    </div>
  );
};

export default Events;
