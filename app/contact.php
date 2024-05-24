<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require 'vendor/autoload.php';

$errors         = array();      // array to hold validation errors
$data           = array();      // array to pass back data

// Only process POST reqeusts.
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if ( empty($_POST['name']) ) {

        $errors['name'] = 'Please enter a name.';
    
    } elseif( ValidateName($_POST['name']) ) {

        $_POST['name'] = trim(stripslashes($_POST['company']));

        $name = strip_tags(trim($_POST["name"]));
        $name = str_replace(array("\r","\n"),array(" "," "),$name);
    
        $name = trim(stripslashes($name));
    
    }
    
    if ( empty($_POST['company']) ) {
    
        $errors['company'] = 'Please enter a company name.';
        
    
    } elseif( ValidateName($_POST['company']) ) {
    
        $_POST['company'] = trim(stripslashes($_POST['company']));

        $company = strip_tags(trim($_POST["company"]));
        $company = str_replace(array("\r","\n"),array(" "," "),$company);
    
    }
    
    if ( empty($_POST['email']) ) {
    
        $errors['email'] = 'Please enter an email address.';
    
    } elseif( ValidateEmail($_POST['email']) ) {

        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    
        $_POST['email'] = trim(stripslashes($_POST['email']));
    
    } else {
    
        $errors['email'] = 'Please enter a valid e-mail address.';
    
    }
    
    if ( empty($_POST['tel']) ) {
    
        $errors['tel'] = 'Please enter a contact number.';
    
    } else {
    
        $_POST['tel'] = trim(stripslashes($_POST['tel']));
    
    }
    
    if ( empty($_POST['message']) ) {
    
        $errors['message'] = 'Please provide a message.';
    
    } else {
    
        $_POST['message'] = trim(stripslashes($_POST['message']));
    
    }


    // if there are any errors in our errors array, return a success boolean of false
if ( ! empty($errors)) {

	// if there are items in our errors array, return those errors
	$data['error'] 		= true;
	$data['message'] 	= $errors;

	exit(json_encode($data));

} else {

	// if there are no errors process our form, then return a message

	// DO ALL YOUR FORM PROCESSING HERE
	// Send
	/* */
	$to      = 'max.sibande@5ivedesign.io';
	$subject = 'LA Website Contact Form';
	//$message =
	$headers = 'From: no-reply@lobengulaadvertising.co.za' . "\r\n" .
		'Reply-To: '. $_POST['emailAddress'] . "\r\n" .
		'Content-type: text/html' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    /* * /
    ob_start();

    include_once( 'templates/email/email_template_header' );

    echo 'New subscription request for: '. $_POST['email'];

	include_once( 'templates/email/email_template_footer' );

	$message.= ob_get_contents();

    ob_end_clean();
    /**/

    $message="<h4>New Website Message:</h4>";
	$message.="<strong>Name:</strong> " . $_POST['name'] . " <br />";
	$message.="<strong>Company:</strong> " . $_POST['company'] . " <br />";
	$message.="<strong>contact Number:</strong> " . $_POST['tel'] . " <br />";
	$message.="<strong>Email:</strong> " . $_POST['email'] . " <br />";
    $message.="<br />";
	$message.="<strong>Message:</strong><br />" . $_POST['message'] . " <br />";
    $message.="---<br />";
	$message.="<h3>LOBENGULA ADVERTISING</h3>";
    $message.="<p>
                    <strong>E-mail:</strong><br />
                    info@lobengula.co.za
                    <br />
                    <br />
                    <strong>Web:</strong><br />
                    www.lobengula.co.za
                </p>";
    $message.="<br />";
	$message.="<br />";
	$message.="<br />";
	$message.="This message is sent via the contact form on https://www.lobengula.co.za. <small>THE CONTENTS OF THIS MESSAGE ARE CONFIDENTIAL AND INTENDED FOR THE ADDRESSEE ONLY.</small>";


	/**/
	// Instantiation and passing `true` enables exceptions
	/* */
	$mail = new PHPMailer(true);

	try {
		//Server settings
		//$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      // Enable verbose debug output
		$mail->isSMTP();                                            // Send using SMTP
		$mail->Host       = 'mail.lobengulaadvertising.co.za';                    // Set the SMTP server to send through
		$mail->SMTPAuth   = true;                                   // Enable SMTP authentication
		$mail->Username   = 'no-reply@lobengulaadvertising.co.za';                     // SMTP username
		$mail->Password   = '=J0;DbPY{-Qr';                               // SMTP password
		$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
		$mail->Port       = 465;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

		//Recipients
		$mail->setFrom('noreply@lobengulaadvertising.co.za', 'Lobengula Advertising');
		//$mail->addAddress('joe@example.net', 'Joe User');     		// Add a recipient
		$mail->addAddress('max.sibande@5ivedesign.io', 'Max Sibande');             	// Name is optional
		$mail->addReplyTo('info@lobengula.co.za', 'Lobengula Advertising');
		//$mail->addBCC('max.sibande@tbwa.co.za');

		// Attachments
		//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
		//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

		// Content
		$mail->isHTML(true);                                  // Set email format to HTML
		$mail->Subject = 'Website Contact Message';
		$mail->Body    = $message;
		$mail->AltBody = $message;

		$mail->send();

		$data['error'] 		= false;
		$data['message'] 	= 'Your message was sent successfully.';

		exit(json_encode($data));

	} catch (Exception $e) {

		//echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";

		$data['error'] 		= true;
		$data['ErrorInfo'] 	= $mail->ErrorInfo;
		$data['message'] 	= 'The message could not be sent. Please drop us an email on info@lobengula.co.za and we\'ll get back to you. Apologies for the inconvenience.';

		exit(json_encode($data));
	}
	/**/

}



} else {

    // Not a POST request, set a 403 (forbidden) response code.

    http_response_code(403);

    //echo "There was a problem with your submission, please try again.";

    $data['error'] 		= true;
	$data['message'] 	= "There was a problem with your submission, please try again.";;

	exit(json_encode($data));

}

#-----------------------------------------------------------------
# HELPERS
#-----------------------------------------------------------------

/**
 * trim till last space before 140 characters. cut by space, to not break words:
 *
 * @param characterset default is utf-8
 * @param string $str the string to shorten
 * @param int $maxlength the max string length to return
 * @param
 * @return string the shortened string
 */
function smartShorten($charset='utf-8', $str, $maxlength = 140, $max_cut_len = 10) {

	$len = iconv_strlen($str, $charset);

	if ($len > $maxlength) {
		$str = iconv_substr($str, 0, $maxlength, $charset);
    	$prev_space_pos = iconv_strrpos($str, ' ', $charset);
		if ( ($maxlength-$prev_space_pos) < $max_cut_len) {
			$str = iconv_substr($str, 0, $prev_space_pos, $charset);
		}
		$str .= '...';
	}
	return $str;
}
/**
 * Validate Name
 *
 * @param string email address
 * @return bool
 */
function ValidateName($name){
	// containsNumbers?
	return preg_match('/[0-9]+/', $name) > 0;

	//return empty($eregi) ? true : false;
}

/**
 * Validate Email Address
 *
 * @param string email address
 * @return bool
 */
function ValidateEmail($email){

	$regex = "^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$^";
	$eregi = preg_replace($regex,'', trim($email));

	return empty($eregi) ? true : false;
}


?>

