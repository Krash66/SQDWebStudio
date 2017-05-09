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

$sql="INSERT INTO `descriptions`(`objid`, `projName`, `envName`, `descName`, `descType`, `fpath2`, `dbName`) VALUES ('$_POST[objid]','$_POST[projName]','$_POST[envName]','$_POST[descName]','$_POST[descType]','$_POST[fpath2]','$_POST[dbName]')";

if (!mysqli_query($conn,$sql))
{
	die('Error: ' . mysqli_error($conn));
	echo "false";
}
else
{
	echo "true";
};
//echo "1 record added";

//Close db connection                                        
mysqli_close($conn);
?>
