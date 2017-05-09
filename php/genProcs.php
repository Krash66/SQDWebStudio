<?php

function getProcs($scriptINL,$scriptfile,$projName,$envName,$sysName,$engName,$engId,$prec){
	// Create MySQL connection
	$cnn=mysqli_connect('localhost', 'id1531632_root','Ad1s0nR44t','id1531632_sqmeta');
	// Check connection
	if (mysqli_connect_errno())
	{
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}
	// loop thru each Mapping Proc
	$sql = "SELECT `id`, `objid`, `projName`, `envName`, `sysName`, `engName`, `taskName`, `taskType`, `taskSeqNo`, `taskDesc` FROM `tasks` WHERE `projName`='".$projName."' and `envName`='".$envName."' and `sysName`='".$sysName."' and `engName`='".$engName."' and (`taskType`='MAP' or `taskType`='Proc')";
	$result = mysqli_query ($cnn,$sql);
	if($result){
		while($row=mysqli_fetch_array($result)){
			// fill variables from DB
			$taskName = $row['taskName'];
			// Write the Header for the Proc
			$txt = "CREATE PROC ".$taskName." AS SELECT\n{\n";
			fwrite($scriptfile, $txt);
			fwrite($scriptINL, $txt);
			
			if($row['taskType'] == 'MAP')
			{
				// Loop thru Mappings
				$sqlMap = "SELECT `id`, `objid`, `projName`, `envName`, `sysName`, `engName`, `taskName`, `taskType`, `mappingId`, `isMapped`, `mappingDesc`, `srcType`, `tgtType`, `mappingSrc`, `mappingTgt`, `srcParent`, `tgtParent`, `srcDS`, `tgtDS` FROM `taskmap` WHERE `projName`='".$projName."' and `envName`='".$envName."' and `sysName`='".$sysName."' and `engName`='".$engName."' and `taskName`='".$taskName."' ORDER BY `mappingId`";
				$resultMap = mysqli_query ($cnn,$sqlMap);
				if($resultMap){
					while($rowMap=mysqli_fetch_array($resultMap)){
						// fill variables from DB
						if ($prec == 1)
						{
							$MapTgt = $rowMap['mappingTgt'];
							$MapSrc = $rowMap['mappingSrc'];
						}
						elseif($prec == 2)
						{
							$MapTgt = $rowMap['tgtParent'].".".$rowMap['mappingTgt'];
							$MapSrc = $rowMap['srcParent'].".".$rowMap['mappingSrc'];
						}
						else
						{
							$MapTgt = $rowMap['tgtDS'].".".$rowMap['tgtParent'].".".$rowMap['mappingTgt'];
							$MapSrc = $rowMap['srcDS'].".".$rowMap['srcParent'].".".$rowMap['mappingSrc'];
						}
						
						// Write each mapping
						if($rowMap['mappingTgt'] != "")
						{
							$txt = "     ".$MapTgt."  =  ".$MapSrc."\n";
							fwrite($scriptfile, $txt);	
							fwrite($scriptINL, $txt);	
						}
					}
				}
			}
			elseif($row['taskType'] == 'Proc')
			{
				// Write Main Proc Syntax
				$sqlMap = "SELECT `id`, `objid`, `projName`, `envName`, `sysName`, `engName`, `taskName`, `taskType`, `mappingId`, `isMapped`, `mappingDesc`, `srcType`, `tgtType`, `mappingSrc`, `mappingTgt`, `srcParent`, `tgtParent`, `srcDS`, `tgtDS` FROM `taskmap` WHERE `projName`='".$projName."' and `envName`='".$envName."' and `sysName`='".$sysName."' and `engName`='".$engName."' and `taskType`='Proc'";
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
			}
			
			// Get task's Source Datastore			
			$sqlDS = "SELECT `id`, `objid`, `projName`, `envName`, `sysName`, `engName`, `taskName`, `DSname`, `taskType`, `DSdir` FROM `taskds` WHERE `projName`='".$projName."' and `envName`='".$envName."' and `sysName`='".$sysName."' and `engName`='".$engName."' and `taskName`='".$taskName."' and `DSdir`='S'";
			$resultDS = mysqli_query ($cnn,$sqlDS);
			if($resultDS){
				while($rowDS=mysqli_fetch_array($resultDS)){
					// fill variables from DB
					$taskDSName = $rowDS['DSname'];
					// Write end Header for the Proc
					$txt = "}\nFROM ".$taskDSName.";\n\n\n";
					fwrite($scriptfile, $txt);
					fwrite($scriptINL, $txt);
				}
			}
		}
	};
	mysqli_close($cnn);
}
?>