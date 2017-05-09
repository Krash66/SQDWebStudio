<?php
require($_SERVER["DOCUMENT_ROOT"]."SQDATA/Studio/dhtmlxSuite/dhtmlxConnector/php/codebase/combo_connector.php");
//require($_SERVER["DOCUMENT_ROOT"]."SQDATA/Studio/dhtmlxSuite/dhtmlxConnector/php/codebase/db_mysql.php");

$res=mysql_connect("localhost","id1531632_root","Ad1s0nR44t");
mysql_select_db("id1531632_sqmeta");

$conn = new ComboConnector($res, "MySQL");
function custom_filter($data){
	if ($data->get_value("dbName")==null)
	$data->skip(); //not include into output
}
$conn->event->attach("beforeRender","custom_filter");
$conn->render_table("descriptions", "descName", "descName, dbName");
?>
