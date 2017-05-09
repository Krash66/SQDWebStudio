<?php

function getMain($scriptINL,$scriptfile,$projName,$envName,$sysName,$engName,$engId){
	// Create MySQL connection
	$cnn=mysqli_connect('localhost', 'id1531632_root','Ad1s0nR44t','id1531632_sqmeta');
	// Check connection
	if (mysqli_connect_errno())
	{
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}
	// Write Main Header
	$txt = "PROCESS INTO\n";
	fwrite($scriptfile, $txt);
	fwrite($scriptINL, $txt);
	// loop thru each Target Datastore
	$sqlDS = "SELECT `id`, `objid`, `projName`, `envName`, `sysName`, `engName`, `taskName`, `DSname`, `taskType`, `DSdir` FROM `taskds` WHERE `projName`='".$projName."' and `envName`='".$envName."' and `sysName`='".$sysName."' and `engName`='".$engName."' and `DSdir`='T'";
	$resultDS = mysqli_query ($cnn,$sqlDS);
	if($resultDS){
		$x=0;
		while($rowDS=mysqli_fetch_array($resultDS)){
			// fill variables from DB
			$DSName = $rowDS['DSname'];
			// Write each Target DS
			if($x==0)
			{
				$txt = "       ".$DSName."\n";
				fwrite($scriptfile, $txt);
				fwrite($scriptINL, $txt);
			}
			else
			{
				$txt = "      ,".$DSName."\n";
				fwrite($scriptfile, $txt);
				fwrite($scriptINL, $txt);
			}
			$x=++$x;
		}
	}
	// Write Main Head footer
	$txt = "SELECT\n{\n";
	fwrite($scriptfile, $txt);
	fwrite($scriptINL, $txt);
	
	// Write Main Proc Syntax
	$sqlMap = "SELECT `id`, `objid`, `projName`, `envName`, `sysName`, `engName`, `taskName`, `taskType`, `mappingId`, `isMapped`, `mappingDesc`, `srcType`, `tgtType`, `mappingSrc`, `mappingTgt`, `srcParent`, `tgtParent`, `srcDS`, `tgtDS` FROM `taskmap` WHERE `projName`='".$projName."' and `envName`='".$envName."' and `sysName`='".$sysName."' and `engName`='".$engName."' and `taskType`='MAIN'";
	$resultMap = mysqli_query ($cnn,$sqlMap);
	if($resultMap){
		while($rowMap=mysqli_fetch_array($resultMap)){
			// fill variables from DB
			$MapTgt = $rowMap['mappingTgt'];
			$MapSrc = $rowMap['mappingSrc'];
			// Write Main syntax
			$txt = $MapSrc."\n";
			fwrite($scriptfile, $txt);
			fwrite($scriptINL, $txt);		
		}
	}
	
	// Write Main footer
	$sqlSDS = "SELECT `id`, `objid`, `projName`, `envName`, `sysName`, `engName`, `taskName`, `DSname`, `taskType`, `DSdir` FROM `taskds` WHERE `projName`='".$projName."' and `envName`='".$envName."' and `sysName`='".$sysName."' and `engName`='".$engName."' and `taskType`='Main' and `DSdir`='S'";
	$resultSDS = mysqli_query ($cnn,$sqlSDS);
	if($resultSDS){
		while($rowSDS=mysqli_fetch_array($resultSDS)){
			// fill Variables
			$srcDS = $rowSDS['DSname'];
			// write to script
			$txt = "}\nFROM ".$srcDS.";\n";
			fwrite($scriptfile, $txt);
			fwrite($scriptINL, $txt);
		}
	}
	// Close connection
	mysqli_close($cnn);
}
?>