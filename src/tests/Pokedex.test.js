import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

const nameButton = 'Próximo pokémon';

describe('Teste do quinto requisito', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', { level: 2 });

    expect(heading).toHaveTextContent('Encountered pokémons');
  });

  describe('Proximo Pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    test('Teste se o botão tem o texto Próximo pokémon', () => {
      renderWithRouter(<App />);
      const btnText = screen.getByText(nameButton);

      expect(btnText).toBeInTheDocument();
    });

    test('Teste se os próximos Pokémons são mostrados', () => {
      renderWithRouter(<App />);
      const btnText = screen.getByRole('button', { name: nameButton });
      fireEvent.click(btnText);
      const testePokemon = screen.getByText('Charmander');

      expect(testePokemon).toBeInTheDocument();
    });

    test('O primeiro Pokémon da lista deve ser mostrado ao chegar no último', () => {
      renderWithRouter(<App />);
      const btnText = screen.getByRole('button', { name: nameButton });
      const testePokemon = screen.getByText('Pikachu');

      const numeroClick = 9;
      for (let i = 0; i < numeroClick; i += 1) {
        fireEvent.click(btnText);
      }

      expect(testePokemon).toBeInTheDocument();
    });

    test('Teste se é mostrado apenas um Pokémon por vez', () => {
      renderWithRouter(<App />);
      const image = screen.getAllByRole('img');

      expect(image.length).toBe(1);
    });
    describe('Teste se a Pokédex tem os botões de filtro', () => {
      test('A Pokédex deve circular somente pelos pokémons daquele tipo', () => {
        renderWithRouter(<App />);
        const psychic = screen.getByRole('button', { name: Psychic });
        const namePsychic = screen.getByText('Psychic');
        fireEvent.click(psychic);

        expect(namePsychic).toBeInTheDocument();

        const namePokemonPsychic = screen.getByText('Mew');
        fireEvent.click(nameButtonNext);
        
      });
    });
  });
});
