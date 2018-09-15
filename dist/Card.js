'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _class2, _temp;

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _reactDom = require('react-dom');

var _reactDnd = require('react-dnd');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var style = {
  border: '1px dashed gray',
  padding: '0.5rem 1.6rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
  color: 'white'
};

var cardSource = {
  beginDrag: function beginDrag(props) {
    return {
      id: props.data.id,
      containerId: props.containerId,
      index: props.index,
      deleteCard: props.deleteCard,
      data: props.data,
      name: props.name
    };
  },
  isDragging: function isDragging(props, monitor) {
    return props.data.id === monitor.getItem().data.id;
  }
};

function checkCanDoAction(props, monitor, component) {
  var hoverBoundingRect = (0, _reactDom.findDOMNode)(component).getBoundingClientRect();
  var dragContainerId = monitor.getItem().containerId;
  var dragIndex = monitor.getItem().index;
  var hoverIndex = props.index;

  if (props.horizontal) {
    var hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
    var clientOffset = monitor.getClientOffset();
    var hoverClientX = clientOffset.x - hoverBoundingRect.left;
    if (dragContainerId === props.containerId) {
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return false;
      }
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return false;
      }
    }
  } else {
    var hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    var _clientOffset = monitor.getClientOffset();
    var hoverClientY = _clientOffset.y - hoverBoundingRect.top;
    if (dragContainerId === props.containerId) {
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return false;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return false;
      }
    }
  }
  return true;
}

var cardTarget = {
  canDrop: function canDrop(props, monitor) {
    if (!props.name) {
      return props.containerId === monitor.getItem().containerId;
    }
    return props.name === monitor.getItem().name;
  },
  hover: function hover(props, monitor, component) {
    if (!component) {
      return null;
    }
    if (!monitor.canDrop()) {
      return;
    }
    var dragContainerId = monitor.getItem().containerId;
    var dragIndex = monitor.getItem().index;
    var hoverIndex = props.index;

    if (dragContainerId === props.containerId && dragIndex === hoverIndex) {
      return;
    }

    var canDoAction = checkCanDoAction(props, monitor, component);
    if (!canDoAction) return;

    if (props.containerId !== dragContainerId) {
      monitor.getItem().deleteCard(dragIndex);
      props.insertCard(hoverIndex, monitor.getItem().data);
      monitor.getItem().containerId = props.containerId;
      monitor.getItem().deleteCard = props.deleteCard;
    } else {
      props.moveCard(dragIndex, hoverIndex);
    }
    monitor.getItem().index = hoverIndex;
  }
};

var Card = (_dec = (0, _reactDnd.DropTarget)('react-dnd-container', cardTarget, function (connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}), _dec2 = (0, _reactDnd.DragSource)('react-dnd-container', cardSource, function (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}), _dec(_class = _dec2(_class = (_temp = _class2 = function (_React$Component) {
  _inherits(Card, _React$Component);

  function Card() {
    _classCallCheck(this, Card);

    return _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).apply(this, arguments));
  }

  _createClass(Card, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          isDragging = _props.isDragging,
          connectDragSource = _props.connectDragSource,
          connectDropTarget = _props.connectDropTarget,
          containerId = _props.containerId,
          render = _props.render,
          data = _props.data,
          tagName = _props.tagName,
          className = _props.className,
          style = _props.style;


      return connectDragSource && connectDropTarget && connectDragSource(connectDropTarget(React.createElement(tagName, { className: className, style: _extends({ cursor: 'move' }, style) }, render(data, containerId, isDragging))));
    }
  }]);

  return Card;
}(React.Component), _class2.proptypes = {
  render: _propTypes2.default.func.isRequired,
  name: _propTypes2.default.string,
  tagName: _propTypes2.default.string,
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  horizontal: _propTypes2.default.bool
}, _class2.defaultProps = {
  render: function render() {},
  horizontal: false,
  tagName: 'div'
}, _temp)) || _class) || _class);
exports.default = Card;