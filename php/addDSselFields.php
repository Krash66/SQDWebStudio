<?php
$conn=mysqli_connect('localhost', 'id1531632_root','Ad1s0nR44t','id1531632_sqmeta');
$conn2=mysqli_connect('localhost', 'id1531632_root','Ad1s0nR44t','id1531632_sqmeta');
// Check connection
if (mysqli_connect_errno())
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
$sql = "SELECT objid, projName, envName, descName, descType, descId, fldName, parentName, seqno, isKey FROM descriptionfields WHERE descId='".$_POST["descId"]."'";  // and descType='".$_POST["descType"]."'
$result = mysqli_query ($conn,$sql);
if($result){
	while($row=mysqli_fetch_array($result)){
		
		$sql2 = "INSERT INTO dsselfields(projName, envName, sysName, engName, DSname, descName, descType, selName, fldName, parentName, seqno, descFldDesc, canNull, isKey, dateFormat, label, initVal, retype, invalid, extType, identVal, fKey) VALUES ('$row[projName]','$row[envName]','".$_POST["sysName"]."','".$_POST["engName"]."','". $_POST["DSname"]."','$row[descName]','".$row["descType"]."','".$_POST["selName"]."','$row[fldName]','$row[parentName]','$row[seqno]','','','$row[isKey]','','','','','','','','')";
		
		if (!mysqli_query($conn2,$sql2))
		{
			die('Error: ' . mysqli_error($conn2));
		}
	}   //end while
}else
{
	die('Error: ' . mysqli_error($conn));
}
mysqli_close($conn2);
mysqli_close($conn);
?>
