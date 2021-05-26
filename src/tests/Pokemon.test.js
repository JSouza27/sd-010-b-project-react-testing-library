import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('render pokemons\'s card properly', () => {
  it('render pokemon\'s card with name, type, weight and image', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);

    userEvent.click(getByRole('button', { name: 'Electric' }));

    expect(getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
    expect(getByTestId('pokemon-type')).toHaveTextContent('Electric');
    expect(getByTestId('pokemon-weight')).toHaveTextContent(/Average weight:/i);
    expect(getByRole('img')).toHaveAttribute('alt', 'Pikachu sprite');
    expect(getByRole('img')).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('renders a link to the detail page', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);

    userEvent.click(getByRole('button', { name: 'Electric' }));
    const moreDetailsLink = getByText('More details');
    expect(moreDetailsLink).toBeInTheDocument();
    expect(moreDetailsLink).toHaveAttribute('href', '/pokemons/25');

    userEvent.click(moreDetailsLink);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('renders a star icon when the pokemon is favorited', () => {
    const { getByRole, getByText, getByAltText } = renderWithRouter(<App />);

    userEvent.click(getByRole('button', { name: 'Electric' }));
    userEvent.click(getByText('More details'));
    userEvent.click(getByRole('checkbox', { id: 'favorite' }));

    const favoriteImg = getByAltText(/is marked as favorite/i);
    expect(favoriteImg).toBeInTheDocument();
    expect(favoriteImg).toHaveAttribute('src', '/star-icon.svg');
  });
});
