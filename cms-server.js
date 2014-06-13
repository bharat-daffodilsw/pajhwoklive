var http = require('http');
var urlParser = require('url');
var fs = require("fs");
var responseType = {"Content Type":"applicatoin/json", "Access-Control-Allow-Origin":"*", "Access-Control-Allow-Methods":"GET, POST, OPTIONS"};

http.createServer(
    function (req, mainRes) {
        try {

            var url = urlParser.parse(req.url);
            var uri = url.pathname;
            var domain = req.headers.host;
			var queryParams = url.query;

            var imageIndex = uri.indexOf("/images/");
            var jsIndex = uri.indexOf("/js/");
            var cssIndex = uri.indexOf("/css/");
            if (imageIndex >= 0 || jsIndex >= 0 || cssIndex >= 0) {
                var resourceName;
                if (imageIndex >= 0) {
                    resourceName = uri.substring(imageIndex + 8);
                } else if (jsIndex >= 0) {
                    resourceName = uri.substring(jsIndex + 4);
                } else if (cssIndex >= 0) {
                    resourceName = uri.substring(cssIndex + 5);
                }

                var extension = uri.split('.').pop(),
                    extensionTypes = {
                        'css':'text/css',
                        'gif':'image/gif',
                        'jpg':'image/jpeg',
                        'jpeg':'image/jpeg',
                        'js':'application/javascript',
                        'png':'image/png'

                    };

                var imagePath = "pajhwok";

                mainRes.writeHead(200, {'Content-Type':extensionTypes[extension]});
                mainRes.end(fs.readFileSync('./' + imagePath + uri));

                return;


            } else {

                var options = {
                    host:'pajhwok.daffodilapps.com', path:uri + "?" + queryParams
                }

                var request = http.get(options, function (res) {
                    var imagedata = ''
                    res.setEncoding('binary')

                    res.on('data', function (chunk) {
                        imagedata += chunk
                    })
                    console.log("imagedata>>>>>>>>" + JSON.stringify(imagedata));
                    res.on('end', function () {
                        console.log("responese end called..")
                        mainRes.writeHead(200,responseType);
                        mainRes.write(imagedata);
                        mainRes.end();
                    })

                })
            }

        } catch (err) {
            mainRes.writeHead(404, responseType);
            mainRes.write("Error[" + err.stack + "]");
            mainRes.end();
        }


    }).listen(5400);
console.log('Server running at port : 5400');