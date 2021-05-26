import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { fireEvent, getByRole, render } from '@testing-library/react';
// import App from '../App';
import { FavoritePokemons } from '../components';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

test('Exibe a mensagem No favorite pokemon found, se não tiver favoritos', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
  const message = 'No favorite pokemon found';
  const messageElement = getByText(message);

  expect(messageElement).toBeInTheDocument();
});

test('Teste se é exibido todos os cards de pokémons favoritados', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

  pokemons.forEach((pokemon) => {
    const pokeName = pokemon.name;
    const pokeNameElement = getByText(pokeName);
    expect(pokeNameElement).toBeInTheDocument();
  });
});

// test('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {
//   const favPok = [
//     {
//       id: 25,
//       name: 'Pikachu',
//       type: 'Electric',
//       averageWeight: {
//         value: '6.0',
//         measurementUnit: 'kg',
//       },
//       image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
//       moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
//       foundAt: [
//         {
//           location: 'Kanto Viridian Forest',
//           map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
//         },
//         {
//           location: 'Kanto Power Plant',
//           map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
//         },
//       ],
//       summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
//     }];

//   const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ favPok } />);

// //   const pokeName = 'Charmander';
// //   const pokeNameElement = getByText('Charmander');
//   expect('Charmander').not.toBeInTheDocument();
// });
