import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './RenderWithRouter';

import App from '../App';

describe('Testes do Componente <Pokemon />', () => {
  test('Teste renderiza um card com as informações exatas.', () => {
    RenderWithRouter(<App />);

    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon).toBeInTheDocument();

    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon).toBeInTheDocument();

    const weightPokemon = screen.getByTestId('pokemon-weight');
    expect(weightPokemon).toHaveTextContent('Average weight: 6.0 kg');

    const imgPkemon = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(imgPkemon).toHaveAttribute(
      'src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
    expect(imgPkemon).toHaveAttribute('alt', 'Pikachu sprite');
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon.', () => {
    const { history } = RenderWithRouter(<App />);
    const btnDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(btnDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
});
