import React from 'react'
import PropTypes from 'prop-types'
import ClickOut from './ClickOut'
import './SearchSelect.css'

/**
 * platform: github
 * author: ctq123
 * date: 2018-10-22
 */
class SearchSelect extends React.Component {
  constructor(props) {
    super(props)
    const defaultValue = props.defaultValue && props.defaultValue[props.labelField] || ''

    this.state = {
      dataList: [],
      pointIndex: 0,
      inputVal: defaultValue,
      isSelected: !!defaultValue,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { setValueObj } = nextProps
    if (setValueObj && setValueObj.id && setValueObj.id !== this.setID) {
      this.setID = setValueObj.id
      if (setValueObj.label) {
        let dataList = this.filterData(setValueObj.label)
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
      this.props.onSelect(null)
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
          this.props.onSelect(null)
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
    const { dataSource } = this.props
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
    this.props.onChange(val)
  }

  onOptionClick(item) {
    this.selectOptionVal(item)
  }

  selectOptionVal(item=null) {
    const { labelField } = this.props
    if (item && !(labelField in item)) {
      console.warn('There is no such attribute '+ labelField +' in the object. Selected option failed!')
      return
    }
    this.props.onSelect(item)
    const val = item && item[labelField] || ''
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
    const { labelField } = this.props
    if (dataSource.length && !(labelField in dataSource[0])) {
      console.warn('There is no such attribute '+ labelField +' in the object.')
      return
    }
    dataSource.map(item => {
      const label = item && item[labelField] || ''
      if (label.toString().indexOf(val) > -1) {
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
    const { keyField } = this.props
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
        const key = node.getAttribute('data-key')
        if (!keyField || !(keyField in (dataList[0] || Object))) {
          console.warn('There is no such attribute '+ keyField +' in the object. Press the Enter key selected option failed!')
          return
        }
        let obj = null
        dataList.map(item => {
          if (item && key == item[keyField]) {
            obj = item 
          }
        })
        this.selectOptionVal(obj)
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
      if (blockEle.offsetTop - parentEle.scrollTop > 68) {
        parentEle.scrollTop = (blockEle.offsetTop - 68)
      } else if (parentEle.scrollTop > blockEle.offsetTop) {
        parentEle.scrollTop = blockEle.offsetTop
      }
    }
  }


  generateLiNode(data = []) {
    const { labelField, keyField } = this.props
    if (data.length) {
      let invalid = false
      const obj = data[0]
      if (typeof obj != 'object') {
        console.warn('The item of dataSource must be objects.')
        invalid = true
      }
      if (!(labelField in obj)) {
        console.warn('There is no such attribute '+ labelField +' in the object.')
        invalid = true
      }
      if (invalid) {
        return null
      }
    }
    return data.map((item, index) => {
      let i = index + 1
      if (item) {
        return <li key={`auto-option-li-` + index} id={`auto-option-li-` + i} className={'auto-option-li'} data-key={item[keyField]} onClick={this.onOptionClick.bind(this, item)}>{item[labelField]}</li>
      }
    })
  }

  render() {
    const { dataList, inputVal } = this.state
    const { direction, placeholder } = this.props
    return (
      <ClickOut onClickOut={this.onBlur.bind(this)}>
        <div className='rc-searchselect'>
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

SearchSelect.propTypes = {
  dataSource: PropTypes.array.isRequired,
  keyField: PropTypes.string.isRequired,
  labelField: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
  defaultValue: PropTypes.object,
  setValueObj: PropTypes.object,
  onChange: PropTypes.func,
  direction: PropTypes.string,
  placeholder: PropTypes.string,
}

SearchSelect.defaultProps = {
  dataSource: [],
  keyField: '',
  labelField: '',
  onSelect: (e) => {},
  defaultValue: null,
  setValueObj: null,
  onChange: (e) => {},
  direction: 'down',
  placeholder: ''
}

export default SearchSelect