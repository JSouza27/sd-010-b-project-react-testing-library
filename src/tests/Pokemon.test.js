import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../Helpers/renderWithRouter';
import App from '../App';

const pokemonDetails = 'More details';

describe('renders a card with Pokémon infos', () => {
  test('shows correct Pokémon name', () => {
    const { getByText } = renderWithRouter(<App />);
    const pokemonName = getByText('Pikachu');
    expect(pokemonName).toBeInTheDocument();
  });
  test('shows the correct Pokémon type', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const pokemonType = getByTestId('pokemon-type');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Electric');
  });
  test('shows average pokemon weight', () => {
    const { getByText } = renderWithRouter(<App />);
    const pokemonWeight = getByText('Average weight: 6.0 kg');
    expect(pokemonWeight).toBeInTheDocument();
  });
  test('shows Pokémon image', () => {
    const { getByAltText } = renderWithRouter(<App />);
    const gif = getByAltText('Pikachu sprite');
    expect(gif).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
  });
});

test('shows a link for more details in Pokémon card', () => {
  const { getByRole } = renderWithRouter(<App />);
  const detailsLink = getByRole('link', {
    name: /more details/i,
  });
  expect(detailsLink).toBeInTheDocument();
  expect(detailsLink).toHaveAttribute(
    'href',
    '/pokemons/25',
  );
});

test('when click link "More details" goes to the Pokémon details page', () => {
  const { getByText } = renderWithRouter(<App />);
  const detailsBtn = getByText(pokemonDetails);
  userEvent.click(detailsBtn);
  const detailsH2 = getByText('Pikachu Details');
  expect(detailsH2).toBeInTheDocument();
});

test('URL displayed in the browser changes correctly', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const detailsBtn = getByText(pokemonDetails);
  userEvent.click(detailsBtn);
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
});

describe('shows a star icon to favorites Pokémons', () => {
  test('image must have a specific path', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);
    const detailsBtn = getByText(pokemonDetails);
    userEvent.click(detailsBtn);
    const favoriteLink = getByText('Pokémon favoritado?');
    userEvent.click(favoriteLink);
    const starImg = getByAltText('Pikachu is marked as favorite');
    expect(starImg).toBeInTheDocument();
    expect(starImg).toHaveAttribute(
      'src',
      '/star-icon.svg',
    );
  });
});
