// SQData Web Studio
//
//******************************************************************************************
// Main Menu and Toolbar Handlers
//
function menuNewProj()
{
    NewProj( 'fldProj' );
}
function menuOpenProj()
{
//    alert( 'Open Project dialog here' );
    ChooseProj();
}
function menuCloseProj()
{
//    alert( 'Close Project' + CURproj );
    MainTree.deleteItem( CURproj, true );
}
function menuCloseAllProj()
{
        alert( 'Close All Projects under construction' );
//    MainTree.deleteChildItems( '0' )
}
function menuXMLtoDTD()
{
    alert( 'XML to DTD Converter under construction' );
}
function menuImportScript()
{
    alert( 'Script Importer under construction' );
}
function menuMetaBackup()
{
    alert( 'MetaData Backup under construction' );
}
function menuSaveAll()
{
    alert( 'Save all under construction' );
}
function menudoExit()
{
    alert( 'Exit routine under construction' );
}
function menudoCopy( id )
{
    alert( 'Copy under construction' );
}
function menudoPaste( id )
{
    alert( 'Paste under construction' );
}
function menudoDelete( objid )
{
//    alert( 'Delete not yet functional' );
    delObj( objid );
}
function menudoAbout()
{
    alert( 'Web Studio version beta 3.0  date: 9/24/2015' );
}
function menudoHelp()
{
    alert( 'Help under construction' );
}
function menuReportBug()
{
    alert( 'Bug reporting under construction' );
}

//********************************************************************************************
// Main Toolbar Functions
//
function tbNewProj( id )
{
    NewProj( id );
}
function tbOpenProj()
{
//    alert( 'Open Project dialog here' );
    ChooseProj();
}
function tbSaveAll( id )
{
    alert( 'Save all under construction' );
}
function tbdoCopy( id )
{
    alert( 'Copy under construction' );
}
function tbdoPaste( id )
{
    alert( 'Paste under construction' );
}
function tbdoDelete( objid )
{
//    alert( 'Delete not yet functional' );
    delObj( objid );
}
function tbdoLog()
{
    Tabbar_user_control.setTabActive( "tabLog" );
}
function tbdoHelp()
{
    alert( 'Help Files under construction' );
}
//****************************************************************************************
// Main Tree Context Menu Functions
//
function NewProj( TPid, UID, PW )
{
//    alert( 'Menu New Project' + '\n' + 'Tree Parent id: fldProj' + '\n' + 'Parent id: fldProj' );
    AddProj( TPid, UID, PW );
}
function NewEnv( Pid, TPid )
{
//    alert( 'New Environment' + '\n' + 'Tree Parent id: ' + TPid + '\n' + 'Parent id: ' + Pid );
    AddEnv( Pid, TPid );
}
function NewConn( Pid, TPid )
{
//    alert( 'New Connection' + '\n' + 'Tree Parent id: ' + TPid + '\n' + 'Parent id: ' + Pid );
    AddConn( Pid, TPid );
}
function NewSelection( Pid, TPid )
{
//    alert( 'New Selection of Description: ' + Pid + '\n' + 'Tree Parent id: ' + TPid );
    addSel( Pid, TPid );
}
function NewCOBOL( Pid, TPid, Dir )
{
    dType = "COB";

    addDesc(Pid, TPid, dType, Dir);
}
function NewCOBOLfolder(Pid, TPid, Dir)
{
    dType = "COB";
//    alert( 'New COBOL Description' + '\n' + 'Tree Parent id: ' + TPid + '\n' + 'Parent id: ' + Pid + '\n' + 'DescType: ' + dType );
    addDesc(Pid, TPid, dType, Dir);
}
function NewDBD(Pid, TPid, Dir)
{
    //dType = "DBD";
//    alert( 'New COBOL w/DBD Description' + '\n' + 'Tree Parent id: ' + TPid + '\n' + 'Parent id: ' + Pid );
    addCOBOLDesc(Pid, TPid, Dir);
}
function NewDBDfolder(Pid, TPid, Dir)
{
    //dType = "DBD";
//    alert( 'New COBOL w/DBD Folder and Description' + '\n' + 'Tree Parent id: ' + TPid + '\n' + 'Parent id: ' + Pid );
    addCOBOLDesc(Pid, TPid, Dir);
}
function NewDTD(Pid, TPid, Dir)
{
    dType = "DTD";
//    alert( 'New XML/DTD Description' + '\n' + 'Tree Parent id: ' + TPid + '\n' + 'Parent id: ' + Pid + '\n' + 'DescType: ' + dType );
    addDesc( Pid, TPid, dType );
}
function NewDTDfolder(Pid, TPid, Dir)
{
    dType = "DTD";
//    alert( 'New XML/DTD FOlder and Description' + '\n' + 'Tree Parent id: ' + TPid + '\n' + 'Parent id: ' + Pid + '\n' + 'DescType: ' + dType );
    addDesc(Pid, TPid, dType, Dir);
}
//function NewC( Pid, TPid, Dir  )
//{
//    dType = "INC";
////    alert( 'New C Description' + '\n' + 'Tree Parent id: ' + TPid + '\n' + 'Parent id: ' + Pid + '\n' + 'DescType: ' + dType );
//    addDesc( Pid, TPid, dType, Dir  );
//}
//function NewCfolder( Pid, TPid, Dir  )
//{
//    dType = "INC";
////    alert( 'New C Folder and Description' + '\n' + 'Tree Parent id: ' + TPid + '\n' + 'Parent id: ' + Pid + '\n' + 'DescType: ' + dType );
//    addDesc( Pid, TPid, dType, Dir  );
//}
function Newdb2(Pid, TPid, Dir)
{
    dType = "db2";
//    alert( 'New DDL Description' + '\n' + 'Tree Parent id: ' + TPid + '\n' + 'Parent id: ' + Pid + '\n' + 'DescType: ' + dType );
    addDesc(Pid, TPid, dType, Dir);
}
function Newdb2folder(Pid, TPid, Dir)
{
    dType = "db2";
//    alert( 'New DDL Folder and Description' + '\n' + 'Tree Parent id: ' + TPid + '\n' + 'Parent id: ' + Pid + '\n' + 'DescType: ' + dType );
    addDesc(Pid, TPid, dType, Dir);
}

