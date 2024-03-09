import React, {useState, useEffect} from 'react';

const BookingForm = ({availableTimes, updateTimes, submitForm}) => {
    const [chosenDate, setChosenDate] = useState('');
    const [chosenTime, setChosenTime] = useState('');
    const [numOfGuests, setNumOfGuests] = useState('');
    const [occasion, setOccasion] = useState('Birthday');
    const [isFormValid, setIsFormValid] = useState(false);

    // Validate the form when any of the input fields change
    useEffect(() => {
        const isDateValid = chosenDate !== '';
        const isTimeValid = chosenTime !== '';
        const isNumOfGuestsValid = numOfGuests >= 1; // Adjust the condition based on your requirements
        setIsFormValid(isDateValid && isTimeValid && isNumOfGuestsValid);
    }, [chosenDate, chosenTime, numOfGuests]);

    const handleDateChange = (e) => {
        const newDate = e.target.value;
        setChosenDate(newDate);
        updateTimes(newDate);
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid) {
            await submitForm({ chosenDate, chosenTime, numOfGuests, occasion });
            alert('Booking submitted');
            console.log('Booking submitted:', { chosenDate, chosenTime, numOfGuests, occasion });
          } else {
            alert('Form is invalid. Please check the input fields.');
          }
        };


    return (
        <form style={{ display: 'grid', maxWidth: '200px', gap: '20px' }} onSubmit={handleSubmit}>

        <label htmlFor="res-date">Choose date</label>
        <input type="date" id="res-date" value={chosenDate} onChange={handleDateChange} required />

        <label htmlFor="res-time">Choose time</label>
        <select id="res-time" value={chosenTime} onChange={(e) => setChosenTime(e.target.value)} required >
            {availableTimes.map((time) => (
                <option key={time} value={time}>
                    {time}
                </option>
            ))}
        </select>

        <label htmlFor="guests">Number of guests</label>
        <input type="number" placeholder="1" min="1" max="10" id="guests" value={numOfGuests} onChange={(e) => setNumOfGuests(e.target.value)} required />

        <label htmlFor="occasion">Occasion</label>
        <select id="occasion" value={occasion} onChange={(e) => setOccasion(e.target.value)}>
            <option>Birthday</option>
            <option>Anniversary</option>
        </select>

        <input type="submit" value="Make Your reservation" disabled={!isFormValid}/>

        </form>
    );
}
    export default BookingForm;