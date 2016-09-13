console.log('working!');

var menu = [];
var related_link = [];
var dept_list = [];

// Get menu
menu.push({text: 'A9通識登記人數', href: 'qry_a9_register_num_02.php'})
menu.push({text: '課綱查詢', href: 'http://class-qry.acad.ncku.edu.tw/syllabus/courseQuery.php'})
menu.push({text: '服務學習推薦專區', href: 'http://cid.acad.ncku.edu.tw/files/14-1056-139460,r766-1.php?Lang=zh-tw'})
menu.push({text: '跨領域學分學程', href: 'http://140.116.165.204/~contactuser/course/index.php'})

// Get dept list
var ul = $('#dept_list');
ul.find('li').each(function() {
  var div = $(this).find('.tbody > div');
  var depts = [];
  div.each(function() {
    var a = $(this).find('a');
    depts.push({text: a.text(), href: a.attr('href'), type: $(this).attr('class')});
  });
  dept_list.push( {college: $(this).find('.theader').text(),
                   depts: depts} );
});

// Get related link
var a = $('#links').find('a');
a.each(function() {
  related_link.push({text: $(this).text(), href: $(this).attr('href')});
});

// Remove all tag
$('body div').remove();
