<?php

function getHeader($scriptINL,$scriptfile,$engId){
	
	// Create MySQL connection
	$cnn=mysqli_connect('localhost', 'id1531632_root','Ad1s0nR44t','id1531632_sqmeta');
	// Check connection
	if (mysqli_connect_errno())
	{
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}
	$sql1 = "SELECT `id`, `objid`, `projName`, `envName`, `sysName`, `engName`, `engConn`, `engRptFile`, `engRptEvery`, `engDateFormat`, `engCommitEvery`, `engForceCommit`, `engDBDLib`, `engCopybookLib`, `engDTDLib`, `engDDLLib`, `engInclude`, `engDesc` FROM `engines` WHERE `objid`='".$engId."'";
	$result1 = mysqli_query ($cnn,$sql1);
	if($result1){
		while($row1=mysqli_fetch_array($result1)){
			if($row1['engRptFile'] != "")
			{
				$txt = "REPORT ".$row1['engRptFile'];
				if($row1['engRptEvery'] != "")
				{
					$txt = $txt." EVERY ".$row1['engRptEvery'];
				}
				$txt = $txt.";\n";
				fwrite($scriptfile, $txt);
				fwrite($scriptINL, $txt);
			};
			if($row1['engCommitEvery'] != '0')
			{
				$txt = "COMMIT EVERY ".$row1['engCommitEvery'];
				if($row1['engForceCommit'] == "1")
				{
					$txt = $txt." FORCE";
				}
				$txt = $txt.";\n";
				fwrite($scriptfile, $txt);
				fwrite($scriptINL, $txt);
			};
			if($row1['engDateFormat'] != "")
			{
				$txt = "DATEFORMAT ".$row1['engDateFormat'].";\n";
				fwrite($scriptfile, $txt);
				fwrite($scriptINL, $txt);
			};
		}
	};
		
	$sql = "SELECT `engConn` FROM `engines` WHERE `objid`='".$engId."'";
	$result = mysqli_query ($cnn,$sql);
	if($result){
		while($row=mysqli_fetch_array($result)){
			$sqlConn = "SELECT `connType`,`connDatabase` FROM `connections` WHERE `id`=".$row['engConn'];
			$resultConn = mysqli_query ($cnn,$sqlConn);
			if($resultConn){
				while($rowConn=mysqli_fetch_array($resultConn)){
					$txt = "\nRDBMS ".$rowConn['connType']." ".$rowConn['connDatabase'].";\n\n";
					fwrite($scriptfile, $txt);
					fwrite($scriptINL, $txt);
				}
			}
		}
	}
	mysqli_close($cnn);
}
