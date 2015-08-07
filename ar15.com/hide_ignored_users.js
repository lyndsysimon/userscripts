// ==UserScript==
// @name         Hide threads by ignored users
// @namespace    https://github.com/lyndsysimon/userscripts/
// @version      0.1
// @description  enter something useful
// @author       Lyndsy Simon
// @match        http://www.ar15.com/*
// @grant        none
// ==/UserScript==

// Remove topics from ignored users
$('.forumBox + .repliesBox[style*=646464]').parent().remove()

// Re-apply classes to alternate row colors
$('div[class*=forumTable][class!=forumTableDarkNews][class!=forumTableLightNews]').each(function(idx, elem) {
    var e = $(elem);
    if (idx % 2 == 0) {
        if (e.hasClass('forumTableLight')) {
            e.removeClass('forumTableLight');
            e.addClass('forumTableDark');
        }
    } else {
        if (e.hasClass('forumTableDark')) {
            e.removeClass('forumTableDark');
            e.addClass('forumTableLight');
        }
    }
});
