var PythonShell = require('python-shell');
 
var options = {
  mode: 'text',
  pythonPath: '/bin/python',
  pythonOptions: ['-u'],
  scriptPath: '/home/iot/services/NoderedWordpressAuth/WordpressAuth.py',
  args: ['-u test', '-p value2']
};
 
PythonShell.run('my_script.py', options, function (err, results) {
  if (err) throw err;
  // results is an array consisting of messages collected during execution 
  console.log('results: %j', results);
});
