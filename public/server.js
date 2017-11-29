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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(28);

var _stringify2 = _interopRequireDefault(_stringify);

var _slicedToArray2 = __webpack_require__(29);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

var prefix = 's';
var inserted = {};

// Base64 encoding and decoding - The "Unicode Problem"
// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode('0x' + p1);
  }));
}

/**
 * Remove style/link elements for specified node IDs
 * if they are no longer referenced by UI components.
 */
function removeCss(ids) {
  ids.forEach(function (id) {
    if (--inserted[id] <= 0) {
      var elem = document.getElementById(prefix + id);
      if (elem) {
        elem.parentNode.removeChild(elem);
      }
    }
  });
}

/**
 * Example:
 *   // Insert CSS styles object generated by `css-loader` into DOM
 *   var removeCss = insertCss([[1, 'body { color: red; }']]);
 *
 *   // Remove it from the DOM
 *   removeCss();
 */
function insertCss(styles) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$replace = _ref.replace,
      replace = _ref$replace === undefined ? false : _ref$replace,
      _ref$prepend = _ref.prepend,
      prepend = _ref$prepend === undefined ? false : _ref$prepend;

  var ids = [];
  for (var i = 0; i < styles.length; i++) {
    var _styles$i = (0, _slicedToArray3.default)(styles[i], 4),
        moduleId = _styles$i[0],
        css = _styles$i[1],
        media = _styles$i[2],
        sourceMap = _styles$i[3];

    var id = moduleId + '-' + i;

    ids.push(id);

    if (inserted[id]) {
      if (!replace) {
        inserted[id]++;
        continue;
      }
    }

    inserted[id] = 1;

    var elem = document.getElementById(prefix + id);
    var create = false;

    if (!elem) {
      create = true;

      elem = document.createElement('style');
      elem.setAttribute('type', 'text/css');
      elem.id = prefix + id;

      if (media) {
        elem.setAttribute('media', media);
      }
    }

    var cssText = css;
    if (sourceMap && typeof btoa === 'function') {
      // skip IE9 and below, see http://caniuse.com/atob-btoa
      cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
      cssText += '\n/*# sourceURL=' + sourceMap.file + '?' + id + '*/';
    }

    if ('textContent' in elem) {
      elem.textContent = cssText;
    } else {
      elem.styleSheet.cssText = cssText;
    }

    if (create) {
      if (prepend) {
        document.head.insertBefore(elem, document.head.childNodes[0]);
      } else {
        document.head.appendChild(elem);
      }
    }
  }

  return removeCss.bind(null, ids);
}

module.exports = insertCss;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.searchFilms = searchFilms;
exports.findFilm = findFilm;
exports.findSimilarFilms = findSimilarFilms;
exports.changeSearchQuery = changeSearchQuery;
exports.sortFilms = sortFilms;
exports.selectFilm = selectFilm;
exports.selectSearchType = selectSearchType;
var path = 'https://api.themoviedb.org/3/';
var key = 'api_key=df4c6dbe30add802b058d74f2a7aa462';

var SEARCH_FILMS = exports.SEARCH_FILMS = "SEARCH_FILMS";
var SORT_FILMS = exports.SORT_FILMS = "SORT_FILMS";
var REQUEST_FILMS = exports.REQUEST_FILMS = "REQUEST_FILMS";
var RECIEVE_FILMS = exports.RECIEVE_FILMS = "RECIEVE_FILMS";
var SELECT_FILMS = exports.SELECT_FILMS = "SELECT_FILMS";
var SELECT_SEARCH_TYPE = exports.SELECT_SEARCH_TYPE = "SELECT_SEARCH_TYPE";
var RECIEVE_UNIQUE_FILM = exports.RECIEVE_UNIQUE_FILM = "RECIEVE_UNIQUE_FILM";
var RECIEVE_SIMILAR_FILMS = exports.RECIEVE_SIMILAR_FILMS = "RECIEVE_SIMILAR_FILMS";
var CHANGE_SEARCH_QUERY = exports.CHANGE_SEARCH_QUERY = "CHANGE_SEARCH_QUERY";

function fetchFilms(url, dispatch) {
    return fetch(url).then(function (response) {
        return response.json();
    }).then(function (json) {
        return dispatch(receiveFilms(json.results));
    }).catch(function (errors) {
        return console.log("Error: The problem with displaying of films in accordance with the search query ;(");
    });
}

function fetchUniqueFilm(url, dispatch) {
    return fetch(url).then(function (response) {
        return response.json();
    }).then(function (json) {
        return dispatch(receiveUniqueFilm(json));
    }).catch(function (errors) {
        return console.log("Error: Problems with displaying of the selected film ;(");
    });
}

function fetchSimilarFilms(url, dispatch) {
    return fetch(url).then(function (response) {
        return response.json();
    }).then(function (json) {
        return dispatch(receiveSimilarFilms(json.results));
    }).catch(function (errors) {
        return console.log("Error: Problem with displaying similar movies ;(");
    });
}

function searchFilms(query) {
    return function (dispatch, getState) {
        var searchType = getState().storeFilms.searchType;
        return fetchFilms(path + 'search/' + searchType + '?' + key + '&query=' + query + '&page=1', dispatch);
    };
}

function findFilm(id) {
    return function (dispatch, getState) {
        var searchType = getState().storeFilms.searchType;
        return fetchUniqueFilm('' + path + searchType + '/' + id + '?' + key, dispatch);
    };
}

function findSimilarFilms(id) {
    return function (dispatch, getState) {
        var searchType = getState().storeFilms.searchType;
        return fetchSimilarFilms('' + path + searchType + '/' + id + '/similar?' + key + '&page=1', dispatch);
    };
}

function receiveFilms(films) {
    return {
        type: RECIEVE_FILMS,
        films: films
    };
}

function receiveUniqueFilm(film) {
    return {
        type: RECIEVE_UNIQUE_FILM,
        filmUnique: film
    };
}

function changeSearchQuery(query) {
    return {
        type: CHANGE_SEARCH_QUERY,
        searchQuery: query
    };
}

