<?php
session_start();
$objid = $_POST['objid'];
$projN = $_POST['projName'];
$envN = $_POST['envName'];
$sysN = $_POST['sysName'];
$engN = $_POST['engName'];
$DSN = $_POST['DSname'];

$conn=mysqli_connect('localhost', 'id1531632_root','Ad1s0nR44t','id1531632_sqmeta');
// Check connection
if (mysqli_connect_errno())
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
// delete from dsselections  table
$sql="DELETE FROM dsselections WHERE projName = '".$projN."' AND envName = '".$envN."' AND sysName = '".$sysN."' AND engName = '".$engN."' AND DSname = '".$DSN."'";
if (!mysqli_query($conn,$sql))
{
	die('Error: ' . mysqli_error($conn));
}
// delete from dsselfields table
$sql="DELETE FROM dsselfields WHERE projName = '".$projN."' AND envName = '".$envN."' AND sysName = '".$sysN."' AND engName = '".$engN."' AND DSname = '".$DSN."'";
if (!mysqli_query($conn,$sql))
{
	die('Error: ' . mysqli_error($conn));
}
// delete from taskds table
$sql="DELETE FROM taskds WHERE projName = '".$projN."' AND envName = '".$envN."' AND sysName = '".$sysN."' AND engName = '".$engN."' AND DSname = '".$DSN."'";
if (!mysqli_query($conn,$sql))
{
	die('Error: ' . mysqli_error($conn));
}

mysqli_close($conn);
?>