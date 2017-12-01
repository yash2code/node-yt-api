require('dotenv').config()

module.exports = exports = {

	port: process.env.PORT,

	youtube: {
		key: process.env.YOUTUBE_API_KEY
	}
};