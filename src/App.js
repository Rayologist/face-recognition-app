import React, { Component } from 'react';
import Navagation from './components/Navagation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import './App.css';
import 'tachyons';

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}


const initState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: '',
    entries: 0,
    joined: "",
  }
}


class App extends Component {

  constructor(){
    super();
    this.state = initState;
  }

  loadUser = (data) => {


    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      }
    })
  }


  onInputChange = (event) => {
    this.setState({input: event.target.value}) 

  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('input-image');
    const width = Number(image.width);
    const height = Number(image.height);


    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }


  onImageSubmit = () => {
    this.setState({imageUrl: this.state.input})
    fetch("https://calm-ridge-85929.herokuapp.com/imageUrl", {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      }
    )
    .then(resp => resp.json())
    .then(response => {
      if (response) {
        fetch("https://calm-ridge-85929.herokuapp.com/image", {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
            }
          )
          .then(resp => resp.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          .then(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err))
    }

  onRouteChange = (route) => {
    if (route === "signout"){
      this.setState(initState)
    } else if (route === "home") {
      this.setState({isSignedIn: true})
    } 
    this.setState({route: route});
    
  }

  render() {
    return (
      <div className="App">
        <Particles params={particlesOptions} className="particles"/>
        <Navagation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        {
          this.state.route === 'home'
          ? <>
              <Logo/>
              <Rank userName={this.state.user.name} userEntries={this.state.user.entries}/>
              <ImageLinkForm onInputChange={this.onInputChange} onImageSubmit={this.onImageSubmit}/>
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
            </>
          : (
            this.state.route === "signin" 
            ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>

          )
        } 

        
      </div>
    );
  }
}

// 

export default App;
