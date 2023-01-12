import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { ITrip } from '../../src/models/trip';
import TripSummary from '../components/TripSummary/TripSummary';
import WeatherSummary from '../components/Weather/Weather';

export const loader = async ({ params }: { params: any }) => {
  const { tripId } = params;
  const response = await fetch(`/api/trips/${tripId}`);
  const data = await response.json();
  return data;
};

const TripDashboard = () => {
  const trip = useLoaderData() as ITrip;

  return (
    <div>
      <div>TripDashboard</div>
      <TripSummary trip={trip} />
      <WeatherSummary
        lat={trip.destination.location.lat}
        lon={trip.destination.location.lng}
        location={trip.destination.name}
      />
    </div>
  );
};

export default TripDashboard;
