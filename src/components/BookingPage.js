import React from 'react';
import BookingForm from './BookingForm';

function BookingPage({availableTimes, updateTimes, submitForm}) {

  return (
    <div>
      <h2>Book a Table</h2>
      {/* Add your reservation form or other booking-related components */}
      <BookingForm availableTimes={availableTimes} updateTimes={updateTimes} submitForm={submitForm}/>
    </div>
  );
}

export default BookingPage;