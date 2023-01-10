import { Autocomplete, TextField } from '@mui/material';
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

  return (
    <div className={styles.container}>
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80"
        alt="beach"
        className={styles.background}
      />
      <Form>
        <div className={styles.form}>
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
              <TextField {...params} label="Destination" variant="outlined" />
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
          />
        </div>
      </Form>
    </div>
  );
};

export default CreateTripForm;
