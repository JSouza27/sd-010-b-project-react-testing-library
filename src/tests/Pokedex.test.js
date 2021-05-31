import { fireEvent } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('Requirement 05', () => {
  test('Testa se contém title', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading',
      {
        level: 2,
        name: 'Encountered pokémons',
      });

    expect(heading).toBeInTheDocument();
  });
  test('Testa a funçao do botão', () => {
    const { getByText } = renderWithRouter(<App />);
    const btn = getByText(/Próximo pokémon/);
    userEvent.click(btn);
    const charmander = getByText('Charmander');

    expect(btn).toBeInTheDocument();
    expect(charmander).toBeInTheDocument();
    userEvent.click(btn);
    userEvent.click(btn);
    userEvent.click(btn);
    userEvent.click(btn);
    userEvent.click(btn);
    userEvent.click(btn);
    userEvent.click(btn);
    userEvent.click(btn);
    const pokemons = getByText('Pikachu');
    expect(pokemons).toBeInTheDocument();
  });
  test('Testa se tem botão para resetar o filtro', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const btn = getAllByTestId('pokemon-type-button');
    const types = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    btn.forEach((button, index) => {
      // Não lembrava como aplicar forEach. https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
      expect(button.textContent).toBe(types[index]);
    });
  });
  test('Testa se botão all funciona corretamente', () => {
    const { getByRole } = renderWithRouter(<App />);
    const btn = getByRole('button', {
      name: 'All',
    });
    fireEvent.click(btn);

    expect(btn).toBeInTheDocument();
  });
});

// Para testa a função do botão olhei essa pr. https://github.com/tryber/sd-09-project-react-testing-library/blob/ChrisMoura2000-react-testing-library/src/tests/Pokedex.test.js
