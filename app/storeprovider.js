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

export function connect(WrappedComponent) {
    const ctx = WrappedComponent.contextTypes || {};
    ctx.store = PT.object.isRequired;
    WrappedComponent.contextTypes = ctx;

    return observer(WrappedComponent);
}

export default StoreProvider;
