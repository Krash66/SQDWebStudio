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
// set all posted variables from Ajax
$objid = $_POST["objid"];								// proc objid
$projName = $_POST["projName"];							// proj Name
$envName = $_POST["envName"];							// env name
$sysName = $_POST["sysName"];							// sys name
$engName = $_POST["engName"];							// eng name
$taskName = $_POST["taskName"];							// task name
$taskType = $_POST["taskType"];							// task type
// Mappings
$mappingId = $_POST['mappingId'];						// mapping id of each mapping
$mappingDesc = $_POST['mappingDesc'];					// mapping descriptions
$tgt = $_POST['tgt']; 									// target fields
$src = $_POST['src'];									// source fields
$src = addslashes($src);

$srcType = $_POST['srcType'];							// source types
$tgtType = $_POST['tgtType'];							// target types
$srcParent = $_POST['srcParent'];						// src parents (description name)
$tgtParent = $_POST['tgtParent'];						// tgt parents (description name)
$srcDS = $_POST['srcDS'];								// src ds
$tgtDS = $_POST['tgtDS'];								// tgt ds

// first delete all old mappings for the proc
$sql = "DELETE FROM taskmap WHERE projName='".$_POST["projName"]."' and envName='".$_POST["envName"]."' and sysName='".$_POST["sysName"]."' and engName='".$_POST["engName"]."' and taskName='".$_POST["taskName"]."'";

$result = mysqli_query ($conn,$sql);
// if delete succeeds then insert new mappings in loop based on Mapping Id (numerical order)
if($result){
	// SQL to insert Main Function "mapping"
	$sql2 = "INSERT INTO taskmap(objid, projName, envName, sysName, engName, taskName, taskType, mappingId, mappingDesc, srcType, tgtType, mappingSrc, mappingTgt, srcParent, tgtParent, srcDS, tgtDS) VALUES ('".$objid."','".$projName."','".$envName."','".$sysName."','".$engName."','".$taskName."','".$taskType."',".$mappingId.",'".$mappingDesc."','".$srcType."','".$tgtType."','".$src."','".$tgt."','".$srcParent."','".$tgtParent."','".$srcDS."','".$tgtDS."')";
	// do insert
	$result = mysqli_query ($conn,$sql2);
	if($result){
		echo "true";
	}else{
		die('Error on insert :' . mysqli_error($conn));
	};
	echo "true ";
	echo $objid;
}else{
	die('Error: ' . mysqli_error($conn));
};

