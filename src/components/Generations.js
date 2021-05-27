import React, { Component } from 'react'

class Generations extends Component {
  constructor(props){
    super(props);
    this.state = {
      generations: [],
    }

  }

  componentDidMount(){
    fetch('https://pokeapi.co/api/v2/generation/')
    .then(res => res.json())
    .then(response => {
      console.log(response.results);
      this.setState({
        generations: response.results,
      })
    });
  }
  render () {
    const { generations } = this.state;
    return (
      <section>
        <h2>Generations</h2>
        <ol>
          {generations.map((generation, index) => {
          return <li key={index}>
            <p>{generation.name}</p>
            <a href={generation.url}>{generation.url}</a>
            </li>
          }
          )}
        </ol>
      </section>
    )
  }
}

export default Generations