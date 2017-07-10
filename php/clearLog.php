<?php
// Open the session
session_start();

$projName = $_POST["projName"];		//proj Name

try
{
	// generated script path
	$path = "/SQDATA/Studio/temp/";
	$outPath = $_SERVER["DOCUMENT_ROOT"].$path;
	$outfile = $outPath.$projName.".log";
	if(file_exists($outfile))
	{
		if (unlink($outfile))
		{
			echo ("true");
		}
		else
		{
			echo ("false");
		}
	}
	else
	{
		echo ("true");	
	}
}
catch(exception $e)
{
	fclose($logfile);
	$e->errorMessage();
	echo "error in clearLog.php\n";
	echo $e."\n";
}

?>
