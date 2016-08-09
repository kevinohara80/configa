var minimist = require('minimist');

var Config = function(){
  this._options = {};
  this._argv = minimist(process.argv.slice(2));
  this._env = JSON.parse(JSON.stringify(process.env));
  return this;
}

function isUnset(val) {
  return (typeof val === 'undefined') || val === null;
}

// set an option
Config.prototype.option = function(opt) {
  opt = opt || {};
  if(!opt.name) throw new Error('Must specify an option name');
  this._options[opt.name] = opt;
  return this;
};

// get a config variable
Config.prototype.get = function(key){
  var val;
  var opt = this._options[key];

  // return stored value if already stored.
  if(opt && opt.stored) {
    return opt.stored;
  }

  // find the appropriate location for the value
  if(this._argv[key]) {
    val = this._argv[key];
  } else if(this._options[key]) {
    if(opt.alias && this._argv[opt.alias]) {
      val = this._argv[opt.alias]; 
    } else if(opt.env && this._env[opt.env]) {
      val = this._env[opt.env]
    } else {
      val = opt.default;
    }
  }

  // value conversion
  if(opt && opt.type) {
    if(opt.type === Boolean) {
      val = getBooleanValue(val);
    } else if(opt.type === Number) {
      val = getNumberValue(val);
    } else if(opt.type === String) {
      val = getStringValue(val);
    }
  }

  return val;

};

// compute and store the values for the options for fast retrieval
Config.prototype.store = function() {
  var that = this;
  if(this._options) {
    Object.keys(this._options).forEach(function(k) {
      var o = that._options[k];
      o.stored = that.get(k);
      that._options[k] = o;
    });
  }
  return this;
};

// helper functions
function getBooleanValue(val) {
  if(isUnset(val)) {
    return false;
  }
  if(typeof val === 'boolean') {
    return val;
  }
  if(val === '1') {
    return true;
  } else if (typeof val === 'string' && val.toLowerCase() === 'true') {
    return true;
  }
  return false;
}

function getNumberValue(val) {
  if(isUnset(val)) {
    return void 0;
  }
  if(typeof val !== 'number') {
    try {
      val = parseFloat(val);
      if(isNaN(val)) {
        val = 0;
      }
    } catch (err) {
      val = 0;
    }
  }
  return val;
}

function getStringValue(val) {
  if(isUnset(val)) {
    return void 0;
  }
  if(typeof val !== 'string') {
    val+= '';
  }
  return val;
}

// factory method
module.exports = function() {
  return new Config();
}