<?php

$conn=mysqli_connect('localhost', 'id1531632_root','Ad1s0nR44t','id1531632_sqmeta');
// Check connection
if (mysqli_connect_errno())
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$sql="INSERT INTO descfldtree (objid, projName, parentId, text, im0, im1, im2, checked, descId,  seqno) VALUES ('$_POST[objid]','$_POST[projName]','$_POST[parentId]','$_POST[text]','$_POST[im0]','$_POST[im1]','$_POST[im2]','$_POST[checked]','$_POST[descId]','$_POST[seqno]')";

if (!mysqli_query($conn,$sql))
{
	die('Error: ' . mysqli_error($conn));
};
echo $sql;

mysqli_close($conn);
?>
