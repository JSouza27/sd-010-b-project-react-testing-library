import React from 'react';
import { screen, render } from '@testing-library/react';
import GenerationDetails from '../components/GenerationDetails';

const renderWithProps = (i) => {
  const defaultProps = {
    match: { params: { generation: `generation-${i}` } },
  };
  return render(<GenerationDetails { ...defaultProps } />);
};

const regions = [['i', 'KANTO', '151'], ['ii', 'JOHTO', '100'], ['iii', 'HOENN', '135'],
  ['iv', 'SINNOH', '107'], ['v', 'UNOVA', '156'],
  ['vi', 'KALOS', '72'], ['vii', 'ALOLA', '88'],
  ['viii', 'GALAR', '89']];

regions.forEach((element) => {
  beforeAll(() => { jest.useFakeTimers(); });
  afterAll(() => { jest.useRealTimers(); });

  describe(`Testa a exibição da página ${element[0]}`, () => {
    beforeAll(() => { jest.useFakeTimers(); });
    afterAll(() => { jest.useRealTimers(); });

    test(`Renderiza o título da página ${element[0]}`, async () => {
      renderWithProps(element[0]);
      const title = await screen.findByText(`Region: ${element[1]}`);
      expect(title).toBeInTheDocument();
    });

    test('Verifica o tamanho da lista de pokémons', async () => {
      const numberOfPokemons = parseInt(element[2], 10);
      renderWithProps(element[0]);
      const list = await screen.findAllByRole('listitem');
      expect(list.length).toBe(numberOfPokemons);
    });
  });
});
