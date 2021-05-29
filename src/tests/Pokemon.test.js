import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Eenderizada um card com as informações de determinado pokémon.', () => {
  test('O nome correto do Pokémon deve ser mostrado na tela', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Pikachu')).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByText(/Charmander/)).toBeInTheDocument();
  });

  test('O tipo correto do pokémon deve ser mostrado na tela.', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    expect(getByTestId('pokemon-type').textContent).toBe('Electric');
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByTestId('pokemon-type').textContent).toBe('Fire');
  });

  test('O peso médio do pokémon deve ser exibido', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    expect(getByTestId('pokemon-weight').textContent).toBe('Average weight: 6.0 kg');
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByTestId('pokemon-weight').textContent).toBe('Average weight: 8.5 kg');
  });

  test('A imagem do Pokémon deve ser exibida.', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const img = getByRole('img');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(img.alt).toBe('Pikachu sprite');

    fireEvent.click(getByText(/Próximo pokémon/i));
    const img2 = getByRole('img');
    expect(img2.src).toBe('https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
    // console.log(img2);
    expect(img.alt).toBe('Charmander sprite');
  });
});

describe('Verifica se o card contém um link de navegação.', () => {
  test('Testa se o botão proximo pokemon existe', () => {
    const { getByText } = renderWithRouter(<App />);
    const link = getByText(/More details/);
    expect(link.href).toBe('http://localhost/pokemons/25');
    fireEvent.click(getByText(/Próximo pokémon/i));
    const link2 = getByText(/More details/);
    expect(link2.href).toBe('http://localhost/pokemons/4');
  });

  test('Clicar no link More details, direciona a página de detalhes de Pokémon.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    expect(getByText(/Summary/)).toBeInTheDocument();
    expect(history.location.pathname).toBe('/pokemons/25');
  });
});

describe('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
  test('O ícone deve ser uma imagem com o atributo src - /star-icon.svg', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    expect(getByText(/Pokémon favoritado?/)).toBeInTheDocument();
    fireEvent.click(getByText(/Pokémon favoritado?/i));
    const estrelaImg = getByAltText('Pikachu is marked as favorite');
    console.log(estrelaImg.src);
    expect(estrelaImg.src).toBe('http://localhost/star-icon.svg');
  });
});
