<?php
//Start session
session_start();
//$_SESSION['sess_user_id'] = "Tom";
//Check whether the session variable sess_user_id is present or not
//if(!isset($_SESSION['sess_user_id']) || (trim($_SESSION['sess_user_id']) == '')) {
	//header("location: login.html");
	//$_SESSION['sess_user_id'] = "User";
	//$_SESSION['username'] = "User";
	//$_SESSION['password'] = "User";
	//exit();
//};
//else
//{
	//header("location: indexMain.html");
	//exit();
//}
$_SESSION['sess_user_id'] = "User";
$_SESSION['username'] = "User";
$_SESSION['password'] = "User";
header("location: ../Studio/indexMain.html");
?>
