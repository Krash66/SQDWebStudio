<?php
$conn=mysqli_connect('localhost', 'id1531632_root','Ad1s0nR44t','id1531632_sqmeta');
// Check connection
if (mysqli_connect_errno())
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
// projName, envName, sysName, engName, DSname, descName, selName, fldName, parentName, seqno, descFldDesc, canNull, isKey, dateFormat, label, initVal, retype, invalid, extType, identVal, fKey
// UPDATE Here
$sql="UPDATE dsselfields SET `descFldDesc`='".$_POST['fldDesc']."', `isKey`='".$_POST['isKey']."', `canNull`='".$_POST['canNull']."', `dateFormat`='".$_POST['dateFormat']."', `label`='".$_POST['label']."', `initVal`='".$_POST['initVal']."', `retype`='".$_POST['retype']."', `invalid`='".$_POST['invalid']."', `extType`='".$_POST['extType']."' WHERE `projName`='".$_POST['projName']."' AND `envName`='".$_POST['envName']."' AND `sysName`='".$_POST['sysName']."' AND `engName`='".$_POST['engName']."' AND `DSname`='".$_POST['DSname']."' AND `descName`='".$_POST['descName']."'AND `descType`='".$_POST['descType']."' AND `selName`='".$_POST['selName']."' AND `fldName`='".$_POST['fldName']."'";

if (!mysqli_query($conn,$sql))
{
	die('Error: ' . mysqli_error($conn));
}
//echo $sql;

mysqli_close($conn);
?>