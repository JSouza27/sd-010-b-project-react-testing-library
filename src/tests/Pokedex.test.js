import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Teste do quinto requisito', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', { level: 2 });

    expect(heading).toHaveTextContent('Encountered pokémons');
  });

  describe('Proximo Pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    test('Teste se o botão tem o texto Próximo pokémon', () => {
      renderWithRouter(<App />);
      const btnText = screen.getByText('Próximo pokémon');

      expect(btnText).toBeInTheDocument();
    });

    test('Teste se os próximos Pokémons são mostrados', () => {
      renderWithRouter(<App />);
      const btnText = screen.getByRole('button', { name: 'Próximo pokémon' });
      fireEvent.click(btnText);
      const testePokemon = screen.getByText('Charmander');

      expect(testePokemon).toBeInTheDocument();
    });
  });
});
