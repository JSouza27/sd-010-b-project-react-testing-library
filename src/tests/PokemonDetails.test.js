import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
// import { PokemonDetails } from '../components';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';

describe('Testa o componente <PokemonDetails.js />', () => {
  test('Testa se as informações do Pokémon selecionado são mostradas.', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const details = /More details/i;
    const { name } = pokemons[0];
    fireEvent.click(getByText(details));
    const heading = getByRole('heading', {
      level: 2,
      name: `${name} Details`,
    });
    expect(heading).toBeInTheDocument();
    expect(getByRole('heading', {
      level: 2,
      name: /Summary/i,
    })).toBeInTheDocument();
    expect(getByRole('heading', {
      level: 2,
      name: `Game Locations of ${name}`,
    })).toBeInTheDocument();
  });

  test('Testa se não há um link de navegação para os detalhes do Pokémon.', () => {
    const { queryByText } = renderWithRouter(<App pokemons={ pokemons } />);
    const details = /More details/i;
    fireEvent.click(queryByText(details));
    expect(queryByText(details)).toBeNull();
  });

  test('A seção de detalhes deve conter um parágrafo com o resumo do Pokémon.', () => {
    const { queryByText } = renderWithRouter(<App />);
    const details = /More details/i;
    fireEvent.click(queryByText(details));
    const paragraph = queryByText((params, tag) => tag.tagName === 'P'
     && params.includes('This intelligent Pokémon'));
    expect(paragraph).toBeInTheDocument();
  });

  test('Testa se existe uma seção com os mapas contendo as localizações do Poke.', () => {
    const { queryByText, getAllByAltText } = renderWithRouter(<App />);
    const details = /More details/i;
    fireEvent.click(queryByText(details));
    const { foundAt, name } = pokemons[0];
    foundAt.forEach(({ location, map }, id) => {
      expect(queryByText(location));
      const img = getAllByAltText(`${name} location`)[id];
      expect(img).toHaveAttribute('src', map);
    });
  });

  test('Testa se o usuário pode favoritar um pokémon através da página detalhes.', () => {
    const { getByText, getByRole, getByLabelText, queryByAltText } = renderWithRouter(
      <App />,
    );
    const details = /More details/i;
    fireEvent.click(getByText(details));
    expect(getByLabelText('Pokémon favoritado?')).toBeInTheDocument();
    fireEvent.click(getByRole('checkbox'));
    expect(queryByAltText(/marked/)).toBeInTheDocument();
    fireEvent.click(getByRole('checkbox'));
    expect(queryByAltText(/marked/)).toBeNull();
  });
});
