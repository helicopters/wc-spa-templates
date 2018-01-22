function parseURL (_url) {
    var queryString = '';
    var url = _url || location.href;
    var index = url.indexOf('?');
    var map = {};

    if (index > -1) {
        if (url.indexOf('#', index) > -1) {
            queryString = url.split('?')[1].split('#')[0]
        } else {
            queryString = url.split('?')[1];
        }
    }

    queryString.split('&').forEach(function(item) {
        var t = item.split('=');
        map[t[0]] = t[1];
    });

    return map;
}

export default parseURL;