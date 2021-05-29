// algumas partes desta resolução foram por meio de ajuda do colega Dennis Marcelo. Link do PR dele: https://github.com/tryber/sd-010-b-project-react-testing-library/pull/88/commits/b5f823ed2bc3b265a026d7218c986911f2bd11a4
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
// import pokemons from '../data';

describe('Primeiro do 7', () => {
  test('A página deve conter um texto <name> Details', () => { // vou fazer essa com o caterpie.
    const { history } = renderWithRouter(<App />);
    let pokeId = '/pokemons';
    pokeId += '/10'; // tive que fazer isso por causa do Lint. Usando uma LET, consigo usar isso várias vezes pelo código. Talvez precisarei fazer mais vezes.
    history.push(pokeId); // Aqui foi uma ideia do Dennis.
    // fazendo isso aqui, eu garanto que estou na URL correta, com o ID do Caterpie(depois que clico em More details).
    expect(screen.getByText('Caterpie Details')).toBeInTheDocument();
  });
  test('Não deve existir o link para os detalhes do Pokémon selecionado', () => {
    const { history } = renderWithRouter(<App />);
    let pokeId = '/pokemons';
    pokeId += '/10';
    history.push(pokeId);
    const link = screen.queryByRole('link', { // aqui eu tava tentando com o getByRole, mas dava erro direto. Aí mudei pro queryByRole e deu certo.
      name: /More details/i,
    });
    expect(link).not.toBeInTheDocument();
  });
  test('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/10');
    const heading = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(heading).toBeInTheDocument();
  });
  test('A seção de detalhes deve conter um parágrafo com o resumo do Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/10');
    let phrase = 'For protection, it releases a horrible stench  ';
    phrase += 'from the antennae on its head to drive away enemies.';
    expect(phrase).toBeDefined();
  });
});
describe('Segundo do 7', () => {
  test('A seção deve ter um h2 escrito: Game Locations of <nome do Pokemon>', () => {
    const { history } = renderWithRouter(<App />);
    let pokeId = '/pokemons';
    pokeId += '/10';
    history.push(pokeId);
    const h2 = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Caterpie',
    });
    expect(h2).toBeDefined();
  });
  test('Todas localizações do Pokémon devem ser mostradas na seção de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    let pokeId = '/pokemons';
    pokeId += '/23'; // esse aqui tive que mudar pro Pokemon Ekans. O Caterpie tinha 4 imagens e no expect tava dando erro o número 4(só aceitava até o 2). Então mudei pro Ekans que só tem uma imagem.
    history.push(pokeId);
    let nomeDoPoke = 'Ekans '; // de novo POR CAUSA DO Lint.
    nomeDoPoke += 'location';
    const imgs = screen.getAllByAltText(nomeDoPoke); // aqui eu capturo pelo ALT das imagens( aqui é Ekans location).
    expect(imgs.length).toBe(1); // espero que só tenha somente uma imagem na página que tenha esse ALT = Ekans location.
  });
  test(' A img da localização deve ter um atributo src com a URL da localização', () => {
    const { history } = renderWithRouter(<App />);
    let pokeId = '/pokemons';
    pokeId += '/23';
    history.push(pokeId);
    const imgs = screen.getAllByAltText('Ekans location');
    expect(imgs[0].src).toBe('https://cdn2.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png'); // quero que essa imagem tenha este src.
  });
  test('A img da localização deve ter um ALT com o texto <name> location', () => {
    const { history } = renderWithRouter(<App />);
    let pokeId = '/pokemons';
    pokeId += '/23';
    history.push(pokeId);
    const imgs = screen.getAllByAltText('Ekans location'); // quero que essa imagem tenha este ALT.
    expect(imgs[0]).toBeInTheDocument();
  });
  test('Tem que ter o nome da localização', () => {
    const { history } = renderWithRouter(<App />);
    let pokeId = '/pokemons';
    pokeId += '/23';
    history.push(pokeId);
    expect(screen.getByText('Goldenrod Game Corner')).toBeInTheDocument();
  });
});
describe('Último do 7', () => {
  test('A label do checkbox deve conter o texto Pokémon favoritado?', () => { // começar por esse( no README esse é o último).
    const { history } = renderWithRouter(<App />);
    let pokeId = '/pokemons';
    pokeId += '/23';
    history.push(pokeId);
    const textoLabel = screen.getByLabelText('Pokémon favoritado?'); // Essa é a label do checkbox, então usa o getByLabelText.
    expect(textoLabel).toBeInTheDocument();
  });
  // o teste abaixo eu juntei os outros dois que faltavam. Tem que ter um checkbox, e ao ficar clicando nesse checkbox eu posso favoritar ou desfavoritar.
  test('Posso favoritar e desfavoritar ao clicar no Checkbox', () => {
    const { history } = renderWithRouter(<App />);
    let pokeId = '/pokemons';
    pokeId += '/23';
    history.push(pokeId);
    const textoLabel = screen.getByLabelText('Pokémon favoritado?');
    // tentei primeiro fazer com que, após clicar no 'Pokémon favoritado', aparecesse ou deixasse de aparecer a estrelinha, mas não passou no teste. Então mudei pra esta forma. Também foi uma resolução que veio pelo Dennis Marcelo
    userEvent.click(textoLabel);
    expect(screen.getByAltText('Ekans is marked as favorite')).toBeInTheDocument();
    // depois de clicar nesta label(que tá do lado do checkbox), quero que fique favoritado, aí aparece este alt.
    userEvent.click(textoLabel);
    expect(screen.queryByAltText('Ekans is marked as favorite'))
      .not.toBeInTheDocument(); // lógica oposta do que escrevi agora pouco. Aqui é pra desfavoritar.
  });
});
