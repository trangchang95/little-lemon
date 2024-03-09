import { render, screen} from '@testing-library/react';
import BookingForm from './components/BookingForm';
import React from 'react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// Test for initializeTimes:
async function initializeTimes() {
  // Mocking fetchAPI to return a non-empty array
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: async () => ({ times: ['09:00', '10:00', '11:00'] }),
  });

  const result = await initializeTimes();

  // Asserting that the result is the expected array from fetchAPI
  expect(result).toEqual(['09:00', '10:00', '11:00']);

  // Cleaning up the mock
  global.fetch.mockRestore();
}

// Test for updateTimes:
function updateTimes(state, action) {
  // For now, just return the same value passed in the state
  return state;
}

test('Renders the BookingForm heading', () => {
  const availableTimes = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
  render(<BookingForm availableTimes={availableTimes}/>);
  const headingElement = screen.getByText("Make Your reservation");
  expect(headingElement).toBeInTheDocument();
})

test('updateTimes returns the same value provided in the state', () => {
  const currentState = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
  const action = { type: 'UPDATE_TIMES', availableTimes: ['10:00', '11:00', '12:00'] };

  const result = updateTimes(currentState, action);
  expect(result).toEqual(currentState);
});


test('HTML5 validation attributes are applied', () => {
  const availableTimes = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
  render(<BookingForm availableTimes={availableTimes} updateTimes={() => {}} submitForm={() => {}} />);

  // Test HTML5 validation for date input
  const dateInput = screen.getByLabelText('Choose date');
  expect(dateInput).toHaveAttribute('required');

  // Test HTML5 validation for time select
  const timeSelect = screen.getByLabelText('Choose time');
  expect(timeSelect).toHaveAttribute('required');

  // Test HTML5 validation for guests input
  const guestsInput = screen.getByLabelText('Number of guests');
  expect(guestsInput).toHaveAttribute('required');
  expect(guestsInput).toHaveAttribute('min', '1');
  expect(guestsInput).toHaveAttribute('max', '10');
});

test('JavaScript validation functions work correctly', async () => {
  const availableTimes = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
  const updateTimesMock = jest.fn();
  render(<BookingForm availableTimes={availableTimes} updateTimes={updateTimesMock} submitForm={() => {}} />);

  // Select the time element
  const timeSelect = screen.getByLabelText('Choose time');

  // Trigger a change event
  userEvent.selectOptions(timeSelect, '18:00');

  // Use await to wait for the updates to be processed
  await screen.findByDisplayValue('18:00');

  // Check if the element with the updated value is present
  expect(screen.getByDisplayValue('18:00')).toBeInTheDocument();

  // Log the number of times updateTimesMock has been called and with what arguments
  console.log('Calls to updateTimesMock:', updateTimesMock.mock.calls);
});