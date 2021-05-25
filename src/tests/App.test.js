import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/RenderRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { history } = renderWithRouter(<App />);

  const projectsLink = screen.getByRole('link', {
    name: /home/i,
  });
  expect(projectsLink).toBeInTheDocument();
  userEvent.click(projectsLink);
  const { pathname } = history.location;
  expect(pathname).toBe('/');

  const projectsLink2 = screen.getByRole('link', {
    name: /About/i,
  });
  expect(projectsLink2).toBeInTheDocument();

  const projectsLink3 = screen.getByRole('link', {
    name: /Favorite Pokémons/i,
  });
  expect(projectsLink3).toBeInTheDocument();
});
