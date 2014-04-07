var configa = require('../');
var should  = require('should');

describe('store.js', function(){

  // test the get function
  describe('#get', function(){

    beforeEach(function(){
      if(process.env['BLAH']) {
        delete process.env['BLAH'];  
      }
    });

    it('should retrieve stored values after changes to argv', function() {
      process.env['BLAH'] = 'bar';
      var config = 
        configa()
        .option({
          name: 'blah',
          env: 'BLAH',
          alias: 'b',
          default: 'foo'
        });
      config._argv.b = 'baz';
      config.store();
      config._argv.b = 'bar';
      var val = config.get('blah');
      val.should.equal('baz');
    });

    it('should retrieve stored values after changes to env', function() {
      process.env['BLAH'] = 'bar';
      var config = 
        configa()
        .option({
          name: 'blah',
          env: 'BLAH',
          alias: 'b',
          default: 'foo'
        });
      config.store();
      process.env['BLAH'] = 'baz';
      var val = config.get('blah');
      val.should.equal('bar');
    });

  });

});