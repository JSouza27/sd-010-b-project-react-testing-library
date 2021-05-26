import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';

describe('Requisito 7', () => {
  it('Teste se as informações detalhadas do selecionado são mostradas na tela.', () => {
    const { getByText, getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const { name, summary } = pokemons[0];
    fireEvent.click(getByText('More details'));
    const img = getAllByRole('img', { name: `${name} location` });
    expect(getByText(`${name} Details`)).toBeInTheDocument();
    expect(getByText(`Game Locations of ${name}`)).toBeInTheDocument();
    expect(getByText('Summary')).toBeInTheDocument();
    expect(getByText(`${summary}`)).toBeInTheDocument();
    expect(getByText('Pokémon favoritado?')).toBeInTheDocument();
    expect(img[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(img[0].alt).toBe(`${name} location`);
  });
});
