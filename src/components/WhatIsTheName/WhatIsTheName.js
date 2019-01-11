import React, { Component } from 'react';
import './what-is-the-name.scss';

const suggestedNames = [
    'Wallace',
    'Warley',
    'Warlen',
    'Welton',
    'Waldemar',
    'Waldir',
    'Waldo',
    'Waldomiro',
    'Walgi',
    'Walter',
    'Walmor',
    'Walson',
    'Waldisnei',
    'Walisson',
    'Walton',
    'Walssomar',
    'Waldinei',
    'Walgismar',
    'Wander',
    'Wagner',
    'Wanderson',
    'Washington',
    'Wanderley',
    'Wandaley',
    'Wady',
    'Walton',
    'Waldrich',
    'Walger',
    'Waltrode',
    'Walison',
    'Wallis',
    'Wayne'
];

export class WhatIsTheName extends Component {

  state = {
    name: null
  };

  componentDidMount() {
    this.getRandomName()
        .then(name => {
          this.setState({ name });
        })
  }

  getRandomName() {
    // Get a suggested name from array
    const suggested = suggestedNames[Math.floor(Math.random() * suggestedNames.length)];
    // Search for it and append the name variations from IBGE
    return fetch(`https://servicodados.ibge.gov.br/api/v1/censos/nomes/basica?nome=${suggested}`)
      .then(res => res.json())
      .then(data => {
          const otherNames = data[0].nomes.split(',');
          suggestedNames.push(...otherNames);
          return suggestedNames[Math.floor(Math.random() * suggestedNames.length)];
      });
  }

  render() {
    const { name } = this.state;
    return(
      <section>
        { name
            ? <h2>{name}</h2>
            : <h2>???</h2>
        }
      </section>
    );
  }
}