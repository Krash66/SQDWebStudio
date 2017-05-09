<?php

$conn=mysqli_connect('localhost', 'id1531632_root','Ad1s0nR44t','id1531632_sqmeta');
// Check connection
if (mysqli_connect_errno())
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
};

$sql="INSERT INTO descriptionfields (objid, projName, envName, descName, descId ,descType, fldName, parentName, seqno, descFldDesc, nchildren, nlevel, noccurs, noccno, dataType, legType, noffset, nlength, nscale, canNull, iskey) VALUES ('$_POST[objid]','$_POST[projName]','$_POST[envName]','$_POST[descName]','$_POST[descId]','$_POST[descType]','$_POST[fldName]','$_POST[parentName]','$_POST[seqno]','$_POST[descFldDesc]','$_POST[nchildren]','$_POST[nlevel]','$_POST[noccurs]','$_POST[noccno]','$_POST[dataType]','$_POST[legType]','$_POST[noffset]','$_POST[nlength]','$_POST[nscale]','$_POST[canNull]','$_POST[iskey]')";

if (!mysqli_query($conn,$sql))
{
	echo "false";
	die('Error: ' . mysqli_error($conn));
};
//else
//{
//	echo "1 record added";
//};



mysqli_close($conn);
?>