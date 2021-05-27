import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

test('Testa se é renderizado um card com as informações de determinado pokémon', () => {
  const { getByTestId, getByText, getAllByRole } = renderWithRouter(<App />);

  const nameElement = getByTestId('pokemon-name');
  const typeElement = getByTestId('pokemon-type');
  const weightElement = getByTestId('pokemon-weight');
  const imgElement = getAllByRole('img')[0];
  //   const nextButton = getByText('Próximo pokémon');
  const allButton = getByText('All');
  fireEvent.click(allButton);

  const { averageWeight, name, type, image } = pokemons[0];
  const { measurementUnit, value } = averageWeight;

  expect(nameElement).toHaveTextContent(name);
  expect(typeElement).toHaveTextContent(type);
  expect(weightElement).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
  expect(imgElement).toHaveAttribute('src', image);
  expect(imgElement).toHaveAttribute('alt', `${name} sprite`);
});

test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
  const { history, getByText } = renderWithRouter(<App />);

  const { name, id } = pokemons[0];
  const linkElement = getByText('More details');
  fireEvent.click(linkElement);
  const headerDetails = getByText(`${name} Details`);
  expect(headerDetails).toBeInTheDocument();
  expect(history.location.pathname).toStrictEqual(`/pokemons/${id}`);
});

test('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
  const { getByText, getAllByRole } = renderWithRouter(<App />);

  const detailsButton = getByText('More details');
  fireEvent.click(detailsButton);

  const favoriteButton = getByText('Pokémon favoritado?');
  fireEvent.click(favoriteButton);

  const homeButton = getByText('Home');
  fireEvent.click(homeButton);

  const imgElement = getAllByRole('img')[1];
  const { name } = pokemons[0];

  expect(imgElement).toBeInTheDocument();
  expect(imgElement).toHaveAttribute('class', 'favorite-icon');
  expect(imgElement).toHaveAttribute('src', '/star-icon.svg');
  expect(imgElement).toHaveAttribute('alt', `${name} is marked as favorite`);
});
