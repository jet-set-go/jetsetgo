import { Autocomplete, AutocompleteValue, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { Form } from 'react-router-dom';

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
    <Form>
      <Autocomplete
        disablePortal
        id="destination-input"
        options={destinationOptions.map((option) => option.name)}
        sx={{ width: 300 }}
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
    </Form>
  );
};

export default CreateTripForm;
