import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

// test('', () => {});
const linkPikachu = '/pokemons/25';

describe('Teste se as informações detalhadas do Pokémon são mostradas na tela', () => {
  it('texto <name> Details, onde <name> é o nome do Pokémon', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const link = getByText('More details');
    expect(link).toHaveAttribute('href', linkPikachu);
    userEvent.click(link);

    const name = getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });
    expect(name).toBeInTheDocument();
  });

  // it('Não deve existir o link de navegação para os detalhes do selecionado', () => {

  // });

  it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const link = getByText('More details');
    expect(link).toHaveAttribute('href', linkPikachu);
    userEvent.click(link);

    const name = getByRole('heading', {
      level: 2,
      name: /Summary/i,
    });
    expect(name).toBeInTheDocument();
  });

  it('seção de detalhes deve conter parágrafo com resumo do Pokémon visualizado', () => {
    const { getByText } = renderWithRouter(<App />);
    const link = getByText('More details');
    expect(link).toHaveAttribute('href', linkPikachu);
    userEvent.click(link);

    const name = getByText(/This intelligent Pokémon roasts/i);
    expect(name).toBeInTheDocument();
  });
});

describe('Teste se existe na página uma seção com os mapas de localização', () => {
  it('deverá existir um heading h2 com o texto Game Locations of <name>', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const link = getByText('More details');
    expect(link).toHaveAttribute('href', linkPikachu);
    userEvent.click(link);

    const local = getByRole('heading', {
      level: 2,
      name: /Game Locations of Pikachu/i,
    });
    expect(local).toBeInTheDocument();
  });

  // it('Todas as localizações do Pokémon devem ser mostradas na seção de detalhes', () => {

  // });

  // it('Devem ser exibidos o nome e uma imagem do mapa em cada localização', () => {

  // });

  // it('A imagem da localização deve ter um atributo src com a URL da localização', () => {

  // });

  // it('A imagem deve ter um atributo alt com o texto <name> location', () => {

  // });
});

describe('Teste se o usuário pode favoritar pokémon na página de detalhes', () => {
  it('A página deve exibir um checkbox que permite favoritar o Pokémon', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const link = getByText('More details');
    expect(link).toHaveAttribute('href', linkPikachu);
    userEvent.click(link);

    const check = getByRole('checkbox');
    expect(check).toBeInTheDocument();
  });

  it('Cliques alternados devem adicionar e remover da lista de favoritos', () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);
    const link = getByText('More details');
    expect(link).toHaveAttribute('href', linkPikachu);
    userEvent.click(link);

    const favorite = getByText('Pokémon favoritado?');
    userEvent.click(favorite);

    const star = getAllByRole('img');
    expect(star[1]).toBeInTheDocument();

    userEvent.click(favorite);

    expect(star[1]).not.toBeInTheDocument();
  });

  // it('Devem ser exibidos o nome e uma imagem do mapa em cada localização', () => {

  // });

  it('O label do checkbox deve conter o texto Pokémon favoritado?', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);
    const link = getByText('More details');
    expect(link).toHaveAttribute('href', linkPikachu);
    userEvent.click(link);

    const check = getByLabelText('Pokémon favoritado?');
    expect(check).toBeInTheDocument();
  });
});
