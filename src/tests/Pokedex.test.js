import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import App from '../App';

// test('', () => {});
describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const encontra = getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(encontra).toBeInTheDocument();
  });

  describe('Teste se é exibido o próximo Pokémon', () => {
    it('O botão deve conter o texto Próximo pokémon', () => {
      const { getByText } = renderWithRouter(<App />);
      const button = getByText('Próximo pokémon');
      expect(button).toBeInTheDocument();
    });

    it('Os próximos Pokémons da lista devem ser mostrados', () => {
      const { getByText } = renderWithRouter(<App />);
      const button = getByText('Próximo pokémon');
      userEvent.click(button);
      const next = getByText(/charmander/i);
      expect(next).toBeInTheDocument();

      userEvent.click(button);
      const next2 = getByText(/caterpie/i);
      expect(next2).toBeInTheDocument();
    });

    it('O primeiro Pokémon da lista, se estiver no último', () => {
      const { getByText } = renderWithRouter(<App />);
      const button = getByText('Próximo pokémon');
      userEvent.click(button);

      const next = getByText(/charmander/i);
      expect(next).toBeInTheDocument();

      userEvent.click(button);
      const next2 = getByText(/caterpie/i);
      expect(next2).toBeInTheDocument();
    });
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {

  });

  describe('Teste se a Pokédex tem os botões de filtro', () => {
    it('a Pokédex deve circular somente pelos pokémons do tipo filtrado', () => {

    });

    it('O texto do botão deve corresponder ao nome do tipo', () => {

    });
  });

  describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    it('O texto do botão deve ser All', () => {

    });

    it('deverá mostrar os Pokémons normalmente quando o botão All for clicado', () => {

    });

    it('Ao carregar a página, o filtro selecionado deverá ser All', () => {

    });
  });

  describe('Teste se é criado um botão de filtro para cada tipo de Pokémon', () => {
    it('Os botões de filtragem devem ser dinâmicos', () => {

    });

    it('Deve existir um botão de filtragem para cada tipo de Pokémon', () => {

    });

    it('Deve ser mostrado como opção de filtro, um botão para cada um dos tipos', () => {

    });
  });
  it('O botão de Próximo pokémon deve ser desabilitado quando tiver um pokémon', () => {

  });
});
