/* global require, __dirname, console */
/*
 * jps-rest-server
 * https://github.com/jonniespratley/jps-rest-server
 *
 * Copyright (c) 2014 Jonnie Spratley
 * Licensed under the MIT license.
 */
(function (exports) {
//Setup dependencies
	var express = require('express'),
		bodyParser = require('body-parser'),
		events = require('events'),
		utils = require('util');

	'use strict';
	var RestServer = function (options) {
		var self = this;
			self.server = express();



		//Configure server
		self.server.use(bodyParser.json());
		self.server.use(express.static(__dirname + '/'));
		self.server.use(function (req, res, next) {
			console.log('%s %s', req.method, req.url);
			next();
		});

		/*Base*/
		self.server.get('/api', function (req, res) {
			self.emit('index', {message: 'RESTful Node API Server'});
			res.json({message: 'RESTful Node API Server'});
		});

		/*Query*/
		self.server.get('/api/:table', function (req, res) {
			res.json({ message: 'Query items in ' + req.params.table });
		});

		/* CRUD Operations */

		/* Create */
		self.server.post('/api/:table', function (req, res) {
			res.json({ message: 'Create item in ' + req.params.table });
		});

		/* Read */
		self.server.get('/api/:table/:id?', function (req, res) {
			res.json({message: 'Read item ' + req.params.id + ' in ' + req.params.table});
		});

		/* Update */
		self.server.put('/api/:table/:id', function (req, res) {
			res.json({message: 'Update item ' + req.params.id + ' in ' + req.params.table});
		});

		/* Delete */
		self.server.delete('/api/:table/:id', function (req, res) {
			res.json({message: 'Delete item ' + req.params.id + ' in ' + req.params.table});
		});

		return self.server;

		//Make server inherit all of EventEmitter properties/methods
		utils.inherits(self, events.EventEmitter);
	};
	exports.RestServer = RestServer;

}(typeof exports === 'object' && exports || this));
