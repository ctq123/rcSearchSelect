import React from 'react'
import { render } from 'react-dom'
import { SearchSelect } from '../../src'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      obj: null,
      item: null
    }
  }

  onSelect (item) {
    console.log('select item>>>', item)
    this.setState({
      item
    })
  }
  
  render () {
    const dataList = [
      {code: "1", name: 'Jeck', age: 22, sex: 'male' },
      {code: "2", name: 'Marry', age: 21, sex: 'female' },
      {code: "3", name: 'Alan', age: 18, sex: 'male' },
      {code: "4", name: 'Forklin', age: 22, sex: 'female' },
      {code: "5", name: 'Lorry', age: 20, sex: 'female' },
      {code: "6", name: 'Halen', age: 25, sex: 'female' },
      {code: "7", name: 'Selina', age: 24, sex: 'female' },
      {code: "8", name: 'Sky', age: 22, sex: 'male' },
      {code: "9", name: 'Sam', age: 26, sex: 'male' },
      {code: "10", name: 'Gary', age: 22, sex: 'female' }
    ]
    return (
      <div style={{width: 300, marginTop: 400, marginLeft: 200}}>
        <div>
          <SearchSelect
            dataSource={dataList}
            onSelect={this.onSelect.bind(this)}
            setValueObj={this.state && this.state.obj}
            placeholder="input search text"
            keyField="code"
            labelField="name"
          />
        </div>
        <br/>
        <div style={{fontSize: 12, color: '#9E9E9E'}}>选择的数据：{JSON.stringify(this.state.item)}</div>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
