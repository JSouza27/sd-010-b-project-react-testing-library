import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Encountered pokémons/i);
  expect(heading).toBeInTheDocument();
});

test('botao total de bottons na tela ', () => {
  const { getByText } = renderWithRouter(<App />);

  const pokemon = getByText(/Pikachu/i);
  expect(pokemon).toBeInTheDocument();
  const buttonProximo = getByText(/Próximo pokémon/i);
  fireEvent.click(buttonProximo);
  const pokemon2 = getByText(/Charmander/i);
  expect(pokemon2).toBeInTheDocument();
});

test('botton por tipo de pokemon', () => {
  const { getByText } = renderWithRouter(<App />);

  const pokemon = getByText(/Pikachu/i);
  expect(pokemon).toBeInTheDocument();
  const buttonProximo = getByText(/Fire/i);
  fireEvent.click(buttonProximo);
  const pokemon2 = getByText(/Charmander/i);
  expect(pokemon2).toBeInTheDocument();
});

test('numero de bottons na tela', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const totalButtons = 7;
  const buttonsNaTela = getAllByTestId(/pokemon-type-button/i);
  expect(buttonsNaTela.length).toBe(totalButtons);
});

test('botao All executado com exito ', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);
  const AllButton = getByText(/all/i);
  expect(AllButton).toBeInTheDocument();
  fireEvent.click(AllButton);
  const firstPokemon = getByTestId('pokemon-name').textContent;
  expect(firstPokemon).toBe('Pikachu');
});