function receiveSimilarFilms(filmsSimilar) {
    return {
        type: RECIEVE_SIMILAR_FILMS,
        filmsSimilar: filmsSimilar
    };
}

function sortFilms(sortBy) {
    return {
        type: SORT_FILMS,
        sortBy: sortBy
    };
}

function selectFilm(filmID) {
    return {
        type: SELECT_FILMS,
        filmID: filmID
    };
}

function selectSearchType(searchType) {
    return {
        type: SELECT_SEARCH_TYPE,
        searchType: searchType
    };
}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var content = __webpack_require__(40);
var insertCss = __webpack_require__(3);

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

module.exports = content.locals || {};
module.exports._getContent = function () {
  return content;
};
module.exports._getCss = function () {
  return content.toString();
};
module.exports._insertCss = function (options) {
  return insertCss(content, options);
};

// Hot Module Replacement
// https://webpack.github.io/docs/hot-module-replacement
// Only activated in browser context
if (false) {
  var removeCss = function removeCss() {};
  module.hot.accept("!!../../../../node_modules/css-loader/index.js!./resultBox.css", function () {
    content = require("!!../../../../node_modules/css-loader/index.js!./resultBox.css");

    if (typeof content === 'string') {
      content = [[module.id, content, '']];
    }

    removeCss = insertCss(content, { replace: true });
  });
  module.hot.dispose(function () {
    removeCss();
  });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Poster = __webpack_require__(25);

var _Poster2 = _interopRequireDefault(_Poster);

var _reactRouterDom = __webpack_require__(1);

var _reactRedux = __webpack_require__(4);

var _actions = __webpack_require__(5);

var _content = __webpack_require__(9);

var _content2 = _interopRequireDefault(_content);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContentFilm = function (_React$Component) {
    _inherits(ContentFilm, _React$Component);

    function ContentFilm(props) {
        _classCallCheck(this, ContentFilm);

        var _this = _possibleConstructorReturn(this, (ContentFilm.__proto__ || Object.getPrototypeOf(ContentFilm)).call(this, props));

        _this.state = { query: ' ' };
        return _this;
    }

    _createClass(ContentFilm, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.requestFilms();
        }
    }, {
        key: 'requestFilms',
        value: function requestFilms() {
            if (this.props.match.url.indexOf('search') !== -1) {
                var query = this.props.match.params.query;
                this.props.fetchFilms(query);
            } else {
                var id = this.props.match.params.query;
                this.props.fetchSimilarFilms(id);
            }
        }
    }, {
        key: 'sortFilmsBy',
        value: function sortFilmsBy(sortBy, films) {
            if (sortBy === "releaseDate") {
                films.sort(function (a, b) {
                    var itemA = a.releaseDate || '0';
                    var itemB = b.releaseDate || '0';
                    return itemB.replace(/-/g, '') - itemA.replace(/-/g, '');
                });
            } else {
                films.sort(function (a, b) {
                    return b.raiting - a.raiting;
                });
            }
        }
    }, {
        key: 'serializeFilmsComponents',
        value: function serializeFilmsComponents() {
            var films = (this.props.match.url.indexOf('search') !== -1 ? this.props.films : this.props.filmsSimilar).map(function (film) {
                return {
                    name: film.title || film.name,
                    releaseDate: film.release_date || film.first_air_date,
                    raiting: film.vote_average,
                    posterImage: film.poster_path,
                    id: film.id
                };
            });
            return films;
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.props.match.params.query !== this.state.query) {
                this.setState({ query: this.props.match.params.query });
                this.requestFilms();
            }
            var films = this.serializeFilmsComponents();
            if (this.props.match.url.indexOf('search') !== -1) {
                this.sortFilmsBy(this.props.sortBy, films);
            }
            var filmsComponents = films.map(function (film) {
                return _react2.default.createElement(_Poster2.default, { info: film, key: film.id.toString() });
            });
            return _react2.default.createElement(
                'div',
                { className: 'content' },
                films.length === 0 ? _react2.default.createElement(
                    'p',
                    { className: 'notFoundFilm' },
                    'No films found'
                ) : filmsComponents
            );
        }
    }], [{
        key: 'fetchData',
        value: function fetchData(dispatch, match) {
            if (match.url.indexOf('search') !== -1) {
                var query = match.params.query;
                return dispatch((0, _actions.searchFilms)(query));
            } else {
                var id = match.params.query;
                return dispatch((0, _actions.findSimilarFilms)(id));
            }
        }
    }]);

    return ContentFilm;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(store) {
    return {
        films: store.storeFilms.films,
        sortBy: store.storeFilms.sortBy,
        filmsSimilar: store.storeDetailFilm.filmsSimilar

    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        fetchFilms: function fetchFilms(query) {
            dispatch((0, _actions.searchFilms)(query));
        },
        fetchSimilarFilms: function fetchSimilarFilms(id) {
            dispatch((0, _actions.findSimilarFilms)(id));
        }
    };
};

exports.default = (0, _reactRouterDom.withRouter)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ContentFilm));

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var content = __webpack_require__(30);
var insertCss = __webpack_require__(3);

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

module.exports = content.locals || {};
module.exports._getContent = function () {
  return content;
};
module.exports._getCss = function () {
  return content.toString();
};
module.exports._insertCss = function (options) {
  return insertCss(content, options);
};

