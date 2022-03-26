
const Encore = require("@symfony/webpack-encore");



// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || "dev");
}
/* -------------------------------------------------------------------------- */
/*                           en production seulement                          */
/* -------------------------------------------------------------------------- */
if (Encore.isProduction() == true) {
  const WebpackFavicons = require('webpack-favicons');
  Encore
    .addPlugin(
      new WebpackFavicons({
        src: './assets/sitepublic/favicon.svg',
        path: 'favicon',
        background: '#FFF',
        theme_color: '#FFF',
        cache: false,
        icons: {
          favicons: true,
          android: true,
          appleIcon: true,
          appleStartup: true,
          //coast: true, //opera //error
          //firefox: true, //error
          windows: true,
          yandex: true
        }
      }))
}
/* -------------------------------------------------------------------------- */
/*                         en developpement seulement                         */
/* -------------------------------------------------------------------------- */
else {
  Encore
    .addEntry("template", "./assets/tempjs/template.js")
    .addEntry("temppage", "./assets/tempjs/temppage.js")
}
/* -------------------------------------------------------------------------- */
/*                                 dev et prod                                */
/* -------------------------------------------------------------------------- */
Encore
  // directory where compiled assets will be stored
  .setOutputPath("public/build/")
  // public path used by the web server to access the output path
  .setPublicPath("/build")
  // only needed for CDN's or sub-directory deploy
  //.setManifestKeyPrefix('build/')
  /*
   * ENTRY CONFIG
   *
   * Each entry will result in one JavaScript file (e.g. app.js)
   * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
   */
  .addEntry("app", "./assets/app.js")
  .addEntry("admin", "./assets/admin.js")
  //.addEntry("collection", "./assets/js/collection.min.js")
  // enables the Symfony UX Stimulus bridge (used in assets/bootstrap.js)
  .enableStimulusBridge("./assets/controllers.json")

  // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
  .splitEntryChunks()

  // will require an extra script tag for runtime.js
  // but, you probably want this, unless you're building a single-page app
  .enableSingleRuntimeChunk()

  .copyFiles({
    from: "./assets/sitepublic/",
    to: "[path][name].[ext]",
  })
  .cleanupOutputBeforeBuild()
  .enableBuildNotifications()
  .enableSourceMaps(!Encore.isProduction())
  // enables hashed filenames (e.g. app.abc123.css)
  .enableVersioning(!Encore.isProduction())

  .configureBabel((config) => {
    config.plugins.push("@babel/plugin-proposal-class-properties");
  })

  // enables @babel/preset-env polyfills
  .configureBabelPresetEnv((config) => {
    config.useBuiltIns = "usage";
    config.corejs = 3;
  })

  // enables Sass/SCSS support
  .enableSassLoader()

  // uncomment if you use TypeScript
  //.enableTypeScriptLoader()

  // uncomment if you use React
  //.enableReactPreset()

  // uncomment to get integrity="..." attributes on your script & link tags
  // requires WebpackEncoreBundle 1.4 or higher
  //.enableIntegrityHashes(Encore.isProduction())

  // uncomment if you're having problems with a jQuery plugin
  .autoProvidejQuery()
  .autoProvideVariables({
    // indispensable pour les plugins jquery qui ne trouve pas $
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery",
  });

module.exports = Encore.getWebpackConfig();
