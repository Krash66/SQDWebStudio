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
$sel = "select='1' ";

//FUNCTION TO USE IN THE CODE LATER
//print tree XML based on parent_id (function calls itself to go through the nested levels)
function getLevelFromDB($parent_id,$cnn,$sel){
	//get tree level from database taking parent id as incomming argument
	$sql = "SELECT id, projName, objid, parentId, text, im0, im1, im2, checked, descId FROM descfldtree WHERE  parentId='".$parent_id."' and descId='".$_POST["descId"]."' ORDER BY id";
	$result = mysqli_query ($cnn,$sql);
	if($result){
		while($row=mysqli_fetch_array($result)){
			//create xml tag for tree node
			echo "<item id='".$row['objid']."' text='".$row['text']."' ".$sel."im0='".$row['im0']."' im1='".$row['im1']."' im2='".$row['im2']."' checked='".$row['checked']."'>\n";
			echo "<userdata name='descId'>".$row['descId']."</userdata>\n";
			$sel = "";  //First Node selected so no more of this 
			// get all field attributes and attach them to each node
			$sql2 = "SELECT a.id, a.objid, a.projName, a.envName, a.descName, a.descId, a.fldName, a.parentName, a.seqno, a.descFldDesc, a.nchildren, a.nlevel, a.noccurs, a.noccno, a.dataType ,a.legType, a.noffset, a.nlength, a.nscale, a.canNull, b.isKey, b.dateFormat, b.label, b.initVal, b.retype, b.invalid, b.extType, b.identVal, b.fKey FROM descriptionfields a INNER JOIN dsselfields b ON a.projName=b.projName and a.envName=b.envName and a.descName=b.descName and a.fldName=b.fldName WHERE a.descId='".$row['descId']."' and a.fldName='".$row['text']."' and b.DSname='".$_POST['DSName']."'";
			/*
			`id`, `projName`, `envName`, `sysName`, `engName`, `DSname`, `descName`, `selName`, `fldName`, `parentId`, `seqno`, `descFldDesc`, `canNull`, `isKey`, `dateFormat`, `label`, `initVal`, `retype`, `invalid`, `extType`, `identVal`, `fKey` 
			*/
			$res2 = mysqli_query ($cnn,$sql2);
			if($res2){
				while($row2=mysqli_fetch_array($res2)){
					echo "<userdata name='Icon'>Field List.ico</userdata>\n";
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
				}
				
				// recurse to include child nodes
				getLevelFromDB($row['text'],$cnn,$sel);
				//close xml tag for the node
				echo "</item>\n";
			}
			else
			{
				echo "!!! error !!!";
			}
		}
	}else{
		die('Error: ' . mysqli_error($cnn));
	}
}

//XML HEADER
echo "<?xml version=\"1.0\" encoding=\"iso-8859-1\" ?>\n"; 
// Open Tree at Project Folder
echo "<tree id='0'>\n";
//Call function to print tree XML
getLevelFromDB('0',$conn, $sel);
//Close db connection                                                                                                                                               
mysqli_close($conn);
//Close Tree Tag
echo "</tree>";

?>

