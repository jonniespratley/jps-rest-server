/* global require, __dirname, console */
/*
 * jps-rest-server
 * https://github.com/jonniespratley/jps-rest-server
 *
 * Copyright (c) 2014 Jonnie Spratley
 * Licensed under the MIT license.
 */
(function (exports) {

	'use strict';
	exports.RestServer = function () {

		//Setup dependencies
		var express = require('express'),
			bodyParser = require('body-parser'),
			events = require('events'),
			utils = require('utils'),
			server = express();


		//Make server inherit all of EventEmitter properties/methods
		utils.inherits(server, events.EventEmitter);

		//Configure server
		server.use(bodyParser.json());
		server.use(express.static(__dirname + '/'));
		server.use(function (req, res, next) {
			console.log('%s %s', req.method, req.url);
			next();
		});

		/*Base*/
		server.get('/api', function (req, res) {
			res.json({message: 'RESTful Node API Server'});
		});

		/*Query*/
		server.get('/api/:table', function (req, res) {
			res.json({ message: 'Query items in ' + req.params.table });
		});

		/* CRUD Operations */

		/* Create */
		server.post('/api/:table', function (req, res) {
			res.json({ message: 'Create item in ' + req.params.table });
		});

		/* Read */
		server.get('/api/:table/:id?', function (req, res) {
			res.json({message: 'Read item ' + req.params.id + ' in ' + req.params.table});
		});

		/* Update */
		server.put('/api/:table/:id', function (req, res) {
			res.json({message: 'Update item ' + req.params.id + ' in ' + req.params.table});
		});

		/* Delete */
		server.delete('/api/:table/:id', function (req, res) {
			res.json({message: 'Delete item ' + req.params.id + ' in ' + req.params.table});
		});

		return server;
	};

}(typeof exports === 'object' && exports || this));
