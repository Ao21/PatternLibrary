webpackJsonp([2,0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(556);


/***/ },

/***/ 553:
/***/ function(module, exports) {

	module.exports = "html {\n  box-sizing: border-box; }\n\n*, *::after, *::before {\n  box-sizing: inherit; }\n\ndiv.container {\n  max-width: 68em;\n  margin-left: auto;\n  margin-right: auto; }\n  div.container::after {\n    clear: both;\n    content: \"\";\n    display: table; }\n\n.blue {\n  color: blue; }\n"

/***/ },

/***/ 555:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
	    switch (arguments.length) {
	        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
	        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
	        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
	    }
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var angular2_1 = __webpack_require__(13);
	var http_1 = __webpack_require__(111);
	var angular2_2 = __webpack_require__(13);
	var router_1 = __webpack_require__(120);
	var styles = __webpack_require__(553);
	var App = (function () {
	    function App(http) {
	        this.http = http;
	        this.data = [];
	        this.title = 'Angular 2';
	    }
	    App.prototype.onInit = function () {
	        // Our API
	        // Before you start the app, run these commands in another process:
	        //
	        // - npm run express-install
	        // - npm run express
	        //
	        // This will start a process that will listen for requests on port 3001
	        var _this = this;
	        var BASE_URL = 'http://localhost:3001';
	        var TODO_API_URL = '/api/todos';
	        var JSON_HEADERS = new http_1.Headers();
	        JSON_HEADERS.append('Accept', 'application/json');
	        JSON_HEADERS.append('Content-Type', 'application/json');
	        this.http
	            .get(BASE_URL + TODO_API_URL, {
	            headers: JSON_HEADERS
	        })
	            .subscribe(function (data) { return _this.serverData(data); }, function (err) { return _this.errorMessage(err); }, function () { return console.log('complete'); });
	    };
	    App.prototype.serverData = function (data) {
	        console.log('data', data);
	        this.data = data;
	    };
	    App.prototype.errorMessage = function (err) {
	        console.info('\n' + " // You must run these commands in another process for the Http API to work  " + '\n' + " npm run express-install " + '\n' + " npm run express\n    ");
	    };
	    App = __decorate([
	        angular2_1.Component({
	            selector: 'app',
	            bindings: [angular2_2.CORE_DIRECTIVES, angular2_2.FORM_DIRECTIVES, router_1.ROUTER_DIRECTIVES],
	            styles: [styles],
	            template: "\n  <header>\n    <h1 class=\"title\">Hello {{ title }}</h1>\n  </header>\n\n  <main>\n    Your Content Here\n    <div>\n\n      <input type=\"text\" [value]=\"title\" (input)=\"title = $event.target.value\" autofocus>\n      <!--\n        Rather than wiring up two-way data-binding ourselves\n        we can use Angular's [(ng-model)] syntax\n        <input type=\"text\" [(ng-model)]=\"title\">\n      -->\n    </div>\n\n    <pre>this.title = {{ title | json }}</pre>\n    <pre>this.data = {{ data | json }}</pre>\n\n  </main>\n\n  <footer x-large>\n    WebPack Angular 2 Starter by <a href=\"https://twitter.com/AngularClass\">@AngularClass</a>\n  </footer>\n  "
	        }), 
	        __metadata('design:paramtypes', [http_1.Http])
	    ], App);
	    return App;
	})();
	exports.App = App;


/***/ },

/***/ 556:
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../typings/_custom.d.ts" />
	var angular2_1 = __webpack_require__(13);
	var router_1 = __webpack_require__(120);
	var http_1 = __webpack_require__(111);
	var app_1 = __webpack_require__(555);
	angular2_1.bootstrap(app_1.App, [
	    angular2_1.FORM_PROVIDERS,
	    router_1.ROUTER_PROVIDERS,
	    http_1.HTTP_PROVIDERS,
	    angular2_1.ELEMENT_PROBE_PROVIDERS
	]);


/***/ }

});
//# sourceMappingURL=app.js.map