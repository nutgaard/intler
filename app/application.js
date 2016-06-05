import React from "react";
import DevTools from "mobx-react-devtools";
import Urlbar from "./components/urlbar";
import Webview from "./components/webview";

function Application(){
    return (
        <div className="main">
            <Urlbar />
            <Webview />
            <DevTools position={{ top: 0, right: 100 }}/>
        </div>
    );
}

Application.propTypes = {};

export default Application;
