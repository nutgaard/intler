import React from 'react';
import {render} from 'react-dom';
import store from './store';
import StoreProvider from './storeprovider';
import Application from './application';

function Main() {
    return (
        <StoreProvider store={store}>
            <Application />
        </StoreProvider>
    );
}

render(<Main />, document.querySelector('.application'));


