<?php
require($_SERVER["DOCUMENT_ROOT"]."/SQDATA/Studio/dhtmlxSuite/dhtmlxConnector/php/codebase/combo_connector.php");
$res=mysql_connect("localhost","id1531632_root","Ad1s0nR44t");
mysql_select_db("id1531632_sqmeta");

$data = new ComboConnector($res, "MySQL");
$data->render_table("connections", "id","connName, connName");
?>