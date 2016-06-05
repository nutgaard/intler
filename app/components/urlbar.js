import React from "react";
import {connect} from "./../storeprovider";

function Urlbar(props, { store }) {
    const onSubmit = (e) => { e.preventDefault(); store.gotoUrl(store.urlbar) };
    const onChange = (e) => { store.setUrlbar(e.target.value); };
    const toggleMode = () => { store.toggleInteractive() };

    return (
        <form className="urlbar" onSubmit={onSubmit}>
            <input type="text" value={store.urlbar} onChange={onChange}/>
            <button type="submit">GO</button>
            <button type="button" onClick={toggleMode}>{store.editModeIcon}</button>
        </form>
    );
}

export default connect(Urlbar);

