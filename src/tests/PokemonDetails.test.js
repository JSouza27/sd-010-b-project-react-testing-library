import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente PokemonDetails', () => {
  it('Testa se as informações detalhadas do Pokémon são mostradas na tela', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    const details = getByRole('heading', { name: 'Pikachu Details' });
    expect(details).toBeInTheDocument();
    const summary = getByRole('heading', { name: 'Summary', level: 2 });
    expect(summary).toBeInTheDocument();
    expect(getByText(/roasts hard berries/i)).toBeInTheDocument();
  });
});
