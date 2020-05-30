const Responder = require('simple-lambda-actions/dist/util/responseHandler')
const { bodyParser } = require('simple-lambda-actions/dist/util/formatter')

const verifyPassword = require('./lib/checkPassword')
const generateToken = require('./lib/secretsManagerSetup')

const corsUrl = process.env.CORS_URL

const ResponseHandler = new Responder(corsUrl, 'post')

exports.handler = async event => {
	try {
		const { username, password } = bodyParser(event.body)
		console.log('username', username)
		const tokenParams = { id: '123', role: '123' }
		
		const userInformation = await verifyPassword(username, password)
		await	generateToken(tokenParams)
		
		return ResponseHandler.respond({ userInformation, token }, 200)
	} catch(error){
		console.error('error', error)
		return ResponseHandler.respond(error.message, error.statusCode || 500)
	}
}
