import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Testando toda a aplicação da tela Pokemon', () => {
  it('Verifica info dos Pokémons', () => {
    const { getByTestId } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />);
    const pokemonName = getByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemon-type');
    const pokemonWeight = getByTestId('pokemon-weight');
    expect(pokemonName).toHaveTextContent(`${pokemons[0].name}`);
    expect(pokemonType).toHaveTextContent(`${pokemons[0].type}`);
    expect(pokemonWeight).toHaveTextContent(
      `Average weight: ${pokemons[0]
        .averageWeight.value} ${pokemons[0]
        .averageWeight.measurementUnit}`,
    );
  });

  it('Verifica link More Details', () => {
    const { getByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />);
    const pathnameLink = getByRole('link');

    expect(pathnameLink.href).toBe(`http://localhost/pokemons/${pokemons[0].id}`);
  });

  it('Verifica ícone pokemon favorito', () => {
    const { getByAltText } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />);
    const icon = getByAltText(/is marked as favorite/i);
    expect(icon.src).toBe('http://localhost/star-icon.svg');
  });

  it('Verifica imagem pokemon', () => {
    const { getByAltText } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />);
    const imagem = getByAltText(/sprite/i);
    expect(imagem.src).toBe(`${pokemons[0].image}`);
    expect(imagem.alt).toBe(`${pokemons[0].name} sprite`);
  });
});
