import React from 'react';
import { fireEvent } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Requirement 1 - Test the <App.js> component', () => {
  it('Tests if the main page of Pokédex is rendered at the URL "/"', () => {
    // Acessar componentes
    const { getByText, history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    const home = getByText(/pokédex/i);

    // Manipular componentes

    // Testar componentes
    expect(pathname).toBe('/');
    expect(home).toBeInTheDocument();
  });

  it('Tests if the top of the app contains a group of navigation links', () => {
    // Acessar componentes
    const { getByRole } = renderWithRouter(<App />);
    // Source: https://testing-library.com/docs/queries/byrole/
    const home = getByRole('link', { name: 'Home' });
    const about = getByRole('link', { name: 'About' });
    const favorite = getByRole('link', { name: 'Favorite Pokémons' });

    // Manipular componentes

    // Testar componentes
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
  });

  // Source: https://app.betrybe.com/course/front-end/testes-automatizados-com-react-testing-library/rtl-testando-react-router/58c480e0-79ed-47bd-a819-f88d82997927/conteudos/3ac4a246-7ea6-4722-bd9d-7c141435d8ee/testando-react-router/367f539c-699b-4e1c-abcc-03b14d1a608e?use_case=next_button
  it('Tests if the app redirect to the inicial page by clicking on HOME link', () => {
    // Acessar componentes
    const { getByRole, getByText, history } = renderWithRouter(<App />);

    // Manipular componentes
    fireEvent.click(getByRole('link', { name: 'Home' }));

    // Testar componentes
    const { pathname } = history.location;
    const home = getByText(/Encountered pokémons/i);
    expect(pathname).toBe('/');
    expect(home).toBeInTheDocument();
  });

  it('Tests if the app redirect to the inicial page by clicking on ABOUT link', () => {
    // Acessar componentes
    const { getByRole, getByText, history } = renderWithRouter(<App />);

    // Manipular componentes
    fireEvent.click(getByRole('link', { name: 'About' }));

    // Testar componentes
    const { pathname } = history.location;
    const about = getByText(/About Pokédex/i);
    expect(pathname).toBe('/about');
    expect(about).toBeInTheDocument();
  });

  it('Tests if the app redirect to the inicial page by clicking on FAVORITE link', () => {
    // Acessar componentes
    const { getByRole, getByText, history } = renderWithRouter(<App />);

    // Manipular componentes
    userEvent.click(getByRole('link', { name: 'Favorite Pokémons' }));

    // Testar componentes
    const { pathname } = history.location;
    const favorite = getByText(/Favorite pokémons/);
    expect(pathname).toBe('/favorites');
    expect(favorite).toBeInTheDocument();
  });

  it('Tests if the app redirect to the NOT FOUND by entering in a undefined URL', () => {
    // Acessar componentes
    const { getByText, history } = renderWithRouter(<App />);

    // Manipular componentes
    history.push('/notfound');

    // Testar componentes
    const notFound = getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
