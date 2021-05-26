import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import listaPokemons from '../data';

// test('', () => {});
describe('Teste o componente <Pokemon.js />', () => {
  it('O nome correto do Pokémon deve ser mostrado na tela', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const name = getByTestId('pokemon-name');
    expect(name).toHaveTextContent(/Pikachu/i);
  });

  it('O tipo correto do pokémon deve ser mostrado na tela', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const type = getByTestId('pokemon-type');
    expect(type).toHaveTextContent(/electric/i);
  });

  it('O peso médio do pokémon deve ser exibido', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const weight = getByTestId('pokemon-weight');
    expect(weight).toHaveTextContent('Average weight: 6.0 kg');
  });

  it('A imagem do Pokémon deve ser exibida', () => {
    const { getByAltText } = renderWithRouter(<App />);
    const imagem = getByAltText('Pikachu sprite');
    expect(imagem).toBeInTheDocument();
    expect(imagem).not.toHaveAttribute('src', '');
  });
});

// REFERÊNCIA EMERSON SATURNINO
it('Teste se o card contém um link de navegação para exibir detalhes', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const link = getByText('More details');
  expect(link).toHaveAttribute('href', '/pokemons/25');
  userEvent.click(link);
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
});

// it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
//   const { getByText, history } = renderWithRouter(<App />);
//   const link = getByText('More details');
//   expect(link).toHaveAttribute('href', '/pokemons/25');
//   userEvent.click(link);
//   const { pathname } = history.location;
//   expect(pathname).toBe('/pokemons/25');
// });

//   it('Os próximos Pokémons da lista devem ser mostrados', () => {
//     const { getByText } = renderWithRouter(<App />);
//     const button = getByText(texto);
//     userEvent.click(button);
//     const next = getByText(/charmander/i);
//     expect(next).toBeInTheDocument();

//     userEvent.click(button);
//     const next2 = getByText(/caterpie/i);
//     expect(next2).toBeInTheDocument();
//   });

//   it('Mostra o primeiro Pokémon da lista, se estiver no último', () => {
//     const { getByText } = renderWithRouter(<App />);
//     const button = getByText(texto);

//     const cliques = 9;
//     for (let i = 0; i < cliques; i += 1) {
//       userEvent.click(button);
//     }

//     const next = getByText(/pikachu/i);
//     expect(next).toBeInTheDocument();
//   });
// });

// it('Teste se é mostrado apenas um Pokémon por vez', () => {
//   const { getAllByTestId } = renderWithRouter(<App />);
//   const pokemon = getAllByTestId('pokemon-name');
//   expect(pokemon.length).toBe(1);
// });

// describe('Teste se a Pokédex tem os botões de filtro', () => {
//   it('a Pokédex deve circular somente pelos pokémons do tipo filtrado', () => {
//     const { getAllByTestId, getByText } = renderWithRouter(<App />);
//     const button = getAllByTestId(texto2);
//     userEvent.click(button[0]);
//     const pokemon = getByText(/pikachu/i);
//     expect(pokemon).toBeInTheDocument();

//     userEvent.click(button[1]);
//     const pokemon1 = getByText(/charmander/i);
//     expect(pokemon1).toBeInTheDocument();

//     const button2 = getByText(texto);
//     userEvent.click(button2);
//     const next2 = getByText(/rapidash/i);
//     expect(next2).toBeInTheDocument();
//   });

//   // REFERÊNCIA: EMERSON SATURNINO
//   it('O texto do botão deve corresponder ao nome do tipo', () => {
//     const { getAllByTestId } = renderWithRouter(<App />);
//     const button = getAllByTestId(texto2);

//     const tipos = [
//       'Electric',
//       'Fire',
//       'Bug',
//       'Poison',
//       'Psychic',
//       'Normal',
//       'Dragon',
//     ];

//     button.forEach((buttons, index) => {
//       expect(buttons.textContent).toBe(tipos[index]);
//     });
//   });
// });

// describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
//   it('O texto do botão deve ser All', () => {
//     const { getAllByRole } = renderWithRouter(<App />);
//     const button = getAllByRole('button');
//     expect(button[0]).toHaveTextContent('All');
//   });

//   it('deverá mostrar os Pokémons normalmente quando o botão All for clicado', () => {
//     const { getAllByRole, getByText } = renderWithRouter(<App />);
//     const button = getAllByRole('button');
//     userEvent.click(button[0]);

//     const proxPoke = getByText(texto);
//     userEvent.click(proxPoke);
//     const next = getByText(/charmander/i);
//     expect(next).toBeInTheDocument();
//   });

//   it('Ao carregar a página, o filtro selecionado deverá ser All', () => {
//     const { getByText } = renderWithRouter(<App />);

//     const proxPoke = getByText(texto);
//     userEvent.click(proxPoke);
//     const next = getByText(/charmander/i);
//     expect(next).toBeInTheDocument();
//   });
// });

// describe('Teste se é criado um botão de filtro para cada tipo de Pokémon', () => {
//   // it('Os botões de filtragem devem ser dinâmicos', () => {

//   // });

//   it('Deve existir um botão de filtragem para cada tipo de Pokémon', () => {
//     const { getAllByTestId } = renderWithRouter(<App />);
//     const button = getAllByTestId(texto2);
//     const number = 7;
//     expect(button.length).toBe(number);
//   });

//   it('Deve ser mostrado como opção de filtro, um botão para cada um dos tipos', () => {
//     const { getAllByTestId } = renderWithRouter(<App />);
//     const button = getAllByTestId(texto2);
//     expect(button[0]).toHaveTextContent('Electric');
//     expect(button[1]).toHaveTextContent('Fire');
//     expect(button[2]).toHaveTextContent('Bug');
//     expect(button[3]).toHaveTextContent('Poison');
//     expect(button[4]).toHaveTextContent('Psychic');
//     expect(button[5]).toHaveTextContent('Normal');
//     expect(button[6]).toHaveTextContent('Dragon');
//   });
// });

// it('O botão de Próximo pokémon deve ser desabilitado quando tiver um pokémon', () => {
//   const { getAllByRole, getByText } = renderWithRouter(<App />);
//   const button = getAllByRole('button');
//   userEvent.click(button[1]);

//   const proxPoke = getByText(texto);
//   expect(proxPoke).toBeDisabled();

//   userEvent.click(button[3]);

//   expect(proxPoke).toBeDisabled();
// });
