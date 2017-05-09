<?php
// Open the session
session_start();
// create connection
$conn=mysqli_connect('localhost', 'id1531632_root','Ad1s0nR44t','id1531632_sqmeta');
// Check connection
if (mysqli_connect_errno())
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$sql="SELECT `id`, `objid`, `projName`, `envName`, `descName`, `descType`, `fpath1`, `fpath2`, `segName`, `segId`, `descDesc` FROM `descriptions` WHERE `projName`='".$_POST['projName']."' AND `envName`='".$_POST['envName']."' AND `descName`='".$_POST['descName']."' AND `descType`='".$_POST['descType']."'";

$result = mysqli_query($conn,$sql);
if ($result)
{
	while($row=mysqli_fetch_array($result))
	{
		//create xml tag for form data
		echo $row['descName'];
	}
}
else
{
	die('Error: ' . mysqli_error($conn));
}

//Close db connection                                        
mysqli_close($conn);
?>