function Newmssql(Pid, TPid, Dir)
{
    dType = "mssql";
    //    alert( 'New DDL Description' + '\n' + 'Tree Parent id: ' + TPid + '\n' + 'Parent id: ' + Pid + '\n' + 'DescType: ' + dType );
    addDesc(Pid, TPid, dType, Dir);
}
function Newmssqlfolder(Pid, TPid, Dir)
{
    dType = "mssql";
    //    alert( 'New DDL Folder and Description' + '\n' + 'Tree Parent id: ' + TPid + '\n' + 'Parent id: ' + Pid + '\n' + 'DescType: ' + dType );
    addDesc(Pid, TPid, dType, Dir);
}

function Newora(Pid, TPid, Dir)
{
    dType = "ora";
    //    alert( 'New DDL Description' + '\n' + 'Tree Parent id: ' + TPid + '\n' + 'Parent id: ' + Pid + '\n' + 'DescType: ' + dType );
    addDesc(Pid, TPid, dType, Dir);
}
function Neworafolder(Pid, TPid, Dir)
{
    dType = "ora";
    //    alert( 'New DDL Folder and Description' + '\n' + 'Tree Parent id: ' + TPid + '\n' + 'Parent id: ' + Pid + '\n' + 'DescType: ' + dType );
    addDesc(Pid, TPid, dType, Dir);
}

function Newsql(Pid, TPid, Dir)
{
    dType = "sql";
    //    alert( 'New DDL Description' + '\n' + 'Tree Parent id: ' + TPid + '\n' + 'Parent id: ' + Pid + '\n' + 'DescType: ' + dType );
    addDesc(Pid, TPid, dType, Dir);
}
function Newsqlfolder(Pid, TPid, Dir)
{
    dType = "sql";
    //    alert( 'New DDL Folder and Description' + '\n' + 'Tree Parent id: ' + TPid + '\n' + 'Parent id: ' + Pid + '\n' + 'DescType: ' + dType );
    addDesc(Pid, TPid, dType, Dir);
}

