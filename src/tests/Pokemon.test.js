import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';
import renderWithMemoryRouter from './renderWithMemoryRouter';

describe('Requisito 6', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon.', () => {
    const { getByTestId, getByRole, getByText } = renderWithMemoryRouter(<App />);
    const { id, name, type, averageWeight, image } = pokemons[0];
    const nameElement = getByTestId('pokemon-name');
    const typeElement = getByTestId('pokemon-type');
    const weightElement = getByTestId('pokemon-weight');
    const imgElement = getByRole('img');
    const link = getByText('More details');

    expect(nameElement.innerHTML).toBe(name);
    expect(typeElement.innerHTML).toBe(type);
    expect(weightElement.innerHTML)
      .toBe(`Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`);
    expect(imgElement.alt).toBe(`${name} sprite`);
    expect(imgElement.src).toBe(image);
    expect(link.href).toBe(`http://localhost/pokemons/${id}`);
    fireEvent.click(link);
    fireEvent.click(getByRole('checkbox'));
    expect(getByRole('img', { name: `${name} is marked as favorite` }).alt)
      .toBe(`${name} is marked as favorite`);
    expect(getByRole('img', { name: `${name} is marked as favorite` }).src)
      .toBe('http://localhost/star-icon.svg');
  });
});
