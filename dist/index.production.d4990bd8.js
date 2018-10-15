// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"scripts/index.production.js":[function(require,module,exports) {
"use strict";

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof2(call) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof2(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var GAME_STEP = {
  WELCOME: 0,
  GAME_SETUP: 2,
  PLAYERS_SETUP: 3,
  NIGHT: 4,
  GENERATOR: 99
};
var PLAYER_ROLES = {
  Mafia: {
    text: "Mafiot",
    id: 0
  },
  Godfather: {
    text: "Godfather",
    id: 1
  },
  Serialkiller: {
    text: "Serial killer",
    id: 2
  },
  Veteran: {
    text: "Veteran",
    id: 3
  },
  Vigilante: {
    text: "Vigilentul",
    id: 4
  },
  Policeman: {
    text: "Politist",
    id: 5
  },
  Doctor: {
    text: "Medic",
    id: 6
  },
  Mayor: {
    text: "Primar",
    id: 7
  },
  Clown: {
    text: "Mascarici",
    id: 8
  },
  Citizen: {
    text: "Cetatean",
    id: 9
  }
};

function roleIsInnocent(role) {
  return !(role == "Mafia" || role == "Serialkiller");
}

var NIGHT_ROUND = {
  Mafia: 0,
  Serialkiller: 1,
  Vigilante: 2,
  Veteran: 3,
  Police: 4,
  Doctor: 5,
  Clown: 6,
  Town: 7,
  _toText: function _toText(round) {
    switch (round) {
      case NIGHT_ROUND.Mafia:
        return "Mafia";

      case NIGHT_ROUND.Serialkiller:
        return "Serialkillerului";

      case NIGHT_ROUND.Vigilante:
        return "Vigilentului";

      case NIGHT_ROUND.Veteran:
        return "Veteranului";

      case NIGHT_ROUND.Police:
        return "Politistii";

      case NIGHT_ROUND.Doctor:
        return "Doctorii";

      case NIGHT_ROUND.Clown:
        return "Mascariciului";

      case NIGHT_ROUND.Town:
        return "Orasul";
    }

    return "Error";
  },
  _toText2: function _toText2(round) {
    switch (round) {
      case NIGHT_ROUND.Mafia:
        return "Mafia";

      case NIGHT_ROUND.Serialkiller:
        return "Serialkillerul";

      case NIGHT_ROUND.Vigilante:
        return "Vigilentul";

      case NIGHT_ROUND.Veteran:
        return "Veteranul";

      case NIGHT_ROUND.Police:
        return "Politistii";

      case NIGHT_ROUND.Doctor:
        return "Doctorii";

      case NIGHT_ROUND.Clown:
        return "Mascariciul";

      case NIGHT_ROUND.Town:
        return "Orasul";
    }

    return "Error";
  },
  _toRoundText: function _toRoundText(round) {
    switch (round) {
      case NIGHT_ROUND.Mafia:
        return "Runda mafiotilor";

      case NIGHT_ROUND.Serialkiller:
        return "Runda serialkillerului";

      case NIGHT_ROUND.Vigilante:
        return "Runda vigilentului";

      case NIGHT_ROUND.Veteran:
        return "Runda veteranului";

      case NIGHT_ROUND.Police:
        return "Runda politistilor";

      case NIGHT_ROUND.Doctor:
        return "Runda doctorilor";

      case NIGHT_ROUND.Clown:
        return "Runda mascariciului";
    }

    return "Error";
  },
  _roleIsForThisRound: function _roleIsForThisRound(round, role) {
    switch (round) {
      case NIGHT_ROUND.Mafia:
        return role == "Mafia" || role == "Godfather";

      case NIGHT_ROUND.Serialkiller:
        return role == "Serialkiller";

      case NIGHT_ROUND.Vigilante:
        return role == "Vigilante";

      case NIGHT_ROUND.Veteran:
        return role == "Veteran";

      case NIGHT_ROUND.Police:
        return role == "Policeman";

      case NIGHT_ROUND.Doctor:
        return role == "Doctor";

      case NIGHT_ROUND.Clown:
        return role == "Clown";
    }

    return false;
  }
};
var ROUND_ACTION = {
  SAVED_BY_DOCTOR: 0,
  KILLED_IN_NIGHT: 1,
  LYNCHED: 2,
  SELF_DEFENCE: 3,
  GUILTY: 4,
  INNOCENT: 5,
  NOTHING: 6
};
var DEFAULT_ROUNDS_ORDER = [NIGHT_ROUND.Mafia, NIGHT_ROUND.Serialkiller, NIGHT_ROUND.Police, NIGHT_ROUND.Vigilante, NIGHT_ROUND.Doctor, NIGHT_ROUND.Veteran];
var DEFAULT_PLAYER = {
  name: "",
  role: "Citizen",
  alive: true
};
var DEFAULT_GAME_SETTINGS = {};

function createHashFromPlayers(players) {
  var hash = "";

  for (var i = 0, length = players.length; i < length; ++i) {
    hash += players[i].name + "|" + PLAYER_ROLES[players[i].role].id + "|" + (players[i].alive ? "1" : "0") + "&";
  }

  return hash;
}

var WelcomePage = function (_React$Component) {
  _inherits(WelcomePage, _React$Component);

  function WelcomePage() {
    _classCallCheck(this, WelcomePage);

    return _possibleConstructorReturn(this, (WelcomePage.__proto__ || Object.getPrototypeOf(WelcomePage)).apply(this, arguments));
  }

  _createClass(WelcomePage, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement("div", {
        id: "welcomePage",
        className: "main"
      }, React.createElement("h1", null, "Mafia Storyteller Helper"), React.createElement("h2", null, "Created by Aykelith@NiAl"), React.createElement("button", {
        id: "startBtn",
        onClick: function onClick() {
          _this2.props.parent.state.gameStep = GAME_STEP.GAME_SETUP;

          _this2.props.parent.setState(_this2.props.parent.state);
        }
      }, "Start"), React.createElement("button", {
        id: "generatorBtn",
        onClick: function onClick() {}
      }, "Generator"));
    }
  }]);

  return WelcomePage;
}(React.Component);

