
var when = require("when");

var PythonShell = require('python-shell');
 


module.exports = {
    type: "credentials",
    users: function(username) {
        return when.promise(function(resolve) {
            // Do whatever work is needed to check username is a valid
            // user.
            
            var options = {
              mode: 'text',
              pythonPath: '/usr/bin/python',
              pythonOptions: ['-u'],
              scriptPath: '/home/iot/services/NoderedWordpressAuth',
              args: ['-u',username]
            };
             
            PythonShell.run('WordpressAuth.py', options, function (err, results) {
              if (err) throw err;
              // results is an array consisting of messages collected during execution 
              //console.log('results: %j', results);
              
              var valid = 0;
              var premission = "read";
              
              if (results[0] == username)
              {
                valid = 1;
                
                if (results[1] == "administrator")
                {
                 var premission = "*"
                }
                
              }
           
            });
            
            if (valid) {
                // Resolve with the user object. It must contain
                // properties 'username' and 'permissions'
                var user = { username: username, permissions: premission };
                resolve(user);
            } else {
                // Resolve with null to indicate this user does not exist
                resolve(null);
            }
        });
    },
    authenticate: function(username,password) {
        return when.promise(function(resolve) {
            // Do whatever work is needed to validate the username/password
            // combination.

            var options = {
              mode: 'text',
              pythonPath: '/usr/bin/python',
              pythonOptions: ['-u'],
              scriptPath: '/home/iot/services/NoderedWordpressAuth',
              args: ['-u',username,'-p',password]
            };
             
            PythonShell.run('WordpressAuth.py', options, function (err, results) {
              if (err) throw err;
              // results is an array consisting of messages collected during execution 
              //console.log('results: %j', results);
              
              var valid = 0;
              var premission = "read";
              
              if ((results[0] == username) && (results[2] == 'True'))
              {
                valid = 1;
                
                if (results[1] == "administrator")
                {
                 var premission = "*"
                }
                
              }
	    });
           
            if (valid) {
                // Resolve with the user object. Equivalent to having
                // called users(username);
                var user = { username: "admin", permissions: "*" };
                resolve(user);
            } else {
                // Resolve with null to indicate the username/password pair
                // were not valid.
                resolve(null);
            }
        });
    },
    default: function() {
        return when.promise(function(resolve) {
            // Resolve with the user object for the default user.
            // If no default user exists, resolve with null.
            resolve(null);
        });
    }
}

