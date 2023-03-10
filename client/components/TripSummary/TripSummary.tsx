import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { relative } from 'path';
import React from 'react';
import { ITrip } from '../../../src/models/trip';
import styles from './TripSummary.module.css';

interface TripSummaryProps {
  trip: ITrip;
}

const TripSummary: React.FC<TripSummaryProps> = ({ trip }) => {
  const [currentImage, setCurrentImage] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((currentImage + 1) % trip.destination.images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentImage, trip.destination.images.length]);

  const imageSlideshow = trip.destination.images.map((image, index) => {
    const opacity = index === currentImage ? 1 : 0;
    return (
      <CardMedia
        key={image}
        sx={{
          opacity,
          transition: 'opacity 1s',
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
        }}
        title={trip.name}
        image={image}
      />
    );
  });

  return (
    <Card sx={{ width: '100%', position: 'relative' }}>
      <div className={styles.media}>{imageSlideshow}</div>
      <CardContent
        sx={{
          height: '100%',
          position: 'relative',
          zIndex: 2,
          backgroundColor: '#FFFFFF75',
          backdropFilter: 'blur(2px)',
        }}
      >
        <div className={styles.content}>
          {/* Only show the destination as a subtitle if it differs from the trip name */}
          {trip.name !== trip.destination.name ? (
            <Typography variant="subtitle1" component="h2" textAlign="right">
              {trip.destination.name}
            </Typography>
          ) : null}

          <Typography variant="h4" component="h1" textAlign="right">
            {trip.name}
          </Typography>
          <Typography
            variant="h6"
            component="h3"
            textAlign="right"
          >{`${new Date(trip.startDate).toLocaleDateString()} - ${new Date(
            trip.endDate
          ).toLocaleDateString()}`}</Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default TripSummary;
