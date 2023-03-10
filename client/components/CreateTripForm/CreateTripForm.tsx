import { Autocomplete, Button, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import useFadeInOpacity from '../../hooks/useFadeInOpacity';
import styles from './CreateTripForm.module.css';

interface Place {
  name: string;
  place_id: string;
}

const CreateTripForm = () => {
  const navigate = useNavigate();

  const [destination, setDestination] = React.useState('');
  const [debounceDestination, setDebounceDestination] = React.useState('');
  const [destinationOptions, setDestinationOptions] = React.useState<Place[]>(
    []
  );

  const fadeIn = useFadeInOpacity();

  const [tripName, setTripName] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');

  // Debounce destination to avoid too many API calls - this will fetch only after 500ms of no input
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounceDestination(destination);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [destination]);

  // Fetch autocomplete data from API
  useEffect(() => {
    if (debounceDestination) {
      const fetchAutocomplete = async () => {
        const response = await fetch(
          `/api/places/autocomplete?input=${debounceDestination}`
        );
        const data = (await response.json()) as Place[];
        setDestinationOptions(data);
      };
      fetchAutocomplete();
    }
  }, [debounceDestination]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (!destination || !startDate || !endDate) {
      return;
    }

    // Check if dates are valid and stored as ISO string
    const startTimestamp = Date.parse(startDate);
    const endTimestamp = Date.parse(endDate);

    if (isNaN(startTimestamp) || isNaN(endTimestamp)) {
      return;
    }

    if (startTimestamp > endTimestamp) {
      return;
    }

    const start = new Date(startTimestamp).toISOString();
    const end = new Date(endTimestamp).toISOString();

    // Get place_id from destinationOptions
    const place_id = destinationOptions.find(
      (option) => option.name === destination
    )?.place_id;

    if (!place_id) {
      return;
    }

    const name = tripName || destination;

    // Create trip in database
    const response = await fetch('/api/trips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        place_id: place_id,
        startDate: start,
        endDate: end,
      }),
    });

    // Redirect to trip page
    if (response.status === 201) {
      const data = await response.json();
      navigate(`/trip/${data.id}`);
    }
  };

  return (
    <div className={styles.container}>
      <img
        src="https://source.unsplash.com/collection/4378393"
        alt="beach"
        className={styles.background}
        style={fadeIn}
      />
      <Form onSubmit={handleSubmit}>
        <div className={styles.form}>
          <Typography
            variant="h6"
            component="h1"
            sx={{ minWidth: 480, textAlign: 'center' }}
          >
            Plan your next adventure today!
          </Typography>
          <TextField
            id="trip-name"
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
            variant="outlined"
            label="Trip Name (Optional)"
            sx={{ minWidth: 480 }}
          />
          <Autocomplete
            disablePortal
            id="destination-input"
            options={destinationOptions.map((option) => option.name)}
            sx={{ minWidth: 480 }}
            inputValue={destination}
            onInputChange={(event, newInputValue) => {
              setDestination(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Destination"
                variant="outlined"
                required
              />
            )}
          />
          <TextField
            id="start-date"
            label="Trip Start"
            type="date"
            sx={{ minWidth: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            required
          />
          <TextField
            id="end-date"
            label="Trip End"
            type="date"
            sx={{ minWidth: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
            required
          />
          <Button
            id="create-trip"
            type="submit"
            variant="contained"
            sx={{ width: '100%' }}
          >
            Create Trip
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateTripForm;
