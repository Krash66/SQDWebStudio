<?php

$conn=mysqli_connect('localhost', 'id1531632_root','Ad1s0nR44t','id1531632_sqmeta');
// Check connection
if (mysqli_connect_errno())
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$sql="INSERT INTO maintree (projName, objid, parentId, text, im0, im1, im2, sqdType, loadFunction, Icon, tabId) VALUES ('$_POST[projName]','$_POST[objid]','$_POST[parentId]','$_POST[text]','$_POST[im0]','$_POST[im1]','$_POST[im2]','$_POST[sqdType]','$_POST[loadFunction]','$_POST[Icon]','$_POST[tabId]')";

if (!mysqli_query($conn,$sql))
{
	die('Error: ' . mysqli_error($conn));
}
//echo "1 record added";

mysqli_close($conn);
?>