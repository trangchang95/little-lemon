import React, {useReducer, useEffect} from 'react';
import { Routes, Route , useNavigate } from 'react-router-dom';
import HomePage from './HomePage';
import BookingPage from './BookingPage';
import Chicago from './Chicago';
import Specials from './Specials';
import ConfirmedBooking from './ConfirmedBooking';

const submitAPI = async (formData) => {
  try {
    // Your actual API endpoint and logic would go here
    // For simplicity, we're simulating a successful submission
    // You should replace the URL with your actual API endpoint
    const response = await fetch('https://example.com/api/submit-booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    return data.success || false;
  } catch (error) {
    console.error('Error submitting booking:', error.message);
    throw error;
  }
};

const fetchAPI = async (date) => {
  try {
    // Your actual API endpoint and logic would go here
    // For simplicity, we're simulating a response with hardcoded data
    const response = await fetch(`https://example.com/api/available-times?date=${date}`);
    const data = await response.json();
    return data.times || [];
  } catch (error) {
    console.error('Error fetching available times:', error.message);
    throw error;
  }
};

const availableTimesReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMES':
      return action.availableTimes;
    default:
      return state;
  }
}


function Main() {
  const [availableTimes, dispatch] = useReducer(availableTimesReducer, [], initializeTimes);

  const updateTimes = async (selectedDate) => {
    try {
      const times = await fetchAPI(selectedDate);
      dispatch({ type: 'UPDATE_TIMES', availableTimes: times });
    } catch (error) {
      console.error('Error fetching available times:', error.message);
    }
  };

  function initializeTimes() {
    return ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
  }

  useEffect(() => {
    // Initialize available times when the component mounts
    updateTimes(new Date().toISOString().split('T')[0]);
  }, []);

  const navigate = useNavigate(); // Import useNavigate from 'react-router-dom'

  const submitForm = async (formData) => {
    try {
      const submissionResult = await submitAPI(formData);

      if (submissionResult) {
        // If the submission is successful, navigate to the confirmed-booking page
        navigate('/confirmed-booking');
      } else {
        // Handle submission failure if needed
        console.error('Booking submission failed.');
      }
    } catch (error) {
      console.error('Error submitting booking:', error.message);
    }
  };

  return (
    <main role="main">
      {/* Main content goes here */}
      <p> main content </p>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/about" element={<Chicago/>}></Route>
        <Route path="/booking" element={<BookingPage
                                availableTimes={availableTimes}
                                updateTimes={updateTimes}
                                submitForm={submitForm}/>}></Route>
        <Route path="/menu" element={<Specials/>}></Route>
        <Route path="/confirmed-booking" element={<ConfirmedBooking />} />
      </Routes>
    </main>
  );
}

export default Main;