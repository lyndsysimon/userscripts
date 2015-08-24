// ==UserScript==
// @name         GitHub Code Review 
// @namespace    http://lyndsysimon.com
// @version      0.1
// @description  Makes my life easier on GitHub
// @author       Lyndsy Simon
// @match        https://github.com/*/pull*
// @grant        none
// ==/UserScript==

var initToggleDiffs = function () {
    $('.file.js-details-container').each(function(idx, elem) {
        var toggleButton = $('<a class="btn btn-sm">Toggle</a>');

        toggleButton.on('click', function(event) {
            var diff = $(event.target).parents('.file.js-details-container')
            // toggle the code view
            diff.find('.data').slideToggle() 
        });

        $(elem).find('.file-actions').prepend(toggleButton);
    });


    var toggleAllButton = $('<a class="btn btn-sm right" style="margin-right:10px">Toggle All</a>')
    .data('state', 'down')
    .on('click', function(event) {
        var btn = $(event.target);
        if (btn.data('state') === 'down') {
            $('.file.js-details-container .data').slideUp();
            btn.data('state', 'up');
        } else {
            $('.file.js-details-container .data').slideDown();
            btn.data('state', 'down');
        }
    });

    toggleAllButton.data('state', 1);

    $('#toc .btn-group.right').after(toggleAllButton);
}

urlParts = document.location.href.split('/')
if (urlParts[urlParts.length - 1] === 'files') {
    initToggleDiffs();
} else {
    $('a[data-container-id=files_bucket]').one('click', initToggleDiffs)
}
