import React, { Component } from 'react';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { WhatIsTheName } from './components/WhatIsTheName/WhatIsTheName';

import './layout.scss';


class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <WhatIsTheName />
        <Footer />
      </div>
    );
  }
}

export default App;
