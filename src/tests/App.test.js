import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

describe('if on the application contains a fixed set of navigation links', () => {
  it('The first  link must have the text Home', () => {
    const { getByText } = renderWithRouter(<App />);
    const link = getByText('Home').innerHTML;
    expect(link).toBe('Home');
  });

  it('The second link must have the text About', () => {
    const { getByText } = renderWithRouter(<App />);
    const link = getByText('About').innerHTML;
    expect(link).toBe('About');
  });

  it('The third link must have the text Favorite Pokémons', () => {
    const favoritePokemons = 'Favorite Pokémons';
    const { getByText } = renderWithRouter(<App />);
    const link = getByText(favoritePokemons).innerHTML;
    expect(link).toBe(favoritePokemons);
  });
});

test('is redirected to the home page (/)', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText('Home'));
  const { pathname } = history.location;
  expect(pathname).toBe('/');
  const getData = getByText(/Encountered pokémons/);
  expect(getData).toBeInTheDocument();
});

test('is redirected to the home page (/about)', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText('About'));
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
  const getData = getByText(/About Pokédex/);
  expect(getData).toBeInTheDocument();
});

test('is redirected to the home page (/favorites)', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText('Favorite Pokémons'));
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
  const getData = getByText(/Favorite pokémons/);
  expect(getData).toBeInTheDocument();
});

test('is redirected to the Not Found page', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/not Found page');
  const notFound = getByText(/not found/i);
  expect(notFound).toBeInTheDocument();
});
