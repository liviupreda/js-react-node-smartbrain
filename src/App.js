import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import './App.css';

const app = new Clarifai.App({
  apiKey: '88f9590e6fde4cdfa484152130055061'
});

const particleParams = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800 //150
      }
    }
  }
};
// ,.
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin'
    };
  }

  calcFaceCoords = data => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    /* clarifaiFace will get from the Clarifai API:
    'bounding_box': {
             'top_row': 0.3,
             'left_col': 0.2,
             'bottom_row': 0.7,
             'right_col': 0.8
           } 
      These are percentages of the image dimensions. */
    const image = document.getElementById('input__image');
    const width = Number(image.width);
    const height = Number(image.height);
    // console.log(width, height);

    // So we need to calculate the coords of the face box(es)
    // and draw it as a rectangular border

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    };
  };

  // Populate the box{} of the state
  showFaceBox = box => {
    console.log(box);
    this.setState({ box });
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.showFaceBox(this.calcFaceCoords(response)))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className='App'>
        <Particles className='particles' params={particleParams} />
        <Navigation />
        {this.state.route === 'signin' ? (
          <SignIn />
        ) : (
          <>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition
              box={this.state.box}
              imageUrl={this.state.imageUrl}
            />
          </>
        )}
      </div>
    );
  }
}

export default App;

// console.log(
//   response.outputs[0].data.regions[0].region_info.bounding_box
// );
