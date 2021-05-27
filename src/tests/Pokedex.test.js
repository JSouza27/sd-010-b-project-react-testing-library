import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import { Pokedex } from '../components';
import data from '../data';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};
const typePokemon = [...new Set(data.reduce((types, { type }) => [...types, type], []))];
const px = 'Próximo pokémon';

test('Test if the page contains an h2 heading with the text Encountered Pokémon', () => {
  const { getByRole } = renderWithRouter(
    <Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />,
  );
  expect(getByRole('heading').innerHTML).toBe('Encountered pokémons');
});

describe('Test if the next Pokémon in the list is'
  + ' displayed when the Next Pokémon button is clicked.', () => {
  it('The button should contain the text Next pokémon', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ data }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    expect(getByText(px).innerHTML).toBe(px);
  });

  it('The next Pokémon in the list must be shown,'
  + ' one by one, by successively clicking on the button', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ data }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const buttonNext = getByText(px);
    data.forEach((pokemon) => {
      const namePokemon = getByText(pokemon.name);
      expect(namePokemon.innerHTML).toBe(pokemon.name);
      fireEvent.click(buttonNext);
    });
  });

  it('The first Pokémon on the list should be shown by clicking the button,'
  + ' if it is on the last Pokémon on the list', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ data }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const buttonNext = getByText(px);
    data.forEach((pok) => {
      const namePokemon = getByText(pok.name);
      const condicao = namePokemon.innerHTML === data[8].name;
      fireEvent.click(buttonNext);
      if (condicao) expect(namePokemon.innerHTML).toBe('Pikachu');
    });
  });
});

test('Test if only one Pokémon is displayed at a time.', () => {
  const { getAllByRole } = renderWithRouter(
    <Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />,
  );
  expect(getAllByRole('img').length).toBe(1);
});

describe('Test if the Pokédex has the filter buttons', () => {
  it('From the selection of a type button,'
  + ' the Pokédex should only circulate through the Pokémon of that type', () => {
    const { getAllByRole, getByText, getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ data }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const buttonNext = getByText(px);
    getAllByRole('button').forEach((button) => {
      // console.log(button.innerHTML);
      fireEvent.click(button);
      if (button.innerHTML === 'All') {
        data.forEach((poke) => {
          expect(getByText(poke.name).innerHTML).toBe(poke.name);
          fireEvent.click(buttonNext);
        });
      } else if (button.innerHTML !== px) {
        (data.filter((poke) => button.innerHTML === poke.type))
          .forEach(((type) => {
            // console.log(type.type);
            expect(getByTestId('pokemon-type').innerHTML).toBe(type.type);
            // console.log(getByTestId('pokemon-name').innerHTML);
            fireEvent.click(buttonNext);
          }));
      }
    });
  });

  it('The button text must match the type name, eg. Psychic', () => {
    const { getAllByRole, getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ data }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    getAllByRole('button').forEach((button) => {
      fireEvent.click(button);
      if ((button.innerHTML !== 'All') && (button.innerHTML !== 'Próximo pokémon')) {
        expect(button.innerHTML).toBe(getByTestId('pokemon-type').innerHTML);
      }
    });
  });
});

describe('Test if the Pokédex contains a button to reset the filter', () => {
  it('The button text must be All', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ data }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    expect(getByText('All').innerHTML).toBe('All');
  });

  it('Pokedéx should show Pokémon normally (without filters)'
  + ' when the All button is clicked', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ data }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const buttonNext = getByText(px);
    fireEvent.click(getByText('All'));
    data.forEach((poke) => {
      expect(getByText(poke.name).innerHTML).toBe(poke.name);
      fireEvent.click(buttonNext);
    });
  });

  it('When loading the page, the selected filter should be All', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ data }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    (getAllByTestId('pokemon-type-button')).forEach((button) => {
      expect(button.innerHTML).not.toBe('All');
    });
  });
});

describe('Test whether a filter button is created dynamically for each type of Pokémon.',
  () => {
    it('The filter buttons must be dynamic;', () => {
      const { getAllByRole } = renderWithRouter(
        <Pokedex
          pokemons={ data }
          isPokemonFavoriteById={ isPokemonFavoriteById }
        />,
      );
      let index = 0;
      getAllByRole('button').forEach((buttons) => {
        if ((buttons.innerHTML !== 'All') && (buttons.innerHTML !== px)) {
          expect(buttons).toHaveTextContent(typePokemon[index]);
          index += 1;
        }
      });
    });
  });
