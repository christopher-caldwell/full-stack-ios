const { compareSync } = require('bcryptjs/dist/bcrypt.min')
const CustomError = require('simple-lambda-actions/dist/util/ErrorHandler')
const { getItem } = require('simple-lambda-actions/dist/dynamo/')

const tableName = process.env.TABLE_NAME
const partitionKey = process.env.TABLE_PARTITION_KEY

const verifyPassword = (givenPassword, dbPassword) => {
	return compareSync(givenPassword, dbPassword)
}

module.exports = async (username, givenPassword) => {
  const userProfile = await getItem(tableName, { [partitionKey]: username })
	if(verifyPassword(givenPassword, userProfile.password)){
		delete userProfile.password
		return user
	} else {
		throw new CustomError({
			message: 'Passwords do not match',
			statusCode: 403
		})
	}
}