import React from 'react';
import { render } from '@testing-library/react';
import { About } from '../components';

describe('Testing the about page', () => {
  it('Testing whether the page contains an heading with the text About Pokédex.', () => {
    const { getByText, getByRole, container } = render(<About />);
    const heading = getByText('About Pokédex');
    const paragraph = container.querySelectorAll('p');
    const image = getByRole('img');

    // https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
    const imgURL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(heading).toBeInTheDocument();
    expect(paragraph.length).toBe(2);
    expect(image).toHaveAttribute('src', imgURL);
    expect(image).toHaveAttribute('alt', 'Pokédex');
  });
});
