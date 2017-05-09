<?php   // Use this for Windows build
ob_start();
session_start();

$username = $_POST['username'];
$password = $_POST['password'];
$host = $_SERVER['HTTP_HOST'];

$conn = mysql_connect('localhost', 'id1531632_root', 'Ad1s0nR44t');
mysql_select_db('id1531632_sqmeta', $conn);

$username = mysql_real_escape_string($username);
$query = "SELECT id, username, password, salt FROM member WHERE username = '$username';";

$result = mysql_query($query);

if(mysql_num_rows($result) == 0) // User not found. So, redirect to login_form again.
{
	header("Location: http://".$host."/SQDATA/Studio/login.html");
	exit();
}
 
$userData = mysql_fetch_array($result, MYSQL_ASSOC);
$hash = hash('sha256', $userData['salt'] . hash('sha256', $password) );
 
if($hash != $userData['password']) // Incorrect password. So, redirect to login_form again.
{
	header("Location:  http://".$host."/SQDATA/Studio/login.html");
	exit();
}else{ // Redirect to home page after successful login.
	session_regenerate_id();
	$_SESSION['sess_user_id'] = $userData['id'];
	$_SESSION['username'] = $userData['username'];
	$_SESSION['password'] = $userData['password'];
	
	header("Location:  http://".$host."/SQDATA/Studio/indexMain.php");
	exit();
}

?>

//
// // use this for Unix CC build
//ob_start();
//session_start();
//
//require_once( '../../includes/config/applicationConfig.inc.php' );
//
//require_once( DIR_SECURITY_INCLUDES . 'userSecurityUtil.inc.php' );
//
//if ( !checkAuthorized( ) ) {
//	$username = $_POST['username'];
//	$password = $_POST['password'];
//	$host = $_SERVER['HTTP_HOST'];
//
//	$message = login( $username, $password );
//
//	if ( $message != '' )
//	{
//		// echo "Got index...<br/>\n";
//		// exit(0);
//		changePage( "index.php", $message );
//	}
//	session_regenerate_id();
//}
//$_SESSION['sess_user_id'] = $_SESSION['uid'];
//$_SESSION['username'] = $_SESSION['id'];
//$_SESSION['password'] = "SECRET!";
//
//header("Location:  http://".$host."/Studio/indexMain.php");
//exit();
//
//?>
