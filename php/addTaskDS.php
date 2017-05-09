<?php

$conn=mysqli_connect('localhost', 'id1531632_root','Ad1s0nR44t','id1531632_sqmeta');
// Check connection
if (mysqli_connect_errno())
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$sql="INSERT INTO taskds (objid, projName, envName, sysName, engName, taskName, DSname, taskType, DSdir, DSimage) VALUES ('$_POST[objid]','$_POST[projName]','$_POST[envName]','$_POST[sysName]','$_POST[engName]','$_POST[taskName]','$_POST[DSname]','$_POST[taskType]','$_POST[DSdir]','$_POST[DSimage]')";

if (!mysqli_query($conn,$sql))
{
	die('Error: ' . mysqli_error($conn));
}
//echo "1 record added";

mysqli_close($conn);
?>
