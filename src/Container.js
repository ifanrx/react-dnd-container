import * as React from 'react'
import { DragDropContext } from 'react-dnd'
import {
  DropTarget,
  ConnectDropTarget,
  DropTargetMonitor,
  DropTargetConnector,
  DragSourceMonitor,
} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Card from './Card'
import PropTypes from 'prop-types'
const update = require('immutability-helper')

const cardTarget = {
  canDrop(props, monitor) {
    if (props.disableDropAction) {
      return false
    }
    if (!props.group) {
      return props.containerId === monitor.getItem().containerId
    }
    return props.group === monitor.getItem().group
  },

  hover(props, monitor, component) {
    if (!component) {
      return
    }
    if (!monitor.canDrop()) {
      return
    }
    const dragContainerId = monitor.getItem().containerId
    const dragIndex = monitor.getItem().index

    // Don't replace items with themselves
    if (dragContainerId === props.containerId) {
      return
    }

    const index = component.state.cards.length
    component.insertCard(index, monitor.getItem().data)
    monitor.getItem().deleteCard(dragIndex)
    monitor.getItem().deleteCard = component.deleteCard
    monitor.getItem().containerId = props.containerId
    monitor.getItem().index = index
  },
}


@DragDropContext(HTML5Backend)
@DropTarget('react-dnd-container', cardTarget, (connect: DropTargetConnector) => ({
  connectDropTarget: connect.dropTarget(),
}))
export default class Container extends React.Component {
  static proptypes = {
    cards: PropTypes.array,
    itemRender: PropTypes.func.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
    horizontal: PropTypes.bool,
    group: PropTypes.string,
    itemTagName: PropTypes.string,
    itemClassName: PropTypes.string,
    itemStyle: PropTypes.object,
    onChange: PropTypes.func,
    disableDragAction: PropTypes.bool,
    disableDropAction: PropTypes.bool,
  }

  static defaultProps = {
    cards: [],
    horizontal: false,
    itemTagName: 'div',
    onChange: () => {},
    disableDragAction: false,
    disableDropAction: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      cards: props.cards,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cards !== this.props.cards) {
      this.setState({cards: nextProps.cards})
    }
  }

  handleChange = type => {
    this.props.onChange(this.state.cards, type)
  }

  render() {
    const {
      connectDropTarget,
      itemRender,
      style,
      className,
      itemTagName,
      itemClassName,
      itemStyle,
      ...others,
    } = this.props
    const { cards } = this.state
    delete others.cards
    delete others.children

    return (
      connectDropTarget(
        <div className={className} style={style}>
          {cards.map((card, i) => (
            <Card
              tagName={itemTagName}
              className={itemClassName}
              style={itemStyle}
              key={card.id}
              index={i}
              moveCard={this.moveCard}
              deleteCard={this.deleteCard}
              insertCard={this.insertCard}
              render={itemRender}
              data={card}
              {...others}
            />
          ))}
        </div>
      )
    )
  }

  deleteCard = index => {
    this.setState(
      update(this.state, {
        cards: {
          $splice: [[index, 1]],
        },
      }),
      () => this.handleChange('delete')
    )
  }

  insertCard = (index, data) => {
    this.setState(
      update(this.state, {
        cards: {
          $splice: [[index, 0, data]],
        },
      }),
      () => this.handleChange('insert')
    )
  }

  moveCard = (dragIndex, hoverIndex) => {
    const { cards } = this.state
    const dragCard = cards[dragIndex]

    this.setState(
      update(this.state, {
        cards: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
        },
      }),
      () => this.handleChange('move')
    )
  }
}

