import React from "react";
import DevTools from "mobx-react-devtools";
import SplitPanel from './components/react-split-panel/react-split-panel';
import Urlbar from "./components/urlbar";
import Webview from "./components/webview";

function Application(){
    return (
        <div className="main">
            <Urlbar />
            <SplitPanel style={{display: 'flex', flex: 'auto', flexDirection: 'row', height: 'auto'}} >
                <Webview />
                <div>
                    <h1>Editor panel</h1>
                </div>
            </SplitPanel>
            <DevTools position={{ top: 0, right: 100 }}/>
        </div>
    );
}

Application.propTypes = {};

export default Application;
