# react-dnd-container
A React library for sortable drag-and-drop rows or columns based on react-dnd lib.

## Example
https://ifanrx.github.io/react-dnd-container/

## Usage
```js
export default class App extends React.Component {
  state = {
    cards_1: [
      {
        id: 11,
        color: '#CC0033',
        text: '11',
      },
      ...
    ],
    cards_2: [
      {
        id: 21,
        color: '#006699',
        text: '21',
      },
      ...
    ],
  }

  itemRender(itemData, props) {
    const style = {
      border: '1px dashed gray',
      padding: '0.5rem 1.6rem',
      marginBottom: '.5rem',
      color: 'white',
      background: itemData.color,
      opacity: props.isDragging ? 0.5 : 1,
    }
    return (
      <div style={style}>{itemData.text}</div>
    )
  }

  render() {
    const style = {
      width: 400,
      minHeight: 100,
    }
    return (
      <div>
        <Container group='test' horizontal style={style} itemRender={this.itemRender} cards={this.state.cards_1} />
        <Container group='test' horizontal style={style} itemRender={this.itemRender} cards={this.state.cards_2} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
```

## API
```js
<Container itemRender={this.itemRender} cards={this.state.cards} />
```
| Property          | Default      | Type     | Description  |
| :---------------- | :----------- | :------- | :----------- |
| cards             | -            | Array    | data source, each item should has a unique id field |
| group             | -            | String   | drag and drop can only effect in the same container or between containers which has the same group name |
| horizontal        | false        | Boolean  | drag type |
| style             | -            | Object   | container style |
| className         | -            | String   | container class |
| itemRender        | -            | Function(card, props) | item render function |
| onChange          | -            | Function(data, type: 'move' / 'insert' / 'delete') | a callback function, executed when the cards changed |
| disableDragAction | false        | Boolean  | Whether 'drag' action is disabled |
| disableDropAction | false        | Boolean  | Whether 'drop' action is disabled |

