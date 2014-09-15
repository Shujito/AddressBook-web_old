$(function() {
	dpd.users.me(function(me) {
		if (!!me) {
			var username = me.username[0].toUpperCase() + me.username.slice(1);
			$('#me').text(username + '\'s');
		} else {
			dpd.users.logout(function() {
				window.location.replace('/');
			});
		}
	});
	if (window.location.hash && window.location.hash !== '') {
		this.id = window.location.hash.slice(1);
		dpd.contacts.get(this.id, function(contact, error) {
			//console.log(contact, error);
			for (var key in contact) {
				var value = contact[key];
				$('input[name=' + key + ']').val(value);
			}
		});
		$('button#create').hide();
	} else {
		$('button#update').hide();
		$('button#delete').hide();
	}
	function createOrUpdate() {
		console.log(this);
		var fields = Utils.serializeInputs('form');
		var pass = true;
		pass = pass && fields.name !== '';
		pass = pass && fields.phone !== '';
		if (!pass) {
			if (fields.name === '') {
				$('input[name=name]').parent().addClass('has-error');
			}
			if (fields.phone === '') {
				$('input[name=phone]').parent().addClass('has-error');
			}
			$('#message').text('fill all the required fields');
			return false;
		}
		function relocate(contact,error) {
			console.log(contact,error);
			if (error) {
				$('#message').text(error.message);
				return;
			}
			window.location.replace('book.html');
		};
		if (window.document.id) {
			dpd.contacts.put(window.document.id, fields, console.log);
			console.log('put');
		} else {
			dpd.contacts.post(fields, console.log);
			console.log('post');
		}
	}
	$('button#create').on('click', createOrUpdate);
	$('button#update').on('click', createOrUpdate);
	$('button#delete').on('click', function() {
		if (!!confirm('It will be deleted, cannot be undone.')) {
			dpd.contacts.del(window.document.id, function(error) {
				window.location.replace('book.html');
			});
		}
	});
	$('form').submit(function() { return false; });
	$('input').on('focus',function(e) {
		if ($(this).parent().hasClass('has-error')) {
			$(this).parent().removeClass('has-error');
			$('#message').text('');
		}
	});
});