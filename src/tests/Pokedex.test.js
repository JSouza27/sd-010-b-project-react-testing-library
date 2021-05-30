// import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

// import Pokedex from '../components/Pokedex';
// import pokemons from '../data';

// test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
//   const { getByRole } = render(
//     <MemoryRouter>
//       <Pokedex />
//     </MemoryRouter>,
//   );
//   const headingTwo = getByRole('heading',
//     { level: 2, name: 'Encountered pokémons' });
//   expect(headingTwo).toBeInTheDocument();
// });

// test('Teste se é exibido o próximo Pokémon da lista quando o botão next pokémon click.',
//   () => {
//     const { getByRole, getByText } = render(
//       <MemoryRouter>
//         <Pokedex />
//       </MemoryRouter>,
//     );
//     const nextButton = getByRole('button',
//       { name: /Próximo pokémon/i });
//     userEvent.click(nextButton);
//     const nextPokemon = getByText(/pikachu/i);
//     expect(nextPokemon).toBeInTheDocument();
//   });
