import { Autocomplete, Button, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Form } from 'react-router-dom';
import styles from './CreateTripForm.module.css';
interface Place {
  name: string;
  place_id: string;
}

const CreateTripForm = () => {
  const [destination, setDestination] = React.useState('');
  const [debounceDestination, setDebounceDestination] = React.useState('');
  const [destinationOptions, setDestinationOptions] = React.useState<Place[]>(
    []
  );

  const [backgroundOpacity, setBackgroundOpacity] = React.useState(0);

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

  // Fetch data from API
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

  useEffect(() => {
    const timerId = setTimeout(() => {
      setBackgroundOpacity(1);
    }, 200);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (!destination || !startDate || !endDate) {
      return;
    }

    // Check if dates are valid and store as ISO string
    const startTimestamp = Date.parse(startDate);
    const endTimestamp = Date.parse(endDate);

    if (isNaN(startTimestamp) || isNaN(endTimestamp)) {
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

    if (response.status === 201) {
      // Redirect to trip page
    }
  };

  return (
    <div className={styles.container}>
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80"
        alt="beach"
        className={styles.background}
        style={{ opacity: backgroundOpacity }}
      />
      <Form onSubmit={handleSubmit}>
        <div className={styles.form}>
          <Typography variant="h6" component="h1">
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
            onChange={(event, newValue) => {
              console.log('newValue: ', newValue);
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
            // defaultValue="2023-01-19"
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
            // defaultValue="2017-05-24"
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
