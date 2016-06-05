import React from 'react';
import {connect} from "./../storeprovider";
import { findDOMNode } from 'react-dom';
import WebViewIPC from './../utils/webview-ipc';

const logger = [console.log, console.warn, console.error].map((d) => d.bind(console));

class Webview extends React.Component {
    constructor(props) {
        super(props);
        this.captureStoreProps();
    }

    captureStoreProps() {
        
        const url = this.props.store.url;
        const interactiveMode = this.props.store.interactiveMode;
    }

    componentDidMount() {
        this.refs.webview.addEventListener('console-message', (e) => {
            logger[e.level](e.message);
        });

        this.ipc = new WebViewIPC(this.refs.webview);
        this.ipc.on('state', (event, message) => {
            console.log('ServerIPC: ' + message);
        });


        this.refs.webview.addEventListener('dom-ready', () => {
            this.refs.webview.send('state', JSON.stringify(this.props.store));
        });
    }

    componentDidUpdate() {
        console.log('props.edit', this.props.store);
        console.log('update', JSON.stringify(this.props.store));    
    }

    render() {
        return (
            <webview ref="webview" className="webview" src={this.props.store.url} preload="./app/preload/main.js" nodeintegration />
        );
    }
}

export default connect(Webview);