<?php
session_start();
$conn=mysqli_connect('localhost', 'id1531632_root','Ad1s0nR44t','id1531632_sqmeta');
// Check connection
if (mysqli_connect_errno())
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
// plug in POST values into SQL
$sql="DELETE FROM maintree WHERE objid = '".$_POST['objid']."'";
// run Query
if (!mysqli_query($conn,$sql))
{
	die('Error: ' . mysqli_error($conn));
}
mysqli_close($conn);
?>
