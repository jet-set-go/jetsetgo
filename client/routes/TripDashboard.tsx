import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { ITrip } from '../../src/models/trip';

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
      <p>{JSON.stringify(trip)}</p>
    </div>
  );
};

export default TripDashboard;
