import { execa } from 'execa';

import type { Options as ExecaOptions, ExecaReturnValue } from 'execa';
import colors from 'picocolors';
import minimist from 'minimist';

export const args = minimist(process.argv.slice(2));

export const isDryRun = !!args.dry;

if (isDryRun) {
    console.log(colors.inverse(colors.yellow(' DRY RUN ')));
    console.log();
}

export async function run(
    bin: string,
    args: string[],
    opts: ExecaOptions<string> = {},
): Promise<ExecaReturnValue<string>> {
    return execa(bin, args, { stdio: 'inherit', ...opts });
}

export async function runCommand(command: string, args: string[], cwd: string) {
    await run(command, args, {
        cwd,
    });
}

export async function dryRun(
    bin: string,
    args: string[],
    opts?: ExecaOptions<string>,
): Promise<void> {
    return console.log(
        colors.blue(`[dryrun] ${bin} ${args.join(' ')}`),
        opts || '',
    );
}

export const runIfNotDry = isDryRun ? dryRun : run;

export function step(msg: string): void {
    return console.log(colors.cyan(msg));
}
