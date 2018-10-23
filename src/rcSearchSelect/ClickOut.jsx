import React from 'react'
import ReactDOM from 'react-dom'

// author: 陈晓波
class ClickOutComponent extends React.Component {
  componentDidMount () {
    let self = this
    let el = ReactDOM.findDOMNode(this)
    this.__el = el

    self.__documentClicked = function (e) {
      if ((e.__clickedElements || []).indexOf(el) > -1) return

      let clickOutHandler = self.props.onClickOut
      if (!clickOutHandler) {
        return console.warn('onClickOut is not defined.')
      }

      clickOutHandler.call(self, e)
    }

    self.__elementClicked = function (e) {
      e.__clickedElements = e.__clickedElements || []
      e.__clickedElements.push(el)
    }

    setTimeout(function () {
      if (self.__unmounted) return
      self.toggleListeners('addEventListener')
    }, 0)
  }

  componentWillUnmount () {
    this.toggleListeners('removeEventListener')
    this.__unmounted = true
  }

  toggleListeners (listenerMethod) {
    this.__el[listenerMethod]('click', this.__elementClicked, false)

    document[listenerMethod]('click', this.__documentClicked, false)
  }

  render () {
    return (
      Array.isArray(this.props.children)
        ? <div>{this.props.children}</div>
        : React.Children.only(this.props.children)
    )
  }
}

export default ClickOutComponent
