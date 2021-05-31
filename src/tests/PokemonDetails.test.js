import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from '../components/renderWithRouter';
import pokemon from '../data';

describe('testing the <PokemonDetails.js /> component', () => {
  test('check that detailed information for the selected Pokémon is shown', () => {
    const { history } = renderWithRouter(<App />);
    const linkMoreDatils = screen.getByText(/more details/i);
    const { id, name, summary } = pokemon[0];

    userEvent.click(linkMoreDatils);
    const { location: { pathname } } = history;
    expect(pathname).toBe(`/pokemons/${id}`);

    expect(linkMoreDatils).not.toBeInTheDocument();

    expect(screen.getByRole('heading', { name: `${name} Details` }));

    const summaryHeading = screen.getByRole('heading', { name: 'Summary' });
    expect(summaryHeading).toBeInTheDocument();

    const paragraphOfSummary = screen.getByText(summary);
    expect(paragraphOfSummary).toBeInTheDocument();
  });

  test('check if there is a section on the page with maps with pokemon locations', () => {
    renderWithRouter(<App />);
    const linkMoreDatils = screen.getByText(/more details/i);
    const { name, foundAt } = pokemon[0];

    userEvent.click(linkMoreDatils);
    const locationHaeading = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${name}`,
    });
    expect(locationHaeading).toBeInTheDocument();

    foundAt.forEach(({ location }) => {
      expect(screen.getByText(location)).toBeInTheDocument();
    });

    const imageLocation = screen.getAllByAltText(`${name} location`);
    foundAt.forEach(({ map }, index) => {
      expect(imageLocation[index]).toHaveAttribute('src', map);
    });

    imageLocation.forEach((img) => {
      expect(img).toHaveAttribute('alt', `${name} location`);
    });
  });

  test('testing whether the user can favor a Pokémon through the details page', () => {
    renderWithRouter(<App />);
    const linkMoreDatils = screen.getByText(/more details/i);
    const { name } = pokemon[0];

    userEvent.click(linkMoreDatils);

    const checkBoxFavorite = screen.getByRole('checkbox', { checked: false });
    expect(checkBoxFavorite).toBeInTheDocument();

    userEvent.click(checkBoxFavorite);
    expect(checkBoxFavorite).toBeChecked(true);

    const imgFavorite = screen.getByRole('img', {
      name: `${name} is marked as favorite`,
    });
    expect(imgFavorite).toBeInTheDocument();

    const labelInputFavorite = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(labelInputFavorite).toBeInTheDocument();
  });
});
