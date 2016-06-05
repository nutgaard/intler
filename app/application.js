import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';

import Urlbar from './components/urlbar';
import Webview from './components/webview';

function Application(props){
    console.log('props',props);
    return (
        <div>
            <Urlbar />
            <Webview />
        </div>
    );
}

Application.propTypes = {};

const mapStateToProps = (state) => {
    console.log('state',state);
    return state;
};

export default connect(mapStateToProps)(Application);
