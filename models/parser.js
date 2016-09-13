var request = require('request');
var cheerio = require('cheerio')

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
    c['moodle'] = {};
    td.each(function(di, dv) {
      c[header[di]] = {};
      c[header[di]].text = $(dv).text();
      if ( di==10 )
        c[header[di]].href = 'http://course-query.acad.ncku.edu.tw/qry/' + $(dv).find('a').attr('href');
      if ( di==18 )
        c['moodle'].href = 'http://course-query.acad.ncku.edu.tw/qry/' + $(dv).find('a').attr('href');
    });
    courses.push(c);
  });

  return {header: header, courses: courses};
}

module.exports = {getIndexContent: getIndexContent, getCourseContent: getCourseContent};
