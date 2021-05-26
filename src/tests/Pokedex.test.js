import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';

import App from '../App';
import data from '../data';

const button = 'Próximo pokémon';
const types = data.map(({ type }) => type);
const buttonTypes = types.filter((type, index, array) => array.indexOf(type) === index);
const getType = (value) => data.filter(({ type }) => type === value);

describe('Testa pokedex', () => {
  test('Testa h2 pokedex', () => {
    const { getByRole } = renderWithRouter(<App />);
    const pokemon = getByRole('heading', { level: 2 });
    expect(pokemon).toHaveTextContent('Encountered pokémons');
  });

  test('Testa botão', () => {
    const { getByText, getAllByText } = renderWithRouter(
      <App />,
    );

    data.forEach(({ name }) => {
      expect(getAllByText('More details').length).toBe(1);
      expect(getByText(name)).toBeInTheDocument();
      fireEvent.click(getByText(button));
    });
    expect(getByText(data[0].name)).toBeInTheDocument();
  });

  test('Testa pokemon por tipo`', () => {
    const { getByRole, getByText, getAllByTestId } = renderWithRouter(<App />);
    expect(getAllByTestId('pokemon-type-button').length).toBe(buttonTypes.length);
    buttonTypes.forEach((name) => {
      const btnType = getByRole('button', { name });
      fireEvent.click(btnType);
      getType(name).forEach(({ name: pokemon }) => {
        expect(getByText(pokemon)).toBeInTheDocument();
        fireEvent.click(getByText(button));
      });
    });

    const buttonTodos = getByRole('button', { name: 'All' });
    fireEvent.click(buttonTodos);
    data.forEach(({ name }) => {
      expect(getByText(name)).toBeInTheDocument();
      fireEvent.click(getByText(button));
    });
  });
});
