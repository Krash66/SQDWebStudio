<?php
// Open the session
session_start();

$projName = $_POST["projName"];	  //proj Name
$fldName = $_POST["fldName"];     //eng id

try
{
	// generated report path
	$path = "SQDATA/Studio/temp/genScript/";
	$outPath = $_SERVER["DOCUMENT_ROOT"].$path;
	$outfile = $outPath.$projName.".rpt";
	$rptfile = fopen($outfile, "w") or die("Unable to open file!");
	
	// Create MySQL connection
	$cnn=mysqli_connect('localhost', 'id1531632_root','Ad1s0nR44t','id1531632_sqmeta');
	// Check connection
	if (mysqli_connect_errno())
	{
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}
	// find description containing field
	if(substr_count($fldName,"%") >0 || substr_count($fldName,"_") >0)
	{
		$sql = "SELECT `descName`,`fldName` FROM `descriptionfields` WHERE `projName`='".$projName."' and `fldName` LIKE '".$fldName."'";
		$result = mysqli_query ($cnn,$sql);
		if($result){
			$txt = " Field: ".$fldName."  found in the following descriptions:\n";
			fwrite($rptfile, $txt);
			while($row=mysqli_fetch_array($result)){
				// fill descriptions from DB
				$txt = "Description:   ".$row['descName']."   contains field:   ".$row['fldName']."\n";
				fwrite($rptfile, $txt);
			};
		};
	}
	else
	{
		$sql = "SELECT `descName`,`fldName` FROM `descriptionfields` WHERE `projName`='".$projName."' and `fldName`='".$fldName."'";
		$result = mysqli_query ($cnn,$sql);
		if($result){
			$txt = " Field: ".$fldName."  found in the following descriptions:\n";
			fwrite($rptfile, $txt);
			while($row=mysqli_fetch_array($result)){
				// fill descriptions from DB
				$txt = "   ".$row['descName']."\n";
				fwrite($rptfile, $txt);
			};
		};
	};
	
	
	// find datastores containing field
	if(substr_count($fldName,"%") >0 || substr_count($fldName,"_") >0)
	{
		$sql = "SELECT `DSname`,`fldName` FROM `dsselfields` WHERE `projName`='".$projName."' and `fldName` LIKE '".$fldName."'";
		$result = mysqli_query ($cnn,$sql);
		if($result){
			$txt = "\n Field: ".$fldName."  found in the following Datastores:\n";
			fwrite($rptfile, $txt);
			while($row=mysqli_fetch_array($result)){
				// fill datastores from DB
				$txt = "Datastore:   ".$row['DSname']."   contains field:   ".$row['fldName']."\n";
				fwrite($rptfile, $txt);
			};
		};
	}
	else
	{
		$sql = "SELECT `DSname`,`fldName` FROM `dsselfields` WHERE `projName`='".$projName."' and `fldName`='".$fldName."'";
		$result = mysqli_query ($cnn,$sql);
		if($result){
			$txt = "\n Field: ".$fldName."  found in the following Datastores:\n";
			fwrite($rptfile, $txt);
			while($row=mysqli_fetch_array($result)){
				// fill datastores from DB
				$txt = "   ".$row['DSname']."\n";
				fwrite($rptfile, $txt);
			};
		};
	};
	
	
	// find Procedures containing field
	if(substr_count($fldName,"%") >0 || substr_count($fldName,"_") >0)
	{
		$txt = "\n Field: ".$fldName."  found in the following Procedures:\n";
		fwrite($rptfile, $txt);
		$sql = "SELECT `taskName`,`mappingTgt` FROM `taskmap` WHERE `projName`='".$projName."' and `mappingTgt` LIKE '".$fldName."'";
		$result = mysqli_query ($cnn,$sql);
		if($result){
			while($row=mysqli_fetch_array($result)){
				// fill descriptions from DB
				$txt = "Procedure:   ".$row['taskName']."   contains target field:   ".$row['mappingTgt']."\n";
				fwrite($rptfile, $txt);
			};
		};
		$sql = "SELECT `taskName`,`mappingSrc` FROM `taskmap` WHERE `projName`='".$projName."' and `mappingSrc` LIKE '".$fldName."'";
		$result = mysqli_query ($cnn,$sql);
		if($result){
			while($row=mysqli_fetch_array($result)){
				// fill descriptions from DB
				$txt = "Procedure:   ".$row['taskName']."   contains source field:   ".$row['mappingSrc']."\n";
				fwrite($rptfile, $txt);
			};
		};
	}
	else
	{
		$sql = "SELECT `taskName` FROM `taskmap` WHERE `projName`='".$projName."' and (`mappingSrc`='".$fldName."' or `mappingTgt`='".$fldName."')";
		$result = mysqli_query ($cnn,$sql);
		if($result){
			$txt = "\n Field: ".$fldName."  found in the following Procedures:\n";
			fwrite($rptfile, $txt);
			while($row=mysqli_fetch_array($result)){
				// fill descriptions from DB
				$txt = "   ".$row['taskName']."\n";
				fwrite($rptfile, $txt);
			};
		};
	};
	
	mysqli_close($cnn);
	
	// Close the script file and return the path
	fclose($rptfile);
	echo $path.$projName;	
}
catch(exception $e)
{
	fclose($rptfile);
	$e->errorMessage();
	echo "error";
}
?>