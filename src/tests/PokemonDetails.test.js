import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../helpers/renderWithRouters';
import App from '../App';
import data from '../data';

describe('Test requisito 7 PokemonDetails.js', () => {
  const moreDetails = 'More details';
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
});
