const Responder = require('common-aws-actions/dist/util/Responder')
const { bodyParser } = require('common-aws-actions/dist/util/formatter')

const putUser = require('./lib/putUser')
const generateToken = require('./lib/secretsManagerSetup')

const corsUrl = process.env.CORS_URL
const ResponseHandler = new Responder(corsUrl, 'post')
const role = 'partialUser'

exports.handler = async event => {
	try {
		const { emailAddress, password, userInformation } = bodyParser(event.body)
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
