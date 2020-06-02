import Responder from 'common-aws-actions/dist/util/Responder'
import logger from 'common-aws-actions/dist/util/logger'

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

export const handler = async (event: object): Promise<object> => {
	logger.info('event', event)
	return ResponseHandler.respond(posts, 200)
}