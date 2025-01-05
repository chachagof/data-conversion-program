const data = require('./rawData.js')
const fs = require('fs')
const path = require('path')

const splitData = data.trim().split('\n').map(item => item.split('|')).map(item => parseDataToObject(item))

for(let item of splitData) {
  delete item['Compatible Devices']
  delete item['Color']

  if(!item['Brand'])item['Brand'] = ''
  if(!item['Hard Disk Interface'])item['Hard Disk Interface'] = ''
  if(!item['Installation Type'])item['Installation Type'] = ''
  if(!item['Hard Disk Size'])item['Hard Disk Size'] = ''
  if(!item['Digital Storage Capacity'])item['Digital Storage Capacity'] = ''
  if(!item['Hard Disk Description'])item['Hard Disk Description'] = ''
  if(!item['Hard Disk Form Factor'])item['Hard Disk Form Factor'] = ''
  if(!item['Connectivity Technology'])item['Connectivity Technology'] = ''
  if(!item['Special Feature'])item['Special Feature'] = ''
  if(!item['Compatible Devices'])item['Compatible Devices'] = ''
}

function parseDataToObject(data) {
  return data.reduce((obj, item) => {
    const [key, value] = item.split(':');
    obj[key.trim()] = value ? value.trim() : ''
    return obj
  }, {});
}

fs.writeFileSync('./output.json', JSON.stringify(splitData, null, 2))

