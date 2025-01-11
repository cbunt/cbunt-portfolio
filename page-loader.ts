import path from 'path';

import type { LoaderContext } from 'webpack';
import type VirtualModulesPlugin from 'webpack-virtual-modules';

export type PageLoaderOptions = {
    virtualModules: VirtualModulesPlugin,
    renderSource: string,
}

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
        import render from '${renderPath}';
        import Page from '${importPath}';

        render(Page);
    `;
};
