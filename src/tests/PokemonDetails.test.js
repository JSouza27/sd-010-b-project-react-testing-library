// test('', () => {});
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

const details = 'More details';

describe('Testing the PokemonDetails Component', () => {
  it('tests if detailed information about the selected Pokémon is shown', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);

    const detailsLink = getByRole('link', { name: details });
    userEvent.click(detailsLink);

    const heading = getByRole('heading', { level: 2, name: 'Pikachu Details' });
    expect(heading).toBeInTheDocument();
    const headingSummary = getByRole('heading', { level: 2, name: 'Summary' });
    expect(headingSummary).toBeInTheDocument();

    const pikachuInfo = pokemons.filter((poke) => poke.name === 'Pikachu')[0].summary;
    const paragraph = getByText(pikachuInfo);
    expect(paragraph).toBeInTheDocument();
  });
  it('tests if there is a section with maps containing the locations', () => {
    const { getByRole, getByText, getAllByRole } = renderWithRouter(<App />);

    const detailsLink = getByRole('link', { name: details });
    userEvent.click(detailsLink);

    const heading = getByRole('heading', { level: 2, name: 'Game Locations of Pikachu' });
    expect(heading).toBeInTheDocument();

    const piKalocation = pokemons.filter((poke) => poke.name === 'Pikachu')[0].foundAt[0];
    const imageMapOne = getAllByRole('img', { alt: 'Pikachu location' })[1];
    expect(imageMapOne).toBeInTheDocument();
    expect(imageMapOne).toHaveAttribute('src', piKalocation.map);
    expect(getByText('Kanto Viridian Forest')).toBeInTheDocument();
  });
  it('tests if the user can favor a pokémon through the details page', () => {
    const { getByRole, getByLabelText, getByAltText } = renderWithRouter(<App />);

    const detailsLink = getByRole('link', { name: details });
    userEvent.click(detailsLink);

    const checkbox = getByRole('checkbox', { id: 'favorite' });
    expect(checkbox).toBeInTheDocument();

    const label = getByLabelText('Pokémon favoritado?');
    expect(label).toBeInTheDocument();

    userEvent.click(checkbox);
    const starImg = getByAltText('Pikachu is marked as favorite');
    expect(starImg).toBeInTheDocument();

    userEvent.click(checkbox);
    expect(starImg).not.toBeInTheDocument();
  });
});
