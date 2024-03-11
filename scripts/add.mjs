
import { join } from 'path';
import { readFile } from 'fs/promises'
import { outputFile, pathExists, emptyDir } from 'fs-extra/esm'
import { glob } from 'glob';
import { fileURLToPath } from 'url'
import handlebars from "handlebars";
import chalk from 'chalk';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
/**
 * abc-xyz => AbcXyz
 * @param {*} str 
 */
const upCase = str => str.replace(/-[a-z]/g, m => m[1].toUpperCase()).replace(/^.{1}/, m => m.toUpperCase());
const lowCase = str => str.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`).replace(/^-/, '');

const component = process.argv[2];

const upName = upCase(component);
const lowName = lowCase(component);
const dirName = upName
const dirPath = join(process.cwd(), `src/${dirName}`)

const runScripts = async() => {

if (pathExists(dirPath) || !emptyDir(dirPath)){
  console.log(chalk.red.bold(`[${upName} component] the folder is not empty!`));
  return
}

const templates = glob.sync(join(__dirname, 'template/*.hbs'));

await Promise.allSettled(
  templates.map(async filePath => {
    const content = await readFile(filePath, 'utf-8');
    const tempalte = handlebars.compile(content);
    const result = tempalte({
      component: lowName,
      Component: upName
    });

    const newPath = filePath
    .replace('component', lowName)
    .replace('Component', upName)
    .replace('.hbs', '')
    .replace('scripts/template', `src/components/${dirName}`);

    await outputFile(newPath, result);

    console.log(chalk.blue(`write ${newPath} success`));
}))

console.log(chalk.green.bold(`component ${upName} success add ๐•ᴗ•๐`));
}


try {
  runScripts()
} catch (error) {
  console.log(error)
}