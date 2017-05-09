<?php
require 'genHeader.php';
require 'genDatastores.php';
require 'genVars.php';
require 'genFldSpecs.php';
require 'genProcs.php';
require 'genMain.php';
// Open the session
session_start();

$projName = $_POST["projName"];								//proj Name
$envName = $_POST["envName"];								//env name
$sysName = $_POST["sysName"];								//sys name
$engName = $_POST["engName"];								//eng name
$engId = $_POST["engID"];								    //eng id
$prec = $_POST["prec"];

try
{
	// generated script path
	$path = "SQDATA/Studio/temp/genScript/";
	$outPath = $_SERVER["DOCUMENT_ROOT"].$path;
	$outfile = $outPath.$engName.".sqd";
	$outINL = $outPath.$engName.".inl";
	$scriptfile = fopen($outfile, "w") or die("Unable to open file!");
	$scriptINL = fopen($outINL, "w") or die("Unable to open file!");
	
	// Write header to the script file
	$txt = "--------------------------------------------------------\n";
	fwrite($scriptfile, $txt);
	$txt = "--           PROJECT: ".$projName."\n";
	fwrite($scriptfile, $txt);
	$txt = "--       ENVIRONMENT: ".$envName."\n";
	fwrite($scriptfile, $txt);
	$txt = "--            SYSTEM: ".$sysName."\n";
	fwrite($scriptfile, $txt);
	$txt = "--------------------------------------------------------\n";
	fwrite($scriptfile, $txt);
	// Write header to the INL file
	$txt = "--------------------------------------------------------\n";
	fwrite($scriptINL, $txt);
	$txt = "--           PROJECT: ".$projName."\n";
	fwrite($scriptINL, $txt);
	$txt = "--       ENVIRONMENT: ".$envName."\n";
	fwrite($scriptINL, $txt);
	$txt = "--            SYSTEM: ".$sysName."\n";
	fwrite($scriptINL, $txt);
	$txt = "--------------------------------------------------------\n";
	fwrite($scriptINL, $txt);
	
	$txt = "JOBNAME ".$engName.";\n";
	fwrite($scriptfile, $txt);
	fwrite($scriptINL, $txt);
	
	// write the header to the script
	getHeader($scriptINL,$scriptfile,$engId);
	
	// Write Datastore header to SQD
	$txt = "-- ------------------------------------------------------\n";
	fwrite($scriptfile, $txt);
	$txt = "--           Data Definition Section\n";
	fwrite($scriptfile, $txt);
	$txt = "-- ------------------------------------------------------\n\n";
	fwrite($scriptfile, $txt);
	// Write Datastore header to INL
	$txt = "-- ------------------------------------------------------\n";
	fwrite($scriptINL, $txt);
	$txt = "--           Data Definition Section\n";
	fwrite($scriptINL, $txt);
	$txt = "-- ------------------------------------------------------\n\n";
	fwrite($scriptINL, $txt);
	
	// Write Datastores to the Script
	getDatastores($scriptINL,$scriptfile,$projName,$envName,$sysName,$engName,$engId);
	
	// write Variable and field attribute heading to SQD
	$txt = "-- ------------------------------------------------------\n";
	fwrite($scriptfile, $txt);
	$txt = "--           Field Specification Section\n";
	fwrite($scriptfile, $txt);
	$txt = "-- ------------------------------------------------------\n\n";
	fwrite($scriptfile, $txt);
	// write Variable and field attribute heading to INL
	$txt = "-- ------------------------------------------------------\n";
	fwrite($scriptINL, $txt);
	$txt = "--           Field Specification Section\n";
	fwrite($scriptINL, $txt);
	$txt = "-- ------------------------------------------------------\n\n";
	fwrite($scriptINL, $txt);
	
	// Write Variables to Script
	getVars($scriptINL,$scriptfile,$projName,$envName,$sysName,$engName,$engId);
	
	// Write Datastore Field Specs to Script
	getFldSpecs($scriptINL,$scriptfile,$projName,$envName,$sysName,$engName,$engId);
	
	// write headers for Procedure section to SQD
	$txt = "-- ------------------------------------------------------\n";
	fwrite($scriptfile, $txt);
	$txt = "--           Procedure Section\n";
	fwrite($scriptfile, $txt);
	$txt = "-- ------------------------------------------------------\n\n";
	fwrite($scriptfile, $txt);
	// write headers for Procedure section to INL
	$txt = "-- ------------------------------------------------------\n";
	fwrite($scriptINL, $txt);
	$txt = "--           Procedure Section\n";
	fwrite($scriptINL, $txt);
	$txt = "-- ------------------------------------------------------\n\n";
	fwrite($scriptINL, $txt);
	
	// Write Procedures to Script
	getProcs($scriptINL,$scriptfile,$projName,$envName,$sysName,$engName,$engId,$prec);
	
	// write Main section header to SQD
	$txt = "-- ------------------------------------------------------\n";
	fwrite($scriptfile, $txt);
	$txt = "--           Main Section\n";
	fwrite($scriptfile, $txt);
	$txt = "-- ------------------------------------------------------\n\n";
	fwrite($scriptfile, $txt);
	// write Main section header to INL
	$txt = "-- ------------------------------------------------------\n";
	fwrite($scriptINL, $txt);
	$txt = "--           Main Section\n";
	fwrite($scriptINL, $txt);
	$txt = "-- ------------------------------------------------------\n\n";
	fwrite($scriptINL, $txt);
	
	// Write Main Procedure to Script
	getMain($scriptINL,$scriptfile,$projName,$envName,$sysName,$engName,$engId);
	
	// Close the script file and return the path
	fclose($scriptfile);
	fclose($scriptINL);
	echo $path.$engName;	
}
catch(exception $e)
{
	fclose($scriptfile);
	$e->errorMessage();
	echo "error";
}
?>