// ==UserScript==
// @name         Hide quoteblocks from ignored users
// @namespace    https://github.com/lyndsysimon/userscripts/
// @version      0.1
// @description  enter something useful
// @author       Lyndsy Simon
// @match        http://www.ar15.com/*
// @grant        none
// ==/UserScript==

var getIgnoredUsers = function(options) {
    // If `options` wasn't passed, set it to an empty object
    options = typeof(options) == 'undefined' ? {} : options;

    // If there isn't a list of ignored users, force refresh
    if (window.localStorage.getItem('ignoredUsers') === null) {
        options.refresh = true;
    }

    if (options.refresh) {
        // Make a synchronous request to get the ignore list.
        var request = $.ajax({
            async: false,
            url: '//www.ar15.com/member/editIgnore.html',
            success: function(data) {
                var ignoredUsers = [];
                $(data).find('.darkBarHeadlineMediaTitle').each(function(idx, elem) {
                    ignoredUsers.push($(elem).text());
                });
                window.localStorage.setItem('ignoredUsers', JSON.stringify(ignoredUsers));
            }
        });

    };

    return JSON.parse(window.localStorage.getItem('ignoredUsers'));
}

getIgnoredUsers();

var getIgnoredQuotes = function() {
    return $('div.quoteStyle').filter(function(idx, elem) {
        var ignoredUsers = JSON.parse(localStorage.getItem('ignoredUsers'));
        for (var i=0; i<ignoredUsers.length; i++) {
            if ($(elem).text().indexOf("Originally Posted By " + ignoredUsers[i] + ":") != -1) {
                return true
            }
        }
        return false;
    });
};

getIgnoredQuotes().wrap('<div class="ignoredQuote"></div>');

var toggleQuoteButton = $('<button>Click to toggle quote block containing comment by an ignored user</button>');
toggleQuoteButton.on('click', function(event) {
    $(event.target).parent().find('> .quoteStyle').slideToggle();
});

$('.ignoredQuote').prepend(toggleQuoteButton);



/**********
* Add CSS *
**********/
var stylesheet = document.createElement('style');
document.body.appendChild(stylesheet);

var addStyle = function(str) {
    stylesheet.innerHTML += str;
}

addStyle('.ignoredQuote > .quoteStyle { display: none }');
