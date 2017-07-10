<?php
// Run importer with arguments
// 1a) get Arguments
$descname = $_POST["DescName"];
$descfile = $_POST["Descfile"];
$desctype = $_POST["DescType"];
$descpre = $_POST["DescPre"];
$dPre = $_POST["dPre"];
//$descname = $descname;        //strtoupper($descname);

// 1b) get Name without extension
// $justNameArr = str_split($DBDname,".");
// 2) set Arguments
//$Arg1 = "\"".$_SERVER["DOCUMENT_ROOT"]."SQDATA/Studio/temp/uploaded/".$descfile."\"";
//$Arg2 = " ".$desctype." ";
//$Arg3 = "\"".$_SERVER["DOCUMENT_ROOT"]."SQDATA/Studio/temp"."\"";
//$Args = $Arg1.$Arg2.$Arg3;
// 3) set output path of the xml Dump   "\"C:\\wamp\\www\\SQDATA\\Studio\\temp\\".$descpre.$descname.".xml\"";
//$outPath = "/SQDATA/Studio/temp/".$descpre.$descname.".xml";
// 4) Run executable with arguments
try
{
	// new importer  UNIX
	$exeString = $_SERVER["DOCUMENT_ROOT"]."/SQDATA/Studio/sqduiimp -i ".$_SERVER["DOCUMENT_ROOT"]."/SQDATA/Studio/temp/uploaded/".$descfile." -o ".$_SERVER["DOCUMENT_ROOT"]."/SQDATA/Studio/temp/".$dPre.$descname.".xml -t ".$descpre;
	
	// new importer  WINDOWS
	/*$exeString = $_SERVER["DOCUMENT_ROOT"]."SQDATA/Studio/sqduiimpw.exe -i ".$_SERVER["DOCUMENT_ROOT"]."SQDATA/Studio/temp/uploaded/".$descfile." -o ".$_SERVER["DOCUMENT_ROOT"]."SQDATA/Studio/temp/".$dPre.$descname.".xml -t ".$descpre;*/
	
	// old importer
	/*$exeString = "C:\\wamp\\www\\SQDATA\\Studio\\sqduiimpo.exe \"C:\\wamp\\www\\SQDATA\\Studio\\temp\\uploaded\\".$descfile."\" ".$desctype."  \"C:\\wamp\\www\\SQDATA\\Studio\\temp\"";*/
	
	//echo $exeString;
	exec($exeString, $data, $ret);
	//echo $ret;
	if($ret < 8 )
	{
		echo "SQDATA/Studio/temp/".$dPre.$descname.".xml";  //".$descname."
	}
	else
	{
		echo "false";
		//echo "    ret: ".$ret;
		//echo "    exeString: ".$exeString;
		
		
		/*var_dump($data);
		var_dump($ret);
		//var_dump($outPath);
		var_dump($exeString);*/
			
		/*echo $Arg1;
		echo $Arg2;
		echo $Arg3;
		echo $outPath;*/
	};
}
catch(exception $e)
{
	echo $e->errorMessage();
}

?>
