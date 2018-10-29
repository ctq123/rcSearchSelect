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

  setVal () {
    let label = '广东省广州市天河区'
    console.log('set label>>>', label)
    this.setState({
      obj: {id: new Date().getTime(), label}
    })
  }

  clearVal () {
    console.log('clear value')
    this.setState({
      obj: {id: new Date().getTime(), label: null}
    })
  }
  
  render () {
    const dataList = [
      {id: 1, ids: '100,200,3000', value: '北京,北京市,朝阳区', name: '北京北京市朝阳区',label: '北京北京市朝阳区(100102)',zipCOde: '100102'},
      {id: 2, ids: '101,201,3100', value: '广东省,广州市,天河区', name: '广东省广州市天河区',label: '广东省广州市天河区(510095)',zipCOde: '510095'},
      {id: 3, ids: '102,202,3200', value: '广东省,广州市,越秀区', name: '广东省广州市越秀区',label: '广东省广州市越秀区(510095)',zipCOde: '510095'},
      {id: 4, ids: '103,203,3300', value: '江苏省,南京市,玄武区', name: '江苏省南京市玄武区',label: '江苏省南京市玄武区(210009)',zipCOde: '210009'},
      {id: 5, ids: '104,204,3400', value: '江苏省,苏州市,昆山市', name: '江苏省苏州市昆山市',label: '江苏省苏州市昆山市(215332)',zipCOde: '215332'},
      {id: 6, ids: '105,205,3500', value: '浙江省,浙江省,西湖区', name: '浙江省浙江省西湖区',label: '浙江省杭州市西湖区(310024)',zipCOde: '310024'},
      {id: 7, ids: '106,206,3600', value: '浙江省,杭州市,滨江区', name: '浙江省杭州市滨江区',label: '浙江省杭州市滨江区(310051)',zipCOde: '310051'},
      {id: 8, ids: '107,207,3700', value: '浙江省,浙江省,上城区', name: '浙江省浙江省上城区',label: '浙江省杭州市上城区(310008)',zipCOde: '310008'},
      {id: 9, ids: '108,208,3800', value: '浙江省,浙江省,萧山区', name: '浙江省浙江省萧山区',label: '浙江省杭州市萧山区(311203)',zipCOde: '311203'},
      {id: 10, ids: '109,209,3900', value: '浙江省,浙江省,余杭区', name: '浙江省浙江省余杭区',label: '浙江省杭州市余杭区(311100)',zipCOde: '311100'}
    ]
    return (
      <div style={{width: 300, marginTop: 400, marginLeft: 200}}>
        <div>
          <SearchSelect
            dataSource={dataList}
            onSelect={this.onSelect.bind(this)}
            setValueObj={this.state && this.state.obj}
            placeholder="input search text"
            keyField="id"
            labelField="label"
            direction='up'
          />
        </div>
        <br/>
        <button onClick={this.setVal.bind(this)}>设定</button>
        <button onClick={this.clearVal.bind(this)}>重置</button>
        <br />
        <div style={{fontSize: 12, color: '#9E9E9E'}}>选择的数据：{JSON.stringify(this.state.item)}</div>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
