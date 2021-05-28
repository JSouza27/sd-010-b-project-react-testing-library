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
    expect(previousButton).toHaveAttribute('disabled');
    expect(nextButton).toBeInTheDocument();
    userEvent.click(nextButton);
    expect(previousButton).not.toHaveAttribute('disabled');
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

  it('Testa se a lista tem 20 cidades', async () => {
    const numberOfCities = 20;
    renderWithRouter(<Locations />);
    const list = await screen.findAllByRole('listitem');
    expect(list.length).toBe(numberOfCities);
  });
});

test('testa a exibição de pagina 1 e 2 de 4o', () => {
  renderWithRouter(<Locations />);
  const text = screen.getByText('Página 1 de 40');
  expect(text).toBeInTheDocument();
  const nextButton = screen.getByText('Próxima');
  userEvent.click(nextButton);
  const text2 = screen.getByText('Página 2 de 40');
  expect(text2).toBeInTheDocument();
});

test(' testa a exibição do título', () => {
  renderWithRouter(<Locations />);
  const title = screen.getByRole('heading', { level: 2 });
  expect(title).toBeInTheDocument();
});

describe('Testa a exibição do offset', () => {
  beforeAll(() => { jest.useFakeTimers(); });
  afterAll(() => { jest.useRealTimers(); });

  test('Testa se o offset da primeira página está sendo exibido', async () => {
    renderWithRouter(<Locations />);
    const offset = await screen.findByText(/1 a 20 de 796/);
    expect(offset).toBeInTheDocument();
  });
});
