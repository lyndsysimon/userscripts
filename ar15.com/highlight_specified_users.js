// ==UserScript==
// @name         Highlight specified users
// @namespace    https://github.com/lyndsysimon/userscripts/
// @version      0.1
// @description  Highlight individual user posts on Arfcom
// @author       Lyndsy Simon
// @match        http://www.ar15.com/forums/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

var users = [
    'UserToHighlight',
    'OtherUserToHighlight'
];

for(var i=0; i<users.length; i++ ) {
    $('.skinBarAuthorRight:contains(' + users[i] + ')').parents('table').find('.postReplyBar').css({'background': 'red'});
}