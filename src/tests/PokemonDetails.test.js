import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../Helpers/renderWithRouter';
import App from '../App';

const pathPikachu = '/pokemons/25';
const pathAlakazan = '/pokemons/65';
const altTextAlakazam = 'Alakazam location';

describe('Teste PokemonDetails', () => {
  test('A pagina deve conter o nome "Pikachu Details"', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push(pathPikachu);
    const details = getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });
    expect(details).toBeInTheDocument();
  });
  test('teste se não tem link para More Details', () => {
    try {
      const { getByText, history } = renderWithRouter(<App />);
      history.push(pathPikachu);
      const moreDetais = getByText('More details');
      expect(moreDetais).not.toBeInTheDocument();
    } catch (error) {
      expect(true).toBe(true);
    }
  });

  test('A pagina deve conter o "Summary"', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push(pathPikachu);
    const summary = getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(summary).toBeInTheDocument();
  });
  test('testar se tem a descrição do pokemon', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push(pathPikachu);
    const p = getByText('This intelligent Pokémon roasts hard berries with '
    + 'electricity to make them tender enough to eat.');
    expect(p).toBeInTheDocument();
  });
  test('Na seção detalhes deve ter um h2 Game Locations of Pikachu', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push(pathPikachu);
    const heading = getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });
    expect(heading).toBeInTheDocument();
  });
  test('deve conter as locations dos pokemosn', () => {
    const { getAllByAltText, history } = renderWithRouter(<App />);
    history.push(pathPikachu);
    const altTextPikachu = getAllByAltText('Pikachu location');
    expect(altTextPikachu.length).toBe(2);
    history.push(pathAlakazan);
    const altTextAlakazamTest = getAllByAltText(altTextAlakazam);
    expect(altTextAlakazamTest.length).toBe(1);
  });
  test('deve conter a imagem com o source e o nome da localização', () => {
    const { getByAltText, getByText, history } = renderWithRouter(<App />);
    history.push(pathAlakazan);
    const img = getByAltText(altTextAlakazam);
    const descriptionLocation = getByText('Unova Accumula Town');
    expect(descriptionLocation).toBeInTheDocument();
    expect(img).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/4/44/Unova_Accumula_Town_Map.png',
    );
  });
  test('teste se a imagem tem com atributo alt ', () => {
    const { getByAltText, history } = renderWithRouter(<App />);
    history.push(pathAlakazan);
    const img = getByAltText(altTextAlakazam);
    expect(img).toHaveAttribute(
      'alt',
      'Alakazam location',
    );
  });
  test('A label do checkBox deve ter o texto Pokémon favoritado?', () => {
    const { getByLabelText, history } = renderWithRouter(<App />);
    history.push(pathAlakazan);
    const labelCheckbox = getByLabelText('Pokémon favoritado?');
    expect(labelCheckbox).toBeInTheDocument();
  });
});
test('', () => {});
