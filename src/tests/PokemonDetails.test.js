import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o componente <PokemonDetails />', () => {
  test('Informações dos pokemons estão na tela', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    fireEvent.click(moreDetails);

    const pokeName = screen.getByText(/pikachu details/i);
    expect(pokeName).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();

    const summary = screen.getByRole('heading', {
      level: 2,
      name: /Summary/i,
    });
    expect(summary).toBeInTheDocument();

    const info = /This intelligent Pokémon/i;
    const paragraph = screen.getByText(info);
    expect(paragraph).toBeInTheDocument();
  });

  test('Existe uma seção com os mapas contendo as localizações', () => {
    renderWithRouter(<App />);

    // Entra na página de detalhes do pokemon(Pikachu)
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    fireEvent.click(moreDetails);

    // Verifica se existe o texto 'Game Locations of pikachu' na tela
    const gameLocation = screen.getByRole('heading', {
      level: 2,
      name: /Game Locations of pikachu/i,
    });
    expect(gameLocation).toBeInTheDocument();

    // Verifica se existem todas as localizações do pokemon na tela, a partir do 'alt' da imagem
    const imglength = screen.getAllByAltText(/Pikachu location/i);
    expect(imglength.length).toEqual(2);

    // Exibe nome da localização na tela para cada lugar no mapa
    const locationName = screen.getAllByText(/kanto/i);
    expect(locationName.length).toEqual(2);

    // Imagem deve ter um src com a URL da localização e um alt com um texto específico
    const src1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const src2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';

    const locationURL = screen.getAllByRole('img');
    expect(locationURL[1]).toHaveAttribute('src', src1);
    expect(locationURL[1]).toHaveAttribute('alt', 'Pikachu location');
    expect(locationURL[2]).toHaveAttribute('src', src2);
    expect(locationURL[2]).toHaveAttribute('alt', 'Pikachu location');
  });

  test('Usuários pode favoritar um pokemon na página de detalhes', () => {
    renderWithRouter(<App />);

    // Entra na página de detalhes do pokemon(Pikachu)
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    fireEvent.click(moreDetails);

    // Página deve conter um checkbox que permite favoritar um pokemon
    const checkboxFav = screen.getByRole('checkbox');
    expect(checkboxFav).toBeInTheDocument();

    // O label do checkbox deve conter o texto 'pokemon favoritado?'
    const checkboxLabel = screen.getByLabelText('Pokémon favoritado?');
    expect(checkboxLabel).toBeInTheDocument();
  });

  test('Cliques alternados no checkbox salvam e retiram o pokemon dos favoritos', () => {
    renderWithRouter(<App />);

    // Entra na página de detalhes do pokemon(Pikachu)
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    fireEvent.click(moreDetails);

    // Clica no checkbox para favoritar
    const checkboxTrue = screen.getByRole('checkbox');
    fireEvent.click(checkboxTrue);
    expect(checkboxTrue.checked).toEqual(true);

    // Checa se foi salvo nos favoritos a partir da imagem de estrela
    const starImg = screen.getByAltText('Pikachu is marked as favorite');
    expect(starImg).toBeInTheDocument();

    // Clica novamente para tirar dos favoritos
    const checkboxFalse = screen.getByRole('checkbox');
    fireEvent.click(checkboxFalse);
    expect(checkboxFalse.checked).toEqual(false);

    // Checa a partir do número de imagens na tela
    const THREE = 3;
    const notFav = screen.getAllByRole('img');
    expect(notFav.length).toEqual(THREE);
  });
});