// Hot Module Replacement
// https://webpack.github.io/docs/hot-module-replacement
// Only activated in browser context
if (false) {
  var removeCss = function removeCss() {};
  module.hot.accept("!!../../../../node_modules/css-loader/index.js!./content.css", function () {
    content = require("!!../../../../node_modules/css-loader/index.js!./content.css");

    if (typeof content === 'string') {
      content = [[module.id, content, '']];
    }

    removeCss = insertCss(content, { replace: true });
  });
  module.hot.dispose(function () {
    removeCss();
  });
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _moveDescription = __webpack_require__(31);

var _moveDescription2 = _interopRequireDefault(_moveDescription);

var _reactRedux = __webpack_require__(4);

var _reactRouterDom = __webpack_require__(1);

var _actions = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MoveDescription = function (_React$Component) {
    _inherits(MoveDescription, _React$Component);

    function MoveDescription(props) {
        _classCallCheck(this, MoveDescription);

        var _this = _possibleConstructorReturn(this, (MoveDescription.__proto__ || Object.getPrototypeOf(MoveDescription)).call(this, props));

        _this.state = { query: '' };
        return _this;
    }

    _createClass(MoveDescription, [{
        key: 'requestUniqueFilm',


        // componentDidMount(){
        //     this.requestUniqueFilm();
        // }


        value: function requestUniqueFilm() {
            console.log("movieDesc", this.props.match.params.query);
            var id = this.props.match.params.query;
            this.props.showUniqueFilm(id);
        }
    }, {
        key: 'infoOfFilm',
        value: function infoOfFilm(info) {
            if (this.props.searchType === "movie") {
                return {
                    title: info.title,
                    raiting: info.vote_average || '?',
                    release_date: info.release_date,
                    runtime: info.runtime,
                    overview: info.overview,
                    genres: info.genres ? info.genres[0].name : 'indefined',
                    production_countrie: info.production_countries && info.production_countries.length ? info.production_countries[0].name : 'indefined'

                };
            } else {
                return {
                    title: info.name,
                    raiting: info.vote_average || '?',
                    release_date: info.first_air_date,
                    runtime: info.episode_run_time ? info.episode_run_time[0] : 'indefined',
                    overview: info.overview,
                    genres: info.genres ? info.genres[0].name : 'indefined',
                    production_countrie: info.origin_country ? info.origin_country[0] : 'indefined'
                };
            }
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.props.match.params.query !== this.state.query) {
                this.setState({ query: this.props.match.params.query });
                this.requestUniqueFilm();
            }
            var info = this.props.info;
            var infoFilm = this.infoOfFilm(info);
            return _react2.default.createElement(
                'div',
                { className: 'move-description-part' },
                _react2.default.createElement('img', { className: 'poster-image', src: info.poster_path ? 'https://image.tmdb.org/t/p/w500' + info.poster_path : 'https://www.beddingwarehouse.com.au/wp-content/uploads/2016/01/placeholder-featured-image-600x600.png' }),
                _react2.default.createElement(
                    'div',
                    { className: 'description-part' },
                    _react2.default.createElement(
                        'h2',
                        null,
                        infoFilm.title
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'raiting' },
                        'Raiting: ',
                        _react2.default.createElement(
                            'span',
                            { className: 'raiting-average' },
                            infoFilm.raiting
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'runtime-and-release-year' },
                        _react2.default.createElement(
                            'span',
                            null,
                            infoFilm.release_date
                        ),
                        _react2.default.createElement(
                            'span',
                            null,
                            infoFilm.runtime,
                            ' min'
                        )
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'description' },
                        infoFilm.overview
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'genres-and-production-countries' },
                        _react2.default.createElement(
                            'p',
                            null,
                            'Genres: ',
                            infoFilm.genres
                        ),
                        _react2.default.createElement(
                            'p',
                            null,
                            'Production countries: ',
                            infoFilm.production_countrie
                        )
                    )
                )
            );
        }
    }], [{
        key: 'fetchData',
        value: function fetchData(dispatch, match) {
            var id = match.params.query;
            return dispatch((0, _actions.findFilm)(id));
        }
    }]);

    return MoveDescription;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(store) {
    return {
        filmID: store.storeDetailFilm.filmID,
        info: store.storeDetailFilm.filmUnique,
        searchType: store.storeFilms.searchType
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        showUniqueFilm: function showUniqueFilm(id) {
            dispatch((0, _actions.findFilm)(id));
        }
    };
};

exports.default = (0, _reactRouterDom.withRouter)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MoveDescription));

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var content = __webpack_require__(42);
var insertCss = __webpack_require__(3);

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

module.exports = content.locals || {};
module.exports._getContent = function () {
  return content;
};
module.exports._getCss = function () {
  return content.toString();
};
module.exports._insertCss = function (options) {
  return insertCss(content, options);
};

