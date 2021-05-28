import React from 'react';
import { fireEvent } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import data from '../data';
import Pokemon from '../components/Pokemon';
import App from '../App';

test('Testando o component pokemon', () => {
  const { getByText, getByAltText } = renderWithRouter(<Pokemon pokemon={ data[0] } />);
  const { averageWeight, name, type, image } = data[0];
  const { measurementUnit, value } = averageWeight;

  const getPokeName = getByText(`${name}`);
  const getPokeType = getByText(`${type}`);
  const getPokeWeight = getByText(`Average weight: ${value} ${measurementUnit}`);
  const getPokeImg = getByAltText(`${name} sprite`);

  expect(getPokeName).toBeInTheDocument();
  expect(getPokeType).toBeInTheDocument();
  expect(getPokeWeight).toBeInTheDocument();
  expect(getPokeImg).toBeInTheDocument();
  expect(getPokeImg.src).toEqual(`${image}`);
});

test('Teste Link para página Details', () => {
  const { getByText, history } = renderWithRouter(<Pokemon pokemon={ data[0] } />);
  fireEvent.click(getByText(/more details/i));

  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
});

test('Verifica o icone de favorito', () => {
  const { name } = data[0];
  const { getByRole, getByAltText } = renderWithRouter(<App />);
  const getLink = getByRole('link', { name: /more details/i });

  userEvent.click(getLink);
  const getFavorite = getByRole('checkbox');

  expect(getFavorite).toBeInTheDocument();

  userEvent.click(getFavorite);
  expect(getFavorite.checked).toEqual(true);

  const star = getByAltText(`${name} is marked as favorite`);
  expect(star).toBeInTheDocument();

  const link = '/star-icon.svg';
  expect(star).toHaveAttribute('src', link);
});
