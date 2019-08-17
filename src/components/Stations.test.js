import React from 'react';
import { shallow } from 'enzyme';
import Stations from './Stations';

describe('Stations ', () => {
  const exampleStations = [
    {
      address: "Borgenveien",
      capacity: 10,
      is_installed: 1,
      is_renting: 1,
      is_returning: 1,
      last_reported: 1566050603,
      lat: 59.942742106473666,
      lon: 10.703833031254021,
      name: "Borgenveien",
      num_bikes_available: 0,
      num_docks_available: 10,
      station_id: "1009"
    }, 
    {
      address: "Borgenveien",
      capacity: 10,
      is_installed: 1,
      is_renting: 1,
      is_returning: 1,
      last_reported: 1566050603,
      lat: 59.942742106473666,
      lon: 10.703833031254021,
      name: "Borgenveien",
      num_bikes_available: 0,
      num_docks_available: 10,
      station_id: "1009"
    }
  ];

  it('renders without crashing when recviving props', () => {
    shallow(<Stations stations={exampleStations} />);
  })

  it('renders without crashing when not reciving any props', () => {
    shallow(<Stations />);
  });
});