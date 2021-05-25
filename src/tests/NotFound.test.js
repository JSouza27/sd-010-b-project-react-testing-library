import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Testing App', () => {
  test('', () => {
    render(
      <MemoryRouter initialEntries={ ['/', '/about', '/favorites'] }>
        <App />
      </MemoryRouter>,
    );

    const homeText = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });

    expect(homeText).toBeInTheDocument();
  });
});
