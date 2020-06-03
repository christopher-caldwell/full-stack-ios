import Responder from 'common-aws-actions/dist/util/Responder'
import { bodyParser } from 'common-aws-actions/dist/util/formatter'
import { ResponseBody } from 'common-aws-actions/dist/shared/interfaces'
import { isString } from 'common-aws-actions/dist/util/typeCheckers'


import verifyPassword from './lib/checkPassword'
import generateToken from './lib/secretsManagerSetup'

const corsUrl = process.env.CORS_URL || ''
const ResponseHandler = new Responder({corsUrl,  httpMethod: 'post'})

interface eventObject {
	[key: string]: any; //eslint-disable-line
}

export const handler = async (event: eventObject): Promise<ResponseBody> => {
	try {
		const { emailAddress, password } = bodyParser(event.body)
		
		if(!isString(emailAddress) || !isString(password)) throw new Error('Not strings')
		
		const userInformation = await verifyPassword(emailAddress, password)
		const tokenParams = { id: emailAddress, role: userInformation.role }
		const token = await	generateToken(tokenParams)
		
		return ResponseHandler.respond({ userInformation, token }, 200)
	} catch(error){
		console.error('error', error)
		return ResponseHandler.respond(error.message, error.statusCode || 500)
	}
}
