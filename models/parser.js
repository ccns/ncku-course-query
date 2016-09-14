var request = require('request');
var cheerio = require('cheerio');
var _ = require('underscore');

function getIndexContent(callback) {
  request('http://course-query.acad.ncku.edu.tw/qry/index.php', function (error, response, body) {
    if(!error && response.statusCode == 200){
      var content = parseIndex(body);
      return callback(content);
    }
  })
}

function parseIndex(html) {
  var $ = cheerio.load(html, {decodeEntities: false});

  var menu = [];
  var relatedLinks = [];
  var deptList = {};
  deptList.colleges = [];
  deptList.depts = {};

  // Get menu
  menu.push({text: 'A9通識登記人數', href: 'http://course-query.acad.ncku.edu.tw/qry/qry_a9_register_num_02.php'})
  menu.push({text: '課綱查詢', href: 'http://class-qry.acad.ncku.edu.tw/syllabus/courseQuery.php'})
  menu.push({text: '服務學習推薦專區', href: 'http://cid.acad.ncku.edu.tw/files/14-1056-139460,r766-1.php?Lang=zh-tw'})
  menu.push({text: '跨領域學分學程', href: 'http://140.116.165.204/~contactuser/course/index.php'})

  // Get dept list
  var ul = $('#dept_list');
  ul.find('li').each(function() {
    var collegeName = $(this).find('.theader').text();
    var div = $(this).find('.tbody > div');
    var depts = [];
    div.each(function() {
      var a = $(this).find('a');
      depts.push({text: a.text(), href: a.attr('href'), type: $(this).attr('class')});
    });
    deptList.colleges.push(collegeName);
    deptList.depts[collegeName] = depts;
  });

  // Get related link
  var a = $('#links').find('a');
  a.each(function() {
    relatedLinks.push({text: $(this).text(), href: $(this).attr('href')});
  });

  return {deptList: deptList, menu: {menu: menu, relatedLink: relatedLinks}};
}

function getCourseContent(dept, callback) {
  request('http://course-query.acad.ncku.edu.tw/qry/qry001.php?dept_no=' + dept, function (error, response, body) {
    if(!error && response.statusCode == 200){
      var content = parseCourse(body);
      //console.log(content);
      return callback(content);
    }
  })
}

function parseCourse(html) {
  var $ = cheerio.load(html, {decodeEntities: false});

  var courses = [];
  var header = [];

  $('thead th').map((i,v)=>header.push($(v).text()));
  var tr = $('tr[class]')

  tr.each(function(i, v) {
    var c = {};
    var td = $(v).children();
    c.dept = td.eq(1).text();
    c.no = td.eq(2).text();
    c.serial = td.eq(3).text();
    c.clas = td.eq(5).text().trim();
    c.year = td.eq(6).text().trim();
    c.ge = td.eq(10).text();
    c.syllabus = td.eq(10).find('a').attr('href');
    c.teacher = td.eq(13).text();
    c.selected = td.eq(14).text();
    c.remain = td.eq(15).text();
    c.time = formatTime(td.eq(16).text());
    c.classroom = td.eq(17).text().replace(/\s+/g,' ');
    c.note = td.eq(18).text().trim();
    c.moodle = 'http://course-query.acad.ncku.edu.tw/qry/' + td.eq(18).find('a').attr('href');
    courses.push(c);
  });

  return {header: header, courses: courses};
}

function formatTime(timeStr) {
  var timeStr = timeStr.match(/\[.\].~.|\[.\]./g);
  var time = {};
  time.str = '';
  time.data = '';
  if (!timeStr) return time;
  for(var i=0; i<timeStr.length; i++) {
    time.data += period(timeStr[i]);
    time.str += timeStr[i];
    if (i!=timeStr.length-1) time.str += ',';
  }
  console.log(time);
  return time;
}

function period(t) {
  var d = day(t[1]);
  var p = t.match('~') ? [t[3], t[5]] : [t[3], t[3]];
  var s = '';
  for(var i=parseInt(p[0]); i<=parseInt(p[1]); i++)
    s += d+i;
  return s;
}

function day(d) {
  switch(d) {
  case '1': return 'M';
  case '2': return 'T';
  case '3': return 'W';
  case '4': return 'R';
  case '5': return 'F';
  case '6': return 'S';
  }
}

module.exports = {
  getIndexContent: getIndexContent, 
  getCourseContent: getCourseContent,
};
