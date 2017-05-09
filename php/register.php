<?php
//retrieve our data from POST
$username = $_POST['username'];
$password1 = $_POST['password1'];
$password2 = $_POST['password2'];
$host = $_SERVER['HTTP_HOST'];

if($password1 != $password2)
{
	header("Location: http://".$host."/SQDATA/Studio/reg.html");
	exit();
}
 
if(strlen($username) > 30)
{
	header("Location:  http://".$host."/SQDATA/Studio/reg.html");
	exit();
}

$hash = hash('sha256', $password1);
 
function createSalt()
{
    $text = md5(uniqid(rand(), true));
    return substr($text, 0, 3);
}
 
$salt = createSalt();
$password = hash('sha256', $salt . $hash);

//$conn = mysql_connect('localhost', 'id1531632_root', 'Ad1s0nR44t');
//mysql_select_db('id1531632_sqmeta', $conn);
$conn=mysqli_connect('localhost', 'id1531632_root','Ad1s0nR44t','id1531632_sqmeta');

//sanitize username
$username = mysql_real_escape_string($username);
 
$query = "INSERT INTO member ( username, password, salt )
        VALUES ( '$username', '$password', '$salt' );";
mysqli_query($conn,$query);
 
mysqli_close($conn);
 
header("Location:  http://".$host."/SQDATA/Studio/login.html");
?>


