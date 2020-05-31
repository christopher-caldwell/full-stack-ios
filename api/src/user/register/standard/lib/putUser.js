const putItem = require('common-aws-actions/dist/dynamo/lib/putItem')
const { genSalt, hash } = require('bcryptjs/dist/bcrypt.min')

const TableName = process.env.TABLE_NAME
const partitionKey = process.env.TABLE_PARTITION_KEY
const rangeKey = process.env.TABLE_RANGE_KEY

const constructWriteParams = async (emailAddress, password, userInformation, role) => {
	const saltRounds = await genSalt(10)
	const hashedPassword = await hash(password, saltRounds)
	const params = {
		[partitionKey]: emailAddress,
		[rangeKey]: 'user',
		password: hashedPassword,
		role,
		pictureUrl: null,
		...userInformation
	}
	return params
}

const writeUser = async (emailAddress, password, userInformation, role) => {
	const writeParams = await constructWriteParams(emailAddress, password, userInformation, role)
	await putItem(TableName, writeParams, true)
	return writeParams
}

module.exports = writeUser