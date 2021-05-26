import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
// import App from '../App';
import { NotFound } from '../components';

test('Test if the page contains an h2 heading with the text '
    + 'Page requested not found', () => {
  const { getByRole, history } = renderWithRouter(<NotFound />);
  history.push('/que-nao-existe');
  const text = getByRole('heading', { level: 2 }).innerHTML;
  expect(text.indexOf('Page requested not')).toBe(0);
});

test('Test if the page shows the image https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
  const { getByRole, history } = renderWithRouter(<NotFound />);
  history.push('/que-nao-existe');
  expect(getByRole('img', { name: /Pikachu/i }).src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
