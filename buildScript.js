const fs = require('fs')
const fse = require('fs-extra')
const child_process = require('child_process')

if (fs.existsSync('./build')) {
  fse.removeSync('./build')
}

child_process.execSync('react-scripts build', { stdio: 'inherit' })

fse.moveSync('./build', './server/build', { overwrite: true })
