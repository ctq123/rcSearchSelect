'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ClickOut = require('./ClickOut');

var _ClickOut2 = _interopRequireDefault(_ClickOut);

require('./SearchSelect.css');

var _reactVirtualized = require('react-virtualized');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * platform: github
 * author: ctq123
 * date: 2018-10-22
 */
var SearchSelect = function (_React$Component) {
  _inherits(SearchSelect, _React$Component);

  function SearchSelect(props) {
    _classCallCheck(this, SearchSelect);

    var _this = _possibleConstructorReturn(this, (SearchSelect.__proto__ || Object.getPrototypeOf(SearchSelect)).call(this, props));

    var defaultValue = props.defaultValue && props.defaultValue[props.labelField] || '';

    _this.state = {
      dataList: [],
      pointIndex: 0,
      inputVal: defaultValue,
      isSelected: !!defaultValue
    };
    return _this;
  }

  _createClass(SearchSelect, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var setValueObj = nextProps.setValueObj;

      if (setValueObj && setValueObj.id && setValueObj.id !== this.setID) {
        this.setID = setValueObj.id;
        if (setValueObj.label) {
          var dataList = this.filterData(setValueObj.label);
          if (dataList && dataList.length) {
            this.selectOptionVal(dataList[0]);
          }
        } else {
          this.clearData();
        }
      }
    }
  }, {
    key: 'clearData',
    value: function clearData() {
      if (this.state.inputVal) {
        this.setState({
          inputVal: '',
          dataList: [],
          pointIndex: 0,
          isSelected: false
        });
        this.props.onSelect(null);
      }
    }
  }, {
    key: 'onBlur',
    value: function onBlur(e) {
      if (!this.state.inputVal) {
        this.setState(function (prevState, props) {
          return {
            dataList: [],
            pointIndex: 0
          };
        });
      } else {
        var _state = this.state,
            dataList = _state.dataList,
            isSelected = _state.isSelected;

        if (dataList && dataList.length) {
          this.selectOptionVal(dataList[0]);
        } else {
          if (!isSelected) {
            this.setState({
              inputVal: '',
              pointIndex: 0,
              dataList: []
            });
            this.props.onSelect(null);
          }
        }
      }
    }
  }, {
    key: 'onFocus',
    value: function onFocus(e) {
      if (!this.state.inputVal) {
        var dataSource = this.props.dataSource;

        this.setState({
          dataList: dataSource
        });
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(e) {
      var dataSource = this.props.dataSource;

      var val = e.target.value;
      var dataList = [];
      if (val) {
        dataList = this.filterData(val);
      } else {
        dataList = dataSource;
      }
      if (val && dataList && dataList.length) {
        this.setState({
          inputVal: val,
          dataList: dataList
        });
      } else {
        this.setState({
          inputVal: val,
          isSelected: false,
          dataList: dataList
        });
      }
      this.props.onChange(val);
    }
  }, {
    key: 'onOptionClick',
    value: function onOptionClick(item) {
      this.selectOptionVal(item);
    }
  }, {
    key: 'selectOptionVal',
    value: function selectOptionVal() {
      var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var labelField = this.props.labelField;

      if (item && !(labelField in item)) {
        console.warn('There is no such attribute ' + labelField + ' in the object. Selected option failed!');
        return;
      }
      this.props.onSelect(item);
      var val = item && item[labelField];
      this.setState(function (prevState, props) {
        return {
          inputVal: val,
          dataList: [],
          pointIndex: 0,
          isSelected: true
        };
      });
    }
  }, {
    key: 'filterData',
    value: function filterData(val) {
      var _props = this.props,
          dataSource = _props.dataSource,
          isSensitiveCase = _props.isSensitiveCase;

      var dataList = [];
      var labelField = this.props.labelField;

      if (dataSource.length && !(labelField in dataSource[0])) {
        console.warn('There is no such attribute ' + labelField + ' in the object.');
        return;
      }
      dataSource.map(function (item) {
        var label = item[labelField] !== 0 ? item[labelField] || '' : 0;
        if (isSensitiveCase) {
          if (label.toString().indexOf(val) > -1) {
            dataList.push(item);
          }
        } else {
          var label2 = label.toString().toUpperCase();
          var val2 = (val || '').toString().toUpperCase();
          if (label2.indexOf(val2) > -1) {
            dataList.push(item);
          }
        }
      });
      return dataList;
    }
  }, {
    key: 'handleKeyEvent',
    value: function handleKeyEvent(e) {
      // console.log("handleKeyEvent", e)
      var keynum = e.keyCode || e.which;
      // console.log("keynum", keynum)
      var _state2 = this.state,
          dataList = _state2.dataList,
          inputVal = _state2.inputVal;
      var keyField = this.props.keyField;

      var isValidIndex = !!(dataList && dataList.length);
      if (keynum === 40) {
        // 按下箭头
        if (isValidIndex && this.state.pointIndex < dataList.length) {
          this.state.pointIndex++;
          var blockId = 'option-item-' + this.state.pointIndex;
          this.setActiveOptionStyle(blockId);
          this.setScrollToBlock(blockId);
        }
      } else if (keynum === 38) {
        // 按上箭头
        if (isValidIndex && this.state.pointIndex > 1) {
          this.state.pointIndex--;
          var _blockId = 'option-item-' + this.state.pointIndex;
          this.setActiveOptionStyle(_blockId);
          this.setScrollToBlock(_blockId);
        }
      } else if (keynum === 13) {
        // 按回车键
        if (this.state.pointIndex) {
          // 选择值
          var node = document.getElementById('option-item-' + this.state.pointIndex);
          var key = node && node.getAttribute('data-key');
          if (!keyField || !(keyField in (dataList[0] || Object))) {
            console.warn('There is no such attribute ' + keyField + ' in the object. Press the Enter key selected option failed!');
            return;
          }
          var obj = null;
          dataList.map(function (item) {
            if (item && key == item[keyField]) {
              obj = item;
            }
          });
          this.selectOptionVal(obj);
        }
      }
    }
  }, {
    key: 'setActiveOptionStyle',
    value: function setActiveOptionStyle(indexID) {
      this.setClassBackgroundColor('option-item', '#ffffff');
      document.getElementById(indexID) && (document.getElementById(indexID).style.backgroundColor = '#e6f7ff');
    }
  }, {
    key: 'setClassBackgroundColor',
    value: function setClassBackgroundColor(className, color) {
      var es = document.getElementsByClassName(className);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = es[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          if (item) {
            item.style.backgroundColor = color;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'setScrollToBlock',
    value: function setScrollToBlock(blockId) {
      var blockEle = document.getElementById(blockId);
      var parentEle = blockEle ? blockEle.parentNode || blockEle.parentElement : undefined;
      parentEle = parentEle ? parentEle.parentNode || parentEle.parentElement : undefined;
      if (blockEle && parentEle) {
        if (blockEle.offsetTop - parentEle.scrollTop > 68) {
          parentEle.scrollTop = blockEle.offsetTop - 68;
        } else if (parentEle.scrollTop > blockEle.offsetTop) {
          parentEle.scrollTop = blockEle.offsetTop;
        }
      }
    }
  }, {
    key: 'generateLiNode',
    value: function generateLiNode() {
      var _this2 = this;

      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var _props2 = this.props,
          labelField = _props2.labelField,
          keyField = _props2.keyField;

      if (data.length) {
        var invalid = false;
        var obj = data[0];
        if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) != 'object') {
          console.warn('The item of dataSource must be objects.');
          invalid = true;
        }
        if (!(labelField in obj)) {
          console.warn('There is no such attribute ' + labelField + ' in the object.');
          invalid = true;
        }
        if (invalid) {
          return null;
        }
      }
      return data.map(function (item, index) {
        var i = index + 1;
        if (item) {
          return _react2.default.createElement(
            'li',
            { key: 'auto-option-li-' + index, id: 'auto-option-li-' + i, className: 'auto-option-li', 'data-key': item[keyField], onClick: _this2.onOptionClick.bind(_this2, item) },
            item[labelField]
          );
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state3 = this.state,
          dataList = _state3.dataList,
          inputVal = _state3.inputVal;
      var _props3 = this.props,
          direction = _props3.direction,
          placeholder = _props3.placeholder,
          keyField = _props3.keyField,
          labelField = _props3.labelField,
          dropdwonHeight = _props3.dropdwonHeight;

      var rowH = 28;
      var dropdownH = Math.min(rowH * dataList.length, dropdwonHeight);

      var renderItem = function renderItem(_ref) {
        var index = _ref.index,
            key = _ref.key,
            style = _ref.style;

        var i = index + 1,
            item = dataList[index];
        if (item) {
          return _react2.default.createElement(
            'div',
            { key: key, style: style, className: 'option-item', id: 'option-item-' + i, 'data-key': item[keyField], onClick: _this3.onOptionClick.bind(_this3, item) },
            item[labelField]
          );
        }
      };
      return _react2.default.createElement(
        _ClickOut2.default,
        { onClickOut: this.onBlur.bind(this) },
        _react2.default.createElement(
          'div',
          { className: 'rc-searchselect' },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'div',
              { className: direction === 'up' ? 'dropup-parent' : 'dropdown-parent' },
              _react2.default.createElement(
                'div',
                null,
                dataList && dataList.length ? _react2.default.createElement(
                  'div',
                  { className: 'dropdown dropdwon-placement', style: { height: dropdownH } },
                  _react2.default.createElement(
                    _reactVirtualized.AutoSizer,
                    null,
                    function (_ref2) {
                      var height = _ref2.height,
                          width = _ref2.width;
                      return _react2.default.createElement(_reactVirtualized.List, {
                        width: width,
                        height: height,
                        rowCount: dataList.length,
                        rowHeight: 28,
                        rowRenderer: renderItem
                      });
                    }
                  )
                ) : null
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'input-con' },
            _react2.default.createElement('input', { className: 'auto-input rc-input',
              onFocus: this.onFocus.bind(this),
              onChange: this.onChange.bind(this),
              onKeyDown: this.handleKeyEvent.bind(this),
              value: inputVal,
              placeholder: placeholder
            }),
            inputVal ? _react2.default.createElement(
              'span',
              { className: 'input-suffix', onClick: this.clearData.bind(this) },
              _react2.default.createElement(
                'span',
                { className: 'close-icon' },
                _react2.default.createElement(
                  'i',
                  { className: 'close-i' },
                  _react2.default.createElement(
                    'svg',
                    { viewBox: '64 64 896 896', width: '1em', height: '1em', fill: 'currentColor', 'aria-hidden': 'true' },
                    _react2.default.createElement('path', { d: 'M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z' }),
                    _react2.default.createElement('path', { d: 'M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z' })
                  )
                )
              )
            ) : null
          )
        )
      );
    }
  }]);

  return SearchSelect;
}(_react2.default.Component);

SearchSelect.propTypes = {
  dataSource: _propTypes2.default.array.isRequired,
  keyField: _propTypes2.default.string.isRequired,
  labelField: _propTypes2.default.string.isRequired,
  onSelect: _propTypes2.default.func,
  defaultValue: _propTypes2.default.object,
  setValueObj: _propTypes2.default.object,
  onChange: _propTypes2.default.func,
  direction: _propTypes2.default.oneOf(['down', 'up']),
  placeholder: _propTypes2.default.string,
  dropdwonHeight: _propTypes2.default.number,
  isSensitiveCase: _propTypes2.default.bool
};

SearchSelect.defaultProps = {
  dataSource: [],
  keyField: '',
  labelField: '',
  onSelect: function onSelect(e) {},
  defaultValue: null,
  setValueObj: null,
  onChange: function onChange(e) {},
  direction: 'down',
  placeholder: '',
  dropdwonHeight: 200,
  isSensitiveCase: true
};

exports.default = SearchSelect;