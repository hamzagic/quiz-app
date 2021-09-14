import { render, screen } from '@testing-library/react';
import CalendarComponent from '../CalendarComponent';

describe('CalendarComponent.js', () => {
  it('renders the calendar', () => {
    render(<CalendarComponent title="Start/End dates" />);
    const calendarElement = screen.getByText(/start\/end dates/i);
    expect(calendarElement).toBeInTheDocument();
  });
});
