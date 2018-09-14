import * as React from 'react'
import ReactDOM from 'react-dom'
import Container from 'react-dnd-container'

const style_1 = {
  width: 400,
  minHeight: 100,
}

const style_2 = {
  width: 100,
}

export default class App extends React.Component {
  state = {
    cards_1: [
      {
        id: 11,
        color: '#CC0033',
        text: '11',
      },
      {
        id: 12,
        color: '#CC0033',
        text: '12',
      },
      {
        id: 13,
        color: '#CC0033',
        text: '13',
      },
      {
        id: 14,
        color: '#CC0033',
        text: '14',
      },
      {
        id: 15,
        color: '#CC0033',
        text: '15',
      },
      {
        id: 16,
        color: '#CC0033',
        text: '16',
      },
      {
        id: 17,
        color: '#CC0033',
        text: '17',
      },
    ],
    cards_2: [
      {
        id: 21,
        color: '#006699',
        text: '21',
      },
      {
        id: 22,
        color: '#006699',
        text: '22',
      },
      {
        id: 23,
        color: '#006699',
        text: '23',
      },
      {
        id: 24,
        color: '#006699',
        text: '24',
      },
      {
        id: 25,
        color: '#006699',
        text: '25',
      },
      {
        id: 26,
        color: '#006699',
        text: '26',
      },
      {
        id: 27,
        color: '#006699',
        text: '27',
      },
    ],
    cards_3: [
      {
        id: 31,
        color: '#CC0033',
        text: '31',
      },
      {
        id: 32,
        color: '#CC0033',
        text: '32',
      },
      {
        id: 33,
        color: '#CC0033',
        text: '33',
      },
      {
        id: 34,
        color: '#CC0033',
        text: '34',
      },
      {
        id: 35,
        color: '#CC0033',
        text: '35',
      },
      {
        id: 36,
        color: '#CC0033',
        text: '36',
      },
      {
        id: 37,
        color: '#CC0033',
        text: '37',
      },
    ],
    cards_4: [
      {
        id: 41,
        color: '#006699',
        text: '41',
      },
      {
        id: 42,
        color: '#006699',
        text: '42',
      },
      {
        id: 43,
        color: '#006699',
        text: '43',
      },
      {
        id: 44,
        color: '#006699',
        text: '44',
      },
      {
        id: 45,
        color: '#006699',
        text: '45',
      },
      {
        id: 46,
        color: '#006699',
        text: '46',
      },
      {
        id: 47,
        color: '#006699',
        text: '47',
      },
    ],
  }

  itemRender_1(itemData, containerId, isDragging) {
    const style = {
      border: '1px dashed gray',
      padding: '0.5rem 1.6rem',
      marginBottom: '.5rem',
      backgroundColor: 'white',
      color: 'white',
    }
    const cardStyle = {
      background: itemData.color,
      opacity: isDragging ? 0.5 : 1,
    }
    return (
      <div style={{ ...style, ...cardStyle }}>{itemData.text}</div>
    )
  }

  itemRender_2(itemData, containerId, isDragging) {
    const style = {
      border: '1px dashed gray',
      padding: '0.5rem 1.6rem',
      marginBottom: '.5rem',
      backgroundColor: 'white',
      color: 'white',
    }
    const cardStyle = {
      background: itemData.color,
      opacity: isDragging ? 0.5 : 1,
    }
    return (
      <div style={{ ...style, ...cardStyle }}>{itemData.text}</div>
    )
  }

  render() {
    return (
      <div>
        <Container name='a' horizontal style={style_1} itemRender={this.itemRender_1} containerId="1" cards={this.state.cards_1} itemTagName='div' itemStyle={{display: 'inline-block'}} />
        <Container name='a' horizontal style={style_1} itemRender={this.itemRender_1} containerId="2" cards={this.state.cards_2} itemTagName='div' itemStyle={{display: 'inline-block'}} />
        <div style={{display: 'flex'}}>
          <Container name='vertical' style={style_2, {margin: '0 10px', minWidth: 100}} itemRender={this.itemRender_2} containerId={3} cards={this.state.cards_3} />
          <Container name='vertical' style={style_2, {margin: '0 10px', minWidth: 100}} itemRender={this.itemRender_2} containerId={4} cards={this.state.cards_4} />
        </div>
      </div> 
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
