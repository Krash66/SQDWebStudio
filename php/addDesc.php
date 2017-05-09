<?php
// Open the session
session_start();
// create connection
$conn=mysqli_connect('localhost', 'id1531632_root','Ad1s0nR44t','id1531632_sqmeta');
// Check connection
if (mysqli_connect_errno())
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$sql="INSERT INTO descriptions (objid, projName, envName, descName, descType, recId, recName, recAlias, fpath1, fpath2, DBDname, segName, segId, descDesc) VALUES ('$_POST[objid]','$_POST[projName]','$_POST[envName]','$_POST[descName]','$_POST[descType]','$_POST[recId]','$_POST[recName]','$_POST[recAlias]','$_POST[fpath1]','$_POST[fpath2]','$_POST[dbdName]','$_POST[segName]','$_POST[segId]','$_POST[descDesc]')";

if (!mysqli_query($conn,$sql))
{
	die('Error: ' . mysqli_error($conn));
}
//echo "1 record added";
$sql="SELECT id FROM descriptions WHERE objid ='". $_POST["objid"]."' AND descType ='".$_POST['descType']."' ";
$result = mysqli_query ($conn,$sql);
if($result){
	while($row=mysqli_fetch_array($result)){
		//create xml tag for form data
		echo $row['id'];
	}
}else{
	die('Error: ' . mysqli_error($conn));
}
//Close db connection                                        
mysqli_close($conn);
?>

