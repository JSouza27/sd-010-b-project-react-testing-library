import React from 'react';
import { fireEvent } from '@testing-library/react';

import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Testa o componente App', () => {
  test('Verifica se o pathname "/" leva para a home', () => {
    const { history, getByRole } = renderWithRouter(<App />);

    history.push('/');

    const homeIdentifyer = getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });

    expect(homeIdentifyer).toBeInTheDocument();
  });

  test('Verifica presença de links para "Home", "About" e "Favirite Pokemons"', () => {
    const { getByRole } = renderWithRouter(<App />);

    const home = getByRole('link', {
      name: /home/i,
    });
    const about = getByRole('link', {
      name: /about/i,
    });
    const favoritePokemons = getByRole('link', {
      name: /favorite pokémons/i,
    });

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritePokemons).toBeInTheDocument();
  });

  test(
    'Verifica que, clicando em "Home", a página é redirecionada para esse path',
    () => {
      const { history, getByRole } = renderWithRouter(<App />);

      const home = getByRole('link', {
        name: /home/i,
      });

      fireEvent.click(home);

      expect(history.location.pathname).toBe('/');
    },
  );

  test(
    'Verifica que, clicando em "About", a página é redirecionada para esse path',
    () => {
      const { history, getByRole } = renderWithRouter(<App />);

      const about = getByRole('link', {
        name: /about/i,
      });

      fireEvent.click(about);

      expect(history.location.pathname).toBe('/about');
    },
  );

  test(
    'Verifica que, clicando em "FavPokemons", a página é redirecionada para esse path',
    () => {
      const { history, getByRole } = renderWithRouter(<App />);

      const favoritePokemons = getByRole('link', {
        name: /favorite pokémons/i,
      });

      fireEvent.click(favoritePokemons);

      expect(history.location.pathname).toBe('/favorites');
    },
  );

  test(
    'Verifica se, ao inserir URL desconhecida, a página é redirecionada para "Not Found"',
    () => {
      const { history, getByRole } = renderWithRouter(<App />);

      history.push('/projeto-mal-executado');

      const errorMsg = getByRole('heading', {
        name: /Page requested not found/i,
      });

      expect(errorMsg).toBeInTheDocument();
    },
  );
});
