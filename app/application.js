import React from "react";
import DevTools from "mobx-react-devtools";
import Urlbar from "./components/urlbar";
import Webview from "./components/webview";

function Application(){
    return (
        <div className="main">
            <Urlbar />
            <div style={{display: 'flex', flex: 'auto', flexDirection: 'row'}}>
                <Webview />
                <div>
                    <h1>Editor panel</h1>
                </div>
            </div>
            <DevTools position={{ top: 0, right: 100 }}/>
        </div>
    );
}

Application.propTypes = {};

export default Application;
