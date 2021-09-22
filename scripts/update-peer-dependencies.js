const fs = require('fs');
const { PackageGraph } = require('@lerna/package-graph');
const { Project } = require('@lerna/project');
const { getFilteredPackages } = require('@lerna/filter-options');
const { join, relative } = require('path');
const log = require('npmlog');

(async () => {
  const cwd = join(__dirname, '..');
  const project = new Project(cwd);
  const packages = await project.getPackages();
  const packageGraph = new PackageGraph(packages);

  const outputPackage = packages.find((pkg) => pkg.name === '@jovotech/output');

  if (!outputPackage) {
    throw new Error(`Can not update peerDependencies, could not find @jovotech/output`);
  }

  log.info('peer', 'Updating @jovotech/output peer-dependency to %s', outputPackage.version);

  const filteredPackages = await getFilteredPackages(
    packageGraph,
    { cwd },
    {
      ignore: ['@jovotech/output', '@jovotech/e2e-output'],
    },
  );

  const promises = filteredPackages.map((pkg) => {
    pkg.peerDependencies['@jovotech/output'] = outputPackage.version;
    return pkg.serialize();
  });
  await Promise.all(promises);
})()
  .then(() => {
    console.log('Success');
    process.exit(0);
  })
  .catch((e) => {
    console.error('Failure');
    console.error((e.stdout || e.message).trim());
    console.error(e.stack);
    process.exit(1);
  });
