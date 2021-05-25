import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import RenderWithRouter from '../RenderWithRouter';
import userEvent from '@testing-library/user-event'; 
import { render } from '@testing-library/react';
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

test('Verifica se o link com o texto Home existe', () => {
  const { getByText } = RenderWithRouter(<App />);
  const home = getByText(/Home/);
  expect(home).toBeInTheDocument();
});

test('Verifica se o link com o texto About existe', () => {
  const { getByText } = RenderWithRouter(<App />);
  const about = getByText(/About/);
  expect(about).toBeInTheDocument();
});

test('Verifica se o link com o texto Favorite Pokémons existe', () => {
  const { getByText } = RenderWithRouter(<App />);
  const favPkmn = getByText(/Favorite Pokémons/);
  expect(favPkmn).toBeInTheDocument();
});