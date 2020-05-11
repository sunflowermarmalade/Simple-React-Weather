import React from "react";
import axios from "axios";
import Spinner from "./Spinner";

class Weather extends React.Component {
  state = {
    temp: null,
    time: null,
    tomTemp: null,
    summary: "",
    x: 3,
    sunset: 17,
  };

  fToC(fTemp) {
    return (((fTemp - 32) * 5) / 9).toFixed(2);
  }

  weatherFetch = async () => {
    const response = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/27e54db2081097290254b2180418ae90/${this.props.lat},${this.props.long}`
    );

    console.log(response);
    this.setState({
      temp: this.fToC(response.data.currently.temperature),
      tomTemp: this.fToC(response.data.daily.data[0].temperatureHigh),
      summary: response.data.currently.summary,
    });
  };

  whichImage(time) {
    if (new Date().getHours() >= 17) {
      return (
        <img
          src="https://image.freepik.com/free-vector/blue-night-sky-with-mountain-landscape-illustration_105940-228.jpg"
          class="visible content"
          alt="Saza"
        />
      );
    } else {
      return (
        <img
          src="https://cdn.dribbble.com/users/179703/screenshots/5614055/sun-rise.jpg"
          class="visible content"
          alt="Saza"
        />
      );
    }
  }

  loader() {
    return <Spinner message="Weather Loading" />;
  }

  weatherinfo() {
    return (
      <div class="ui card">
        <div class="ui image">{this.whichImage(this.state.x)}</div>
        <div class="content">
          <div href="" class="header">
            Temperature: {this.state.temp} &#176; C
          </div>
          <div href="" class="header" style={{ fontSize: 16.5 }}>
            Tomorrow's Temperature: {this.state.tomTemp} &#176; C
          </div>
          <div class="meta">
            <span class="date">{this.state.time}</span>
          </div>
        </div>
        <div class="extra content">
          <a href="/">
            <i class="terminal icon"></i>
            {this.state.summary}
          </a>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.weatherFetch();
    setInterval(() => {
      this.setState({ time: new Date().toLocaleTimeString() });
    }, 1000);
  }
  render() {
    if (!this.state.temp || !this.state.time || !this.state.tomTemp) {
      return this.loader();
    } else {
      return this.weatherinfo();
    }
  }
}

export default Weather;
