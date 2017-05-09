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

$checkedArray = array();
$i = 0;
$sql = "SELECT selName, descType FROM dsselections WHERE projName='".$_POST["projName"]."' and DSname='".$_POST["DSname"]."'";
$result = mysqli_query ($conn,$sql);
if($result){
	
	while($row=mysqli_fetch_array($result)){
		//create list of checked nodes
		array_push($checkedArray, $row["selName"].".".$row["descType"]);
		$i = $i + 1;
	}
}else{
	die('Error: ' . mysqli_error($conn));
}
echo json_encode($checkedArray);    //json_encode()
mysqli_close($conn);

?>