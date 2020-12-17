import React, { Component } from 'react';
import NoSleep from 'nosleep.js';

class SelfNoSleep extends Component {
    constructor() {
        super();
        this.noSleep = new NoSleep();

        this.state = {sleep: "Sleep"}
    }

    render() {
        return (
            <div>
                <button onClick={() => {
                    this.setState({sleep: "No Sleep"});
                    this.noSleep.enable();
                }}>No Sleep
                </button>
                <button onClick={() => {
                    this.setState({sleep: "Sleep"});
                    return this.noSleep.disable();
                }}>Sleep
                </button>
                {this.state.sleep}
            </div>
        );
    }
}

export default SelfNoSleep;