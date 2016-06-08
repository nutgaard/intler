import React, { Component, cloneElement, PropTypes as PT } from 'react';
import { autobind, throttle } from './../../utils/utils';

class ReactSplitPanel extends Component {
    constructor(props) {
        super(props);
        autobind(this);

        this.state = {
            isDivided: Array.isArray(this.props.children),
            secondaryWidth: null,
            dragStart: null,
            secondaryWidthDragStart: null,
            isDragging: false
        };
    }

    componentDidMount() {
        if (this.state.isDivided) {
            const secondary = this.refs.container.childNodes.item(2);
            this.setState({ secondaryWidth: secondary.offsetWidth });

            document.body.addEventListener('mousedown', this.onMouseDown);
            document.body.addEventListener('mousemove', throttle(this.onMouseMove, 20));
            document.body.addEventListener('mouseup', this.onMouseUp);
        }
    }
    
    onMouseDown(e) {
        if (e.target === this.refs.divider) {
            this.setState({ isDragging: true, secondaryWidthDragStart: this.state.secondaryWidth, dragStart: e.clientX });
        }
    }
    onMouseMove(e) {
        if (this.state.isDragging) {
            this.setState({
                secondaryWidth: this.state.secondaryWidthDragStart - (e.clientX - this.state.dragStart)
            });
        }
    }
    onMouseUp(e) {
        this.setState({ isDragging: false, secondaryWidthDragStart: null });
    }
    
    render() {
        const { children, ...props } = this.props;
        if (!this.state.isDivided) {
            return React.Children.only(children);
        }
        const [ first, second ] = children;

        const cloneStyle = { ...second.props.style,  width: `${this.state.secondaryWidth}px` };
        const secondClone = cloneElement(second, { style: cloneStyle});

        return (
            <div className="react-split-panel" ref="container" {...props}>
                {first}
                <div className="divider" ref="divider" />
                {secondClone}
            </div>
        );
    }
}

ReactSplitPanel.propTypes = {
    children: PT.node.isRequired
};

export default ReactSplitPanel;
