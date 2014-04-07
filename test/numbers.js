var configa = require('../');
var should = require('should');

describe('numbers.js', function(){

  // test the option function
  describe('#get', function() {

    it('should return 99 from env string "99"', function(){
      process.env['BLAH'] = '99';
      var config = 
        configa()
        .option({
          name: 'blah',
          env: 'BLAH',
          alias: 'b',
          type: Number,
          default: 200
        });
      var val = config.get('blah');
      val.should.equal(99);
    });

    it('should return 0 for env non-number', function() {
      process.env['BLAH'] = 'notanumber';
      var config = 
        configa()
        .option({
          name: 'blah',
          env: 'BLAH',
          alias: 'b',
          type: Number,
          default: 200
        });
      var val = config.get('blah');
      val.should.equal(0);
    });

    it('should return 105 from cli string "105"', function(){
      var config = 
        configa()
        .option({
          name: 'blah',
          env: 'BLAH',
          alias: 'b',
          type: Number,
          default: 200
        });
      config._argv.blah = '105';
      var val = config.get('blah');
      val.should.equal(105);
    });

    it('should return 0 from cli non-number', function(){
      var config = 
        configa()
        .option({
          name: 'blah',
          env: 'BLAH',
          alias: 'b',
          type: Number,
          default: 200
        });
      config._argv.blah = 'something';
      var val = config.get('blah');
      val.should.equal(0);
    });

  });

});