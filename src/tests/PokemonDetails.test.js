import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const moreDetails = 'More details';

test('Teste se há um título Pikachu Details', () => {
  renderWithRouter(<App />);
  userEvent.click(screen.getByText(moreDetails));
  const title = screen.getByText('Pikachu Details');
  expect(title).toBeInTheDocument();
});

describe('Teste se as informações detalhadas são mostradas na tela', () => {
  test('Testa se "Mais detalhes" não está no documento', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText(moreDetails));
    expect(screen.queryByText(moreDetails)).not.toBeInTheDocument();
  });
  test('Testa se há um h2 com o texto Summary', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText(moreDetails));
    const summary = screen.getByText('Summary');
    expect(summary).toBeInTheDocument();
  });
  test('Testa se há um parágrafo de descrição', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText(moreDetails));
    const description = (screen.getByText(/This intelligent Pokémon roasts/i));
    expect(description).toBeInTheDocument();
  });
});

describe('Teste da seção com os mapas contendo as localizações do pokémon', () => {
  test('heading h2 com o texto Game Locations of <name>', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText(moreDetails));
    const location = (screen.getByText(/Game locations of Pikachu/i));
    expect(location).toBeInTheDocument();
  });
  test('As localizações do Pokémon devem ser mostradas na seção de detalhes', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText(moreDetails));
    const location1 = (screen.getByText('Kanto Viridian Forest'));
    expect(location1).toBeInTheDocument();
    const location2 = (screen.getByText('Kanto Power Plant'));
    expect(location2).toBeInTheDocument();
  });
  test('Devem ser exibidos, o nome e uma imagem do mapa em cada localização;', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText(moreDetails));
    const location1 = (screen.getByText('Kanto Viridian Forest'));
    expect(location1).toBeInTheDocument();
    const location2 = (screen.getByText('Kanto Power Plant'));
    expect(location2).toBeInTheDocument();
    const locations = screen.getAllByAltText('Pikachu location');
    expect(locations.length).toBe(2);
  });
  test('A imagem da localização deve ter src com a URL da localização;', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText(moreDetails));
    const locations = screen.getAllByAltText('Pikachu location');
    expect(locations[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locations[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
});

describe('Teste da seleção de favorito', () => {
  test('A página deve exibir um checkbox que permite favoritar o Pokémon', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText(moreDetails));
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });
  test('Cliques alternados devem adicionar e remover da lista de favoritos', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText(moreDetails));
    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);
    expect(screen.getByAltText('Pikachu is marked as favorite')).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(screen.queryByAltText('Pikachu is marked as favorite'))
      .not.toBeInTheDocument();
  });
  test('O label do checkbox deve conter o texto Pokémon favoritado?;', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText(moreDetails));
    const checkboxLabel = screen.getByLabelText('Pokémon favoritado?');
    expect(checkboxLabel).toBeInTheDocument();
  });
});
