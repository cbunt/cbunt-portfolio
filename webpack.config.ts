import webpack, { sources, DefinePlugin, WebpackError } from 'webpack';
import { Compiler, Configuration } from 'webpack';
import type {} from 'webpack-dev-server'

import path from 'path';
import { URL } from 'url';
import { globSync } from 'fs';
import { fetch, setGlobalDispatcher, Agent } from 'undici'

import LicenseWebpackPlugin from 'webpack-license-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Terser from 'terser-webpack-plugin';
import VirtualModulesPlugin from 'webpack-virtual-modules';
import { PageLoaderOptions } from './page-loader';

// allows fetching robots.txt without timing out
setGlobalDispatcher(new Agent({ connect: { timeout: 60_000 } }) )

declare module "fs" {
    function globSync(pattern: string): string[];
}

const __dirname = new URL('.', import.meta.url).pathname;
const template = path.resolve(__dirname, 'public', 'index.html');
const favicon = path.resolve(__dirname, 'public', 'favicon.ico');

const robotsUrl = 'https://raw.githubusercontent.com/mitchellkrogza/nginx-ultimate-bad-bot-blocker/master/robots.txt/robots.txt';
const gltfBaseURL = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/';
const gltfIndexFile = 'model-index.json'
const hdrBaseURL = 'https://api.github.com/repos/KhronosGroup/glTF-Sample-Environments/contents?ref=low_resolution_hdrs';

const pageDir = path.resolve(__dirname, 'src', 'pages');
const pages = globSync(`${pageDir}/**/*.{mdx,tsx}`);

const entryPoints = pages.map((p) => {
    const page = p.replace(pageDir, '')
        .replace(/.(tsx|mdx)/, '')
        .replaceAll('/index', '')
        .replace(/^\//, '');

    return [page, p];
});

const samples = entryPoints
    .filter(([name]) => name.startsWith('samples/'))
    .map(([name]) => name.replace('samples/', ''));

export default (env: Record<string, string>, argv: Record<string, string>) => {
    const { mode = 'development' } = argv;
    const isDev = mode === 'development';
    const virtualModules = new VirtualModulesPlugin();

    const tsLoader = {
        loader: 'ts-loader',
        options: {
            transpileOnly: isDev,
        },
    };

    const cssLoader = {
        loader: "css-loader",
        options: {
            modules: {
                namedExport: false,
                exportLocalsConvention: "as-is",
            }
        }
    };

    return {
        target: 'web',
        entry: Object.fromEntries(entryPoints),
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].bundle.js',
            publicPath: '/',
            asyncChunks: true
        },
        module: {
            rules: [
                {
                    resourceQuery: /raw/,
                    type: 'asset/source'
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", cssLoader],
                },
                {
                    test: /\.s[ac]ss$/,
                    use: ["style-loader", cssLoader, "sass-loader"],
                },
                {
                    test: /\.(ts|tsx)$/,
                    resourceQuery: { not: /raw/ },
                    exclude: [/node_modules/, ...pages],
                    use: tsLoader,
                },
                {
                    include: pages,
                    use: [
                        tsLoader,
                        {
                            loader: path.resolve('./page-loader.ts'),
                            options: {
                                virtualModules,
                                renderSource: 'src/utils/render-page.tsx',
                            } satisfies PageLoaderOptions
                        }
                    ],
                },
                {
                    test: /\.mdx$/,
                    exclude: pages,
                    use: '@mdx-js/loader',
                },
                {
                    test: /\.(jpe?g|png|mp4)$/,
                    type: 'asset/resource',
                },
            ],
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            alias: { public: path.resolve(__dirname, 'public') },
        },
        plugins: [
            virtualModules,
            ...entryPoints.map(([name]) => new HtmlWebpackPlugin({
                title: `cbunt portfolio${path.basename(name) === '' ? '' : ' - ' + path.basename(name)}`,
                description: 'Cass Bunting\'s portfolio website',
                chunks: [name],
                filename: `${name}/index.html`.replace(/^\//, ''),
                template,
                favicon,
            })),
            new DefinePlugin({
                SAMPLES__: JSON.stringify(samples),
                HDR_BASE_URL__: JSON.stringify(hdrBaseURL),
                GLTF_INDEX_FILE__: JSON.stringify(gltfIndexFile),
                GLTF_BASE_URL__: JSON.stringify(gltfBaseURL),
            }),
            !isDev && {
                apply(compiler: Compiler) {
                    const pluginName = 'fetch badbots robots.txt';
                    compiler.hooks.compilation.tap(pluginName, (compilation) => {
                        compilation.hooks.additionalAssets.tapPromise(pluginName, async () => {
                            try {
                                const source = await fetch(robotsUrl).then((res) => res.text());;
                                compilation.emitAsset('robots.txt', new sources.RawSource(source));
                            } catch (err) {
                                compilation.errors.push(new WebpackError(`${pluginName}: ${err?.message ?? err}`));
                            }
                        })
                    });
                },
            },
            !isDev && new LicenseWebpackPlugin(),
            !isDev && new webpack.BannerPlugin({
                banner: `For license information see: https://cbunt.ing/oss-licenses.json`,
                stage: webpack.Compilation.PROCESS_ASSETS_STAGE_DEV_TOOLING,
            }),
        ].filter(Boolean),
        performance: {
            hints: isDev ? false : 'warning',
            maxEntrypointSize: 512000,
            maxAssetSize: 512000
        },
        experiments: {
            syncWebAssembly: true
        },
        devtool: isDev ? 'eval-cheap-source-map' : 'source-map',
        devServer: {
            host: '0.0.0.0',
            open: true,
            hot: true,
            port: 3000,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
            }
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
            minimize: !isDev,
            minimizer: isDev ? undefined : [new Terser({
                extractComments: false,  
                terserOptions: {
                    format: {
                        comments: false,
                    },
                  },
            })],
        },
    } satisfies Configuration;
};