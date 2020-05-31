const { compareSync } = require('bcryptjs/dist/bcrypt.min')
const CustomError = require('common-aws-actions/dist/util/ErrorHandler')
const getItem = require('common-aws-actions/dist/dynamo/lib/getItem')

const tableName = process.env.TABLE_NAME
const partitionKey = process.env.TABLE_PARTITION_KEY
const rangeKey = process.env.TABLE_RANGE_KEY

const verifyPassword = (givenPassword, dbPassword) => {
	return compareSync(givenPassword, dbPassword)
}

module.exports = async (emailAddress, givenPassword) => {
	const keyForItem = { [partitionKey]: emailAddress, [rangeKey]: 'user' }
  const userProfile = await getItem(tableName, keyForItem, true)
	if(verifyPassword(givenPassword, userProfile.password)){
		delete userProfile.password
		return userProfile
	} else {
		throw new CustomError({
			message: 'Passwords do not match',
			statusCode: 403
		})
	}
}