import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';
import pokemons from '../data';

const BTN_NEXT = 'Próximo pokémon';
const types = pokemons.map(({ type }) => type);
const btnsTypes = types.filter((type, idx, arr) => arr.indexOf(type) === idx);
const filterType = (value) => pokemons.filter(({ type }) => type === value);

describe('Exercicio 5', () => {
  it('Renderize um h2 com o texto `Encountered pokémons`', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Encountered pokémons');
  });

  it('Após clicar no botão próximo, o pokemon deve ser exibo`', () => {
    const { getByText, getAllByText } = renderWithRouter(
      <App />,
    );

    pokemons.forEach(({ name }) => {
      expect(getAllByText('More details').length).toBe(1);
      expect(getByText(name)).toBeInTheDocument();
      fireEvent.click(getByText(BTN_NEXT));
    });
    expect(getByText(pokemons[0].name)).toBeInTheDocument();
  });

  it('Verifique os pokemons do mesmo tipo`', () => {
    const { getByRole, getByText, getAllByTestId } = renderWithRouter(<App />);
    expect(getAllByTestId('pokemon-type-button').length).toBe(btnsTypes.length);
    btnsTypes.forEach((name) => {
      const btnType = getByRole('button', { name });
      fireEvent.click(btnType);
      filterType(name).forEach(({ name: pokemon }) => {
        expect(getByText(pokemon)).toBeInTheDocument();
        fireEvent.click(getByText(BTN_NEXT));
      });
    });

    const btnAll = getByRole('button', { name: 'All' });
    fireEvent.click(btnAll);
    pokemons.forEach(({ name }) => {
      expect(getByText(name)).toBeInTheDocument();
      fireEvent.click(getByText(BTN_NEXT));
    });
  });
});
