const FS      = require('fs');
const Path    = require('path');
const Common  = require('./common');
const modules = require('./modules');
const paths   = require('./paths');

let action = process.argv[2];

paths.modules = Path.resolve(__dirname, paths.modules);
paths.client  = Path.resolve(__dirname, paths.client);
paths.server  = Path.resolve(__dirname, paths.server);

let targets =
[
    { name: 'Client', path: paths.client },
    { name: 'Server', path: paths.server }
];

if (action == 'l' || action == 'link')
{
    link();
}
else if (action == 'u' || action == 'unlink')
{
    unlink();
}
else if (action == 'r' || action == 'relink')
{
    relink();
}

async function link()
{
    for (let $module of modules)
    {
        for (let dependence of Common.objectToDictionary($module.dependencies).filter(x => x.key.startsWith('@surface/')))
        {
            let source = Path.normalize(Path.join(paths.modules, dependence.key));
            let target = Path.normalize(Path.join(paths.modules, $module.name, 'node_modules'));

            Common.makeDir(Path.join(target, '@surface'));

            target = Path.normalize(Path.join(target, dependence.key));

            if (!FS.existsSync(target))
                await Common.execute(`Linking ${$module.name} dependence[${dependence.key}]:`, `mklink /J ${target} ${source}`);
        }
    }
        
    for (let target of targets)
    {
        if (!FS.existsSync(Path.join(target.path, 'node_modules', '@surface')))
            await Common.execute(`Linking @surface on ${target.name}:`, `mklink /J ${Path.join(target.path, 'node_modules', '@surface')} ${Path.join(paths.modules, '@surface')}`);
    }

    console.log('Linking done!');
}

async function unlink()
{
    for (let $module of modules)
    {
        let targetFolder = Path.normalize(Path.join(paths.modules, $module.name, 'node_modules', '@surface'));

        if (FS.existsSync(targetFolder))
            await Common.execute(`Removing @surface on ${$module.name}:`, `rmdir /s /q ${targetFolder}`);
    }

    for (let target of targets)
    {
        if (FS.existsSync(Path.join(target.path, 'node_modules', '@surface')))
            await Common.execute(`Unlinking @surface link on ${target.name}:`, `rmdir /s /q ${Path.join(target.path, 'node_modules', '@surface')}`);
    }

    console.log('Unlinking done!');
}

async function relink()
{
    await unlink();
    await link();
}