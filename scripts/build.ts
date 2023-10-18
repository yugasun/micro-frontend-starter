import { readdirSync } from 'fs';
import { join } from 'path';
import fse from 'fs-extra';
import { runCommand, step, args } from './utils';

const mainAppName = 'main';
const deployDist = join(__dirname, '../dist');
const rootDir = join(__dirname, '../packages/');

fse.mkdirSync(deployDist, {
    recursive: true,
});

function getSubApps(appsList: string[]) {
    return appsList.filter((item) => item.includes('sub'));
}

function copyDist(dir: string, dest: string) {
    fse.copySync(dir, dest, {
        overwrite: true,
    });
}

async function build(appName: string) {
    try {
        step(`[${appName}] Building`);
        const runArgs = ['run', 'build'];
        const cwd = join(rootDir, appName);
        await runCommand('pnpm', runArgs, cwd);
        // copy dist to deploy dist dir
        copyDist(`${cwd}/dist`, `${deployDist}/${appName}`);
    } catch (e) {
        throw e;
    }
}

async function main() {
    const apps = fse.readdirSync(rootDir);
    const { app } = args;
    if (args.app) {
        if (apps.includes(app)) {
            await build(args.app);
        } else {
            // app not exist
        }
    } else {
        // should build plugin for all build process
        await build('plugin');

        const subApps = getSubApps(apps);
        subApps.forEach(async (item) => {
            await build(item);
        });
        await build(mainAppName);
    }
}

main();

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});
