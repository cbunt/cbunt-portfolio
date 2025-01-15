import path from 'path';

import type { LoaderContext } from 'webpack';
import type VirtualModulesPlugin from 'webpack-virtual-modules';

export type PageLoaderOptions = {
    virtualModules: VirtualModulesPlugin,
    renderSource: string,
}

const  normalizeTSX = (path: string) => path.endsWith('tsx') ? path.replace('.tsx', '') : path;

export default function PageLoader(
    this: LoaderContext<PageLoaderOptions>,
    source: string,
) {
    const { virtualModules, renderSource } = this.getOptions();
    const { name, ext, dir } = path.parse(this.resourcePath);
    const emitPath = path.format({ name: `virtual:${name}`, ext, dir });

    const importPath = emitPath.endsWith('tsx')
        ? emitPath.replace('.tsx', '')
        : emitPath;

    const renderPath = path.isAbsolute(renderSource)
        ? renderSource
        : path.resolve(this.rootContext, renderSource);

    virtualModules.writeModule(emitPath, source);
    this.resourcePath = path.format({ name, dir, ext: 'ts' });

    return `
        import render from '${normalizeTSX(renderPath)}';
        import Page from '${normalizeTSX(importPath)}';

        render(Page);
    `;
};
