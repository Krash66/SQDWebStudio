<?php

function getDatastores($scriptINL,$scriptfile,$projName,$envName,$sysName,$engName,$engId){
	$count = "false";
	$DBname = "";
	$DBDname = "";
	$sysQ = "";
	// Create MySQL connection
	$cnn=mysqli_connect('localhost', 'id1531632_root','Ad1s0nR44t','id1531632_sqmeta');
	// Check connection
	if (mysqli_connect_errno())
	{
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}
	$sql = "SELECT `id`, `objid`, `projName`, `envName`, `sysName`, `engName`, `DSname`, `DSdir`, `DSformat`, `DStype`, `DSPhysName`, `DSHostName`, `DSPort`, `DSException`, `DSUOW`, `DSIMSPathData`, `DSSkipChangeCheck`, `DSOperationType`, `DSKeyChange`, `DSchkBImg`, `RECDEL`, `COLDEL`, `CHRDEL`, `DScomp`, `DScompWarn`, `DSnoComp`, `DSwtoComp`, `DScompNum`, `DSwtoExp`, `DSexpNum`, `DSstageDir`, `DSconns`, `DSstageRec`, `DSstageDelay`, `DSreconn`, `DSaccept`, `RRS`, `DSDesc`, `CREATED_TIMESTAMP`, `UPDATED_TIMESTAMP`, `CREATED_USER_ID`, `UPDATED_USER_ID` FROM `datastores` WHERE `projName`='".$projName."' and `envName`='".$envName."' and `sysName`='".$sysName."' and `engName`='".$engName."' and `DSdir`='S'";
	$result = mysqli_query ($cnn,$sql);
	if($result){
		while($row=mysqli_fetch_array($result)){
			// fill DS variables
			$DSname = $row['DSname'];
			$dsFormat = $row['DSformat'];
			$dsType = $row['DStype'];
			$dsPhysName = $row['DSPhysName'];
			$dsHost = $row['DSHostName'];
			$dsPort = $row['DSPort'];
			$dsEx = $row['DSException'];
			$dsUOW = $row['DSUOW'];
			$dsIMSpath = $row['DSIMSPathData'];
			$dsSkipChkChg = $row['DSSkipChangeCheck'];
			$dsOpType = $row['DSOperationType'];
			$dsKeyChange = $row['DSKeyChange'];
			
			$dsChkBImg = $row['DSchkBImg'];
			$dsRECDEL = $row['RECDEL'];
			$dsCOLDEL = $row['COLDEL'];
			$dsCHRDEL = $row['CHRDEL'];
			$dsComp = $row['DScomp'];
			$dsCompWarn = $row['DScompWarn'];
			$dsNoComp = $row['DSnoComp'];
			$dsWtoComp = $row['DSwtoComp'];
			$dsCompNum = $row['DScompNum'];
			$dsWtoExp = $row['DSwtoExp'];
			$dsExpNum = $row['DSexpNum'];
			$dsStageDir = $row['DSstageDir'];
			$dsConns = $row['DSconns'];
			$dsStageRec = $row['DSstageRec'];
			$dsStageDelay = $row['DSstageDelay'];
			$dsReconn = $row['DSreconn'];
			$dsAccept = $row['DSaccept'];
			$dsRRS = $row['RRS'];
			// array of Descriptions for this DS
			$descArray = array();
			
			// get descriptions for this DS
			$sqlDSsel = "SELECT `id`, `objid`, `projName`, `envName`, `sysName`, `engName`, `DSname`, `selName`, `descName`, `parentName` FROM `dsselections` WHERE `projName`='".$projName."' and `envName`='".$envName."' and `sysName`='".$sysName."' and `engName`='".$engName."' and `DSname`='".$DSname."'";
			$resultDSsel = mysqli_query ($cnn,$sqlDSsel);
			if($resultDSsel){
				while($rowDSsel=mysqli_fetch_array($resultDSsel)){
					// fill DSsel variables
					$DescName = $rowDSsel['descName'];
					// add desc to array
					if(array_search($DescName,$descArray,true) == "")
					{ 
						array_push($descArray,$DescName);
					};
					// get IMSDBD description if any
					$sqlDBDdesc = "SELECT `id`, `objid`, `projName`, `envName`, `descName`, `descType`, `fpath1`, `fpath2`, `segName`, `segId`, `descDesc` FROM `descriptions` WHERE `projName`='".$projName."' and `envName`='".$envName."' and `descType`='COBOL' and `fpath2`<>''";
					$resultDBDsel = mysqli_query ($cnn,$sqlDBDdesc);
					
					if($resultDBDsel){
						while($rowDBDsel=mysqli_fetch_array($resultDBDsel)){
							if($count == "false" )
							{
								$DBD = $rowDBDsel['fpath2'];
								$sqlDBD = "SELECT `id`, `objid`, `projName`, `envName`, `descName`, `descType`, `fpath1`, `fpath2`, `dbName`, `segName`, `segId`, `descDesc` FROM `descriptions` WHERE `projName`='".$projName."' and `envName`='".$envName."' and `descType`='IMSDBD' and `fpath2`='".$DBD."'";
								$resultDBD = mysqli_query ($cnn,$sqlDBD);
								while($rowDBD=mysqli_fetch_array($resultDBD)){
									$DescType = $rowDBD['descType'];
									$Descfpath2 = $rowDBD['fpath2'];
									$DBname = $rowDBD['dbName'];
									$DBDname = $rowDBD['descName'];
									$txt = "DESCRIPTION ".$DescType." '".$Descfpath2."' AS ".$rowDBD['descName'].";\n\n";
									fwrite($scriptfile, $txt);
									$txt = "DESCRIPTION ".$DescType."\n/+\n";
									fwrite($scriptINL, $txt);
									// Open description file and write to INL script
									$txt = file_get_contents($_SERVER["DOCUMENT_ROOT"]."SQDATA/Studio/temp/uploaded/".$Descfpath2);
									fwrite($scriptINL, $txt);
									// write footer of inline description file
									$txt = "+/\n              AS ".$DBDname.";\n\n";
									fwrite($scriptINL, $txt);
								}
							};
							$count = "true";
						}
					}
										
					// get descriptions for this DS
					$sqlDesc = "SELECT `id`, `objid`, `projName`, `envName`, `descName`, `descType`, `fpath1`, `fpath2`,`dbName`, `segName`, `segId`, `descDesc` FROM `descriptions` WHERE `projName`='".$projName."' and `envName`='".$envName."' and `descName`='".$DescName."' and `descType`<>'SrcIMSDBD'and `descType`<>'TgtIMSDBD'";
					$resultDesc = mysqli_query ($cnn,$sqlDesc);
					if($resultDesc){
						while($rowDesc=mysqli_fetch_array($resultDesc)){
							// fill desc variables
							$DescType = $rowDesc['descType'];
							$Descfpath1 = $rowDesc['fpath1'];
							$Descfpath2 = $rowDesc['fpath2'];
							
							if($Descfpath2 != "")
							{
								// write description to sqd file
								$txt = "DESCRIPTION ".$DescType." '".$Descfpath1."'\n              AS ".$DescName."\n\n";
								fwrite($scriptfile, $txt);
								// write header for inline description file
								$txt = "DESCRIPTION ".$DescType."\n/+\n";
								fwrite($scriptINL, $txt);
								// Open description file and write to INL script
								$txt = file_get_contents($_SERVER["DOCUMENT_ROOT"]."SQDATA/Studio/temp/uploaded/".$Descfpath1);
								fwrite($scriptINL, $txt);
								// write footer of inline description file
								$txt = "\n+/\n              AS ".$DescName."\n";
								fwrite($scriptINL, $txt);
								$txt = "              FOR SEGMENT ".$rowDesc['segName']."\n";
								fwrite($scriptfile, $txt);
								fwrite($scriptINL, $txt);
								$txt = "              IN DATABASE ".$DBname.";\n\n";
								fwrite($scriptfile, $txt);
								fwrite($scriptINL, $txt);
							}
							else
							{
								// write description to sqd file
								$txt = "DESCRIPTION ".$DescType." '".$Descfpath1."'\n              AS ".$DescName.";\n\n";
								fwrite($scriptfile, $txt);
								// write header for inline description file
								$txt = "DESCRIPTION ".$DescType."\n/+\n";
								fwrite($scriptINL, $txt);
								// Open description file and write to INL script
								$txt = file_get_contents($_SERVER["DOCUMENT_ROOT"]."SQDATA/Studio/temp/uploaded/".$Descfpath1);
								fwrite($scriptINL, $txt);
								// write footer of inline description file
								$txt = "+/\n              AS ".$DescName.";\n\n";
								fwrite($scriptINL, $txt);
							}
						}
					}
				}
			}
			// If DS is MQ series then get system Que
			if($dsType == "MQS")
			{
				$sqlsys = "SELECT `projName`, `envName`, `sysName`, `sysType`, `sysHostName`, `sysPort`, `sysQmgr` FROM `systems` WHERE `projName`='".$projName."' and `envName`='".$envName."' and `sysName`='".$sysName."'";
				$resultsys = mysqli_query ($cnn,$sqlsys);
				if($resultsys){
				while($rowsys=mysqli_fetch_array($resultsys))
					{
						$sysQ = $rowsys['sysQmgr'];
					}
				}
			}
			// Write exception Datastore if exists
			if($dsEx != "")
			{
				$txt = "-- ------------------ *** Exception Datastore *** ------------------------\n";
				fwrite($scriptfile, $txt);
				fwrite($scriptINL, $txt);
				switch($dsType)
				{
					case  "CDC":
						$txt = "DATASTORE cdc://".$dsHost."/".$dsEx."/".$DSname." OF BINARY AS EX_".$DSname." DESCRIBED BY DUMMY;\n\n";
						break;
					case  "File":
						$txt = "DATASTORE file:///\'".$dsEx."' OF BINARY AS EX_".$DSname." DESCRIBED BY DUMMY;\n\n";
						break;
					case  "Table":
						$txt = "DATASTORE ".$dsEx." OF BINARY AS EX_".$DSname." DESCRIBED BY DUMMY;\n\n";
						break;
					case  "MQS":
						$txt = "DATASTORE mqs://".$dsHost."/".$sysQ."/".$dsEx." OF BINARY AS EX_".$DSname." DESCRIBED BY DUMMY;\n\n";
						break;
					case  "TCP":
						$txt = "DATASTORE tcp://".$dsHost.":".$dsPort." OF BINARY AS EX_".$DSname." DESCRIBED BY DUMMY;\n\n";
						break;
					case  "JMS":
						$txt = "DATASTORE jms://".$dsHost."/".$sysQ."/".$dsEx." OF BINARY AS EX_".$DSname." DESCRIBED BY DUMMY;\n\n";
						break;
					case  "IMS":
						$txt = "DATASTORE cics://".$sysQ."/".$dsPhysName."/".$dsEx." OF BINARY AS EX_".$DSname." DESCRIBED BY DUMMY;\n\n";
						break;
					case  "VSAM":
						$txt = "DATASTORE cics://".$dsHost.":".$dsPort."/".$dsPhysName."/".$engName."/".$dsEx." OF BINARY AS EX_".$DSname." DESCRIBED BY DUMMY;\n\n";
						break;
					case  "RDBMS":
						$txt = "DATASTORE RDBMS";
						break;
					default:
						$txt = "DATASTORE UnknownType"."/".$dsEx." OF BINARY AS EX_".$DSname." DESCRIBED BY DUMMY;\n\n";
						break;
				}
				fwrite($scriptfile, $txt);
				fwrite($scriptINL, $txt);
			}
			
			switch($dsType)
			{
				case  "CDC":
					$txt = "DATASTORE cdc://".$dsHost."/".$dsPhysName."/".$engName;
					break;
				case  "File":
					$txt = "DATASTORE file:///\'".$dsPhysName."'";
					break;
				case  "Table":
					$txt = "DATASTORE ".$dsPhysName;
					break;
				case  "MQS":
					$txt = "DATASTORE mqs://".$sysQ."/".$dsPhysName;
					break;
				case  "TCP":
					$txt = "DATASTORE tcp://".$dsHost.":".$dsPort."/".$dsPhysName."/".$engName;
					break;
				case  "JMS":
					$txt = "DATASTORE jms://".$sysQ."/".$dsPhysName;
					break;
				case  "IMS":
					$txt = "DATASTORE cics://".$sysQ."/".$dsPhysName;
					break;
				case  "VSAM":
					$txt = "DATASTORE cics://".$dsHost.":".$dsPort."/".$dsPhysName."/".$engName;
					break;
				case  "RDBMS":
					$txt = "DATASTORE RDBMS";
					break;
				default:
					$txt = "DATASTORE UnknownType";
					break;
			};
			fwrite($scriptfile, $txt);
			fwrite($scriptINL, $txt);
			$txt = "\n          OF ".$dsFormat."\n";
			fwrite($scriptfile, $txt);
			fwrite($scriptINL, $txt);
			// insert delimiters for delimited Format
			if($dsFormat == "Delimited")
			{
				if($dsRECDEL <> "")
				{
					$txt = "          RECDEL('".$dsRECDEL."')\n";
					fwrite($scriptfile, $txt);
					fwrite($scriptINL, $txt);
				};
				if($dsCOLDEL <> "")
				{
					$txt = "          COLDEL('".$dsCOLDEL."')\n";
					fwrite($scriptfile, $txt);
					fwrite($scriptINL, $txt);
				};
				if($dsCHRDEL <> "")
				{
					$txt = "          CHRDEL('".$dsCHRDEL."')\n";
					fwrite($scriptfile, $txt);
					fwrite($scriptINL, $txt);
				};
			};
			
			// continue DS description
			$txt = "          AS ".$DSname."\n          DESCRIBED BY\n";
			fwrite($scriptfile, $txt);
			fwrite($scriptINL, $txt);
			// loop thru desc array
			$arrlength=count($descArray);
			for($x=0;$x<$arrlength;$x++) {
				if($x==0){
					$txt = "                    ".$descArray[$x]."\n";
				}
				else
				{
					$txt = "                   ,".$descArray[$x]."\n";
				};
				fwrite($scriptfile, $txt);
				fwrite($scriptINL, $txt);
			};
			// reconnect here
			if($dsReconn == 1)
			{
				$txt = "          RECONNECT\n";
				fwrite($scriptfile, $txt);
				fwrite($scriptINL, $txt);
			};
			// accept here
			if($dsAccept == 1)
			{
				$txt = "          ACCEPT ALL\n";
				fwrite($scriptfile, $txt);
				fwrite($scriptINL, $txt);
			};
			// Netezza Language here
			if($dsFormat == "Netezza")
			{
				$txt = "          STAGING DIR '".$dsStageDir."'\n";
				fwrite($scriptfile, $txt);
				fwrite($scriptINL, $txt);
				$txt = "          CONNECTIONS ".$dsConns."\n";
				fwrite($scriptfile, $txt);
				fwrite($scriptINL, $txt);
				$txt = "          STAGING DELAY ".$dsStageDelay."\n";
				fwrite($scriptfile, $txt);
				fwrite($scriptINL, $txt);
				$txt = "          STAGING RECORDS ".$dsStageRec."\n";
				fwrite($scriptfile, $txt);
				fwrite($scriptINL, $txt);
			};
			// exception datastore
			if($dsEx != "")
			{
				$txt = "          EXCEPTION EX_".$DSname."\n";
				fwrite($scriptfile, $txt);
				fwrite($scriptINL, $txt);
			};
			// end datastore
			$txt = ";\n\n";
			fwrite($scriptfile, $txt);
			fwrite($scriptINL, $txt);
		}
	}
	//*****************************************************************************************************************************************
	// Now do Target Datastores
	//*****************************************************************************************************************************************
	
	$sql = "SELECT `id`, `objid`, `projName`, `envName`, `sysName`, `engName`, `DSname`, `DSdir`, `DSformat`, `DStype`, `DSPhysName`, `DSHostName`, `DSPort`, `DSException`, `DSUOW`, `DSIMSPathData`, `DSSkipChangeCheck`, `DSOperationType`, `DSKeyChange`,`DSchkBImg`, `RECDEL`, `COLDEL`, `CHRDEL`, `DScomp`, `DScompWarn`, `DSnoComp`, `DSwtoComp`, `DScompNum`, `DSwtoExp`, `DSexpNum`, `DSstageDir`, `DSconns`, `DSstageRec`, `DSstageDelay`, `DSreconn`, `DSaccept`, `RRS`, `DSDesc`, `CREATED_TIMESTAMP`, `UPDATED_TIMESTAMP`, `CREATED_USER_ID`, `UPDATED_USER_ID` FROM `datastores` WHERE `projName`='".$projName."' and `envName`='".$envName."' and `sysName`='".$sysName."' and `engName`='".$engName."' and `DSdir`='T'";
	$result = mysqli_query ($cnn,$sql);
	if($result){
		while($row=mysqli_fetch_array($result)){
			// fill DS variables
			$DSname = $row['DSname'];
			$dsFormat = $row['DSformat'];
			$dsType = $row['DStype'];
			$dsPhysName = $row['DSPhysName'];
			$dsHost = $row['DSHostName'];
			$dsPort = $row['DSPort'];
			$dsEx = $row['DSException'];
			$dsUOW = $row['DSUOW'];
			$dsIMSpath = $row['DSIMSPathData'];
			$dsSkipChkChg = $row['DSSkipChangeCheck'];
			$dsOpType = $row['DSOperationType'];
			$dsKeyChange = $row['DSKeyChange'];
			
			$dsChkBImg = $row['DSchkBImg'];
			$dsRECDEL = $row['RECDEL'];
			$dsCOLDEL = $row['COLDEL'];
			$dsCHRDEL = $row['CHRDEL'];
			$dsComp = $row['DScomp'];
			$dsCompWarn = $row['DScompWarn'];
			$dsNoComp = $row['DSnoComp'];
			$dsWtoComp = $row['DSwtoComp'];
			$dsCompNum = $row['DScompNum'];
			$dsWtoExp = $row['DSwtoExp'];
			$dsExpNum = $row['DSexpNum'];
			$dsStageDir = $row['DSstageDir'];
			$dsConns = $row['DSconns'];
			$dsStageRec = $row['DSstageRec'];
			$dsStageDelay = $row['DSstageDelay'];
			$dsReconn = $row['DSreconn'];
			$dsAccept = $row['DSaccept'];
			$dsRRS = $row['RRS'];
			// array of Descriptions for this DS
			$descArray=array();
			
			// get descriptions for this DS
			$sqlDSsel = "SELECT `id`, `objid`, `projName`, `envName`, `sysName`, `engName`, `DSname`, `selName`, `descName`, `parentName` FROM `dsselections` WHERE `projName`='".$projName."' and `envName`='".$envName."' and `sysName`='".$sysName."' and `engName`='".$engName."' and `DSname`='".$DSname."'";
			$resultDSsel = mysqli_query ($cnn,$sqlDSsel);
			if($resultDSsel){
				while($rowDSsel=mysqli_fetch_array($resultDSsel)){
					// fill DSsel variables
					$DescName = $rowDSsel['descName'];
					// add desc to array
					array_push($descArray,$DescName);
					
					// get descriptions for this DS
					$sqlDesc = "SELECT `id`, `objid`, `projName`, `envName`, `descName`, `descType`, `fpath1`, `fpath2`, `descDesc`, `CREATED_TIMESTAMP`, `UPDATED_TIMESTAMP`, `CREATED_USER_ID`, `UPDATED_USER_ID` FROM `descriptions` WHERE `projName`='".$projName."' and `envName`='".$envName."' and `descName`='".$DescName."'";
					$resultDesc = mysqli_query ($cnn,$sqlDesc);
					if($resultDesc){
						while($rowDesc=mysqli_fetch_array($resultDesc)){
							// fill desc variables
							$DescType = $rowDesc['descType'];
							$Descfpath1 = $rowDesc['fpath1'];
							$Descfpath2 = $rowDesc['fpath2'];
							
							$txt = "DESCRIPTION ".$DescType." '".$Descfpath1."'\n              AS ".$DescName."\n";
							fwrite($scriptfile, $txt);
							// write header for inline description file
							$txt = "DESCRIPTION ".$DescType."\n/+\n";
							fwrite($scriptINL, $txt);
							// Open description file and write to INL script
							$txt = file_get_contents($_SERVER["DOCUMENT_ROOT"]."SQDATA/Studio/temp/uploaded/".$Descfpath1);
							fwrite($scriptINL, $txt);
							// write footer of inline description file
							$txt = "+/\n              AS ".$DescName."\n";
							fwrite($scriptINL, $txt);
						}
					}
					// Put 'KEY IS' statement here
					$keyArray = array();
					$sqlDSselFld = "SELECT `id`, `projName`, `envName`, `sysName`, `engName`, `DSname`, `descName`, `selName`, `fldName`, `isKey` FROM `dsselfields` WHERE `projName`='".$projName."' and `envName`='".$envName."' and `sysName`='".$sysName."' and `engName`='".$engName."' and `DSname`='".$DSname."'and `descName`='".$DescName."' and `isKey`='y'";
					$resultDSselFld = mysqli_query ($cnn,$sqlDSselFld);
					if($resultDSselFld){
						while($rowDSselFld=mysqli_fetch_array($resultDSselFld)){
							// fill DSsel variables
							$FldName = $rowDSselFld['fldName'];
							// add desc to array
							array_push($keyArray,$FldName);
							$arrlength=count($keyArray);
							for($x=0;$x<$arrlength;$x++) {
								if($x==0){
									$txt = "             KEY IS ".$keyArray[$x]."\n";
								}
								else
								{
									$txt = "                   ,".$keyArray[$x]."\n";
								}
								fwrite($scriptfile, $txt);
								fwrite($scriptINL, $txt);
							}
						}
					}
					$txt = ";\n";
					fwrite($scriptfile, $txt);
					fwrite($scriptINL, $txt);
				}
			}
			// If DS is MQ series then get system Que
			if($dsType == "MQS" || $dsType == "JMS")
			{
				$sqlsys = "SELECT `projName`, `envName`, `sysName`, `sysType`, `sysHostName`, `sysPort`, `sysQmgr` FROM `systems` WHERE `projName`='".$projName."' and `envName`='".$envName."' and `sysName`='".$sysName."'";
				$resultDesc = mysqli_query ($cnn,$sqlsys);
				if($resultsys){
					while($rowsys=mysqli_fetch_array($resultsys))
					{
						$sysQ = $rowsys['sysQmgr'];
					}
				}
			}
			// Write exception Datastore if exists
			if($dsEx != "")
			{
				$txt = "-- ------------------ *** Exception Datastore *** ------------------------\n";
				fwrite($scriptfile, $txt);
				fwrite($scriptINL, $txt);
				switch($dsType)
				{
					case  "CDC":
						$txt = "DATASTORE cdc://".$dsHost."/".$dsEx."/".$DSname." OF BINARY AS EX_".$DSname." DESCRIBED BY DUMMY;\n\n";
						break;
					case  "File":
						$txt = "DATASTORE file:///\'".$dsEx."' OF BINARY AS EX_".$DSname." DESCRIBED BY DUMMY;\n\n";
						break;
					case  "Table":
						$txt = "DATASTORE ".$dsEx." OF BINARY AS EX_".$DSname." DESCRIBED BY DUMMY;\n\n";
						break;
					case  "MQS":
						$txt = "DATASTORE mqs://".$dsHost."/".$sysQ."/".$dsEx." OF BINARY AS EX_".$DSname." DESCRIBED BY DUMMY;\n\n";
						break;
					case  "TCP":
						$txt = "DATASTORE tcp://".$dsHost.":".$dsPort." OF BINARY AS EX_".$DSname." DESCRIBED BY DUMMY;\n\n";
						break;
					case  "JMS":
						$txt = "DATASTORE jms://".$dsHost."/".$sysQ."/".$dsEx." OF BINARY AS EX_".$DSname." DESCRIBED BY DUMMY;\n\n";
						break;
					case  "IMS":
						$txt = "DATASTORE cics://".$sysQ."/".$dsPhysName."/".$dsEx." OF BINARY AS EX_".$DSname." DESCRIBED BY DUMMY;\n\n";
						break;
					case  "VSAM":
						$txt = "DATASTORE cics://".$dsHost.":".$dsPort."/".$dsPhysName."/".$engName."/".$dsEx." OF BINARY AS EX_".$DSname." DESCRIBED BY DUMMY;\n\n";
						break;
					case  "RDBMS":
						$txt = "DATASTORE RDBMS OF BINARY AS EX_".$DSname." DESCRIBED BY DUMMY;\n\n";
						break;
					default:
						$txt = "DATASTORE UnknownType://".$dsEx." OF BINARY AS EX_".$DSname." DESCRIBED BY DUMMY;\n\n";
						break;
				}
				fwrite($scriptfile, $txt);
				fwrite($scriptINL, $txt);
			}
			
			switch($dsType)
			{
				case  "CDC":
					$txt = "DATASTORE cdc://".$dsHost."/".$dsPhysName."/".$engName;
					break;
				case  "File":
					$txt = "DATASTORE file:///\'".$dsPhysName."'";
					break;
				case  "Table":
					$txt = "DATASTORE ".$dsPhysName;
					break;
				case  "MQS":
					$txt = "DATASTORE mqs://".$sysQ."/".$dsPhysName;
					break;
				case  "TCP":
					$txt = "DATASTORE tcp://".$dsHost.":".$dsPort."/".$dsPhysName."/".$engName;
					break;
				case  "JMS":
					$txt = "DATASTORE jms://".$sysQ."/".$dsPhysName;
					break;
				case  "IMS":
					$txt = "DATASTORE cics://".$sysQ."/".$dsPhysName;
					break;
				case  "VSAM":
					$txt = "DATASTORE cics://".$dsHost.":".$dsPort."/".$dsPhysName."/".$engName;
					break;
				case  "RDBMS":
					$txt = "DATASTORE RDBMS";
					break;
				default:
					$txt = "DATASTORE UnknownType";
					break;
			}
			fwrite($scriptfile, $txt);
			fwrite($scriptINL, $txt);
			$txt = "\n          OF ".$dsFormat."\n";
			fwrite($scriptfile, $txt);
			fwrite($scriptINL, $txt);
			// insert delimiters for delimited Format
			if($dsFormat == "Delimited")
			{
				if($dsRECDEL <> "")
				{
					$txt = "          RECDEL('".$dsRECDEL."')\n";
					fwrite($scriptfile, $txt);
					fwrite($scriptINL, $txt);
				};
				if($dsCOLDEL <> "")
				{
					$txt = "          COLDEL('".$dsCOLDEL."')\n";
					fwrite($scriptfile, $txt);
					fwrite($scriptINL, $txt);
				};
				if($dsCHRDEL <> "")
				{
					$txt = "          CHRDEL('".$dsCHRDEL."')\n";
					fwrite($scriptfile, $txt);
					fwrite($scriptINL, $txt);
				};
			};
			// continue DS description
			$txt = "          AS ".$DSname."\n          DESCRIBED BY\n";
			fwrite($scriptfile, $txt);
			fwrite($scriptINL, $txt);
			// loop thru desc array
			$arrlength=count($descArray);
			for($x=0;$x<$arrlength;$x++) {
				if($x==0){
					$txt = "                    ".$descArray[$x]."\n";
				}
				else
				{
					$txt = "                   ,".$descArray[$x]."\n";
				}
				fwrite($scriptfile, $txt);
				fwrite($scriptINL, $txt);
			};
			// operation here
			$txt = "          FOR ".$dsOpType."\n";
			fwrite($scriptfile, $txt);
			fwrite($scriptINL, $txt);
			// compensate here
			if($dsComp == 1)
			{
				$txt = "          COMPENSATE\n";
				fwrite($scriptfile, $txt);
				fwrite($scriptINL, $txt);
			};
			if($dsCompWarn == 1)
			{
				$txt = "          COMPENSATE WITH WARNING\n";
				fwrite($scriptfile, $txt);
				fwrite($scriptINL, $txt);
			};
			if($dsNoComp ==1)
			{
				$txt = "          NO COMPENSATE\n";
				fwrite($scriptfile, $txt);
				fwrite($scriptINL, $txt);
			};
			// WTOs Here
			if($dsWtoComp != "")
			{
				if($dsWtoComp == "ONCE")
				{
					$txt = "          WTO ON COMPENSATION ONCE\n";
					fwrite($scriptfile, $txt);
					fwrite($scriptINL, $txt);
				};
				if($dsWtoComp == "EVERY")
				{
					$txt = "          WTO ON COMPENSATION EVERY ".$dsCompNum." MINUTES\n";
					fwrite($scriptfile, $txt);
					fwrite($scriptINL, $txt);
				}
			};
			if($dsWtoExp != "")
			{
				if($dsWtoExp == "ONCE")
				{
					$txt = "          WTO ON EXCEPTION ONCE\n";
					fwrite($scriptfile, $txt);
					fwrite($scriptINL, $txt);
				};
				if($dsWtoExp == "EVERY")
				{
					$txt = "          WTO ON EXCEPTION EVERY ".$dsExpNum." MINUTES\n";
					fwrite($scriptfile, $txt);
					fwrite($scriptINL, $txt);
				}
			};
			// check before image
			if($dsChkBImg == 1)
			{
				$txt = "          CHECK FULL BEFORE IMAGE\n";
				fwrite($scriptfile, $txt);
				fwrite($scriptINL, $txt);
			};
			// reconnect here
			if($dsReconn == 1)
			{
				$txt = "          RECONNECT\n";
				fwrite($scriptfile, $txt);
				fwrite($scriptINL, $txt);
			};
			// RRS here
			if($dsRRS == 1)
			{
				$txt = "          RRS\n";
				fwrite($scriptfile, $txt);
				fwrite($scriptINL, $txt);
			};
			// Netezza Language here
			if($dsFormat == "Netezza")
			{
				$txt = "          STAGING DIR '".$dsStageDir."'\n";
				fwrite($scriptfile, $txt);
				fwrite($scriptINL, $txt);
				$txt = "          CONNECTIONS ".$dsConns."\n";
				fwrite($scriptfile, $txt);
				fwrite($scriptINL, $txt);
				$txt = "          STAGING DELAY ".$dsStageDelay."\n";
				fwrite($scriptfile, $txt);
				fwrite($scriptINL, $txt);
				$txt = "          STAGING RECORDS ".$dsStageRec."\n";
				fwrite($scriptfile, $txt);
				fwrite($scriptINL, $txt);
			};
			// exception datastore
			if($dsEx != "")
			{
				$txt = "          EXCEPTION EX_".$DSname."\n";
				fwrite($scriptfile, $txt);
				fwrite($scriptINL, $txt);
			};
			
			// end datastore
			$txt = ";\n\n";
			fwrite($scriptfile, $txt);
			fwrite($scriptINL, $txt);
		}
	}
	mysqli_close($cnn);
}
?>