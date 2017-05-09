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
$sql="SELECT id, objid, projName, envName, descName, fpath1, descDesc FROM descriptions WHERE objid ='". $_POST["objid"]."' ";

//XML HEADER
echo "<data>\n"; 
$result = mysqli_query ($conn,$sql);
if($result){
	while($row=mysqli_fetch_array($result)){
		//create xml tag for form data
		echo "<id>".$row['id']."</id>\n";
		echo "<objid>".$row['objid']."</objid>\n";
		echo "<projName>".$row['projName']."</projName>\n";
		echo "<envName>".$row['envName']."</envName>\n";
		echo "<descName>".$row['descName']."</descName>\n";
		echo "<descDesc>".$row['descDesc']."</descDesc>\n";
		echo "<fpath1>".$row['fpath1']."</fpath1>\n";
	}
}else{
	die('Error: ' . mysqli_error($conn));
}
//Close db connection                                                                                                             
mysqli_close($conn);
//Close Tree Tag
echo "</data>";
