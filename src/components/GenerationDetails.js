import React from 'react';

class GenerationDetails extends React.Component {
  constructor() {
    super();

    this.fetchGenerations = this.fetchGenerations.bind(this);

    this.state = {
      generation: [],
      name: '',
    }
  }

  componentDidMount() {
    const { generation } = this.props.match.params
    const array = generation.split('-');
    let id;
    switch (array[1]) {
      case 'i':
          id = 1;
        break;
      case 'ii':
          id = 2;
        break;
      case 'iii':
          id = 3;
        break;
      case 'iv':
          id = 4;
        break;
      case 'v':
          id = 5;
        break;
      case 'vi':
          id = 6;
        break;
      case 'vii':
          id = 7;
        break; 
      default:
        id = 8
        break;
    }
    this.fetchGenerations(id);
  }

  fetchGenerations(generation) {
    const url = `https://pokeapi.co/api/v2/generation/${generation}/`
    fetch(url)
      .then((response) => response.json())
      .then((response) => this.setState({ 
        generation: response.pokemon_species,
        name: response.main_region.name,
      }));
  }

  render() {
    const { generation, name } = this.state
    return (
      <section>
        <h2>Region: {name.toUpperCase()}</h2>
        <h3>Pokémons introduced: ({ generation.length })</h3>
        <ul>
          { generation.map((entry) => <li key={entry.name}>{entry.name}</li>)} 
        </ul>

      </section>
    )
  }
}

export default GenerationDetails;
