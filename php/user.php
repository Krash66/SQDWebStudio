<?php
session_start();

$userinfo['uid'] =  $_SESSION['sess_user_id'];
$userinfo['username'] =  $_SESSION['sess_user_id']; // $_SESSION['username'];
$userinfo['password'] =  $_SESSION['password'];
//$userinfo[0] =  $_SESSION['sess_user_id'];
//$userinfo[1] =  "Tom";
//$userinfo[2] =  "bart66";

print(json_encode( $userinfo));

?>