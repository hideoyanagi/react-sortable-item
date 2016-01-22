'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classSet = require('class-set');

var _classSet2 = _interopRequireDefault(_classSet);

var itemBeingDragged;

exports['default'] = _react2['default'].createClass({
  displayName: 'index.es6',

  propTypes: {
    className: _react2['default'].PropTypes.string,
    type: _react2['default'].PropTypes.string,
    data: _react2['default'].PropTypes.any,
    handleAcceptTest: _react2['default'].PropTypes.func,
    handleDrop: _react2['default'].PropTypes.func,
    handleDragStart: _react2['default'].PropTypes.func,
    handleDragOver: _react2['default'].PropTypes.func,
    handleDragEnd: _react2['default'].PropTypes.func,
    handleDragLeave: _react2['default'].PropTypes.func
  },

  getInitialState: function getInitialState() {
    return {
      dragging: false,
      hover: false,
      isOverSelf: false,
      hoverAbove: false
    };
  },

  handleDragStart: function handleDragStart(event) {
    event.dataTransfer.setData(this.props.type || 'text/plain', this.props.data);
    itemBeingDragged = _react2['default'].findDOMNode(this.refs.item);
    this.setState({ dragging: true });
    if (this.props.handleDragStart) {
      this.props.handleDragStart(event);
    }
  },

  handleDragOver: function handleDragOver(event) {
    var isOverSelf = _reactDom2['default'].findDOMNode(this.refs.item) === itemBeingDragged;
    var isOverTopHalf = event.clientY < event.target.offsetTop + event.target.offsetHeight / 2;

    if (isOverSelf) {
      event.stopPropagation();
      return;
    }

    if (this.props.handleAcceptTest && !this.props.handleAcceptTest(this.props.data, isOverTopHalf ? 0 : 1, event)) {
      return;
    }

    this.setState({
      hover: true,
      isOverSelf: isOverSelf,
      hoverAbove: isOverTopHalf
    });
    event.preventDefault();
    if (this.props.handleDragOver) {
      this.props.handleDragOver(event);
    }
  },

  handleDragEnd: function handleDragEnd(event) {
    this.setState({ dragging: false });
    if (this.props.handleDragEnd) {
      this.props.handleDragEnd(event);
    }
  },

  handleDragLeave: function handleDragLeave(event) {
    this.setState({
      hover: false
    });
    event.preventDefault();
    if (this.props.handleDragLeave) {
      this.props.handleDragLeave(event);
    }
  },

  handleDrop: function handleDrop(event) {
    event.stopPropagation();
    event.preventDefault();

    this.setState({
      hover: false
    });

    if (this.state.isOverSelf) {
      return;
    }

    if (this.props.handleDrop) {
      this.props.handleDrop(this.props.data, this.state.hoverAbove ? 0 : 1, event);
    }
  },

  render: function render() {
    var classes = (0, _classSet2['default'])(this.props.className, {
      'dragging': this.state.dragging,
      'hover': this.state.hover,
      'hover-above': this.state.hoverAbove,
      'hover-below': !this.state.hoverAbove
    });

    return _react2['default'].cloneElement(this.props.children, {
      ref: "item",
      draggable: "true",
      className: classes,
      onDragStart: this.handleDragStart,
      onDragOver: this.handleDragOver,
      onDragEnter: this.handleDragEnter,
      onDragLeave: this.handleDragLeave,
      onDragEnd: this.handleDragEnd,
      onDrop: this.handleDrop
    });
  }
});
module.exports = exports['default'];
