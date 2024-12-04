import webpack from 'webpack';
import { Compiler, Configuration } from 'webpack';
import type {} from 'webpack-dev-server'

import path from 'path';
import { URL } from 'url';
import { globSync } from 'fs';
import { fetch, setGlobalDispatcher, Agent } from 'undici'

import LicenseWebpackPlugin from 'webpack-license-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Terser from 'terser-webpack-plugin';


const { sources, DefinePlugin, WebpackError } = webpack;

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

const dPages = globSync('src/components/pages/**/*.{tsx,mdx}');

const pagePaths = dPages.map((p) => {
    const file = p.replace('src/components/pages/', '');
    const page = file.replace(/(index)?.(tsx|mdx)/, '');
    return page.replace(/\/$/, '');
});

const entryNames = pagePaths.map((p) => p === '' ? 'index' : p);
const entryPaths = dPages.map((p, i) => [entryNames[i], path.resolve(__dirname, p)]);
const htmlPaths = entryNames.map((p, i) => [p, `${pagePaths[i]}/index.html`.replace(/^\//, '')]);

const samples = entryNames
    .filter((path) => path.startsWith('samples/'))
    .map((path) => path.replace('samples/', ''));

export default (env: Record<string, string>, argv: Record<string, string>): Configuration => {
    const { mode = 'development' } = argv;
    const isDev = mode === 'development';

    return {
        target: 'web',
        entry: Object.fromEntries(entryPaths),
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
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                modules: {
                                    namedExport: false,
                                    exportLocalsConvention: "as-is",
                                }
                            }
                        }
                    ],
                },
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    resourceQuery: { not: /raw/ },
                    use: {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: isDev,
                        },
                    },
                },
                {
                    test: /\.wgsl$/,
                    type: 'asset/source'
                },
                {
                    test: /\.(gltf)$/,
                    loader: "gltf-loader",
                },
                {
                    test: /\.(ktx2?|bin|jpe?g|png|hdr|webp|mp4)$/,
                    type: 'asset/resource'
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            alias: { public: path.resolve(__dirname, 'public') },
        },
        plugins: [
            ...htmlPaths.map(([title, filename]) => new HtmlWebpackPlugin({
                title: `cbunt portfolio${path.basename(title) === 'index' ? '' : ' -- ' + path.basename(title)}`,
                description: 'Cass Bunting\'s portfolio website',
                chunks: [title],
                filename,
                template,
                favicon
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
    }
};