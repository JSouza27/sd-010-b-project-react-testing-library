import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import { NotFound } from '../components';

describe('Testing App', () => {
  test('Test if the page contains "h2" with the text "Page requested not found"', () => {
    renderWithRouter(<NotFound />);

    const pageNotEncountered = screen.getByText('Page requested not found');
    expect(pageNotEncountered).toBeInTheDocument();
  });

  test('Test if the page shows the image `https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`', () => {
    renderWithRouter(<NotFound />);

    const notFoundImage = screen.getAllByRole('img');

    expect(notFoundImage[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
