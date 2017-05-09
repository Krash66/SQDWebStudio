<?php

$fileName = $_SERVER["DOCUMENT_ROOT"].$_GET["filePath"];	

if (file_exists($fileName)) {
   /* header('Content-Description: File Transfer');
//	header('Content-Type: application/octet-stream');
//	header('Content-Disposition: attachment; filename='.basename($fileName));
//	header('Expires: 0');
//	header('Cache-Control: must-revalidate');
//	header('Pragma: public');
//	header('Content-Length: ' . filesize($fileName));
//	readfile($fileName);
//	exit;*/
	header("Pragma: public"); // required
	header("Expires: 0");
	header("Cache-Control: must-revalidate");   //, post-check=0, pre-check=0
	header("Content-Description: File Transfer");
	header("Content-Type: application/force-download");
	header('Content-Disposition: attachment; filename="'.basename($fileName).'"');
	header("Content-Transfer-Encoding: binary");
	header("Content-Length: ".filesize($fileName));
	//readfile($fileName);
	$fp = fopen($fileName, 'rb');
	fpassthru($fp);
	fclose($fp);
	exit;
}
//if (is_file($fileName)) {
//	header("Content-type: application/octet-stream");
//	header("Content-Length: ".filesize($fileName));
//	header("Content-Disposition: attachment; filename=\"".$fileName."\"");
//	
//	$fp = fopen($fileName, 'rb');
//	fpassthru($fp);
//	fclose($fp);
//}
//else {
//	echo "File not available.";
//}


?> 