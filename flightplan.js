// flightplan.js
var plan = require('flightplan');

// configuration
plan.target('azure', {
  host: 'devops-days.cloudapp.net',
  username: 'jjmerelo',
  agent: process.env.SSH_AUTH_SOCK
});

// Local
plan.local(function(local) {
    local.echo('Plan local: push changes');
    local.exec('git push');
});

// run commands on the target's remote hosts
plan.remote(function(remote) {
    remote.log('Pull');
    remote.with('cd devops-days',function() {
	remote.sudo('git pull');
    });
});
