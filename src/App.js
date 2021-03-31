import './App.css';
import React, {Component} from "react";
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import { render } from '@testing-library/react';

export default class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  state = {
    loading: true,
    temperature: null,
    location: false,
  }

  async componentDidMount() {
    navigator.geolocation.getCurrentPosition((data) => this.setState(
      {location: data.coords})
    );
    const url = 'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/18/lat/59/data.json';
    const response = await fetch(url);
    const data = await response.json();
    this.setState({temperature: data.timeSeries[0], loading: false})
  }



  render() {

    if (this.state.loading) {
      return <div>loading...</div>
    }

    if (!this.state.temperature) {
      return <div>Did not get data</div>
    }

    if (!this.state.location) {
      return <div>Could not find you</div>
    }

    return <div>
      <div>
        <h1>{this.state.temperature.parameters[10].values} °C</h1>
        <h4>Your location
          {this.state.location.longitude} -
          {this.state.location.latitude}</h4>

          <h4>Wind {this.state.temperature.parameters[14].values} m/s</h4>
      </div>
    </div>;
  }
}



