import React from 'react'
import PropTypes from 'prop-types'
import ClickOut from './ClickOut'
import './AddressSelect.css'

// author: tqcheng
class AddressSelect extends React.Component {
  constructor(props) {
    super(props)
    const defaultDirection = props.direction ? props.direction : 'down'
    const defaultPlaceholder = props.placeholder ? props.placeholder : ''
    const defaultOnChangeCB = props.onChange ? props.onChange : (e) => { }
    const defaultOnSelectCB = props.onSelect ? props.onSelect : (e) => { }
    const defaultValue = props.defaultValue && props.defaultValue.label || ''

    this.state = {
      dataList: [],
      direction: defaultDirection,
      pointIndex: 0,
      inputVal: defaultValue,
      isSelected: !!defaultValue,
      onChangeCB: defaultOnChangeCB,
      onSelectCB: defaultOnSelectCB,
      placeholder: defaultPlaceholder,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { setValueObj } = nextProps
    if (setValueObj && setValueObj.id && setValueObj.id !== this.setID) {
      this.setID = setValueObj.id
      if (setValueObj.data) {
        let dataList = this.filterData(setValueObj.data)
        if (dataList && dataList.length) {
          this.selectOptionVal(dataList[0])
        }
      } else {
        this.clearData()
      }
    }
  }

  clearData () {
    if (this.state.inputVal) {
      this.setState({
        inputVal: '',
        dataList: [],
        pointIndex: 0,
        isSelected: false,
      })
      this.state.onSelectCB(null)
    }
  }

  onBlur (e) {
    if (!this.state.inputVal) {
      this.setState((prevState, props) => {
        return {
          dataList: [],
          pointIndex: 0,
        }
      })
      this.state.onSelectCB(null)
    } else {
      const { dataList, isSelected } = this.state
      if (dataList && dataList.length) {
        this.selectOptionVal(dataList[0])
      } else {
        if (!isSelected) {
          this.setState({
            inputVal: '',
            pointIndex: 0,
            dataList: [],
          })
          this.state.onSelectCB(null)
        }
      }
    }
  }

  onFocus (e) {
    if (!this.state.inputVal) {
      const dataSource = this.props.dataSource || []
      this.setState({
        dataList: dataSource
      })
    }
  }

  onChange (e) {
    const dataSource = this.props.dataSource || []
    const { onChangeCB } = this.state
    const val = e.target.value
    let dataList = []
    if (val) {
      dataList = this.filterData(val)
    } else {
      dataList = dataSource
    }
    if (val && dataList && dataList.length) {
      this.setState({
        inputVal: val,
        dataList,
      })
    } else {
      this.setState({
        inputVal: val,
        isSelected: false,
        dataList,
      })
    }
    onChangeCB(val)
  }

  onOptionClick(item) {
    // console.log('onOptionClick>>', item)
    this.selectOptionVal(item)
  }

  selectOptionVal(item) {
    this.state.onSelectCB(item)
    const val = item && item.label || ''
    this.setState((prevState, props) => {
      return {
        inputVal: val,
        dataList: [],
        pointIndex: 0,
        isSelected: true,
      }
    })
  }

  filterData(val) {
    const dataSource = this.props.dataSource || []
    let dataList = []
    dataSource.map(item => {
      const label = item && item.label || ''
      if (label.indexOf(val) > -1) {
        dataList.push(item)
      }
    })
    return dataList
  }

  handleKeyEvent (e) {
    // console.log("handleKeyEvent", e)
    const keynum = e.keyCode || e.which
    // console.log("keynum", keynum)
    const { dataList, inputVal } = this.state
    const isValidIndex = !!(dataList && dataList.length)
    if (keynum === 40) {// 按下箭头
      if (isValidIndex && this.state.pointIndex < dataList.length) {
        this.state.pointIndex++
        const blockId = 'auto-option-li-' + this.state.pointIndex
        this.setActiveOptionStyle(blockId)
        this.setScrollToBlock(blockId)
      }
    } else if (keynum === 38) {// 按上箭头
      if (isValidIndex && this.state.pointIndex > 1) {
        this.state.pointIndex--
        const blockId = 'auto-option-li-' + this.state.pointIndex
        this.setActiveOptionStyle(blockId)
        this.setScrollToBlock(blockId)
      }
    } else if (keynum === 13) {// 按回车键
      if (this.state.pointIndex) {// 选择值
        const node = document.getElementById('auto-option-li-' + this.state.pointIndex)
        const value = node.getAttribute('data-value')
        const value2 = node.getAttribute('data-value2')
        const ids = node.getAttribute('data-ids')
        const label = node.innerHTML
        this.selectOptionVal({ value, value2, label, ids })
      }
    }
  }

  setActiveOptionStyle(indexID) {
    this.setClassBackgroundColor('auto-option-li', '#ffffff')
    document.getElementById(indexID).style.backgroundColor = '#e6f7ff'
  }

  setClassBackgroundColor(className, color) {
    const es = document.getElementsByClassName(className)
    for (let item of es) {
      if (item) {
        item.style.backgroundColor = color
      }
    }
  }

  setScrollToBlock(blockId) {
    let blockEle = document.getElementById(blockId)
    let parentEle = blockEle ? (blockEle.parentNode || blockEle.parentElement) : undefined
    parentEle = parentEle ? (parentEle.parentNode || parentEle.parentElement) : undefined
    if (blockEle && parentEle) {
      // console.log("parentEle.scrollTop>>>", parentEle.scrollTop)
      // console.log("blockEle.offsetTop>>>", blockEle.offsetTop)
      if (blockEle.offsetTop - parentEle.scrollTop > 68) {
        parentEle.scrollTop = (blockEle.offsetTop - 68)
      } else if (parentEle.scrollTop > blockEle.offsetTop) {
        parentEle.scrollTop = blockEle.offsetTop
      }
    }
  }


  generateLiNode(data = []) {
    const { pointIndex } = this.state
    return data.map((item, index) => {
      let i = index + 1
      if (item && item.label) {
        return <li key={`auto-option-li-` + index} id={`auto-option-li-` + i} className={'auto-option-li'} data-value={item.value} data-value2={item.value2} data-ids={item.ids} onClick={this.onOptionClick.bind(this, item)}>{item.label}</li>
      }
    })
  }

  render() {
    const { direction, dataList, inputVal, placeholder } = this.state
    return (
      <ClickOut onClickOut={this.onBlur.bind(this)}>
        <div className='address-select'>
          <div>
            <div className={direction === 'up' ? 'dropup-parent' : 'dropdown-parent'}>
              <div>
                {
                  dataList && dataList.length ?
                    <div className='dropdown dropdwon-placement'>
                      <ul>{this.generateLiNode(dataList)}</ul>
                    </div>
                    :
                    null
                }
              </div>
            </div>
          </div>
          <div className="input-con">
            <input className='auto-input rc-input' 
              onFocus={this.onFocus.bind(this)}
              onChange={this.onChange.bind(this)}
              onKeyDown={this.handleKeyEvent.bind(this)}
              value={inputVal}
              placeholder={placeholder}
            />
            {
              inputVal ?
              <span className='input-suffix' onClick={this.clearData.bind(this)}>
                <span className='close-icon'>
                  <i className='close-i'>
                    <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                      <path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"></path>
                      <path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                    </svg>
                  </i>
                </span>
              </span>
              :
              null
            }
          </div>
        </div>
      </ClickOut>
    )
  }
}

AddressSelect.propTypes = {
  dataSource: PropTypes.array,
  defaultValue: PropTypes.object,
  setValueObj: PropTypes.object,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  direction: PropTypes.string, // 下拉框还是上拉框
  placeholder: PropTypes.string,
}

export default AddressSelect