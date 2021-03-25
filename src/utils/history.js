const History = {
  _history: [],
  install (Vue) {
    Object.defineProperty(Vue.prototype, '$routerHistory', {
      get () {
        return History
      }
    })
  },
  push (path) {
    this._history.push(path)
  },
  pop () {
    this._history.pop()
  },
  canBack () {
    return this._history.length > 0
  },
  data () {
    return this._history
  },
  datalen () {
    return this._history.length
  },
  dataBack (_history) {
    if (_history !== null && _history !== undefined && _history.length > 0) {
      _history = _history[_history.length - 1]
    }
    return _history
  },
  dataNull () {
    this._history = []
  }
}
export default History
