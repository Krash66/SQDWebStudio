<?php
// Open the session
session_start();
// Create MySQL connection
$conn=mysqli_connect('localhost', 'id1531632_root','Ad1s0nR44t','id1531632_sqmeta');
// Check connection
if (mysqli_connect_errno())
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

// SQL to get Mapping info
$sql = "SELECT `id`, `objid`, `projName`, `envName`, `descName`, `descType`, `fpath1`, `fpath2`, `dbName`, `DBDname`, `segName`, `segId`, `descDesc`, `CREATED_TIMESTAMP`, `UPDATED_TIMESTAMP`, `CREATED_USER_ID`, `UPDATED_USER_ID` FROM `descriptions` WHERE projName='".$_POST["projName"]."' and envName='".$_POST["envName"]."' and descName='".$_POST["descName"]."' and descType='".$_POST["descType"]."'";
 
$result = mysqli_query ($conn,$sql);
if($result){
	while($row=mysqli_fetch_array($result)){
		// echo each row in the grid
		$dbdinfo['fpath2'] =  $row['fpath2'];
		$dbdinfo['dbName'] =  $row['dbName'];

		print(json_encode( $dbdinfo));
	}
}else{
	die('Error: ' . mysqli_error($conn));
}
//Close db connection                               
mysqli_close($conn);
?>