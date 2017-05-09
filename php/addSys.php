<?php
require_once($_SERVER["DOCUMENT_ROOT"]."/SQDATA/Studio/dhtmlxSuite/dhtmlxConnector/php/codebase/form_connector.php");
session_start();

$res = mysql_connect('localhost','id1531632_root','Ad1s0nR44t');
mysql_select_db('id1531632_sqmeta');
$conn = new FormConnector($res,"MySQL");
$conn->render_table("systems","sysName","objid, projName, envName, sysName, sysType, sysHostName, sysPort, sysQmgr, sysDBDLib, sysCopybookLib, sysDTDLib, sysDDLLib, sysInclude, sysDesc");
?>
