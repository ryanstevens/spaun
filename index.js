
var spawn = require('child_process').spawn;

module.exports = function cmd() {

  var args = Array.prototype.slice.call(arguments);
  var cmd = args.shift();
  var cb = args.pop();
  var dataArr = [];

  var status = spawn(cmd, args);
  status.stdout.on('data', function (data) {
    dataArr.push(data.toString('utf8'));
  });

  status.stdout.on('end', function() {
    cb(null, dataArr.join(''));
  });

  status.stderr.on('data', function (data) {
    console.error(data.toString('utf8'));
    cb(data, null);
  });

  return status.stdout;
};