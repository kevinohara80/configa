var configa = require('../');
var should  = require('should');

describe('basic.js', function(){

  // test the option function
  describe('#option', function() {

    it('should allow for setting options', function(){
      var config = 
        configa()
        .option({
          name: 'port',
          env: 'PORT',
          alias: 'p',
          default: 3000
        })
        .option({
          name: 'foo',
          env: 'FOO',
          alias: 'f',
          default: 'bar'
        });
      config._options.should.have.keys(['port', 'foo']);
    });

    it('should throw when the name is not set', function(){
      var config = configa();
      (function(){
        config.option({ env: 'FOO', alias: 'f'});
      }).should.throw();
    });

  });

  // test the get function
  describe('#get', function(){

    it('should return the value from the default', function(){
      var config = configa();
      config
        .option({
          name: 'blah',
          env: 'BLAH',
          alias: 'b',
          default: 'foo'
        });
      var val = config.get('blah');
      val.should.equal('foo');
    });

    it('should return the value from the env', function(){
      process.env['BLAH'] = 'bar';
      var config = 
        configa()
        .option({
          name: 'blah',
          env: 'BLAH',
          alias: 'b',
          default: 'foo'
        });
      var val = config.get('blah');
      val.should.equal('bar');
    });

    it('should return the value from the alias', function(){
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
      var val = config.get('blah');
      val.should.equal('baz');
    });

    it('should return the value from the cli', function(){
      process.env['BLAH'] = 'bar';
      var config = 
        configa()
        .option({
          name: 'blah',
          env: 'BLAH',
          alias: 'b',
          default: 'foo'
        });
      config._argv.blah = 'biz';
      var val = config.get('blah');
      val.should.equal('biz');
    });

  });

});