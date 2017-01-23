
import path from 'path'
import glob from 'glob'

let entryDirs =  path.resolve(__dirname, './src')

let entries = glob.sync('page/**/!(_)*.js', {cwd: entryDirs}) // 入口文件

console.log(entries)

let configEntry = {}
entries.forEach((page) => {
  let pa = page.replace(/\..*$/,'')
  configEntry[pa] = path.resolve(entryDirs, pa);
})
console.log(configEntry)

export default configEntry
