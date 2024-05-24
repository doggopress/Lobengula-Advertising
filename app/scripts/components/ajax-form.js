import $ from 'jquery';

export default class ContactForm {

	constructor(options = {}) {

	}

	sendContact ( obj, callback ) {

		$.ajax({
			type: 'POST',
			method: 'POST',
			url: window.location.protocol + '//' + window.location.host + '/contact.php',
			withCredentials: false,
			timeout: 0,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: {
				'name': obj.name,
				'company': obj.company,
				'email': obj.email,
				'tel': obj.tel,
				'message': obj.message,
				'tos': obj.tos,
			}
		})
		.done( function(data, status) {

			data = JSON.parse(data);

			//console.log('SendContact Request:', data);

			callback( data.error, data, obj );

			//card.classList.add('done');
			/** /
			$('#form-response .message').text(data.message);
			$.fancybox.open({
				src: '#form-response',
				type: 'inline'
			});
			/**/

		});

	}

	submitForm() {

		const emailPattern = new RegExp(/^[\w]{1,}[\w.+-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$/);

		$('#contact-form').on('submit', (evt)=>{
			evt.preventDefault();

			$('#form-response').fadeOut();

			const name = document.querySelector('form [name="name"]'),
				company = document.querySelector('form [name="company"]'),
				tel = document.querySelector('form [name="tel"]'),
				email = document.querySelector('form [name="email"]'),
				message = document.querySelector('form [name="message"]'),
				tos = document.querySelector('form [name="tos"]');

			if ( name.value === '' ) {

				console.error('Name missing');

				$('#form-response .message').text('Please provide a name.');
				$('#form-response').fadeIn();

				//name.blur();

				$(name).addClass('error');

			} else if ( company.value === '' ) {

				$(name).addClass('success');

				console.error('Company name missing');

				$('#form-response .message').text('Please provide a company name.');
				$('#form-response').fadeIn();

				//company.blur();

				$(company).addClass('error');

			} else if ( !emailPattern.test( email.value ) ) {

				$(name).addClass('success');
				$(company).addClass('success');

				console.error('Email address not valid');

				$('#form-response .message').text('Email address not valid');
				$('#form-response').fadeIn();

				//email.blur();

				$(email).addClass('error');

			} else if ( tel.value === '' ) {

				$(name).addClass('success');
				$(company).addClass('success');
				$(email).addClass('success');

				console.error('Contact number missing');

				$('#form-response .message').text('Please provide a Contact number.');
				$('#form-response').fadeIn();

				//tel.blur();

				$(tel).addClass('error');

			} else if ( message.value === '' ) {

				$(name).addClass('success');
				$(company).addClass('success');
				$(email).addClass('success');
				$(tel).addClass('success');

				console.error('Message missing');

				$('#form-response .message').text('Please provide a message.');
				$('#form-response').fadeIn();

				//message.blur();

				$(message).addClass('error');

			} else if ( tos.checked === false ) {

				$(name).addClass('success');
				$(company).addClass('success');
				$(email).addClass('success');
				$(tel).addClass('success');
				$(message).addClass('success');

				console.error('Please confirm your agreement with our privacy policy.');

				//$('#form-response .message').text('Please provide a message.');
				//$('#form-response').fadeIn();

				//message.blur();

				$(tos).addClass('error');

			} else {

				$(name).addClass('success');
				$(company).addClass('success');
				$(email).addClass('success');
				$(tel).addClass('success');
				$(message).addClass('success');

				document.querySelector('form button').classList.add('disabled');

				$('#form-response').fadeOut();

				//card.classList.add('saving');
				this.sendContact({
					'name': name.value,
					'company': company.value,
					'email': email.value,
					'tel': tel.value,
					'message': message.value,
					'tos': tos.checked
				}, function(err, data) {

					if ( err === false ) {
						console.log('Success', err, data);
						$('#form-response').addClass('success');
						$('#form-response .message').text('Thank you, your message was sent successfully.');
						$('#form-response').fadeIn();

						document.querySelector('.form-contact').reset();

						setTimeout(function(){
							document.querySelector('.form-contact-submit').classList.remove('disabled');
							$('#form-response .message').text('');
							//MicroModal.close('modal-contact-form');
							$('#form-response').fadeOut();

						}, 4000);
					} else {

						$('#form-response .message').addClass('error');
						$('#form-response .message').text(data.message);
						$('#form-response').fadeIn();

						document.querySelector('.form-contact-submit').classList.remove('disabled');

					}

				});

			}

		});
	}
}
