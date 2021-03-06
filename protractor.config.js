/* global browser:true,protractor:false */
'use strict';

var path = require('path');

var useSauceLabs = !!process.env.USE_SAUCELABS;

exports.config = {
  // plugins: [{
  //   path: 'node_modules/protractor/plugins/timeline/index.js',

  //   // Output json and html will go in this folder.
  //   outdir: 'timelines',
  // }],
  // baseUrl: 'http://saadtazi.com',
  seleniumAddress: useSauceLabs ? false : 'http://localhost:4444/wd/hub',
  framework: 'mocha',
  mochaOpts: {
    timeout: 40000
  },
  directConnect: useSauceLabs ? false : true,
  suites: {
    integration: path.join(__dirname, './tests/integration/**/*.spec.js'),
    example: path.join(__dirname, './examples/**/*.spec.js')
  },
  name: 'protractor-pageobject integration tests',
  sauceUser: useSauceLabs ? process.env.SAUCE_USERNAME : false,
  sauceKey: useSauceLabs ? process.env.SAUCE_ACCESS_KEY : false,
  // sauceAgent: useSauceLabs ? true : false,
  capabilities: {
    browserName: 'chrome',

    // Name of the process executing this capability.  Not used directly by
    // protractor or the browser, but instead pass directly to third parties
    // like SauceLabs as the name of the job running this test
    name: 'protractor-test',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER
  },
  beforeLaunch: function() {},
  onPrepare: function() {
    // do not run scripts that waits for angular...
    browser.ignoreSynchronization = true;

    // add some helpers
    global.elements = browser.findElements;

    // setup mocha, chai...
    var chai = require('chai');
    var chaiAsPromised = require('chai-as-promised');

    chai.use(chaiAsPromised);
    chai.should();
    // global.expect = chai.expect;
    Object.defineProperty(protractor.promise.Promise.prototype, 'should', {
      get: Object.prototype.__lookupGetter__('should'),
      set: Object.prototype.__lookupSetter__('should')
    });
  }
};