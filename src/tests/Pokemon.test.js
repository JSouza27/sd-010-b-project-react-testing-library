import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';
import { Pokemon } from '../components';

describe('', () => {
  it('testa se o nome e tipo correto do pokemon são exibidos na tela', () => {
    const { getByText, getByAltText } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />);
    const { name, type, averageWeight: { value, measurementUnit }, image } = pokemons[0];
    const imagemEsperada = getByAltText(`${name} sprite`);

    expect(getByText(name)).toBeInTheDocument();
    expect(getByText(type)).toBeInTheDocument();
    expect(getByText(`Average weight: ${value} ${measurementUnit}`)).toBeInTheDocument();
    expect(imagemEsperada).toBeInTheDocument();
    expect(imagemEsperada.src).toBe(image);
  });

  it('testa se há a imagem de pokemon favorito', () => {
    const { name } = pokemons[0];
    const { getByAltText } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />);
    // const botaoFavorito = getByLabelText('Pokémon favoritado?');
    // fireEvent.click(botaoFavorito);
    const imagemFavorito = getByAltText(`${name} is marked as favorite`);

    // Ambas resoluções servem, só não sei por que não consigo atribuir apenas o valor depois de localhost

    expect(imagemFavorito.src).toBe('http://localhost/star-icon.svg');
    // expect(imagemFavorito).toHaveAttribute('src', '/star-icon.svg');
  });

  it('testa se o link dos detlhes do pokemon renderiza corretamente', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const { id } = pokemons[0];

    fireEvent.click(getByText('More details'));
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });
});
