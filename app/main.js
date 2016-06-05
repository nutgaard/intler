import React, { PropTypes as PT } from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import store from './store';

import Application from './application';

function Main(){
    return (
        <Provider store={store}>
            <Application></Application>
        </Provider>
    );
}

const mapStateToProps = (state) => {
    console.log('state',state);
    return {};
};

render(<Main />, document.querySelector('.application'));


