import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';
import pokemons from '../data';

const [,,,,,,,,
  dragonair,
] = pokemons;

const { averageWeight, id, image, name, type } = dragonair;
const { measurementUnit, value } = averageWeight;

describe(`Teste se é renderizado um card com
as informações de determinado pokémon.`, () => {
  it('O nome correto do Pokémon deve ser mostrado na tela', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon pokemon={ dragonair } isFavorite={ false } />,
    );
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(name);
  });

  it('O tipo correto do pokémon deve ser mostrado na tela', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon pokemon={ dragonair } isFavorite={ false } />,
    );
    const pokemonType = getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(type);
  });

  it(`O peso médio do pokémon deve ser exibido com um texto no formato
Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são, 
respectivamente, o peso médio do pokémon e sua unidade de medida.`, () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon pokemon={ dragonair } isFavorite={ false } />,
    );
    const pokemonAverageWeight = getByTestId('pokemon-weight');
    expect(pokemonAverageWeight).toHaveTextContent(
      `Average weight: ${value} ${measurementUnit}`,
    );
  });

  it(`A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a 
URL da imagem e um atributo alt com o texto <name> sprite, 
onde <name> é o nome do pokémon`, () => {
    const { getByRole } = renderWithRouter(
      <Pokemon pokemon={ dragonair } isFavorite={ false } />,
    );
    const pokemonImage = getByRole('img', { name: `${name} sprite` });
    expect(pokemonImage).toHaveAttribute('src', image);
  });
});

describe(`Teste se o card do Pokémon indicado na Pokédex contém um link de navegação
para exibir detalhes deste Pokémon.
  O link deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido`, () => {
  it('', () => {
    const { getByRole } = renderWithRouter(
      <Pokemon pokemon={ dragonair } isFavorite={ false } showDetailsLink />,
    );
    const moreDetails = getByRole('link');
    expect(moreDetails).toHaveAttribute('href', `/pokemons/${id}`);
  });
});

describe(`Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento
da aplicação para a página de detalhes de Pokémon`, () => {
  it('', () => {
    const { getByRole } = renderWithRouter(<App />);
    const moreDetails = getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);

    const heading = getByRole('heading', {
      level: 2,
      name: /pikachu details/i,
    });
    expect(heading).toBeInTheDocument();
  });
});

describe(`Teste também se a URL exibida no navegador muda para /pokemon/<id>, onde <id>
é o id do Pokémon cujos detalhes se deseja ver`, () => {
  it('', () => {
    const { getByRole, history } = renderWithRouter(
      <Pokemon pokemon={ dragonair } isFavorite={ false } showDetailsLink />,
    );
    const moreDetails = getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);

    const { location: { pathname } } = history;
    expect(pathname).toBe(`/pokemons/${id}`);
  });
});

describe('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
  it(`O ícone deve ser uma imagem com o atributo src contendo o caminho 
/star-icon.svg e um atributo alt igual a <pokemon> is marked as favorite,
onde <pokemon> é o nome do Pokémon exibido.`, () => {
    const { getByRole } = renderWithRouter(
      <Pokemon pokemon={ dragonair } isFavorite showDetailsLink />,
    );
    const favoriteStar = getByRole('img', { name: `${name} is marked as favorite` });
    expect(favoriteStar).toHaveAttribute('src', '/star-icon.svg');
  });
});