// Hot Module Replacement
// https://webpack.github.io/docs/hot-module-replacement
// Only activated in browser context
if (false) {
  var removeCss = function removeCss() {};
  module.hot.accept("!!../../../../node_modules/css-loader/index.js!./header.css", function () {
    content = require("!!../../../../node_modules/css-loader/index.js!./header.css");

    if (typeof content === 'string') {
      content = [[module.id, content, '']];
    }

    removeCss = insertCss(content, { replace: true });
  });
  module.hot.dispose(function () {
    removeCss();
  });
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(13);

var _express2 = _interopRequireDefault(_express);

var _path = __webpack_require__(14);

var _path2 = _interopRequireDefault(_path);

var _handleRander = __webpack_require__(15);

var _handleRander2 = _interopRequireDefault(_handleRander);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = 7700;
var PUBLIC_PATH = '.';

var app = (0, _express2.default)();

app.use(_express2.default.static(PUBLIC_PATH));

// app.all("*", function(req, res) {
//     res.sendFile(path.resolve(PUBLIC_PATH, 'index.html'));
// });

// Serve requests with our handleRender function
app.get('*', _handleRander2.default);

app.listen(PORT, function () {
    console.log('Listening on port ' + PORT + '...');
});

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = handleRender;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(16);

var _reactRouterDom = __webpack_require__(1);

var _reactRouterConfig = __webpack_require__(17);

var _reactRedux = __webpack_require__(4);

var _store = __webpack_require__(18);

var _store2 = _interopRequireDefault(_store);

__webpack_require__(23);

var _routes = __webpack_require__(24);

var _routes2 = _interopRequireDefault(_routes);

var _App = __webpack_require__(33);

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderPage(renderedApp, preloadedState) {
    var appData = '<!DOCTYPE html>\n    <html lang="en">\n    <head>\n        <meta charset="UTF-8">\n        <title>SPA</title>\n    </head>\n    <body>\n    <div id="app">' + renderedApp + '</div>\n    <script>\n        window.PRELOADED_STATE = ' + JSON.stringify(preloadedState).replace(/</g, '\\u003c') + '\n    </script>\n    <script type="text/javascript" src="/bundle.js"></script>\n    </body>\n    </html>';

    return appData;
}

function handleRender(req, res) {
    var context = {};
    var store = (0, _store2.default)();
    var branch = (0, _reactRouterConfig.matchRoutes)(_routes2.default, req.url);
    var promiseAll = branch.map(function (_ref) {
        var route = _ref.route,
            match = _ref.match;
        var fetchData = route.component.fetchData;

        if (!(fetchData instanceof Function)) {
            return Promise.resolve(null);
        }
        return fetchData(store.dispatch, match);
    });
    Promise.all(promiseAll).then(function () {
        var app = _react2.default.createElement(
            _reactRedux.Provider,
            { store: store },
            _react2.default.createElement(
                _reactRouterDom.StaticRouter,
                { location: req.url, context: context },
                _react2.default.createElement(_App2.default, null)
            )
        );
        var renderedApp = (0, _server.renderToString)(app);

        if (context.url) {
            return res.redirect(context.url);
        }

        var preloadedState = store.getState();

        return res.send(renderPage(renderedApp, preloadedState));
    });
}

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("react-router-config");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = __webpack_require__(6);

var _reduxThunk = __webpack_require__(19);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _index = __webpack_require__(20);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var middleware = (0, _redux.applyMiddleware)(_reduxThunk2.default);

exports.default = function (initialState) {
    return (0, _redux.createStore)(_index.rootReducer, initialState, middleware);
};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.rootReducer = undefined;

var _redux = __webpack_require__(6);

var _filmsReducer = __webpack_require__(21);

var _filmsReducer2 = _interopRequireDefault(_filmsReducer);

var _oneFilmReducer = __webpack_require__(22);

var _oneFilmReducer2 = _interopRequireDefault(_oneFilmReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_filmsReducer2.default);
console.log(_oneFilmReducer2.default);

var rootReducer = exports.rootReducer = (0, _redux.combineReducers)({
    storeFilms: _filmsReducer2.default,
    storeDetailFilm: _oneFilmReducer2.default
});

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = reducer;

var _redux = __webpack_require__(6);

var _actions = __webpack_require__(5);

function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        searchType: 'movie',
        films: [],
        sortBy: 'releaseDate',
        searchQuery: ''
    };
    var action = arguments[1];

    switch (action.type) {
        case _actions.SELECT_SEARCH_TYPE:
            {
                return Object.assign({}, state, { searchType: action.searchType });
            }
        case _actions.RECIEVE_FILMS:
            {
                return Object.assign({}, state, { films: action.films });
            }
        case _actions.SORT_FILMS:
            {
                return Object.assign({}, state, { sortBy: action.sortBy });
            }
        case _actions.CHANGE_SEARCH_QUERY:
            {
                return Object.assign({}, state, { searchQuery: action.searchQuery });
            }
        default:
            return state;
    }
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = reducer;

var _actions = __webpack_require__(5);

function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        filmID: null,
        filmUnique: {},
        filmsSimilar: []
    };
    var action = arguments[1];

    switch (action.type) {
        case _actions.SELECT_FILMS:
            {
                return Object.assign({}, state, { filmID: action.filmID });
            }
        case _actions.RECIEVE_UNIQUE_FILM:
            {
                return Object.assign({}, state, { filmUnique: action.filmUnique });
            }
        case _actions.RECIEVE_SIMILAR_FILMS:
            {
                return Object.assign({}, state, { filmsSimilar: action.filmsSimilar });
            }
        default:
            return state;
    }
}

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ContentFilm = __webpack_require__(8);

var _ContentFilm2 = _interopRequireDefault(_ContentFilm);

var _MoveDescription = __webpack_require__(10);

var _MoveDescription2 = _interopRequireDefault(_MoveDescription);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  path: '/film/:query/:id',
  component: _MoveDescription2.default
}, {
  path: '/search/:query',
  component: _ContentFilm2.default
}, {
  path: '/film/:query',
  component: _ContentFilm2.default
}];

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _poster = __webpack_require__(26);

var _poster2 = _interopRequireDefault(_poster);

var _reactRedux = __webpack_require__(4);

var _actions = __webpack_require__(5);

var _reactRouterDom = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Poster = function (_React$Component) {
    _inherits(Poster, _React$Component);

    function Poster(props) {
        _classCallCheck(this, Poster);

        return _possibleConstructorReturn(this, (Poster.__proto__ || Object.getPrototypeOf(Poster)).call(this, props));
    }

    _createClass(Poster, [{
        key: 'render',
        value: function render() {
            var info = this.props.info;
            return _react2.default.createElement(
                'div',
                { className: 'poster' },
                _react2.default.createElement(
                    _reactRouterDom.Link,
                    { to: '/film/' + info.id },
                    _react2.default.createElement('img', { className: 'imageBlock', src: info.posterImage ? 'https://image.tmdb.org/t/p/w500' + info.posterImage : 'https://www.beddingwarehouse.com.au/wp-content/uploads/2016/01/placeholder-featured-image-600x600.png' })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'film-info' },
                    _react2.default.createElement(
                        'div',
                        { className: 'film-inform' },
                        _react2.default.createElement(
                            'span',
                            null,
                            info.name
                        ),
                        _react2.default.createElement(
                            'span',
                            null,
                            info.releaseDate
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'span',
                            { className: 'genre' },
                            'Raiting: ',
                            info.raiting
                        )
                    )
                )
            );
        }
    }]);

    return Poster;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(store) {
    return {
        filmID: store.storeDetailFilm.filmID
    };
};

exports.default = (0, _reactRouterDom.withRouter)((0, _reactRedux.connect)(mapStateToProps)(Poster));

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var content = __webpack_require__(27);
var insertCss = __webpack_require__(3);

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

module.exports = content.locals || {};
module.exports._getContent = function () {
  return content;
};
module.exports._getCss = function () {
  return content.toString();
};
module.exports._insertCss = function (options) {
  return insertCss(content, options);
};

