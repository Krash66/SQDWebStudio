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
//XML HEADER
//header("Content-type: text/xml");
echo "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?>\n"; 

// SQL to get Mapping info
$sql = "SELECT id, objid, projName, envName, sysName, engName, taskName, taskType, mappingId, isMapped, mappingDesc, srcType, tgtType, mappingSrc, mappingTgt, srcParent, tgtParent, srcDS, tgtDS FROM taskmap WHERE projName='".$_POST["projName"]."' and envName='".$_POST["envName"]."' and sysName='".$_POST["sysName"]."' and engName='".$_POST["engName"]."' and taskName='".$_POST["taskName"]."' ORDER BY mappingId";
//echo $sql;
// Open rows tag
echo "<rows>\n";
// get results from SQL query
$result = mysqli_query ($conn,$sql);
if($result){
	while($row=mysqli_fetch_array($result)){
		// Source fields
		if($_POST["gridSide"]=='SRC')
		{
			// if source mapping grid
			// echo each row in the grid
			if($row['mappingSrc'] != "")
			{
				echo "<row id='".$row['srcDS'].".".$row['srcParent'].".".$row['mappingSrc']."'>\n";
				// echo row userdata
				echo "<userdata name='isMapped'>".$row['isMapped']."</userdata>\n";
				echo "<userdata name='mappingDesc'>".$row['mappingDesc']."</userdata>\n";
				// echo cell contents
				echo "<cell>".$row['mappingId']."</cell>\n";
				echo "<cell></cell>\n";
				if($row['srcType'] == "FLD")
				{
					echo "<cell>../Studio/data/SQDimgs/FieldList.ico</cell>\n";
				}
				elseif($row['srcType'] == "Func")
				{
					echo "<cell>../Studio/data/SQDimgs/Paste Function.ico</cell>\n";
				}
				elseif($row['srcType'] == "var")
				{
					echo "<cell>../Studio/data/SQDimgs/var.ico</cell>\n";
				}
				elseif($row['srcType'] == "Template")
				{
					echo "<cell>../Studio/data/SQDimgs/Template.ico</cell>\n";
				}
				elseif($row['srcType'] == "desc")
				{
					echo "<cell>../Studio/data/SQDimgs/desc.ico</cell>\n";
				}
				elseif($row['srcType'] == "DS")
				{
					echo "<cell>../Studio/data/SQDimgs/SDS.ico</cell>\n";
				}
				else
				{
					echo "<cell></cell>\n";
				};
				echo "<cell>".$row['srcType']."</cell>\n";
				echo "<cell>".$row['srcDS']."</cell>\n";
				echo "<cell>".$row['srcParent']."</cell>\n";
				echo "<cell>".$row['mappingSrc']."</cell>\n";
				echo "</row>\n";
			}
			else
			{
				echo "<row id='".$row['mappingId']."'></row>\n";
			}
		}
		else
		{
			// if target mapping grid
			// echo each row in the grid
			if($row['mappingTgt'] != "")
			{
				echo "<row id='".$row['tgtDS'].".".$row['tgtParent'].".".$row['mappingTgt']."'>\n";
				// echo row userdata
				echo "<userdata name='isMapped'>".$row['isMapped']."</userdata>\n";
				echo "<userdata name='mappingDesc'>".$row['mappingDesc']."</userdata>\n";
				// echo cell contents
				echo "<cell>".$row['mappingId']."</cell>\n";
				echo "<cell></cell>\n";
				if($row['tgtType'] == "FLD")
				{
					echo "<cell>../Studio/data/SQDimgs/FieldList.ico</cell>\n";
				}
				elseif($row['tgtType'] == "var")
				{
					echo "<cell>../Studio/data/SQDimgs/var.ico</cell>\n";
				}
				elseif($row['tgtType'] == "desc")
				{
					echo "<cell>../Studio/data/SQDimgs/desc.ico</cell>\n";
				}
				elseif($row['tgtType'] == "DS")
				{
					echo "<cell>../Studio/data/SQDimgs/TDS.ico</cell>\n";
				}
				else
				{
					echo "<cell></cell>\n";
				};
				echo "<cell>".$row['tgtType']."</cell>\n";
				echo "<cell>".$row['tgtDS']."</cell>\n";
				echo "<cell>".$row['tgtParent']."</cell>\n";
				echo "<cell>".$row['mappingTgt']."</cell>\n";
				echo "</row>\n";
			}
			else
			{
				echo "<row id='".$row['mappingId']."'></row>\n";
			}
		}
	}
}
else
{
	die('Error: ' . mysqli_error($conn));
};
//Close db connection                                                                                                                                              
mysqli_close($conn);
//Close rows Tag
echo "</rows>";