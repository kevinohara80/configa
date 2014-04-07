var configa = require('../');
var should  = require('should');

describe('strings.js', function(){

  // test the option function
  describe('#get', function() {

    beforeEach(function(){
      if(process.env['BLAH']) {
        delete process.env['BLAH'];  
      }
    });

    it('should return "99" from env number 99', function(){
      process.env['BLAH'] = 99;
      var config = 
        configa()
        .option({
          name: 'blah',
          env: 'BLAH',
          alias: 'b',
          type: String,
          default: '200'
        });
      var val = config.get('blah');
      val.should.equal('99');
    });

    it('should return "true" from cli bool of true', function(){
      var config = 
        configa()
        .option({
          name: 'blah',
          env: 'BLAH',
          alias: 'b',
          type: String,
          default: 'false'
        });
      config._argv.blah = true;
      var val = config.get('blah');
      val.should.equal('true');
    });

  });

});