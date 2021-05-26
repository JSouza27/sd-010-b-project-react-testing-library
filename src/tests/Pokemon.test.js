import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../Helpers/renderWithRouter';
import App from '../App';

const altPokemon = 'Pikachu is marked as favorite';
describe('Requisito 6.1', () => {
  test('Teste nome pokemon', () => {
    const { getByText } = renderWithRouter(<App />);
    const name = getByText(/Pikachu/i);
    expect(name).toBeInTheDocument();
  });
  test('Teste tipo Pokemon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const type = getByTestId('pokemon-type');
    expect(type).toBeInTheDocument();
  });
  test('Teste peso Pokemon', () => {
    const { getByText } = renderWithRouter(<App />);
    const weight = getByText(/Average weight: 6.0 kg/i);
    expect(weight).toBeInTheDocument();
  });
  test('Teste imagem pokemon', () => {
    const { getByRole } = renderWithRouter(<App />);
    const imagem = getByRole('img');
    expect(imagem).toHaveAttribute(
      'alt',
      'Pikachu sprite',
      'src',
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
  });
});
describe('teste 6.2', () => {
  test('link mais detalhes', () => {
    const { getByText } = renderWithRouter(<App />);
    const details = getByText(/More details/i);
    expect(details).toHaveAttribute(
      'href',
      '/pokemons/25',
    );
  });
});

describe('teste 6.3', () => {
  test('Teste se redireciona para pagina de detalhes', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const details = getByText(/More details/i);
    userEvent.click(details);
    const heading = getByRole('heading', {
      level: 2,
      name: /Pikachu Details/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
describe('teste 6.4', () => {
  test('Teste também se a URL exibida no navegador mud', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const details = getByText(/More details/i);
    userEvent.click(details);
    expect(history.location.pathname).toBe('/pokemons/25');
  });
});
describe('teste 6.5', () => {
  test('Teste se possui uma imagem de estrela e possui atributo alt', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);
    const details = getByText(/More details/i);
    userEvent.click(details);
    const favorite = getByText(/Pokémon favoritado?/i);
    userEvent.click(favorite);
    const star = getByAltText(altPokemon);
    expect(star).toHaveAttribute(
      'src',
      '/star-icon.svg',
    );
    expect(star).toBeInTheDocument();
  });
  test('testes complementares img', () => {
    const { getByAltText } = renderWithRouter(<App />);
    const img = getByAltText(/Pikachu sprite/i);
    expect(img).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
  });
  test('Teste value do paragrafo', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const type = getByTestId('pokemon-type');
    expect(type).toHaveTextContent(/Electric/i);
  });
});
