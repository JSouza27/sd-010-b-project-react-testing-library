import React from 'react';
import { screen, fireEvent, getByText } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

const nameButtonNext = 'Próximo pokémon';

describe('Teste do quinto requisito', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', { level: 2 });

    expect(heading).toHaveTextContent('Encountered pokémons');
  });

  describe('Proximo Pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    test('Teste se o botão tem o texto Próximo pokémon', () => {
      renderWithRouter(<App />);
      const btnText = screen.getByText(nameButtonNext);

      expect(btnText).toBeInTheDocument();
    });

    test('Teste se os próximos Pokémons são mostrados', () => {
      renderWithRouter(<App />);
      const btnText = screen.getByRole('button', { name: nameButtonNext });
      fireEvent.click(btnText);
      const testePokemon = screen.getByText('Charmander');

      expect(testePokemon).toBeInTheDocument();
    });

    test('O primeiro Pokémon da lista deve ser mostrado ao chegar no último', () => {
      renderWithRouter(<App />);
      const btnText = screen.getByRole('button', { name: nameButtonNext });
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
        const psychic = screen.getByRole('button', { name: 'Psychic' });
        fireEvent.click(psychic);
        const namePokemon = screen.getByText('Alakazam');

        expect(namePokemon).toBeInTheDocument();
      });

      test('O texto do botão deve corresponder ao nome do tipo, ex. Psychic', () => {
        renderWithRouter(<App />);
        const button = screen.getAllByTestId('pokemon-type-button');
        // Feito com ajuda dos colegas no plantão.
        const typesPokemons = [
          'Electric',
          'Fire',
          'Bug',
          'Poison',
          'Psychic',
          'Normal',
          'Dragon',
        ];

        button.forEach((buttons, index) => {
          expect(buttons.textContent).toBe(typesPokemons[index]);
        });
      });

      describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
        test('O texto do botão deve ser All', () => {
          renderWithRouter(<App />);
          const buttonAll = screen.getByRole('button', { name: 'All' });

          expect(buttonAll).toBeInTheDocument();
        });

        test('A Pokedéx deverá mostrar os Pokémons normalmente', () => {
          renderWithRouter(<App />);
          const buttonAll = screen.getByRole('button', { name: 'All' });
          fireEvent.click(buttonAll);

          const nextButton = screen.getByText(nameButtonNext);
          fireEvent.click(nextButton);

          const testePokemon = screen.getByText('Charmander');

          expect(testePokemon).toBeInTheDocument();
        });
      });
    });
  });
});
