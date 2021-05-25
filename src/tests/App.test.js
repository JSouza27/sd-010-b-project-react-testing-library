import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helper';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText, history } = renderWithRouter(<App />);

  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
  const links = screen.getAllByRole('link');
  expect(links[0]).toHaveTextContent('Home');
  expect(links[1]).toHaveTextContent('About');
  expect(links[2]).toHaveTextContent('Favorite Pokémons');

  fireEvent.click(links[0]);
  let path = history.location.pathname;
  expect(path).toBe('/');
  fireEvent.click(getByText(/About/i));
  path = history.location.pathname;
  expect(path).toBe('/about');
  fireEvent.click(getByText(/Favorite Pokémons/i));
  path = history.location.pathname;
  history.push('errorpage');
  const notFound = getByText(/Page requested not found/i);
  expect(notFound).toBeInTheDocument();
});
