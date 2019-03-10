const config = {
	server: {
		listenPort: process.env.RUSHHOUR_LISTENPORT || 80,
		appRoot: __dirname
	}
}

module.exports = config;