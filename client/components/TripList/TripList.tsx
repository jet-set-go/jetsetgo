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
import { Link, useNavigate } from 'react-router-dom';
import ActionPrompt, { PromptAction } from '../ActionPrompt/ActionPrompt';
import { ITrip } from '../../../src/models/trip';

const TripList = () => {
  const [deletePrompt, setDeletePrompt] = React.useState<ITrip | null>(null);
  const [trips, setTrips] = React.useState<ITrip[]>([]);

  React.useEffect(() => {
    const fetchTrips = async () => {
      const response = await fetch('/api/trips');
      const data = await response.json();
      setTrips(data);
    };

    fetchTrips();
  }, []);

  const navigate = useNavigate();

  const handleCreateTrip = () => {
    navigate('/trip/new');
  };

  const deletePromptActions: PromptAction[] = [
    {
      label: 'Cancel',
      onClick: () => setDeletePrompt(null),
    },
    {
      label: 'Delete',
      onClick: async () => {
        if (!deletePrompt) return;
        const deleteId = deletePrompt.id;

        const newTrips = trips.filter((trip) => trip.id !== deleteId);
        setTrips(newTrips);

        await fetch(`/api/trips/${deleteId}`, {
          method: 'DELETE',
        });
        setDeletePrompt(null);
      },
    },
  ];

  return (
    <div className={styles.container}>
      <ActionPrompt
        open={Boolean(deletePrompt)}
        onClose={() => setDeletePrompt(null)}
        title="Delete Trip"
        content={`Are you sure you want to permanently delete your trip ${deletePrompt?.name} to ${deletePrompt?.destination.name}?`}
        actions={deletePromptActions}
      />
      <Box mb={2}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateTrip}
        >
          Add Trip
        </Button>
      </Box>
      <Divider />
      <Box mt={2}>
        <List sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {trips.map((trip) => (
            <div key={trip.id} className={styles.card}>
              <Link to={`/trip/${trip.id}`} className={styles.link}>
                <ListItem key={trip.id}>
                  <ListItemText
                    primary={trip.name}
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
              <IconButton onClick={(e) => setDeletePrompt(trip)}>
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
