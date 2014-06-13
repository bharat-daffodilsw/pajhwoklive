var forever = require("./forever-monitor");
var nodemailer = require("./nodemailer");

var child = new (forever.Monitor)('cms-server.js', {
        silent: false,
        max: 999999999,
        'killTree': true
    }
)

child.on('exit', function () {
    console.log('Twitter streaming server has exited after restarts');
});

child.on('restart', function (forever) {
    var options = {};
    options.to = "subhash.kumar@daffodilsw.com";
    options.subject = "Pajhwok Afghan Vote Restart";
    options.text = "Uncaught exception on Pajhwok Afghan Vote restarted [" + JSON.stringify(forever.times) + " ] times";
    var transport = nodemailer.createTransport("SMTP", {auth: {user: "wfparties@gmail.com", pass: "daffodil@1234"}, service: "gmail"});
    transport.sendMail(options, function () {
    });
});


child.on('error', function (err) {
    console.log('err >>>' + err.stack);
});

child.start();