// Hot Module Replacement
// https://webpack.github.io/docs/hot-module-replacement
// Only activated in browser context
if (false) {
  var removeCss = function removeCss() {};
  module.hot.accept("!!../../../../node_modules/css-loader/index.js!./poster.css", function () {
    content = require("!!../../../../node_modules/css-loader/index.js!./poster.css");

    if (typeof content === 'string') {
      content = [[module.id, content, '']];
    }

    removeCss = insertCss(content, { replace: true });
  });
  module.hot.dispose(function () {
    removeCss();
  });
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".film-info{\r\n    display: flex;\r\n    flex-direction: column;\r\n    font-size: 12px\r\n}\r\n\r\n.film-info .genre{\r\n    color: rgb(140,140,140);\r\n}\r\n\r\n.film-inform{\r\n    display: flex;\r\n    flex-direction: row;\r\n    justify-content: space-between;\r\n    padding: 10px 0 5px 0;\r\n}\r\n\r\n.film-inform span:first-child{\r\n    font-size: 12px;\r\n    width: 100px;\r\n    font-weight: bold;\r\n    text-transform: uppercase;\r\n}\r\n\r\n.film-inform span:last-child{\r\n    /*border: 1px solid gray;*/\r\n    padding: 2px;\r\n    font-size: 10px;\r\n}", ""]);

// exports


/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".content {\r\n    display: flex;\r\n    flex-direction: row;\r\n    flex-wrap: wrap;\r\n    justify-content: flex-start;\r\n    align-items: flex-start;\r\n    align-content: flex-start;\r\n    flex: 1 0 auto;\r\n    padding: 0 10px 20px 10px;\r\n}\r\n\r\n.imageBlock {\r\n    display: block;\r\n    height: 200px;\r\n    width: 150px;\r\n}\r\n\r\n.poster {\r\n    padding-top: 20px;\r\n    flex: 0 1 auto;\r\n    margin-right: 20px;\r\n}\r\n\r\n.notFoundFilm {\r\n    margin: 0 auto;\r\n    font-size: 40px;\r\n    color: rgb(210,210,210);\r\n    align-self: center;\r\n}", ""]);

// exports


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var content = __webpack_require__(32);
var insertCss = __webpack_require__(3);

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

module.exports = content.locals || {};
module.exports._getContent = function () {
  return content;
};
module.exports._getCss = function () {
  return content.toString();
};
module.exports._insertCss = function (options) {
  return insertCss(content, options);
};

// Hot Module Replacement
// https://webpack.github.io/docs/hot-module-replacement
// Only activated in browser context
if (false) {
  var removeCss = function removeCss() {};
  module.hot.accept("!!../../../../node_modules/css-loader/index.js!./moveDescription.css", function () {
    content = require("!!../../../../node_modules/css-loader/index.js!./moveDescription.css");

    if (typeof content === 'string') {
      content = [[module.id, content, '']];
    }

    removeCss = insertCss(content, { replace: true });
  });
  module.hot.dispose(function () {
    removeCss();
  });
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".move-description-part{\r\n    display: flex;\r\n    flex-direction: row;\r\n    justify-content: space-around;\r\n    padding: 20px 40px;\r\n}\r\n\r\n.poster-image{\r\n    width: 200px;\r\n    height: 270px;\r\n}\r\n\r\n.description-part{\r\n    margin-left: 40px;\r\n}\r\n\r\n.description-part h2{\r\n    color: rgb(251, 99, 98);\r\n}\r\n\r\n.raiting{\r\n    font-size: 14px;\r\n    color: white;\r\n    padding: 10px 0;\r\n}\r\n\r\n.raiting-average{\r\n    display: inline-block;\r\n    font-size: 12px;\r\n    color: lemonchiffon;\r\n    padding: 8px 10px;\r\n    border-radius: 50%;\r\n    border: 2px solid lemonchiffon;\r\n}\r\n\r\n.runtime-and-release-year span{\r\n    display: inline-block;\r\n    color: white;\r\n    font-size: 16px;\r\n    font-weight: bold;\r\n    margin-right: 20px;\r\n}\r\n\r\n.description{\r\n    font-size: 14px;\r\n    padding: 20px 0;\r\n    width: 400px;\r\n    color: white;\r\n}\r\n\r\n.genres-and-production-countries p{\r\n    margin-bottom: 10px;\r\n    font-size: 12px;\r\n    color: white;\r\n    width: 400px;\r\n}\r\n\r\n", ""]);

// exports


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Header = __webpack_require__(34);

var _Header2 = _interopRequireDefault(_Header);

var _Content = __webpack_require__(45);

var _Content2 = _interopRequireDefault(_Content);

var _Footer = __webpack_require__(47);

var _Footer2 = _interopRequireDefault(_Footer);

__webpack_require__(50);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App() {
        _classCallCheck(this, App);

        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'wrapper' },
                _react2.default.createElement(_Header2.default, null),
                _react2.default.createElement(_Content2.default, null),
                _react2.default.createElement(_Footer2.default, null)
            );
        }
    }]);

    return App;
}(_react2.default.Component);

exports.default = App;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

var _HeaderSearch = __webpack_require__(35);

var _HeaderSearch2 = _interopRequireDefault(_HeaderSearch);

var _HeaderFilm = __webpack_require__(43);

var _HeaderFilm2 = _interopRequireDefault(_HeaderFilm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = function Header() {
    return _react2.default.createElement(
        'header',
        null,
        _react2.default.createElement(
            _reactRouterDom.Switch,
            null,
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _HeaderSearch2.default }),
            _react2.default.createElement(_reactRouterDom.Route, { path: '/search', component: _HeaderSearch2.default }),
            _react2.default.createElement(_reactRouterDom.Route, { path: '/film/:query', component: _HeaderFilm2.default })
        )
    );
};

exports.default = Header;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _SearchBox = __webpack_require__(36);

var _SearchBox2 = _interopRequireDefault(_SearchBox);

var _ResultSortBox = __webpack_require__(39);

