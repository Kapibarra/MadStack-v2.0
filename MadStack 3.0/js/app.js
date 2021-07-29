(function () {
  "use strict";

  /**
   * SSR Window 3.0.0
   * Better handling for window object in SSR environment
   * https://github.com/nolimits4web/ssr-window
   *
   * Copyright 2020, Vladimir Kharlampidi
   *
   * Licensed under MIT
   *
   * Released on: November 9, 2020
   */
  /* eslint-disable no-param-reassign */
  function isObject(obj) {
    return (
      obj !== null &&
      typeof obj === "object" &&
      "constructor" in obj &&
      obj.constructor === Object
    );
  }
  function extend(target, src) {
    if (target === void 0) {
      target = {};
    }
    if (src === void 0) {
      src = {};
    }
    Object.keys(src).forEach(function (key) {
      if (typeof target[key] === "undefined") target[key] = src[key];
      else if (
        isObject(src[key]) &&
        isObject(target[key]) &&
        Object.keys(src[key]).length > 0
      ) {
        extend(target[key], src[key]);
      }
    });
  }

  var ssrDocument = {
    body: {},
    addEventListener: function () {},
    removeEventListener: function () {},
    activeElement: {
      blur: function () {},
      nodeName: "",
    },
    querySelector: function () {
      return null;
    },
    querySelectorAll: function () {
      return [];
    },
    getElementById: function () {
      return null;
    },
    createEvent: function () {
      return {
        initEvent: function () {},
      };
    },
    createElement: function () {
      return {
        children: [],
        childNodes: [],
        style: {},
        setAttribute: function () {},
        getElementsByTagName: function () {
          return [];
        },
      };
    },
    createElementNS: function () {
      return {};
    },
    importNode: function () {
      return null;
    },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
  };
  function getDocument() {
    var doc = typeof document !== "undefined" ? document : {};
    extend(doc, ssrDocument);
    return doc;
  }

  var ssrWindow = {
    document: ssrDocument,
    navigator: {
      userAgent: "",
    },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
    history: {
      replaceState: function () {},
      pushState: function () {},
      go: function () {},
      back: function () {},
    },
    CustomEvent: function CustomEvent() {
      return this;
    },
    addEventListener: function () {},
    removeEventListener: function () {},
    getComputedStyle: function () {
      return {
        getPropertyValue: function () {
          return "";
        },
      };
    },
    Image: function () {},
    Date: function () {},
    screen: {},
    setTimeout: function () {},
    clearTimeout: function () {},
    matchMedia: function () {
      return {};
    },
    requestAnimationFrame: function (callback) {
      if (typeof setTimeout === "undefined") {
        callback();
        return null;
      }
      return setTimeout(callback, 0);
    },
    cancelAnimationFrame: function (id) {
      if (typeof setTimeout === "undefined") {
        return;
      }
      clearTimeout(id);
    },
  };
  function getWindow() {
    var win = typeof window !== "undefined" ? window : {};
    extend(win, ssrWindow);
    return win;
  }

  /**
   * Dom7 3.0.0
   * Minimalistic JavaScript library for DOM manipulation, with a jQuery-compatible API
   * https://framework7.io/docs/dom7.html
   *
   * Copyright 2020, Vladimir Kharlampidi
   *
   * Licensed under MIT
   *
   * Released on: November 9, 2020
   */

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function _getPrototypeOf(o) {
          return o.__proto__ || Object.getPrototypeOf(o);
        };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf =
      Object.setPrototypeOf ||
      function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError(
          "Super expression must either be null or a function"
        );
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true,
        },
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    }

    return self;
  }

  /* eslint-disable no-proto */
  function makeReactive(obj) {
    var proto = obj.__proto__;
    Object.defineProperty(obj, "__proto__", {
      get: function get() {
        return proto;
      },
      set: function set(value) {
        proto.__proto__ = value;
      },
    });
  }

  var Dom7 = /*#__PURE__*/ (function (_Array) {
    _inheritsLoose(Dom7, _Array);

    function Dom7(items) {
      var _this;

      _this = _Array.call.apply(_Array, [this].concat(items)) || this;
      makeReactive(_assertThisInitialized(_this));
      return _this;
    }

    return Dom7;
  })(/*#__PURE__*/ _wrapNativeSuper(Array));

  function arrayFlat(arr) {
    if (arr === void 0) {
      arr = [];
    }

    var res = [];
    arr.forEach(function (el) {
      if (Array.isArray(el)) {
        res.push.apply(res, arrayFlat(el));
      } else {
        res.push(el);
      }
    });
    return res;
  }
  function arrayFilter(arr, callback) {
    return Array.prototype.filter.call(arr, callback);
  }
  function arrayUnique(arr) {
    var uniqueArray = [];

    for (var i = 0; i < arr.length; i += 1) {
      if (uniqueArray.indexOf(arr[i]) === -1) uniqueArray.push(arr[i]);
    }

    return uniqueArray;
  }

  function qsa(selector, context) {
    if (typeof selector !== "string") {
      return [selector];
    }

    var a = [];
    var res = context.querySelectorAll(selector);

    for (var i = 0; i < res.length; i += 1) {
      a.push(res[i]);
    }

    return a;
  }

  function $(selector, context) {
    var window = getWindow();
    var document = getDocument();
    var arr = [];

    if (!context && selector instanceof Dom7) {
      return selector;
    }

    if (!selector) {
      return new Dom7(arr);
    }

    if (typeof selector === "string") {
      var html = selector.trim();

      if (html.indexOf("<") >= 0 && html.indexOf(">") >= 0) {
        var toCreate = "div";
        if (html.indexOf("<li") === 0) toCreate = "ul";
        if (html.indexOf("<tr") === 0) toCreate = "tbody";
        if (html.indexOf("<td") === 0 || html.indexOf("<th") === 0)
          toCreate = "tr";
        if (html.indexOf("<tbody") === 0) toCreate = "table";
        if (html.indexOf("<option") === 0) toCreate = "select";
        var tempParent = document.createElement(toCreate);
        tempParent.innerHTML = html;

        for (var i = 0; i < tempParent.childNodes.length; i += 1) {
          arr.push(tempParent.childNodes[i]);
        }
      } else {
        arr = qsa(selector.trim(), context || document);
      } // arr = qsa(selector, document);
    } else if (
      selector.nodeType ||
      selector === window ||
      selector === document
    ) {
      arr.push(selector);
    } else if (Array.isArray(selector)) {
      if (selector instanceof Dom7) return selector;
      arr = selector;
    }

    return new Dom7(arrayUnique(arr));
  }

  $.fn = Dom7.prototype;

  function addClass() {
    for (
      var _len = arguments.length, classes = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      classes[_key] = arguments[_key];
    }

    var classNames = arrayFlat(
      classes.map(function (c) {
        return c.split(" ");
      })
    );
    this.forEach(function (el) {
      var _el$classList;

      (_el$classList = el.classList).add.apply(_el$classList, classNames);
    });
    return this;
  }

  function removeClass() {
    for (
      var _len2 = arguments.length, classes = new Array(_len2), _key2 = 0;
      _key2 < _len2;
      _key2++
    ) {
      classes[_key2] = arguments[_key2];
    }

    var classNames = arrayFlat(
      classes.map(function (c) {
        return c.split(" ");
      })
    );
    this.forEach(function (el) {
      var _el$classList2;

      (_el$classList2 = el.classList).remove.apply(_el$classList2, classNames);
    });
    return this;
  }

  function toggleClass() {
    for (
      var _len3 = arguments.length, classes = new Array(_len3), _key3 = 0;
      _key3 < _len3;
      _key3++
    ) {
      classes[_key3] = arguments[_key3];
    }

    var classNames = arrayFlat(
      classes.map(function (c) {
        return c.split(" ");
      })
    );
    this.forEach(function (el) {
      classNames.forEach(function (className) {
        el.classList.toggle(className);
      });
    });
  }

  function hasClass() {
    for (
      var _len4 = arguments.length, classes = new Array(_len4), _key4 = 0;
      _key4 < _len4;
      _key4++
    ) {
      classes[_key4] = arguments[_key4];
    }

    var classNames = arrayFlat(
      classes.map(function (c) {
        return c.split(" ");
      })
    );
    return (
      arrayFilter(this, function (el) {
        return (
          classNames.filter(function (className) {
            return el.classList.contains(className);
          }).length > 0
        );
      }).length > 0
    );
  }

  function attr(attrs, value) {
    if (arguments.length === 1 && typeof attrs === "string") {
      // Get attr
      if (this[0]) return this[0].getAttribute(attrs);
      return undefined;
    } // Set attrs

    for (var i = 0; i < this.length; i += 1) {
      if (arguments.length === 2) {
        // String
        this[i].setAttribute(attrs, value);
      } else {
        // Object
        for (var attrName in attrs) {
          this[i][attrName] = attrs[attrName];
          this[i].setAttribute(attrName, attrs[attrName]);
        }
      }
    }

    return this;
  }

  function removeAttr(attr) {
    for (var i = 0; i < this.length; i += 1) {
      this[i].removeAttribute(attr);
    }

    return this;
  }

  function transform(transform) {
    for (var i = 0; i < this.length; i += 1) {
      this[i].style.transform = transform;
    }

    return this;
  }

  function transition(duration) {
    for (var i = 0; i < this.length; i += 1) {
      this[i].style.transitionDuration =
        typeof duration !== "string" ? duration + "ms" : duration;
    }

    return this;
  }

  function on() {
    for (
      var _len5 = arguments.length, args = new Array(_len5), _key5 = 0;
      _key5 < _len5;
      _key5++
    ) {
      args[_key5] = arguments[_key5];
    }

    var eventType = args[0],
      targetSelector = args[1],
      listener = args[2],
      capture = args[3];

    if (typeof args[1] === "function") {
      eventType = args[0];
      listener = args[1];
      capture = args[2];
      targetSelector = undefined;
    }

    if (!capture) capture = false;

    function handleLiveEvent(e) {
      var target = e.target;
      if (!target) return;
      var eventData = e.target.dom7EventData || [];

      if (eventData.indexOf(e) < 0) {
        eventData.unshift(e);
      }

      if ($(target).is(targetSelector)) listener.apply(target, eventData);
      else {
        var _parents = $(target).parents(); // eslint-disable-line

        for (var k = 0; k < _parents.length; k += 1) {
          if ($(_parents[k]).is(targetSelector))
            listener.apply(_parents[k], eventData);
        }
      }
    }

    function handleEvent(e) {
      var eventData = e && e.target ? e.target.dom7EventData || [] : [];

      if (eventData.indexOf(e) < 0) {
        eventData.unshift(e);
      }

      listener.apply(this, eventData);
    }

    var events = eventType.split(" ");
    var j;

    for (var i = 0; i < this.length; i += 1) {
      var el = this[i];

      if (!targetSelector) {
        for (j = 0; j < events.length; j += 1) {
          var event = events[j];
          if (!el.dom7Listeners) el.dom7Listeners = {};
          if (!el.dom7Listeners[event]) el.dom7Listeners[event] = [];
          el.dom7Listeners[event].push({
            listener: listener,
            proxyListener: handleEvent,
          });
          el.addEventListener(event, handleEvent, capture);
        }
      } else {
        // Live events
        for (j = 0; j < events.length; j += 1) {
          var _event = events[j];
          if (!el.dom7LiveListeners) el.dom7LiveListeners = {};
          if (!el.dom7LiveListeners[_event]) el.dom7LiveListeners[_event] = [];

          el.dom7LiveListeners[_event].push({
            listener: listener,
            proxyListener: handleLiveEvent,
          });

          el.addEventListener(_event, handleLiveEvent, capture);
        }
      }
    }

    return this;
  }

  function off() {
    for (
      var _len6 = arguments.length, args = new Array(_len6), _key6 = 0;
      _key6 < _len6;
      _key6++
    ) {
      args[_key6] = arguments[_key6];
    }

    var eventType = args[0],
      targetSelector = args[1],
      listener = args[2],
      capture = args[3];

    if (typeof args[1] === "function") {
      eventType = args[0];
      listener = args[1];
      capture = args[2];
      targetSelector = undefined;
    }

    if (!capture) capture = false;
    var events = eventType.split(" ");

    for (var i = 0; i < events.length; i += 1) {
      var event = events[i];

      for (var j = 0; j < this.length; j += 1) {
        var el = this[j];
        var handlers = void 0;

        if (!targetSelector && el.dom7Listeners) {
          handlers = el.dom7Listeners[event];
        } else if (targetSelector && el.dom7LiveListeners) {
          handlers = el.dom7LiveListeners[event];
        }

        if (handlers && handlers.length) {
          for (var k = handlers.length - 1; k >= 0; k -= 1) {
            var handler = handlers[k];

            if (listener && handler.listener === listener) {
              el.removeEventListener(event, handler.proxyListener, capture);
              handlers.splice(k, 1);
            } else if (
              listener &&
              handler.listener &&
              handler.listener.dom7proxy &&
              handler.listener.dom7proxy === listener
            ) {
              el.removeEventListener(event, handler.proxyListener, capture);
              handlers.splice(k, 1);
            } else if (!listener) {
              el.removeEventListener(event, handler.proxyListener, capture);
              handlers.splice(k, 1);
            }
          }
        }
      }
    }

    return this;
  }

  function trigger() {
    var window = getWindow();

    for (
      var _len9 = arguments.length, args = new Array(_len9), _key9 = 0;
      _key9 < _len9;
      _key9++
    ) {
      args[_key9] = arguments[_key9];
    }

    var events = args[0].split(" ");
    var eventData = args[1];

    for (var i = 0; i < events.length; i += 1) {
      var event = events[i];

      for (var j = 0; j < this.length; j += 1) {
        var el = this[j];

        if (window.CustomEvent) {
          var evt = new window.CustomEvent(event, {
            detail: eventData,
            bubbles: true,
            cancelable: true,
          });
          el.dom7EventData = args.filter(function (data, dataIndex) {
            return dataIndex > 0;
          });
          el.dispatchEvent(evt);
          el.dom7EventData = [];
          delete el.dom7EventData;
        }
      }
    }

    return this;
  }

  function transitionEnd(callback) {
    var dom = this;

    function fireCallBack(e) {
      if (e.target !== this) return;
      callback.call(this, e);
      dom.off("transitionend", fireCallBack);
    }

    if (callback) {
      dom.on("transitionend", fireCallBack);
    }

    return this;
  }

  function outerWidth(includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        var _styles = this.styles();

        return (
          this[0].offsetWidth +
          parseFloat(_styles.getPropertyValue("margin-right")) +
          parseFloat(_styles.getPropertyValue("margin-left"))
        );
      }

      return this[0].offsetWidth;
    }

    return null;
  }

  function outerHeight(includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        var _styles2 = this.styles();

        return (
          this[0].offsetHeight +
          parseFloat(_styles2.getPropertyValue("margin-top")) +
          parseFloat(_styles2.getPropertyValue("margin-bottom"))
        );
      }

      return this[0].offsetHeight;
    }

    return null;
  }

  function offset() {
    if (this.length > 0) {
      var window = getWindow();
      var document = getDocument();
      var el = this[0];
      var box = el.getBoundingClientRect();
      var body = document.body;
      var clientTop = el.clientTop || body.clientTop || 0;
      var clientLeft = el.clientLeft || body.clientLeft || 0;
      var scrollTop = el === window ? window.scrollY : el.scrollTop;
      var scrollLeft = el === window ? window.scrollX : el.scrollLeft;
      return {
        top: box.top + scrollTop - clientTop,
        left: box.left + scrollLeft - clientLeft,
      };
    }

    return null;
  }

  function styles() {
    var window = getWindow();
    if (this[0]) return window.getComputedStyle(this[0], null);
    return {};
  }

  function css(props, value) {
    var window = getWindow();
    var i;

    if (arguments.length === 1) {
      if (typeof props === "string") {
        // .css('width')
        if (this[0])
          return window.getComputedStyle(this[0], null).getPropertyValue(props);
      } else {
        // .css({ width: '100px' })
        for (i = 0; i < this.length; i += 1) {
          for (var _prop in props) {
            this[i].style[_prop] = props[_prop];
          }
        }

        return this;
      }
    }

    if (arguments.length === 2 && typeof props === "string") {
      // .css('width', '100px')
      for (i = 0; i < this.length; i += 1) {
        this[i].style[props] = value;
      }

      return this;
    }

    return this;
  }

  function each(callback) {
    if (!callback) return this;
    this.forEach(function (el, index) {
      callback.apply(el, [el, index]);
    });
    return this;
  }

  function filter(callback) {
    var result = arrayFilter(this, callback);
    return $(result);
  }

  function html(html) {
    if (typeof html === "undefined") {
      return this[0] ? this[0].innerHTML : null;
    }

    for (var i = 0; i < this.length; i += 1) {
      this[i].innerHTML = html;
    }

    return this;
  }

  function text(text) {
    if (typeof text === "undefined") {
      return this[0] ? this[0].textContent.trim() : null;
    }

    for (var i = 0; i < this.length; i += 1) {
      this[i].textContent = text;
    }

    return this;
  }

  function is(selector) {
    var window = getWindow();
    var document = getDocument();
    var el = this[0];
    var compareWith;
    var i;
    if (!el || typeof selector === "undefined") return false;

    if (typeof selector === "string") {
      if (el.matches) return el.matches(selector);
      if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
      if (el.msMatchesSelector) return el.msMatchesSelector(selector);
      compareWith = $(selector);

      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) return true;
      }

      return false;
    }

    if (selector === document) {
      return el === document;
    }

    if (selector === window) {
      return el === window;
    }

    if (selector.nodeType || selector instanceof Dom7) {
      compareWith = selector.nodeType ? [selector] : selector;

      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) return true;
      }

      return false;
    }

    return false;
  }

  function index() {
    var child = this[0];
    var i;

    if (child) {
      i = 0; // eslint-disable-next-line

      while ((child = child.previousSibling) !== null) {
        if (child.nodeType === 1) i += 1;
      }

      return i;
    }

    return undefined;
  }

  function eq(index) {
    if (typeof index === "undefined") return this;
    var length = this.length;

    if (index > length - 1) {
      return $([]);
    }

    if (index < 0) {
      var returnIndex = length + index;
      if (returnIndex < 0) return $([]);
      return $([this[returnIndex]]);
    }

    return $([this[index]]);
  }

  function append() {
    var newChild;
    var document = getDocument();

    for (var k = 0; k < arguments.length; k += 1) {
      newChild = k < 0 || arguments.length <= k ? undefined : arguments[k];

      for (var i = 0; i < this.length; i += 1) {
        if (typeof newChild === "string") {
          var tempDiv = document.createElement("div");
          tempDiv.innerHTML = newChild;

          while (tempDiv.firstChild) {
            this[i].appendChild(tempDiv.firstChild);
          }
        } else if (newChild instanceof Dom7) {
          for (var j = 0; j < newChild.length; j += 1) {
            this[i].appendChild(newChild[j]);
          }
        } else {
          this[i].appendChild(newChild);
        }
      }
    }

    return this;
  }

  function prepend(newChild) {
    var document = getDocument();
    var i;
    var j;

    for (i = 0; i < this.length; i += 1) {
      if (typeof newChild === "string") {
        var tempDiv = document.createElement("div");
        tempDiv.innerHTML = newChild;

        for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {
          this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
        }
      } else if (newChild instanceof Dom7) {
        for (j = 0; j < newChild.length; j += 1) {
          this[i].insertBefore(newChild[j], this[i].childNodes[0]);
        }
      } else {
        this[i].insertBefore(newChild, this[i].childNodes[0]);
      }
    }

    return this;
  }

  function next(selector) {
    if (this.length > 0) {
      if (selector) {
        if (
          this[0].nextElementSibling &&
          $(this[0].nextElementSibling).is(selector)
        ) {
          return $([this[0].nextElementSibling]);
        }

        return $([]);
      }

      if (this[0].nextElementSibling) return $([this[0].nextElementSibling]);
      return $([]);
    }

    return $([]);
  }

  function nextAll(selector) {
    var nextEls = [];
    var el = this[0];
    if (!el) return $([]);

    while (el.nextElementSibling) {
      var _next = el.nextElementSibling; // eslint-disable-line

      if (selector) {
        if ($(_next).is(selector)) nextEls.push(_next);
      } else nextEls.push(_next);

      el = _next;
    }

    return $(nextEls);
  }

  function prev(selector) {
    if (this.length > 0) {
      var el = this[0];

      if (selector) {
        if (
          el.previousElementSibling &&
          $(el.previousElementSibling).is(selector)
        ) {
          return $([el.previousElementSibling]);
        }

        return $([]);
      }

      if (el.previousElementSibling) return $([el.previousElementSibling]);
      return $([]);
    }

    return $([]);
  }

  function prevAll(selector) {
    var prevEls = [];
    var el = this[0];
    if (!el) return $([]);

    while (el.previousElementSibling) {
      var _prev = el.previousElementSibling; // eslint-disable-line

      if (selector) {
        if ($(_prev).is(selector)) prevEls.push(_prev);
      } else prevEls.push(_prev);

      el = _prev;
    }

    return $(prevEls);
  }

  function parent(selector) {
    var parents = []; // eslint-disable-line

    for (var i = 0; i < this.length; i += 1) {
      if (this[i].parentNode !== null) {
        if (selector) {
          if ($(this[i].parentNode).is(selector))
            parents.push(this[i].parentNode);
        } else {
          parents.push(this[i].parentNode);
        }
      }
    }

    return $(parents);
  }

  function parents(selector) {
    var parents = []; // eslint-disable-line

    for (var i = 0; i < this.length; i += 1) {
      var _parent = this[i].parentNode; // eslint-disable-line

      while (_parent) {
        if (selector) {
          if ($(_parent).is(selector)) parents.push(_parent);
        } else {
          parents.push(_parent);
        }

        _parent = _parent.parentNode;
      }
    }

    return $(parents);
  }

  function closest(selector) {
    var closest = this; // eslint-disable-line

    if (typeof selector === "undefined") {
      return $([]);
    }

    if (!closest.is(selector)) {
      closest = closest.parents(selector).eq(0);
    }

    return closest;
  }

  function find(selector) {
    var foundElements = [];

    for (var i = 0; i < this.length; i += 1) {
      var found = this[i].querySelectorAll(selector);

      for (var j = 0; j < found.length; j += 1) {
        foundElements.push(found[j]);
      }
    }

    return $(foundElements);
  }

  function children(selector) {
    var children = []; // eslint-disable-line

    for (var i = 0; i < this.length; i += 1) {
      var childNodes = this[i].children;

      for (var j = 0; j < childNodes.length; j += 1) {
        if (!selector || $(childNodes[j]).is(selector)) {
          children.push(childNodes[j]);
        }
      }
    }

    return $(children);
  }

  function remove() {
    for (var i = 0; i < this.length; i += 1) {
      if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
    }

    return this;
  }

  var Methods = {
    addClass: addClass,
    removeClass: removeClass,
    hasClass: hasClass,
    toggleClass: toggleClass,
    attr: attr,
    removeAttr: removeAttr,
    transform: transform,
    transition: transition,
    on: on,
    off: off,
    trigger: trigger,
    transitionEnd: transitionEnd,
    outerWidth: outerWidth,
    outerHeight: outerHeight,
    styles: styles,
    offset: offset,
    css: css,
    each: each,
    html: html,
    text: text,
    is: is,
    index: index,
    eq: eq,
    append: append,
    prepend: prepend,
    next: next,
    nextAll: nextAll,
    prev: prev,
    prevAll: prevAll,
    parent: parent,
    parents: parents,
    closest: closest,
    find: find,
    children: children,
    filter: filter,
    remove: remove,
  };
  Object.keys(Methods).forEach(function (methodName) {
    $.fn[methodName] = Methods[methodName];
  });

  function deleteProps(obj) {
    var object = obj;
    Object.keys(object).forEach(function (key) {
      try {
        object[key] = null;
      } catch (e) {
        // no getter for object
      }

      try {
        delete object[key];
      } catch (e) {
        // something got wrong
      }
    });
  }

  function nextTick(callback, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    return setTimeout(callback, delay);
  }

  function now() {
    return Date.now();
  }

  function getTranslate(el, axis) {
    if (axis === void 0) {
      axis = "x";
    }

    var window = getWindow();
    var matrix;
    var curTransform;
    var transformMatrix;
    var curStyle = window.getComputedStyle(el, null);

    if (window.WebKitCSSMatrix) {
      curTransform = curStyle.transform || curStyle.webkitTransform;

      if (curTransform.split(",").length > 6) {
        curTransform = curTransform
          .split(", ")
          .map(function (a) {
            return a.replace(",", ".");
          })
          .join(", ");
      } // Some old versions of Webkit choke when 'none' is passed; pass
      // empty string instead in this case

      transformMatrix = new window.WebKitCSSMatrix(
        curTransform === "none" ? "" : curTransform
      );
    } else {
      transformMatrix =
        curStyle.MozTransform ||
        curStyle.OTransform ||
        curStyle.MsTransform ||
        curStyle.msTransform ||
        curStyle.transform ||
        curStyle
          .getPropertyValue("transform")
          .replace("translate(", "matrix(1, 0, 0, 1,");
      matrix = transformMatrix.toString().split(",");
    }

    if (axis === "x") {
      // Latest Chrome and webkits Fix
      if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41;
      // Crazy IE10 Matrix
      else if (matrix.length === 16) curTransform = parseFloat(matrix[12]);
      // Normal Browsers
      else curTransform = parseFloat(matrix[4]);
    }

    if (axis === "y") {
      // Latest Chrome and webkits Fix
      if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42;
      // Crazy IE10 Matrix
      else if (matrix.length === 16) curTransform = parseFloat(matrix[13]);
      // Normal Browsers
      else curTransform = parseFloat(matrix[5]);
    }

    return curTransform || 0;
  }

  function isObject$1(o) {
    return (
      typeof o === "object" &&
      o !== null &&
      o.constructor &&
      o.constructor === Object
    );
  }

  function extend$1() {
    var to = Object(arguments.length <= 0 ? undefined : arguments[0]);

    for (var i = 1; i < arguments.length; i += 1) {
      var nextSource =
        i < 0 || arguments.length <= i ? undefined : arguments[i];

      if (nextSource !== undefined && nextSource !== null) {
        var keysArray = Object.keys(Object(nextSource));

        for (
          var nextIndex = 0, len = keysArray.length;
          nextIndex < len;
          nextIndex += 1
        ) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);

          if (desc !== undefined && desc.enumerable) {
            if (isObject$1(to[nextKey]) && isObject$1(nextSource[nextKey])) {
              extend$1(to[nextKey], nextSource[nextKey]);
            } else if (
              !isObject$1(to[nextKey]) &&
              isObject$1(nextSource[nextKey])
            ) {
              to[nextKey] = {};
              extend$1(to[nextKey], nextSource[nextKey]);
            } else {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
    }

    return to;
  }

  function bindModuleMethods(instance, obj) {
    Object.keys(obj).forEach(function (key) {
      if (isObject$1(obj[key])) {
        Object.keys(obj[key]).forEach(function (subKey) {
          if (typeof obj[key][subKey] === "function") {
            obj[key][subKey] = obj[key][subKey].bind(instance);
          }
        });
      }

      instance[key] = obj[key];
    });
  }

  var support;

  function calcSupport() {
    var window = getWindow();
    var document = getDocument();
    return {
      touch: !!(
        "ontouchstart" in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch)
      ),
      pointerEvents:
        !!window.PointerEvent &&
        "maxTouchPoints" in window.navigator &&
        window.navigator.maxTouchPoints >= 0,
      observer: (function checkObserver() {
        return (
          "MutationObserver" in window || "WebkitMutationObserver" in window
        );
      })(),
      passiveListener: (function checkPassiveListener() {
        var supportsPassive = false;

        try {
          var opts = Object.defineProperty({}, "passive", {
            // eslint-disable-next-line
            get: function get() {
              supportsPassive = true;
            },
          });
          window.addEventListener("testPassiveListener", null, opts);
        } catch (e) {
          // No support
        }

        return supportsPassive;
      })(),
      gestures: (function checkGestures() {
        return "ongesturestart" in window;
      })(),
    };
  }

  function getSupport() {
    if (!support) {
      support = calcSupport();
    }

    return support;
  }

  var device;

  function calcDevice(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
      userAgent = _ref.userAgent;

    var support = getSupport();
    var window = getWindow();
    var platform = window.navigator.platform;
    var ua = userAgent || window.navigator.userAgent;
    var device = {
      ios: false,
      android: false,
    };
    var screenWidth = window.screen.width;
    var screenHeight = window.screen.height;
    var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line

    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
    var windows = platform === "Win32";
    var macos = platform === "MacIntel"; // iPadOs 13 fix

    var iPadScreens = [
      "1024x1366",
      "1366x1024",
      "834x1194",
      "1194x834",
      "834x1112",
      "1112x834",
      "768x1024",
      "1024x768",
      "820x1180",
      "1180x820",
      "810x1080",
      "1080x810",
    ];

    if (
      !ipad &&
      macos &&
      support.touch &&
      iPadScreens.indexOf(screenWidth + "x" + screenHeight) >= 0
    ) {
      ipad = ua.match(/(Version)\/([\d.]+)/);
      if (!ipad) ipad = [0, 1, "13_0_0"];
      macos = false;
    } // Android

    if (android && !windows) {
      device.os = "android";
      device.android = true;
    }

    if (ipad || iphone || ipod) {
      device.os = "ios";
      device.ios = true;
    } // Export object

    return device;
  }

  function getDevice(overrides) {
    if (overrides === void 0) {
      overrides = {};
    }

    if (!device) {
      device = calcDevice(overrides);
    }

    return device;
  }

  var browser;

  function calcBrowser() {
    var window = getWindow();

    function isSafari() {
      var ua = window.navigator.userAgent.toLowerCase();
      return (
        ua.indexOf("safari") >= 0 &&
        ua.indexOf("chrome") < 0 &&
        ua.indexOf("android") < 0
      );
    }

    return {
      isEdge: !!window.navigator.userAgent.match(/Edge/g),
      isSafari: isSafari(),
      isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
        window.navigator.userAgent
      ),
    };
  }

  function getBrowser() {
    if (!browser) {
      browser = calcBrowser();
    }

    return browser;
  }

  var Resize = {
    name: "resize",
    create: function create() {
      var swiper = this;
      extend$1(swiper, {
        resize: {
          resizeHandler: function resizeHandler() {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            swiper.emit("beforeResize");
            swiper.emit("resize");
          },
          orientationChangeHandler: function orientationChangeHandler() {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            swiper.emit("orientationchange");
          },
        },
      });
    },
    on: {
      init: function init(swiper) {
        var window = getWindow(); // Emit resize

        window.addEventListener("resize", swiper.resize.resizeHandler); // Emit orientationchange

        window.addEventListener(
          "orientationchange",
          swiper.resize.orientationChangeHandler
        );
      },
      destroy: function destroy(swiper) {
        var window = getWindow();
        window.removeEventListener("resize", swiper.resize.resizeHandler);
        window.removeEventListener(
          "orientationchange",
          swiper.resize.orientationChangeHandler
        );
      },
    },
  };

  function _extends() {
    _extends =
      Object.assign ||
      function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
    return _extends.apply(this, arguments);
  }
  var Observer = {
    attach: function attach(target, options) {
      if (options === void 0) {
        options = {};
      }

      var window = getWindow();
      var swiper = this;
      var ObserverFunc =
        window.MutationObserver || window.WebkitMutationObserver;
      var observer = new ObserverFunc(function (mutations) {
        // The observerUpdate event should only be triggered
        // once despite the number of mutations.  Additional
        // triggers are redundant and are very costly
        if (mutations.length === 1) {
          swiper.emit("observerUpdate", mutations[0]);
          return;
        }

        var observerUpdate = function observerUpdate() {
          swiper.emit("observerUpdate", mutations[0]);
        };

        if (window.requestAnimationFrame) {
          window.requestAnimationFrame(observerUpdate);
        } else {
          window.setTimeout(observerUpdate, 0);
        }
      });
      observer.observe(target, {
        attributes:
          typeof options.attributes === "undefined" ? true : options.attributes,
        childList:
          typeof options.childList === "undefined" ? true : options.childList,
        characterData:
          typeof options.characterData === "undefined"
            ? true
            : options.characterData,
      });
      swiper.observer.observers.push(observer);
    },
    init: function init() {
      var swiper = this;
      if (!swiper.support.observer || !swiper.params.observer) return;

      if (swiper.params.observeParents) {
        var containerParents = swiper.$el.parents();

        for (var i = 0; i < containerParents.length; i += 1) {
          swiper.observer.attach(containerParents[i]);
        }
      } // Observe container

      swiper.observer.attach(swiper.$el[0], {
        childList: swiper.params.observeSlideChildren,
      }); // Observe wrapper

      swiper.observer.attach(swiper.$wrapperEl[0], {
        attributes: false,
      });
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.observer.observers.forEach(function (observer) {
        observer.disconnect();
      });
      swiper.observer.observers = [];
    },
  };
  var Observer$1 = {
    name: "observer",
    params: {
      observer: false,
      observeParents: false,
      observeSlideChildren: false,
    },
    create: function create() {
      var swiper = this;
      bindModuleMethods(swiper, {
        observer: _extends({}, Observer, {
          observers: [],
        }),
      });
    },
    on: {
      init: function init(swiper) {
        swiper.observer.init();
      },
      destroy: function destroy(swiper) {
        swiper.observer.destroy();
      },
    },
  };

  var modular = {
    useParams: function useParams(instanceParams) {
      var instance = this;
      if (!instance.modules) return;
      Object.keys(instance.modules).forEach(function (moduleName) {
        var module = instance.modules[moduleName]; // Extend params

        if (module.params) {
          extend$1(instanceParams, module.params);
        }
      });
    },
    useModules: function useModules(modulesParams) {
      if (modulesParams === void 0) {
        modulesParams = {};
      }

      var instance = this;
      if (!instance.modules) return;
      Object.keys(instance.modules).forEach(function (moduleName) {
        var module = instance.modules[moduleName];
        var moduleParams = modulesParams[moduleName] || {}; // Add event listeners

        if (module.on && instance.on) {
          Object.keys(module.on).forEach(function (moduleEventName) {
            instance.on(moduleEventName, module.on[moduleEventName]);
          });
        } // Module create callback

        if (module.create) {
          module.create.bind(instance)(moduleParams);
        }
      });
    },
  };

  /* eslint-disable no-underscore-dangle */
  var eventsEmitter = {
    on: function on(events, handler, priority) {
      var self = this;
      if (typeof handler !== "function") return self;
      var method = priority ? "unshift" : "push";
      events.split(" ").forEach(function (event) {
        if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
        self.eventsListeners[event][method](handler);
      });
      return self;
    },
    once: function once(events, handler, priority) {
      var self = this;
      if (typeof handler !== "function") return self;

      function onceHandler() {
        self.off(events, onceHandler);

        if (onceHandler.__emitterProxy) {
          delete onceHandler.__emitterProxy;
        }

        for (
          var _len = arguments.length, args = new Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          args[_key] = arguments[_key];
        }

        handler.apply(self, args);
      }

      onceHandler.__emitterProxy = handler;
      return self.on(events, onceHandler, priority);
    },
    onAny: function onAny(handler, priority) {
      var self = this;
      if (typeof handler !== "function") return self;
      var method = priority ? "unshift" : "push";

      if (self.eventsAnyListeners.indexOf(handler) < 0) {
        self.eventsAnyListeners[method](handler);
      }

      return self;
    },
    offAny: function offAny(handler) {
      var self = this;
      if (!self.eventsAnyListeners) return self;
      var index = self.eventsAnyListeners.indexOf(handler);

      if (index >= 0) {
        self.eventsAnyListeners.splice(index, 1);
      }

      return self;
    },
    off: function off(events, handler) {
      var self = this;
      if (!self.eventsListeners) return self;
      events.split(" ").forEach(function (event) {
        if (typeof handler === "undefined") {
          self.eventsListeners[event] = [];
        } else if (self.eventsListeners[event]) {
          self.eventsListeners[event].forEach(function (eventHandler, index) {
            if (
              eventHandler === handler ||
              (eventHandler.__emitterProxy &&
                eventHandler.__emitterProxy === handler)
            ) {
              self.eventsListeners[event].splice(index, 1);
            }
          });
        }
      });
      return self;
    },
    emit: function emit() {
      var self = this;
      if (!self.eventsListeners) return self;
      var events;
      var data;
      var context;

      for (
        var _len2 = arguments.length, args = new Array(_len2), _key2 = 0;
        _key2 < _len2;
        _key2++
      ) {
        args[_key2] = arguments[_key2];
      }

      if (typeof args[0] === "string" || Array.isArray(args[0])) {
        events = args[0];
        data = args.slice(1, args.length);
        context = self;
      } else {
        events = args[0].events;
        data = args[0].data;
        context = args[0].context || self;
      }

      data.unshift(context);
      var eventsArray = Array.isArray(events) ? events : events.split(" ");
      eventsArray.forEach(function (event) {
        if (self.eventsAnyListeners && self.eventsAnyListeners.length) {
          self.eventsAnyListeners.forEach(function (eventHandler) {
            eventHandler.apply(context, [event].concat(data));
          });
        }

        if (self.eventsListeners && self.eventsListeners[event]) {
          self.eventsListeners[event].forEach(function (eventHandler) {
            eventHandler.apply(context, data);
          });
        }
      });
      return self;
    },
  };

  function updateSize() {
    var swiper = this;
    var width;
    var height;
    var $el = swiper.$el;

    if (
      typeof swiper.params.width !== "undefined" &&
      swiper.params.width !== null
    ) {
      width = swiper.params.width;
    } else {
      width = $el[0].clientWidth;
    }

    if (
      typeof swiper.params.height !== "undefined" &&
      swiper.params.height !== null
    ) {
      height = swiper.params.height;
    } else {
      height = $el[0].clientHeight;
    }

    if (
      (width === 0 && swiper.isHorizontal()) ||
      (height === 0 && swiper.isVertical())
    ) {
      return;
    } // Subtract paddings

    width =
      width -
      parseInt($el.css("padding-left") || 0, 10) -
      parseInt($el.css("padding-right") || 0, 10);
    height =
      height -
      parseInt($el.css("padding-top") || 0, 10) -
      parseInt($el.css("padding-bottom") || 0, 10);
    if (Number.isNaN(width)) width = 0;
    if (Number.isNaN(height)) height = 0;
    extend$1(swiper, {
      width: width,
      height: height,
      size: swiper.isHorizontal() ? width : height,
    });
  }

  function updateSlides() {
    var swiper = this;
    var window = getWindow();
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl,
      swiperSize = swiper.size,
      rtl = swiper.rtlTranslate,
      wrongRTL = swiper.wrongRTL;
    var isVirtual = swiper.virtual && params.virtual.enabled;
    var previousSlidesLength = isVirtual
      ? swiper.virtual.slides.length
      : swiper.slides.length;
    var slides = $wrapperEl.children("." + swiper.params.slideClass);
    var slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
    var snapGrid = [];
    var slidesGrid = [];
    var slidesSizesGrid = [];

    function slidesForMargin(slideEl, slideIndex) {
      if (!params.cssMode) return true;

      if (slideIndex === slides.length - 1) {
        return false;
      }

      return true;
    }

    var offsetBefore = params.slidesOffsetBefore;

    if (typeof offsetBefore === "function") {
      offsetBefore = params.slidesOffsetBefore.call(swiper);
    }

    var offsetAfter = params.slidesOffsetAfter;

    if (typeof offsetAfter === "function") {
      offsetAfter = params.slidesOffsetAfter.call(swiper);
    }

    var previousSnapGridLength = swiper.snapGrid.length;
    var previousSlidesGridLength = swiper.slidesGrid.length;
    var spaceBetween = params.spaceBetween;
    var slidePosition = -offsetBefore;
    var prevSlideSize = 0;
    var index = 0;

    if (typeof swiperSize === "undefined") {
      return;
    }

    if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) {
      spaceBetween =
        (parseFloat(spaceBetween.replace("%", "")) / 100) * swiperSize;
    }

    swiper.virtualSize = -spaceBetween; // reset margins

    if (rtl)
      slides.css({
        marginLeft: "",
        marginTop: "",
      });
    else
      slides.css({
        marginRight: "",
        marginBottom: "",
      });
    var slidesNumberEvenToRows;

    if (params.slidesPerColumn > 1) {
      if (
        Math.floor(slidesLength / params.slidesPerColumn) ===
        slidesLength / swiper.params.slidesPerColumn
      ) {
        slidesNumberEvenToRows = slidesLength;
      } else {
        slidesNumberEvenToRows =
          Math.ceil(slidesLength / params.slidesPerColumn) *
          params.slidesPerColumn;
      }

      if (
        params.slidesPerView !== "auto" &&
        params.slidesPerColumnFill === "row"
      ) {
        slidesNumberEvenToRows = Math.max(
          slidesNumberEvenToRows,
          params.slidesPerView * params.slidesPerColumn
        );
      }
    } // Calc slides

    var slideSize;
    var slidesPerColumn = params.slidesPerColumn;
    var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
    var numFullColumns = Math.floor(slidesLength / params.slidesPerColumn);

    for (var i = 0; i < slidesLength; i += 1) {
      slideSize = 0;
      var slide = slides.eq(i);

      if (params.slidesPerColumn > 1) {
        // Set slides order
        var newSlideOrderIndex = void 0;
        var column = void 0;
        var row = void 0;

        if (params.slidesPerColumnFill === "row" && params.slidesPerGroup > 1) {
          var groupIndex = Math.floor(
            i / (params.slidesPerGroup * params.slidesPerColumn)
          );
          var slideIndexInGroup =
            i - params.slidesPerColumn * params.slidesPerGroup * groupIndex;
          var columnsInGroup =
            groupIndex === 0
              ? params.slidesPerGroup
              : Math.min(
                  Math.ceil(
                    (slidesLength -
                      groupIndex * slidesPerColumn * params.slidesPerGroup) /
                      slidesPerColumn
                  ),
                  params.slidesPerGroup
                );
          row = Math.floor(slideIndexInGroup / columnsInGroup);
          column =
            slideIndexInGroup -
            row * columnsInGroup +
            groupIndex * params.slidesPerGroup;
          newSlideOrderIndex =
            column + (row * slidesNumberEvenToRows) / slidesPerColumn;
          slide.css({
            "-webkit-box-ordinal-group": newSlideOrderIndex,
            "-moz-box-ordinal-group": newSlideOrderIndex,
            "-ms-flex-order": newSlideOrderIndex,
            "-webkit-order": newSlideOrderIndex,
            order: newSlideOrderIndex,
          });
        } else if (params.slidesPerColumnFill === "column") {
          column = Math.floor(i / slidesPerColumn);
          row = i - column * slidesPerColumn;

          if (
            column > numFullColumns ||
            (column === numFullColumns && row === slidesPerColumn - 1)
          ) {
            row += 1;

            if (row >= slidesPerColumn) {
              row = 0;
              column += 1;
            }
          }
        } else {
          row = Math.floor(i / slidesPerRow);
          column = i - row * slidesPerRow;
        }

        slide.css(
          "margin-" + (swiper.isHorizontal() ? "top" : "left"),
          row !== 0 && params.spaceBetween && params.spaceBetween + "px"
        );
      }

      if (slide.css("display") === "none") continue; // eslint-disable-line

      if (params.slidesPerView === "auto") {
        var slideStyles = window.getComputedStyle(slide[0], null);
        var currentTransform = slide[0].style.transform;
        var currentWebKitTransform = slide[0].style.webkitTransform;

        if (currentTransform) {
          slide[0].style.transform = "none";
        }

        if (currentWebKitTransform) {
          slide[0].style.webkitTransform = "none";
        }

        if (params.roundLengths) {
          slideSize = swiper.isHorizontal()
            ? slide.outerWidth(true)
            : slide.outerHeight(true);
        } else {
          // eslint-disable-next-line
          if (swiper.isHorizontal()) {
            var width = parseFloat(slideStyles.getPropertyValue("width") || 0);
            var paddingLeft = parseFloat(
              slideStyles.getPropertyValue("padding-left") || 0
            );
            var paddingRight = parseFloat(
              slideStyles.getPropertyValue("padding-right") || 0
            );
            var marginLeft = parseFloat(
              slideStyles.getPropertyValue("margin-left") || 0
            );
            var marginRight = parseFloat(
              slideStyles.getPropertyValue("margin-right") || 0
            );
            var boxSizing = slideStyles.getPropertyValue("box-sizing");

            if (boxSizing && boxSizing === "border-box") {
              slideSize = width + marginLeft + marginRight;
            } else {
              var _slide$ = slide[0],
                clientWidth = _slide$.clientWidth,
                offsetWidth = _slide$.offsetWidth;
              slideSize =
                width +
                paddingLeft +
                paddingRight +
                marginLeft +
                marginRight +
                (offsetWidth - clientWidth);
            }
          } else {
            var height = parseFloat(
              slideStyles.getPropertyValue("height") || 0
            );
            var paddingTop = parseFloat(
              slideStyles.getPropertyValue("padding-top") || 0
            );
            var paddingBottom = parseFloat(
              slideStyles.getPropertyValue("padding-bottom") || 0
            );
            var marginTop = parseFloat(
              slideStyles.getPropertyValue("margin-top") || 0
            );
            var marginBottom = parseFloat(
              slideStyles.getPropertyValue("margin-bottom") || 0
            );

            var _boxSizing = slideStyles.getPropertyValue("box-sizing");

            if (_boxSizing && _boxSizing === "border-box") {
              slideSize = height + marginTop + marginBottom;
            } else {
              var _slide$2 = slide[0],
                clientHeight = _slide$2.clientHeight,
                offsetHeight = _slide$2.offsetHeight;
              slideSize =
                height +
                paddingTop +
                paddingBottom +
                marginTop +
                marginBottom +
                (offsetHeight - clientHeight);
            }
          }
        }

        if (currentTransform) {
          slide[0].style.transform = currentTransform;
        }

        if (currentWebKitTransform) {
          slide[0].style.webkitTransform = currentWebKitTransform;
        }

        if (params.roundLengths) slideSize = Math.floor(slideSize);
      } else {
        slideSize =
          (swiperSize - (params.slidesPerView - 1) * spaceBetween) /
          params.slidesPerView;
        if (params.roundLengths) slideSize = Math.floor(slideSize);

        if (slides[i]) {
          if (swiper.isHorizontal()) {
            slides[i].style.width = slideSize + "px";
          } else {
            slides[i].style.height = slideSize + "px";
          }
        }
      }

      if (slides[i]) {
        slides[i].swiperSlideSize = slideSize;
      }

      slidesSizesGrid.push(slideSize);

      if (params.centeredSlides) {
        slidePosition =
          slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
        if (prevSlideSize === 0 && i !== 0)
          slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
        if (i === 0)
          slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
        if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
        if (params.roundLengths) slidePosition = Math.floor(slidePosition);
        if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
        slidesGrid.push(slidePosition);
      } else {
        if (params.roundLengths) slidePosition = Math.floor(slidePosition);
        if (
          (index - Math.min(swiper.params.slidesPerGroupSkip, index)) %
            swiper.params.slidesPerGroup ===
          0
        )
          snapGrid.push(slidePosition);
        slidesGrid.push(slidePosition);
        slidePosition = slidePosition + slideSize + spaceBetween;
      }

      swiper.virtualSize += slideSize + spaceBetween;
      prevSlideSize = slideSize;
      index += 1;
    }

    swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
    var newSlidesGrid;

    if (
      rtl &&
      wrongRTL &&
      (params.effect === "slide" || params.effect === "coverflow")
    ) {
      $wrapperEl.css({
        width: swiper.virtualSize + params.spaceBetween + "px",
      });
    }

    if (params.setWrapperSize) {
      if (swiper.isHorizontal())
        $wrapperEl.css({
          width: swiper.virtualSize + params.spaceBetween + "px",
        });
      else
        $wrapperEl.css({
          height: swiper.virtualSize + params.spaceBetween + "px",
        });
    }

    if (params.slidesPerColumn > 1) {
      swiper.virtualSize =
        (slideSize + params.spaceBetween) * slidesNumberEvenToRows;
      swiper.virtualSize =
        Math.ceil(swiper.virtualSize / params.slidesPerColumn) -
        params.spaceBetween;
      if (swiper.isHorizontal())
        $wrapperEl.css({
          width: swiper.virtualSize + params.spaceBetween + "px",
        });
      else
        $wrapperEl.css({
          height: swiper.virtualSize + params.spaceBetween + "px",
        });

      if (params.centeredSlides) {
        newSlidesGrid = [];

        for (var _i = 0; _i < snapGrid.length; _i += 1) {
          var slidesGridItem = snapGrid[_i];
          if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
          if (snapGrid[_i] < swiper.virtualSize + snapGrid[0])
            newSlidesGrid.push(slidesGridItem);
        }

        snapGrid = newSlidesGrid;
      }
    } // Remove last grid elements depending on width

    if (!params.centeredSlides) {
      newSlidesGrid = [];

      for (var _i2 = 0; _i2 < snapGrid.length; _i2 += 1) {
        var _slidesGridItem = snapGrid[_i2];
        if (params.roundLengths) _slidesGridItem = Math.floor(_slidesGridItem);

        if (snapGrid[_i2] <= swiper.virtualSize - swiperSize) {
          newSlidesGrid.push(_slidesGridItem);
        }
      }

      snapGrid = newSlidesGrid;

      if (
        Math.floor(swiper.virtualSize - swiperSize) -
          Math.floor(snapGrid[snapGrid.length - 1]) >
        1
      ) {
        snapGrid.push(swiper.virtualSize - swiperSize);
      }
    }

    if (snapGrid.length === 0) snapGrid = [0];

    if (params.spaceBetween !== 0) {
      if (swiper.isHorizontal()) {
        if (rtl)
          slides.filter(slidesForMargin).css({
            marginLeft: spaceBetween + "px",
          });
        else
          slides.filter(slidesForMargin).css({
            marginRight: spaceBetween + "px",
          });
      } else
        slides.filter(slidesForMargin).css({
          marginBottom: spaceBetween + "px",
        });
    }

    if (params.centeredSlides && params.centeredSlidesBounds) {
      var allSlidesSize = 0;
      slidesSizesGrid.forEach(function (slideSizeValue) {
        allSlidesSize +=
          slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
      });
      allSlidesSize -= params.spaceBetween;
      var maxSnap = allSlidesSize - swiperSize;
      snapGrid = snapGrid.map(function (snap) {
        if (snap < 0) return -offsetBefore;
        if (snap > maxSnap) return maxSnap + offsetAfter;
        return snap;
      });
    }

    if (params.centerInsufficientSlides) {
      var _allSlidesSize = 0;
      slidesSizesGrid.forEach(function (slideSizeValue) {
        _allSlidesSize +=
          slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
      });
      _allSlidesSize -= params.spaceBetween;

      if (_allSlidesSize < swiperSize) {
        var allSlidesOffset = (swiperSize - _allSlidesSize) / 2;
        snapGrid.forEach(function (snap, snapIndex) {
          snapGrid[snapIndex] = snap - allSlidesOffset;
        });
        slidesGrid.forEach(function (snap, snapIndex) {
          slidesGrid[snapIndex] = snap + allSlidesOffset;
        });
      }
    }

    extend$1(swiper, {
      slides: slides,
      snapGrid: snapGrid,
      slidesGrid: slidesGrid,
      slidesSizesGrid: slidesSizesGrid,
    });

    if (slidesLength !== previousSlidesLength) {
      swiper.emit("slidesLengthChange");
    }

    if (snapGrid.length !== previousSnapGridLength) {
      if (swiper.params.watchOverflow) swiper.checkOverflow();
      swiper.emit("snapGridLengthChange");
    }

    if (slidesGrid.length !== previousSlidesGridLength) {
      swiper.emit("slidesGridLengthChange");
    }

    if (params.watchSlidesProgress || params.watchSlidesVisibility) {
      swiper.updateSlidesOffset();
    }
  }

  function updateAutoHeight(speed) {
    var swiper = this;
    var activeSlides = [];
    var newHeight = 0;
    var i;

    if (typeof speed === "number") {
      swiper.setTransition(speed);
    } else if (speed === true) {
      swiper.setTransition(swiper.params.speed);
    } // Find slides currently in view

    if (
      swiper.params.slidesPerView !== "auto" &&
      swiper.params.slidesPerView > 1
    ) {
      if (swiper.params.centeredSlides) {
        swiper.visibleSlides.each(function (slide) {
          activeSlides.push(slide);
        });
      } else {
        for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
          var index = swiper.activeIndex + i;
          if (index > swiper.slides.length) break;
          activeSlides.push(swiper.slides.eq(index)[0]);
        }
      }
    } else {
      activeSlides.push(swiper.slides.eq(swiper.activeIndex)[0]);
    } // Find new height from highest slide in view

    for (i = 0; i < activeSlides.length; i += 1) {
      if (typeof activeSlides[i] !== "undefined") {
        var height = activeSlides[i].offsetHeight;
        newHeight = height > newHeight ? height : newHeight;
      }
    } // Update Height

    if (newHeight) swiper.$wrapperEl.css("height", newHeight + "px");
  }

  function updateSlidesOffset() {
    var swiper = this;
    var slides = swiper.slides;

    for (var i = 0; i < slides.length; i += 1) {
      slides[i].swiperSlideOffset = swiper.isHorizontal()
        ? slides[i].offsetLeft
        : slides[i].offsetTop;
    }
  }

  function updateSlidesProgress(translate) {
    if (translate === void 0) {
      translate = (this && this.translate) || 0;
    }

    var swiper = this;
    var params = swiper.params;
    var slides = swiper.slides,
      rtl = swiper.rtlTranslate;
    if (slides.length === 0) return;
    if (typeof slides[0].swiperSlideOffset === "undefined")
      swiper.updateSlidesOffset();
    var offsetCenter = -translate;
    if (rtl) offsetCenter = translate; // Visible Slides

    slides.removeClass(params.slideVisibleClass);
    swiper.visibleSlidesIndexes = [];
    swiper.visibleSlides = [];

    for (var i = 0; i < slides.length; i += 1) {
      var slide = slides[i];
      var slideProgress =
        (offsetCenter +
          (params.centeredSlides ? swiper.minTranslate() : 0) -
          slide.swiperSlideOffset) /
        (slide.swiperSlideSize + params.spaceBetween);

      if (
        params.watchSlidesVisibility ||
        (params.centeredSlides && params.autoHeight)
      ) {
        var slideBefore = -(offsetCenter - slide.swiperSlideOffset);
        var slideAfter = slideBefore + swiper.slidesSizesGrid[i];
        var isVisible =
          (slideBefore >= 0 && slideBefore < swiper.size - 1) ||
          (slideAfter > 1 && slideAfter <= swiper.size) ||
          (slideBefore <= 0 && slideAfter >= swiper.size);

        if (isVisible) {
          swiper.visibleSlides.push(slide);
          swiper.visibleSlidesIndexes.push(i);
          slides.eq(i).addClass(params.slideVisibleClass);
        }
      }

      slide.progress = rtl ? -slideProgress : slideProgress;
    }

    swiper.visibleSlides = $(swiper.visibleSlides);
  }

  function updateProgress(translate) {
    var swiper = this;

    if (typeof translate === "undefined") {
      var multiplier = swiper.rtlTranslate ? -1 : 1; // eslint-disable-next-line

      translate =
        (swiper && swiper.translate && swiper.translate * multiplier) || 0;
    }

    var params = swiper.params;
    var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    var progress = swiper.progress,
      isBeginning = swiper.isBeginning,
      isEnd = swiper.isEnd;
    var wasBeginning = isBeginning;
    var wasEnd = isEnd;

    if (translatesDiff === 0) {
      progress = 0;
      isBeginning = true;
      isEnd = true;
    } else {
      progress = (translate - swiper.minTranslate()) / translatesDiff;
      isBeginning = progress <= 0;
      isEnd = progress >= 1;
    }

    extend$1(swiper, {
      progress: progress,
      isBeginning: isBeginning,
      isEnd: isEnd,
    });
    if (
      params.watchSlidesProgress ||
      params.watchSlidesVisibility ||
      (params.centeredSlides && params.autoHeight)
    )
      swiper.updateSlidesProgress(translate);

    if (isBeginning && !wasBeginning) {
      swiper.emit("reachBeginning toEdge");
    }

    if (isEnd && !wasEnd) {
      swiper.emit("reachEnd toEdge");
    }

    if ((wasBeginning && !isBeginning) || (wasEnd && !isEnd)) {
      swiper.emit("fromEdge");
    }

    swiper.emit("progress", progress);
  }

  function updateSlidesClasses() {
    var swiper = this;
    var slides = swiper.slides,
      params = swiper.params,
      $wrapperEl = swiper.$wrapperEl,
      activeIndex = swiper.activeIndex,
      realIndex = swiper.realIndex;
    var isVirtual = swiper.virtual && params.virtual.enabled;
    slides.removeClass(
      params.slideActiveClass +
        " " +
        params.slideNextClass +
        " " +
        params.slidePrevClass +
        " " +
        params.slideDuplicateActiveClass +
        " " +
        params.slideDuplicateNextClass +
        " " +
        params.slideDuplicatePrevClass
    );
    var activeSlide;

    if (isVirtual) {
      activeSlide = swiper.$wrapperEl.find(
        "." +
          params.slideClass +
          '[data-swiper-slide-index="' +
          activeIndex +
          '"]'
      );
    } else {
      activeSlide = slides.eq(activeIndex);
    } // Active classes

    activeSlide.addClass(params.slideActiveClass);

    if (params.loop) {
      // Duplicate to all looped slides
      if (activeSlide.hasClass(params.slideDuplicateClass)) {
        $wrapperEl
          .children(
            "." +
              params.slideClass +
              ":not(." +
              params.slideDuplicateClass +
              ')[data-swiper-slide-index="' +
              realIndex +
              '"]'
          )
          .addClass(params.slideDuplicateActiveClass);
      } else {
        $wrapperEl
          .children(
            "." +
              params.slideClass +
              "." +
              params.slideDuplicateClass +
              '[data-swiper-slide-index="' +
              realIndex +
              '"]'
          )
          .addClass(params.slideDuplicateActiveClass);
      }
    } // Next Slide

    var nextSlide = activeSlide
      .nextAll("." + params.slideClass)
      .eq(0)
      .addClass(params.slideNextClass);

    if (params.loop && nextSlide.length === 0) {
      nextSlide = slides.eq(0);
      nextSlide.addClass(params.slideNextClass);
    } // Prev Slide

    var prevSlide = activeSlide
      .prevAll("." + params.slideClass)
      .eq(0)
      .addClass(params.slidePrevClass);

    if (params.loop && prevSlide.length === 0) {
      prevSlide = slides.eq(-1);
      prevSlide.addClass(params.slidePrevClass);
    }

    if (params.loop) {
      // Duplicate to all looped slides
      if (nextSlide.hasClass(params.slideDuplicateClass)) {
        $wrapperEl
          .children(
            "." +
              params.slideClass +
              ":not(." +
              params.slideDuplicateClass +
              ')[data-swiper-slide-index="' +
              nextSlide.attr("data-swiper-slide-index") +
              '"]'
          )
          .addClass(params.slideDuplicateNextClass);
      } else {
        $wrapperEl
          .children(
            "." +
              params.slideClass +
              "." +
              params.slideDuplicateClass +
              '[data-swiper-slide-index="' +
              nextSlide.attr("data-swiper-slide-index") +
              '"]'
          )
          .addClass(params.slideDuplicateNextClass);
      }

      if (prevSlide.hasClass(params.slideDuplicateClass)) {
        $wrapperEl
          .children(
            "." +
              params.slideClass +
              ":not(." +
              params.slideDuplicateClass +
              ')[data-swiper-slide-index="' +
              prevSlide.attr("data-swiper-slide-index") +
              '"]'
          )
          .addClass(params.slideDuplicatePrevClass);
      } else {
        $wrapperEl
          .children(
            "." +
              params.slideClass +
              "." +
              params.slideDuplicateClass +
              '[data-swiper-slide-index="' +
              prevSlide.attr("data-swiper-slide-index") +
              '"]'
          )
          .addClass(params.slideDuplicatePrevClass);
      }
    }

    swiper.emitSlidesClasses();
  }

  function updateActiveIndex(newActiveIndex) {
    var swiper = this;
    var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
    var slidesGrid = swiper.slidesGrid,
      snapGrid = swiper.snapGrid,
      params = swiper.params,
      previousIndex = swiper.activeIndex,
      previousRealIndex = swiper.realIndex,
      previousSnapIndex = swiper.snapIndex;
    var activeIndex = newActiveIndex;
    var snapIndex;

    if (typeof activeIndex === "undefined") {
      for (var i = 0; i < slidesGrid.length; i += 1) {
        if (typeof slidesGrid[i + 1] !== "undefined") {
          if (
            translate >= slidesGrid[i] &&
            translate <
              slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2
          ) {
            activeIndex = i;
          } else if (
            translate >= slidesGrid[i] &&
            translate < slidesGrid[i + 1]
          ) {
            activeIndex = i + 1;
          }
        } else if (translate >= slidesGrid[i]) {
          activeIndex = i;
        }
      } // Normalize slideIndex

      if (params.normalizeSlideIndex) {
        if (activeIndex < 0 || typeof activeIndex === "undefined")
          activeIndex = 0;
      }
    }

    if (snapGrid.indexOf(translate) >= 0) {
      snapIndex = snapGrid.indexOf(translate);
    } else {
      var skip = Math.min(params.slidesPerGroupSkip, activeIndex);
      snapIndex =
        skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
    }

    if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;

    if (activeIndex === previousIndex) {
      if (snapIndex !== previousSnapIndex) {
        swiper.snapIndex = snapIndex;
        swiper.emit("snapIndexChange");
      }

      return;
    } // Get real index

    var realIndex = parseInt(
      swiper.slides.eq(activeIndex).attr("data-swiper-slide-index") ||
        activeIndex,
      10
    );
    extend$1(swiper, {
      snapIndex: snapIndex,
      realIndex: realIndex,
      previousIndex: previousIndex,
      activeIndex: activeIndex,
    });
    swiper.emit("activeIndexChange");
    swiper.emit("snapIndexChange");

    if (previousRealIndex !== realIndex) {
      swiper.emit("realIndexChange");
    }

    if (swiper.initialized || swiper.params.runCallbacksOnInit) {
      swiper.emit("slideChange");
    }
  }

  function updateClickedSlide(e) {
    var swiper = this;
    var params = swiper.params;
    var slide = $(e.target).closest("." + params.slideClass)[0];
    var slideFound = false;

    if (slide) {
      for (var i = 0; i < swiper.slides.length; i += 1) {
        if (swiper.slides[i] === slide) slideFound = true;
      }
    }

    if (slide && slideFound) {
      swiper.clickedSlide = slide;

      if (swiper.virtual && swiper.params.virtual.enabled) {
        swiper.clickedIndex = parseInt(
          $(slide).attr("data-swiper-slide-index"),
          10
        );
      } else {
        swiper.clickedIndex = $(slide).index();
      }
    } else {
      swiper.clickedSlide = undefined;
      swiper.clickedIndex = undefined;
      return;
    }

    if (
      params.slideToClickedSlide &&
      swiper.clickedIndex !== undefined &&
      swiper.clickedIndex !== swiper.activeIndex
    ) {
      swiper.slideToClickedSlide();
    }
  }

  var update = {
    updateSize: updateSize,
    updateSlides: updateSlides,
    updateAutoHeight: updateAutoHeight,
    updateSlidesOffset: updateSlidesOffset,
    updateSlidesProgress: updateSlidesProgress,
    updateProgress: updateProgress,
    updateSlidesClasses: updateSlidesClasses,
    updateActiveIndex: updateActiveIndex,
    updateClickedSlide: updateClickedSlide,
  };

  function getSwiperTranslate(axis) {
    if (axis === void 0) {
      axis = this.isHorizontal() ? "x" : "y";
    }

    var swiper = this;
    var params = swiper.params,
      rtl = swiper.rtlTranslate,
      translate = swiper.translate,
      $wrapperEl = swiper.$wrapperEl;

    if (params.virtualTranslate) {
      return rtl ? -translate : translate;
    }

    if (params.cssMode) {
      return translate;
    }

    var currentTranslate = getTranslate($wrapperEl[0], axis);
    if (rtl) currentTranslate = -currentTranslate;
    return currentTranslate || 0;
  }

  function setTranslate(translate, byController) {
    var swiper = this;
    var rtl = swiper.rtlTranslate,
      params = swiper.params,
      $wrapperEl = swiper.$wrapperEl,
      wrapperEl = swiper.wrapperEl,
      progress = swiper.progress;
    var x = 0;
    var y = 0;
    var z = 0;

    if (swiper.isHorizontal()) {
      x = rtl ? -translate : translate;
    } else {
      y = translate;
    }

    if (params.roundLengths) {
      x = Math.floor(x);
      y = Math.floor(y);
    }

    if (params.cssMode) {
      wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] =
        swiper.isHorizontal() ? -x : -y;
    } else if (!params.virtualTranslate) {
      $wrapperEl.transform(
        "translate3d(" + x + "px, " + y + "px, " + z + "px)"
      );
    }

    swiper.previousTranslate = swiper.translate;
    swiper.translate = swiper.isHorizontal() ? x : y; // Check if we need to update progress

    var newProgress;
    var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();

    if (translatesDiff === 0) {
      newProgress = 0;
    } else {
      newProgress = (translate - swiper.minTranslate()) / translatesDiff;
    }

    if (newProgress !== progress) {
      swiper.updateProgress(translate);
    }

    swiper.emit("setTranslate", swiper.translate, byController);
  }

  function minTranslate() {
    return -this.snapGrid[0];
  }

  function maxTranslate() {
    return -this.snapGrid[this.snapGrid.length - 1];
  }

  function translateTo(
    translate,
    speed,
    runCallbacks,
    translateBounds,
    internal
  ) {
    if (translate === void 0) {
      translate = 0;
    }

    if (speed === void 0) {
      speed = this.params.speed;
    }

    if (runCallbacks === void 0) {
      runCallbacks = true;
    }

    if (translateBounds === void 0) {
      translateBounds = true;
    }

    var swiper = this;
    var params = swiper.params,
      wrapperEl = swiper.wrapperEl;

    if (swiper.animating && params.preventInteractionOnTransition) {
      return false;
    }

    var minTranslate = swiper.minTranslate();
    var maxTranslate = swiper.maxTranslate();
    var newTranslate;
    if (translateBounds && translate > minTranslate)
      newTranslate = minTranslate;
    else if (translateBounds && translate < maxTranslate)
      newTranslate = maxTranslate;
    else newTranslate = translate; // Update progress

    swiper.updateProgress(newTranslate);

    if (params.cssMode) {
      var isH = swiper.isHorizontal();

      if (speed === 0) {
        wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate;
      } else {
        // eslint-disable-next-line
        if (wrapperEl.scrollTo) {
          var _wrapperEl$scrollTo;

          wrapperEl.scrollTo(
            ((_wrapperEl$scrollTo = {}),
            (_wrapperEl$scrollTo[isH ? "left" : "top"] = -newTranslate),
            (_wrapperEl$scrollTo.behavior = "smooth"),
            _wrapperEl$scrollTo)
          );
        } else {
          wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate;
        }
      }

      return true;
    }

    if (speed === 0) {
      swiper.setTransition(0);
      swiper.setTranslate(newTranslate);

      if (runCallbacks) {
        swiper.emit("beforeTransitionStart", speed, internal);
        swiper.emit("transitionEnd");
      }
    } else {
      swiper.setTransition(speed);
      swiper.setTranslate(newTranslate);

      if (runCallbacks) {
        swiper.emit("beforeTransitionStart", speed, internal);
        swiper.emit("transitionStart");
      }

      if (!swiper.animating) {
        swiper.animating = true;

        if (!swiper.onTranslateToWrapperTransitionEnd) {
          swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
            if (!swiper || swiper.destroyed) return;
            if (e.target !== this) return;
            swiper.$wrapperEl[0].removeEventListener(
              "transitionend",
              swiper.onTranslateToWrapperTransitionEnd
            );
            swiper.$wrapperEl[0].removeEventListener(
              "webkitTransitionEnd",
              swiper.onTranslateToWrapperTransitionEnd
            );
            swiper.onTranslateToWrapperTransitionEnd = null;
            delete swiper.onTranslateToWrapperTransitionEnd;

            if (runCallbacks) {
              swiper.emit("transitionEnd");
            }
          };
        }

        swiper.$wrapperEl[0].addEventListener(
          "transitionend",
          swiper.onTranslateToWrapperTransitionEnd
        );
        swiper.$wrapperEl[0].addEventListener(
          "webkitTransitionEnd",
          swiper.onTranslateToWrapperTransitionEnd
        );
      }
    }

    return true;
  }

  var translate = {
    getTranslate: getSwiperTranslate,
    setTranslate: setTranslate,
    minTranslate: minTranslate,
    maxTranslate: maxTranslate,
    translateTo: translateTo,
  };

  function setTransition(duration, byController) {
    var swiper = this;

    if (!swiper.params.cssMode) {
      swiper.$wrapperEl.transition(duration);
    }

    swiper.emit("setTransition", duration, byController);
  }

  function transitionStart(runCallbacks, direction) {
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }

    var swiper = this;
    var activeIndex = swiper.activeIndex,
      params = swiper.params,
      previousIndex = swiper.previousIndex;
    if (params.cssMode) return;

    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }

    var dir = direction;

    if (!dir) {
      if (activeIndex > previousIndex) dir = "next";
      else if (activeIndex < previousIndex) dir = "prev";
      else dir = "reset";
    }

    swiper.emit("transitionStart");

    if (runCallbacks && activeIndex !== previousIndex) {
      if (dir === "reset") {
        swiper.emit("slideResetTransitionStart");
        return;
      }

      swiper.emit("slideChangeTransitionStart");

      if (dir === "next") {
        swiper.emit("slideNextTransitionStart");
      } else {
        swiper.emit("slidePrevTransitionStart");
      }
    }
  }

  function transitionEnd$1(runCallbacks, direction) {
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }

    var swiper = this;
    var activeIndex = swiper.activeIndex,
      previousIndex = swiper.previousIndex,
      params = swiper.params;
    swiper.animating = false;
    if (params.cssMode) return;
    swiper.setTransition(0);
    var dir = direction;

    if (!dir) {
      if (activeIndex > previousIndex) dir = "next";
      else if (activeIndex < previousIndex) dir = "prev";
      else dir = "reset";
    }

    swiper.emit("transitionEnd");

    if (runCallbacks && activeIndex !== previousIndex) {
      if (dir === "reset") {
        swiper.emit("slideResetTransitionEnd");
        return;
      }

      swiper.emit("slideChangeTransitionEnd");

      if (dir === "next") {
        swiper.emit("slideNextTransitionEnd");
      } else {
        swiper.emit("slidePrevTransitionEnd");
      }
    }
  }

  var transition$1 = {
    setTransition: setTransition,
    transitionStart: transitionStart,
    transitionEnd: transitionEnd$1,
  };

  function slideTo(index, speed, runCallbacks, internal) {
    if (index === void 0) {
      index = 0;
    }

    if (speed === void 0) {
      speed = this.params.speed;
    }

    if (runCallbacks === void 0) {
      runCallbacks = true;
    }

    if (typeof index !== "number" && typeof index !== "string") {
      throw new Error(
        "The 'index' argument cannot have type other than 'number' or 'string'. [" +
          typeof index +
          "] given."
      );
    }

    if (typeof index === "string") {
      /**
       * The `index` argument converted from `string` to `number`.
       * @type {number}
       */
      var indexAsNumber = parseInt(index, 10);
      /**
       * Determines whether the `index` argument is a valid `number`
       * after being converted from the `string` type.
       * @type {boolean}
       */

      var isValidNumber = isFinite(indexAsNumber);

      if (!isValidNumber) {
        throw new Error(
          "The passed-in 'index' (string) couldn't be converted to 'number'. [" +
            index +
            "] given."
        );
      } // Knowing that the converted `index` is a valid number,
      // we can update the original argument's value.

      index = indexAsNumber;
    }

    var swiper = this;
    var slideIndex = index;
    if (slideIndex < 0) slideIndex = 0;
    var params = swiper.params,
      snapGrid = swiper.snapGrid,
      slidesGrid = swiper.slidesGrid,
      previousIndex = swiper.previousIndex,
      activeIndex = swiper.activeIndex,
      rtl = swiper.rtlTranslate,
      wrapperEl = swiper.wrapperEl;

    if (swiper.animating && params.preventInteractionOnTransition) {
      return false;
    }

    var skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
    var snapIndex =
      skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
    if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;

    if (
      (activeIndex || params.initialSlide || 0) === (previousIndex || 0) &&
      runCallbacks
    ) {
      swiper.emit("beforeSlideChangeStart");
    }

    var translate = -snapGrid[snapIndex]; // Update progress

    swiper.updateProgress(translate); // Normalize slideIndex

    if (params.normalizeSlideIndex) {
      for (var i = 0; i < slidesGrid.length; i += 1) {
        var normalizedTranslate = -Math.floor(translate * 100);
        var normalizedGird = Math.floor(slidesGrid[i] * 100);
        var normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);

        if (typeof slidesGrid[i + 1] !== "undefined") {
          if (
            normalizedTranslate >= normalizedGird &&
            normalizedTranslate <
              normalizedGridNext - (normalizedGridNext - normalizedGird) / 2
          ) {
            slideIndex = i;
          } else if (
            normalizedTranslate >= normalizedGird &&
            normalizedTranslate < normalizedGridNext
          ) {
            slideIndex = i + 1;
          }
        } else if (normalizedTranslate >= normalizedGird) {
          slideIndex = i;
        }
      }
    } // Directions locks

    if (swiper.initialized && slideIndex !== activeIndex) {
      if (
        !swiper.allowSlideNext &&
        translate < swiper.translate &&
        translate < swiper.minTranslate()
      ) {
        return false;
      }

      if (
        !swiper.allowSlidePrev &&
        translate > swiper.translate &&
        translate > swiper.maxTranslate()
      ) {
        if ((activeIndex || 0) !== slideIndex) return false;
      }
    }

    var direction;
    if (slideIndex > activeIndex) direction = "next";
    else if (slideIndex < activeIndex) direction = "prev";
    else direction = "reset"; // Update Index

    if (
      (rtl && -translate === swiper.translate) ||
      (!rtl && translate === swiper.translate)
    ) {
      swiper.updateActiveIndex(slideIndex); // Update Height

      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }

      swiper.updateSlidesClasses();

      if (params.effect !== "slide") {
        swiper.setTranslate(translate);
      }

      if (direction !== "reset") {
        swiper.transitionStart(runCallbacks, direction);
        swiper.transitionEnd(runCallbacks, direction);
      }

      return false;
    }

    if (params.cssMode) {
      var isH = swiper.isHorizontal();
      var t = -translate;

      if (rtl) {
        t = wrapperEl.scrollWidth - wrapperEl.offsetWidth - t;
      }

      if (speed === 0) {
        wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
      } else {
        // eslint-disable-next-line
        if (wrapperEl.scrollTo) {
          var _wrapperEl$scrollTo;

          wrapperEl.scrollTo(
            ((_wrapperEl$scrollTo = {}),
            (_wrapperEl$scrollTo[isH ? "left" : "top"] = t),
            (_wrapperEl$scrollTo.behavior = "smooth"),
            _wrapperEl$scrollTo)
          );
        } else {
          wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
        }
      }

      return true;
    }

    if (speed === 0) {
      swiper.setTransition(0);
      swiper.setTranslate(translate);
      swiper.updateActiveIndex(slideIndex);
      swiper.updateSlidesClasses();
      swiper.emit("beforeTransitionStart", speed, internal);
      swiper.transitionStart(runCallbacks, direction);
      swiper.transitionEnd(runCallbacks, direction);
    } else {
      swiper.setTransition(speed);
      swiper.setTranslate(translate);
      swiper.updateActiveIndex(slideIndex);
      swiper.updateSlidesClasses();
      swiper.emit("beforeTransitionStart", speed, internal);
      swiper.transitionStart(runCallbacks, direction);

      if (!swiper.animating) {
        swiper.animating = true;

        if (!swiper.onSlideToWrapperTransitionEnd) {
          swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
            if (!swiper || swiper.destroyed) return;
            if (e.target !== this) return;
            swiper.$wrapperEl[0].removeEventListener(
              "transitionend",
              swiper.onSlideToWrapperTransitionEnd
            );
            swiper.$wrapperEl[0].removeEventListener(
              "webkitTransitionEnd",
              swiper.onSlideToWrapperTransitionEnd
            );
            swiper.onSlideToWrapperTransitionEnd = null;
            delete swiper.onSlideToWrapperTransitionEnd;
            swiper.transitionEnd(runCallbacks, direction);
          };
        }

        swiper.$wrapperEl[0].addEventListener(
          "transitionend",
          swiper.onSlideToWrapperTransitionEnd
        );
        swiper.$wrapperEl[0].addEventListener(
          "webkitTransitionEnd",
          swiper.onSlideToWrapperTransitionEnd
        );
      }
    }

    return true;
  }

  function slideToLoop(index, speed, runCallbacks, internal) {
    if (index === void 0) {
      index = 0;
    }

    if (speed === void 0) {
      speed = this.params.speed;
    }

    if (runCallbacks === void 0) {
      runCallbacks = true;
    }

    var swiper = this;
    var newIndex = index;

    if (swiper.params.loop) {
      newIndex += swiper.loopedSlides;
    }

    return swiper.slideTo(newIndex, speed, runCallbacks, internal);
  }

  /* eslint no-unused-vars: "off" */
  function slideNext(speed, runCallbacks, internal) {
    if (speed === void 0) {
      speed = this.params.speed;
    }

    if (runCallbacks === void 0) {
      runCallbacks = true;
    }

    var swiper = this;
    var params = swiper.params,
      animating = swiper.animating;
    var increment =
      swiper.activeIndex < params.slidesPerGroupSkip
        ? 1
        : params.slidesPerGroup;

    if (params.loop) {
      if (animating && params.loopPreventsSlide) return false;
      swiper.loopFix(); // eslint-disable-next-line

      swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
    }

    return swiper.slideTo(
      swiper.activeIndex + increment,
      speed,
      runCallbacks,
      internal
    );
  }

  /* eslint no-unused-vars: "off" */
  function slidePrev(speed, runCallbacks, internal) {
    if (speed === void 0) {
      speed = this.params.speed;
    }

    if (runCallbacks === void 0) {
      runCallbacks = true;
    }

    var swiper = this;
    var params = swiper.params,
      animating = swiper.animating,
      snapGrid = swiper.snapGrid,
      slidesGrid = swiper.slidesGrid,
      rtlTranslate = swiper.rtlTranslate;

    if (params.loop) {
      if (animating && params.loopPreventsSlide) return false;
      swiper.loopFix(); // eslint-disable-next-line

      swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
    }

    var translate = rtlTranslate ? swiper.translate : -swiper.translate;

    function normalize(val) {
      if (val < 0) return -Math.floor(Math.abs(val));
      return Math.floor(val);
    }

    var normalizedTranslate = normalize(translate);
    var normalizedSnapGrid = snapGrid.map(function (val) {
      return normalize(val);
    });
    var currentSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate)];
    var prevSnap =
      snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];

    if (typeof prevSnap === "undefined" && params.cssMode) {
      snapGrid.forEach(function (snap) {
        if (!prevSnap && normalizedTranslate >= snap) prevSnap = snap;
      });
    }

    var prevIndex;

    if (typeof prevSnap !== "undefined") {
      prevIndex = slidesGrid.indexOf(prevSnap);
      if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
    }

    return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
  }

  /* eslint no-unused-vars: "off" */
  function slideReset(speed, runCallbacks, internal) {
    if (speed === void 0) {
      speed = this.params.speed;
    }

    if (runCallbacks === void 0) {
      runCallbacks = true;
    }

    var swiper = this;
    return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
  }

  /* eslint no-unused-vars: "off" */
  function slideToClosest(speed, runCallbacks, internal, threshold) {
    if (speed === void 0) {
      speed = this.params.speed;
    }

    if (runCallbacks === void 0) {
      runCallbacks = true;
    }

    if (threshold === void 0) {
      threshold = 0.5;
    }

    var swiper = this;
    var index = swiper.activeIndex;
    var skip = Math.min(swiper.params.slidesPerGroupSkip, index);
    var snapIndex =
      skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
    var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;

    if (translate >= swiper.snapGrid[snapIndex]) {
      // The current translate is on or after the current snap index, so the choice
      // is between the current index and the one after it.
      var currentSnap = swiper.snapGrid[snapIndex];
      var nextSnap = swiper.snapGrid[snapIndex + 1];

      if (translate - currentSnap > (nextSnap - currentSnap) * threshold) {
        index += swiper.params.slidesPerGroup;
      }
    } else {
      // The current translate is before the current snap index, so the choice
      // is between the current index and the one before it.
      var prevSnap = swiper.snapGrid[snapIndex - 1];
      var _currentSnap = swiper.snapGrid[snapIndex];

      if (translate - prevSnap <= (_currentSnap - prevSnap) * threshold) {
        index -= swiper.params.slidesPerGroup;
      }
    }

    index = Math.max(index, 0);
    index = Math.min(index, swiper.slidesGrid.length - 1);
    return swiper.slideTo(index, speed, runCallbacks, internal);
  }

  function slideToClickedSlide() {
    var swiper = this;
    var params = swiper.params,
      $wrapperEl = swiper.$wrapperEl;
    var slidesPerView =
      params.slidesPerView === "auto"
        ? swiper.slidesPerViewDynamic()
        : params.slidesPerView;
    var slideToIndex = swiper.clickedIndex;
    var realIndex;

    if (params.loop) {
      if (swiper.animating) return;
      realIndex = parseInt(
        $(swiper.clickedSlide).attr("data-swiper-slide-index"),
        10
      );

      if (params.centeredSlides) {
        if (
          slideToIndex < swiper.loopedSlides - slidesPerView / 2 ||
          slideToIndex >
            swiper.slides.length - swiper.loopedSlides + slidesPerView / 2
        ) {
          swiper.loopFix();
          slideToIndex = $wrapperEl
            .children(
              "." +
                params.slideClass +
                '[data-swiper-slide-index="' +
                realIndex +
                '"]:not(.' +
                params.slideDuplicateClass +
                ")"
            )
            .eq(0)
            .index();
          nextTick(function () {
            swiper.slideTo(slideToIndex);
          });
        } else {
          swiper.slideTo(slideToIndex);
        }
      } else if (slideToIndex > swiper.slides.length - slidesPerView) {
        swiper.loopFix();
        slideToIndex = $wrapperEl
          .children(
            "." +
              params.slideClass +
              '[data-swiper-slide-index="' +
              realIndex +
              '"]:not(.' +
              params.slideDuplicateClass +
              ")"
          )
          .eq(0)
          .index();
        nextTick(function () {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else {
      swiper.slideTo(slideToIndex);
    }
  }

  var slide = {
    slideTo: slideTo,
    slideToLoop: slideToLoop,
    slideNext: slideNext,
    slidePrev: slidePrev,
    slideReset: slideReset,
    slideToClosest: slideToClosest,
    slideToClickedSlide: slideToClickedSlide,
  };

  function loopCreate() {
    var swiper = this;
    var document = getDocument();
    var params = swiper.params,
      $wrapperEl = swiper.$wrapperEl; // Remove duplicated slides

    $wrapperEl
      .children("." + params.slideClass + "." + params.slideDuplicateClass)
      .remove();
    var slides = $wrapperEl.children("." + params.slideClass);

    if (params.loopFillGroupWithBlank) {
      var blankSlidesNum =
        params.slidesPerGroup - (slides.length % params.slidesPerGroup);

      if (blankSlidesNum !== params.slidesPerGroup) {
        for (var i = 0; i < blankSlidesNum; i += 1) {
          var blankNode = $(document.createElement("div")).addClass(
            params.slideClass + " " + params.slideBlankClass
          );
          $wrapperEl.append(blankNode);
        }

        slides = $wrapperEl.children("." + params.slideClass);
      }
    }

    if (params.slidesPerView === "auto" && !params.loopedSlides)
      params.loopedSlides = slides.length;
    swiper.loopedSlides = Math.ceil(
      parseFloat(params.loopedSlides || params.slidesPerView, 10)
    );
    swiper.loopedSlides += params.loopAdditionalSlides;

    if (swiper.loopedSlides > slides.length) {
      swiper.loopedSlides = slides.length;
    }

    var prependSlides = [];
    var appendSlides = [];
    slides.each(function (el, index) {
      var slide = $(el);

      if (index < swiper.loopedSlides) {
        appendSlides.push(el);
      }

      if (
        index < slides.length &&
        index >= slides.length - swiper.loopedSlides
      ) {
        prependSlides.push(el);
      }

      slide.attr("data-swiper-slide-index", index);
    });

    for (var _i = 0; _i < appendSlides.length; _i += 1) {
      $wrapperEl.append(
        $(appendSlides[_i].cloneNode(true)).addClass(params.slideDuplicateClass)
      );
    }

    for (var _i2 = prependSlides.length - 1; _i2 >= 0; _i2 -= 1) {
      $wrapperEl.prepend(
        $(prependSlides[_i2].cloneNode(true)).addClass(
          params.slideDuplicateClass
        )
      );
    }
  }

  function loopFix() {
    var swiper = this;
    swiper.emit("beforeLoopFix");
    var activeIndex = swiper.activeIndex,
      slides = swiper.slides,
      loopedSlides = swiper.loopedSlides,
      allowSlidePrev = swiper.allowSlidePrev,
      allowSlideNext = swiper.allowSlideNext,
      snapGrid = swiper.snapGrid,
      rtl = swiper.rtlTranslate;
    var newIndex;
    swiper.allowSlidePrev = true;
    swiper.allowSlideNext = true;
    var snapTranslate = -snapGrid[activeIndex];
    var diff = snapTranslate - swiper.getTranslate(); // Fix For Negative Oversliding

    if (activeIndex < loopedSlides) {
      newIndex = slides.length - loopedSlides * 3 + activeIndex;
      newIndex += loopedSlides;
      var slideChanged = swiper.slideTo(newIndex, 0, false, true);

      if (slideChanged && diff !== 0) {
        swiper.setTranslate(
          (rtl ? -swiper.translate : swiper.translate) - diff
        );
      }
    } else if (activeIndex >= slides.length - loopedSlides) {
      // Fix For Positive Oversliding
      newIndex = -slides.length + activeIndex + loopedSlides;
      newIndex += loopedSlides;

      var _slideChanged = swiper.slideTo(newIndex, 0, false, true);

      if (_slideChanged && diff !== 0) {
        swiper.setTranslate(
          (rtl ? -swiper.translate : swiper.translate) - diff
        );
      }
    }

    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;
    swiper.emit("loopFix");
  }

  function loopDestroy() {
    var swiper = this;
    var $wrapperEl = swiper.$wrapperEl,
      params = swiper.params,
      slides = swiper.slides;
    $wrapperEl
      .children(
        "." +
          params.slideClass +
          "." +
          params.slideDuplicateClass +
          ",." +
          params.slideClass +
          "." +
          params.slideBlankClass
      )
      .remove();
    slides.removeAttr("data-swiper-slide-index");
  }

  var loop = {
    loopCreate: loopCreate,
    loopFix: loopFix,
    loopDestroy: loopDestroy,
  };

  function setGrabCursor(moving) {
    var swiper = this;
    if (
      swiper.support.touch ||
      !swiper.params.simulateTouch ||
      (swiper.params.watchOverflow && swiper.isLocked) ||
      swiper.params.cssMode
    )
      return;
    var el = swiper.el;
    el.style.cursor = "move";
    el.style.cursor = moving ? "-webkit-grabbing" : "-webkit-grab";
    el.style.cursor = moving ? "-moz-grabbin" : "-moz-grab";
    el.style.cursor = moving ? "grabbing" : "grab";
  }

  function unsetGrabCursor() {
    var swiper = this;

    if (
      swiper.support.touch ||
      (swiper.params.watchOverflow && swiper.isLocked) ||
      swiper.params.cssMode
    ) {
      return;
    }

    swiper.el.style.cursor = "";
  }

  var grabCursor = {
    setGrabCursor: setGrabCursor,
    unsetGrabCursor: unsetGrabCursor,
  };

  function appendSlide(slides) {
    var swiper = this;
    var $wrapperEl = swiper.$wrapperEl,
      params = swiper.params;

    if (params.loop) {
      swiper.loopDestroy();
    }

    if (typeof slides === "object" && "length" in slides) {
      for (var i = 0; i < slides.length; i += 1) {
        if (slides[i]) $wrapperEl.append(slides[i]);
      }
    } else {
      $wrapperEl.append(slides);
    }

    if (params.loop) {
      swiper.loopCreate();
    }

    if (!(params.observer && swiper.support.observer)) {
      swiper.update();
    }
  }

  function prependSlide(slides) {
    var swiper = this;
    var params = swiper.params,
      $wrapperEl = swiper.$wrapperEl,
      activeIndex = swiper.activeIndex;

    if (params.loop) {
      swiper.loopDestroy();
    }

    var newActiveIndex = activeIndex + 1;

    if (typeof slides === "object" && "length" in slides) {
      for (var i = 0; i < slides.length; i += 1) {
        if (slides[i]) $wrapperEl.prepend(slides[i]);
      }

      newActiveIndex = activeIndex + slides.length;
    } else {
      $wrapperEl.prepend(slides);
    }

    if (params.loop) {
      swiper.loopCreate();
    }

    if (!(params.observer && swiper.support.observer)) {
      swiper.update();
    }

    swiper.slideTo(newActiveIndex, 0, false);
  }

  function addSlide(index, slides) {
    var swiper = this;
    var $wrapperEl = swiper.$wrapperEl,
      params = swiper.params,
      activeIndex = swiper.activeIndex;
    var activeIndexBuffer = activeIndex;

    if (params.loop) {
      activeIndexBuffer -= swiper.loopedSlides;
      swiper.loopDestroy();
      swiper.slides = $wrapperEl.children("." + params.slideClass);
    }

    var baseLength = swiper.slides.length;

    if (index <= 0) {
      swiper.prependSlide(slides);
      return;
    }

    if (index >= baseLength) {
      swiper.appendSlide(slides);
      return;
    }

    var newActiveIndex =
      activeIndexBuffer > index ? activeIndexBuffer + 1 : activeIndexBuffer;
    var slidesBuffer = [];

    for (var i = baseLength - 1; i >= index; i -= 1) {
      var currentSlide = swiper.slides.eq(i);
      currentSlide.remove();
      slidesBuffer.unshift(currentSlide);
    }

    if (typeof slides === "object" && "length" in slides) {
      for (var _i = 0; _i < slides.length; _i += 1) {
        if (slides[_i]) $wrapperEl.append(slides[_i]);
      }

      newActiveIndex =
        activeIndexBuffer > index
          ? activeIndexBuffer + slides.length
          : activeIndexBuffer;
    } else {
      $wrapperEl.append(slides);
    }

    for (var _i2 = 0; _i2 < slidesBuffer.length; _i2 += 1) {
      $wrapperEl.append(slidesBuffer[_i2]);
    }

    if (params.loop) {
      swiper.loopCreate();
    }

    if (!(params.observer && swiper.support.observer)) {
      swiper.update();
    }

    if (params.loop) {
      swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
    } else {
      swiper.slideTo(newActiveIndex, 0, false);
    }
  }

  function removeSlide(slidesIndexes) {
    var swiper = this;
    var params = swiper.params,
      $wrapperEl = swiper.$wrapperEl,
      activeIndex = swiper.activeIndex;
    var activeIndexBuffer = activeIndex;

    if (params.loop) {
      activeIndexBuffer -= swiper.loopedSlides;
      swiper.loopDestroy();
      swiper.slides = $wrapperEl.children("." + params.slideClass);
    }

    var newActiveIndex = activeIndexBuffer;
    var indexToRemove;

    if (typeof slidesIndexes === "object" && "length" in slidesIndexes) {
      for (var i = 0; i < slidesIndexes.length; i += 1) {
        indexToRemove = slidesIndexes[i];
        if (swiper.slides[indexToRemove])
          swiper.slides.eq(indexToRemove).remove();
        if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
      }

      newActiveIndex = Math.max(newActiveIndex, 0);
    } else {
      indexToRemove = slidesIndexes;
      if (swiper.slides[indexToRemove])
        swiper.slides.eq(indexToRemove).remove();
      if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
      newActiveIndex = Math.max(newActiveIndex, 0);
    }

    if (params.loop) {
      swiper.loopCreate();
    }

    if (!(params.observer && swiper.support.observer)) {
      swiper.update();
    }

    if (params.loop) {
      swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
    } else {
      swiper.slideTo(newActiveIndex, 0, false);
    }
  }

  function removeAllSlides() {
    var swiper = this;
    var slidesIndexes = [];

    for (var i = 0; i < swiper.slides.length; i += 1) {
      slidesIndexes.push(i);
    }

    swiper.removeSlide(slidesIndexes);
  }

  var manipulation = {
    appendSlide: appendSlide,
    prependSlide: prependSlide,
    addSlide: addSlide,
    removeSlide: removeSlide,
    removeAllSlides: removeAllSlides,
  };

  function onTouchStart(event) {
    var swiper = this;
    var document = getDocument();
    var window = getWindow();
    var data = swiper.touchEventsData;
    var params = swiper.params,
      touches = swiper.touches;

    if (swiper.animating && params.preventInteractionOnTransition) {
      return;
    }

    var e = event;
    if (e.originalEvent) e = e.originalEvent;
    var $targetEl = $(e.target);

    if (params.touchEventsTarget === "wrapper") {
      if (!$targetEl.closest(swiper.wrapperEl).length) return;
    }

    data.isTouchEvent = e.type === "touchstart";
    if (!data.isTouchEvent && "which" in e && e.which === 3) return;
    if (!data.isTouchEvent && "button" in e && e.button > 0) return;
    if (data.isTouched && data.isMoved) return; // change target el for shadow root componenet

    var swipingClassHasValue =
      !!params.noSwipingClass && params.noSwipingClass !== "";

    if (
      swipingClassHasValue &&
      e.target &&
      e.target.shadowRoot &&
      event.path &&
      event.path[0]
    ) {
      $targetEl = $(event.path[0]);
    }

    if (
      params.noSwiping &&
      $targetEl.closest(
        params.noSwipingSelector
          ? params.noSwipingSelector
          : "." + params.noSwipingClass
      )[0]
    ) {
      swiper.allowClick = true;
      return;
    }

    if (params.swipeHandler) {
      if (!$targetEl.closest(params.swipeHandler)[0]) return;
    }

    touches.currentX =
      e.type === "touchstart" ? e.targetTouches[0].pageX : e.pageX;
    touches.currentY =
      e.type === "touchstart" ? e.targetTouches[0].pageY : e.pageY;
    var startX = touches.currentX;
    var startY = touches.currentY; // Do NOT start if iOS edge swipe is detected. Otherwise iOS app cannot swipe-to-go-back anymore

    var edgeSwipeDetection =
      params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
    var edgeSwipeThreshold =
      params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;

    if (
      edgeSwipeDetection &&
      (startX <= edgeSwipeThreshold ||
        startX >= window.innerWidth - edgeSwipeThreshold)
    ) {
      if (edgeSwipeDetection === "prevent") {
        event.preventDefault();
      } else {
        return;
      }
    }

    extend$1(data, {
      isTouched: true,
      isMoved: false,
      allowTouchCallbacks: true,
      isScrolling: undefined,
      startMoving: undefined,
    });
    touches.startX = startX;
    touches.startY = startY;
    data.touchStartTime = now();
    swiper.allowClick = true;
    swiper.updateSize();
    swiper.swipeDirection = undefined;
    if (params.threshold > 0) data.allowThresholdMove = false;

    if (e.type !== "touchstart") {
      var preventDefault = true;
      if ($targetEl.is(data.formElements)) preventDefault = false;

      if (
        document.activeElement &&
        $(document.activeElement).is(data.formElements) &&
        document.activeElement !== $targetEl[0]
      ) {
        document.activeElement.blur();
      }

      var shouldPreventDefault =
        preventDefault &&
        swiper.allowTouchMove &&
        params.touchStartPreventDefault;

      if (
        (params.touchStartForcePreventDefault || shouldPreventDefault) &&
        !$targetEl[0].isContentEditable
      ) {
        e.preventDefault();
      }
    }

    swiper.emit("touchStart", e);
  }

  function onTouchMove(event) {
    var document = getDocument();
    var swiper = this;
    var data = swiper.touchEventsData;
    var params = swiper.params,
      touches = swiper.touches,
      rtl = swiper.rtlTranslate;
    var e = event;
    if (e.originalEvent) e = e.originalEvent;

    if (!data.isTouched) {
      if (data.startMoving && data.isScrolling) {
        swiper.emit("touchMoveOpposite", e);
      }

      return;
    }

    if (data.isTouchEvent && e.type !== "touchmove") return;
    var targetTouch =
      e.type === "touchmove" &&
      e.targetTouches &&
      (e.targetTouches[0] || e.changedTouches[0]);
    var pageX = e.type === "touchmove" ? targetTouch.pageX : e.pageX;
    var pageY = e.type === "touchmove" ? targetTouch.pageY : e.pageY;

    if (e.preventedByNestedSwiper) {
      touches.startX = pageX;
      touches.startY = pageY;
      return;
    }

    if (!swiper.allowTouchMove) {
      // isMoved = true;
      swiper.allowClick = false;

      if (data.isTouched) {
        extend$1(touches, {
          startX: pageX,
          startY: pageY,
          currentX: pageX,
          currentY: pageY,
        });
        data.touchStartTime = now();
      }

      return;
    }

    if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) {
      if (swiper.isVertical()) {
        // Vertical
        if (
          (pageY < touches.startY &&
            swiper.translate <= swiper.maxTranslate()) ||
          (pageY > touches.startY && swiper.translate >= swiper.minTranslate())
        ) {
          data.isTouched = false;
          data.isMoved = false;
          return;
        }
      } else if (
        (pageX < touches.startX && swiper.translate <= swiper.maxTranslate()) ||
        (pageX > touches.startX && swiper.translate >= swiper.minTranslate())
      ) {
        return;
      }
    }

    if (data.isTouchEvent && document.activeElement) {
      if (
        e.target === document.activeElement &&
        $(e.target).is(data.formElements)
      ) {
        data.isMoved = true;
        swiper.allowClick = false;
        return;
      }
    }

    if (data.allowTouchCallbacks) {
      swiper.emit("touchMove", e);
    }

    if (e.targetTouches && e.targetTouches.length > 1) return;
    touches.currentX = pageX;
    touches.currentY = pageY;
    var diffX = touches.currentX - touches.startX;
    var diffY = touches.currentY - touches.startY;
    if (
      swiper.params.threshold &&
      Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2)) <
        swiper.params.threshold
    )
      return;

    if (typeof data.isScrolling === "undefined") {
      var touchAngle;

      if (
        (swiper.isHorizontal() && touches.currentY === touches.startY) ||
        (swiper.isVertical() && touches.currentX === touches.startX)
      ) {
        data.isScrolling = false;
      } else {
        // eslint-disable-next-line
        if (diffX * diffX + diffY * diffY >= 25) {
          touchAngle =
            (Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180) / Math.PI;
          data.isScrolling = swiper.isHorizontal()
            ? touchAngle > params.touchAngle
            : 90 - touchAngle > params.touchAngle;
        }
      }
    }

    if (data.isScrolling) {
      swiper.emit("touchMoveOpposite", e);
    }

    if (typeof data.startMoving === "undefined") {
      if (
        touches.currentX !== touches.startX ||
        touches.currentY !== touches.startY
      ) {
        data.startMoving = true;
      }
    }

    if (data.isScrolling) {
      data.isTouched = false;
      return;
    }

    if (!data.startMoving) {
      return;
    }

    swiper.allowClick = false;

    if (!params.cssMode && e.cancelable) {
      e.preventDefault();
    }

    if (params.touchMoveStopPropagation && !params.nested) {
      e.stopPropagation();
    }

    if (!data.isMoved) {
      if (params.loop) {
        swiper.loopFix();
      }

      data.startTranslate = swiper.getTranslate();
      swiper.setTransition(0);

      if (swiper.animating) {
        swiper.$wrapperEl.trigger("webkitTransitionEnd transitionend");
      }

      data.allowMomentumBounce = false; // Grab Cursor

      if (
        params.grabCursor &&
        (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)
      ) {
        swiper.setGrabCursor(true);
      }

      swiper.emit("sliderFirstMove", e);
    }

    swiper.emit("sliderMove", e);
    data.isMoved = true;
    var diff = swiper.isHorizontal() ? diffX : diffY;
    touches.diff = diff;
    diff *= params.touchRatio;
    if (rtl) diff = -diff;
    swiper.swipeDirection = diff > 0 ? "prev" : "next";
    data.currentTranslate = diff + data.startTranslate;
    var disableParentSwiper = true;
    var resistanceRatio = params.resistanceRatio;

    if (params.touchReleaseOnEdges) {
      resistanceRatio = 0;
    }

    if (diff > 0 && data.currentTranslate > swiper.minTranslate()) {
      disableParentSwiper = false;
      if (params.resistance)
        data.currentTranslate =
          swiper.minTranslate() -
          1 +
          Math.pow(
            -swiper.minTranslate() + data.startTranslate + diff,
            resistanceRatio
          );
    } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
      disableParentSwiper = false;
      if (params.resistance)
        data.currentTranslate =
          swiper.maxTranslate() +
          1 -
          Math.pow(
            swiper.maxTranslate() - data.startTranslate - diff,
            resistanceRatio
          );
    }

    if (disableParentSwiper) {
      e.preventedByNestedSwiper = true;
    } // Directions locks

    if (
      !swiper.allowSlideNext &&
      swiper.swipeDirection === "next" &&
      data.currentTranslate < data.startTranslate
    ) {
      data.currentTranslate = data.startTranslate;
    }

    if (
      !swiper.allowSlidePrev &&
      swiper.swipeDirection === "prev" &&
      data.currentTranslate > data.startTranslate
    ) {
      data.currentTranslate = data.startTranslate;
    } // Threshold

    if (params.threshold > 0) {
      if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
        if (!data.allowThresholdMove) {
          data.allowThresholdMove = true;
          touches.startX = touches.currentX;
          touches.startY = touches.currentY;
          data.currentTranslate = data.startTranslate;
          touches.diff = swiper.isHorizontal()
            ? touches.currentX - touches.startX
            : touches.currentY - touches.startY;
          return;
        }
      } else {
        data.currentTranslate = data.startTranslate;
        return;
      }
    }

    if (!params.followFinger || params.cssMode) return; // Update active index in free mode

    if (
      params.freeMode ||
      params.watchSlidesProgress ||
      params.watchSlidesVisibility
    ) {
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }

    if (params.freeMode) {
      // Velocity
      if (data.velocities.length === 0) {
        data.velocities.push({
          position: touches[swiper.isHorizontal() ? "startX" : "startY"],
          time: data.touchStartTime,
        });
      }

      data.velocities.push({
        position: touches[swiper.isHorizontal() ? "currentX" : "currentY"],
        time: now(),
      });
    } // Update progress

    swiper.updateProgress(data.currentTranslate); // Update translate

    swiper.setTranslate(data.currentTranslate);
  }

  function onTouchEnd(event) {
    var swiper = this;
    var data = swiper.touchEventsData;
    var params = swiper.params,
      touches = swiper.touches,
      rtl = swiper.rtlTranslate,
      $wrapperEl = swiper.$wrapperEl,
      slidesGrid = swiper.slidesGrid,
      snapGrid = swiper.snapGrid;
    var e = event;
    if (e.originalEvent) e = e.originalEvent;

    if (data.allowTouchCallbacks) {
      swiper.emit("touchEnd", e);
    }

    data.allowTouchCallbacks = false;

    if (!data.isTouched) {
      if (data.isMoved && params.grabCursor) {
        swiper.setGrabCursor(false);
      }

      data.isMoved = false;
      data.startMoving = false;
      return;
    } // Return Grab Cursor

    if (
      params.grabCursor &&
      data.isMoved &&
      data.isTouched &&
      (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)
    ) {
      swiper.setGrabCursor(false);
    } // Time diff

    var touchEndTime = now();
    var timeDiff = touchEndTime - data.touchStartTime; // Tap, doubleTap, Click

    if (swiper.allowClick) {
      swiper.updateClickedSlide(e);
      swiper.emit("tap click", e);

      if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
        swiper.emit("doubleTap doubleClick", e);
      }
    }

    data.lastClickTime = now();
    nextTick(function () {
      if (!swiper.destroyed) swiper.allowClick = true;
    });

    if (
      !data.isTouched ||
      !data.isMoved ||
      !swiper.swipeDirection ||
      touches.diff === 0 ||
      data.currentTranslate === data.startTranslate
    ) {
      data.isTouched = false;
      data.isMoved = false;
      data.startMoving = false;
      return;
    }

    data.isTouched = false;
    data.isMoved = false;
    data.startMoving = false;
    var currentPos;

    if (params.followFinger) {
      currentPos = rtl ? swiper.translate : -swiper.translate;
    } else {
      currentPos = -data.currentTranslate;
    }

    if (params.cssMode) {
      return;
    }

    if (params.freeMode) {
      if (currentPos < -swiper.minTranslate()) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }

      if (currentPos > -swiper.maxTranslate()) {
        if (swiper.slides.length < snapGrid.length) {
          swiper.slideTo(snapGrid.length - 1);
        } else {
          swiper.slideTo(swiper.slides.length - 1);
        }

        return;
      }

      if (params.freeModeMomentum) {
        if (data.velocities.length > 1) {
          var lastMoveEvent = data.velocities.pop();
          var velocityEvent = data.velocities.pop();
          var distance = lastMoveEvent.position - velocityEvent.position;
          var time = lastMoveEvent.time - velocityEvent.time;
          swiper.velocity = distance / time;
          swiper.velocity /= 2;

          if (Math.abs(swiper.velocity) < params.freeModeMinimumVelocity) {
            swiper.velocity = 0;
          } // this implies that the user stopped moving a finger then released.
          // There would be no events with distance zero, so the last event is stale.

          if (time > 150 || now() - lastMoveEvent.time > 300) {
            swiper.velocity = 0;
          }
        } else {
          swiper.velocity = 0;
        }

        swiper.velocity *= params.freeModeMomentumVelocityRatio;
        data.velocities.length = 0;
        var momentumDuration = 1000 * params.freeModeMomentumRatio;
        var momentumDistance = swiper.velocity * momentumDuration;
        var newPosition = swiper.translate + momentumDistance;
        if (rtl) newPosition = -newPosition;
        var doBounce = false;
        var afterBouncePosition;
        var bounceAmount =
          Math.abs(swiper.velocity) * 20 * params.freeModeMomentumBounceRatio;
        var needsLoopFix;

        if (newPosition < swiper.maxTranslate()) {
          if (params.freeModeMomentumBounce) {
            if (newPosition + swiper.maxTranslate() < -bounceAmount) {
              newPosition = swiper.maxTranslate() - bounceAmount;
            }

            afterBouncePosition = swiper.maxTranslate();
            doBounce = true;
            data.allowMomentumBounce = true;
          } else {
            newPosition = swiper.maxTranslate();
          }

          if (params.loop && params.centeredSlides) needsLoopFix = true;
        } else if (newPosition > swiper.minTranslate()) {
          if (params.freeModeMomentumBounce) {
            if (newPosition - swiper.minTranslate() > bounceAmount) {
              newPosition = swiper.minTranslate() + bounceAmount;
            }

            afterBouncePosition = swiper.minTranslate();
            doBounce = true;
            data.allowMomentumBounce = true;
          } else {
            newPosition = swiper.minTranslate();
          }

          if (params.loop && params.centeredSlides) needsLoopFix = true;
        } else if (params.freeModeSticky) {
          var nextSlide;

          for (var j = 0; j < snapGrid.length; j += 1) {
            if (snapGrid[j] > -newPosition) {
              nextSlide = j;
              break;
            }
          }

          if (
            Math.abs(snapGrid[nextSlide] - newPosition) <
              Math.abs(snapGrid[nextSlide - 1] - newPosition) ||
            swiper.swipeDirection === "next"
          ) {
            newPosition = snapGrid[nextSlide];
          } else {
            newPosition = snapGrid[nextSlide - 1];
          }

          newPosition = -newPosition;
        }

        if (needsLoopFix) {
          swiper.once("transitionEnd", function () {
            swiper.loopFix();
          });
        } // Fix duration

        if (swiper.velocity !== 0) {
          if (rtl) {
            momentumDuration = Math.abs(
              (-newPosition - swiper.translate) / swiper.velocity
            );
          } else {
            momentumDuration = Math.abs(
              (newPosition - swiper.translate) / swiper.velocity
            );
          }

          if (params.freeModeSticky) {
            // If freeModeSticky is active and the user ends a swipe with a slow-velocity
            // event, then durations can be 20+ seconds to slide one (or zero!) slides.
            // It's easy to see this when simulating touch with mouse events. To fix this,
            // limit single-slide swipes to the default slide duration. This also has the
            // nice side effect of matching slide speed if the user stopped moving before
            // lifting finger or mouse vs. moving slowly before lifting the finger/mouse.
            // For faster swipes, also apply limits (albeit higher ones).
            var moveDistance = Math.abs(
              (rtl ? -newPosition : newPosition) - swiper.translate
            );
            var currentSlideSize = swiper.slidesSizesGrid[swiper.activeIndex];

            if (moveDistance < currentSlideSize) {
              momentumDuration = params.speed;
            } else if (moveDistance < 2 * currentSlideSize) {
              momentumDuration = params.speed * 1.5;
            } else {
              momentumDuration = params.speed * 2.5;
            }
          }
        } else if (params.freeModeSticky) {
          swiper.slideToClosest();
          return;
        }

        if (params.freeModeMomentumBounce && doBounce) {
          swiper.updateProgress(afterBouncePosition);
          swiper.setTransition(momentumDuration);
          swiper.setTranslate(newPosition);
          swiper.transitionStart(true, swiper.swipeDirection);
          swiper.animating = true;
          $wrapperEl.transitionEnd(function () {
            if (!swiper || swiper.destroyed || !data.allowMomentumBounce)
              return;
            swiper.emit("momentumBounce");
            swiper.setTransition(params.speed);
            setTimeout(function () {
              swiper.setTranslate(afterBouncePosition);
              $wrapperEl.transitionEnd(function () {
                if (!swiper || swiper.destroyed) return;
                swiper.transitionEnd();
              });
            }, 0);
          });
        } else if (swiper.velocity) {
          swiper.updateProgress(newPosition);
          swiper.setTransition(momentumDuration);
          swiper.setTranslate(newPosition);
          swiper.transitionStart(true, swiper.swipeDirection);

          if (!swiper.animating) {
            swiper.animating = true;
            $wrapperEl.transitionEnd(function () {
              if (!swiper || swiper.destroyed) return;
              swiper.transitionEnd();
            });
          }
        } else {
          swiper.updateProgress(newPosition);
        }

        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      } else if (params.freeModeSticky) {
        swiper.slideToClosest();
        return;
      }

      if (!params.freeModeMomentum || timeDiff >= params.longSwipesMs) {
        swiper.updateProgress();
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }

      return;
    } // Find current slide

    var stopIndex = 0;
    var groupSize = swiper.slidesSizesGrid[0];

    for (
      var i = 0;
      i < slidesGrid.length;
      i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup
    ) {
      var _increment =
        i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;

      if (typeof slidesGrid[i + _increment] !== "undefined") {
        if (
          currentPos >= slidesGrid[i] &&
          currentPos < slidesGrid[i + _increment]
        ) {
          stopIndex = i;
          groupSize = slidesGrid[i + _increment] - slidesGrid[i];
        }
      } else if (currentPos >= slidesGrid[i]) {
        stopIndex = i;
        groupSize =
          slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
      }
    } // Find current slide size

    var ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
    var increment =
      stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;

    if (timeDiff > params.longSwipesMs) {
      // Long touches
      if (!params.longSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }

      if (swiper.swipeDirection === "next") {
        if (ratio >= params.longSwipesRatio)
          swiper.slideTo(stopIndex + increment);
        else swiper.slideTo(stopIndex);
      }

      if (swiper.swipeDirection === "prev") {
        if (ratio > 1 - params.longSwipesRatio)
          swiper.slideTo(stopIndex + increment);
        else swiper.slideTo(stopIndex);
      }
    } else {
      // Short swipes
      if (!params.shortSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }

      var isNavButtonTarget =
        swiper.navigation &&
        (e.target === swiper.navigation.nextEl ||
          e.target === swiper.navigation.prevEl);

      if (!isNavButtonTarget) {
        if (swiper.swipeDirection === "next") {
          swiper.slideTo(stopIndex + increment);
        }

        if (swiper.swipeDirection === "prev") {
          swiper.slideTo(stopIndex);
        }
      } else if (e.target === swiper.navigation.nextEl) {
        swiper.slideTo(stopIndex + increment);
      } else {
        swiper.slideTo(stopIndex);
      }
    }
  }

  function onResize() {
    var swiper = this;
    var params = swiper.params,
      el = swiper.el;
    if (el && el.offsetWidth === 0) return; // Breakpoints

    if (params.breakpoints) {
      swiper.setBreakpoint();
    } // Save locks

    var allowSlideNext = swiper.allowSlideNext,
      allowSlidePrev = swiper.allowSlidePrev,
      snapGrid = swiper.snapGrid; // Disable locks on resize

    swiper.allowSlideNext = true;
    swiper.allowSlidePrev = true;
    swiper.updateSize();
    swiper.updateSlides();
    swiper.updateSlidesClasses();

    if (
      (params.slidesPerView === "auto" || params.slidesPerView > 1) &&
      swiper.isEnd &&
      !swiper.isBeginning &&
      !swiper.params.centeredSlides
    ) {
      swiper.slideTo(swiper.slides.length - 1, 0, false, true);
    } else {
      swiper.slideTo(swiper.activeIndex, 0, false, true);
    }

    if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
      swiper.autoplay.run();
    } // Return locks after resize

    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;

    if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
      swiper.checkOverflow();
    }
  }

  function onClick(e) {
    var swiper = this;

    if (!swiper.allowClick) {
      if (swiper.params.preventClicks) e.preventDefault();

      if (swiper.params.preventClicksPropagation && swiper.animating) {
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    }
  }

  function onScroll() {
    var swiper = this;
    var wrapperEl = swiper.wrapperEl,
      rtlTranslate = swiper.rtlTranslate;
    swiper.previousTranslate = swiper.translate;

    if (swiper.isHorizontal()) {
      if (rtlTranslate) {
        swiper.translate =
          wrapperEl.scrollWidth - wrapperEl.offsetWidth - wrapperEl.scrollLeft;
      } else {
        swiper.translate = -wrapperEl.scrollLeft;
      }
    } else {
      swiper.translate = -wrapperEl.scrollTop;
    } // eslint-disable-next-line

    if (swiper.translate === -0) swiper.translate = 0;
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
    var newProgress;
    var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();

    if (translatesDiff === 0) {
      newProgress = 0;
    } else {
      newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
    }

    if (newProgress !== swiper.progress) {
      swiper.updateProgress(
        rtlTranslate ? -swiper.translate : swiper.translate
      );
    }

    swiper.emit("setTranslate", swiper.translate, false);
  }

  var dummyEventAttached = false;

  function dummyEventListener() {}

  function attachEvents() {
    var swiper = this;
    var document = getDocument();
    var params = swiper.params,
      touchEvents = swiper.touchEvents,
      el = swiper.el,
      wrapperEl = swiper.wrapperEl,
      device = swiper.device,
      support = swiper.support;
    swiper.onTouchStart = onTouchStart.bind(swiper);
    swiper.onTouchMove = onTouchMove.bind(swiper);
    swiper.onTouchEnd = onTouchEnd.bind(swiper);

    if (params.cssMode) {
      swiper.onScroll = onScroll.bind(swiper);
    }

    swiper.onClick = onClick.bind(swiper);
    var capture = !!params.nested; // Touch Events

    if (!support.touch && support.pointerEvents) {
      el.addEventListener(touchEvents.start, swiper.onTouchStart, false);
      document.addEventListener(touchEvents.move, swiper.onTouchMove, capture);
      document.addEventListener(touchEvents.end, swiper.onTouchEnd, false);
    } else {
      if (support.touch) {
        var passiveListener =
          touchEvents.start === "touchstart" &&
          support.passiveListener &&
          params.passiveListeners
            ? {
                passive: true,
                capture: false,
              }
            : false;
        el.addEventListener(
          touchEvents.start,
          swiper.onTouchStart,
          passiveListener
        );
        el.addEventListener(
          touchEvents.move,
          swiper.onTouchMove,
          support.passiveListener
            ? {
                passive: false,
                capture: capture,
              }
            : capture
        );
        el.addEventListener(
          touchEvents.end,
          swiper.onTouchEnd,
          passiveListener
        );

        if (touchEvents.cancel) {
          el.addEventListener(
            touchEvents.cancel,
            swiper.onTouchEnd,
            passiveListener
          );
        }

        if (!dummyEventAttached) {
          document.addEventListener("touchstart", dummyEventListener);
          dummyEventAttached = true;
        }
      }

      if (
        (params.simulateTouch && !device.ios && !device.android) ||
        (params.simulateTouch && !support.touch && device.ios)
      ) {
        el.addEventListener("mousedown", swiper.onTouchStart, false);
        document.addEventListener("mousemove", swiper.onTouchMove, capture);
        document.addEventListener("mouseup", swiper.onTouchEnd, false);
      }
    } // Prevent Links Clicks

    if (params.preventClicks || params.preventClicksPropagation) {
      el.addEventListener("click", swiper.onClick, true);
    }

    if (params.cssMode) {
      wrapperEl.addEventListener("scroll", swiper.onScroll);
    } // Resize handler

    if (params.updateOnWindowResize) {
      swiper.on(
        device.ios || device.android
          ? "resize orientationchange observerUpdate"
          : "resize observerUpdate",
        onResize,
        true
      );
    } else {
      swiper.on("observerUpdate", onResize, true);
    }
  }

  function detachEvents() {
    var swiper = this;
    var document = getDocument();
    var params = swiper.params,
      touchEvents = swiper.touchEvents,
      el = swiper.el,
      wrapperEl = swiper.wrapperEl,
      device = swiper.device,
      support = swiper.support;
    var capture = !!params.nested; // Touch Events

    if (!support.touch && support.pointerEvents) {
      el.removeEventListener(touchEvents.start, swiper.onTouchStart, false);
      document.removeEventListener(
        touchEvents.move,
        swiper.onTouchMove,
        capture
      );
      document.removeEventListener(touchEvents.end, swiper.onTouchEnd, false);
    } else {
      if (support.touch) {
        var passiveListener =
          touchEvents.start === "onTouchStart" &&
          support.passiveListener &&
          params.passiveListeners
            ? {
                passive: true,
                capture: false,
              }
            : false;
        el.removeEventListener(
          touchEvents.start,
          swiper.onTouchStart,
          passiveListener
        );
        el.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
        el.removeEventListener(
          touchEvents.end,
          swiper.onTouchEnd,
          passiveListener
        );

        if (touchEvents.cancel) {
          el.removeEventListener(
            touchEvents.cancel,
            swiper.onTouchEnd,
            passiveListener
          );
        }
      }

      if (
        (params.simulateTouch && !device.ios && !device.android) ||
        (params.simulateTouch && !support.touch && device.ios)
      ) {
        el.removeEventListener("mousedown", swiper.onTouchStart, false);
        document.removeEventListener("mousemove", swiper.onTouchMove, capture);
        document.removeEventListener("mouseup", swiper.onTouchEnd, false);
      }
    } // Prevent Links Clicks

    if (params.preventClicks || params.preventClicksPropagation) {
      el.removeEventListener("click", swiper.onClick, true);
    }

    if (params.cssMode) {
      wrapperEl.removeEventListener("scroll", swiper.onScroll);
    } // Resize handler

    swiper.off(
      device.ios || device.android
        ? "resize orientationchange observerUpdate"
        : "resize observerUpdate",
      onResize
    );
  }

  var events = {
    attachEvents: attachEvents,
    detachEvents: detachEvents,
  };

  function setBreakpoint() {
    var swiper = this;
    var activeIndex = swiper.activeIndex,
      initialized = swiper.initialized,
      _swiper$loopedSlides = swiper.loopedSlides,
      loopedSlides = _swiper$loopedSlides === void 0 ? 0 : _swiper$loopedSlides,
      params = swiper.params,
      $el = swiper.$el;
    var breakpoints = params.breakpoints;
    if (!breakpoints || (breakpoints && Object.keys(breakpoints).length === 0))
      return; // Get breakpoint for window width and update parameters

    var breakpoint = swiper.getBreakpoint(breakpoints);

    if (breakpoint && swiper.currentBreakpoint !== breakpoint) {
      var breakpointOnlyParams =
        breakpoint in breakpoints ? breakpoints[breakpoint] : undefined;

      if (breakpointOnlyParams) {
        [
          "slidesPerView",
          "spaceBetween",
          "slidesPerGroup",
          "slidesPerGroupSkip",
          "slidesPerColumn",
        ].forEach(function (param) {
          var paramValue = breakpointOnlyParams[param];
          if (typeof paramValue === "undefined") return;

          if (
            param === "slidesPerView" &&
            (paramValue === "AUTO" || paramValue === "auto")
          ) {
            breakpointOnlyParams[param] = "auto";
          } else if (param === "slidesPerView") {
            breakpointOnlyParams[param] = parseFloat(paramValue);
          } else {
            breakpointOnlyParams[param] = parseInt(paramValue, 10);
          }
        });
      }

      var breakpointParams = breakpointOnlyParams || swiper.originalParams;
      var wasMultiRow = params.slidesPerColumn > 1;
      var isMultiRow = breakpointParams.slidesPerColumn > 1;

      if (wasMultiRow && !isMultiRow) {
        $el.removeClass(
          params.containerModifierClass +
            "multirow " +
            params.containerModifierClass +
            "multirow-column"
        );
        swiper.emitContainerClasses();
      } else if (!wasMultiRow && isMultiRow) {
        $el.addClass(params.containerModifierClass + "multirow");

        if (breakpointParams.slidesPerColumnFill === "column") {
          $el.addClass(params.containerModifierClass + "multirow-column");
        }

        swiper.emitContainerClasses();
      }

      var directionChanged =
        breakpointParams.direction &&
        breakpointParams.direction !== params.direction;
      var needsReLoop =
        params.loop &&
        (breakpointParams.slidesPerView !== params.slidesPerView ||
          directionChanged);

      if (directionChanged && initialized) {
        swiper.changeDirection();
      }

      extend$1(swiper.params, breakpointParams);
      extend$1(swiper, {
        allowTouchMove: swiper.params.allowTouchMove,
        allowSlideNext: swiper.params.allowSlideNext,
        allowSlidePrev: swiper.params.allowSlidePrev,
      });
      swiper.currentBreakpoint = breakpoint;
      swiper.emit("_beforeBreakpoint", breakpointParams);

      if (needsReLoop && initialized) {
        swiper.loopDestroy();
        swiper.loopCreate();
        swiper.updateSlides();
        swiper.slideTo(
          activeIndex - loopedSlides + swiper.loopedSlides,
          0,
          false
        );
      }

      swiper.emit("breakpoint", breakpointParams);
    }
  }

  function getBreakpoints(breakpoints) {
    var window = getWindow(); // Get breakpoint for window width

    if (!breakpoints) return undefined;
    var breakpoint = false;
    var points = Object.keys(breakpoints).map(function (point) {
      if (typeof point === "string" && point.indexOf("@") === 0) {
        var minRatio = parseFloat(point.substr(1));
        var value = window.innerHeight * minRatio;
        return {
          value: value,
          point: point,
        };
      }

      return {
        value: point,
        point: point,
      };
    });
    points.sort(function (a, b) {
      return parseInt(a.value, 10) - parseInt(b.value, 10);
    });

    for (var i = 0; i < points.length; i += 1) {
      var _points$i = points[i],
        point = _points$i.point,
        value = _points$i.value;

      if (value <= window.innerWidth) {
        breakpoint = point;
      }
    }

    return breakpoint || "max";
  }

  var breakpoints = {
    setBreakpoint: setBreakpoint,
    getBreakpoint: getBreakpoints,
  };

  function addClasses() {
    var swiper = this;
    var classNames = swiper.classNames,
      params = swiper.params,
      rtl = swiper.rtl,
      $el = swiper.$el,
      device = swiper.device,
      support = swiper.support;
    var suffixes = [];
    suffixes.push("initialized");
    suffixes.push(params.direction);

    if (support.pointerEvents && !support.touch) {
      suffixes.push("pointer-events");
    }

    if (params.freeMode) {
      suffixes.push("free-mode");
    }

    if (params.autoHeight) {
      suffixes.push("autoheight");
    }

    if (rtl) {
      suffixes.push("rtl");
    }

    if (params.slidesPerColumn > 1) {
      suffixes.push("multirow");

      if (params.slidesPerColumnFill === "column") {
        suffixes.push("multirow-column");
      }
    }

    if (device.android) {
      suffixes.push("android");
    }

    if (device.ios) {
      suffixes.push("ios");
    }

    if (params.cssMode) {
      suffixes.push("css-mode");
    }

    suffixes.forEach(function (suffix) {
      classNames.push(params.containerModifierClass + suffix);
    });
    $el.addClass(classNames.join(" "));
    swiper.emitContainerClasses();
  }

  function removeClasses() {
    var swiper = this;
    var $el = swiper.$el,
      classNames = swiper.classNames;
    $el.removeClass(classNames.join(" "));
    swiper.emitContainerClasses();
  }

  var classes = {
    addClasses: addClasses,
    removeClasses: removeClasses,
  };

  function loadImage(imageEl, src, srcset, sizes, checkForComplete, callback) {
    var window = getWindow();
    var image;

    function onReady() {
      if (callback) callback();
    }

    var isPicture = $(imageEl).parent("picture")[0];

    if (!isPicture && (!imageEl.complete || !checkForComplete)) {
      if (src) {
        image = new window.Image();
        image.onload = onReady;
        image.onerror = onReady;

        if (sizes) {
          image.sizes = sizes;
        }

        if (srcset) {
          image.srcset = srcset;
        }

        if (src) {
          image.src = src;
        }
      } else {
        onReady();
      }
    } else {
      // image already loaded...
      onReady();
    }
  }

  function preloadImages() {
    var swiper = this;
    swiper.imagesToLoad = swiper.$el.find("img");

    function onReady() {
      if (
        typeof swiper === "undefined" ||
        swiper === null ||
        !swiper ||
        swiper.destroyed
      )
        return;
      if (swiper.imagesLoaded !== undefined) swiper.imagesLoaded += 1;

      if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
        if (swiper.params.updateOnImagesReady) swiper.update();
        swiper.emit("imagesReady");
      }
    }

    for (var i = 0; i < swiper.imagesToLoad.length; i += 1) {
      var imageEl = swiper.imagesToLoad[i];
      swiper.loadImage(
        imageEl,
        imageEl.currentSrc || imageEl.getAttribute("src"),
        imageEl.srcset || imageEl.getAttribute("srcset"),
        imageEl.sizes || imageEl.getAttribute("sizes"),
        true,
        onReady
      );
    }
  }

  var images = {
    loadImage: loadImage,
    preloadImages: preloadImages,
  };

  function checkOverflow() {
    var swiper = this;
    var params = swiper.params;
    var wasLocked = swiper.isLocked;
    var lastSlidePosition =
      swiper.slides.length > 0 &&
      params.slidesOffsetBefore +
        params.spaceBetween * (swiper.slides.length - 1) +
        swiper.slides[0].offsetWidth * swiper.slides.length;

    if (
      params.slidesOffsetBefore &&
      params.slidesOffsetAfter &&
      lastSlidePosition
    ) {
      swiper.isLocked = lastSlidePosition <= swiper.size;
    } else {
      swiper.isLocked = swiper.snapGrid.length === 1;
    }

    swiper.allowSlideNext = !swiper.isLocked;
    swiper.allowSlidePrev = !swiper.isLocked; // events

    if (wasLocked !== swiper.isLocked)
      swiper.emit(swiper.isLocked ? "lock" : "unlock");

    if (wasLocked && wasLocked !== swiper.isLocked) {
      swiper.isEnd = false;
      if (swiper.navigation) swiper.navigation.update();
    }
  }

  var checkOverflow$1 = {
    checkOverflow: checkOverflow,
  };

  var defaults = {
    init: true,
    direction: "horizontal",
    touchEventsTarget: "container",
    initialSlide: 0,
    speed: 300,
    cssMode: false,
    updateOnWindowResize: true,
    nested: false,
    // Overrides
    width: null,
    height: null,
    //
    preventInteractionOnTransition: false,
    // ssr
    userAgent: null,
    url: null,
    // To support iOS's swipe-to-go-back gesture (when being used in-app).
    edgeSwipeDetection: false,
    edgeSwipeThreshold: 20,
    // Free mode
    freeMode: false,
    freeModeMomentum: true,
    freeModeMomentumRatio: 1,
    freeModeMomentumBounce: true,
    freeModeMomentumBounceRatio: 1,
    freeModeMomentumVelocityRatio: 1,
    freeModeSticky: false,
    freeModeMinimumVelocity: 0.02,
    // Autoheight
    autoHeight: false,
    // Set wrapper width
    setWrapperSize: false,
    // Virtual Translate
    virtualTranslate: false,
    // Effects
    effect: "slide",
    // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
    // Breakpoints
    breakpoints: undefined,
    // Slides grid
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerColumn: 1,
    slidesPerColumnFill: "column",
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    centeredSlides: false,
    centeredSlidesBounds: false,
    slidesOffsetBefore: 0,
    // in px
    slidesOffsetAfter: 0,
    // in px
    normalizeSlideIndex: true,
    centerInsufficientSlides: false,
    // Disable swiper and hide navigation when container not overflow
    watchOverflow: false,
    // Round length
    roundLengths: false,
    // Touches
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: true,
    shortSwipes: true,
    longSwipes: true,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: true,
    allowTouchMove: true,
    threshold: 0,
    touchMoveStopPropagation: false,
    touchStartPreventDefault: true,
    touchStartForcePreventDefault: false,
    touchReleaseOnEdges: false,
    // Unique Navigation Elements
    uniqueNavElements: true,
    // Resistance
    resistance: true,
    resistanceRatio: 0.85,
    // Progress
    watchSlidesProgress: false,
    watchSlidesVisibility: false,
    // Cursor
    grabCursor: false,
    // Clicks
    preventClicks: true,
    preventClicksPropagation: true,
    slideToClickedSlide: false,
    // Images
    preloadImages: true,
    updateOnImagesReady: true,
    // loop
    loop: false,
    loopAdditionalSlides: 0,
    loopedSlides: null,
    loopFillGroupWithBlank: false,
    loopPreventsSlide: true,
    // Swiping/no swiping
    allowSlidePrev: true,
    allowSlideNext: true,
    swipeHandler: null,
    // '.swipe-handler',
    noSwiping: true,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    // Passive Listeners
    passiveListeners: true,
    // NS
    containerModifierClass: "swiper-container-",
    // NEW
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-invisible-blank",
    slideActiveClass: "swiper-slide-active",
    slideDuplicateActiveClass: "swiper-slide-duplicate-active",
    slideVisibleClass: "swiper-slide-visible",
    slideDuplicateClass: "swiper-slide-duplicate",
    slideNextClass: "swiper-slide-next",
    slideDuplicateNextClass: "swiper-slide-duplicate-next",
    slidePrevClass: "swiper-slide-prev",
    slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
    wrapperClass: "swiper-wrapper",
    // Callbacks
    runCallbacksOnInit: true,
    // Internals
    _emitClasses: false,
  };

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }
  var prototypes = {
    modular: modular,
    eventsEmitter: eventsEmitter,
    update: update,
    translate: translate,
    transition: transition$1,
    slide: slide,
    loop: loop,
    grabCursor: grabCursor,
    manipulation: manipulation,
    events: events,
    breakpoints: breakpoints,
    checkOverflow: checkOverflow$1,
    classes: classes,
    images: images,
  };
  var extendedDefaults = {};

  var Swiper = /*#__PURE__*/ (function () {
    function Swiper() {
      var el;
      var params;

      for (
        var _len = arguments.length, args = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key];
      }

      if (
        args.length === 1 &&
        args[0].constructor &&
        args[0].constructor === Object
      ) {
        params = args[0];
      } else {
        el = args[0];
        params = args[1];
      }

      if (!params) params = {};
      params = extend$1({}, params);
      if (el && !params.el) params.el = el; // Swiper Instance

      var swiper = this;
      swiper.support = getSupport();
      swiper.device = getDevice({
        userAgent: params.userAgent,
      });
      swiper.browser = getBrowser();
      swiper.eventsListeners = {};
      swiper.eventsAnyListeners = [];

      if (typeof swiper.modules === "undefined") {
        swiper.modules = {};
      }

      Object.keys(swiper.modules).forEach(function (moduleName) {
        var module = swiper.modules[moduleName];

        if (module.params) {
          var moduleParamName = Object.keys(module.params)[0];
          var moduleParams = module.params[moduleParamName];
          if (typeof moduleParams !== "object" || moduleParams === null) return;
          if (!(moduleParamName in params && "enabled" in moduleParams)) return;

          if (params[moduleParamName] === true) {
            params[moduleParamName] = {
              enabled: true,
            };
          }

          if (
            typeof params[moduleParamName] === "object" &&
            !("enabled" in params[moduleParamName])
          ) {
            params[moduleParamName].enabled = true;
          }

          if (!params[moduleParamName])
            params[moduleParamName] = {
              enabled: false,
            };
        }
      }); // Extend defaults with modules params

      var swiperParams = extend$1({}, defaults);
      swiper.useParams(swiperParams); // Extend defaults with passed params

      swiper.params = extend$1({}, swiperParams, extendedDefaults, params);
      swiper.originalParams = extend$1({}, swiper.params);
      swiper.passedParams = extend$1({}, params); // add event listeners

      if (swiper.params && swiper.params.on) {
        Object.keys(swiper.params.on).forEach(function (eventName) {
          swiper.on(eventName, swiper.params.on[eventName]);
        });
      }

      if (swiper.params && swiper.params.onAny) {
        swiper.onAny(swiper.params.onAny);
      } // Save Dom lib

      swiper.$ = $; // Find el

      var $el = $(swiper.params.el);
      el = $el[0];

      if (!el) {
        return undefined;
      }

      if ($el.length > 1) {
        var swipers = [];
        $el.each(function (containerEl) {
          var newParams = extend$1({}, params, {
            el: containerEl,
          });
          swipers.push(new Swiper(newParams));
        });
        return swipers;
      }

      el.swiper = swiper; // Find Wrapper

      var $wrapperEl;

      if (el && el.shadowRoot && el.shadowRoot.querySelector) {
        $wrapperEl = $(
          el.shadowRoot.querySelector("." + swiper.params.wrapperClass)
        ); // Children needs to return slot items

        $wrapperEl.children = function (options) {
          return $el.children(options);
        };
      } else {
        $wrapperEl = $el.children("." + swiper.params.wrapperClass);
      } // Extend Swiper

      extend$1(swiper, {
        $el: $el,
        el: el,
        $wrapperEl: $wrapperEl,
        wrapperEl: $wrapperEl[0],
        // Classes
        classNames: [],
        // Slides
        slides: $(),
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        // isDirection
        isHorizontal: function isHorizontal() {
          return swiper.params.direction === "horizontal";
        },
        isVertical: function isVertical() {
          return swiper.params.direction === "vertical";
        },
        // RTL
        rtl: el.dir.toLowerCase() === "rtl" || $el.css("direction") === "rtl",
        rtlTranslate:
          swiper.params.direction === "horizontal" &&
          (el.dir.toLowerCase() === "rtl" || $el.css("direction") === "rtl"),
        wrongRTL: $wrapperEl.css("display") === "-webkit-box",
        // Indexes
        activeIndex: 0,
        realIndex: 0,
        //
        isBeginning: true,
        isEnd: false,
        // Props
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: false,
        // Locks
        allowSlideNext: swiper.params.allowSlideNext,
        allowSlidePrev: swiper.params.allowSlidePrev,
        // Touch Events
        touchEvents: (function touchEvents() {
          var touch = ["touchstart", "touchmove", "touchend", "touchcancel"];
          var desktop = ["mousedown", "mousemove", "mouseup"];

          if (swiper.support.pointerEvents) {
            desktop = ["pointerdown", "pointermove", "pointerup"];
          }

          swiper.touchEventsTouch = {
            start: touch[0],
            move: touch[1],
            end: touch[2],
            cancel: touch[3],
          };
          swiper.touchEventsDesktop = {
            start: desktop[0],
            move: desktop[1],
            end: desktop[2],
          };
          return swiper.support.touch || !swiper.params.simulateTouch
            ? swiper.touchEventsTouch
            : swiper.touchEventsDesktop;
        })(),
        touchEventsData: {
          isTouched: undefined,
          isMoved: undefined,
          allowTouchCallbacks: undefined,
          touchStartTime: undefined,
          isScrolling: undefined,
          currentTranslate: undefined,
          startTranslate: undefined,
          allowThresholdMove: undefined,
          // Form elements to match
          formElements: "input, select, option, textarea, button, video, label",
          // Last click time
          lastClickTime: now(),
          clickTimeout: undefined,
          // Velocities
          velocities: [],
          allowMomentumBounce: undefined,
          isTouchEvent: undefined,
          startMoving: undefined,
        },
        // Clicks
        allowClick: true,
        // Touches
        allowTouchMove: swiper.params.allowTouchMove,
        touches: {
          startX: 0,
          startY: 0,
          currentX: 0,
          currentY: 0,
          diff: 0,
        },
        // Images
        imagesToLoad: [],
        imagesLoaded: 0,
      }); // Install Modules

      swiper.useModules();
      swiper.emit("_swiper"); // Init

      if (swiper.params.init) {
        swiper.init();
      } // Return app instance

      return swiper;
    }

    var _proto = Swiper.prototype;

    _proto.emitContainerClasses = function emitContainerClasses() {
      var swiper = this;
      if (!swiper.params._emitClasses || !swiper.el) return;
      var classes = swiper.el.className.split(" ").filter(function (className) {
        return (
          className.indexOf("swiper-container") === 0 ||
          className.indexOf(swiper.params.containerModifierClass) === 0
        );
      });
      swiper.emit("_containerClasses", classes.join(" "));
    };

    _proto.getSlideClasses = function getSlideClasses(slideEl) {
      var swiper = this;
      return slideEl.className
        .split(" ")
        .filter(function (className) {
          return (
            className.indexOf("swiper-slide") === 0 ||
            className.indexOf(swiper.params.slideClass) === 0
          );
        })
        .join(" ");
    };

    _proto.emitSlidesClasses = function emitSlidesClasses() {
      var swiper = this;
      if (!swiper.params._emitClasses || !swiper.el) return;
      swiper.slides.each(function (slideEl) {
        var classNames = swiper.getSlideClasses(slideEl);
        swiper.emit("_slideClass", slideEl, classNames);
      });
    };

    _proto.slidesPerViewDynamic = function slidesPerViewDynamic() {
      var swiper = this;
      var params = swiper.params,
        slides = swiper.slides,
        slidesGrid = swiper.slidesGrid,
        swiperSize = swiper.size,
        activeIndex = swiper.activeIndex;
      var spv = 1;

      if (params.centeredSlides) {
        var slideSize = slides[activeIndex].swiperSlideSize;
        var breakLoop;

        for (var i = activeIndex + 1; i < slides.length; i += 1) {
          if (slides[i] && !breakLoop) {
            slideSize += slides[i].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize) breakLoop = true;
          }
        }

        for (var _i = activeIndex - 1; _i >= 0; _i -= 1) {
          if (slides[_i] && !breakLoop) {
            slideSize += slides[_i].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize) breakLoop = true;
          }
        }
      } else {
        for (var _i2 = activeIndex + 1; _i2 < slides.length; _i2 += 1) {
          if (slidesGrid[_i2] - slidesGrid[activeIndex] < swiperSize) {
            spv += 1;
          }
        }
      }

      return spv;
    };

    _proto.update = function update() {
      var swiper = this;
      if (!swiper || swiper.destroyed) return;
      var snapGrid = swiper.snapGrid,
        params = swiper.params; // Breakpoints

      if (params.breakpoints) {
        swiper.setBreakpoint();
      }

      swiper.updateSize();
      swiper.updateSlides();
      swiper.updateProgress();
      swiper.updateSlidesClasses();

      function setTranslate() {
        var translateValue = swiper.rtlTranslate
          ? swiper.translate * -1
          : swiper.translate;
        var newTranslate = Math.min(
          Math.max(translateValue, swiper.maxTranslate()),
          swiper.minTranslate()
        );
        swiper.setTranslate(newTranslate);
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }

      var translated;

      if (swiper.params.freeMode) {
        setTranslate();

        if (swiper.params.autoHeight) {
          swiper.updateAutoHeight();
        }
      } else {
        if (
          (swiper.params.slidesPerView === "auto" ||
            swiper.params.slidesPerView > 1) &&
          swiper.isEnd &&
          !swiper.params.centeredSlides
        ) {
          translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true);
        } else {
          translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
        }

        if (!translated) {
          setTranslate();
        }
      }

      if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
        swiper.checkOverflow();
      }

      swiper.emit("update");
    };

    _proto.changeDirection = function changeDirection(
      newDirection,
      needUpdate
    ) {
      if (needUpdate === void 0) {
        needUpdate = true;
      }

      var swiper = this;
      var currentDirection = swiper.params.direction;

      if (!newDirection) {
        // eslint-disable-next-line
        newDirection =
          currentDirection === "horizontal" ? "vertical" : "horizontal";
      }

      if (
        newDirection === currentDirection ||
        (newDirection !== "horizontal" && newDirection !== "vertical")
      ) {
        return swiper;
      }

      swiper.$el
        .removeClass(
          "" + swiper.params.containerModifierClass + currentDirection
        )
        .addClass("" + swiper.params.containerModifierClass + newDirection);
      swiper.emitContainerClasses();
      swiper.params.direction = newDirection;
      swiper.slides.each(function (slideEl) {
        if (newDirection === "vertical") {
          slideEl.style.width = "";
        } else {
          slideEl.style.height = "";
        }
      });
      swiper.emit("changeDirection");
      if (needUpdate) swiper.update();
      return swiper;
    };

    _proto.init = function init() {
      var swiper = this;
      if (swiper.initialized) return;
      swiper.emit("beforeInit"); // Set breakpoint

      if (swiper.params.breakpoints) {
        swiper.setBreakpoint();
      } // Add Classes

      swiper.addClasses(); // Create loop

      if (swiper.params.loop) {
        swiper.loopCreate();
      } // Update size

      swiper.updateSize(); // Update slides

      swiper.updateSlides();

      if (swiper.params.watchOverflow) {
        swiper.checkOverflow();
      } // Set Grab Cursor

      if (swiper.params.grabCursor) {
        swiper.setGrabCursor();
      }

      if (swiper.params.preloadImages) {
        swiper.preloadImages();
      } // Slide To Initial Slide

      if (swiper.params.loop) {
        swiper.slideTo(
          swiper.params.initialSlide + swiper.loopedSlides,
          0,
          swiper.params.runCallbacksOnInit
        );
      } else {
        swiper.slideTo(
          swiper.params.initialSlide,
          0,
          swiper.params.runCallbacksOnInit
        );
      } // Attach events

      swiper.attachEvents(); // Init Flag

      swiper.initialized = true; // Emit

      swiper.emit("init");
      swiper.emit("afterInit");
    };

    _proto.destroy = function destroy(deleteInstance, cleanStyles) {
      if (deleteInstance === void 0) {
        deleteInstance = true;
      }

      if (cleanStyles === void 0) {
        cleanStyles = true;
      }

      var swiper = this;
      var params = swiper.params,
        $el = swiper.$el,
        $wrapperEl = swiper.$wrapperEl,
        slides = swiper.slides;

      if (typeof swiper.params === "undefined" || swiper.destroyed) {
        return null;
      }

      swiper.emit("beforeDestroy"); // Init Flag

      swiper.initialized = false; // Detach events

      swiper.detachEvents(); // Destroy loop

      if (params.loop) {
        swiper.loopDestroy();
      } // Cleanup styles

      if (cleanStyles) {
        swiper.removeClasses();
        $el.removeAttr("style");
        $wrapperEl.removeAttr("style");

        if (slides && slides.length) {
          slides
            .removeClass(
              [
                params.slideVisibleClass,
                params.slideActiveClass,
                params.slideNextClass,
                params.slidePrevClass,
              ].join(" ")
            )
            .removeAttr("style")
            .removeAttr("data-swiper-slide-index");
        }
      }

      swiper.emit("destroy"); // Detach emitter events

      Object.keys(swiper.eventsListeners).forEach(function (eventName) {
        swiper.off(eventName);
      });

      if (deleteInstance !== false) {
        swiper.$el[0].swiper = null;
        deleteProps(swiper);
      }

      swiper.destroyed = true;
      return null;
    };

    Swiper.extendDefaults = function extendDefaults(newDefaults) {
      extend$1(extendedDefaults, newDefaults);
    };

    Swiper.installModule = function installModule(module) {
      if (!Swiper.prototype.modules) Swiper.prototype.modules = {};
      var name =
        module.name ||
        Object.keys(Swiper.prototype.modules).length + "_" + now();
      Swiper.prototype.modules[name] = module;
    };

    Swiper.use = function use(module) {
      if (Array.isArray(module)) {
        module.forEach(function (m) {
          return Swiper.installModule(m);
        });
        return Swiper;
      }

      Swiper.installModule(module);
      return Swiper;
    };

    _createClass(Swiper, null, [
      {
        key: "extendedDefaults",
        get: function get() {
          return extendedDefaults;
        },
      },
      {
        key: "defaults",
        get: function get() {
          return defaults;
        },
      },
    ]);

    return Swiper;
  })();

  Object.keys(prototypes).forEach(function (prototypeGroup) {
    Object.keys(prototypes[prototypeGroup]).forEach(function (protoMethod) {
      Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
    });
  });
  Swiper.use([Resize, Observer$1]);

  function _extends$1() {
    _extends$1 =
      Object.assign ||
      function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
    return _extends$1.apply(this, arguments);
  }
  var Navigation = {
    update: function update() {
      // Update Navigation Buttons
      var swiper = this;
      var params = swiper.params.navigation;
      if (swiper.params.loop) return;
      var _swiper$navigation = swiper.navigation,
        $nextEl = _swiper$navigation.$nextEl,
        $prevEl = _swiper$navigation.$prevEl;

      if ($prevEl && $prevEl.length > 0) {
        if (swiper.isBeginning) {
          $prevEl.addClass(params.disabledClass);
        } else {
          $prevEl.removeClass(params.disabledClass);
        }

        $prevEl[
          swiper.params.watchOverflow && swiper.isLocked
            ? "addClass"
            : "removeClass"
        ](params.lockClass);
      }

      if ($nextEl && $nextEl.length > 0) {
        if (swiper.isEnd) {
          $nextEl.addClass(params.disabledClass);
        } else {
          $nextEl.removeClass(params.disabledClass);
        }

        $nextEl[
          swiper.params.watchOverflow && swiper.isLocked
            ? "addClass"
            : "removeClass"
        ](params.lockClass);
      }
    },
    onPrevClick: function onPrevClick(e) {
      var swiper = this;
      e.preventDefault();
      if (swiper.isBeginning && !swiper.params.loop) return;
      swiper.slidePrev();
    },
    onNextClick: function onNextClick(e) {
      var swiper = this;
      e.preventDefault();
      if (swiper.isEnd && !swiper.params.loop) return;
      swiper.slideNext();
    },
    init: function init() {
      var swiper = this;
      var params = swiper.params.navigation;
      if (!(params.nextEl || params.prevEl)) return;
      var $nextEl;
      var $prevEl;

      if (params.nextEl) {
        $nextEl = $(params.nextEl);

        if (
          swiper.params.uniqueNavElements &&
          typeof params.nextEl === "string" &&
          $nextEl.length > 1 &&
          swiper.$el.find(params.nextEl).length === 1
        ) {
          $nextEl = swiper.$el.find(params.nextEl);
        }
      }

      if (params.prevEl) {
        $prevEl = $(params.prevEl);

        if (
          swiper.params.uniqueNavElements &&
          typeof params.prevEl === "string" &&
          $prevEl.length > 1 &&
          swiper.$el.find(params.prevEl).length === 1
        ) {
          $prevEl = swiper.$el.find(params.prevEl);
        }
      }

      if ($nextEl && $nextEl.length > 0) {
        $nextEl.on("click", swiper.navigation.onNextClick);
      }

      if ($prevEl && $prevEl.length > 0) {
        $prevEl.on("click", swiper.navigation.onPrevClick);
      }

      extend$1(swiper.navigation, {
        $nextEl: $nextEl,
        nextEl: $nextEl && $nextEl[0],
        $prevEl: $prevEl,
        prevEl: $prevEl && $prevEl[0],
      });
    },
    destroy: function destroy() {
      var swiper = this;
      var _swiper$navigation2 = swiper.navigation,
        $nextEl = _swiper$navigation2.$nextEl,
        $prevEl = _swiper$navigation2.$prevEl;

      if ($nextEl && $nextEl.length) {
        $nextEl.off("click", swiper.navigation.onNextClick);
        $nextEl.removeClass(swiper.params.navigation.disabledClass);
      }

      if ($prevEl && $prevEl.length) {
        $prevEl.off("click", swiper.navigation.onPrevClick);
        $prevEl.removeClass(swiper.params.navigation.disabledClass);
      }
    },
  };
  var Navigation$1 = {
    name: "navigation",
    params: {
      navigation: {
        nextEl: null,
        prevEl: null,
        hideOnClick: false,
        disabledClass: "swiper-button-disabled",
        hiddenClass: "swiper-button-hidden",
        lockClass: "swiper-button-lock",
      },
    },
    create: function create() {
      var swiper = this;
      bindModuleMethods(swiper, {
        navigation: _extends$1({}, Navigation),
      });
    },
    on: {
      init: function init(swiper) {
        swiper.navigation.init();
        swiper.navigation.update();
      },
      toEdge: function toEdge(swiper) {
        swiper.navigation.update();
      },
      fromEdge: function fromEdge(swiper) {
        swiper.navigation.update();
      },
      destroy: function destroy(swiper) {
        swiper.navigation.destroy();
      },
      click: function click(swiper, e) {
        var _swiper$navigation3 = swiper.navigation,
          $nextEl = _swiper$navigation3.$nextEl,
          $prevEl = _swiper$navigation3.$prevEl;

        if (
          swiper.params.navigation.hideOnClick &&
          !$(e.target).is($prevEl) &&
          !$(e.target).is($nextEl)
        ) {
          var isHidden;

          if ($nextEl) {
            isHidden = $nextEl.hasClass(swiper.params.navigation.hiddenClass);
          } else if ($prevEl) {
            isHidden = $prevEl.hasClass(swiper.params.navigation.hiddenClass);
          }

          if (isHidden === true) {
            swiper.emit("navigationShow");
          } else {
            swiper.emit("navigationHide");
          }

          if ($nextEl) {
            $nextEl.toggleClass(swiper.params.navigation.hiddenClass);
          }

          if ($prevEl) {
            $prevEl.toggleClass(swiper.params.navigation.hiddenClass);
          }
        }
      },
    },
  };

  const runningOnBrowser = typeof window !== "undefined";

  const isBot =
    (runningOnBrowser && !("onscroll" in window)) ||
    (typeof navigator !== "undefined" &&
      /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent));

  const supportsIntersectionObserver =
    runningOnBrowser && "IntersectionObserver" in window;

  const supportsClassList =
    runningOnBrowser && "classList" in document.createElement("p");

  const isHiDpi = runningOnBrowser && window.devicePixelRatio > 1;

  const defaultSettings = {
    elements_selector: ".lazy",
    container: isBot || runningOnBrowser ? document : null,
    threshold: 300,
    thresholds: null,
    data_src: "src",
    data_srcset: "srcset",
    data_sizes: "sizes",
    data_bg: "bg",
    data_bg_hidpi: "bg-hidpi",
    data_bg_multi: "bg-multi",
    data_bg_multi_hidpi: "bg-multi-hidpi",
    data_poster: "poster",
    class_applied: "applied",
    class_loading: "loading",
    class_loaded: "loaded",
    class_error: "error",
    class_entered: "entered",
    class_exited: "exited",
    unobserve_completed: true,
    unobserve_entered: false,
    cancel_on_exit: true,
    callback_enter: null,
    callback_exit: null,
    callback_applied: null,
    callback_loading: null,
    callback_loaded: null,
    callback_error: null,
    callback_finish: null,
    callback_cancel: null,
    use_native: false,
  };

  const getExtendedSettings = (customSettings) => {
    return Object.assign({}, defaultSettings, customSettings);
  };

  /* Creates instance and notifies it through the window element */
  const createInstance = function (classObj, options) {
    var event;
    let eventString = "LazyLoad::Initialized";
    let instance = new classObj(options);
    try {
      // Works in modern browsers
      event = new CustomEvent(eventString, { detail: { instance } });
    } catch (err) {
      // Works in Internet Explorer (all versions)
      event = document.createEvent("CustomEvent");
      event.initCustomEvent(eventString, false, false, { instance });
    }
    window.dispatchEvent(event);
  };

  /* Auto initialization of one or more instances of lazyload, depending on the 
        options passed in (plain object or an array) */
  const autoInitialize = (classObj, options) => {
    if (!options) {
      return;
    }
    if (!options.length) {
      // Plain object
      createInstance(classObj, options);
    } else {
      // Array of objects
      for (let i = 0, optionsItem; (optionsItem = options[i]); i += 1) {
        createInstance(classObj, optionsItem);
      }
    }
  };

  const statusLoading = "loading";
  const statusLoaded = "loaded";
  const statusApplied = "applied";
  const statusEntered = "entered";
  const statusError = "error";
  const statusNative = "native";

  const dataPrefix = "data-";
  const statusDataName = "ll-status";

  const getData = (element, attribute) => {
    return element.getAttribute(dataPrefix + attribute);
  };

  const setData = (element, attribute, value) => {
    var attrName = dataPrefix + attribute;
    if (value === null) {
      element.removeAttribute(attrName);
      return;
    }
    element.setAttribute(attrName, value);
  };

  const getStatus = (element) => getData(element, statusDataName);
  const setStatus = (element, status) =>
    setData(element, statusDataName, status);
  const resetStatus = (element) => setStatus(element, null);

  const hasEmptyStatus = (element) => getStatus(element) === null;
  const hasStatusLoading = (element) => getStatus(element) === statusLoading;
  const hasStatusError = (element) => getStatus(element) === statusError;
  const hasStatusNative = (element) => getStatus(element) === statusNative;

  const statusesAfterLoading = [
    statusLoading,
    statusLoaded,
    statusApplied,
    statusError,
  ];
  const hadStartedLoading = (element) =>
    statusesAfterLoading.indexOf(getStatus(element)) >= 0;

  const safeCallback = (callback, arg1, arg2, arg3) => {
    if (!callback) {
      return;
    }

    if (arg3 !== undefined) {
      callback(arg1, arg2, arg3);
      return;
    }
    if (arg2 !== undefined) {
      callback(arg1, arg2);
      return;
    }
    callback(arg1);
  };

  const addClass$1 = (element, className) => {
    if (supportsClassList) {
      element.classList.add(className);
      return;
    }
    element.className += (element.className ? " " : "") + className;
  };

  const removeClass$1 = (element, className) => {
    if (supportsClassList) {
      element.classList.remove(className);
      return;
    }
    element.className = element.className
      .replace(new RegExp("(^|\\s+)" + className + "(\\s+|$)"), " ")
      .replace(/^\s+/, "")
      .replace(/\s+$/, "");
  };

  const addTempImage = (element) => {
    element.llTempImage = document.createElement("IMG");
  };

  const deleteTempImage = (element) => {
    delete element.llTempImage;
  };

  const getTempImage = (element) => element.llTempImage;

  const unobserve = (element, instance) => {
    if (!instance) return;
    const observer = instance._observer;
    if (!observer) return;
    observer.unobserve(element);
  };

  const resetObserver = (observer) => {
    observer.disconnect();
  };

  const unobserveEntered = (element, settings, instance) => {
    if (settings.unobserve_entered) unobserve(element, instance);
  };

  const updateLoadingCount = (instance, delta) => {
    if (!instance) return;
    instance.loadingCount += delta;
  };

  const decreaseToLoadCount = (instance) => {
    if (!instance) return;
    instance.toLoadCount -= 1;
  };

  const setToLoadCount = (instance, value) => {
    if (!instance) return;
    instance.toLoadCount = value;
  };

  const isSomethingLoading = (instance) => instance.loadingCount > 0;

  const haveElementsToLoad = (instance) => instance.toLoadCount > 0;

  const getSourceTags = (parentTag) => {
    let sourceTags = [];
    for (let i = 0, childTag; (childTag = parentTag.children[i]); i += 1) {
      if (childTag.tagName === "SOURCE") {
        sourceTags.push(childTag);
      }
    }
    return sourceTags;
  };

  const setAttributeIfValue = (element, attrName, value) => {
    if (!value) {
      return;
    }
    element.setAttribute(attrName, value);
  };

  const resetAttribute = (element, attrName) => {
    element.removeAttribute(attrName);
  };

  const hasOriginalAttributes = (element) => {
    return !!element.llOriginalAttrs;
  };

  const saveOriginalImageAttributes = (element) => {
    if (hasOriginalAttributes(element)) {
      return;
    }
    const originalAttributes = {};
    originalAttributes["src"] = element.getAttribute("src");
    originalAttributes["srcset"] = element.getAttribute("srcset");
    originalAttributes["sizes"] = element.getAttribute("sizes");
    element.llOriginalAttrs = originalAttributes;
  };

  const restoreOriginalImageAttributes = (element) => {
    if (!hasOriginalAttributes(element)) {
      return;
    }
    const originalAttributes = element.llOriginalAttrs;
    setAttributeIfValue(element, "src", originalAttributes["src"]);
    setAttributeIfValue(element, "srcset", originalAttributes["srcset"]);
    setAttributeIfValue(element, "sizes", originalAttributes["sizes"]);
  };

  const setImageAttributes = (element, settings) => {
    setAttributeIfValue(
      element,
      "sizes",
      getData(element, settings.data_sizes)
    );
    setAttributeIfValue(
      element,
      "srcset",
      getData(element, settings.data_srcset)
    );
    setAttributeIfValue(element, "src", getData(element, settings.data_src));
  };

  const resetImageAttributes = (element) => {
    resetAttribute(element, "src");
    resetAttribute(element, "srcset");
    resetAttribute(element, "sizes");
  };

  const forEachPictureSource = (element, fn) => {
    const parent = element.parentNode;
    if (!parent || parent.tagName !== "PICTURE") {
      return;
    }
    let sourceTags = getSourceTags(parent);
    sourceTags.forEach(fn);
  };

  const forEachVideoSource = (element, fn) => {
    let sourceTags = getSourceTags(element);
    sourceTags.forEach(fn);
  };

  const restoreOriginalAttributesImg = (element) => {
    forEachPictureSource(element, (sourceTag) => {
      restoreOriginalImageAttributes(sourceTag);
    });
    restoreOriginalImageAttributes(element);
  };

  const setSourcesImg = (element, settings) => {
    forEachPictureSource(element, (sourceTag) => {
      saveOriginalImageAttributes(sourceTag);
      setImageAttributes(sourceTag, settings);
    });
    saveOriginalImageAttributes(element);
    setImageAttributes(element, settings);
  };

  const resetSourcesImg = (element) => {
    forEachPictureSource(element, (sourceTag) => {
      resetImageAttributes(sourceTag);
    });
    resetImageAttributes(element);
  };

  const setSourcesIframe = (element, settings) => {
    setAttributeIfValue(element, "src", getData(element, settings.data_src));
  };

  const setSourcesVideo = (element, settings) => {
    forEachVideoSource(element, (sourceTag) => {
      setAttributeIfValue(
        sourceTag,
        "src",
        getData(sourceTag, settings.data_src)
      );
    });
    setAttributeIfValue(
      element,
      "poster",
      getData(element, settings.data_poster)
    );
    setAttributeIfValue(element, "src", getData(element, settings.data_src));
    element.load();
  };

  const setSourcesFunctions = {
    IMG: setSourcesImg,
    IFRAME: setSourcesIframe,
    VIDEO: setSourcesVideo,
  };

  const setBackground = (element, settings, instance) => {
    const bg1xValue = getData(element, settings.data_bg);
    const bgHiDpiValue = getData(element, settings.data_bg_hidpi);
    const bgDataValue = isHiDpi && bgHiDpiValue ? bgHiDpiValue : bg1xValue;
    if (!bgDataValue) return;
    element.style.backgroundImage = `url("${bgDataValue}")`;
    getTempImage(element).setAttribute("src", bgDataValue);
    manageLoading(element, settings, instance);
  };

  // NOTE: THE TEMP IMAGE TRICK CANNOT BE DONE WITH data-multi-bg
  // BECAUSE INSIDE ITS VALUES MUST BE WRAPPED WITH URL() AND ONE OF THEM
  // COULD BE A GRADIENT BACKGROUND IMAGE
  const setMultiBackground = (element, settings, instance) => {
    const bg1xValue = getData(element, settings.data_bg_multi);
    const bgHiDpiValue = getData(element, settings.data_bg_multi_hidpi);
    const bgDataValue = isHiDpi && bgHiDpiValue ? bgHiDpiValue : bg1xValue;
    if (!bgDataValue) {
      return;
    }
    element.style.backgroundImage = bgDataValue;
    manageApplied(element, settings, instance);
  };

  const setSources = (element, settings) => {
    const setSourcesFunction = setSourcesFunctions[element.tagName];
    if (!setSourcesFunction) {
      return;
    }
    setSourcesFunction(element, settings);
  };

  const manageApplied = (element, settings, instance) => {
    addClass$1(element, settings.class_applied);
    setStatus(element, statusApplied);
    if (settings.unobserve_completed) {
      // Unobserve now because we can't do it on load
      unobserve(element, settings);
    }
    safeCallback(settings.callback_applied, element, instance);
  };

  const manageLoading = (element, settings, instance) => {
    updateLoadingCount(instance, +1);
    addClass$1(element, settings.class_loading);
    setStatus(element, statusLoading);
    safeCallback(settings.callback_loading, element, instance);
  };

  const elementsWithLoadEvent = ["IMG", "IFRAME", "VIDEO"];
  const hasLoadEvent = (element) =>
    elementsWithLoadEvent.indexOf(element.tagName) > -1;

  const checkFinish = (settings, instance) => {
    if (
      instance &&
      !isSomethingLoading(instance) &&
      !haveElementsToLoad(instance)
    ) {
      safeCallback(settings.callback_finish, instance);
    }
  };

  const addEventListener = (element, eventName, handler) => {
    element.addEventListener(eventName, handler);
    element.llEvLisnrs[eventName] = handler;
  };

  const removeEventListener = (element, eventName, handler) => {
    element.removeEventListener(eventName, handler);
  };

  const hasEventListeners = (element) => {
    return !!element.llEvLisnrs;
  };

  const addEventListeners = (element, loadHandler, errorHandler) => {
    if (!hasEventListeners(element)) element.llEvLisnrs = {};
    const loadEventName = element.tagName === "VIDEO" ? "loadeddata" : "load";
    addEventListener(element, loadEventName, loadHandler);
    addEventListener(element, "error", errorHandler);
  };

  const removeEventListeners = (element) => {
    if (!hasEventListeners(element)) {
      return;
    }
    const eventListeners = element.llEvLisnrs;
    for (let eventName in eventListeners) {
      const handler = eventListeners[eventName];
      removeEventListener(element, eventName, handler);
    }
    delete element.llEvLisnrs;
  };

  const doneHandler = (element, settings, instance) => {
    deleteTempImage(element);
    updateLoadingCount(instance, -1);
    decreaseToLoadCount(instance);
    removeClass$1(element, settings.class_loading);
    if (settings.unobserve_completed) {
      unobserve(element, instance);
    }
  };

  const loadHandler = (event, element, settings, instance) => {
    const goingNative = hasStatusNative(element);
    doneHandler(element, settings, instance);
    addClass$1(element, settings.class_loaded);
    setStatus(element, statusLoaded);
    safeCallback(settings.callback_loaded, element, instance);
    if (!goingNative) checkFinish(settings, instance);
  };

  const errorHandler = (event, element, settings, instance) => {
    const goingNative = hasStatusNative(element);
    doneHandler(element, settings, instance);
    addClass$1(element, settings.class_error);
    setStatus(element, statusError);
    safeCallback(settings.callback_error, element, instance);
    if (!goingNative) checkFinish(settings, instance);
  };

  const addOneShotEventListeners = (element, settings, instance) => {
    const elementToListenTo = getTempImage(element) || element;
    if (hasEventListeners(elementToListenTo)) {
      // This happens when loading is retried twice
      return;
    }
    const _loadHandler = (event) => {
      loadHandler(event, element, settings, instance);
      removeEventListeners(elementToListenTo);
    };
    const _errorHandler = (event) => {
      errorHandler(event, element, settings, instance);
      removeEventListeners(elementToListenTo);
    };
    addEventListeners(elementToListenTo, _loadHandler, _errorHandler);
  };

  const loadBackground = (element, settings, instance) => {
    addTempImage(element);
    addOneShotEventListeners(element, settings, instance);
    setBackground(element, settings, instance);
    setMultiBackground(element, settings, instance);
  };

  const loadRegular = (element, settings, instance) => {
    addOneShotEventListeners(element, settings, instance);
    setSources(element, settings);
    manageLoading(element, settings, instance);
  };

  const load = (element, settings, instance) => {
    if (hasLoadEvent(element)) {
      loadRegular(element, settings, instance);
    } else {
      loadBackground(element, settings, instance);
    }
  };

  const loadNative = (element, settings, instance) => {
    addOneShotEventListeners(element, settings, instance);
    setSources(element, settings);
    setStatus(element, statusNative);
  };

  const cancelLoading = (element, entry, settings, instance) => {
    if (!settings.cancel_on_exit) return;
    if (!hasStatusLoading(element)) return;
    if (element.tagName !== "IMG") return; //Works only on images
    removeEventListeners(element);
    resetSourcesImg(element);
    restoreOriginalAttributesImg(element);
    removeClass$1(element, settings.class_loading);
    updateLoadingCount(instance, -1);
    resetStatus(element);
    safeCallback(settings.callback_cancel, element, entry, instance);
  };

  const onEnter = (element, entry, settings, instance) => {
    setStatus(element, statusEntered);
    addClass$1(element, settings.class_entered);
    removeClass$1(element, settings.class_exited);
    unobserveEntered(element, settings, instance);
    safeCallback(settings.callback_enter, element, entry, instance);
    if (hadStartedLoading(element)) return; //Prevent loading it again
    load(element, settings, instance);
  };

  const onExit = (element, entry, settings, instance) => {
    if (hasEmptyStatus(element)) return; //Ignore the first pass, at landing
    addClass$1(element, settings.class_exited);
    cancelLoading(element, entry, settings, instance);
    safeCallback(settings.callback_exit, element, entry, instance);
  };

  const tagsWithNativeLazy = ["IMG", "IFRAME"];

  const shouldUseNative = (settings) =>
    settings.use_native && "loading" in HTMLImageElement.prototype;

  const loadAllNative = (elements, settings, instance) => {
    elements.forEach((element) => {
      if (tagsWithNativeLazy.indexOf(element.tagName) === -1) {
        return;
      }
      element.setAttribute("loading", "lazy"); //TODO: Move inside the loadNative method
      loadNative(element, settings, instance);
    });
    setToLoadCount(instance, 0);
  };

  const isIntersecting = (entry) =>
    entry.isIntersecting || entry.intersectionRatio > 0;

  const getObserverSettings = (settings) => ({
    root: settings.container === document ? null : settings.container,
    rootMargin: settings.thresholds || settings.threshold + "px",
  });

  const intersectionHandler = (entries, settings, instance) => {
    entries.forEach((entry) =>
      isIntersecting(entry)
        ? onEnter(entry.target, entry, settings, instance)
        : onExit(entry.target, entry, settings, instance)
    );
  };

  const observeElements = (observer, elements) => {
    elements.forEach((element) => {
      observer.observe(element);
    });
  };

  const updateObserver = (observer, elementsToObserve) => {
    resetObserver(observer);
    observeElements(observer, elementsToObserve);
  };

  const setObserver = (settings, instance) => {
    if (!supportsIntersectionObserver || shouldUseNative(settings)) {
      return;
    }
    instance._observer = new IntersectionObserver((entries) => {
      intersectionHandler(entries, settings, instance);
    }, getObserverSettings(settings));
  };

  const toArray = (nodeSet) => Array.prototype.slice.call(nodeSet);

  const queryElements = (settings) =>
    settings.container.querySelectorAll(settings.elements_selector);

  const excludeManagedElements = (elements) =>
    toArray(elements).filter(hasEmptyStatus);

  const hasError = (element) => hasStatusError(element);
  const filterErrorElements = (elements) => toArray(elements).filter(hasError);

  const getElementsToLoad = (elements, settings) =>
    excludeManagedElements(elements || queryElements(settings));

  const retryLazyLoad = (settings, instance) => {
    const errorElements = filterErrorElements(queryElements(settings));
    errorElements.forEach((element) => {
      removeClass$1(element, settings.class_error);
      resetStatus(element);
    });
    instance.update();
  };

  const setOnlineCheck = (settings, instance) => {
    if (!runningOnBrowser) {
      return;
    }
    window.addEventListener("online", () => {
      retryLazyLoad(settings, instance);
    });
  };

  const LazyLoad = function (customSettings, elements) {
    const settings = getExtendedSettings(customSettings);
    this._settings = settings;
    this.loadingCount = 0;
    setObserver(settings, this);
    setOnlineCheck(settings, this);
    this.update(elements);
  };

  LazyLoad.prototype = {
    update: function (givenNodeset) {
      const settings = this._settings;
      const elementsToLoad = getElementsToLoad(givenNodeset, settings);
      setToLoadCount(this, elementsToLoad.length);

      if (isBot || !supportsIntersectionObserver) {
        this.loadAll(elementsToLoad);
        return;
      }
      if (shouldUseNative(settings)) {
        loadAllNative(elementsToLoad, settings, this);
        return;
      }

      updateObserver(this._observer, elementsToLoad);
    },

    destroy: function () {
      // Observer
      if (this._observer) {
        this._observer.disconnect();
      }
      // Clean custom attributes on elements
      queryElements(this._settings).forEach((element) => {
        delete element.llOriginalAttrs;
      });
      // Delete all internal props
      delete this._observer;
      delete this._settings;
      delete this.loadingCount;
      delete this.toLoadCount;
    },

    loadAll: function (elements) {
      const settings = this._settings;
      const elementsToLoad = getElementsToLoad(elements, settings);
      elementsToLoad.forEach((element) => {
        unobserve(element, this);
        load(element, settings, this);
      });
    },
  };

  LazyLoad.load = (element, customSettings) => {
    const settings = getExtendedSettings(customSettings);
    load(element, settings);
  };

  LazyLoad.resetStatus = (element) => {
    resetStatus(element);
  };

  // Automatic instances creation if required (useful for async script loading)
  if (runningOnBrowser) {
    autoInitialize(LazyLoad, window.lazyLoadOptions);
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj &&
          typeof Symbol === "function" &&
          obj.constructor === Symbol &&
          obj !== Symbol.prototype
          ? "symbol"
          : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$1(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$1(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$1(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true,
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true,
      },
    });
    if (superClass) _setPrototypeOf$1(subClass, superClass);
  }

  function _getPrototypeOf$1(o) {
    _getPrototypeOf$1 = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function _getPrototypeOf(o) {
          return o.__proto__ || Object.getPrototypeOf(o);
        };
    return _getPrototypeOf$1(o);
  }

  function _setPrototypeOf$1(o, p) {
    _setPrototypeOf$1 =
      Object.setPrototypeOf ||
      function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };

    return _setPrototypeOf$1(o, p);
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  function _assertThisInitialized$1(self) {
    if (self === void 0) {
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized$1(self);
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf$1(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  function set(target, property, value, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.set) {
      set = Reflect.set;
    } else {
      set = function set(target, property, value, receiver) {
        var base = _superPropBase(target, property);

        var desc;

        if (base) {
          desc = Object.getOwnPropertyDescriptor(base, property);

          if (desc.set) {
            desc.set.call(receiver, value);
            return true;
          } else if (!desc.writable) {
            return false;
          }
        }

        desc = Object.getOwnPropertyDescriptor(receiver, property);

        if (desc) {
          if (!desc.writable) {
            return false;
          }

          desc.value = value;
          Object.defineProperty(receiver, property, desc);
        } else {
          _defineProperty(receiver, property, value);
        }

        return true;
      };
    }

    return set(target, property, value, receiver);
  }

  function _set(target, property, value, receiver, isStrict) {
    var s = set(target, property, value, receiver || target);

    if (!s && isStrict) {
      throw new Error("failed to set property");
    }

    return value;
  }

  function _slicedToArray(arr, i) {
    return (
      _arrayWithHoles(arr) ||
      _iterableToArrayLimit(arr, i) ||
      _nonIterableRest()
    );
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (
      !(
        Symbol.iterator in Object(arr) ||
        Object.prototype.toString.call(arr) === "[object Arguments]"
      )
    ) {
      return;
    }

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (
        var _i = arr[Symbol.iterator](), _s;
        !(_n = (_s = _i.next()).done);
        _n = true
      ) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  /** Checks if value is string */
  function isString(str) {
    return typeof str === "string" || str instanceof String;
  }
  /**
      Direction
      @prop {string} NONE
      @prop {string} LEFT
      @prop {string} FORCE_LEFT
      @prop {string} RIGHT
      @prop {string} FORCE_RIGHT
    */

  var DIRECTION = {
    NONE: "NONE",
    LEFT: "LEFT",
    FORCE_LEFT: "FORCE_LEFT",
    RIGHT: "RIGHT",
    FORCE_RIGHT: "FORCE_RIGHT",
  };
  /** */

  function forceDirection(direction) {
    switch (direction) {
      case DIRECTION.LEFT:
        return DIRECTION.FORCE_LEFT;

      case DIRECTION.RIGHT:
        return DIRECTION.FORCE_RIGHT;

      default:
        return direction;
    }
  }
  /** Escapes regular expression control chars */

  function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1");
  } // cloned from https://github.com/epoberezkin/fast-deep-equal with small changes

  function objectIncludes(b, a) {
    if (a === b) return true;
    var arrA = Array.isArray(a),
      arrB = Array.isArray(b),
      i;

    if (arrA && arrB) {
      if (a.length != b.length) return false;

      for (i = 0; i < a.length; i++) {
        if (!objectIncludes(a[i], b[i])) return false;
      }

      return true;
    }

    if (arrA != arrB) return false;

    if (a && b && _typeof(a) === "object" && _typeof(b) === "object") {
      var dateA = a instanceof Date,
        dateB = b instanceof Date;
      if (dateA && dateB) return a.getTime() == b.getTime();
      if (dateA != dateB) return false;
      var regexpA = a instanceof RegExp,
        regexpB = b instanceof RegExp;
      if (regexpA && regexpB) return a.toString() == b.toString();
      if (regexpA != regexpB) return false;
      var keys = Object.keys(a); // if (keys.length !== Object.keys(b).length) return false;

      for (i = 0; i < keys.length; i++) {
        if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
      }

      for (i = 0; i < keys.length; i++) {
        if (!objectIncludes(b[keys[i]], a[keys[i]])) return false;
      }

      return true;
    } else if (a && b && typeof a === "function" && typeof b === "function") {
      return a.toString() === b.toString();
    }

    return false;
  }

  /** Provides details of changing input */

  var ActionDetails =
    /*#__PURE__*/
    (function () {
      /** Current input value */

      /** Current cursor position */

      /** Old input value */

      /** Old selection */
      function ActionDetails(value, cursorPos, oldValue, oldSelection) {
        _classCallCheck(this, ActionDetails);

        this.value = value;
        this.cursorPos = cursorPos;
        this.oldValue = oldValue;
        this.oldSelection = oldSelection; // double check if left part was changed (autofilling, other non-standard input triggers)

        while (
          this.value.slice(0, this.startChangePos) !==
          this.oldValue.slice(0, this.startChangePos)
        ) {
          --this.oldSelection.start;
        }
      }
      /**
        Start changing position
        @readonly
      */

      _createClass$1(ActionDetails, [
        {
          key: "startChangePos",
          get: function get() {
            return Math.min(this.cursorPos, this.oldSelection.start);
          },
          /**
          Inserted symbols count
          @readonly
        */
        },
        {
          key: "insertedCount",
          get: function get() {
            return this.cursorPos - this.startChangePos;
          },
          /**
          Inserted symbols
          @readonly
        */
        },
        {
          key: "inserted",
          get: function get() {
            return this.value.substr(this.startChangePos, this.insertedCount);
          },
          /**
          Removed symbols count
          @readonly
        */
        },
        {
          key: "removedCount",
          get: function get() {
            // Math.max for opposite operation
            return Math.max(
              this.oldSelection.end - this.startChangePos || // for Delete
                this.oldValue.length - this.value.length,
              0
            );
          },
          /**
          Removed symbols
          @readonly
        */
        },
        {
          key: "removed",
          get: function get() {
            return this.oldValue.substr(this.startChangePos, this.removedCount);
          },
          /**
          Unchanged head symbols
          @readonly
        */
        },
        {
          key: "head",
          get: function get() {
            return this.value.substring(0, this.startChangePos);
          },
          /**
          Unchanged tail symbols
          @readonly
        */
        },
        {
          key: "tail",
          get: function get() {
            return this.value.substring(
              this.startChangePos + this.insertedCount
            );
          },
          /**
          Remove direction
          @readonly
        */
        },
        {
          key: "removeDirection",
          get: function get() {
            if (!this.removedCount || this.insertedCount) return DIRECTION.NONE; // align right if delete at right or if range removed (event with backspace)

            return this.oldSelection.end === this.cursorPos ||
              this.oldSelection.start === this.cursorPos
              ? DIRECTION.RIGHT
              : DIRECTION.LEFT;
          },
        },
      ]);

      return ActionDetails;
    })();

  /**
      Provides details of changing model value
      @param {Object} [details]
      @param {string} [details.inserted] - Inserted symbols
      @param {boolean} [details.skip] - Can skip chars
      @param {number} [details.removeCount] - Removed symbols count
      @param {number} [details.tailShift] - Additional offset if any changes occurred before tail
    */
  var ChangeDetails =
    /*#__PURE__*/
    (function () {
      /** Inserted symbols */

      /** Can skip chars */

      /** Additional offset if any changes occurred before tail */

      /** Raw inserted is used by dynamic mask */
      function ChangeDetails(details) {
        _classCallCheck(this, ChangeDetails);

        Object.assign(
          this,
          {
            inserted: "",
            rawInserted: "",
            skip: false,
            tailShift: 0,
          },
          details
        );
      }
      /**
        Aggregate changes
        @returns {ChangeDetails} `this`
      */

      _createClass$1(ChangeDetails, [
        {
          key: "aggregate",
          value: function aggregate(details) {
            this.rawInserted += details.rawInserted;
            this.skip = this.skip || details.skip;
            this.inserted += details.inserted;
            this.tailShift += details.tailShift;
            return this;
          },
          /** Total offset considering all changes */
        },
        {
          key: "offset",
          get: function get() {
            return this.tailShift + this.inserted.length;
          },
        },
      ]);

      return ChangeDetails;
    })();

  /** Provides details of continuous extracted tail */
  var ContinuousTailDetails =
    /*#__PURE__*/
    (function () {
      /** Tail value as string */

      /** Tail start position */

      /** Start position */
      function ContinuousTailDetails() {
        var value =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : "";
        var from =
          arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var stop = arguments.length > 2 ? arguments[2] : undefined;

        _classCallCheck(this, ContinuousTailDetails);

        this.value = value;
        this.from = from;
        this.stop = stop;
      }

      _createClass$1(ContinuousTailDetails, [
        {
          key: "toString",
          value: function toString() {
            return this.value;
          },
        },
        {
          key: "extend",
          value: function extend(tail) {
            this.value += String(tail);
          },
        },
        {
          key: "appendTo",
          value: function appendTo(masked) {
            return masked
              .append(this.toString(), {
                tail: true,
              })
              .aggregate(masked._appendPlaceholder());
          },
        },
        {
          key: "shiftBefore",
          value: function shiftBefore(pos) {
            if (this.from >= pos || !this.value.length) return "";
            var shiftChar = this.value[0];
            this.value = this.value.slice(1);
            return shiftChar;
          },
        },
        {
          key: "state",
          get: function get() {
            return {
              value: this.value,
              from: this.from,
              stop: this.stop,
            };
          },
          set: function set(state) {
            Object.assign(this, state);
          },
        },
      ]);

      return ContinuousTailDetails;
    })();

  /**
   * Applies mask on element.
   * @constructor
   * @param {HTMLInputElement|HTMLTextAreaElement|MaskElement} el - Element to apply mask
   * @param {Object} opts - Custom mask options
   * @return {InputMask}
   */
  function IMask(el) {
    var opts =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    // currently available only for input-like elements
    return new IMask.InputMask(el, opts);
  }

  /** Supported mask type */

  /** Provides common masking stuff */
  var Masked =
    /*#__PURE__*/
    (function () {
      // $Shape<MaskedOptions>; TODO after fix https://github.com/facebook/flow/issues/4773

      /** @type {Mask} */

      /** */
      // $FlowFixMe no ideas

      /** Transforms value before mask processing */

      /** Validates if value is acceptable */

      /** Does additional processing in the end of editing */

      /** Format typed value to string */

      /** Parse strgin to get typed value */

      /** Enable characters overwriting */

      /** */
      function Masked(opts) {
        _classCallCheck(this, Masked);

        this._value = "";

        this._update(Object.assign({}, Masked.DEFAULTS, {}, opts));

        this.isInitialized = true;
      }
      /** Sets and applies new options */

      _createClass$1(Masked, [
        {
          key: "updateOptions",
          value: function updateOptions(opts) {
            if (!Object.keys(opts).length) return;
            this.withValueRefresh(this._update.bind(this, opts));
          },
          /**
          Sets new options
          @protected
        */
        },
        {
          key: "_update",
          value: function _update(opts) {
            Object.assign(this, opts);
          },
          /** Mask state */
        },
        {
          key: "reset",

          /** Resets value */
          value: function reset() {
            this._value = "";
          },
          /** */
        },
        {
          key: "resolve",

          /** Resolve new value */
          value: function resolve(value) {
            this.reset();
            this.append(
              value,
              {
                input: true,
              },
              ""
            );
            this.doCommit();
            return this.value;
          },
          /** */
        },
        {
          key: "nearestInputPos",

          /** Finds nearest input position in direction */
          value: function nearestInputPos(cursorPos, direction) {
            return cursorPos;
          },
          /** Extracts value in range considering flags */
        },
        {
          key: "extractInput",
          value: function extractInput() {
            var fromPos =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : 0;
            var toPos =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : this.value.length;
            return this.value.slice(fromPos, toPos);
          },
          /** Extracts tail in range */
        },
        {
          key: "extractTail",
          value: function extractTail() {
            var fromPos =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : 0;
            var toPos =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : this.value.length;
            return new ContinuousTailDetails(
              this.extractInput(fromPos, toPos),
              fromPos
            );
          },
          /** Appends tail */
          // $FlowFixMe no ideas
        },
        {
          key: "appendTail",
          value: function appendTail(tail) {
            if (isString(tail)) tail = new ContinuousTailDetails(String(tail));
            return tail.appendTo(this);
          },
          /** Appends char */
        },
        {
          key: "_appendCharRaw",
          value: function _appendCharRaw(ch) {
            var flags =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : {};
            ch = this.doPrepare(ch, flags);
            if (!ch) return new ChangeDetails();
            this._value += ch;
            return new ChangeDetails({
              inserted: ch,
              rawInserted: ch,
            });
          },
          /** Appends char */
        },
        {
          key: "_appendChar",
          value: function _appendChar(ch) {
            var flags =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : {};
            var checkTail = arguments.length > 2 ? arguments[2] : undefined;
            var consistentState = this.state;

            var details = this._appendCharRaw(ch, flags);

            if (details.inserted) {
              var consistentTail;
              var appended = this.doValidate(flags) !== false;

              if (appended && checkTail != null) {
                // validation ok, check tail
                var beforeTailState = this.state;

                if (this.overwrite) {
                  consistentTail = checkTail.state;
                  checkTail.shiftBefore(this.value.length);
                }

                var tailDetails = this.appendTail(checkTail);
                appended = tailDetails.rawInserted === checkTail.toString(); // if ok, rollback state after tail

                if (appended && tailDetails.inserted)
                  this.state = beforeTailState;
              } // revert all if something went wrong

              if (!appended) {
                details = new ChangeDetails();
                this.state = consistentState;
                if (checkTail && consistentTail)
                  checkTail.state = consistentTail;
              }
            }

            return details;
          },
          /** Appends optional placeholder at end */
        },
        {
          key: "_appendPlaceholder",
          value: function _appendPlaceholder() {
            return new ChangeDetails();
          },
          /** Appends symbols considering flags */
          // $FlowFixMe no ideas
        },
        {
          key: "append",
          value: function append(str, flags, tail) {
            if (!isString(str)) throw new Error("value should be string");
            var details = new ChangeDetails();
            var checkTail = isString(tail)
              ? new ContinuousTailDetails(String(tail))
              : tail;
            if (flags.tail) flags._beforeTailState = this.state;

            for (var ci = 0; ci < str.length; ++ci) {
              details.aggregate(this._appendChar(str[ci], flags, checkTail));
            } // append tail but aggregate only tailShift

            if (checkTail != null) {
              details.tailShift += this.appendTail(checkTail).tailShift; // TODO it's a good idea to clear state after appending ends
              // but it causes bugs when one append calls another (when dynamic dispatch set rawInputValue)
              // this._resetBeforeTailState();
            }

            return details;
          },
          /** */
        },
        {
          key: "remove",
          value: function remove() {
            var fromPos =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : 0;
            var toPos =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : this.value.length;
            this._value =
              this.value.slice(0, fromPos) + this.value.slice(toPos);
            return new ChangeDetails();
          },
          /** Calls function and reapplies current value */
        },
        {
          key: "withValueRefresh",
          value: function withValueRefresh(fn) {
            if (this._refreshing || !this.isInitialized) return fn();
            this._refreshing = true;
            var rawInput = this.rawInputValue;
            var value = this.value;
            var ret = fn();
            this.rawInputValue = rawInput; // append lost trailing chars at end

            if (this.value !== value && value.indexOf(this.value) === 0) {
              this.append(value.slice(this.value.length), {}, "");
            }

            delete this._refreshing;
            return ret;
          },
          /** */
        },
        {
          key: "runIsolated",
          value: function runIsolated(fn) {
            if (this._isolated || !this.isInitialized) return fn(this);
            this._isolated = true;
            var state = this.state;
            var ret = fn(this);
            this.state = state;
            delete this._isolated;
            return ret;
          },
          /**
          Prepares string before mask processing
          @protected
        */
        },
        {
          key: "doPrepare",
          value: function doPrepare(str) {
            var flags =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : {};
            return this.prepare ? this.prepare(str, this, flags) : str;
          },
          /**
          Validates if value is acceptable
          @protected
        */
        },
        {
          key: "doValidate",
          value: function doValidate(flags) {
            return (
              (!this.validate || this.validate(this.value, this, flags)) &&
              (!this.parent || this.parent.doValidate(flags))
            );
          },
          /**
          Does additional processing in the end of editing
          @protected
        */
        },
        {
          key: "doCommit",
          value: function doCommit() {
            if (this.commit) this.commit(this.value, this);
          },
          /** */
        },
        {
          key: "doFormat",
          value: function doFormat(value) {
            return this.format ? this.format(value, this) : value;
          },
          /** */
        },
        {
          key: "doParse",
          value: function doParse(str) {
            return this.parse ? this.parse(str, this) : str;
          },
          /** */
        },
        {
          key: "splice",
          value: function splice(
            start,
            deleteCount,
            inserted,
            removeDirection
          ) {
            var tailPos = start + deleteCount;
            var tail = this.extractTail(tailPos);
            var startChangePos = this.nearestInputPos(start, removeDirection);
            var changeDetails = new ChangeDetails({
              tailShift: startChangePos - start, // adjust tailShift if start was aligned
            })
              .aggregate(this.remove(startChangePos))
              .aggregate(
                this.append(
                  inserted,
                  {
                    input: true,
                  },
                  tail
                )
              );
            return changeDetails;
          },
        },
        {
          key: "state",
          get: function get() {
            return {
              _value: this.value,
            };
          },
          set: function set(state) {
            this._value = state._value;
          },
        },
        {
          key: "value",
          get: function get() {
            return this._value;
          },
          set: function set(value) {
            this.resolve(value);
          },
        },
        {
          key: "unmaskedValue",
          get: function get() {
            return this.value;
          },
          set: function set(value) {
            this.reset();
            this.append(value, {}, "");
            this.doCommit();
          },
          /** */
        },
        {
          key: "typedValue",
          get: function get() {
            return this.doParse(this.value);
          },
          set: function set(value) {
            this.value = this.doFormat(value);
          },
          /** Value that includes raw user input */
        },
        {
          key: "rawInputValue",
          get: function get() {
            return this.extractInput(0, this.value.length, {
              raw: true,
            });
          },
          set: function set(value) {
            this.reset();
            this.append(
              value,
              {
                raw: true,
              },
              ""
            );
            this.doCommit();
          },
          /** */
        },
        {
          key: "isComplete",
          get: function get() {
            return true;
          },
        },
      ]);

      return Masked;
    })();
  Masked.DEFAULTS = {
    format: function format(v) {
      return v;
    },
    parse: function parse(v) {
      return v;
    },
  };
  IMask.Masked = Masked;

  /** Get Masked class by mask type */

  function maskedClass(mask) {
    if (mask == null) {
      throw new Error("mask property should be defined");
    } // $FlowFixMe

    if (mask instanceof RegExp) return IMask.MaskedRegExp; // $FlowFixMe

    if (isString(mask)) return IMask.MaskedPattern; // $FlowFixMe

    if (mask instanceof Date || mask === Date) return IMask.MaskedDate; // $FlowFixMe

    if (mask instanceof Number || typeof mask === "number" || mask === Number)
      return IMask.MaskedNumber; // $FlowFixMe

    if (Array.isArray(mask) || mask === Array) return IMask.MaskedDynamic; // $FlowFixMe

    if (IMask.Masked && mask.prototype instanceof IMask.Masked) return mask; // $FlowFixMe

    if (mask instanceof Function) return IMask.MaskedFunction; // $FlowFixMe

    if (mask instanceof IMask.Masked) return mask.constructor;
    console.warn("Mask not found for mask", mask); // eslint-disable-line no-console
    // $FlowFixMe

    return IMask.Masked;
  }
  /** Creates new {@link Masked} depending on mask type */

  function createMask(opts) {
    // $FlowFixMe
    if (IMask.Masked && opts instanceof IMask.Masked) return opts;
    opts = Object.assign({}, opts);
    var mask = opts.mask; // $FlowFixMe

    if (IMask.Masked && mask instanceof IMask.Masked) return mask;
    var MaskedClass = maskedClass(mask);
    if (!MaskedClass)
      throw new Error(
        "Masked class is not found for provided mask, appropriate module needs to be import manually before creating mask."
      );
    return new MaskedClass(opts);
  }
  IMask.createMask = createMask;

  var DEFAULT_INPUT_DEFINITIONS = {
    0: /\d/,
    a: /[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
    // http://stackoverflow.com/a/22075070
    "*": /./,
  };
  /** */

  var PatternInputDefinition =
    /*#__PURE__*/
    (function () {
      /** */

      /** */

      /** */

      /** */

      /** */

      /** */
      function PatternInputDefinition(opts) {
        _classCallCheck(this, PatternInputDefinition);

        var mask = opts.mask,
          blockOpts = _objectWithoutProperties(opts, ["mask"]);

        this.masked = createMask({
          mask: mask,
        });
        Object.assign(this, blockOpts);
      }

      _createClass$1(PatternInputDefinition, [
        {
          key: "reset",
          value: function reset() {
            this._isFilled = false;
            this.masked.reset();
          },
        },
        {
          key: "remove",
          value: function remove() {
            var fromPos =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : 0;
            var toPos =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : this.value.length;

            if (fromPos === 0 && toPos >= 1) {
              this._isFilled = false;
              return this.masked.remove(fromPos, toPos);
            }

            return new ChangeDetails();
          },
        },
        {
          key: "_appendChar",
          value: function _appendChar(str) {
            var flags =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : {};
            if (this._isFilled) return new ChangeDetails();
            var state = this.masked.state; // simulate input

            var details = this.masked._appendChar(str, flags);

            if (details.inserted && this.doValidate(flags) === false) {
              details.inserted = details.rawInserted = "";
              this.masked.state = state;
            }

            if (
              !details.inserted &&
              !this.isOptional &&
              !this.lazy &&
              !flags.input
            ) {
              details.inserted = this.placeholderChar;
            }

            details.skip = !details.inserted && !this.isOptional;
            this._isFilled = Boolean(details.inserted);
            return details;
          },
        },
        {
          key: "append",
          value: function append() {
            var _this$masked;

            return (_this$masked = this.masked).append.apply(
              _this$masked,
              arguments
            );
          },
        },
        {
          key: "_appendPlaceholder",
          value: function _appendPlaceholder() {
            var details = new ChangeDetails();
            if (this._isFilled || this.isOptional) return details;
            this._isFilled = true;
            details.inserted = this.placeholderChar;
            return details;
          },
        },
        {
          key: "extractTail",
          value: function extractTail() {
            var _this$masked2;

            return (_this$masked2 = this.masked).extractTail.apply(
              _this$masked2,
              arguments
            );
          },
        },
        {
          key: "appendTail",
          value: function appendTail() {
            var _this$masked3;

            return (_this$masked3 = this.masked).appendTail.apply(
              _this$masked3,
              arguments
            );
          },
        },
        {
          key: "extractInput",
          value: function extractInput() {
            var fromPos =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : 0;
            var toPos =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : this.value.length;
            var flags = arguments.length > 2 ? arguments[2] : undefined;
            return this.masked.extractInput(fromPos, toPos, flags);
          },
        },
        {
          key: "nearestInputPos",
          value: function nearestInputPos(cursorPos) {
            var direction =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : DIRECTION.NONE;
            var minPos = 0;
            var maxPos = this.value.length;
            var boundPos = Math.min(Math.max(cursorPos, minPos), maxPos);

            switch (direction) {
              case DIRECTION.LEFT:
              case DIRECTION.FORCE_LEFT:
                return this.isComplete ? boundPos : minPos;

              case DIRECTION.RIGHT:
              case DIRECTION.FORCE_RIGHT:
                return this.isComplete ? boundPos : maxPos;

              case DIRECTION.NONE:
              default:
                return boundPos;
            }
          },
        },
        {
          key: "doValidate",
          value: function doValidate() {
            var _this$masked4, _this$parent;

            return (
              (_this$masked4 = this.masked).doValidate.apply(
                _this$masked4,
                arguments
              ) &&
              (!this.parent ||
                (_this$parent = this.parent).doValidate.apply(
                  _this$parent,
                  arguments
                ))
            );
          },
        },
        {
          key: "doCommit",
          value: function doCommit() {
            this.masked.doCommit();
          },
        },
        {
          key: "value",
          get: function get() {
            return (
              this.masked.value ||
              (this._isFilled && !this.isOptional ? this.placeholderChar : "")
            );
          },
        },
        {
          key: "unmaskedValue",
          get: function get() {
            return this.masked.unmaskedValue;
          },
        },
        {
          key: "isComplete",
          get: function get() {
            return Boolean(this.masked.value) || this.isOptional;
          },
        },
        {
          key: "state",
          get: function get() {
            return {
              masked: this.masked.state,
              _isFilled: this._isFilled,
            };
          },
          set: function set(state) {
            this.masked.state = state.masked;
            this._isFilled = state._isFilled;
          },
        },
      ]);

      return PatternInputDefinition;
    })();

  var PatternFixedDefinition =
    /*#__PURE__*/
    (function () {
      /** */

      /** */

      /** */

      /** */
      function PatternFixedDefinition(opts) {
        _classCallCheck(this, PatternFixedDefinition);

        Object.assign(this, opts);
        this._value = "";
      }

      _createClass$1(PatternFixedDefinition, [
        {
          key: "reset",
          value: function reset() {
            this._isRawInput = false;
            this._value = "";
          },
        },
        {
          key: "remove",
          value: function remove() {
            var fromPos =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : 0;
            var toPos =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : this._value.length;
            this._value =
              this._value.slice(0, fromPos) + this._value.slice(toPos);
            if (!this._value) this._isRawInput = false;
            return new ChangeDetails();
          },
        },
        {
          key: "nearestInputPos",
          value: function nearestInputPos(cursorPos) {
            var direction =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : DIRECTION.NONE;
            var minPos = 0;
            var maxPos = this._value.length;

            switch (direction) {
              case DIRECTION.LEFT:
              case DIRECTION.FORCE_LEFT:
                return minPos;

              case DIRECTION.NONE:
              case DIRECTION.RIGHT:
              case DIRECTION.FORCE_RIGHT:
              default:
                return maxPos;
            }
          },
        },
        {
          key: "extractInput",
          value: function extractInput() {
            var fromPos =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : 0;
            var toPos =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : this._value.length;
            var flags =
              arguments.length > 2 && arguments[2] !== undefined
                ? arguments[2]
                : {};
            return (
              (flags.raw &&
                this._isRawInput &&
                this._value.slice(fromPos, toPos)) ||
              ""
            );
          },
        },
        {
          key: "_appendChar",
          value: function _appendChar(str) {
            var flags =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : {};
            var details = new ChangeDetails();
            if (this._value) return details;
            var appended = this.char === str[0];
            var isResolved =
              appended &&
              (this.isUnmasking || flags.input || flags.raw) &&
              !flags.tail;
            if (isResolved) details.rawInserted = this.char;
            this._value = details.inserted = this.char;
            this._isRawInput = isResolved && (flags.raw || flags.input);
            return details;
          },
        },
        {
          key: "_appendPlaceholder",
          value: function _appendPlaceholder() {
            var details = new ChangeDetails();
            if (this._value) return details;
            this._value = details.inserted = this.char;
            return details;
          },
        },
        {
          key: "extractTail",
          value: function extractTail() {
            var toPos =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : this.value.length;
            return new ContinuousTailDetails("");
          }, // $FlowFixMe no ideas
        },
        {
          key: "appendTail",
          value: function appendTail(tail) {
            if (isString(tail)) tail = new ContinuousTailDetails(String(tail));
            return tail.appendTo(this);
          },
        },
        {
          key: "append",
          value: function append(str, flags, tail) {
            var details = this._appendChar(str, flags);

            if (tail != null) {
              details.tailShift += this.appendTail(tail).tailShift;
            }

            return details;
          },
        },
        {
          key: "doCommit",
          value: function doCommit() {},
        },
        {
          key: "value",
          get: function get() {
            return this._value;
          },
        },
        {
          key: "unmaskedValue",
          get: function get() {
            return this.isUnmasking ? this.value : "";
          },
        },
        {
          key: "isComplete",
          get: function get() {
            return true;
          },
        },
        {
          key: "state",
          get: function get() {
            return {
              _value: this._value,
              _isRawInput: this._isRawInput,
            };
          },
          set: function set(state) {
            Object.assign(this, state);
          },
        },
      ]);

      return PatternFixedDefinition;
    })();

  var ChunksTailDetails =
    /*#__PURE__*/
    (function () {
      /** */
      function ChunksTailDetails() {
        var chunks =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : [];
        var from =
          arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        _classCallCheck(this, ChunksTailDetails);

        this.chunks = chunks;
        this.from = from;
      }

      _createClass$1(ChunksTailDetails, [
        {
          key: "toString",
          value: function toString() {
            return this.chunks.map(String).join("");
          }, // $FlowFixMe no ideas
        },
        {
          key: "extend",
          value: function extend(tailChunk) {
            if (!String(tailChunk)) return;
            if (isString(tailChunk))
              tailChunk = new ContinuousTailDetails(String(tailChunk));
            var lastChunk = this.chunks[this.chunks.length - 1];
            var extendLast =
              lastChunk && // if stops are same or tail has no stop
              (lastChunk.stop === tailChunk.stop || tailChunk.stop == null) && // if tail chunk goes just after last chunk
              tailChunk.from === lastChunk.from + lastChunk.toString().length;

            if (tailChunk instanceof ContinuousTailDetails) {
              // check the ability to extend previous chunk
              if (extendLast) {
                // extend previous chunk
                lastChunk.extend(tailChunk.toString());
              } else {
                // append new chunk
                this.chunks.push(tailChunk);
              }
            } else if (tailChunk instanceof ChunksTailDetails) {
              if (tailChunk.stop == null) {
                // unwrap floating chunks to parent, keeping `from` pos
                var firstTailChunk;

                while (
                  tailChunk.chunks.length &&
                  tailChunk.chunks[0].stop == null
                ) {
                  firstTailChunk = tailChunk.chunks.shift();
                  firstTailChunk.from += tailChunk.from;
                  this.extend(firstTailChunk);
                }
              } // if tail chunk still has value

              if (tailChunk.toString()) {
                // if chunks contains stops, then popup stop to container
                tailChunk.stop = tailChunk.blockIndex;
                this.chunks.push(tailChunk);
              }
            }
          },
        },
        {
          key: "appendTo",
          value: function appendTo(masked) {
            // $FlowFixMe
            if (!(masked instanceof IMask.MaskedPattern)) {
              var tail = new ContinuousTailDetails(this.toString());
              return tail.appendTo(masked);
            }

            var details = new ChangeDetails();

            for (var ci = 0; ci < this.chunks.length && !details.skip; ++ci) {
              var chunk = this.chunks[ci];

              var lastBlockIter = masked._mapPosToBlock(masked.value.length);

              var stop = chunk.stop;
              var chunkBlock = void 0;

              if (
                stop != null && // if block not found or stop is behind lastBlock
                (!lastBlockIter || lastBlockIter.index <= stop)
              ) {
                if (
                  chunk instanceof ChunksTailDetails || // for continuous block also check if stop is exist
                  masked._stops.indexOf(stop) >= 0
                ) {
                  details.aggregate(masked._appendPlaceholder(stop));
                }

                chunkBlock =
                  chunk instanceof ChunksTailDetails && masked._blocks[stop];
              }

              if (chunkBlock) {
                var tailDetails = chunkBlock.appendTail(chunk);
                tailDetails.skip = false; // always ignore skip, it will be set on last

                details.aggregate(tailDetails);
                masked._value += tailDetails.inserted; // get not inserted chars

                var remainChars = chunk
                  .toString()
                  .slice(tailDetails.rawInserted.length);
                if (remainChars)
                  details.aggregate(
                    masked.append(remainChars, {
                      tail: true,
                    })
                  );
              } else {
                details.aggregate(
                  masked.append(chunk.toString(), {
                    tail: true,
                  })
                );
              }
            }
            return details;
          },
        },
        {
          key: "shiftBefore",
          value: function shiftBefore(pos) {
            if (this.from >= pos || !this.chunks.length) return "";
            var chunkShiftPos = pos - this.from;
            var ci = 0;

            while (ci < this.chunks.length) {
              var chunk = this.chunks[ci];
              var shiftChar = chunk.shiftBefore(chunkShiftPos);

              if (chunk.toString()) {
                // chunk still contains value
                // but not shifted - means no more available chars to shift
                if (!shiftChar) break;
                ++ci;
              } else {
                // clean if chunk has no value
                this.chunks.splice(ci, 1);
              }

              if (shiftChar) return shiftChar;
            }

            return "";
          },
        },
        {
          key: "state",
          get: function get() {
            return {
              chunks: this.chunks.map(function (c) {
                return c.state;
              }),
              from: this.from,
              stop: this.stop,
              blockIndex: this.blockIndex,
            };
          },
          set: function set(state) {
            var chunks = state.chunks,
              props = _objectWithoutProperties(state, ["chunks"]);

            Object.assign(this, props);
            this.chunks = chunks.map(function (cstate) {
              var chunk =
                "chunks" in cstate
                  ? new ChunksTailDetails()
                  : new ContinuousTailDetails(); // $FlowFixMe already checked above

              chunk.state = cstate;
              return chunk;
            });
          },
        },
      ]);

      return ChunksTailDetails;
    })();

  /** Masking by RegExp */

  var MaskedRegExp =
    /*#__PURE__*/
    (function (_Masked) {
      _inherits(MaskedRegExp, _Masked);

      function MaskedRegExp() {
        _classCallCheck(this, MaskedRegExp);

        return _possibleConstructorReturn(
          this,
          _getPrototypeOf$1(MaskedRegExp).apply(this, arguments)
        );
      }

      _createClass$1(MaskedRegExp, [
        {
          key: "_update",

          /**
          @override
          @param {Object} opts
        */
          value: function _update(opts) {
            if (opts.mask)
              opts.validate = function (value) {
                return value.search(opts.mask) >= 0;
              };

            _get(
              _getPrototypeOf$1(MaskedRegExp.prototype),
              "_update",
              this
            ).call(this, opts);
          },
        },
      ]);

      return MaskedRegExp;
    })(Masked);
  IMask.MaskedRegExp = MaskedRegExp;

  /**
      Pattern mask
      @param {Object} opts
      @param {Object} opts.blocks
      @param {Object} opts.definitions
      @param {string} opts.placeholderChar
      @param {boolean} opts.lazy
    */
  var MaskedPattern =
    /*#__PURE__*/
    (function (_Masked) {
      _inherits(MaskedPattern, _Masked);

      /** */

      /** */

      /** Single char for empty input */

      /** Show placeholder only when needed */
      function MaskedPattern() {
        var opts =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : {};

        _classCallCheck(this, MaskedPattern);

        // TODO type $Shape<MaskedPatternOptions>={} does not work
        opts.definitions = Object.assign(
          {},
          DEFAULT_INPUT_DEFINITIONS,
          opts.definitions
        );
        return _possibleConstructorReturn(
          this,
          _getPrototypeOf$1(MaskedPattern).call(
            this,
            Object.assign({}, MaskedPattern.DEFAULTS, {}, opts)
          )
        );
      }
      /**
        @override
        @param {Object} opts
      */

      _createClass$1(MaskedPattern, [
        {
          key: "_update",
          value: function _update() {
            var opts =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : {};
            opts.definitions = Object.assign(
              {},
              this.definitions,
              opts.definitions
            );

            _get(
              _getPrototypeOf$1(MaskedPattern.prototype),
              "_update",
              this
            ).call(this, opts);

            this._rebuildMask();
          },
          /** */
        },
        {
          key: "_rebuildMask",
          value: function _rebuildMask() {
            var _this = this;

            var defs = this.definitions;
            this._blocks = [];
            this._stops = [];
            this._maskedBlocks = {};
            var pattern = this.mask;
            if (!pattern || !defs) return;
            var unmaskingBlock = false;
            var optionalBlock = false;

            for (var i = 0; i < pattern.length; ++i) {
              if (this.blocks) {
                var _ret = (function () {
                  var p = pattern.slice(i);
                  var bNames = Object.keys(_this.blocks).filter(function (
                    bName
                  ) {
                    return p.indexOf(bName) === 0;
                  }); // order by key length

                  bNames.sort(function (a, b) {
                    return b.length - a.length;
                  }); // use block name with max length

                  var bName = bNames[0];

                  if (bName) {
                    var maskedBlock = createMask(
                      Object.assign(
                        {
                          parent: _this,
                          lazy: _this.lazy,
                          placeholderChar: _this.placeholderChar,
                          overwrite: _this.overwrite,
                        },
                        _this.blocks[bName]
                      )
                    );

                    if (maskedBlock) {
                      _this._blocks.push(maskedBlock); // store block index

                      if (!_this._maskedBlocks[bName])
                        _this._maskedBlocks[bName] = [];

                      _this._maskedBlocks[bName].push(_this._blocks.length - 1);
                    }

                    i += bName.length - 1;
                    return "continue";
                  }
                })();

                if (_ret === "continue") continue;
              }

              var char = pattern[i];

              var _isInput = char in defs;

              if (char === MaskedPattern.STOP_CHAR) {
                this._stops.push(this._blocks.length);

                continue;
              }

              if (char === "{" || char === "}") {
                unmaskingBlock = !unmaskingBlock;
                continue;
              }

              if (char === "[" || char === "]") {
                optionalBlock = !optionalBlock;
                continue;
              }

              if (char === MaskedPattern.ESCAPE_CHAR) {
                ++i;
                char = pattern[i];
                if (!char) break;
                _isInput = false;
              }

              var def = _isInput
                ? new PatternInputDefinition({
                    parent: this,
                    lazy: this.lazy,
                    placeholderChar: this.placeholderChar,
                    mask: defs[char],
                    isOptional: optionalBlock,
                  })
                : new PatternFixedDefinition({
                    char: char,
                    isUnmasking: unmaskingBlock,
                  });

              this._blocks.push(def);
            }
          },
          /**
          @override
        */
        },
        {
          key: "reset",

          /**
          @override
        */
          value: function reset() {
            _get(
              _getPrototypeOf$1(MaskedPattern.prototype),
              "reset",
              this
            ).call(this);

            this._blocks.forEach(function (b) {
              return b.reset();
            });
          },
          /**
          @override
        */
        },
        {
          key: "doCommit",

          /**
          @override
        */
          value: function doCommit() {
            this._blocks.forEach(function (b) {
              return b.doCommit();
            });

            _get(
              _getPrototypeOf$1(MaskedPattern.prototype),
              "doCommit",
              this
            ).call(this);
          },
          /**
          @override
        */
        },
        {
          key: "appendTail",

          /**
          @override
        */
          value: function appendTail(tail) {
            return _get(
              _getPrototypeOf$1(MaskedPattern.prototype),
              "appendTail",
              this
            )
              .call(this, tail)
              .aggregate(this._appendPlaceholder());
          },
          /**
          @override
        */
        },
        {
          key: "_appendCharRaw",
          value: function _appendCharRaw(ch) {
            var flags =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : {};
            ch = this.doPrepare(ch, flags);

            var blockIter = this._mapPosToBlock(this.value.length);

            var details = new ChangeDetails();
            if (!blockIter) return details;

            for (var bi = blockIter.index; ; ++bi) {
              var _block = this._blocks[bi];
              if (!_block) break;

              var blockDetails = _block._appendChar(ch, flags);

              var skip = blockDetails.skip;
              details.aggregate(blockDetails);
              if (skip || blockDetails.rawInserted) break; // go next char
            }

            return details;
          },
          /**
          @override
        */
        },
        {
          key: "extractTail",
          value: function extractTail() {
            var _this2 = this;

            var fromPos =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : 0;
            var toPos =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : this.value.length;
            var chunkTail = new ChunksTailDetails();
            if (fromPos === toPos) return chunkTail;

            this._forEachBlocksInRange(
              fromPos,
              toPos,
              function (b, bi, bFromPos, bToPos) {
                var blockChunk = b.extractTail(bFromPos, bToPos);
                blockChunk.stop = _this2._findStopBefore(bi);
                blockChunk.from = _this2._blockStartPos(bi);
                if (blockChunk instanceof ChunksTailDetails)
                  blockChunk.blockIndex = bi;
                chunkTail.extend(blockChunk);
              }
            );

            return chunkTail;
          },
          /**
          @override
        */
        },
        {
          key: "extractInput",
          value: function extractInput() {
            var fromPos =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : 0;
            var toPos =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : this.value.length;
            var flags =
              arguments.length > 2 && arguments[2] !== undefined
                ? arguments[2]
                : {};
            if (fromPos === toPos) return "";
            var input = "";

            this._forEachBlocksInRange(
              fromPos,
              toPos,
              function (b, _, fromPos, toPos) {
                input += b.extractInput(fromPos, toPos, flags);
              }
            );

            return input;
          },
        },
        {
          key: "_findStopBefore",
          value: function _findStopBefore(blockIndex) {
            var stopBefore;

            for (var si = 0; si < this._stops.length; ++si) {
              var stop = this._stops[si];
              if (stop <= blockIndex) stopBefore = stop;
              else break;
            }

            return stopBefore;
          },
          /** Appends placeholder depending on laziness */
        },
        {
          key: "_appendPlaceholder",
          value: function _appendPlaceholder(toBlockIndex) {
            var _this3 = this;

            var details = new ChangeDetails();
            if (this.lazy && toBlockIndex == null) return details;

            var startBlockIter = this._mapPosToBlock(this.value.length);

            if (!startBlockIter) return details;
            var startBlockIndex = startBlockIter.index;
            var endBlockIndex =
              toBlockIndex != null ? toBlockIndex : this._blocks.length;

            this._blocks
              .slice(startBlockIndex, endBlockIndex)
              .forEach(function (b) {
                if (!b.lazy || toBlockIndex != null) {
                  // $FlowFixMe `_blocks` may not be present
                  var args = b._blocks != null ? [b._blocks.length] : [];

                  var bDetails = b._appendPlaceholder.apply(b, args);

                  _this3._value += bDetails.inserted;
                  details.aggregate(bDetails);
                }
              });

            return details;
          },
          /** Finds block in pos */
        },
        {
          key: "_mapPosToBlock",
          value: function _mapPosToBlock(pos) {
            var accVal = "";

            for (var bi = 0; bi < this._blocks.length; ++bi) {
              var _block2 = this._blocks[bi];
              var blockStartPos = accVal.length;
              accVal += _block2.value;

              if (pos <= accVal.length) {
                return {
                  index: bi,
                  offset: pos - blockStartPos,
                };
              }
            }
          },
          /** */
        },
        {
          key: "_blockStartPos",
          value: function _blockStartPos(blockIndex) {
            return this._blocks.slice(0, blockIndex).reduce(function (pos, b) {
              return (pos += b.value.length);
            }, 0);
          },
          /** */
        },
        {
          key: "_forEachBlocksInRange",
          value: function _forEachBlocksInRange(fromPos) {
            var toPos =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : this.value.length;
            var fn = arguments.length > 2 ? arguments[2] : undefined;

            var fromBlockIter = this._mapPosToBlock(fromPos);

            if (fromBlockIter) {
              var toBlockIter = this._mapPosToBlock(toPos); // process first block

              var isSameBlock =
                toBlockIter && fromBlockIter.index === toBlockIter.index;
              var fromBlockStartPos = fromBlockIter.offset;
              var fromBlockEndPos =
                toBlockIter && isSameBlock
                  ? toBlockIter.offset
                  : this._blocks[fromBlockIter.index].value.length;
              fn(
                this._blocks[fromBlockIter.index],
                fromBlockIter.index,
                fromBlockStartPos,
                fromBlockEndPos
              );

              if (toBlockIter && !isSameBlock) {
                // process intermediate blocks
                for (
                  var bi = fromBlockIter.index + 1;
                  bi < toBlockIter.index;
                  ++bi
                ) {
                  fn(this._blocks[bi], bi, 0, this._blocks[bi].value.length);
                } // process last block

                fn(
                  this._blocks[toBlockIter.index],
                  toBlockIter.index,
                  0,
                  toBlockIter.offset
                );
              }
            }
          },
          /**
          @override
        */
        },
        {
          key: "remove",
          value: function remove() {
            var fromPos =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : 0;
            var toPos =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : this.value.length;

            var removeDetails = _get(
              _getPrototypeOf$1(MaskedPattern.prototype),
              "remove",
              this
            ).call(this, fromPos, toPos);

            this._forEachBlocksInRange(
              fromPos,
              toPos,
              function (b, _, bFromPos, bToPos) {
                removeDetails.aggregate(b.remove(bFromPos, bToPos));
              }
            );

            return removeDetails;
          },
          /**
          @override
        */
        },
        {
          key: "nearestInputPos",
          value: function nearestInputPos(cursorPos) {
            var direction =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : DIRECTION.NONE;
            // TODO refactor - extract alignblock
            var beginBlockData = this._mapPosToBlock(cursorPos) || {
              index: 0,
              offset: 0,
            };
            var beginBlockOffset = beginBlockData.offset,
              beginBlockIndex = beginBlockData.index;
            var beginBlock = this._blocks[beginBlockIndex];
            if (!beginBlock) return cursorPos;
            var beginBlockCursorPos = beginBlockOffset; // if position inside block - try to adjust it

            if (
              beginBlockCursorPos !== 0 &&
              beginBlockCursorPos < beginBlock.value.length
            ) {
              beginBlockCursorPos = beginBlock.nearestInputPos(
                beginBlockOffset,
                forceDirection(direction)
              );
            }

            var cursorAtRight = beginBlockCursorPos === beginBlock.value.length;
            var cursorAtLeft = beginBlockCursorPos === 0; //  cursor is INSIDE first block (not at bounds)

            if (!cursorAtLeft && !cursorAtRight)
              return this._blockStartPos(beginBlockIndex) + beginBlockCursorPos;
            var searchBlockIndex = cursorAtRight
              ? beginBlockIndex + 1
              : beginBlockIndex;

            if (direction === DIRECTION.NONE) {
              // NONE direction used to calculate start input position if no chars were removed
              // FOR NONE:
              // -
              // input|any
              // ->
              //  any|input
              // <-
              //  filled-input|any
              // check if first block at left is input
              if (searchBlockIndex > 0) {
                var blockIndexAtLeft = searchBlockIndex - 1;
                var blockAtLeft = this._blocks[blockIndexAtLeft];
                var blockInputPos = blockAtLeft.nearestInputPos(
                  0,
                  DIRECTION.NONE
                ); // is input

                if (
                  !blockAtLeft.value.length ||
                  blockInputPos !== blockAtLeft.value.length
                ) {
                  return this._blockStartPos(searchBlockIndex);
                }
              } // ->

              var firstInputAtRight = searchBlockIndex;

              for (var bi = firstInputAtRight; bi < this._blocks.length; ++bi) {
                var blockAtRight = this._blocks[bi];

                var _blockInputPos = blockAtRight.nearestInputPos(
                  0,
                  DIRECTION.NONE
                );

                if (
                  !blockAtRight.value.length ||
                  _blockInputPos !== blockAtRight.value.length
                ) {
                  return this._blockStartPos(bi) + _blockInputPos;
                }
              } // <-
              // find first non-fixed symbol

              for (var _bi = searchBlockIndex - 1; _bi >= 0; --_bi) {
                var _block3 = this._blocks[_bi];

                var _blockInputPos2 = _block3.nearestInputPos(
                  0,
                  DIRECTION.NONE
                ); // is input

                if (
                  !_block3.value.length ||
                  _blockInputPos2 !== _block3.value.length
                ) {
                  return this._blockStartPos(_bi) + _block3.value.length;
                }
              }

              return cursorPos;
            }

            if (
              direction === DIRECTION.LEFT ||
              direction === DIRECTION.FORCE_LEFT
            ) {
              // -
              //  any|filled-input
              // <-
              //  any|first not empty is not-len-aligned
              //  not-0-aligned|any
              // ->
              //  any|not-len-aligned or end
              // check if first block at right is filled input
              var firstFilledBlockIndexAtRight;

              for (
                var _bi2 = searchBlockIndex;
                _bi2 < this._blocks.length;
                ++_bi2
              ) {
                if (this._blocks[_bi2].value) {
                  firstFilledBlockIndexAtRight = _bi2;
                  break;
                }
              }

              if (firstFilledBlockIndexAtRight != null) {
                var filledBlock = this._blocks[firstFilledBlockIndexAtRight];

                var _blockInputPos3 = filledBlock.nearestInputPos(
                  0,
                  DIRECTION.RIGHT
                );

                if (_blockInputPos3 === 0 && filledBlock.unmaskedValue.length) {
                  // filled block is input
                  return (
                    this._blockStartPos(firstFilledBlockIndexAtRight) +
                    _blockInputPos3
                  );
                }
              } // <-
              // find this vars

              var firstFilledInputBlockIndex = -1;
              var firstEmptyInputBlockIndex; // TODO consider nested empty inputs

              for (var _bi3 = searchBlockIndex - 1; _bi3 >= 0; --_bi3) {
                var _block4 = this._blocks[_bi3];

                var _blockInputPos4 = _block4.nearestInputPos(
                  _block4.value.length,
                  DIRECTION.FORCE_LEFT
                );

                if (!_block4.value || _blockInputPos4 !== 0)
                  firstEmptyInputBlockIndex = _bi3;

                if (_blockInputPos4 !== 0) {
                  if (_blockInputPos4 !== _block4.value.length) {
                    // aligned inside block - return immediately
                    return this._blockStartPos(_bi3) + _blockInputPos4;
                  } else {
                    // found filled
                    firstFilledInputBlockIndex = _bi3;
                    break;
                  }
                }
              }

              if (direction === DIRECTION.LEFT) {
                // try find first empty input before start searching position only when not forced
                for (
                  var _bi4 = firstFilledInputBlockIndex + 1;
                  _bi4 <= Math.min(searchBlockIndex, this._blocks.length - 1);
                  ++_bi4
                ) {
                  var _block5 = this._blocks[_bi4];

                  var _blockInputPos5 = _block5.nearestInputPos(
                    0,
                    DIRECTION.NONE
                  );

                  var blockAlignedPos =
                    this._blockStartPos(_bi4) + _blockInputPos5;

                  if (blockAlignedPos > cursorPos) break; // if block is not lazy input

                  if (_blockInputPos5 !== _block5.value.length)
                    return blockAlignedPos;
                }
              } // process overflow

              if (firstFilledInputBlockIndex >= 0) {
                return (
                  this._blockStartPos(firstFilledInputBlockIndex) +
                  this._blocks[firstFilledInputBlockIndex].value.length
                );
              } // for lazy if has aligned left inside fixed and has came to the start - use start position

              if (
                direction === DIRECTION.FORCE_LEFT ||
                (this.lazy &&
                  !this.extractInput() &&
                  !isInput(this._blocks[searchBlockIndex]))
              ) {
                return 0;
              }

              if (firstEmptyInputBlockIndex != null) {
                return this._blockStartPos(firstEmptyInputBlockIndex);
              } // find first input

              for (
                var _bi5 = searchBlockIndex;
                _bi5 < this._blocks.length;
                ++_bi5
              ) {
                var _block6 = this._blocks[_bi5];

                var _blockInputPos6 = _block6.nearestInputPos(
                  0,
                  DIRECTION.NONE
                ); // is input

                if (
                  !_block6.value.length ||
                  _blockInputPos6 !== _block6.value.length
                ) {
                  return this._blockStartPos(_bi5) + _blockInputPos6;
                }
              }

              return 0;
            }

            if (
              direction === DIRECTION.RIGHT ||
              direction === DIRECTION.FORCE_RIGHT
            ) {
              // ->
              //  any|not-len-aligned and filled
              //  any|not-len-aligned
              // <-
              //  not-0-aligned or start|any
              var firstInputBlockAlignedIndex;
              var firstInputBlockAlignedPos;

              for (
                var _bi6 = searchBlockIndex;
                _bi6 < this._blocks.length;
                ++_bi6
              ) {
                var _block7 = this._blocks[_bi6];

                var _blockInputPos7 = _block7.nearestInputPos(
                  0,
                  DIRECTION.NONE
                );

                if (_blockInputPos7 !== _block7.value.length) {
                  firstInputBlockAlignedPos =
                    this._blockStartPos(_bi6) + _blockInputPos7;
                  firstInputBlockAlignedIndex = _bi6;
                  break;
                }
              }

              if (
                firstInputBlockAlignedIndex != null &&
                firstInputBlockAlignedPos != null
              ) {
                for (
                  var _bi7 = firstInputBlockAlignedIndex;
                  _bi7 < this._blocks.length;
                  ++_bi7
                ) {
                  var _block8 = this._blocks[_bi7];

                  var _blockInputPos8 = _block8.nearestInputPos(
                    0,
                    DIRECTION.FORCE_RIGHT
                  );

                  if (_blockInputPos8 !== _block8.value.length) {
                    return this._blockStartPos(_bi7) + _blockInputPos8;
                  }
                }

                return direction === DIRECTION.FORCE_RIGHT
                  ? this.value.length
                  : firstInputBlockAlignedPos;
              }

              for (
                var _bi8 = Math.min(searchBlockIndex, this._blocks.length - 1);
                _bi8 >= 0;
                --_bi8
              ) {
                var _block9 = this._blocks[_bi8];

                var _blockInputPos9 = _block9.nearestInputPos(
                  _block9.value.length,
                  DIRECTION.LEFT
                );

                if (_blockInputPos9 !== 0) {
                  var alignedPos = this._blockStartPos(_bi8) + _blockInputPos9;

                  if (alignedPos >= cursorPos) return alignedPos;
                  break;
                }
              }
            }

            return cursorPos;
          },
          /** Get block by name */
        },
        {
          key: "maskedBlock",
          value: function maskedBlock(name) {
            return this.maskedBlocks(name)[0];
          },
          /** Get all blocks by name */
        },
        {
          key: "maskedBlocks",
          value: function maskedBlocks(name) {
            var _this4 = this;

            var indices = this._maskedBlocks[name];
            if (!indices) return [];
            return indices.map(function (gi) {
              return _this4._blocks[gi];
            });
          },
        },
        {
          key: "state",
          get: function get() {
            return Object.assign(
              {},
              _get(_getPrototypeOf$1(MaskedPattern.prototype), "state", this),
              {
                _blocks: this._blocks.map(function (b) {
                  return b.state;
                }),
              }
            );
          },
          set: function set(state) {
            var _blocks = state._blocks,
              maskedState = _objectWithoutProperties(state, ["_blocks"]);

            this._blocks.forEach(function (b, bi) {
              return (b.state = _blocks[bi]);
            });

            _set(
              _getPrototypeOf$1(MaskedPattern.prototype),
              "state",
              maskedState,
              this,
              true
            );
          },
        },
        {
          key: "isComplete",
          get: function get() {
            return this._blocks.every(function (b) {
              return b.isComplete;
            });
          },
        },
        {
          key: "unmaskedValue",
          get: function get() {
            return this._blocks.reduce(function (str, b) {
              return (str += b.unmaskedValue);
            }, "");
          },
          set: function set(unmaskedValue) {
            _set(
              _getPrototypeOf$1(MaskedPattern.prototype),
              "unmaskedValue",
              unmaskedValue,
              this,
              true
            );
          },
          /**
          @override
        */
        },
        {
          key: "value",
          get: function get() {
            // TODO return _value when not in change?
            return this._blocks.reduce(function (str, b) {
              return (str += b.value);
            }, "");
          },
          set: function set(value) {
            _set(
              _getPrototypeOf$1(MaskedPattern.prototype),
              "value",
              value,
              this,
              true
            );
          },
        },
      ]);

      return MaskedPattern;
    })(Masked);
  MaskedPattern.DEFAULTS = {
    lazy: true,
    placeholderChar: "_",
  };
  MaskedPattern.STOP_CHAR = "`";
  MaskedPattern.ESCAPE_CHAR = "\\";
  MaskedPattern.InputDefinition = PatternInputDefinition;
  MaskedPattern.FixedDefinition = PatternFixedDefinition;

  function isInput(block) {
    if (!block) return false;
    var value = block.value;
    return !value || block.nearestInputPos(0, DIRECTION.NONE) !== value.length;
  }

  IMask.MaskedPattern = MaskedPattern;

  /** Pattern which accepts ranges */

  var MaskedRange =
    /*#__PURE__*/
    (function (_MaskedPattern) {
      _inherits(MaskedRange, _MaskedPattern);

      function MaskedRange() {
        _classCallCheck(this, MaskedRange);

        return _possibleConstructorReturn(
          this,
          _getPrototypeOf$1(MaskedRange).apply(this, arguments)
        );
      }

      _createClass$1(MaskedRange, [
        {
          key: "_update",

          /**
          @override
        */
          value: function _update(opts) {
            // TODO type
            opts = Object.assign(
              {
                to: this.to || 0,
                from: this.from || 0,
              },
              opts
            );
            var maxLength = String(opts.to).length;
            if (opts.maxLength != null)
              maxLength = Math.max(maxLength, opts.maxLength);
            opts.maxLength = maxLength;
            var fromStr = String(opts.from).padStart(maxLength, "0");
            var toStr = String(opts.to).padStart(maxLength, "0");
            var sameCharsCount = 0;

            while (
              sameCharsCount < toStr.length &&
              toStr[sameCharsCount] === fromStr[sameCharsCount]
            ) {
              ++sameCharsCount;
            }

            opts.mask =
              toStr.slice(0, sameCharsCount).replace(/0/g, "\\0") +
              "0".repeat(maxLength - sameCharsCount);

            _get(
              _getPrototypeOf$1(MaskedRange.prototype),
              "_update",
              this
            ).call(this, opts);
          },
          /**
          @override
        */
        },
        {
          key: "boundaries",
          value: function boundaries(str) {
            var minstr = "";
            var maxstr = "";

            var _ref = str.match(/^(\D*)(\d*)(\D*)/) || [],
              _ref2 = _slicedToArray(_ref, 3),
              placeholder = _ref2[1],
              num = _ref2[2];

            if (num) {
              minstr = "0".repeat(placeholder.length) + num;
              maxstr = "9".repeat(placeholder.length) + num;
            }

            minstr = minstr.padEnd(this.maxLength, "0");
            maxstr = maxstr.padEnd(this.maxLength, "9");
            return [minstr, maxstr];
          },
          /**
          @override
        */
        },
        {
          key: "doPrepare",
          value: function doPrepare(str) {
            var flags =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : {};
            str = _get(
              _getPrototypeOf$1(MaskedRange.prototype),
              "doPrepare",
              this
            )
              .call(this, str, flags)
              .replace(/\D/g, "");
            if (!this.autofix) return str;
            var fromStr = String(this.from).padStart(this.maxLength, "0");
            var toStr = String(this.to).padStart(this.maxLength, "0");
            var val = this.value;
            var prepStr = "";

            for (var ci = 0; ci < str.length; ++ci) {
              var nextVal = val + prepStr + str[ci];

              var _this$boundaries = this.boundaries(nextVal),
                _this$boundaries2 = _slicedToArray(_this$boundaries, 2),
                minstr = _this$boundaries2[0],
                maxstr = _this$boundaries2[1];

              if (Number(maxstr) < this.from)
                prepStr += fromStr[nextVal.length - 1];
              else if (Number(minstr) > this.to)
                prepStr += toStr[nextVal.length - 1];
              else prepStr += str[ci];
            }

            return prepStr;
          },
          /**
          @override
        */
        },
        {
          key: "doValidate",
          value: function doValidate() {
            var _get2;

            var str = this.value;
            var firstNonZero = str.search(/[^0]/);
            if (firstNonZero === -1 && str.length <= this._matchFrom)
              return true;

            var _this$boundaries3 = this.boundaries(str),
              _this$boundaries4 = _slicedToArray(_this$boundaries3, 2),
              minstr = _this$boundaries4[0],
              maxstr = _this$boundaries4[1];

            for (
              var _len = arguments.length, args = new Array(_len), _key = 0;
              _key < _len;
              _key++
            ) {
              args[_key] = arguments[_key];
            }

            return (
              this.from <= Number(maxstr) &&
              Number(minstr) <= this.to &&
              (_get2 = _get(
                _getPrototypeOf$1(MaskedRange.prototype),
                "doValidate",
                this
              )).call.apply(_get2, [this].concat(args))
            );
          },
        },
        {
          key: "_matchFrom",

          /**
          Optionally sets max length of pattern.
          Used when pattern length is longer then `to` param length. Pads zeros at start in this case.
        */

          /** Min bound */

          /** Max bound */

          /** */
          get: function get() {
            return this.maxLength - String(this.from).length;
          },
        },
        {
          key: "isComplete",
          get: function get() {
            return (
              _get(
                _getPrototypeOf$1(MaskedRange.prototype),
                "isComplete",
                this
              ) && Boolean(this.value)
            );
          },
        },
      ]);

      return MaskedRange;
    })(MaskedPattern);
  IMask.MaskedRange = MaskedRange;

  /** Date mask */

  var MaskedDate =
    /*#__PURE__*/
    (function (_MaskedPattern) {
      _inherits(MaskedDate, _MaskedPattern);

      /** Pattern mask for date according to {@link MaskedDate#format} */

      /** Start date */

      /** End date */

      /** */

      /**
        @param {Object} opts
      */
      function MaskedDate(opts) {
        _classCallCheck(this, MaskedDate);

        return _possibleConstructorReturn(
          this,
          _getPrototypeOf$1(MaskedDate).call(
            this,
            Object.assign({}, MaskedDate.DEFAULTS, {}, opts)
          )
        );
      }
      /**
        @override
      */

      _createClass$1(MaskedDate, [
        {
          key: "_update",
          value: function _update(opts) {
            if (opts.mask === Date) delete opts.mask;
            if (opts.pattern) opts.mask = opts.pattern;
            var blocks = opts.blocks;
            opts.blocks = Object.assign({}, MaskedDate.GET_DEFAULT_BLOCKS()); // adjust year block

            if (opts.min) opts.blocks.Y.from = opts.min.getFullYear();
            if (opts.max) opts.blocks.Y.to = opts.max.getFullYear();

            if (
              opts.min &&
              opts.max &&
              opts.blocks.Y.from === opts.blocks.Y.to
            ) {
              opts.blocks.m.from = opts.min.getMonth() + 1;
              opts.blocks.m.to = opts.max.getMonth() + 1;

              if (opts.blocks.m.from === opts.blocks.m.to) {
                opts.blocks.d.from = opts.min.getDate();
                opts.blocks.d.to = opts.max.getDate();
              }
            }

            Object.assign(opts.blocks, blocks); // add autofix

            Object.keys(opts.blocks).forEach(function (bk) {
              var b = opts.blocks[bk];
              if (!("autofix" in b)) b.autofix = opts.autofix;
            });

            _get(_getPrototypeOf$1(MaskedDate.prototype), "_update", this).call(
              this,
              opts
            );
          },
          /**
          @override
        */
        },
        {
          key: "doValidate",
          value: function doValidate() {
            var _get2;

            var date = this.date;

            for (
              var _len = arguments.length, args = new Array(_len), _key = 0;
              _key < _len;
              _key++
            ) {
              args[_key] = arguments[_key];
            }

            return (
              (_get2 = _get(
                _getPrototypeOf$1(MaskedDate.prototype),
                "doValidate",
                this
              )).call.apply(_get2, [this].concat(args)) &&
              (!this.isComplete ||
                (this.isDateExist(this.value) &&
                  date != null &&
                  (this.min == null || this.min <= date) &&
                  (this.max == null || date <= this.max)))
            );
          },
          /** Checks if date is exists */
        },
        {
          key: "isDateExist",
          value: function isDateExist(str) {
            return this.format(this.parse(str, this), this).indexOf(str) >= 0;
          },
          /** Parsed Date */
        },
        {
          key: "date",
          get: function get() {
            return this.typedValue;
          },
          set: function set(date) {
            this.typedValue = date;
          },
          /**
          @override
        */
        },
        {
          key: "typedValue",
          get: function get() {
            return this.isComplete
              ? _get(
                  _getPrototypeOf$1(MaskedDate.prototype),
                  "typedValue",
                  this
                )
              : null;
          },
          set: function set(value) {
            _set(
              _getPrototypeOf$1(MaskedDate.prototype),
              "typedValue",
              value,
              this,
              true
            );
          },
        },
      ]);

      return MaskedDate;
    })(MaskedPattern);
  MaskedDate.DEFAULTS = {
    pattern: "d{.}`m{.}`Y",
    format: function format(date) {
      var day = String(date.getDate()).padStart(2, "0");
      var month = String(date.getMonth() + 1).padStart(2, "0");
      var year = date.getFullYear();
      return [day, month, year].join(".");
    },
    parse: function parse(str) {
      var _str$split = str.split("."),
        _str$split2 = _slicedToArray(_str$split, 3),
        day = _str$split2[0],
        month = _str$split2[1],
        year = _str$split2[2];

      return new Date(year, month - 1, day);
    },
  };

  MaskedDate.GET_DEFAULT_BLOCKS = function () {
    return {
      d: {
        mask: MaskedRange,
        from: 1,
        to: 31,
        maxLength: 2,
      },
      m: {
        mask: MaskedRange,
        from: 1,
        to: 12,
        maxLength: 2,
      },
      Y: {
        mask: MaskedRange,
        from: 1900,
        to: 9999,
      },
    };
  };

  IMask.MaskedDate = MaskedDate;

  /**
      Generic element API to use with mask
      @interface
    */
  var MaskElement =
    /*#__PURE__*/
    (function () {
      function MaskElement() {
        _classCallCheck(this, MaskElement);
      }

      _createClass$1(MaskElement, [
        {
          key: "select",

          /** Safely sets element selection */
          value: function select(start, end) {
            if (
              start == null ||
              end == null ||
              (start === this.selectionStart && end === this.selectionEnd)
            )
              return;

            try {
              this._unsafeSelect(start, end);
            } catch (e) {}
          },
          /** Should be overriden in subclasses */
        },
        {
          key: "_unsafeSelect",
          value: function _unsafeSelect(start, end) {},
          /** Should be overriden in subclasses */
        },
        {
          key: "bindEvents",

          /** Should be overriden in subclasses */
          value: function bindEvents(handlers) {},
          /** Should be overriden in subclasses */
        },
        {
          key: "unbindEvents",
          value: function unbindEvents() {},
        },
        {
          key: "selectionStart",

          /** */

          /** */

          /** */

          /** Safely returns selection start */
          get: function get() {
            var start;

            try {
              start = this._unsafeSelectionStart;
            } catch (e) {}

            return start != null ? start : this.value.length;
          },
          /** Safely returns selection end */
        },
        {
          key: "selectionEnd",
          get: function get() {
            var end;

            try {
              end = this._unsafeSelectionEnd;
            } catch (e) {}

            return end != null ? end : this.value.length;
          },
        },
        {
          key: "isActive",
          get: function get() {
            return false;
          },
        },
      ]);

      return MaskElement;
    })();
  IMask.MaskElement = MaskElement;

  /** Bridge between HTMLElement and {@link Masked} */

  var HTMLMaskElement =
    /*#__PURE__*/
    (function (_MaskElement) {
      _inherits(HTMLMaskElement, _MaskElement);

      /** Mapping between HTMLElement events and mask internal events */

      /** HTMLElement to use mask on */

      /**
        @param {HTMLInputElement|HTMLTextAreaElement} input
      */
      function HTMLMaskElement(input) {
        var _this;

        _classCallCheck(this, HTMLMaskElement);

        _this = _possibleConstructorReturn(
          this,
          _getPrototypeOf$1(HTMLMaskElement).call(this)
        );
        _this.input = input;
        _this._handlers = {};
        return _this;
      }
      /** */
      // $FlowFixMe https://github.com/facebook/flow/issues/2839

      _createClass$1(HTMLMaskElement, [
        {
          key: "_unsafeSelect",

          /**
          Sets HTMLElement selection
          @override
        */
          value: function _unsafeSelect(start, end) {
            this.input.setSelectionRange(start, end);
          },
          /**
          HTMLElement value
          @override
        */
        },
        {
          key: "bindEvents",

          /**
          Binds HTMLElement events to mask internal events
          @override
        */
          value: function bindEvents(handlers) {
            var _this2 = this;

            Object.keys(handlers).forEach(function (event) {
              return _this2._toggleEventHandler(
                HTMLMaskElement.EVENTS_MAP[event],
                handlers[event]
              );
            });
          },
          /**
          Unbinds HTMLElement events to mask internal events
          @override
        */
        },
        {
          key: "unbindEvents",
          value: function unbindEvents() {
            var _this3 = this;

            Object.keys(this._handlers).forEach(function (event) {
              return _this3._toggleEventHandler(event);
            });
          },
          /** */
        },
        {
          key: "_toggleEventHandler",
          value: function _toggleEventHandler(event, handler) {
            if (this._handlers[event]) {
              this.input.removeEventListener(event, this._handlers[event]);
              delete this._handlers[event];
            }

            if (handler) {
              this.input.addEventListener(event, handler);
              this._handlers[event] = handler;
            }
          },
        },
        {
          key: "rootElement",
          get: function get() {
            return this.input.getRootNode ? this.input.getRootNode() : document;
          },
          /**
          Is element in focus
          @readonly
        */
        },
        {
          key: "isActive",
          get: function get() {
            //$FlowFixMe
            return this.input === this.rootElement.activeElement;
          },
          /**
          Returns HTMLElement selection start
          @override
        */
        },
        {
          key: "_unsafeSelectionStart",
          get: function get() {
            return this.input.selectionStart;
          },
          /**
          Returns HTMLElement selection end
          @override
        */
        },
        {
          key: "_unsafeSelectionEnd",
          get: function get() {
            return this.input.selectionEnd;
          },
        },
        {
          key: "value",
          get: function get() {
            return this.input.value;
          },
          set: function set(value) {
            this.input.value = value;
          },
        },
      ]);

      return HTMLMaskElement;
    })(MaskElement);
  HTMLMaskElement.EVENTS_MAP = {
    selectionChange: "keydown",
    input: "input",
    drop: "drop",
    click: "click",
    focus: "focus",
    commit: "blur",
  };
  IMask.HTMLMaskElement = HTMLMaskElement;

  var HTMLContenteditableMaskElement =
    /*#__PURE__*/
    (function (_HTMLMaskElement) {
      _inherits(HTMLContenteditableMaskElement, _HTMLMaskElement);

      function HTMLContenteditableMaskElement() {
        _classCallCheck(this, HTMLContenteditableMaskElement);

        return _possibleConstructorReturn(
          this,
          _getPrototypeOf$1(HTMLContenteditableMaskElement).apply(
            this,
            arguments
          )
        );
      }

      _createClass$1(HTMLContenteditableMaskElement, [
        {
          key: "_unsafeSelect",

          /**
          Sets HTMLElement selection
          @override
        */
          value: function _unsafeSelect(start, end) {
            if (!this.rootElement.createRange) return;
            var range = this.rootElement.createRange();
            range.setStart(this.input.firstChild || this.input, start);
            range.setEnd(this.input.lastChild || this.input, end);
            var root = this.rootElement;
            var selection = root.getSelection && root.getSelection();

            if (selection) {
              selection.removeAllRanges();
              selection.addRange(range);
            }
          },
          /**
          HTMLElement value
          @override
        */
        },
        {
          key: "_unsafeSelectionStart",

          /**
          Returns HTMLElement selection start
          @override
        */
          get: function get() {
            var root = this.rootElement;
            var selection = root.getSelection && root.getSelection();
            return selection && selection.anchorOffset;
          },
          /**
          Returns HTMLElement selection end
          @override
        */
        },
        {
          key: "_unsafeSelectionEnd",
          get: function get() {
            var root = this.rootElement;
            var selection = root.getSelection && root.getSelection();
            return (
              selection && this._unsafeSelectionStart + String(selection).length
            );
          },
        },
        {
          key: "value",
          get: function get() {
            // $FlowFixMe
            return this.input.textContent;
          },
          set: function set(value) {
            this.input.textContent = value;
          },
        },
      ]);

      return HTMLContenteditableMaskElement;
    })(HTMLMaskElement);
  IMask.HTMLContenteditableMaskElement = HTMLContenteditableMaskElement;

  /** Listens to element events and controls changes between element and {@link Masked} */

  var InputMask =
    /*#__PURE__*/
    (function () {
      /**
        View element
        @readonly
      */

      /**
        Internal {@link Masked} model
        @readonly
      */

      /**
        @param {MaskElement|HTMLInputElement|HTMLTextAreaElement} el
        @param {Object} opts
      */
      function InputMask(el, opts) {
        _classCallCheck(this, InputMask);

        this.el =
          el instanceof MaskElement
            ? el
            : el.isContentEditable &&
              el.tagName !== "INPUT" &&
              el.tagName !== "TEXTAREA"
            ? new HTMLContenteditableMaskElement(el)
            : new HTMLMaskElement(el);
        this.masked = createMask(opts);
        this._listeners = {};
        this._value = "";
        this._unmaskedValue = "";
        this._saveSelection = this._saveSelection.bind(this);
        this._onInput = this._onInput.bind(this);
        this._onChange = this._onChange.bind(this);
        this._onDrop = this._onDrop.bind(this);
        this._onFocus = this._onFocus.bind(this);
        this._onClick = this._onClick.bind(this);
        this.alignCursor = this.alignCursor.bind(this);
        this.alignCursorFriendly = this.alignCursorFriendly.bind(this);

        this._bindEvents(); // refresh

        this.updateValue();

        this._onChange();
      }
      /** Read or update mask */

      _createClass$1(InputMask, [
        {
          key: "maskEquals",
          value: function maskEquals(mask) {
            return (
              mask == null ||
              mask === this.masked.mask ||
              (mask === Date && this.masked instanceof MaskedDate)
            );
          },
        },
        {
          key: "_bindEvents",

          /**
          Starts listening to element events
          @protected
        */
          value: function _bindEvents() {
            this.el.bindEvents({
              selectionChange: this._saveSelection,
              input: this._onInput,
              drop: this._onDrop,
              click: this._onClick,
              focus: this._onFocus,
              commit: this._onChange,
            });
          },
          /**
          Stops listening to element events
          @protected
         */
        },
        {
          key: "_unbindEvents",
          value: function _unbindEvents() {
            if (this.el) this.el.unbindEvents();
          },
          /**
          Fires custom event
          @protected
         */
        },
        {
          key: "_fireEvent",
          value: function _fireEvent(ev) {
            for (
              var _len = arguments.length,
                args = new Array(_len > 1 ? _len - 1 : 0),
                _key = 1;
              _key < _len;
              _key++
            ) {
              args[_key - 1] = arguments[_key];
            }

            var listeners = this._listeners[ev];
            if (!listeners) return;
            listeners.forEach(function (l) {
              return l.apply(void 0, args);
            });
          },
          /**
          Current selection start
          @readonly
        */
        },
        {
          key: "_saveSelection",

          /**
          Stores current selection
          @protected
        */
          value: function _saveSelection() /* ev */
          {
            if (this.value !== this.el.value) {
              console.warn(
                "Element value was changed outside of mask. Syncronize mask using `mask.updateValue()` to work properly."
              ); // eslint-disable-line no-console
            }

            this._selection = {
              start: this.selectionStart,
              end: this.cursorPos,
            };
          },
          /** Syncronizes model value from view */
        },
        {
          key: "updateValue",
          value: function updateValue() {
            this.masked.value = this.el.value;
            this._value = this.masked.value;
          },
          /** Syncronizes view from model value, fires change events */
        },
        {
          key: "updateControl",
          value: function updateControl() {
            var newUnmaskedValue = this.masked.unmaskedValue;
            var newValue = this.masked.value;
            var isChanged =
              this.unmaskedValue !== newUnmaskedValue ||
              this.value !== newValue;
            this._unmaskedValue = newUnmaskedValue;
            this._value = newValue;
            if (this.el.value !== newValue) this.el.value = newValue;
            if (isChanged) this._fireChangeEvents();
          },
          /** Updates options with deep equal check, recreates @{link Masked} model if mask type changes */
        },
        {
          key: "updateOptions",
          value: function updateOptions(opts) {
            var mask = opts.mask,
              restOpts = _objectWithoutProperties(opts, ["mask"]);

            var updateMask = !this.maskEquals(mask);
            var updateOpts = !objectIncludes(this.masked, restOpts);
            if (updateMask) this.mask = mask;
            if (updateOpts) this.masked.updateOptions(restOpts);
            if (updateMask || updateOpts) this.updateControl();
          },
          /** Updates cursor */
        },
        {
          key: "updateCursor",
          value: function updateCursor(cursorPos) {
            if (cursorPos == null) return;
            this.cursorPos = cursorPos; // also queue change cursor for mobile browsers

            this._delayUpdateCursor(cursorPos);
          },
          /**
          Delays cursor update to support mobile browsers
          @private
        */
        },
        {
          key: "_delayUpdateCursor",
          value: function _delayUpdateCursor(cursorPos) {
            var _this = this;

            this._abortUpdateCursor();

            this._changingCursorPos = cursorPos;
            this._cursorChanging = setTimeout(function () {
              if (!_this.el) return; // if was destroyed

              _this.cursorPos = _this._changingCursorPos;

              _this._abortUpdateCursor();
            }, 10);
          },
          /**
          Fires custom events
          @protected
        */
        },
        {
          key: "_fireChangeEvents",
          value: function _fireChangeEvents() {
            this._fireEvent("accept", this._inputEvent);

            if (this.masked.isComplete)
              this._fireEvent("complete", this._inputEvent);
          },
          /**
          Aborts delayed cursor update
          @private
        */
        },
        {
          key: "_abortUpdateCursor",
          value: function _abortUpdateCursor() {
            if (this._cursorChanging) {
              clearTimeout(this._cursorChanging);
              delete this._cursorChanging;
            }
          },
          /** Aligns cursor to nearest available position */
        },
        {
          key: "alignCursor",
          value: function alignCursor() {
            this.cursorPos = this.masked.nearestInputPos(
              this.cursorPos,
              DIRECTION.LEFT
            );
          },
          /** Aligns cursor only if selection is empty */
        },
        {
          key: "alignCursorFriendly",
          value: function alignCursorFriendly() {
            if (this.selectionStart !== this.cursorPos) return; // skip if range is selected

            this.alignCursor();
          },
          /** Adds listener on custom event */
        },
        {
          key: "on",
          value: function on(ev, handler) {
            if (!this._listeners[ev]) this._listeners[ev] = [];

            this._listeners[ev].push(handler);

            return this;
          },
          /** Removes custom event listener */
        },
        {
          key: "off",
          value: function off(ev, handler) {
            if (!this._listeners[ev]) return this;

            if (!handler) {
              delete this._listeners[ev];
              return this;
            }

            var hIndex = this._listeners[ev].indexOf(handler);

            if (hIndex >= 0) this._listeners[ev].splice(hIndex, 1);
            return this;
          },
          /** Handles view input event */
        },
        {
          key: "_onInput",
          value: function _onInput(e) {
            this._inputEvent = e;

            this._abortUpdateCursor(); // fix strange IE behavior

            if (!this._selection) return this.updateValue();
            var details = new ActionDetails( // new state
              this.el.value,
              this.cursorPos, // old state
              this.value,
              this._selection
            );
            var oldRawValue = this.masked.rawInputValue;
            var offset = this.masked.splice(
              details.startChangePos,
              details.removed.length,
              details.inserted,
              details.removeDirection
            ).offset; // force align in remove direction only if no input chars were removed
            // otherwise we still need to align with NONE (to get out from fixed symbols for instance)

            var removeDirection =
              oldRawValue === this.masked.rawInputValue
                ? details.removeDirection
                : DIRECTION.NONE;
            var cursorPos = this.masked.nearestInputPos(
              details.startChangePos + offset,
              removeDirection
            );
            this.updateControl();
            this.updateCursor(cursorPos);
            delete this._inputEvent;
          },
          /** Handles view change event and commits model value */
        },
        {
          key: "_onChange",
          value: function _onChange() {
            if (this.value !== this.el.value) {
              this.updateValue();
            }

            this.masked.doCommit();
            this.updateControl();

            this._saveSelection();
          },
          /** Handles view drop event, prevents by default */
        },
        {
          key: "_onDrop",
          value: function _onDrop(ev) {
            ev.preventDefault();
            ev.stopPropagation();
          },
          /** Restore last selection on focus */
        },
        {
          key: "_onFocus",
          value: function _onFocus(ev) {
            this.alignCursorFriendly();
          },
          /** Restore last selection on focus */
        },
        {
          key: "_onClick",
          value: function _onClick(ev) {
            this.alignCursorFriendly();
          },
          /** Unbind view events and removes element reference */
        },
        {
          key: "destroy",
          value: function destroy() {
            this._unbindEvents(); // $FlowFixMe why not do so?

            this._listeners.length = 0; // $FlowFixMe

            delete this.el;
          },
        },
        {
          key: "mask",
          get: function get() {
            return this.masked.mask;
          },
          set: function set(mask) {
            if (this.maskEquals(mask)) return;

            if (
              !(mask instanceof IMask.Masked) &&
              this.masked.constructor === maskedClass(mask)
            ) {
              this.masked.updateOptions({
                mask: mask,
              });
              return;
            }

            var masked = createMask({
              mask: mask,
            });
            masked.unmaskedValue = this.masked.unmaskedValue;
            this.masked = masked;
          },
          /** Raw value */
        },
        {
          key: "value",
          get: function get() {
            return this._value;
          },
          set: function set(str) {
            this.masked.value = str;
            this.updateControl();
            this.alignCursor();
          },
          /** Unmasked value */
        },
        {
          key: "unmaskedValue",
          get: function get() {
            return this._unmaskedValue;
          },
          set: function set(str) {
            this.masked.unmaskedValue = str;
            this.updateControl();
            this.alignCursor();
          },
          /** Typed unmasked value */
        },
        {
          key: "typedValue",
          get: function get() {
            return this.masked.typedValue;
          },
          set: function set(val) {
            this.masked.typedValue = val;
            this.updateControl();
            this.alignCursor();
          },
        },
        {
          key: "selectionStart",
          get: function get() {
            return this._cursorChanging
              ? this._changingCursorPos
              : this.el.selectionStart;
          },
          /** Current cursor position */
        },
        {
          key: "cursorPos",
          get: function get() {
            return this._cursorChanging
              ? this._changingCursorPos
              : this.el.selectionEnd;
          },
          set: function set(pos) {
            if (!this.el || !this.el.isActive) return;
            this.el.select(pos, pos);

            this._saveSelection();
          },
        },
      ]);

      return InputMask;
    })();
  IMask.InputMask = InputMask;

  /** Pattern which validates enum values */

  var MaskedEnum =
    /*#__PURE__*/
    (function (_MaskedPattern) {
      _inherits(MaskedEnum, _MaskedPattern);

      function MaskedEnum() {
        _classCallCheck(this, MaskedEnum);

        return _possibleConstructorReturn(
          this,
          _getPrototypeOf$1(MaskedEnum).apply(this, arguments)
        );
      }

      _createClass$1(MaskedEnum, [
        {
          key: "_update",

          /**
          @override
          @param {Object} opts
        */
          value: function _update(opts) {
            // TODO type
            if (opts.enum) opts.mask = "*".repeat(opts.enum[0].length);

            _get(_getPrototypeOf$1(MaskedEnum.prototype), "_update", this).call(
              this,
              opts
            );
          },
          /**
          @override
        */
        },
        {
          key: "doValidate",
          value: function doValidate() {
            var _this = this,
              _get2;

            for (
              var _len = arguments.length, args = new Array(_len), _key = 0;
              _key < _len;
              _key++
            ) {
              args[_key] = arguments[_key];
            }

            return (
              this.enum.some(function (e) {
                return e.indexOf(_this.unmaskedValue) >= 0;
              }) &&
              (_get2 = _get(
                _getPrototypeOf$1(MaskedEnum.prototype),
                "doValidate",
                this
              )).call.apply(_get2, [this].concat(args))
            );
          },
        },
      ]);

      return MaskedEnum;
    })(MaskedPattern);
  IMask.MaskedEnum = MaskedEnum;

  /**
      Number mask
      @param {Object} opts
      @param {string} opts.radix - Single char
      @param {string} opts.thousandsSeparator - Single char
      @param {Array<string>} opts.mapToRadix - Array of single chars
      @param {number} opts.min
      @param {number} opts.max
      @param {number} opts.scale - Digits after point
      @param {boolean} opts.signed - Allow negative
      @param {boolean} opts.normalizeZeros - Flag to remove leading and trailing zeros in the end of editing
      @param {boolean} opts.padFractionalZeros - Flag to pad trailing zeros after point in the end of editing
    */
  var MaskedNumber =
    /*#__PURE__*/
    (function (_Masked) {
      _inherits(MaskedNumber, _Masked);

      /** Single char */

      /** Single char */

      /** Array of single chars */

      /** */

      /** */

      /** Digits after point */

      /** */

      /** Flag to remove leading and trailing zeros in the end of editing */

      /** Flag to pad trailing zeros after point in the end of editing */
      function MaskedNumber(opts) {
        _classCallCheck(this, MaskedNumber);

        return _possibleConstructorReturn(
          this,
          _getPrototypeOf$1(MaskedNumber).call(
            this,
            Object.assign({}, MaskedNumber.DEFAULTS, {}, opts)
          )
        );
      }
      /**
        @override
      */

      _createClass$1(MaskedNumber, [
        {
          key: "_update",
          value: function _update(opts) {
            _get(
              _getPrototypeOf$1(MaskedNumber.prototype),
              "_update",
              this
            ).call(this, opts);

            this._updateRegExps();
          },
          /** */
        },
        {
          key: "_updateRegExps",
          value: function _updateRegExps() {
            // use different regexp to process user input (more strict, input suffix) and tail shifting
            var start = "^" + (this.allowNegative ? "[+|\\-]?" : "");
            var midInput = "(0|([1-9]+\\d*))?";
            var mid = "\\d*";
            var end =
              (this.scale
                ? "(" + escapeRegExp(this.radix) + "\\d{0," + this.scale + "})?"
                : "") + "$";
            this._numberRegExpInput = new RegExp(start + midInput + end);
            this._numberRegExp = new RegExp(start + mid + end);
            this._mapToRadixRegExp = new RegExp(
              "[" + this.mapToRadix.map(escapeRegExp).join("") + "]",
              "g"
            );
            this._thousandsSeparatorRegExp = new RegExp(
              escapeRegExp(this.thousandsSeparator),
              "g"
            );
          },
          /** */
        },
        {
          key: "_removeThousandsSeparators",
          value: function _removeThousandsSeparators(value) {
            return value.replace(this._thousandsSeparatorRegExp, "");
          },
          /** */
        },
        {
          key: "_insertThousandsSeparators",
          value: function _insertThousandsSeparators(value) {
            // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
            var parts = value.split(this.radix);
            parts[0] = parts[0].replace(
              /\B(?=(\d{3})+(?!\d))/g,
              this.thousandsSeparator
            );
            return parts.join(this.radix);
          },
          /**
          @override
        */
        },
        {
          key: "doPrepare",
          value: function doPrepare(str) {
            var _get2;

            for (
              var _len = arguments.length,
                args = new Array(_len > 1 ? _len - 1 : 0),
                _key = 1;
              _key < _len;
              _key++
            ) {
              args[_key - 1] = arguments[_key];
            }

            return (_get2 = _get(
              _getPrototypeOf$1(MaskedNumber.prototype),
              "doPrepare",
              this
            )).call.apply(
              _get2,
              [
                this,
                this._removeThousandsSeparators(
                  str.replace(this._mapToRadixRegExp, this.radix)
                ),
              ].concat(args)
            );
          },
          /** */
        },
        {
          key: "_separatorsCount",
          value: function _separatorsCount(to) {
            var extendOnSeparators =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : false;
            var count = 0;

            for (var pos = 0; pos < to; ++pos) {
              if (this._value.indexOf(this.thousandsSeparator, pos) === pos) {
                ++count;
                if (extendOnSeparators) to += this.thousandsSeparator.length;
              }
            }

            return count;
          },
          /** */
        },
        {
          key: "_separatorsCountFromSlice",
          value: function _separatorsCountFromSlice() {
            var slice =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : this._value;
            return this._separatorsCount(
              this._removeThousandsSeparators(slice).length,
              true
            );
          },
          /**
          @override
        */
        },
        {
          key: "extractInput",
          value: function extractInput() {
            var fromPos =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : 0;
            var toPos =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : this.value.length;
            var flags = arguments.length > 2 ? arguments[2] : undefined;

            var _this$_adjustRangeWit = this._adjustRangeWithSeparators(
              fromPos,
              toPos
            );

            var _this$_adjustRangeWit2 = _slicedToArray(
              _this$_adjustRangeWit,
              2
            );

            fromPos = _this$_adjustRangeWit2[0];
            toPos = _this$_adjustRangeWit2[1];
            return this._removeThousandsSeparators(
              _get(
                _getPrototypeOf$1(MaskedNumber.prototype),
                "extractInput",
                this
              ).call(this, fromPos, toPos, flags)
            );
          },
          /**
          @override
        */
        },
        {
          key: "_appendCharRaw",
          value: function _appendCharRaw(ch) {
            var flags =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : {};
            if (!this.thousandsSeparator)
              return _get(
                _getPrototypeOf$1(MaskedNumber.prototype),
                "_appendCharRaw",
                this
              ).call(this, ch, flags);
            var prevBeforeTailValue =
              flags.tail && flags._beforeTailState
                ? flags._beforeTailState._value
                : this._value;

            var prevBeforeTailSeparatorsCount =
              this._separatorsCountFromSlice(prevBeforeTailValue);

            this._value = this._removeThousandsSeparators(this.value);

            var appendDetails = _get(
              _getPrototypeOf$1(MaskedNumber.prototype),
              "_appendCharRaw",
              this
            ).call(this, ch, flags);

            this._value = this._insertThousandsSeparators(this._value);
            var beforeTailValue =
              flags.tail && flags._beforeTailState
                ? flags._beforeTailState._value
                : this._value;

            var beforeTailSeparatorsCount =
              this._separatorsCountFromSlice(beforeTailValue);

            appendDetails.tailShift +=
              (beforeTailSeparatorsCount - prevBeforeTailSeparatorsCount) *
              this.thousandsSeparator.length;
            appendDetails.skip =
              !appendDetails.rawInserted && ch === this.thousandsSeparator;
            return appendDetails;
          },
          /** */
        },
        {
          key: "_findSeparatorAround",
          value: function _findSeparatorAround(pos) {
            if (this.thousandsSeparator) {
              var searchFrom = pos - this.thousandsSeparator.length + 1;
              var separatorPos = this.value.indexOf(
                this.thousandsSeparator,
                searchFrom
              );
              if (separatorPos <= pos) return separatorPos;
            }

            return -1;
          },
        },
        {
          key: "_adjustRangeWithSeparators",
          value: function _adjustRangeWithSeparators(from, to) {
            var separatorAroundFromPos = this._findSeparatorAround(from);

            if (separatorAroundFromPos >= 0) from = separatorAroundFromPos;

            var separatorAroundToPos = this._findSeparatorAround(to);

            if (separatorAroundToPos >= 0)
              to = separatorAroundToPos + this.thousandsSeparator.length;
            return [from, to];
          },
          /**
          @override
        */
        },
        {
          key: "remove",
          value: function remove() {
            var fromPos =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : 0;
            var toPos =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : this.value.length;

            var _this$_adjustRangeWit3 = this._adjustRangeWithSeparators(
              fromPos,
              toPos
            );

            var _this$_adjustRangeWit4 = _slicedToArray(
              _this$_adjustRangeWit3,
              2
            );

            fromPos = _this$_adjustRangeWit4[0];
            toPos = _this$_adjustRangeWit4[1];
            var valueBeforePos = this.value.slice(0, fromPos);
            var valueAfterPos = this.value.slice(toPos);

            var prevBeforeTailSeparatorsCount = this._separatorsCount(
              valueBeforePos.length
            );

            this._value = this._insertThousandsSeparators(
              this._removeThousandsSeparators(valueBeforePos + valueAfterPos)
            );

            var beforeTailSeparatorsCount =
              this._separatorsCountFromSlice(valueBeforePos);

            return new ChangeDetails({
              tailShift:
                (beforeTailSeparatorsCount - prevBeforeTailSeparatorsCount) *
                this.thousandsSeparator.length,
            });
          },
          /**
          @override
        */
        },
        {
          key: "nearestInputPos",
          value: function nearestInputPos(cursorPos, direction) {
            if (!this.thousandsSeparator) return cursorPos;

            switch (direction) {
              case DIRECTION.NONE:
              case DIRECTION.LEFT:
              case DIRECTION.FORCE_LEFT: {
                var separatorAtLeftPos = this._findSeparatorAround(
                  cursorPos - 1
                );

                if (separatorAtLeftPos >= 0) {
                  var separatorAtLeftEndPos =
                    separatorAtLeftPos + this.thousandsSeparator.length;

                  if (
                    cursorPos < separatorAtLeftEndPos ||
                    this.value.length <= separatorAtLeftEndPos ||
                    direction === DIRECTION.FORCE_LEFT
                  ) {
                    return separatorAtLeftPos;
                  }
                }

                break;
              }

              case DIRECTION.RIGHT:
              case DIRECTION.FORCE_RIGHT: {
                var separatorAtRightPos = this._findSeparatorAround(cursorPos);

                if (separatorAtRightPos >= 0) {
                  return separatorAtRightPos + this.thousandsSeparator.length;
                }
              }
            }

            return cursorPos;
          },
          /**
          @override
        */
        },
        {
          key: "doValidate",
          value: function doValidate(flags) {
            var regexp = flags.input
              ? this._numberRegExpInput
              : this._numberRegExp; // validate as string

            var valid = regexp.test(
              this._removeThousandsSeparators(this.value)
            );

            if (valid) {
              // validate as number
              var number = this.number;
              valid =
                valid &&
                !isNaN(number) && // check min bound for negative values
                (this.min == null ||
                  this.min >= 0 ||
                  this.min <= this.number) && // check max bound for positive values
                (this.max == null || this.max <= 0 || this.number <= this.max);
            }

            return (
              valid &&
              _get(
                _getPrototypeOf$1(MaskedNumber.prototype),
                "doValidate",
                this
              ).call(this, flags)
            );
          },
          /**
          @override
        */
        },
        {
          key: "doCommit",
          value: function doCommit() {
            if (this.value) {
              var number = this.number;
              var validnum = number; // check bounds

              if (this.min != null) validnum = Math.max(validnum, this.min);
              if (this.max != null) validnum = Math.min(validnum, this.max);
              if (validnum !== number) this.unmaskedValue = String(validnum);
              var formatted = this.value;
              if (this.normalizeZeros)
                formatted = this._normalizeZeros(formatted);
              if (this.padFractionalZeros)
                formatted = this._padFractionalZeros(formatted);
              this._value = formatted;
            }

            _get(
              _getPrototypeOf$1(MaskedNumber.prototype),
              "doCommit",
              this
            ).call(this);
          },
          /** */
        },
        {
          key: "_normalizeZeros",
          value: function _normalizeZeros(value) {
            var parts = this._removeThousandsSeparators(value).split(
              this.radix
            ); // remove leading zeros

            parts[0] = parts[0].replace(
              /^(\D*)(0*)(\d*)/,
              function (match, sign, zeros, num) {
                return sign + num;
              }
            ); // add leading zero

            if (value.length && !/\d$/.test(parts[0]))
              parts[0] = parts[0] + "0";

            if (parts.length > 1) {
              parts[1] = parts[1].replace(/0*$/, ""); // remove trailing zeros

              if (!parts[1].length) parts.length = 1; // remove fractional
            }

            return this._insertThousandsSeparators(parts.join(this.radix));
          },
          /** */
        },
        {
          key: "_padFractionalZeros",
          value: function _padFractionalZeros(value) {
            if (!value) return value;
            var parts = value.split(this.radix);
            if (parts.length < 2) parts.push("");
            parts[1] = parts[1].padEnd(this.scale, "0");
            return parts.join(this.radix);
          },
          /**
          @override
        */
        },
        {
          key: "unmaskedValue",
          get: function get() {
            return this._removeThousandsSeparators(
              this._normalizeZeros(this.value)
            ).replace(this.radix, ".");
          },
          set: function set(unmaskedValue) {
            _set(
              _getPrototypeOf$1(MaskedNumber.prototype),
              "unmaskedValue",
              unmaskedValue.replace(".", this.radix),
              this,
              true
            );
          },
          /**
          @override
        */
        },
        {
          key: "typedValue",
          get: function get() {
            return Number(this.unmaskedValue);
          },
          set: function set(n) {
            _set(
              _getPrototypeOf$1(MaskedNumber.prototype),
              "unmaskedValue",
              String(n),
              this,
              true
            );
          },
          /** Parsed Number */
        },
        {
          key: "number",
          get: function get() {
            return this.typedValue;
          },
          set: function set(number) {
            this.typedValue = number;
          },
          /**
          Is negative allowed
          @readonly
        */
        },
        {
          key: "allowNegative",
          get: function get() {
            return (
              this.signed ||
              (this.min != null && this.min < 0) ||
              (this.max != null && this.max < 0)
            );
          },
        },
      ]);

      return MaskedNumber;
    })(Masked);
  MaskedNumber.DEFAULTS = {
    radix: ",",
    thousandsSeparator: "",
    mapToRadix: ["."],
    scale: 2,
    signed: false,
    normalizeZeros: true,
    padFractionalZeros: false,
  };
  IMask.MaskedNumber = MaskedNumber;

  /** Masking by custom Function */

  var MaskedFunction =
    /*#__PURE__*/
    (function (_Masked) {
      _inherits(MaskedFunction, _Masked);

      function MaskedFunction() {
        _classCallCheck(this, MaskedFunction);

        return _possibleConstructorReturn(
          this,
          _getPrototypeOf$1(MaskedFunction).apply(this, arguments)
        );
      }

      _createClass$1(MaskedFunction, [
        {
          key: "_update",

          /**
          @override
          @param {Object} opts
        */
          value: function _update(opts) {
            if (opts.mask) opts.validate = opts.mask;

            _get(
              _getPrototypeOf$1(MaskedFunction.prototype),
              "_update",
              this
            ).call(this, opts);
          },
        },
      ]);

      return MaskedFunction;
    })(Masked);
  IMask.MaskedFunction = MaskedFunction;

  /** Dynamic mask for choosing apropriate mask in run-time */
  var MaskedDynamic =
    /*#__PURE__*/
    (function (_Masked) {
      _inherits(MaskedDynamic, _Masked);

      /** Currently chosen mask */

      /** Compliled {@link Masked} options */

      /** Chooses {@link Masked} depending on input value */

      /**
        @param {Object} opts
      */
      function MaskedDynamic(opts) {
        var _this;

        _classCallCheck(this, MaskedDynamic);

        _this = _possibleConstructorReturn(
          this,
          _getPrototypeOf$1(MaskedDynamic).call(
            this,
            Object.assign({}, MaskedDynamic.DEFAULTS, {}, opts)
          )
        );
        _this.currentMask = null;
        return _this;
      }
      /**
        @override
      */

      _createClass$1(MaskedDynamic, [
        {
          key: "_update",
          value: function _update(opts) {
            _get(
              _getPrototypeOf$1(MaskedDynamic.prototype),
              "_update",
              this
            ).call(this, opts);

            if ("mask" in opts) {
              // mask could be totally dynamic with only `dispatch` option
              this.compiledMasks = Array.isArray(opts.mask)
                ? opts.mask.map(function (m) {
                    return createMask(m);
                  })
                : [];
            }
          },
          /**
          @override
        */
        },
        {
          key: "_appendCharRaw",
          value: function _appendCharRaw() {
            var details = this._applyDispatch.apply(this, arguments);

            if (this.currentMask) {
              var _this$currentMask;

              details.aggregate(
                (_this$currentMask = this.currentMask)._appendChar.apply(
                  _this$currentMask,
                  arguments
                )
              );
            }

            return details;
          },
        },
        {
          key: "_applyDispatch",
          value: function _applyDispatch() {
            var appended =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : "";
            var flags =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : {};
            var prevValueBeforeTail =
              flags.tail && flags._beforeTailState != null
                ? flags._beforeTailState._value
                : this.value;
            var inputValue = this.rawInputValue;
            var insertValue =
              flags.tail && flags._beforeTailState != null // $FlowFixMe - tired to fight with type system
                ? flags._beforeTailState._rawInputValue
                : inputValue;
            var tailValue = inputValue.slice(insertValue.length);
            var prevMask = this.currentMask;
            var details = new ChangeDetails();
            var prevMaskState = prevMask && prevMask.state; // clone flags to prevent overwriting `_beforeTailState`

            this.currentMask = this.doDispatch(
              appended,
              Object.assign({}, flags)
            ); // restore state after dispatch

            if (this.currentMask) {
              if (this.currentMask !== prevMask) {
                // if mask changed reapply input
                this.currentMask.reset(); // $FlowFixMe - it's ok, we don't change current mask above

                var d = this.currentMask.append(insertValue, {
                  raw: true,
                });
                details.tailShift =
                  d.inserted.length - prevValueBeforeTail.length;

                if (tailValue) {
                  // $FlowFixMe - it's ok, we don't change current mask above
                  details.tailShift += this.currentMask.append(tailValue, {
                    raw: true,
                    tail: true,
                  }).tailShift;
                }
              } else {
                // Dispatch can do something bad with state, so
                // restore prev mask state
                this.currentMask.state = prevMaskState;
              }
            }

            return details;
          },
        },
        {
          key: "_appendPlaceholder",
          value: function _appendPlaceholder() {
            var details = this._applyDispatch.apply(this, arguments);

            if (this.currentMask) {
              details.aggregate(this.currentMask._appendPlaceholder());
            }

            return details;
          },
          /**
          @override
        */
        },
        {
          key: "doDispatch",
          value: function doDispatch(appended) {
            var flags =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : {};
            return this.dispatch(appended, this, flags);
          },
          /**
          @override
        */
        },
        {
          key: "doValidate",
          value: function doValidate() {
            var _get2, _this$currentMask2;

            for (
              var _len = arguments.length, args = new Array(_len), _key = 0;
              _key < _len;
              _key++
            ) {
              args[_key] = arguments[_key];
            }

            return (
              (_get2 = _get(
                _getPrototypeOf$1(MaskedDynamic.prototype),
                "doValidate",
                this
              )).call.apply(_get2, [this].concat(args)) &&
              (!this.currentMask ||
                (_this$currentMask2 = this.currentMask).doValidate.apply(
                  _this$currentMask2,
                  args
                ))
            );
          },
          /**
          @override
        */
        },
        {
          key: "reset",
          value: function reset() {
            if (this.currentMask) this.currentMask.reset();
            this.compiledMasks.forEach(function (m) {
              return m.reset();
            });
          },
          /**
          @override
        */
        },
        {
          key: "remove",

          /**
          @override
        */
          value: function remove() {
            var details = new ChangeDetails();

            if (this.currentMask) {
              var _this$currentMask3;

              details
                .aggregate(
                  (_this$currentMask3 = this.currentMask).remove.apply(
                    _this$currentMask3,
                    arguments
                  )
                ) // update with dispatch
                .aggregate(this._applyDispatch());
            }

            return details;
          },
          /**
          @override
        */
        },
        {
          key: "extractInput",

          /**
          @override
        */
          value: function extractInput() {
            var _this$currentMask4;

            return this.currentMask
              ? (_this$currentMask4 = this.currentMask).extractInput.apply(
                  _this$currentMask4,
                  arguments
                )
              : "";
          },
          /**
          @override
        */
        },
        {
          key: "extractTail",
          value: function extractTail() {
            var _this$currentMask5, _get3;

            for (
              var _len2 = arguments.length, args = new Array(_len2), _key2 = 0;
              _key2 < _len2;
              _key2++
            ) {
              args[_key2] = arguments[_key2];
            }

            return this.currentMask
              ? (_this$currentMask5 = this.currentMask).extractTail.apply(
                  _this$currentMask5,
                  args
                )
              : (_get3 = _get(
                  _getPrototypeOf$1(MaskedDynamic.prototype),
                  "extractTail",
                  this
                )).call.apply(_get3, [this].concat(args));
          },
          /**
          @override
        */
        },
        {
          key: "doCommit",
          value: function doCommit() {
            if (this.currentMask) this.currentMask.doCommit();

            _get(
              _getPrototypeOf$1(MaskedDynamic.prototype),
              "doCommit",
              this
            ).call(this);
          },
          /**
          @override
        */
        },
        {
          key: "nearestInputPos",
          value: function nearestInputPos() {
            var _this$currentMask6, _get4;

            for (
              var _len3 = arguments.length, args = new Array(_len3), _key3 = 0;
              _key3 < _len3;
              _key3++
            ) {
              args[_key3] = arguments[_key3];
            }

            return this.currentMask
              ? (_this$currentMask6 = this.currentMask).nearestInputPos.apply(
                  _this$currentMask6,
                  args
                )
              : (_get4 = _get(
                  _getPrototypeOf$1(MaskedDynamic.prototype),
                  "nearestInputPos",
                  this
                )).call.apply(_get4, [this].concat(args));
          },
        },
        {
          key: "value",
          get: function get() {
            return this.currentMask ? this.currentMask.value : "";
          },
          set: function set(value) {
            _set(
              _getPrototypeOf$1(MaskedDynamic.prototype),
              "value",
              value,
              this,
              true
            );
          },
          /**
          @override
        */
        },
        {
          key: "unmaskedValue",
          get: function get() {
            return this.currentMask ? this.currentMask.unmaskedValue : "";
          },
          set: function set(unmaskedValue) {
            _set(
              _getPrototypeOf$1(MaskedDynamic.prototype),
              "unmaskedValue",
              unmaskedValue,
              this,
              true
            );
          },
          /**
          @override
        */
        },
        {
          key: "typedValue",
          get: function get() {
            return this.currentMask ? this.currentMask.typedValue : "";
          }, // probably typedValue should not be used with dynamic
          set: function set(value) {
            var unmaskedValue = String(value); // double check it

            if (this.currentMask) {
              this.currentMask.typedValue = value;
              unmaskedValue = this.currentMask.unmaskedValue;
            }

            this.unmaskedValue = unmaskedValue;
          },
          /**
          @override
        */
        },
        {
          key: "isComplete",
          get: function get() {
            return !!this.currentMask && this.currentMask.isComplete;
          },
        },
        {
          key: "state",
          get: function get() {
            return Object.assign(
              {},
              _get(_getPrototypeOf$1(MaskedDynamic.prototype), "state", this),
              {
                _rawInputValue: this.rawInputValue,
                compiledMasks: this.compiledMasks.map(function (m) {
                  return m.state;
                }),
                currentMaskRef: this.currentMask,
                currentMask: this.currentMask && this.currentMask.state,
              }
            );
          },
          set: function set(state) {
            var compiledMasks = state.compiledMasks,
              currentMaskRef = state.currentMaskRef,
              currentMask = state.currentMask,
              maskedState = _objectWithoutProperties(state, [
                "compiledMasks",
                "currentMaskRef",
                "currentMask",
              ]);

            this.compiledMasks.forEach(function (m, mi) {
              return (m.state = compiledMasks[mi]);
            });

            if (currentMaskRef != null) {
              this.currentMask = currentMaskRef;
              this.currentMask.state = currentMask;
            }

            _set(
              _getPrototypeOf$1(MaskedDynamic.prototype),
              "state",
              maskedState,
              this,
              true
            );
          },
        },
        {
          key: "overwrite",
          get: function get() {
            return this.currentMask
              ? this.currentMask.overwrite
              : _get(
                  _getPrototypeOf$1(MaskedDynamic.prototype),
                  "overwrite",
                  this
                );
          },
          set: function set(overwrite) {
            console.warn(
              '"overwrite" option is not available in dynamic mask, use this option in siblings'
            );
          },
        },
      ]);

      return MaskedDynamic;
    })(Masked);
  MaskedDynamic.DEFAULTS = {
    dispatch: function dispatch(appended, masked, flags) {
      if (!masked.compiledMasks.length) return;
      var inputValue = masked.rawInputValue; // simulate input

      var inputs = masked.compiledMasks.map(function (m, index) {
        m.reset();
        m.append(inputValue, {
          raw: true,
        });
        m.append(appended, flags);
        var weight = m.rawInputValue.length;
        return {
          weight: weight,
          index: index,
        };
      }); // pop masks with longer values first

      inputs.sort(function (i1, i2) {
        return i2.weight - i1.weight;
      });
      return masked.compiledMasks[inputs[0].index];
    },
  };
  IMask.MaskedDynamic = MaskedDynamic;

  /** Mask pipe source and destination types */

  var PIPE_TYPE = {
    MASKED: "value",
    UNMASKED: "unmaskedValue",
    TYPED: "typedValue",
  };
  /** Creates new pipe function depending on mask type, source and destination options */

  function createPipe(mask) {
    var from =
      arguments.length > 1 && arguments[1] !== undefined
        ? arguments[1]
        : PIPE_TYPE.MASKED;
    var to =
      arguments.length > 2 && arguments[2] !== undefined
        ? arguments[2]
        : PIPE_TYPE.MASKED;
    var masked = createMask(mask);
    return function (value) {
      return masked.runIsolated(function (m) {
        m[from] = value;
        return m[to];
      });
    };
  }
  /** Pipes value through mask depending on mask type, source and destination options */

  function pipe(value) {
    for (
      var _len = arguments.length,
        pipeArgs = new Array(_len > 1 ? _len - 1 : 0),
        _key = 1;
      _key < _len;
      _key++
    ) {
      pipeArgs[_key - 1] = arguments[_key];
    }

    return createPipe.apply(void 0, pipeArgs)(value);
  }
  IMask.PIPE_TYPE = PIPE_TYPE;
  IMask.createPipe = createPipe;
  IMask.pipe = pipe;

  try {
    globalThis.IMask = IMask;
  } catch (e) {}

  class Dropdown {
    constructor(ref) {
      this.ref = ref;
      const dataset = this.ref.dataset;
      this.options = JSON.parse(dataset.dropdownOptions);
      this.placeholder = dataset.dropdownPlaceholder;
      this.readOnly = dataset.dropdownReadonly ?? false;
      this.name = dataset.dropdownName ?? "genericDropdown";
      this.data = { key: "", value: "" };
      this.ref.innerHTML = this.render();
      this.visibleInput = this.ref.querySelector("[data-dropdown-input]");
      this.hiddenInput = this.ref.querySelector("[data-dropdown-value]");
      this.optionsList = this.ref.querySelector("[data-dropdown-list]");
      this.addEventListeners();
    }
    render() {
      return /*html*/ `
            ${this.renderInputs()}
            <div data-dropdown-arrow=""></div>
            <div data-dropdown-list>
                ${this.renderOptions()}
            </div>
			`;
    }
    renderInputs() {
      return /*html*/ `
            <input data-dropdown-input ${
              this.readOnly ? "readonly" : ""
            } name="${this.name}-visible" placeholder="${this.placeholder}">
            <input data-dropdown-value type="hidden" name="${this.name}">
			`;
    }
    renderOptions(options = this.options) {
      return options.reduce((html, option) => {
        return (html += /*html*/ `<button type="button" data-dropdown-option data-dropdown-value="${option.value}">${option.key}</button>`);
      }, "");
    }
    addEventListeners() {
      //    this.visibleInput.addEventListener('focus', this.handleInputFocus.bind(this));
      //    this.visibleInput.addEventListener('input', this.handleInputInput.bind(this));
      //    this.visibleInput.addEventListener('blur', this.handleInputBlur.bind(this));
      this.ref.addEventListener("click", this.handleClick.bind(this));
      this.optionsList.addEventListener(
        "mousedown",
        this.handleOptionClick.bind(this)
      );
    }
    handleInputFocus() {
      this.ref.classList.add("on-focus");
      if (!this.readOnly) {
        this.visibleInput.placeholder = "Поиск по названию";
        this.visibleInput.value = "";
      }

      document.dispatchEvent(
        new CustomEvent("dropdown::gotFocus", { detail: { el: this.ref } })
      );
    }
    handleInputBlur() {
      this.ref.classList.remove("on-focus");
      this.visibleInput.placeholder = this.placeholder;
      this.visibleInput.value = this.data.key;
      document.dispatchEvent(
        new CustomEvent("dropdown::lostFocus", { detail: { el: this.ref } })
      );
    }
    handleOptionClick({ target }) {
      const btn = target.closest("[data-dropdown-option]");
      this.setOption({
        key: btn.innerText,
        value: btn.dataset.dropdownValue,
      });
    }

    handleClick() {
      this.ref.classList.toggle("on-focus");
    }
    setOption({ key, value }) {
      this.visibleInput.value = key;
      this.hiddenInput.value = value;
      this.data = { key: key, value: value };
      document.dispatchEvent(
        new CustomEvent("dropdown::optionSet", {
          detail: {
            el: this.ref,
            data: this.data,
          },
        })
      );
    }
    handleInputInput({ target }) {
      const options = this.filterOptions(target.value);
      if (options.length) {
        this.optionsList.innerHTML = this.renderOptions(options);
      } else {
        this.optionsList.innerHTML =
          '<div data-dropdown-option class="is-disabled">Ничего не найдено</div>';
      }
    }
    filterOptions(query) {
      return this.options.filter(
        (option) => ~option.key.toLowerCase().indexOf(query.toLowerCase())
      );
    }
  }

  class Modal {
    constructor(el) {
      this.el = el;
      this.needOverlay = !el.dataset.modalNoOverlay;
      this.parentModal = el.dataset.parentModal;
      this.clickedToggle = null;
      this.firstInput = this.el.querySelector("input, textarea");
    }
    get isActive() {
      return this.el.classList.contains("is-active");
    }
    set isActive(bool) {
      if (bool) {
        this.el.classList.add("is-active");
        if (this.firstInput) {
          setTimeout(() => {
            this.firstInput.focus();
          }, 100);
        }
      } else {
        this.el.classList.remove("is-active");
        if (this.clickedToggle) {
          this.clickedToggle.classList.remove("is-clicked");
        }
        if (this.el.querySelector(".on-success")) {
          setTimeout((_) => {
            this.el.querySelector(".on-success").classList.remove("on-success");
          }, 500);
        }
      }
    }
    get isOnActiveChild() {
      return this.el.classList.contains("on-active-child");
    }
    set isOnActiveChild(bool) {
      if (bool) {
        this.el.classList.add("on-active-child");
      } else {
        this.el.classList.remove("on-active-child");
      }
    }
  }

  let ModalDispatcher = (function () {
    let commonModalOverlay,
      commonModalOverlayRect,
      commonCloseButton,
      activeModal = null,
      modalsList = {};

    function checkIfModalInList(modalName) {
      return typeof modalsList[modalName] !== "undefined";
    }

    function createModal(modal) {
      let modalName = modal.dataset.modal;
      if (!checkIfModalInList(modalName)) {
        modalsList[modalName] = new Modal(modal);
      }
    }

    function fillList() {
      modalsList = {};
      let modals = document.querySelectorAll("[data-modal]");
      [].forEach.call(modals, createModal);
    }

    function showModal(modal) {
      if (activeModal) {
        if (activeModal === modalsList[modal.parentModal]) {
          modalsList[modal.parentModal].isOnActiveChild = true;
        } else {
          if (
            activeModal.parentModal &&
            modalsList[activeModal.parentModal].isActive
          ) {
            closeModal(modalsList[activeModal.parentModal]);
          }
          closeModal();
        }
      }
      modal.isActive = true;
      activeModal = modal;
      handleOverlay();
    }

    function closeModal(modal) {
      if (activeModal.parentModal) {
        modalsList[activeModal.parentModal].isOnActiveChild = false;
        activeModal.isActive = false;
        activeModal = modalsList[activeModal.parentModal];
      } else {
        closeAll();
      }

      handleOverlay();
    }

    function handleClosing(modal = null) {
      if (modal) {
        closeModal();
      } else {
        closeAll();
      }
    }

    function closeAll(event) {
      if (!event || event.which === 1) {
        if (activeModal) {
          activeModal.isActive = false;
          if (modalsList[activeModal.parentModal]) {
            modalsList[activeModal.parentModal].isActive = false;
            modalsList[activeModal.parentModal].isOnActiveChild = false;
          }

          activeModal = null;
          handleOverlay();
        }
      }
    }

    function handleOverlay() {
      if (!commonModalOverlay) {
        return;
      }
      if (activeModal && activeModal.needOverlay) {
        commonModalOverlay.classList.add("is-active");
        if (commonCloseButton) {
          commonCloseButton.style.willChange = "transform";
        }
      } else {
        commonModalOverlay.classList.remove("is-active");
        if (commonCloseButton) {
          commonCloseButton.style.willChange = "";
        }
      }
    }

    function moveCloseButton(event) {
      let x = event.pageX,
        y = event.pageY,
        modalOffsetX = commonModalOverlayRect.left,
        modalOffsetY = commonModalOverlayRect.top,
        toX = x - modalOffsetX - commonCloseButton.offsetWidth / 2,
        toY = y - modalOffsetY - commonCloseButton.offsetHeight / 2;

      commonCloseButton.style.transform =
        "translate3d(" + toX + "px, " + toY + "px, 0)";
    }

    function hideCloseButton() {
      commonCloseButton.style.display = "none";
    }
    function showCloseButton() {
      commonCloseButton.style.display = "";
    }

    function setInputs(modal, inputs) {
      const target = modal.el.querySelector("form");
      inputs.forEach((input) => {
        const el = target.querySelector(`[name="${input.key}"]`);
        if (el) {
          el.value = input.value;
        }
      });
    }
    function setFormId(modal, formId) {
      const target = modal.el.querySelector("form");
      target.id = formId;
    }

    function bindEvents() {
      document.addEventListener("mousedown", function (event) {
        if (event.which === 1) {
          let toggle = event.target.closest("[data-linked-modal]");

          if (!!toggle && !!modalsList[toggle.dataset.linkedModal]) {
            toggle.classList.add("is-clicked");
            modalsList[toggle.dataset.linkedModal].clickedToggle = toggle;
            showModal(modalsList[toggle.dataset.linkedModal]);
            event.stopPropagation();
            event.preventDefault();

            if (toggle.dataset.modalSetInputs) {
              setInputs(
                modalsList[toggle.dataset.linkedModal],
                JSON.parse(toggle.dataset.modalSetInputs)
              );
            }
            if (toggle.dataset.modalFormId) {
              setFormId(
                modalsList[toggle.dataset.linkedModal],
                toggle.dataset.modalFormId
              );
            }
          }
        }
      });

      document.addEventListener("mousedown", function (event) {
        if (event.which === 1) {
          let closeButton = event.target.closest("[data-modal-close]");
          if (!!closeButton) {
            var modal =
              modalsList[closeButton.closest("[data-modal]").dataset.modal];
            handleClosing(modal);
          }
        }
      });
      document.addEventListener("keyup", function (event) {
        event = event || window.event;
        if (event.keyCode == 27) {
          handleClosing(activeModal);
        }
      });

      document.addEventListener("needModal", ({ detail }) => {
        showModal(modalsList[detail]);
      });

      document.addEventListener("needCloseModal", ({ detail }) => {
        closeModal(modalsList[detail]);
      });

      if (commonModalOverlay) {
        commonModalOverlay.addEventListener("mousedown", closeAll);
        if (commonCloseButton) {
          commonModalOverlayRect = commonModalOverlay.getBoundingClientRect();
          commonModalOverlay.addEventListener(
            "mousemove",
            Utils.throttle(moveCloseButton, 10)
          );
          commonModalOverlay.addEventListener("mouseleave", hideCloseButton);
          commonModalOverlay.addEventListener("mouseenter", showCloseButton);
        }
      }
    }

    function init() {
      commonModalOverlay = document.getElementById("commonModalOverlay");
      commonCloseButton = document.getElementById("commonCloseButton");
      fillList();
      bindEvents();
    }
    return {
      init: init,
      closeAll: closeAll,
    };
  })();

  /* locomotive-scroll v4.1.0 | MIT License | https://github.com/locomotivemtl/locomotive-scroll */
  function _classCallCheck$1(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$2(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$2(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$2(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$2(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty$1(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true,
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly)
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty$1(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(
          target,
          Object.getOwnPropertyDescriptors(source)
        );
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(
            target,
            key,
            Object.getOwnPropertyDescriptor(source, key)
          );
        });
      }
    }

    return target;
  }

  function _inherits$1(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true,
      },
    });
    if (superClass) _setPrototypeOf$2(subClass, superClass);
  }

  function _getPrototypeOf$2(o) {
    _getPrototypeOf$2 = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function _getPrototypeOf(o) {
          return o.__proto__ || Object.getPrototypeOf(o);
        };
    return _getPrototypeOf$2(o);
  }

  function _setPrototypeOf$2(o, p) {
    _setPrototypeOf$2 =
      Object.setPrototypeOf ||
      function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };

    return _setPrototypeOf$2(o, p);
  }

  function _isNativeReflectConstruct$1() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized$2(self) {
    if (self === void 0) {
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    }

    return self;
  }

  function _possibleConstructorReturn$1(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized$2(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct$1();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf$2(Derived),
        result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf$2(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn$1(this, result);
    };
  }

  function _superPropBase$1(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf$2(object);
      if (object === null) break;
    }

    return object;
  }

  function _get$1(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get$1 = Reflect.get;
    } else {
      _get$1 = function _get(target, property, receiver) {
        var base = _superPropBase$1(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get$1(target, property, receiver || target);
  }

  function _slicedToArray$1(arr, i) {
    return (
      _arrayWithHoles$1(arr) ||
      _iterableToArrayLimit$1(arr, i) ||
      _unsupportedIterableToArray(arr, i) ||
      _nonIterableRest$1()
    );
  }

  function _toConsumableArray(arr) {
    return (
      _arrayWithoutHoles(arr) ||
      _iterableToArray(arr) ||
      _unsupportedIterableToArray(arr) ||
      _nonIterableSpread()
    );
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles$1(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter))
      return Array.from(iter);
  }

  function _iterableToArrayLimit$1(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr)))
      return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (
        var _i = arr[Symbol.iterator](), _s;
        !(_n = (_s = _i.next()).done);
        _n = true
      ) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError(
      "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }

  function _nonIterableRest$1() {
    throw new TypeError(
      "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }

  var defaults$1 = {
    el: document,
    name: "scroll",
    offset: [0, 0],
    repeat: false,
    smooth: false,
    initPosition: {
      x: 0,
      y: 0,
    },
    direction: "vertical",
    gestureDirection: "vertical",
    reloadOnContextChange: false,
    lerp: 0.1,
    class: "is-inview",
    scrollbarContainer: false,
    scrollbarClass: "c-scrollbar",
    scrollingClass: "has-scroll-scrolling",
    draggingClass: "has-scroll-dragging",
    smoothClass: "has-scroll-smooth",
    initClass: "has-scroll-init",
    getSpeed: false,
    getDirection: false,
    scrollFromAnywhere: false,
    multiplier: 1,
    firefoxMultiplier: 50,
    touchMultiplier: 2,
    resetNativeScroll: true,
    tablet: {
      smooth: false,
      direction: "vertical",
      gestureDirection: "vertical",
      breakpoint: 1024,
    },
    smartphone: {
      smooth: false,
      direction: "vertical",
      gestureDirection: "vertical",
    },
  };

  var _default = /*#__PURE__*/ (function () {
    function _default() {
      var options =
        arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck$1(this, _default);

      Object.assign(this, defaults$1, options);
      this.smartphone = defaults$1.smartphone;
      if (options.smartphone)
        Object.assign(this.smartphone, options.smartphone);
      this.tablet = defaults$1.tablet;
      if (options.tablet) Object.assign(this.tablet, options.tablet);
      this.namespace = "locomotive";
      this.html = document.documentElement;
      this.windowHeight = window.innerHeight;
      this.windowWidth = window.innerWidth;
      this.windowMiddle = {
        x: this.windowWidth / 2,
        y: this.windowHeight / 2,
      };
      this.els = {};
      this.currentElements = {};
      this.listeners = {};
      this.hasScrollTicking = false;
      this.hasCallEventSet = false;
      this.checkScroll = this.checkScroll.bind(this);
      this.checkResize = this.checkResize.bind(this);
      this.checkEvent = this.checkEvent.bind(this);
      this.instance = {
        scroll: {
          x: 0,
          y: 0,
        },
        limit: {
          x: this.html.offsetHeight,
          y: this.html.offsetHeight,
        },
        currentElements: this.currentElements,
      };

      if (this.isMobile) {
        if (this.isTablet) {
          this.context = "tablet";
        } else {
          this.context = "smartphone";
        }
      } else {
        this.context = "desktop";
      }

      if (this.isMobile) this.direction = this[this.context].direction;

      if (this.direction === "horizontal") {
        this.directionAxis = "x";
      } else {
        this.directionAxis = "y";
      }

      if (this.getDirection) {
        this.instance.direction = null;
      }

      if (this.getDirection) {
        this.instance.speed = 0;
      }

      this.html.classList.add(this.initClass);
      window.addEventListener("resize", this.checkResize, false);
    }

    _createClass$2(_default, [
      {
        key: "init",
        value: function init() {
          this.initEvents();
        },
      },
      {
        key: "checkScroll",
        value: function checkScroll() {
          this.dispatchScroll();
        },
      },
      {
        key: "checkResize",
        value: function checkResize() {
          var _this = this;

          if (!this.resizeTick) {
            this.resizeTick = true;
            requestAnimationFrame(function () {
              _this.resize();

              _this.resizeTick = false;
            });
          }
        },
      },
      {
        key: "resize",
        value: function resize() {},
      },
      {
        key: "checkContext",
        value: function checkContext() {
          if (!this.reloadOnContextChange) return;
          this.isMobile =
            /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
              navigator.userAgent
            ) ||
            (navigator.platform === "MacIntel" &&
              navigator.maxTouchPoints > 1) ||
            this.windowWidth < this.tablet.breakpoint;
          this.isTablet =
            this.isMobile && this.windowWidth >= this.tablet.breakpoint;
          var oldContext = this.context;

          if (this.isMobile) {
            if (this.isTablet) {
              this.context = "tablet";
            } else {
              this.context = "smartphone";
            }
          } else {
            this.context = "desktop";
          }

          if (oldContext != this.context) {
            var oldSmooth =
              oldContext == "desktop" ? this.smooth : this[oldContext].smooth;
            var newSmooth =
              this.context == "desktop"
                ? this.smooth
                : this[this.context].smooth;
            if (oldSmooth != newSmooth) window.location.reload();
          }
        },
      },
      {
        key: "initEvents",
        value: function initEvents() {
          var _this2 = this;

          this.scrollToEls = this.el.querySelectorAll(
            "[data-".concat(this.name, "-to]")
          );
          this.setScrollTo = this.setScrollTo.bind(this);
          this.scrollToEls.forEach(function (el) {
            el.addEventListener("click", _this2.setScrollTo, false);
          });
        },
      },
      {
        key: "setScrollTo",
        value: function setScrollTo(event) {
          event.preventDefault();
          this.scrollTo(
            event.currentTarget.getAttribute(
              "data-".concat(this.name, "-href")
            ) || event.currentTarget.getAttribute("href"),
            {
              offset: event.currentTarget.getAttribute(
                "data-".concat(this.name, "-offset")
              ),
            }
          );
        },
      },
      {
        key: "addElements",
        value: function addElements() {},
      },
      {
        key: "detectElements",
        value: function detectElements(hasCallEventSet) {
          var _this3 = this;

          var scrollTop = this.instance.scroll.y;
          var scrollBottom = scrollTop + this.windowHeight;
          var scrollLeft = this.instance.scroll.x;
          var scrollRight = scrollLeft + this.windowWidth;
          Object.entries(this.els).forEach(function (_ref) {
            var _ref2 = _slicedToArray$1(_ref, 2),
              i = _ref2[0],
              el = _ref2[1];

            if (el && (!el.inView || hasCallEventSet)) {
              if (_this3.direction === "horizontal") {
                if (scrollRight >= el.left && scrollLeft < el.right) {
                  _this3.setInView(el, i);
                }
              } else {
                if (scrollBottom >= el.top && scrollTop < el.bottom) {
                  _this3.setInView(el, i);
                }
              }
            }

            if (el && el.inView) {
              if (_this3.direction === "horizontal") {
                var width = el.right - el.left;
                el.progress =
                  (_this3.instance.scroll.x - (el.left - _this3.windowWidth)) /
                  (width + _this3.windowWidth);

                if (scrollRight < el.left || scrollLeft > el.right) {
                  _this3.setOutOfView(el, i);
                }
              } else {
                var height = el.bottom - el.top;
                el.progress =
                  (_this3.instance.scroll.y - (el.top - _this3.windowHeight)) /
                  (height + _this3.windowHeight);

                if (scrollBottom < el.top || scrollTop > el.bottom) {
                  _this3.setOutOfView(el, i);
                }
              }
            }
          }); // this.els = this.els.filter((current, i) => {
          //     return current !== null;
          // });

          this.hasScrollTicking = false;
        },
      },
      {
        key: "setInView",
        value: function setInView(current, i) {
          this.els[i].inView = true;
          current.el.classList.add(current["class"]);
          this.currentElements[i] = current;

          if (current.call && this.hasCallEventSet) {
            this.dispatchCall(current, "enter");

            if (!current.repeat) {
              this.els[i].call = false;
            }
          } // if (!current.repeat && !current.speed && !current.sticky) {
          //     if (!current.call || current.call && this.hasCallEventSet) {
          //        this.els[i] = null
          //     }
          // }
        },
      },
      {
        key: "setOutOfView",
        value: function setOutOfView(current, i) {
          var _this4 = this;

          // if (current.repeat || current.speed !== undefined) {
          this.els[i].inView = false; // }

          Object.keys(this.currentElements).forEach(function (el) {
            el === i && delete _this4.currentElements[el];
          });

          if (current.call && this.hasCallEventSet) {
            this.dispatchCall(current, "exit");
          }

          if (current.repeat) {
            current.el.classList.remove(current["class"]);
          }
        },
      },
      {
        key: "dispatchCall",
        value: function dispatchCall(current, way) {
          this.callWay = way;
          this.callValue = current.call.split(",").map(function (item) {
            return item.trim();
          });
          this.callObj = current;
          if (this.callValue.length == 1) this.callValue = this.callValue[0];
          var callEvent = new Event(this.namespace + "call");
          this.el.dispatchEvent(callEvent);
        },
      },
      {
        key: "dispatchScroll",
        value: function dispatchScroll() {
          var scrollEvent = new Event(this.namespace + "scroll");
          this.el.dispatchEvent(scrollEvent);
        },
      },
      {
        key: "setEvents",
        value: function setEvents(event, func) {
          if (!this.listeners[event]) {
            this.listeners[event] = [];
          }

          var list = this.listeners[event];
          list.push(func);

          if (list.length === 1) {
            this.el.addEventListener(
              this.namespace + event,
              this.checkEvent,
              false
            );
          }

          if (event === "call") {
            this.hasCallEventSet = true;
            this.detectElements(true);
          }
        },
      },
      {
        key: "unsetEvents",
        value: function unsetEvents(event, func) {
          if (!this.listeners[event]) return;
          var list = this.listeners[event];
          var index = list.indexOf(func);
          if (index < 0) return;
          list.splice(index, 1);

          if (list.index === 0) {
            this.el.removeEventListener(
              this.namespace + event,
              this.checkEvent,
              false
            );
          }
        },
      },
      {
        key: "checkEvent",
        value: function checkEvent(event) {
          var _this5 = this;

          var name = event.type.replace(this.namespace, "");
          var list = this.listeners[name];
          if (!list || list.length === 0) return;
          list.forEach(function (func) {
            switch (name) {
              case "scroll":
                return func(_this5.instance);

              case "call":
                return func(_this5.callValue, _this5.callWay, _this5.callObj);

              default:
                return func();
            }
          });
        },
      },
      {
        key: "startScroll",
        value: function startScroll() {},
      },
      {
        key: "stopScroll",
        value: function stopScroll() {},
      },
      {
        key: "setScroll",
        value: function setScroll(x, y) {
          this.instance.scroll = {
            x: 0,
            y: 0,
          };
        },
      },
      {
        key: "destroy",
        value: function destroy() {
          var _this6 = this;

          window.removeEventListener("resize", this.checkResize, false);
          Object.keys(this.listeners).forEach(function (event) {
            _this6.el.removeEventListener(
              _this6.namespace + event,
              _this6.checkEvent,
              false
            );
          });
          this.listeners = {};
          this.scrollToEls.forEach(function (el) {
            el.removeEventListener("click", _this6.setScrollTo, false);
          });
          this.html.classList.remove(this.initClass);
        },
      },
    ]);

    return _default;
  })();

  var commonjsGlobal =
    typeof globalThis !== "undefined"
      ? globalThis
      : typeof window !== "undefined"
      ? window
      : typeof global !== "undefined"
      ? global
      : typeof self !== "undefined"
      ? self
      : {};

  function createCommonjsModule(fn, module) {
    return (
      (module = { exports: {} }), fn(module, module.exports), module.exports
    );
  }

  var smoothscroll = createCommonjsModule(function (module, exports) {
    /* smoothscroll v0.4.4 - 2019 - Dustan Kasten, Jeremias Menichelli - MIT License */
    (function () {
      // polyfill
      function polyfill() {
        // aliases
        var w = window;
        var d = document;

        // return if scroll behavior is supported and polyfill is not forced
        if (
          "scrollBehavior" in d.documentElement.style &&
          w.__forceSmoothScrollPolyfill__ !== true
        ) {
          return;
        }

        // globals
        var Element = w.HTMLElement || w.Element;
        var SCROLL_TIME = 468;

        // object gathering original scroll methods
        var original = {
          scroll: w.scroll || w.scrollTo,
          scrollBy: w.scrollBy,
          elementScroll: Element.prototype.scroll || scrollElement,
          scrollIntoView: Element.prototype.scrollIntoView,
        };

        // define timing method
        var now =
          w.performance && w.performance.now
            ? w.performance.now.bind(w.performance)
            : Date.now;

        /**
         * indicates if a the current browser is made by Microsoft
         * @method isMicrosoftBrowser
         * @param {String} userAgent
         * @returns {Boolean}
         */
        function isMicrosoftBrowser(userAgent) {
          var userAgentPatterns = ["MSIE ", "Trident/", "Edge/"];

          return new RegExp(userAgentPatterns.join("|")).test(userAgent);
        }

        /*
         * IE has rounding bug rounding down clientHeight and clientWidth and
         * rounding up scrollHeight and scrollWidth causing false positives
         * on hasScrollableSpace
         */
        var ROUNDING_TOLERANCE = isMicrosoftBrowser(w.navigator.userAgent)
          ? 1
          : 0;

        /**
         * changes scroll position inside an element
         * @method scrollElement
         * @param {Number} x
         * @param {Number} y
         * @returns {undefined}
         */
        function scrollElement(x, y) {
          this.scrollLeft = x;
          this.scrollTop = y;
        }

        /**
         * returns result of applying ease math function to a number
         * @method ease
         * @param {Number} k
         * @returns {Number}
         */
        function ease(k) {
          return 0.5 * (1 - Math.cos(Math.PI * k));
        }

        /**
         * indicates if a smooth behavior should be applied
         * @method shouldBailOut
         * @param {Number|Object} firstArg
         * @returns {Boolean}
         */
        function shouldBailOut(firstArg) {
          if (
            firstArg === null ||
            typeof firstArg !== "object" ||
            firstArg.behavior === undefined ||
            firstArg.behavior === "auto" ||
            firstArg.behavior === "instant"
          ) {
            // first argument is not an object/null
            // or behavior is auto, instant or undefined
            return true;
          }

          if (typeof firstArg === "object" && firstArg.behavior === "smooth") {
            // first argument is an object and behavior is smooth
            return false;
          }

          // throw error when behavior is not supported
          throw new TypeError(
            "behavior member of ScrollOptions " +
              firstArg.behavior +
              " is not a valid value for enumeration ScrollBehavior."
          );
        }

        /**
         * indicates if an element has scrollable space in the provided axis
         * @method hasScrollableSpace
         * @param {Node} el
         * @param {String} axis
         * @returns {Boolean}
         */
        function hasScrollableSpace(el, axis) {
          if (axis === "Y") {
            return el.clientHeight + ROUNDING_TOLERANCE < el.scrollHeight;
          }

          if (axis === "X") {
            return el.clientWidth + ROUNDING_TOLERANCE < el.scrollWidth;
          }
        }

        /**
         * indicates if an element has a scrollable overflow property in the axis
         * @method canOverflow
         * @param {Node} el
         * @param {String} axis
         * @returns {Boolean}
         */
        function canOverflow(el, axis) {
          var overflowValue = w.getComputedStyle(el, null)["overflow" + axis];

          return overflowValue === "auto" || overflowValue === "scroll";
        }

        /**
         * indicates if an element can be scrolled in either axis
         * @method isScrollable
         * @param {Node} el
         * @param {String} axis
         * @returns {Boolean}
         */
        function isScrollable(el) {
          var isScrollableY =
            hasScrollableSpace(el, "Y") && canOverflow(el, "Y");
          var isScrollableX =
            hasScrollableSpace(el, "X") && canOverflow(el, "X");

          return isScrollableY || isScrollableX;
        }

        /**
         * finds scrollable parent of an element
         * @method findScrollableParent
         * @param {Node} el
         * @returns {Node} el
         */
        function findScrollableParent(el) {
          while (el !== d.body && isScrollable(el) === false) {
            el = el.parentNode || el.host;
          }

          return el;
        }

        /**
         * self invoked function that, given a context, steps through scrolling
         * @method step
         * @param {Object} context
         * @returns {undefined}
         */
        function step(context) {
          var time = now();
          var value;
          var currentX;
          var currentY;
          var elapsed = (time - context.startTime) / SCROLL_TIME;

          // avoid elapsed times higher than one
          elapsed = elapsed > 1 ? 1 : elapsed;

          // apply easing to elapsed time
          value = ease(elapsed);

          currentX = context.startX + (context.x - context.startX) * value;
          currentY = context.startY + (context.y - context.startY) * value;

          context.method.call(context.scrollable, currentX, currentY);

          // scroll more if we have not reached our destination
          if (currentX !== context.x || currentY !== context.y) {
            w.requestAnimationFrame(step.bind(w, context));
          }
        }

        /**
         * scrolls window or element with a smooth behavior
         * @method smoothScroll
         * @param {Object|Node} el
         * @param {Number} x
         * @param {Number} y
         * @returns {undefined}
         */
        function smoothScroll(el, x, y) {
          var scrollable;
          var startX;
          var startY;
          var method;
          var startTime = now();

          // define scroll context
          if (el === d.body) {
            scrollable = w;
            startX = w.scrollX || w.pageXOffset;
            startY = w.scrollY || w.pageYOffset;
            method = original.scroll;
          } else {
            scrollable = el;
            startX = el.scrollLeft;
            startY = el.scrollTop;
            method = scrollElement;
          }

          // scroll looping over a frame
          step({
            scrollable: scrollable,
            method: method,
            startTime: startTime,
            startX: startX,
            startY: startY,
            x: x,
            y: y,
          });
        }

        // ORIGINAL METHODS OVERRIDES
        // w.scroll and w.scrollTo
        w.scroll = w.scrollTo = function () {
          // avoid action when no arguments are passed
          if (arguments[0] === undefined) {
            return;
          }

          // avoid smooth behavior if not required
          if (shouldBailOut(arguments[0]) === true) {
            original.scroll.call(
              w,
              arguments[0].left !== undefined
                ? arguments[0].left
                : typeof arguments[0] !== "object"
                ? arguments[0]
                : w.scrollX || w.pageXOffset,
              // use top prop, second argument if present or fallback to scrollY
              arguments[0].top !== undefined
                ? arguments[0].top
                : arguments[1] !== undefined
                ? arguments[1]
                : w.scrollY || w.pageYOffset
            );

            return;
          }

          // LET THE SMOOTHNESS BEGIN!
          smoothScroll.call(
            w,
            d.body,
            arguments[0].left !== undefined
              ? ~~arguments[0].left
              : w.scrollX || w.pageXOffset,
            arguments[0].top !== undefined
              ? ~~arguments[0].top
              : w.scrollY || w.pageYOffset
          );
        };

        // w.scrollBy
        w.scrollBy = function () {
          // avoid action when no arguments are passed
          if (arguments[0] === undefined) {
            return;
          }

          // avoid smooth behavior if not required
          if (shouldBailOut(arguments[0])) {
            original.scrollBy.call(
              w,
              arguments[0].left !== undefined
                ? arguments[0].left
                : typeof arguments[0] !== "object"
                ? arguments[0]
                : 0,
              arguments[0].top !== undefined
                ? arguments[0].top
                : arguments[1] !== undefined
                ? arguments[1]
                : 0
            );

            return;
          }

          // LET THE SMOOTHNESS BEGIN!
          smoothScroll.call(
            w,
            d.body,
            ~~arguments[0].left + (w.scrollX || w.pageXOffset),
            ~~arguments[0].top + (w.scrollY || w.pageYOffset)
          );
        };

        // Element.prototype.scroll and Element.prototype.scrollTo
        Element.prototype.scroll = Element.prototype.scrollTo = function () {
          // avoid action when no arguments are passed
          if (arguments[0] === undefined) {
            return;
          }

          // avoid smooth behavior if not required
          if (shouldBailOut(arguments[0]) === true) {
            // if one number is passed, throw error to match Firefox implementation
            if (
              typeof arguments[0] === "number" &&
              arguments[1] === undefined
            ) {
              throw new SyntaxError("Value could not be converted");
            }

            original.elementScroll.call(
              this,
              // use left prop, first number argument or fallback to scrollLeft
              arguments[0].left !== undefined
                ? ~~arguments[0].left
                : typeof arguments[0] !== "object"
                ? ~~arguments[0]
                : this.scrollLeft,
              // use top prop, second argument or fallback to scrollTop
              arguments[0].top !== undefined
                ? ~~arguments[0].top
                : arguments[1] !== undefined
                ? ~~arguments[1]
                : this.scrollTop
            );

            return;
          }

          var left = arguments[0].left;
          var top = arguments[0].top;

          // LET THE SMOOTHNESS BEGIN!
          smoothScroll.call(
            this,
            this,
            typeof left === "undefined" ? this.scrollLeft : ~~left,
            typeof top === "undefined" ? this.scrollTop : ~~top
          );
        };

        // Element.prototype.scrollBy
        Element.prototype.scrollBy = function () {
          // avoid action when no arguments are passed
          if (arguments[0] === undefined) {
            return;
          }

          // avoid smooth behavior if not required
          if (shouldBailOut(arguments[0]) === true) {
            original.elementScroll.call(
              this,
              arguments[0].left !== undefined
                ? ~~arguments[0].left + this.scrollLeft
                : ~~arguments[0] + this.scrollLeft,
              arguments[0].top !== undefined
                ? ~~arguments[0].top + this.scrollTop
                : ~~arguments[1] + this.scrollTop
            );

            return;
          }

          this.scroll({
            left: ~~arguments[0].left + this.scrollLeft,
            top: ~~arguments[0].top + this.scrollTop,
            behavior: arguments[0].behavior,
          });
        };

        // Element.prototype.scrollIntoView
        Element.prototype.scrollIntoView = function () {
          // avoid smooth behavior if not required
          if (shouldBailOut(arguments[0]) === true) {
            original.scrollIntoView.call(
              this,
              arguments[0] === undefined ? true : arguments[0]
            );

            return;
          }

          // LET THE SMOOTHNESS BEGIN!
          var scrollableParent = findScrollableParent(this);
          var parentRects = scrollableParent.getBoundingClientRect();
          var clientRects = this.getBoundingClientRect();

          if (scrollableParent !== d.body) {
            // reveal element inside parent
            smoothScroll.call(
              this,
              scrollableParent,
              scrollableParent.scrollLeft + clientRects.left - parentRects.left,
              scrollableParent.scrollTop + clientRects.top - parentRects.top
            );

            // reveal parent in viewport unless is fixed
            if (w.getComputedStyle(scrollableParent).position !== "fixed") {
              w.scrollBy({
                left: parentRects.left,
                top: parentRects.top,
                behavior: "smooth",
              });
            }
          } else {
            // reveal element in viewport
            w.scrollBy({
              left: clientRects.left,
              top: clientRects.top,
              behavior: "smooth",
            });
          }
        };
      }

      {
        // commonjs
        module.exports = { polyfill: polyfill };
      }
    })();
  });
  var smoothscroll_1 = smoothscroll.polyfill;

  var _default$1 = /*#__PURE__*/ (function (_Core) {
    _inherits$1(_default, _Core);

    var _super = _createSuper(_default);

    function _default() {
      var _this;

      var options =
        arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck$1(this, _default);

      _this = _super.call(this, options);

      if (_this.resetNativeScroll) {
        if (history.scrollRestoration) {
          history.scrollRestoration = "manual";
        }

        window.scrollTo(0, 0);
      }

      window.addEventListener("scroll", _this.checkScroll, false);

      if (window.smoothscrollPolyfill === undefined) {
        window.smoothscrollPolyfill = smoothscroll;
        window.smoothscrollPolyfill.polyfill();
      }

      return _this;
    }

    _createClass$2(_default, [
      {
        key: "init",
        value: function init() {
          this.instance.scroll.y = window.pageYOffset;
          this.addElements();
          this.detectElements();

          _get$1(_getPrototypeOf$2(_default.prototype), "init", this).call(
            this
          );
        },
      },
      {
        key: "checkScroll",
        value: function checkScroll() {
          var _this2 = this;

          _get$1(
            _getPrototypeOf$2(_default.prototype),
            "checkScroll",
            this
          ).call(this);

          if (this.getDirection) {
            this.addDirection();
          }

          if (this.getSpeed) {
            this.addSpeed();
            this.speedTs = Date.now();
          }

          this.instance.scroll.y = window.pageYOffset;

          if (Object.entries(this.els).length) {
            if (!this.hasScrollTicking) {
              requestAnimationFrame(function () {
                _this2.detectElements();
              });
              this.hasScrollTicking = true;
            }
          }
        },
      },
      {
        key: "addDirection",
        value: function addDirection() {
          if (window.pageYOffset > this.instance.scroll.y) {
            if (this.instance.direction !== "down") {
              this.instance.direction = "down";
            }
          } else if (window.pageYOffset < this.instance.scroll.y) {
            if (this.instance.direction !== "up") {
              this.instance.direction = "up";
            }
          }
        },
      },
      {
        key: "addSpeed",
        value: function addSpeed() {
          if (window.pageYOffset != this.instance.scroll.y) {
            this.instance.speed =
              (window.pageYOffset - this.instance.scroll.y) /
              Math.max(1, Date.now() - this.speedTs);
          } else {
            this.instance.speed = 0;
          }
        },
      },
      {
        key: "resize",
        value: function resize() {
          if (Object.entries(this.els).length) {
            this.windowHeight = window.innerHeight;
            this.updateElements();
          }
        },
      },
      {
        key: "addElements",
        value: function addElements() {
          var _this3 = this;

          this.els = {};
          var els = this.el.querySelectorAll("[data-" + this.name + "]");
          els.forEach(function (el, index) {
            var BCR = el.getBoundingClientRect();
            var cl = el.dataset[_this3.name + "Class"] || _this3["class"];
            var id =
              typeof el.dataset[_this3.name + "Id"] === "string"
                ? el.dataset[_this3.name + "Id"]
                : index;
            var top;
            var left;
            var offset =
              typeof el.dataset[_this3.name + "Offset"] === "string"
                ? el.dataset[_this3.name + "Offset"].split(",")
                : _this3.offset;
            var repeat = el.dataset[_this3.name + "Repeat"];
            var call = el.dataset[_this3.name + "Call"];
            var target = el.dataset[_this3.name + "Target"];
            var targetEl;

            if (target !== undefined) {
              targetEl = document.querySelector("".concat(target));
            } else {
              targetEl = el;
            }

            var targetElBCR = targetEl.getBoundingClientRect();
            top = targetElBCR.top + _this3.instance.scroll.y;
            left = targetElBCR.left + _this3.instance.scroll.x;
            var bottom = top + targetEl.offsetHeight;
            var right = left + targetEl.offsetWidth;

            if (repeat == "false") {
              repeat = false;
            } else if (repeat != undefined) {
              repeat = true;
            } else {
              repeat = _this3.repeat;
            }

            var relativeOffset = _this3.getRelativeOffset(offset);

            top = top + relativeOffset[0];
            bottom = bottom - relativeOffset[1];
            var mappedEl = {
              el: el,
              targetEl: targetEl,
              id: id,
              class: cl,
              top: top,
              bottom: bottom,
              left: left,
              right: right,
              offset: offset,
              progress: 0,
              repeat: repeat,
              inView: false,
              call: call,
            };
            _this3.els[id] = mappedEl;

            if (el.classList.contains(cl)) {
              _this3.setInView(_this3.els[id], id);
            }
          });
        },
      },
      {
        key: "updateElements",
        value: function updateElements() {
          var _this4 = this;

          Object.entries(this.els).forEach(function (_ref) {
            var _ref2 = _slicedToArray$1(_ref, 2),
              i = _ref2[0],
              el = _ref2[1];

            var top =
              el.targetEl.getBoundingClientRect().top +
              _this4.instance.scroll.y;

            var bottom = top + el.targetEl.offsetHeight;

            var relativeOffset = _this4.getRelativeOffset(el.offset);

            _this4.els[i].top = top + relativeOffset[0];
            _this4.els[i].bottom = bottom - relativeOffset[1];
          });
          this.hasScrollTicking = false;
        },
      },
      {
        key: "getRelativeOffset",
        value: function getRelativeOffset(offset) {
          var relativeOffset = [0, 0];

          if (offset) {
            for (var i = 0; i < offset.length; i++) {
              if (typeof offset[i] == "string") {
                if (offset[i].includes("%")) {
                  relativeOffset[i] = parseInt(
                    (offset[i].replace("%", "") * this.windowHeight) / 100
                  );
                } else {
                  relativeOffset[i] = parseInt(offset[i]);
                }
              } else {
                relativeOffset[i] = offset[i];
              }
            }
          }

          return relativeOffset;
        },
        /**
         * Scroll to a desired target.
         *
         * @param  Available options :
         *          target {node, string, "top", "bottom", int} - The DOM element we want to scroll to
         *          options {object} - Options object for additionnal settings.
         * @return {void}
         */
      },
      {
        key: "scrollTo",
        value: function scrollTo(target) {
          var options =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : {};
          // Parse options
          var offset = parseInt(options.offset) || 0; // An offset to apply on top of given `target` or `sourceElem`'s target

          var callback = options.callback ? options.callback : false; // function called when scrollTo completes (note that it won't wait for lerp to stabilize)

          if (typeof target === "string") {
            // Selector or boundaries
            if (target === "top") {
              target = this.html;
            } else if (target === "bottom") {
              target = this.html.offsetHeight - window.innerHeight;
            } else {
              target = document.querySelector(target); // If the query fails, abort

              if (!target) {
                return;
              }
            }
          } else if (typeof target === "number") {
            // Absolute coordinate
            target = parseInt(target);
          } else if (target && target.tagName);
          else {
            console.warn("`target` parameter is not valid");
            return;
          } // We have a target that is not a coordinate yet, get it

          if (typeof target !== "number") {
            offset =
              target.getBoundingClientRect().top +
              offset +
              this.instance.scroll.y;
          } else {
            offset = target + offset;
          }

          if (callback) {
            offset = offset.toFixed();

            var onScroll = function onScroll() {
              if (window.pageYOffset.toFixed() === offset) {
                window.removeEventListener("scroll", onScroll);
                callback();
              }
            };

            window.addEventListener("scroll", onScroll);
          }

          window.scrollTo({
            top: offset,
            behavior: "smooth",
          });
        },
      },
      {
        key: "update",
        value: function update() {
          this.addElements();
          this.detectElements();
        },
      },
      {
        key: "destroy",
        value: function destroy() {
          _get$1(_getPrototypeOf$2(_default.prototype), "destroy", this).call(
            this
          );

          window.removeEventListener("scroll", this.checkScroll, false);
        },
      },
    ]);

    return _default;
  })(_default);

  /*
    object-assign
    (c) Sindre Sorhus
    @license MIT
    */
  /* eslint-disable no-unused-vars */
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;

  function toObject(val) {
    if (val === null || val === undefined) {
      throw new TypeError(
        "Object.assign cannot be called with null or undefined"
      );
    }

    return Object(val);
  }

  function shouldUseNative$1() {
    try {
      if (!Object.assign) {
        return false;
      }

      // Detect buggy property enumeration order in older V8 versions.

      // https://bugs.chromium.org/p/v8/issues/detail?id=4118
      var test1 = new String("abc"); // eslint-disable-line no-new-wrappers
      test1[5] = "de";
      if (Object.getOwnPropertyNames(test1)[0] === "5") {
        return false;
      }

      // https://bugs.chromium.org/p/v8/issues/detail?id=3056
      var test2 = {};
      for (var i = 0; i < 10; i++) {
        test2["_" + String.fromCharCode(i)] = i;
      }
      var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
        return test2[n];
      });
      if (order2.join("") !== "0123456789") {
        return false;
      }

      // https://bugs.chromium.org/p/v8/issues/detail?id=3056
      var test3 = {};
      "abcdefghijklmnopqrst".split("").forEach(function (letter) {
        test3[letter] = letter;
      });
      if (
        Object.keys(Object.assign({}, test3)).join("") !==
        "abcdefghijklmnopqrst"
      ) {
        return false;
      }

      return true;
    } catch (err) {
      // We don't expect any of the above to throw, but better to be safe.
      return false;
    }
  }

  var objectAssign = shouldUseNative$1()
    ? Object.assign
    : function (target, source) {
        var from;
        var to = toObject(target);
        var symbols;

        for (var s = 1; s < arguments.length; s++) {
          from = Object(arguments[s]);

          for (var key in from) {
            if (hasOwnProperty.call(from, key)) {
              to[key] = from[key];
            }
          }

          if (getOwnPropertySymbols) {
            symbols = getOwnPropertySymbols(from);
            for (var i = 0; i < symbols.length; i++) {
              if (propIsEnumerable.call(from, symbols[i])) {
                to[symbols[i]] = from[symbols[i]];
              }
            }
          }
        }

        return to;
      };

  function E() {
    // Keep this empty so it's easier to inherit from
    // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
  }

  E.prototype = {
    on: function (name, callback, ctx) {
      var e = this.e || (this.e = {});

      (e[name] || (e[name] = [])).push({
        fn: callback,
        ctx: ctx,
      });

      return this;
    },

    once: function (name, callback, ctx) {
      var self = this;
      function listener() {
        self.off(name, listener);
        callback.apply(ctx, arguments);
      }
      listener._ = callback;
      return this.on(name, listener, ctx);
    },

    emit: function (name) {
      var data = [].slice.call(arguments, 1);
      var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
      var i = 0;
      var len = evtArr.length;

      for (i; i < len; i++) {
        evtArr[i].fn.apply(evtArr[i].ctx, data);
      }

      return this;
    },

    off: function (name, callback) {
      var e = this.e || (this.e = {});
      var evts = e[name];
      var liveEvents = [];

      if (evts && callback) {
        for (var i = 0, len = evts.length; i < len; i++) {
          if (evts[i].fn !== callback && evts[i].fn._ !== callback)
            liveEvents.push(evts[i]);
        }
      }

      // Remove event from queue to prevent memory leak
      // Suggested by https://github.com/lazd
      // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

      liveEvents.length ? (e[name] = liveEvents) : delete e[name];

      return this;
    },
  };

  var tinyEmitter = E;

  var lethargy = createCommonjsModule(function (module, exports) {
    // Generated by CoffeeScript 1.9.2
    (function () {
      var root;

      root = exports !== null ? exports : this;

      root.Lethargy = (function () {
        function Lethargy(stability, sensitivity, tolerance, delay) {
          this.stability = stability != null ? Math.abs(stability) : 8;
          this.sensitivity =
            sensitivity != null ? 1 + Math.abs(sensitivity) : 100;
          this.tolerance = tolerance != null ? 1 + Math.abs(tolerance) : 1.1;
          this.delay = delay != null ? delay : 150;
          this.lastUpDeltas = function () {
            var i, ref, results;
            results = [];
            for (
              i = 1, ref = this.stability * 2;
              1 <= ref ? i <= ref : i >= ref;
              1 <= ref ? i++ : i--
            ) {
              results.push(null);
            }
            return results;
          }.call(this);
          this.lastDownDeltas = function () {
            var i, ref, results;
            results = [];
            for (
              i = 1, ref = this.stability * 2;
              1 <= ref ? i <= ref : i >= ref;
              1 <= ref ? i++ : i--
            ) {
              results.push(null);
            }
            return results;
          }.call(this);
          this.deltasTimestamp = function () {
            var i, ref, results;
            results = [];
            for (
              i = 1, ref = this.stability * 2;
              1 <= ref ? i <= ref : i >= ref;
              1 <= ref ? i++ : i--
            ) {
              results.push(null);
            }
            return results;
          }.call(this);
        }

        Lethargy.prototype.check = function (e) {
          var lastDelta;
          e = e.originalEvent || e;
          if (e.wheelDelta != null) {
            lastDelta = e.wheelDelta;
          } else if (e.deltaY != null) {
            lastDelta = e.deltaY * -40;
          } else if (e.detail != null || e.detail === 0) {
            lastDelta = e.detail * -40;
          }
          this.deltasTimestamp.push(Date.now());
          this.deltasTimestamp.shift();
          if (lastDelta > 0) {
            this.lastUpDeltas.push(lastDelta);
            this.lastUpDeltas.shift();
            return this.isInertia(1);
          } else {
            this.lastDownDeltas.push(lastDelta);
            this.lastDownDeltas.shift();
            return this.isInertia(-1);
          }
        };

        Lethargy.prototype.isInertia = function (direction) {
          var lastDeltas,
            lastDeltasNew,
            lastDeltasOld,
            newAverage,
            newSum,
            oldAverage,
            oldSum;
          lastDeltas =
            direction === -1 ? this.lastDownDeltas : this.lastUpDeltas;
          if (lastDeltas[0] === null) {
            return direction;
          }
          if (
            this.deltasTimestamp[this.stability * 2 - 2] + this.delay >
              Date.now() &&
            lastDeltas[0] === lastDeltas[this.stability * 2 - 1]
          ) {
            return false;
          }
          lastDeltasOld = lastDeltas.slice(0, this.stability);
          lastDeltasNew = lastDeltas.slice(this.stability, this.stability * 2);
          oldSum = lastDeltasOld.reduce(function (t, s) {
            return t + s;
          });
          newSum = lastDeltasNew.reduce(function (t, s) {
            return t + s;
          });
          oldAverage = oldSum / lastDeltasOld.length;
          newAverage = newSum / lastDeltasNew.length;
          if (
            Math.abs(oldAverage) < Math.abs(newAverage * this.tolerance) &&
            this.sensitivity < Math.abs(newAverage)
          ) {
            return direction;
          } else {
            return false;
          }
        };

        Lethargy.prototype.showLastUpDeltas = function () {
          return this.lastUpDeltas;
        };

        Lethargy.prototype.showLastDownDeltas = function () {
          return this.lastDownDeltas;
        };

        return Lethargy;
      })();
    }.call(commonjsGlobal));
  });

  var support$1 = (function getSupport() {
    return {
      hasWheelEvent: "onwheel" in document,
      hasMouseWheelEvent: "onmousewheel" in document,
      hasTouch:
        "ontouchstart" in window ||
        window.TouchEvent ||
        (window.DocumentTouch && document instanceof DocumentTouch),
      hasTouchWin: navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1,
      hasPointer: !!window.navigator.msPointerEnabled,
      hasKeyDown: "onkeydown" in document,
      isFirefox: navigator.userAgent.indexOf("Firefox") > -1,
    };
  })();

  var toString = Object.prototype.toString,
    hasOwnProperty$1 = Object.prototype.hasOwnProperty;

  var bindallStandalone = function (object) {
    if (!object) return console.warn("bindAll requires at least one argument.");

    var functions = Array.prototype.slice.call(arguments, 1);

    if (functions.length === 0) {
      for (var method in object) {
        if (hasOwnProperty$1.call(object, method)) {
          if (
            typeof object[method] == "function" &&
            toString.call(object[method]) == "[object Function]"
          ) {
            functions.push(method);
          }
        }
      }
    }

    for (var i = 0; i < functions.length; i++) {
      var f = functions[i];
      object[f] = bind(object[f], object);
    }
  };

  /*
        Faster bind without specific-case checking. (see https://coderwall.com/p/oi3j3w).
        bindAll is only needed for events binding so no need to make slow fixes for constructor
        or partial application.
    */
  function bind(func, context) {
    return function () {
      return func.apply(context, arguments);
    };
  }

  var Lethargy = lethargy.Lethargy;

  var EVT_ID = "virtualscroll";

  var src = VirtualScroll;

  var keyCodes = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    SPACE: 32,
  };

  function VirtualScroll(options) {
    bindallStandalone(
      this,
      "_onWheel",
      "_onMouseWheel",
      "_onTouchStart",
      "_onTouchMove",
      "_onKeyDown"
    );

    this.el = window;
    if (options && options.el) {
      this.el = options.el;
      delete options.el;
    }
    this.options = objectAssign(
      {
        mouseMultiplier: 1,
        touchMultiplier: 2,
        firefoxMultiplier: 15,
        keyStep: 120,
        preventTouch: false,
        unpreventTouchClass: "vs-touchmove-allowed",
        limitInertia: false,
        useKeyboard: true,
        useTouch: true,
      },
      options
    );

    if (this.options.limitInertia) this._lethargy = new Lethargy();

    this._emitter = new tinyEmitter();
    this._event = {
      y: 0,
      x: 0,
      deltaX: 0,
      deltaY: 0,
    };
    this.touchStartX = null;
    this.touchStartY = null;
    this.bodyTouchAction = null;

    if (this.options.passive !== undefined) {
      this.listenerOptions = { passive: this.options.passive };
    }
  }

  VirtualScroll.prototype._notify = function (e) {
    var evt = this._event;
    evt.x += evt.deltaX;
    evt.y += evt.deltaY;

    this._emitter.emit(EVT_ID, {
      x: evt.x,
      y: evt.y,
      deltaX: evt.deltaX,
      deltaY: evt.deltaY,
      originalEvent: e,
    });
  };

  VirtualScroll.prototype._onWheel = function (e) {
    var options = this.options;
    if (this._lethargy && this._lethargy.check(e) === false) return;
    var evt = this._event;

    // In Chrome and in Firefox (at least the new one)
    evt.deltaX = e.wheelDeltaX || e.deltaX * -1;
    evt.deltaY = e.wheelDeltaY || e.deltaY * -1;

    // for our purpose deltamode = 1 means user is on a wheel mouse, not touch pad
    // real meaning: https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent#Delta_modes
    if (support$1.isFirefox && e.deltaMode == 1) {
      evt.deltaX *= options.firefoxMultiplier;
      evt.deltaY *= options.firefoxMultiplier;
    }

    evt.deltaX *= options.mouseMultiplier;
    evt.deltaY *= options.mouseMultiplier;

    this._notify(e);
  };

  VirtualScroll.prototype._onMouseWheel = function (e) {
    if (this.options.limitInertia && this._lethargy.check(e) === false) return;

    var evt = this._event;

    // In Safari, IE and in Chrome if 'wheel' isn't defined
    evt.deltaX = e.wheelDeltaX ? e.wheelDeltaX : 0;
    evt.deltaY = e.wheelDeltaY ? e.wheelDeltaY : e.wheelDelta;

    this._notify(e);
  };

  VirtualScroll.prototype._onTouchStart = function (e) {
    var t = e.targetTouches ? e.targetTouches[0] : e;
    this.touchStartX = t.pageX;
    this.touchStartY = t.pageY;
  };

  VirtualScroll.prototype._onTouchMove = function (e) {
    var options = this.options;
    if (
      options.preventTouch &&
      !e.target.classList.contains(options.unpreventTouchClass)
    ) {
      e.preventDefault();
    }

    var evt = this._event;

    var t = e.targetTouches ? e.targetTouches[0] : e;

    evt.deltaX = (t.pageX - this.touchStartX) * options.touchMultiplier;
    evt.deltaY = (t.pageY - this.touchStartY) * options.touchMultiplier;

    this.touchStartX = t.pageX;
    this.touchStartY = t.pageY;

    this._notify(e);
  };

  VirtualScroll.prototype._onKeyDown = function (e) {
    var evt = this._event;
    evt.deltaX = evt.deltaY = 0;
    var windowHeight = window.innerHeight - 40;

    switch (e.keyCode) {
      case keyCodes.LEFT:
      case keyCodes.UP:
        evt.deltaY = this.options.keyStep;
        break;

      case keyCodes.RIGHT:
      case keyCodes.DOWN:
        evt.deltaY = -this.options.keyStep;
        break;
      case e.shiftKey:
        evt.deltaY = windowHeight;
        break;
      case keyCodes.SPACE:
        evt.deltaY = -windowHeight;
        break;
      default:
        return;
    }

    this._notify(e);
  };

  VirtualScroll.prototype._bind = function () {
    if (support$1.hasWheelEvent)
      this.el.addEventListener("wheel", this._onWheel, this.listenerOptions);
    if (support$1.hasMouseWheelEvent)
      this.el.addEventListener(
        "mousewheel",
        this._onMouseWheel,
        this.listenerOptions
      );

    if (support$1.hasTouch && this.options.useTouch) {
      this.el.addEventListener(
        "touchstart",
        this._onTouchStart,
        this.listenerOptions
      );
      this.el.addEventListener(
        "touchmove",
        this._onTouchMove,
        this.listenerOptions
      );
    }

    if (support$1.hasPointer && support$1.hasTouchWin) {
      this.bodyTouchAction = document.body.style.msTouchAction;
      document.body.style.msTouchAction = "none";
      this.el.addEventListener("MSPointerDown", this._onTouchStart, true);
      this.el.addEventListener("MSPointerMove", this._onTouchMove, true);
    }

    if (support$1.hasKeyDown && this.options.useKeyboard)
      document.addEventListener("keydown", this._onKeyDown);
  };

  VirtualScroll.prototype._unbind = function () {
    if (support$1.hasWheelEvent)
      this.el.removeEventListener("wheel", this._onWheel);
    if (support$1.hasMouseWheelEvent)
      this.el.removeEventListener("mousewheel", this._onMouseWheel);

    if (support$1.hasTouch) {
      this.el.removeEventListener("touchstart", this._onTouchStart);
      this.el.removeEventListener("touchmove", this._onTouchMove);
    }

    if (support$1.hasPointer && support$1.hasTouchWin) {
      document.body.style.msTouchAction = this.bodyTouchAction;
      this.el.removeEventListener("MSPointerDown", this._onTouchStart, true);
      this.el.removeEventListener("MSPointerMove", this._onTouchMove, true);
    }

    if (support$1.hasKeyDown && this.options.useKeyboard)
      document.removeEventListener("keydown", this._onKeyDown);
  };

  VirtualScroll.prototype.on = function (cb, ctx) {
    this._emitter.on(EVT_ID, cb, ctx);

    var events = this._emitter.e;
    if (events && events[EVT_ID] && events[EVT_ID].length === 1) this._bind();
  };

  VirtualScroll.prototype.off = function (cb, ctx) {
    this._emitter.off(EVT_ID, cb, ctx);

    var events = this._emitter.e;
    if (!events[EVT_ID] || events[EVT_ID].length <= 0) this._unbind();
  };

  VirtualScroll.prototype.reset = function () {
    var evt = this._event;
    evt.x = 0;
    evt.y = 0;
  };

  VirtualScroll.prototype.destroy = function () {
    this._emitter.off();
    this._unbind();
  };

  function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
  }

  function getTranslate$1(el) {
    var translate = {};
    if (!window.getComputedStyle) return;
    var style = getComputedStyle(el);
    var transform =
      style.transform || style.webkitTransform || style.mozTransform;
    var mat = transform.match(/^matrix3d\((.+)\)$/);

    if (mat) {
      translate.x = mat ? parseFloat(mat[1].split(", ")[12]) : 0;
      translate.y = mat ? parseFloat(mat[1].split(", ")[13]) : 0;
    } else {
      mat = transform.match(/^matrix\((.+)\)$/);
      translate.x = mat ? parseFloat(mat[1].split(", ")[4]) : 0;
      translate.y = mat ? parseFloat(mat[1].split(", ")[5]) : 0;
    }

    return translate;
  }

  /**
   * Returns an array containing all the parent nodes of the given node
   * @param  {object} node
   * @return {array} parent nodes
   */
  function getParents(elem) {
    // Set up a parent array
    var parents = []; // Push each parent element to the array

    for (; elem && elem !== document; elem = elem.parentNode) {
      parents.push(elem);
    } // Return our parent array

    return parents;
  } // https://gomakethings.com/how-to-get-the-closest-parent-element-with-a-matching-selector-using-vanilla-javascript/

  /**
   * https://github.com/gre/bezier-easing
   * BezierEasing - use bezier curve for transition easing function
   * by Gaëtan Renaudeau 2014 - 2015 – MIT License
   */

  // These values are established by empiricism with tests (tradeoff: performance VS precision)
  var NEWTON_ITERATIONS = 4;
  var NEWTON_MIN_SLOPE = 0.001;
  var SUBDIVISION_PRECISION = 0.0000001;
  var SUBDIVISION_MAX_ITERATIONS = 10;

  var kSplineTableSize = 11;
  var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

  var float32ArraySupported = typeof Float32Array === "function";

  function A(aA1, aA2) {
    return 1.0 - 3.0 * aA2 + 3.0 * aA1;
  }
  function B(aA1, aA2) {
    return 3.0 * aA2 - 6.0 * aA1;
  }
  function C(aA1) {
    return 3.0 * aA1;
  }

  // Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
  function calcBezier(aT, aA1, aA2) {
    return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
  }

  // Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
  function getSlope(aT, aA1, aA2) {
    return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
  }

  function binarySubdivide(aX, aA, aB, mX1, mX2) {
    var currentX,
      currentT,
      i = 0;
    do {
      currentT = aA + (aB - aA) / 2.0;
      currentX = calcBezier(currentT, mX1, mX2) - aX;
      if (currentX > 0.0) {
        aB = currentT;
      } else {
        aA = currentT;
      }
    } while (
      Math.abs(currentX) > SUBDIVISION_PRECISION &&
      ++i < SUBDIVISION_MAX_ITERATIONS
    );
    return currentT;
  }

  function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
    for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
      var currentSlope = getSlope(aGuessT, mX1, mX2);
      if (currentSlope === 0.0) {
        return aGuessT;
      }
      var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
      aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
  }

  function LinearEasing(x) {
    return x;
  }

  var src$1 = function bezier(mX1, mY1, mX2, mY2) {
    if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
      throw new Error("bezier x values must be in [0, 1] range");
    }

    if (mX1 === mY1 && mX2 === mY2) {
      return LinearEasing;
    }

    // Precompute samples table
    var sampleValues = float32ArraySupported
      ? new Float32Array(kSplineTableSize)
      : new Array(kSplineTableSize);
    for (var i = 0; i < kSplineTableSize; ++i) {
      sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
    }

    function getTForX(aX) {
      var intervalStart = 0.0;
      var currentSample = 1;
      var lastSample = kSplineTableSize - 1;

      for (
        ;
        currentSample !== lastSample && sampleValues[currentSample] <= aX;
        ++currentSample
      ) {
        intervalStart += kSampleStepSize;
      }
      --currentSample;

      // Interpolate to provide an initial guess for t
      var dist =
        (aX - sampleValues[currentSample]) /
        (sampleValues[currentSample + 1] - sampleValues[currentSample]);
      var guessForT = intervalStart + dist * kSampleStepSize;

      var initialSlope = getSlope(guessForT, mX1, mX2);
      if (initialSlope >= NEWTON_MIN_SLOPE) {
        return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
      } else if (initialSlope === 0.0) {
        return guessForT;
      } else {
        return binarySubdivide(
          aX,
          intervalStart,
          intervalStart + kSampleStepSize,
          mX1,
          mX2
        );
      }
    }

    return function BezierEasing(x) {
      // Because JavaScript number are imprecise, we should guarantee the extremes are right.
      if (x === 0) {
        return 0;
      }
      if (x === 1) {
        return 1;
      }
      return calcBezier(getTForX(x), mY1, mY2);
    };
  };

  var keyCodes$1 = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    SPACE: 32,
    TAB: 9,
    PAGEUP: 33,
    PAGEDOWN: 34,
    HOME: 36,
    END: 35,
  };

  var _default$2 = /*#__PURE__*/ (function (_Core) {
    _inherits$1(_default, _Core);

    var _super = _createSuper(_default);

    function _default() {
      var _this;

      var options =
        arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck$1(this, _default);

      if (history.scrollRestoration) {
        history.scrollRestoration = "manual";
      }

      window.scrollTo(0, 0);
      _this = _super.call(this, options);
      if (_this.inertia) _this.lerp = _this.inertia * 0.1;
      _this.isScrolling = false;
      _this.isDraggingScrollbar = false;
      _this.isTicking = false;
      _this.hasScrollTicking = false;
      _this.parallaxElements = {};
      _this.stop = false;
      _this.scrollbarContainer = options.scrollbarContainer;
      _this.checkKey = _this.checkKey.bind(_assertThisInitialized$2(_this));
      window.addEventListener("keydown", _this.checkKey, false);
      return _this;
    }

    _createClass$2(_default, [
      {
        key: "init",
        value: function init() {
          var _this2 = this;

          this.html.classList.add(this.smoothClass);
          this.html.setAttribute(
            "data-".concat(this.name, "-direction"),
            this.direction
          );
          this.instance = _objectSpread2(
            {
              delta: {
                x: this.initPosition.x,
                y: this.initPosition.y,
              },
              scroll: {
                x: this.initPosition.x,
                y: this.initPosition.y,
              },
            },
            this.instance
          );
          this.vs = new src({
            el: this.scrollFromAnywhere ? document : this.el,
            mouseMultiplier: navigator.platform.indexOf("Win") > -1 ? 1 : 0.4,
            firefoxMultiplier: this.firefoxMultiplier,
            touchMultiplier: this.touchMultiplier,
            useKeyboard: false,
            passive: true,
          });
          this.vs.on(function (e) {
            if (_this2.stop) {
              return;
            }

            if (!_this2.isDraggingScrollbar) {
              requestAnimationFrame(function () {
                _this2.updateDelta(e);

                if (!_this2.isScrolling) _this2.startScrolling();
              });
            }
          });
          this.setScrollLimit();
          this.initScrollBar();
          this.addSections();
          this.addElements();
          this.checkScroll(true);
          this.transformElements(true, true);

          _get$1(_getPrototypeOf$2(_default.prototype), "init", this).call(
            this
          );
        },
      },
      {
        key: "setScrollLimit",
        value: function setScrollLimit() {
          this.instance.limit.y = this.el.offsetHeight - this.windowHeight;

          if (this.direction === "horizontal") {
            var totalWidth = 0;
            var nodes = this.el.children;

            for (var i = 0; i < nodes.length; i++) {
              totalWidth += nodes[i].offsetWidth;
            }

            this.instance.limit.x = totalWidth - this.windowWidth;
          }
        },
      },
      {
        key: "startScrolling",
        value: function startScrolling() {
          this.startScrollTs = Date.now(); // Record timestamp

          this.isScrolling = true;
          this.checkScroll();
          this.html.classList.add(this.scrollingClass);
        },
      },
      {
        key: "stopScrolling",
        value: function stopScrolling() {
          cancelAnimationFrame(this.checkScrollRaf); // Prevent checkScroll to continue looping

          if (this.scrollToRaf) {
            cancelAnimationFrame(this.scrollToRaf);
            this.scrollToRaf = null;
          }

          this.isScrolling = false;
          this.instance.scroll.y = Math.round(this.instance.scroll.y);
          this.html.classList.remove(this.scrollingClass);
        },
      },
      {
        key: "checkKey",
        value: function checkKey(e) {
          var _this3 = this;

          if (this.stop) {
            // If we are stopped, we don't want any scroll to occur because of a keypress
            // Prevent tab to scroll to activeElement
            if (e.keyCode == keyCodes$1.TAB) {
              requestAnimationFrame(function () {
                // Make sure native scroll is always at top of page
                _this3.html.scrollTop = 0;
                document.body.scrollTop = 0;
                _this3.html.scrollLeft = 0;
                document.body.scrollLeft = 0;
              });
            }

            return;
          }

          switch (e.keyCode) {
            case keyCodes$1.TAB:
              // Do not remove the RAF
              // It allows to override the browser's native scrollTo, which is essential
              requestAnimationFrame(function () {
                // Make sure native scroll is always at top of page
                _this3.html.scrollTop = 0;
                document.body.scrollTop = 0;
                _this3.html.scrollLeft = 0;
                document.body.scrollLeft = 0; // Request scrollTo on the focusedElement, putting it at the center of the screen

                _this3.scrollTo(document.activeElement, {
                  offset: -window.innerHeight / 2,
                });
              });
              break;

            case keyCodes$1.UP:
              this.instance.delta[this.directionAxis] -= 240;
              break;

            case keyCodes$1.DOWN:
              this.instance.delta[this.directionAxis] += 240;
              break;

            case keyCodes$1.PAGEUP:
              this.instance.delta[this.directionAxis] -= window.innerHeight;
              break;

            case keyCodes$1.PAGEDOWN:
              this.instance.delta[this.directionAxis] += window.innerHeight;
              break;

            case keyCodes$1.HOME:
              this.instance.delta[this.directionAxis] -=
                this.instance.limit[this.directionAxis];
              break;

            case keyCodes$1.END:
              this.instance.delta[this.directionAxis] +=
                this.instance.limit[this.directionAxis];
              break;

            case keyCodes$1.SPACE:
              if (
                !(document.activeElement instanceof HTMLInputElement) &&
                !(document.activeElement instanceof HTMLTextAreaElement)
              ) {
                if (e.shiftKey) {
                  this.instance.delta[this.directionAxis] -= window.innerHeight;
                } else {
                  this.instance.delta[this.directionAxis] += window.innerHeight;
                }
              }

              break;

            default:
              return;
          }

          if (this.instance.delta[this.directionAxis] < 0)
            this.instance.delta[this.directionAxis] = 0;
          if (
            this.instance.delta[this.directionAxis] >
            this.instance.limit[this.directionAxis]
          )
            this.instance.delta[this.directionAxis] =
              this.instance.limit[this.directionAxis];
          this.stopScrolling(); // Stop any movement, allows to kill any other `scrollTo` still happening

          this.isScrolling = true;
          this.checkScroll();
          this.html.classList.add(this.scrollingClass);
        },
      },
      {
        key: "checkScroll",
        value: function checkScroll() {
          var _this4 = this;

          var forced =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : false;

          if (forced || this.isScrolling || this.isDraggingScrollbar) {
            if (!this.hasScrollTicking) {
              this.checkScrollRaf = requestAnimationFrame(function () {
                return _this4.checkScroll();
              });
              this.hasScrollTicking = true;
            }

            this.updateScroll();
            var distance = Math.abs(
              this.instance.delta[this.directionAxis] -
                this.instance.scroll[this.directionAxis]
            );
            var timeSinceStart = Date.now() - this.startScrollTs; // Get the time since the scroll was started: the scroll can be stopped again only past 100ms

            if (
              !this.animatingScroll &&
              timeSinceStart > 100 &&
              ((distance < 0.5 &&
                this.instance.delta[this.directionAxis] != 0) ||
                (distance < 0.5 &&
                  this.instance.delta[this.directionAxis] == 0))
            ) {
              this.stopScrolling();
            }

            Object.entries(this.sections).forEach(function (_ref) {
              var _ref2 = _slicedToArray$1(_ref, 2),
                i = _ref2[0],
                section = _ref2[1];

              if (
                section.persistent ||
                (_this4.instance.scroll[_this4.directionAxis] >
                  section.offset[_this4.directionAxis] &&
                  _this4.instance.scroll[_this4.directionAxis] <
                    section.limit[_this4.directionAxis])
              ) {
                if (_this4.direction === "horizontal") {
                  _this4.transform(
                    section.el,
                    -_this4.instance.scroll[_this4.directionAxis],
                    0
                  );
                } else {
                  _this4.transform(
                    section.el,
                    0,
                    -_this4.instance.scroll[_this4.directionAxis]
                  );
                }

                if (!section.inView) {
                  section.inView = true;
                  section.el.style.opacity = 1;
                  section.el.style.pointerEvents = "all";
                  section.el.setAttribute(
                    "data-".concat(_this4.name, "-section-inview"),
                    ""
                  );
                }
              } else {
                if (section.inView || forced) {
                  section.inView = false;
                  section.el.style.opacity = 0;
                  section.el.style.pointerEvents = "none";
                  section.el.removeAttribute(
                    "data-".concat(_this4.name, "-section-inview")
                  );
                }

                _this4.transform(section.el, 0, 0);
              }
            });

            if (this.getDirection) {
              this.addDirection();
            }

            if (this.getSpeed) {
              this.addSpeed();
              this.speedTs = Date.now();
            }

            this.detectElements();
            this.transformElements();

            if (this.hasScrollbar) {
              var scrollBarTranslation =
                (this.instance.scroll[this.directionAxis] /
                  this.instance.limit[this.directionAxis]) *
                this.scrollBarLimit[this.directionAxis];

              if (this.direction === "horizontal") {
                this.transform(this.scrollbarThumb, scrollBarTranslation, 0);
              } else {
                this.transform(this.scrollbarThumb, 0, scrollBarTranslation);
              }
            }

            _get$1(
              _getPrototypeOf$2(_default.prototype),
              "checkScroll",
              this
            ).call(this);

            this.hasScrollTicking = false;
          }
        },
      },
      {
        key: "resize",
        value: function resize() {
          this.windowHeight = window.innerHeight;
          this.windowWidth = window.innerWidth;
          this.checkContext();
          this.windowMiddle = {
            x: this.windowWidth / 2,
            y: this.windowHeight / 2,
          };
          this.update();
        },
      },
      {
        key: "updateDelta",
        value: function updateDelta(e) {
          var delta;
          var gestureDirection =
            this[this.context] && this[this.context].gestureDirection
              ? this[this.context].gestureDirection
              : this.gestureDirection;

          if (gestureDirection === "both") {
            delta = e.deltaX + e.deltaY;
          } else if (gestureDirection === "vertical") {
            delta = e.deltaY;
          } else if (gestureDirection === "horizontal") {
            delta = e.deltaX;
          } else {
            delta = e.deltaY;
          }

          this.instance.delta[this.directionAxis] -= delta * this.multiplier;
          if (this.instance.delta[this.directionAxis] < 0)
            this.instance.delta[this.directionAxis] = 0;
          if (
            this.instance.delta[this.directionAxis] >
            this.instance.limit[this.directionAxis]
          )
            this.instance.delta[this.directionAxis] =
              this.instance.limit[this.directionAxis];
        },
      },
      {
        key: "updateScroll",
        value: function updateScroll(e) {
          if (this.isScrolling || this.isDraggingScrollbar) {
            this.instance.scroll[this.directionAxis] = lerp(
              this.instance.scroll[this.directionAxis],
              this.instance.delta[this.directionAxis],
              this.lerp
            );
          } else {
            if (
              this.instance.scroll[this.directionAxis] >
              this.instance.limit[this.directionAxis]
            ) {
              this.setScroll(
                this.instance.scroll[this.directionAxis],
                this.instance.limit[this.directionAxis]
              );
            } else if (this.instance.scroll.y < 0) {
              this.setScroll(this.instance.scroll[this.directionAxis], 0);
            } else {
              this.setScroll(
                this.instance.scroll[this.directionAxis],
                this.instance.delta[this.directionAxis]
              );
            }
          }
        },
      },
      {
        key: "addDirection",
        value: function addDirection() {
          if (this.instance.delta.y > this.instance.scroll.y) {
            if (this.instance.direction !== "down") {
              this.instance.direction = "down";
            }
          } else if (this.instance.delta.y < this.instance.scroll.y) {
            if (this.instance.direction !== "up") {
              this.instance.direction = "up";
            }
          }

          if (this.instance.delta.x > this.instance.scroll.x) {
            if (this.instance.direction !== "right") {
              this.instance.direction = "right";
            }
          } else if (this.instance.delta.x < this.instance.scroll.x) {
            if (this.instance.direction !== "left") {
              this.instance.direction = "left";
            }
          }
        },
      },
      {
        key: "addSpeed",
        value: function addSpeed() {
          if (
            this.instance.delta[this.directionAxis] !=
            this.instance.scroll[this.directionAxis]
          ) {
            this.instance.speed =
              (this.instance.delta[this.directionAxis] -
                this.instance.scroll[this.directionAxis]) /
              Math.max(1, Date.now() - this.speedTs);
          } else {
            this.instance.speed = 0;
          }
        },
      },
      {
        key: "initScrollBar",
        value: function initScrollBar() {
          this.scrollbar = document.createElement("span");
          this.scrollbarThumb = document.createElement("span");
          this.scrollbar.classList.add("".concat(this.scrollbarClass));
          this.scrollbarThumb.classList.add(
            "".concat(this.scrollbarClass, "_thumb")
          );
          this.scrollbar.append(this.scrollbarThumb);

          if (this.scrollbarContainer) {
            this.scrollbarContainer.append(this.scrollbar);
          } else {
            document.body.append(this.scrollbar);
          } // Scrollbar Events

          this.getScrollBar = this.getScrollBar.bind(this);
          this.releaseScrollBar = this.releaseScrollBar.bind(this);
          this.moveScrollBar = this.moveScrollBar.bind(this);
          this.scrollbarThumb.addEventListener("mousedown", this.getScrollBar);
          window.addEventListener("mouseup", this.releaseScrollBar);
          window.addEventListener("mousemove", this.moveScrollBar); // Set scrollbar values

          this.hasScrollbar = false;

          if (this.direction == "horizontal") {
            if (this.instance.limit.x + this.windowWidth <= this.windowWidth) {
              return;
            }
          } else {
            if (
              this.instance.limit.y + this.windowHeight <=
              this.windowHeight
            ) {
              return;
            }
          }

          this.hasScrollbar = true;
          this.scrollbarBCR = this.scrollbar.getBoundingClientRect();
          this.scrollbarHeight = this.scrollbarBCR.height;
          this.scrollbarWidth = this.scrollbarBCR.width;

          if (this.direction === "horizontal") {
            this.scrollbarThumb.style.width = "".concat(
              (this.scrollbarWidth * this.scrollbarWidth) /
                (this.instance.limit.x + this.scrollbarWidth),
              "px"
            );
          } else {
            this.scrollbarThumb.style.height = "".concat(
              (this.scrollbarHeight * this.scrollbarHeight) /
                (this.instance.limit.y + this.scrollbarHeight),
              "px"
            );
          }

          this.scrollbarThumbBCR = this.scrollbarThumb.getBoundingClientRect();
          this.scrollBarLimit = {
            x: this.scrollbarWidth - this.scrollbarThumbBCR.width,
            y: this.scrollbarHeight - this.scrollbarThumbBCR.height,
          };
        },
      },
      {
        key: "reinitScrollBar",
        value: function reinitScrollBar() {
          this.hasScrollbar = false;

          if (this.direction == "horizontal") {
            if (this.instance.limit.x + this.windowWidth <= this.windowWidth) {
              return;
            }
          } else {
            if (
              this.instance.limit.y + this.windowHeight <=
              this.windowHeight
            ) {
              return;
            }
          }

          this.hasScrollbar = true;
          this.scrollbarBCR = this.scrollbar.getBoundingClientRect();
          this.scrollbarHeight = this.scrollbarBCR.height;
          this.scrollbarWidth = this.scrollbarBCR.width;

          if (this.direction === "horizontal") {
            this.scrollbarThumb.style.width = "".concat(
              (this.scrollbarWidth * this.scrollbarWidth) /
                (this.instance.limit.x + this.scrollbarWidth),
              "px"
            );
          } else {
            this.scrollbarThumb.style.height = "".concat(
              (this.scrollbarHeight * this.scrollbarHeight) /
                (this.instance.limit.y + this.scrollbarHeight),
              "px"
            );
          }

          this.scrollbarThumbBCR = this.scrollbarThumb.getBoundingClientRect();
          this.scrollBarLimit = {
            x: this.scrollbarWidth - this.scrollbarThumbBCR.width,
            y: this.scrollbarHeight - this.scrollbarThumbBCR.height,
          };
        },
      },
      {
        key: "destroyScrollBar",
        value: function destroyScrollBar() {
          this.scrollbarThumb.removeEventListener(
            "mousedown",
            this.getScrollBar
          );
          window.removeEventListener("mouseup", this.releaseScrollBar);
          window.removeEventListener("mousemove", this.moveScrollBar);
          this.scrollbar.remove();
        },
      },
      {
        key: "getScrollBar",
        value: function getScrollBar(e) {
          this.isDraggingScrollbar = true;
          this.checkScroll();
          this.html.classList.remove(this.scrollingClass);
          this.html.classList.add(this.draggingClass);
        },
      },
      {
        key: "releaseScrollBar",
        value: function releaseScrollBar(e) {
          this.isDraggingScrollbar = false;
          this.html.classList.add(this.scrollingClass);
          this.html.classList.remove(this.draggingClass);
        },
      },
      {
        key: "moveScrollBar",
        value: function moveScrollBar(e) {
          var _this5 = this;

          if (this.isDraggingScrollbar) {
            requestAnimationFrame(function () {
              var x =
                ((((e.clientX - _this5.scrollbarBCR.left) * 100) /
                  _this5.scrollbarWidth) *
                  _this5.instance.limit.x) /
                100;
              var y =
                ((((e.clientY - _this5.scrollbarBCR.top) * 100) /
                  _this5.scrollbarHeight) *
                  _this5.instance.limit.y) /
                100;

              if (y > 0 && y < _this5.instance.limit.y) {
                _this5.instance.delta.y = y;
              }

              if (x > 0 && x < _this5.instance.limit.x) {
                _this5.instance.delta.x = x;
              }
            });
          }
        },
      },
      {
        key: "addElements",
        value: function addElements() {
          var _this6 = this;

          this.els = {};
          this.parallaxElements = {}; // this.sections.forEach((section, y) => {

          var els = this.el.querySelectorAll("[data-".concat(this.name, "]"));
          els.forEach(function (el, index) {
            // Try and find the target's parent section
            var targetParents = getParents(el);
            var section = Object.entries(_this6.sections)
              .map(function (_ref3) {
                var _ref4 = _slicedToArray$1(_ref3, 2),
                  key = _ref4[0],
                  section = _ref4[1];

                return section;
              })
              .find(function (section) {
                return targetParents.includes(section.el);
              });
            var cl = el.dataset[_this6.name + "Class"] || _this6["class"];
            var id =
              typeof el.dataset[_this6.name + "Id"] === "string"
                ? el.dataset[_this6.name + "Id"]
                : "el" + index;
            var top;
            var left;
            var repeat = el.dataset[_this6.name + "Repeat"];
            var call = el.dataset[_this6.name + "Call"];
            var position = el.dataset[_this6.name + "Position"];
            var delay = el.dataset[_this6.name + "Delay"];
            var direction = el.dataset[_this6.name + "Direction"];
            var sticky = typeof el.dataset[_this6.name + "Sticky"] === "string";
            var speed = el.dataset[_this6.name + "Speed"]
              ? parseFloat(el.dataset[_this6.name + "Speed"]) / 10
              : false;
            var offset =
              typeof el.dataset[_this6.name + "Offset"] === "string"
                ? el.dataset[_this6.name + "Offset"].split(",")
                : _this6.offset;
            var target = el.dataset[_this6.name + "Target"];
            var targetEl;

            if (target !== undefined) {
              targetEl = document.querySelector("".concat(target));
            } else {
              targetEl = el;
            }

            var targetElBCR = targetEl.getBoundingClientRect();

            if (section === null) {
              top =
                targetElBCR.top +
                _this6.instance.scroll.y -
                getTranslate$1(targetEl).y;
              left =
                targetElBCR.left +
                _this6.instance.scroll.x -
                getTranslate$1(targetEl).x;
            } else {
              if (!section.inView) {
                top =
                  targetElBCR.top -
                  getTranslate$1(section.el).y -
                  getTranslate$1(targetEl).y;
                left =
                  targetElBCR.left -
                  getTranslate$1(section.el).x -
                  getTranslate$1(targetEl).x;
              } else {
                top =
                  targetElBCR.top +
                  _this6.instance.scroll.y -
                  getTranslate$1(targetEl).y;
                left =
                  targetElBCR.left +
                  _this6.instance.scroll.x -
                  getTranslate$1(targetEl).x;
              }
            }

            var bottom = top + targetEl.offsetHeight;
            var right = left + targetEl.offsetWidth;
            var middle = {
              x: (right - left) / 2 + left,
              y: (bottom - top) / 2 + top,
            };

            if (sticky) {
              var elBCR = el.getBoundingClientRect();
              var elTop = elBCR.top;
              var elLeft = elBCR.left;
              var elDistance = {
                x: elLeft - left,
                y: elTop - top,
              };
              top += window.innerHeight;
              left += window.innerWidth;
              bottom =
                elTop +
                targetEl.offsetHeight -
                el.offsetHeight -
                elDistance[_this6.directionAxis];
              right =
                elLeft +
                targetEl.offsetWidth -
                el.offsetWidth -
                elDistance[_this6.directionAxis];
              middle = {
                x: (right - left) / 2 + left,
                y: (bottom - top) / 2 + top,
              };
            }

            if (repeat == "false") {
              repeat = false;
            } else if (repeat != undefined) {
              repeat = true;
            } else {
              repeat = _this6.repeat;
            }

            var relativeOffset = [0, 0];

            if (offset) {
              if (_this6.direction === "horizontal") {
                for (var i = 0; i < offset.length; i++) {
                  if (typeof offset[i] == "string") {
                    if (offset[i].includes("%")) {
                      relativeOffset[i] = parseInt(
                        (offset[i].replace("%", "") * _this6.windowWidth) / 100
                      );
                    } else {
                      relativeOffset[i] = parseInt(offset[i]);
                    }
                  } else {
                    relativeOffset[i] = offset[i];
                  }
                }

                left = left + relativeOffset[0];
                right = right - relativeOffset[1];
              } else {
                for (var i = 0; i < offset.length; i++) {
                  if (typeof offset[i] == "string") {
                    if (offset[i].includes("%")) {
                      relativeOffset[i] = parseInt(
                        (offset[i].replace("%", "") * _this6.windowHeight) / 100
                      );
                    } else {
                      relativeOffset[i] = parseInt(offset[i]);
                    }
                  } else {
                    relativeOffset[i] = offset[i];
                  }
                }

                top = top + relativeOffset[0];
                bottom = bottom - relativeOffset[1];
              }
            }

            var mappedEl = {
              el: el,
              id: id,
              class: cl,
              section: section,
              top: top,
              middle: middle,
              bottom: bottom,
              left: left,
              right: right,
              offset: offset,
              progress: 0,
              repeat: repeat,
              inView: false,
              call: call,
              speed: speed,
              delay: delay,
              position: position,
              target: targetEl,
              direction: direction,
              sticky: sticky,
            };
            _this6.els[id] = mappedEl;

            if (el.classList.contains(cl)) {
              _this6.setInView(_this6.els[id], id);
            }

            if (speed !== false || sticky) {
              _this6.parallaxElements[id] = mappedEl;
            }
          }); // });
        },
      },
      {
        key: "addSections",
        value: function addSections() {
          var _this7 = this;

          this.sections = {};
          var sections = this.el.querySelectorAll(
            "[data-".concat(this.name, "-section]")
          );

          if (sections.length === 0) {
            sections = [this.el];
          }

          sections.forEach(function (section, index) {
            var id =
              typeof section.dataset[_this7.name + "Id"] === "string"
                ? section.dataset[_this7.name + "Id"]
                : "section" + index;
            var sectionBCR = section.getBoundingClientRect();
            var offset = {
              x:
                sectionBCR.left -
                window.innerWidth * 1.5 -
                getTranslate$1(section).x,
              y:
                sectionBCR.top -
                window.innerHeight * 1.5 -
                getTranslate$1(section).y,
            };
            var limit = {
              x: offset.x + sectionBCR.width + window.innerWidth * 2,
              y: offset.y + sectionBCR.height + window.innerHeight * 2,
            };
            var persistent =
              typeof section.dataset[_this7.name + "Persistent"] === "string";
            section.setAttribute("data-scroll-section-id", id);
            var mappedSection = {
              el: section,
              offset: offset,
              limit: limit,
              inView: false,
              persistent: persistent,
              id: id,
            };
            _this7.sections[id] = mappedSection;
          });
        },
      },
      {
        key: "transform",
        value: function transform(element, x, y, delay) {
          var transform;

          if (!delay) {
            transform = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,"
              .concat(x, ",")
              .concat(y, ",0,1)");
          } else {
            var start = getTranslate$1(element);
            var lerpX = lerp(start.x, x, delay);
            var lerpY = lerp(start.y, y, delay);
            transform = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,"
              .concat(lerpX, ",")
              .concat(lerpY, ",0,1)");
          }

          element.style.webkitTransform = transform;
          element.style.msTransform = transform;
          element.style.transform = transform;
        },
      },
      {
        key: "transformElements",
        value: function transformElements(isForced) {
          var _this8 = this;

          var setAllElements =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : false;
          var scrollRight = this.instance.scroll.x + this.windowWidth;
          var scrollBottom = this.instance.scroll.y + this.windowHeight;
          var scrollMiddle = {
            x: this.instance.scroll.x + this.windowMiddle.x,
            y: this.instance.scroll.y + this.windowMiddle.y,
          };
          Object.entries(this.parallaxElements).forEach(function (_ref5) {
            var _ref6 = _slicedToArray$1(_ref5, 2),
              i = _ref6[0],
              current = _ref6[1];

            var transformDistance = false;

            if (isForced) {
              transformDistance = 0;
            }

            if (current.inView || setAllElements) {
              switch (current.position) {
                case "top":
                  transformDistance =
                    _this8.instance.scroll[_this8.directionAxis] *
                    -current.speed;
                  break;

                case "elementTop":
                  transformDistance =
                    (scrollBottom - current.top) * -current.speed;
                  break;

                case "bottom":
                  transformDistance =
                    (_this8.instance.limit[_this8.directionAxis] -
                      scrollBottom +
                      _this8.windowHeight) *
                    current.speed;
                  break;

                case "left":
                  transformDistance =
                    _this8.instance.scroll[_this8.directionAxis] *
                    -current.speed;
                  break;

                case "elementLeft":
                  transformDistance =
                    (scrollRight - current.left) * -current.speed;
                  break;

                case "right":
                  transformDistance =
                    (_this8.instance.limit[_this8.directionAxis] -
                      scrollRight +
                      _this8.windowHeight) *
                    current.speed;
                  break;

                default:
                  transformDistance =
                    (scrollMiddle[_this8.directionAxis] -
                      current.middle[_this8.directionAxis]) *
                    -current.speed;
                  break;
              }
            }

            if (current.sticky) {
              if (current.inView) {
                if (_this8.direction === "horizontal") {
                  transformDistance =
                    _this8.instance.scroll.x - current.left + window.innerWidth;
                } else {
                  transformDistance =
                    _this8.instance.scroll.y - current.top + window.innerHeight;
                }
              } else {
                if (_this8.direction === "horizontal") {
                  if (
                    _this8.instance.scroll.x <
                      current.left - window.innerWidth &&
                    _this8.instance.scroll.x <
                      current.left - window.innerWidth / 2
                  ) {
                    transformDistance = 0;
                  } else if (
                    _this8.instance.scroll.x > current.right &&
                    _this8.instance.scroll.x > current.right + 100
                  ) {
                    transformDistance =
                      current.right - current.left + window.innerWidth;
                  } else {
                    transformDistance = false;
                  }
                } else {
                  if (
                    _this8.instance.scroll.y <
                      current.top - window.innerHeight &&
                    _this8.instance.scroll.y <
                      current.top - window.innerHeight / 2
                  ) {
                    transformDistance = 0;
                  } else if (
                    _this8.instance.scroll.y > current.bottom &&
                    _this8.instance.scroll.y > current.bottom + 100
                  ) {
                    transformDistance =
                      current.bottom - current.top + window.innerHeight;
                  } else {
                    transformDistance = false;
                  }
                }
              }
            }

            if (transformDistance !== false) {
              if (
                current.direction === "horizontal" ||
                (_this8.direction === "horizontal" &&
                  current.direction !== "vertical")
              ) {
                _this8.transform(
                  current.el,
                  transformDistance,
                  0,
                  isForced ? false : current.delay
                );
              } else {
                _this8.transform(
                  current.el,
                  0,
                  transformDistance,
                  isForced ? false : current.delay
                );
              }
            }
          });
        },
        /**
         * Scroll to a desired target.
         *
         * @param  Available options :
         *          target {node, string, "top", "bottom", int} - The DOM element we want to scroll to
         *          options {object} - Options object for additionnal settings.
         * @return {void}
         */
      },
      {
        key: "scrollTo",
        value: function scrollTo(target) {
          var _this9 = this;

          var options =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : {};
          // Parse options
          var offset = parseInt(options.offset) || 0; // An offset to apply on top of given `target` or `sourceElem`'s target

          var duration = !isNaN(parseInt(options.duration))
            ? parseInt(options.duration)
            : 1000; // Duration of the scroll animation in milliseconds

          var easing = options.easing || [0.25, 0.0, 0.35, 1.0]; // An array of 4 floats between 0 and 1 defining the bezier curve for the animation's easing. See http://greweb.me/bezier-easing-editor/example/

          var disableLerp = options.disableLerp ? true : false; // Lerp effect won't be applied if set to true

          var callback = options.callback ? options.callback : false; // function called when scrollTo completes (note that it won't wait for lerp to stabilize)

          easing = src$1.apply(void 0, _toConsumableArray(easing));

          if (typeof target === "string") {
            // Selector or boundaries
            if (target === "top") {
              target = 0;
            } else if (target === "bottom") {
              target = this.instance.limit.y;
            } else if (target === "left") {
              target = 0;
            } else if (target === "right") {
              target = this.instance.limit.x;
            } else {
              target = document.querySelector(target); // If the query fails, abort

              if (!target) {
                return;
              }
            }
          } else if (typeof target === "number") {
            // Absolute coordinate
            target = parseInt(target);
          } else if (target && target.tagName);
          else {
            console.warn("`target` parameter is not valid");
            return;
          } // We have a target that is not a coordinate yet, get it

          if (typeof target !== "number") {
            // Verify the given target belongs to this scroll scope
            var targetInScope = getParents(target).includes(this.el);

            if (!targetInScope) {
              // If the target isn't inside our main element, abort any action
              return;
            } // Get target offset from top

            var targetBCR = target.getBoundingClientRect();
            var offsetTop = targetBCR.top;
            var offsetLeft = targetBCR.left; // Try and find the target's parent section

            var targetParents = getParents(target);
            var parentSection = targetParents.find(function (candidate) {
              return Object.entries(_this9.sections) // Get sections associative array as a regular array
                .map(function (_ref7) {
                  var _ref8 = _slicedToArray$1(_ref7, 2),
                    key = _ref8[0],
                    section = _ref8[1];

                  return section;
                }) // map to section only (we dont need the key here)
                .find(function (section) {
                  return section.el == candidate;
                }); // finally find the section that matches the candidate
            });
            var parentSectionOffset = 0;

            if (parentSection) {
              parentSectionOffset =
                getTranslate$1(parentSection)[this.directionAxis]; // We got a parent section, store it's current offset to remove it later
            } else {
              // if no parent section is found we need to use instance scroll directly
              parentSectionOffset = -this.instance.scroll[this.directionAxis];
            } // Final value of scroll destination : offsetTop + (optional offset given in options) - (parent's section translate)

            if (this.direction === "horizontal") {
              offset = offsetLeft + offset - parentSectionOffset;
            } else {
              offset = offsetTop + offset - parentSectionOffset;
            }
          } else {
            offset = target + offset;
          } // Actual scrollto
          // ==========================================================================
          // Setup

          var scrollStart = parseFloat(this.instance.delta[this.directionAxis]);
          var scrollTarget = Math.max(
            0,
            Math.min(offset, this.instance.limit[this.directionAxis])
          ); // Make sure our target is in the scroll boundaries

          var scrollDiff = scrollTarget - scrollStart;

          var render = function render(p) {
            if (disableLerp) {
              if (_this9.direction === "horizontal") {
                _this9.setScroll(
                  scrollStart + scrollDiff * p,
                  _this9.instance.delta.y
                );
              } else {
                _this9.setScroll(
                  _this9.instance.delta.x,
                  scrollStart + scrollDiff * p
                );
              }
            } else {
              _this9.instance.delta[_this9.directionAxis] =
                scrollStart + scrollDiff * p;
            }
          }; // Prepare the scroll

          this.animatingScroll = true; // This boolean allows to prevent `checkScroll()` from calling `stopScrolling` when the animation is slow (i.e. at the beginning of an EaseIn)

          this.stopScrolling(); // Stop any movement, allows to kill any other `scrollTo` still happening

          this.startScrolling(); // Restart the scroll
          // Start the animation loop

          var start = Date.now();

          var loop = function loop() {
            var p = (Date.now() - start) / duration; // Animation progress

            if (p > 1) {
              // Animation ends
              render(1);
              _this9.animatingScroll = false;
              if (duration == 0) _this9.update();
              if (callback) callback();
            } else {
              _this9.scrollToRaf = requestAnimationFrame(loop);
              render(easing(p));
            }
          };

          loop();
        },
      },
      {
        key: "update",
        value: function update() {
          this.setScrollLimit();
          this.addSections();
          this.addElements();
          this.detectElements();
          this.updateScroll();
          this.transformElements(true);
          this.reinitScrollBar();
          this.checkScroll(true);
        },
      },
      {
        key: "startScroll",
        value: function startScroll() {
          this.stop = false;
        },
      },
      {
        key: "stopScroll",
        value: function stopScroll() {
          this.stop = true;
        },
      },
      {
        key: "setScroll",
        value: function setScroll(x, y) {
          this.instance = _objectSpread2(
            _objectSpread2({}, this.instance),
            {},
            {
              scroll: {
                x: x,
                y: y,
              },
              delta: {
                x: x,
                y: y,
              },
              speed: 0,
            }
          );
        },
      },
      {
        key: "destroy",
        value: function destroy() {
          _get$1(_getPrototypeOf$2(_default.prototype), "destroy", this).call(
            this
          );

          this.stopScrolling();
          this.html.classList.remove(this.smoothClass);
          this.vs.destroy();
          this.destroyScrollBar();
          window.removeEventListener("keydown", this.checkKey, false);
        },
      },
    ]);

    return _default;
  })(_default);

  var Smooth = /*#__PURE__*/ (function () {
    function Smooth() {
      var options =
        arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck$1(this, Smooth);

      this.options = options; // Override default options with given ones

      Object.assign(this, defaults$1, options);
      this.smartphone = defaults$1.smartphone;
      if (options.smartphone)
        Object.assign(this.smartphone, options.smartphone);
      this.tablet = defaults$1.tablet;
      if (options.tablet) Object.assign(this.tablet, options.tablet);
      if (!this.smooth && this.direction == "horizontal")
        console.warn(
          "🚨 `smooth:false` & `horizontal` direction are not yet compatible"
        );
      if (!this.tablet.smooth && this.tablet.direction == "horizontal")
        console.warn(
          "🚨 `smooth:false` & `horizontal` direction are not yet compatible (tablet)"
        );
      if (!this.smartphone.smooth && this.smartphone.direction == "horizontal")
        console.warn(
          "🚨 `smooth:false` & `horizontal` direction are not yet compatible (smartphone)"
        );
      this.init();
    }

    _createClass$2(Smooth, [
      {
        key: "init",
        value: function init() {
          this.options.isMobile =
            /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
              navigator.userAgent
            ) ||
            (navigator.platform === "MacIntel" &&
              navigator.maxTouchPoints > 1) ||
            window.innerWidth < this.tablet.breakpoint;
          this.options.isTablet =
            this.options.isMobile &&
            window.innerWidth >= this.tablet.breakpoint;

          if (
            (this.smooth && !this.options.isMobile) ||
            (this.tablet.smooth && this.options.isTablet) ||
            (this.smartphone.smooth &&
              this.options.isMobile &&
              !this.options.isTablet)
          ) {
            this.scroll = new _default$2(this.options);
          } else {
            this.scroll = new _default$1(this.options);
          }

          this.scroll.init();

          if (window.location.hash) {
            // Get the hash without the '#' and find the matching element
            var id = window.location.hash.slice(1, window.location.hash.length);
            var target = document.getElementById(id); // If found, scroll to the element

            if (target) this.scroll.scrollTo(target);
          }
        },
      },
      {
        key: "update",
        value: function update() {
          this.scroll.update();
        },
      },
      {
        key: "start",
        value: function start() {
          this.scroll.startScroll();
        },
      },
      {
        key: "stop",
        value: function stop() {
          this.scroll.stopScroll();
        },
      },
      {
        key: "scrollTo",
        value: function scrollTo(target, options) {
          this.scroll.scrollTo(target, options);
        },
      },
      {
        key: "setScroll",
        value: function setScroll(x, y) {
          this.scroll.setScroll(x, y);
        },
      },
      {
        key: "on",
        value: function on(event, func) {
          this.scroll.setEvents(event, func);
        },
      },
      {
        key: "off",
        value: function off(event, func) {
          this.scroll.unsetEvents(event, func);
        },
      },
      {
        key: "destroy",
        value: function destroy() {
          this.scroll.destroy();
        },
      },
    ]);

    return Smooth;
  })();

  var commonjsGlobal$1 =
    typeof globalThis !== "undefined"
      ? globalThis
      : typeof window !== "undefined"
      ? window
      : typeof global !== "undefined"
      ? global
      : typeof self !== "undefined"
      ? self
      : {};

  function createCommonjsModule$1(fn, module) {
    return (
      (module = { exports: {} }), fn(module, module.exports), module.exports
    );
  }

  var check = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global_1 =
    // eslint-disable-next-line no-undef
    check(typeof globalThis == "object" && globalThis) ||
    check(typeof window == "object" && window) ||
    check(typeof self == "object" && self) ||
    check(typeof commonjsGlobal$1 == "object" && commonjsGlobal$1) ||
    // eslint-disable-next-line no-new-func
    (function () {
      return this;
    })() ||
    Function("return this")();

  var fails = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  // Detect IE8's incomplete defineProperty implementation
  var descriptors = !fails(function () {
    return (
      Object.defineProperty({}, 1, {
        get: function () {
          return 7;
        },
      })[1] != 7
    );
  });

  var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG =
    getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  var f = NASHORN_BUG
    ? function propertyIsEnumerable(V) {
        var descriptor = getOwnPropertyDescriptor(this, V);
        return !!descriptor && descriptor.enumerable;
      }
    : nativePropertyIsEnumerable;

  var objectPropertyIsEnumerable = {
    f: f,
  };

  var createPropertyDescriptor = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value,
    };
  };

  var toString$1 = {}.toString;

  var classofRaw = function (it) {
    return toString$1.call(it).slice(8, -1);
  };

  var split = "".split;

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins
    return !Object("z").propertyIsEnumerable(0);
  })
    ? function (it) {
        return classofRaw(it) == "String" ? split.call(it, "") : Object(it);
      }
    : Object;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible = function (it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  };

  // toObject with fallback for non-array-like ES3 strings

  var toIndexedObject = function (it) {
    return indexedObject(requireObjectCoercible(it));
  };

  var isObject$2 = function (it) {
    return typeof it === "object" ? it !== null : typeof it === "function";
  };

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var toPrimitive = function (input, PREFERRED_STRING) {
    if (!isObject$2(input)) return input;
    var fn, val;
    if (
      PREFERRED_STRING &&
      typeof (fn = input.toString) == "function" &&
      !isObject$2((val = fn.call(input)))
    )
      return val;
    if (
      typeof (fn = input.valueOf) == "function" &&
      !isObject$2((val = fn.call(input)))
    )
      return val;
    if (
      !PREFERRED_STRING &&
      typeof (fn = input.toString) == "function" &&
      !isObject$2((val = fn.call(input)))
    )
      return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var hasOwnProperty$2 = {}.hasOwnProperty;

  var has = function (it, key) {
    return hasOwnProperty$2.call(it, key);
  };

  var document$1 = global_1.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS = isObject$2(document$1) && isObject$2(document$1.createElement);

  var documentCreateElement = function (it) {
    return EXISTS ? document$1.createElement(it) : {};
  };

  // Thank's IE8 for his funny defineProperty
  var ie8DomDefine =
    !descriptors &&
    !fails(function () {
      return (
        Object.defineProperty(documentCreateElement("div"), "a", {
          get: function () {
            return 7;
          },
        }).a != 7
      );
    });

  var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  var f$1 = descriptors
    ? nativeGetOwnPropertyDescriptor
    : function getOwnPropertyDescriptor(O, P) {
        O = toIndexedObject(O);
        P = toPrimitive(P, true);
        if (ie8DomDefine)
          try {
            return nativeGetOwnPropertyDescriptor(O, P);
          } catch (error) {
            /* empty */
          }
        if (has(O, P))
          return createPropertyDescriptor(
            !objectPropertyIsEnumerable.f.call(O, P),
            O[P]
          );
      };

  var objectGetOwnPropertyDescriptor = {
    f: f$1,
  };

  var anObject = function (it) {
    if (!isObject$2(it)) {
      throw TypeError(String(it) + " is not an object");
    }
    return it;
  };

  var nativeDefineProperty = Object.defineProperty;

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  var f$2 = descriptors
    ? nativeDefineProperty
    : function defineProperty(O, P, Attributes) {
        anObject(O);
        P = toPrimitive(P, true);
        anObject(Attributes);
        if (ie8DomDefine)
          try {
            return nativeDefineProperty(O, P, Attributes);
          } catch (error) {
            /* empty */
          }
        if ("get" in Attributes || "set" in Attributes)
          throw TypeError("Accessors not supported");
        if ("value" in Attributes) O[P] = Attributes.value;
        return O;
      };

  var objectDefineProperty = {
    f: f$2,
  };

  var createNonEnumerableProperty = descriptors
    ? function (object, key, value) {
        return objectDefineProperty.f(
          object,
          key,
          createPropertyDescriptor(1, value)
        );
      }
    : function (object, key, value) {
        object[key] = value;
        return object;
      };

  var setGlobal = function (key, value) {
    try {
      createNonEnumerableProperty(global_1, key, value);
    } catch (error) {
      global_1[key] = value;
    }
    return value;
  };

  var SHARED = "__core-js_shared__";
  var store = global_1[SHARED] || setGlobal(SHARED, {});

  var sharedStore = store;

  var functionToString = Function.toString;

  // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
  if (typeof sharedStore.inspectSource != "function") {
    sharedStore.inspectSource = function (it) {
      return functionToString.call(it);
    };
  }

  var inspectSource = sharedStore.inspectSource;

  var WeakMap$1 = global_1.WeakMap;

  var nativeWeakMap =
    typeof WeakMap$1 === "function" &&
    /native code/.test(inspectSource(WeakMap$1));

  var shared = createCommonjsModule$1(function (module) {
    (module.exports = function (key, value) {
      return (
        sharedStore[key] ||
        (sharedStore[key] = value !== undefined ? value : {})
      );
    })("versions", []).push({
      version: "3.8.3",
      mode: "global",
      copyright: "© 2021 Denis Pushkarev (zloirock.ru)",
    });
  });

  var id = 0;
  var postfix = Math.random();

  var uid = function (key) {
    return (
      "Symbol(" +
      String(key === undefined ? "" : key) +
      ")_" +
      (++id + postfix).toString(36)
    );
  };

  var keys = shared("keys");

  var sharedKey = function (key) {
    return keys[key] || (keys[key] = uid(key));
  };

  var hiddenKeys = {};

  var WeakMap$2 = global_1.WeakMap;
  var set$1, get, has$1;

  var enforce = function (it) {
    return has$1(it) ? get(it) : set$1(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject$2(it) || (state = get(it)).type !== TYPE) {
        throw TypeError("Incompatible receiver, " + TYPE + " required");
      }
      return state;
    };
  };

  if (nativeWeakMap) {
    var store$1 = sharedStore.state || (sharedStore.state = new WeakMap$2());
    var wmget = store$1.get;
    var wmhas = store$1.has;
    var wmset = store$1.set;
    set$1 = function (it, metadata) {
      metadata.facade = it;
      wmset.call(store$1, it, metadata);
      return metadata;
    };
    get = function (it) {
      return wmget.call(store$1, it) || {};
    };
    has$1 = function (it) {
      return wmhas.call(store$1, it);
    };
  } else {
    var STATE = sharedKey("state");
    hiddenKeys[STATE] = true;
    set$1 = function (it, metadata) {
      metadata.facade = it;
      createNonEnumerableProperty(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return has(it, STATE) ? it[STATE] : {};
    };
    has$1 = function (it) {
      return has(it, STATE);
    };
  }

  var internalState = {
    set: set$1,
    get: get,
    has: has$1,
    enforce: enforce,
    getterFor: getterFor,
  };

  var redefine = createCommonjsModule$1(function (module) {
    var getInternalState = internalState.get;
    var enforceInternalState = internalState.enforce;
    var TEMPLATE = String(String).split("String");

    (module.exports = function (O, key, value, options) {
      var unsafe = options ? !!options.unsafe : false;
      var simple = options ? !!options.enumerable : false;
      var noTargetGet = options ? !!options.noTargetGet : false;
      var state;
      if (typeof value == "function") {
        if (typeof key == "string" && !has(value, "name")) {
          createNonEnumerableProperty(value, "name", key);
        }
        state = enforceInternalState(value);
        if (!state.source) {
          state.source = TEMPLATE.join(typeof key == "string" ? key : "");
        }
      }
      if (O === global_1) {
        if (simple) O[key] = value;
        else setGlobal(key, value);
        return;
      } else if (!unsafe) {
        delete O[key];
      } else if (!noTargetGet && O[key]) {
        simple = true;
      }
      if (simple) O[key] = value;
      else createNonEnumerableProperty(O, key, value);
      // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
    })(Function.prototype, "toString", function toString() {
      return (
        (typeof this == "function" && getInternalState(this).source) ||
        inspectSource(this)
      );
    });
  });

  var path = global_1;

  var aFunction = function (variable) {
    return typeof variable == "function" ? variable : undefined;
  };

  var getBuiltIn = function (namespace, method) {
    return arguments.length < 2
      ? aFunction(path[namespace]) || aFunction(global_1[namespace])
      : (path[namespace] && path[namespace][method]) ||
          (global_1[namespace] && global_1[namespace][method]);
  };

  var ceil = Math.ceil;
  var floor = Math.floor;

  // `ToInteger` abstract operation
  // https://tc39.es/ecma262/#sec-tointeger
  var toInteger = function (argument) {
    return isNaN((argument = +argument))
      ? 0
      : (argument > 0 ? floor : ceil)(argument);
  };

  var min = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  var toLength = function (argument) {
    return argument > 0 ? min(toInteger(argument), 0x1fffffffffffff) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var max = Math.max;
  var min$1 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex = function (index, length) {
    var integer = toInteger(index);
    return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
  };

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject($this);
      var length = toLength(O.length);
      var index = toAbsoluteIndex(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare
      if (IS_INCLUDES && el != el)
        while (length > index) {
          value = O[index++];
          // eslint-disable-next-line no-self-compare
          if (value != value) return true;
          // Array#indexOf ignores holes, Array#includes - not
        }
      else
        for (; length > index; index++) {
          if ((IS_INCLUDES || index in O) && O[index] === el)
            return IS_INCLUDES || index || 0;
        }
      return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod(false),
  };

  var indexOf = arrayIncludes.indexOf;

  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i)
      if (has(O, (key = names[i++]))) {
        ~indexOf(result, key) || result.push(key);
      }
    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys = [
    "constructor",
    "hasOwnProperty",
    "isPrototypeOf",
    "propertyIsEnumerable",
    "toLocaleString",
    "toString",
    "valueOf",
  ];

  var hiddenKeys$1 = enumBugKeys.concat("length", "prototype");

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  var f$3 =
    Object.getOwnPropertyNames ||
    function getOwnPropertyNames(O) {
      return objectKeysInternal(O, hiddenKeys$1);
    };

  var objectGetOwnPropertyNames = {
    f: f$3,
  };

  var f$4 = Object.getOwnPropertySymbols;

  var objectGetOwnPropertySymbols = {
    f: f$4,
  };

  // all object keys, includes non-enumerable and symbols
  var ownKeys$1 =
    getBuiltIn("Reflect", "ownKeys") ||
    function ownKeys(it) {
      var keys = objectGetOwnPropertyNames.f(anObject(it));
      var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
      return getOwnPropertySymbols
        ? keys.concat(getOwnPropertySymbols(it))
        : keys;
    };

  var copyConstructorProperties = function (target, source) {
    var keys = ownKeys$1(source);
    var defineProperty = objectDefineProperty.f;
    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!has(target, key))
        defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };

  var replacement = /#|\.prototype\./;

  var isForced = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL
      ? true
      : value == NATIVE
      ? false
      : typeof detection == "function"
      ? fails(detection)
      : !!detection;
  };

  var normalize = (isForced.normalize = function (string) {
    return String(string).replace(replacement, ".").toLowerCase();
  });

  var data = (isForced.data = {});
  var NATIVE = (isForced.NATIVE = "N");
  var POLYFILL = (isForced.POLYFILL = "P");

  var isForced_1 = isForced;

  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;

  /*
      options.target      - name of the target object
      options.global      - target is the global object
      options.stat        - export as static methods of target
      options.proto       - export as prototype methods of target
      options.real        - real prototype method for the `pure` version
      options.forced      - export even if the native feature is available
      options.bind        - bind methods to the target, required for the `pure` version
      options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
      options.unsafe      - use the simple assignment of property instead of delete + defineProperty
      options.sham        - add a flag to not completely full polyfills
      options.enumerable  - export as enumerable property
      options.noTargetGet - prevent calling a getter on target
    */
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = global_1;
    } else if (STATIC) {
      target = global_1[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global_1[TARGET] || {}).prototype;
    }
    if (target)
      for (key in source) {
        sourceProperty = source[key];
        if (options.noTargetGet) {
          descriptor = getOwnPropertyDescriptor$1(target, key);
          targetProperty = descriptor && descriptor.value;
        } else targetProperty = target[key];
        FORCED = isForced_1(
          GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key,
          options.forced
        );
        // contained in target
        if (!FORCED && targetProperty !== undefined) {
          if (typeof sourceProperty === typeof targetProperty) continue;
          copyConstructorProperties(sourceProperty, targetProperty);
        }
        // add a flag to not completely full polyfills
        if (options.sham || (targetProperty && targetProperty.sham)) {
          createNonEnumerableProperty(sourceProperty, "sham", true);
        }
        // extend global
        redefine(target, key, sourceProperty, options);
      }
  };

  var aFunction$1 = function (it) {
    if (typeof it != "function") {
      throw TypeError(String(it) + " is not a function");
    }
    return it;
  };

  // optional / simple context binding
  var functionBindContext = function (fn, that, length) {
    aFunction$1(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 0:
        return function () {
          return fn.call(that);
        };
      case 1:
        return function (a) {
          return fn.call(that, a);
        };
      case 2:
        return function (a, b) {
          return fn.call(that, a, b);
        };
      case 3:
        return function (a, b, c) {
          return fn.call(that, a, b, c);
        };
    }
    return function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject$1 = function (argument) {
    return Object(requireObjectCoercible(argument));
  };

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  var isArray =
    Array.isArray ||
    function isArray(arg) {
      return classofRaw(arg) == "Array";
    };

  var nativeSymbol =
    !!Object.getOwnPropertySymbols &&
    !fails(function () {
      // Chrome 38 Symbol has incorrect toString conversion
      // eslint-disable-next-line no-undef
      return !String(Symbol());
    });

  var useSymbolAsUid =
    nativeSymbol &&
    // eslint-disable-next-line no-undef
    !Symbol.sham &&
    // eslint-disable-next-line no-undef
    typeof Symbol.iterator == "symbol";

  var WellKnownSymbolsStore = shared("wks");
  var Symbol$1 = global_1.Symbol;
  var createWellKnownSymbol = useSymbolAsUid
    ? Symbol$1
    : (Symbol$1 && Symbol$1.withoutSetter) || uid;

  var wellKnownSymbol = function (name) {
    if (!has(WellKnownSymbolsStore, name)) {
      if (nativeSymbol && has(Symbol$1, name))
        WellKnownSymbolsStore[name] = Symbol$1[name];
      else
        WellKnownSymbolsStore[name] = createWellKnownSymbol("Symbol." + name);
    }
    return WellKnownSymbolsStore[name];
  };

  var SPECIES = wellKnownSymbol("species");

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate = function (originalArray, length) {
    var C;
    if (isArray(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (typeof C == "function" && (C === Array || isArray(C.prototype)))
        C = undefined;
      else if (isObject$2(C)) {
        C = C[SPECIES];
        if (C === null) C = undefined;
      }
    }
    return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
  };

  var push = [].push;

  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation
  var createMethod$1 = function (TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var IS_FILTER_OUT = TYPE == 7;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject$1($this);
      var self = indexedObject(O);
      var boundFunction = functionBindContext(callbackfn, that, 3);
      var length = toLength(self.length);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate;
      var target = IS_MAP
        ? create($this, length)
        : IS_FILTER || IS_FILTER_OUT
        ? create($this, 0)
        : undefined;
      var value, result;
      for (; length > index; index++)
        if (NO_HOLES || index in self) {
          value = self[index];
          result = boundFunction(value, index, O);
          if (TYPE) {
            if (IS_MAP) target[index] = result;
            // map
            else if (result)
              switch (TYPE) {
                case 3:
                  return true; // some
                case 5:
                  return value; // find
                case 6:
                  return index; // findIndex
                case 2:
                  push.call(target, value); // filter
              }
            else
              switch (TYPE) {
                case 4:
                  return false; // every
                case 7:
                  push.call(target, value); // filterOut
              }
          }
        }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };

  var arrayIteration = {
    // `Array.prototype.forEach` method
    // https://tc39.es/ecma262/#sec-array.prototype.foreach
    forEach: createMethod$1(0),
    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    map: createMethod$1(1),
    // `Array.prototype.filter` method
    // https://tc39.es/ecma262/#sec-array.prototype.filter
    filter: createMethod$1(2),
    // `Array.prototype.some` method
    // https://tc39.es/ecma262/#sec-array.prototype.some
    some: createMethod$1(3),
    // `Array.prototype.every` method
    // https://tc39.es/ecma262/#sec-array.prototype.every
    every: createMethod$1(4),
    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    find: createMethod$1(5),
    // `Array.prototype.findIndex` method
    // https://tc39.es/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod$1(6),
    // `Array.prototype.filterOut` method
    // https://github.com/tc39/proposal-array-filtering
    filterOut: createMethod$1(7),
  };

  var arrayMethodIsStrict = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return (
      !!method &&
      fails(function () {
        // eslint-disable-next-line no-useless-call,no-throw-literal
        method.call(
          null,
          argument ||
            function () {
              throw 1;
            },
          1
        );
      })
    );
  };

  var defineProperty = Object.defineProperty;
  var cache = {};

  var thrower = function (it) {
    throw it;
  };

  var arrayMethodUsesToLength = function (METHOD_NAME, options) {
    if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
    if (!options) options = {};
    var method = [][METHOD_NAME];
    var ACCESSORS = has(options, "ACCESSORS") ? options.ACCESSORS : false;
    var argument0 = has(options, 0) ? options[0] : thrower;
    var argument1 = has(options, 1) ? options[1] : undefined;

    return (cache[METHOD_NAME] =
      !!method &&
      !fails(function () {
        if (ACCESSORS && !descriptors) return true;
        var O = { length: -1 };

        if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
        else O[1] = 1;

        method.call(O, argument0, argument1);
      }));
  };

  var $forEach = arrayIteration.forEach;

  var STRICT_METHOD = arrayMethodIsStrict("forEach");
  var USES_TO_LENGTH = arrayMethodUsesToLength("forEach");

  // `Array.prototype.forEach` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  var arrayForEach =
    !STRICT_METHOD || !USES_TO_LENGTH
      ? function forEach(callbackfn /* , thisArg */) {
          return $forEach(
            this,
            callbackfn,
            arguments.length > 1 ? arguments[1] : undefined
          );
        }
      : [].forEach;

  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  _export(
    { target: "Array", proto: true, forced: [].forEach != arrayForEach },
    {
      forEach: arrayForEach,
    }
  );

  // iterable DOM collections
  // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
  var domIterables = {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0,
  };

  for (var COLLECTION_NAME in domIterables) {
    var Collection = global_1[COLLECTION_NAME];
    var CollectionPrototype = Collection && Collection.prototype;
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype && CollectionPrototype.forEach !== arrayForEach)
      try {
        createNonEnumerableProperty(
          CollectionPrototype,
          "forEach",
          arrayForEach
        );
      } catch (error) {
        CollectionPrototype.forEach = arrayForEach;
      }
  }

  var canUseDOM = !!(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
  );

  var canUseDom = canUseDOM;

  var engineUserAgent = getBuiltIn("navigator", "userAgent") || "";

  var process = global_1.process;
  var versions = process && process.versions;
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split(".");
    version = match[0] + match[1];
  } else if (engineUserAgent) {
    match = engineUserAgent.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
      match = engineUserAgent.match(/Chrome\/(\d+)/);
      if (match) version = match[1];
    }
  }

  var engineV8Version = version && +version;

  var SPECIES$1 = wellKnownSymbol("species");

  var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return (
      engineV8Version >= 51 ||
      !fails(function () {
        var array = [];
        var constructor = (array.constructor = {});
        constructor[SPECIES$1] = function () {
          return { foo: 1 };
        };
        return array[METHOD_NAME](Boolean).foo !== 1;
      })
    );
  };

  var $filter = arrayIteration.filter;

  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("filter");
  // Edge 14- issue
  var USES_TO_LENGTH$1 = arrayMethodUsesToLength("filter");

  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  // with adding support of @@species
  _export(
    {
      target: "Array",
      proto: true,
      forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH$1,
    },
    {
      filter: function filter(callbackfn /* , thisArg */) {
        return $filter(
          this,
          callbackfn,
          arguments.length > 1 ? arguments[1] : undefined
        );
      },
    }
  );

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  var objectKeys =
    Object.keys ||
    function keys(O) {
      return objectKeysInternal(O, enumBugKeys);
    };

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  var objectDefineProperties = descriptors
    ? Object.defineProperties
    : function defineProperties(O, Properties) {
        anObject(O);
        var keys = objectKeys(Properties);
        var length = keys.length;
        var index = 0;
        var key;
        while (length > index)
          objectDefineProperty.f(O, (key = keys[index++]), Properties[key]);
        return O;
      };

  var html$1 = getBuiltIn("document", "documentElement");

  var GT = ">";
  var LT = "<";
  var PROTOTYPE = "prototype";
  var SCRIPT = "script";
  var IE_PROTO = sharedKey("IE_PROTO");

  var EmptyConstructor = function () {
    /* empty */
  };

  var scriptTag = function (content) {
    return LT + SCRIPT + GT + content + LT + "/" + SCRIPT + GT;
  };

  // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
  var NullProtoObjectViaActiveX = function (activeXDocument) {
    activeXDocument.write(scriptTag(""));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak
    return temp;
  };

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var NullProtoObjectViaIFrame = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement("iframe");
    var JS = "java" + SCRIPT + ":";
    var iframeDocument;
    iframe.style.display = "none";
    html$1.appendChild(iframe);
    // https://github.com/zloirock/core-js/issues/475
    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag("document.F=Object"));
    iframeDocument.close();
    return iframeDocument.F;
  };

  // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug
  var activeXDocument;
  var NullProtoObject = function () {
    try {
      /* global ActiveXObject */
      activeXDocument = document.domain && new ActiveXObject("htmlfile");
    } catch (error) {
      /* ignore */
    }
    NullProtoObject = activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument)
      : NullProtoObjectViaIFrame();
    var length = enumBugKeys.length;
    while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
    return NullProtoObject();
  };

  hiddenKeys[IE_PROTO] = true;

  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  var objectCreate =
    Object.create ||
    function create(O, Properties) {
      var result;
      if (O !== null) {
        EmptyConstructor[PROTOTYPE] = anObject(O);
        result = new EmptyConstructor();
        EmptyConstructor[PROTOTYPE] = null;
        // add "__proto__" for Object.getPrototypeOf polyfill
        result[IE_PROTO] = O;
      } else result = NullProtoObject();
      return Properties === undefined
        ? result
        : objectDefineProperties(result, Properties);
    };

  var UNSCOPABLES = wellKnownSymbol("unscopables");
  var ArrayPrototype = Array.prototype;

  // Array.prototype[@@unscopables]
  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  if (ArrayPrototype[UNSCOPABLES] == undefined) {
    objectDefineProperty.f(ArrayPrototype, UNSCOPABLES, {
      configurable: true,
      value: objectCreate(null),
    });
  }

  // add a key to Array.prototype[@@unscopables]
  var addToUnscopables = function (key) {
    ArrayPrototype[UNSCOPABLES][key] = true;
  };

  var iterators = {};

  var correctPrototypeGetter = !fails(function () {
    function F() {
      /* empty */
    }
    F.prototype.constructor = null;
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var IE_PROTO$1 = sharedKey("IE_PROTO");
  var ObjectPrototype = Object.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  var objectGetPrototypeOf = correctPrototypeGetter
    ? Object.getPrototypeOf
    : function (O) {
        O = toObject$1(O);
        if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];
        if (typeof O.constructor == "function" && O instanceof O.constructor) {
          return O.constructor.prototype;
        }
        return O instanceof Object ? ObjectPrototype : null;
      };

  var ITERATOR = wellKnownSymbol("iterator");
  var BUGGY_SAFARI_ITERATORS = false;

  var returnThis = function () {
    return this;
  };

  // `%IteratorPrototype%` object
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
  var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

  if ([].keys) {
    arrayIterator = [].keys();
    // Safari 8 has buggy iterators w/o `next`
    if (!("next" in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
    else {
      PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(
        objectGetPrototypeOf(arrayIterator)
      );
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype)
        IteratorPrototype = PrototypeOfArrayIteratorPrototype;
    }
  }

  var NEW_ITERATOR_PROTOTYPE =
    IteratorPrototype == undefined ||
    fails(function () {
      var test = {};
      // FF44- legacy iterators case
      return IteratorPrototype[ITERATOR].call(test) !== test;
    });

  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};

  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
  if (!has(IteratorPrototype, ITERATOR)) {
    createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
  }

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS,
  };

  var defineProperty$1 = objectDefineProperty.f;

  var TO_STRING_TAG = wellKnownSymbol("toStringTag");

  var setToStringTag = function (it, TAG, STATIC) {
    if (it && !has((it = STATIC ? it : it.prototype), TO_STRING_TAG)) {
      defineProperty$1(it, TO_STRING_TAG, { configurable: true, value: TAG });
    }
  };

  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;

  var returnThis$1 = function () {
    return this;
  };

  var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
    var TO_STRING_TAG = NAME + " Iterator";
    IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, {
      next: createPropertyDescriptor(1, next),
    });
    setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
    iterators[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  var aPossiblePrototype = function (it) {
    if (!isObject$2(it) && it !== null) {
      throw TypeError("Can't set " + String(it) + " as a prototype");
    }
    return it;
  };

  // `Object.setPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  /* eslint-disable no-proto */
  var objectSetPrototypeOf =
    Object.setPrototypeOf ||
    ("__proto__" in {}
      ? (function () {
          var CORRECT_SETTER = false;
          var test = {};
          var setter;
          try {
            setter = Object.getOwnPropertyDescriptor(
              Object.prototype,
              "__proto__"
            ).set;
            setter.call(test, []);
            CORRECT_SETTER = test instanceof Array;
          } catch (error) {
            /* empty */
          }
          return function setPrototypeOf(O, proto) {
            anObject(O);
            aPossiblePrototype(proto);
            if (CORRECT_SETTER) setter.call(O, proto);
            else O.__proto__ = proto;
            return O;
          };
        })()
      : undefined);

  var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$1 = wellKnownSymbol("iterator");
  var KEYS = "keys";
  var VALUES = "values";
  var ENTRIES = "entries";

  var returnThis$2 = function () {
    return this;
  };

  var defineIterator = function (
    Iterable,
    NAME,
    IteratorConstructor,
    next,
    DEFAULT,
    IS_SET,
    FORCED
  ) {
    createIteratorConstructor(IteratorConstructor, NAME, next);

    var getIterationMethod = function (KIND) {
      if (KIND === DEFAULT && defaultIterator) return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype)
        return IterablePrototype[KIND];
      switch (KIND) {
        case KEYS:
          return function keys() {
            return new IteratorConstructor(this, KIND);
          };
        case VALUES:
          return function values() {
            return new IteratorConstructor(this, KIND);
          };
        case ENTRIES:
          return function entries() {
            return new IteratorConstructor(this, KIND);
          };
      }
      return function () {
        return new IteratorConstructor(this);
      };
    };

    var TO_STRING_TAG = NAME + " Iterator";
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator =
      IterablePrototype[ITERATOR$1] ||
      IterablePrototype["@@iterator"] ||
      (DEFAULT && IterablePrototype[DEFAULT]);
    var defaultIterator =
      (!BUGGY_SAFARI_ITERATORS$1 && nativeIterator) ||
      getIterationMethod(DEFAULT);
    var anyNativeIterator =
      NAME == "Array"
        ? IterablePrototype.entries || nativeIterator
        : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY;

    // fix native
    if (anyNativeIterator) {
      CurrentIteratorPrototype = objectGetPrototypeOf(
        anyNativeIterator.call(new Iterable())
      );
      if (
        IteratorPrototype$2 !== Object.prototype &&
        CurrentIteratorPrototype.next
      ) {
        if (
          objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2
        ) {
          if (objectSetPrototypeOf) {
            objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
          } else if (
            typeof CurrentIteratorPrototype[ITERATOR$1] != "function"
          ) {
            createNonEnumerableProperty(
              CurrentIteratorPrototype,
              ITERATOR$1,
              returnThis$2
            );
          }
        }
        // Set @@toStringTag to native iterators
        setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
      }
    }

    // fix Array#{values, @@iterator}.name in V8 / FF
    if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() {
        return nativeIterator.call(this);
      };
    }

    // define iterator
    if (IterablePrototype[ITERATOR$1] !== defaultIterator) {
      createNonEnumerableProperty(
        IterablePrototype,
        ITERATOR$1,
        defaultIterator
      );
    }
    iterators[NAME] = defaultIterator;

    // export additional methods
    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES),
      };
      if (FORCED)
        for (KEY in methods) {
          if (
            BUGGY_SAFARI_ITERATORS$1 ||
            INCORRECT_VALUES_NAME ||
            !(KEY in IterablePrototype)
          ) {
            redefine(IterablePrototype, KEY, methods[KEY]);
          }
        }
      else
        _export(
          {
            target: NAME,
            proto: true,
            forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME,
          },
          methods
        );
    }

    return methods;
  };

  var ARRAY_ITERATOR = "Array Iterator";
  var setInternalState = internalState.set;
  var getInternalState = internalState.getterFor(ARRAY_ITERATOR);

  // `Array.prototype.entries` method
  // https://tc39.es/ecma262/#sec-array.prototype.entries
  // `Array.prototype.keys` method
  // https://tc39.es/ecma262/#sec-array.prototype.keys
  // `Array.prototype.values` method
  // https://tc39.es/ecma262/#sec-array.prototype.values
  // `Array.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-array.prototype-@@iterator
  // `CreateArrayIterator` internal method
  // https://tc39.es/ecma262/#sec-createarrayiterator
  var es_array_iterator = defineIterator(
    Array,
    "Array",
    function (iterated, kind) {
      setInternalState(this, {
        type: ARRAY_ITERATOR,
        target: toIndexedObject(iterated), // target
        index: 0, // next index
        kind: kind, // kind
      });
      // `%ArrayIteratorPrototype%.next` method
      // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
    },
    function () {
      var state = getInternalState(this);
      var target = state.target;
      var kind = state.kind;
      var index = state.index++;
      if (!target || index >= target.length) {
        state.target = undefined;
        return { value: undefined, done: true };
      }
      if (kind == "keys") return { value: index, done: false };
      if (kind == "values") return { value: target[index], done: false };
      return { value: [index, target[index]], done: false };
    },
    "values"
  );

  // argumentsList[@@iterator] is %ArrayProto_values%
  // https://tc39.es/ecma262/#sec-createunmappedargumentsobject
  // https://tc39.es/ecma262/#sec-createmappedargumentsobject
  iterators.Arguments = iterators.Array;

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables("keys");
  addToUnscopables("values");
  addToUnscopables("entries");

  var nativeAssign = Object.assign;
  var defineProperty$2 = Object.defineProperty;

  // `Object.assign` method
  // https://tc39.es/ecma262/#sec-object.assign
  var objectAssign$1 =
    !nativeAssign ||
    fails(function () {
      // should have correct order of operations (Edge bug)
      if (
        descriptors &&
        nativeAssign(
          { b: 1 },
          nativeAssign(
            defineProperty$2({}, "a", {
              enumerable: true,
              get: function () {
                defineProperty$2(this, "b", {
                  value: 3,
                  enumerable: false,
                });
              },
            }),
            { b: 2 }
          )
        ).b !== 1
      )
        return true;
      // should work with symbols and should have deterministic property order (V8 bug)
      var A = {};
      var B = {};
      // eslint-disable-next-line no-undef
      var symbol = Symbol();
      var alphabet = "abcdefghijklmnopqrst";
      A[symbol] = 7;
      alphabet.split("").forEach(function (chr) {
        B[chr] = chr;
      });
      return (
        nativeAssign({}, A)[symbol] != 7 ||
        objectKeys(nativeAssign({}, B)).join("") != alphabet
      );
    })
      ? function assign(target, source) {
          // eslint-disable-line no-unused-vars
          var T = toObject$1(target);
          var argumentsLength = arguments.length;
          var index = 1;
          var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
          var propertyIsEnumerable = objectPropertyIsEnumerable.f;
          while (argumentsLength > index) {
            var S = indexedObject(arguments[index++]);
            var keys = getOwnPropertySymbols
              ? objectKeys(S).concat(getOwnPropertySymbols(S))
              : objectKeys(S);
            var length = keys.length;
            var j = 0;
            var key;
            while (length > j) {
              key = keys[j++];
              if (!descriptors || propertyIsEnumerable.call(S, key))
                T[key] = S[key];
            }
          }
          return T;
        }
      : nativeAssign;

  // `Object.assign` method
  // https://tc39.es/ecma262/#sec-object.assign
  _export(
    { target: "Object", stat: true, forced: Object.assign !== objectAssign$1 },
    {
      assign: objectAssign$1,
    }
  );

  var TO_STRING_TAG$1 = wellKnownSymbol("toStringTag");
  var test = {};

  test[TO_STRING_TAG$1] = "z";

  var toStringTagSupport = String(test) === "[object z]";

  var TO_STRING_TAG$2 = wellKnownSymbol("toStringTag");
  // ES3 wrong here
  var CORRECT_ARGUMENTS =
    classofRaw(
      (function () {
        return arguments;
      })()
    ) == "Arguments";

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) {
      /* empty */
    }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof = toStringTagSupport
    ? classofRaw
    : function (it) {
        var O, tag, result;
        return it === undefined
          ? "Undefined"
          : it === null
          ? "Null"
          : // @@toStringTag case
          typeof (tag = tryGet((O = Object(it)), TO_STRING_TAG$2)) == "string"
          ? tag
          : // builtinTag case
          CORRECT_ARGUMENTS
          ? classofRaw(O)
          : // ES3 arguments fallback
          (result = classofRaw(O)) == "Object" && typeof O.callee == "function"
          ? "Arguments"
          : result;
      };

  // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  var objectToString = toStringTagSupport
    ? {}.toString
    : function toString() {
        return "[object " + classof(this) + "]";
      };

  // `Object.prototype.toString` method
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  if (!toStringTagSupport) {
    redefine(Object.prototype, "toString", objectToString, { unsafe: true });
  }

  // a string of all valid unicode whitespaces
  // eslint-disable-next-line max-len
  var whitespaces =
    "\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";

  var whitespace = "[" + whitespaces + "]";
  var ltrim = RegExp("^" + whitespace + whitespace + "*");
  var rtrim = RegExp(whitespace + whitespace + "*$");

  // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
  var createMethod$2 = function (TYPE) {
    return function ($this) {
      var string = String(requireObjectCoercible($this));
      if (TYPE & 1) string = string.replace(ltrim, "");
      if (TYPE & 2) string = string.replace(rtrim, "");
      return string;
    };
  };

  var stringTrim = {
    // `String.prototype.{ trimLeft, trimStart }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimstart
    start: createMethod$2(1),
    // `String.prototype.{ trimRight, trimEnd }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimend
    end: createMethod$2(2),
    // `String.prototype.trim` method
    // https://tc39.es/ecma262/#sec-string.prototype.trim
    trim: createMethod$2(3),
  };

  var trim = stringTrim.trim;

  var $parseInt = global_1.parseInt;
  var hex = /^[+-]?0[Xx]/;
  var FORCED =
    $parseInt(whitespaces + "08") !== 8 ||
    $parseInt(whitespaces + "0x16") !== 22;

  // `parseInt` method
  // https://tc39.es/ecma262/#sec-parseint-string-radix
  var numberParseInt = FORCED
    ? function parseInt(string, radix) {
        var S = trim(String(string));
        return $parseInt(S, radix >>> 0 || (hex.test(S) ? 16 : 10));
      }
    : $parseInt;

  // `parseInt` method
  // https://tc39.es/ecma262/#sec-parseint-string-radix
  _export(
    { global: true, forced: parseInt != numberParseInt },
    {
      parseInt: numberParseInt,
    }
  );

  // `String.prototype.{ codePointAt, at }` methods implementation
  var createMethod$3 = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = String(requireObjectCoercible($this));
      var position = toInteger(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size)
        return CONVERT_TO_STRING ? "" : undefined;
      first = S.charCodeAt(position);
      return first < 0xd800 ||
        first > 0xdbff ||
        position + 1 === size ||
        (second = S.charCodeAt(position + 1)) < 0xdc00 ||
        second > 0xdfff
        ? CONVERT_TO_STRING
          ? S.charAt(position)
          : first
        : CONVERT_TO_STRING
        ? S.slice(position, position + 2)
        : ((first - 0xd800) << 10) + (second - 0xdc00) + 0x10000;
    };
  };

  var stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.es/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod$3(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$3(true),
  };

  var charAt = stringMultibyte.charAt;

  var STRING_ITERATOR = "String Iterator";
  var setInternalState$1 = internalState.set;
  var getInternalState$1 = internalState.getterFor(STRING_ITERATOR);

  // `String.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-string.prototype-@@iterator
  defineIterator(
    String,
    "String",
    function (iterated) {
      setInternalState$1(this, {
        type: STRING_ITERATOR,
        string: String(iterated),
        index: 0,
      });
      // `%StringIteratorPrototype%.next` method
      // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
    },
    function next() {
      var state = getInternalState$1(this);
      var string = state.string;
      var index = state.index;
      var point;
      if (index >= string.length) return { value: undefined, done: true };
      point = charAt(string, index);
      state.index += point.length;
      return { value: point, done: false };
    }
  );

  var redefineAll = function (target, src, options) {
    for (var key in src) redefine(target, key, src[key], options);
    return target;
  };

  var freezing = !fails(function () {
    return Object.isExtensible(Object.preventExtensions({}));
  });

  var internalMetadata = createCommonjsModule$1(function (module) {
    var defineProperty = objectDefineProperty.f;

    var METADATA = uid("meta");
    var id = 0;

    var isExtensible =
      Object.isExtensible ||
      function () {
        return true;
      };

    var setMetadata = function (it) {
      defineProperty(it, METADATA, {
        value: {
          objectID: "O" + ++id, // object ID
          weakData: {}, // weak collections IDs
        },
      });
    };

    var fastKey = function (it, create) {
      // return a primitive with prefix
      if (!isObject$2(it))
        return typeof it == "symbol"
          ? it
          : (typeof it == "string" ? "S" : "P") + it;
      if (!has(it, METADATA)) {
        // can't set metadata to uncaught frozen object
        if (!isExtensible(it)) return "F";
        // not necessary to add metadata
        if (!create) return "E";
        // add missing metadata
        setMetadata(it);
        // return object ID
      }
      return it[METADATA].objectID;
    };

    var getWeakData = function (it, create) {
      if (!has(it, METADATA)) {
        // can't set metadata to uncaught frozen object
        if (!isExtensible(it)) return true;
        // not necessary to add metadata
        if (!create) return false;
        // add missing metadata
        setMetadata(it);
        // return the store of weak collections IDs
      }
      return it[METADATA].weakData;
    };

    // add metadata on freeze-family methods calling
    var onFreeze = function (it) {
      if (freezing && meta.REQUIRED && isExtensible(it) && !has(it, METADATA))
        setMetadata(it);
      return it;
    };

    var meta = (module.exports = {
      REQUIRED: false,
      fastKey: fastKey,
      getWeakData: getWeakData,
      onFreeze: onFreeze,
    });

    hiddenKeys[METADATA] = true;
  });
  var internalMetadata_1 = internalMetadata.REQUIRED;
  var internalMetadata_2 = internalMetadata.fastKey;
  var internalMetadata_3 = internalMetadata.getWeakData;
  var internalMetadata_4 = internalMetadata.onFreeze;

  var ITERATOR$2 = wellKnownSymbol("iterator");
  var ArrayPrototype$1 = Array.prototype;

  // check on default Array iterator
  var isArrayIteratorMethod = function (it) {
    return (
      it !== undefined &&
      (iterators.Array === it || ArrayPrototype$1[ITERATOR$2] === it)
    );
  };

  var ITERATOR$3 = wellKnownSymbol("iterator");

  var getIteratorMethod = function (it) {
    if (it != undefined)
      return it[ITERATOR$3] || it["@@iterator"] || iterators[classof(it)];
  };

  var iteratorClose = function (iterator) {
    var returnMethod = iterator["return"];
    if (returnMethod !== undefined) {
      return anObject(returnMethod.call(iterator)).value;
    }
  };

  var Result = function (stopped, result) {
    this.stopped = stopped;
    this.result = result;
  };

  var iterate = function (iterable, unboundFunction, options) {
    var that = options && options.that;
    var AS_ENTRIES = !!(options && options.AS_ENTRIES);
    var IS_ITERATOR = !!(options && options.IS_ITERATOR);
    var INTERRUPTED = !!(options && options.INTERRUPTED);
    var fn = functionBindContext(
      unboundFunction,
      that,
      1 + AS_ENTRIES + INTERRUPTED
    );
    var iterator, iterFn, index, length, result, next, step;

    var stop = function (condition) {
      if (iterator) iteratorClose(iterator);
      return new Result(true, condition);
    };

    var callFn = function (value) {
      if (AS_ENTRIES) {
        anObject(value);
        return INTERRUPTED
          ? fn(value[0], value[1], stop)
          : fn(value[0], value[1]);
      }
      return INTERRUPTED ? fn(value, stop) : fn(value);
    };

    if (IS_ITERATOR) {
      iterator = iterable;
    } else {
      iterFn = getIteratorMethod(iterable);
      if (typeof iterFn != "function")
        throw TypeError("Target is not iterable");
      // optimisation for array iterators
      if (isArrayIteratorMethod(iterFn)) {
        for (
          index = 0, length = toLength(iterable.length);
          length > index;
          index++
        ) {
          result = callFn(iterable[index]);
          if (result && result instanceof Result) return result;
        }
        return new Result(false);
      }
      iterator = iterFn.call(iterable);
    }

    next = iterator.next;
    while (!(step = next.call(iterator)).done) {
      try {
        result = callFn(step.value);
      } catch (error) {
        iteratorClose(iterator);
        throw error;
      }
      if (typeof result == "object" && result && result instanceof Result)
        return result;
    }
    return new Result(false);
  };

  var anInstance = function (it, Constructor, name) {
    if (!(it instanceof Constructor)) {
      throw TypeError("Incorrect " + (name ? name + " " : "") + "invocation");
    }
    return it;
  };

  var ITERATOR$4 = wellKnownSymbol("iterator");
  var SAFE_CLOSING = false;

  try {
    var called = 0;
    var iteratorWithReturn = {
      next: function () {
        return { done: !!called++ };
      },
      return: function () {
        SAFE_CLOSING = true;
      },
    };
    iteratorWithReturn[ITERATOR$4] = function () {
      return this;
    };
    // eslint-disable-next-line no-throw-literal
    Array.from(iteratorWithReturn, function () {
      throw 2;
    });
  } catch (error) {
    /* empty */
  }

  var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    var ITERATION_SUPPORT = false;
    try {
      var object = {};
      object[ITERATOR$4] = function () {
        return {
          next: function () {
            return { done: (ITERATION_SUPPORT = true) };
          },
        };
      };
      exec(object);
    } catch (error) {
      /* empty */
    }
    return ITERATION_SUPPORT;
  };

  // makes subclassing work correct for wrapped built-ins
  var inheritIfRequired = function ($this, dummy, Wrapper) {
    var NewTarget, NewTargetPrototype;
    if (
      // it can work only with native `setPrototypeOf`
      objectSetPrototypeOf &&
      // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
      typeof (NewTarget = dummy.constructor) == "function" &&
      NewTarget !== Wrapper &&
      isObject$2((NewTargetPrototype = NewTarget.prototype)) &&
      NewTargetPrototype !== Wrapper.prototype
    )
      objectSetPrototypeOf($this, NewTargetPrototype);
    return $this;
  };

  var collection = function (CONSTRUCTOR_NAME, wrapper, common) {
    var IS_MAP = CONSTRUCTOR_NAME.indexOf("Map") !== -1;
    var IS_WEAK = CONSTRUCTOR_NAME.indexOf("Weak") !== -1;
    var ADDER = IS_MAP ? "set" : "add";
    var NativeConstructor = global_1[CONSTRUCTOR_NAME];
    var NativePrototype = NativeConstructor && NativeConstructor.prototype;
    var Constructor = NativeConstructor;
    var exported = {};

    var fixMethod = function (KEY) {
      var nativeMethod = NativePrototype[KEY];
      redefine(
        NativePrototype,
        KEY,
        KEY == "add"
          ? function add(value) {
              nativeMethod.call(this, value === 0 ? 0 : value);
              return this;
            }
          : KEY == "delete"
          ? function (key) {
              return IS_WEAK && !isObject$2(key)
                ? false
                : nativeMethod.call(this, key === 0 ? 0 : key);
            }
          : KEY == "get"
          ? function get(key) {
              return IS_WEAK && !isObject$2(key)
                ? undefined
                : nativeMethod.call(this, key === 0 ? 0 : key);
            }
          : KEY == "has"
          ? function has(key) {
              return IS_WEAK && !isObject$2(key)
                ? false
                : nativeMethod.call(this, key === 0 ? 0 : key);
            }
          : function set(key, value) {
              nativeMethod.call(this, key === 0 ? 0 : key, value);
              return this;
            }
      );
    };

    // eslint-disable-next-line max-len
    if (
      isForced_1(
        CONSTRUCTOR_NAME,
        typeof NativeConstructor != "function" ||
          !(
            IS_WEAK ||
            (NativePrototype.forEach &&
              !fails(function () {
                new NativeConstructor().entries().next();
              }))
          )
      )
    ) {
      // create collection constructor
      Constructor = common.getConstructor(
        wrapper,
        CONSTRUCTOR_NAME,
        IS_MAP,
        ADDER
      );
      internalMetadata.REQUIRED = true;
    } else if (isForced_1(CONSTRUCTOR_NAME, true)) {
      var instance = new Constructor();
      // early implementations not supports chaining
      var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
      // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
      var THROWS_ON_PRIMITIVES = fails(function () {
        instance.has(1);
      });
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      // eslint-disable-next-line no-new
      var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) {
        new NativeConstructor(iterable);
      });
      // for early implementations -0 and +0 not the same
      var BUGGY_ZERO =
        !IS_WEAK &&
        fails(function () {
          // V8 ~ Chromium 42- fails only with 5+ elements
          var $instance = new NativeConstructor();
          var index = 5;
          while (index--) $instance[ADDER](index, index);
          return !$instance.has(-0);
        });

      if (!ACCEPT_ITERABLES) {
        Constructor = wrapper(function (dummy, iterable) {
          anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
          var that = inheritIfRequired(
            new NativeConstructor(),
            dummy,
            Constructor
          );
          if (iterable != undefined)
            iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
          return that;
        });
        Constructor.prototype = NativePrototype;
        NativePrototype.constructor = Constructor;
      }

      if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
        fixMethod("delete");
        fixMethod("has");
        IS_MAP && fixMethod("get");
      }

      if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

      // weak collections should not contains .clear method
      if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
    }

    exported[CONSTRUCTOR_NAME] = Constructor;
    _export(
      { global: true, forced: Constructor != NativeConstructor },
      exported
    );

    setToStringTag(Constructor, CONSTRUCTOR_NAME);

    if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

    return Constructor;
  };

  var getWeakData = internalMetadata.getWeakData;

  var setInternalState$2 = internalState.set;
  var internalStateGetterFor = internalState.getterFor;
  var find$1 = arrayIteration.find;
  var findIndex = arrayIteration.findIndex;
  var id$1 = 0;

  // fallback for uncaught frozen keys
  var uncaughtFrozenStore = function (store) {
    return store.frozen || (store.frozen = new UncaughtFrozenStore());
  };

  var UncaughtFrozenStore = function () {
    this.entries = [];
  };

  var findUncaughtFrozen = function (store, key) {
    return find$1(store.entries, function (it) {
      return it[0] === key;
    });
  };

  UncaughtFrozenStore.prototype = {
    get: function (key) {
      var entry = findUncaughtFrozen(this, key);
      if (entry) return entry[1];
    },
    has: function (key) {
      return !!findUncaughtFrozen(this, key);
    },
    set: function (key, value) {
      var entry = findUncaughtFrozen(this, key);
      if (entry) entry[1] = value;
      else this.entries.push([key, value]);
    },
    delete: function (key) {
      var index = findIndex(this.entries, function (it) {
        return it[0] === key;
      });
      if (~index) this.entries.splice(index, 1);
      return !!~index;
    },
  };

  var collectionWeak = {
    getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
      var C = wrapper(function (that, iterable) {
        anInstance(that, C, CONSTRUCTOR_NAME);
        setInternalState$2(that, {
          type: CONSTRUCTOR_NAME,
          id: id$1++,
          frozen: undefined,
        });
        if (iterable != undefined)
          iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
      });

      var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

      var define = function (that, key, value) {
        var state = getInternalState(that);
        var data = getWeakData(anObject(key), true);
        if (data === true) uncaughtFrozenStore(state).set(key, value);
        else data[state.id] = value;
        return that;
      };

      redefineAll(C.prototype, {
        // 23.3.3.2 WeakMap.prototype.delete(key)
        // 23.4.3.3 WeakSet.prototype.delete(value)
        delete: function (key) {
          var state = getInternalState(this);
          if (!isObject$2(key)) return false;
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state)["delete"](key);
          return data && has(data, state.id) && delete data[state.id];
        },
        // 23.3.3.4 WeakMap.prototype.has(key)
        // 23.4.3.4 WeakSet.prototype.has(value)
        has: function has$1(key) {
          var state = getInternalState(this);
          if (!isObject$2(key)) return false;
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state).has(key);
          return data && has(data, state.id);
        },
      });

      redefineAll(
        C.prototype,
        IS_MAP
          ? {
              // 23.3.3.3 WeakMap.prototype.get(key)
              get: function get(key) {
                var state = getInternalState(this);
                if (isObject$2(key)) {
                  var data = getWeakData(key);
                  if (data === true) return uncaughtFrozenStore(state).get(key);
                  return data ? data[state.id] : undefined;
                }
              },
              // 23.3.3.5 WeakMap.prototype.set(key, value)
              set: function set(key, value) {
                return define(this, key, value);
              },
            }
          : {
              // 23.4.3.1 WeakSet.prototype.add(value)
              add: function add(value) {
                return define(this, value, true);
              },
            }
      );

      return C;
    },
  };

  var es_weakMap = createCommonjsModule$1(function (module) {
    var enforceIternalState = internalState.enforce;

    var IS_IE11 = !global_1.ActiveXObject && "ActiveXObject" in global_1;
    var isExtensible = Object.isExtensible;
    var InternalWeakMap;

    var wrapper = function (init) {
      return function WeakMap() {
        return init(this, arguments.length ? arguments[0] : undefined);
      };
    };

    // `WeakMap` constructor
    // https://tc39.es/ecma262/#sec-weakmap-constructor
    var $WeakMap = (module.exports = collection(
      "WeakMap",
      wrapper,
      collectionWeak
    ));

    // IE11 WeakMap frozen keys fix
    // We can't use feature detection because it crash some old IE builds
    // https://github.com/zloirock/core-js/issues/485
    if (nativeWeakMap && IS_IE11) {
      InternalWeakMap = collectionWeak.getConstructor(wrapper, "WeakMap", true);
      internalMetadata.REQUIRED = true;
      var WeakMapPrototype = $WeakMap.prototype;
      var nativeDelete = WeakMapPrototype["delete"];
      var nativeHas = WeakMapPrototype.has;
      var nativeGet = WeakMapPrototype.get;
      var nativeSet = WeakMapPrototype.set;
      redefineAll(WeakMapPrototype, {
        delete: function (key) {
          if (isObject$2(key) && !isExtensible(key)) {
            var state = enforceIternalState(this);
            if (!state.frozen) state.frozen = new InternalWeakMap();
            return nativeDelete.call(this, key) || state.frozen["delete"](key);
          }
          return nativeDelete.call(this, key);
        },
        has: function has(key) {
          if (isObject$2(key) && !isExtensible(key)) {
            var state = enforceIternalState(this);
            if (!state.frozen) state.frozen = new InternalWeakMap();
            return nativeHas.call(this, key) || state.frozen.has(key);
          }
          return nativeHas.call(this, key);
        },
        get: function get(key) {
          if (isObject$2(key) && !isExtensible(key)) {
            var state = enforceIternalState(this);
            if (!state.frozen) state.frozen = new InternalWeakMap();
            return nativeHas.call(this, key)
              ? nativeGet.call(this, key)
              : state.frozen.get(key);
          }
          return nativeGet.call(this, key);
        },
        set: function set(key, value) {
          if (isObject$2(key) && !isExtensible(key)) {
            var state = enforceIternalState(this);
            if (!state.frozen) state.frozen = new InternalWeakMap();
            nativeHas.call(this, key)
              ? nativeSet.call(this, key, value)
              : state.frozen.set(key, value);
          } else nativeSet.call(this, key, value);
          return this;
        },
      });
    }
  });

  var ITERATOR$5 = wellKnownSymbol("iterator");
  var TO_STRING_TAG$3 = wellKnownSymbol("toStringTag");
  var ArrayValues = es_array_iterator.values;

  for (var COLLECTION_NAME$1 in domIterables) {
    var Collection$1 = global_1[COLLECTION_NAME$1];
    var CollectionPrototype$1 = Collection$1 && Collection$1.prototype;
    if (CollectionPrototype$1) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype$1[ITERATOR$5] !== ArrayValues)
        try {
          createNonEnumerableProperty(
            CollectionPrototype$1,
            ITERATOR$5,
            ArrayValues
          );
        } catch (error) {
          CollectionPrototype$1[ITERATOR$5] = ArrayValues;
        }
      if (!CollectionPrototype$1[TO_STRING_TAG$3]) {
        createNonEnumerableProperty(
          CollectionPrototype$1,
          TO_STRING_TAG$3,
          COLLECTION_NAME$1
        );
      }
      if (domIterables[COLLECTION_NAME$1])
        for (var METHOD_NAME in es_array_iterator) {
          // some Chrome versions have non-configurable methods on DOMTokenList
          if (
            CollectionPrototype$1[METHOD_NAME] !==
            es_array_iterator[METHOD_NAME]
          )
            try {
              createNonEnumerableProperty(
                CollectionPrototype$1,
                METHOD_NAME,
                es_array_iterator[METHOD_NAME]
              );
            } catch (error) {
              CollectionPrototype$1[METHOD_NAME] =
                es_array_iterator[METHOD_NAME];
            }
        }
    }
  }

  /**
   * lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="npm" -o ./`
   * Copyright jQuery Foundation and other contributors <https://jquery.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   */

  /** Used as the `TypeError` message for "Functions" methods. */
  var FUNC_ERROR_TEXT = "Expected a function";

  /** Used as references for various `Number` constants. */
  var NAN = 0 / 0;

  /** `Object#toString` result references. */
  var symbolTag = "[object Symbol]";

  /** Used to match leading and trailing whitespace. */
  var reTrim = /^\s+|\s+$/g;

  /** Used to detect bad signed hexadecimal string values. */
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

  /** Used to detect binary string values. */
  var reIsBinary = /^0b[01]+$/i;

  /** Used to detect octal string values. */
  var reIsOctal = /^0o[0-7]+$/i;

  /** Built-in method references without a dependency on `root`. */
  var freeParseInt = parseInt;

  /** Detect free variable `global` from Node.js. */
  var freeGlobal =
    typeof commonjsGlobal$1 == "object" &&
    commonjsGlobal$1 &&
    commonjsGlobal$1.Object === Object &&
    commonjsGlobal$1;

  /** Detect free variable `self`. */
  var freeSelf =
    typeof self == "object" && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = freeGlobal || freeSelf || Function("return this")();

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var objectToString$1 = objectProto.toString;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax = Math.max,
    nativeMin = Math.min;

  /**
   * Gets the timestamp of the number of milliseconds that have elapsed since
   * the Unix epoch (1 January 1970 00:00:00 UTC).
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Date
   * @returns {number} Returns the timestamp.
   * @example
   *
   * _.defer(function(stamp) {
   *   console.log(_.now() - stamp);
   * }, _.now());
   * // => Logs the number of milliseconds it took for the deferred invocation.
   */
  var now$1 = function () {
    return root.Date.now();
  };

  /**
   * Creates a debounced function that delays invoking `func` until after `wait`
   * milliseconds have elapsed since the last time the debounced function was
   * invoked. The debounced function comes with a `cancel` method to cancel
   * delayed `func` invocations and a `flush` method to immediately invoke them.
   * Provide `options` to indicate whether `func` should be invoked on the
   * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
   * with the last arguments provided to the debounced function. Subsequent
   * calls to the debounced function return the result of the last `func`
   * invocation.
   *
   * **Note:** If `leading` and `trailing` options are `true`, `func` is
   * invoked on the trailing edge of the timeout only if the debounced function
   * is invoked more than once during the `wait` timeout.
   *
   * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
   * until to the next tick, similar to `setTimeout` with a timeout of `0`.
   *
   * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
   * for details over the differences between `_.debounce` and `_.throttle`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to debounce.
   * @param {number} [wait=0] The number of milliseconds to delay.
   * @param {Object} [options={}] The options object.
   * @param {boolean} [options.leading=false]
   *  Specify invoking on the leading edge of the timeout.
   * @param {number} [options.maxWait]
   *  The maximum time `func` is allowed to be delayed before it's invoked.
   * @param {boolean} [options.trailing=true]
   *  Specify invoking on the trailing edge of the timeout.
   * @returns {Function} Returns the new debounced function.
   * @example
   *
   * // Avoid costly calculations while the window size is in flux.
   * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
   *
   * // Invoke `sendMail` when clicked, debouncing subsequent calls.
   * jQuery(element).on('click', _.debounce(sendMail, 300, {
   *   'leading': true,
   *   'trailing': false
   * }));
   *
   * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
   * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
   * var source = new EventSource('/stream');
   * jQuery(source).on('message', debounced);
   *
   * // Cancel the trailing debounced invocation.
   * jQuery(window).on('popstate', debounced.cancel);
   */
  function debounce(func, wait, options) {
    var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

    if (typeof func != "function") {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    wait = toNumber(wait) || 0;
    if (isObject$3(options)) {
      leading = !!options.leading;
      maxing = "maxWait" in options;
      maxWait = maxing
        ? nativeMax(toNumber(options.maxWait) || 0, wait)
        : maxWait;
      trailing = "trailing" in options ? !!options.trailing : trailing;
    }

    function invokeFunc(time) {
      var args = lastArgs,
        thisArg = lastThis;

      lastArgs = lastThis = undefined;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    }

    function leadingEdge(time) {
      // Reset any `maxWait` timer.
      lastInvokeTime = time;
      // Start the timer for the trailing edge.
      timerId = setTimeout(timerExpired, wait);
      // Invoke the leading edge.
      return leading ? invokeFunc(time) : result;
    }

    function remainingWait(time) {
      var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

      return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
    }

    function shouldInvoke(time) {
      var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

      // Either this is the first call, activity has stopped and we're at the
      // trailing edge, the system time has gone backwards and we're treating
      // it as the trailing edge, or we've hit the `maxWait` limit.
      return (
        lastCallTime === undefined ||
        timeSinceLastCall >= wait ||
        timeSinceLastCall < 0 ||
        (maxing && timeSinceLastInvoke >= maxWait)
      );
    }

    function timerExpired() {
      var time = now$1();
      if (shouldInvoke(time)) {
        return trailingEdge(time);
      }
      // Restart the timer.
      timerId = setTimeout(timerExpired, remainingWait(time));
    }

    function trailingEdge(time) {
      timerId = undefined;

      // Only invoke if we have `lastArgs` which means `func` has been
      // debounced at least once.
      if (trailing && lastArgs) {
        return invokeFunc(time);
      }
      lastArgs = lastThis = undefined;
      return result;
    }

    function cancel() {
      if (timerId !== undefined) {
        clearTimeout(timerId);
      }
      lastInvokeTime = 0;
      lastArgs = lastCallTime = lastThis = timerId = undefined;
    }

    function flush() {
      return timerId === undefined ? result : trailingEdge(now$1());
    }

    function debounced() {
      var time = now$1(),
        isInvoking = shouldInvoke(time);

      lastArgs = arguments;
      lastThis = this;
      lastCallTime = time;

      if (isInvoking) {
        if (timerId === undefined) {
          return leadingEdge(lastCallTime);
        }
        if (maxing) {
          // Handle invocations in a tight loop.
          timerId = setTimeout(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }
      if (timerId === undefined) {
        timerId = setTimeout(timerExpired, wait);
      }
      return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
  }

  /**
   * Creates a throttled function that only invokes `func` at most once per
   * every `wait` milliseconds. The throttled function comes with a `cancel`
   * method to cancel delayed `func` invocations and a `flush` method to
   * immediately invoke them. Provide `options` to indicate whether `func`
   * should be invoked on the leading and/or trailing edge of the `wait`
   * timeout. The `func` is invoked with the last arguments provided to the
   * throttled function. Subsequent calls to the throttled function return the
   * result of the last `func` invocation.
   *
   * **Note:** If `leading` and `trailing` options are `true`, `func` is
   * invoked on the trailing edge of the timeout only if the throttled function
   * is invoked more than once during the `wait` timeout.
   *
   * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
   * until to the next tick, similar to `setTimeout` with a timeout of `0`.
   *
   * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
   * for details over the differences between `_.throttle` and `_.debounce`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to throttle.
   * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
   * @param {Object} [options={}] The options object.
   * @param {boolean} [options.leading=true]
   *  Specify invoking on the leading edge of the timeout.
   * @param {boolean} [options.trailing=true]
   *  Specify invoking on the trailing edge of the timeout.
   * @returns {Function} Returns the new throttled function.
   * @example
   *
   * // Avoid excessively updating the position while scrolling.
   * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
   *
   * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
   * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
   * jQuery(element).on('click', throttled);
   *
   * // Cancel the trailing throttled invocation.
   * jQuery(window).on('popstate', throttled.cancel);
   */
  function throttle(func, wait, options) {
    var leading = true,
      trailing = true;

    if (typeof func != "function") {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    if (isObject$3(options)) {
      leading = "leading" in options ? !!options.leading : leading;
      trailing = "trailing" in options ? !!options.trailing : trailing;
    }
    return debounce(func, wait, {
      leading: leading,
      maxWait: wait,
      trailing: trailing,
    });
  }

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject$3(value) {
    var type = typeof value;
    return !!value && (type == "object" || type == "function");
  }

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return !!value && typeof value == "object";
  }

  /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */
  function isSymbol(value) {
    return (
      typeof value == "symbol" ||
      (isObjectLike(value) && objectToString$1.call(value) == symbolTag)
    );
  }

  /**
   * Converts `value` to a number.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to process.
   * @returns {number} Returns the number.
   * @example
   *
   * _.toNumber(3.2);
   * // => 3.2
   *
   * _.toNumber(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toNumber(Infinity);
   * // => Infinity
   *
   * _.toNumber('3.2');
   * // => 3.2
   */
  function toNumber(value) {
    if (typeof value == "number") {
      return value;
    }
    if (isSymbol(value)) {
      return NAN;
    }
    if (isObject$3(value)) {
      var other = typeof value.valueOf == "function" ? value.valueOf() : value;
      value = isObject$3(other) ? other + "" : other;
    }
    if (typeof value != "string") {
      return value === 0 ? value : +value;
    }
    value = value.replace(reTrim, "");
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value)
      ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
      : reIsBadHex.test(value)
      ? NAN
      : +value;
  }

  var lodash_throttle = throttle;

  /**
   * lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="npm" -o ./`
   * Copyright jQuery Foundation and other contributors <https://jquery.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   */

  /** Used as the `TypeError` message for "Functions" methods. */
  var FUNC_ERROR_TEXT$1 = "Expected a function";

  /** Used as references for various `Number` constants. */
  var NAN$1 = 0 / 0;

  /** `Object#toString` result references. */
  var symbolTag$1 = "[object Symbol]";

  /** Used to match leading and trailing whitespace. */
  var reTrim$1 = /^\s+|\s+$/g;

  /** Used to detect bad signed hexadecimal string values. */
  var reIsBadHex$1 = /^[-+]0x[0-9a-f]+$/i;

  /** Used to detect binary string values. */
  var reIsBinary$1 = /^0b[01]+$/i;

  /** Used to detect octal string values. */
  var reIsOctal$1 = /^0o[0-7]+$/i;

  /** Built-in method references without a dependency on `root`. */
  var freeParseInt$1 = parseInt;

  /** Detect free variable `global` from Node.js. */
  var freeGlobal$1 =
    typeof commonjsGlobal$1 == "object" &&
    commonjsGlobal$1 &&
    commonjsGlobal$1.Object === Object &&
    commonjsGlobal$1;

  /** Detect free variable `self`. */
  var freeSelf$1 =
    typeof self == "object" && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root$1 = freeGlobal$1 || freeSelf$1 || Function("return this")();

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var objectToString$2 = objectProto$1.toString;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax$1 = Math.max,
    nativeMin$1 = Math.min;

  /**
   * Gets the timestamp of the number of milliseconds that have elapsed since
   * the Unix epoch (1 January 1970 00:00:00 UTC).
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Date
   * @returns {number} Returns the timestamp.
   * @example
   *
   * _.defer(function(stamp) {
   *   console.log(_.now() - stamp);
   * }, _.now());
   * // => Logs the number of milliseconds it took for the deferred invocation.
   */
  var now$2 = function () {
    return root$1.Date.now();
  };

  /**
   * Creates a debounced function that delays invoking `func` until after `wait`
   * milliseconds have elapsed since the last time the debounced function was
   * invoked. The debounced function comes with a `cancel` method to cancel
   * delayed `func` invocations and a `flush` method to immediately invoke them.
   * Provide `options` to indicate whether `func` should be invoked on the
   * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
   * with the last arguments provided to the debounced function. Subsequent
   * calls to the debounced function return the result of the last `func`
   * invocation.
   *
   * **Note:** If `leading` and `trailing` options are `true`, `func` is
   * invoked on the trailing edge of the timeout only if the debounced function
   * is invoked more than once during the `wait` timeout.
   *
   * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
   * until to the next tick, similar to `setTimeout` with a timeout of `0`.
   *
   * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
   * for details over the differences between `_.debounce` and `_.throttle`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to debounce.
   * @param {number} [wait=0] The number of milliseconds to delay.
   * @param {Object} [options={}] The options object.
   * @param {boolean} [options.leading=false]
   *  Specify invoking on the leading edge of the timeout.
   * @param {number} [options.maxWait]
   *  The maximum time `func` is allowed to be delayed before it's invoked.
   * @param {boolean} [options.trailing=true]
   *  Specify invoking on the trailing edge of the timeout.
   * @returns {Function} Returns the new debounced function.
   * @example
   *
   * // Avoid costly calculations while the window size is in flux.
   * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
   *
   * // Invoke `sendMail` when clicked, debouncing subsequent calls.
   * jQuery(element).on('click', _.debounce(sendMail, 300, {
   *   'leading': true,
   *   'trailing': false
   * }));
   *
   * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
   * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
   * var source = new EventSource('/stream');
   * jQuery(source).on('message', debounced);
   *
   * // Cancel the trailing debounced invocation.
   * jQuery(window).on('popstate', debounced.cancel);
   */
  function debounce$1(func, wait, options) {
    var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

    if (typeof func != "function") {
      throw new TypeError(FUNC_ERROR_TEXT$1);
    }
    wait = toNumber$1(wait) || 0;
    if (isObject$4(options)) {
      leading = !!options.leading;
      maxing = "maxWait" in options;
      maxWait = maxing
        ? nativeMax$1(toNumber$1(options.maxWait) || 0, wait)
        : maxWait;
      trailing = "trailing" in options ? !!options.trailing : trailing;
    }

    function invokeFunc(time) {
      var args = lastArgs,
        thisArg = lastThis;

      lastArgs = lastThis = undefined;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    }

    function leadingEdge(time) {
      // Reset any `maxWait` timer.
      lastInvokeTime = time;
      // Start the timer for the trailing edge.
      timerId = setTimeout(timerExpired, wait);
      // Invoke the leading edge.
      return leading ? invokeFunc(time) : result;
    }

    function remainingWait(time) {
      var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

      return maxing
        ? nativeMin$1(result, maxWait - timeSinceLastInvoke)
        : result;
    }

    function shouldInvoke(time) {
      var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

      // Either this is the first call, activity has stopped and we're at the
      // trailing edge, the system time has gone backwards and we're treating
      // it as the trailing edge, or we've hit the `maxWait` limit.
      return (
        lastCallTime === undefined ||
        timeSinceLastCall >= wait ||
        timeSinceLastCall < 0 ||
        (maxing && timeSinceLastInvoke >= maxWait)
      );
    }

    function timerExpired() {
      var time = now$2();
      if (shouldInvoke(time)) {
        return trailingEdge(time);
      }
      // Restart the timer.
      timerId = setTimeout(timerExpired, remainingWait(time));
    }

    function trailingEdge(time) {
      timerId = undefined;

      // Only invoke if we have `lastArgs` which means `func` has been
      // debounced at least once.
      if (trailing && lastArgs) {
        return invokeFunc(time);
      }
      lastArgs = lastThis = undefined;
      return result;
    }

    function cancel() {
      if (timerId !== undefined) {
        clearTimeout(timerId);
      }
      lastInvokeTime = 0;
      lastArgs = lastCallTime = lastThis = timerId = undefined;
    }

    function flush() {
      return timerId === undefined ? result : trailingEdge(now$2());
    }

    function debounced() {
      var time = now$2(),
        isInvoking = shouldInvoke(time);

      lastArgs = arguments;
      lastThis = this;
      lastCallTime = time;

      if (isInvoking) {
        if (timerId === undefined) {
          return leadingEdge(lastCallTime);
        }
        if (maxing) {
          // Handle invocations in a tight loop.
          timerId = setTimeout(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }
      if (timerId === undefined) {
        timerId = setTimeout(timerExpired, wait);
      }
      return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
  }

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject$4(value) {
    var type = typeof value;
    return !!value && (type == "object" || type == "function");
  }

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike$1(value) {
    return !!value && typeof value == "object";
  }

  /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */
  function isSymbol$1(value) {
    return (
      typeof value == "symbol" ||
      (isObjectLike$1(value) && objectToString$2.call(value) == symbolTag$1)
    );
  }

  /**
   * Converts `value` to a number.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to process.
   * @returns {number} Returns the number.
   * @example
   *
   * _.toNumber(3.2);
   * // => 3.2
   *
   * _.toNumber(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toNumber(Infinity);
   * // => Infinity
   *
   * _.toNumber('3.2');
   * // => 3.2
   */
  function toNumber$1(value) {
    if (typeof value == "number") {
      return value;
    }
    if (isSymbol$1(value)) {
      return NAN$1;
    }
    if (isObject$4(value)) {
      var other = typeof value.valueOf == "function" ? value.valueOf() : value;
      value = isObject$4(other) ? other + "" : other;
    }
    if (typeof value != "string") {
      return value === 0 ? value : +value;
    }
    value = value.replace(reTrim$1, "");
    var isBinary = reIsBinary$1.test(value);
    return isBinary || reIsOctal$1.test(value)
      ? freeParseInt$1(value.slice(2), isBinary ? 2 : 8)
      : reIsBadHex$1.test(value)
      ? NAN$1
      : +value;
  }

  var lodash_debounce = debounce$1;

  /**
   * lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="npm" -o ./`
   * Copyright jQuery Foundation and other contributors <https://jquery.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   */

  /** Used as the `TypeError` message for "Functions" methods. */
  var FUNC_ERROR_TEXT$2 = "Expected a function";

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED = "__lodash_hash_undefined__";

  /** `Object#toString` result references. */
  var funcTag = "[object Function]",
    genTag = "[object GeneratorFunction]";

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

  /** Used to detect host constructors (Safari). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Detect free variable `global` from Node.js. */
  var freeGlobal$2 =
    typeof commonjsGlobal$1 == "object" &&
    commonjsGlobal$1 &&
    commonjsGlobal$1.Object === Object &&
    commonjsGlobal$1;

  /** Detect free variable `self`. */
  var freeSelf$2 =
    typeof self == "object" && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root$2 = freeGlobal$2 || freeSelf$2 || Function("return this")();

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  /**
   * Checks if `value` is a host object in IE < 9.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
   */
  function isHostObject(value) {
    // Many host objects are `Object` objects that can coerce to strings
    // despite having improperly defined `toString` methods.
    var result = false;
    if (value != null && typeof value.toString != "function") {
      try {
        result = !!(value + "");
      } catch (e) {}
    }
    return result;
  }

  /** Used for built-in method references. */
  var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto$2 = Object.prototype;

  /** Used to detect overreaching core-js shims. */
  var coreJsData = root$2["__core-js_shared__"];

  /** Used to detect methods masquerading as native. */
  var maskSrcKey = (function () {
    var uid = /[^.]+$/.exec(
      (coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO) || ""
    );
    return uid ? "Symbol(src)_1." + uid : "";
  })();

  /** Used to resolve the decompiled source of functions. */
  var funcToString = funcProto.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty$3 = objectProto$2.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var objectToString$3 = objectProto$2.toString;

  /** Used to detect if a method is native. */
  var reIsNative = RegExp(
    "^" +
      funcToString
        .call(hasOwnProperty$3)
        .replace(reRegExpChar, "\\$&")
        .replace(
          /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
          "$1.*?"
        ) +
      "$"
  );

  /** Built-in value references. */
  var splice = arrayProto.splice;

  /* Built-in method references that are verified to be native. */
  var Map$1 = getNative(root$2, "Map"),
    nativeCreate = getNative(Object, "create");

  /**
   * Creates a hash object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Hash(entries) {
    var index = -1,
      length = entries ? entries.length : 0;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  /**
   * Removes all key-value entries from the hash.
   *
   * @private
   * @name clear
   * @memberOf Hash
   */
  function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
  }

  /**
   * Removes `key` and its value from the hash.
   *
   * @private
   * @name delete
   * @memberOf Hash
   * @param {Object} hash The hash to modify.
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function hashDelete(key) {
    return this.has(key) && delete this.__data__[key];
  }

  /**
   * Gets the hash value for `key`.
   *
   * @private
   * @name get
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? undefined : result;
    }
    return hasOwnProperty$3.call(data, key) ? data[key] : undefined;
  }

  /**
   * Checks if a hash value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate
      ? data[key] !== undefined
      : hasOwnProperty$3.call(data, key);
  }

  /**
   * Sets the hash `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Hash
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the hash instance.
   */
  function hashSet(key, value) {
    var data = this.__data__;
    data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
    return this;
  }

  // Add methods to `Hash`.
  Hash.prototype.clear = hashClear;
  Hash.prototype["delete"] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;

  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function ListCache(entries) {
    var index = -1,
      length = entries ? entries.length : 0;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  /**
   * Removes all key-value entries from the list cache.
   *
   * @private
   * @name clear
   * @memberOf ListCache
   */
  function listCacheClear() {
    this.__data__ = [];
  }

  /**
   * Removes `key` and its value from the list cache.
   *
   * @private
   * @name delete
   * @memberOf ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function listCacheDelete(key) {
    var data = this.__data__,
      index = assocIndexOf(data, key);

    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    return true;
  }

  /**
   * Gets the list cache value for `key`.
   *
   * @private
   * @name get
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function listCacheGet(key) {
    var data = this.__data__,
      index = assocIndexOf(data, key);

    return index < 0 ? undefined : data[index][1];
  }

  /**
   * Checks if a list cache value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }

  /**
   * Sets the list cache `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf ListCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the list cache instance.
   */
  function listCacheSet(key, value) {
    var data = this.__data__,
      index = assocIndexOf(data, key);

    if (index < 0) {
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }

  // Add methods to `ListCache`.
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype["delete"] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;

  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function MapCache(entries) {
    var index = -1,
      length = entries ? entries.length : 0;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  /**
   * Removes all key-value entries from the map.
   *
   * @private
   * @name clear
   * @memberOf MapCache
   */
  function mapCacheClear() {
    this.__data__ = {
      hash: new Hash(),
      map: new (Map$1 || ListCache)(),
      string: new Hash(),
    };
  }

  /**
   * Removes `key` and its value from the map.
   *
   * @private
   * @name delete
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function mapCacheDelete(key) {
    return getMapData(this, key)["delete"](key);
  }

  /**
   * Gets the map value for `key`.
   *
   * @private
   * @name get
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }

  /**
   * Checks if a map value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }

  /**
   * Sets the map `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf MapCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the map cache instance.
   */
  function mapCacheSet(key, value) {
    getMapData(this, key).set(key, value);
    return this;
  }

  // Add methods to `MapCache`.
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype["delete"] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;

  /**
   * Gets the index at which the `key` is found in `array` of key-value pairs.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} key The key to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq$1(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }

  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */
  function baseIsNative(value) {
    if (!isObject$5(value) || isMasked(value)) {
      return false;
    }
    var pattern =
      isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }

  /**
   * Gets the data for `map`.
   *
   * @private
   * @param {Object} map The map to query.
   * @param {string} key The reference key.
   * @returns {*} Returns the map data.
   */
  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key)
      ? data[typeof key == "string" ? "string" : "hash"]
      : data.map;
  }

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */
  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : undefined;
  }

  /**
   * Checks if `value` is suitable for use as unique object key.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
   */
  function isKeyable(value) {
    var type = typeof value;
    return type == "string" ||
      type == "number" ||
      type == "symbol" ||
      type == "boolean"
      ? value !== "__proto__"
      : value === null;
  }

  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */
  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }

  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to process.
   * @returns {string} Returns the source code.
   */
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {}
      try {
        return func + "";
      } catch (e) {}
    }
    return "";
  }

  /**
   * Creates a function that memoizes the result of `func`. If `resolver` is
   * provided, it determines the cache key for storing the result based on the
   * arguments provided to the memoized function. By default, the first argument
   * provided to the memoized function is used as the map cache key. The `func`
   * is invoked with the `this` binding of the memoized function.
   *
   * **Note:** The cache is exposed as the `cache` property on the memoized
   * function. Its creation may be customized by replacing the `_.memoize.Cache`
   * constructor with one whose instances implement the
   * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
   * method interface of `delete`, `get`, `has`, and `set`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to have its output memoized.
   * @param {Function} [resolver] The function to resolve the cache key.
   * @returns {Function} Returns the new memoized function.
   * @example
   *
   * var object = { 'a': 1, 'b': 2 };
   * var other = { 'c': 3, 'd': 4 };
   *
   * var values = _.memoize(_.values);
   * values(object);
   * // => [1, 2]
   *
   * values(other);
   * // => [3, 4]
   *
   * object.a = 2;
   * values(object);
   * // => [1, 2]
   *
   * // Modify the result cache.
   * values.cache.set(object, ['a', 'b']);
   * values(object);
   * // => ['a', 'b']
   *
   * // Replace `_.memoize.Cache`.
   * _.memoize.Cache = WeakMap;
   */
  function memoize(func, resolver) {
    if (
      typeof func != "function" ||
      (resolver && typeof resolver != "function")
    ) {
      throw new TypeError(FUNC_ERROR_TEXT$2);
    }
    var memoized = function () {
      var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

      if (cache.has(key)) {
        return cache.get(key);
      }
      var result = func.apply(this, args);
      memoized.cache = cache.set(key, result);
      return result;
    };
    memoized.cache = new (memoize.Cache || MapCache)();
    return memoized;
  }

  // Assign cache to `_.memoize`.
  memoize.Cache = MapCache;

  /**
   * Performs a
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * comparison between two values to determine if they are equivalent.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.eq(object, object);
   * // => true
   *
   * _.eq(object, other);
   * // => false
   *
   * _.eq('a', 'a');
   * // => true
   *
   * _.eq('a', Object('a'));
   * // => false
   *
   * _.eq(NaN, NaN);
   * // => true
   */
  function eq$1(value, other) {
    return value === other || (value !== value && other !== other);
  }

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  function isFunction(value) {
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 8-9 which returns 'object' for typed array and other constructors.
    var tag = isObject$5(value) ? objectToString$3.call(value) : "";
    return tag == funcTag || tag == genTag;
  }

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject$5(value) {
    var type = typeof value;
    return !!value && (type == "object" || type == "function");
  }

  var lodash_memoize = memoize;

  /**
   * A collection of shims that provide minimal functionality of the ES6 collections.
   *
   * These implementations are not meant to be used outside of the ResizeObserver
   * modules as they cover only a limited range of use cases.
   */
  /* eslint-disable require-jsdoc, valid-jsdoc */
  var MapShim = (function () {
    if (typeof Map !== "undefined") {
      return Map;
    }
    /**
     * Returns index in provided array that matches the specified key.
     *
     * @param {Array<Array>} arr
     * @param {*} key
     * @returns {number}
     */
    function getIndex(arr, key) {
      var result = -1;
      arr.some(function (entry, index) {
        if (entry[0] === key) {
          result = index;
          return true;
        }
        return false;
      });
      return result;
    }
    return /** @class */ (function () {
      function class_1() {
        this.__entries__ = [];
      }
      Object.defineProperty(class_1.prototype, "size", {
        /**
         * @returns {boolean}
         */
        get: function () {
          return this.__entries__.length;
        },
        enumerable: true,
        configurable: true,
      });
      /**
       * @param {*} key
       * @returns {*}
       */
      class_1.prototype.get = function (key) {
        var index = getIndex(this.__entries__, key);
        var entry = this.__entries__[index];
        return entry && entry[1];
      };
      /**
       * @param {*} key
       * @param {*} value
       * @returns {void}
       */
      class_1.prototype.set = function (key, value) {
        var index = getIndex(this.__entries__, key);
        if (~index) {
          this.__entries__[index][1] = value;
        } else {
          this.__entries__.push([key, value]);
        }
      };
      /**
       * @param {*} key
       * @returns {void}
       */
      class_1.prototype.delete = function (key) {
        var entries = this.__entries__;
        var index = getIndex(entries, key);
        if (~index) {
          entries.splice(index, 1);
        }
      };
      /**
       * @param {*} key
       * @returns {void}
       */
      class_1.prototype.has = function (key) {
        return !!~getIndex(this.__entries__, key);
      };
      /**
       * @returns {void}
       */
      class_1.prototype.clear = function () {
        this.__entries__.splice(0);
      };
      /**
       * @param {Function} callback
       * @param {*} [ctx=null]
       * @returns {void}
       */
      class_1.prototype.forEach = function (callback, ctx) {
        if (ctx === void 0) {
          ctx = null;
        }
        for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
          var entry = _a[_i];
          callback.call(ctx, entry[1], entry[0]);
        }
      };
      return class_1;
    })();
  })();

  /**
   * Detects whether window and document objects are available in current environment.
   */
  var isBrowser =
    typeof window !== "undefined" &&
    typeof document !== "undefined" &&
    window.document === document;

  // Returns global object of a current environment.
  var global$1 = (function () {
    if (typeof global !== "undefined" && global.Math === Math) {
      return global;
    }
    if (typeof self !== "undefined" && self.Math === Math) {
      return self;
    }
    if (typeof window !== "undefined" && window.Math === Math) {
      return window;
    }
    // eslint-disable-next-line no-new-func
    return Function("return this")();
  })();

  /**
   * A shim for the requestAnimationFrame which falls back to the setTimeout if
   * first one is not supported.
   *
   * @returns {number} Requests' identifier.
   */
  var requestAnimationFrame$1 = (function () {
    if (typeof requestAnimationFrame === "function") {
      // It's required to use a bounded function because IE sometimes throws
      // an "Invalid calling object" error if rAF is invoked without the global
      // object on the left hand side.
      return requestAnimationFrame.bind(global$1);
    }
    return function (callback) {
      return setTimeout(function () {
        return callback(Date.now());
      }, 1000 / 60);
    };
  })();

  // Defines minimum timeout before adding a trailing call.
  var trailingTimeout = 2;
  /**
   * Creates a wrapper function which ensures that provided callback will be
   * invoked only once during the specified delay period.
   *
   * @param {Function} callback - Function to be invoked after the delay period.
   * @param {number} delay - Delay after which to invoke callback.
   * @returns {Function}
   */
  function throttle$1(callback, delay) {
    var leadingCall = false,
      trailingCall = false,
      lastCallTime = 0;
    /**
     * Invokes the original callback function and schedules new invocation if
     * the "proxy" was called during current request.
     *
     * @returns {void}
     */
    function resolvePending() {
      if (leadingCall) {
        leadingCall = false;
        callback();
      }
      if (trailingCall) {
        proxy();
      }
    }
    /**
     * Callback invoked after the specified delay. It will further postpone
     * invocation of the original function delegating it to the
     * requestAnimationFrame.
     *
     * @returns {void}
     */
    function timeoutCallback() {
      requestAnimationFrame$1(resolvePending);
    }
    /**
     * Schedules invocation of the original function.
     *
     * @returns {void}
     */
    function proxy() {
      var timeStamp = Date.now();
      if (leadingCall) {
        // Reject immediately following calls.
        if (timeStamp - lastCallTime < trailingTimeout) {
          return;
        }
        // Schedule new call to be in invoked when the pending one is resolved.
        // This is important for "transitions" which never actually start
        // immediately so there is a chance that we might miss one if change
        // happens amids the pending invocation.
        trailingCall = true;
      } else {
        leadingCall = true;
        trailingCall = false;
        setTimeout(timeoutCallback, delay);
      }
      lastCallTime = timeStamp;
    }
    return proxy;
  }

  // Minimum delay before invoking the update of observers.
  var REFRESH_DELAY = 20;
  // A list of substrings of CSS properties used to find transition events that
  // might affect dimensions of observed elements.
  var transitionKeys = [
    "top",
    "right",
    "bottom",
    "left",
    "width",
    "height",
    "size",
    "weight",
  ];
  // Check if MutationObserver is available.
  var mutationObserverSupported = typeof MutationObserver !== "undefined";
  /**
   * Singleton controller class which handles updates of ResizeObserver instances.
   */
  var ResizeObserverController = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserverController.
     *
     * @private
     */
    function ResizeObserverController() {
      /**
       * Indicates whether DOM listeners have been added.
       *
       * @private {boolean}
       */
      this.connected_ = false;
      /**
       * Tells that controller has subscribed for Mutation Events.
       *
       * @private {boolean}
       */
      this.mutationEventsAdded_ = false;
      /**
       * Keeps reference to the instance of MutationObserver.
       *
       * @private {MutationObserver}
       */
      this.mutationsObserver_ = null;
      /**
       * A list of connected observers.
       *
       * @private {Array<ResizeObserverSPI>}
       */
      this.observers_ = [];
      this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
      this.refresh = throttle$1(this.refresh.bind(this), REFRESH_DELAY);
    }
    /**
     * Adds observer to observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be added.
     * @returns {void}
     */
    ResizeObserverController.prototype.addObserver = function (observer) {
      if (!~this.observers_.indexOf(observer)) {
        this.observers_.push(observer);
      }
      // Add listeners if they haven't been added yet.
      if (!this.connected_) {
        this.connect_();
      }
    };
    /**
     * Removes observer from observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be removed.
     * @returns {void}
     */
    ResizeObserverController.prototype.removeObserver = function (observer) {
      var observers = this.observers_;
      var index = observers.indexOf(observer);
      // Remove observer if it's present in registry.
      if (~index) {
        observers.splice(index, 1);
      }
      // Remove listeners if controller has no connected observers.
      if (!observers.length && this.connected_) {
        this.disconnect_();
      }
    };
    /**
     * Invokes the update of observers. It will continue running updates insofar
     * it detects changes.
     *
     * @returns {void}
     */
    ResizeObserverController.prototype.refresh = function () {
      var changesDetected = this.updateObservers_();
      // Continue running updates if changes have been detected as there might
      // be future ones caused by CSS transitions.
      if (changesDetected) {
        this.refresh();
      }
    };
    /**
     * Updates every observer from observers list and notifies them of queued
     * entries.
     *
     * @private
     * @returns {boolean} Returns "true" if any observer has detected changes in
     *      dimensions of it's elements.
     */
    ResizeObserverController.prototype.updateObservers_ = function () {
      // Collect observers that have active observations.
      var activeObservers = this.observers_.filter(function (observer) {
        return observer.gatherActive(), observer.hasActive();
      });
      // Deliver notifications in a separate cycle in order to avoid any
      // collisions between observers, e.g. when multiple instances of
      // ResizeObserver are tracking the same element and the callback of one
      // of them changes content dimensions of the observed target. Sometimes
      // this may result in notifications being blocked for the rest of observers.
      activeObservers.forEach(function (observer) {
        return observer.broadcastActive();
      });
      return activeObservers.length > 0;
    };
    /**
     * Initializes DOM listeners.
     *
     * @private
     * @returns {void}
     */
    ResizeObserverController.prototype.connect_ = function () {
      // Do nothing if running in a non-browser environment or if listeners
      // have been already added.
      if (!isBrowser || this.connected_) {
        return;
      }
      // Subscription to the "Transitionend" event is used as a workaround for
      // delayed transitions. This way it's possible to capture at least the
      // final state of an element.
      document.addEventListener("transitionend", this.onTransitionEnd_);
      window.addEventListener("resize", this.refresh);
      if (mutationObserverSupported) {
        this.mutationsObserver_ = new MutationObserver(this.refresh);
        this.mutationsObserver_.observe(document, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true,
        });
      } else {
        document.addEventListener("DOMSubtreeModified", this.refresh);
        this.mutationEventsAdded_ = true;
      }
      this.connected_ = true;
    };
    /**
     * Removes DOM listeners.
     *
     * @private
     * @returns {void}
     */
    ResizeObserverController.prototype.disconnect_ = function () {
      // Do nothing if running in a non-browser environment or if listeners
      // have been already removed.
      if (!isBrowser || !this.connected_) {
        return;
      }
      document.removeEventListener("transitionend", this.onTransitionEnd_);
      window.removeEventListener("resize", this.refresh);
      if (this.mutationsObserver_) {
        this.mutationsObserver_.disconnect();
      }
      if (this.mutationEventsAdded_) {
        document.removeEventListener("DOMSubtreeModified", this.refresh);
      }
      this.mutationsObserver_ = null;
      this.mutationEventsAdded_ = false;
      this.connected_ = false;
    };
    /**
     * "Transitionend" event handler.
     *
     * @private
     * @param {TransitionEvent} event
     * @returns {void}
     */
    ResizeObserverController.prototype.onTransitionEnd_ = function (_a) {
      var _b = _a.propertyName,
        propertyName = _b === void 0 ? "" : _b;
      // Detect whether transition may affect dimensions of an element.
      var isReflowProperty = transitionKeys.some(function (key) {
        return !!~propertyName.indexOf(key);
      });
      if (isReflowProperty) {
        this.refresh();
      }
    };
    /**
     * Returns instance of the ResizeObserverController.
     *
     * @returns {ResizeObserverController}
     */
    ResizeObserverController.getInstance = function () {
      if (!this.instance_) {
        this.instance_ = new ResizeObserverController();
      }
      return this.instance_;
    };
    /**
     * Holds reference to the controller's instance.
     *
     * @private {ResizeObserverController}
     */
    ResizeObserverController.instance_ = null;
    return ResizeObserverController;
  })();

  /**
   * Defines non-writable/enumerable properties of the provided target object.
   *
   * @param {Object} target - Object for which to define properties.
   * @param {Object} props - Properties to be defined.
   * @returns {Object} Target object.
   */
  var defineConfigurable = function (target, props) {
    for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
      var key = _a[_i];
      Object.defineProperty(target, key, {
        value: props[key],
        enumerable: false,
        writable: false,
        configurable: true,
      });
    }
    return target;
  };

  /**
   * Returns the global object associated with provided element.
   *
   * @param {Object} target
   * @returns {Object}
   */
  var getWindowOf = function (target) {
    // Assume that the element is an instance of Node, which means that it
    // has the "ownerDocument" property from which we can retrieve a
    // corresponding global object.
    var ownerGlobal =
      target && target.ownerDocument && target.ownerDocument.defaultView;
    // Return the local global object if it's not possible extract one from
    // provided element.
    return ownerGlobal || global$1;
  };

  // Placeholder of an empty content rectangle.
  var emptyRect = createRectInit(0, 0, 0, 0);
  /**
   * Converts provided string to a number.
   *
   * @param {number|string} value
   * @returns {number}
   */
  function toFloat(value) {
    return parseFloat(value) || 0;
  }
  /**
   * Extracts borders size from provided styles.
   *
   * @param {CSSStyleDeclaration} styles
   * @param {...string} positions - Borders positions (top, right, ...)
   * @returns {number}
   */
  function getBordersSize(styles) {
    var positions = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      positions[_i - 1] = arguments[_i];
    }
    return positions.reduce(function (size, position) {
      var value = styles["border-" + position + "-width"];
      return size + toFloat(value);
    }, 0);
  }
  /**
   * Extracts paddings sizes from provided styles.
   *
   * @param {CSSStyleDeclaration} styles
   * @returns {Object} Paddings box.
   */
  function getPaddings(styles) {
    var positions = ["top", "right", "bottom", "left"];
    var paddings = {};
    for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
      var position = positions_1[_i];
      var value = styles["padding-" + position];
      paddings[position] = toFloat(value);
    }
    return paddings;
  }
  /**
   * Calculates content rectangle of provided SVG element.
   *
   * @param {SVGGraphicsElement} target - Element content rectangle of which needs
   *      to be calculated.
   * @returns {DOMRectInit}
   */
  function getSVGContentRect(target) {
    var bbox = target.getBBox();
    return createRectInit(0, 0, bbox.width, bbox.height);
  }
  /**
   * Calculates content rectangle of provided HTMLElement.
   *
   * @param {HTMLElement} target - Element for which to calculate the content rectangle.
   * @returns {DOMRectInit}
   */
  function getHTMLElementContentRect(target) {
    // Client width & height properties can't be
    // used exclusively as they provide rounded values.
    var clientWidth = target.clientWidth,
      clientHeight = target.clientHeight;
    // By this condition we can catch all non-replaced inline, hidden and
    // detached elements. Though elements with width & height properties less
    // than 0.5 will be discarded as well.
    //
    // Without it we would need to implement separate methods for each of
    // those cases and it's not possible to perform a precise and performance
    // effective test for hidden elements. E.g. even jQuery's ':visible' filter
    // gives wrong results for elements with width & height less than 0.5.
    if (!clientWidth && !clientHeight) {
      return emptyRect;
    }
    var styles = getWindowOf(target).getComputedStyle(target);
    var paddings = getPaddings(styles);
    var horizPad = paddings.left + paddings.right;
    var vertPad = paddings.top + paddings.bottom;
    // Computed styles of width & height are being used because they are the
    // only dimensions available to JS that contain non-rounded values. It could
    // be possible to utilize the getBoundingClientRect if only it's data wasn't
    // affected by CSS transformations let alone paddings, borders and scroll bars.
    var width = toFloat(styles.width),
      height = toFloat(styles.height);
    // Width & height include paddings and borders when the 'border-box' box
    // model is applied (except for IE).
    if (styles.boxSizing === "border-box") {
      // Following conditions are required to handle Internet Explorer which
      // doesn't include paddings and borders to computed CSS dimensions.
      //
      // We can say that if CSS dimensions + paddings are equal to the "client"
      // properties then it's either IE, and thus we don't need to subtract
      // anything, or an element merely doesn't have paddings/borders styles.
      if (Math.round(width + horizPad) !== clientWidth) {
        width -= getBordersSize(styles, "left", "right") + horizPad;
      }
      if (Math.round(height + vertPad) !== clientHeight) {
        height -= getBordersSize(styles, "top", "bottom") + vertPad;
      }
    }
    // Following steps can't be applied to the document's root element as its
    // client[Width/Height] properties represent viewport area of the window.
    // Besides, it's as well not necessary as the <html> itself neither has
    // rendered scroll bars nor it can be clipped.
    if (!isDocumentElement(target)) {
      // In some browsers (only in Firefox, actually) CSS width & height
      // include scroll bars size which can be removed at this step as scroll
      // bars are the only difference between rounded dimensions + paddings
      // and "client" properties, though that is not always true in Chrome.
      var vertScrollbar = Math.round(width + horizPad) - clientWidth;
      var horizScrollbar = Math.round(height + vertPad) - clientHeight;
      // Chrome has a rather weird rounding of "client" properties.
      // E.g. for an element with content width of 314.2px it sometimes gives
      // the client width of 315px and for the width of 314.7px it may give
      // 314px. And it doesn't happen all the time. So just ignore this delta
      // as a non-relevant.
      if (Math.abs(vertScrollbar) !== 1) {
        width -= vertScrollbar;
      }
      if (Math.abs(horizScrollbar) !== 1) {
        height -= horizScrollbar;
      }
    }
    return createRectInit(paddings.left, paddings.top, width, height);
  }
  /**
   * Checks whether provided element is an instance of the SVGGraphicsElement.
   *
   * @param {Element} target - Element to be checked.
   * @returns {boolean}
   */
  var isSVGGraphicsElement = (function () {
    // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
    // interface.
    if (typeof SVGGraphicsElement !== "undefined") {
      return function (target) {
        return target instanceof getWindowOf(target).SVGGraphicsElement;
      };
    }
    // If it's so, then check that element is at least an instance of the
    // SVGElement and that it has the "getBBox" method.
    // eslint-disable-next-line no-extra-parens
    return function (target) {
      return (
        target instanceof getWindowOf(target).SVGElement &&
        typeof target.getBBox === "function"
      );
    };
  })();
  /**
   * Checks whether provided element is a document element (<html>).
   *
   * @param {Element} target - Element to be checked.
   * @returns {boolean}
   */
  function isDocumentElement(target) {
    return target === getWindowOf(target).document.documentElement;
  }
  /**
   * Calculates an appropriate content rectangle for provided html or svg element.
   *
   * @param {Element} target - Element content rectangle of which needs to be calculated.
   * @returns {DOMRectInit}
   */
  function getContentRect(target) {
    if (!isBrowser) {
      return emptyRect;
    }
    if (isSVGGraphicsElement(target)) {
      return getSVGContentRect(target);
    }
    return getHTMLElementContentRect(target);
  }
  /**
   * Creates rectangle with an interface of the DOMRectReadOnly.
   * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
   *
   * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
   * @returns {DOMRectReadOnly}
   */
  function createReadOnlyRect(_a) {
    var x = _a.x,
      y = _a.y,
      width = _a.width,
      height = _a.height;
    // If DOMRectReadOnly is available use it as a prototype for the rectangle.
    var Constr =
      typeof DOMRectReadOnly !== "undefined" ? DOMRectReadOnly : Object;
    var rect = Object.create(Constr.prototype);
    // Rectangle's properties are not writable and non-enumerable.
    defineConfigurable(rect, {
      x: x,
      y: y,
      width: width,
      height: height,
      top: y,
      right: x + width,
      bottom: height + y,
      left: x,
    });
    return rect;
  }
  /**
   * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
   * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
   *
   * @param {number} x - X coordinate.
   * @param {number} y - Y coordinate.
   * @param {number} width - Rectangle's width.
   * @param {number} height - Rectangle's height.
   * @returns {DOMRectInit}
   */
  function createRectInit(x, y, width, height) {
    return { x: x, y: y, width: width, height: height };
  }

  /**
   * Class that is responsible for computations of the content rectangle of
   * provided DOM element and for keeping track of it's changes.
   */
  var ResizeObservation = /** @class */ (function () {
    /**
     * Creates an instance of ResizeObservation.
     *
     * @param {Element} target - Element to be observed.
     */
    function ResizeObservation(target) {
      /**
       * Broadcasted width of content rectangle.
       *
       * @type {number}
       */
      this.broadcastWidth = 0;
      /**
       * Broadcasted height of content rectangle.
       *
       * @type {number}
       */
      this.broadcastHeight = 0;
      /**
       * Reference to the last observed content rectangle.
       *
       * @private {DOMRectInit}
       */
      this.contentRect_ = createRectInit(0, 0, 0, 0);
      this.target = target;
    }
    /**
     * Updates content rectangle and tells whether it's width or height properties
     * have changed since the last broadcast.
     *
     * @returns {boolean}
     */
    ResizeObservation.prototype.isActive = function () {
      var rect = getContentRect(this.target);
      this.contentRect_ = rect;
      return (
        rect.width !== this.broadcastWidth ||
        rect.height !== this.broadcastHeight
      );
    };
    /**
     * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
     * from the corresponding properties of the last observed content rectangle.
     *
     * @returns {DOMRectInit} Last observed content rectangle.
     */
    ResizeObservation.prototype.broadcastRect = function () {
      var rect = this.contentRect_;
      this.broadcastWidth = rect.width;
      this.broadcastHeight = rect.height;
      return rect;
    };
    return ResizeObservation;
  })();

  var ResizeObserverEntry = /** @class */ (function () {
    /**
     * Creates an instance of ResizeObserverEntry.
     *
     * @param {Element} target - Element that is being observed.
     * @param {DOMRectInit} rectInit - Data of the element's content rectangle.
     */
    function ResizeObserverEntry(target, rectInit) {
      var contentRect = createReadOnlyRect(rectInit);
      // According to the specification following properties are not writable
      // and are also not enumerable in the native implementation.
      //
      // Property accessors are not being used as they'd require to define a
      // private WeakMap storage which may cause memory leaks in browsers that
      // don't support this type of collections.
      defineConfigurable(this, { target: target, contentRect: contentRect });
    }
    return ResizeObserverEntry;
  })();

  var ResizeObserverSPI = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserver.
     *
     * @param {ResizeObserverCallback} callback - Callback function that is invoked
     *      when one of the observed elements changes it's content dimensions.
     * @param {ResizeObserverController} controller - Controller instance which
     *      is responsible for the updates of observer.
     * @param {ResizeObserver} callbackCtx - Reference to the public
     *      ResizeObserver instance which will be passed to callback function.
     */
    function ResizeObserverSPI(callback, controller, callbackCtx) {
      /**
       * Collection of resize observations that have detected changes in dimensions
       * of elements.
       *
       * @private {Array<ResizeObservation>}
       */
      this.activeObservations_ = [];
      /**
       * Registry of the ResizeObservation instances.
       *
       * @private {Map<Element, ResizeObservation>}
       */
      this.observations_ = new MapShim();
      if (typeof callback !== "function") {
        throw new TypeError(
          "The callback provided as parameter 1 is not a function."
        );
      }
      this.callback_ = callback;
      this.controller_ = controller;
      this.callbackCtx_ = callbackCtx;
    }
    /**
     * Starts observing provided element.
     *
     * @param {Element} target - Element to be observed.
     * @returns {void}
     */
    ResizeObserverSPI.prototype.observe = function (target) {
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      // Do nothing if current environment doesn't have the Element interface.
      if (typeof Element === "undefined" || !(Element instanceof Object)) {
        return;
      }
      if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
      }
      var observations = this.observations_;
      // Do nothing if element is already being observed.
      if (observations.has(target)) {
        return;
      }
      observations.set(target, new ResizeObservation(target));
      this.controller_.addObserver(this);
      // Force the update of observations.
      this.controller_.refresh();
    };
    /**
     * Stops observing provided element.
     *
     * @param {Element} target - Element to stop observing.
     * @returns {void}
     */
    ResizeObserverSPI.prototype.unobserve = function (target) {
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      // Do nothing if current environment doesn't have the Element interface.
      if (typeof Element === "undefined" || !(Element instanceof Object)) {
        return;
      }
      if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
      }
      var observations = this.observations_;
      // Do nothing if element is not being observed.
      if (!observations.has(target)) {
        return;
      }
      observations.delete(target);
      if (!observations.size) {
        this.controller_.removeObserver(this);
      }
    };
    /**
     * Stops observing all elements.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.disconnect = function () {
      this.clearActive();
      this.observations_.clear();
      this.controller_.removeObserver(this);
    };
    /**
     * Collects observation instances the associated element of which has changed
     * it's content rectangle.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.gatherActive = function () {
      var _this = this;
      this.clearActive();
      this.observations_.forEach(function (observation) {
        if (observation.isActive()) {
          _this.activeObservations_.push(observation);
        }
      });
    };
    /**
     * Invokes initial callback function with a list of ResizeObserverEntry
     * instances collected from active resize observations.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.broadcastActive = function () {
      // Do nothing if observer doesn't have active observations.
      if (!this.hasActive()) {
        return;
      }
      var ctx = this.callbackCtx_;
      // Create ResizeObserverEntry instance for every active observation.
      var entries = this.activeObservations_.map(function (observation) {
        return new ResizeObserverEntry(
          observation.target,
          observation.broadcastRect()
        );
      });
      this.callback_.call(ctx, entries, ctx);
      this.clearActive();
    };
    /**
     * Clears the collection of active observations.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.clearActive = function () {
      this.activeObservations_.splice(0);
    };
    /**
     * Tells whether observer has active observations.
     *
     * @returns {boolean}
     */
    ResizeObserverSPI.prototype.hasActive = function () {
      return this.activeObservations_.length > 0;
    };
    return ResizeObserverSPI;
  })();

  // Registry of internal observers. If WeakMap is not available use current shim
  // for the Map collection as it has all required methods and because WeakMap
  // can't be fully polyfilled anyway.
  var observers =
    typeof WeakMap !== "undefined" ? new WeakMap() : new MapShim();
  /**
   * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
   * exposing only those methods and properties that are defined in the spec.
   */
  var ResizeObserver = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserver.
     *
     * @param {ResizeObserverCallback} callback - Callback that is invoked when
     *      dimensions of the observed elements change.
     */
    function ResizeObserver(callback) {
      if (!(this instanceof ResizeObserver)) {
        throw new TypeError("Cannot call a class as a function.");
      }
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      var controller = ResizeObserverController.getInstance();
      var observer = new ResizeObserverSPI(callback, controller, this);
      observers.set(this, observer);
    }
    return ResizeObserver;
  })();
  // Expose public methods of ResizeObserver.
  ["observe", "unobserve", "disconnect"].forEach(function (method) {
    ResizeObserver.prototype[method] = function () {
      var _a;
      return (_a = observers.get(this))[method].apply(_a, arguments);
    };
  });

  var index$1 = (function () {
    // Export existing implementation if available.
    if (typeof global$1.ResizeObserver !== "undefined") {
      return global$1.ResizeObserver;
    }
    return ResizeObserver;
  })();

  // `Array.prototype.{ reduce, reduceRight }` methods implementation
  var createMethod$4 = function (IS_RIGHT) {
    return function (that, callbackfn, argumentsLength, memo) {
      aFunction$1(callbackfn);
      var O = toObject$1(that);
      var self = indexedObject(O);
      var length = toLength(O.length);
      var index = IS_RIGHT ? length - 1 : 0;
      var i = IS_RIGHT ? -1 : 1;
      if (argumentsLength < 2)
        while (true) {
          if (index in self) {
            memo = self[index];
            index += i;
            break;
          }
          index += i;
          if (IS_RIGHT ? index < 0 : length <= index) {
            throw TypeError("Reduce of empty array with no initial value");
          }
        }
      for (; IS_RIGHT ? index >= 0 : length > index; index += i)
        if (index in self) {
          memo = callbackfn(memo, self[index], index, O);
        }
      return memo;
    };
  };

  var arrayReduce = {
    // `Array.prototype.reduce` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduce
    left: createMethod$4(false),
    // `Array.prototype.reduceRight` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduceright
    right: createMethod$4(true),
  };

  var engineIsNode = classofRaw(global_1.process) == "process";

  var $reduce = arrayReduce.left;

  var STRICT_METHOD$1 = arrayMethodIsStrict("reduce");
  var USES_TO_LENGTH$2 = arrayMethodUsesToLength("reduce", { 1: 0 });
  // Chrome 80-82 has a critical bug
  // https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
  var CHROME_BUG =
    !engineIsNode && engineV8Version > 79 && engineV8Version < 83;

  // `Array.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduce
  _export(
    {
      target: "Array",
      proto: true,
      forced: !STRICT_METHOD$1 || !USES_TO_LENGTH$2 || CHROME_BUG,
    },
    {
      reduce: function reduce(callbackfn /* , initialValue */) {
        return $reduce(
          this,
          callbackfn,
          arguments.length,
          arguments.length > 1 ? arguments[1] : undefined
        );
      },
    }
  );

  var defineProperty$3 = objectDefineProperty.f;

  var FunctionPrototype = Function.prototype;
  var FunctionPrototypeToString = FunctionPrototype.toString;
  var nameRE = /^\s*function ([^ (]*)/;
  var NAME = "name";

  // Function instances `.name` property
  // https://tc39.es/ecma262/#sec-function-instances-name
  if (descriptors && !(NAME in FunctionPrototype)) {
    defineProperty$3(FunctionPrototype, NAME, {
      configurable: true,
      get: function () {
        try {
          return FunctionPrototypeToString.call(this).match(nameRE)[1];
        } catch (error) {
          return "";
        }
      },
    });
  }

  // `RegExp.prototype.flags` getter implementation
  // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
  var regexpFlags = function () {
    var that = anObject(this);
    var result = "";
    if (that.global) result += "g";
    if (that.ignoreCase) result += "i";
    if (that.multiline) result += "m";
    if (that.dotAll) result += "s";
    if (that.unicode) result += "u";
    if (that.sticky) result += "y";
    return result;
  };

  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
  // so we use an intermediate function.
  function RE(s, f) {
    return RegExp(s, f);
  }

  var UNSUPPORTED_Y = fails(function () {
    // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
    var re = RE("a", "y");
    re.lastIndex = 2;
    return re.exec("abcd") != null;
  });

  var BROKEN_CARET = fails(function () {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
    var re = RE("^r", "gy");
    re.lastIndex = 2;
    return re.exec("str") != null;
  });

  var regexpStickyHelpers = {
    UNSUPPORTED_Y: UNSUPPORTED_Y,
    BROKEN_CARET: BROKEN_CARET,
  };

  var nativeExec = RegExp.prototype.exec;
  // This always refers to the native implementation, because the
  // String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
  // which loads this file before patching the method.
  var nativeReplace = String.prototype.replace;

  var patchedExec = nativeExec;

  var UPDATES_LAST_INDEX_WRONG = (function () {
    var re1 = /a/;
    var re2 = /b*/g;
    nativeExec.call(re1, "a");
    nativeExec.call(re2, "a");
    return re1.lastIndex !== 0 || re2.lastIndex !== 0;
  })();

  var UNSUPPORTED_Y$1 =
    regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET;

  // nonparticipating capturing group, copied from es5-shim's String#split patch.
  var NPCG_INCLUDED = /()??/.exec("")[1] !== undefined;

  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1;

  if (PATCH) {
    patchedExec = function exec(str) {
      var re = this;
      var lastIndex, reCopy, match, i;
      var sticky = UNSUPPORTED_Y$1 && re.sticky;
      var flags = regexpFlags.call(re);
      var source = re.source;
      var charsAdded = 0;
      var strCopy = str;

      if (sticky) {
        flags = flags.replace("y", "");
        if (flags.indexOf("g") === -1) {
          flags += "g";
        }

        strCopy = String(str).slice(re.lastIndex);
        // Support anchored sticky behavior.
        if (
          re.lastIndex > 0 &&
          (!re.multiline || (re.multiline && str[re.lastIndex - 1] !== "\n"))
        ) {
          source = "(?: " + source + ")";
          strCopy = " " + strCopy;
          charsAdded++;
        }
        // ^(? + rx + ) is needed, in combination with some str slicing, to
        // simulate the 'y' flag.
        reCopy = new RegExp("^(?:" + source + ")", flags);
      }

      if (NPCG_INCLUDED) {
        reCopy = new RegExp("^" + source + "$(?!\\s)", flags);
      }
      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

      match = nativeExec.call(sticky ? reCopy : re, strCopy);

      if (sticky) {
        if (match) {
          match.input = match.input.slice(charsAdded);
          match[0] = match[0].slice(charsAdded);
          match.index = re.lastIndex;
          re.lastIndex += match[0].length;
        } else re.lastIndex = 0;
      } else if (UPDATES_LAST_INDEX_WRONG && match) {
        re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
      }
      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
        nativeReplace.call(match[0], reCopy, function () {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }

      return match;
    };
  }

  var regexpExec = patchedExec;

  // `RegExp.prototype.exec` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.exec
  _export(
    { target: "RegExp", proto: true, forced: /./.exec !== regexpExec },
    {
      exec: regexpExec,
    }
  );

  // TODO: Remove from `core-js@4` since it's moved to entry points

  var SPECIES$2 = wellKnownSymbol("species");

  var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
    // #replace needs built-in support for named groups.
    // #match works fine because it just return the exec results, even if it has
    // a "grops" property.
    var re = /./;
    re.exec = function () {
      var result = [];
      result.groups = { a: "7" };
      return result;
    };
    return "".replace(re, "$<a>") !== "7";
  });

  // IE <= 11 replaces $0 with the whole match, as if it was $&
  // https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
  var REPLACE_KEEPS_$0 = (function () {
    return "a".replace(/./, "$0") === "$0";
  })();

  var REPLACE = wellKnownSymbol("replace");
  // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
    if (/./[REPLACE]) {
      return /./[REPLACE]("a", "$0") === "";
    }
    return false;
  })();

  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  // Weex JS has frozen built-in prototypes, so use try / catch wrapper
  var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
    var re = /(?:)/;
    var originalExec = re.exec;
    re.exec = function () {
      return originalExec.apply(this, arguments);
    };
    var result = "ab".split(re);
    return result.length !== 2 || result[0] !== "a" || result[1] !== "b";
  });

  var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
    var SYMBOL = wellKnownSymbol(KEY);

    var DELEGATES_TO_SYMBOL = !fails(function () {
      // String methods call symbol-named RegEp methods
      var O = {};
      O[SYMBOL] = function () {
        return 7;
      };
      return ""[KEY](O) != 7;
    });

    var DELEGATES_TO_EXEC =
      DELEGATES_TO_SYMBOL &&
      !fails(function () {
        // Symbol-named RegExp methods call .exec
        var execCalled = false;
        var re = /a/;

        if (KEY === "split") {
          // We can't use real regex here since it causes deoptimization
          // and serious performance degradation in V8
          // https://github.com/zloirock/core-js/issues/306
          re = {};
          // RegExp[@@split] doesn't call the regex's exec method, but first creates
          // a new one. We need to return the patched regex when creating the new one.
          re.constructor = {};
          re.constructor[SPECIES$2] = function () {
            return re;
          };
          re.flags = "";
          re[SYMBOL] = /./[SYMBOL];
        }

        re.exec = function () {
          execCalled = true;
          return null;
        };

        re[SYMBOL]("");
        return !execCalled;
      });

    if (
      !DELEGATES_TO_SYMBOL ||
      !DELEGATES_TO_EXEC ||
      (KEY === "replace" &&
        !(
          REPLACE_SUPPORTS_NAMED_GROUPS &&
          REPLACE_KEEPS_$0 &&
          !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
        )) ||
      (KEY === "split" && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
    ) {
      var nativeRegExpMethod = /./[SYMBOL];
      var methods = exec(
        SYMBOL,
        ""[KEY],
        function (nativeMethod, regexp, str, arg2, forceStringMethod) {
          if (regexp.exec === regexpExec) {
            if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
              // The native String method already delegates to @@method (this
              // polyfilled function), leasing to infinite recursion.
              // We avoid it by directly calling the native @@method method.
              return {
                done: true,
                value: nativeRegExpMethod.call(regexp, str, arg2),
              };
            }
            return { done: true, value: nativeMethod.call(str, regexp, arg2) };
          }
          return { done: false };
        },
        {
          REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
          REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:
            REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,
        }
      );
      var stringMethod = methods[0];
      var regexMethod = methods[1];

      redefine(String.prototype, KEY, stringMethod);
      redefine(
        RegExp.prototype,
        SYMBOL,
        length == 2
          ? // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
            // 21.2.5.11 RegExp.prototype[@@split](string, limit)
            function (string, arg) {
              return regexMethod.call(string, this, arg);
            }
          : // 21.2.5.6 RegExp.prototype[@@match](string)
            // 21.2.5.9 RegExp.prototype[@@search](string)
            function (string) {
              return regexMethod.call(string, this);
            }
      );
    }

    if (sham)
      createNonEnumerableProperty(RegExp.prototype[SYMBOL], "sham", true);
  };

  var charAt$1 = stringMultibyte.charAt;

  // `AdvanceStringIndex` abstract operation
  // https://tc39.es/ecma262/#sec-advancestringindex
  var advanceStringIndex = function (S, index, unicode) {
    return index + (unicode ? charAt$1(S, index).length : 1);
  };

  // `RegExpExec` abstract operation
  // https://tc39.es/ecma262/#sec-regexpexec
  var regexpExecAbstract = function (R, S) {
    var exec = R.exec;
    if (typeof exec === "function") {
      var result = exec.call(R, S);
      if (typeof result !== "object") {
        throw TypeError(
          "RegExp exec method returned something other than an Object or null"
        );
      }
      return result;
    }

    if (classofRaw(R) !== "RegExp") {
      throw TypeError("RegExp#exec called on incompatible receiver");
    }

    return regexpExec.call(R, S);
  };

  // @@match logic
  fixRegexpWellKnownSymbolLogic(
    "match",
    1,
    function (MATCH, nativeMatch, maybeCallNative) {
      return [
        // `String.prototype.match` method
        // https://tc39.es/ecma262/#sec-string.prototype.match
        function match(regexp) {
          var O = requireObjectCoercible(this);
          var matcher = regexp == undefined ? undefined : regexp[MATCH];
          return matcher !== undefined
            ? matcher.call(regexp, O)
            : new RegExp(regexp)[MATCH](String(O));
        },
        // `RegExp.prototype[@@match]` method
        // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
        function (regexp) {
          var res = maybeCallNative(nativeMatch, regexp, this);
          if (res.done) return res.value;

          var rx = anObject(regexp);
          var S = String(this);

          if (!rx.global) return regexpExecAbstract(rx, S);

          var fullUnicode = rx.unicode;
          rx.lastIndex = 0;
          var A = [];
          var n = 0;
          var result;
          while ((result = regexpExecAbstract(rx, S)) !== null) {
            var matchStr = String(result[0]);
            A[n] = matchStr;
            if (matchStr === "")
              rx.lastIndex = advanceStringIndex(
                S,
                toLength(rx.lastIndex),
                fullUnicode
              );
            n++;
          }
          return n === 0 ? null : A;
        },
      ];
    }
  );

  var floor$1 = Math.floor;
  var replace = "".replace;
  var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
  var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

  // https://tc39.es/ecma262/#sec-getsubstitution
  var getSubstitution = function (
    matched,
    str,
    position,
    captures,
    namedCaptures,
    replacement
  ) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject$1(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case "$":
          return "$";
        case "&":
          return matched;
        case "`":
          return str.slice(0, position);
        case "'":
          return str.slice(tailPos);
        case "<":
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default:
          // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor$1(n / 10);
            if (f === 0) return match;
            if (f <= m)
              return captures[f - 1] === undefined
                ? ch.charAt(1)
                : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? "" : capture;
    });
  };

  var max$1 = Math.max;
  var min$2 = Math.min;

  var maybeToString = function (it) {
    return it === undefined ? it : String(it);
  };

  // @@replace logic
  fixRegexpWellKnownSymbolLogic(
    "replace",
    2,
    function (REPLACE, nativeReplace, maybeCallNative, reason) {
      var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE =
        reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
      var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
      var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
        ? "$"
        : "$0";

      return [
        // `String.prototype.replace` method
        // https://tc39.es/ecma262/#sec-string.prototype.replace
        function replace(searchValue, replaceValue) {
          var O = requireObjectCoercible(this);
          var replacer =
            searchValue == undefined ? undefined : searchValue[REPLACE];
          return replacer !== undefined
            ? replacer.call(searchValue, O, replaceValue)
            : nativeReplace.call(String(O), searchValue, replaceValue);
        },
        // `RegExp.prototype[@@replace]` method
        // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
        function (regexp, replaceValue) {
          if (
            (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE &&
              REPLACE_KEEPS_$0) ||
            (typeof replaceValue === "string" &&
              replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
          ) {
            var res = maybeCallNative(
              nativeReplace,
              regexp,
              this,
              replaceValue
            );
            if (res.done) return res.value;
          }

          var rx = anObject(regexp);
          var S = String(this);

          var functionalReplace = typeof replaceValue === "function";
          if (!functionalReplace) replaceValue = String(replaceValue);

          var global = rx.global;
          if (global) {
            var fullUnicode = rx.unicode;
            rx.lastIndex = 0;
          }
          var results = [];
          while (true) {
            var result = regexpExecAbstract(rx, S);
            if (result === null) break;

            results.push(result);
            if (!global) break;

            var matchStr = String(result[0]);
            if (matchStr === "")
              rx.lastIndex = advanceStringIndex(
                S,
                toLength(rx.lastIndex),
                fullUnicode
              );
          }

          var accumulatedResult = "";
          var nextSourcePosition = 0;
          for (var i = 0; i < results.length; i++) {
            result = results[i];

            var matched = String(result[0]);
            var position = max$1(min$2(toInteger(result.index), S.length), 0);
            var captures = [];
            // NOTE: This is equivalent to
            //   captures = result.slice(1).map(maybeToString)
            // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
            // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
            // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
            for (var j = 1; j < result.length; j++)
              captures.push(maybeToString(result[j]));
            var namedCaptures = result.groups;
            if (functionalReplace) {
              var replacerArgs = [matched].concat(captures, position, S);
              if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
              var replacement = String(
                replaceValue.apply(undefined, replacerArgs)
              );
            } else {
              replacement = getSubstitution(
                matched,
                S,
                position,
                captures,
                namedCaptures,
                replaceValue
              );
            }
            if (position >= nextSourcePosition) {
              accumulatedResult +=
                S.slice(nextSourcePosition, position) + replacement;
              nextSourcePosition = position + matched.length;
            }
          }
          return accumulatedResult + S.slice(nextSourcePosition);
        },
      ];
    }
  );

  /**
   * SimpleBar.js - v5.3.0
   * Scrollbars, simpler.
   * https://grsmto.github.io/simplebar/
   *
   * Made by Adrien Denat from a fork by Jonathan Nicol
   * Under MIT License
   */

  var cachedScrollbarWidth = null;
  var cachedDevicePixelRatio = null;

  if (canUseDom) {
    window.addEventListener("resize", function () {
      if (cachedDevicePixelRatio !== window.devicePixelRatio) {
        cachedDevicePixelRatio = window.devicePixelRatio;
        cachedScrollbarWidth = null;
      }
    });
  }

  function scrollbarWidth() {
    if (cachedScrollbarWidth === null) {
      if (typeof document === "undefined") {
        cachedScrollbarWidth = 0;
        return cachedScrollbarWidth;
      }

      var body = document.body;
      var box = document.createElement("div");
      box.classList.add("simplebar-hide-scrollbar");
      body.appendChild(box);
      var width = box.getBoundingClientRect().right;
      body.removeChild(box);
      cachedScrollbarWidth = width;
    }

    return cachedScrollbarWidth;
  }

  // Helper function to retrieve options from element attributes
  var getOptions = function getOptions(obj) {
    var options = Array.prototype.reduce.call(
      obj,
      function (acc, attribute) {
        var option = attribute.name.match(/data-simplebar-(.+)/);

        if (option) {
          var key = option[1].replace(/\W+(.)/g, function (x, chr) {
            return chr.toUpperCase();
          });

          switch (attribute.value) {
            case "true":
              acc[key] = true;
              break;

            case "false":
              acc[key] = false;
              break;

            case undefined:
              acc[key] = true;
              break;

            default:
              acc[key] = attribute.value;
          }
        }

        return acc;
      },
      {}
    );
    return options;
  };
  function getElementWindow(element) {
    if (
      !element ||
      !element.ownerDocument ||
      !element.ownerDocument.defaultView
    ) {
      return window;
    }

    return element.ownerDocument.defaultView;
  }
  function getElementDocument(element) {
    if (!element || !element.ownerDocument) {
      return document;
    }

    return element.ownerDocument;
  }

  var SimpleBar =
    /*#__PURE__*/
    (function () {
      function SimpleBar(element, options) {
        var _this = this;

        this.onScroll = function () {
          var elWindow = getElementWindow(_this.el);

          if (!_this.scrollXTicking) {
            elWindow.requestAnimationFrame(_this.scrollX);
            _this.scrollXTicking = true;
          }

          if (!_this.scrollYTicking) {
            elWindow.requestAnimationFrame(_this.scrollY);
            _this.scrollYTicking = true;
          }
        };

        this.scrollX = function () {
          if (_this.axis.x.isOverflowing) {
            _this.showScrollbar("x");

            _this.positionScrollbar("x");
          }

          _this.scrollXTicking = false;
        };

        this.scrollY = function () {
          if (_this.axis.y.isOverflowing) {
            _this.showScrollbar("y");

            _this.positionScrollbar("y");
          }

          _this.scrollYTicking = false;
        };

        this.onMouseEnter = function () {
          _this.showScrollbar("x");

          _this.showScrollbar("y");
        };

        this.onMouseMove = function (e) {
          _this.mouseX = e.clientX;
          _this.mouseY = e.clientY;

          if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) {
            _this.onMouseMoveForAxis("x");
          }

          if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) {
            _this.onMouseMoveForAxis("y");
          }
        };

        this.onMouseLeave = function () {
          _this.onMouseMove.cancel();

          if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) {
            _this.onMouseLeaveForAxis("x");
          }

          if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) {
            _this.onMouseLeaveForAxis("y");
          }

          _this.mouseX = -1;
          _this.mouseY = -1;
        };

        this.onWindowResize = function () {
          // Recalculate scrollbarWidth in case it's a zoom
          _this.scrollbarWidth = _this.getScrollbarWidth();

          _this.hideNativeScrollbar();
        };

        this.hideScrollbars = function () {
          _this.axis.x.track.rect =
            _this.axis.x.track.el.getBoundingClientRect();
          _this.axis.y.track.rect =
            _this.axis.y.track.el.getBoundingClientRect();

          if (!_this.isWithinBounds(_this.axis.y.track.rect)) {
            _this.axis.y.scrollbar.el.classList.remove(
              _this.classNames.visible
            );

            _this.axis.y.isVisible = false;
          }

          if (!_this.isWithinBounds(_this.axis.x.track.rect)) {
            _this.axis.x.scrollbar.el.classList.remove(
              _this.classNames.visible
            );

            _this.axis.x.isVisible = false;
          }
        };

        this.onPointerEvent = function (e) {
          var isWithinTrackXBounds, isWithinTrackYBounds;
          _this.axis.x.track.rect =
            _this.axis.x.track.el.getBoundingClientRect();
          _this.axis.y.track.rect =
            _this.axis.y.track.el.getBoundingClientRect();

          if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) {
            isWithinTrackXBounds = _this.isWithinBounds(
              _this.axis.x.track.rect
            );
          }

          if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) {
            isWithinTrackYBounds = _this.isWithinBounds(
              _this.axis.y.track.rect
            );
          } // If any pointer event is called on the scrollbar

          if (isWithinTrackXBounds || isWithinTrackYBounds) {
            // Preventing the event's default action stops text being
            // selectable during the drag.
            e.preventDefault(); // Prevent event leaking

            e.stopPropagation();

            if (e.type === "mousedown") {
              if (isWithinTrackXBounds) {
                _this.axis.x.scrollbar.rect =
                  _this.axis.x.scrollbar.el.getBoundingClientRect();

                if (_this.isWithinBounds(_this.axis.x.scrollbar.rect)) {
                  _this.onDragStart(e, "x");
                } else {
                  _this.onTrackClick(e, "x");
                }
              }

              if (isWithinTrackYBounds) {
                _this.axis.y.scrollbar.rect =
                  _this.axis.y.scrollbar.el.getBoundingClientRect();

                if (_this.isWithinBounds(_this.axis.y.scrollbar.rect)) {
                  _this.onDragStart(e, "y");
                } else {
                  _this.onTrackClick(e, "y");
                }
              }
            }
          }
        };

        this.drag = function (e) {
          var eventOffset;
          var track = _this.axis[_this.draggedAxis].track;
          var trackSize = track.rect[_this.axis[_this.draggedAxis].sizeAttr];
          var scrollbar = _this.axis[_this.draggedAxis].scrollbar;
          var contentSize =
            _this.contentWrapperEl[
              _this.axis[_this.draggedAxis].scrollSizeAttr
            ];
          var hostSize = parseInt(
            _this.elStyles[_this.axis[_this.draggedAxis].sizeAttr],
            10
          );
          e.preventDefault();
          e.stopPropagation();

          if (_this.draggedAxis === "y") {
            eventOffset = e.pageY;
          } else {
            eventOffset = e.pageX;
          } // Calculate how far the user's mouse is from the top/left of the scrollbar (minus the dragOffset).

          var dragPos =
            eventOffset -
            track.rect[_this.axis[_this.draggedAxis].offsetAttr] -
            _this.axis[_this.draggedAxis].dragOffset; // Convert the mouse position into a percentage of the scrollbar height/width.

          var dragPerc = dragPos / (trackSize - scrollbar.size); // Scroll the content by the same percentage.

          var scrollPos = dragPerc * (contentSize - hostSize); // Fix browsers inconsistency on RTL

          if (_this.draggedAxis === "x") {
            scrollPos =
              _this.isRtl && SimpleBar.getRtlHelpers().isRtlScrollbarInverted
                ? scrollPos - (trackSize + scrollbar.size)
                : scrollPos;
            scrollPos =
              _this.isRtl && SimpleBar.getRtlHelpers().isRtlScrollingInverted
                ? -scrollPos
                : scrollPos;
          }

          _this.contentWrapperEl[
            _this.axis[_this.draggedAxis].scrollOffsetAttr
          ] = scrollPos;
        };

        this.onEndDrag = function (e) {
          var elDocument = getElementDocument(_this.el);
          var elWindow = getElementWindow(_this.el);
          e.preventDefault();
          e.stopPropagation();

          _this.el.classList.remove(_this.classNames.dragging);

          elDocument.removeEventListener("mousemove", _this.drag, true);
          elDocument.removeEventListener("mouseup", _this.onEndDrag, true);
          _this.removePreventClickId = elWindow.setTimeout(function () {
            // Remove these asynchronously so we still suppress click events
            // generated simultaneously with mouseup.
            elDocument.removeEventListener("click", _this.preventClick, true);
            elDocument.removeEventListener(
              "dblclick",
              _this.preventClick,
              true
            );
            _this.removePreventClickId = null;
          });
        };

        this.preventClick = function (e) {
          e.preventDefault();
          e.stopPropagation();
        };

        this.el = element;
        this.minScrollbarWidth = 20;
        this.options = Object.assign({}, SimpleBar.defaultOptions, {}, options);
        this.classNames = Object.assign(
          {},
          SimpleBar.defaultOptions.classNames,
          {},
          this.options.classNames
        );
        this.axis = {
          x: {
            scrollOffsetAttr: "scrollLeft",
            sizeAttr: "width",
            scrollSizeAttr: "scrollWidth",
            offsetSizeAttr: "offsetWidth",
            offsetAttr: "left",
            overflowAttr: "overflowX",
            dragOffset: 0,
            isOverflowing: true,
            isVisible: false,
            forceVisible: false,
            track: {},
            scrollbar: {},
          },
          y: {
            scrollOffsetAttr: "scrollTop",
            sizeAttr: "height",
            scrollSizeAttr: "scrollHeight",
            offsetSizeAttr: "offsetHeight",
            offsetAttr: "top",
            overflowAttr: "overflowY",
            dragOffset: 0,
            isOverflowing: true,
            isVisible: false,
            forceVisible: false,
            track: {},
            scrollbar: {},
          },
        };
        this.removePreventClickId = null; // Don't re-instantiate over an existing one

        if (SimpleBar.instances.has(this.el)) {
          return;
        }

        this.recalculate = lodash_throttle(this.recalculate.bind(this), 64);
        this.onMouseMove = lodash_throttle(this.onMouseMove.bind(this), 64);
        this.hideScrollbars = lodash_debounce(
          this.hideScrollbars.bind(this),
          this.options.timeout
        );
        this.onWindowResize = lodash_debounce(
          this.onWindowResize.bind(this),
          64,
          {
            leading: true,
          }
        );
        SimpleBar.getRtlHelpers = lodash_memoize(SimpleBar.getRtlHelpers);
        this.init();
      }
      /**
       * Static properties
       */

      /**
       * Helper to fix browsers inconsistency on RTL:
       *  - Firefox inverts the scrollbar initial position
       *  - IE11 inverts both scrollbar position and scrolling offset
       * Directly inspired by @KingSora's OverlayScrollbars https://github.com/KingSora/OverlayScrollbars/blob/master/js/OverlayScrollbars.js#L1634
       */

      SimpleBar.getRtlHelpers = function getRtlHelpers() {
        var dummyDiv = document.createElement("div");
        dummyDiv.innerHTML =
          '<div class="hs-dummy-scrollbar-size"><div style="height: 200%; width: 200%; margin: 10px 0;"></div></div>';
        var scrollbarDummyEl = dummyDiv.firstElementChild;
        document.body.appendChild(scrollbarDummyEl);
        var dummyContainerChild = scrollbarDummyEl.firstElementChild;
        scrollbarDummyEl.scrollLeft = 0;
        var dummyContainerOffset = SimpleBar.getOffset(scrollbarDummyEl);
        var dummyContainerChildOffset =
          SimpleBar.getOffset(dummyContainerChild);
        scrollbarDummyEl.scrollLeft = 999;
        var dummyContainerScrollOffsetAfterScroll =
          SimpleBar.getOffset(dummyContainerChild);
        return {
          // determines if the scrolling is responding with negative values
          isRtlScrollingInverted:
            dummyContainerOffset.left !== dummyContainerChildOffset.left &&
            dummyContainerChildOffset.left -
              dummyContainerScrollOffsetAfterScroll.left !==
              0,
          // determines if the origin scrollbar position is inverted or not (positioned on left or right)
          isRtlScrollbarInverted:
            dummyContainerOffset.left !== dummyContainerChildOffset.left,
        };
      };

      SimpleBar.getOffset = function getOffset(el) {
        var rect = el.getBoundingClientRect();
        var elDocument = getElementDocument(el);
        var elWindow = getElementWindow(el);
        return {
          top:
            rect.top +
            (elWindow.pageYOffset || elDocument.documentElement.scrollTop),
          left:
            rect.left +
            (elWindow.pageXOffset || elDocument.documentElement.scrollLeft),
        };
      };

      var _proto = SimpleBar.prototype;

      _proto.init = function init() {
        // Save a reference to the instance, so we know this DOM node has already been instancied
        SimpleBar.instances.set(this.el, this); // We stop here on server-side

        if (canUseDom) {
          this.initDOM();
          this.scrollbarWidth = this.getScrollbarWidth();
          this.recalculate();
          this.initListeners();
        }
      };

      _proto.initDOM = function initDOM() {
        var _this2 = this;

        // make sure this element doesn't have the elements yet
        if (
          Array.prototype.filter.call(this.el.children, function (child) {
            return child.classList.contains(_this2.classNames.wrapper);
          }).length
        ) {
          // assume that element has his DOM already initiated
          this.wrapperEl = this.el.querySelector("." + this.classNames.wrapper);
          this.contentWrapperEl =
            this.options.scrollableNode ||
            this.el.querySelector("." + this.classNames.contentWrapper);
          this.contentEl =
            this.options.contentNode ||
            this.el.querySelector("." + this.classNames.contentEl);
          this.offsetEl = this.el.querySelector("." + this.classNames.offset);
          this.maskEl = this.el.querySelector("." + this.classNames.mask);
          this.placeholderEl = this.findChild(
            this.wrapperEl,
            "." + this.classNames.placeholder
          );
          this.heightAutoObserverWrapperEl = this.el.querySelector(
            "." + this.classNames.heightAutoObserverWrapperEl
          );
          this.heightAutoObserverEl = this.el.querySelector(
            "." + this.classNames.heightAutoObserverEl
          );
          this.axis.x.track.el = this.findChild(
            this.el,
            "." + this.classNames.track + "." + this.classNames.horizontal
          );
          this.axis.y.track.el = this.findChild(
            this.el,
            "." + this.classNames.track + "." + this.classNames.vertical
          );
        } else {
          // Prepare DOM
          this.wrapperEl = document.createElement("div");
          this.contentWrapperEl = document.createElement("div");
          this.offsetEl = document.createElement("div");
          this.maskEl = document.createElement("div");
          this.contentEl = document.createElement("div");
          this.placeholderEl = document.createElement("div");
          this.heightAutoObserverWrapperEl = document.createElement("div");
          this.heightAutoObserverEl = document.createElement("div");
          this.wrapperEl.classList.add(this.classNames.wrapper);
          this.contentWrapperEl.classList.add(this.classNames.contentWrapper);
          this.offsetEl.classList.add(this.classNames.offset);
          this.maskEl.classList.add(this.classNames.mask);
          this.contentEl.classList.add(this.classNames.contentEl);
          this.placeholderEl.classList.add(this.classNames.placeholder);
          this.heightAutoObserverWrapperEl.classList.add(
            this.classNames.heightAutoObserverWrapperEl
          );
          this.heightAutoObserverEl.classList.add(
            this.classNames.heightAutoObserverEl
          );

          while (this.el.firstChild) {
            this.contentEl.appendChild(this.el.firstChild);
          }

          this.contentWrapperEl.appendChild(this.contentEl);
          this.offsetEl.appendChild(this.contentWrapperEl);
          this.maskEl.appendChild(this.offsetEl);
          this.heightAutoObserverWrapperEl.appendChild(
            this.heightAutoObserverEl
          );
          this.wrapperEl.appendChild(this.heightAutoObserverWrapperEl);
          this.wrapperEl.appendChild(this.maskEl);
          this.wrapperEl.appendChild(this.placeholderEl);
          this.el.appendChild(this.wrapperEl);
        }

        if (!this.axis.x.track.el || !this.axis.y.track.el) {
          var track = document.createElement("div");
          var scrollbar = document.createElement("div");
          track.classList.add(this.classNames.track);
          scrollbar.classList.add(this.classNames.scrollbar);
          track.appendChild(scrollbar);
          this.axis.x.track.el = track.cloneNode(true);
          this.axis.x.track.el.classList.add(this.classNames.horizontal);
          this.axis.y.track.el = track.cloneNode(true);
          this.axis.y.track.el.classList.add(this.classNames.vertical);
          this.el.appendChild(this.axis.x.track.el);
          this.el.appendChild(this.axis.y.track.el);
        }

        this.axis.x.scrollbar.el = this.axis.x.track.el.querySelector(
          "." + this.classNames.scrollbar
        );
        this.axis.y.scrollbar.el = this.axis.y.track.el.querySelector(
          "." + this.classNames.scrollbar
        );

        if (!this.options.autoHide) {
          this.axis.x.scrollbar.el.classList.add(this.classNames.visible);
          this.axis.y.scrollbar.el.classList.add(this.classNames.visible);
        }

        this.el.setAttribute("data-simplebar", "init");
      };

      _proto.initListeners = function initListeners() {
        var _this3 = this;

        var elWindow = getElementWindow(this.el); // Event listeners

        if (this.options.autoHide) {
          this.el.addEventListener("mouseenter", this.onMouseEnter);
        }

        ["mousedown", "click", "dblclick"].forEach(function (e) {
          _this3.el.addEventListener(e, _this3.onPointerEvent, true);
        });
        ["touchstart", "touchend", "touchmove"].forEach(function (e) {
          _this3.el.addEventListener(e, _this3.onPointerEvent, {
            capture: true,
            passive: true,
          });
        });
        this.el.addEventListener("mousemove", this.onMouseMove);
        this.el.addEventListener("mouseleave", this.onMouseLeave);
        this.contentWrapperEl.addEventListener("scroll", this.onScroll); // Browser zoom triggers a window resize

        elWindow.addEventListener("resize", this.onWindowResize); // Hack for https://github.com/WICG/ResizeObserver/issues/38

        var resizeObserverStarted = false;
        var resizeObserver = elWindow.ResizeObserver || index$1;
        this.resizeObserver = new resizeObserver(function () {
          if (!resizeObserverStarted) return;

          _this3.recalculate();
        });
        this.resizeObserver.observe(this.el);
        this.resizeObserver.observe(this.contentEl);
        elWindow.requestAnimationFrame(function () {
          resizeObserverStarted = true;
        }); // This is required to detect horizontal scroll. Vertical scroll only needs the resizeObserver.

        this.mutationObserver = new elWindow.MutationObserver(this.recalculate);
        this.mutationObserver.observe(this.contentEl, {
          childList: true,
          subtree: true,
          characterData: true,
        });
      };

      _proto.recalculate = function recalculate() {
        var elWindow = getElementWindow(this.el);
        this.elStyles = elWindow.getComputedStyle(this.el);
        this.isRtl = this.elStyles.direction === "rtl";
        var isHeightAuto = this.heightAutoObserverEl.offsetHeight <= 1;
        var isWidthAuto = this.heightAutoObserverEl.offsetWidth <= 1;
        var contentElOffsetWidth = this.contentEl.offsetWidth;
        var contentWrapperElOffsetWidth = this.contentWrapperEl.offsetWidth;
        var elOverflowX = this.elStyles.overflowX;
        var elOverflowY = this.elStyles.overflowY;
        this.contentEl.style.padding =
          this.elStyles.paddingTop +
          " " +
          this.elStyles.paddingRight +
          " " +
          this.elStyles.paddingBottom +
          " " +
          this.elStyles.paddingLeft;
        this.wrapperEl.style.margin =
          "-" +
          this.elStyles.paddingTop +
          " -" +
          this.elStyles.paddingRight +
          " -" +
          this.elStyles.paddingBottom +
          " -" +
          this.elStyles.paddingLeft;
        var contentElScrollHeight = this.contentEl.scrollHeight;
        var contentElScrollWidth = this.contentEl.scrollWidth;
        this.contentWrapperEl.style.height = isHeightAuto ? "auto" : "100%"; // Determine placeholder size

        this.placeholderEl.style.width = isWidthAuto
          ? contentElOffsetWidth + "px"
          : "auto";
        this.placeholderEl.style.height = contentElScrollHeight + "px";
        var contentWrapperElOffsetHeight = this.contentWrapperEl.offsetHeight;
        this.axis.x.isOverflowing = contentElScrollWidth > contentElOffsetWidth;
        this.axis.y.isOverflowing =
          contentElScrollHeight > contentWrapperElOffsetHeight; // Set isOverflowing to false if user explicitely set hidden overflow

        this.axis.x.isOverflowing =
          elOverflowX === "hidden" ? false : this.axis.x.isOverflowing;
        this.axis.y.isOverflowing =
          elOverflowY === "hidden" ? false : this.axis.y.isOverflowing;
        this.axis.x.forceVisible =
          this.options.forceVisible === "x" ||
          this.options.forceVisible === true;
        this.axis.y.forceVisible =
          this.options.forceVisible === "y" ||
          this.options.forceVisible === true;
        this.hideNativeScrollbar(); // Set isOverflowing to false if scrollbar is not necessary (content is shorter than offset)

        var offsetForXScrollbar = this.axis.x.isOverflowing
          ? this.scrollbarWidth
          : 0;
        var offsetForYScrollbar = this.axis.y.isOverflowing
          ? this.scrollbarWidth
          : 0;
        this.axis.x.isOverflowing =
          this.axis.x.isOverflowing &&
          contentElScrollWidth >
            contentWrapperElOffsetWidth - offsetForYScrollbar;
        this.axis.y.isOverflowing =
          this.axis.y.isOverflowing &&
          contentElScrollHeight >
            contentWrapperElOffsetHeight - offsetForXScrollbar;
        this.axis.x.scrollbar.size = this.getScrollbarSize("x");
        this.axis.y.scrollbar.size = this.getScrollbarSize("y");
        this.axis.x.scrollbar.el.style.width =
          this.axis.x.scrollbar.size + "px";
        this.axis.y.scrollbar.el.style.height =
          this.axis.y.scrollbar.size + "px";
        this.positionScrollbar("x");
        this.positionScrollbar("y");
        this.toggleTrackVisibility("x");
        this.toggleTrackVisibility("y");
      };
      /**
       * Calculate scrollbar size
       */

      _proto.getScrollbarSize = function getScrollbarSize(axis) {
        if (axis === void 0) {
          axis = "y";
        }

        if (!this.axis[axis].isOverflowing) {
          return 0;
        }

        var contentSize = this.contentEl[this.axis[axis].scrollSizeAttr];
        var trackSize =
          this.axis[axis].track.el[this.axis[axis].offsetSizeAttr];
        var scrollbarSize;
        var scrollbarRatio = trackSize / contentSize; // Calculate new height/position of drag handle.

        scrollbarSize = Math.max(
          ~~(scrollbarRatio * trackSize),
          this.options.scrollbarMinSize
        );

        if (this.options.scrollbarMaxSize) {
          scrollbarSize = Math.min(
            scrollbarSize,
            this.options.scrollbarMaxSize
          );
        }

        return scrollbarSize;
      };

      _proto.positionScrollbar = function positionScrollbar(axis) {
        if (axis === void 0) {
          axis = "y";
        }

        if (!this.axis[axis].isOverflowing) {
          return;
        }

        var contentSize = this.contentWrapperEl[this.axis[axis].scrollSizeAttr];
        var trackSize =
          this.axis[axis].track.el[this.axis[axis].offsetSizeAttr];
        var hostSize = parseInt(this.elStyles[this.axis[axis].sizeAttr], 10);
        var scrollbar = this.axis[axis].scrollbar;
        var scrollOffset =
          this.contentWrapperEl[this.axis[axis].scrollOffsetAttr];
        scrollOffset =
          axis === "x" &&
          this.isRtl &&
          SimpleBar.getRtlHelpers().isRtlScrollingInverted
            ? -scrollOffset
            : scrollOffset;
        var scrollPourcent = scrollOffset / (contentSize - hostSize);
        var handleOffset = ~~((trackSize - scrollbar.size) * scrollPourcent);
        handleOffset =
          axis === "x" &&
          this.isRtl &&
          SimpleBar.getRtlHelpers().isRtlScrollbarInverted
            ? handleOffset + (trackSize - scrollbar.size)
            : handleOffset;
        scrollbar.el.style.transform =
          axis === "x"
            ? "translate3d(" + handleOffset + "px, 0, 0)"
            : "translate3d(0, " + handleOffset + "px, 0)";
      };

      _proto.toggleTrackVisibility = function toggleTrackVisibility(axis) {
        if (axis === void 0) {
          axis = "y";
        }

        var track = this.axis[axis].track.el;
        var scrollbar = this.axis[axis].scrollbar.el;

        if (this.axis[axis].isOverflowing || this.axis[axis].forceVisible) {
          track.style.visibility = "visible";
          this.contentWrapperEl.style[this.axis[axis].overflowAttr] = "scroll";
        } else {
          track.style.visibility = "hidden";
          this.contentWrapperEl.style[this.axis[axis].overflowAttr] = "hidden";
        } // Even if forceVisible is enabled, scrollbar itself should be hidden

        if (this.axis[axis].isOverflowing) {
          scrollbar.style.display = "block";
        } else {
          scrollbar.style.display = "none";
        }
      };

      _proto.hideNativeScrollbar = function hideNativeScrollbar() {
        this.offsetEl.style[this.isRtl ? "left" : "right"] =
          this.axis.y.isOverflowing || this.axis.y.forceVisible
            ? "-" + this.scrollbarWidth + "px"
            : 0;
        this.offsetEl.style.bottom =
          this.axis.x.isOverflowing || this.axis.x.forceVisible
            ? "-" + this.scrollbarWidth + "px"
            : 0;
      };
      /**
       * On scroll event handling
       */

      _proto.onMouseMoveForAxis = function onMouseMoveForAxis(axis) {
        if (axis === void 0) {
          axis = "y";
        }

        this.axis[axis].track.rect =
          this.axis[axis].track.el.getBoundingClientRect();
        this.axis[axis].scrollbar.rect =
          this.axis[axis].scrollbar.el.getBoundingClientRect();
        var isWithinScrollbarBoundsX = this.isWithinBounds(
          this.axis[axis].scrollbar.rect
        );

        if (isWithinScrollbarBoundsX) {
          this.axis[axis].scrollbar.el.classList.add(this.classNames.hover);
        } else {
          this.axis[axis].scrollbar.el.classList.remove(this.classNames.hover);
        }

        if (this.isWithinBounds(this.axis[axis].track.rect)) {
          this.showScrollbar(axis);
          this.axis[axis].track.el.classList.add(this.classNames.hover);
        } else {
          this.axis[axis].track.el.classList.remove(this.classNames.hover);
        }
      };

      _proto.onMouseLeaveForAxis = function onMouseLeaveForAxis(axis) {
        if (axis === void 0) {
          axis = "y";
        }

        this.axis[axis].track.el.classList.remove(this.classNames.hover);
        this.axis[axis].scrollbar.el.classList.remove(this.classNames.hover);
      };

      /**
       * Show scrollbar
       */
      _proto.showScrollbar = function showScrollbar(axis) {
        if (axis === void 0) {
          axis = "y";
        }

        var scrollbar = this.axis[axis].scrollbar.el;

        if (!this.axis[axis].isVisible) {
          scrollbar.classList.add(this.classNames.visible);
          this.axis[axis].isVisible = true;
        }

        if (this.options.autoHide) {
          this.hideScrollbars();
        }
      };
      /**
       * Hide Scrollbar
       */

      /**
       * on scrollbar handle drag movement starts
       */
      _proto.onDragStart = function onDragStart(e, axis) {
        if (axis === void 0) {
          axis = "y";
        }

        var elDocument = getElementDocument(this.el);
        var elWindow = getElementWindow(this.el);
        var scrollbar = this.axis[axis].scrollbar; // Measure how far the user's mouse is from the top of the scrollbar drag handle.

        var eventOffset = axis === "y" ? e.pageY : e.pageX;
        this.axis[axis].dragOffset =
          eventOffset - scrollbar.rect[this.axis[axis].offsetAttr];
        this.draggedAxis = axis;
        this.el.classList.add(this.classNames.dragging);
        elDocument.addEventListener("mousemove", this.drag, true);
        elDocument.addEventListener("mouseup", this.onEndDrag, true);

        if (this.removePreventClickId === null) {
          elDocument.addEventListener("click", this.preventClick, true);
          elDocument.addEventListener("dblclick", this.preventClick, true);
        } else {
          elWindow.clearTimeout(this.removePreventClickId);
          this.removePreventClickId = null;
        }
      };
      /**
       * Drag scrollbar handle
       */

      _proto.onTrackClick = function onTrackClick(e, axis) {
        var _this4 = this;

        if (axis === void 0) {
          axis = "y";
        }

        if (!this.options.clickOnTrack) return;
        var elWindow = getElementWindow(this.el);
        this.axis[axis].scrollbar.rect =
          this.axis[axis].scrollbar.el.getBoundingClientRect();
        var scrollbar = this.axis[axis].scrollbar;
        var scrollbarOffset = scrollbar.rect[this.axis[axis].offsetAttr];
        var hostSize = parseInt(this.elStyles[this.axis[axis].sizeAttr], 10);
        var scrolled = this.contentWrapperEl[this.axis[axis].scrollOffsetAttr];
        var t =
          axis === "y"
            ? this.mouseY - scrollbarOffset
            : this.mouseX - scrollbarOffset;
        var dir = t < 0 ? -1 : 1;
        var scrollSize = dir === -1 ? scrolled - hostSize : scrolled + hostSize;

        var scrollTo = function scrollTo() {
          if (dir === -1) {
            if (scrolled > scrollSize) {
              var _this4$contentWrapper;

              scrolled -= _this4.options.clickOnTrackSpeed;

              _this4.contentWrapperEl.scrollTo(
                ((_this4$contentWrapper = {}),
                (_this4$contentWrapper[_this4.axis[axis].offsetAttr] =
                  scrolled),
                _this4$contentWrapper)
              );

              elWindow.requestAnimationFrame(scrollTo);
            }
          } else {
            if (scrolled < scrollSize) {
              var _this4$contentWrapper2;

              scrolled += _this4.options.clickOnTrackSpeed;

              _this4.contentWrapperEl.scrollTo(
                ((_this4$contentWrapper2 = {}),
                (_this4$contentWrapper2[_this4.axis[axis].offsetAttr] =
                  scrolled),
                _this4$contentWrapper2)
              );

              elWindow.requestAnimationFrame(scrollTo);
            }
          }
        };

        scrollTo();
      };
      /**
       * Getter for content element
       */

      _proto.getContentElement = function getContentElement() {
        return this.contentEl;
      };
      /**
       * Getter for original scrolling element
       */

      _proto.getScrollElement = function getScrollElement() {
        return this.contentWrapperEl;
      };

      _proto.getScrollbarWidth = function getScrollbarWidth() {
        // Try/catch for FF 56 throwing on undefined computedStyles
        try {
          // Detect browsers supporting CSS scrollbar styling and do not calculate
          if (
            getComputedStyle(this.contentWrapperEl, "::-webkit-scrollbar")
              .display === "none" ||
            "scrollbarWidth" in document.documentElement.style ||
            "-ms-overflow-style" in document.documentElement.style
          ) {
            return 0;
          } else {
            return scrollbarWidth();
          }
        } catch (e) {
          return scrollbarWidth();
        }
      };

      _proto.removeListeners = function removeListeners() {
        var _this5 = this;

        var elWindow = getElementWindow(this.el); // Event listeners

        if (this.options.autoHide) {
          this.el.removeEventListener("mouseenter", this.onMouseEnter);
        }

        ["mousedown", "click", "dblclick"].forEach(function (e) {
          _this5.el.removeEventListener(e, _this5.onPointerEvent, true);
        });
        ["touchstart", "touchend", "touchmove"].forEach(function (e) {
          _this5.el.removeEventListener(e, _this5.onPointerEvent, {
            capture: true,
            passive: true,
          });
        });
        this.el.removeEventListener("mousemove", this.onMouseMove);
        this.el.removeEventListener("mouseleave", this.onMouseLeave);

        if (this.contentWrapperEl) {
          this.contentWrapperEl.removeEventListener("scroll", this.onScroll);
        }

        elWindow.removeEventListener("resize", this.onWindowResize);

        if (this.mutationObserver) {
          this.mutationObserver.disconnect();
        }

        if (this.resizeObserver) {
          this.resizeObserver.disconnect();
        } // Cancel all debounced functions

        this.recalculate.cancel();
        this.onMouseMove.cancel();
        this.hideScrollbars.cancel();
        this.onWindowResize.cancel();
      };
      /**
       * UnMount mutation observer and delete SimpleBar instance from DOM element
       */

      _proto.unMount = function unMount() {
        this.removeListeners();
        SimpleBar.instances.delete(this.el);
      };
      /**
       * Check if mouse is within bounds
       */

      _proto.isWithinBounds = function isWithinBounds(bbox) {
        return (
          this.mouseX >= bbox.left &&
          this.mouseX <= bbox.left + bbox.width &&
          this.mouseY >= bbox.top &&
          this.mouseY <= bbox.top + bbox.height
        );
      };
      /**
       * Find element children matches query
       */

      _proto.findChild = function findChild(el, query) {
        var matches =
          el.matches ||
          el.webkitMatchesSelector ||
          el.mozMatchesSelector ||
          el.msMatchesSelector;
        return Array.prototype.filter.call(el.children, function (child) {
          return matches.call(child, query);
        })[0];
      };

      return SimpleBar;
    })();

  SimpleBar.defaultOptions = {
    autoHide: true,
    forceVisible: false,
    clickOnTrack: true,
    clickOnTrackSpeed: 40,
    classNames: {
      contentEl: "simplebar-content",
      contentWrapper: "simplebar-content-wrapper",
      offset: "simplebar-offset",
      mask: "simplebar-mask",
      wrapper: "simplebar-wrapper",
      placeholder: "simplebar-placeholder",
      scrollbar: "simplebar-scrollbar",
      track: "simplebar-track",
      heightAutoObserverWrapperEl: "simplebar-height-auto-observer-wrapper",
      heightAutoObserverEl: "simplebar-height-auto-observer",
      visible: "simplebar-visible",
      horizontal: "simplebar-horizontal",
      vertical: "simplebar-vertical",
      hover: "simplebar-hover",
      dragging: "simplebar-dragging",
    },
    scrollbarMinSize: 25,
    scrollbarMaxSize: 0,
    timeout: 1000,
  };
  SimpleBar.instances = new WeakMap();

  SimpleBar.initDOMLoadedElements = function () {
    document.removeEventListener(
      "DOMContentLoaded",
      this.initDOMLoadedElements
    );
    window.removeEventListener("load", this.initDOMLoadedElements);
    Array.prototype.forEach.call(
      document.querySelectorAll("[data-simplebar]"),
      function (el) {
        if (
          el.getAttribute("data-simplebar") !== "init" &&
          !SimpleBar.instances.has(el)
        )
          new SimpleBar(el, getOptions(el.attributes));
      }
    );
  };

  SimpleBar.removeObserver = function () {
    this.globalObserver.disconnect();
  };

  SimpleBar.initHtmlApi = function () {
    this.initDOMLoadedElements = this.initDOMLoadedElements.bind(this); // MutationObserver is IE11+

    if (typeof MutationObserver !== "undefined") {
      // Mutation observer to observe dynamically added elements
      this.globalObserver = new MutationObserver(SimpleBar.handleMutations);
      this.globalObserver.observe(document, {
        childList: true,
        subtree: true,
      });
    } // Taken from jQuery `ready` function
    // Instantiate elements already present on the page

    if (
      document.readyState === "complete" ||
      (document.readyState !== "loading" && !document.documentElement.doScroll)
    ) {
      // Handle it asynchronously to allow scripts the opportunity to delay init
      window.setTimeout(this.initDOMLoadedElements);
    } else {
      document.addEventListener("DOMContentLoaded", this.initDOMLoadedElements);
      window.addEventListener("load", this.initDOMLoadedElements);
    }
  };

  SimpleBar.handleMutations = function (mutations) {
    mutations.forEach(function (mutation) {
      Array.prototype.forEach.call(mutation.addedNodes, function (addedNode) {
        if (addedNode.nodeType === 1) {
          if (addedNode.hasAttribute("data-simplebar")) {
            !SimpleBar.instances.has(addedNode) &&
              new SimpleBar(addedNode, getOptions(addedNode.attributes));
          } else {
            Array.prototype.forEach.call(
              addedNode.querySelectorAll("[data-simplebar]"),
              function (el) {
                if (
                  el.getAttribute("data-simplebar") !== "init" &&
                  !SimpleBar.instances.has(el)
                )
                  new SimpleBar(el, getOptions(el.attributes));
              }
            );
          }
        }
      });
      Array.prototype.forEach.call(
        mutation.removedNodes,
        function (removedNode) {
          if (removedNode.nodeType === 1) {
            if (removedNode.hasAttribute('[data-simplebar="init"]')) {
              SimpleBar.instances.has(removedNode) &&
                SimpleBar.instances.get(removedNode).unMount();
            } else {
              Array.prototype.forEach.call(
                removedNode.querySelectorAll('[data-simplebar="init"]'),
                function (el) {
                  SimpleBar.instances.has(el) &&
                    SimpleBar.instances.get(el).unMount();
                }
              );
            }
          }
        }
      );
    });
  };

  SimpleBar.getOptions = getOptions;
  /**
   * HTML API
   * Called only in a browser env.
   */

  if (canUseDom) {
    SimpleBar.initHtmlApi();
  }
  //# sourceMappingURL=simplebar.esm.js.map

  const contactRequest = fetch("/getContact.php").then((r) => r.json());

  contactRequest.then((data) => {
    document.querySelectorAll("[data-contact-phone]").forEach((el) => {
      el.href = `tel:${data.phone}`;
    });
    document.querySelectorAll("[data-contact-name]").forEach((el) => {
      el.innerText = data.name;
    });
    document.querySelectorAll("[data-contact-phone-text]").forEach((el) => {
      el.innerText = data.phone;
    });
    document.querySelectorAll("[data-contact-photo]").forEach((el) => {
      el.dataset.src = data.photo;
    });
  });

  Swiper.use([Navigation$1]);

  new Swiper(".team_slider", {
    slidesPerView: 1,
    spaceBetween: 0,
    autoHeight: true,
    navigation: {
      prevEl: ".team_slider__btn.slider_btn--prev",
      nextEl: ".team_slider__btn.slider_btn--next",
    },
    watchSlidesVisibility: 1,
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });

  const lazyLoadInstance = new LazyLoad({
    elements_selector: "[data-lazy]",
  });

  document.querySelectorAll(".contacts__block").forEach((el) => {
    el.addEventListener("mouseover", (_) => {
      document
        .querySelector(".contacts__block.is-active")
        .classList.remove("is-active");
      el.classList.add("is-active");
    });
  });

  document.querySelectorAll("[name=phone]").forEach((el) => {
    let mask;
    el.addEventListener("focus", (_) => {
      mask = IMask(el, {
        mask: "+{7}(000)000-00-00",
        lazy: false,
      });
    });
    el.addEventListener("blur", (_) => {
      if (mask && mask.unmaskedValue.length < 11) {
        mask.destroy();
        el.value = "";
      }
    });
  });

  document.querySelectorAll("[data-dropdown]").forEach((el) => {
    new Dropdown(el);
  });

  ModalDispatcher.init();

  const headerAnchorsHandler = ((_) => {
    let current = null;

    const anchorLinks = document.querySelectorAll("[data-anchor]");

    anchorLinks.forEach((link) => {
      link.addEventListener("click", (_) => {
        const target = document.querySelector(
          `[data-scroll-id=${link.dataset.anchor}]`
        );
        scroll.scrollTo(target, { offset: -100 });
      });
    });

    const setActive = (key) => {
      if (key === current) return;

      anchorLinks.forEach((link) => {
        link.classList.remove("is-active");
        link.blur();
      });

      const activeLink = [...anchorLinks].find(
        (el) => el.dataset.anchor === key
      );

      if (!activeLink) return;
      activeLink.classList.add("is-active");
      current = key;
    };

    return {
      setActive: setActive,
    };
  })();

  const scroll = new Smooth({ getDirection: true });

  scroll.on("scroll", (args) => {
    if (args.scroll.y > 100) {
      document.body.dataset.scrollDirection = args.direction;
    } else {
      document.body.dataset.scrollDirection = "";
    }

    const els = args.currentElements;

    const max = {
      key: null,
      progress: 0.15,
    };
    Object.keys(els).forEach((key) => {
      if (els[key].el.dataset.scrollId) {
        if (
          els[key].progress > 0.1 &&
          els[key].progress < 0.8 &&
          els[key].progress >= max.progress
        ) {
          max.key = key;
          max.progress = els[key].progress;
        }
      }
    });

    headerAnchorsHandler.setActive(max.key);
  });

  document.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const data = new FormData(form);
    form.classList.add("on-request");

    fetch("/mailer.php", {
      method: "POST",
      body: data,
    })
      .then((r) => r.text())
      .then((r) => {
        form.classList.remove("on-request");
        form.classList.add("on-success");
        if (!form.closest(".modal")) {
          document.dispatchEvent(
            new CustomEvent("needModal", { detail: "success" })
          );
        }
        form.reset();
      });
  });

  document.querySelectorAll("[data-expand-toggle]").forEach((el) => {
    el.addEventListener("click", (_) => {
      el.closest("[data-expand-target]").classList.add("is-expanded");
      scroll.update();
    });
  });

  if (window.matchMedia("(min-width: 768px)").matches) {
    new SimpleBar(document.querySelector(".modal_text__scroll_container"));
  }
})();
