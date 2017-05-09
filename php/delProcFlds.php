<?php
session_start();
$objid = $_POST['objid'];

$conn=mysqli_connect('localhost', 'id1531632_root','Ad1s0nR44t','id1531632_sqmeta');
// Check connection
if (mysqli_connect_errno())
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
// delete from taskds fields tree table
$sql="DELETE FROM taskds WHERE objid = '".$objid."'";
if (!mysqli_query($conn,$sql))
{
	die('Error: ' . mysqli_error($conn));
}
// delete from taskmap table
$sql="DELETE FROM taskmap WHERE objid = '".$objid."'";
if (!mysqli_query($conn,$sql))
{
	die('Error: ' . mysqli_error($conn));
}
mysqli_close($conn);
?>