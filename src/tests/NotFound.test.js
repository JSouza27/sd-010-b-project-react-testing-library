import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
// import { getAllByRole } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

test('if page contains an h2 heading with the text Page requested not found', () => {
  const { history } = renderWithRouter(<NotFound />);
  const route = '/pagina-que-nao-existe';
  history.push(route);
  const pageNotFound = screen.getByText(/Page requested not found/i);
  expect(pageNotFound).toBeInTheDocument();
});
it('Test if the page contains the following image.', () => {
  const { container } = renderWithRouter(<NotFound />);

  const picture = container.querySelector('img');
  const image = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  expect(picture.src).toBe(image);
});
