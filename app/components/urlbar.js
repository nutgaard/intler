import React from 'react';
import {connect} from './../storeprovider';

let value = null;
function Urlbar({ store }) {
    const onSubmit = (e) => { e.preventDefault(); store.updateUrl(value); };
    const onChange = (e) => { value = e.target.value; };
    return (
        <form className="urlbar" onSubmit={onSubmit}>
            <input type="text" defaultValue={store.url} onChange={onChange}/>
            <button>GO</button>
        </form>
    );
}

Urlbar.propTypes = {};

export default connect(Urlbar);
