import { compareSync } from 'bcryptjs'
import CustomError from 'common-aws-actions/dist/util/ErrorHandler'
import getItem from 'common-aws-actions/dist/dynamo/lib/getItem'
import { AttributeMap, Key } from 'common-aws-actions/dist/dynamo/interfaces'

const tableName = process.env.TABLE_NAME || ''
const partitionKey = process.env.TABLE_PARTITION_KEY || ''
const rangeKey = process.env.TABLE_RANGE_KEY || ''

const verifyPassword = (givenPassword: string, dbPassword: string) => {
	return compareSync(givenPassword, dbPassword)
}

export default async (emailAddress: string, givenPassword: string): Promise<AttributeMap> => {
	const keyForItem: Key = { [partitionKey]: emailAddress, [rangeKey]: 'user' }
	const userProfile = await getItem(tableName, keyForItem, true)
	const dbPassword: string = userProfile.password.toString()

	const doesPasswordMatch = verifyPassword(givenPassword, dbPassword)
	if(doesPasswordMatch){
		delete userProfile.password
		return userProfile
	} else {
		throw new CustomError({
			message: 'Passwords do not match',
			statusCode: 403
		})
	}
}