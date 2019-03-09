const config = {
	server: {
		listenPort: process.env.RUSHHOUR_LISTENPORT || 80
	},
	keyGenOptions: {
		length:25,
		charRanges: [
			{
				low:48,
				high:57
			},
			{
				low:97,
				high:122
			}
		]
	}
}

module.exports = config;