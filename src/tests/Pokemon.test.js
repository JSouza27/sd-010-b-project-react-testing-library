import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

const getByTestId = (dataTestId, valueToMatch) => {
  const testId = screen.getByTestId(dataTestId);
  expect(testId.innerHTML).toMatch(valueToMatch);
};

describe('6 - Pokemons info, sprites, image, routes', () => {
  test('1- Pokemon infos', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    // testando infos
    getByTestId('pokemon-name', 'Pikachu');
    getByTestId('pokemon-type', 'Electric');
    getByTestId('pokemon-weight', '6.0 kg');
    const spriteOfPikachu = screen.getByAltText('Pikachu sprite');
    expect(spriteOfPikachu.alt).toMatch('Pikachu sprite');
    expect(spriteOfPikachu.src).toMatch('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    const moreDetails = screen.getByRole('link', {
      name: 'More details',
    });
    userEvent.click(moreDetails);
    const { location: { pathname } } = history;
    expect(pathname).toMatch('/pokemons/25');
    const checkbox = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(checkbox);
    const altOfFavorite = screen.getByAltText('Pikachu is marked as favorite');
    expect(altOfFavorite.src).toMatch('/star-icon.svg');
    expect(altOfFavorite.alt).toMatch('Pikachu is marked as favorite');
  });
});
