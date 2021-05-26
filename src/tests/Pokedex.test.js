import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithMemoryRouter from './renderWithMemoryRouter';

describe('Requisito 5', () => {
  it('Testa se página contém um heading h2', () => {
    const { getByRole } = renderWithMemoryRouter(<App />);
    const heading = getByRole('heading', { level: 2, name: /Encountered pokémons/i });
    expect(heading).toBeInTheDocument();
  });
  it('Teste se é exibido o próximo Pokémon da lista', () => {
    const { getByRole } = renderWithMemoryRouter(<App />);
    const button = getByRole('button', { name: /Próximo pokémon/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
  });
  it('Testa se a Pokédex contém um botão para resetar o filtro.', () => {
    const { getByText } = renderWithMemoryRouter(<App />);
    const button = getByText('All');
    fireEvent.click(button);
  });
  it('Teste se a Pokédex tem os botões de filtro', () => {
    const { getAllByTestId } = renderWithMemoryRouter(<App />);
    const buttonsFilter = getAllByTestId('pokemon-type-button');
    expect(buttonsFilter[0]).toBeInTheDocument();
    fireEvent.click(buttonsFilter[0]);
    expect(buttonsFilter[0].innerHTML).toBe('Electric');
  });
});
