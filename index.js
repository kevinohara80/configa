var minimist = require('minimist');

var Config = function(){
  this._options = {};
  this._argv = minimist(process.argv.slice(2));
  this._env = JSON.parse(JSON.stringify(process.env));
  return this;
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

// helper functions
function getBooleanValue(val) {
  if(!val) return false;
  if(val === '1') {
    return true;
  } else if (typeof val === 'string' && val.toLowerCase() === 'true') {
    return true;
  }
  return false;
}

function getNumberValue(val) {
  if(!val) return;
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
  if(!val) return;
  return val;
}

// factory method
module.exports = function() {
  return new Config();
}