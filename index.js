var config = JSON.parse(JSON.stringify(process.env));

module.exports.defaults = function(opts) {  
  if(!opts) return;
  Object.keys(opts).forEach(function(key) {
    if(!config[key]) {
      config[key] = opts[key];
    }
  });
}

module.exports.get = function(key) {
  return config[key];
}

module.exports.set = function(key, val) {
  config[key] = val;
}