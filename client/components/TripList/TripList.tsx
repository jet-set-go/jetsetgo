import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import styles from './TripList.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

const dummyTrips = [
  {
    id: '1',
    destination: 'Paris',
    startDate: new Date('2023-08-01').toISOString(),
    endDate: new Date('2023-08-10').toISOString(),
  },
  {
    id: '2',
    destination: 'London',
    startDate: new Date('2023-09-01').toISOString(),
    endDate: new Date('2023-09-10').toISOString(),
  },
  {
    id: '3',
    destination: 'New York',
    startDate: new Date('2023-10-01').toISOString(),
    endDate: new Date('2023-10-10').toISOString(),
  },
];

const TripList = () => {
  const handleDelete = (id: string) => {
    console.log('delete', id);
  };

  return (
    <div className={styles.container}>
      <Box mb={2}>
        <Button variant="contained" startIcon={<AddIcon />}>
          Add Trip
        </Button>
      </Box>
      <Divider />
      <Box mt={2}>
        <List sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {dummyTrips.map((trip) => (
            // TODO: Link component should link to dashboard for specific trip once routing is fleshed out
            <div className={styles.card}>
              <Link
                key={trip.id}
                to={`/trip/${trip.id}`}
                className={styles.link}
              >
                <ListItem key={trip.id}>
                  <ListItemText
                    primary={trip.destination}
                    secondary={
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {new Date(trip.startDate).toLocaleDateString()} -{' '}
                        {new Date(trip.endDate).toLocaleDateString()}
                      </Typography>
                    }
                  />
                </ListItem>
              </Link>
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  console.log('stopPropagation');
                  e.stopPropagation;
                  handleDelete(trip.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
        </List>
      </Box>
    </div>
  );
};

export default TripList;
