import generateTokenWithSecretsManager from 'common-aws-actions/dist/auth/secrets-manager/generateToken'
import { JsonObject } from 'common-aws-actions/dist/shared/interfaces'

const SecretId = process.env.SECRET_ID || ''
const keyOfTargetSecret = process.env.TARGET_SECRET_KEY_PROPERTY || ''
const expiryDurationOfToken = process.env.TOKEN_DURATION || ''
let mockSigningKey: string|undefined = undefined

if(process.env.STAGE === 'local'){
  mockSigningKey = process.env.MOCK_SIGNING_KEY
}

// Include if only a select number of secrets are decoded.
// Each property present in this map will represent an encoded secret, that will be decoded
// const propertiesToDecode = {
//   [keyOfTargetSecret]: true
// }

const secretManagerParams = { SecretId, keyOfTargetSecret }

const generateToken = (payload: JsonObject): Promise<string> => {
	return generateTokenWithSecretsManager(secretManagerParams, payload, expiryDurationOfToken, mockSigningKey)
}

export default generateToken
