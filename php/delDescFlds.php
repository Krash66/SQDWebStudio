<?php
session_start();
$objid = $_POST['objid'];
$projN = $_POST['projName'];
$envN = $_POST['envName'];
$descN = $_POST['descName'];

$conn=mysqli_connect('localhost', 'id1531632_root','Ad1s0nR44t','id1531632_sqmeta');
// Check connection
if (mysqli_connect_errno())
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
// delete from description fields tree table
$sql="DELETE FROM descfldtree WHERE descId = '".$objid."'";
if (!mysqli_query($conn,$sql))
{
	die('Error: ' . mysqli_error($conn));
}
// delete from descriptionfields table
$sql="DELETE FROM descriptionfields WHERE descId = '".$objid."'";
if (!mysqli_query($conn,$sql))
{
	die('Error: ' . mysqli_error($conn));
}
// delete from descriptselfields table
$sql="DELETE FROM descriptselfields WHERE objid = '".$objid."'";
if (!mysqli_query($conn,$sql))
{
	die('Error: ' . mysqli_error($conn));
}
// delete from descriptionselect table
$sql="DELETE FROM descriptionselect WHERE objid = '".$objid."'";
if (!mysqli_query($conn,$sql))
{
	die('Error: ' . mysqli_error($conn));
}
// delete from DSselection table
$sql="DELETE FROM dsselections WHERE projName = '".$projN."' AND envName = '".$envN."' AND descName = '".$descN."'";
if (!mysqli_query($conn,$sql))
{
	die('Error: ' . mysqli_error($conn));
}
// delete from DSselFlds table
$sql="DELETE FROM dsselfields WHERE projName = '".$projN."' AND envName = '".$envN."' AND descName = '".$descN."'";
if (!mysqli_query($conn,$sql))
{
	die('Error: ' . mysqli_error($conn));
}
mysqli_close($conn);
?>