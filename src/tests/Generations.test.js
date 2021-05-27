import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Generations from '../components/Generations';

test('Teste se há um título', () => {
  renderWithRouter(<Generations />);
  const title = screen.getByRole('heading', { level: 2 });
  expect(title).toHaveTextContent('GENERATIONS');
});

test('Verifica se há uma lista', () => {
  renderWithRouter(<Generations />);
  const list = screen.getByRole('list');
  expect(list).toBeInTheDocument();
});

describe('testa a lista', () => {
  beforeAll(() => { jest.useFakeTimers(); });
  afterAll(() => { jest.useRealTimers(); });

  it('Testa a primeira cidade da lista', async () => {
    const generations = 8;
    renderWithRouter(<Generations />);
    const list = await screen.findAllByRole('listitem');
    expect(list.length).toBe(generations);
    screen.debug();
  });
});
