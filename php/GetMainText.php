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
$sql = "SELECT mappingSrc FROM taskmap WHERE objid='".$_POST["objid"]."'";
//echo $sql;
// get results from SQL query
$result = mysqli_query ($conn,$sql);
if($result){
	while($row=mysqli_fetch_array($result)){
		// echo each row in the grid
		echo  $row['mappingSrc'];   
	}
}else{
	die('Error: ' . mysqli_error($conn));
}
//Close db connection                                                                                                                                              
mysqli_close($conn);

?>