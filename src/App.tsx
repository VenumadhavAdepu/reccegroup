import React from 'react';
import './App.css';
import { TripsProvider } from './context/tripDetailsContext'
import { TripDetails } from './components/tripDetails'

const App: React.FC = () => {
  return (
    <TripsProvider>
      <div className='App'>
      <TripDetails />
      </div>
    </TripsProvider>
  );
}

export default App;
