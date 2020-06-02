const Responder = require('common-aws-actions/dist/util/Responder')
const logger = require('common-aws-actions/dist/util/logger')

const ResponseHandler = new Responder({ corsUrl: '*', httpMethod: 'post' })

const posts = {
	posts: [
		{
			id: 1,
			author: 'Timmy',
			content: 'Hey!'
		}
	]
}

exports.handler = async event => {
	logger.info('event', event)
	return ResponseHandler.respond(posts, 200)
}