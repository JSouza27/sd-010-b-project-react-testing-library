import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente <PokemonDetails.js />', () => {
  test('Verifica informações do Pokémon selecionado são mostradas na tela.', () => {
    const history = createMemoryHistory();
    const { getByRole, queryByText } = render(
      <Router history={ history }>
        <App pokemons={ pokemons } />
      </Router>,
    );
    const moreDetailsLink = getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetailsLink);

    const pokemonDetails = getByRole('heading', ({
      name: /pikachu details/i,
      level: 2,
    }));

    const summaryTitle = getByRole('heading', ({
      name: /summary/i,
      level: 2,
    }));

    const pokemonInformation = queryByText(/This intelligent Pokémon roasts hard/i);

    expect(pokemonDetails).toBeInTheDocument();
    expect(moreDetailsLink).not.toBeInTheDocument();
    expect(summaryTitle).toBeInTheDocument();
    expect(pokemonInformation).toBeInTheDocument();
  });

  test('Verifica se existe uma seção com os mapas contendo as localizações', () => {
    const history = createMemoryHistory();
    const { getByRole, getAllByAltText, getByText } = render(
      <Router history={ history }>
        <App pokemons={ pokemons } />
      </Router>,
    );
    const moreDetailsLink = getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetailsLink);

    const gameLocation = getByRole('heading', {
      name: /Game Locations of Pikachu/i,
    });
    expect(gameLocation).toBeInTheDocument();

    const locations = getAllByAltText(/pikachu location/i);
    expect(locations.length).toEqual(2);

    const locationsNameOne = getByText(/Kanto Viridian Forest/i);
    expect(locationsNameOne).toBeInTheDocument();
    const locationsNameTwo = getByText(/Kanto Power Plant/i);
    expect(locationsNameTwo).toBeInTheDocument();

    expect(locations[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locations[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('Verifica se pode favoritar um pokémon através da página de detalhes.', () => {
    const history = createMemoryHistory();
    const { getByRole, getByLabelText, getByAltText } = render(
      <Router history={ history }>
        <App pokemons={ pokemons } />
      </Router>,
    );
    const moreDetailsLink = getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetailsLink);

    const favorite = getByLabelText(/Pokémon favoritado?/i);
    expect(favorite).toBeInTheDocument();

    userEvent.click(favorite);

    const starFavorite = getByAltText(/Pikachu is marked as favorite/i);
    expect(starFavorite).toBeInTheDocument();

    userEvent.click(favorite);
    expect(starFavorite).not.toBeInTheDocument();
  });
});
