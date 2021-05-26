import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';

const ARR_BTNS = 'pokemon-type-button';

test('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByRole('heading', { level: 2 });
  expect(heading).toHaveTextContent(/Encountered pokémons/i);
});

test('exibe o próximo Pokémon da lista quando o botão Próximo pokémon é clicado', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  // const nextBtn = getByTestId('next-pokemon');
  const nextBtn = getByRole('button', { name: /Próximo pokémon/i });
  fireEvent.click(nextBtn, () => {
    pokemons.forEach((elem, index) => {
      expect(pokemons[index].name).toBeInTheDocument();
    });
  });
});

test('Teste se é mostrado apenas um Pokémon por vez', () => {
  const { getAllByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const element = getAllByTestId('pokemon-weight');
  expect(element.length).toEqual(1);
});

test('Teste se a Pokédex tem os botões de filtro', () => {
  const { getAllByTestId, getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const element = getAllByTestId(ARR_BTNS);
  const type = getByTestId('pokemon-type');
  element.forEach((btn) => {
    fireEvent.click(btn);
    expect(type.textContent).toEqual(btn.textContent);
  });
});

test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  const { getAllByTestId, getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const btnAll = getByText('All');
  const element = getAllByTestId(ARR_BTNS);
  fireEvent.click(btnAll);
  expect(pokemons.length - 2).toEqual(element.length);
});

test('botão de Próximo fica desabilitado se a lista tiver um só pokémon.', () => {
  const { getByTestId, getByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const nextBtn = getByTestId('next-pokemon');
  const btnEletric = getByRole('button', { name: /Electric/i });
  fireEvent.click(btnEletric);
  expect(nextBtn).toHaveAttribute('disabled');
});

test(' um botão de filtro para cada tipo de Pokémon.', () => {
  const { getAllByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const arrType = pokemons.map((item) => item.type);
  const arrTypeFinal = [...new Set(arrType)];
  const element = getAllByTestId(ARR_BTNS);
  expect(element.length).toEqual(arrTypeFinal.length);
});
// Teste se é exibido o próximo Pokémon da lista quando o botão Próximo pokémon é clicado.
// O botão deve conter o texto Próximo pokémon;
// Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;
// O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista;
