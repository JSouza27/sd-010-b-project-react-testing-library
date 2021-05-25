import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('test the App component', () => {
  it('should render the main Pokédex page when loading the / path', () => {
    const { getByText } = renderWithRouter(<App />);
    const pokedexHeader = getByText('Pokédex');
    expect(pokedexHeader).toBeInTheDocument();
  });
  it('tests the links in the main Pokédex page', async () => {
    const { queryAllByRole, getByText } = renderWithRouter(<App />);
    const allLinks = await queryAllByRole('link');
    const home = getByText('Home');
    expect(home).toBeInTheDocument();
    expect(allLinks[0]).toBe(home);
    const about = getByText('About');
    expect(about).toBeInTheDocument();
    expect(allLinks[1]).toBe(about);
    const favPokemons = getByText('Favorite Pokémons');
    expect(favPokemons).toBeInTheDocument();
    expect(allLinks[2]).toBe(favPokemons);
  });
  it('tests if by clicking the home link redirects to path /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homeLink = getByText('Home');
    fireEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });
  it('tests if by clicking the about link redirects to path /about', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const aboutLink = getByText('About');
    fireEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });
  it('tests if by clicking the favorites link redirects to path /favorites', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favPokeLink = getByText('Favorite Pokémons');
    fireEvent.click(favPokeLink);
    expect(history.location.pathname).toBe('/favorites');
  });
  it('tests if by going to an unknown path it render the Not Found page', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pokewhat');
    const notFound = getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});
