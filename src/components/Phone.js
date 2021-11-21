import React from "react";
import axios from "axios";

class Phone extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            lat: this.props.lat,
            long: this.props.long,
            phval: "",
            added: true
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick = async () => {
        console.log("PROPS: " + this.props.lat + " " + this.props.long)

        const response = await axios.get(
            `http://localhost:9999/api/addphone?phone=${this.state.phval}&lat=${this.state.lat}&long=${this.state.long}`
        );

        console.log("SUBMITTED")

    }

    addUser = async () => {
        const response = await axios.get(
            `http://localhost:9999/api/addphone?phone=${this.state.phval}&lat=${this.state.lat}&long=${this.state.long}`
        );
    }

    render() {
        return (
            <div>
                <div class="ui left corner labeled input">
                    <input type="text" placeholder="Phone..." onChange={e => this.setState({ phval: e.target.value })} />
                    <div class="ui left corner label">
                        <i class="phone icon"></i>
                    </div>
                </div>
                <div>
                    {this.state.added ? (
                        <button class="ui button" onClick={this.handleClick}>
                            Subscribe
                        </button>
                    ) : "Subscribed!"}
                </div>
            </div>);
    }
}

export default Phone;