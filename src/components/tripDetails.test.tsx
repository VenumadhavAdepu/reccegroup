import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { TripDetails } from './tripDetails'
import { useTrips } from '../context/tripDetailsContext'

// Mock the useTrips context
jest.mock('../context/tripDetailsContext', () => ({
  useTrips: jest.fn(),
}))

describe('TripDetails Component', () => {
  beforeEach(() => {
    (useTrips as jest.Mock).mockReturnValue({
      state: {
        trips: {
          tripSet: [
            {
              unitName: 'Trip 1',
              unitStyleName: 'Mountain',
              checkInDate: '2024-12-15',
              heroImage: 'image1.jpg',
            },
            {
              unitName: 'Trip 2',
              unitStyleName: 'Beach',
              checkInDate: '2024-12-10',
              heroImage: 'image2.jpg',
            },
          ],
        },
      },
    })
  })

  test('renders trips correctly', () => {
    render(<TripDetails />)

    // Check if the trips are rendered
    expect(screen.getByText('Trip 1')).toBeInTheDocument()
    expect(screen.getByText('Trip 2')).toBeInTheDocument()
  })

  test('filters trips based on dropdown selection', () => {
    render(<TripDetails />)

    // Select the dropdown filter
    const dropdown = screen.getByLabelText(/filter by/i)
    fireEvent.change(dropdown, { target: { value: 'Mountain' } })

    // Verify that only the filtered trip is displayed
    expect(screen.getByText('Trip 1')).toBeInTheDocument()
    expect(screen.queryByText('Trip 2')).not.toBeInTheDocument()
  })

  test('toggles sorting of trips by date', () => {
    render(<TripDetails />)

    // Check initial order (ascending by default)
    const tripItems = screen.getAllByText(/Trip/)
    expect(tripItems[0]).toHaveTextContent('Trip 2')
    expect(tripItems[1]).toHaveTextContent('Trip 1')

    // Toggle the sorting checkbox
    const toggleCheckbox = screen.getByRole('checkbox')
    fireEvent.click(toggleCheckbox)

    // Verify the order changes to descending
    const sortedTripItems = screen.getAllByText(/Trip/)
    expect(sortedTripItems[0]).toHaveTextContent('Trip 1')
    expect(sortedTripItems[1]).toHaveTextContent('Trip 2')
  })

  test('renders empty state when no trips are available', () => {
    (useTrips as jest.Mock).mockReturnValue({
      state: {
        trips: {
          tripSet: [],
        },
      },
    })

    render(<TripDetails />)

    // Verify empty state message or absence of trip items
    expect(screen.queryByText(/Trip/)).not.toBeInTheDocument()
    expect(screen.getByText(/no trips available/i)).toBeInTheDocument()
  })
})
