import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o componente Pokemon', () => {
  test('Renderiza um card com as informações do pokemon', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    fireEvent.click(moreDetails);

    // Nome do pokemon aparece na tela
    const pokeName = screen.getByText('Pikachu');
    expect(pokeName).toBeInTheDocument();

    // Tipo do pokemon
    const pokeType = screen.getByText('Electric');
    expect(pokeType).toBeInTheDocument();

    // Mostra o peso do pokemon
    const pokeWeight = screen.getByText('Average weight: 6.0 kg');
    expect(pokeWeight).toBeInTheDocument();

    // Imagem do pokemon e alt
    const src = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const alt = 'Pikachu sprite';

    const pokeImg = screen.getAllByRole('img');
    expect(pokeImg[0]).toHaveAttribute('src', src);
    expect(pokeImg[0]).toHaveAttribute('alt', alt);
  });

  test('Se o link está correto, com um id específico', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    fireEvent.click(moreDetails);

    // Testa se redireciona para a página com o ID específico do pokemon
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Se redireciona para a pagina de detalhes do pokemon', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    fireEvent.click(moreDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    // Verifica se a página está correta
    const pokeName = screen.getByText('Pikachu');
    expect(pokeName).toBeInTheDocument();
  });

  test('Verifica se existe um icone com uma estrela nos pokemons favoritados', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    fireEvent.click(moreDetails);

    // Clica no checkbox para favoritar
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);

    // Verifica se o icone tem uma src e alt específico
    const src = '/star-icon.svg';
    const alt = 'Pikachu is marked as favorite';

    const iconImg = screen.getAllByRole('img');
    expect(iconImg[1]).toHaveAttribute('src', src);
    expect(iconImg[1]).toHaveAttribute('alt', alt);
  });
});
