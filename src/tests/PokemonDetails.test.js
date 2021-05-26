import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/RenderRouter';
import data from '../data';

test('Se é renderizado o pokemon clicado com as info', () => {
  renderWithRouter(<App />);
  const detailsLink = screen.getByRole('link', {
    name: /More Details/i,
  });
  userEvent.click(detailsLink);

  const pokeName = screen.getByText('Pikachu');
  const pokeType = screen.getByText('Electric');
  const pokeWeight = screen.getByText('Average weight: 6.0 kg');
  expect(pokeName).toHaveTextContent(/Pikachu/i);
  expect(pokeType).toHaveTextContent(/Electric/i);
  expect(pokeWeight).toHaveTextContent(/Average weight: 6.0 kg/i);

  expect(screen.getByRole('heading', {
    level: 2,
    name: /Pikachu Details/i,
  })).toBeInTheDocument();

  expect(detailsLink).not.toBeInTheDocument();

  expect(screen.getByRole('heading', {
    level: 2,
    name: /Summary/i,
  })).toBeInTheDocument();

  const details = screen.getByText(data[0].summary);
  expect(details).toBeInTheDocument();
});

test('Teste se existe na página uma seção com os mapas', () => {
  renderWithRouter(<App />);
  const detailsLink = screen.getByRole('link', {
    name: /More Details/i,
  });
  userEvent.click(detailsLink);
  expect(screen.getByRole('heading', {
    level: 2,
    name: /Game Locations of Pikachu/i,
  })).toBeInTheDocument();
  const pikachuLocation = 'Pikachu location';
  const location = screen.getAllByAltText(pikachuLocation);
  const locationLength = 2;
  expect(location).toHaveLength(locationLength);
  const locationText = screen.getByText('Kanto Viridian Forest');
  const locationText2 = screen.getByText('Kanto Power Plant');
  expect(locationText).toBeInTheDocument();
  expect(locationText2).toBeInTheDocument();

  expect(location[0].src).toContain('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(location[1].src).toContain('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  expect(location[0]).toHaveAttribute('alt', pikachuLocation);
  expect(location[1]).toHaveAttribute('alt', pikachuLocation);
});

test('Se existe checkbox no details', () => {
  renderWithRouter(<App />);
  const detailsLink = screen.getByRole('link', {
    name: /More Details/i,
  });
  userEvent.click(detailsLink);
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).toBeInTheDocument();
  userEvent.click(checkbox);
  const image = screen.getByAltText('Pikachu is marked as favorite');
  expect(image).toBeInTheDocument();
  userEvent.click(checkbox);
  expect(image).not.toBeInTheDocument();
  const labelCheck = screen.getByLabelText('Pokémon favoritado?');
  expect(labelCheck).toBeInTheDocument();
});