;

var GameSetupPage = function (_React$Component2) {
  _inherits(GameSetupPage, _React$Component2);

  function GameSetupPage() {
    _classCallCheck(this, GameSetupPage);

    return _possibleConstructorReturn(this, (GameSetupPage.__proto__ || Object.getPrototypeOf(GameSetupPage)).apply(this, arguments));
  }

  _createClass(GameSetupPage, [{
    key: "render",
    value: function render() {
      var _this4 = this;

      return React.createElement("div", {
        id: "gameSetupPage",
        className: "main"
      }, React.createElement("h2", null, "Game Setup"), React.createElement("div", {
        className: "block"
      }, React.createElement("div", null, "Ordinea noptilor:"), React.createElement("div", {
        id: "nightsOrderCnt"
      }, this.props.parent.state.nightOrder.map(function (round) {
        return React.createElement("div", {
          key: "round" + round
        }, React.createElement("span", null, NIGHT_ROUND._toText2(round)), React.createElement("div", null));
      }))), React.createElement("button", {
        onClick: function onClick() {
          _this4.props.parent.state.gameStep = GAME_STEP.PLAYERS_SETUP;

          _this4.props.parent.setState(_this4.props.parent.state);
        }
      }, "Urmatorul"));
    }
  }]);

  return GameSetupPage;
}(React.Component);

var PlayersSetupPage = function (_React$Component3) {
  _inherits(PlayersSetupPage, _React$Component3);

  function PlayersSetupPage(props) {
    _classCallCheck(this, PlayersSetupPage);

    var _this5 = _possibleConstructorReturn(this, (PlayersSetupPage.__proto__ || Object.getPrototypeOf(PlayersSetupPage)).call(this, props));

    if (window.debugMode) {
      _this5.props.parent.state.players = [{
        name: "Mafia 1",
        role: "Mafia",
        alive: true
      }, {
        name: "Mafia 2",
        role: "Mafia",
        alive: true
      }, {
        name: "Godfather",
        role: "Godfather",
        alive: true
      }, {
        name: "Policeman",
        role: "Policeman",
        alive: true
      }, {
        name: "Policeman 2",
        role: "Policeman",
        alive: true
      }, {
        name: "Veteran",
        role: "Veteran",
        alive: true,
        timesUsedBullet: 0
      }, {
        name: "Vigilante",
        role: "Vigilante",
        alive: true
      }, {
        name: "Doctor",
        role: "Doctor",
        alive: true,
        timesSavedHimself: 0
      }, {
        name: "Mayor",
        role: "Mayor",
        alive: true
      }, {
        name: "Clown",
        role: "Clown",
        alive: true
      }, {
        name: "Serialkiller",
        role: "Serialkiller",
        alive: true
      }];
    }

    return _this5;
  }

  _createClass(PlayersSetupPage, [{
    key: "render",
    value: function render() {
      var _this6 = this;

      return React.createElement("div", {
        id: "playersSetupPage",
        className: "main"
      }, React.createElement("h2", null, "Players setup"), React.createElement("div", null, React.createElement("span", null, "Numarul de jucatori: "), React.createElement("input", {
        type: "number",
        value: this.props.parent.state.players.length,
        onClick: function onClick(e) {
          return e.target.select();
        },
        onChange: function onChange(e) {
          var value = parseInt(e.target.value);

          if (value == 0) {
            _this6.props.parent.state.players = [];
            return;
          }

          _this6.props.parent.state.players.length = value;

          for (var i = 0, length = _this6.props.parent.state.players.length; i < length; ++i) {
            if (!_this6.props.parent.state.players[i]) {
              _this6.props.parent.state.players[i] = Object.assign({}, DEFAULT_PLAYER);
            }
          }

          _this6.props.parent.setState(_this6.props.parent.state);
        }
      })), React.createElement("table", null, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, "Nr"), React.createElement("th", null, "Nume"), React.createElement("th", null, "Rol"), React.createElement("th", null))), React.createElement("tbody", null, this.props.parent.state.players.map(function (player, index) {
        return React.createElement("tr", {
          key: "player" + index
        }, React.createElement("td", null, index), React.createElement("td", null, React.createElement("input", {
          type: "text",
          value: player.name,
          onChange: function onChange(e) {
            _this6.props.parent.state.players[index].name = e.target.value;

            _this6.props.parent.setState(_this6.props.parent.state);
          }
        })), React.createElement("td", null, React.createElement("select", {
          value: player.role,
          onChange: function onChange(e) {
            _this6.props.parent.state.players[index].role = e.target.value;

            if (e.target.value == "Doctor") {
              _this6.props.parent.state.players[index].timesSavedHimself = 0;
            }

            if (e.target.value == "Veteran") {
              _this6.props.parent.state.players[index].timesUsedBullet = 0;
            }

            _this6.props.parent.setState(_this6.props.parent.state);
          }
        }, Object.keys(PLAYER_ROLES).map(function (role) {
          return React.createElement("option", {
            key: role,
            value: role
          }, PLAYER_ROLES[role].text);
        }))), React.createElement("td", null));
      }))), React.createElement("button", {
        onClick: function onClick() {
          _this6.props.parent.state.gameStep = GAME_STEP.NIGHT;
          console.log(_this6.props.parent.state.players);

          _this6.props.parent.setState(_this6.props.parent.state);
        }
      }, "Incepe jocul"));
    }
  }]);

  return PlayersSetupPage;
}(React.Component);

