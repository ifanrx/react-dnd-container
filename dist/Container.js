'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _class2, _temp;

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _reactDnd = require('react-dnd');

var _reactDndHtml5Backend = require('react-dnd-html5-backend');

var _reactDndHtml5Backend2 = _interopRequireDefault(_reactDndHtml5Backend);

var _Card = require('./Card');

var _Card2 = _interopRequireDefault(_Card);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var update = require('immutability-helper');

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

    // Don't replace items with themselves
    if (dragContainerId === props.containerId) {
      return;
    }

    var index = component.state.cards.length;
    component.insertCard(index, monitor.getItem().data);
    monitor.getItem().deleteCard(dragIndex);
    monitor.getItem().deleteCard = component.deleteCard;
    monitor.getItem().containerId = props.containerId;
    monitor.getItem().index = index;
  }
};

var Container = (_dec = (0, _reactDnd.DragDropContext)(_reactDndHtml5Backend2.default), _dec2 = (0, _reactDnd.DropTarget)('react-dnd-container', cardTarget, function (connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}), _dec(_class = _dec2(_class = (_temp = _class2 = function (_React$Component) {
  _inherits(Container, _React$Component);

  function Container(props) {
    _classCallCheck(this, Container);

    var _this = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props));

    _this.handleChange = function (type) {
      _this.props.onChange(_this.state.cards, type);
    };

    _this.deleteCard = function (index) {
      _this.setState(update(_this.state, {
        cards: {
          $splice: [[index, 1]]
        }
      }), function () {
        return _this.handleChange('delete');
      });
    };

    _this.insertCard = function (index, data) {
      _this.setState(update(_this.state, {
        cards: {
          $splice: [[index, 0, data]]
        }
      }), function () {
        return _this.handleChange('insert');
      });
    };

    _this.moveCard = function (dragIndex, hoverIndex) {
      var cards = _this.state.cards;

      var dragCard = cards[dragIndex];

      _this.setState(update(_this.state, {
        cards: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
        }
      }), function () {
        return _this.handleChange('move');
      });
    };

    _this.state = {
      cards: props.cards
    };
    return _this;
  }

  _createClass(Container, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.cards !== this.props.cards) {
        this.setState({ cards: nextProps.cards });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          connectDropTarget = _props.connectDropTarget,
          containerId = _props.containerId,
          itemRender = _props.itemRender,
          style = _props.style,
          className = _props.className,
          horizontal = _props.horizontal,
          name = _props.name,
          itemTagName = _props.itemTagName,
          itemClassName = _props.itemClassName,
          itemStyle = _props.itemStyle;
      var cards = this.state.cards;


      return connectDropTarget(React.createElement(
        'div',
        { className: className, style: style },
        cards.map(function (card, i) {
          return React.createElement(_Card2.default, {
            tagName: itemTagName,
            className: itemClassName,
            style: itemStyle,
            key: card.id,
            name: name,
            containerId: containerId,
            index: i,
            moveCard: _this2.moveCard,
            deleteCard: _this2.deleteCard,
            insertCard: _this2.insertCard,
            render: itemRender,
            data: card,
            horizontal: horizontal
          });
        })
      ));
    }
  }]);

  return Container;
}(React.Component), _class2.proptypes = {
  cards: _propTypes2.default.array,
  itemRender: _propTypes2.default.func.isRequired,
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  horizontal: _propTypes2.default.bool,
  name: _propTypes2.default.string,
  itemTagName: _propTypes2.default.string,
  itemClassName: _propTypes2.default.string,
  itemStyle: _propTypes2.default.object,
  onChange: _propTypes2.default.func
}, _class2.defaultProps = {
  cards: [],
  horizontal: false,
  itemTagName: 'div',
  onChange: function onChange() {}
}, _temp)) || _class) || _class);
exports.default = Container;