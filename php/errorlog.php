<?php
// Open the session
session_start();

$projName = $_POST["projName"];		//proj Name
$errorMsg = $_POST["errMsg"];		//Error Message
$errorName = $_POST["errName"];		//Error Type
$errorFile = $_POST["errFile"];		//Error Type
$errorFun = $_POST["errFun"];		//Error Type

try
{
	// generated script path
	$path = "/SQDATA/Studio/temp/";
	$outPath = $_SERVER["DOCUMENT_ROOT"].$path;
	$outfile = $outPath.$projName.".log";
	
	$logfile = fopen($outfile, "a") or die("Unable to open file!");
	
	// Write header to the script file
	$txt = "\n-----------------------".date("l jS \of F Y h:i:s A T")."------------------------------\n";
	fwrite($logfile, $txt);
	$txt =  "Browser Spec. :".$_SERVER['HTTP_USER_AGENT']."\n";
	fwrite($logfile, $txt);
	$txt = "error Type: ".$errorName."\n";
	fwrite($logfile, $txt);
	$txt = "function: ".$errorFun."\n";
	fwrite($logfile, $txt);
	$txt = "file: ".$errorFile."\n";
	fwrite($logfile, $txt);
	$txt = "message: ".$errorMsg."\n";
	fwrite($logfile, $txt);
	fclose($logfile);
	echo "true";
}
catch(exception $e)
{
	fclose($logfile);
	$e->errorMessage();
	echo "error in errorlog.php\n";
	echo $e."\n";
}

?>