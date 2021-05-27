import React from 'react';
import userEvent from '@testing-library/user-event';
// import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import RenderWithRouter from '../RenderWithRouter';
import App from '../App';

const pikachu = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary:
    'This intelligent Pokémon roasts hard berries with electricity',
};

describe('testa Requisito 7', () => {
  it('verifica se o nome do pokemons selecionado aparece na tela', () => {
    RenderWithRouter(<App />);
    const moreDetails = screen.getByText(/more details/i);
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const pkmnName = screen.getByText(`${pikachu.name} Details`);
    expect(pkmnName).toBeInTheDocument();
  });

  it('verifica a não existência do link More Details', () => {
    RenderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    expect(moreDetails).not.toBeInTheDocument();
  });

  it('verifica a existência do H2 Summary', () => {
    RenderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const headingSummary = screen.getByRole('heading', {
      level: 2,
      name: /summary/i,
    });
    expect(headingSummary).toBeInTheDocument();
  });

  it('verifica a existência de informações sobre o pokemon', () => {
    RenderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const summary = screen.getByText(`${pikachu.summary}`);
    expect(summary).toBeInTheDocument();
  });

  it('verifica a existência de uma seção com localização do pkmn', () => {
    RenderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const headingLocations = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${pikachu.name}`,
    });
    expect(headingLocations).toBeInTheDocument();
  });

  it('verifica a existência de mapas com as localizações', () => {
    RenderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const { foundAt } = pikachu.foundAt;
    expect(foundAt.length).toBe(2);
  });

  it('verifica se cada mapa contém o nome de sua localização', () => {
    RenderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const mapLocation = screen.getByText(`${pikachu.foundAt[0].location}`);
    expect(mapLocation.textContent).toBe('Kanto Viridian Forest');
    expect(mapLocation).toBeInTheDocument();

    const imgMapLocation = screen.getAllByRole('img', {
      name: `${pikachu.name} location`,
    });
    expect(imgMapLocation[0]).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    );
    expect(imgMapLocation[1]).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    );
  });

  it('verifica se o uruário consegue faoritar um pokemon', () => {
    RenderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const favCheckbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado?/i });
    expect(favCheckbox).toBeInTheDocument();
    userEvent.click(favCheckbox);
    const favPkmn = screen.getByRole('img', {
      name: `${pikachu.name} is marked as favorite`,
    });
    expect(favPkmn).toBeInTheDocument();
    userEvent.click(favCheckbox);
    expect(favPkmn).not.toBeInTheDocument();
  });
});