var _ResultSortBox2 = _interopRequireDefault(_ResultSortBox);

var _NoResultBox = __webpack_require__(41);

var _NoResultBox2 = _interopRequireDefault(_NoResultBox);

var _reactRouterDom = __webpack_require__(1);

__webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeaderSearch = function (_React$Component) {
    _inherits(HeaderSearch, _React$Component);

    function HeaderSearch() {
        _classCallCheck(this, HeaderSearch);

        return _possibleConstructorReturn(this, (HeaderSearch.__proto__ || Object.getPrototypeOf(HeaderSearch)).apply(this, arguments));
    }

    _createClass(HeaderSearch, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'header' },
                _react2.default.createElement(
                    'div',
                    { className: 'header-part' },
                    _react2.default.createElement('div', { className: 'fond-image' }),
                    _react2.default.createElement(
                        'h4',
                        null,
                        'netflixroulette'
                    ),
                    _react2.default.createElement(_SearchBox2.default, null)
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'result-panel' },
                    _react2.default.createElement(
                        _reactRouterDom.Switch,
                        null,
                        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _NoResultBox2.default }),
                        _react2.default.createElement(_reactRouterDom.Route, { path: '/search', component: _ResultSortBox2.default })
                    )
                )
            );
        }
    }]);

    return HeaderSearch;
}(_react2.default.Component);

exports.default = HeaderSearch;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

var _reactRedux = __webpack_require__(4);

var _actions = __webpack_require__(5);

__webpack_require__(37);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchBox = function (_React$Component) {
    _inherits(SearchBox, _React$Component);

    function SearchBox(props) {
        _classCallCheck(this, SearchBox);

        var _this = _possibleConstructorReturn(this, (SearchBox.__proto__ || Object.getPrototypeOf(SearchBox)).call(this, props));

        _this.history = props.history;
        _this.state = { value: '',
            selectedOption: 'movie' };

        _this.handleChange = _this.handleChange.bind(_this);
        _this.onSearchSubmit = _this.onSearchSubmit.bind(_this);
        return _this;
    }

    _createClass(SearchBox, [{
        key: 'onSearchSubmit',
        value: function onSearchSubmit(event) {
            event.preventDefault();
            this.history.push('/search/' + this.state.value);
            this.props.onSearchUpdate(this.state.value);
        }
    }, {
        key: 'handleChange',
        value: function handleChange(event) {
            this.setState({ value: event.target.value });
            this.props.changeQuery(event.target.value);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'form',
                { className: 'search-form', onSubmit: this.onSearchSubmit },
                _react2.default.createElement(
                    'h3',
                    { className: 'search-title' },
                    'FIND YOUR MOVIE'
                ),
                _react2.default.createElement('input', { type: 'text', name: 'Search field', placeholder: 'Search:', className: 'search-field', value: this.state.value, onChange: this.handleChange }),
                _react2.default.createElement(
                    'div',
                    { className: 'search-part' },
                    _react2.default.createElement(
                        'div',
                        { className: 'radios-as-buttons' },
                        _react2.default.createElement(
                            'p',
                            { className: 'search-by-title' },
                            'SEARCH BY'
                        ),
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement('input', { type: 'radio', name: 'searchBy', id: 'tv', checked: this.props.selectedOption === 'tv', onChange: this.props.handleOptionChange }),
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'tv' },
                                'TV Show'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement('input', { type: 'radio', name: 'searchBy', id: 'movie', checked: this.props.selectedOption === 'movie', onChange: this.props.handleOptionChange }),
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'movie' },
                                'Movie'
                            )
                        )
                    ),
                    _react2.default.createElement('input', { type: 'button', value: 'SEARCH', className: 'search-button', onClick: this.onSearchSubmit })
                )
            );
        }
    }]);

    return SearchBox;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(store) {
    return {
        selectedOption: store.storeFilms.searchType
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        handleOptionChange: function handleOptionChange(changeEvent) {
            dispatch((0, _actions.selectSearchType)(changeEvent.target.id));
        },
        onSearchUpdate: function onSearchUpdate(query) {
            dispatch((0, _actions.searchFilms)(query));
        },
        changeQuery: function changeQuery(query) {
            dispatch((0, _actions.changeSearchQuery)(query));
        }
    };
};

exports.default = (0, _reactRouterDom.withRouter)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SearchBox));

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var content = __webpack_require__(38);
var insertCss = __webpack_require__(3);

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

module.exports = content.locals || {};
module.exports._getContent = function () {
  return content;
};
module.exports._getCss = function () {
  return content.toString();
};
module.exports._insertCss = function (options) {
  return insertCss(content, options);
};

// Hot Module Replacement
// https://webpack.github.io/docs/hot-module-replacement
// Only activated in browser context
if (false) {
  var removeCss = function removeCss() {};
  module.hot.accept("!!../../../../node_modules/css-loader/index.js!./searchBox.css", function () {
    content = require("!!../../../../node_modules/css-loader/index.js!./searchBox.css");

    if (typeof content === 'string') {
      content = [[module.id, content, '']];
    }

    removeCss = insertCss(content, { replace: true });
  });
  module.hot.dispose(function () {
    removeCss();
  });
}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".search-form{\r\n    padding: 20px 80px;\r\n}\r\n.search-title {\r\n    color: white;\r\n    padding-bottom: 15px;\r\n}\r\n\r\n.search-field {\r\n    width: 100%;\r\n    border: none;\r\n    border-bottom: 2px solid rgb(251, 99, 98);\r\n    background-color: black;\r\n    padding: 10px 0 10px 10px;\r\n    box-sizing: border-box;\r\n    cursor: pointer;\r\n    color: white;\r\n}\r\n\r\n.search-part{\r\n    display: flex;\r\n    flex-direction: row;\r\n    justify-content: space-between;\r\n    padding-top: 20px;\r\n}\r\n\r\n.radios-as-buttons{\r\n    display: flex;\r\n    flex-direction: row;\r\n}\r\n\r\n.radios-as-buttons input{\r\n   position: absolute;\r\n   left: -99999px;\r\n}\r\n\r\n.radios-as-buttons label {\r\n    background-color: rgb(59,68,75);\r\n    padding: 5px 10px;\r\n    margin-left: 10px;\r\n    color: white;\r\n    font-weight: bold;\r\n    font-size: 12px;\r\n    cursor: pointer;\r\n    text-transform: uppercase;\r\n    border-radius: 1px;\r\n}\r\n\r\n.radios-as-buttons input[type=radio]:checked ~ label {\r\n    background-color: rgb(251, 99, 98);\r\n}\r\n\r\n.radios-as-buttons label:hover {\r\n    color: #FFFFFF;\r\n}\r\n\r\n.search-by-title {\r\n    color: white;\r\n    font-weight: bold;\r\n    font-size: 12px;\r\n    padding: 5px 0;\r\n}\r\n\r\n.search-button{\r\n    background-color: rgb(251, 99, 98);\r\n    padding: 5px 40px;\r\n    color: white;\r\n    font-weight: bold;\r\n    font-size: 14px;\r\n    border: none;\r\n    cursor: pointer;\r\n    border-radius: 1px;\r\n}", ""]);

