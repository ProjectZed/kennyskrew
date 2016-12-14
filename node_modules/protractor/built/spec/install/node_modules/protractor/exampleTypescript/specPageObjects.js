"use strict";
// local import of the exported AngularPage class
var angularPage_1 = require('./angularPage');
// The jasmine typings are brought in via DefinitelyTyped ambient typings.
describe('angularjs homepage', function () {
    it('should greet the named user', function () {
        var angularHomepage = new angularPage_1.AngularHomepage();
        angularHomepage.get();
        angularHomepage.setName('Julie');
        expect(angularHomepage.getGreeting()).toEqual('Hello Julie!');
    });
});
