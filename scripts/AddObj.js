//
// SQData Add Object Functions and forms
//**********************************************************************************************

// Choose a project to open
//**********************************************************************************************
function ChooseProj( UID, PW )
{
    try
    {
        var formProj = [
	        { type: "settings", position: "label-left", labelWidth: 120, inputWidth: 320 },
	        { type: "fieldset", label: "Choose Project", inputWidth: "auto", list: [
			        { id: "projName", type: "combo", name: "projName", label:"Select Project", required: true, validate: "NotEmpty", connector: "../Studio/php/comboProj.php" }
                    ]
	        },
	        { type: "fieldset", inputWidth: "auto", list: [
			        { name: "DoChoose", type: "button", value: "Open Project" },
                    { type: "newcolumn" },
			        { name: "DoExit", type: "button", value: "Exit" }
		        ]
	        }
        ];

        var cbo;
        var cboTxt;
        var propLayout = Tabbar_user_control.cells( "tabProp" ).attachLayout( "1C" );
        propLayout.cells( "a" ).setText( "Properties" );
        var frmOpenProj = propLayout.cells( "a" ).attachForm( formProj );
    //    var mydp = new dataProcessor( "../Studio/php/loadProj.php" );
        //    mydp.init( frmOpenProj );
//        var dhxCombo = frmOpenProj.getCombo( "projName" );
//        dhxCombo.setImagePath( "../Studio/dhtmlxSuite/dhtmlxCombo/codebase/imgs/" );
//        dhxCombo.setSkin( "dhx_skyblue" );
//        dhxCombo.setDefaultImage( "../Studio/dhtmlxSuite/dhtmlxCombo/codebase/imgs/combo_select_dhx_skyblue.gif" );

        frmOpenProj.attachEvent( "onChange", function ( id, value )
        {
            if ( id == "projName" )
            {
                cbo = frmOpenProj.getCombo( id );
//                cboTxt = value;  //frmOpenProj.getItemValue( id );
                cboTxt = cbo.getComboText();
//                alert( 'ChooseProj Project Name: ' + cboTxt + '\n' + "ChooseProj Project Number: " + frmOpenProj.getItemValue( id ) );
            }
        } );
        frmOpenProj.attachEvent( "onButtonClick", function ( id )
        {
            if ( id == 'DoChoose' )
            {
                if ( frmOpenProj.validate() )
                {
                    CURprojNum = frmOpenProj.getItemValue( 'projName' );
                    CURproj = cboTxt;
    //                alert( 'ChooseProj Project Name: ' + cboTxt + '\n' + "ChooseProj Project Number: " + CURprojNum );
                    loadMainTree( CURprojNum, CURproj );
    //                loadCtlProj( CURprojNum, CURproj );
                }
            }
            else
            {
                frmOpenProj.reset();
                //            frmOpenProj.remove();
            }
        } );
    }
    catch ( err )
    {
        logError( err.message, err.name, "AddObj.js", "function ChooseProj( UID, PW )" );
    }
}

