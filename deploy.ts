import { promisify } from 'util';
import { exec } from 'child_process';
import webpack, { Stats } from 'webpack';
import { publish } from 'gh-pages'

import webpackConfig from './webpack.config.ts';

const execPromise = promisify(exec);
const webpackPromise = promisify(webpack.webpack);

async function checkGitStatus(cmd: string, msg: string) {
    const { stderr, stdout } = await execPromise(`git ${cmd}`);
    if (stderr !== '') throw new Error('Error during git check:\n\n' + stderr);
    if (stdout !== '') throw new Error(msg);
}

console.log('deploy-pages -- checking git status');
await Promise.all([
    checkGitStatus('fetch --dry-run', 'Unfetched remote changes. Aborting deployment.'),
    checkGitStatus('diff', 'Uncommited local changes. Aborting deployment.'),
    checkGitStatus('log origin/main..HEAD', 'Unpushed local changes. Aborting deployment.'),
]);

console.log('deploy-pages -- reading commit hash');
const { stderr: gitlogErr, stdout: commitHash } = await execPromise('git rev-parse --short --verify HEAD');
if (gitlogErr !== '') {
    throw new Error('Could not get most recent commit hash:\n\n' + gitlogErr);
}

console.log('deploy-pages -- loading webpack config');
const config = webpackConfig({}, { mode: 'production' });

console.log('deploy-pages -- launching webpack build');
// @ts-expect-error
const compilation: Stats = await webpackPromise(config);
if (compilation?.hasErrors()) {
    throw new Error('Webpack compilation failed:\n\n' + compilation.compilation.errors);
}

console.log('deploy-pages -- publishing to pages');
const datetime = new Date().toISOString().replace('T', ' ').replace(/\.[^Z]*Z/, '+00:00');
await publish('build', { message: `${commitHash} sync, ${datetime}`, cname: 'cbunt.ing', nojekyll: true });
