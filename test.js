var PythonShell = require('python-shell');
 
var options = {
  mode: 'text',
  pythonPath: '/usr/bin/python',
  pythonOptions: ['-u'],
  scriptPath: '/home/iot/services/NoderedWordpressAuth',
  args: ['-u test', '-p "ttes1234!"']
};
 
PythonShell.run('WordpressAuth.py', options, function (err, results) {
  if (err) throw err;
  // results is an array consisting of messages collected during execution 
  console.log('results: %j', results);
});
