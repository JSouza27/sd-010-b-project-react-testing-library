import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Testa o arquivo Pokedex', () => {
  it('testa se há o texto Encountered pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    const mensagemEsperada = getByText(/Encountered pokémons/);
    expect(mensagemEsperada).toBeInTheDocument();
  });

  it('testa se o botão tem o texto Próximo pokémon', () => {
    const { getByText } = renderWithRouter(<App />);

    const botaoEsperado = getByText('Próximo pokémon');
    expect(botaoEsperado).toBeInTheDocument();
  });

  it('testa se o botão All existe', () => {
    const { getByText } = renderWithRouter(<App />);

    const botaoEsperado = getByText('All');
    expect(botaoEsperado).toBeInTheDocument();
  });

  it('testa se existe o botão que filtra os pokemons por tipo', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const botaoEsperado = getAllByTestId('pokemon-type-button');
    expect(botaoEsperado[0]).toBeInTheDocument();
  });

  it('testa se existe o botão que filtra os pokemons do tipo eletrico', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const botaoEsperado = getAllByTestId('pokemon-type-button');
    expect(botaoEsperado[0]).toHaveTextContent('Electric');
  });

  it('testa a exibição dos pokemons sem filtros', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const botaoAll = getByRole('button', { name: 'All' });
    fireEvent.click(botaoAll);
    const botaoProximo = getByText('Próximo pokémon');
    fireEvent.click(botaoProximo);
    expect(getByText('Charmander')).toBeInTheDocument();
  });
});
