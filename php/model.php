<?php
// Open the session
session_start();

$modName = $_POST["modName"];		//model Name w/ extention
$modText = $_POST["modText"];		//model body text

try
{
	// generated model path
	$path = "/SQDATA/Studio/temp/genScript/";
	$outPath = $_SERVER["DOCUMENT_ROOT"].$path;
	$outfile = $outPath.$modName;
	$modfile = fopen($outfile, "w") or die("Unable to open file!");
	
	fwrite($modfile, $modText);
	
	fclose($modfile);
	
	echo $path.$modName;
	
}
catch(exception $e)
{
	fclose($modfile);
	$e->errorMessage();
	echo "error";
}

?>
