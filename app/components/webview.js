import React from 'react';
import {connect} from "./../storeprovider";
import { findDOMNode } from 'react-dom';
import WebViewIPC from './../utils/webview-ipc';

const logger = [console.log, console.warn, console.error].map((d) => d.bind(console));

class Webview extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        const { store } = this.context;
        this.refs.webview.addEventListener('console-message', (e) => {
            try {
                const content = JSON.parse(e.message);
                logger[e.level].apply(console, content);
            } catch (ignore) {
                logger[e.level](e.message);
            }
        });

        this.ipc = new WebViewIPC(this.refs.webview);
        this.ipc.on('state', (event, message) => {
            if (store.ipcdebug) {
                console.log('ServerIPC: ', message);
            }
        });


        this.refs.webview.addEventListener('dom-ready', () => {
            this.refs.webview.send('state', JSON.stringify(store));
        });
        this.refs.webview.addEventListener('did-navigate', ({ url }) => {
            console.log('did-navigate', url);
            store.setUrlbar(url);
        });
        this.refs.webview.addEventListener('did-navigate-in-page', ({ url }) => {
            console.log('did-navigate-in-page', url);
            store.setUrlbar(url);
        });
    }

    componentDidUpdate() {
        this.refs.webview.send('state', JSON.stringify(this.context.store));
    }

    render() {
        const state = this.context.store.completestate;
        return (
            <webview ref="webview" className="webview" src={this.context.store.url} preload="./app/preload/main.js"
                     nodeintegration/>
        );
    }
}

export default connect(Webview);