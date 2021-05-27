import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Pokemon from '../components/Pokemon';
import pokemons from '../data';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();

  return {
    ...render(<Router history={ history }>{component}</Router>),
    history,
  };
};

const { name, type, averageWeight: { value, measurementUnit }, image, id } = pokemons[0];
describe('routes', () => {
  test('tests if some wild infos appears on the screen', () => {
    const { getByText, getByAltText, getAllByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />);

    expect(getByText(name)).toBeInTheDocument();
    expect(getByText(type)).toBeInTheDocument();
    expect(getByText(`Average weight: ${value} ${measurementUnit}`)).toBeInTheDocument();
    expect(getByText(/More details/i)).toBeInTheDocument();
    expect(getByAltText(`${name} sprite`)).toBeInTheDocument();

    const link = image;

    const img = getAllByRole('img')[0];
    // console.log(img.src);
    expect(img.src).toContain(
      link,
    );
    expect(img).toBeInTheDocument();
  });

  test('tests if the pathname changes when u click  on more details and u re redirected',
    () => {
      const { getByRole, history, getByText } = renderWithRouter(<App
        pokemon={ pokemons[0] }
        isFavorite
      />);

      const button = getByRole('link', {
        name: /More details/i,
      });
      expect(button).toBeInTheDocument();

      userEvent.click(button);

      const { pathname } = history.location;

      expect(pathname).toBe(`/pokemons/${id}`);

      const heading = getByText(`${name} Details`);
      expect(heading).toBeInTheDocument();
    });

  test('tests if u can favorite a pokémon', () => {
    const { getByRole, getByLabelText, getAllByRole } = renderWithRouter(<App />);
    const button = getByRole('link', {
      name: /More details/i,
    });
    expect(button).toBeInTheDocument();

    userEvent.click(button);
    const pokemon = getByLabelText('Pokémon favoritado?');
    userEvent.click(pokemon);

    const img = getAllByRole('img')[1];
    // console.log(img.src);
    expect(img.src).toContain(
      '/star-icon.svg',
    );
    expect(img.alt).toContain(
      'Pikachu is marked as favorite',
    );
    // console.log(img.alt);
  });
});
