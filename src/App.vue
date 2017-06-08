<template>
  <div id="app">
    <header-douban></header-douban>
    <router-view :movie="indata"></router-view>
  </div>
</template>

<script>
import HeaderDouban from './components/HeaderDouban'
import jsonp from 'jsonp';
export default {
  name: 'app',
  components: { HeaderDouban },
  data (){
    return {
        indata:{
            current:{
                subjects:[]
            },
            commingsoon:{
                subjects:[]
            }
        }
    }
  },
  created(){
        var that = this;
        jsonp('https://api.douban.com/v2/movie/in_theaters', null, function (err, data) {
            if (err) {
                console.error(err.message);
            } else {
                console.log(data);
                that.indata.current = data;
            }
        });
        jsonp('https://api.douban.com/v2/movie/coming_soon', null, function (err, data) {
            if (err) {
                console.error(err.message);
            } else {
                console.log(data);
                that.indata.commingsoon = data;
            }
        });
    }
}
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;*/
  height: 100%;
  margin:0;
}
/* 
html5doctor.com Reset Stylesheet
v1.4.1 
2010-03-01
Author: Richard Clark - http://richclarkdesign.com
*/

html, body, div, span, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
abbr, address, cite, code,
del, dfn, em, img, ins, kbd, q, samp,
small, strong, sub, sup, var,
b, i,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section, summary,
time, mark, audio, video {
    margin:0;
    padding:0;
    border:0;
    outline:0;
    font-size:100%;
    vertical-align:baseline;
    background:transparent;
}

body {
    line-height:1;
}

:focus {
	outline: 1;
}

article,aside,canvas,details,figcaption,figure,
footer,header,hgroup,menu,nav,section,summary { 
    display:block;
}

nav ul {
    list-style:none;
}

blockquote, q {
    quotes:none;
}

blockquote:before, blockquote:after,
q:before, q:after {
    content:'';
    content:none;
}

a {
    margin:0;
    padding:0;
    border:0;
    font-size:100%;
    vertical-align:baseline;
    background:transparent;
}
a:link,a:visited,a:active,a:hover{
    color:#fff;
    text-decoration:none;
}
ins {
    background-color:#ff9;
    color:#000;
    text-decoration:none;
}

mark {
    background-color:#ff9;
    color:#000; 
    font-style:italic;
    font-weight:bold;
}

del {
    text-decoration: line-through;
}

abbr[title], dfn[title] {
    border-bottom:1px dotted #000;
    cursor:help;
}

table {
    border-collapse:collapse;
    border-spacing:0;
}
  
hr {
    display:block;
    height:1px;
    border:0;       
    border-top:1px solid #cccccc;
    margin:1em 0;
    padding:0;
}

input, select {
    vertical-align:middle;
}
ul{
    list-style:none;
    padding:0;
    margin:0;
}
ul li{
    padding:0;
    margin:0;
}
</style>