function Newudb(Pid, TPid, Dir)
{
    dType = "udb";
    //    alert( 'New DDL Description' + '\n' + 'Tree Parent id: ' + TPid + '\n' + 'Parent id: ' + Pid + '\n' + 'DescType: ' + dType );
    addDesc(Pid, TPid, dType, Dir);
}
function Newudbfolder(Pid, TPid, Dir)
{
    dType = "udb";
    //    alert( 'New DDL Folder and Description' + '\n' + 'Tree Parent id: ' + TPid + '\n' + 'Parent id: ' + Pid + '\n' + 'DescType: ' + dType );
    addDesc(Pid, TPid, dType, Dir);
}
// **************************************************************************************************************
// **************************************************************************************************************
function NewBrowseDML(Pid, TPid, Dir)
{
    dmlType = "Browse";
    alert( 'New DML browseDB Description' + '\n' + 'Tree Parent id: ' + TPid + '\n' + 'Parent id: ' + Pid + '\n' + 'dmlType: ' + dmlType );
    addDMLDesc(Pid, TPid, dmlType, Dir);
}
function NewSQLDML(Pid, TPid, Dir)
{
    dmlType = "SQL";
    alert( 'New DML SQL Description' + '\n' + 'Tree Parent id: ' + TPid + '\n' + 'Parent id: ' + Pid + '\n' + 'dmlType: ' + dmlType );
    addDMLDesc(Pid, TPid, dmlType, Dir);
}
function NewFileDML(Pid, TPid, Dir)
{
    dmlType = "File";
    alert( 'New DML File Description' + '\n' + 'Tree Parent id: ' + TPid + '\n' + 'Parent id: ' + Pid + '\n' + 'dmlType: ' + dmlType );
    addDMLDesc(Pid, TPid, dmlType, Dir);
}
function NewDMLfolder(Pid, TPid, DMLtype, Dir)
{
    alert( 'New DML type: ' + DMLtype + ' Description' + '\n' + 'Tree Parent id: ' + TPid + '\n' + 'Parent id: ' + Pid );
    addDMLDesc(Pid, TPid, dmlType, Dir);
}
function NewVar( Pid, TPid )
{
//    alert( 'New Variable' + '\n' + 'Tree Parent id: ' + TPid + '\n' + 'Parent id: ' + Pid );
    AddVar( Pid, TPid );
}
function NewSys( Pid, TPid )
{
//    alert( 'New System' + '\n' + 'Tree Parent id: ' + TPid + '\n' + 'Parent id: ' + Pid );
    AddSys( Pid, TPid );
}
function NewEng( Pid, TPid, eType )
{
//    alert( 'New Engine' + '\n' + 'Tree Parent id: ' + TPid + '\n' + 'Parent id: ' + Pid );
    AddEng( Pid, TPid, eType );
}
function NewSDS( Pid, TPid, eType )
{
//    alert( 'New Source Datastore' + '\n' + 'Tree Parent id: ' + TPid + '\n' + 'Parent id: ' + Pid );
    addSDS( Pid, TPid, eType );
}
function NewTDS(Pid, TPid, eType)
{
//    alert( 'New Target Datastore' + '\n' + 'Tree Parent id: ' + TPid + '\n' + 'Parent id: ' + Pid );
    addTDS(Pid, TPid, eType);
}
function NewMapProc( Pid, TPid )
{
//    alert( 'New Mapping Procedure' + '\n' + 'Tree Parent id: ' + TPid + '\n' + 'Parent id: ' + Pid );
    addMapProc( Pid, TPid );
}
function NewLogicProc( Pid, TPid , LProcType)
{
//    alert( 'New ' + LProcType + ' Logic Procedure' + '\n' + 'Tree Parent id: ' + TPid + '\n' + 'Parent id: ' + Pid );
    addLogicProc( Pid, TPid, LProcType );
}
function NewInclProc( Pid, TPid , IProcType)
{
    alert( 'New ' + IProcType + ' Include Procedure' + '\n' + 'Tree Parent id: ' + TPid + '\n' + 'Parent id: ' + Pid );
}
function doCut(id)
{
    alert( 'Cut Under Construction' + '\n' + 'id: ' + id );
}
function doCopy(id)
{
    alert( 'Copy Under Construction' + '\n' + 'id: ' + id );
}
function doPaste(id)
{
    alert( 'Paste Under Construction' + '\n' + 'id: ' + id );
}
function doDelete(id)
{
    // alert( 'Delete Not Yet Functional' + '\n' + 'id: ' + id );
    delObj( id );
}
function doDeleteAll(id)
{
    // alert( 'Delete All Not Yet Functional' + '\n' + 'id: ' + id );
    delAllObj( id );
}
function doGenerate( id ,tid )
{
//    alert( 'doGenerate ' + '\n' + 'id: ' + id + '\n' + 'tid: ' + tid );
    DOgenerate( id , tid );
}
function doModel( id, tid )
{
    //    alert( 'doGenerate ' + '\n' + 'id: ' + id + '\n' + 'tid: ' + tid );
    DOmodel( id, tid );
}
