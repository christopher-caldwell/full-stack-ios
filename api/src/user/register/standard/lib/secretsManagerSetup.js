const generateTokenWithSecretsManager = require('common-aws-actions/dist/auth/secrets-manager/generateToken')

const SecretId = process.env.SECRET_ID
const keyOfTargetSecret = process.env.TARGET_SECRET_KEY_PROPERTY
const expiryDurationOfToken = process.env.TOKEN_DURATION
let mockSigningKey = undefined

if(process.env.STAGE === 'local'){
  mockSigningKey = process.env.MOCK_SIGNING_KEY
}

// Include if only a select number of secrets are decoded.
// Each property present in this map will represent an encoded secret, that will be decoded
const propertiesToDecode = {
  [keyOfTargetSecret]: true
}

const secretManagerParams = { SecretId, keyOfTargetSecret }

console.log('secrets params', secretManagerParams)

const generateToken = payload => {
	return generateTokenWithSecretsManager(secretManagerParams, payload, expiryDurationOfToken, mockSigningKey)
}

module.exports = generateToken
