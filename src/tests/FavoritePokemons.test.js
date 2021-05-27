import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

// document.querySelectorAll('.pokemon')

describe(`3-
Check the message 'No favorite pokemon found'. 
Checks whether favorite pokemons are rendered. 
Check that there are no errors in the favorite action.`, () => {
  test('Check the mensage \'No favorite pokemon found\'', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <FavoritePokemons />
      </Router>,
    );
    // Se a lista de pokemons está vazia deve existir a mensagem.
    const mensageNoPokemons = document.querySelector('p').innerHTML;
    const pokemonsList = document.querySelectorAll('.pokemon').length;
    if (pokemonsList === 0) {
      expect(mensageNoPokemons).toMatch('No favorite pokemon found');
    } else {
      expect(pokemonsList).toBeGreaterThan(0);
    }
  });
  // Houve uma consulta no repositorio de Rafael Mathias
  // https://github.com/tryber/sd-010-b-project-react-testing-library/pull/37/commits/994483c79b05d98aac508afbf6dcbdf8af5ec01d
  test('Check if your favorite pokemons are rendered', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const moreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);

    const checkbox = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(checkbox);
    // Link para favoritos!
    const pokemonFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(pokemonFavorite);
    // Verifico se a classe pokemon existe e é maior que 0 pois favoritei o pikachu
    const pokemonNumber = document.querySelectorAll('.pokemon').length;
    // Apenas treinando com matchers e biblioteca por isso esta redundante.
    expect(pokemonNumber).toBeGreaterThan(0);
    expect(pokemonNumber).toBe(1);
    const pikachu = screen.getByRole('img', {
      name: 'Pikachu sprite',
    });
    // esperando que imagem seja a do pikachu
    expect(pikachu.src).toMatch('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
});
