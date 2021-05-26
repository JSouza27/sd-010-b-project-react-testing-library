import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Requirement 1', () => {
  test('There are `Home`, `About` and `Favorite Pokémons` on links', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const links = getAllByRole('link');
    expect(links[0]).toHaveTextContent(/Home/i);
    expect(links[1]).toHaveTextContent(/About/i);
    expect(links[2]).toHaveTextContent(/Favorite Pokémons/i);
  });
});
