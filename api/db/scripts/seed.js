const fs = require('fs')
const path = require('path')
// const uuid = require('uuid/v4')
const baseData = require('./seedData')
const { DynamoDB } = require('aws-sdk')

const tableName = process.env.TABLE_NAME
const targetPath = path.resolve(process.cwd(), 'db')

const aggregateBaseDataIntoBatchWriteParams = baseData => {
  return baseData.map(data => {
    return {
      'PutRequest': {
				'Item': DynamoDB.Converter.marshall(data)
			}
    }
  })
}

const formattedQuestions = aggregateBaseDataIntoBatchWriteParams(baseData)

const output = JSON.stringify({
	[tableName]: formattedQuestions
})

fs.writeFileSync(targetPath + '/seed.json', output)
