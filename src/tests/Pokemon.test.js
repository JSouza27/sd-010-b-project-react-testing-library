import React from 'react';
import { fireEvent } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Test Pokemon Component', () => {
  const charmander = pokemons[1];

  afterEach(() => jest.clearAllMocks());

  it('Should render name, type, weigth and img url of the right poke', () => {
    const { getByTestId } = renderWithRouter(<Pokemon
      pokemon={ charmander }
      isFavorite
    />);
    const { name, type, image, averageWeight: { measurementUnit, value } } = charmander;
    const pokeName = getByTestId('pokemon-name');
    const pokeType = getByTestId('pokemon-type');
    const pokeWeight = getByTestId('pokemon-weight');
    const img = document.querySelectorAll('img')[0];

    expect(pokeName).toBeInTheDocument();
    expect(pokeType).toBeInTheDocument();
    expect(pokeWeight).toBeInTheDocument();

    expect(pokeName.textContent).toBe(name);
    expect(pokeType.textContent).toBe(type);
    expect(pokeWeight.textContent).toBe(`Average weight: ${value} ${measurementUnit}`);
    expect(img.src).toBe(image);
    expect(img.alt).toBe(`${name} sprite`);
  });

  it('should have a working link that redirects to pokemons/:id', () => {
    const { getByText, history } = renderWithRouter(<Pokemon
      pokemon={ charmander }
      isFavorite
    />);
    const { id } = charmander;
    const link = getByText('More details');

    expect(link).toBeInTheDocument();

    history.push = jest.fn();

    fireEvent.click(link);

    expect(history.push).toHaveBeenCalledWith(`pokemons/${id}`);
  });

  it('should redirect after link click', () => {
    const { getByText, history } = renderWithRouter(<Pokemon
      pokemon={ charmander }
      showDetailsLink
      isFavorite
    />);

    const { id, name } = charmander;
    const link = getByText('More details');

    expect(link).toBeInTheDocument();

    fireEvent.click(link);

    const { pathname } = history.location;
    const pathnameId = (pathname.split('/'));
    expect(Number(pathnameId[2])).toBe(id);
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('should have a icon if is favorited', () => {
    const { getAllByRole } = renderWithRouter(<Pokemon
      pokemon={ charmander }
      showDetailsLink
      isFavorite
    />);

    const { name } = charmander;
    const images = getAllByRole('img');
    expect(images[1].src).toBe('http://localhost/star-icon.svg');
    expect(images[1].alt).toBe(`${name} is marked as favorite`);
  });
});
