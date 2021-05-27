import React from 'react';
import renderWithRouter from '../Helpers/renderWithRouter';
import About from '../components/About';

test('shows information about Pokédex', () => {
  const { getByText } = renderWithRouter(<About />);
  const p = 'This application simulates a Pokédex,'
  + ' '
  + 'a digital encyclopedia containing all Pokémons';
  const infoPokedex = getByText(p);
  expect(infoPokedex).toBeInTheDocument();
});

test('renders a heading with the text "About Pokédex"', () => {
  const { getByRole, getByText } = renderWithRouter(<About />);
  const aboutH2 = getByRole('heading', {
    level: 2,
  });
  const aboutTitle = getByText('About Pokédex');
  expect(aboutH2).toBeInTheDocument();
  expect(aboutTitle).toBeInTheDocument();
});

test('renders two paragraphs with text about Pokédex', () => {
  const { getByText } = renderWithRouter(<About />);
  const p1 = 'This application simulates a Pokédex,'
  + ' '
  + 'a digital encyclopedia containing all Pokémons';
  const p2 = 'One can filter Pokémons by type, and see more details for each one of them';
  expect(getByText(p1)).toBeInTheDocument();
  expect(getByText(p2)).toBeInTheDocument();
});

test('shows the respective of a Pokédex', () => {
  const { getByAltText } = renderWithRouter(<About />);
  const pokedexImg = getByAltText('Pokédex');
  expect(pokedexImg).toHaveAttribute(
    'src',
    'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
  );
});
