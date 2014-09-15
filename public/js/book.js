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
	dpd.contacts.get({$sort:{name:1,phone:1}},function(contacts,error) {
		// detach this
		var template = $('table > tbody > tr').detach();
		for (var contact in contacts) {
			var tableRow = template.clone();
			tableRow.attr('id',contacts[contact].id)
			tableRow.find('[name=name]').text(contacts[contact].name + ' ' + contacts[contact].lastname);
			tableRow.find('[name=phone]').text(contacts[contact].phone);
			tableRow.find('[name=address]').text(contacts[contact].address || '(unspecified)');
			if (!contacts[contact].address) {
				tableRow.find('[name=address]').addClass('text-muted');
			}
			$('tbody').append(tableRow);
			tableRow.on('click', function() {
				window.location.replace('contact.html#' + this.id)
			});
		}
	});
});