import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, getByText } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('testes na NotFound.js', () => {
  test('testando a exibição da tela Page requested not found', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const notFound = getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(notFound).toBeInTheDocument();
  });
  test('testando a exibição imagem na tela Page requested not found', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const notFound = getByAltText('Pikachu crying because the page requested was not found');
    expect(notFound).toHaveAttribute(
      'src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});