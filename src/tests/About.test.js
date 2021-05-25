import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
// import { getAllByRole } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

it('Test whether the page contains information about Pokédex.', () => {
  const { getByText } = renderWithRouter(<About />);
  const about = getByText(/About Pokédex/);
  expect(about).toBeInTheDocument();
});
it('if the page contains an h2 heading with the text About Pokédex.', () => {
  const { getByText } = renderWithRouter(<About />);
  const h2 = getByText(/About Pokédex/);
  expect(h2).toBeInTheDocument();
});
it('Test if the page contains the following image.', () => {
  const { queryAllByRole } = renderWithRouter(<About />);

  const picture = queryAllByRole('img');
  const image = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  expect(picture[0].src).toBe(image);
});
