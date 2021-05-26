import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('nome do pokemon correto', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);
  const nomePikachu = getByTestId(/pokemon-name/i);
  expect(nomePikachu).toBeInTheDocument();
  const nome = getByText(/Pikachu/i);
  expect(nome).toBeInTheDocument();
});

test('type do pokemon correto', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);
  const typePokemon = getByTestId(/pokemon-type/i);
  expect(typePokemon).toBeInTheDocument();
  const nome = getByText(/Electric/i);
  expect(nome).toBeInTheDocument();
});

test('weight do pokemon correto', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);
  const weigthPokemon = getByTestId(/pokemon-weight/i);
  expect(weigthPokemon).toBeInTheDocument();
  const nome = getByText(/Average weight: 6.0 kg/i);
  expect(nome).toBeInTheDocument();
});
