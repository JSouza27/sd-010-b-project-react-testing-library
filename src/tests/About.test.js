import React from 'react';
import { fireEvent } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Test About Component', () => {
  it('should contain a heading with about pokedex', () => {
    const { getByRole, getByText } = renderWithRouter(<About />);

    const head = getByRole('heading', { level: 2 });
    expect(head).toBeTruthy();

    const content = getByText('About Pokédex');
    expect(content).toBeInTheDocument();
  });

  it('should contain 2 paragraphs', () => {
    const { getAllByTestId } = renderWithRouter(<About />);
    const paragraphs = getAllByTestId('text-p');
    expect(paragraphs.length).toBe(2);
    expect(paragraphs[0]).toBeInTheDocument();
    expect(paragraphs[1]).toBeInTheDocument();
  });
});
