const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const { VueLoaderPlugin } = require('vue-loader')

// Main const. Feel free to change it
const PATHS = {
  src: path.join(__dirname, '/src'),
  dist: path.join(__dirname, '/dist'),
  assets: 'assets/',
}

// Pages const for HtmlWebpackPlugin
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#html-dir-folder
const PAGES_DIR = `${PATHS.src}/pug/pages/`
//const PAGES_DIR = PATHS.src;
const PAGES = fs
  .readdirSync(PAGES_DIR)
  .filter((fileName) => fileName.endsWith('.pug'))

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
  const config = {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  }

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin(),
    ]
  }

  return config
}

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
      },
    },
    'css-loader',
    'postcss-loader',
  ]
  if (extra) {
    loaders.push(extra)
  }
  return loaders
}

const babelOptions = (preset) => {
  const opts = {
    presets: ['@babel/preset-env'],
    plugins: ['@babel/plugin-proposal-class-properties'],
  }
  if (preset) {
    opts.presets.push(preset)
  }

  return opts
}

const plugins = () => {
  const base = [
    new CleanWebpackPlugin(),
    /*
          Automatic creation any html pages (Don't forget to RERUN dev server!)
          See more:
          https://github.com/vedees/webpack-template/blob/master/README.md#create-another-html-files
          Best way to create pages:
          https://github.com/vedees/webpack-template/blob/master/README.md#third-method-best
        */
    ...PAGES.map(
      (page) =>
        new HtmlWebpackPlugin({
          template: `${PAGES_DIR}/${page}`, //.pug
          filename: `./${page.replace(/\.pug/, '.html')}`, //.html
        })
    ),

    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/favicon.ico'),
        to: path.resolve(__dirname, 'dist'),
      },
      { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
      { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts` },
    ]),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].[hash].css`,
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer()],
      },
    }),
    new SpriteLoaderPlugin({
      plainSprite: true,
    }),
    new VueLoaderPlugin(),
  ]
  if (isProd) {
    base.push(new BundleAnalyzerPlugin())
  }
  return base
}

module.exports = {
  resolve: {
    modules: ['node_modules'],
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
      TweenLite: 'gsap/src/minified/TweenLite.min.js',
      TweenMax: 'gsap/src/minified/TweenMax.min.js',
      TimelineLite: 'gsap/src/minified/TimelineLite.min.js',
      TimelineMax: 'gsap/src/minified/TimelineMax.min.js',
      CSSRulePlugin: 'gsap/src/minified/plugins/CSSRulePlugin.min.js',
      CSSPlugin: 'gsap/src/minified/plugins/CSSPlugin.min.js',
      ScrollMagic: 'scrollmagic/scrollmagic/minified/ScrollMagic.min.js',
      'animation.gsap':
        'scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js',
      'debug.addIndicators':
        'scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js',
    },
  },
  //context: path.resolve(__dirname, 'src'),
  mode: 'development',
  externals: {
    paths: PATHS,
  },
  entry: {
    app: PATHS.src,
  },
  output: {
    filename: `${PATHS.assets}js/[name].[hash].js`,
    path: PATHS.dist,
    //publicPath: "./"
  },
  optimization: optimization(),
  devServer: {
    port: 8080,
  },
  devtool: isDev ? 'source-map' : '',
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: `${PATHS.assets}img`,
              publicPath: '../img',
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: `${PATHS.assets}fonts`,
              publicPath: '../fonts',
            },
          },
        ],
      },
      {
        test: /\.pug$/,
        oneOf: [
          // this applies to `<template lang="pug">` in Vue components
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader'],
          },
          // this applies to pug imports inside JavaScript
          {
            use: ['raw-loader', 'pug-plain-loader'],
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loader: {
            sass: 'vue-style-loader!css-loader!sass-loader',
          },
        },
      },
      {
        test: /\.svg$/, // your icons directory
        loader: 'svg-sprite-loader',
        options: {
          extract: true,
          spriteFilename: `${PATHS.assets}img/svg` + '/sprite.svg', // this is the destination of your sprite sheet
        },
      },
    ],
  },
}
