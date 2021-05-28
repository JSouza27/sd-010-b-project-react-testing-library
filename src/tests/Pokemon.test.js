//  Aprendi e entendi a resolução deste requisito com a ajuda do colega Henrique Zózimo. Link do PR dele: https://github.com/tryber/sd-010-b-project-react-testing-library/pull/18/commits
import React from 'react';
import { screen } from '@testing-library/react';
import fireEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Primeiro do 6', () => {
  test('Testa se o NOME correto do Pokémon deve ser mostrado na tela;', () => {
    renderWithRouter(<App />);// Lembrando que tou no App.
    const { name } = pokemons[0]; // Preciso fazer isso aqui. Peguei esse pokemons lá do data.js.  Ali diz a sequência dos pokemons. Antes de eu fazer isso, sempre retornava o pikachu(que era o primeiro).
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(name);
    // Olha no Pokemon.js Procura os data-testid. Espero que o P que tenha data-testid= 'pokemon-name tenha o conteúdo de NAME. Da forma que foi feito o código em Pokemon.js, esse é uma forma de testar o nome correto.
  });
  test('Testa se o TIPO correto do Pokémon deve ser mostrado na tela;', () => {
    renderWithRouter(<App />);// Lembrando que tou no App.
    const { type } = pokemons[0];
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
  });
  test('Peso médio correto do Pokemon', () => {
    renderWithRouter(<App />);
    const { averageWeight: { value, measurementUnit } } = pokemons[0]; // tou só fazendo desconstrução do que tá vindo do data.js, pra poder usar logo abaixo.
    const frasePeso = `Average weight: ${value} ${measurementUnit}`; // o texto tem que tá assim.
    expect(screen.getByTestId('pokemon-weight')).toHaveTextContent(frasePeso);
  });
  test('A imagem certa do Pokemon', () => {
    renderWithRouter(<App />);
    const { image, name } = pokemons[0];
    const imagem = screen.getByRole('img'); // tinha esquecido o screen e fiquei um tempão sem entender porque não passava no npm test.
    expect(imagem).toHaveAttribute('src', image); // lá em data.js, essa image dá a URL
    expect(imagem).toHaveAttribute('alt', `${name} sprite`); // a imagem tem que ter um atributo src e a url e um atributo alt com o nome + a palavra sprite
  });
});

describe('Segundo  do 6', () => {
  test('Testa se o card indicado tem um link  pra exibir detalhes deste Pokémon.', () => {
    renderWithRouter(<App />);
    const { id } = pokemons[0]; // desconstruindo de novo.
    const details1 = 'More';
    const details2 = ' details'; // tem que ter esse espaço antes.
    const details = details1 + details2; // fiz essa gambiarra somente aqui por causa da chatice do Lint. Queria só usar uma var com o texto More details...mas o lint não deixava.
    expect(screen.getByText(details)).toHaveAttribute(
      'href',
      `/pokemons/${id}`,
    ); // um link tem que ter a URL = /pokemons/id  Lembrando que ID é um número.
  });
});
describe('Terceiro  do 6', () => {
  test('Testa se, ao clicar no link, vai pra página de detalhes', () => {
    renderWithRouter(<App />);
    const { type } = pokemons[0];
    const details1 = 'More';
    const details2 = ' details'; // tem que ter esse espaço antes.
    const details = details1 + details2;
    const link = screen.getByText(details); // aqui crio uma var chamada link pra captar o texto 'More details'
    fireEvent.click(link);
    expect(screen.getByText(type)).toBeInTheDocument();
  }); // depois de clicar em 'More details', eu quero que apareça na tela o TIPO do pokemon( pode ser nome ou peso também). Aí o teste vai saber que deu certo
});
describe('Quarto  do 6', () => {
  test('Testa se a URL exibida no navegador muda para /pokemon/<id>', () => {
    const { history } = renderWithRouter(<App />);
    const { id } = pokemons[0];
    const details1 = 'More';
    const details2 = ' details'; // tem que ter esse espaço antes.
    const details = details1 + details2;
    const link = screen.getByText(details);
    fireEvent.click(link);
    const { pathname } = history.location; // tem que ser depois do click.
    expect(pathname).toBe(`/pokemons/${id}`); // esse pathname é o que vem depois do localhost:3000
  });
});
describe('Último do 6', () => {
  test('Testa se existe uma estrela(com src correto) nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const detalhes = 'More details'; // aqui já não precisei fazer aquela gambiarra nesta variável.
    const link = screen.getByText(detalhes);
    fireEvent.click(link);
    const favoritoOuNao = screen.getByText('Pokémon favoritado?'); // depois que clico no More details, eu vejo os detalhes do pokemon, aí tenho que clicar aonde tem Pokémon favoritado?.... Aí vou selecionar ele como favorito.
    fireEvent.click(favoritoOuNao);
    const estrelinha = screen.getAllByRole('img'); // depois que selecionei o pokemon como favorito, eu quero que apareça a imagem da estrelinha(que vai ter o src abaixo)
    expect(estrelinha[1]).toHaveAttribute(
      'src',
      '/star-icon.svg',
    );
    expect(estrelinha[1]).toBeInTheDocument();
  });
  test('Testa se a img da estrela tem o ALT correto', () => { // mesma ideia desse teste anterior,só que é um ALT no lugar do SRC.
    renderWithRouter(<App />);
    const { name } = pokemons[0];
    const detalhes = 'More details';
    const link = screen.getByText(detalhes);
    fireEvent.click(link);
    const estrelinha = screen.getAllByRole('img');
    expect(estrelinha[1]).toHaveAttribute(
      'alt',
      `${name} is marked as favorite`,
    );
  });
});
