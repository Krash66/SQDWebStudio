<?php
// Open the session
session_start();
// Create MySQL connection
$conn=mysqli_connect('localhost', 'id1531632_root','Ad1s0nR44t','id1531632_sqmeta');
// Check connection
if (mysqli_connect_errno())
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
// variable for source or target icon
//$icontype = $_POST["icontype"];
$projName = $_POST["nameProj"];
$envName = $_POST["nameEnv"];
$sysName = $_POST["nameSys"];
$engName = $_POST["nameEng"];

/// recursive function to get field tree for each description
function getLevelFromDB2($parent_id,$cnn,$descid,$sysName,$engName,$dsName){
	//get tree level from database taking parent id as incomming argument
	$sql = "SELECT id, projName, objid, parentId, text, im0, im1, im2, checked, descId, seqno FROM descfldtree WHERE parentId='".$parent_id."' and descId='".$descid."' ORDER BY seqno";
	$result = mysqli_query ($cnn,$sql);
	if($result){
		while($row=mysqli_fetch_array($result)){
			
			// get all field attributes and attach them to each node
			$sql2 = "SELECT a.id, a.objid, a.projName, a.envName, a.descName, b.sysName, b.engName, b.DSname, a.descId, a.fldName, a.parentName, a.seqno, a.descFldDesc, a.nchildren, a.nlevel, a.noccurs, a.noccno, a.dataType, a.legType, a.noffset, a.nlength, a.nscale, a.canNull, b.isKey, b.dateFormat, b.label, b.initVal, b.retype, b.invalid, b.extType, b.identVal, b.fKey FROM descriptionfields a INNER JOIN dsselfields b ON a.projName=b.projName and a.envName=b.envName and a.descName=b.descName and a.descType=b.descType and a.fldName=b.fldName WHERE a.descId='".$row['descId']."' and a.fldName='".$row['text']."' and b.sysName='".$sysName."' and b.engName='".$engName."' and b.DSname='".$dsName."'";
			/*
			`id`, `projName`, `envName`, `sysName`, `engName`, `DSname`, `descName`, `selName`, `fldName`, `parentId`, `seqno`, `descFldDesc`, `canNull`, `isKey`, `dateFormat`, `label`, `initVal`, `retype`, `invalid`, `extType`, `identVal`, `fKey` 
			*/
			$res2 = mysqli_query ($cnn,$sql2);
			if($res2){   // if correct, this will only get one record from the db, so while loop, only runs once
				while($row2=mysqli_fetch_array($res2)){
					//create xml tag for tree node
					echo "<item id='".$row2['DSname'].".".$row2['descName'].".".$row2['fldName']."' text='".$row['text']."' im0='".$row['im0']."' im1='".$row['im1']."' im2='".$row['im2']."' checked='".$row['checked']."'>\n";
					//$row['objid']
					//echo "<userdata name='DSname'>".$dsname."</userdata>\n";
					//$sel = "";  //First Node selected so no more of this 
					echo "<userdata name='descId'>".$row['descId']."</userdata>\n";
					echo "<userdata name='descName'>".$row2['descName']."</userdata>\n";
					echo "<userdata name='sysName'>".$row2['sysName']."</userdata>\n";
					echo "<userdata name='engName'>".$row2['engName']."</userdata>\n";
					echo "<userdata name='DSname'>".$row2['DSname']."</userdata>\n";
					echo "<userdata name='Icon'>".$row['im0']."</userdata>\n";   //FieldList.ico
					echo "<userdata name='NumElements'>".$row2['nchildren']."</userdata>\n";
					echo "<userdata name='level'>".$row2['nlevel']."</userdata>\n";
					echo "<userdata name='Occurs'>".$row2['noccurs']."</userdata>\n";
					echo "<userdata name='OccurNum'>".$row2['noccno']."</userdata>\n";
					echo "<userdata name='DataType'>".$row2['dataType']."</userdata>\n";
					echo "<userdata name='legType'>".$row2['legType']."</userdata>\n";
					echo "<userdata name='Offset'>".$row2['noffset']."</userdata>\n";
					echo "<userdata name='IntFieldLen'>".$row2['nlength']."</userdata>\n";
					echo "<userdata name='Scale'>".$row2['nscale']."</userdata>\n";
					echo "<userdata name='NullAllowed'>".$row2['canNull']."</userdata>\n";
					echo "<userdata name='IsKey'>".$row2['isKey']."</userdata>\n";
					echo "<userdata name='FKey'>".$row2['fKey']."</userdata>\n";
					echo "<userdata name='InitVal'>".$row2['initVal']."</userdata>\n";
					echo "<userdata name='ReType'>".$row2['retype']."</userdata>\n";
					echo "<userdata name='ExtType'>".$row2['extType']."</userdata>\n";
					echo "<userdata name='Invalid'>".$row2['invalid']."</userdata>\n";
					echo "<userdata name='DateFormat'>".$row2['dateFormat']."</userdata>\n";
					echo "<userdata name='Label'>".$row2['label']."</userdata>\n";
					echo "<userdata name='RecId'>".$row2['seqno']."</userdata>\n";
				}  // end while
			}; //end if
			// recurse to include child nodes
			getLevelFromDB2($row['text'],$cnn,$row['descId'],$sysName,$engName,$dsName);
			//close xml tag for the node
			echo "</item>\n";
		}  // end while
	}else{
		die('Error: ' . mysqli_error($cnn));
	}
}

