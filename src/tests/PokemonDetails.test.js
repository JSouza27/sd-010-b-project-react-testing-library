import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testes do requisito 7', () => {
  const MORE_DETAILS = 'More details';
  it('Teste se as informações detalhadas do Pokémon são mostradas na tela', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);

    const link = getByRole('link', {
      name: MORE_DETAILS,
    });

    expect(link).toBeInTheDocument();

    fireEvent.click(link);
    const text = getByText('Pikachu Details');
    expect(text).toBeDefined();
    expect(link).not.toBeInTheDocument();
  });

  it('Testa se seção de detalhes contem um heading h2 com o texto Summary', () => {
    const { getByRole } = renderWithRouter(<App />);

    const link = getByRole('link', {
      name: MORE_DETAILS,
    });

    fireEvent.click(link);

    const heading = getByRole('heading', {
      level: 2,
      name: 'Summary',
    });

    expect(heading).toBeDefined();
  });

  it('Testa se seção de detalhes tem um parágrafo com o resumo do Pokémon', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);

    const link = getByRole('link', {
      name: MORE_DETAILS,
    });
    fireEvent.click(link);

    const summary = getByText(pokemons[0].summary);
    expect(summary).toBeInTheDocument();
  });
});

describe('Teste se existe na página uma seção com os mapas de localizações', () => {
  const MORE_DETAILS = 'More details';
  it('Teste se deve existir um h2 com o texto Game Locations of <name>', () => {
    const { getByRole } = renderWithRouter(<App />);

    const link = getByRole('link', {
      name: MORE_DETAILS,
    });
    fireEvent.click(link);

    const headingLoc = getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });

    expect(headingLoc).toBeInTheDocument();
  });

  it('testa se todas as localizações do Pokémon são mostradas ', () => {
    const { getByRole, getAllByAltText } = renderWithRouter(<App />);

    const link = getByRole('link', {
      name: MORE_DETAILS,
    });
    fireEvent.click(link);

    const alt = getAllByAltText('Pikachu location');
    const found = pokemons[0].foundAt;

    expect(alt[0]).toHaveAttribute('src', found[0].map);
    expect(alt[1]).toHaveAttribute('src', found[1].map);
  });

  it('deve exibir um checkbox que permite favoritar o Pokémon', () => {
    const { getByRole, getByLabelText } = renderWithRouter(<App />);

    const link = getByRole('link', {
      name: MORE_DETAILS,
    });
    fireEvent.click(link);

    const checkbox = getByRole('checkbox');
    const labelText = getByLabelText('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();
    expect(labelText).toBeInTheDocument();
  });
});
