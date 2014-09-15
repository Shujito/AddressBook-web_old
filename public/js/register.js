$(function() {
	dpd.users.me(function(me,error) {
		if (!!error) {
			dpd.users.logout();
			window.location.replace('/');
			return;
		}
		if (!!me) {
			window.location.replace('book.html');
		}
	});
	$('form').submit(function() {
		var fields = Utils.serializeInputs(this);
		var pass = true;
		pass = pass && fields.username !== '';
		pass = pass && fields.password !== '';
		pass = pass && fields.confirm !== '';
		if (!pass) {
			$('#message').text('All the fields are required');
			return false;
		}
		if (fields.password !== fields.confirm) {
			$('#message').text('passwords do not match');
			return false;
		}
		dpd.users.post(fields, function(user,error) {
			if (error) {
				$('#message').text('username ' + fields.username + ' ' + error.errors.username);
				return;
			}
			window.location.href = '.';
		})
		return false;
	});
});