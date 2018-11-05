# rc-searchselect
This is a React search selection control that supports complex data selection callbacks. The selected data is an object, and this object is user-defined and supports setting and emptying operations.There is also an important feature that introduces react-virtualized component which to solve the problem of rendering jams in millions of data source scenarios.

这是一个React搜索选择控件，支持复杂数据选择回调，选择的数据是一个对象，并且这个对象是用户自定义的，同时支持设值和清空操作。还有一个重要的特性，引入react-virtualized控件，解决上百万数据源场景下渲染卡顿问题。

## React SearchSelect
[![Build Status](https://travis-ci.org/ctq123/rcSearchSelect.svg?branch=master&foo=bar)](https://travis-ci.org/ctq123/rcSearchSelect)
[![NPM version](https://img.shields.io/npm/v/rcSearchSelect.svg?style=flat)](https://www.npmjs.com/package/rc-searchselect)
[![codecov](https://codecov.io/gh/ctq123/rcSearchSelect/branch/master/graph/badge.svg)](https://codecov.io/gh/ctq123/rcSearchSelect)
![platform](https://img.shields.io/cocoapods/p/rcSearchSelect.svg?style=flat)

## Demo
![image](https://github.com/ctq123/rcSearchSelect/blob/master/examples/gif/1023.gif)
![image](https://github.com/ctq123/rcSearchSelect/blob/master/examples/gif/1025.gif)
# install
npm install rc-searchselect --save-dev
# Usage

## sample usage
![image](https://github.com/ctq123/rcSearchSelect/blob/master/examples/gif/1023.gif)
```
mport React from 'react'
import { SearchSelect } from 'rc-searchselect'

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
      <div style={{width: 300}}>
        <div>
          <SearchSelect
            dataSource={dataList}
            onSelect={this.onSelect.bind(this)}
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
```

## more usage
![image](https://github.com/ctq123/rcSearchSelect/blob/master/examples/gif/1025.gif)

```
mport React from 'react'
import { SearchSelect } from 'rc-searchselect'

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
      obj: {id: Date.now(), label}
    })
  }

  clearVal () {
    console.log('clear value')
    this.setState({
      obj: {id: Date.now(), label: null}
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
```
# Prop Types

attributes | description | type | default | isRequire
---|---|---|---|--
dataSource | the data source, it contains a list of objects | array | [] | True
keyField | the unique field of the object, Eg id| string | '' | True
labelField | the field of the object, which use for search and display| string | '' | True
onSelect | the callback function of the option selected | function | (e)=>{} | False
defaultValue | the default value | object | null | False
setValueObj | the value object, use to set value or clear current value. It must contain a field of "id" and unique every time, another key is "label", Eg {id: Date.now(), label: 'set label data'} | object | null | False
onChange | the callback function of the input element change | function | (e)=>{} | False
direction | the direction of the options, up or down | 'up' or 'down' | 'down' | False
placeholder | the placeholder of this component | string | '' | False
dropdwonHeight | the height of downdown list | number | 200 | False