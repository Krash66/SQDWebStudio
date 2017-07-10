<?php
// Run Parser with arguments
$scriptname = $_POST["scriptName"];
$scriptfile = $_POST["scriptFile"];

try
{
	// new parser  UNIX
	$exeString = $_SERVER["DOCUMENT_ROOT"]."/SQDATA/Studio/sqdeng ".$_SERVER["DOCUMENT_ROOT"]."/SQDATA/Studio/temp/genScript/".$scriptfile." ".$_SERVER["DOCUMENT_ROOT"]."/SQDATA/Studio/temp/genScript/".$scriptname.".prc -C ".$_SERVER["DOCUMENT_ROOT"]."/SQDATA/Studio/temp/genScript --LIST=ALL 1>".$_SERVER["DOCUMENT_ROOT"]."/SQDATA/Studio/temp/genScript/".$scriptname.".rpt 2>&1";
	
	// new parser  WINDOWS
	/*$exeString = $_SERVER["DOCUMENT_ROOT"]."SQDATA/Studio/sqdeng.exe ".$_SERVER["DOCUMENT_ROOT"]."SQDATA/Studio/temp/genScript/".$scriptfile." ".$_SERVER["DOCUMENT_ROOT"]."SQDATA/Studio/temp/genScript/".$scriptname.".prc -C ".$_SERVER["DOCUMENT_ROOT"]."SQDATA/Studio/temp/genScript --LIST=ALL 1>".$_SERVER["DOCUMENT_ROOT"]."SQDATA/Studio/temp/genScript/".$scriptname.".rpt 2>&1";*/
	
	// old parser  UNIX
	/*$exeString = $_SERVER["DOCUMENT_ROOT"]."SQDATA/Studio/sqdparse ".$_SERVER["DOCUMENT_ROOT"]."SQDATA/Studio/temp/genScript/".$scriptfile." ".$_SERVER["DOCUMENT_ROOT"]."SQDATA/Studio/temp/genScript/".$scriptname.".prc -C ".$_SERVER["DOCUMENT_ROOT"]."SQDATA/Studio/temp/genScript --LIST=ALL 1>".$_SERVER["DOCUMENT_ROOT"]."SQDATA/Studio/temp/genScript/".$scriptname.".rpt 2>&1";*/
	
	// old parser  WINDOWS
	/*$exeString = $_SERVER["DOCUMENT_ROOT"]."SQDATA/Studio/sqdparsew.exe ".$_SERVER["DOCUMENT_ROOT"]."SQDATA/Studio/temp/genScript/".$scriptfile." ".$_SERVER["DOCUMENT_ROOT"]."SQDATA/Studio/temp/genScript/".$scriptname.".prc -C ".$_SERVER["DOCUMENT_ROOT"]."SQDATA/Studio/temp/genScript --LIST=ALL 1>".$_SERVER["DOCUMENT_ROOT"]."SQDATA/Studio/temp/genScript/".$scriptname.".rpt 2>&1";*/
	
	// example
	/*SQDPARSE %ENGINE%.sqd %ENGINE%.prc -C C:\SQData\POC\GFS\Scripts --LIST=ALL 1>../Scripts/%ENGINE%.rpt 2>&1*/
	//echo $exeString;
	exec($exeString, $data, $ret);
	
	if($ret )  // < 8
	{
		echo "SQDATA/Studio/temp/genScript/".$scriptname.".rpt";  
	}
	else
	{
		echo "false";   //.$ret."  ".$data
		// echo $exeString;
		
		/*var_dump($data);
		var_dump($ret);
		var_dump($exeString);*/
	};
}
catch(exception $e)
{
	echo $e->errorMessage();
}

?>
