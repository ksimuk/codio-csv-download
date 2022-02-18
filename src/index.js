require('dotenv').config()
const codio = require('codio-api-js').default.v1
const fs = require('fs')
const path = require('path')
const OUTDIR = 'result'

async function main() {
  await codio.auth(process.env['CLIENT_ID'], process.env['SECRET_ID'])
  if (process.argv.length < 4) {
    console.log(`npm run export <course_id> <assignement_id>`)
    process.exit(1)
  }

  const courseId = process.argv[2]
  const assignmentId = process.argv[3]

  fs.mkdirSync(OUTDIR, {recursive: true})
  const filePath = path.join(OUTDIR, `${courseId}_${assignmentId}.csv`)

  await codio.course.downloadAssignmentCSV(courseId, assignmentId, filePath)
  
  console.log(`Saved as ${filePath}`)
}

main()
