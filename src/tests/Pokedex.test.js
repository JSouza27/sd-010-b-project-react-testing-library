import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithMemoryRouter from './renderWithRouter';

describe('Requisito 5', () => {
  it(' página contém um heading h2', () => {
    const { getByRole } = renderWithMemoryRouter(<App />);
    const heading = getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });
  it(' próximo Pokémon da lista', () => {
    const { getByRole } = renderWithMemoryRouter(<App />);
    const button = getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
  });
  it(' Pokédex contém um botão para resetar o filtro.', () => {
    const { getByText } = renderWithMemoryRouter(<App />);
    const button = getByText('All');
    fireEvent.click(button);
  });
  it(' Pokédex tem os botões de filtro', () => {
    const { getAllByTestId } = renderWithMemoryRouter(<App />);
    const buttonsFilter = getAllByTestId('pokemon-type-button');
    expect(buttonsFilter[0]).toBeInTheDocument();
    fireEvent.click(buttonsFilter[0]);
    expect(buttonsFilter[0].innerHTML).toBe('Electric');
  });
});

// ajuda do colega zozimo
