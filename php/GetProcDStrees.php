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
// variable for source or target icon
//$icontype = $_POST["icontype"];
//XML HEADER
echo "<?xml version=\"1.0\" encoding=\"iso-8859-1\" ?>\n";
// Open Tree at Project Folder
echo "<tree id='0'>\n";
// get tree nodes XML from metadata
$sql = "SELECT id, objid, DSimage, DSname FROM datastores WHERE projName='".$_POST["projName"]."' and envName='".$_POST["envName"]."' and sysName='".$_POST["sysName"]."' and engName='".$_POST["engName"]."' and DSdir='".$_POST["DSdir"]."'";
// get results from SQL query
$result = mysqli_query ($conn,$sql);
if($result){
	// create XML tree from list of datastores
	while($row=mysqli_fetch_array($result)){
		//echo list of datastores
		echo "<item id='".$row['objid']."' text='".$row['DSname']."' im0='".$row['DSimage']."' im1='".$row['DSimage']."' im2='".$row['DSimage']."'/>\n";
	}
}else{
	die('Error: ' . mysqli_error($conn));
}


//Close db connection
mysqli_close($conn);
//Close Tree Tag
echo "</tree>";
