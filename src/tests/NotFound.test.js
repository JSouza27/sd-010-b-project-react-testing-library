import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Test if the page contains an h2 heading with the text '
    + 'Page requested not found', () => {
  const { getByRole, history } = renderWithRouter(<App />);
  history.push('/que-nao-existe');
  const text = getByRole('heading', { level: 2 }).innerHTML;
  expect(text.indexOf('Page requested not')).toBe(0);
});
