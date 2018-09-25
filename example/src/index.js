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
    setting_1: {
      group: '',
      disableDragAction: false,
      disableDropAction: false,
    },
    setting_2: {
      group: '',
      disableDragAction: false,
      disableDropAction: false,
    },
    setting_3: {
      group: '',
      disableDragAction: false,
      disableDropAction: false,
    },
    setting_4: {
      group: '',
      disableDragAction: false,
      disableDropAction: false,
    },
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
        color: '#CC6600',
        text: '31',
      },
      {
        id: 32,
        color: '#CC6600',
        text: '32',
      },
      {
        id: 33,
        color: '#CC6600',
        text: '33',
      },
      {
        id: 34,
        color: '#CC6600',
        text: '34',
      },
      {
        id: 35,
        color: '#CC6600',
        text: '35',
      },
      {
        id: 36,
        color: '#CC6600',
        text: '36',
      },
      {
        id: 37,
        color: '#CC6600',
        text: '37',
      },
    ],
    cards_4: [
      {
        id: 41,
        color: '#CCCC33',
        text: '41',
      },
      {
        id: 42,
        color: '#CCCC33',
        text: '42',
      },
      {
        id: 43,
        color: '#CCCC33',
        text: '43',
      },
      {
        id: 44,
        color: '#CCCC33',
        text: '44',
      },
      {
        id: 45,
        color: '#CCCC33',
        text: '45',
      },
      {
        id: 46,
        color: '#CCCC33',
        text: '46',
      },
      {
        id: 47,
        color: '#CCCC33',
        text: '47',
      },
    ],
  }

  itemRender_1(itemData, props) {
    const style = {
      border: '1px dashed gray',
      padding: '0.5rem 1.6rem',
      marginBottom: '.5rem',
      backgroundColor: 'white',
      color: 'white',
    }
    const cardStyle = {
      background: itemData.color,
      opacity: props.isDragging ? 0.5 : 1,
    }
    return (
      <div style={{ ...style, ...cardStyle }}>{itemData.text}</div>
    )
  }

  itemRender_2(itemData, props) {
    const style = {
      border: '1px dashed gray',
      padding: '0.5rem 1.6rem',
      marginBottom: '.5rem',
      backgroundColor: 'white',
      color: 'white',
    }
    const cardStyle = {
      background: itemData.color,
      opacity: props.isDragging ? 0.5 : 1,
    }
    return (
      <div style={{ ...style, ...cardStyle }}>{itemData.text}</div>
    )
  }

  onSettingChange = e => {
    const id = e.target.dataset.id
    const key = e.target.dataset.key
    const value = e.target.value
    const state = this.state
    state[`setting_${id}`][key] = key === 'group' ? e.target.value : !e.target.checked
    this.setState(state)
  }

  settingRender() {
    return (
      <table>
        <thead>
          <tr>
            <th></th>
            <th>group</th>
            <th>drag</th>
            <th>drop</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>containerA</th>
            <td><input type="text" value={this.state.setting_1.group} data-id='1' data-key='group' onChange={this.onSettingChange} /></td>
            <td><input type="checkbox" checked={!this.state.setting_1.disableDragAction} data-id='1' data-key='disableDragAction' onChange={this.onSettingChange} /></td>
            <td><input type="checkbox" checked={!this.state.setting_1.disableDropAction} data-id='1' data-key='disableDropAction' onChange={this.onSettingChange} /></td>
          </tr>
          <tr>
            <th>containerB</th>
            <td><input type="text" value={this.state.setting_2.group} data-id='2' data-key='group' onChange={this.onSettingChange} /></td>
            <td><input type="checkbox" checked={!this.state.setting_2.disableDragAction} data-id='2' data-key='disableDragAction' onChange={this.onSettingChange} /></td>
            <td><input type="checkbox" checked={!this.state.setting_2.disableDropAction} data-id='2' data-key='disableDropAction' onChange={this.onSettingChange} /></td>
          </tr>
          <tr>
            <th>containerC</th>
            <td><input type="text" value={this.state.setting_3.group} data-id='3' data-key='group' onChange={this.onSettingChange} /></td>
            <td><input type="checkbox" checked={!this.state.setting_3.disableDragAction} data-key='disableDragAction' data-id='3' onChange={this.onSettingChange} /></td>
            <td><input type="checkbox" checked={!this.state.setting_3.disableDropAction} data-id='3' data-key='disableDropAction' onChange={this.onSettingChange} /></td>
          </tr>
          <tr>
            <th>containerD</th>
            <td><input type="text" value={this.state.setting_4.group} data-id='4' data-key='group' onChange={this.onSettingChange} /></td>
            <td><input type="checkbox" checked={!this.state.setting_4.disableDragAction} data-id='4' data-key='disableDragAction' onChange={this.onSettingChange} /></td>
            <td><input type="checkbox" checked={!this.state.setting_4.disableDropAction} data-id='4' data-key='disableDropAction' onChange={this.onSettingChange} /></td>
          </tr>
        </tbody>
      </table>
    )
  }

  render() {
    return (
      <div style={{padding: 15}}>
        {this.settingRender()}
        <div style={{marginBottom: 10, marginTop: 20}}>containerA</div>
        <Container horizontal style={style_1} itemRender={this.itemRender_1} containerId="1" cards={this.state.cards_1} itemTagName='div' itemStyle={{display: 'inline-block'}} onChange={(data, type) => this.setState({cards_1: data})} {...this.state.setting_1} />
        <div style={{marginBottom: 10, marginTop: 20}}>containerB</div>
        <Container horizontal style={style_1} itemRender={this.itemRender_1} containerId="2" cards={this.state.cards_2} itemTagName='div' itemStyle={{display: 'inline-block'}} {...this.state.setting_2} />
        <div style={{display: 'flex'}}>
          <div>
            <div style={{marginBottom: 10, marginTop: 20}}>containerC</div>
            <Container style={style_2, {marginRight: 50, minWidth: 100}} itemRender={this.itemRender_2} containerId={3} cards={this.state.cards_3} {...this.state.setting_3} />
          </div>
          <div>
            <div style={{marginBottom: 10, marginTop: 20}}>containerD</div>
            <Container style={style_2, {marginRight: 50, minWidth: 100}} itemRender={this.itemRender_2} containerId={4} cards={this.state.cards_4} {...this.state.setting_4} />
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
