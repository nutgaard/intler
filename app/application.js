import React, { PropTypes as PT } from 'react';
import DevTools from 'mobx-react-devtools';
import Urlbar from './components/urlbar';
import Webview from './components/webview';

function Application(){
    return (
        <div>
            <Urlbar />
            <Webview />
            <DevTools />
        </div>
    );
}

Application.propTypes = {};

export default Application;
