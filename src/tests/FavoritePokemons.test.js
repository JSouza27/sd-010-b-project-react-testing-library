import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste requisito 3', () => { // o terceiro teste deste requisito no README é basicamente a mesma coisa que esse daqui, então esse vale pelos dois.
  test('Teste se aparece:No favorite pokemon found(se não há nada favoritado)', () => {
    renderWithRouter(<FavoritePokemons />);
    expect(screen.queryByText('No favorite pokemon found')).toBeDefined();
  });
  // esse teste abaixo eu tive a ajuda do meu colega Alexandre Damasceno. Link do PR dele: https://github.com/tryber/sd-010-b-project-react-testing-library/pull/83/commits/d8255df3f2e23fa8cb94bc3c3cf67aa9560e8332
  test('Testa se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />); // primeiro tem que tá no App(que é o Home), porque tenho que clicar no link do More Details.
    const moreDetailsLink = screen.getByText('More details'); // Apesar de ser um link, não preciso necessariamente colocar ele como link. Requisito não pediu, só preciso clicar em More Details.
    userEvent.click(moreDetailsLink); // Aí já entra numa pág diferente, com os detalhes do Pokemon.
    const favoriteSelect = screen.getByLabelText('Pokémon favoritado?'); // Aqui eu peguei a caixinha do Select usando o getByLabelText, usando o texto que tá do lado desse select.
    userEvent.click(favoriteSelect); // Aí só preciso clicar nesse select.
    renderWithRouter(<FavoritePokemons />); // aí agora sim eu entro na página do FavoritePokemons e vejo se tá renderizado o card(s) favoritado(s).
    const allCards = screen.getAllByRole('img');
    expect(allCards.length).not.toBe(0); // se não estive zerado de imagem, é porque renderizou pelo menos um card.
  });
});
