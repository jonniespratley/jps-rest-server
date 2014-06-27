
var RestServer = require('./src/jps-rest-server').RestServer;

/**
 * If server is not running use this to start server before tests.
 */
var mockServer = null;
	mockServer = new RestServer();
	mockServer.listen(9090);