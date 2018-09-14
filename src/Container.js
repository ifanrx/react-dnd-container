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
    if (!props.name) {
      return props.containerId === monitor.getItem().containerId
    }
    return props.name === monitor.getItem().name
  },

  hover(props, monitor, component) {
    if (!component) {
      return null
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
    itemRender: PropTypes.func.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
    horizontal: PropTypes.bool,
    name: PropTypes.string,
    itemTagName: PropTypes.string,
    itemClassName: PropTypes.string,
    itemStyle: PropTypes.object,
  }

  static defaultProps = {
    horizontal: false,
    itemTagName: 'div',
  }

  constructor(props) {
    super(props)
    this.state = {
      cards: props.cards,
    }
  }

  render() {
    const {
      connectDropTarget,
      containerId,
      itemRender,
      style,
      className,
      horizontal,
      name,
      itemTagName,
      itemClassName,
      itemStyle,
    } = this.props
    const { cards } = this.state

    return (
      connectDropTarget(
        <div className={className} style={style}>
          {cards.map((card, i) => (
            <Card
              tagName={itemTagName}
              className={itemClassName}
              style={itemStyle}
              key={card.id}
              name={name}
              containerId={containerId}
              index={i}
              moveCard={this.moveCard}
              deleteCard={this.deleteCard}
              insertCard={this.insertCard}
              render={itemRender}
              data={card}
              horizontal={horizontal}
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
    )
  }

  insertCard = (index, data) => {
    this.setState(
      update(this.state, {
        cards: {
          $splice: [[index, 0, data]],
        },
      }),
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
    )
  }
}

