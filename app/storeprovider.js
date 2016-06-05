import React, {Component, PropTypes as PT} from 'react';
import { observer } from 'mobx-react';

class StoreProvider extends Component {
    getChildContext() {
        return { store: this.props.store };
    }

    render() {
        return React.Children.only(this.props.children);
    }
}

StoreProvider.childContextTypes = {
    store: PT.object
};

StoreProvider.propTypes = {
    children: PT.node.isRequired,
    store: PT.object.isRequired
};

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export function connect(WrappedComponent) {
    class Connect extends Component {
        render() {
            return React.createElement(observer(WrappedComponent), { ...this.props, ...this.context });
        }
    }

    Connect.displayName = `Connect(${getDisplayName(WrappedComponent)})`;
    Connect.WrappedComponent = WrappedComponent;
    Connect.contextTypes = { store: PT.object.isRequired };

    return Connect;
}

export default StoreProvider;
