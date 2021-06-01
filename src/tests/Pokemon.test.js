import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from '../components/renderWithRouter';
import pokemon from '../data';

describe('testing the <Pokemon.js /> component', () => {
  test('testing if a card is rendered with the information of the pokémon',
    () => {
      renderWithRouter(<App />);
      const { name, image } = pokemon[0];

      const pokemonName = screen.getByText(name);
      expect(pokemonName).toBeInTheDocument();

      const pokemonType = screen.getByTestId('pokemon-type');
      expect(pokemonType).toBeInTheDocument();

      const pokemonAverageWeight = screen.getByText(/average weight: 6\.0 kg/i);
      expect(pokemonAverageWeight).toBeInTheDocument();

      const pokemonImage = screen.getByRole('img', {
        name: /pikachu sprite/i,
      });
      expect(pokemonImage).toHaveAttribute('src', image);
      expect(pokemonImage).toHaveAttribute('alt', `${name} sprite`);
    });

  test('check if the card contains a navigation link to display details of this Pokémon',
    () => {
      const { history } = renderWithRouter(<App />);

      const moreDetailsLink = screen.getByRole('link', {
        name: /more details/i,
      });
      expect(moreDetailsLink).toBeInTheDocument();

      userEvent.click(moreDetailsLink);
      const pokemonId = pokemon[0].id;
      const { pathname } = history.location;
      expect(pathname).toBe(`/pokemons/${pokemonId}`);
    });

  test('when clicking on the link the redirect Pokémon details page should be displayed',
    () => {
      renderWithRouter(<App />);

      const moreDetailsLink = screen.getByRole('link', {
        name: /more details/i,
      });
      userEvent.click(moreDetailsLink);
      const headingDetails = screen.getByRole('heading', {
        name: /pikachu details/i,
      });
      expect(headingDetails).toBeInTheDocument();
    });

  test('check if there is a star icon on favorite Pokémon',
    () => {
      const { history } = renderWithRouter(<App />);
      const { name } = pokemon[0];

      const moreDetailsLink = screen.getByRole('link', {
        name: /more details/i,
      });
      userEvent.click(moreDetailsLink);

      const checkBoxFavorite = screen.getByRole('checkbox', { checked: false });
      expect(checkBoxFavorite).toBeInTheDocument();

      userEvent.click(checkBoxFavorite);
      expect(checkBoxFavorite).toBeChecked(true);

      const linkHome = screen.getByRole('link', {
        name: /home/i,
      });
      expect(linkHome).toBeInTheDocument();

      userEvent.click(linkHome);
      const { pathname } = history.location;
      expect(pathname).toBe('/');

      const imgFavorite = screen.getByRole('img', {
        name: /pikachu is marked as favorite/i,
      });
      expect(imgFavorite).toBeInTheDocument();
      expect(imgFavorite).toHaveAttribute('src', '/star-icon.svg');
      expect(imgFavorite).toHaveAttribute('alt', `${name} is marked as favorite`);
    });
});
