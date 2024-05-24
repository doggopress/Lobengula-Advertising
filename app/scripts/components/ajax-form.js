import $ from 'jquery';

export default class ContactForm {

	constructor(options = {}) {
		this.options = Object.assign({
            onRefresh: (evt) => {},
			onError: (evt) => {},
			onSuccess: (evt) => {}
        }, options);
	}

	async sendContact ( obj ) {

		return new Promise( async (resolve, reject) => {

			$.ajax({
				type: 'POST',
				method: 'POST',
				url: window.location.protocol + '//' + window.location.host + '/contact.php',
				//url: 'https://staging.lobengulaadvertising.co.za/contact.php',
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
			.done( (serverResponse, status) => {

				let data = JSON.parse(serverResponse);

				console.log('SendContact Request:', data);
				//callback( data.error, data, obj );

				if( data.error === true ) {

					reject({
						error: data.error,
						input: null,
						message: data.message
					})

				} else {

					resolve({
						error: data.error,
						input: null,
						message: data.message
					});

				}

			})
			.catch((e)=>{
				let data = JSON.parse(e);

				if( data ) {
					reject({
						error: data.error,
						input: null,
						message: data.message
					});
				} else {
					reject(e);
				}
			})

		});

	}

	showMessage(error, input, message) {

		if( error === true ) {

			if( input !== null ) {
				$(input).addClass('error');
				input.blur();
			}

			
			$('#form-response').addClass('alert-danger');
			$('.form-response-message').text(message);
			$('#form-response').fadeIn();

			//this.fieldClassUpdate(error, fieldName)
			//this.options.formMessageElem.innerHTML(message);
			//FormContact.Utils.fadeIn( this.options.formMessageElem );
		} else {

			//$(input).removeClass('success');
			$('#form-response').addClass('alert-success');

			//input.blur();
			$('.form-response-message').text(message);
			$('#form-response').fadeIn();
			
		}
    }

	async validateInputs() {

		const emailPattern = new RegExp(/^[\w]{1,}[\w.+-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$/);

		return new Promise( async (resolve, reject) => {

			//const form = document.querySelector('#contact-form');
			//$('#form-response').fadeOut();

			const name = document.querySelector('form [name="name"]'),
				company = document.querySelector('form [name="company"]'),
				tel = document.querySelector('form [name="tel"]'),
				email = document.querySelector('form [name="email"]'),
				message = document.querySelector('form [name="message"]'),
				tos = document.querySelector('form [name="tos"]');

			if ( name.value === '' ) {

				reject({
					error: true,
					input: name,
					message: 'Please provide a name.'
				});

			} else if ( company.value === '' ) {

				$(name).addClass('success');
				reject({
					error: true,
					input: company,
					message: 'Please provide a company name.'
				});

			} else if ( !emailPattern.test( email.value ) ) {

				$(name).addClass('success');
				$(company).addClass('success');
				reject({
					error: true,
					input: email,
					message: 'Please provide a valid email address.'
				});

			} else if ( tel.value === '' ) {

				$(name).addClass('success');
				$(company).addClass('success');
				$(email).addClass('success');

				reject({
					error: true,
					input: tel,
					message: 'Please provide a Contact number.'
				});

			} else if ( message.value === '' ) {

				$(name).addClass('success');
				$(company).addClass('success');
				$(email).addClass('success');
				$(tel).addClass('success');

				reject({
					error: true,
					input: message,
					message: 'Please provide a message.'
				});

			} else if ( tos.checked === false ) {

				$(name).addClass('success');
				$(company).addClass('success');
				$(email).addClass('success');
				$(tel).addClass('success');
				$(message).addClass('success');

				$(['[for="privacy-policy"']).addClass('error');

				reject({
					error: true,
					input: tos,
					message: 'Please confirm your agreement with our privacy policy.'
				});

			} else {

				$(name).addClass('success');
				$(company).addClass('success');
				$(email).addClass('success');
				$(tel).addClass('success');
				$(message).addClass('success');

				//form.querySelector('button').classList.add('disabled');
				//$('#form-response').fadeOut();

				resolve({
					'name': name.value,
					'company': company.value,
					'email': email.value,
					'tel': tel.value,
					'message': message.value,
					'tos': tos.checked
				});
			}

		});
	}

	submitForm() {

		$('#contact-form').on('submit', (evt)=>{

			evt.preventDefault();

			this.validateInputs()
			.then((results)=>{

				return this.sendContact(results);

			})
			.then((serverResponse) => {

				if ( serverResponse.error === false ) {
					console.log('Success', serverResponse);

					this.options.onSuccess(serverResponse);

					$('#contact-form input, #contact-form input').removeClass('success error');

					$('#contact-form').trigger('reset');

					this.showMessage(serverResponse.error, null, serverResponse.message );

				} else {

					this.options.onError(serverResponse);

					this.showMessage(serverResponse.error, null, serverResponse.message );

				}
			})
			.catch((serverError)=>{

				console.error('FORM ERROR:', serverError);

				this.showMessage(
					serverError.error, 
					(serverError.input !== null) ? serverError.input: null,
					serverError.message 
				);

				this.options.onError(serverError);
				
			});

		});
	}
}
