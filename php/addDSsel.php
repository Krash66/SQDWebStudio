<?php

$conn=mysqli_connect('localhost', 'id1531632_root','Ad1s0nR44t','id1531632_sqmeta');
// Check connection
if (mysqli_connect_errno())
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$sql="INSERT INTO dsselections (objid, projName, envName, sysName, engName, DSname, selName, descName, descType) VALUES ('$_POST[objid]','$_POST[projName]','$_POST[envName]','$_POST[sysName]','$_POST[engName]','$_POST[DSname]','$_POST[selName]','$_POST[descName]','$_POST[descType]')";

if (!mysqli_query($conn,$sql))
{
	die('Error: ' . mysqli_error($conn));
}
//echo "1 record added";

mysqli_close($conn);
?>