//************************************************************************************************************
// Add Project
function AddProj( TPid , UID, PW )
{
    try
    {
        var NewProjForm;
        var today = new Date();
    
    //    alert( uid );
        var formStruct = [
	        { type: "settings", position: "label-left", labelWidth: 120, inputWidth: 320 },
	        { type: "fieldset", label: "Add Project Properties", inputWidth: "auto", list: [
                    { id: "objid", name: "objid", type: "input", label: "objid", required: "true", readonly: "true", value: "", hidden: "true" },
                    { id: "username", name: "username", type: "input", label: "User", required: "true", readonly: "true", value: CURuid },
                    { id: "projName", name: "projName", type: "input", label: "Project Name",  required: true, value: "" },
			        { id: "projCdate", name: "projCdate", type: "input", label: "Project Creation Date", readonly: "true", value: "" },
			        { id: "projLUdate", name: "projLUdate", type: "input", label: "Project Last Updated", readonly: "true", value: "" },
			        { id: "projDSN", name: "projDSN", type: "input", label: "Metadata DSN", value: "sqdmeta", readonly: "true" },
			        { id: "projCust", name: "projCust", type: "input", label: "Customer Name", value: "" }
		        ]
	        },
	        { type: "fieldset", inputWidth: "auto", list: [
			        { id: "btnProjAdd", name: "btnProjAdd", type: "button", value: "Add" },
			        { type: "newcolumn" },
			        { id: "btnProjClear", name: "btnProjClear", type: "button", value: "Clear" }
		        ]
	        }
        ];

        var propLayout = Tabbar_user_control.cells( "tabProp" ).attachLayout( "1C" );
        propLayout.cells( "a" ).setText( "Properties" );
        var frmNewProj = propLayout.cells( "a" ).attachForm( formStruct );
    //    alert( '<%SESSION["sess_username"]%>' );
        var mydp = new dataProcessor( "../Studio/php/addProj.php" );
        mydp.init( frmNewProj );
        frmNewProj.setItemValue( "projCdate", today );
        frmNewProj.setItemValue( "projLUdate", today );
        frmNewProj.setItemValue( "username", CURuid );

        frmNewProj.attachEvent( "onButtonClick", function ( id )
        {
            if ( id == 'btnProjAdd' )
            {
                frmNewProj.disableItem( "btnProjAdd" );
                frmNewProj.setItemValue( "objid", frmNewProj.getItemValue( 'projName' ) );
                tmpObjName = frmNewProj.getItemValue( 'projName' );
                tmpObjPid = 'fldProj';
                tmpTPid = 'fldProj';

    //            alert( 'objid: ' + frmNewProj.getItemValue( 'objid' ) );
            
                if ( frmNewProj.validate() )
                    frmNewProj.save();
            }
            else if ( id == 'btnProjClear' )
            {
                frmNewProj.reset();
                AddProj( TPid );
            }
        } );

        frmNewProj.attachEvent( "onAfterSave", function ( id, xml )
        {
    //        alert( 'AddProj onAfterSave id = ' + id + '\n' + 'xml = ' + xml );
            // set current project
            CURproj = tmpObjName;
            CURprojNum = id;
            // Add Project Node
            addNode( tmpTPid, tmpObjPid, tmpObjName, 'objProj', 'Project.gif', "loadCtlProj", 'Project.gif', 'Project.gif', 'Project.gif', '', id );
            //       
            // Set Vars for Environment Folder
            tmpObjName = "fldEnv";
            tmpObjPid = CURproj;
            tmpTPid = tmpObjPid;
            // Add Environments Folder
            addNode( tmpTPid, tmpObjPid, 'Environments', 'fldEnv', "folderOpen.gif", "loadCtlFolder", "folderClosed.gif", "folderOpen.gif", "folderClosed.gif", 'folder' );
        } );
    }
    catch ( err )
    {
        logError( err.message, err.name, "AddObj.js", "function AddProj( TPid , UID, PW )" );
    }
}
// ***************************************************************************************************************
// Add Environment
function AddEnv( Pid, TPid )
{
    try
    {
        var formStruct = [
	            { type: "settings", position: "label-left", labelWidth: 120, inputWidth: 320 },
	            { type: "fieldset", label: "Environment Properties", inputWidth: "auto", list: [
                        { id: "id", name: "id", type: "input", label: "id", value: "", readonly: "true", hidden: true },
                        { id: "objid", name: "objid", type: "input", label: "objid", value: "", readonly: "true", hidden: true },
                        { id: "projName", name: "projName", type: "input", label: "Project Name", value: "", readonly: "true", hidden: true },
			            { id: "envName", name: "envName", type: "input", label: "Environment Name", required: true, value: "" },
			            { type: "fieldset", label: "Description", inputWidth: 500, list: [
				            { id: "envDesc", name: "envDesc", type: "input", rows: "3", inputWidth: 460, value: ""}]
			            }]
	            },
	            { type: "fieldset", label: "Local Script/Project Directory", disabled: true, inputWidth: "auto", list: [
			            { id: "scriptDir", name: "scriptDir", type: "input", inputWidth: "320", label: "Script", value: "../User_directory/Proj_1/scripts/" },
			            { type: "newcolumn" },
			            { name: "btnBrowseScriptDir", type: "button", value: "browse" }
		            ]
	            },
	            { type: "fieldset", label: "Local Description Directories", disabled: true, inputWidth: "auto", list: [
			            { id: "cobolDir", name: "cobolDir", type: "input", inputWidth: "320", label: "Cobol", value: "../User_directory/Proj_1/COBOL/" },
			            { id: "DBDDir", name: "DBDDir", type: "input", inputWidth: "320", label: "DBD", value: "../User_directory/Proj_1/DBD/" },
			            { id: "DDLDir", name: "DDLDir", type: "input", inputWidth: "320", label: "DDL", value: "../User_directory/Proj_1/DDL/" },
			            { id: "CDir", name: "CDir", type: "input", inputWidth: "320", label: "C", value: "../User_directory/Proj_1/c/" },
			            { id: "DMLDir", name: "DMLDir", type: "input", inputWidth: "320", label: "DML", value: "../User_directory/Proj_1/DML/" },
			            { id: "DTDDir", name: "DTDDir", type: "input", inputWidth: "320", label: "XML/DTD", value: "../User_directory/Proj_1/DTD/" },
			            { type: "newcolumn" },
			            { name: "btnCobolDir", type: "button", value: "browse" },
			            { name: "btnDBDDir", type: "button", value: "browse" },
			            { name: "btnDDLDir", type: "button", value: "browse" },
			            { name: "btnCDir", type: "button", value: "browse" },
			            { name: "btnDMLDir", type: "button", value: "browse" },
			            { name: "btnDTDDir", type: "button", value: "browse" }
		            ]
	            },
	            { type: "fieldset", inputWidth: "auto", list: [
			            { name: "btnEnvAdd", type: "button", value: "Add" },
			            { type: "newcolumn" },
			            { name: "btnEnvClear", type: "button", value: "Clear" }
		            ]
	            }
            ];

        var propLayout = Tabbar_user_control.cells( "tabProp" ).attachLayout( "1C" );
        propLayout.cells( "a" ).setText( "Properties" );
        var frmNewEnv = propLayout.cells( "a" ).attachForm( formStruct );
        //    alert( '<%SESSION["sess_username"]%>' );
        var mydp = new dataProcessor( "../Studio/php/addEnv.php" );
        mydp.init( frmNewEnv );
    
    //    frmNewEnv.setItemValue( "projLUdate", today );
        frmNewEnv.attachEvent( "onButtonClick", function ( id )
        {
            if ( id == 'btnEnvAdd' )
            {
                frmNewEnv.disableItem( "btnEnvAdd" );
                frmNewEnv.setItemValue( "objid", Pid + "." + frmNewEnv.getItemValue( 'envName' ) );
                frmNewEnv.setItemValue( "projName", getProjName( Pid ) );
                tmpObjName = frmNewEnv.getItemValue( 'envName' );
                tmpObjPid = Pid;
                tmpTPid = TPid;

    //            alert( 'objid: ' + frmNewEnv.getItemValue( 'objid' ) + '\n' + 'tmpObjName: ' + tmpObjName + '\n' + 'tmpObjPid (Pid): ' + tmpObjPid + '\n' + 'tmpTPid (TPid): ' + tmpTPid );

                if ( frmNewEnv.validate() )
                    frmNewEnv.save();
            }
            else if ( id == 'btnProjClear' )
            {
                frmNewEnv.reset();
                AddEnv( Pid, TPid );
            }
        } );
        frmNewEnv.attachEvent( "onAfterSave", function ( id, xml )
        {
            //        alert( 'On after save... what is sent to addNode' + '\n' + 'id = ' + id + '\n' + 'xml value: ' + xml + '\n' + 'tmpTPid (ndTPid): ' + tmpTPid + '\n' + 'tmpObjPid (ndObjPid): ' + tmpObjPid + '\n' + 'tmpObjName (ndName): ' + tmpObjName );

            // Add Environment Node (id is the New id that is auto assigned by MySQL),
            // This added as tabId in the MainTree and maintree table so dhtmlx dataprocessor can be used to make the SQL simple 
            addNode( tmpTPid, tmpObjPid, tmpObjName, 'objEnv', '85.gif', "loadCtlEnv", '85.gif', '85.gif', '85.gif', '', id );

            // Set Vars for Environment Children
            tmpObjPid = tmpObjPid + "." + tmpObjName;
            tmpTPid = tmpObjPid;

            //        alert( 'On after save... what is sent to addNode after environment added' + '\n' + 'id = ' + id + '\n' + 'xml value: ' + xml + '\n' + 'tmpTPid (ndTPid): ' + tmpTPid + '\n' + 'tmpObjPid (ndObjPid): ' + tmpObjPid + '\n' + 'tmpObjName (ndName): ' + tmpObjName );

            // Add Connections Folder
            tmpObjName = "Connections";
            addNode( tmpTPid, tmpObjPid, tmpObjName, 'fldConn', "folderOpen.gif", "loadCtlFolder", "folderClosed.gif", "folderOpen.gif", "folderClosed.gif", 'folder' );
            // Add Descriptions Folder
            tmpObjName = "Source_Descriptions";
            addNode(tmpTPid, tmpObjPid, tmpObjName, 'fldSrcDesc', "folderOpen.gif", "loadCtlFolder", "folderClosed.gif", "folderOpen.gif", "folderClosed.gif", 'folder');
            // Add Description SUB Folders
            // Add Cobol
            var temptmpTPid = tmpTPid + ".fldSrcDesc";
            tmpObjName = "Cobol Copybooks";
            addNode(temptmpTPid, tmpObjPid, tmpObjName, 'fldSrcCOBOL', "folderOpen.gif", "loadCtlFolder", "folderClosed.gif", "folderOpen.gif", "folderClosed.gif", 'folder');
            // Add Cobol/IMS
            tmpObjName = "CobolIMS Copybooks";
            addNode(temptmpTPid, tmpObjPid, tmpObjName, 'fldSrcCOBIMS', "folderOpen.gif", "loadCtlFolder", "folderClosed.gif", "folderOpen.gif", "folderClosed.gif", 'folder');
            // Add XML DTD
            tmpObjName = "XML DTD";
            addNode(temptmpTPid, tmpObjPid, tmpObjName, 'fldSrcDTDDesc', "folderOpen.gif", "loadCtlFolder", "folderClosed.gif", "folderOpen.gif", "folderClosed.gif", 'folder');
            // Add db2 
            tmpObjName = "DB2";
            addNode(temptmpTPid, tmpObjPid, tmpObjName, 'fldSrcdb2Desc', "folderOpen.gif", "loadCtlFolder", "folderClosed.gif", "folderOpen.gif", "folderClosed.gif", 'folder');
            // Add MS Sql
            tmpObjName = "MSSQL";
            addNode(temptmpTPid, tmpObjPid, tmpObjName, 'fldSrcmssqlDesc', "folderOpen.gif", "loadCtlFolder", "folderClosed.gif", "folderOpen.gif", "folderClosed.gif", 'folder');
            // Add Oracle
            tmpObjName = "Oracle";
            addNode(temptmpTPid, tmpObjPid, tmpObjName, 'fldSrcoraDesc', "folderOpen.gif", "loadCtlFolder", "folderClosed.gif", "folderOpen.gif", "folderClosed.gif", 'folder');
//            // Add sql
//            tmpObjName = "SQL";
//            addNode( temptmpTPid, tmpObjPid, tmpObjName, 'fldsqlDesc', "folderOpen.gif", "loadCtlFolder", "folderClosed.gif", "folderOpen.gif", "folderClosed.gif", 'folder' );
            // Add udb
            tmpObjName = "ISO SQL";
            addNode(temptmpTPid, tmpObjPid, tmpObjName, 'fldSrcudbDesc', "folderOpen.gif", "loadCtlFolder", "folderClosed.gif", "folderOpen.gif", "folderClosed.gif", 'folder');
//            // Add Relational DML
//            tmpObjName = "Relational DML";
            //            addNode( temptmpTPid, tmpObjPid, tmpObjName, 'fldDMLDesc', "folderOpen.gif", "loadCtlFolder", "folderClosed.gif", "folderOpen.gif", "folderClosed.gif", 'folder' );
//            MainTree.closeItem(temptmpTPid);

            // Add Descriptions Folder
            tmpObjName = "Target_Descriptions";
            addNode(tmpTPid, tmpObjPid, tmpObjName, 'fldTgtDesc', "folderOpen.gif", "loadCtlFolder", "folderClosed.gif", "folderOpen.gif", "folderClosed.gif", 'folder');
            // Add Description SUB Folders
            temptmpTPid = tmpTPid + ".fldTgtDesc";
            // Add Cobol
//            var temptmpTPid = tmpTPid + ".fldDesc";
            tmpObjName = "Cobol Copybooks";
            addNode(temptmpTPid, tmpObjPid, tmpObjName, 'fldTgtCOBOL', "folderOpen.gif", "loadCtlFolder", "folderClosed.gif", "folderOpen.gif", "folderClosed.gif", 'folder');
            // Add Cobol/IMS
            tmpObjName = "CobolIMS Copybooks";
            addNode(temptmpTPid, tmpObjPid, tmpObjName, 'fldTgtCOBIMS', "folderOpen.gif", "loadCtlFolder", "folderClosed.gif", "folderOpen.gif", "folderClosed.gif", 'folder');
            // Add XML DTD
            tmpObjName = "XML DTD";
            addNode(temptmpTPid, tmpObjPid, tmpObjName, 'fldTgtDTDDesc', "folderOpen.gif", "loadCtlFolder", "folderClosed.gif", "folderOpen.gif", "folderClosed.gif", 'folder');
            // Add db2 
            tmpObjName = "DB2";
            addNode(temptmpTPid, tmpObjPid, tmpObjName, 'fldTgtdb2Desc', "folderOpen.gif", "loadCtlFolder", "folderClosed.gif", "folderOpen.gif", "folderClosed.gif", 'folder');
            // Add MS Sql
            tmpObjName = "MSSQL";
            addNode(temptmpTPid, tmpObjPid, tmpObjName, 'fldTgtmssqlDesc', "folderOpen.gif", "loadCtlFolder", "folderClosed.gif", "folderOpen.gif", "folderClosed.gif", 'folder');
            // Add Oracle
            tmpObjName = "Oracle";
            addNode(temptmpTPid, tmpObjPid, tmpObjName, 'fldTgtoraDesc', "folderOpen.gif", "loadCtlFolder", "folderClosed.gif", "folderOpen.gif", "folderClosed.gif", 'folder');
            //            // Add sql
            //            tmpObjName = "SQL";
            //            addNode( temptmpTPid, tmpObjPid, tmpObjName, 'fldsqlDesc', "folderOpen.gif", "loadCtlFolder", "folderClosed.gif", "folderOpen.gif", "folderClosed.gif", 'folder' );
            // Add udb
            tmpObjName = "ISO SQL";
            addNode(temptmpTPid, tmpObjPid, tmpObjName, 'fldTgtudbDesc', "folderOpen.gif", "loadCtlFolder", "folderClosed.gif", "folderOpen.gif", "folderClosed.gif", 'folder');
            // Add VarTop Folder
    //        tmpObjName = "Variables";
    //        addNode( tmpTPid, tmpObjPid, tmpObjName, 'fldVarTop', "folderOpen.gif", "loadCtlFolder", "folderClosed.gif", "folderOpen.gif", "folderClosed.gif", 'folder' );
            // Add systems folder
            tmpObjName = "Systems";
            addNode(tmpTPid, tmpObjPid, tmpObjName, 'fldSys', "folderOpen.gif", "loadCtlFolder", "folderClosed.gif", "folderOpen.gif", "folderClosed.gif", 'folder');

            MainTree.closeItem(temptmpTPid);
        } );
    }
    catch ( err )
    {
        logError( err.message, err.name, "AddObj.js", "function AddEnv( Pid, TPid )" );
    }
}
// ***************************************************************************************************************
// Add Connection
function AddConn( Pid, TPid )
{
    try
    {
        var structConn = [
	        {type: "settings", position: "label-left", labelWidth: 120, inputWidth: 320},
	        { type: "fieldset", label: "Connection Properties", inputWidth: "auto", list: [
                    { name: "projName", type: "input", label: "Project Name", value: "", readonly: "true", hidden: true },
                    { name: "envName", type: "input", label: "Environment Name", value: "", readonly: "true", hidden: true },
                    { name: "objid", type: "input", label: "objid", value: "", readonly: "true", hidden: true },
			        { name: "connName", type: "input", label: "Connection Name", required: true, value: "" },
			        {name:"connType", type: "select", inputWidth: "320", label: "Connection Type", options:[
					        {text: "ODBC", value: "ODBC"},
					        {text: "ODBC with substitution Variable", value: "ODBCsub"},
					        {text: "DB2", value: "DB2"},
					        {text: "OCI", value: "OCI"},
					        {text: "NATIVEORA", value: "NATIVEORA"}
				        ]},
			        {type: "fieldset", label: "Description", inputWidth: 440, list:[
				        {name:"connDesc",type: "input",rows: "3", inputWidth: 400, value: ""}
			        ]}
		        ]},
	        {type: "fieldset", label: "Connection Database Properties", inputWidth: "auto", list:[
			        {name:"connDatabase", type: "input", inputWidth: "320", label: "Database", value: ""},
			        {name:"connDateFormat", type: "input", inputWidth: "320", label: "Date Format", value: ""}
		        ]},
	        {type: "fieldset", label: "Connection Database User Properties", inputWidth: "auto", list:[
			        {name:"connUID", type: "input", inputWidth: "320", label: "Username", value: ""},
			        {name:"connPW", type: "password", inputWidth: "320", label: "Password", value: ""}
		        ]},
	        {type: "fieldset",  inputWidth: "auto", list:[
			        {name:"btnConnAdd",type: "button", value: "Add"},
			        {type: "newcolumn"},
			        {name:"btnConnClear",type: "button", value: "Clear"}
		        ]}
        ];

    var propLayout = Tabbar_user_control.cells( "tabProp" ).attachLayout( "1C" );
        propLayout.cells( "a" ).setText( "Properties" );
        var frmNewConn = propLayout.cells( "a" ).attachForm( structConn );
        var mydp = new dataProcessor( "../Studio/php/addConn.php" );
        mydp.init( frmNewConn );
    
        frmNewConn.attachEvent( "onButtonClick", function ( id )
        {
            if ( id == 'btnConnAdd' )
            {
                frmNewConn.disableItem( "btnConnAdd" );
                frmNewConn.setItemValue( "objid", Pid + "." + frmNewConn.getItemValue( 'connName' ) );
                frmNewConn.setItemValue( "projName", getProjName( Pid ) );
                frmNewConn.setItemValue( "envName", getEnvName( Pid ) );
                tmpObjName = frmNewConn.getItemValue( 'connName' );
                tmpObjPid = Pid;
                tmpTPid = TPid;

    //            alert( 'objid: ' + frmNewConn.getItemValue( 'objid' ) + '\n' + 'tmpObjName: ' + tmpObjName + '\n' + 'tmpObjPid (Pid): ' + tmpObjPid + '\n' + 'tmpTPid (TPid): ' + tmpTPid );

                if ( frmNewConn.validate() )
                    frmNewConn.save();
            }
            else if ( id == 'btnConnClear' )
            {
                frmNewConn.reset();
                AddConn( Pid, TPid );
            }
        } );
        frmNewConn.attachEvent( "onAfterSave", function ( id, xml )
        {
    //                alert( 'On after save... what is sent to addNode' + '\n' + 'id = ' + id + '\n' + 'xml value: ' + xml + '\n' + 'tmpTPid (ndTPid): ' + tmpTPid + '\n' + 'tmpObjPid (ndObjPid): ' + tmpObjPid + '\n' + 'tmpObjName (ndName): ' + tmpObjName );

            // Add Connection Node (id is the New id that is auto assigned by MySQL),
            // This added as tabId in the MainTree and maintree table so dhtmlx dataprocessor can be used to make the SQL simple 
            addNode( tmpTPid, tmpObjPid, tmpObjName, 'objConn', '15.gif', "loadCtlConn", '15.gif', '15.gif', '15.gif', '', id );
        } );
    }
    catch ( err )
    {
        logError( err.message, err.name, "AddObj.js", "function AddConn( Pid, TPid )" );
    }
}
// ****************************************************************************************************************
function AddVar( Pid, TPid )
{
    try
    {
        var varStruct = [
	        { type: "settings", position: "label-left", labelWidth: 120, inputWidth: 320 },
	        { type: "fieldset", label: "Variable Properties", inputWidth: "auto", list: [
                    { name: "objid", type: "input", label: "objid", value: "", readonly: "true", hidden: true },
                    { name: "projName", type: "input", label: "Project", value: "", readonly: "true", hidden: true },
                    { name: "envName", type: "input", label: "Environment", value: "", readonly: "true", hidden: true },
                    { name: "sysName", type: "input", label: "System", value: "", readonly: "true", hidden: true },
                    { name: "engName", type: "input", label: "Engine", value: "", readonly: "true", hidden: true },
			        { name: "varName", type: "input", label: "Name", value: "", required: true },
			        { name: "varSize", type: "input", label: "Size", value: "" },
			        { name: "varInitVal", type: "input", label: "Initial Value", value: "" },
			        { name: "gbVarDesc", type: "fieldset", label: "Description", inputWidth: 500, list: [
				        { name: "varDesc", type: "input", rows: "3", inputWidth: 460, value: "" }
			        ]
			        }
		        ]
	        },
	        { type: "fieldset", inputWidth: "auto", list: [
			        { name: "btnVarAdd", type: "button", value: "Add" },
			        { type: "newcolumn" },
			        { name: "btnVarClear", type: "button", value: "Clear" }
		        ]
	        }
        ];

        var propLayout = Tabbar_user_control.cells( "tabProp" ).attachLayout( "1C" );
        propLayout.cells( "a" ).setText( "Properties" );
        var frmNewVar = propLayout.cells( "a" ).attachForm( varStruct );
        var mydp = new dataProcessor( "../Studio/php/addVar.php" );
        mydp.init( frmNewVar );

        frmNewVar.attachEvent( "onButtonClick", function ( id )
        {
            if ( id == 'btnVarAdd' )
            {
                frmNewVar.disableItem( "btnVarAdd" );
                frmNewVar.setItemValue( "objid", Pid + "." + frmNewVar.getItemValue( 'varName' ) );
                frmNewVar.setItemValue( "projName", getProjName( Pid ) );
                frmNewVar.setItemValue( "envName", getEnvName( Pid ) );
                frmNewVar.setItemValue( "sysName", getSysName( Pid ) );
                frmNewVar.setItemValue( "engName", getEngName( Pid ) );
                tmpObjName = frmNewVar.getItemValue( 'varName' );
                tmpObjPid = Pid;
                tmpTPid = TPid;

                //            alert( 'objid: ' + frmNewConn.getItemValue( 'objid' ) + '\n' + 'tmpObjName: ' + tmpObjName + '\n' + 'tmpObjPid (Pid): ' + tmpObjPid + '\n' + 'tmpTPid (TPid): ' + tmpTPid );

                if ( frmNewVar.validate() )
                    frmNewVar.save();
            }
            else if ( id == 'btnConnClear' )
            {
                frmNewVar.reset();
                AddVar( Pid, TPid );
            }
        } );
        frmNewVar.attachEvent( "onAfterSave", function ( id, xml )
        {
    //                       alert( 'On after save... what is sent to addNode' + '\n' + 'id = ' + id + '\n' + 'xml value: ' + xml + '\n' + 'tmpTPid (ndTPid): ' + tmpTPid + '\n' + 'tmpObjPid (ndObjPid): ' + tmpObjPid + '\n' + 'tmpObjName (ndName): ' + tmpObjName );

            // Add Variable Node (id is the New id that is auto assigned by MySQL),
            // This added as tabId in the MainTree and maintree table so dhtmlx dataprocessor can be used to make the SQL simple 
            addNode( tmpTPid, tmpObjPid, tmpObjName, 'objVar', 'var.gif', "loadCtlVar", 'var.gif', 'var.gif', 'var.gif', '', id );
        } );
    }
    catch ( err )
    {
        logError( err.message, err.name, "AddObj.js", "function AddVar( Pid, TPid )" );
    }
}
// ****************************************************************************************************************
function AddSys( Pid, TPid )
{
    try
    {
        var structSys = [
	        { type: "settings", position: "label-left", labelWidth: 120, inputWidth: 320 },
	        { type: "fieldset", label: "System Properties", inputWidth: "auto", list: [
                    { name: "objid", type: "input", label: "objid", value: "", readonly: "true", hidden: true },
                    { name: "projName", type: "input", label: "Project", value: "", readonly: "true", hidden: true },
                    { name: "envName", type: "input", label: "Environment", value: "", readonly: "true", hidden: true },
			        { name: "sysName", type: "input", label: "System Name", required: true, value: "" },
			        { name: "sysType", type: "select", inputWidth: 320, label: "System Type", options: [
					        { text: "z/OS", value: "z/OS" },
					        { text: "Unix", value: "Unix" },
					        { text: "Windows", value: "Windows" }
			        ] },
			        { type: "fieldset", label: "Description", inputWidth: 500, list: [
				        { name: "sysDesc", type: "input", rows: "3", inputWidth: 460, value: "" }
			        ] }
		        ]
	        },
	        { type: "fieldset", label: "System Connection Properties", inputWidth: "auto", list: [
			        { name: "sysHostName", type: "input", inputWidth: 320, label: "Host Name", value: "" },
			        { name: "sysPort", type: "input", inputWidth: 320, label: "Port", value: "" },
			        { name: "sysQmgr", type: "input", inputWidth: 320, label: "Queue Manager", value: "" }
		        ]
	        },
	        { type: "fieldset", label: "Local System Library Paths", inputWidth: "auto", list: [
			        { name: "sysDBDLib", type: "input", inputWidth: 320, label: "DBD" },
			        { name: "sysCopybookLib", type: "input", inputWidth: 320, label: "Copybook" },
			        { name: "sysDTDLib", type: "input", inputWidth: 320, label: "XML/DTD" },
			        { name: "sysDDLLib", type: "input", inputWidth: 320, label: "DDL" },
			        { name: "sysInclude", type: "input", inputWidth: 320, label: "Include" }
		        ]
	        },
	        { type: "fieldset", inputWidth: "auto", list: [
			        { name: "btnSysAdd", type: "button", value: "Add" },
			        { type: "newcolumn" },
			        { name: "btnSysClear", type: "button", value: "Clear" }
		        ]
	        }
        ];

        var propLayout = Tabbar_user_control.cells( "tabProp" ).attachLayout( "1C" );
        propLayout.cells( "a" ).setText( "Properties" );
        //            propLayout.cells( "a" ).setHeight( 300 );
        //            propLayout.cells( "b" ).setText( "Details" );
        var frmNewSys = propLayout.cells( "a" ).attachForm( structSys );
   
        var mydp = new dataProcessor( "../Studio/php/addSys.php" );
        mydp.init( frmNewSys );

        frmNewSys.attachEvent( "onButtonClick", function ( id )
        {
            if ( id == 'btnSysAdd' )
            {
                frmNewSys.disableItem( "btnSysAdd" );
                frmNewSys.setItemValue( "objid", Pid + "." + frmNewSys.getItemValue( 'sysName' ) );
                frmNewSys.setItemValue( "projName", getProjName( Pid ) );
                frmNewSys.setItemValue( "envName", getEnvName( Pid ) );
                tmpObjName = frmNewSys.getItemValue( 'sysName' );
                tmpObjPid = Pid;
                tmpTPid = TPid;

                //            alert( 'objid: ' + frmNewConn.getItemValue( 'objid' ) + '\n' + 'tmpObjName: ' + tmpObjName + '\n' + 'tmpObjPid (Pid): ' + tmpObjPid + '\n' + 'tmpTPid (TPid): ' + tmpTPid );

                if ( frmNewSys.validate() )
                    frmNewSys.save();
            }
            else if ( id == 'btnSysClear' )
            {
                frmNewSys.reset();
                AddSys( Pid, TPid );
            }
        } );
        frmNewSys.attachEvent( "onAfterSave", function ( id, xml )
        {

    //        alert( 'On after save... what is sent to addNode' + '\n' + 'id = ' + id + '\n' + 'xml value: ' + xml + '\n' + 'tmpTPid (ndTPid): ' + tmpTPid + '\n' + 'tmpObjPid (ndObjPid): ' + tmpObjPid + '\n' + 'tmpObjName (ndName): ' + tmpObjName );

            // Add System Node (id is the New id that is auto assigned by MySQL),
            // This added as tabId in the MainTree and maintree table so dhtmlx dataprocessor can be used to make the SQL simple 
            addNode( tmpTPid, tmpObjPid, tmpObjName, 'objSys', '1.gif', "loadCtlSys", '1.gif', '1.gif', '1.gif', '', id );

            // Set Vars for Engines Folder
            tmpObjPid = tmpObjPid + "." + tmpObjName;
            tmpTPid = tmpObjPid;
            tmpObjName = "Engines";
            // Add Engines Folder
            addNode( tmpTPid, tmpObjPid, tmpObjName, 'fldEng', 'folderOpen.gif', "loadCtlFolder", 'folderClosed.gif', 'folderOpen.gif', 'folderClosed.gif', 'folder' );
        } );
    }
    catch ( err )
    {
        logError( err.message, err.name, "AddObj.js", "function AddSys( Pid, TPid )" );
    }
}
// ****************************************************************************************************************
function AddEng( Pid, TPid, eType )
{
    try
    {
        var structEng = [
	        { type: "settings", position: "label-left", labelWidth: 120, inputWidth: 320 },
	        { type: "fieldset", label: "Engine Properties", inputWidth: "auto", list: [
                    { name: "objid", type: "input", label: "objid", value: "", readonly: "true", hidden: true },
                    { name: "projName", type: "input", label: "Project Name", value: "", readonly: "true", hidden: true },
                    { name: "envName", type: "input", label: "Environment Name", value: "", readonly: "true", hidden: true },
                    { name: "sysName", type: "input", label: "System Name", value: "", readonly: "true", hidden: true },
			        { name: "engName", type: "input", label: "Engine Name", value: "", required: true },
                    { name: "engType", type: "input", label: "Engine Type", value: "", required: true },
			        { name: "engConn", type: "combo", inputWidth: 220, label: "Connection", connector: "../Studio/php/comboConn.php" },
                    { name: "engCDCOP", type: "input", label: "CDCOP", value: "" },
                    { name: "engOS", type: "input", label: "Operating System", value: "" },
			        { name: "engRptFile", type: "input", label: "Report File", value: "" },
			        { name: "engRptEvery", type: "input", label: "Report Every", value: "" },
			        { name: "engDateFormat", type: "select", inputWidth: 220, label: "Date Format", options: [
					        { text: "", value: "" },
					        { text: "ISO", value: "ISO" },
					        { text: "YYYYMMDD", value: "YYYYMMDD" }
			        ]
			        },
			        { name: "engCommitEvery", type: "input", label: "Commit Every", value: "" },
			        { name: "engForceCommit", type: "checkbox", label: "Force Commit", checked: false },
			        { type: "fieldset", label: "Description", inputWidth: 300, list: [
				        { name: "engDesc", type: "input", rows: "3", inputWidth: 260, value: "" }
			        ]}
                ]
	        },
	        { type: "fieldset", label: "Target System Library Paths", inputWidth: "auto", list: [
			        { name: "engDBDLib", type: "input", inputWidth: 320, label: "DBD" },
			        { name: "engCopybookLib", type: "input", inputWidth: 320, label: "Copybook" },
			        { name: "engDTDLib", type: "input", inputWidth: 320, label: "XML/DTD" },
			        { name: "engDDLLib", type: "input", inputWidth: 320, label: "DDL" },
			        { name: "engInclude", type: "input", inputWidth: 320, label: "Include" }
		        ]
	        },
	        { type: "fieldset", inputWidth: "auto", list: [
			        { name: "btnEngAdd", type: "button", value: "Add" },
			        { type: "newcolumn" },
			        { name: "btnEngClear", type: "button", value: "Clear" }
		        ]
	        }
        ];

        var propLayout = Tabbar_user_control.cells( "tabProp" ).attachLayout( "1C" );
        propLayout.cells( "a" ).setText( "Properties" );
        //            propLayout.cells( "a" ).setHeight( 300 );
        //            propLayout.cells( "b" ).setText( "Details" );
        var frmNewEng = propLayout.cells( "a" ).attachForm( structEng );
        frmNewEng.setSkin("dhx_skyblue");
        frmNewEng.setItemValue("engType", eType);

        var mydp = new dataProcessor( "../Studio/php/addEng.php" );
        mydp.init( frmNewEng );

//        var c = frmNewEng.getCombo( "engConn" );
//        c.setSkin( "dhx_skyblue" );

        frmNewEng.attachEvent( "onButtonClick", function ( id )
        {
            if ( id == 'btnEngAdd' )
            {
                frmNewEng.disableItem( "btnEngAdd" );
                frmNewEng.setItemValue( "objid", Pid + "." + frmNewEng.getItemValue( 'engName' ) );
                frmNewEng.setItemValue( "projName", getProjName( Pid ) );
                frmNewEng.setItemValue( "envName", getEnvName( Pid ) );
                frmNewEng.setItemValue( "sysName", getSysName( Pid ) );
                tmpObjName = frmNewEng.getItemValue( 'engName' );
                tmpObjPid = Pid;
                tmpTPid = TPid;

                //            alert( 'objid: ' + frmNewConn.getItemValue( 'objid' ) + '\n' + 'tmpObjName: ' + tmpObjName + '\n' + 'tmpObjPid (Pid): ' + tmpObjPid + '\n' + 'tmpTPid (TPid): ' + tmpTPid );

                if ( frmNewEng.validate() )
                    frmNewEng.save();
            }
            else if ( id == 'btnEngClear' )
            {
                frmNewEng.reset();
                AddEng( Pid, TPid );
            }
        } );

        frmNewEng.attachEvent("onAfterSave", function (id, xml)
        {

            //        alert( 'On after save... what is sent to addNode' + '\n' + 'id = ' + id + '\n' + 'xml value: ' + xml + '\n' + 'tmpTPid (ndTPid): ' + tmpTPid + '\n' + 'tmpObjPid (ndObjPid): ' + tmpObjPid + '\n' + 'tmpObjName (ndName): ' + tmpObjName );
            var im = "";
            if (eType == "ETL")
            {
                im = 'gear.gif';
            }
            else
            {
                im = 'gear_CDC1.gif';
            };
            // Add Engine Node (id is the New id that is auto assigned by MySQL),

            // This added as tabId in the MainTree and maintree table so dhtmlx dataprocessor can be used to make the SQL simple 
            addNode(tmpTPid, tmpObjPid, tmpObjName, 'objEng'+ eType, im, "loadCtlEng", im, im, im, '', id, true);

            // Set Vars for Sources Folder
            tmpObjPid = tmpObjPid + "." + tmpObjName;
            tmpTPid = tmpObjPid;
            nextfld = 0;
        });
    }
    catch ( err )
    {
        logError( err.message, err.name, "AddObj.js", "function AddEng( Pid, TPid )" );
    }
}
// Add Nodes under Engines
function addNextNode()
{
    try
    {
        var repete = true;
        var fldname = "";
        switch ( nextfld )
        {
            case 0:   // Add Sources Folder
                tmpObjName = "Sources";
                fldname = 'fldSDS';
                break;
            case 1:   // Add Targets Folder
                tmpObjName = "Targets";
                fldname = 'fldTDS';
                break;
            case 2:   // Add Variables Folder    
                tmpObjName = "Variables";
                fldname = 'fldVar';
                break;
            case 3:   // Add Procedures Folder
                tmpObjName = "Procedures";
                fldname = 'fldProc';
                break;
            case 4:   // Add Main Folder
                tmpObjName = "Main";
                fldname = 'fldMain';
                repete = false;
                nextfld = 0;
                break;
        };
        nextfld += 1;
        addNode( tmpTPid, tmpObjPid, tmpObjName, fldname, 'folderOpen.gif', "loadCtlFolder", 'folderClosed.gif', 'folderOpen.gif', 'folderClosed.gif', 'folder', '', repete );
    }
    catch ( err )
    {
        logError( err.message, err.name, "AddObj.js", "function addNextNode()" );
    }
}
// ****************************************************************************************************************
function addSDS( Pid, TPid, eType )
{
    try
    {
        var fldrId = getProjName( Pid ) + "." + getEnvName( Pid ) + ".fldSrcDesc";
        var checklist;
        var $checklist = new Array;
        var $checkedList = new Array;
        var iconPath = "../Studio/data/SQDimgs/";
        var image;
        var img;

        var structobjEngCDC = [
        {
            id: "DB2LUW",
            image: iconPath + "DB2LUW_w_text.gif",
//            text: "",
            name: "DB2LUW",
            imgFile:"DB2LUW_w_text.gif"
        },
        {
            id: "DB2ZOS",
            image: iconPath + "DB2ZOS_w_text.gif",
//            text: "",
            name: "DB2ZOS",
            imgFile: "DB2ZOS_w_text.gif"
        },
        {
            id: "IMSCDC",
            image: iconPath + "IMS_w_text.gif",
//            text: "",
            name: "IMSCDC",
            imgFile: "IMS_w_text.gif"
        },
        {
            id: "ORACDC",
            image: iconPath + "ORACLE_w_text.gif",
//            text: "",
            name: "ORACDC",
            imgFile: "ORACLE_w_text.gif"
        },
        {
            id: "SQLSVRCDC",
            image: iconPath + "SQLSERVER_w_text.gif",
//            text: "",
            name: "SQLSVRCDC",
            imgFile: "SQLSERVER_w_text.gif"
        },
        {
            id: "VSAMCDC",
            image: iconPath + "VSAM_w_text.gif",
//            text: "",
            name: "VSAMCDC",
            imgFile: "VSAM_w_text.gif"
        }
        ];

        var structobjEngETL = [
        {
            id: "Cassandra",
            image: iconPath + "Cassandraicon.gif",
//            text: "",
            name: "Cassandra",
            imgFile: "Cassandraicon.gif"
        },
        {
            id: "File",
            image: iconPath + "fileicon.gif",
//            text: "",
            name: "File",
            imgFile: "fileicon.gif"
        },
        {
            id: "Hadoop",
            image: iconPath + "hadoopicon.gif",
//            text: "",
            name: "Hadoop",
            imgFile: "hadoopicon.gif"
        },
        {
            id: "JMS",
            image: iconPath + "JMSicon.gif",
//            text: "",
            name: "JMS",
            imgFile: "JMSicon.gif"
        },
        {
            id: "MQ",
            image: iconPath + "MQicon.gif",
//            text: "",
            name: "MQ",
            imgFile: "MQicon.gif"
        },
        {
            id: "MySQL",
            image: iconPath + "MySQLicon.gif",
//            text: "",
            name: "MySQL",
            imgFile: "MySQLicon.gif"
        },
        {
            id: "ODBC",
            image: iconPath + "ODBCRelationalicon.gif",
//            text: "",
            name: "ODBC",
            imgFile: "ODBCRelationalicon.gif"
        },
        {
            id: "ORACLE",
            image: iconPath + "ORACLE_w_text.gif",
//            text: "",
            name: "ORACLE",
            imgFile: "ORACLE_w_text.gif"
        },
        {
            id: "PostgreSQL",
            image: iconPath + "PostgreSQLicon.gif",
//            text: "",
            name: "PostgreSQL",
            imgFile: "PostgreSQLicon.gif"
        },
        {
            id: "SQLSERVER",
            image: iconPath + "SQLSERVER_w_text.gif",
//            text: "",
            name: "SQLSERVER",
            imgFile: "SQLSERVER_w_text.gif"
        },
        {
            id: "NETEZZA",
            image: iconPath + "NetezzaIcon.gif",
//            text: "",
            name: "NETEZZA",
            imgFile: "NetezzaIcon.gif"
        }
        ];

        var structSDS = [
	        { type: "settings", position: "label-left", labelAlign: "left", labelWidth: "90", inputWidth: "280", offsetLeft: "0" },
	        { type: "fieldset", label: "Source Datastore Properties", inputWidth: "auto", list: [
                { name: "objid", type: "input", label: "objid", value: "", readonly: "true", required: true, hidden: true },
                { name: "projName", type: "input", label: "Project Name", value: "", readonly: "true", hidden: true },
                { name: "envName", type: "input", label: "Environment Name", value: "", readonly: "true", hidden: true },
                { name: "sysName", type: "input", label: "System Name", value: "", readonly: "true", hidden: true },
			    { name: "engName", type: "input", label: "Engine Name", value: "", readonly: "true", hidden: true },
                { name: "engType", type: "input", label: "Engine Type", value: "", readonly: "true", hidden: false },
                { name: "DSimage", type: "input", label: "Image File", value: "", readonly: "true", hidden: true },
			    { name: "DSname", type: "input", label: "Alias (name)", value: "", required: true },
                { name: "DSdir", type: "input", label: "DS Direction", value: "S", readonly: "true", hidden: true },
			    { name: "DSformat", type: "combo", inputWidth: "180", required: true,  label: "Format", options: [
					{ text: "Binary", value: "Binary" },
					{ text: "Delimited", value: "Delimited" },
					{ text: "XML", value: "XML" },
					{ text: "Relational", value: "Relational" },
                    { text: "UTSCDC", value: "UTSCDC" },
                    { text: "DB2 LUW", value: "DB2LUW" },
                    { text: "DB2 ZOS", value: "DB2ZOS" },
                    { text: "IMS CDC", value: "IMSCDC" },
                    { text: "VSAM CDC", value: "VSAMCDC" },
                    { text: "Oracle CDC", value: "ORACDC" },
                    { text: "SQL Svr CDC", value: "SQLSVRCDC" },
					{ text: "IMSDB", value: "IMSDB" },
                    { text: "Cassandra", value: "Cassandra" },
                    { text: "File", value: "UTSCDC" },
                    { text: "Hadoop", value: "DB2LUW" },
                    { text: "JMS", value: "DB2ZOS" },
                    { text: "MQS", value: "IMSCDC" },
                    { text: "MySQL", value: "VSAMCDC" },
                    { text: "ODBC", value: "ODBC" },
                    { text: "Postgre", value: "PostgreSQL" },
					{ text: "SQL Svr", value: "SQLSERVER" },
					{ text: "Netezza", value: "Netezza" }
			    ]
			    },
			    { name: "DStype", type: "combo", inputWidth: "180", required: true, readonly: "true", label: "Type", options: [
					{ text: "CDC Store", value: "CDCStore" },
					{ text: "File", value: "File" },
					{ text: "MQ Series", value: "MQS" },
                    { text: "JMS", value: "JMS" },
					{ text: "TCP/IP", value: "TCP" },
                    { text: "Relational Table", value: "Table" },
                    { text: "IMS", value: "IMS" },
                    { text: "VSAM", value: "VSAM" }
			    ]
			    },
			    { name: "DSPhysName", type: "input", label: "Physical Name", required: false, value: ""},
			    { name: "DSHostName", type: "input", label: "Host Name", value: "", hidden: false },
			    { name: "DSPort", type: "input", label: "Port", value: "", hidden: false },
                { name: "DSException", type: "input", label: "Exception", value: "" },
                ]
	        },
			{ type: "fieldset", name: "boxExtend", label: "Extended Properties", inputWidth: "auto", offsetLeft: "0", hidden: false, list: [
                { name: "DSUOW", type: "input", inputWidth: "90", labelWidth: "50", label: "UOW", hidden: false },
                { name: "DSchkBImg", type: "checkbox", position: "label-right", labelAlign: "left", labelWidth: "140", label: "Check Full Before Image", checked: false, hidden: false },
                { name: "DSaccept", type: "checkbox", position: "label-right", labelAlign: "left", labelWidth: "140", label: "Accept", checked: false, hidden: false },
                { name: "DSreconn", type: "checkbox", position: "label-right", labelAlign: "left", labelWidth: "140", label: "Reconnect", checked: false, hidden: false },
			    { type: "newcolumn" },
			    { name: "DSIMSPathData", type: "checkbox", position: "label-left", labelAlign: "right", labelWidth: "100", label: "IMS PathData", checked: false, hidden: false },
			    { name: "DSSkipChangeCheck", type: "checkbox", position: "label-left", labelAlign: "right", labelWidth: "100", label: "Skip Change Check", checked: false, hidden: false },
                { name: "RRS", type: "checkbox", position: "label-left", labelAlign: "right", labelWidth: "100", label: "RRS", checked: false, hidden: false }
		    ]
			},
            { type: "fieldset", name: "boxComp", label: "Compensate", inputWidth: "auto", offsetLeft: "0", hidden: false, list: [
                    { name: "DScomp", type: "checkbox", position: "label-left", labelAlign: "right", labelWidth: "60", label: "Compensate", checked: false },
                    { type: "newcolumn" },
                    { name: "DScompWarn", type: "checkbox", position: "label-left", labelAlign: "right", labelWidth: "100", label: "Comp w/ Warning", checked: false },
			        { type: "newcolumn" },
                    { name: "DSnoComp", type: "checkbox", position: "label-left", labelAlign: "right", labelWidth: "60", label: "No Comp", checked: false }
		    ]
            },
            { type: "fieldset", name: "boxWTO", label: "WTO", inputWidth: "auto", offsetLeft: "0", hidden: false, list: [
                    { name: "DSwtoComp", type: "select", width: "60", labelWidth: "130", label: "WTO on Compensation", position: "label-left", options: [
                        { text: "", value: "" },
                        { text: "ONCE", value: "ONCE" },
					    { text: "EVERY", value: "EVERY" }
                    ]
                    },
                    { name: "DSwtoExp", type: "select", width: "60", labelWidth: "130", label: "WTO on Exception", position: "label-left", options: [
                        { text: "", value: "" },
                        { text: "ONCE", value: "ONCE" },
					    { text: "EVERY", value: "EVERY" }
                    ]
                    },
			        { type: "newcolumn" },
			        { name: "DScompNum", type: "input", inputWidth: "40", position: "label-right", labelWidth: "50", label: "minutes" },
			        { name: "DSexpNum", type: "input", inputWidth: "40", position: "label-right", labelWidth: "50", label: "minutes" }
		    ]
            },
            { type: "fieldset", name: "boxNetezza", label: "Netezza Properties", inputWidth: "auto", offsetLeft: "0", hidden: false, list: [
                    { name: "DSstageDir", type: "input", width: "180", labelWidth: "90", position: "label-left", label: "Staging Dir:" },
                    { name: "DSconns", type: "input", width: "40", labelWidth: "90", position: "label-left", label: "Connections" },
			        { name: "DSstageRec", type: "input", inputWidth: "40", position: "label-left", labelWidth: "90", label: "Staging Records" },
			        { name: "DSstageDelay", type: "input", inputWidth: "40", position: "label-left", labelWidth: "90", label: "Staging Delay" }
		    ]
            },
            { type: "fieldset", name: "delBox", inputWidth: "auto", label: "Delimiters", offsetLeft: "0", hidden: false, list: [
			    { name: "RECDEL", type: "select", width: "100", label: "Row delimiter", position: "label-top", options: [
                    { text: "", value: "" },
                    { text: "Semicolon", value: ";" },
					{ text: "Vertical Bar", value: "|" },
					{ text: "Tilde", value: "~" },
                    { text: "{CR}{LF}", value: "{CR}{LF}" },
					{ text: "{CR}", value: "{CR}" },
                    { text: "{LF}", value: "{LF}" }
                ]
			    },
			    { type: "newcolumn" },
			    { name: "COLDEL", type: "select", width: "100", label: "Column delimiter", position: "label-top", options: [
                    { text: "", value: "" },
                    { text: "Comma", value: "," },
					{ text: "Tab", value: "{TAB}" },
                    { text: "Semicolon", value: ";" },
					{ text: "Vertical Bar", value: "|" },
					{ text: "Tilde", value: "~" },
                    { text: "{CR}{LF}", value: "{CR}{LF}" },
					{ text: "{CR}", value: "{CR}" },
                    { text: "{LF}", value: "{LF}" }
                ]
			    },
                { type: "newcolumn" },
			    { name: "CHRDEL", type: "select", width: "100", label: "Text delimiter", position: "label-top", options: [
                    { text: "", value: "" },
                    { text: "Double Quote", value: "\"" },
					{ text: "Single Quote", value: "'" },
                    { text: "Semicolon", value: ";" },
					{ text: "Vertical Bar", value: "|" },
                    { text: "{CR}{LF}", value: "{CR}{LF}" },
					{ text: "{CR}", value: "{CR}" },
                    { text: "{LF}", value: "{LF}" }
                ]
			    }
		    ]
            },
			{ type: "fieldset", label: "Description", inputWidth: "auto", list: [
				{ name: "DSDesc", type: "input", offsetLeft: "0", inputWidth: "245", rows: "3", value: "" }
			]
			},
		    { type: "fieldset", inputWidth: "auto", offsetLeft: "0", list: [
			    { name: "btnSDSAdd", type: "button", width: "80", value: "Add" },
			    { type: "newcolumn" },
			    { name: "btnSDSClear", type: "button", width: "80", value: "Clear" }
		    ]
		    }
        ];

        var propLayout = Tabbar_user_control.cells("tabProp").attachLayout("3W");
        // Datastore Type Icons View
        propLayout.cells("a").setText("Type");
        propLayout.cells("a").setWidth(200);
//        propLayout.cells("a").setHeight(300);
//        propLayout.cells("a").showInnerScroll();
        var DVtype = new dhtmlXDataView(propLayout.cells("a"));
        DVtype.define("type", "ficonNT");
        DVtype.define("height", "auto");
        DVtype.define("autowidth", 2);
        if (eType == 'objEngCDC')
        {
            DVtype.parse(structobjEngCDC, "json");
        }
        else
        {
            DVtype.parse(structobjEngETL, "json");
        };
        
        // properties form
        propLayout.cells( "b" ).setText( "Properties" );
        //            propLayout.cells( "a" ).setHeight( 300 );
        var frmNewSDS = propLayout.cells( "b" ).attachForm( structSDS );
        frmNewSDS.setFontSize('11px');
        propLayout.cells("b").setWidth(450);
        var mydp = new dataProcessor( "../Studio/php/addDS.php" );
        mydp.init(frmNewSDS);
        frmNewSDS.setItemValue("projName", getProjName(Pid));
        frmNewSDS.setItemValue("envName", getEnvName(Pid));
        frmNewSDS.setItemValue("sysName", getSysName(Pid));
        frmNewSDS.setItemValue("engName", getEngName(Pid));
        frmNewSDS.setItemValue('engType', eType);
        frmNewSDS.setItemValue("DSdir", 'S');
        
        // description tree
        propLayout.cells("c").setText("Choose Description");
        var treeDesc = propLayout.cells( "c" ).attachTree();
        treeDesc.deleteChildItems( '0' );
        treeDesc.deleteItem( '0' );
        treeDesc.setSkin( 'dhx_skyblue' );
        treeDesc.setImagePath( '../Studio/data/SQDimgs/' );
    //    treeDesc.enableDragAndDrop( '1', true );
    //    treeDesc.enableMercyDrag( '1' );
        treeDesc.enableTreeImages( true );
        treeDesc.enableItemEditor( false );
        treeDesc.enableTreeLines( true );
        treeDesc.enableCheckBoxes( true, false );
        treeDesc.enableThreeStateCheckboxes( '1' );

        jQuery.ajax( {
            type: 'POST',  //type of request  GET or POST
            url: '../Studio/php/getDSdescTree.php', // url to which the request is send
            data: { projName: CURproj,
                descFldrId: fldrId
            }, // data to be sent to server
            async: false,
            success: function ( return_data )  // function to be called if the request succeeds
            {
//                alert( "Before Tree load data: " + return_data );
                treeDesc.loadXMLString( return_data, function ()  // load tree with return data XML
                {
                    propLayout.progressOff();
    //                alert( "After Tree load data: " + return_data );
                    treeDesc.openAllItems( '0' );
                } );
            },
            error: function ()
            {
                //function to be called if the request fail
                propLayout.progressOff();
                alert( 'error' );
            }
        });  // end ajax

        

        // events
        frmNewSDS.attachEvent( "onButtonClick", function ( id )
        {
            if ( id == 'btnSDSAdd' )
            {
                frmNewSDS.disableItem( "btnSDSAdd" );
                frmNewSDS.setItemValue( "objid", Pid + "." + frmNewSDS.getItemValue( 'DSname' ) );
                
                tmpObjName = frmNewSDS.getItemValue( 'DSname' );
                tmpObjPid = Pid;
                tmpTPid = TPid;
                checklist = treeDesc.getAllCheckedBranches();
                //            alert( "checklist: " + checklist.toString() );
                $checklist = checklist.split( "," );
    //                        alert( "$checklist[0]: " + $checklist[0] );
                //            alert( "loadFunction $checklist[0]: " + treeDesc.getUserData( $checklist[0], 'loadFunction' ) );

    //                        alert( 'objid: ' + frmNewSDS.getItemValue( 'objid' ) + '\n' + 'tmpObjName: ' + tmpObjName + '\n' + 'tmpObjPid (Pid): ' + tmpObjPid + '\n' + 'tmpTPid (TPid): ' + tmpTPid );

                if ( frmNewSDS.validate() )
                {
                    for ( var i = 0; i < $checklist.length; i++ ) // loop through descriptions and add DSselections
                    {
                        if ( treeDesc.getUserData( $checklist[i], 'loadFunction' ) !== 'loadCtlFolder' )
                        {
                            //                        $checkedList.push( $checklist[i] );
                            var selId = $checklist[i];
                            var $selId = new Array();
                            $selId = selId.split( '.' );
                            $selId = $selId.reverse();
                            var selType = $selId[0];
                            var selname = $selId[1];
                            var descid = getProjName(Pid) + "." + getEnvName(Pid) + "." + selname + "." + selType;

    //                                                alert( "selName: " + selname + "\ndescid: " + descid );
                            // add DS selection  $checklist[i]
                            // '$_POST[objid]','$_POST[projName]','$_POST[envName]','$_POST[sysName]','$_POST[engName]','$_POST[DSname]','$_POST[selName]','$_POST[descName]')";

                            jQuery.ajax( {
                                type: 'POST',  //type of request  GET or POST
                                url: '../Studio/php/addDSsel.php', // url to which the request is send
                                data: { objid: Pid + "." + frmNewSDS.getItemValue( 'DSname' ) + "." + selname,
                                    projName: frmNewSDS.getItemValue( 'projName' ),
                                    envName: frmNewSDS.getItemValue( 'envName' ),
                                    sysName: frmNewSDS.getItemValue( 'sysName' ),
                                    engName: frmNewSDS.getItemValue( 'engName' ),
                                    DSname: frmNewSDS.getItemValue( 'DSname' ),
                                    selName: selname,
                                    descName: selname,
                                    descType: selType
                                }, // data to be sent to server
                                async: false,
                                success: function ( return_data )
                                {
    //                                alert( "After addDSsel return data: " + return_data );
                                    // Add all DSselFields  
    //                                alert( "selName = " + selname + "/ndescName = " + selname + "descId = " + descid);
                                    jQuery.ajax( {
                                        type: 'POST',  //type of request  GET or POST
                                        url: '../Studio/php/addDSselFields.php', // url to which the request is send
                                        data: { objid: Pid + "." + frmNewSDS.getItemValue( 'DSname' ) + "." + selname,
                                            projName: frmNewSDS.getItemValue( 'projName' ),
                                            envName: frmNewSDS.getItemValue( 'envName' ),
                                            sysName: frmNewSDS.getItemValue( 'sysName' ),
                                            engName: frmNewSDS.getItemValue( 'engName' ),
                                            DSname: frmNewSDS.getItemValue( 'DSname' ),
                                            selName: selname,
                                            descName: selname,
                                            descId: descid
                                        }, // data to be sent to server
                                        async: false,
                                        success: function ( return_data )
                                        {
    //                                        alert( "After addDSselFields data: " + return_data );
                                            // Add all DSselFields  

                                            propLayout.progressOff();
                                        },
                                        error: function ()
                                        {
                                            //function to be called if the request fail
                                            propLayout.progressOff();
                                            alert( 'error' );
                                        }
                                    } );
                                    propLayout.progressOff();
                                },
                                error: function ()
                                {
                                    //function to be called if the request fail
                                    propLayout.progressOff();
                                    alert( 'error' );
                                }
                            } );
                        }
                    };
                    //save form data
                    frmNewSDS.save();
                };
            }
            else if ( id == 'btnSDSClear' )
            {
                frmNewSDS.reset();
                addSDS( Pid, TPid );
            }
        } );

        // select type from dataview
        var formatCombo = frmNewSDS.getCombo("DSformat");
        //        formatCombo.s
        formatCombo.readonly("true");
        DVtype.attachEvent("onItemClick", function (id, ev, html)
        {
            
            formatCombo.setComboValue(id);
            var objSel = DVtype.get(id);
            img = objSel.imgFile;
            frmNewSDS.setItemValue('DSimage', img);
            formatCombo.readonly("true");
//            alert("id:" + id + "\nev:" + ev + "\nhtml: " + html + "\nimg: " + img);
            return true;
        });

        frmNewSDS.attachEvent( "onChange", function ( name, value )
        {
//            dhtmlx.message( {
//                text: "onChange  name: " + name + "\nvalue: " + value,
//                expire: 5000
//            } );
//            IsSaved = false;
//            switch ( name )
//            {
//                case "DSformat":
//                    var typeCombo = frmNewSDS.getCombo( "DStype" );
//                    typeCombo.clearAll();
//                    frmNewSDS.setItemValue( "DStype", "" );
//                    switch ( value )
//                    {
//                        case "Binary":
//                            propLayout.cells( "a" ).setHeight( 410 );
//                            
//                            typeCombo.addOption( "File", "File" );
//                            typeCombo.addOption( "MQS", "MQ Series" );
//                            typeCombo.addOption( "JMS", "JMS" );
//                            typeCombo.addOption( "TCP", "TCP/IP" );
//                            typeCombo.addOption( "VSAM", "VSAM" );

//                            frmNewSDS.showItem( "boxExtend" );
//                            frmNewSDS.hideItem( "boxComp" );
//                            frmNewSDS.hideItem( "boxWTO" );
//                            frmNewSDS.hideItem( "delBox" );
//                            frmNewSDS.hideItem( "boxNetezza" );

//                            frmNewSDS.showItem( "DSHostName" );
//                            frmNewSDS.showItem( "DSPort" );
//                            frmNewSDS.enableItem( "DSaccept" );
//                            frmNewSDS.disableItem( "DSreconn" );
//                            frmNewSDS.disableItem( "RRS" );
//                            break;
//                        case "Delimited":
//                            propLayout.cells( "a" ).setHeight( 460 );
//                            
//                            typeCombo.addOption( "File", "File" );
//                            typeCombo.addOption( "MQS", "MQ Series" );
//                            typeCombo.addOption( "JMS", "JMS" );
//                            typeCombo.addOption( "TCP", "TCP/IP" );

//                            frmNewSDS.showItem( "boxExtend" );
//                            frmNewSDS.hideItem( "boxComp" );
//                            frmNewSDS.hideItem( "boxWTO" );
//                            frmNewSDS.showItem( "delBox" );
//                            frmNewSDS.hideItem( "boxNetezza" );

//                            frmNewSDS.showItem( "DSHostName" );
//                            frmNewSDS.showItem( "DSPort" );
//                            frmNewSDS.enableItem( "DSaccept" );
//                            frmNewSDS.disableItem( "DSreconn" );
//                            frmNewSDS.disableItem( "RRS" );
//                            break;
//                        case "XML":
//                            propLayout.cells( "a" ).setHeight( 410 );
//                            
//                            typeCombo.addOption( "File", "File" );
//                            typeCombo.addOption( "MQS", "MQ Series" );
//                            typeCombo.addOption( "JMS", "JMS" );
//                            typeCombo.addOption( "TCP", "TCP/IP" );

//                            frmNewSDS.showItem( "boxExtend" );
//                            frmNewSDS.hideItem( "boxComp" );
//                            frmNewSDS.hideItem( "boxWTO" );
//                            frmNewSDS.hideItem( "delBox" );
//                            frmNewSDS.hideItem( "boxNetezza" );

//                            frmNewSDS.showItem( "DSHostName" );
//                            frmNewSDS.showItem( "DSPort" );
//                            frmNewSDS.enableItem( "DSaccept" );
//                            frmNewSDS.disableItem( "DSreconn" );
//                            frmNewSDS.disableItem( "RRS" );
//                            break;
//                        case "Relational":
//                            propLayout.cells( "a" ).setHeight( 410 );
//                            
//                            typeCombo.addOption( "Table", "Relational Table" );

//                            frmNewSDS.hideItem( "boxExtend" );
//                            frmNewSDS.hideItem( "boxComp" );
//                            frmNewSDS.hideItem( "boxWTO" );
//                            frmNewSDS.hideItem( "delBox" );
//                            frmNewSDS.hideItem( "boxNetezza" );

//                            frmNewSDS.hideItem( "DSHostName" );
//                            frmNewSDS.hideItem( "DSPort" );
//                            frmNewSDS.disableItem( "DSaccept" );
//                            frmNewSDS.disableItem( "DSreconn" );
//                            frmNewSDS.disableItem( "RRS" );
//                            break;
//                        case "UTSCDC":
//                            propLayout.cells( "a" ).setHeight( 410 );

//                            typeCombo.addOption( "CDC", "CDC Store" );
//                            typeCombo.addOption( "MQS", "MQ Series" );
//                            typeCombo.addOption( "JMS", "JMS" );

//                            frmNewSDS.showItem( "boxExtend" );
//                            frmNewSDS.hideItem( "boxComp" );
//                            frmNewSDS.hideItem( "boxWTO" );
//                            frmNewSDS.hideItem( "delBox" );
//                            frmNewSDS.hideItem( "boxNetezza" );

//                            frmNewSDS.hideItem( "DSHostName" );
//                            frmNewSDS.hideItem( "DSPort" );
//                            frmNewSDS.disableItem( "DSaccept" );
//                            frmNewSDS.disableItem( "DSreconn" );
//                            frmNewSDS.disableItem( "RRS" );
//                            if ( typeCombo.getSelectedValue() == "CDCStore" )
//                            {
//                                frmNewSDS.enableItem( "DSaccept" );
//                                frmNewSDS.enableItem( "DSreconn" );
//                            };
//                            break;
//                        case "DB2CDC":
//                            propLayout.cells( "a" ).setHeight( 410 );

//                            typeCombo.addOption( "CDC", "CDC Store" );
//                            typeCombo.addOption( "MQS", "MQ Series" );
//                            typeCombo.addOption( "JMS", "JMS" );

//                            frmNewSDS.showItem( "boxExtend" );
//                            frmNewSDS.hideItem( "boxComp" );
//                            frmNewSDS.hideItem( "boxWTO" );
//                            frmNewSDS.hideItem( "delBox" );
//                            frmNewSDS.hideItem( "boxNetezza" );

//                            frmNewSDS.hideItem( "DSHostName" );
//                            frmNewSDS.hideItem( "DSPort" );
//                            frmNewSDS.disableItem( "DSaccept" );
//                            frmNewSDS.enableItem( "DSreconn" );
//                            frmNewSDS.disableItem( "RRS" );
//                            break;
//                        case "IMSCDC":
//                            propLayout.cells( "a" ).setHeight( 410 );
//                            
//                            typeCombo.addOption( "CDC", "CDC Store" );
//                            typeCombo.addOption( "MQS", "MQ Series" );
//                            typeCombo.addOption( "JMS", "JMS" );

//                            frmNewSDS.showItem( "boxExtend" );
//                            frmNewSDS.hideItem( "boxComp" );
//                            frmNewSDS.hideItem( "boxWTO" );
//                            frmNewSDS.hideItem( "delBox" );
//                            frmNewSDS.hideItem( "boxNetezza" );

//                            frmNewSDS.hideItem( "DSHostName" );
//                            frmNewSDS.hideItem( "DSPort" );
//                            frmNewSDS.disableItem( "DSaccept" );
//                            frmNewSDS.enableItem( "DSreconn" );
//                            frmNewSDS.disableItem( "RRS" );
//                            break;
//                        case "VSAMCDC":
//                            propLayout.cells( "a" ).setHeight( 410 );

//                            typeCombo.addOption( "CDC", "CDC Store" );
//                            typeCombo.addOption( "MQS", "MQ Series" );
//                            typeCombo.addOption( "JMS", "JMS" );

//                            frmNewSDS.showItem( "boxExtend" );
//                            frmNewSDS.hideItem( "boxComp" );
//                            frmNewSDS.hideItem( "boxWTO" );
//                            frmNewSDS.hideItem( "delBox" );
//                            frmNewSDS.hideItem( "boxNetezza" );

//                            frmNewSDS.hideItem( "DSHostName" );
//                            frmNewSDS.hideItem( "DSPort" );
//                            frmNewSDS.enableItem( "DSaccept" );
//                            frmNewSDS.enableItem( "DSreconn" );
//                            frmNewSDS.enableItem( "RRS" );
//                            break;
//                        case "OracleCDC":
//                            propLayout.cells( "a" ).setHeight( 410 );
//                           
//                            typeCombo.addOption( "CDC", "CDC Store" );
//                            typeCombo.addOption( "MQS", "MQ Series" );
//                            typeCombo.addOption( "JMS", "JMS" );

//                            frmNewSDS.showItem( "boxExtend" );
//                            frmNewSDS.hideItem( "boxComp" );
//                            frmNewSDS.hideItem( "boxWTO" );
//                            frmNewSDS.hideItem( "delBox" );
//                            frmNewSDS.hideItem( "boxNetezza" );

//                            frmNewSDS.hideItem( "DSHostName" );
//                            frmNewSDS.hideItem( "DSPort" );
//                            frmNewSDS.disableItem( "DSaccept" );
//                            frmNewSDS.enableItem( "DSreconn" );
//                            frmNewSDS.disableItem( "RRS" );
//                            break;
//                        case "IMSDB":
//                            propLayout.cells( "a" ).setHeight( 410 );
//                            
//                            typeCombo.addOption( "IMS", "IMS" );

//                            frmNewSDS.hideItem( "boxExtend" );
//                            frmNewSDS.hideItem( "boxComp" );
//                            frmNewSDS.hideItem( "boxWTO" );
//                            frmNewSDS.hideItem( "delBox" );
//                            frmNewSDS.hideItem( "boxNetezza" );

//                            frmNewSDS.hideItem( "DSHostName" );
//                            frmNewSDS.hideItem( "DSPort" );
//                            break;
//                        case "Netezza":
//                            propLayout.cells( "a" ).setHeight( 410 );
//                            
//                            typeCombo.addOption( "Table", "Relational Table" );

//                            frmNewSDS.hideItem( "boxExtend" );
//                            frmNewSDS.hideItem( "boxComp" );
//                            frmNewSDS.hideItem( "boxWTO" );
//                            frmNewSDS.hideItem( "delBox" );
//                            frmNewSDS.showItem( "boxNetezza" );

//                            frmNewSDS.hideItem( "DSHostName" );
//                            frmNewSDS.hideItem( "DSPort" );
//                            break;
//                    };
//                    break;
//                case "DStype":
//                    switch ( value )
//                    {
//                        case "CDCStore":
//                            frmNewSDS.hideItem( "DSHostName" );
//                            frmNewSDS.hideItem( "DSPort" );
//                            break;
//                        case "File":
//                            frmNewSDS.hideItem( "DSHostName" );
//                            frmNewSDS.hideItem( "DSPort" );
//                            break;
//                        case "MQS":
//                            frmNewSDS.hideItem( "DSHostName" );
//                            frmNewSDS.hideItem( "DSPort" );
//                            break;
//                        case "JMS":
//                            frmNewSDS.hideItem( "DSHostName" );
//                            frmNewSDS.hideItem( "DSPort" );
//                            break;
//                        case "TCP":
//                            frmNewSDS.showItem( "DSHostName" );
//                            frmNewSDS.showItem( "DSPort" );
//                            break;
//                        case "Table":
//                            frmNewSDS.hideItem( "DSHostName" );
//                            frmNewSDS.hideItem( "DSPort" );
//                            break;
//                        case "IMS":
//                            frmNewSDS.hideItem( "DSHostName" );
//                            frmNewSDS.hideItem( "DSPort" );
//                            break;
//                        case "VSAM":
//                            frmNewSDS.hideItem( "DSHostName" );
//                            frmNewSDS.hideItem( "DSPort" );
//                            break;
//                        default:
//                            break;
//                    };
//                    break;
//                default:
//                    break;
//            }
        } );

        frmNewSDS.attachEvent( "onAfterSave", function ( id, xml )
        {
            //        alert( 'On after save... what is sent to addNode' + '\n' + 'id = ' + id + '\n' + 'xml value: ' + xml + '\n' + 'tmpTPid (ndTPid): ' + tmpTPid + '\n' + 'tmpObjPid (ndObjPid): ' + tmpObjPid + '\n' + 'tmpObjName (ndName): ' + tmpObjName );

            // Add SDS Node (id is the New id that is auto assigned by MySQL),
            // This added as tabId in the MainTree and maintree table so dhtmlx dataprocessor can be used to make the SQL simple 
            addNode(tmpTPid, tmpObjPid, tmpObjName, 'objSDS', img, "loadCtlSDS", img, img, img, '', id);

            // Add Selection Nodes to Main Tree
            for ( var i = 0; i < $checklist.length; i++ )
            {
                if ( treeDesc.getUserData( $checklist[i], 'loadFunction' ) !== 'loadCtlFolder' )
                {
                    var selId = $checklist[i];
                    var $selId = new Array();
                    $selId = selId.split( '.' );
                    $selId = $selId.reverse();
                    var selname = $selId[1];
                    addNode( Pid + "." + frmNewSDS.getItemValue( 'DSname' ), Pid + "." + frmNewSDS.getItemValue( 'DSname' ), selname, 'objSDSsel', 'desc.gif', "loadCtlSDS", 'desc.gif', 'desc.gif', 'desc.gif', '', id );
                }
            }
        } );
    }
    catch ( err )
    {
        logError( err.message, err.name, "AddObj.js", "function addSDS( Pid, TPid )" );
    }
}
// ****************************************************************************************************************
function addTDS( Pid, TPid, eType )
{
    try
    {
        var fldrId = getProjName( Pid ) + "." + getEnvName( Pid ) + ".fldTgtDesc";
        var checklist;
        var $checklist = new Array;
        var $checkedList = new Array;
        var descFldrId;
        var iconPath = "../Studio/data/SQDimgs/";
        var image;
        var img;

        var structobjEngCDC = [
        {
            id: "DB2LUW",
            image: iconPath + "DB2LUW_w_text.gif",
//            text: "",
            name: "DB2LUW",
            imgFile: "DB2LUW_w_text.gif"
        },
        {
            id: "DB2ZOS",
            image: iconPath + "DB2ZOS_w_text.gif",
//            text: "",
            name: "DB2ZOS",
            imgFile: "DB2ZOS_w_text.gif"
        },
        {
            id: "IMSCDC",
            image: iconPath + "IMS_w_text.gif",
//            text: "",
            name: "IMSCDC",
            imgFile: "IMS_w_text.gif"
        },
        {
            id: "ORACDC",
            image: iconPath + "ORACLE_w_text.gif",
//            text: "",
            name: "ORACDC",
            imgFile: "ORACLE_w_text.gif"
        },
        {
            id: "SQLSVRCDC",
            image: iconPath + "SQLSERVER_w_text.gif",
//            text: "",
            name: "SQLSVRCDC",
            imgFile: "SQLSERVER_w_text.gif"
        },
        {
            id: "VSAMCDC",
            image: iconPath + "VSAM_w_text.gif",
//            text: "",
            name: "VSAMCDC",
            imgFile: "VSAM_w_text.gif"
        },
        {
            id: "Cassandra",
            image: iconPath + "Cassandraicon.gif",
//            text: "",
            name: "Cassandra",
            imgFile: "Cassandraicon.gif"
        },
        {
            id: "File",
            image: iconPath + "fileicon.gif",
//            text: "",
            name: "File",
            imgFile: "fileicon.gif"
        },
        {
            id: "Hadoop",
            image: iconPath + "hadoopicon.gif",
//            text: "",
            name: "Hadoop",
            imgFile: "hadoopicon.gif"
        },
        {
            id: "JMS",
            image: iconPath + "JMSicon.gif",
//            text: "",
            name: "JMS",
            imgFile: "JMSicon.gif"
        },
        {
            id: "MQ",
            image: iconPath + "MQicon.gif",
//            text: "",
            name: "MQ",
            imgFile: "MQicon.gif"
        },
        {
            id: "MySQL",
            image: iconPath + "MySQLicon.gif",
//            text: "",
            name: "MySQL",
            imgFile: "MySQLicon.gif"
        },
        {
            id: "ODBC",
            image: iconPath + "ODBCRelationalicon.gif",
//            text: "",
            name: "ODBC",
            imgFile: "ODBCRelationalicon.gif"
        },
        {
            id: "ORACLE",
            image: iconPath + "ORACLE_w_text.gif",
//            text: "",
            name: "ORACLE",
            imgFile: "ORACLE_w_text.gif"
        },
        {
            id: "PostgreSQL",
            image: iconPath + "PostgreSQLicon.gif",
//            text: "",
            name: "PostgreSQL",
            imgFile: "PostgreSQLicon.gif"
        },
        {
            id: "SQLSERVER",
            image: iconPath + "SQLSERVER_w_text.gif",
//            text: "",
            name: "SQLSERVER",
            imgFile: "SQLSERVER_w_text.gif"
        },
        {
            id: "NETEZZA",
            image: iconPath + "NetezzaIcon.gif",
//            text: "",
            name: "NETEZZA",
            imgFile: "NetezzaIcon.gif"
        }
        ];

        var structobjEngETL = [
        {
            id: "Cassandra",
            image: iconPath + "Cassandraicon.gif",
//            text: "",
            name: "Cassandra",
            imgFile: "Cassandraicon.gif"
        },
        {
            id: "File",
            image: iconPath + "fileicon.gif",
//            text: "",
            name: "File",
            imgFile: "fileicon.gif"
        },
        {
            id: "Hadoop",
            image: iconPath + "hadoopicon.gif",
//            text: "",
            name: "Hadoop",
            imgFile: "hadoopicon.gif"
        },
        {
            id: "JMS",
            image: iconPath + "JMSicon.gif",
//            text: "",
            name: "JMS",
            imgFile: "JMSicon.gif"
        },
        {
            id: "MQ",
            image: iconPath + "MQicon.gif",
//            text: "",
            name: "MQ",
            imgFile: "MQicon.gif"
        },
        {
            id: "MySQL",
            image: iconPath + "MySQLicon.gif",
//            text: "",
            name: "MySQL",
            imgFile: "MySQLicon.gif"
        },
        {
            id: "ODBC",
            image: iconPath + "ODBCRelationalicon.gif",
//            text: "",
            name: "ODBC",
            imgFile: "ODBCRelationalicon.gif"
        },
        {
            id: "ORACLE",
            image: iconPath + "ORACLE_w_text.gif",
//            text: "",
            name: "ORACLE",
            imgFile: "ORACLE_w_text.gif"
        },
        {
            id: "PostgreSQL",
            image: iconPath + "PostgreSQLicon.gif",
//            text: "",
            name: "PostgreSQL",
            imgFile: "PostgreSQLicon.gif"
        },
        {
            id: "SQLSERVER",
            image: iconPath + "SQLSERVER_w_text.gif",
//            text: "",
            name: "SQLSERVER",
            imgFile: "SQLSERVER_w_text.gif"
        },
        {
            id: "NETEZZA",
            image: iconPath + "NetezzaIcon.gif",
//            text: "",
            name: "NETEZZA",
            imgFile: "NetezzaIcon.gif"
        }
        ];

        var structTDS = [
	        { type: "settings", position: "label-left", labelAlign: "left", labelWidth: 100, inputWidth: 180 },
	        { type: "fieldset", label: "Target Datastore Properties", inputWidth: "auto", list: [
			    { name: "objid", type: "input", label: "objid", value: "", readonly: "true", required: true, hidden: true },
                { name: "projName", type: "input", label: "Project Name", value: "", readonly: "true", hidden: true },
                { name: "envName", type: "input", label: "Environment Name", value: "", readonly: "true", hidden: true },
                { name: "sysName", type: "input", label: "System Name", value: "", readonly: "true", hidden: true },
			    { name: "engName", type: "input", label: "Engine Name", value: "", readonly: "true", hidden: true },
                { name: "engType", type: "input", label: "Engine Type", value: "", readonly: "true", hidden: false },
                { name: "DSimage", type: "input", label: "Image File", value: "", readonly: "true", hidden: true },
			    { name: "DSname", type: "input", label: "Alias (name)", value: "", required: true },
			    { name: "DSdir", type: "input", label: "DS Direction", value: "T", readonly: "true", hidden: true },
			    { name: "DSformat", type: "combo", inputWidth: 180, required: true, label: "Format", options: [
					{ text: "Binary", value: "Binary" },
					{ text: "Delimited", value: "Delimited" },
					{ text: "XML", value: "XML" },
					{ text: "Relational", value: "Relational" },
                    { text: "UTSCDC", value: "UTSCDC" },
                    { text: "DB2 LUW", value: "DB2LUW" },
                    { text: "DB2 ZOS", value: "DB2ZOS" },
                    { text: "IMS CDC", value: "IMSCDC" },
                    { text: "VSAM CDC", value: "VSAMCDC" },
                    { text: "Oracle CDC", value: "ORACDC" },
                    { text: "SQL Svr CDC", value: "SQLSVRCDC" },
					{ text: "IMSDB", value: "IMSDB" },
                    { text: "Cassandra", value: "Cassandra" },
                    { text: "File", value: "UTSCDC" },
                    { text: "Hadoop", value: "DB2LUW" },
                    { text: "JMS", value: "DB2ZOS" },
                    { text: "MQS", value: "IMSCDC" },
                    { text: "MySQL", value: "VSAMCDC" },
                    { text: "ODBC", value: "ODBC" },
                    { text: "Postgre", value: "PostgreSQL" },
					{ text: "SQL Svr", value: "SQLSERVER" },
					{ text: "Netezza", value: "Netezza" }
			    ]
			    },
			    { name: "DStype", type: "combo", inputWidth: 180, required: true, label: "Type", options: [
					{ text: "File", value: "File" },
					{ text: "MQ Series", value: "MQS" },
                    { text: "JMS", value: "JMS" },
					{ text: "TCP/IP", value: "TCP" },
                    { text: "RDBMS Global", value: "RDBMS" },
                    { text: "Relational Table", value: "Table" },
                    { text: "IMS", value: "IMS" },
                    { text: "VSAM", value: "VSAM" }
			    ]
			    },
			    { name: "DSPhysName", type: "input", label: "Physical Name", value: "", required: false },
                { name: "DSOperationType", type: "combo", inputWidth: "180", required: true, label: "Operation Type", options: [
					{ text: "Insert", value: "Insert" },
					{ text: "Change", value: "Change" }
			    ]
                },
			    { name: "DSHostName", type: "input", label: "Host Name", value: "" },
			    { name: "DSPort", type: "input", label: "Port", value: "" },
                { name: "DSKeyChange", type: "checkbox", position: "label-left", labelAlign: "left", labelWidth: 150, hidden: false, label: "Allow for Key changes", checked: false },
			    { name: "DSException", type: "input", label: "Exception", value: "" },
            ]
	        },
			{ type: "fieldset", name: "boxExtend", label: "Extended Properties", inputWidth: "auto", offsetLeft: "0", list: [
                { name: "DSUOW", type: "input", inputWidth: "90", labelWidth: "50", hidden: false, label: "UOW" },
                { name: "DSchkBImg", type: "checkbox", position: "label-right", labelAlign: "left", labelWidth: "140",hidden: false, label: "Check Full Before Image", checked: false },
                { name: "DSaccept", type: "checkbox", position: "label-right", labelAlign: "left", labelWidth: "140", label: "Accept", checked: false },
			    { type: "newcolumn" },
			    { name: "DSIMSPathData", type: "checkbox", position: "label-left", labelAlign: "right", labelWidth: "100", hidden: false, label: "IMS PathData", checked: false },
			    { name: "DSSkipChangeCheck", type: "checkbox", position: "label-left", labelAlign: "right", labelWidth: "100", hidden: false, label: "Skip Change Check", checked: false },
                { name: "RRS", type: "checkbox", position: "label-left", labelAlign: "right", labelWidth: "100", label: "RRS", checked: false }
		    ]
			},
            { type: "fieldset", name: "boxComp", label: "Compensate", inputWidth: "auto", offsetLeft: "0", hidden: false, list: [
                { name: "DScomp", type: "checkbox", position: "label-left", labelAlign: "right", labelWidth: "60", label: "Compensate", checked: false },
                { type: "newcolumn" },
                { name: "DScompWarn", type: "checkbox", position: "label-left", labelAlign: "right", labelWidth: "100", label: "Comp w/ Warning", checked: false },
			    { type: "newcolumn" },
                { name: "DSnoComp", type: "checkbox", position: "label-left", labelAlign: "right", labelWidth: "60", label: "No Comp", checked: false }
		    ]
            },
            { type: "fieldset", name: "boxWTO", label: "WTO", inputWidth: "auto", offsetLeft: "0", hidden: false, list: [
                { name: "DSwtoComp", type: "select", width: "60", labelWidth: "130", label: "WTO on Compensation", position: "label-left", options: [
                    { text: "", value: "" },
                    { text: "ONCE", value: "ONCE" },
					{ text: "EVERY", value: "EVERY" }
                ]
                },
                { name: "DSwtoExp", type: "select", width: "60", labelWidth: "130", label: "WTO on Exception", position: "label-left", options: [
                    { text: "", value: "" },
                    { text: "ONCE", value: "ONCE" },
					{ text: "EVERY", value: "EVERY" }
                ]
                },
			    { type: "newcolumn" },
			    { name: "DScompNum", type: "input", inputWidth: "40", position: "label-right", labelWidth: "50", label: "minutes" },
			    { name: "DSexpNum", type: "input", inputWidth: "40", position: "label-right", labelWidth: "50", label: "minutes" }
		    ]
            },
            { type: "fieldset", name: "boxNetezza", label: "Netezza Properties", inputWidth: "auto", offsetLeft: "0", hidden: false, list: [
                { name: "DSstageDir", type: "input", width: "180", labelWidth: "90", position: "label-left", label: "Staging Dir:" },
                { name: "DSconns", type: "input", width: "40", labelWidth: "90", position: "label-left", label: "Connections" },
			    { name: "DSstageRec", type: "input", inputWidth: "40", position: "label-left", labelWidth: "90", label: "Staging Records" },
			    { name: "DSstageDelay", type: "input", inputWidth: "40", position: "label-left", labelWidth: "90", label: "Staging Delay" }
		    ]
            },
            { type: "fieldset", name: "delBox", inputWidth: "auto", hidden: false, label: "Delimiters", offsetLeft: "0", list: [
			    { name: "RECDEL", type: "select", width: "90", label: "Row delimiter", position: "label-top", options: [
                    { text: "", value: "" },
                    { text: "Semicolon", value: ";" },
					{ text: "Vertical Bar", value: "|" },
					{ text: "Tilde", value: "~" },
                    { text: "{CR}{LF}", value: "{CR}{LF}" },
					{ text: "{CR}", value: "{CR}" },
                    { text: "{LF}", value: "{LF}" }
                ]
			    },
			    { type: "newcolumn" },
			    { name: "COLDEL", type: "select", width: "90", label: "Column delimiter", position: "label-top", options: [
                    { text: "", value: "" },
                    { text: "Comma", value: "," },
					{ text: "Tab", value: "{TAB}" },
                    { text: "Semicolon", value: ";" },
					{ text: "Vertical Bar", value: "|" },
					{ text: "Tilde", value: "~" },
                    { text: "{CR}{LF}", value: "{CR}{LF}" },
					{ text: "{CR}", value: "{CR}" },
                    { text: "{LF}", value: "{LF}" }
                ]
			    },
                { type: "newcolumn" },
			    { name: "CHRDEL", type: "select", width: "90", label: "Text delimiter", position: "label-top", options: [
                    { text: "", value: "" },
                    { text: "Double Quote", value: "\"" },
					{ text: "Single Quote", value: "'" },
                    { text: "Semicolon", value: ";" },
					{ text: "Vertical Bar", value: "|" },
                    { text: "{CR}{LF}", value: "{CR}{LF}" },
					{ text: "{CR}", value: "{CR}" },
                    { text: "{LF}", value: "{LF}" }
		        ]
                }
		    ]
            },
			{ type: "fieldset", label: "Description", inputWidth: "auto", list: [
				{ name: "DSDesc", type: "input", offsetLeft: 0, inputWidth: 245, rows: 3, value: "" }
			]
			},
		    { type: "fieldset", inputWidth: "auto", offsetLeft: 0, list: [
			    { name: "btnTDSAdd", type: "button", width: 80, value: "Add" },
			    { type: "newcolumn" },
			    { name: "btnTDSClear", type: "button", width: 80, value: "Clear" }
		    ]
		    }
        ];

        var propLayout = Tabbar_user_control.cells("tabProp").attachLayout("3W");
        // Datastore Type Icons View
        propLayout.cells("a").setText("Type");
        propLayout.cells("a").setWidth(300);
        var DVtype = new dhtmlXDataView(propLayout.cells("a"));
        DVtype.define("type", "ficonNT");
        DVtype.define("height", "auto");
        DVtype.define("autowidth", 3);
        if (eType == 'objEngCDC')
        {
            DVtype.parse(structobjEngCDC, "json");
        }
        else
        {
            DVtype.parse(structobjEngETL, "json");
        };

        propLayout.cells("b").setText("Properties");
        propLayout.cells("b").setWidth(400);
        //            propLayout.cells( "a" ).setHeight( 300 );
        propLayout.cells( "c" ).setText( "Choose Description" );
        var frmNewTDS = propLayout.cells( "b" ).attachForm( structTDS );
        frmNewTDS.setFontSize( '11px' );
        var mydp = new dataProcessor( "../Studio/php/addDS.php" );
        mydp.init( frmNewTDS );
        frmNewTDS.setItemValue("projName", getProjName(Pid));
        frmNewTDS.setItemValue("envName", getEnvName(Pid));
        frmNewTDS.setItemValue("sysName", getSysName(Pid));
        frmNewTDS.setItemValue("engName", getEngName(Pid));
        frmNewTDS.setItemValue('engType', eType);
        frmNewTDS.setItemValue("DSdir", 'T');

        // description tree
        var treeDesc = propLayout.cells( "c" ).attachTree();
        treeDesc.deleteChildItems( '0' );
        treeDesc.deleteItem( '0' );
        treeDesc.setSkin( 'dhx_skyblue' );
        treeDesc.setImagePath( '../Studio/data/SQDimgs/' );
        //    treeDesc.enableDragAndDrop( '1', true );
        //    treeDesc.enableMercyDrag( '1' );
        treeDesc.enableTreeImages( true );
        treeDesc.enableItemEditor( false );
        treeDesc.enableTreeLines( true );
        treeDesc.enableCheckBoxes( true, false );
        treeDesc.enableThreeStateCheckboxes( '1' );
    
        jQuery.ajax( {
            type: 'POST',  //type of request  GET or POST
            url: '../Studio/php/getDSdescTree.php', // url to which the request is send
            data: { projName: CURproj,
                    descFldrId: fldrId }, // data to be sent to server
            success: function ( return_data )  // function to be called if the request succeeds
            {
    //                        alert( "Before Tree load data: " + return_data );
                treeDesc.loadXMLString( return_data, function ()  // load tree with return data XML
                {
                    propLayout.progressOff();
                    //                alert( "After Tree load data: " + return_data );
                    treeDesc.openAllItems( '0' );
                } );
            },
            error: function ()
            {
                //function to be called if the request fail
                propLayout.progressOff();
                alert( 'error' );
            }
        } );  // end ajax

        frmNewTDS.attachEvent( "onButtonClick", function ( id )
        {
            if ( id == 'btnTDSAdd' )
            {
                frmNewTDS.disableItem( "btnTDSAdd" );
                frmNewTDS.setItemValue( "objid", Pid + "." + frmNewTDS.getItemValue( 'DSname' ) );
                
                tmpObjName = frmNewTDS.getItemValue( 'DSname' );
                tmpObjPid = Pid;
                tmpTPid = TPid;
                checklist = treeDesc.getAllCheckedBranches();
                //            alert( "checklist: " + checklist.toString() );
                $checklist = checklist.split( "," );
                //            alert( 'objid: ' + frmNewConn.getItemValue( 'objid' ) + '\n' + 'tmpObjName: ' + tmpObjName + '\n' + 'tmpObjPid (Pid): ' + tmpObjPid + '\n' + 'tmpTPid (TPid): ' + tmpTPid );

                if ( frmNewTDS.validate() )
                {
                    for ( var i = 0; i < $checklist.length; i++ ) // loop through descriptions and add DSselections
                    {
                        if ( treeDesc.getUserData( $checklist[i], 'loadFunction' ) !== 'loadCtlFolder' )
                        {
                            //                        $checkedList.push( $checklist[i] );
                            var selId = $checklist[i];
                            var $selId = new Array();
                            $selId = selId.split( '.' );
                            $selId = $selId.reverse();
                            var selType = $selId[0];
                            var selname = $selId[1];
                            var descid = getProjName(Pid) + "." + getEnvName(Pid) + "." + selname +"." + selType;

    //                        alert( "selName: " + selname + "\ndescid: " + descid );
                            // add DS selection  $checklist[i]
                            // '$_POST[objid]','$_POST[projName]','$_POST[envName]','$_POST[sysName]','$_POST[engName]','$_POST[DSname]','$_POST[selName]','$_POST[descName]')";

                            jQuery.ajax( {
                                type: 'POST',  //type of request  GET or POST
                                url: '../Studio/php/addDSsel.php', // url to which the request is send
                                data: { objid: Pid + "." + frmNewTDS.getItemValue( 'DSname' ) + "." + selname,
                                    projName: frmNewTDS.getItemValue( 'projName' ),
                                    envName: frmNewTDS.getItemValue( 'envName' ),
                                    sysName: frmNewTDS.getItemValue( 'sysName' ),
                                    engName: frmNewTDS.getItemValue( 'engName' ),
                                    DSname: frmNewTDS.getItemValue( 'DSname' ),
                                    selName: selname,
                                    descName: selname,
                                    descType: selType
                                }, // data to be sent to server
                                async: false,
                                success: function ( return_data )
                                {
                                    // alert( "After Tree load data: " + return_data );
                                    // Add all DSselFields  
                                    jQuery.ajax( {
                                        type: 'POST',  //type of request  GET or POST
                                        url: '../Studio/php/addDSselFields.php', // url to which the request is send
                                        data: { objid: Pid + "." + frmNewTDS.getItemValue( 'DSname' ) + "." + selname,
                                            projName: frmNewTDS.getItemValue( 'projName' ),
                                            envName: frmNewTDS.getItemValue( 'envName' ),
                                            sysName: frmNewTDS.getItemValue( 'sysName' ),
                                            engName: frmNewTDS.getItemValue( 'engName' ),
                                            DSname: frmNewTDS.getItemValue( 'DSname' ),
                                            selName: selname,
                                            descName: selname,
                                            descId: descid
                                        }, // data to be sent to server
                                        async: false,
                                        success: function ( return_data )
                                        {
                                            // alert( "After addDSselFields data: " + return_data );
                                            // Add all DSselFields  

                                            propLayout.progressOff();
                                        },
                                        error: function ()
                                        {
                                            //function to be called if the request fail
                                            propLayout.progressOff();
                                            alert( 'error' );
                                        }
                                    } );
                                    propLayout.progressOff();
                                },
                                error: function ()
                                {
                                    //function to be called if the request fail
                                    propLayout.progressOff();
                                    alert( 'error' );
                                }
                            } );
                        }
                    };
                    // save form data
                    frmNewTDS.save();
                };
            }
            else if ( id == 'btnTDSClear' )
            {
                frmNewTDS.reset();
                addTDS( Pid, TPid );
            }
        });

        // select type from dataview
        var formatCombo = frmNewTDS.getCombo("DSformat");
        //        formatCombo.s
        formatCombo.readonly("true");
        DVtype.attachEvent("onItemClick", function (id, ev, html)
        {
            formatCombo.setComboValue(id);
            var objSel = DVtype.get(id);
            img = objSel.imgFile;
            frmNewTDS.setItemValue('DSimage', img);
            formatCombo.readonly("true");
            //            alert("id:" + id + "\nev:" + ev + "\nhtml: " + html + "\nimg: " + img);
            return true;
        });


        frmNewTDS.attachEvent( "onChange", function ( name, value )
        {
        
//            alert("id:" + id + "\nev:" + ev + "\nhtml: " + html);
            switch (name)
            {
//                case "Binary":
                    //                            propLayout.cells( "a" ).setHeight( 400 );
                    //                            
                    //                            typeCombo.addOption( "File", "File" );
                    //                            typeCombo.addOption( "MQS", "MQ Series" );
                    //                            typeCombo.addOption( "JMS", "JMS" );
                    //                            typeCombo.addOption( "TCP", "TCP/IP" );
                    //                            typeCombo.addOption( "VSAM", "VSAM" );

                    //                            frmNewTDS.hideItem( "boxExtend" );
                    //                            frmNewTDS.hideItem( "boxComp" );
                    //                            frmNewTDS.hideItem( "boxWTO" );
                    //                            frmNewTDS.hideItem( "delBox" );
                    //                            frmNewTDS.hideItem( "boxNetezza" );

                    //                            frmNewTDS.hideItem( "DSHostName" );
                    //                            frmNewTDS.hideItem( "DSPort" );
                    //                            frmNewTDS.hideItem( "DSaccept" );
                    //                            frmNewTDS.disableItem( "DSreconn" );
                    //                            frmNewTDS.disableItem( "RRS" );
                    //                            break;
                    //                        case "Delimited":
                    //                            propLayout.cells( "a" ).setHeight( 450 );
                    //                            
                    //                            typeCombo.addOption( "File", "File" );
                    //                            typeCombo.addOption( "MQS", "MQ Series" );
                    //                            typeCombo.addOption( "JMS", "JMS" );
                    //                            typeCombo.addOption( "TCP", "TCP/IP" );

                    //                            frmNewTDS.hideItem( "boxExtend" );
                    //                            frmNewTDS.hideItem( "boxComp" );
                    //                            frmNewTDS.hideItem( "boxWTO" );
                    //                            frmNewTDS.showItem( "delBox" );
                    //                            frmNewTDS.hideItem( "boxNetezza" );

                    //                            frmNewTDS.hideItem( "DSHostName" );
                    //                            frmNewTDS.hideItem( "DSPort" );
                    //                            frmNewTDS.hideItem( "DSaccept" );
                    //                            frmNewTDS.disableItem( "DSreconn" );
                    //                            frmNewTDS.disableItem( "RRS" );
                    //                            break;
                    //                        case "XML":
                    //                            propLayout.cells( "a" ).setHeight( 400 );
                    //                            
                    //                            typeCombo.addOption( "File", "File" );
                    //                            typeCombo.addOption( "MQS", "MQ Series" );
                    //                            typeCombo.addOption( "JMS", "JMS" );
                    //                            typeCombo.addOption( "TCP", "TCP/IP" );

                    //                            frmNewTDS.hideItem( "boxExtend" );
                    //                            frmNewTDS.hideItem( "boxComp" );
                    //                            frmNewTDS.hideItem( "boxWTO" );
                    //                            frmNewTDS.hideItem( "delBox" );
                    //                            frmNewTDS.hideItem( "boxNetezza" );

                    //                            frmNewTDS.hideItem( "DSHostName" );
                    //                            frmNewTDS.hideItem( "DSPort" );
                    //                            frmNewTDS.hideItem( "DSaccept" );
                    //                            frmNewTDS.disableItem( "DSreconn" );
                    //                            frmNewTDS.disableItem( "RRS" );
                    //                            break;
                    //                        case "Relational":
                    //                            propLayout.cells( "a" ).setHeight( 400 );
                    //                           
                    //                            typeCombo.addOption( "RDBMS", "RDBMS Global" );
                    //                            typeCombo.addOption( "Table", "Relational Table" );

                    //                            frmNewTDS.hideItem( "boxExtend" );
                    //                            frmNewTDS.showItem( "boxComp" );
                    //                            frmNewTDS.showItem( "boxWTO" );
                    //                            frmNewTDS.hideItem( "delBox" );
                    //                            frmNewTDS.hideItem( "boxNetezza" );

                    //                            frmNewTDS.hideItem( "DSHostName" );
                    //                            frmNewTDS.hideItem( "DSPort" );
                    //                            frmNewTDS.hideItem( "DSaccept" );
                    //                            frmNewTDS.disableItem( "DSreconn" );
                    //                            frmNewTDS.disableItem( "RRS" );
                    //                            break;
                    //                        case "UTSCDC":
                    //                            propLayout.cells( "a" ).setHeight( 400 );
                    //                            
                    //                            typeCombo.addOption( "MQS", "MQ Series" );
                    //                            typeCombo.addOption( "JMS", "JMS" );

                    //                            frmNewTDS.showItem( "boxExtend" );
                    //                            frmNewTDS.showItem( "boxComp" );
                    //                            frmNewTDS.showItem( "boxWTO" );
                    //                            frmNewTDS.hideItem( "delBox" );
                    //                            frmNewTDS.hideItem( "boxNetezza" );

                    //                            frmNewTDS.hideItem( "DSHostName" );
                    //                            frmNewTDS.hideItem( "DSPort" );
                    //                            frmNewTDS.hideItem( "DSaccept" );
                    //                            frmNewTDS.disableItem( "DSreconn" );
                    //                            frmNewTDS.disableItem( "RRS" );
                    //                            if ( typeCombo.getSelectedValue() == "CDCStore" )
                    //                            {
                    //                                frmNewTDS.enableItem( "DSaccept" );
                    //                            };
                    //                            break;
                    //                        case "DB2CDC":
                    //                            propLayout.cells( "a" ).setHeight( 400 );
                    //                            
                    //                            typeCombo.addOption( "MQS", "MQ Series" );
                    //                            typeCombo.addOption( "JMS", "JMS" );

                    //                            frmNewTDS.showItem( "boxExtend" );
                    //                            frmNewTDS.showItem( "boxComp" );
                    //                            frmNewTDS.showItem( "boxWTO" );
                    //                            frmNewTDS.hideItem( "delBox" );
                    //                            frmNewTDS.hideItem( "boxNetezza" );

                    //                            frmNewTDS.hideItem( "DSHostName" );
                    //                            frmNewTDS.hideItem( "DSPort" );
                    //                            frmNewTDS.hideItem( "DSaccept" );
                    //                            frmNewTDS.enableItem( "DSreconn" );
                    //                            frmNewTDS.disableItem( "RRS" );
                    //                            break;
                    //                        case "IMSCDC":
                    //                            propLayout.cells( "a" ).setHeight( 400 );
                    //                            
                    //                            typeCombo.addOption( "MQS", "MQ Series" );
                    //                            typeCombo.addOption( "JMS", "JMS" );

                    //                            frmNewTDS.showItem( "boxExtend" );
                    //                            frmNewTDS.showItem( "boxComp" );
                    //                            frmNewTDS.showItem( "boxWTO" );
                    //                            frmNewTDS.hideItem( "delBox" );
                    //                            frmNewTDS.hideItem( "boxNetezza" );

                    //                            frmNewTDS.hideItem( "DSHostName" );
                    //                            frmNewTDS.hideItem( "DSPort" );
                    //                            frmNewTDS.hideItem( "DSaccept" );
                    //                            frmNewTDS.enableItem( "DSreconn" );
                    //                            frmNewTDS.disableItem( "RRS" );
                    //                            break;
                    //                        case "VSAMCDC":
                    //                            propLayout.cells( "a" ).setHeight( 400 );
                    //                            
                    //                            typeCombo.addOption( "MQS", "MQ Series" );
                    //                            typeCombo.addOption( "JMS", "JMS" );

                    //                            frmNewTDS.showItem( "boxExtend" );
                    //                            frmNewTDS.showItem( "boxComp" );
                    //                            frmNewTDS.showItem( "boxWTO" );
                    //                            frmNewTDS.hideItem( "delBox" );
                    //                            frmNewTDS.hideItem( "boxNetezza" );

                    //                            frmNewTDS.hideItem( "DSHostName" );
                    //                            frmNewTDS.hideItem( "DSPort" );
                    //                            frmNewTDS.hideItem( "DSaccept" );
                    //                            frmNewTDS.enableItem( "DSreconn" );
                    //                            frmNewTDS.enableItem( "RRS" );
                    //                            break;
                    //                        case "OracleCDC":
                    //                            propLayout.cells( "a" ).setHeight( 400 );
                    //                            
                    //                            typeCombo.addOption( "MQS", "MQ Series" );
                    //                            typeCombo.addOption( "JMS", "JMS" );

                    //                            frmNewTDS.showItem( "boxExtend" );
                    //                            frmNewTDS.showItem( "boxComp" );
                    //                            frmNewTDS.showItem( "boxWTO" );
                    //                            frmNewTDS.hideItem( "delBox" );
                    //                            frmNewTDS.hideItem( "boxNetezza" );

                    //                            frmNewTDS.hideItem( "DSHostName" );
                    //                            frmNewTDS.hideItem( "DSPort" );
                    //                            frmNewTDS.hideItem( "DSaccept" );
                    //                            frmNewTDS.enableItem( "DSreconn" );
                    //                            frmNewTDS.disableItem( "RRS" );
                    //                            break;
                    //                        case "IMSDB":
                    //                            propLayout.cells( "a" ).setHeight( 400 );
                    //                            
                    //                            typeCombo.addOption( "IMS", "IMS" );

                    //                            frmNewTDS.hideItem( "boxExtend" );
                    //                            frmNewTDS.showItem( "boxComp" );
                    //                            frmNewTDS.showItem( "boxWTO" );
                    //                            frmNewTDS.hideItem( "delBox" );
                    //                            frmNewTDS.hideItem( "boxNetezza" );

                    //                            frmNewTDS.hideItem( "DSHostName" );
                    //                            frmNewTDS.hideItem( "DSPort" );
                    //                            frmNewTDS.hideItem( "DSaccept" );
                    //                            frmNewTDS.disableItem( "DSreconn" );
                    //                            frmNewTDS.disableItem( "RRS" );
                    //                            break;
                    //                        case "Netezza":
                    //                            propLayout.cells( "a" ).setHeight( 400 );
                    //                            
                    //                            typeCombo.addOption( "RDBMS", "RDBMS Global" );
                    //                            typeCombo.addOption( "Table", "Relational Table" );

                    //                            frmNewTDS.hideItem( "boxExtend" );
                    //                            frmNewTDS.showItem( "boxComp" );
                    //                            frmNewTDS.showItem( "boxWTO" );
                    //                            frmNewTDS.hideItem( "delBox" );
                    //                            frmNewTDS.showItem( "boxNetezza" );

                    //                            frmNewTDS.hideItem( "DSHostName" );
                    //                            frmNewTDS.hideItem( "DSPort" );
                    //                            frmNewTDS.hideItem( "DSaccept" );
                    //                            frmNewTDS.disableItem( "DSreconn" );
                    //                            frmNewTDS.disableItem( "RRS" );
                    //                            break;
                    //                    };
                    //                    break;
                    //                case "DStype":
                    //                    var operCombo = frmNewTDS.getCombo( "DSOperationType" );
                    //                    operCombo.clearAll();
                    //                    frmNewTDS.setItemValue( "DSOperationType", "" );
                    //                    switch ( value )
                    //                    {
                    //                        case "File":
                    //                            operCombo.addOption( "Insert", "Insert" );
                    //                            frmNewTDS.hideItem( "DSHostName" );
                    //                            frmNewTDS.hideItem( "DSPort" );
                    //                            break;
                    //                        case "MQS":
                    //                            operCombo.addOption( "Insert", "Insert" );
                    //                            frmNewTDS.hideItem( "DSHostName" );
                    //                            frmNewTDS.hideItem( "DSPort" );
                    //                            break;
                    //                        case "JMS":
                    //                            operCombo.addOption( "Insert", "Insert" );
                    //                            frmNewTDS.hideItem( "DSHostName" );
                    //                            frmNewTDS.hideItem( "DSPort" );
                    //                            break;
                    //                        case "TCP":
                    //                            operCombo.addOption( "Insert", "Insert" );
                    //                            frmNewTDS.showItem( "DSHostName" );
                    //                            frmNewTDS.showItem( "DSPort" );
                    //                            break;
                    //                        case "RDBMS":
                    //                            operCombo.addOption( "Insert", "Insert" );
                    //                            operCombo.addOption( "Change", "Change" );
                    //                            frmNewTDS.hideItem( "DSHostName" );
                    //                            frmNewTDS.hideItem( "DSPort" );
                    //                            break;
                    //                        case "Table":
                    //                            operCombo.addOption( "Insert", "Insert" );
                    //                            operCombo.addOption( "Change", "Change" );
                    //                            frmNewTDS.hideItem( "DSHostName" );
                    //                            frmNewTDS.hideItem( "DSPort" );
                    //                            break;
                    //                        case "IMS":
                    //                            operCombo.addOption( "Insert", "Insert" );
                    //                            operCombo.addOption( "Change", "Change" );
                    //                            frmNewTDS.hideItem( "DSHostName" );
                    //                            frmNewTDS.hideItem( "DSPort" );
                    //                            break;
                    //                        case "VSAM":
                    //                            operCombo.addOption( "Insert", "Insert" );
                    //                            operCombo.addOption( "Change", "Change" );
                    //                            frmNewTDS.hideItem( "DSHostName" );
                    //                            frmNewTDS.hideItem( "DSPort" );
                    //                            break;
                    //                        default:
                    //                            break;
                    //                    };
            };
            return true;
        });

        frmNewTDS.attachEvent( "onChange", function ( name, value )
        {
//            dhtmlx.message( {
//                text: "onChange  name: " + name + "\nvalue: " + value,
//                expire: 5000
//            } );
//            IsSaved = false;
            switch ( name )
            {
//                case "DSformat":
//                    var typeCombo = frmNewTDS.getCombo( "DStype" );
//                    typeCombo.clearAll();
//                    frmNewTDS.setItemValue( "DStype", "" );
//                    switch ( value )
//                    {
//                        case "Binary":
//                            propLayout.cells( "a" ).setHeight( 400 );
//                            
//                            typeCombo.addOption( "File", "File" );
//                            typeCombo.addOption( "MQS", "MQ Series" );
//                            typeCombo.addOption( "JMS", "JMS" );
//                            typeCombo.addOption( "TCP", "TCP/IP" );
//                            typeCombo.addOption( "VSAM", "VSAM" );

//                            frmNewTDS.hideItem( "boxExtend" );
//                            frmNewTDS.hideItem( "boxComp" );
//                            frmNewTDS.hideItem( "boxWTO" );
//                            frmNewTDS.hideItem( "delBox" );
//                            frmNewTDS.hideItem( "boxNetezza" );

//                            frmNewTDS.hideItem( "DSHostName" );
//                            frmNewTDS.hideItem( "DSPort" );
//                            frmNewTDS.hideItem( "DSaccept" );
//                            frmNewTDS.disableItem( "DSreconn" );
//                            frmNewTDS.disableItem( "RRS" );
//                            break;
//                        case "Delimited":
//                            propLayout.cells( "a" ).setHeight( 450 );
//                            
//                            typeCombo.addOption( "File", "File" );
//                            typeCombo.addOption( "MQS", "MQ Series" );
//                            typeCombo.addOption( "JMS", "JMS" );
//                            typeCombo.addOption( "TCP", "TCP/IP" );

//                            frmNewTDS.hideItem( "boxExtend" );
//                            frmNewTDS.hideItem( "boxComp" );
//                            frmNewTDS.hideItem( "boxWTO" );
//                            frmNewTDS.showItem( "delBox" );
//                            frmNewTDS.hideItem( "boxNetezza" );

//                            frmNewTDS.hideItem( "DSHostName" );
//                            frmNewTDS.hideItem( "DSPort" );
//                            frmNewTDS.hideItem( "DSaccept" );
//                            frmNewTDS.disableItem( "DSreconn" );
//                            frmNewTDS.disableItem( "RRS" );
//                            break;
//                        case "XML":
//                            propLayout.cells( "a" ).setHeight( 400 );
//                            
//                            typeCombo.addOption( "File", "File" );
//                            typeCombo.addOption( "MQS", "MQ Series" );
//                            typeCombo.addOption( "JMS", "JMS" );
//                            typeCombo.addOption( "TCP", "TCP/IP" );

//                            frmNewTDS.hideItem( "boxExtend" );
//                            frmNewTDS.hideItem( "boxComp" );
//                            frmNewTDS.hideItem( "boxWTO" );
//                            frmNewTDS.hideItem( "delBox" );
//                            frmNewTDS.hideItem( "boxNetezza" );

//                            frmNewTDS.hideItem( "DSHostName" );
//                            frmNewTDS.hideItem( "DSPort" );
//                            frmNewTDS.hideItem( "DSaccept" );
//                            frmNewTDS.disableItem( "DSreconn" );
//                            frmNewTDS.disableItem( "RRS" );
//                            break;
//                        case "Relational":
//                            propLayout.cells( "a" ).setHeight( 400 );
//                           
//                            typeCombo.addOption( "RDBMS", "RDBMS Global" );
//                            typeCombo.addOption( "Table", "Relational Table" );

//                            frmNewTDS.hideItem( "boxExtend" );
//                            frmNewTDS.showItem( "boxComp" );
//                            frmNewTDS.showItem( "boxWTO" );
//                            frmNewTDS.hideItem( "delBox" );
//                            frmNewTDS.hideItem( "boxNetezza" );

//                            frmNewTDS.hideItem( "DSHostName" );
//                            frmNewTDS.hideItem( "DSPort" );
//                            frmNewTDS.hideItem( "DSaccept" );
//                            frmNewTDS.disableItem( "DSreconn" );
//                            frmNewTDS.disableItem( "RRS" );
//                            break;
//                        case "UTSCDC":
//                            propLayout.cells( "a" ).setHeight( 400 );
//                            
//                            typeCombo.addOption( "MQS", "MQ Series" );
//                            typeCombo.addOption( "JMS", "JMS" );

//                            frmNewTDS.showItem( "boxExtend" );
//                            frmNewTDS.showItem( "boxComp" );
//                            frmNewTDS.showItem( "boxWTO" );
//                            frmNewTDS.hideItem( "delBox" );
//                            frmNewTDS.hideItem( "boxNetezza" );

//                            frmNewTDS.hideItem( "DSHostName" );
//                            frmNewTDS.hideItem( "DSPort" );
//                            frmNewTDS.hideItem( "DSaccept" );
//                            frmNewTDS.disableItem( "DSreconn" );
//                            frmNewTDS.disableItem( "RRS" );
//                            if ( typeCombo.getSelectedValue() == "CDCStore" )
//                            {
//                                frmNewTDS.enableItem( "DSaccept" );
//                            };
//                            break;
//                        case "DB2CDC":
//                            propLayout.cells( "a" ).setHeight( 400 );
//                            
//                            typeCombo.addOption( "MQS", "MQ Series" );
//                            typeCombo.addOption( "JMS", "JMS" );

//                            frmNewTDS.showItem( "boxExtend" );
//                            frmNewTDS.showItem( "boxComp" );
//                            frmNewTDS.showItem( "boxWTO" );
//                            frmNewTDS.hideItem( "delBox" );
//                            frmNewTDS.hideItem( "boxNetezza" );

//                            frmNewTDS.hideItem( "DSHostName" );
//                            frmNewTDS.hideItem( "DSPort" );
//                            frmNewTDS.hideItem( "DSaccept" );
//                            frmNewTDS.enableItem( "DSreconn" );
//                            frmNewTDS.disableItem( "RRS" );
//                            break;
//                        case "IMSCDC":
//                            propLayout.cells( "a" ).setHeight( 400 );
//                            
//                            typeCombo.addOption( "MQS", "MQ Series" );
//                            typeCombo.addOption( "JMS", "JMS" );

//                            frmNewTDS.showItem( "boxExtend" );
//                            frmNewTDS.showItem( "boxComp" );
//                            frmNewTDS.showItem( "boxWTO" );
//                            frmNewTDS.hideItem( "delBox" );
//                            frmNewTDS.hideItem( "boxNetezza" );

//                            frmNewTDS.hideItem( "DSHostName" );
//                            frmNewTDS.hideItem( "DSPort" );
//                            frmNewTDS.hideItem( "DSaccept" );
//                            frmNewTDS.enableItem( "DSreconn" );
//                            frmNewTDS.disableItem( "RRS" );
//                            break;
//                        case "VSAMCDC":
//                            propLayout.cells( "a" ).setHeight( 400 );
//                            
//                            typeCombo.addOption( "MQS", "MQ Series" );
//                            typeCombo.addOption( "JMS", "JMS" );

//                            frmNewTDS.showItem( "boxExtend" );
//                            frmNewTDS.showItem( "boxComp" );
//                            frmNewTDS.showItem( "boxWTO" );
//                            frmNewTDS.hideItem( "delBox" );
//                            frmNewTDS.hideItem( "boxNetezza" );

//                            frmNewTDS.hideItem( "DSHostName" );
//                            frmNewTDS.hideItem( "DSPort" );
//                            frmNewTDS.hideItem( "DSaccept" );
//                            frmNewTDS.enableItem( "DSreconn" );
//                            frmNewTDS.enableItem( "RRS" );
//                            break;
//                        case "OracleCDC":
//                            propLayout.cells( "a" ).setHeight( 400 );
//                            
//                            typeCombo.addOption( "MQS", "MQ Series" );
//                            typeCombo.addOption( "JMS", "JMS" );

//                            frmNewTDS.showItem( "boxExtend" );
//                            frmNewTDS.showItem( "boxComp" );
//                            frmNewTDS.showItem( "boxWTO" );
//                            frmNewTDS.hideItem( "delBox" );
//                            frmNewTDS.hideItem( "boxNetezza" );

//                            frmNewTDS.hideItem( "DSHostName" );
//                            frmNewTDS.hideItem( "DSPort" );
//                            frmNewTDS.hideItem( "DSaccept" );
//                            frmNewTDS.enableItem( "DSreconn" );
//                            frmNewTDS.disableItem( "RRS" );
//                            break;
//                        case "IMSDB":
//                            propLayout.cells( "a" ).setHeight( 400 );
//                            
//                            typeCombo.addOption( "IMS", "IMS" );

//                            frmNewTDS.hideItem( "boxExtend" );
//                            frmNewTDS.showItem( "boxComp" );
//                            frmNewTDS.showItem( "boxWTO" );
//                            frmNewTDS.hideItem( "delBox" );
//                            frmNewTDS.hideItem( "boxNetezza" );

//                            frmNewTDS.hideItem( "DSHostName" );
//                            frmNewTDS.hideItem( "DSPort" );
//                            frmNewTDS.hideItem( "DSaccept" );
//                            frmNewTDS.disableItem( "DSreconn" );
//                            frmNewTDS.disableItem( "RRS" );
//                            break;
//                        case "Netezza":
//                            propLayout.cells( "a" ).setHeight( 400 );
//                            
//                            typeCombo.addOption( "RDBMS", "RDBMS Global" );
//                            typeCombo.addOption( "Table", "Relational Table" );

//                            frmNewTDS.hideItem( "boxExtend" );
//                            frmNewTDS.showItem( "boxComp" );
//                            frmNewTDS.showItem( "boxWTO" );
//                            frmNewTDS.hideItem( "delBox" );
//                            frmNewTDS.showItem( "boxNetezza" );

//                            frmNewTDS.hideItem( "DSHostName" );
//                            frmNewTDS.hideItem( "DSPort" );
//                            frmNewTDS.hideItem( "DSaccept" );
//                            frmNewTDS.disableItem( "DSreconn" );
//                            frmNewTDS.disableItem( "RRS" );
//                            break;
//                    };
//                    break;
//                case "DStype":
//                    var operCombo = frmNewTDS.getCombo( "DSOperationType" );
//                    operCombo.clearAll();
//                    frmNewTDS.setItemValue( "DSOperationType", "" );
//                    switch ( value )
//                    {
//                        case "File":
//                            operCombo.addOption( "Insert", "Insert" );
//                            frmNewTDS.hideItem( "DSHostName" );
//                            frmNewTDS.hideItem( "DSPort" );
//                            break;
//                        case "MQS":
//                            operCombo.addOption( "Insert", "Insert" );
//                            frmNewTDS.hideItem( "DSHostName" );
//                            frmNewTDS.hideItem( "DSPort" );
//                            break;
//                        case "JMS":
//                            operCombo.addOption( "Insert", "Insert" );
//                            frmNewTDS.hideItem( "DSHostName" );
//                            frmNewTDS.hideItem( "DSPort" );
//                            break;
//                        case "TCP":
//                            operCombo.addOption( "Insert", "Insert" );
//                            frmNewTDS.showItem( "DSHostName" );
//                            frmNewTDS.showItem( "DSPort" );
//                            break;
//                        case "RDBMS":
//                            operCombo.addOption( "Insert", "Insert" );
//                            operCombo.addOption( "Change", "Change" );
//                            frmNewTDS.hideItem( "DSHostName" );
//                            frmNewTDS.hideItem( "DSPort" );
//                            break;
//                        case "Table":
//                            operCombo.addOption( "Insert", "Insert" );
//                            operCombo.addOption( "Change", "Change" );
//                            frmNewTDS.hideItem( "DSHostName" );
//                            frmNewTDS.hideItem( "DSPort" );
//                            break;
//                        case "IMS":
//                            operCombo.addOption( "Insert", "Insert" );
//                            operCombo.addOption( "Change", "Change" );
//                            frmNewTDS.hideItem( "DSHostName" );
//                            frmNewTDS.hideItem( "DSPort" );
//                            break;
//                        case "VSAM":
//                            operCombo.addOption( "Insert", "Insert" );
//                            operCombo.addOption( "Change", "Change" );
//                            frmNewTDS.hideItem( "DSHostName" );
//                            frmNewTDS.hideItem( "DSPort" );
//                            break;
//                        default:
//                            break;
//                    };
//                    break;
                case "DScomp":
                    if ( frmNewTDS.isItemChecked( "DScomp" ) )
                    {
                        frmNewTDS.uncheckItem( "DScompWarn" );
                        frmNewTDS.uncheckItem( "DSnoComp" );
                    };
                    break;
                case "DScompWarn":
                    if ( frmNewTDS.isItemChecked( "DScompWarn" ) )
                    {
                        frmNewTDS.uncheckItem( "DScomp" );
                        frmNewTDS.uncheckItem( "DSnoComp" );
                    };
                    break;
                case "DSnoComp":
                    if ( frmNewTDS.isItemChecked( "DSnoComp" ) )
                    {
                        frmNewTDS.uncheckItem( "DScomp" );
                        frmNewTDS.uncheckItem( "DScompWarn" );
                    };
                    break;
                default:
                    break;
            }
        } );

        frmNewTDS.attachEvent( "onAfterSave", function ( id, xml )
        {
            //        alert( 'On after save... what is sent to addNode' + '\n' + 'id = ' + id + '\n' + 'xml value: ' + xml + '\n' + 'tmpTPid (ndTPid): ' + tmpTPid + '\n' + 'tmpObjPid (ndObjPid): ' + tmpObjPid + '\n' + 'tmpObjName (ndName): ' + tmpObjName );

            // Add TDS Node (id is the New id that is auto assigned by MySQL),
            // This added as tabId in the MainTree and maintree table so dhtmlx dataprocessor can be used to make the SQL simple 
            addNode(tmpTPid, tmpObjPid, tmpObjName, 'objTDS', img, "loadCtlTDS", img, img, img, '', id);

            // Add Selection Nodes to Main Tree
            for ( var i = 0; i < $checklist.length; i++ )
            {
                if ( treeDesc.getUserData( $checklist[i], 'loadFunction' ) !== 'loadCtlFolder' )
                {
                    var selId = $checklist[i];
                    var $selId = new Array();
                    $selId = selId.split( '.' );
                    $selId = $selId.reverse();
                    var selname = $selId[1];
                    addNode( Pid + "." + frmNewTDS.getItemValue( 'DSname' ), Pid + "." + frmNewTDS.getItemValue( 'DSname' ), selname, 'objTDSsel', 'desc.gif', "loadCtlTDS", 'desc.gif', 'desc.gif', 'desc.gif', '', id );
                }
            }
        } );
    }
    catch ( err )
    {
        logError( err.message, err.name, "AddObj.js", "function addTDS( Pid, TPid )" );
    }
}
// ****************************************************************************************************************
function addMapProc( Pid, TPid )
{
    try
    {
        var tmpENV = getEnvName( Pid );
        var tmpSYS = getSysName( Pid );
        var tmpENG = getEngName( Pid );
        var tmpobjid;
        var checklist;
        var $checklist = new Array;

        var procStruct = [
	        { type: "settings", position: "label-left", labelWidth: 100, inputWidth: 180 },
	        { type: "fieldset", label: "Mapping Procedure", inputWidth: "auto", list: [
                    { name: "objid", type: "input", label: "objid", value: "", readonly: "true", required: true, hidden: true },
                    { name: "projName", type: "input", label: "Project Name", value: "", readonly: "true", hidden: true },
                    { name: "envName", type: "input", label: "Environment Name", value: "", readonly: "true", hidden: true },
                    { name: "sysName", type: "input", label: "System Name", value: "", readonly: "true", hidden: true },
			        { name: "engName", type: "input", label: "Engine Name", value: "", readonly: "true", hidden: true },
			        { name: "taskName", type: "input", label: "Procedure Name", value: "", required: true },
			        { name: "taskDesc", label: "Description", type: "input", inputWidth: "260", rows: "3", value: "" },
                    { name: "taskType", type: "input", label: "taskType", value: "MAP", readonly: "true", hidden: true },
			        { name: "taskSeqNo", type: "input", label: "taskSeqNo", value: "1", readonly: "false", hidden: true }
		        ]
	        },
	        { type: "fieldset", inputWidth: "auto", list: [
			        { name: "btnProcAdd", type: "button", value: "Add" },
			        { type: "newcolumn" },
			        { name: "btnProcClear", type: "button", value: "Clear" }
		        ]
	        }
        ];

    //    alert( "tmpENG: " + tmpENG );

        var propLayout = Tabbar_user_control.cells( "tabProp" ).attachLayout( "3T" );
        propLayout.cells( "a" ).setText( "Properties" );
        propLayout.cells( "a" ).setHeight( 250 );
        propLayout.cells( "b" ).setWidth( 250 );
    //    propLayout.cells( "c" ).setWidth( 220 );
        propLayout.cells( "b" ).setText( "Target Datastores" );
        propLayout.cells( "c" ).setText( "Source Datastores" );

    //    alert( "tmpENG2: " + tmpENG );
        // Add Proc form
        var frmNewProc = propLayout.cells( "a" ).attachForm( procStruct );
        var mydp = new dataProcessor( "../Studio/php/addProc.php" );
        mydp.init( frmNewProc );
        frmNewProc.setItemValue("projName", getProjName(Pid));
        frmNewProc.setItemValue("envName", getEnvName(Pid));
        frmNewProc.setItemValue("sysName", getSysName(Pid));
        frmNewProc.setItemValue("engName", getEngName(Pid));

    //    alert( "tmpENG3: " + tmpENG );
        // Add Targets Tree
        var treeTGT = propLayout.cells( "b" ).attachTree();
    //    treeTGT.deleteChildItems( '0' );
    //    treeTGT.deleteItem( '0' );
        treeTGT.setSkin( 'dhx_skyblue' );
        treeTGT.setImagePath( '../Studio/data/SQDimgs/' );
    //    treeTGT.enableDragAndDrop( '1', true );
    //    treeTGT.enableMercyDrag( '1' );
        treeTGT.enableTreeImages( true );
        treeTGT.enableItemEditor( false );
        treeTGT.enableTreeLines( true );
        treeTGT.enableCheckBoxes( true, false );

    //    alert( "tmpENG4: " + tmpENG );
        //load targets tree
        jQuery.ajax( {
            type: 'POST',  //type of request  GET or POST
            url: '../Studio/php/GetProcDStrees.php', // url to which the request is send
            data: { projName: CURproj,
                envName: tmpENV,
                sysName: tmpSYS,
                engName: tmpENG,
                DSdir: "T",
                icontype: "TDS.gif"
            }, // data to be sent to server
            success: function ( return_data )  // function to be called if the request succeeds
            {
    //            alert( "Before Tree load data: " + return_data );
                treeTGT.loadXMLString( return_data, function ()  // load tree with return data XML
                {
                    propLayout.progressOff();
                    //                alert( "After Tree load data: " + return_data );
                    treeTGT.openAllItems( '0' );
                } );
            },
            error: function ()
            {
                //function to be called if the request fail
                propLayout.progressOff();
                alert( 'error' );
            }
        } );  // end ajax

        // Add Sources Tree
        var treeSRC = propLayout.cells( "c" ).attachTree();
    //    treeSRC.deleteChildItems( '0' );
    //    treeSRC.deleteItem( '0' );
        treeSRC.setSkin( 'dhx_skyblue' );
        treeSRC.setImagePath( '../Studio/data/SQDimgs/' );
    //    treeSRC.enableDragAndDrop( '1', true );
    //    treeSRC.enableMercyDrag( '1' );
        treeSRC.enableTreeImages( true );
        treeSRC.enableItemEditor( false );
        treeSRC.enableTreeLines( true );
        treeSRC.enableCheckBoxes( true, false );

        // load sources tree
        jQuery.ajax( {
            type: 'POST',  //type of request  GET or POST
            url: '../Studio/php/GetProcDStrees.php', // url to which the request is send
            data: { projName: CURproj,
                envName: tmpENV,
                sysName: tmpSYS,
                engName: tmpENG,
                DSdir: "S",
                icontype: "SDS.gif"
            }, // data to be sent to server
            success: function ( return_data )  // function to be called if the request succeeds
            {
                //            alert( "Before Tree load data: " + return_data );
                treeSRC.loadXMLString( return_data, function ()  // load tree with return data XML
                {
                    propLayout.progressOff();
                    //                alert( "After Tree load data: " + return_data );
                    treeSRC.openAllItems( '0' );
                } );
            },
            error: function ()
            {
                //function to be called if the request fail
                propLayout.progressOff();
                alert( 'error' );
            }
        } );  // end ajax

        // Button click events
        frmNewProc.attachEvent( "onButtonClick", function ( id )
        {
            if ( id == 'btnProcAdd' )
            {
                frmNewProc.disableItem( "btnProcAdd" );
                frmNewProc.setItemValue( "objid", Pid + "." + frmNewProc.getItemValue( 'taskName' ) );
                
                frmNewProc.setItemValue( "taskType", "MAP" );
                //            frmNewProc.setItemValue( "taskSeqNo", "1" );
                //            objid, projName, envName, taskName, taskType, taskSeqNo, taskDesc
                tmpObjName = frmNewProc.getItemValue( 'taskName' );
                tmpObjPid = Pid;
                tmpTPid = TPid;
                tmpobjid = Pid + "." + frmNewProc.getItemValue( 'taskName' );

                if ( frmNewProc.validate() )
                {
                    // save target datastores to metadata
                    checklist = treeTGT.getAllCheckedBranches();
                    //            alert( "checklist: " + checklist.toString() );
                    $checklist = checklist.split( "," );
                    for ( var i = 0; i < $checklist.length; i++ )
                    {
    //                    alert( "$checklist[i]  : " + $checklist[i] );
                        var tmpTDSname = treeTGT.getItemText($checklist[i]);
                        var img = treeTGT.getItemImage($checklist[i], 0);

//                        alert("img  : " + img);

                        jQuery.ajax( {
                            type: 'POST',  //type of request  GET or POST
                            url: '../Studio/php/addTaskDS.php', // url to which the request is send
                            data: { objid: tmpobjid,
                                projName: CURproj,
                                envName: tmpENV,
                                sysName: tmpSYS,
                                engName: tmpENG,
                                taskName: tmpObjName,
                                DSname: tmpTDSname,
                                taskType: "MAP",
                                DSdir: "T",
                                DSimage: img
                            }, // data to be sent to server
                            success: function ( return_data )  // function to be called if the request succeeds
                            {
                                //            alert( "Before Tree load data: " + return_data );
                                propLayout.progressOff();
                            },
                            error: function ()
                            {
                                //function to be called if the request fail
                                propLayout.progressOff();
                                alert( 'error' );
                            }
                        } );  // end ajax
                    };

                    // save source datastores to metadata
                    checklist = treeSRC.getAllCheckedBranches();
                    //            alert( "checklist: " + checklist.toString() );
                    $checklist = checklist.split( "," );
                    for ( var j = 0; j < $checklist.length; j++ )
                    {
    //                    alert( "$checklist[i]  : " + $checklist[i] );
                        var tmpSDSname = treeSRC.getItemText( $checklist[j] );
                        var img = treeSRC.getItemImage($checklist[j], 0);

                        //                        alert("img  : " + img);

                        jQuery.ajax( {
                            type: 'POST',  //type of request  GET or POST
                            url: '../Studio/php/addTaskDS.php', // url to which the request is send
                            data: { objid: tmpobjid,
                                projName: CURproj,
                                envName: tmpENV,
                                sysName: tmpSYS,
                                engName: tmpENG,
                                taskName: tmpObjName,
                                DSname: tmpSDSname,
                                taskType: "MAP",
                                DSdir: "S",
                                DSimage: img
                            }, // data to be sent to server
                            success: function ( return_data )  // function to be called if the request succeeds
                            {
                                //            alert( "Before Tree load data: " + return_data );
                                propLayout.progressOff();
                            },
                            error: function ()
                            {
                                //function to be called if the request fail
                                propLayout.progressOff();
                                alert( 'error' );
                            }
                        } );  // end ajax
                    };

                    // save form data
                    frmNewProc.save();
                }
            }
            else if ( id == 'btnProcClear' )
            {
                frmNewProc.reset();
                addMapProc( Pid, TPid );
            }
        } );
        frmNewProc.attachEvent( "onAfterSave", function ( id, xml )
        {

            //                       alert( 'On after save... what is sent to addNode' + '\n' + 'id = ' + id + '\n' + 'xml value: ' + xml + '\n' + 'tmpTPid (ndTPid): ' + tmpTPid + '\n' + 'tmpObjPid (ndObjPid): ' + tmpObjPid + '\n' + 'tmpObjName (ndName): ' + tmpObjName );

            // This added as tabId in the MainTree and maintree table so dhtmlx dataprocessor can be used to make the SQL simple 
            addNode( tmpTPid, tmpObjPid, tmpObjName, 'objProc', 'Proc.gif', "loadCtlProc", 'Proc.gif', 'Proc.gif', 'Proc.gif', '', id );
        } );
    }
    catch ( err )
    {
        logError( err.message, err.name, "AddObj.js", "function addMapProc( Pid, TPid )" );
    }
}
// ****************************************************************************************************************
function addLogicProc( Pid, TPid, LProcType )
{
    try
    {
        var tmpENV = getEnvName( Pid );
        var tmpSYS = getSysName( Pid );
        var tmpENG = getEngName( Pid );
        var tmpobjid;
        var checklist;
        var $checklist = new Array;

        var procStruct = [
	        { type: "settings", position: "label-left", labelWidth: 100, inputWidth: 180 },
	        { type: "fieldset", label: "Mapping Procedure", inputWidth: "auto", list: [
                    { name: "objid", type: "input", label: "objid", value: "", readonly: "true", required: true, hidden: true },
                    { name: "projName", type: "input", label: "Project Name", value: "", readonly: "true", hidden: true },
                    { name: "envName", type: "input", label: "Environment Name", value: "", readonly: "true", hidden: true },
                    { name: "sysName", type: "input", label: "System Name", value: "", readonly: "true", hidden: true },
			        { name: "engName", type: "input", label: "Engine Name", value: "", readonly: "true", hidden: true },
			        { name: "taskName", type: "input", label: "Procedure Name", value: "", required: true },
			        { name: "taskDesc", label: "Description", type: "input", inputWidth: "260", rows: "3", value: "" },
                    { name: "taskType", type: "input", label: "taskType", value: "Logic", readonly: "true", hidden: true },
			        { name: "taskSeqNo", type: "input", label: "taskSeqNo", value: "1", readonly: "false", hidden: true }
		        ]
	        },
	        { type: "fieldset", inputWidth: "auto", list: [
			        { name: "btnProcAdd", type: "button", value: "Add" },
			        { type: "newcolumn" },
			        { name: "btnProcClear", type: "button", value: "Clear" }
		        ]
	        }
        ];

        var propLayout = Tabbar_user_control.cells( "tabProp" ).attachLayout( "2E" );
        propLayout.cells( "a" ).setText( "Properties" );
        propLayout.cells( "a" ).setHeight( 250 );
    //    propLayout.cells( "b" ).setWidth( 220 );
        //    propLayout.cells( "c" ).setWidth( 220 );
    //    propLayout.cells( "b" ).setText( "Target Datastores" );
        propLayout.cells( "b" ).setText( "Source Datastores" );
        var frmNewProc = propLayout.cells( "a" ).attachForm( procStruct );
        var mydp = new dataProcessor( "../Studio/php/addProc.php" );
        mydp.init( frmNewProc );

        // Add Sources Tree
        var treeSRC = propLayout.cells( "b" ).attachTree();
        treeSRC.deleteChildItems( '0' );
        treeSRC.deleteItem( '0' );
        treeSRC.setSkin( 'dhx_skyblue' );
        treeSRC.setImagePath( '../Studio/data/SQDimgs/' );
        treeSRC.enableDragAndDrop( '1', true );
        treeSRC.enableMercyDrag( '1' );
        treeSRC.enableTreeImages( true );
        treeSRC.enableItemEditor( false );
        treeSRC.enableTreeLines( true );
        treeSRC.enableCheckBoxes( true, true );
        // load sources tree
        jQuery.ajax( {
            type: 'POST',  //type of request  GET or POST
            url: '../Studio/php/GetProcDStrees.php', // url to which the request is send
            data: { projName: CURproj,
                envName: tmpENV,
                sysName: tmpSYS,
                engName: tmpENG,
                DSdir: "S",
                icontype: "SDS.gif"
            }, // data to be sent to server
            success: function ( return_data )  // function to be called if the request succeeds
            {
                //            alert( "Before Tree load data: " + return_data );
                treeSRC.loadXMLString( return_data, function ()  // load tree with return data XML
                {
                    main_layout.progressOff();
                    //                alert( "After Tree load data: " + return_data );
                    treeSRC.openAllItems( '0' );
                } );
            },
            error: function ()
            {
                //function to be called if the request fail
                main_layout.progressOff();
                alert( 'error' );
            }
        } );  // end ajax

        // Button click events
        frmNewProc.attachEvent( "onButtonClick", function ( id )
        {
            if ( id == 'btnProcAdd' )
            {
                frmNewProc.disableItem( "btnProcAdd" );
                frmNewProc.setItemValue( "objid", Pid + "." + frmNewProc.getItemValue( 'taskName' ) );
                frmNewProc.setItemValue( "projName", getProjName( Pid ) );
                frmNewProc.setItemValue( "envName", getEnvName( Pid ) );
                frmNewProc.setItemValue( "sysName", getSysName( Pid ) );
                frmNewProc.setItemValue( "engName", getEngName( Pid ) );
                frmNewProc.setItemValue( "taskType", LProcType );
                //            frmNewProc.setItemValue( "taskSeqNo", "1" );
                //            objid, projName, envName, taskName, taskType, taskSeqNo, taskDesc
                tmpObjName = frmNewProc.getItemValue( 'taskName' );
                tmpObjPid = Pid;
                tmpTPid = TPid;
                tmpobjid = Pid + "." + frmNewProc.getItemValue( 'taskName' );

                if ( frmNewProc.validate() )
                {
                    // save source datastores to metadata
                    checklist = treeSRC.getAllCheckedBranches();
                    //            alert( "checklist: " + checklist.toString() );
                    $checklist = checklist.split( "," );

                    for ( var i = 0; i < $checklist.length; i++ )
                    {
                        var tmpSDSname = treeSRC.getItemText($checklist[i]);
                        var img = treeSRC.getItemImage($checklist[i], 0);

                        jQuery.ajax( {
                            type: 'POST',  //type of request  GET or POST
                            url: '../Studio/php/addTaskDS.php', // url to which the request is send
                            data: { objid: tmpobjid,
                                projName: CURproj,
                                envName: tmpENV,
                                sysName: tmpSYS,
                                engName: tmpENG,
                                taskName: tmpObjName,
                                DSname: tmpSDSname,
                                taskType: LProcType,
                                DSdir: "S",
                                DSimage: img
                            }, // data to be sent to server
                            success: function ( return_data )  // function to be called if the request succeeds
                            {
                                //            alert( "Before Tree load data: " + return_data );
                                //propLayout.progressOff();
                            },
                            error: function ()
                            {
                                //function to be called if the request fail
                                propLayout.progressOff();
                                alert( 'error' );
                            }
                        } );  // end ajax
                    };

                    // save form data
                    frmNewProc.save();
                };
                propLayout.progressOff();
            }
            else if ( id == 'btnProcClear' )
            {
                frmNewProc.reset();
                addLogicProc( Pid, TPid, LProcType );
            }
        } );
        frmNewProc.attachEvent( "onAfterSave", function ( id, xml )
        {

            //                       alert( 'On after save... what is sent to addNode' + '\n' + 'id = ' + id + '\n' + 'xml value: ' + xml + '\n' + 'tmpTPid (ndTPid): ' + tmpTPid + '\n' + 'tmpObjPid (ndObjPid): ' + tmpObjPid + '\n' + 'tmpObjName (ndName): ' + tmpObjName );

            // Add Variable Node (id is the New id that is auto assigned by MySQL),
            // This added as tabId in the MainTree and maintree table so dhtmlx dataprocessor can be used to make the SQL simple 
            var iconIn;
            if ( LProcType == "Main" )
            {
                iconIn = "72.gif";
            }
            else
            {
                iconIn = "Crop.gif";
            };
            addNode( tmpTPid, tmpObjPid, tmpObjName, 'objMain', iconIn, "loadCtlMain", iconIn, iconIn, iconIn, '', id );
        } );
    }
    catch ( err )
    {
        logError( err.message, err.name, "AddObj.js", "function addLogicProc( Pid, TPid, LProcType )" );
    }
}
// ****************************************************************************************************************
function addInclProc( Pid, TPid, IProcType )
{
    try
    {
        alert( 'Under Construction' );
    }
    catch ( err )
    {
        logError( err.message, err.name, "AddObj.js", "function addInclProc( Pid, TPid, IProcType )" );
    }
}

