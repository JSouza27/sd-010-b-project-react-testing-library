import React from 'react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Requirement 06', () => {
  test('Testa informações corretas do pokemon', () => {
    const { getByText, getByAltText, getAllByText } = renderWithRouter(<App />);
    const name = getByText('Pikachu');
    const type = getAllByText('Electric');
    const averageWeight = getByText('Average weight: 6.0 kg');
    const img = getByAltText('Pikachu sprite');

    expect(name).toBeInTheDocument();
    expect(type).toHaveLength(2);
    expect(averageWeight).toBeInTheDocument();
    expect(img).toBeInTheDocument();
  })
})