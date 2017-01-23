
import path from 'path'
import glob from 'glob'

let entryDirs =  path.resolve(__dirname, './src')

let entries = glob.sync('page/**/!(_)*.js', {cwd: entryDirs})

console.log(entries)

let configEntry = {}

entries.forEach((page) => {
  var pa = page.replace(/\..*$/,'')
  configEntry[pa] = path.resolve(entryDirs, pa);
})
console.log(configEntry)

module.exports = configEntry;
