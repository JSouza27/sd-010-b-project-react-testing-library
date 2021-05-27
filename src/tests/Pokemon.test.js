import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testes do sexto requisito ', () => {
  test('O nome correto do Pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<App />);
    const namePokemon = screen.getByTestId('pokemon-name');
    const { name } = pokemons[0];

    expect(namePokemon).toHaveTextContent(name);
  });

  test('O tipo correto do pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<App />);
    const typePokemon = screen.getByTestId('pokemon-type');
    const { type } = pokemons[0];

    expect(typePokemon).toHaveTextContent(type);
  });

  test('O peso deve ser mostrado de forma correta', () => {
    renderWithRouter(<App />);
    const { averageWeight: { value, measurementUnit } } = pokemons[0];
    const weightText = `Average weight: ${value} ${measurementUnit}`;
    const testId = screen.getByTestId('pokemon-weight');

    expect(testId).toHaveTextContent(weightText);
  });

  test('A imagem do Pokémon deve ser exibida', () => {
    renderWithRouter(<App />);
    const { image, name } = pokemons[0];
    const img = screen.getByRole('img');

    expect(img).toHaveAttribute('src', image);
    expect(img).toHaveAttribute('alt', `${name} sprite`);
  });

  test('O card do Pokémon indicado na Pokédex contém um link detalhes', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByText('More details');
    const { id } = pokemons[0];

    expect(detailsLink).toHaveAttribute('href', `/pokemons/${id}`);
  });

  test('Ao clicar no link de navegação, é feito o redirecionamento para detalhe ', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByText('More details');
    const { name } = pokemons[0];
    fireEvent.click(detailsLink);
    const textName = screen.getByText(name);

    expect(textName).toBeInTheDocument();
  });
});
