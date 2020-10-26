#!/usr/bin/env node
import fse from 'fs-extra';
import fs from 'fs';
import { resolve } from 'path';
import minimist from 'minimist';
import chalk from 'chalk';

async function getFiles(dir: string): Promise<any> {
  const directories = await fse.readdir(dir, { withFileTypes: true });

  const files = await Promise.all(directories.map((file) => {
    const res = resolve(dir, file.name);
    return file.isDirectory() ? getFiles(res) : res;
  }));

  return Array.prototype.concat(...files);
}

async function main() {
  try {
    console.log(chalk.blue('\nRunning Roamdown\n'))

    const args = minimist(process.argv.slice(2));

    // When running as an executable we can't leverage __dirname, instead we need
    // to retrieve the current directory via the process.
    const currentDirectory = process.cwd();


    if (!args.tagDirectory) {
      console.log(chalk.blue('No --tagDirectory passed, defaulting to "tags"\n'));
    }

    if (!args.entryDirectory) {
      console.log(chalk.blue('No --entryDirectory passed, defaulting to "entries"\n'))
    }

    const tagDirectory = args.tagDirectory || 'tags'; 
    const entryDirectory = args.entryDirectory || 'entries'; 

    // Remove all current tags files.
    //
    // For some reason and I'm not quite sure why but using fse.promises is failing
    // when I execute this package as a binary. When I implemented it in the journal
    // repository it worked fine and it worked fine in GitHub Actions. I've had to resort
    // to using the built in fs, which ain't bad, just a tad annoying.
    await fs.promises.rmdir(currentDirectory + `/${tagDirectory}/`, { recursive: true });
    
    const files = await getFiles(currentDirectory + `/${entryDirectory}/`);

    const tags: {[label: string]: {
      entryPath: string;
      snippet?: string;
    }[]} = {};

    for await (const file of files) {
      const trimmedPath = file.split(entryDirectory)[1];

      const parsed = await fse.readFile(file, 'utf-8');

      let allMatches = [...parsed.matchAll(/\[\[(.*?)\]\]/gi)];

      allMatches?.forEach((match) => {
        const matchAsString = match[1];

        if (!tags[matchAsString]) {
          tags[matchAsString] = [];
        }

        // Build the snippet that will appear alongside the link to the file
        const firstFullStopIndex = parsed.lastIndexOf('.', match.index);
        const lastFullStopIndex = parsed.indexOf('.', match.index);
        const lastNextLineIndex = parsed.indexOf('\n', match.index);
        const lastIndex = lastNextLineIndex < lastFullStopIndex ? lastNextLineIndex : lastFullStopIndex;
        const substring = parsed.substring(firstFullStopIndex, lastIndex);

        tags[matchAsString].push({
          entryPath: '/' + entryDirectory + trimmedPath,
          snippet: substring.replace('.', '').replace(/(^[ \t]*\n)/gm, "")
        });
      });
    }

    console.log(chalk.blue(`Creating files in "/${tagDirectory}"...\n`));

    for await (const tag of Object.keys(tags)) {
      const entries = [...new Set(tags[tag])];

      // This looks very ugly, however, the indentation is important for the final file.
      const content = 
`# ${tag}

Entries for ${tag} can be found in:

${entries.map((entry) => `[${entry.entryPath}](${entry.entryPath})\n>${entry.snippet}`).join('\r\n\n')}
`;

      const fileName = resolve(currentDirectory + `/${tagDirectory}/` + tag + '.md');
      await fse.createFile(fileName);
      await fse.writeFile(fileName, content, 'utf-8');
    }

    console.log(chalk.green('All files successfully created\n'));
  } catch (err) {
    console.error(err);
  }
}

main();
