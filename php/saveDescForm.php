<?php
require_once($_SERVER["DOCUMENT_ROOT"]."/SQDATA/Studio/dhtmlxSuite/dhtmlxConnector/php/codebase/form_connector.php");
//session_start();

$res = mysql_connect('localhost','id1531632_root','Ad1s0nR44t');
mysql_select_db('id1531632_sqmeta',$res);
$conn = new FormConnector($res,"MySQL");
$conn->render_table("descriptions","id","id, objid, projName, envName, descName, descType, fpath1, descDesc");
?>