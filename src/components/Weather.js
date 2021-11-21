import React from "react";
import axios from "axios";
import Spinner from "./Spinner";
import Phone from "./Phone"

class Weather extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      temp: null,
      time: null,
      tomTemp: null,
      summary: "",
      x: 3,
      sunset: 17,
      searchp: "",
      lat: 0,
      long: 0,
      currLoc: ""
    };
    
    this.handleClick = this.handleClick.bind(this)
  }

  searchLocation = async (searchparam) => {
    //Lat & Long
    const res = await axios.get(`http://api.positionstack.com/v1/forward?access_key=API_KEY&query=${searchparam}`)

    console.log(`${res.data.data[0].latitude} ${res.data.data[0].longitude} ${res.data.data[0].label}`)
    this.setState({
      lat: res.data.data[0].latitude, 
      long: res.data.data[0].longitude,
      currLoc: res.data.data[0].label
    })
    this.weatherFetch()
    this.weatherShow()
  }

  weatherFetch = async () => {
    
    console.log("weatherFetch() " + this.props.lat + " " + this.props.long)
    const response = await axios.get(
      `http://localhost:9999/api/weather?latitude=${this.state.lat}&longitude=${this.state.long}`
    );
    // let response = {
    //   data: {
    //     currently: {
    //       temperature: 0,
    //       summary: "VVV"
    //     },
    //     daily: {
    //       data: [
    //         { temperatureHigh: 0 }
    //       ]
    //     }
    //   }
    // }
    // response.data.currently.temperature = 42
    // response.data.daily.data[0].temperatureHigh = 51
    // response.data.currently.summary = "VERY COLDDDD"

    console.log(response);
    this.setState({
      temp: response.data.currently.temperature,
      tomTemp: response.data.daily.data[0].temperatureHigh,
      summary: response.data.currently.summary,
    });
  };


  

  whichImage(time) {
    if (new Date().getHours() >= 17) {
      return (
        <img
          src="https://image.freepik.com/free-vector/blue-night-sky-with-mountain-landscape-illustration_105940-228.jpg"
          className="visible content"
          alt="Saza"
        />
      );
    } else {
      return (
        <img
          src="https://cdn.dribbble.com/users/179703/screenshots/5614055/sun-rise.jpg"
          className="visible content"
          alt="Saza"
        />
      );
    }
  }

  loader() {
    return <Spinner message="Weather Loading" />;
  }

  handleClick(){
    this.searchLocation(this.state.searchp)
  }

  weatherinfo() {
    return (
      <div>
        <div>
          <div className="ui icon input">
            <input type="text" placeholder="Search..." value={this.state.searchp} onChange={evt => this.setState({searchp: evt.target.value})}/>
            <i className="inverted circular search link icon" onClick={this.handleClick}></i>
          </div>
        </div>
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
              {this.state.summary} - {this.state.currLoc}
            </a>
          </div>
        </div>

        <Phone lat={this.state.lat} long={this.state.long} />
      </div>
    );
  }

  searchUI() {
    return (
      <div>
        <div className="ui icon input">
          <input type="text" placeholder="Search..." />
          <i className="inverted circular search link icon"></i>
        </div>
      </div>
    )
  }

  weatherShow(){
    this.weatherFetch();
    setInterval(() => {
      this.setState({ time: new Date().toLocaleTimeString() });
    }, 1000);
  }

  componentDidMount() {
    this.weatherShow()
    this.setState({
      lat: this.props.lat,
      long: this.props.long
    })
  }

  

  render() {
    if (!this.state.temp || !this.state.time || !this.state.tomTemp) {
      return this.loader();
    } else {
      return this.weatherinfo()
    }
  }
}

export default Weather;
