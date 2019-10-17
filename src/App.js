import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

const particleParams = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 150
      }
    }
  }
};

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Particles className='particles' params={particleParams} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        {/*
      <FaceRecognition />*/}
      </div>
    );
  }
}

export default App;