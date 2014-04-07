var configa = require('../');
var should = require('should');

describe('booleans.js', function(){

  // test the option function
  describe('#get', function() {

    it('should return true from env string "true"', function(){
      process.env['BLAH'] = 'true';
      var config = 
        configa()
        .option({
          name: 'blah',
          env: 'BLAH',
          alias: 'b',
          type: Boolean,
          default: false
        });
      var val = config.get('blah');
      val.should.equal(true);
    });

    it('should return true from env val of "1"', function(){
      process.env['BLAH'] = '1';
      var config = 
        configa()
        .option({
          name: 'blah',
          env: 'BLAH',
          alias: 'b',
          type: Boolean,
          default: false
        });
      var val = config.get('blah');
      val.should.equal(true);
    });

    it('should return true from cli string "true"', function(){
      var config = 
        configa()
        .option({
          name: 'blah',
          env: 'BLAH',
          alias: 'b',
          type: Boolean,
          default: false
        });
      config._argv.blah = 'true';
      var val = config.get('blah');
      val.should.equal(true);
    });

    it('should return true from cli val of "1"', function(){
      var config = 
        configa()
        .option({
          name: 'blah',
          env: 'BLAH',
          alias: 'b',
          type: Boolean,
          default: false
        });
      config._argv.blah = '1';
      var val = config.get('blah');
      val.should.equal(true);
    });

    it('should return true from cli alias val of "1"', function(){
      var config = 
        configa()
        .option({
          name: 'blah',
          env: 'BLAH',
          alias: 'b',
          type: Boolean,
          default: false
        });
      config._argv.b = '1';
      var val = config.get('blah');
      val.should.equal(true);
    });

  });

});