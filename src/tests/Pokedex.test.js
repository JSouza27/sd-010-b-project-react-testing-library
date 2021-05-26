import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import { Pokedex } from '../components';
import data from '../data';

describe('Testar o Pokedex.js', () => {
  test('Verifica se o titulo "Encountered pokémons" renderiza', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Encountered pokémons/i);
    expect(heading).toBeInTheDocument();
  });

  test('Testa se é exibido o próximo Pokémon clicando em proximo pokémon.', () => {
    const { getByText } = renderWithRouter(<App />);

    const quantity = data.length;

    for (let index = 0; index < quantity; index += 1) {
      const buttonNext = screen.getByRole('button', {
        name: /Próximo pokémon/i,
      });
      userEvent.click(buttonNext);
    }

    const firstPokemon = getByText(/Pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
  });

  test('Verifica se é exibido um pokémon por vez.', () => {
    const { getByText } = renderWithRouter(<App />);

    const oneDetails = getByText(/More details/i);
    expect(oneDetails).toBeInTheDocument();
  });

  test('Testando os botões filtro fire e all.', () => {
    const { getByText } = renderWithRouter(<App />);

    const typeFire = screen.getByRole('button', {
      name: /Fire/i,
    });
    userEvent.click(typeFire);
    const Charmander = getByText(/Charmander/i);
    expect(Charmander).toBeInTheDocument();

    const nextPokemon = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    userEvent.click(nextPokemon);
    const Rapidash = getByText(/Rapidash/i);
    expect(Rapidash).toBeInTheDocument();

    const allPokemon = screen.getByRole('button', {
      name: /All/i,
    });
    userEvent.click(allPokemon);
    const Pikachu = getByText(/Pikachu/i);
    expect(Pikachu).toBeInTheDocument();
  });

  // test('Teste se a Pokédex tem os botões de filtro.', () => {
  //   renderWithRouter(<App />);

  //   const typesPokemon = [];
  //   data.forEach(({ type }) => {
  //     if (!typesPokemon.includes(type)) {
  //       typesPokemon.push(type);
  //     }
  //   });

  //   data.forEach(({ type }) => {
  //     let quantity = 0;

  //     if (typesPokemon.includes(type)) {
  //       quantity += 1;
  //     }
  //     if (quantity > 1) {
  //       const buttonType = screen.getByRole('button', {
  //         name: type,
  //       });
  //       userEvent.click(buttonType);
  //       const buttonNext = screen.getByRole('button', {
  //         name: type,
  //       });
  //       userEvent.click(buttonNext);
  //       expect(type).toBeInTheDocument();
  //     }
  //   });
  // });

  // test('Testando se renderiza os pokémons favoritos', () => {
  //   renderWithRouter(<App />);

  //   const moreDetails = screen.getByRole('link', {
  //     name: /More details/i,
  //   });
  //   userEvent.click(moreDetails);

  //   const favorite = screen.getByRole('checkbox', {
  //     name: /Pokémon favoritado?/i,
  //   });
  //   userEvent.click(favorite);

  //   const clickFavorite = screen.getByRole('link', {
  //     name: /Favorite Pokémons/i,
  //   });
  //   userEvent.click(clickFavorite);

  //   const favoriteIcon = screen.getByRole('img', {
  //     name: /marked as favorite/i,
  //   });
  //   expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
  // });

  // test('verificando se tem pokemon dentro de FavoritePokemons', () => {
  //   renderWithRouter(<App />);

  //   const favoriteLink = screen.getByRole('link', {
  //     name: /Favorite Pokémons/i,
  //   });
  //   userEvent.click(favoriteLink);

  //   const { getByText } = render(<FavoritePokemons />);
  //   expect(getByText('No favorite pokemon found')).toBeDefined();
  // });
});
