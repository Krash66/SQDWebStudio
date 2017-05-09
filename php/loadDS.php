<?php
require_once($_SERVER["DOCUMENT_ROOT"]."/SQDATA/Studio/dhtmlxSuite/dhtmlxConnector/php/codebase/form_connector.php");
//session_start();

$res = mysql_connect('localhost','id1531632_root','Ad1s0nR44t');
mysql_select_db('id1531632_sqmeta',$res);
$conn = new FormConnector($res,"MySQL");
$conn->render_table("datastores","id","id, objid, projName, envName, sysName, engName, engType, DSimage, DSname, DSdir, DSformat, DStype, DSPhysName, DSHostName, DSPort, DSException, DSUOW, DSIMSPathData, DSSkipChangeCheck, DSOperationType, DSKeyChange, DSchkBImg, RECDEL, COLDEL, CHRDEL, DScomp, DScompWarn, DSnoComp, DSwtoComp, DScompNum, DSwtoExp, DSexpNum, DSstageDir, DSconns, DSstageRec, DSstageDelay, DSreconn, DSaccept, RRS,  DSDesc");

?>
