<?php

function getVars($scriptINL,$scriptfile,$projName,$envName,$sysName,$engName,$engId){
	// Create MySQL connection
	$cnn=mysqli_connect('localhost', 'id1531632_root','Ad1s0nR44t','id1531632_sqmeta');
	// Check connection
	if (mysqli_connect_errno())
	{
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}
	$sql = "SELECT `id`, `objid`, `projName`, `envName`, `sysName`, `engName`, `varName`, `varSize`, `varInitVal`, `varDesc` FROM `variables` WHERE `projName`='".$projName."' and `envName`='".$envName."' and `sysName`='".$sysName."' and `engName`='".$engName."'";
	$result = mysqli_query ($cnn,$sql);
	if($result){
		while($row=mysqli_fetch_array($result)){
			// fill variables from DB
			$varName = $row['varName'];
			$varSize = $row['varSize'];
			$varInit = $row['varInitVal'];
			// write Vars to Script
			$txt = "DECLARE ".$varName." ".$varSize." ".$varInit.";\n\n";
			fwrite($scriptfile, $txt);
			fwrite($scriptINL, $txt);
		}
	}
	mysqli_close($cnn);
}
?>