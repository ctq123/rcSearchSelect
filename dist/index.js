'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AddressSelect = require('./rcSearchSelect/AddressSelect');

Object.defineProperty(exports, 'SearchSelect', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_AddressSelect).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }