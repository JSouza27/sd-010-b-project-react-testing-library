import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

// test('', () => {});
const linkPikachu = '/pokemons/25';

describe('Teste o componente <Pokemon.js />', () => {
  it('O nome correto do Pokémon deve ser mostrado na tela', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const name = getByTestId('pokemon-name');
    expect(name).toHaveTextContent(/Pikachu/i);
  });

  it('O tipo correto do pokémon deve ser mostrado na tela', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const type = getByTestId('pokemon-type');
    expect(type).toHaveTextContent(/electric/i);
  });

  it('O peso médio do pokémon deve ser exibido', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const weight = getByTestId('pokemon-weight');
    expect(weight).toHaveTextContent('Average weight: 6.0 kg');
  });

  it('A imagem do Pokémon deve ser exibida', () => {
    const { getByAltText } = renderWithRouter(<App />);
    const imagem = getByAltText('Pikachu sprite');
    expect(imagem).toBeInTheDocument();
    expect(imagem).not.toHaveAttribute('src', '');
  });
});

// REFERÊNCIA EMERSON SATURNINO
it('Teste se o card contém um link de navegação para exibir detalhes', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const link = getByText('More details');
  expect(link).toHaveAttribute('href', linkPikachu);
  userEvent.click(link);
  const { pathname } = history.location;
  expect(pathname).toBe(linkPikachu);
});

it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
  const { getByText, getAllByRole, history } = renderWithRouter(<App />);

  const rota = linkPikachu;
  history.push(rota);
  const favorite = getByText('Pokémon favoritado?');
  userEvent.click(favorite);

  const star = getAllByRole('img');
  expect(star[1]).toHaveAttribute('src', '/star-icon.svg');
  expect(star[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
});
