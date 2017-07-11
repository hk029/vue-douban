require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})


app.get('/api/top250', function (req, res) {
    var page = req.query.page || 0;
    console.log(page);
    res.sendfile('./data/top250_' + page + '.json');
});

// 获取电影条目
app.get('/api/movie/subjects', function (req, res) {
    var id = req.query.id;
    var filename = './data/subjects_' + id + '.json';
    if (fs.existsSync(filename)) {
        res.sendfile(filename);
    } else {
        $http.get('https://api.douban.com/v2/movie/subject/' + id).then(data => {
            if (data.status === 200) {
                fs.writeFileSync(filename, JSON.stringify(data.data));
                console.log('get file ' + filename);
                res.send(JSON.stringify(data.data));
            }
        })
    }
});

// 获取最近上映电影
app.get('/api/getRecent', function (req, res) {
    res.sendfile('./data/recent.json');
});

// 获取当前上映电影
app.get('/api/current', function (req, res) {
    var page = req.query.page || 0;
    console.log(req.query.page);
    res.sendfile('./data/current_' + page + '.json');
});

// 获取即将上映电影
app.get('/api/commingsoon', function (req, res) {
    var page = req.query.page || 0;
    console.log(req.query.page);
    res.sendfile('./data/commingsoon_' + page + '.json');
});

// 获取即将上映电影
app.get('/api/usbox', function (req, res) {
    res.sendfile('./data/usbox.json');
});

var server = app.listen(port)





module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
