import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

test('Test whether the page contains information about Pokédex.', () => {
  const { getByText } = renderWithRouter(<About />);
  const aboutOnly = getByText('This application simulates a Pokédex,'
  + ' a digital encyclopedia containing all Pokémons').innerHTML;
  expect(aboutOnly).toBe('This application simulates a Pokédex,'
  + ' a digital encyclopedia containing all Pokémons');
});

test('Test if the page contains an h2 heading with the text About Pokédex.', () => {
  const { getByRole } = renderWithRouter(<About />);
  const h2About = getByRole('heading').innerHTML;
  expect(h2About).toBe('About Pokédex');
});