// ****************************************************************************************************************
function addCOBOLDesc(  Pid, TPid, Direction )
{
    try
    {
        //    alert( 'Under Construction' );
        var Descfile = "";
        var Descname = "";
        var ProjName = getProjName(Pid);
        var EnvName = getEnvName(Pid);
        var xmlDescpath = "";
        var dTypePre = "";
        var sqdType = Direction + "DBDDesc";  //"obj" + 
        var $files = new Array;
        var $segments = new Array;
        var RetArr = new Array;
        var today = new Date();
        var tabId = "";
        var objPar = Pid;
        var varDBDfile = "";
        var varDBDname = "";
        var cobName = "";
        var xmlCOBpath = "";
        var segmentid = "";
        var segmentName = "";
        var xmlDoc;
        var dbdName = "";
        var LastSeqNum = 0;
        var cobId = "";
        var dbName = "";
        var firstParFld = "";
        var recId = "";
        var recName = "";
        var recAlias = "";

        // Description form JSON
        var COBstruct = [
	            { type: "settings", position: "label-left", labelAlign: "left", labelWidth: "90", inputWidth: "180", offsetLeft: "0" },
                { name: "dbdComboSet", type: "fieldset", label: "Previously Uploaded DBD Files", inputWidth: "auto", list: [
                    { name: "dbdCombo", type: "combo", inputWidth: 220, label: "Select DBD", connector: "../Studio/php/comboDBD.php" }
                ]
                },
	            { name: "dbdUpload", type: "fieldset", label: "DBD File Upload", inputWidth: "auto", list: [{
	                    type: "upload",
	                    name: "myFilesDBD",
	                    inputWidth: 330,
	                    url: "php/dhtmlxform_item_upload.php",
	                    autoStart: true,
                        titleText: "Click here to select DBD for upload",
	                    _swfLogs: "enabled",
	                    swfPath: "../Studio/dhtmlxSuite/dhtmlxForm/codebase/ext/uploader.swf",
	                    swfUrl: "../Studio/php/dhtmlxform_item_upload.php"
	                }]
	            },
                { type: "fieldset", name: "btnImportDBDset", label: "Click to import DBD File", inputWidth: "auto", offsetLeft: "0", list: [
		                { name: "btnImportDBD", type: "button", width: "80", value: "Import" }
	            ]
	            },
	            { name: "CopyUpload", type: "fieldset", label: "COBOL Copybook Upload", inputWidth: "auto", offsetLeft: "0", disabled: true, list: [{
	                    type: "upload",
	                    name: "myFiles",
	                    inputWidth: 330,
	                    url: "php/dhtmlxform_item_upload.php",
	                    autoStart: true,
	                    titleText: "Click here to select COBOL Copybook for upload",
	                    _swfLogs: "enabled",
	                    swfPath: "../Studio/dhtmlxSuite/dhtmlxForm/codebase/ext/uploader.swf",
	                    swfUrl: "../Studio/php/dhtmlxform_item_upload.php"
	                }]
	            },
                { name: "ImportBtn", type: "fieldset", label: "Click to import Copybook", inputWidth: "auto", offsetLeft: "0", disabled: true, list: [
		                { name: "btnImport", type: "button", width: "80", value: "Import" }
	            ]
                }
            ];
        
        var propLayout = Tabbar_user_control.cells( "tabProp" ).attachLayout( "2U" );
        propLayout.cells( "a" ).setText( "Properties" );
        propLayout.cells( "a" ).setHeight( 362 );
        propLayout.cells( "a" ).setWidth( 400 );
        propLayout.cells( "b" ).setText( "Segments" );
        //    propLayout.cells( "c" ).setText( "Field Properties" );

        // Add Segment tree to Layout
        var ctlPropSegmentTree = propLayout.cells( "b" ).attachTree();
        ctlPropSegmentTree.deleteChildItems( '0' );
        ctlPropSegmentTree.deleteItem( '0' );
        //    ctlPropSegmentTree.enableCheckBoxes( true, true );
        ctlPropSegmentTree.setSkin( 'dhx_skyblue' );
        ctlPropSegmentTree.setImagePath('../Studio/data/SQDimgs/');

        // Events for Segment tree
        ctlPropSegmentTree.attachEvent( "onSelect", function ( id )
        {
            segmentid = ctlPropSegmentTree.getSelectedItemId();
            segmentName = ctlPropSegmentTree.getSelectedItemText();
            segmentName = toStrNTrim( segmentName );
            // alert( 'segmentName = ' + segmentName );

        } );

        // Add form to Layout
        var frmNewCOB = propLayout.cells( "a" ).attachForm( COBstruct );
        frmNewCOB.setFontSize( '11px' );

    //    var mydp = new dataProcessor( "../Studio/php/addCOBdesc.php" );
    //    mydp.init( frmNewCOB );
        frmNewCOB.attachEvent( "onUploadFile", function ( realName, serverName )
        {
            if ( frmNewCOB.isItemEnabled( "btnImportDBD" ) )
            {
                varDBDfile = serverName;
            }
            else
            {
                $files.push( serverName );
            }
        
    //        alert( "<b>onUploadFile</b>, real name: " + realName + ", server name: " + serverName );

        });

        frmNewCOB.attachEvent( "onChange", function ( name, value )
        {
//            alert( "onChange\nname: " + name + "\nvalue:" + value );

            if ( name == "dbdCombo" )
            {
                dbdName = value.trim();
                xmlDescpath = "/SQDATA/Studio/temp/SD" + dbdName + ".xml";  //xmlDescpath

                //                alert( "onChangePost\nProjName: " + ProjName + "\nEnvName :" + EnvName + "\ndbdName: " + dbdName + "\ndType: " + "IMSDBD" );

                jQuery.ajax( {
                    type: 'POST',  //type of request  GET or POST
                    url: '../Studio/php/getDBD.php', // url to which the request is send
                    data: { projName: ProjName,
                        envName: EnvName,
                        descName: dbdName,
                        descType: Direction + "IMSDBD"
                    }, // data to be sent to server
                    async: false,
                    success: function ( return_data )
                    {
//                        alert( "return_data: " + return_data );
                        ret = JSON.parse( return_data );
                        Descfile = ret.fpath2;
//                        alert( "Descfile: " + Descfile );
                    },
                    error: function ()
                    {
                        //function to be called if the request fail
                        propLayout.progressOff();
                        alert('Ajax error, getDBD.php');
                    }
                } );
                loadSegTree(ProjName, EnvName, dbdName, Direction + "IMSDBD");
                frmNewCOB.disableItem( "dbdUpload" );
                frmNewCOB.disableItem( "btnImportDBD" );
                //                frmNewCOB.disableItem("btnImportDBDset");
                frmNewCOB.enableItem( "CopyUpload" );
                frmNewCOB.enableItem( "ImportBtn" );
            };
        } );

        frmNewCOB.attachEvent( "onButtonClick", function ( id )
        {
            if ( id == 'btnImportDBD' )
            {
                //                alert( 'Import DBD: ' + varDBDfile );
                frmNewCOB.disableItem( "btnImportDBD" );
                frmNewCOB.disableItem( "dbdUpload" );
                // Import dbd file
                propLayout.progressOn();
                dTypePre = "dbd";
                var addDescfldnode = false;
                Descfile = varDBDfile;
                var tempArr = varDBDfile.split( "." );
                Descname = tempArr[0];
                dbdName = Descname;
                var NewId = Pid + "." + Descname + "." + Direction + "DBDDesc";
//                var ProjName = getProjName( Pid );
//                var EnvName = getEnvName( Pid );
                var dType = Direction + "IMSDBD"; // Type sent to Importer

                //                alert( 'Import Description File: ' + Descfile + '\n' + 'Desc Name: ' + Descname + '\n' + 'Desc Type: ' + dType + '\n' + 'Desc Pre: ' + dTypePre );

                // First check to see if the DBD already exists in the Descriptions Table
                jQuery.ajax( {
                    type: 'POST',  //type of request  GET or POST
                    url: '../Studio/php/chkDesc.php', // url to which the request is send
                    data: { projName: ProjName,
                        envName: EnvName,
                        descName: Descname,
                        descType: dType
                    }, // data to be sent to server
                    async: false,
                    success: function ( return_data )
                    {
//                        alert('return_data chkDesc : ' + return_data);

                        if ( return_data == "" )
                        {
                            jQuery.ajax( {
                                type: 'POST',  //type of request  GET or POST
                                url: '../Studio/php/importDesc.php', // url to which the request is send
                                data: { Descfile: Descfile,
                                    DescName: Descname,
                                    DescType: dType,
                                    DescPre: dTypePre,
                                    dPre: "SD"
                                }, // data to be sent to server
                                async: false,
                                success: function ( return_data )
                                {
                                    //                                    alert( 'return_data importDesc : ' + return_data );
                                    if ( return_data != "false" )
                                    {

                                        xmlDescpath = return_data;
                                        // send xml path to function to convert it to Nested, Keyed arrays
                                        //                            var RetXML = "";
                                        if ( window.XMLHttpRequest )
                                        {// code for IE7+, Firefox, Chrome, Opera, Safari
                                            xmlhttp = new XMLHttpRequest();
                                        }
                                        else
                                        {// code for IE6, IE5
                                            xmlhttp = new ActiveXObject( "Microsoft.XMLHTTP" );
                                        }
                                        //                                        alert( "xmlDescpath = " + xmlDescpath );
                                        xmlhttp.open( "GET", xmlDescpath, false );
                                        xmlhttp.send();
                                        //                                        alert( 'xml ready state  : ' + xmlhttp.readyState + '\n' + 'xml status : ' + xmlhttp.status );
                                        if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 )
                                        {
                                            xmlDoc = xmlhttp.responseXML;
                                            // populate SegTable in DB
                                            // return Array of segment names
                                            AddSeg( xmlDoc, Descname, NewId, ProjName, EnvName, Descfile, dbName, dType );
                                        }
                                        else
                                        {
                                            propLayout.progressOff();
                                            alert( 'There was a failure reading XML' );
                                        }  // end if ready state
                                    }
                                    else
                                    {
                                        propLayout.progressOff();
                                        alert( 'There was a failure in the importer, duplicate file' );
                                    } /// end if return data no false
                                },
                                error: function ()
                                {
                                    //function to be called if the request fail
                                    propLayout.progressOff();
                                    alert( 'Ajax error, importDesc.php' );
                                }
                            } ); // end importer AJAX
                        }  // end if(return_data != "") 
                        else
                        {
                            xmlDescpath = "/SQDATA/Studio/temp/SD" + return_data + ".xml";
                        };
                        // *********************************************************************************
                        // DBD now either already existed or has been imported so now load the Segment tree
                        // *********************************************************************************
                        //                        alert( "makes it to DBD load" );
                        propLayout.progressOff();
                        //                        alert( "ProjName : " + ProjName + "\nDescname : " + Descname );
                        loadSegTree( ProjName, EnvName, Descname, dType );

                        frmNewCOB.enableItem( "CopyUpload" );
                        frmNewCOB.enableItem( "ImportBtn" );
                        //                        alert( "Please select a segment from the right\nbefore importing a copybook" );

                    },
                    error: function ()
                    {
                        //function to be called if the request fail
                        propLayout.progressOff();
                        alert( 'Ajax error, chkDesc.php' );
                    }
                } );  // end chk Descriptions for duplicates AJAX
            }
            else if ( id == 'btnImport' )
            {
                var cobFile = "";
//                alert('cobFile = ' + cobFile);
                propLayout.progressOn();
                for ( var y = 0; y < $files.length; y++ ) // DESCRIPTION LOOP
                {
                    // Import Description Files
                    var cobFile = $files[y];

//                    alert('cobFile = ' + cobFile);

                    dTypePre = "cob";
                    dType = Direction + "COBIMS";
                    addDescfldnode = false;
                    tempArr = cobFile.split( "." );
                    cobName = tempArr[0];
                    NewId = Pid + "." + cobName + "." + dType;
                    cobId = NewId;
                    ProjName = getProjName( Pid );
                    EnvName = getEnvName( Pid );

                    var segSrch = cobName.toUpperCase();
                    var segFnd = ctlPropSegmentTree.findItemIdByLabel( segSrch );

//                    alert( "Import DBD file: " + Descfile + "\nImport copybook: " + cobFile + "\nNewId: " + NewId + "\nsegSrch: " + segSrch + "\nsegFnd: " + segFnd + "\nsegmentid: " + segmentid );

                    if ( segFnd == null )
                    {
                        propLayout.progressOff();
                        if ( segmentid == "" )
                        {
                            alert( "Sorry, there is no segment named " + cobFile + " or " + segSrch + " in this segment Tree.\nPlease select a segment in the segment tree and try again" );
                            //                            MainTree.selectItem( TPid, true, false );
                            propLayout.progressOn();
                        };
                    }
                    else
                    {
                        segmentid = toStrNTrim( segFnd );
                        segmentName = segSrch;
                    };

                    if ( segmentid != "" )
                    {
                        frmNewCOB.disableItem( "CopyUpload" );
                        frmNewCOB.disableItem( "ImportBtn" );

                        jQuery.ajax( {
                            type: 'POST',  //type of request  GET or POST
                            url: '../Studio/php/importDesc.php', // url to which the request is send
                            data: { Descfile: cobFile,
                                DescName: cobName,
                                DescType: dType,
                                DescPre: dTypePre,
                                dPre: "SC"
                            }, // data to be sent to server
                            async: false,
                            success: function ( return_data )
                            {
//                                alert('importDesc.php   return_data : ' + return_data);

                                if ( return_data != "false" )
                                {

                                    xmlCOBpath = return_data;
                                    // send xml path to function to convert it to Nested, Keyed arrays
                                    //                            var RetXML = "";
                                    if ( window.XMLHttpRequest )
                                    {// code for IE7+, Firefox, Chrome, Opera, Safari
                                        xmlhttp = new XMLHttpRequest();
                                    }
                                    else
                                    {// code for IE6, IE5
                                        xmlhttp = new ActiveXObject( "Microsoft.XMLHTTP" );
                                    }
                                    //                                    alert( "xmlDescpath = " + xmlDescpath );
                                    xmlhttp.open( "GET", xmlCOBpath, false );
                                    xmlhttp.send();
                                    // alert( 'xml ready state  : ' + xmlhttp.readyState + '\n' + 'xml status : ' + xmlhttp.status );
                                    if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 )
                                    {
                                        xmlDoc = xmlhttp.responseXML;
                                        var arrRet = [];

                                        // add all the fields to the DescriptionFields Table
                                        arrRet = addFieldsToTables( xmlDoc, Descname, NewId, ProjName, EnvName, cobName, objPar, LastSeqNum, firstParFld, dType );

                                        LastSeqNum = arrRet[0];
                                        firstParFld = arrRet[1];

                                        // alert( "LastSeqNum = " + LastSeqNum + "\nfirstParFld = " + firstParFld );

                                        if ( LastSeqNum != 0 )
                                        {
                                            //                                    alert( "makes it here" );
                                            // add description to descriptions table 
                                            var tempRec = xmlDoc.getElementsByTagName("record")[0];
                                            var tempRecId = tempRec.getAttribute("id");
                                            var tempAtt = tempRec.getElementsByTagName("atom")[0];
                                            var tempRecName = tempAtt.childNodes[0].nodeValue;
                                            var tempRecAlias = "";
                                            recId = tempRecId;
                                            recName = tempRecName;
                                            recAlias = tempRecAlias;


                                            jQuery.ajax( {
                                                type: 'POST',  //type of request  GET or POST
                                                url: '../Studio/php/addDesc.php',
                                                data:
                                            {
                                                objid: NewId,
                                                projName: ProjName,
                                                envName: EnvName,
                                                descName: cobName,
                                                descType: dType,
                                                recId: recId,
                                                recName: recName,
                                                recAlias: recAlias,
                                                fpath1: cobFile,
                                                fpath2: Descfile,
                                                segName: segmentName,
                                                segId: segmentid,
                                                dbdName: dbdName,
                                                descDesc: "",
                                                CREATED_TIMESTAMP: today,
                                                UPDATED_TIMESTAMP: today
                                            },
                                                async: false,
                                                success: function ( data, status, xhr )
                                                {
//                                                    alert("Status: " + status + "\nReturn data (tabId): " + data + "\nxhr: " + xhr);

                                                    if ( status == 'success' )
                                                    {
                                                        //main_layout.progressOff();
                                                        
                                                        tabId = data;
                                                        // add description to descriptionselect table
                                                        jQuery.ajax( 
                                                        {
                                                            type: 'POST',
                                                            url: '../Studio/php/addDescSel.php',
                                                            data: {
                                                                objid: NewId,
                                                                projName: ProjName,
                                                                envName: EnvName,
                                                                descName: cobName,
                                                                selName: cobName,
                                                                isSysSel: "1",
                                                                selDesc: ""
                                                            },
                                                            async: false,
                                                            success: function ( return_data )
                                                            {
//                                                                 alert( 'return_data : ' + return_data );
                                                                if ( return_data != "false" )
                                                                {
                                                                    //main_layout.progressOff();
                                                                    // alert( "Status: " + status + "\nReturn data: " + data );

                                                                } else
                                                                {
                                                                    propLayout.progressOff();
                                                                    alert( "Error: " + status + "\nReturn data: " + data );
                                                                };
                                                            }
                                                        } );  // end AJAX  add description to descriptionselect table
                                                    }
                                                    else
                                                    {
                                                        propLayout.progressOff();
                                                        alert( "Error: " + status + "\nReturn data: " + data );
                                                    };
                                                }  // end success function
                                            } );
                                        }  // end if addFields return
                                    }   /// end ready state if
                                }   // end if return data
                                else
                                {
                                    alert( 'There was a failure in the importer, importDesc.php, for copybook' );
                                    propLayout.progressOff();
                                }
                            },
                            error: function ()
                            {
                                //function to be called if the request fail
                                propLayout.progressOff();
                                alert( 'Ajax request failure, importDesc.php' );
                            }
                        } );  // end XML ajax request
                        // ***************************************************************************
                        // Process additional fields in DBD when copybooks are chosen for each segment
                        // ***************************************************************************
                        // Last... Add extra fields and set keys from DBDfile
                        // send xml path to function to convert it to Nested, Keyed arrays
                        // var RetXML = "";
                        // alert( "segmentid = ~~~" + segmentid + "~~~" );

                        // alert( "segmentid = ~~~" + segmentid + "~~~" );


                        if ( window.XMLHttpRequest )
                        {// code for IE7+, Firefox, Chrome, Opera, Safari
                            xmlhttp = new XMLHttpRequest();
                        }
                        else
                        {// code for IE6, IE5
                            xmlhttp = new ActiveXObject( "Microsoft.XMLHTTP" );
                        }
//                        alert("xmlDescpath = " + xmlDescpath);

                        xmlhttp.open( "GET", xmlDescpath, false );
                        xmlhttp.send();

                        // alert( 'xml ready state  : ' + xmlhttp.readyState + '\n' + 'xml status : ' + xmlhttp.status );

                        if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 )
                        {
                            xmlDoc = xmlhttp.responseXML;

                            // alert( "segmentName = " + segmentName );

                            // ************************************************
                            // process each segment until the matching segment
                            var tempseg = "";
                            var numsegs = xmlDoc.getElementsByTagName( "segment" ).length;
                            var segTempName = "";
                            // Segment loop
                            for ( var x = 0; x < numsegs; x++ )
                            {
                                tempseg = xmlDoc.getElementsByTagName( "segment" )[x];
                                segTempName = tempseg.getAttribute( "id" );
                                segTempName = toStrNTrim( segTempName );

                                // alert( "segTempName = ~" + segTempName + "~\nsegmentName = ~" + segmentName + "~" );

                                if ( segTempName == segmentName )
                                {
                                    break;
                                }
                                else
                                {
                                    tempseg = null;
                                }
                            };   // end Find correct Segment loop

                            // if tempseg is not null then proceed to add keys, fields and parent segment key fields
                            if ( tempseg != null )
                            {
                                var numtempsegflds = tempseg.getElementsByTagName( "field" ).length;
                                var tempFldName = "";
                                var fieldAtt = [];
                                // Field loop   
                                for ( var z = 0; z < numtempsegflds; z++ )
                                {
                                    // get each field in the segment and store it's properties in an array,
                                    // then add field to array to insert or update in DescFieldsTable
                                    var tempFld = tempseg.getElementsByTagName( "field" )[z];

                                    if ( tempFld.parentNode == tempseg )
                                    {
                                        fieldAtt = [];

                                        tempFldName = tempFld.getAttribute( "id" );
                                        tempFldName = toStrNTrim( tempFldName );

                                        //                                    alert( "tempFldName = " + tempFldName );

                                        var numAtoms = tempFld.getElementsByTagName( "atom" ).length;

                                        // alert( "firstParFld = " + firstParFld );

                                        // parenNode = tempFld.parentNode;
                                        // var parenName = parenNode.getAttribute( "id" );
                                        fieldAtt['fldParent'] = firstParFld;
                                        var NewFldId = NewId + "." + tempFldName;
                                        fieldAtt['nchildren'] = numtempsegflds;
                                        fieldAtt['noccurs'] = "0";
                                        fieldAtt['noccno'] = "0";
                                        fieldAtt['nscale'] = "0";
                                        fieldAtt['nlevel'] = attVal;
                                        // preset these
                                        fieldAtt['iskey'] = "no";
                                        fieldAtt['canNull'] = "yes";
                                        /// Attribute Loop
                                        for ( var j = 0; j < numAtoms; j++ )
                                        {
                                            var att = tempFld.getElementsByTagName( "atom" )[j];
                                            var attName = att.getAttribute( "name" );
                                            var attVal = att.childNodes[0].nodeValue;

                                            // alert( "attName = " + attName + "\nattVal = " + attVal + "\natt.nextSibling = " + att.nextSibling );

                                            switch ( attName )
                                            {
                                                case 'TYPE':
                                                    fieldAtt['legType'] = attVal;
                                                    fieldAtt['dataType'] = attVal;
                                                    break;
                                                case 'NAME':
                                                    fieldAtt['fldID'] = toStrNTrim( attVal );
                                                    break;
                                                case 'START':
                                                    fieldAtt['noffset'] = attVal;
                                                    break;
                                                case 'KEY':
                                                    fieldAtt['iskey'] = "yes";
                                                    fieldAtt['canNull'] = "no";
                                                    break;
                                                case 'LEN':
                                                    fieldAtt['nlength'] = attVal;
                                                    // curOffset = curOffset + attVal;
                                                    break;
                                                default:
                                                    break;
                                            };    // end switch

                                            // alert( "field Name = " + tempFldName + '\n' + "attribute = " + attName + '\n' + "attribute Value = " + attVal );

                                            if ( att.nextSibling == null )
                                            {
                                                // alert( "break at next sibling == null?" );
                                                break;
                                            };
                                            var nextsib = att.nextSibling;
                                            if ( nextsib.tagName == "fld" )  // nextsib.getAttributeNode( "id" ) 
                                            {
                                                // alert( "break at next sibling has ID" );
                                                break;
                                            };
                                        };    // end Attribute Loop
                                        if ( fieldAtt['iskey'] == "no" )
                                        {
                                            //                                                // add Add fld to copybook in last place
                                            //                                                LastSeqNum = LastSeqNum + 1;
                                            //                                                fieldAtt['seqno'] = LastSeqNum;

                                            //                                                // alert( "add field = " + tempFldName );
                                            //                                                //                alert("breaks out of loop");
                                            //                                                jQuery.ajax( { type: 'POST',  //type of request  GET or POST
                                            //                                                    url: '../Studio/php/addDescField.php',
                                            //                                                    data: {
                                            //                                                        objid: NewFldId,
                                            //                                                        projName: ProjName,
                                            //                                                        envName: EnvName,
                                            //                                                        descName: cobName,
                                            //                                                        descId: NewId,
                                            //                                                        fldName: tempFldName,
                                            //                                                        parentName: fieldAtt['fldParent'],
                                            //                                                        seqno: fieldAtt['seqno'],
                                            //                                                        descFldDesc: "",
                                            //                                                        nchildren: fieldAtt['nchildren'],
                                            //                                                        nlevel: fieldAtt['nlevel'],
                                            //                                                        noccurs: fieldAtt['noccurs'],
                                            //                                                        noccno: fieldAtt['noccno'],
                                            //                                                        dataType: fieldAtt['dataType'],
                                            //                                                        legType: fieldAtt['legType'],
                                            //                                                        noffset: fieldAtt['noffset'],
                                            //                                                        nlength: fieldAtt['nlength'],
                                            //                                                        nscale: fieldAtt['nscale'],
                                            //                                                        canNull: fieldAtt['canNull'],
                                            //                                                        iskey: fieldAtt['iskey']
                                            //                                                    },
                                            //                                                    async: false,
                                            //                                                    success: function ( return_data )
                                            //                                                    {
                                            //                                                        // alert( 'addDescField.php    return_data : ' + return_data );
                                            //                                                        if ( return_data != "false" )
                                            //                                                        {
                                            //                                                            //propLayout.progressOff();
                                            //                                                            //                                                alert( "Return data: " + return_data );
                                            //                                                            // add field to descfldtree table
                                            //                                                            var ischecked = "0";
                                            //                                                            addDescfldnode = addDescFldNode( fieldAtt['fldParent'], objPar, tempFldName, 'FieldList.gif', 'FieldList.gif', 'FieldList.gif', 'FieldList.gif', ischecked, NewId, fieldAtt['seqno'] );
                                            //                                                        } else
                                            //                                                        {
                                            //                                                            propLayout.progressOff();
                                            //                                                            alert( "Error: " + status + "\nReturn data: " + data );
                                            //                                                            return false;
                                            //                                                        };       // end if/else
                                            //                                                    }      // end succes function
                                            //                                                } );    // end Ajax ADDdescField
                                        }
                                        else
                                        {
                                            // Update Key Field
                                            var NewfldId = cobId + "." + tempFldName;

                                            // alert( "update field Key for field = " + tempFldName + "\ncobId = " + cobId + "\nNewfldId = " + NewfldId + "\ncanNull: " + fieldAtt['canNull'] + "\nisKey: " + fieldAtt['iskey'] );
                                            jQuery.ajax( { type: 'POST',  //type of request  GET or POST
                                                url: '../Studio/php/updateKeyField.php',
                                                data: {
                                                    objid: NewFldId,
                                                    image: "105.gif",
                                                    canNull: fieldAtt['canNull'],
                                                    isKey: fieldAtt['iskey']
                                                },
                                                async: false,
                                                success: function ( return_data )
                                                {
                                                    // alert( "updateKeyField.php   return_data: " + return_data );
                                                }
                                            } );
                                        }
                                    }
                                };   // end Field loop

                                // alert( 'makes it to here' );
                                /// get tempseg Parent

                                var parseg = tempseg.parentNode;
                                if ( parseg != null && parseg.getAttribute( "id" ) != dbName )
                                {
                                    // go to function to recurse through parents
                                    // alert( "parseg.getAttribute( 'id' ) = " + parseg.getAttribute( "id" ) );
                                    if ( addParentKeys( parseg, LastSeqNum, NewId, dbName, ProjName, EnvName, cobName, firstParFld, dType ) )
                                    {
                                        // alert( "done with addParentKeys" );
                                    }
                                }
                                // alert( "finally finished" );
                            }; // end if tempseg not null
                        };  // end if http ready
                        //                    }; //end INNER if ( segmentid != "" )

                        // add description to maintree table
                        var tmpObjName = cobName;
                        var tmpObjPid = Pid;
                        var tmpTPid = TPid;
                        addNode(tmpTPid, tmpObjPid, tmpObjName, dType, 'desc.gif', 'loadCtlCOBOLDesc', 'desc.gif', 'desc.gif', 'desc.gif', '', tabId, false, dType, true);
                    };  //end if ( segmentid != "" )
                    segmentid = "";
                };  // end description loop
                propLayout.progressOff();
            };    // end btnImport
        } );                                      // end onButtonClick

        // *********************************************************************
        // Add Parent Key Fields PFK_keyfieldname
        function addParentKeys( parseg, LastSeqNum, NewId, dbName, ProjName, EnvName, cobName, firstParFld, dType )
        {
             // alert( "add parent fields" );

            var numtempsegflds = parseg.getElementsByTagName( "field" ).length;
            var tempFldName = "";
            var fieldAtt = [];
            // Field loop   
            for ( var z = 0; z < numtempsegflds; z++ )
            {
                // get each field in the segment and store it's properties in an array,
                // then add field to array to insert or update in DescFieldsTable
                var tempFld = parseg.getElementsByTagName( "field" )[z];

                 // alert( "tempFld.parentNode.getAttribute( 'id' ) = " + tempFld.parentNode.getAttribute( "id" ) +  "\nparseg.getAttribute( 'id' ) = " + parseg.getAttribute( "id" ));

                if ( tempFld.parentNode == parseg )
                {
                    fieldAtt = [];

                    tempFldName = tempFld.getAttribute( "id" );
                    tempFldName = toStrNTrim( tempFldName ); //  tempFldName = tempFldName.trim();

                    // alert( "tempFldName = " + tempFldName );

                    var numAtoms = tempFld.getElementsByTagName( "atom" ).length;

                    // alert( "numAtoms = " + numAtoms );

    //                parenNode = tempFld.parentNode;
    //                var parenName = parenNode.getAttribute( "id" );
                    fieldAtt['fldParent'] = firstParFld;
                    var NewFldId = NewId + "." + tempFldName;
                    fieldAtt['nchildren'] = numtempsegflds;
                    fieldAtt['noccurs'] = "0";
                    fieldAtt['noccno'] = "0";
                    fieldAtt['nscale'] = "0";
                    fieldAtt['nlevel'] = attVal;
                    fieldAtt['iskey'] = "no";
                    fieldAtt['canNull'] = "yes";
                    /// Attribute Loop
                    for ( var j = 0; j < numAtoms; j++ )
                    {
                        var att = tempFld.getElementsByTagName( "atom" )[j];
                        var attName = att.getAttribute( "name" );
                        var attVal = att.childNodes[0].nodeValue;

                        // alert( "attName = " + attName + "\nattVal = " + attVal + "\natt.nextSibling = " + att.nextSibling );

                        switch ( attName )
                        {
                            case 'TYPE':
                                fieldAtt['legType'] = attVal;
                                fieldAtt['dataType'] = attVal;
                                break;
                            case 'NAME':
                                fieldAtt['fldID'] = toStrNTrim( attVal );
                                break;
                            case 'START':
                                fieldAtt['noffset'] = attVal;
                                break;
                            case 'KEY':
                                fieldAtt['iskey'] = "yes";
                                fieldAtt['canNull'] = "no";
                                break;
                            case 'LEN':
                                fieldAtt['nlength'] = attVal;
                                // curOffset = curOffset + attVal;
                                break;
                            default:
                                break;
                        };    // end switch

                        // alert( "field Name = " + tempFldName + '\n' + "attribute = " + attName + '\n' + "attribute Value = " + attVal );

                        if ( att.nextSibling == null )
                        {
                            // alert( "break at next sibling == null?" );
                            break;
                        };
                        var nextsib = att.nextSibling;
                        if ( nextsib.tagName == "fld" )  // nextsib.getAttributeNode( "id" )
                        {
                            // alert( "break at next sibling has ID" );
                            break;
                        };
                    };    // end Attribute Loop
                    if ( fieldAtt['iskey'] == "yes" )
                    {
                        // add Add fld to copybook in last place
                        LastSeqNum = Number(LastSeqNum) + 1;
                        fieldAtt['seqno'] = LastSeqNum;

                         // alert( "add key field = PFK_" + tempFldName );
                        //                alert("breaks out of loop");
                        jQuery.ajax( { type: 'POST',  //type of request  GET or POST
                            url: '../Studio/php/addDescField.php',
                            data: {
                                objid: NewFldId,
                                projName: ProjName,
                                envName: EnvName,
                                descName: cobName,
                                descId: NewId,
                                descType: dType,
                                fldName: "PFK_" + tempFldName,
                                parentName: fieldAtt['fldParent'],
                                seqno: fieldAtt['seqno'],
                                descFldDesc: "",
                                nchildren: fieldAtt['nchildren'],
                                nlevel: fieldAtt['nlevel'],
                                noccurs: fieldAtt['noccurs'],
                                noccno: fieldAtt['noccno'],
                                dataType: fieldAtt['dataType'],
                                legType: fieldAtt['legType'],
                                noffset: fieldAtt['noffset'],
                                nlength: fieldAtt['nlength'],
                                nscale: fieldAtt['nscale'],
                                canNull: fieldAtt['canNull'],
                                iskey: fieldAtt['iskey']
                            },
                            async: false,
                            success: function ( return_data )
                            {
                                //                                            alert( 'return_data : ' + return_data );
                                if ( return_data != "false" )
                                {
                                    //main_layout.progressOff();
                                    //                                                alert( "Return data: " + return_data );
                                    // add field to descfldtree table
                                    var ischecked = "0";
                                    addDescfldnode = addDescFldNode( fieldAtt['fldParent'], objPar, "PFK_" + tempFldName, '105.gif', '105.gif', '105.gif', '105.gif', ischecked, NewId, fieldAtt['seqno'] );
                                } else
                                {
                                    propLayout.progressOff();
                                    alert( "Error: " + status + "\nReturn data: " + data );
                                    return false;
                                };       // end if/else
                            }      // end succes function
                        } );    // end Ajax ADDdescField
                    }
                }
            };  // end Field loop
        
            // alert( 'makes it to here' );
            /// get tempseg Parent
            var nextparseg = parseg.parentNode;
            if ( nextparseg != null && nextparseg.getAttribute( "id" ) != dbName )
            {
                // go to function to recurse through parents
                addParentKeys(nextparseg, LastSeqNum, NewId, dbName, ProjName, EnvName, cobName, firstParFld, dType);
            } 
            return true;
        }
        // ***********************************************************************
        // Add segments
        function AddSeg( xmlDoc, Descname, NewId, ProjName, EnvName, varDBDfile, dbName, dType )
        {
//            alert( "gets here to AddSeg" );
            var database = xmlDoc.getElementsByTagName( "database" )[0];
            dbName = database.getAttribute( "id" );
            var segment;
            var segName = "";
            var segid = "";
            var Parent = '0';
    //        var Segs = new Array;


            var numChildSegs = database.getElementsByTagName( "segment" ).length;
//             alert( "dbName : " + dbName + "\nnumChildSegs = " + numChildSegs );

            if ( numChildSegs > 0 )
            {
                // add first segment to Segment tree with parent '0' for root
                segment = database.getElementsByTagName( "segment" )[0];
                segName = segment.getAttribute( "id" );
                segName = toStrNTrim( segName );
//                alert( "segment Name = " + segName );
                //            segName = segName.trim();
    //            Segs.push( segName );
                segid = NewId + "." + segName;
                addSegNode( segid, ProjName, EnvName, Descname, segName, Parent, dType );

                for ( var i = 1; i < numChildSegs; i++ )  /// Segments Loop
                {
                    segment = database.getElementsByTagName( "segment" )[i];
                    segName = segment.getAttribute( "id" );
                    segName = toStrNTrim( segName ); //  segName = segName.trim();
//                    alert( "segment Name = " + segName );
                    //                Segs.push( segName );
                    var ParNode = segment.parentNode;

                    Parent = NewId + "." + toStrNTrim(ParNode.getAttribute( "id" ));
    //                Parent = toStrNTrim( Parent ); // Parent.trim();
    //                alert( "Parent = " + Parent );
                    segid = NewId + "." + segName;
                    addSegNode( segid, ProjName, EnvName, Descname, segName, Parent, dType );
                }
            };
    //        if ( AddDBDdesc( Descname, NewId, ProjName, EnvName, varDBDfile, dbName ) )
    //        {
    //            return Segs;
    //        };
            AddDBDdesc( Descname, NewId, ProjName, EnvName, varDBDfile, dbName, dType );
        }

        //*********************************************************
        // Add to Segment tree
        function addSegNode( objid, projName, envName, Descname, segName, parentID, dType )
        {
//             alert( 'parentID = ' + parentID + '\nobjid = ' + objid + '\nDescname = ' + Descname + '\nsegName = ' + segName + '\nprojName:  ' + projName );
            var i1 = "desc.gif";
            var i2 = "desc.gif";
            var i3 = "desc.gif";
            // Add node to DB into table maintree
            jQuery.post( '../Studio/php/addSegNode.php',
                {   objid: objid,
                    projName: projName,
                    envName: envName,
                    Descname: Descname,
                    descType: dType,
                    text: segName,
                    parentID: parentID,
                    im0: i1,
                    im1: i2,
                    im2: i3
                },
                function ( data, status, xhr )
                {
                    if ( status == 'success' )
                    {
                        //                    main_layout.progressOff();
//                        alert( "Status addSegNode : " + status + "\nReturn data: " + data );
    //                    ctlPropSegmentTree.openItem( NewId );
    //                    ctlPropSegmentTree.selectItem( NewId );
                    }
                    else
                    {
                        propLayout.progressOff();
                        alert( "Error: " + status + "\nReturn data: " + data );
                    };
                },
                'text' );
        }
        // ******************************************************
        /// Add DBD description to Descriptions Table
        function AddDBDdesc( Descname, NewId, ProjName, EnvName, varDBDfile, dbName, dType )
        {
            // alert( "makes it to AddDBDdesc" );
            // (`objid`, `projName`, `envName`, `descName`, `descType`, `fpath2`, `descDesc`)
            jQuery.ajax( {
                type: 'POST',  //type of request  GET or POST
                url: '../Studio/php/addDBD.php', // url to which the request is send
                data: { objid: NewId,
                    projName: ProjName,
                    envName: EnvName,
                    descName: Descname,
                    descType: "IMSDBD",
                    fpath2: varDBDfile,
                    dbName: dbName,
                    descDesc: "",
                    descType: dType
                }, // data to be sent to server
                async: false,
                success: function ( return_data )
                {
//                                    alert( "return data: " + return_data );
                    if ( return_data != "false" )
                    {
                        //                    main_layout.progressOff();
//                         alert( "DBD added to descriptions" );
    //                    return true;
                    }
                    else
                    {
                        propLayout.progressOff();
                        alert( 'There was a failure inserting DBD description' );
    //                    return false;
                    } /// end if return data no false
                },
                error: function ()
                {
                    //function to be called if the request fail
                    propLayout.progressOff();
                    alert( 'error' );
    //                return false;
                }
            } );      // end importer AJAX
        }  // end add DBD function
        // Load Segment Tree
        //****************************************************************************************************      
        function loadSegTree( projName, envName, descName, dType )
        {
//            alert( 'loadSegTree project name = ' + projName + '\n' + 'descName: ' + descName );
            //            propLayout.progressOn();
            ctlPropSegmentTree.deleteChildItems('0');
            ctlPropSegmentTree.deleteItem('0');
            //   
            jQuery.ajax( {
                type: 'POST',  //type of request  GET or POST
                url: '../Studio/php/GetSegmentTree.php', // url to which the request is send
                data: { projName: projName,
                    envName: envName,
                    descName: descName,
                    descType: dType
                }, // data to be sent to server
                async: false, //            timeout: request_timeout, // timeout for request
                success: function ( return_data )
                {
                    // function to be called if the request succeeds
//                    alert("Before Tree load data: " + return_data); // return data

                    ctlPropSegmentTree.loadXMLString( return_data, function ()
                    {
                        propLayout.progressOff();
                        //                        alert( "After Tree load data: " + return_data );
                        ctlPropSegmentTree.openAllItems( '0' );
                        //                 ctlPropSegmentTree.openItem( nameProj );
                        //                 ctlPropSegmentTree.selectItem( nameProj );
                    } );
                },
                error: function ()
                {
                    //function to be called if the request fail
                    propLayout.progressOff();
                    alert( 'AJAX error GetSegmentTree.php' );
                }
            } );
        }  // end load seg function

        function addFieldsToTables( xmlDoc, Descname, NewId, ProjName, EnvName, cobName, objPar, LastSeqNum, firstParFld, dType )
        {
            //    Sub AddTreeViewChildNodes(ByVal Sender As Object, ByVal parent_tvnodes As TreeNodeCollection, ByVal xml_node As XmlNode, Optional ByVal SaveAttrs As Boolean = False, Optional ByVal XMLType As enumXMLType = modDeclares.enumXMLType.XMLFOR_FIELD)
//            alert("function addFieldsToTables\n" + "NewId: " + NewId + "\nProjName: " + ProjName + "\nEnvName: " + EnvName + "\ncobName: " + cobName );

    //�parentNode
    //�childNodes
    //�firstChild
    //�lastChild
    //�nextSibling
    //�previousSibling
            try
            {
    //            var TreeRoot = "0";
                var recNode = xmlDoc.documentElement;
                var parNode = recNode;
                var curOffset = 0;
                var numFlds = recNode.getElementsByTagName( "fld" ).length;
                //            alert( "numFlds = " + numFlds );
                var curFldName = "";
                var parName = "";
                var UsedFieldNames = [];


                for (var i = 0; i < numFlds; i++)
                {
                    var curFldNode = recNode.getElementsByTagName( "fld" )[i];
                    curFldName = curFldNode.getAttribute( "id" );
                    curFldName = toStrNTrim( curFldName );
                    // if the field name is repeated, as for an occurs clause, then skip the field
                    if ( UsedFieldNames.indexOf( curFldName ) > -1 )
                    {
                        break;
                    }
                    UsedFieldNames.push( curFldName );

                    // set the first field as the first parent field
                    if ( i == 0 )
                    {
                        firstParFld = curFldName;
                    };
                    parNode = curFldNode.parentNode;
                    parName = parNode.getAttribute( "id" );
                    parName = toStrNTrim( parName );
                    var fieldAtt = [];

                    fieldAtt['noffset'] = curOffset;

                    var numFLDflds = curFldNode.getElementsByTagName( "fld" ).length;

                    fieldAtt['nchildren'] = numFLDflds;
                    //fieldAtt['nlevel'] = "0";
                    fieldAtt['noccurs'] = "0";
                    fieldAtt['noccno'] = "0";
                    if ( i == 0 )
                    {
                        fieldAtt['fldParent'] = "0";
                    }
                    else
                    {
                        fieldAtt['fldParent'] = parName;
                    };
                    fieldAtt['noffset'] = "0";
                    fieldAtt['iskey'] = "no";
                    var NewFldId = NewId + "." + curFldName;
                    var numAtoms = curFldNode.getElementsByTagName( "atom" ).length;

    //                alert( "numAtoms = " + numAtoms );

                    for ( var j = 0; j < numAtoms; j++ )  /// Attribute Loop
                    {
                        var att = curFldNode.getElementsByTagName( "atom" )[j];
                        var attName = att.getAttribute( "name" );
                        var attVal = att.childNodes[0].nodeValue;

                        switch ( attName )
                        {
                            case 'LEGACY_TYPE':
                                fieldAtt['legType'] = attVal;
                                fieldAtt['dataType'] = attVal;
                                break;
                            case 'PRECISION':
                                fieldAtt['nscale'] = attVal;
                                break;
                            case 'NAME':
                                fieldAtt['fldID'] = toStrNTrim( attVal );
                                break;
                            case 'POSITION':
                                fieldAtt['noffset'] = attVal;
                                break;
                            case 'NULL':
                                if ( attVal == 0 )
                                {
                                    attVal = "no";
                                }
                                else
                                {
                                    attVal = "yes";
                                }
                                fieldAtt['canNull'] = attVal;
                                break;
                            case 'ID':
                                fieldAtt['seqno'] = attVal;
                                LastSeqNum = attVal;
                                break;
                            case 'LEN':
                                fieldAtt['nlength'] = attVal;
                                curOffset = curOffset + attVal;
                                break;
                            case 'LEVEL':
                                fieldAtt['nlevel'] = attVal;
                                break;
                            default:
                                break;
                        };    // end switch
                    
                        try
                        {
                            // alert( " j = " + j + "\ncurFldName = " + curFldName + "\nattName = " + attName + "\nattVal = " + attVal + "\natt.nextSibling = " + att.nextSibling );
                            if ( att.nextSibling == null )
                            {
                                //  alert( "break at next sibling == null" );
                                break;
                            }
                            else
                            {
                                var nextsib = get_nextsibling( att );    // Firefox fix
                                if ( nextsib.tagName == "fld" )         //  nextsib.getAttributeNode( "id" )
                                {
                                    //  alert( "break at next sibling is a field" );
                                    break;
                                };
                            }
                        }
                        catch ( err )  // catches firefox Type error
                        {
//                            logError( err.message, err.name, "AddObj.js", "function addFieldsToTables Inner Try" );
                            break;
                        };
                    };    // end Attribute Loop
                    // alert( "before addDescField.php \n" + "NewFldId: " + NewFldId + "\nProjName: " + ProjName + "\nEnvName: " + EnvName + "\ncobName: " + cobName );
                    //  alert("breaks out of loop");
                    jQuery.ajax( { type: 'POST',  //type of request  GET or POST
                        url: '../Studio/php/addDescField.php',
                        data: {
                            objid: NewFldId,
                            projName: ProjName,
                            envName: EnvName,
                            descName: cobName,
                            descId: NewId,
                            descType: dType,
                            fldName: curFldName,
                            parentName: fieldAtt['fldParent'],
                            seqno: fieldAtt['seqno'],
                            descFldDesc: "",
                            nchildren: fieldAtt['nchildren'],
                            nlevel: fieldAtt['nlevel'],
                            noccurs: fieldAtt['noccurs'],
                            noccno: fieldAtt['noccno'],
                            dataType: fieldAtt['dataType'],
                            legType: fieldAtt['legType'],
                            noffset: fieldAtt['noffset'],
                            nlength: fieldAtt['nlength'],
                            nscale: fieldAtt['nscale'],
                            canNull: fieldAtt['canNull'],
                            iskey: fieldAtt['iskey']
                        },
                        async: false,
                        success: function ( return_data )
                        {
                            // alert( 'addDescField.php   return_data : ' + return_data );
                            if ( return_data != "false" )
                            {
                                //main_layout.progressOff();
                                //                                                alert( "Return data: " + return_data );
                                // add field to descfldtree table
                                var ischecked = "0";
                                addDescfldnode = addDescFldNode( fieldAtt['fldParent'], objPar, curFldName, 'FieldList.gif', 'FieldList.gif', 'FieldList.gif', 'FieldList.gif', ischecked, NewId, fieldAtt['seqno'] );
                            } 
                            else
                            {
                                propLayout.progressOff();
                                alert( "Error: " + status + "\nReturn data: " + data );
                                return false;
                            };       // end if/else
                        }      // end succes function
                    } );    // end Ajax ADDdescField
                };  // end field loop

                //            alert( 'makes it to here' );
                var retArr = [];
                retArr.push( LastSeqNum );
                retArr.push( firstParFld );
                return retArr;
            }
            catch ( err )
            {
                propLayout.progressOff();
//                alert( "AddObj addFieldsToTables: " + err.name + "\n" + err.message );
                logError( err.message, err.name, "AddObj.js", "function addFieldsToTables( xmlDoc, Descname, NewId, ProjName, EnvName, cobName, objPar, LastSeqNum, firstParFld )" );
                return false;
            }
        }
        //check if the next sibling node is an element node (Firefox fix)
        function get_nextsibling( n )
        {
            var x = null;
    //        alert( " x = " + x );
            if ( n.nextSibling != null )
            {
                x = n.nextSibling;
                while ( x.nodeType != 1 )
                {
                    x = x.nextSibling;
                }
            }
            return x;
        }
    }
    catch ( err )
    {
        logError( err.message, err.name, "AddObj.js", "function addCOBOLDesc(  Pid, TPid )" );
    }
}

