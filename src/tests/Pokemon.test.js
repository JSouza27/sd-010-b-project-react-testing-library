import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const moreDetails = 'More details';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByText(/Pikachu/i);
    expect(pokemonName).toBeInTheDocument();

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.innerHTML).toBe('Electric');

    const pokemonWeight = screen.getByText(/Average weight: 6.0 kg/i);
    expect(pokemonWeight).toBeInTheDocument();

    const pokemonImg = screen.getByRole('img', {
      name: 'Pikachu sprite',
    });
    expect(pokemonImg).toHaveAttribute('alt', 'Pikachu sprite');
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém os link de navegação', () => {
    renderWithRouter(<App />);

    const linkToInfos = screen.getByRole('link', {
      name: moreDetails,
    });
    expect(linkToInfos).toHaveAttribute(
      'href',
      '/pokemons/25',
    );
  });

  it('Clicando no link do Pokémon, redireciona para as informações dele', () => {
    renderWithRouter(<App />);

    const linkPokeInfos = screen.getByRole('link', {
      name: moreDetails,
    });
    userEvent.click(linkPokeInfos);

    const sumary = screen.getByRole('heading', {
      name: 'Summary',
      level: 2,
    });
    expect(sumary).toBeInTheDocument();
  });

  it('Testa se a url do navegador muda ao clicar no link', () => {
    const { history } = renderWithRouter(<App />);
    const linkToPoke = screen.getByRole('link', {
      name: moreDetails,
    });
    userEvent.click(linkToPoke);

    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);

    const pokinfos = screen.getByText(/More details/i);
    userEvent.click(pokinfos);

    const checkbox = screen.getByText(/Pokémon favoritado?/i);
    userEvent.click(checkbox);

    const favorite = screen.getByAltText('Pikachu is marked as favorite');
    expect(favorite).toHaveAttribute(
      'src',
      '/star-icon.svg',
    );
    expect(favorite).toBeInTheDocument();
  });
});
