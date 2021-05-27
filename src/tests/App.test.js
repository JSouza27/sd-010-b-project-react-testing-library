import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Requirement 1, Testing App.js', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('tests if there are three links on the top of the application', () => {
    const { getByText, getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const firstLink = getAllByRole('link')[0];
    const secondLink = getAllByRole('link')[1];
    const thirdLink = getAllByRole('link')[2];
    const firstLinkText = getByText(/Home/);
    const secondLinkText = getByText(/About/);
    const thirdLinkText = getByText(/Favorite Pokémons/);
    expect(firstLink).toBe(firstLinkText);
    expect(secondLink).toBe(secondLinkText);
    expect(thirdLink).toBe(thirdLinkText);
    expect(firstLink
      && secondLink
      && thirdLink
      && firstLinkText
      && secondLinkText
      && thirdLinkText)
      .toBeInTheDocument();
  });
});
