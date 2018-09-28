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
import update from 'immutability-helper'
import uuid from 'uuid'

const cardTarget = {
  canDrop(props, monitor) {
    if (props.disableDropAction) {
      return false
    }
    return props.group && props.group === monitor.getItem().group
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
    if (dragContainerId === component.containerId) {
      return
    }

    const index = component.state.cards.length
    component.insertCard(index, monitor.getItem().data)
    monitor.getItem().deleteCard(dragIndex)
    monitor.getItem().deleteCard = component.deleteCard
    monitor.getItem().containerId = component.containerId
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
    onChange: PropTypes.func,
    disableDragAction: PropTypes.bool,
    disableDropAction: PropTypes.bool,
  }

  static defaultProps = {
    cards: [],
    horizontal: false,
    onChange: () => {},
    disableDragAction: false,
    disableDropAction: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      cards: props.cards,
    }
    this.containerId = uuid()
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
              key={card.id}
              card_index={i}
              card_moveCard={this.moveCard}
              card_deleteCard={this.deleteCard}
              card_insertCard={this.insertCard}
              card_render={itemRender}
              card_data={card}
              {...others}
              containerId={this.containerId}
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

