import React from 'react'
import { render } from 'react-dom'
import { SearchSelect } from '../../src'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      obj: null
    }
  }

  onSelect (item) {
    console.log('select item>>>', item)
  }
  
  setVal () {
    let label = '广东省广州市天河区'
    console.log('set label>>>', label)
    this.setState({
      obj: {id: new Date().getTime(), data: label}
    })
  }

  clearVal () {
    console.log('clear value')
    this.setState({
      obj: {id: new Date().getTime(), data: null}
    })
  }
  
  render () {
    const dataList = [
      {ids: '1,2,3', value: '北京,北京市,朝阳区', value2: '北京北京市朝阳区',label: '北京北京市朝阳区(100102)'},
      {ids: '10,20,30', value: '广东省,广州市,天河区', value2: '广东省广州市天河区',label: '广东省广州市天河区(510095)'},
      {ids: '11,21,31', value: '广东省,广州市,越秀区', value2: '广东省广州市越秀区',label: '广东省广州市越秀区(510120)'},
      {ids: '110,210,310', value: '江苏省,南京市,玄武区', value2: '江苏省南京市玄武区',label: '江苏省南京市玄武区(210009)'},
      {ids: '111,211,311', value: '江苏省,苏州市,昆山市', value2: '江苏省苏州市昆山市',label: '江苏省苏州市昆山市(215332)'},
      {ids: '510,620,730', value: '浙江省,浙江省,西湖区', value2: '浙江省浙江省西湖区',label: '浙江省杭州市西湖区(310024)'},
      {ids: '511,621,731', value: '浙江省,杭州市,滨江区', value2: '浙江省杭州市滨江区',label: '浙江省杭州市滨江区(310051)'},
      {ids: '512,622,732', value: '浙江省,浙江省,上城区', value2: '浙江省浙江省上城区',label: '浙江省杭州市上城区(310008)'},
      {ids: '513,623,733', value: '浙江省,浙江省,萧山区', value2: '浙江省浙江省萧山区',label: '浙江省杭州市萧山区(311203)'},
      {ids: '514,624,734', value: '浙江省,浙江省,余杭区', value2: '浙江省浙江省余杭区',label: '浙江省杭州市余杭区(311100)'}
    ]
    return (
      <div>
        <button onClick={this.setVal.bind(this)}>设定</button>
        <button onClick={this.clearVal.bind(this)}>重置</button>
        <br/>
        <br/>
        <div style={{width: 300}}>
          <SearchSelect
            dataSource={dataList}
            onSelect={this.onSelect.bind(this)}
            setValueObj={this.state && this.state.obj}
            placeholder="请输入省市区"
          />
        </div>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
