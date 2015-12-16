(function() {
    /*
    COOKIE OPERATION
     */

    var cookiesUtil = {}
    cookiesUtil.set = function(name, value, options) {
        var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
        if (options) {
            if (options.expires && options.expires instanceof Date) {
                cookieText += ';expires=' + options.expires.toGMTString();
            }
            if (options.path) {
                cookieText += ';path=' + options.path;
            }
            if (options.domain) {
                cookieText += ';domain=' + options.domain;
            }
            if (options.secure) {
                cookieText += ';secure=' + options.secure;
            }
        }
        document.cookie = cookieText;
    }
    cookiesUtil.get = function(name) {
        var cookieName = encodeURIComponent(name),
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null;
        if (cookieStart > -1) {
            var cookieEnd = document.cookie.indexOf(';', cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart, cookieEnd));
        }
        return cookieValue;
    }
    cookiesUtil.unset = function(name) {
        this.set(name, '', {
            expires: (new Date(0)).toGMTString(),
            path: '/',
            secure: true
        });
    }

    /*
    POSTS DISPLAY OPERATION
     */
    $('.menubar > li:lt(2) a').each(function() {
        if ($(this)[0].href == String(window.location)) {
            $(this).attr('href', 'javascript:void(0)').parent('li').addClass('pushed');
        }
    });

    $('.menubar li:not(".wide")').click(function(e) {
        $(this).addClass('pushed');
    });

    var isWide = cookiesUtil.get('isWide');
    if (isWide) {
        $('#wrapper').addClass('widen');
        $('.wide').addClass('pushed');
    }

    $('.wide').click(function() {
        isWide = cookiesUtil.get('isWide');
        $('.wide').toggleClass('pushed');
        if (isWide) {
            cookiesUtil.unset('isWide');
            $('#wrapper').removeClass('widen');
        } else {
            cookiesUtil.set('isWide', 'wide', {
                path: '/'
            });
            $('#wrapper').addClass('widen');
        }
    });
})()
