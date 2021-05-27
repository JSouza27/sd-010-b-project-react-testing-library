import { fireEvent } from '@testing-library/dom';
import React from 'react';
import { Pokemon } from '../components';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';

describe('Teste o componente <Pokemon.js />', () => {
  test('Testa se é renderizado um card com as informações do pokémon.', () => {
    const { getByText, getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite />,
    );
    const { name, type, averageWeight: { value, measurementUnit }, image } = pokemons[0];
    expect(getByText(name)).toBeInTheDocument();
    expect(getByText(type)).toBeInTheDocument();
    expect(getByText(`Average weight: ${value} ${measurementUnit}`)).toBeInTheDocument();
    expect(getByText(/More details/i)).toBeInTheDocument();
    expect(getByText((params, { src }) => src === image)).toBeInTheDocument();
    expect(getByAltText(`${name} sprite`)).toBeInTheDocument();
  });

  test('A Pokédex contém um link para exibir detalhes. <id> é o id do Pokémon;', () => {
    const { getByText, history } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite />,
    );
    const { id } = pokemons[0];
    fireEvent.click(getByText(/More details/i));
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  test('Testa se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite />,
    );
    const getPokerVavorite = getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(getPokerVavorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
