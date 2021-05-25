import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<App />);
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('show the Pokedex when the rote is `/`', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/');
  expect(getByText(/Encountered Pokémons/i)).toBeInTheDocument();
});

describe('Test links in home page', () => {
  test('test if the first link have text `Home`', () => {
    const { getAllByRole, history } = renderWithRouter(<App />);
    history.push('/');
    const firstLink = getAllByRole('link');
    expect(firstLink[0].innerHTML).toBe('Home');
  });
  test('test if the first link have text `About`', () => {
    const { getAllByRole, history } = renderWithRouter(<App />);
    history.push('/');
    const firstLink = getAllByRole('link');
    expect(firstLink[1].innerHTML).toBe('About');
  });
  test('test if the first link have text `Favorite Pokémons`', () => {
    const { getAllByRole, history } = renderWithRouter(<App />);
    history.push('/');
    const firstLink = getAllByRole('link');
    expect(firstLink[2].innerHTML).toBe('Favorite Pokémons');
  });
});

describe('Test route of links in home page', () => {
  test('test if link `Home` go to `/`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText('Home'));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
  test('test if link `About` go to `/about`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText('About'));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });
  test('test if link `Favorite Pokémons` go to `/favorites`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText('Favorite Pokémons'));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });
});
