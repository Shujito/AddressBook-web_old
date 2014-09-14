$(function() {
	dpd.users.me(function(me,error) {
		if (!!error) {
			dpd.users.logout();
			window.location.replace('/');
			return;
		}
		if (!!me) {
			window.location.replace('contacts.html');
		}
	});
	$('form').submit(function() {
		var fields = Utils.serializeInputs(this);
		var pass = true;
		pass = pass && fields.username !== '';
		pass = pass && fields.password !== '';
		if (!pass) {
			$('#message').text('All the fields are required')
			return false;
		}
		fields.username = fields.username.toLowerCase();
		dpd.users.login(fields, function(user,error) {
			if (error) {
				$('#message').text(error.message);
				return false;
			}
			window.location.replace('contacts.html');
		})
		return false;
	});
});
