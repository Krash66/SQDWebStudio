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
$txt = "";
//$path = "SQDATA/Studio/temp/";
//$outPath = $_SERVER["DOCUMENT_ROOT"].$path;
//$outfile = $outPath.$_POST["descId"].".xml";
//$scriptfile = fopen($outfile, "w") or die("Unable to open file!");

//FUNCTION TO USE IN THE CODE LATER
//print tree XML based on parent_id (function calls itself to go through the nested levels)
function getLevelFromDB($parent_id,$cnn,$sel){   //,$scriptfile
	//get tree level from database taking parent id as incomming argument
	$sql = "SELECT id, objid, projName, parentId, text, im0, im1, im2, checked, descId, seqno FROM descfldtree WHERE  parentId='".$parent_id."' and descId='".$_POST["descId"]."' ORDER BY seqno";
	$result = mysqli_query ($cnn,$sql);
	if($result){
		while($row=mysqli_fetch_array($result)){
			//create xml tag for tree node
			/*echo "<item id='".$row['objid']."' text='".$row['text']."' ".$sel."im0='".$row['im0']."' im1='".$row['im1']."' im2='".$row['im2']."' checked='".$row['checked']."'>\n";*/
			$txt = "<item id='".$row['objid']."' text='".$row['text']."' ".$sel."im0='".$row['im0']."' im1='".$row['im1']."' im2='".$row['im2']."' checked='".$row['checked']."'>\n";
			//fwrite($scriptfile, $txt);
			echo $txt;
			/*echo "<userdata name='descId'>".$row['descId']."</userdata>\n";*/
			$txt = "<userdata name='descId'>".$row['descId']."</userdata>\n";
			//fwrite($scriptfile, $txt);
			echo $txt;
			$sel = "";  //First Node selected so no more of this 
			// get all field attributes and attach them to each node
			$sql2 = "SELECT id, objid, projName, envName, descName, descId, descType, fldName, parentName, seqno, descFldDesc, nchildren, nlevel, noccurs, noccno, dataType, legType, noffset, nlength, nscale, canNull, iskey FROM descriptionfields WHERE descId='".$row['descId']."' and fldName='".$row['text']."'and seqno='".$row['seqno']."'";
			$res2 = mysqli_query ($cnn,$sql2);
			if($res2){
				while($row2=mysqli_fetch_array($res2)){
					//echo "<userdata name='Icon'>Field List.ico</userdata>\n";
					$txt = "<userdata name='Icon'>Field List.ico</userdata>\n";
					//fwrite($scriptfile, $txt);
					echo $txt;
					//echo "<userdata name='NumElements'>".$row2['nchildren']."</userdata>\n";
					$txt = "<userdata name='NumElements'>".$row2['nchildren']."</userdata>\n";
					//fwrite($scriptfile, $txt);
					echo $txt;
					//echo "<userdata name='level'>".$row2['nlevel']."</userdata>\n";
					$txt = "<userdata name='level'>".$row2['nlevel']."</userdata>\n";
					//fwrite($scriptfile, $txt);
					echo $txt;
					//echo "<userdata name='Occurs'>".$row2['noccurs']."</userdata>\n";
					$txt = "<userdata name='Occurs'>".$row2['noccurs']."</userdata>\n";
					//fwrite($scriptfile, $txt);
					echo $txt;
					//echo "<userdata name='OccurNum'>".$row2['noccno']."</userdata>\n";
					$txt = "<userdata name='OccurNum'>".$row2['noccno']."</userdata>\n";
					//fwrite($scriptfile, $txt);
					echo $txt;
					//echo "<userdata name='DataType'>".$row2['dataType']."</userdata>\n";
					$txt = "<userdata name='DataType'>".$row2['dataType']."</userdata>\n";
					//fwrite($scriptfile, $txt);
					echo $txt;
					//echo "<userdata name='legType'>".$row2['legType']."</userdata>\n";
					$txt = "<userdata name='legType'>".$row2['legType']."</userdata>\n";
					//fwrite($scriptfile, $txt);
					echo $txt;
					//echo "<userdata name='Offset'>".$row2['noffset']."</userdata>\n";
					$txt = "<userdata name='Offset'>".$row2['noffset']."</userdata>\n";
					//fwrite($scriptfile, $txt);
					echo $txt;
					//echo "<userdata name='IntFieldLen'>".$row2['nlength']."</userdata>\n";
					$txt = "<userdata name='IntFieldLen'>".$row2['nlength']."</userdata>\n";
					//fwrite($scriptfile, $txt);
					echo $txt;
					//echo "<userdata name='Scale'>".$row2['nscale']."</userdata>\n";
					$txt = "<userdata name='Scale'>".$row2['nscale']."</userdata>\n";
					//fwrite($scriptfile, $txt);
					echo $txt;
					//echo "<userdata name='NullAllowed'>".$row2['canNull']."</userdata>\n";
					$txt = "<userdata name='NullAllowed'>".$row2['canNull']."</userdata>\n";
					//fwrite($scriptfile, $txt);
					echo $txt;
					//echo "<userdata name='IsKey'>".$row2['iskey']."</userdata>\n";
					$txt = "<userdata name='IsKey'>".$row2['iskey']."</userdata>\n";
					//fwrite($scriptfile, $txt);
					echo $txt;
					//echo "<userdata name='FKey'></userdata>\n";
					$txt = "<userdata name='FKey'></userdata>\n";
					//fwrite($scriptfile, $txt);
					echo $txt;
					//echo "<userdata name='InitVal'></userdata>\n";
					$txt = "<userdata name='InitVal'></userdata>\n";
					//fwrite($scriptfile, $txt);
					echo $txt;
					//echo "<userdata name='ReType'></userdata>\n";
					$txt = "<userdata name='ReType'></userdata>\n";
					//fwrite($scriptfile, $txt);
					echo $txt;
					//echo "<userdata name='ExtType'></userdata>\n";
					$txt = "<userdata name='ExtType'></userdata>\n";
					//fwrite($scriptfile, $txt);
					echo $txt;
					//echo "<userdata name='Invalid'></userdata>\n";
					$txt = "<userdata name='Invalid'></userdata>\n";
					//fwrite($scriptfile, $txt);
					echo $txt;
					//echo "<userdata name='DateFormat'></userdata>\n";
					$txt = "<userdata name='DateFormat'></userdata>\n";
					//fwrite($scriptfile, $txt);
					echo $txt;
					//echo "<userdata name='Label'></userdata>\n";
					$txt = "<userdata name='Label'></userdata>\n";
					//fwrite($scriptfile, $txt);
					echo $txt;
					//echo "<userdata name='RecId'>".$row2['seqno']."</userdata>\n";
					$txt = "<userdata name='RecId'>".$row2['seqno']."</userdata>\n";
					//fwrite($scriptfile, $txt);
					echo $txt;
				}
			};
			// recurse to include child nodes
			getLevelFromDB($row['text'],$cnn,$sel); //,$scriptfile
			//close xml tag for the node
			//echo "</item>\n";
			$txt = "</item>\n";
			//fwrite($scriptfile, $txt);
			echo $txt;
		}
	}else{
		die('Error: ' . mysqli_error($cnn));
	}
}

//XML HEADER
//echo "<?xml version=\"1.0\" encoding=\"iso-8859-1\" \n"; 
$txt ="<?xml version=\"1.0\" encoding=\"iso-8859-1\" ?>\n"; 
//fwrite($scriptfile, $txt);
echo $txt;
// Open Tree at Project Folder
//echo "<tree id='0'>\n";
$txt = "<tree id='0'>\n";
//fwrite($scriptfile, $txt);
echo $txt;
//Call function to print tree XML
getLevelFromDB('0',$conn, $sel);  //,$scriptfile
//Close db connection                                                                                                                                               
mysqli_close($conn);
//Close Tree Tag
//echo "</tree>";
$txt = "</tree>";
//fwrite($scriptfile, $txt);
echo $txt;
//fclose($scriptfile);
?>


