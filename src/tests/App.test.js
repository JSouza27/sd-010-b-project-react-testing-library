import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('testing component App.js', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('shows the Pokédex when the route is `/`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/');
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('shows link Home and router', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const linkHome = getByRole('link', { name: /home/i });
    fireEvent.click(linkHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('show link About and router', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const linkHome = getByRole('link', { name: /about/i });
    fireEvent.click(linkHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('show link Favorite and router', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const linkHome = getByRole('link', { name: /favorite pokémons/i });
    fireEvent.click(linkHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('show page not found', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/page/not-found');
    const noMatch = getByRole('heading', {
      level: 2,
      name: /Page requested not found Crying emoji/i,
    });
    expect(noMatch).toBeInTheDocument();
  });
});
