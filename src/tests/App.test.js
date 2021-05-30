import React from 'react';
import userEvent from '@testing-library/user-event';
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

  test('Tests paths given by links', () => {
    const { getByText, getAllByRole, history } = renderWithRouter(<App />);
    const navLink = getAllByRole('link');
    expect(history.location.pathname).toBe('/');

    userEvent.click(navLink[0]);
    expect(history.location.pathname).toBe('/');

    userEvent.click(navLink[1]);
    expect(history.location.pathname).toBe('/about');

    userEvent.click(navLink[2]);
    expect(history.location.pathname).toBe('/favorites');

    history.push('/notfound');
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
});