var NightPage = function (_React$Component4) {
  _inherits(NightPage, _React$Component4);

  function NightPage(props) {
    _classCallCheck(this, NightPage);

    var _this7 = _possibleConstructorReturn(this, (NightPage.__proto__ || Object.getPrototypeOf(NightPage)).call(this, props));

    _this7.state = {};
    _this7.calculateNight = _this7.calculateNight.bind(_this7);
    _this7.renderPlayer = _this7.renderPlayer.bind(_this7);
    _this7.renderDay = _this7.renderDay.bind(_this7);
    _this7.renderNight = _this7.renderNight.bind(_this7);
    _this7.renderSelectable = _this7.renderSelectable.bind(_this7);
    _this7.renderVeteran = _this7.renderVeteran.bind(_this7);
    _this7.wasProtectedByDoctor = _this7.wasProtectedByDoctor.bind(_this7);
    _this7.wasSelfDefence = _this7.wasSelfDefence.bind(_this7);
    _this7.isGuilty = _this7.isGuilty.bind(_this7);
    _this7.getRoleIndex = _this7.getRoleIndex.bind(_this7);
    _this7.getNameIndex = _this7.getNameIndex.bind(_this7);
    _this7.getRoleAlive = _this7.getRoleAlive.bind(_this7);
    _this7.countSpecial = _this7.countSpecial.bind(_this7);
    _this7.resetBetweenRounds = _this7.resetBetweenRounds.bind(_this7);
    _this7.prepareForNextNight = _this7.prepareForNextNight.bind(_this7);
    _this7.getResultMessage = _this7.getResultMessage.bind(_this7);
    return _this7;
  }

  _createClass(NightPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.parent.createHash();
    }
  }, {
    key: "wasProtectedByDoctor",
    value: function wasProtectedByDoctor(index) {
      return this.props.parent.state.night.doctorSelected == index;
    }
  }, {
    key: "wasSelfDefence",
    value: function wasSelfDefence(index) {
      return this.props.parent.state.night.veteranSelected == index;
    }
  }, {
    key: "isGuilty",
    value: function isGuilty(index) {
      return ['Mafia', 'Serialkiller'].includes(this.props.parent.state.players[index].role);
    }
  }, {
    key: "getRoleIndex",
    value: function getRoleIndex(role) {
      for (var i = 0, length = this.props.parent.state.players.length; i < length; ++i) {
        if (this.props.parent.state.players[i].role == role && this.props.parent.state.players[i].alive) return i;
      }

      return null;
    }
  }, {
    key: "getRoleAlive",
    value: function getRoleAlive(role) {
      return this.props.parent.state.players.filter(function (player) {
        return NIGHT_ROUND._roleIsForThisRound(role, player.role) && player.alive;
      });
    }
  }, {
    key: "getNameIndex",
    value: function getNameIndex(name) {
      for (var i = 0, length = this.props.parent.state.players.length; i < length; ++i) {
        if (this.props.parent.state.players[i].name == name) return i;
      }

      return null;
    }
  }, {
    key: "countSpecial",
    value: function countSpecial(special) {
      var count = 0;

      for (var i = 0, length = this.props.parent.state.players.length; i < length; ++i) {
        if (this.props.parent.state.players[i][special]) count += this.props.parent.state.players[i][special];
      }

      return count;
    }
  }, {
    key: "resetBetweenRounds",
    value: function resetBetweenRounds() {
      this.state.selectedPlayer = null;
      this.state.auxSelected = null;
      this.state.auxUnique = false;
      this.state.auxActivated = false;
      this.state.veteranButton = null;
    }
  }, {
    key: "prepareForNextNight",
    value: function prepareForNextNight(vampireMode) {
      this.props.parent.state.nightCurrentState = vampireMode ? NIGHT_ROUND.Clown : this.props.parent.state.nightOrder[this.props.parent.state.nightCurrentOrderIndex];

      if (this.props.parent.state.nightCurrentState == NIGHT_ROUND.Doctor) {
        this.state.auxActivated = true;
        this.state.auxUnique = true;
      }
    }
  }, {
    key: "calculateNight",
    value: function calculateNight() {
      var night = this.props.parent.state.night;
      night.veteranKills = [];
      var veteranUsedTheBullet = false;
      console.log("NIGHT", night);

      if (night.townSelected != null) {
        console.log("TOWN", night.townSelected, this.props.parent.state.players[night.townSelected]);
        night.townSelected = {
          id: night.townSelected,
          action: ROUND_ACTION.KILLED_IN_NIGHT
        };
      }

      if (night.mafiaSelected != null) {
        console.log("MAFIA", night.mafiaSelected, this.props.parent.state.players[night.mafiaSelected]);
        var action = void 0;

        if (this.wasSelfDefence(night.mafiaSelected)) {
          console.log("   ", "WAS SELF DEFENCE", veteranUsedTheBullet);

          if (!veteranUsedTheBullet) {
            ++this.props.parent.state.players[night.mafiaSelected].timesUsedBullet;
            veteranUsedTheBullet = true;
          }

          var id = this.getRoleIndex('Godfather');
          night.veteranKills.push(id);
          this.props.parent.state.players[id].alive = false;
          action = ROUND_ACTION.SELF_DEFENCE;
        } else if (this.wasProtectedByDoctor(night.mafiaSelected)) {
          console.log("   ", "WAS PROTECTED BY DOCTOR");
          action = ROUND_ACTION.SAVED_BY_DOCTOR;
        } else {
          var selectedPlayerRole = this.props.parent.state.players[night.mafiaSelected].role;

          if (selectedPlayerRole == "Serialkiller") {
            action = ROUND_ACTION.NOTHING;
          } else {
            this.props.parent.state.players[night.mafiaSelected].alive = false;
            action = ROUND_ACTION.KILLED_IN_NIGHT;
          }
        }

        night.mafiaSelected = {
          id: night.mafiaSelected,
          action: action
        };
      }

      if (night.serialkillerSelected != null) {
        console.log("SERIALKILLER", night.serialkillerSelected, this.props.parent.state.players[night.serialkillerSelected]);

        var _action = void 0;

        if (this.wasSelfDefence(night.serialkillerSelected)) {
          console.log("   ", "WAS SELF DEFENCE", veteranUsedTheBullet);

          if (!veteranUsedTheBullet) {
            ++this.props.parent.state.players[night.serialkillerSelected].timesUsedBullet;
            veteranUsedTheBullet = true;
          }

          var _id = this.getRoleIndex('Serialkiller');

          night.veteranKills.push(_id);
          this.props.parent.state.players[_id].alive = false;
          _action = ROUND_ACTION.SELF_DEFENCE;
        } else if (this.wasProtectedByDoctor(night.serialkillerSelected)) {
          console.log("   ", "WAS PROTECTED BY DOCTOR");
          _action = ROUND_ACTION.SAVED_BY_DOCTOR;
        } else {
          var _selectedPlayerRole = this.props.parent.state.players[night.serialkillerSelected].role;

          if (_selectedPlayerRole == "Mafia" || _selectedPlayerRole == "Godfather") {
            _action = ROUND_ACTION.NOTHING;
          } else {
            this.props.parent.state.players[night.serialkillerSelected].alive = false;
            _action = ROUND_ACTION.KILLED_IN_NIGHT;
          }
        }

        night.serialkillerSelected = {
          id: night.serialkillerSelected,
          action: _action
        };
      }

      if (night.vigilanteSelected != null) {
        console.log("VIGILANTE", night.vigilanteSelected, this.props.parent.state.players[night.vigilanteSelected]);

        var _action2 = void 0;

        if (this.wasSelfDefence(night.vigilanteSelected)) {
          console.log("   ", "WAS SELF DEFENCE", veteranUsedTheBullet);

          if (!veteranUsedTheBullet) {
            ++this.props.parent.state.players[night.vigilanteSelected].timesUsedBullet;
            veteranUsedTheBullet = true;
          }

          var _id2 = this.getRoleIndex('Vigilante');

          night.veteranKills.push(_id2);
          this.props.parent.state.players[_id2].alive = false;
          _action2 = ROUND_ACTION.SELF_DEFENCE;
        } else if (this.wasProtectedByDoctor(night.vigilanteSelected)) {
          console.log("   ", "WAS PROTECTED BY DOCTOR");
          _action2 = ROUND_ACTION.SAVED_BY_DOCTOR;
        } else {
          this.props.parent.state.players[night.vigilanteSelected].alive = false;
          _action2 = ROUND_ACTION.KILLED_IN_NIGHT;
        }

        night.vigilanteSelected = {
          id: night.vigilanteSelected,
          action: _action2
        };
      }

      if (night.clownSelected != null) {
        console.log("CLOWN POWER");
        night.clownSelected = {
          id: night.clownSelected,
          action: ROUND_ACTION.KILLED_IN_NIGHT
        };
      }

      if (night.policeSelected != null) {
        console.log("POLICE", night.policeSelected, this.props.parent.state.players[night.policeSelected]);

        var _action3 = void 0;

        if (this.wasSelfDefence(night.policeSelected)) {
          console.log("   ", "WAS SELF DEFENCE", veteranUsedTheBullet, night.policeVeteranSelected, this.props.parent.state.players[night.policeVeteranSelected]);

          if (!veteranUsedTheBullet) {
            ++this.props.parent.state.players[night.policeSelected].timesUsedBullet;
            veteranUsedTheBullet = true;
          }

          this.props.parent.state.players[night.policeVeteranSelected].alive = false;
          _action3 = ROUND_ACTION.SELF_DEFENCE;
        } else {
          _action3 = 999;
        }

        night.policeSelected = {
          id: night.policeSelected,
          police: this.isGuilty(night.policeSelected) ? ROUND_ACTION.GUILTY : ROUND_ACTION.INNOCENT,
          action: _action3
        };
      }

      if (night.doctorSelected != null) {
        console.log("DOCTOR", night.doctorSelected, this.props.parent.state.players[night.doctorSelected]);

        if (this.wasSelfDefence(night.doctorSelected)) {
          if (!night.doctorVeteranSelected) night.doctorVeteranSelected = this.getRoleIndex("Doctor");
          console.log("   ", "WAS SELF DEFENCE", veteranUsedTheBullet, night.doctorVeteranSelected, this.props.parent.state.players[night.doctorVeteranSelected]);

          if (!veteranUsedTheBullet) {
            ++this.props.parent.state.players[night.doctorSelected].timesUsedBullet;
            veteranUsedTheBullet = true;
          }

          this.props.parent.state.players[night.doctorVeteranSelected].alive = false;
        } else if (this.props.parent.state.players[night.doctorSelected].role == "Doctor") {
          ++this.props.parent.state.players[night.doctorSelected].timesSavedHimself;
        }

        night.doctorSelected = {
          id: night.doctorSelected
        };
      }

      if (night.veteranSelected != null && !veteranUsedTheBullet) {
        ++this.props.parent.state.players[night.veteranSelected].timesUsedBullet;
        veteranUsedTheBullet = true;
      }
    }
  }, {
    key: "renderPlayer",
    value: function renderPlayer(player, settings) {
      return React.createElement("div", {
        onClick: settings.onClick,
        className: player.role + " " + (settings.className || "")
      }, React.createElement("div", null, player.name, " ", window.debugMode && React.createElement("span", null, "(", this.getNameIndex(player.name), ")")), React.createElement("div", null, settings.role ? settings.role(player) : PLAYER_ROLES[player.role].text));
    }
  }, {
    key: "getResultMessage",
    value: function getResultMessage(round, result, className) {
      console.log(NIGHT_ROUND._toText(round), result);

      if (result == null) {
        if (round == NIGHT_ROUND.Town) {
          return React.createElement("div", null, React.createElement("span", null, "Orasul a decis sa nu omoare pe nimeni"));
        }

        if (round == NIGHT_ROUND.Vigilante) {
          return React.createElement("div", {
            className: className
          }, React.createElement("span", null, "Vigilentul a ales sa nu omoare"));
        }

        if (round == NIGHT_ROUND.Veteran) {
          return React.createElement("div", {
            className: className
          }, React.createElement("span", null, "Veteranul a ales sa nu-si foloseasca glontul"));
        }

        return null;
      }

      if (round == NIGHT_ROUND.Veteran) {
        var message = "Veteranul si-a folosit glontul si-a omorat pe: ";
        var count = this.props.parent.state.night.veteranKills.length;

        for (var i = 0, length = this.props.parent.state.night.veteranKills.length; i < length; ++i) {
          message += "<b>" + this.props.parent.state.players[this.props.parent.state.night.veteranKills[i]].name + "(" + PLAYER_ROLES[this.props.parent.state.players[this.props.parent.state.night.veteranKills[i]].role].text + ")</b>,";
        }

        if (this.props.parent.state.night.policeVeteranSelected) {
          ++count;
          message += "<b>" + this.props.parent.state.players[this.props.parent.state.night.policeVeteranSelected].name + "(" + PLAYER_ROLES[this.props.parent.state.players[this.props.parent.state.night.policeVeteranSelected].role].text + ")</b>,";
        }

        if (this.props.parent.state.night.doctorVeteranSelected) {
          ++count;
          message += "<b>" + this.props.parent.state.players[this.props.parent.state.night.doctorVeteranSelected].name + "(" + PLAYER_ROLES[this.props.parent.state.players[this.props.parent.state.night.doctorVeteranSelected].role].text + ")</b>,";
        }

        return React.createElement("div", {
          className: className
        }, count > 0 ? React.createElement("span", {
          dangerouslySetInnerHTML: {
            __html: message
          }
        }) : "Veteranul si-a folosit glontul dar nu a omorat pe nimeni!");
      }

      if (round == NIGHT_ROUND.Doctor) {
        var person = React.createElement("b", null, this.props.parent.state.players[result.id].name, "(", PLAYER_ROLES[this.props.parent.state.players[result.id].role].text, ")");

        for (var roundName in this.props.parent.state.night) {
          var _result = this.props.parent.state.night[roundName];

          if ((typeof _result === "undefined" ? "undefined" : _typeof(_result)) == 'object' && _result && _result.action == ROUND_ACTION.SAVED_BY_DOCTOR) {
            return React.createElement("div", {
              className: className
            }, React.createElement("span", null, "Doctorii au salvat pe cine trebuia! (", person, ")"));
          }
        }

        return React.createElement("div", {
          className: className
        }, React.createElement("span", null, "Doctorii nu au salvat pe cine trebuia! (", person, ")"));
      }

      if (round == NIGHT_ROUND.Police) {
        return React.createElement("div", {
          className: className
        }, React.createElement("span", null, "Politistii au ales si a iesit ", result.police == ROUND_ACTION.GUILTY ? "necurat" : "curat", " (", React.createElement("b", null, this.props.parent.state.players[result.id].name, "(", PLAYER_ROLES[this.props.parent.state.players[result.id].role].text, ")"), ")"));
      }

      if (result.action == ROUND_ACTION.KILLED_IN_NIGHT) {
        return React.createElement("div", {
          className: className
        }, React.createElement("span", null, NIGHT_ROUND._toText2(round), " au omorat pe ", React.createElement("b", null, this.props.parent.state.players[result.id].name, "(", PLAYER_ROLES[this.props.parent.state.players[result.id].role].text, ")")));
      } else if (result.action == ROUND_ACTION.SAVED_BY_DOCTOR || result.action == ROUND_ACTION.SELF_DEFENCE) {
        return React.createElement("div", {
          className: className
        }, React.createElement("span", null, NIGHT_ROUND._toText2(round), " nu au reusit sa omoare pe nimeni (", React.createElement("b", null, this.props.parent.state.players[result.id].name, "(", PLAYER_ROLES[this.props.parent.state.players[result.id].role].text, ")"), ")"));
      }

      if (result.action == ROUND_ACTION.NOTHING) {
        return React.createElement("div", {
          className: className
        }, React.createElement("span", null, NIGHT_ROUND._toText2(round), " nu au omorat pe nimeni (", React.createElement("b", null, this.props.parent.state.players[result.id].name, "(", PLAYER_ROLES[this.props.parent.state.players[result.id].role].text, ")"), ")"));
      }

      return null;
    }
  }, {
    key: "renderDay",
    value: function renderDay() {
      var _this8 = this;

      console.log("RRR", this.props.parent.state.night);
      return React.createElement("div", {
        id: "nightPage_day",
        className: "main"
      }, React.createElement("h2", {
        id: "dayNumber"
      }, "Ziua ", this.props.parent.state.dayNumber), this.props.parent.state.night && React.createElement("div", {
        className: "playersStatusCnt"
      }, React.createElement("h3", null, "Noaptea trecuta"), this.getResultMessage(NIGHT_ROUND.Town, this.props.parent.state.night.townSelected), this.getResultMessage(NIGHT_ROUND.Mafia, this.props.parent.state.night.mafiaSelected, "Mafia"), this.getResultMessage(NIGHT_ROUND.Serialkiller, this.props.parent.state.night.serialkillerSelected, "Serialkiller"), this.getResultMessage(NIGHT_ROUND.Police, this.props.parent.state.night.policeSelected, "Policeman"), this.getResultMessage(NIGHT_ROUND.Vigilante, this.props.parent.state.night.vigilanteSelected, "Vigilante"), this.getResultMessage(NIGHT_ROUND.Doctor, this.props.parent.state.night.doctorSelected, "Doctor"), this.getResultMessage(NIGHT_ROUND.Veteran, this.props.parent.state.night.veteranSelected, "Veteran"), this.getResultMessage(NIGHT_ROUND.Clown, this.props.parent.state.night.clownSelected, "Clown")), React.createElement("div", {
        className: "playersStatusCnt"
      }, React.createElement("h3", null, "Lista jucatori"), React.createElement("h4", null, "(selecteaza un jucator pentru a-l linsa)"), this.props.parent.state.players.map(function (player, index) {
        var index2 = _this8.getNameIndex(player.name);

        return _this8.renderPlayer(player, {
          className: (_this8.state.selectedPlayer == index2 ? "selected" : "") + " " + (!player.alive ? "deleted" : ""),
          onClick: function onClick() {
            if (!player.alive) return;
            _this8.state.selectedPlayer = _this8.state.selectedPlayer == index2 ? null : index2;

            _this8.setState(_this8.state);
          }
        });
      })), React.createElement("button", {
        id: "startNightBtn",
        onClick: function onClick(e) {
          _this8.props.parent.state.night = {
            townSelected: _this8.state.selectedPlayer
          };

          if (_this8.state.selectedPlayer) {
            _this8.props.parent.state.players[_this8.state.selectedPlayer].alive = false;

            if (_this8.props.parent.state.players[_this8.state.selectedPlayer].role == "Clown") {
              _this8.state.vampireMode = true;
            }
          }

          _this8.state.selectedPlayer = null;
          _this8.state.auxSelected = null;
          _this8.state.auxActivated = false;
          _this8.state.auxUnique = false;
          _this8.state.veteranButton = null;
          _this8.props.parent.state.isNight = true;
          ++_this8.props.parent.state.dayNumber;
          _this8.props.parent.state.nightCurrentState = _this8.props.parent.state.nightOrder[0];
          _this8.props.parent.state.nightCurrentOrderIndex = 0;

          if (_this8.getRoleIndex("Godfather") == null) {
            _this8.state.auxActivated = true;
          }

          _this8.props.parent.setState(_this8.props.parent.state, function () {
            window.scrollTo(0, 0);
          });

          console.log("PLAYERS", _this8.props.parent.state.players);
        }
      }, "Incepe noaptea"));
    }
  }, {
    key: "renderSelectable",
    value: function renderSelectable(settings) {
      var _this9 = this;

      console.log("SETTINGS", settings);
      return React.createElement("div", {
        id: "mafiaStep",
        className: "nightStep"
      }, React.createElement("div", {
        className: "playersStatusCnt"
      }, React.createElement("h3", null, settings.title), React.createElement("h4", null, settings.subtitle), this.props.parent.state.players.filter(function (player) {
        return !NIGHT_ROUND._roleIsForThisRound(_this9.props.parent.state.nightCurrentState, player.role) && player.alive;
      }).sort(settings.filter ? settings.filter : function (player1, player2) {
        return player1.role > player2.role;
      }).map(function (player, index) {
        var index2 = _this9.getNameIndex(player.name);

        return _this9.renderPlayer(player, Object.assign({
          className: settings.className ? (_this9.state.selectedPlayer == index2 ? "selected" : "") + " " + settings.className(player, index2) : _this9.state.selectedPlayer == index2 && "selected",
          onClick: function onClick() {
            if (settings.playersLength == 0) return;
            _this9.state.selectedPlayer = _this9.state.selectedPlayer == index2 ? null : index2;
            if (_this9.state.auxUnique) _this9.state.auxSelected = null;

            _this9.setState(_this9.state);
          }
        }, settings.player || {}));
      })));
    }
  }, {
    key: "renderVeteran",
    value: function renderVeteran() {
      var _this10 = this;

      return React.createElement("div", {
        id: "veteranStep",
        className: "nightStep"
      }, React.createElement("h3", null, "Vrei sa folosesti glontul?"), React.createElement("div", {
        id: "buttonsCnt"
      }, React.createElement("button", {
        className: this.state.veteranButton == 1 && 'selected',
        onClick: function onClick() {
          _this10.props.parent.state.night.veteranSelected = _this10.getRoleIndex('Veteran');
          _this10.state.veteranButton = 1;

          _this10.setState(_this10.state);
        }
      }, "Da"), React.createElement("button", {
        className: this.state.veteranButton == 2 && 'selected',
        onClick: function onClick() {
          _this10.props.parent.state.night.veteranSelected = null;
          _this10.state.veteranButton = 2;

          _this10.setState(_this10.state);
        }
      }, "Nu")), this.props.parent.state.night.veteranSelected && this.props.parent.state.night.policeSelected == this.props.parent.state.night.veteranSelected && this.getRoleAlive(NIGHT_ROUND.Police).length > 1 && React.createElement("div", {
        className: "playersStatusCnt"
      }, React.createElement("h3", null, "Lista politisti"), React.createElement("h4", null, "(selecteaza un politist pentru a-l omori)"), this.getRoleAlive(NIGHT_ROUND.Police).map(function (player, index) {
        var index2 = _this10.getNameIndex(player.name);

        return _this10.renderPlayer(player, {
          className: _this10.props.parent.state.night.policeVeteranSelected == index2 && "selected",
          onClick: function onClick() {
            _this10.props.parent.state.night.policeVeteranSelected = _this10.props.parent.state.night.policeVeteranSelected == index2 ? null : index2;

            _this10.props.parent.setState(_this10.props.parent.state);
          }
        });
      })), this.props.parent.state.night.veteranSelected && this.props.parent.state.night.doctorSelected == this.props.parent.state.night.veteranSelected && this.getRoleAlive(NIGHT_ROUND.Doctor).length > 1 && React.createElement("div", {
        className: "playersStatusCnt"
      }, React.createElement("h3", null, "Lista doctori"), React.createElement("h4", null, "(selecteaza un doctor pentru a-l omori)"), this.getRoleAlive(NIGHT_ROUND.Doctor).map(function (player, index) {
        var index2 = _this10.getNameIndex(player.name);

        return _this10.renderPlayer(player, _this10.props.parent.state.night.doctorVeteranSelected == index2 && "selected", function () {
          _this10.props.parent.state.night.doctorVeteranSelected = _this10.props.parent.state.night.doctorVeteranSelected == index2 ? null : index2;

          _this10.props.parent.setState(_this10.props.parent.state);
        });
      })));
    }
  }, {
    key: "renderNight",
    value: function renderNight() {
      var _this11 = this;

      var currentRoundPlayers = this.props.parent.state.players.filter(function (player) {
        return NIGHT_ROUND._roleIsForThisRound(_this11.props.parent.state.nightCurrentState, player.role) && player.alive;
      }).sort(function (player1, player2) {
        return player1.role > player2.role;
      });
      return React.createElement("div", {
        id: "nightPage_night",
        className: "main"
      }, React.createElement("h1", null, NIGHT_ROUND._toRoundText(this.props.parent.state.nightCurrentState)), this.props.parent.state.nightCurrentState == NIGHT_ROUND.Doctor && React.createElement("div", {
        className: "specialCnt"
      }, "Medicii s-or salvat pe ei de ", this.countSpecial("timesSavedHimself"), " ori"), this.props.parent.state.nightCurrentState == NIGHT_ROUND.Veteran && React.createElement("div", {
        className: "specialCnt"
      }, "Veteranul o folosit glontul de ", this.countSpecial("timesUsedBullet"), " ori"), React.createElement("div", {
        className: "playersStatusCnt"
      }, React.createElement("h3", null, "Lista jucatori"), currentRoundPlayers.map(function (player, index) {
        var index2 = _this11.getNameIndex(player.name);

        return _this11.renderPlayer(player, {
          className: _this11.state.auxActivated && _this11.state.auxSelected == index2 && "selected",
          onClick: function onClick() {
            _this11.state.auxSelected = _this11.state.auxSelected == index2 ? null : index2;
            if (_this11.state.auxUnique) _this11.state.selectedPlayer = null;

            _this11.setState(_this11.state);
          }
        });
      })), this.props.parent.state.nightCurrentState == NIGHT_ROUND.Mafia && this.renderSelectable({
        title: "Posibile victime",
        subtitle: "(selecteaza o victima)",
        playersLength: currentRoundPlayers.length
      }), this.props.parent.state.nightCurrentState == NIGHT_ROUND.Serialkiller && this.renderSelectable({
        title: "Posibile victime",
        subtitle: "(selecteaza o victima)",
        playersLength: currentRoundPlayers.length
      }), this.props.parent.state.nightCurrentState == NIGHT_ROUND.Police && this.renderSelectable({
        title: "Posibili criminali",
        subtitle: "(selecteaza un jucator)",
        filter: function filter(player1, player2) {
          return roleIsInnocent(player1.role) > roleIsInnocent(player2.role);
        },
        className: function className(player, index) {
          return roleIsInnocent(player.role) ? "innocent" : "guilty";
        },
        player: {
          role: function role(player) {
            return (roleIsInnocent(player.role) ? "Inocent" : "Vinovant") + " (" + PLAYER_ROLES[player.role].text + ")";
          }
        },
        playersLength: currentRoundPlayers.length
      }), this.props.parent.state.nightCurrentState == NIGHT_ROUND.Vigilante && this.renderSelectable({
        title: "Posibile victime",
        subtitle: "(selecteaza o victima sau nu)",
        playersLength: currentRoundPlayers.length
      }), this.props.parent.state.nightCurrentState == NIGHT_ROUND.Doctor && this.renderSelectable({
        title: "Posibile victime",
        subtitle: "(selecteaza o victima sau nu)",
        playersLength: currentRoundPlayers.length
      }), this.props.parent.state.nightCurrentState == NIGHT_ROUND.Veteran && currentRoundPlayers.length > 0 && this.renderVeteran(), this.props.parent.state.nightCurrentState == NIGHT_ROUND.Clown && this.renderSelectable({
        title: "Posibile victime",
        subtitle: "(selecteaza o victima)",
        playersLength: 1
      }), React.createElement("div", {
        id: "buttonsCnt"
      }, React.createElement("button", {
        id: "backState",
        onClick: function onClick() {
          _this11.resetBetweenRounds();

          --_this11.props.parent.state.nightCurrentOrderIndex;

          if (_this11.props.parent.state.nightCurrentOrderIndex == -1) {
            _this11.props.parent.state.isNight = false;
            --_this11.props.parent.state.dayNumber;
            _this11.props.parent.state.night = Object.assign({}, _this11.props.parent.state.lastNight);
          } else {
            _this11.prepareForNextNight();
          }

          _this11.props.parent.setState(_this11.props.parent.state, function () {
            window.scrollTo(0, 0);
          });
        }
      }, "Inapoi"), React.createElement("button", {
        id: "nextState",
        onClick: function onClick() {
          if (_this11.props.parent.state.nightCurrentState == NIGHT_ROUND.Mafia) {
            if (currentRoundPlayers.length > 0 && _this11.state.selectedPlayer == null) {
              return alert("Selecteaza un jucator");
            }

            if (currentRoundPlayers.length > 0 && _this11.getRoleIndex("Godfather") == null) {
              if (_this11.state.auxSelected == null) return alert("Selecteaza noul Godfather");else {
                _this11.props.parent.state.players[_this11.state.auxSelected].role = "Godfather";
              }
            }

            _this11.props.parent.state.night.mafiaSelected = _this11.state.selectedPlayer;
          } else if (_this11.props.parent.state.nightCurrentState == NIGHT_ROUND.Serialkiller) {
            if (currentRoundPlayers.length > 0 && _this11.state.selectedPlayer == null) {
              return alert("Selecteaza un jucator");
            }

            _this11.props.parent.state.night.serialkillerSelected = _this11.state.selectedPlayer;
          } else if (_this11.props.parent.state.nightCurrentState == NIGHT_ROUND.Police) {
            if (currentRoundPlayers.length > 0 && _this11.state.selectedPlayer == null) {
              return alert("Selecteaza un jucator");
            }

            _this11.props.parent.state.night.policeSelected = _this11.state.selectedPlayer;
          } else if (_this11.props.parent.state.nightCurrentState == NIGHT_ROUND.Vigilante) {
            _this11.props.parent.state.night.vigilanteSelected = _this11.state.selectedPlayer;
          } else if (_this11.props.parent.state.nightCurrentState == NIGHT_ROUND.Veteran) {
            if (currentRoundPlayers.length > 0) {
              if (!_this11.state.veteranButton || _this11.props.parent.state.night.veteranSelected === undefined) {
                return alert("Selecteaza DA sau NU");
              }

              if (_this11.props.parent.state.night.veteranSelected) {
                if (_this11.props.parent.state.night.policeSelected == _this11.props.parent.state.night.veteranSelected && _this11.getRoleAlive(NIGHT_ROUND.Police).length > 1 && !_this11.props.parent.state.night.policeVeteranSelected) {
                  return alert("Selecteaza un politist");
                }

                if (_this11.props.parent.state.night.doctorSelected == _this11.props.parent.state.night.veteranSelected && _this11.getRoleAlive(NIGHT_ROUND.Doctor).length > 1 && !_this11.props.parent.state.night.doctorVeteranSelected) {
                  return alert("Selecteaza un doctor");
                }

                console.log("police", _this11.props.parent.state.night.policeVeteranSelected);
              }
            }
          } else if (_this11.props.parent.state.nightCurrentState == NIGHT_ROUND.Doctor) {
            if (currentRoundPlayers.length > 0 && _this11.state.selectedPlayer == null && _this11.state.auxSelected == null) {
              return alert("Selecteaza un jucator");
            }

            _this11.props.parent.state.night.doctorSelected = _this11.state.selectedPlayer || _this11.state.auxSelected;
          } else if (_this11.props.parent.state.nightCurrentState == NIGHT_ROUND.Clown) {
            if (_this11.state.selectedPlayer == null) {
              return alert("Selecteaza un jucator");
            }

            _this11.props.parent.state.night.clownSelected = _this11.state.selectedPlayer;
            _this11.state.vampireMode = false;
            console.log("CLOOOWN");
          }

          _this11.resetBetweenRounds();

          ++_this11.props.parent.state.nightCurrentOrderIndex;

          if (_this11.props.parent.state.nightCurrentOrderIndex >= _this11.props.parent.state.nightOrder.length) {
            if (_this11.state.vampireMode) {
              _this11.prepareForNextNight(true);
            } else {
              _this11.calculateNight();

              _this11.props.parent.state.lastNight = Object.assign({}, _this11.props.parent.state.night);
              _this11.props.parent.state.isNight = false;

              _this11.props.parent.createHash();
            }
          } else {
            _this11.prepareForNextNight();
          }

          _this11.props.parent.setState(_this11.props.parent.state, function () {
            window.scrollTo(0, 0);
          });
        }
      }, "Urmatorul")));
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.parent.state.isNight ? this.renderNight() : this.renderDay();
    }
  }]);

  return NightPage;
}(React.Component);

