import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

function details() {
  const { getByText } = renderWithRouter(<App />);
  const MoreDetails = getByText('More details');
  expect(MoreDetails).toBeInTheDocument();
  fireEvent.click(MoreDetails);
}

test('pagina de detalhes possui subtitulo correto', () => {
  details();
  const { getByText } = renderWithRouter(<App />);

  const mensagem = 'Game Locations of Pikachu';
  const text = getByText(mensagem);
  expect(text).toBeInTheDocument();
});

test('imagem na pagina de detalhes', () => {
  details();
  const { getAllByRole } = renderWithRouter(<App />);

  const img = getAllByRole('img');
  expect(img[1]).toBeInTheDocument();
  expect(img[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(img[1]).toHaveAttribute('alt', 'Pikachu location');
});

test('texto sumary', () => {
  details();
  const { getByText } = renderWithRouter(<App />);

  const sumary = getByText('Summary');
  expect(sumary).toBeInTheDocument();
});

test('texto Pokémon favoritado?', () => {
  details();
  const { getByText } = renderWithRouter(<App />);

  const textFavorite = getByText('Pokémon favoritado?');
  expect(textFavorite).toBeInTheDocument();
});

test('descriçao do pokemon', () => {
  details();
  const { getByText } = renderWithRouter(<App />);
  const description1 = 'This intelligent Pokémon roasts hard berries with electricity ';
  const description2 = 'to make them tender enough to eat.';
  const textFavorite = getByText(description1 + description2);
  expect(textFavorite).toBeInTheDocument();
});

test('Pokemon Name', () => {
  details();
  const { getByText } = renderWithRouter(<App />);

  const sumary = getByText('Pikachu Details');
  expect(sumary).toBeInTheDocument();
});
