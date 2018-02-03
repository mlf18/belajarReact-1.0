import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const scaleName = {
  c : "Celcius",
  f : "Fahrenheit",
}
function toFahrenheit(input){
  const f=((input-32)/9)*5;
  return f;
}
function toCelcius(input){
  const c=((input/5)*9)+32;
  return c;
}
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  console.log(temperature);
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class Temprature extends Component{
  constructor(props){
    super(props);
    this.state={
      value:[],
    }
    this.handleChange=this.handleChange.bind(this);
  }
  handleChange(e){
    //menjalankan fungsi handleFahrenheit atau celcius change
    this.props.onTemperatureChange(e.target.value);
    // console.log(this.state.value);
  }
  render(){
    return(
      <div className ="temprature">
      {scaleName[this.props.scale]} : 
        <input 
        type="text" 
        value={this.props.temperature}
        onChange={this.handleChange} />
      </div>
    );
  }
}

class Calculator extends Component{
  constructor(props){
    super(props);
    this.handleCelciusChange=this.handleCelciusChange.bind(this);
    this.handleFahrenheitChange=this.handleFahrenheitChange.bind(this);
    this.state={
      temperature:'',scale:'c',
    }
  }
  handleCelciusChange(temperature){
    this.setState({scale:'c',temperature});
  }
  handleFahrenheitChange(temperature){
    this.setState({scale:'f',temperature});
  }
  render(){
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celcius = scale === 'f' ? tryConvert(temperature, toCelcius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
    // console.log(fahrenheit);
    // console.log(celcius);
    return(
      <div className="calculator">
        <Temprature 
        scale="c"
        temperature={celcius}
        //ontempraturechange props bukan fungsi
        onTemperatureChange={this.handleCelciusChange}
        />
        <Temprature 
        scale="f"
        temperature={fahrenheit}
        onTemperatureChange={this.handleFahrenheitChange}
        />
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        
        <Calculator/>
        
        <p className="App-intro">    
        </p>
      </div>
    );
  }
}

export default App;
