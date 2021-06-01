import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe(`Será avaliado se o arquivo teste Pokemon.test.js contemplam 100% dos casos
de uso criados pelo Stryker`, () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByAltText(/pikachu sprite/i);

    expect(pokemonName.textContent).toBe('Pikachu');
    expect(pokemonType.textContent).toBe('Electric');
    expect(pokemonWeight.textContent).toBe('Average weight: 6.0 kg');
    expect(pokemonImage.src).toBe(
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
  });

  it(`Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para 
  exibir detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>, onde <id> é 
  o id do Pokémon exibido;`, () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByText(/More details/i);

    expect(linkMoreDetails.href).toBe('http://localhost/pokemons/25');
  });

  it(`Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da 
  aplicação para a página de detalhes de Pokémon.
  Teste também se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id 
  do Pokémon cujos detalhes se deseja ver;`, () => {
    const { history } = renderWithRouter(<App />);

    const linkMoreDetails = screen.getByText(/More details/i);

    fireEvent.click(linkMoreDetails);

    const { pathname } = history.location;
    const pokemonDetailsTitle = screen.getByText(/pikachu details/i);

    expect(pathname).toBe('/pokemons/25');
    expect(pokemonDetailsTitle).toBeInTheDocument();
  });

  it(`Teste se existe um ícone de estrela nos Pokémons favoritados.
  O ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg;
  A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite, 
  onde <pokemon> é o nome do Pokémon exibido.`, () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByText('More details');
    fireEvent.click(linkMoreDetails);

    const favoritePokemonInput = screen.getByText('Pokémon favoritado?');
    fireEvent.click(favoritePokemonInput);

    const starIcon = screen.getByAltText(/pikachu is marked as favorit/i);

    expect(starIcon.src).toBe('http://localhost/star-icon.svg');
    expect(starIcon.alt).toBe('Pikachu is marked as favorite');
  });
});
