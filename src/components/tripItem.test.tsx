import React from 'react'
import { render, screen } from '@testing-library/react'
import TripItem from './tripItem'
import { convertDate } from '../utils/dateUtil'

jest.mock('../utils/dateUtil', () => ({
  convertDate: jest.fn(),
}))

describe('TripItem Component', () => {
  const mockProps = {
    heroImage: 'https://example.com/image.jpg',
    unitName: 'Sample Unit',
    unitStyleName: 'Luxury Suite',
    checkInDate: new Date(),
  }

  test('renders the TripItem component with the correct props', () => {
  render(<TripItem {...mockProps} />)

    // Check if the image is rendered with the correct src and alt attributes
    const image = screen.getByRole('img', { name: mockProps.unitName })
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', mockProps.heroImage)
    expect(image).toHaveAttribute('alt', mockProps.unitName)

    // Check if the unit name and style name are rendered
    expect(screen.getByText(`Unit name - ${mockProps.unitName}`)).toBeInTheDocument()
    expect(screen.getByText(`Unit Style name - ${mockProps.unitStyleName}`)).toBeInTheDocument()

    // Check if the check-in date is rendered
    expect(screen.getByText('Check-in Date: December 15, 2024')).toBeInTheDocument()

    // Ensure convertDate is called with the correct argument
    expect(convertDate).toHaveBeenCalledWith(mockProps.checkInDate)
  })
})