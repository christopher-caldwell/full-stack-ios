const Responder = require('common-aws-actions/dist/util/Responder')
const { bodyParser } = require('common-aws-actions/dist/util/formatter')

const verifyPassword = require('./lib/checkPassword')
const generateToken = require('./lib/secretsManagerSetup')

const corsUrl = process.env.CORS_URL
const ResponseHandler = new Responder(corsUrl, 'post')

exports.handler = async event => {
	try {
		const { emailAddress, password } = bodyParser(event.body)
		
		const userInformation = await verifyPassword(emailAddress, password)
		const tokenParams = { id: emailAddress, role: userInformation.role }
		const token = await	generateToken(tokenParams)
		
		return ResponseHandler.respond({ userInformation, token }, 200)
	} catch(error){
		console.error('error', error)
		return ResponseHandler.respond(error.message, error.statusCode || 500)
	}
}
