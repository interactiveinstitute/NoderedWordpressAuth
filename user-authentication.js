
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
              pythonPath: '/bin/python',
              pythonOptions: ['-u'],
              scriptPath: '/home/iot/services/node-red',
              args: ['value1', 'value2', 'value3']
            };
             
            PythonShell.run('my_script.py', options, function (err, results) {
              if (err) throw err;
            
              resolve(results);
            });
            
            if (valid) {
                // Resolve with the user object. It must contain
                // properties 'username' and 'permissions'
                var user = { username: "admin", permissions: "*" };
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
            resolve({anonymous: true, permissions:"read"});
        });
    }
}

