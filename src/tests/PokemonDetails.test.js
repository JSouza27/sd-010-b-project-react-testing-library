import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../helpers/renderWithRouters';
import App from '../App';
import data from '../data';

const moreDetails = 'More details';

describe('Test requisito 7 PokemonDetails.js', () => {
  test(`'Teste se as informações detalhadas do Pokémon 
    selecionado são mostradas na tela.'`, () => {
    const { getByText } = renderWithRouter(<App />);

    const details = getByText(moreDetails);
    expect(details).toBeInTheDocument();
    fireEvent.click(details);

    const pokemonDetails = getByText(`${data[0].name} Details`);
    const summary = getByText('Summary');
    const resume = getByText(data[0].summary);

    expect(pokemonDetails).toBeInTheDocument();
    expect(details).not.toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(resume).toBeInTheDocument();
  });

  test(`'Teste se existe na página uma seção com os mapas 
    contendo as localizações do pokémon'`, () => {
    const { getByText,
      getAllByAltText,
    } = renderWithRouter(<App />);

    const details = getByText(moreDetails);
    expect(details).toBeInTheDocument();
    fireEvent.click(details);

    const pokemonLocations = getByText(`Game Locations of ${data[0].name}`);
    expect(pokemonLocations).toBeInTheDocument();

    const img = getAllByAltText(`${data[0].name} location`);
    data[0].foundAt.forEach(({ location, map }, index) => {
      const locationText = getByText(location);
      expect(locationText).toBeInTheDocument();
      expect(img[index]).toBeInTheDocument();
      expect(img[index].src).toBe(map);
    });
  });

  test(`'Teste se o usuário pode favoritar um pokémon
   através da página de detalhes'`, () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);
    const details = getByText(moreDetails);
    expect(details).toBeInTheDocument();
    fireEvent.click(details);

    const input = getByLabelText('Pokémon favoritado?');
    expect(input.parentNode).toHaveTextContent('Pokémon favoritado?');
    fireEvent.click(input);
    expect(input).toBeChecked();

    fireEvent.click(input);
    expect(input).not.toBeChecked();
  });
});
