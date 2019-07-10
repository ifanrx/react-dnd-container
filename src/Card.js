import * as React from 'react'
import { findDOMNode } from 'react-dom'
import {
  DragSource,
  DropTarget,
  ConnectDropTarget,
  ConnectDragSource,
  DropTargetMonitor,
  DropTargetConnector,
  DragSourceConnector,
  DragSourceMonitor,
} from 'react-dnd'
import PropTypes from 'prop-types'

const cardSource = {
  canDrag(props, monitor) {
    return !props.disableDragAction
  },

  beginDrag(props) {
    return {
      id: props.card_data.id,
      containerId: props.containerId,
      index: props.card_index,
      deleteCard: props.card_deleteCard,
      data: props.card_data,
      group: props.group,
    }
  },

  isDragging(props, monitor) {
    return props.card_data.id === monitor.getItem().data.id
  }
}

function checkCanDoAction(props, monitor, component) {
  const hoverBoundingRect = findDOMNode(
    component,
  ).getBoundingClientRect()
  const dragContainerId = monitor.getItem().containerId
  const dragIndex = monitor.getItem().index
  const hoverIndex = props.card_index

  if (props.horizontal) {
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2
    const clientOffset = monitor.getClientOffset()
    const hoverClientX = clientOffset.x - hoverBoundingRect.left
    if (dragContainerId === props.containerId) {
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return false
      }
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return false
      }
    }
  } else {
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
    const clientOffset = monitor.getClientOffset()
    const hoverClientY = clientOffset.y - hoverBoundingRect.top
    if (dragContainerId === props.containerId) {
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return false
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return false
      }
    }
  }
  return true
}

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
    const hoverIndex = props.card_index

    if (dragContainerId === props.containerId &&  dragIndex === hoverIndex) {
      return
    }

    const canDoAction = checkCanDoAction(props, monitor, component)
    if (!canDoAction) return

    if (props.containerId !== dragContainerId) {
      monitor.getItem().deleteCard(dragIndex)
      props.card_insertCard(hoverIndex, monitor.getItem().data)
      monitor.getItem().containerId = props.containerId
      monitor.getItem().deleteCard = props.card_deleteCard
    } else {
      props.card_moveCard(dragIndex, hoverIndex)
    }
    monitor.getItem().index = hoverIndex
  },
}

@DropTarget('react-dnd-container', cardTarget, (connect: DropTargetConnector) => ({
  connectDropTarget: connect.dropTarget(),
}))
@DragSource(
  'react-dnd-container',
  cardSource,
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }),
)
export default class Card extends React.Component {
  static proptypes = {
    containerId: PropTypes.string,
    card_render: PropTypes.func.isRequired,
    group: PropTypes.string,
    horizontal: PropTypes.bool,
    card_moveCard: PropTypes.func,
    card_deleteCard: PropTypes.func,
    card_insertCard: PropTypes.func,
    disableDragAction: PropTypes.bool,
    disableDropAction: PropTypes.bool,
  }

  static defaultProps = {
    card_render: () => {},
    horizontal: false,
    disableDragAction: false,
    disableDropAction: false,
  }

  render() {
    const {
      connectDragSource,
      connectDropTarget,
      card_render,
      card_data,
      ...others,
    } = this.props
    delete others.card_moveCard
    delete others.card_deleteCard
    delete others.card_insertCard
    delete others.onChange
    others.index = others.card_index
    delete others.card_index

    const element = card_render(card_data, others)

    return (
      connectDragSource &&
      connectDropTarget &&
      React.cloneElement(
        connectDragSource(
          connectDropTarget(element),
        ),
        {...element.props, style: {
          cursor: !others.disableDragAction ? 'move' : 'default',
          ...element.props.style,
        }},
      )
    )
  }
}

