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
}

// get a config variable
Config.prototype.get = function(key){
  if(this._argv[key]) {
    return this._argv[key];
  }

  if(this._options[key]) {
    var opt = this._options[key];
    if(opt.alias && this._argv[opt.alias]) {
      return this._argv[opt.alias]; 
    } else if(opt.env && this._env[opt.env]) {
      return this._env[opt.env]
    } else {
      return opt.default;
    }
  }
}

// factory method
module.exports = function() {
  return new Config();
}