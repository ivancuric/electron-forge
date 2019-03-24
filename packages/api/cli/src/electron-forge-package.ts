import { api, PackageOptions } from '@electron-forge/core';

import fs from 'fs-extra';
import program from 'commander';

import './util/terminate';
import workingDir from './util/working-dir';

(async () => {
  let dir: string = process.cwd();
  program
    .version((await fs.readJson('../package.json')).version)
    .arguments('[cwd]')
    .option('-a, --arch [arch]', 'Target architecture')
    .option('-p, --platform [platform]', 'Target build platform')
    .action((cwd) => { dir = workingDir(dir, cwd); })
    .parse(process.argv);

  const packageOpts: PackageOptions = {
    dir,
    interactive: true,
  };
  if (program.arch) packageOpts.arch = program.arch;
  if (program.platform) packageOpts.platform = program.platform;

  await api.package(packageOpts);
})();