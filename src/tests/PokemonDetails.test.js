import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './RenderWithRouter';

import App from '../App';

describe('Testes do Componente <PokemonDetails/>', () => {
  test('Verifica informações detalhadas do Pokémon selecionado em Details.', () => {
    RenderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);

    const text = screen.getByRole('heading', { name: /pikachu details/i });
    // testa se existe o heading com o texto pikachu details.
    expect(text).toBeInTheDocument();
    // testa se o link de more details não esta na tela.
    expect(linkMoreDetails).not.toBeInTheDocument();

    const h2Summary = screen.getByRole('heading', { name: /Summary/i });
    // testa se o h2 com o texto summary esta na tela
    expect(h2Summary).toBeInTheDocument();

    const detailParagraph = screen.getByText(
      /this intelligent pokémon roasts hard berries/i, { exact: false },
    );
    // testa se o paragrafo esta renderizado
    expect(detailParagraph).toBeInTheDocument();
  });

  test('Verifica se existe na página uma seção com mapas com locais dos pokémon', () => {
    RenderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);

    const h2GameLocation = screen.getByRole('heading',
      { name: /game locations of pikachu/i });
    expect(h2GameLocation).toBeInTheDocument();

    const textMapLocation1 = screen.getByText(/kanto viridian forest/i);
    expect(textMapLocation1).toBeInTheDocument();

    const textMapLocation2 = screen.getByText(/kanto power plant/i);
    expect(textMapLocation2).toBeInTheDocument();

    const imgLocation = screen.getAllByRole('img', { name: /Pikachu location/i });
    expect(imgLocation[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');

    expect(imgLocation[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('Se o usuário pode favoritar um pokémon através da página de detalhes.', () => {
    RenderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);

    const checkFavorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkFavorite);

    const starFavorite = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i });
    expect(starFavorite).toBeInTheDocument();

    userEvent.click(checkFavorite);
    expect(starFavorite).not.toBeInTheDocument();

    const textLabelCheckbox = screen.getByLabelText('Pokémon favoritado?');
    expect(textLabelCheckbox).toBeInTheDocument();
  });
});
