import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('tests the <App /> component', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  test('renders the main page at the URL / and checks the text of the Home link', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const linkHome = getByText(/Home/i);
    expect(linkHome).toBeInTheDocument();
  });
  test('redirects to URL / by clicking on the Home link', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/about');
    fireEvent.click(getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test('link has the text About and redirects to /about', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkAbout = getByText(/about/i);
    expect(linkAbout).toBeInTheDocument();
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  test('checks if the link has the text Favorite Pokémons and redirects to /favorites',
    () => {
      const { getByText, history } = renderWithRouter(<App />);
      const linkFavoritePokémons = getByText(/Favorite Pokémons/i);
      expect(linkFavoritePokémons).toBeInTheDocument();
      fireEvent.click(getByText(/Favorite Pokémons/i));
      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });
  test('unknown URL renders page not found', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('path-that-does-not-exist');
    const noMatch = getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(noMatch).toBeInTheDocument();
  });
});
