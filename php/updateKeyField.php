<?php
// Open the session
session_start();
// create connection
$conn=mysqli_connect('localhost', 'id1531632_root','Ad1s0nR44t','id1531632_sqmeta');
// Check connection
$img = $_POST['image'];
$isKey = $_POST['isKey'];
$canNull = $_POST['canNull'];

if (mysqli_connect_errno())
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$sql="UPDATE `descfldtree` SET `im0`='".$img."',`im1`='".$img."',`im2`='".$img."' WHERE `objid`='$_POST[objid]'";
if (!mysqli_query($conn,$sql))
{
	die('Error: ' . mysqli_error($conn));
}
else
{
	$sql2="UPDATE `descriptionfields` SET `canNull`='".$canNull."',`iskey`='".$isKey."' WHERE `objid`='$_POST[objid]'";
	if (!mysqli_query($conn,$sql2))
	{
		die('Error2: ' . mysqli_error($conn));
	}
	else
	{
		echo "true";
	};
};


//Close db connection                                        
mysqli_close($conn);
?>
