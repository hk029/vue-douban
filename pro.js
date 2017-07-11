var express = require('express');
var app = express();
var fs = require('fs');
var schedule = require('node-schedule');
var $http = require('axios');

app.use(express.static('dist'));

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

// 获取数据，并分页存储
function getDataPerPage(url, namePrefix, pageCount, curPage = 0, total = 100) {
    var curPage = curPage || 0;
    var total = total || 100;
    $http
        .get(url)
        .then(res => {
            if (res.status === 200) {
                var data = res.data;
                var tmp = [];
                var pageEnd = Math.ceil(data.total / pageCount);
                total = Math.min(total, data.total);
                total = Math.min(total, data.count);
                for (var i = 1; i <= total; i++) {
                    tmp.push(data.subjects[i - 1]);
                    if ((i % pageCount === 0 && i !== 0) || i === total) {
                        fs.writeFileSync(
                            './data/' + namePrefix + '_' + curPage++ + '.json',
                            JSON.stringify({
                                total: data.total,
                                hasNext: pageEnd !== curPage,
                                subjects: tmp
                            })
                        );
                        tmp = [];
                        console.log('./data/' + namePrefix + '_' + (curPage - 1) + '.json successfull');
                    }
                }
            }
        });
}


// 每小时定期爬取豆瓣数据
var rule = new schedule.RecurrenceRule();
rule.minute = 1;
var j = schedule.scheduleJob(rule, function () {
    console.log('执行任务');
    getDataPerPage('https://api.douban.com/v2/movie/in_theaters?count=100', 'current', 20);
    getDataPerPage('https://api.douban.com/v2/movie/coming_soon?count=100', 'commingsoon', 20);
});

// getDataPerPage('http://localhost:8000/data/top250.json', 'top250', 20, 0, 250);

// for(var i = 0;i < 15; i++) {
//   var data = fs.readFileSync('');

// }

// function test (i,j) {
//     $http.get('https://api.douban.com/v2/movie/top250?count=250&start=' + i).then(
//         res => {
//             if (res.status === 200) {
//                 fs.writeFileSync('./dist/top250_' + j + '.json', JSON.stringify(res.data));
//                 console.log('successful');
//             }
//         }
//     )
// }


// // test(100,1);
// // test(200,2);
// var movies = {};
// for (var i = 0; i <= 5; i++) {
//   var tmp = JSON.parse(fs.readFileSync('./dist/top250_' + i + '.json'));
//   tmp.subjects.forEach(function (e) {
//     movies[e.title] = e;
//     // console.log(e.title);
//   }, this);
// }

// var i = 0;
// var list = [];
// for(key in movies) {
//   list.push(movies[key]);
// }
// list.sort(function(a,b){
//   return a.rating.average < b.rating.average;
// })

// list.forEach(e => {
//   console.log(e.title,e.rating.average);
// })

// fs.writeFileSync('./dist/data/top250.json', JSON.stringify({total:250, hasNext : false , subjects: list}));

var server = app.listen(8000, function () {
    console.log('listening at http://localhost:8000');
});
