import React from 'react';

class Generations extends React.Component {
  constructor() {
    super();

    this.fetchGenerations = this.fetchGenerations.bind(this);


    this.state = {
      generations: [],
    };
  }

  componentDidMount() {
    this.fetchGenerations();
  }

  fetchGenerations(offset = 0) {
    const url = `https://pokeapi.co/api/v2/generation/?limit=800`
    fetch(url)
      .then((response) => response.json())
      .then((response) => this.setState({ 
        generations: response.results,
      }));
  }

  render() {
    const { generations } = this.state;
    return (
      <section>
        <h2>GENERATIONS</h2>
        <ul>
        { generations.map((entry) => {
            return <li key={entry.name}><a href={`/generations/${entry.name}`}>{entry.name.toUpperCase()}</a></li>
          })}
        </ul>
      </section>
    )
  }
}

export default Generations;