//XML HEADER
echo "<?xml version=\"1.0\" encoding=\"iso-8859-1\" ?>\n"; 
// Open Tree at Project Folder
echo "<tree id='0'>\n";
// SQL to get list of datastores `DSname`,
$sql = "SELECT id, objid, projName, envName, sysName, engName, taskName, DSname, DSimage FROM taskds WHERE objid='".$_POST["objid"]."' and DSdir='".$_POST["DSdir"]."'";
// get results from SQL query
$result = mysqli_query ($conn,$sql);
if($result)
{
	// create XML tree from list of datastores
	while($row=mysqli_fetch_array($result))
	{
		//echo list of datastores
		$dsID = $row['projName'].".".$row['envName'].".".$row['sysName'].".".$row['engName'].".".$row['DSname'];
		echo "<item id='".$dsID."' text='".$row['DSname']."' im0='".$row['DSimage']."' im1='".$row['DSimage']."' im2='".$row['DSimage']."'>\n";
		echo "<userdata name='DataType'>DS</userdata>\n";
		//$dsName = $row['DSname'];
		// SQL to get all DSselections and their fields
		$sql2 = "SELECT a.objid, a.projName, a.envName, a.DSname, b.descName, b.descType FROM taskds a INNER JOIN dsselections b ON a.projName=b.projName AND a.envName=b.envName AND a.sysName=b.sysName AND a.engName=b.engName AND a.DSname=b.DSname WHERE a.objid='".$_POST["objid"]."' and a.DSdir='".$_POST["DSdir"]."'";
		// get results from SQL query
		$result2 = mysqli_query ($conn,$sql2);
		if($result2)
		{
			// create XML tree from list of DSselections
			while($row2=mysqli_fetch_array($result2)){
				//Call function to print tree XML
				$descID = $row2['projName'].".".$row2['envName'].".".$row2['descName'].".".$row2['descType'];
				//echo list of DSselections
				echo "<item id='".$descID."' text='".$row2['descName']."' im0='desc.gif' im1='desc.gif' im2='desc.gif'>\n";
				echo "<userdata name='DataType'>desc</userdata>\n";
				getLevelFromDB2('0',$conn,$descID,$sysName,$engName,$row['DSname']);
				echo "</item>\n";
			};  // end while
		}else{
			die('Error: ' . mysqli_error($conn));
		};  // end if
		// close DS item
		echo "</item>\n";
	};  //end while
}else{
	die('Error: ' . mysqli_error($conn));
}; // end if

// add variables to tree
$sqlv = "SELECT `id`, `objid`, `projName`, `envName`, `sysName`, `engName`, `varName`, `varSize`, `varInitVal`, `varDesc` FROM `variables` WHERE `projName`='".$projName."' and `envName`='".$envName."' and `sysName`='".$sysName."' and `engName`='".$engName."'";
$resultv = mysqli_query ($conn,$sqlv);
if($resultv){
	while($rowV=mysqli_fetch_array($resultv)){
		// fill variables from DB
		$varName = $rowV['varName'];
		$varSize = $rowV['varSize'];
		$varInit = $rowV['varInitVal'];
		// write Vars to Script
		$varID =  $rowV['objid'];
		//echo list of variables
		echo "<item id='".$varID."' text='".$varName."' im0='var.gif' im1='var.gif' im2='var.gif'>\n";
		echo "<userdata name='DataType'>var</userdata>\n";
		echo "<userdata name='varSize'>".$varSize."</userdata>\n";
		echo "<userdata name='varInitVal'>".$varInit."</userdata>\n";
		echo "</item>\n";
	}
};

// add Procedures to tree SELECT `id`, `objid`, `projName`, `envName`, `sysName`, `engName`, `taskName`, `taskType`, `taskSeqNo`, `taskDesc`, `CREATED_TIMESTAMP`, `UPDATED_TIMESTAMP`, `CREATED_USER_ID`, `UPDATED_USER_ID` FROM `tasks` WHERE 1
$sqlp = "SELECT `id`, `objid`, `projName`, `envName`, `sysName`, `engName`, `taskName`, `taskType` FROM `tasks` WHERE `projName`='".$projName."' and `envName`='".$envName."' and `sysName`='".$sysName."' and `engName`='".$engName."'";
$resultp = mysqli_query ($conn,$sqlp);
if($resultp){
	while($rowp=mysqli_fetch_array($resultp)){
		// fill variables from DB
		$procName = $rowp['taskName'];
		$tasktype = $rowp['taskType'];
		if($tasktype != "Main")	
		{
			$procIcon = "Proc.gif";
			if($tasktype == "Proc")
			{
				$procIcon = "Crop.gif";
			};
			// write Vars to Script
			$procID =  $rowp['objid'];
			//echo list of variables
			echo "<item id='".$procID."' text='".$procName."' im0='".$procIcon."' im1='".$procIcon."' im2='".$procIcon."'>\n";
			echo "<userdata name='DataType'>Proc</userdata>\n";
			echo "<userdata name='Icon'>".$procIcon."</userdata>\n";
			echo "</item>\n";
		}
	}
}

//Close Tree Tag
echo "</tree>";
//Close db connection                       
mysqli_close($conn);
?>
