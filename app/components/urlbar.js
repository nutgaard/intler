import React, { PropTypes as PT } from 'react';
import { connect } from './../storeprovider';

function Urlbar({ store }){
    return (
        <div>
            <input type="text" value={store.url} onChange={(e) => { store.url = e.target.value; }}/>
            <p>{store.url}</p>
        </div>
    );
}

Urlbar.propTypes = {};

export default connect(Urlbar);