// exports


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(4);

var _actions = __webpack_require__(5);

__webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResultSortBox = function (_React$Component) {
    _inherits(ResultSortBox, _React$Component);

    function ResultSortBox(props) {
        _classCallCheck(this, ResultSortBox);

        var _this = _possibleConstructorReturn(this, (ResultSortBox.__proto__ || Object.getPrototypeOf(ResultSortBox)).call(this, props));

        _this.state = {
            selectedSort: 'releaseDate'
        };
        return _this;
    }

    _createClass(ResultSortBox, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'sort-part' },
                _react2.default.createElement(
                    'p',
                    { className: 'count-movies' },
                    this.props.countFilms ? this.props.countFilms === 1 ? "Only one movie found" : this.props.countFilms + " movies found" : "No movies found"
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'radios-as-text' },
                    _react2.default.createElement(
                        'p',
                        { className: 'sort-by-title' },
                        'Sort by'
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement('input', { type: 'radio', name: 'sortBy', id: 'releaseDate', checked: this.props.selectedSort === 'releaseDate', onChange: this.props.handleSortChange }),
                        _react2.default.createElement(
                            'label',
                            { htmlFor: 'releaseDate' },
                            'release data'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement('input', { type: 'radio', name: 'sortBy', id: 'raiting', checked: this.props.selectedSort === 'raiting', onChange: this.props.handleSortChange }),
                        _react2.default.createElement(
                            'label',
                            { htmlFor: 'raiting' },
                            'raiting'
                        )
                    )
                )
            );
        }
    }]);

    return ResultSortBox;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(store) {
    return {
        countFilms: store.storeFilms.films.length,
        selectedSort: store.storeFilms.sortBy
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        handleSortChange: function handleSortChange(changeEvent) {
            dispatch((0, _actions.sortFilms)(changeEvent.target.id));
        }
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ResultSortBox);

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".sort-part{\r\n    display: flex;\r\n    flex-direction: row;\r\n    justify-content: space-between;\r\n    padding: 10px 80px;\r\n}\r\n.count-movies, .sort-by-title, .sort-director {\r\n    color: rgb(59,68,75);\r\n    font-weight: bold;\r\n    font-size: 14px;\r\n    margin-top: 2px;\r\n}\r\n\r\n.radios-as-text{\r\n    display: flex;\r\n    flex-direction: row;\r\n}\r\n\r\n.radios-as-text input{\r\n    position: absolute;\r\n    left: -99999px;\r\n}\r\n\r\n.radios-as-text label {\r\n    color: rgb(59,68,75);\r\n    margin-left: 10px;\r\n    font-weight: bold;\r\n    font-size: 14px;\r\n    cursor: pointer;\r\n}\r\n\r\n.radios-as-text input[type=radio]:checked ~ label {\r\n    color: rgb(251, 99, 98);\r\n}\r\n", ""]);

// exports


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NoResultBox = function (_React$Component) {
    _inherits(NoResultBox, _React$Component);

    function NoResultBox() {
        _classCallCheck(this, NoResultBox);

        return _possibleConstructorReturn(this, (NoResultBox.__proto__ || Object.getPrototypeOf(NoResultBox)).apply(this, arguments));
    }

    _createClass(NoResultBox, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement('div', { className: 'sort-part' });
        }
    }]);

    return NoResultBox;
}(_react2.default.Component);

exports.default = NoResultBox;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".header{\r\n    flex: 1 0 auto;\r\n}\r\n\r\n.header-part{\r\n   position: relative;\r\n   z-index: 5;\r\n}\r\n\r\n.header-part .fond-image {\r\n    position: absolute;\r\n    z-index: -1;\r\n    top: 0;\r\n    bottom: 0;\r\n    left: 0;\r\n    right: 0;\r\n    background-image: url(\"http://qubemedia.net/wp-content/uploads/2015/04/book-film-holiday.jpg\");\r\n    background-size: cover;\r\n    width: 100%;\r\n    height: 100%;\r\n    box-shadow:0 0 0 128px rgba(0, 0, 0, 0.33) inset;\r\n}\r\n\r\n.header-part h4{\r\n    color: rgb(251, 99, 98);\r\n    text-align: left;\r\n    padding: 20px 0 0 80px;\r\n}\r\n\r\n.result-panel {\r\n    background-color: rgb(230, 230, 230);\r\n    height: 40px;\r\n}\r\n\r\n.search-button-move{\r\n    color: rgb(251, 99, 98);\r\n    padding: 10px 20px;\r\n    background-color: white;\r\n    font-size: 12px;\r\n    border: none;\r\n    cursor: pointer;\r\n    position: absolute;\r\n    right: 80px;\r\n    top: 10px;\r\n    border-radius: 5px;\r\n}", ""]);

// exports


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

var _reactRedux = __webpack_require__(4);

var _MoveDescription = __webpack_require__(10);

var _MoveDescription2 = _interopRequireDefault(_MoveDescription);

