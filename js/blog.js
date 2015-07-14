'use strict';

var tad = tad || {};

tad.Blog = (function (Blog, $) {

    function expandContent(content, trigger) {
        content.removeClass('collapsed').addClass('expanded');
        trigger.text('Ocultar texto');
    };

    function collapseContent(content, trigger) {
        content.removeClass('expanded').addClass('collapsed');
        trigger.text('Ler mais');
    };

    Blog.addPosts = function (posts) {
        $('.blog-posts-container').html('');
        posts.map(function (post) {
            var postHtml = $('#blog-post-template').tmpl(post);
            postHtml.find('.read-more')
                .on('click', function (e) {
                    e.preventDefault();
                    var trigger = $(this);
                    var content = trigger.prev('.blog-post-content');
                    content.hasClass('collapsed')
                        ? expandContent(content, trigger)
                        : collapseContent(content, trigger);
                });

            $('.blog-posts-container').append(postHtml);
        });
    };

    Blog.convertPost = function (post) { };

    return Blog;

})(tad.Blog || {}, $);