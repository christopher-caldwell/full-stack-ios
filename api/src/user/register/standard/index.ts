import Responder from 'common-aws-actions/dist/util/Responder'
import { bodyParser } from 'common-aws-actions/dist/util/formatter'
import { ResponseBody } from 'common-aws-actions/dist/shared/interfaces'
import { isString } from 'common-aws-actions/dist/util/typeCheckers'

import putUser from './lib/putUser'
import generateToken from './lib/secretsManagerSetup'

const corsUrl = process.env.CORS_URL || ''
const ResponseHandler = new Responder({corsUrl, httpMethod: 'post'})
const role = 'partialUser'

export const handler = async (event: Record<string,any>): Promise<ResponseBody> => { // eslint-disable-line
	try {
		const { emailAddress, password, userInformation } = bodyParser(event.body)

		if(!isString(emailAddress)) throw new Error('Email is not a string')
		if(!isString(password)) throw new Error('Password is not a string')
		if(!isString(role)) throw new Error('Role is not a string')

		console.log('emailAddress %s password %s userInfo %s', emailAddress, password, userInformation)
		const tokenParams = { id: emailAddress, role }
		const [ token, user ] = await Promise.all([
			generateToken(tokenParams),
			putUser(emailAddress, password, userInformation, role)
		])
		delete user.password
		return ResponseHandler.respond({ userInformation: user, token }, 200)
	} catch (error) {
		console.log('error: ', error)
		return ResponseHandler.respond(error.message, error.statusCode || 500)
	}
}
