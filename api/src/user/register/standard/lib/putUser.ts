import { genSalt, hash } from 'bcryptjs'
import putItem from 'common-aws-actions/dist/dynamo/lib/putItem'
import { JsonValue, JsonObject } from 'common-aws-actions/dist/shared/interfaces';

const TableName = process.env.TABLE_NAME || ''
const partitionKey = process.env.TABLE_PARTITION_KEY || ''
const rangeKey = process.env.TABLE_RANGE_KEY || ''

type UserPutParams = {
	[key: string]: JsonValue|null;
}

/**
 * Constructs the write params for a user
 */
const constructWriteParams = async (
	emailAddress: string,
	password: string,
	userInformation: JsonValue,
	role: string
): Promise<UserPutParams> => {
	const saltRounds = await genSalt(10)
	const hashedPassword = await hash(password, saltRounds)
	const params: UserPutParams = {
		[partitionKey]: emailAddress,
		[rangeKey]: 'user',
		password: hashedPassword,
		role,
		pictureUrl: null,
		...(userInformation as JsonObject )
	}
	return params
}

/**
 * Writes the user to Dynamo
 */
const writeUser = async (
	emailAddress: string,
	password: string,
	userInformation: JsonValue,
	role: string
): Promise<UserPutParams> => {
	const writeParams = await constructWriteParams(emailAddress, password, userInformation, role)
	await putItem(TableName, writeParams, true)
	return writeParams
}

export default writeUser