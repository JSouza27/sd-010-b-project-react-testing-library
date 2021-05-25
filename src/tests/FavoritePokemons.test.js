import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Testing App', () => {
  test('check if the message "No favorite pokemon found" appears', () => {
    render(
      <MemoryRouter initialEntries={ ['/favorites'] }>
        <App />
      </MemoryRouter>,
    );

    const msgFavorite = screen.getByText('No favorite pokemon found');

    expect(msgFavorite).toBeInTheDocument();
  });
});
