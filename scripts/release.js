const { prompt } = require('enquirer')
const semver = require('semver')
const packageFile = require('../packages/package.json')
const { resolve } = require('path')
const fs = require('fs')

const versionIncrements = ['patch', 'minor', 'major', 'prerelease']
const currentVersion = packageFile.version

const inc = i => semver.inc(currentVersion, i, 'alpha')

const main = async () => {
  const { release } = await prompt({
    type: 'select',
    name: 'release',
    message: 'Select release type',
    choices: versionIncrements.map(i => `${i} (${inc(i)})`).concat(['custom'])
  })

  if (release === 'custom') {
    targetVersion = (
      await prompt({
        type: 'input',
        name: 'version',
        message: 'Input custom version',
        initial: currentVersion
      })
    ).version
  } else {
    targetVersion = release.match(/\((.*)\)/)[1]
  }

  if (!semver.valid(targetVersion)) {
    throw new Error(`invalid target version: ${targetVersion}`)
  }

  const { yes } = await prompt({
    type: 'confirm',
    name: 'yes',
    message: `Releasing v${targetVersion}. Confirm?`,
    initial: true
  })
  if (!yes) return

  const rootPath = resolve(__dirname, '..')
  const packagePath = resolve(rootPath, 'packages/package.json')
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'))
  pkg.version = targetVersion
  fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + '\n')
}

main()