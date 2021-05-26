import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import RenderRouter from '../services/RenderRouter';

test('teste se o pokemon é renderizado', () => {
  const { getByAltText, history } = RenderRouter(<App />);
  const buttonType = screen.getAllByRole('button');
  expect(buttonType[5]).toHaveTextContent('Psychic');
  userEvent.click(buttonType[5]);
  expect(screen.getByText('Alakazam')).toHaveTextContent('Alakazam');
  const typeText = screen.getAllByText('Psychic');
  const pokeLength = 2;
  expect(typeText).toHaveLength(pokeLength);
  expect(screen.getByText('Average weight: 48.0 kg'))
    .toHaveTextContent('Average weight: 48.0 kg');
  const image = getByAltText('Alakazam sprite');
  expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png');
});

test('Url correta do pokemon', () => {
  const { getByAltText, history } = RenderRouter(<App />);
  const detailsPoke = screen.getByRole('link', {
    name: /More Details/i,
  });
  expect(detailsPoke).toBeInTheDocument();
  userEvent.click(detailsPoke);
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
  const checkbox = screen.getByRole('checkbox');
  userEvent.click(checkbox);
  const image = getByAltText('Pikachu is marked as favorite');
  expect(image.src).toContain('/star-icon.svg');
});
