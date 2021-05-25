import React from 'react';
import renderWithRouter from '../helpers/renderWithRouters';
// import { NotFound } from '../components';
import App from '../App';

describe('Teste requisito 4 NotFound.js', () => {
  test('Teste a página contém um heading h2 com texto Page requested not found 😭', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/ash');

    const text = getByRole('heading', { name: /Page requested not found/ });
    expect(text).toBeInTheDocument();
  });
});
