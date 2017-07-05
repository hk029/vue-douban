var express = require('express');
var app = express();
var fs = require('fs');
var request = require('request');
var schedule = require('node-schedule');
var $http = require('axios');


app.use(express.static('dist'));

app.get('/api/getTop250', function(req, res) {
  res.send('123');
});

app.get('/api/getRecent', function(req, res) {
  res.sendfile('./data/recent.json');
});

app.get('/api/current', function(req, res) {
    var page = req.query.page || 0;
    console.log(req.query.page);
    res.sendfile('./data/current_' + page + '.json');
});

app.get('/api/commingsoon', function(req, res) {
    var page = req.query.page || 0;
    console.log(req.query.page);
    res.sendfile('./data/commingsoon_' + page + '.json');
});


function getDataPerPage(url,namePrefix,pageCount){
  $http
    .get(url)
    .then(res => {
      if (res.status === 200) {
        var data = res.data;
        var curPage = 0;
        var tmp = [];
        for (var i = 0; i < data.total; i++) {
          tmp.push(data.subjects[i]);
          if ((i % pageCount === 0 && i !== 0) || i === data.total - 1) {
            fs.writeFileSync(
              './data/' + namePrefix + '_' + curPage++ + '.json',
              JSON.stringify({
                total: data.total,
                hasNext: i !== data.total - 1,
                subjects: tmp
              })
            );
          }
        }
      }
    });
}


// 每小时定期爬取豆瓣数据
var rule = new schedule.RecurrenceRule();
rule.minute = 1;
var j = schedule.scheduleJob(rule, function() {
  console.log('执行任务');
  getDataPerPage('https://api.douban.com/v2/movie/in_theaters?count=100','current',20);
  getDataPerPage('https://api.douban.com/v2/movie/coming_soon?count=100','commingsoon',20);
});
getDataPerPage('https://api.douban.com/v2/movie/in_theaters?count=100','current',20);
var server = app.listen(8000, function() {
  console.log('listening at http://localhost:8000');
});
