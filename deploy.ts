import { promisify } from 'util';
import { exec } from 'child_process';
import webpack, { Stats } from 'webpack';
import ghpages from 'gh-pages'

import webpackConfig from './webpack.config.ts';

const execPromise = promisify(exec);
const webpackPromise = promisify(webpack.webpack);
const publishPromise = promisify(ghpages.publish);

async function checkGitStatus(cmd: string, msg: string) {
    const { stderr, stdout } = await execPromise(`git ${cmd}`);
    if (stderr !== '') throw new Error('Error during git check:\n\n' + stderr);
    if (stdout !== '') throw new Error(msg);
}

await Promise.all([
    checkGitStatus('fetch --dry-run', 'Unfetched remote changes. Aborting deployment.'),
    checkGitStatus('diff', 'Uncommited local changes. Aborting deployment.'),
    checkGitStatus('log origin/main..HEAD', 'Unpushed local changes. Aborting deployment.'),
]);

const config = webpackConfig({}, { mode: 'production' });

// @ts-expect-error
const compilation: Stats = await webpackPromise(config);
if (compilation?.hasErrors()) {
    throw new Error('Webpack compilation failed:\n\n' + compilation.compilation.errors);
}

const { stderr: gitlogErr, stdout: commitHash } = await execPromise('git rev-parse --short --verify HEAD');
if (gitlogErr !== '') {
    throw new Error('Could not get most recent commit hash:\n\n' + gitlogErr);
}

const datetime = new Date().toISOString().replace('T', ' ').replace(/\.[^Z]*Z/, '+00:00');
// @ts-expect-error
await publishPromise('build', { message: `${commitHash} sync, ${datetime}` });