import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';
import App from '../App';

const moreDetailsText = 'More details';
describe('Renders detailed information about the pokemon', () => {
  it('renders title and summary', () => {
    const { getAllByRole, getByRole, queryByText } = renderWithRouter(<App />);
    const { name, summary } = pokemons[0];
    userEvent.click(getByRole('link', { name: moreDetailsText }));

    const headings = getAllByRole('heading', { level: 2 });

    expect(headings[0]).toHaveTextContent(`${name} Details`);
    expect(headings[1]).toHaveTextContent('Summary');
    expect(headings[1].nextSibling).toHaveTextContent(summary);
    expect(queryByText(moreDetailsText)).toBeNull();
  });
});
