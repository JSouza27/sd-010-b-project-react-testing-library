import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import Data from '../data';

const moreDetails = 'More details';

describe('Teste o componente <Pokemon.js />', () => {
  test('O nome correto do Pokémon deve ser mostrado na tela', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const nome = getByTestId('pokemon-name');
    expect(nome.innerHTML).toBe(Data[0].name);
  });
  test('O tipo correto do pokémon deve ser mostrado na tela.', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const tipo = getByTestId('pokemon-type');
    expect(tipo.innerHTML).toBe(Data[0].type);
  });
  test('O peso médio do pokémon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const peso = Data[0].averageWeight.value;
    const unidade = Data[0].averageWeight.measurementUnit;
    const resul = getByTestId('pokemon-weight').innerHTML;
    expect(resul).toBe(`Average weight: ${peso} ${unidade}`);
  });
  test('A imagem do Pokémon deve conter src e alt', () => {
    const { getByRole } = renderWithRouter(<App />);
    const img = getByRole('img');
    const dataSrc = Data[0].image;
    expect(dataSrc).toBe(img.src);
    expect(img.alt).toBe(`${Data[0].name} sprite`);
  });
  test('Pokémon indicado na Pokédex contém'
  + 'um link de navegação para exibir detalhes deste Pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    const details = getByText(moreDetails).href;
    /* const id = Data[0].id; */
    expect(details).toMatch(`/pokemons/${Data[0].id}`);
  });
  test('Clicar no link de navegação do Pokémon,'
  + 'ir para a página de detalhes de Pokémon', () => {
    const { getByRole } = renderWithRouter(<App />);
    const click = getByRole('link', { name: moreDetails });
    userEvent.click(click);
    const nameDetails = getByRole('heading', {
      level: 2,
      name: `${Data[0].name} Details`,
    });

    expect(nameDetails).toBeInTheDocument();
  });
  test('URL exibida no navegador muda para /pokemon/<id>', () => {
    const { history, getByRole } = renderWithRouter(<App />);

    const click = getByRole('link', { name: moreDetails });
    userEvent.click(click);
    expect(history.location.pathname).toBe(`/pokemons/${Data[0].id}`);
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { getByText, getByRole, getAllByRole } = renderWithRouter(<App />);
    const click = getByRole('link', { name: moreDetails });
    userEvent.click(click);
    const clickFavorite = getByText('Pokémon favoritado?');
    userEvent.click(clickFavorite);
    const auxIco = getAllByRole('img')[1];
    expect(auxIco.alt).toBe(`${Data[0].name} is marked as favorite`);
    console.log(auxIco.src);
    expect(auxIco.src).toMatch('/star-icon.svg');
  });
});
