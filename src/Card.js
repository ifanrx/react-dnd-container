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

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1.6rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
  color: 'white',
}

const cardSource = {
  canDrag(props, monitor) {
    return !props.disableDragAction
  },

  beginDrag(props) {
    return {
      id: props.data.id,
      containerId: props.containerId,
      index: props.index,
      deleteCard: props.deleteCard,
      data: props.data,
      group: props.group,
    }
  },

  isDragging(props, monitor) {
    return props.data.id === monitor.getItem().data.id
  }
}

function checkCanDoAction(props, monitor, component) {
  const hoverBoundingRect = findDOMNode(
    component,
  ).getBoundingClientRect()
  const dragContainerId = monitor.getItem().containerId
  const dragIndex = monitor.getItem().index
  const hoverIndex = props.index

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
    const hoverIndex = props.index

    if (dragContainerId === props.containerId &&  dragIndex === hoverIndex) {
      return
    }

    const canDoAction = checkCanDoAction(props, monitor, component)
    if (!canDoAction) return

    if (props.containerId !== dragContainerId) {
      monitor.getItem().deleteCard(dragIndex)
      props.insertCard(hoverIndex, monitor.getItem().data)
      monitor.getItem().containerId = props.containerId
      monitor.getItem().deleteCard = props.deleteCard
    } else {
      props.moveCard(dragIndex, hoverIndex)
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
    render: PropTypes.func.isRequired,
    name: PropTypes.string,
    tagName: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    horizontal: PropTypes.bool,
    disableDragAction: PropTypes.bool,
    disableDropAction: PropTypes.bool,
  }

  static defaultProps = {
    render: () => {},
    horizontal: false,
    tagName: 'div',
    disableDragAction: false,
    disableDropAction: false,
  }

  render() {
    const {
      connectDragSource,
      connectDropTarget,
      render,
      data,
      tagName,
      className,
      style,
      ...others,
    } = this.props
    delete others.moveCard
    delete others.deleteCard
    delete others.insertCard
    delete others.onChange

    return (
      connectDragSource &&
      connectDropTarget &&
      connectDragSource(
        connectDropTarget(
          React.createElement(
            tagName,
            {className, style: {
              cursor: !others.disableDragAction ? 'move' : 'default',
              ...style,
            }},
            render(data, others),
          )
        ),
      )
    )
  }
}

