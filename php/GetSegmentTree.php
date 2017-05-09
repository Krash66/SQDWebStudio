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

//FUNCTION TO USE IN THE CODE LATER
//print tree XML based on parent_id (function calls itself to go through the nested levels)
function getLevelFromDB($parent_id,$cnn){
	
	//get tree level from database taking parent id as incomming argument
	$sql = "SELECT `id`, `objid`, `projName`, `envName`, `descName`, `descType`, `segName`, `parentId`, `text`, `im0`, `im1`, `im2` FROM `segtree` WHERE  parentId='".$parent_id."' and projName='".$_POST["projName"]."' and envName='".$_POST["envName"]."' and descName='".$_POST["descName"]."' and descType='".$_POST["descType"]."'";
	$result = mysqli_query ($cnn,$sql);
	if($result){
		while($row=mysqli_fetch_array($result)){
			//create xml tag for tree node
			echo "<item id='".$row['objid']."' text='".$row['text']."' im0='".$row['im0']."' im1='".$row['im1']."' im2='".$row['im2']."'>\n";
			//echo "<userdata name='sqdType'>".$row['sqdType']."</userdata>\n";
			//echo "<userdata name='Icon'>".$row['Icon']."</userdata>\n";
			//echo "<userdata name='loadFunction'>".$row['loadFunction']."</userdata>\n";
			//echo "<userdata name='tabId'>".$row['tabId']."</userdata>\n";
			// recurse to include child nodes
			getLevelFromDB($row['objid'],$cnn);
			//close xml tag for the node
			echo "</item>\n";
		}
	}else{
		die('Error: ' . mysqli_error($cnn));
	}
}

//XML HEADER
echo "<?xml version=\"1.0\" encoding=\"iso-8859-1\" ?>\n"; 
// Open Tree at Project Folder
echo "<tree id='0'>\n";
//Call function to print tree XML
getLevelFromDB('0',$conn);
//Close db connection                                                                                                                                               
mysqli_close($conn);
//Close Tree Tag
echo "</tree>";

?>
