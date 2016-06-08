import React, { PropTypes as PT } from 'react';
import {connect} from "./../../storeprovider";

function createEditorView(intlkey, intlvalue) {
    return (
        <div>
            <p>Key: {intlkey}</p>
            <p>Value: {intlvalue}</p>
        </div>
    );
}

function Editor({ style }, { store }) {
    console.log('store', store);

    const { intlkey, intlvalue } = store;
    const editorview = intlkey && intlvalue ? createEditorView(intlkey, intlvalue) : null;

    return (
        <div className="editor" style={style}>
            <h1>Editor</h1>
            {editorview}
        </div>
    );
}

Editor.propTypes = {};

export default connect(Editor);
