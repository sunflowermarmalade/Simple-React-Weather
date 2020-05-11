import React from "react";
import ReactDOM from "react-dom";
import Spinner from "./components/Spinner";
import Weather from "./components/Weather";
import ErrorMessage from "./components/ErrorMessage";

class App extends React.Component {
  state = {
    lat: null,
    long: null,
    errorMess: "",
  };
  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) =>
        this.setState({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        }),
      // !!Never do: this.state.lat = position.coords.latitude
      (err) => this.setState({ errorMess: err.message })
    );
  }
  render() {
    if (this.state.errorMess) {
      return <ErrorMessage message={this.state.errorMess} />;
    }
    if (!this.state.errorMess && !this.state.lat && !this.state.long) {
      return <Spinner />;
    } else {
      return (
        <div class="ui active dimmer">
          <div class="ui text">
            <div class="ui raised very padded text">
              <Weather lat={this.state.lat} long={this.state.long} />
            </div>{" "}
          </div>
        </div>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
