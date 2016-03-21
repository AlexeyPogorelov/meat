(function($) {
    $('.container').on('click', '#paginate', function () {
        var type = $('#paginate').data('type');
        var page = $('#paginate').data('page');
        var slug = $('#paginate').data('slug');

        // if (slug) {
        //     data = {
        //         page: page,
        //         slug: slug
        //     }
        // } else {
        //     data = {
        //         page: page
        //     }
        // }

        if (type == "blog") {
            $('#paginate').request('onPaginate', {
                data: {
                    page: page
                },
                success: function(data) {
                    $('#paginate').remove();
                    $('#blog-articles .articles-holder').append(data['paginate-blog']);
                },
                update: {
                    'paginate-blog': ''
                }
            });
        } else {
            $('#paginate').request('onPaginate', {
                data: {
                    page: page
                },
                success: function(data) {
                    $('#paginate').remove();
                    $('#works-articles .articles-holder').append(data['paginate-works']);
                },
                update: {
                    'paginate-works': ''
                }
            });
        }
    });

    $('.container').on('click', '#paginate-works', function () {
        var page = $('#portfolio-presentation .portfolio-label').data('page');	
	
        $('#paginate-works').request('onPaginate', {
            data: {
                page: page
            },
            success: function(data) {
                $('#portfolio-presentation .portfolio-label').parent().remove();
                $('#portfolio-presentation .container').append(data['paginate-works-index']);
            },
            update: {
                'paginate-works-index': ''
            }
        });
    });
})(jQuery);
