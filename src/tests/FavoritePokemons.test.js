import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouters';
import { FavoritePokemons } from '../components';
import data from '../data';
import App from '../App';

describe('Teste requisito 3 FavoritePokemons.js', () => {
  test(
    'Teste mensagem favoritePokemonFound, se não tiver pokémons favoritos.', () => {
      const { getByText } = renderWithRouter(<FavoritePokemons />);
      expect(getByText('No favorite pokemon found')).toBeInTheDocument();
    },
  );

  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { getByText, getByTestId, getByLabelText } = renderWithRouter(
      <App />,
    );
    const { averageWeight: { value, measurementUnit } } = data[0];

    const details = getByText('More details');
    userEvent.click(details);

    const input = getByLabelText('Pokémon favoritado?');
    userEvent.click(input);

    expect(input).toBeChecked();

    const link = getByText('Favorite Pokémons');
    userEvent.click(link);

    const name = getByTestId('pokemon-name');
    const type = getByTestId('pokemon-type');
    const weight = getByTestId('pokemon-weight');

    expect(name).toHaveTextContent(data[0].name);
    expect(type).toHaveTextContent(data[0].type);
    expect(weight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
  });

  test('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);

    const details = getByText('More details');
    userEvent.click(details);

    const input = getByLabelText('Pokémon favoritado?');
    userEvent.click(input);
    expect(input).not.toBeChecked();

    const link = getByText('Favorite Pokémons');
    userEvent.click(link);

    const notFound = getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });
});
