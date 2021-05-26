import React from 'react';
import { fireEvent } from '@testing-library/react';

import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Testa o componente Detalhes', () => {
  const moreDetails = 'More details';
  it(`Teste se as informações detalhadas do Pokémon
    selecionado são mostradas na tela.`, () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const detailsLink = getByRole('link', {
      name: moreDetails,
    });
    fireEvent.click(detailsLink);
    const title = getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });
    expect(title).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();
    const summary = getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(summary).toBeInTheDocument();
    const summaryParagraph = getByText(
      'This intelligent Pokémon roasts hard berries with electricity'
      + ' to make them tender enough to eat.',
    );
    expect(summaryParagraph).toBeInTheDocument();
  });
  it('Testa se existe na página uma seção com mapas das localizações do pokémon', () => {
    const { getByRole, queryAllByAltText, getByText } = renderWithRouter(<App />);
    const detailsLink = getByRole('link', {
      name: moreDetails,
    });
    fireEvent.click(detailsLink);
    const title = getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });
    expect(title).toBeInTheDocument();
    const pikachuLocations = 2;
    const locationsName1 = getByText('Kanto Viridian Forest');
    const locationsName2 = getByText('Kanto Power Plant');
    expect(locationsName1).toBeInTheDocument();
    expect(locationsName2).toBeInTheDocument();
    const maps = queryAllByAltText('Pikachu location');
    expect(maps.length).toBe(pikachuLocations);
    expect(maps[0].src).toBe('https://cdn2.bulbagarden.net/'
    + 'upload/0/08/Kanto_Route_2_Map.png');
    expect(maps[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/'
    + 'bd/Kanto_Celadon_City_Map.png');
  });
  it(`Testa se o usuário pode favoritar
    um pokémon através da página de detalhes.`, () => {
    const { getByRole, history, getByTestId, getByLabelText } = renderWithRouter(<App />);
    const detailsLink = getByRole('link', {
      name: moreDetails,
    });
    fireEvent.click(detailsLink);
    const checkbox = getByLabelText('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();
    fireEvent.click(checkbox);
    history.push('/favorites');
    const heading = getByRole('heading', {
      level: 2,
      name: 'Favorite pokémons',
    });
    expect(heading).toBeInTheDocument();
    const title = getByTestId('pokemon-name');
    expect(title.innerHTML).toBe('Pikachu');
  });
  it('Testa duplo clique na checkbox', async () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);
    const detailsLink = getByRole('link', {
      name: moreDetails,
    });
    fireEvent.click(detailsLink);
    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);
    history.push('/favorites');
    const noFavorites = getByText('No favorite pokemon found');
    expect(noFavorites).toBeInTheDocument();
  });
});
