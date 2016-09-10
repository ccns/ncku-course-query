console.log('working!');

var unbind_event_listeners = function (node) {
    var parent = node.parentNode;
    if (parent) {
        parent.replaceChild(node.cloneNode(true), node);
    } else {
        var ex = new Error("Cannot remove event listeners from detached or document nodes");
        ex.code = DOMException[ex.name = "HIERARCHY_REQUEST_ERR"];
        throw ex;
    }
};

// Remove style
$('link[href="style/common.css"]').remove();
$('*').removeAttr('style');

// Remove useless tag
$('#menus, #msg, #links, #nav, #dept_list p,.header, #func > a, #func li:nth-child(-n+2), #f_keyword, #f_general, #f_general_courses, div[aria-labelledby="ui-dialog-title-newsDialog"]').remove();
$('#func').contents().filter(function(){ return this.nodeType == 3; }).first().remove();

// Unbind click event
$('script[src="script/qry000.js"]').remove();
$(".institute a,.dept a").each(function() {
  unbind_event_listeners($(this)[0]);
});
unbind_event_listeners($('#s_tab3')[0]);
$('#s_tab3').attr('href', 'qry_a9_register_num_02.php')
            .attr('target', '_blank');
