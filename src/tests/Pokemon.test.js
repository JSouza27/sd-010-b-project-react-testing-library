import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações do pokémon.', () => {
    const history = createMemoryHistory();
    const { queryByTestId, getByAltText } = render(
      <Router history={ history }>
        <App pokemons={ pokemons } />
      </Router>,
    );
    const pokemonName = queryByTestId('pokemon-name');
    const pokemonType = queryByTestId('pokemon-type');
    const pokemonWeight = queryByTestId('pokemon-weight');
    const pokemonImage = getByAltText('Pikachu sprite');

    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(pokemonImage.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Verifica se existe um link de navegação de detalhes', () => {
    const history = createMemoryHistory();
    const { getByRole } = render(
      <Router history={ history }>
        <App pokemons={ pokemons } />
      </Router>,
    );
    const moreDetailLink = getByRole('link', {
      name: /more details/i,
    });
    const pokeCardHref = moreDetailLink.href;
    expect(moreDetailLink).toBeInTheDocument();

    expect(pokeCardHref).toBe(`http://localhost/pokemons/${pokemons[0].id}`);
  });

  test('Teste se ao clicar no link de navegação é redirecionado para detalhe', () => {
    const history = createMemoryHistory();
    const { getByRole } = render(
      <Router history={ history }>
        <App pokemons={ pokemons } />
      </Router>,
    );
    const moreDetailLink = getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetailLink);

    const pokemonDetails = getByRole('heading', {
      name: /Pikachu Details/i,
      level: 2,
    });

    expect(pokemonDetails).toBeInTheDocument();
  });

  test('Verifica a URL do navegador', () => {
    const history = createMemoryHistory();
    const { getByRole } = render(
      <Router history={ history }>
        <App pokemons={ pokemons } />
      </Router>,
    );
    const moreDetailLink = getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetailLink);
    expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const history = createMemoryHistory();
    const { getByRole, getByText, getByAltText } = render(
      <Router history={ history }>
        <App pokemons={ pokemons } />
      </Router>,
    );
    const moreDetailLink = getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetailLink);

    const favorite = getByText(/Pokémon favoritado?/i);
    expect(favorite).toBeInTheDocument();
    userEvent.click(favorite);

    const home = getByRole('link', {
      name: /home/i,
    });
    userEvent.click(home);

    const starFavorite = getByAltText('Pikachu is marked as favorite');
    expect(starFavorite).toBeInTheDocument();
    expect(starFavorite.src).toContain('/star-icon.svg');
  });
});
