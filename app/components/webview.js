import React from 'react';
import {connect} from "./../storeprovider";
import { findDOMNode } from 'react-dom';
import WebViewIPC from './../utils/webview-ipc';

const logger = [console.log, console.warn, console.error].map((d) => d.bind(console));

class Webview extends React.Component {
    constructor(props) {
        super(props);
        this.state = { url: props.store.url };

        this.captureStoreProps();
    }

    captureStoreProps() {
        const url = this.props.store.url;
        const ipcdebug = this.props.store.ipcdebug;
        const interactiveMode = this.props.store.interactiveMode;
        const rerenderWebview = this.props.store.rerenderWebview;
    }

    componentDidMount() {
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
            if (this.props.store.ipcdebug) {
                console.log('ServerIPC: ', message);
            }
        });


        this.refs.webview.addEventListener('dom-ready', () => {
            this.refs.webview.send('state', JSON.stringify(this.props.store));
        });
        this.refs.webview.addEventListener('did-navigate', ({ url }) => {
            this.props.store.setUrl(url);
        });
        this.refs.webview.addEventListener('did-navigate-in-page', ({ url }) => {
            this.props.store.setUrl(url);
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.store.rerenderWebview) {
            this.setState({
                url: nextProps.store.url
            });
            nextProps.store.setUrl(nextProps.store.url);
        }
    }

    render() {
        console.log('this.props.store.rerenderWebview', this.props.store.rerenderWebview);
        return (
            <webview ref="webview" className="webview" src={this.state.url} preload="./app/preload/main.js"
                     nodeintegration/>
        );
    }
}

export default connect(Webview);