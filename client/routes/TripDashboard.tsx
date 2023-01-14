import { Box } from '@mui/material';
import { ObjectId } from 'mongoose';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { ITrip } from '../../src/models/trip';
import PackingList from '../components/PackingList/PackingList';
import TripSummary from '../components/TripSummary/TripSummary';
import WeatherSummary from '../components/Weather/Weather';
export const loader = async ({ params }: { params: any }) => {
  const { tripId } = params;
  const response = await fetch(`/api/trips/${tripId}`);
  const data = await response.json();
  return data;
};

const TripDashboard = () => {
  const trip = useLoaderData() as ITrip & { _id: ObjectId };

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridTemplateRows="repeat(5, 1fr)"
      gap={2}
    >
      <Box gridColumn="span 7" gridRow="span 4">
        <TripSummary trip={trip} />
      </Box>
      <Box gridColumn="span 5">
        <WeatherSummary
          lat={trip.destination.location.lat}
          lon={trip.destination.location.lng}
          location={trip.destination.name}
        />
      </Box>
      <Box gridColumn="span 5" gridRow="span 5">
        <PackingList trip={trip} />
      </Box>
    </Box>
  );
};

export default TripDashboard;
