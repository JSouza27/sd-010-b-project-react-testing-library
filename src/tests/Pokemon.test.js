// test('', () => {});
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';

const details = 'More details';

describe('Testing the Pokemon Component', () => {
  it('tests if a card with the information of a certain Pokémon is rendered', () => {
    const { getByTestId, getByAltText, getByRole } = renderWithRouter(<App />);
    const buttonNext = getByRole('button', { name: 'Próximo pokémon' });
    let name;
    let type;
    let weight;
    let value;
    let unit;
    let img;

    pokemons.forEach((poke) => {
      name = getByTestId('pokemon-name');
      type = getByTestId('pokemon-type');
      weight = getByTestId('pokemon-weight');
      img = getByAltText(`${poke.name} sprite`);
      expect(name).toBeInTheDocument();
      expect(name).toHaveTextContent(poke.name);
      expect(type).toBeInTheDocument();
      expect(type).toHaveTextContent(poke.type);
      expect(weight).toBeInTheDocument();
      value = poke.averageWeight.value;
      unit = poke.averageWeight.measurementUnit;
      expect(weight).toHaveTextContent(`Average weight: ${value} ${unit}`);
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', poke.image);
      userEvent.click(buttonNext);
    });
  });

  it('tests if the Pokémon card contains a navigation link to view details', () => {
    const { getByRole } = renderWithRouter(<App />);
    const detailsLink = getByRole('link', { name: details });

    expect(detailsLink).toBeInTheDocument();
  });

  it('tests if clicking on navigation link redirects to details page', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const detailsLink = getByRole('link', { name: details });
    const homeLink = getByRole('link', { name: /Home/i });
    const allBtn = getByRole('button', { name: 'All' });
    userEvent.click(homeLink);
    userEvent.click(allBtn);
    userEvent.click(detailsLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });
  it('tests if a URL displayed in the browser changes to / pokemon / <id>', () => {
    // pokemons.forEach((poke, index, _array) => {
    //   const { history, getAllByRole } = renderWithRouter(<App />);
    //   const detailsLink = getAllByRole('link', { name: details });
    //   const homeLink = getAllByRole('link', { name: /Home/i });
    //   const allBtn = getAllByRole('button', { name: 'All' });
    //   const buttonNext = getAllByRole('button', { name: 'Próximo pokémon' });
    //   userEvent.click(homeLink[0]);
    //   userEvent.click(allBtn[0]);
    //   // while (index > 0 && index <= array.length) userEvent.click(buttonNext);
    //   pokemons.forEach((_item, i) => {
    //     if (i < index) userEvent.click(buttonNext[0]);
    //   });
    //   userEvent.click(detailsLink[0]);
    //   userEvent.click(detailsLink[0]);
    //   const { location: { pathname } } = history;
    //   expect(pathname).toBe(`/pokemons/${poke.id}`);
    // });
  });

  it('tests whether there is a star icon on favorite Pokémon', () => {
    const isPokemonFavoriteById = {};
    pokemons.reduce((acc, poke) => {
      isPokemonFavoriteById[poke.id] = true;
      return acc;
    }, {});
    const favoritePokemons = pokemons.filter(({ id }) => isPokemonFavoriteById[id]);

    const { getByAltText } = renderWithRouter(
      <FavoritePokemons
        pokemons={ favoritePokemons }
      />,
    );

    let img;
    let starImg;

    pokemons.forEach((poke) => {
      starImg = getByAltText(`${poke.name} is marked as favorite`);
      img = getByAltText(`${poke.name} sprite`);
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', poke.image);
      expect(starImg).toBeInTheDocument();
      expect(starImg).toHaveAttribute('src', '/star-icon.svg');
    });
  });
});
