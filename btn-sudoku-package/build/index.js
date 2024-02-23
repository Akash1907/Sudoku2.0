module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function BtnSudoku(a) {
  var myStyle = {
    backgroundColor: "#6CAAD9",
    height: "5vh",
    width: "12vh",
    cursor: "pointer",
    borderRadius: "5px",
    border: "none",
    color: "white",
    fontSize: "2.5vh"
  };

  var indexes = Object.keys(a.listOfComponents).length - 1;

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      step = _useState2[0],
      setStep = _useState2[1];

  var handleNext = function handleNext() {
    console.log("Next button is clicked");
    console.log(step);
    a.listOfComponents[step].method();
    if (a.listOfComponents[indexes].nextBtnCheck) {
      setStep(step + 1);
    }
  };

  var handlePrevious = function handlePrevious() {
    setStep(step - 1);
    console.log("Previous button is clicked");
    console.log(step);
  };

  var handleSubmit = function handleSubmit() {
    console.log("Submit button is clicked");
    a.listOfComponents[step].method();
    if (a.listOfComponents[indexes].submitBtnCheck) {
      a.listOfComponents[indexes].NavigateToNextPage();
    }
  };

  return _react2.default.createElement(
    "div",
    { className: "BtnsContainer" },
    a.listOfComponents[step].page,
    _react2.default.createElement(
      "div",
      {
        className: "BtnsContainer1",
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "6vh"
        }
      },
      step < indexes - 1 && _react2.default.createElement(
        "button",
        { className: "btnsss", style: myStyle, onClick: handleNext },
        "Next"
      ),
      step > 0 && _react2.default.createElement(
        "button",
        { className: "btnsss", style: myStyle, onClick: handlePrevious },
        "Previous"
      ),
      step === indexes - 1 && _react2.default.createElement(
        "button",
        { className: "btnsss", style: myStyle, onClick: handleSubmit },
        "Submit"
      )
    )
  );
}

exports.default = BtnSudoku;

/***/ })
/******/ ]);