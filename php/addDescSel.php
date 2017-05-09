<?php
// Open the session
session_start();
// create connection
$conn=mysqli_connect('localhost', 'id1531632_root','Ad1s0nR44t','id1531632_sqmeta');
// Check connection
if (mysqli_connect_errno())
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$sql="INSERT INTO descriptionselect (objid, projName, envName, descName, selName, isSysSel, selDesc) VALUES ('$_POST[objid]','$_POST[projName]','$_POST[envName]','$_POST[descName]','$_POST[selName]','$_POST[isSysSel]','$_POST[selDesc]')";

if (!mysqli_query($conn,$sql))
{
	die('Error: ' . mysqli_error($conn));
}
//echo "1 record added";

mysqli_close($conn);
?>

