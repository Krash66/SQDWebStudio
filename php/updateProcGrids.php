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
$objid = $_POST["objid"];									//proc objid
$projName = $_POST["projName"];								//proj Name
$envName = $_POST["envName"];								//env name
$sysName = $_POST["sysName"];								//sys name
$engName = $_POST["engName"];								//eng name
$taskName = $_POST["taskName"];								//task name
$taskType = $_POST["taskType"];								//task type
// arrays
$mappingIdList = json_decode($_POST['mappingIdList']);		// list of mapping id of each mapping
$mappingDescList = json_decode($_POST['mappingDescList']);	// list of mapping descriptions
$tgtList = json_decode($_POST['tgtList']); 					//list of target fields
$srcList = json_decode($_POST['srcList']);					//list of source fields
$srcTypeList = json_decode($_POST['srcTypeList']);			// list of source types
$tgtTypeList = json_decode($_POST['tgtTypeList']);			// list of target types
$srcParentList = json_decode($_POST['srcParentList']);      // list of src parents (description name)
$tgtParentList = json_decode($_POST['tgtParentList']);      // list of tgt parents (description name)
$srcDSList = json_decode($_POST['srcDSList']);				// list of src ds
$tgtDSList = json_decode($_POST['tgtDSList']);				// list of tgt ds

// first delete all old mappings for the proc
//$sql = "DELETE FROM taskmap WHERE projName='".$_POST["projName"]."' and envName='".$_POST["envName"]."' and sysName='".$_POST["sysName"]."' and engName='".$_POST["engName"]."' and taskName='".$_POST["taskName"]."'";

//$sql = "DELETE FROM taskmap WHERE objid='".$objid."'\n";
//echo $sql."\n";
//$result = mysqli_query ($conn,$sql);
// if delete succeeds then insert new mappings in loop based on Mapping Id (numerical order)
//echo $result."\n";
//if(mysqli_query ($conn,$sql)){
	// loop through all mappings and insert
for ($x=0; $x<count($mappingIdList); $x++)
{
	//echo $srcList[$x];
	// SQL to insert mappings
	$sql2 = "INSERT INTO taskmap(objid, projName, envName, sysName, engName, taskName, taskType, mappingId, mappingDesc, srcType, tgtType, mappingSrc, mappingTgt, srcParent, tgtParent, srcDS, tgtDS) VALUES ('".$objid."','".$projName."','".$envName."','".$sysName."','".$engName."','".$taskName."','".$taskType."','".$mappingIdList[$x]."','".$mappingDescList[$x]."','".$srcTypeList[$x]."','".$tgtTypeList[$x]."','".$srcList[$x]."','".$tgtList[$x]."','".$srcParentList[$x]."','".$tgtParentList[$x]."','".$srcDSList[$x]."','".$tgtDSList[$x]."')";
	// do insert
	//$res2 = mysqli_query ($conn,$sql2);
	if(mysqli_query ($conn,$sql2)){
		echo " inner loop = true for loop# :".$x."\n";
	}else{
		die('Error inner loop: ' . mysqli_error($conn));
	};
};
echo "true "."\n";
echo $objid;
echo " count : ".count($mappingIdList)."\n";

