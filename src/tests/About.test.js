import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

const p1 = 'This application simulates a Pokédex,'
+ ' a digital encyclopedia containing all Pokémons';

const p2 = 'One can filter Pokémons by type, and see more details for each one of them';

const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

test('Test whether the page contains information about Pokédex.', () => {
  const { getByText } = renderWithRouter(<About />);
  expect(getByText(p1).innerHTML).toBe(p1);
});

test('Test if the page contains an h2 heading with the text About Pokédex.', () => {
  const { getByRole } = renderWithRouter(<About />);
  const h2About = getByRole('heading').innerHTML;
  expect(h2About).toBe('About Pokédex');
});

test('Test whether the page contains information about Pokédex.', () => {
  const { getByText } = renderWithRouter(<About />);
  expect(getByText(p1).innerHTML).toBe(p1);
  expect(getByText(p2).innerHTML).toBe(p2);
});

test('Test if the page contains the following image of a Pokédex', () => {
  const { getByRole } = renderWithRouter(<About />);
  expect(getByRole('img').src).toBe(src);
});
