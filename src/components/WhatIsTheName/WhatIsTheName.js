import React, { Component } from 'react';
import './what-is-the-name.scss';
import { SUGGESTED_NAMES, SLACK_WEBHOOK } from '../../config';

export class WhatIsTheName extends Component {

  state = {
    name: null
  };

  componentDidMount() {
    this.getRandomName()
        .then(name => {
          this.setState({ name });
          // Send a message to slack
          fetch(SLACK_WEBHOOK, {
              method: 'POST',
              mode: 'no-cors',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ text: `Meu nome é ${name}.` })
          });
        })
  }

  getRandomName() {
    // Get a suggested name from array
    const suggested = SUGGESTED_NAMES[Math.floor(Math.random() * SUGGESTED_NAMES.length)];
    // Search for it and append the name variations from IBGE
    return fetch(`https://servicodados.ibge.gov.br/api/v1/censos/nomes/basica?nome=${suggested}`)
      .then(res => res.json())
      .then(data => {
          if (data && data[0] && data[0].nomes && data[0].nomes !== '') {
              // Variations in PascalCase
              const otherNames = data[0].nomes.split(',')
                  .filter(name => name.startsWith('WA'))
                  .map(name => name.replace(/\w+/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase()));
              SUGGESTED_NAMES.push(...otherNames);
              return SUGGESTED_NAMES[Math.floor(Math.random() * SUGGESTED_NAMES.length)];
          }
          return suggested;
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