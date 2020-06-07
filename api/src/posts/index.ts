import Responder from 'common-aws-actions/dist/util/Responder'
import logger from 'common-aws-actions/dist/util/logger'
import { ResponseBody } from 'common-aws-actions/dist/shared/interfaces'
import { v4 } from 'uuid'

const ResponseHandler = new Responder({ corsUrl: '*', httpMethod: 'post' })

const posts = {
	posts: [
		{
			id: v4(),
			identifier: 'test@tes.com',
			content: 'Hey!',
			createdAt: Date.now()
		}
	]
}

export const handler = async (event: Record<string, unknown>): Promise<ResponseBody> => {
	logger.info('event', event.queryStringParameters)
	return ResponseHandler.respond(posts, 200)
}