import React from 'react';
import { fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import RenderWithRouter from '../RenderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

it('deve renderizar o componente Home', () => {
  const { getByText, history } = RenderWithRouter(<App />);
  fireEvent.click(getByText(/Home/i));
  const pathname = history.location.pathname;
  expect(pathname).toBe('/');
  const home = getByText(/Encountered pokémons/i);
  expect(home).toBeInTheDocument();
});

it('deve renderizar o componente Favorite Pokémons', () => {
  const { getByText, history } = RenderWithRouter(<App />);
  fireEvent.click(getByText(/Favorite Pokémons/i));
  const pathname = history.location.pathname;
  expect(pathname).toBe('/favorites');
  const favPkmn = getByText(/Favorite pokémons/);
  expect(favPkmn).toBeInTheDocument();
});

it('deve renderizar o componente About', () => {
    const { getByText, history } = RenderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const pathname = history.location.pathname;
    expect(pathname).toBe('/about');
    const aboutAll = getByText(/About Pokédex/);
    expect(aboutAll).toBeInTheDocument();
  });