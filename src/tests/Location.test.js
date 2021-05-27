import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Locations from '../components/Locations';
import App from '../App';

describe('Testa a rota (/locations)', () => {
  test('A url da rota deve ser /locations', () => {
    const { history } = renderWithRouter(<App />);
    const locationsLink = screen.getByText('Locations');
    userEvent.click(locationsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/locations');
  });
  test('Testa a exibição da lista de localizações', () => {
    renderWithRouter(<Locations />);
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
  });
});

describe('Testa o link Locations', () => {
  test('O link deve ter o texto Locations', () => {
    renderWithRouter(<App />);
    const locationsLink = screen.getByText('Locations');
    expect(locationsLink).toHaveTextContent('Locations');
  });
  test('Ao clicar no link, a página com a lista de localizações deve ser exibida', () => {
    renderWithRouter(<App />);
    const locationsLink = screen.getByText('Locations');
    userEvent.click(locationsLink);
  });
});

describe('Testa a navegação na lista', () => {
  test('testa os botões"Anterior" e "Próxima"', () => {
    renderWithRouter(<Locations />);
    const previousButton = screen.getByText('Anterior');
    const nextButton = screen.getByText('Próxima');
    expect(previousButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  test('Na primeira página, o botão "Anterior" deve ser desabilitado', () => {
    renderWithRouter(<Locations />);
    const previousButton = screen.getByText('Anterior');
    expect(previousButton).toHaveAttribute('disabled');
  });

  test('na última página, o botão "Próximo" deve ser desabilitado', () => {
    // 40 páginas
    const clicks = 39;
    renderWithRouter(<Locations />);
    const nextButton = screen.getByText('Próxima');
    for (let index = 0; index < clicks; index += 1) {
      userEvent.click(nextButton);
    }
    const checkNextButton = screen.getByText('Próxima');
    expect(checkNextButton).toHaveAttribute('disabled');
  });
});

describe('testa as listas e os botões', () => {
  beforeAll(() => { jest.useFakeTimers(); });
  afterAll(() => { jest.useRealTimers(); });

  it('Testa a primeira cidade da lista', async () => {
    renderWithRouter(<Locations />);
    expect(await screen.findByText('canalave-city')).toBeInTheDocument();
    screen.debug();
  });

  it('Testa a última cidade da lista', async () => {
    renderWithRouter(<Locations />);
    expect(await screen.findByText('wayward-cave')).toBeInTheDocument();
    screen.debug();
  });
});