// ****************************************************************************************************************
function addDesc( Pid, TPid, dType, Direction )
{
    try
    {
    //    alert( 'Under Construction' );
//        alert( 'New Description' + '\n' + 'Tree Parent id: ' + TPid + '\n' + 'Parent id: ' + Pid + '\n' + 'DescType: ' + dType );
        var Descfile = "";
        var Descname = "";
        var xmlDescpath = "";
        var dTypePre = "";
        var dPre = "";
        var sqdType = "";
        var $files = new Array;
        var RetArr = new Array;
        var today = new Date();
        var tabId = "";
        var objPar = Pid;
        var dbdName = "";
        var objDir = Direction;
        var recId = "";
        var recName = "";
        var recAlias = "";

//        alert( 'New Description' + '\n' + 'Tree Parent id: ' + TPid + '\n' + 'Parent id: ' + Pid + '\n' + 'DescType: ' + dType );
        // Get desc Prefix
        switch ( dType )
        {
            case 'COB':
                dTypePre = "cob";
                dPre = "SC";
                dTypeDB = objDir + "COBOL";
                sqdType = objDir + "COBOL";
                break;
            case 'DBD':
                dTypePre = "dbd";
                dPre = "SD";
                dTypeDB = objDir + "IMSDBD";
                sqdType = objDir + "DBDDesc";
                break;
            case 'DML':
                dTypePre = "dml";
                break;
                dTypeDB = objDir + "DMLSQL";
                sqdType = objDir + "DMLDesc";
            case 'DTD':
                dTypePre = "dtd";
                dPre = "ST";
                dTypeDB = objDir + "XMLDTD";
                sqdType = objDir + "DTDDesc";
                break;
            case 'db2':
                dTypePre = "db2";
                dPre = "S2";
                dTypeDB = objDir + "DB2DDL";
                sqdType = objDir + "db2Desc";
                break;
            case 'mssql':
                dTypePre = "mssql";
                dPre = "SM";
                dTypeDB = objDir + "MSQDDL";
                sqdType = objDir + "mssqlDesc";
                break;
            case 'ora':
                dTypePre = "ora";
                dPre = "SO";
                dTypeDB = objDir + "ORADDL";
                sqdType = objDir + "oraDesc";
                break;
//            case 'sql':
//                dTypePre = "sql";
//                dPre = "SS";
//                dTypeDB = "SQLDDL";
//                sqdType = objDir + "DDLDesc"; 
//                break;
            case 'udb':
                dTypePre = "udb";
                dPre = "SU";
                dTypeDB = objDir + "SQLDDL";
                sqdType = objDir + "udbDesc";
                break;
        };
        // description form JSON
        var Descstruct = [
	            { type: "settings", position: "label-left", labelAlign: "left", labelWidth: "90", inputWidth: "180", offsetLeft: "0" },
	            { name: "descUpload", type: "fieldset", label: "Description Upload", inputWidth: "auto", offsetLeft: "0", disabled: false, list: [{
	                type: "upload",
	                name: "myFiles",
	                inputWidth: 330,
	                url: "php/dhtmlxform_item_upload.php",
	                autoStart: true,
	                titleText: "Click here to select Table Descriptions for upload",
	                _swfLogs: "enabled",
	                swfPath: "../Studio/dhtmlxSuite/dhtmlxForm/codebase/ext/uploader.swf",
	                swfUrl: "../Studio/php/dhtmlxform_item_upload.php"
	            }]
	            },
                { name: "ImportBtn", type: "fieldset", label: "Click to import Description Files(s)", inputWidth: "auto", offsetLeft: "0", disabled: false, list: [
		                { name: "btnImport", type: "button", width: "80", value: "Import" }
	            ]
                }
            ];

        var propLayout = Tabbar_user_control.cells( "tabProp" ).attachLayout( "1C" );
        propLayout.cells( "a" ).setText( "Properties" );
        propLayout.cells( "a" ).setHeight( 362 );
        propLayout.cells( "a" ).setWidth( 400 );
    //    propLayout.cells( "b" ).setText( "Segment" );
    //    propLayout.cells( "c" ).setText( "Field Properties" );
        var frmNewDesc = propLayout.cells( "a" ).attachForm( Descstruct );
        frmNewDesc.setFontSize( '11px' );
        //    var mydp = new dataProcessor( "../Studio/php/addCOBdesc.php" );
        //    mydp.init( frmNewCOB );
        frmNewDesc.attachEvent( "onUploadFile", function ( realName, serverName )
        {
            Descfile = serverName;
            //        frmNewDesc.enableItem( "SaveBtn" );
    //        alert( "<b>onUploadFile</b>, real name: " + realName + ", server name: " + serverName );
            $files.push( Descfile );
        } );

        frmNewDesc.attachEvent("onButtonClick", function (id)
        {
            if (id == 'btnImport')
            {
                frmNewDesc.disableItem("btnImport");
                propLayout.progressOn();
                for (var y = 0; y < $files.length; y++) // DESCRIPTION LOOP
                {
                    // Import Description Files
                    var Descfile = $files[y];
                    //                    alert( 'Description File: ' + Descfile );
                    var addDescfldnode = false;
                    var tempArr = Descfile.split(".");
                    Descname = tempArr[0];
                    //                Descfile = dPre + Descfile;
                    //                alert( 'Description File: ' + Descfile );
                    var NewId = Pid + "." + Descname + "." + dTypeDB;
                    var env = getEnvName(Pid);
                    //                    alert( 'Import Description File: ' + Descfile + '\n' + 'Desc Name: ' + Descname + '\n' + 'Desc Type: ' + dType + '\n' + 'Desc Pre: ' + dTypePre );
                    jQuery.ajax({
                        type: 'POST',  //type of request  GET or POST
                        url: '../Studio/php/importDesc.php', // url to which the request is send
                        data: { Descfile: Descfile,
                            DescName: Descname,
                            DescType: dType,
                            DescPre: dTypePre,
                            dPre: dPre
                        }, // data to be sent to server
                        async: false,
                        success: function (return_data)
                        {
                            //                            alert( 'return_data : ' + return_data );
                            if (return_data != "false")
                            {
                                //  propLayout.progressOff();
                                xmlDescpath = return_data;
                                //                            frmNewDesc.enableItem( "SaveBtn" );
                                // send xml path to function to convert it to Nested, Keyed arrays
                                //                            var RetXML = "";
                                if (window.XMLHttpRequest)
                                {// code for IE7+, Firefox, Chrome, Opera, Safari
                                    xmlhttp = new XMLHttpRequest();
                                }
                                else
                                {// code for IE6, IE5
                                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                                }
                                //        alert( "xmlDescpath = " + xmlDescpath );
                                xmlhttp.open("GET", xmlDescpath, false);
                                xmlhttp.send();

//                                alert('xml ready state  : ' + xmlhttp.readyState + '\n' + 'xml status : ' + xmlhttp.status);
                                if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
                                {
                                    xmlDoc = xmlhttp.responseXML;
                                    var numflds = xmlDoc.getElementsByTagName("fld").length;
                                    var ParentName = "0";
                                    var tempRec = "";
                                    var tempRecId = "";
                                    var tempAtt = "";
                                    var tempRecName = "";
                                    var tempRecAlias = "";

                                    if (dTypeDB == "SrcCOBOL" || dTypeDB == "TgtCOBOL")
                                    {
                                        var parentField = xmlDoc.getElementsByTagName("fld")[0];
                                        ParentName = parentField.getAttribute("id");
                                        ParentName = toStrNTrim(ParentName);

                                        tempRec = xmlDoc.getElementsByTagName("record")[0];
                                        tempRecId = tempRec.getAttribute("id");
                                        tempAtt = tempRec.getElementsByTagName("atom")[0];
                                        if (tempAtt.getAttribute("name") == "NAME")
                                        {
                                            tempRecName = tempAtt.childNodes[0].nodeValue;
                                        };
                                    }
                                    else
                                    {
                                        tempRec = xmlDoc.getElementsByTagName("record")[0];
                                        tempRecId = tempRec.getAttribute("id");
                                        tempAtt = tempRec.getElementsByTagName("atom")[0];
                                        if (tempAtt.getAttribute("name") == "NAME")
                                        {
                                            //                                            alert("makes it here");

                                            tempRecName = tempAtt.childNodes[0].nodeValue;
                                            tempRecAlias = tempRec.getElementsByTagName("atom")[1].childNodes[0].nodeValue;
                                        }
                                        else
                                        {
                                            //                                            alert("makes it here");

                                            tempRecAlias = tempAtt.childNodes[0].nodeValue;
                                            tempRecName = tempRec.getElementsByTagName("atom")[1].childNodes[0].nodeValue;
                                        };
                                    };
                                    recId = tempRecId;
                                    recName = tempRecName;
                                    recAlias = tempRecAlias;

//                                    alert("recId : " + recId + "\nrecName : " + recName + "\nrecAlias : " + recAlias);

                                    //                                alert( "numflds : " + numflds );
                                    for (var i = 0; i < numflds; i++)  /// Field Loop
                                    {
                                        var fld = xmlDoc.getElementsByTagName("fld")[i];
                                        var FLDName = fld.getAttribute("id");
                                        FLDName = toStrNTrim(FLDName);
                                        // Process Field and send it to metadata and build trees
                                        var fieldAtt = new Array;   // Array of field attributes
                                        fieldAtt['dataType'] = "";  // fill it with something in case it is a COBOL
                                        fieldAtt['nscale'] = 0;  // fill it with something in case it is a COBOL

                                        for (var j = 0; j < 7; j++)  /// Attribute Loop
                                        {
                                            var att = fld.getElementsByTagName("atom")[j];
                                            var attName = att.getAttribute("name");
                                            var attVal = att.childNodes[0].nodeValue;

                                            switch (attName)
                                            {
                                                case 'LEGACY_TYPE':
                                                    fieldAtt['legType'] = attVal;
                                                    break;
                                                case 'PRECISION':
                                                    fieldAtt['nscale'] = attVal;
                                                    break;
                                                case 'NAME':
                                                    fieldAtt['fldID'] = toStrNTrim(attVal);
                                                    break;
                                                case 'TYPE':
                                                    fieldAtt['dataType'] = attVal;
                                                    break;
                                                case 'NULL':
                                                    if (attVal == 0)
                                                    {
                                                        attVal = "no";
                                                    }
                                                    else
                                                    {
                                                        attVal = "yes";
                                                    }
                                                    fieldAtt['canNull'] = attVal;
                                                    break;
                                                case 'ID':
                                                    fieldAtt['seqno'] = attVal;
                                                    break;
                                                case 'LEN':
                                                    fieldAtt['nlength'] = attVal;
                                                    break;
                                            };    // end switch
                                            // alert( "field Name = " + FLDName + '\n' + "attribute = " + attName + '\n' + "attribute Value = " + attVal );
                                        };    // end Attribute Loop
                                        fieldAtt['nchildren'] = "0";
                                        fieldAtt['nlevel'] = "0";
                                        fieldAtt['noccurs'] = "0";
                                        fieldAtt['noccno'] = "0";
                                        if (i == 0)
                                        {
                                            fieldAtt['fldParent'] = "0";
                                        }
                                        else
                                        {
                                            fieldAtt['fldParent'] = ParentName;
                                        };
                                        fieldAtt['noffset'] = "0";
                                        fieldAtt['iskey'] = "no";
                                        var NewFldId = NewId + "." + FLDName;

                                        //                                    alert( 'makes it to here' );
                                        // add field to descriptionfields table
                                        jQuery.ajax({ type: 'POST',  //type of request  GET or POST
                                            url: '../Studio/php/addDescField.php',
                                            data: {
                                                objid: NewFldId,
                                                projName: CURproj,
                                                envName: env,
                                                descName: Descname,
                                                descId: NewId,
                                                descType: dTypeDB, ///// add descType
                                                fldName: FLDName,
                                                parentName: fieldAtt['fldParent'],
                                                seqno: fieldAtt['seqno'],
                                                descFldDesc: "",
                                                nchildren: fieldAtt['nchildren'],
                                                nlevel: fieldAtt['nlevel'],
                                                noccurs: fieldAtt['noccurs'],
                                                noccno: fieldAtt['noccno'],
                                                dataType: fieldAtt['dataType'],
                                                legType: fieldAtt['legType'],
                                                noffset: fieldAtt['noffset'],
                                                nlength: fieldAtt['nlength'],
                                                nscale: fieldAtt['nscale'],
                                                canNull: fieldAtt['canNull'],
                                                iskey: fieldAtt['iskey']
                                            },
                                            async: false,
                                            success: function (return_data)
                                            {
//                                                alert('addDescField return_data : ' + return_data);
                                                if (return_data != "false")
                                                {
                                                    // main_layout.progressOff();
                                                    // alert( "Return data: " + return_data );
                                                    // add field to descfldtree table
                                                    var ischecked = "0";
                                                    addDescfldnode = addDescFldNode(fieldAtt['fldParent'], objPar, FLDName, 'FieldList.gif', 'FieldList.gif', 'FieldList.gif', 'FieldList.gif', ischecked, NewId, fieldAtt['seqno'], dTypeDB);
                                                } else
                                                {
                                                    propLayout.progressOff();
                                                    alert("Error: " + status + "\nReturn data: " + data);
                                                };       // end if/else
                                            }      // end succes function
                                        });    // end Ajax ADDdescField
                                    };  // end field loop
                                    if (addDescfldnode)
                                    {
                                        // alert( "makes it here" );
                                        // add description to descriptions table 
                                        jQuery.ajax({
                                            type: 'POST',  //type of request  GET or POST
                                            url: '../Studio/php/addDesc.php',
                                            data:
                                            {
                                                objid: NewId,
                                                projName: CURproj,
                                                envName: env,
                                                descName: Descname,
                                                descType: dTypeDB,
                                                recId: recId,
                                                recName: recName,
                                                recAlias: recAlias,
                                                fpath1: Descfile,
                                                fpath2: "",
                                                dbdName: dbdName,
                                                segName: "",
                                                segId: "",
                                                descDesc: "",
                                                CREATED_TIMESTAMP: today,
                                                UPDATED_TIMESTAMP: today
                                            },
                                            async: false,
                                            success: function (data, status, xhr)
                                            {
                                                if (status == 'success')
                                                {
                                                    //main_layout.progressOff();
                                                    // alert( "Status: " + status + "\nReturn data: " + data + "\nxhr: " + xhr );
                                                    tabId = data;
                                                    // add description to descriptionselect table
                                                    jQuery.ajax(
                                                    {
                                                        type: 'post',
                                                        url: '../Studio/php/addDescSel.php',
                                                        data: {
                                                            objid: NewId,
                                                            projName: CURproj,
                                                            envName: env,
                                                            descName: Descname,
                                                            descType: dTypeDB, ///// add descType
                                                            selName: Descname,
                                                            isSysSel: "1",
                                                            selDesc: ""
                                                        },
                                                        async: false,
                                                        success: function (return_data)
                                                        {
                                                            //  alert( 'return_data : ' + return_data );
                                                            if (return_data != "false")
                                                            {
                                                                //main_layout.progressOff();
                                                                // alert( "Status: " + status + "\nReturn data: " + data );
                                                                // add description to maintree table
                                                                var tmpObjName = Descname;
                                                                var tmpObjPid = Pid;
                                                                var tmpTPid = TPid;
                                                                addNode(tmpTPid, tmpObjPid, tmpObjName, sqdType, 'desc.gif', 'loadCtlDesc', 'desc.gif', 'desc.gif', 'desc.gif', '', tabId, false, dTypeDB, true);
                                                            } else
                                                            {
                                                                propLayout.progressOff();
                                                                alert("Error: " + status + "\nReturn data: " + data);
                                                            };
                                                        }
                                                    });
                                                } else
                                                {
                                                    propLayout.progressOff();
                                                    alert("Error: " + status + "\nReturn data: " + data);
                                                };
                                            }  // end success function
                                        });
                                    }
                                }   /// end ready state if
                                else
                                {
                                    alert('There was a failure in the importer, or reading or writing XML');
                                };
                            }   // end if return data
                            else
                            {
                                alert('There was a failure in the importer');
                                propLayout.progressOff();
                            }
                        },
                        error: function ()
                        {
                            //function to be called if the request fail
                            propLayout.progressOff();
                            alert('Ajax request failure');
                        }
                    });  // end XML ajax request
                };  // end description loop
                propLayout.progressOff();
            }
            else
            {
                alert('Save all Descriptions');
            }
        });
    }
    catch ( err )
    {
        logError( err.message, err.name, "AddObj.js", "function addDesc( Pid, TPid, dType )" );
    }
}

// ****************************************************************************************************************
function addDMLDesc( Pid, TPid, dmlType )
{
    try
    {
        alert( 'Under Construction' );
    }
    catch ( err )
    {
        logError( err.message, err.name, "AddObj.js", "function addDMLDesc( Pid, TPid, dmlType )" );
    }
}
// ****************************************************************************************************************
function addSel( Pid, TPid )
{
    try
    {
        alert( 'Under Construction' );
    }
    catch ( err )
    {
        logError( err.message, err.name, "AddObj.js", "function addSel( Pid, TPid )" );
    }
}