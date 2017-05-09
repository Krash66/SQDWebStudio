<?php

function getFldSpecs($scriptINL,$scriptfile,$projName,$envName,$sysName,$engName,$engId){
	// Create MySQL connection
	$cnn=mysqli_connect('localhost', 'id1531632_root','Ad1s0nR44t','id1531632_sqmeta');
	// Check connection
	if (mysqli_connect_errno())
	{
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}
	$sql = "SELECT `id`, `projName`, `envName`, `sysName`, `engName`, `DSname`, `descName`, `selName`, `fldName`, `parentName`, `seqno`, `descFldDesc`, `canNull`, `isKey`, `dateFormat`, `label`, `initVal`, `retype`, `invalid`, `extType`, `identVal`, `fKey` FROM `dsselfields` WHERE `projName`='".$projName."' and `envName`='".$envName."' and `sysName`='".$sysName."' and `engName`='".$engName."'";
	$result = mysqli_query ($cnn,$sql);
	if($result){
		while($row=mysqli_fetch_array($result)){
			// fill variables from DB
			$DSname = $row['DSname'];
			$descName = $row['descName'];
			$fldName = $row['fldName'];
			$DSlabel = $row['label'];
			$DSinitval = $row['initVal'];
			$DSretype = $row['retype'];
			$DSinvalid = $row['invalid'];
			$DSextType = $row['extType'];			
			// write Fld Props to Script
			if($DSlabel != ''){
				$txt = "LABEL ".$DSname.".".$descName.".".$fldName." '".$DSlabel."';\n\n";
				fwrite($scriptfile, $txt);
				fwrite($scriptINL, $txt);
			};
			if($DSinitval != ''){
				$txt = "INITIALIZE ".$DSname.".".$descName.".".$fldName." ".$DSinitval.";\n\n";
				fwrite($scriptfile, $txt);
				fwrite($scriptINL, $txt);
			};
			if($DSretype != ''){
				$txt = "RETYPE ".$DSname.".".$descName.".".$fldName." DT".$DSretype.";\n\n";
				fwrite($scriptfile, $txt);
				fwrite($scriptINL, $txt);
			};
			if($DSinvalid != ''){
				$txt = "INVALID ".$DSname.".".$descName.".".$fldName." ".$DSinvalid.";\n\n";
				fwrite($scriptfile, $txt);
				fwrite($scriptINL, $txt);
			};
			if($DSextType != ''){
				$txt = "EXTTYPE ".$DSname.".".$descName.".".$fldName." DT".$DSextType.";\n\n";
				fwrite($scriptfile, $txt);
				fwrite($scriptINL, $txt);
			};
		}
	}
	mysqli_close($cnn);
}
?>