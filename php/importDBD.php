<?php

// Run importer with arguments
// 1a) get Arguments
$DBDname = $_POST["nameDBD"];
$descname = $_POST["DescName"];
$descfile = $_POST["Descfile"];
//$desctype = $_POST["DescType"];
//$descpre = $_POST["DescPre"];
// 1b) get Name without extension
// $justNameArr = str_split($DBDname,".");
// 2) set Arguments
//$Arg1 = "\"".$_SERVER["DOCUMENT_ROOT"]."SQDATA/Studio/temp/uploaded/".$DBDname.".dbd\"";
//$Arg2 = " DBO ";
//$Arg3 = "\"".$_SERVER["DOCUMENT_ROOT"]."SQDATA/Studio/temp"."\"";
//$Args = $Arg1.$Arg2.$Arg3;
//// 3) set output path of the xml Dump
//$outPath = $_SERVER["DOCUMENT_ROOT"]."SQDATA/Studio/temp/SD".$DBDname."2.xml";
// 4) Run executable with arguments
try
{
	// new importer  UNIX
	/*$exeString = $_SERVER["DOCUMENT_ROOT"]."/SQDATA/Studio/sqduiimp.exe -i ".$_SERVER["DOCUMENT_ROOT"]."/SQDATA/Studio/temp/uploaded/".$descfile." -o ".$_SERVER["DOCUMENT_ROOT"]."/SQDATA/Studio/temp/".$descname.".xml -t dbd";*/
	
	// new importer  WINDOWS
	$exeString = $_SERVER["DOCUMENT_ROOT"]."/SQDATA/Studio/sqduiimpw.exe -i ".$_SERVER["DOCUMENT_ROOT"]."/SQDATA/Studio/temp/uploaded/".$descfile." -o ".$_SERVER["DOCUMENT_ROOT"]."/SQDATA/Studio/temp/".$descname.".xml -t dbd";
	
	/*$exeString = $_SERVER["DOCUMENT_ROOT"]."SQDATA/Studio/sqduiimp.exe \"C:/wamp/www/SQDATA/Studio/temp/uploaded/COMPANY.dbd\" DBO \"C:/wamp/www/SQDATA/Studio/temp\"";*/
	/*$exeString = "C:\\wamp\\www\\SQDATA\\Studio\\sqduiimp.exe \"C:\\wamp\\www\\SQDATA\\Studio\\temp\\uploaded\\".$DBDname.".dbd\" DBO \"C:\\wamp\\www\\SQDATA\\Studio\\temp\"";*/
	
	//echo $exeString;
	exec($exeString, $data, $ret);
	//echo $ret;
	if($ret < 8 )
	{
		echo "/SQDATA/Studio/temp/".$DBDname.".xml";  //".$descname."
	}
	else
	{
		echo "false";
		// echo $exeString;
	};
	
	/*var_dump($data);
	var_dump($ret);
	var_dump($outPath);
	var_dump($exeString);
	
	echo $Arg1;
	echo $Arg2;
	echo $Arg3;
	echo $outPath;
	*/
}
catch(exception $e)
{
	echo $e->errorMessage();
}

?>