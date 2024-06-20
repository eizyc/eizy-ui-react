const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// It's a UMD configuration
// Use tsconfig.json for ts-loader
// Use .babelrc for babel-loader
module.exports = {
  entry: {
    'index':  './src/index.tsx',
  }, // Entry
  output: {
    path: path.resolve(__dirname, 'dist/umd'),
    filename: '[name].js',
    library: {
      name: 'EizyUI', // The name of library
      type: 'umd', 
    },
    globalObject: 'this', // Ensures compatibility with browser and Node.js
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true, // Disable type-checking for faster builds
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  externals: {
    react: 'React',
   'react-dom': 'ReactDOM',
   axios: 'Axios'
  },
  plugins: [
    new BundleAnalyzerPlugin()
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        fortawesome: {
          test: /[\\/]node_modules[\\/](@fortawesome)[\\/]/,
          name: 'fortawesome',
          chunks: 'all',
          reuseExistingChunk: true,
          enforce: true,
          priority: 20,
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/i,
          name: 'vendor',
          chunks: 'all',
          reuseExistingChunk: true,
          enforce: true,
          priority: 10,
        }
      }
    }
  }
};