var GeneratorPage = function (_React$Component5) {
  _inherits(GeneratorPage, _React$Component5);

  function GeneratorPage(props) {
    _classCallCheck(this, GeneratorPage);

    return _possibleConstructorReturn(this, (GeneratorPage.__proto__ || Object.getPrototypeOf(GeneratorPage)).call(this, props));
  }

  _createClass(GeneratorPage, [{
    key: "render",
    value: function render() {
      React.createElement("div", {
        id: "generatorPage",
        className: "main"
      }, React.createElement("h2", null, "Generator"), React.createElement("div", {
        id: "presetCnt"
      }, React.createElement("div", {
        id: "presetSelectCnt"
      }, React.createElement("span", null, "Preset:"))));
    }
  }]);

  return GeneratorPage;
}(React.Component);

;

var MainPage = function (_React$Component6) {
  _inherits(MainPage, _React$Component6);

  function MainPage(props) {
    _classCallCheck(this, MainPage);

    var _this13 = _possibleConstructorReturn(this, (MainPage.__proto__ || Object.getPrototypeOf(MainPage)).call(this, props));

    _this13.state = {
      gameStep: GAME_STEP.WELCOME,
      gameSettings: Object.assign({}, DEFAULT_GAME_SETTINGS),
      players: [],
      nightOrder: DEFAULT_ROUNDS_ORDER.slice(),
      dayNumber: 1,
      isNight: false,
      nightCurrentState: null,
      nightCurrentOrderIndex: 0,
      night: null,
      lastNight: null
    };
    _this13.createHash = _this13.createHash.bind(_this13);
    return _this13;
  }

  _createClass(MainPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this14 = this;

      window.packCompresser = window.JsonUrl('pack'); // JsonUrl is added to the window object

      if (window.location.hash) {
        window.packCompresser.decompress(window.location.hash).then(function (json) {
          Object.assign(_this14.state, json);
          _this14.state.lastNight = Object.assign({}, _this14.state.night);
          _this14.state.gameStep = GAME_STEP.NIGHT;

          _this14.setState(_this14.state);
        });
      }
    }
  }, {
    key: "createHash",
    value: function createHash() {
      window.packCompresser.compress({
        players: this.state.players,
        night: this.state.night,
        dayNumber: this.state.dayNumber
      }).then(function (output) {
        return window.location.hash = output;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var displayBlock = null;
      if (this.state.gameStep == GAME_STEP.WELCOME) displayBlock = React.createElement(WelcomePage, {
        parent: this
      });else if (this.state.gameStep == GAME_STEP.GAME_SETUP) displayBlock = React.createElement(GameSetupPage, {
        parent: this
      });else if (this.state.gameStep == GAME_STEP.PLAYERS_SETUP) displayBlock = React.createElement(PlayersSetupPage, {
        parent: this
      });else if (this.state.gameStep == GAME_STEP.NIGHT) displayBlock = React.createElement(NightPage, {
        parent: this
      });else if (this.state.gameStep == GAME_STEP.GENERATOR) displayBlock = React.createElement(GeneratorPage, {
        parent: this
      });
      return displayBlock;
    }
  }]);

  return MainPage;
}(React.Component);

;
ReactDOM.render(React.createElement(MainPage, null), document.getElementById('root'));
},{}],"../../../../../../usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "44913" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../../../usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/index.production.js"], null)
//# sourceMappingURL=/index.production.d4990bd8.map