var _ResultDirectorBox = __webpack_require__(44);

var _ResultDirectorBox2 = _interopRequireDefault(_ResultDirectorBox);

__webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeaderFilm = function (_React$Component) {
    _inherits(HeaderFilm, _React$Component);

    function HeaderFilm(props) {
        _classCallCheck(this, HeaderFilm);

        return _possibleConstructorReturn(this, (HeaderFilm.__proto__ || Object.getPrototypeOf(HeaderFilm)).call(this, props));
    }

    _createClass(HeaderFilm, [{
        key: 'render',
        value: function render() {
            // const query = this.props.searchQuery;
            return _react2.default.createElement(
                'div',
                { className: 'header' },
                _react2.default.createElement(
                    'div',
                    { className: 'header-part' },
                    _react2.default.createElement('div', { className: 'fond-image' }),
                    _react2.default.createElement(
                        'h4',
                        null,
                        'netflixroulette'
                    ),
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: '/search/' + this.props.searchQuery },
                        _react2.default.createElement('input', { type: 'button', value: 'SEARCH', className: 'search-button-move' })
                    ),
                    _react2.default.createElement(_MoveDescription2.default, null)
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'result-panel' },
                    _react2.default.createElement(_ResultDirectorBox2.default, null)
                )
            );
        }
    }]);

    return HeaderFilm;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(store) {
    return {
        searchQuery: store.storeFilms.searchQuery
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(HeaderFilm);

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResultDirectorBox = function (_React$Component) {
    _inherits(ResultDirectorBox, _React$Component);

    function ResultDirectorBox() {
        _classCallCheck(this, ResultDirectorBox);

        return _possibleConstructorReturn(this, (ResultDirectorBox.__proto__ || Object.getPrototypeOf(ResultDirectorBox)).apply(this, arguments));
    }

    _createClass(ResultDirectorBox, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'sort-part' },
                _react2.default.createElement(
                    'p',
                    { className: 'sort-director' },
                    'Similar films'
                )
            );
        }
    }]);

    return ResultDirectorBox;
}(_react2.default.Component);

exports.default = ResultDirectorBox;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

var _NotFound = __webpack_require__(46);

var _NotFound2 = _interopRequireDefault(_NotFound);

var _ContentFilm = __webpack_require__(8);

var _ContentFilm2 = _interopRequireDefault(_ContentFilm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Content = function Content() {
    return _react2.default.createElement(
        _reactRouterDom.Switch,
        null,
        _react2.default.createElement(_reactRouterDom.Route, { path: '/search/:query', component: _ContentFilm2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/film/:query', component: _ContentFilm2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '*', component: _NotFound2.default })
    );
};

exports.default = Content;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotFound = function (_React$Component) {
    _inherits(NotFound, _React$Component);

    function NotFound() {
        _classCallCheck(this, NotFound);

        return _possibleConstructorReturn(this, (NotFound.__proto__ || Object.getPrototypeOf(NotFound)).apply(this, arguments));
    }

    _createClass(NotFound, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'content' },
                _react2.default.createElement(
                    'p',
                    { className: 'notFoundFilm' },
                    'No films found'
                )
            );
        }
    }]);

    return NotFound;
}(_react2.default.Component);

exports.default = NotFound;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(48);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Footer = function (_React$Component) {
    _inherits(Footer, _React$Component);

    function Footer() {
        _classCallCheck(this, Footer);

        return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments));
    }

    _createClass(Footer, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'footer' },
                _react2.default.createElement(
                    'h4',
                    null,
                    'netflixroulette'
                )
            );
        }
    }]);

    return Footer;
}(_react2.default.Component);

exports.default = Footer;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var content = __webpack_require__(49);
var insertCss = __webpack_require__(3);

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

module.exports = content.locals || {};
module.exports._getContent = function () {
  return content;
};
module.exports._getCss = function () {
  return content.toString();
};
module.exports._insertCss = function (options) {
  return insertCss(content, options);
};

// Hot Module Replacement
// https://webpack.github.io/docs/hot-module-replacement
// Only activated in browser context
if (false) {
  var removeCss = function removeCss() {};
  module.hot.accept("!!../../../../node_modules/css-loader/index.js!./footer.css", function () {
    content = require("!!../../../../node_modules/css-loader/index.js!./footer.css");

    if (typeof content === 'string') {
      content = [[module.id, content, '']];
    }

    removeCss = insertCss(content, { replace: true });
  });
  module.hot.dispose(function () {
    removeCss();
  });
}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".footer {\r\n    flex: 0 0 auto;\r\n    background-color: rgb(59,68,75);\r\n}\r\n\r\n.footer h4 {\r\n    color: rgb(251, 99, 98);\r\n    text-align: left;\r\n    padding: 20px 0 20px 40px;\r\n}", ""]);

// exports


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var content = __webpack_require__(51);
var insertCss = __webpack_require__(3);

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

module.exports = content.locals || {};
module.exports._getContent = function () {
  return content;
};
module.exports._getCss = function () {
  return content.toString();
};
module.exports._insertCss = function (options) {
  return insertCss(content, options);
};

// Hot Module Replacement
// https://webpack.github.io/docs/hot-module-replacement
// Only activated in browser context
if (false) {
  var removeCss = function removeCss() {};
  module.hot.accept("!!../../../node_modules/css-loader/index.js!./app.css", function () {
    content = require("!!../../../node_modules/css-loader/index.js!./app.css");

    if (typeof content === 'string') {
      content = [[module.id, content, '']];
    }

    removeCss = insertCss(content, { replace: true });
  });
  module.hot.dispose(function () {
    removeCss();
  });
}

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "* {\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\nhtml,\r\nbody {\r\n    height: 100%;\r\n}\r\n\r\n#app{\r\n    height: 100%;\r\n}\r\n\r\n.wrapper {\r\n    display: flex;\r\n    flex-direction: column;\r\n    height: 100%;\r\n    width: 850px;\r\n    margin: 0 auto;\r\n    font-family: Arial, sans-serif;\r\n}", ""]);

// exports


/***/ })
/******/ ]);