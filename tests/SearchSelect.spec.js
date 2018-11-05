import React from 'react'
import { mount, shallow, render } from 'enzyme'
import { SearchSelect } from '../src'

describe('SelectSelect unitTest',  ()=> {
  const dataSource = [{id:1, name: 'Alan', age: 19}, {id:2, name: 'Carry', age: 20}]

  it('renders correctly', () => {
    const wrapper = render(<SearchSelect dataSource={dataSource} keyField='id' labelField='name' />)

    expect(wrapper).toMatchSnapshot()
  })

  it('set defaultValue based on value', () => {
    const defaultValue = {id:2, name: 'Carry', age: 20}
    const wrapper = shallow(<SearchSelect dataSource={dataSource} keyField='id' labelField='name' defaultValue={defaultValue} />)

    expect(wrapper.state().inputVal).toBe('Carry')
  })

  it('placehoder', () => {
    const placeholder = 'input text'
    const wrapper = shallow(<SearchSelect dataSource={dataSource} keyField='id' labelField='name' placeholder={placeholder} />)
    const inputNode = wrapper.find('input')

    expect(wrapper.state().inputVal).toBe('')
    expect(inputNode.prop('placeholder')).toEqual(placeholder)
  })

  
  it('set dropdwonHeight', () => {
    const dropdwonHeight = 30
    const wrapper = shallow(<SearchSelect dataSource={dataSource} keyField='id' labelField='name' dropdwonHeight={dropdwonHeight} />)
    wrapper.find('input').simulate('focus')
    const node = wrapper.find('.dropdown .dropdwon-placement')

    expect(node.prop('style').height).toEqual(30)
  })

  it('set direction', () => {
    const wrapper = shallow(<SearchSelect dataSource={dataSource} keyField='id' labelField='name' />)
    expect(wrapper.find('.dropdown-parent').length).toEqual(1)

    wrapper.setProps({ direction: 'up' })
    expect(wrapper.find('.dropup-parent').length).toEqual(1)
  })


  it('set inputValue from extranal data', () => {
    const wrapper = shallow(<SearchSelect dataSource={dataSource} keyField='id' labelField='name' />)
    
    let exdata = {id: 1, label: 'Alan'}
    wrapper.setProps({ setValueObj: exdata })
    expect(wrapper.state().inputVal).toBe('Alan')
    
    exdata = {id: 2, label: null}
    wrapper.setProps({ setValueObj: exdata })
    expect(wrapper.state().inputVal).toBe('')

    exdata = {id: 3, label: 'hahaha'}
    wrapper.setProps({ setValueObj: exdata })
    expect(wrapper.state().inputVal).toBe('')

    exdata = {id: 4, label: 'Carry'}
    wrapper.setProps({ setValueObj: exdata })
    expect(wrapper.state().inputVal).toBe('Carry')
  })

  it('set inputValue when user input text', () => {
    const wrapperM = mount(<SearchSelect dataSource={dataSource} keyField='id' labelField='name' />)
    wrapperM.find('input').simulate('focus')
    wrapperM.find('input').simulate('change', { target: { value: 'Car' } })
    expect(wrapperM.find('input').prop('value')).toEqual('Car')
  })

})