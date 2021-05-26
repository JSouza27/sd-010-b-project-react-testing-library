import React from 'react';
import userEvent from '@testing-library/user-event';
// import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import RenderWithRouter from '../RenderWithRouter';
import App from '../App';

describe('testa requisito 5', () => {
  it('verifica a existência de um heading H2', () => {
    RenderWithRouter(<App />);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('verifica a existência do botão próximo pkmn', () => {
    RenderWithRouter(<App />);

    const btnNextPkmn = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(btnNextPkmn).toBeInTheDocument();
  });

  // feito em colaboração com Lucas Lotar, Rafael Mathias e João Herculano
  it('verifica se mustiplos clicks correspondem ao array de pkmn', () => {
    RenderWithRouter(<App />);
    const numberOfClicks = 9;
    const namesPokemons = [
      'Charmander',
      'Caterpie',
      'Ekans',
      'Alakazam',
      'Mew',
      'Rapidash',
      'Snorlax',
      'Dragonair',
      'Pikachu',
    ];
    const btnNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    for (let index = 0; index < numberOfClicks; index += 1) {
      userEvent.click(btnNext);
      const nextPokemon = screen.getByText(namesPokemons[index]);
      expect(nextPokemon).toBeInTheDocument();
    }
  });

  it('verifica se após dragonair aparece pikachu', () => {
    RenderWithRouter(<App />);
    const btnNextPkmn = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    const clicks = 9;
    for (let i = 0; i < clicks; i += 1) {
      userEvent.click(btnNextPkmn);
    }

    const pokemon = screen.getByText(/Pikachu/i);
    expect(pokemon).toBeInTheDocument();
  });

  it('testa se é mostrado apenas um pokemon por vez ', () => {
    RenderWithRouter(<App />);
    const allMoreDetails = screen.getAllByText(/more details/i);
    expect(allMoreDetails.length).toBe(1);
  });

  it('verifica se existem botões com tipos pkmn', () => {
    RenderWithRouter(<App />);

    const typeBtn = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];

    const allBtnId = screen.getAllByTestId('pokemon-type-button');

    allBtnId.forEach((id, index) => {
      expect(id.textContent).toBe(typeBtn[index]);
    });

    const btnFire = screen.getByRole('button', {
      name: /fire/i,
    });
    userEvent.click(btnFire);
    const clicks = 9;
    const nextPkmn = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    for (let i = 0; i < clicks; i += 1) {
      const pkmnType = screen.getByTestId('pokemon-type');
      expect(pkmnType.textContent).toBe('Fire');
      userEvent.click(nextPkmn);
    }
  });

  it('verifica se existe o botão All', () => {
    RenderWithRouter(<App />);
    const btnAll = screen.getByRole('button', {
      name: /all/i,
    });
    expect(btnAll).toBeInTheDocument();

    userEvent.click(btnAll);

    const pkmnType = screen.getByTestId('pokemon-type');
    expect(pkmnType.textContent).toBe('Electric');
  });
});
