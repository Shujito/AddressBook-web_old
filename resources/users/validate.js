// keep this function
var _error = error;
// make username lowercase
var lowerUsername = this.username.toLowerCase();
// get useres
dpd.users.get({
    username:lowerUsername
}, function(users,error) {
    // iterate
    for (var user in users) {
        if (users[user].username.toLowerCase() === lowerUsername) {
            _error('username', 'already in use');
        }
    }
});