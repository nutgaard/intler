import React from 'react';
import { findDOMNode } from 'react-dom';

const logger = [console.log, console.warn, console.error].map((d) => d.bind(console));

class Webview extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.refs.webview.addEventListener('console-message', (e) => {
            logger[e.level](e.message);
        });

        this.refs.webview.addEventListener('ipc-message', (event) => {
            console.log('IPC:', event.channel);
            // Prints "pong"
        });
        this.refs.webview.addEventListener('dom-ready', () => {
            console.log('sending ping');
            this.refs.webview.send('ping');
        });
    }

    render() {
        return (
            <webview ref="webview" src="https://nav.no" preload="./app/preload/main.js" nodeintegration />
        );
    }
}

export default Webview;