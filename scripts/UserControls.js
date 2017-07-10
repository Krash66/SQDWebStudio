// ***********************************************************************************************************
// ****************************************** Form ids and Data **********************************************
// ***********************************************************************************************************
// Field Attribute Names
var FldAttrb = new Array( "IsKey", "DataType", "legType", "NullAllowed", "IntFieldLen", "Scale", "InitVal", "ReType", "ExtType", "Invalid", "DateFormat", "Label" );  // "RecId",
// Description Value Names
//var CobDescFormNames = new Array( "txtDescName", "txtDescDesc", "txtDescRecLen", "txtDescTablespace", "txtDescIMSDBDfilePath", "txtDescCOBOLfilePath" );
//var DDLDescFormNames = new Array( "txtDescName", "txtDescDesc", "txtDescRecLen", "txtDescTablespace", "txtDescFilePath" );

//// Variable Value Names
//var VarFormNames = new Array( "txtVarName", "txtVarSize", "txtVarInitVal", "txtVarDesc" );

//// Datastore Value Names
//var SDSFormNames = new Array( "txtSDSAlias", "selSDSType", "selSDSAccess", "txtSDSPhysName", "txtSDSHostName", "txtSDSPort", "txtSDSDesc", "txtSDSException", "txtSDSUOW");

//var TDSFormNames = new Array( "txtTDSAlias", "selTDSType", "selTDSAccess", "txtTDSPhysName", "txtTDSHostName", "txtTDSPort", "txtTDSDesc", "txtTDSException", "txtTDSUOW", "cbTDSIMSPathData", "cbTDSSkipChangeCheck", "selTDSOperationType", "cbTDSKeyChange" );

var IsEventFromCode = false;

// ****************************************************************************************************************
// ************************************************** Functions ***************************************************
// ****************************************************************************************************************
function LoadCtl( id, tabId)
{
    var loadFunct = MainTree.getUserData( id, 'loadFunction' );  //MainTree.getSelectedItemId()
    // Keep current project info up to date
    CURproj = getProjId( id );
    CURprojNum = MainTree.getUserData( id, 'tabId' );
    previousId = id;
    previousTabId = tabId;

//    alert( "previousId: " + previousId );

    if ( IsSaved == false )
    {
        dhtmlx.confirm( {
            title: "Do you want to save?",
            type: "confirm-warning",
            text: "Would you like to save your work?",
            cancel: "Save",
            ok: "Don't save",
            callback: function ( result )
            {
                //                alert( 'result = ' + result );
                if ( result == true )
                {
                    IsSaved = true;
                    switch ( loadFunct )
                    {
                        case 'loadCtlProj':
                            loadCtlProj( id, CURproj );
                            break;
                        case 'loadCtlEnv':
                            loadCtlEnv( id, tabId );
                            break;
                        case 'loadCtlConn':
                            loadCtlConn( id, tabId );
                            break;
                        case 'loadCtlCOBOLDesc':
                            loadCtlCOBOLDesc( id, tabId );
                            break;
                        case 'loadCtlDesc':
                            loadCtlDesc( id, tabId );
                            break;
                        case 'loadCtlDMLDesc':
                            loadCtlDMLDesc( id, tabId );
                            break;
                        case 'loadCtlVar':
                            loadCtlVar( id, tabId );
                            break;
                        case 'loadCtlSys':
                            loadCtlSys( id, tabId );
                            break;
                        case 'loadCtlEng':
                            loadCtlEng( id, tabId );
                            break;
                        case 'loadCtlSDS':
                            loadCtlSDS( id, tabId );
                            break;
                        case 'loadCtlTDS':
                            loadCtlTDS( id, tabId );
                            break;
                        case 'loadCtlProc':
                            loadCtlProc( id, tabId );
                            break;
                        case 'loadCtlMain':
                            loadCtlMain( id, tabId );
                            break;
                        default:
                            loadCtlFolder( id );   //MainTree.getSelectedItemId()
                            break;
                    }  // end switch
                }  // end if result
            }  // end callback function
        } );    // end confirm message
    }  // end if
    else   // IsSaved == true
    {
        switch ( loadFunct )
        {
            case 'loadCtlProj':
                loadCtlProj( id, CURproj );
                break;
            case 'loadCtlEnv':
                loadCtlEnv( id, tabId );
                break;
            case 'loadCtlConn':
                loadCtlConn( id, tabId );
                break;
            case 'loadCtlCOBOLDesc':
                loadCtlCOBOLDesc( id, tabId );
                break;
            case 'loadCtlDesc':
                loadCtlDesc( id, tabId );
                break;
            case 'loadCtlDMLDesc':
                loadCtlDMLDesc( id, tabId );
                break;
            case 'loadCtlVar':
                loadCtlVar( id, tabId );
                break;
            case 'loadCtlSys':
                loadCtlSys( id, tabId );
                break;
            case 'loadCtlEng':
                loadCtlEng( id, tabId );
                break;
            case 'loadCtlSDS':
                loadCtlSDS( id, tabId );
                break;
            case 'loadCtlTDS':
                loadCtlTDS( id, tabId );
                break;
            case 'loadCtlProc':
                loadCtlProc( id, tabId );
                break;
            case 'loadCtlMain':
                loadCtlMain( id, tabId );
                break;
            default:
                loadCtlFolder( id );   //MainTree.getSelectedItemId()
                break;
        }
    };
}
// ****************************************************************************************************************
function loadCtlFolder( id )
{
    try
    {
        //  alert( "loadCtlFolder" );
        var propLayout = Tabbar_user_control.cells( "tabProp" ).attachLayout( "1C" );
        var propFldr = new dhtmlXDataView( propLayout.cells( "a" ) );
        propFldr.define("type", "ficon");

        var inStr = new String( MainTree.getSubItems( id ) );
        var pos = 0;
        var tempstr = "";
        while ( pos > -1 )
        {
            pos = inStr.indexOf( "," );
            if ( pos > -1 )
            {
                tempstr = inStr.substring( 0, pos );
                inStr = inStr.substring( pos + 1, inStr.length );
                propFldr.add( {
                    id: tempstr,
                    image: "../Studio/data/SQDimgs/" + MainTree.getUserData( tempstr, 'Icon' ),
                    text: MainTree.getItemText( tempstr ),
                    name: MainTree.getItemText( tempstr )
                } );
            }
            else
            {
                if ( inStr.length != 0 )
                {
                    propFldr.add( {
                        id: inStr,
                        image: "../Studio/data/SQDimgs/" + MainTree.getUserData( inStr, 'Icon' ),
                        text: MainTree.getItemText( inStr ),
                        name: MainTree.getItemText( inStr )
                    } );
                }
            }
        }
        propFldr.attachEvent( "onItemDblClick", function ( itemId )
        {
            //                alert( "dblclick. Item :: " + propFldr.get( itemId ).name );
            MainTree.selectItem( itemId, true );
        } );
    }
    catch ( err )
    {
        logError( err.message, err.name, "UserControls.js", "function loadCtlFolder( id )" );
    }
}
// ****************************************************************************************************************
function loadCtlProj( id, nameProj )
{
    try
    {
//        alllert( "error" );
        var today = new Date();
        var ctlProjStruct = [
	        { type: "settings", position: "label-left", labelWidth: 120, inputWidth: 320 },
	        { type: "fieldset", label: "Project Properties", inputWidth: "auto", list: [
                    { id: "id", name: "id", type: "input", label: "id", value: "", hidden: true },
                    { id: "objid", name: "objid", type: "input", label: "objid", value: "", hidden: true },
                    { id: "username", name: "username", type: "input", label: "Username", value: "", readonly: true, hidden: true },
			        { id: "projName", name: "projName", type: "input", label: "Project Name", required: true, readonly: true, validate: "NotEmpty", value: "" },
			        { id: "projCdate", name: "projCdate", type: "input", label: "Project Creation Date", readonly: true, value: "" },
			        { id: "projLUdate", name: "projLUdate", type: "input", label: "Project Last Updated", readonly: true, value: "" },
			        { id: "projDSN", name: "projDSN", type: "input", label: "Metadata DSN", value: "sqdmeta" },
			        { id: "projCust", name: "projCust", type: "input", label: "Customer Name", value: "" }
		        ]
	        },
	        { type: "fieldset", inputWidth: "auto", list: [
			        { name: "btnProjSave", type: "button", value: "Save" },
			        { type: "newcolumn" },
			        { name: "btnProjDelete", type: "button", value: "Delete" }
		        ]
	        }];
        //	 alert( 'LoadCtlProj num (id) : ' + CURprojNum + '\n' + 'LoadCtlProj objid : ' + id );

        //            alert( "loadCtlProj" );
        var propLayout = Tabbar_user_control.cells( "tabProp" ).attachLayout( "1C" );
        propLayout.cells( "a" ).setText( "Properties" );
        //            propLayout.cells( "a" ).setHeight( 300 );
        //            propLayout.cells( "b" ).setText( "Details" );
        var ctlProp = propLayout.cells( "a" ).attachForm( ctlProjStruct );
        //            ctlProp.setFontSize( '11px' );
        var dp = new dataProcessor( "../Studio/php/loadProj.php" ); //instatiate dataprocessor
        dp.init( ctlProp ); //link form to dataprocessor

        //    ctlProp.loadStruct( "../Studio/data/SQDFormProj.json?etc=" + new Date().getTime(), "json" );
        //            var ctlPropbottom = propLayout.cells( "b" ).attachForm();
        //            ctlPropbottom.loadStruct( "../Studio/data/SQDFormProj.json?etc=" + new Date().getTime(), "json" );
        //    alert('<%SESSION["sess_username"]%>');
        //    alert( 'Load Ctl Proj Name: ' + id + "\n" + "../Studio/php/loadProj.php?id=" + id );
        ctlProp.reset();
        ctlProp.load( "../Studio/php/loadProj.php?id=" + CURprojNum );

        ctlProp.attachEvent( "onButtonClick", function ( name )
        {
            propLayout.progressOn();
            if ( name == "btnProjSave" )
            {
                ctlProp.setItemValue( "projLUdate", today );
                if ( ctlProp.validate() )
                    ctlProp.save();
            }
            else
            {
                propLayout.progressOff();
                doDelete( nameProj );
                //            window.location.assign( "../Studio/login.html" );
                //                   window.location.assign( "../Studio/indexMain.php" )
            }
        } );
        ctlProp.attachEvent( 'onAfterSave', function ( id, xml )
        {
            propLayout.progressOff();
            IsSaved = true;
            dhtmlx.message( {
                text: "Project " + ctlProp.getItemValue( 'projName' ) + " has been saved",
                expire: 5000
            } );
            //alert( "previousId: " + previousId );
            LoadCtl( previousId, previousTabId );
        } );
        ctlProp.attachEvent( "onXLS", function ()
        {
            propLayout.progressOn();
        } );
        ctlProp.attachEvent( "onBeforeBinding", function ( id, values )
        {
            propLayout.progressOff();
            return true;
        } );
        ctlProp.attachEvent( "onChange", function ( name, value )
        {
            IsSaved = false;
        } );
    }
    catch ( err )
    {
        logError( err.message, err.name, "UserControls.js", "function loadCtlProj( id, nameProj )" );
    }
}
// ****************************************************************************************************************
function loadCtlEnv( id, tabId )
{
    try
    {
        var structEnv = [
	            { type: "settings", position: "label-left", labelWidth: 120, inputWidth: 320 },
	            { type: "fieldset", label: "Environment Properties", inputWidth: "auto", list: [
                        { name: "id", type: "input", label: "id", value: "", hidden: true },
                        { name: "objid", type: "input", label: "objid", value: "", hidden: true },
                        { name: "projName", type: "input", label: "Project Name", value: "", hidden: true },
			            { name: "envName", type: "input", label: "Environment Name", required: true, readonly: true, value: "" },
			            { type: "fieldset", label: "Description", inputWidth: 500, list: [
				            { name: "envDesc", type: "input", rows: "3", inputWidth: 460, value: "" }]}]
	            },
	            { type: "fieldset", label: "Local Script/Project Directory", disabled: true, inputWidth: "auto", list: [
			            { name: "scriptDir", type: "input", inputWidth: "320", label: "Script", value: "../User_directory/Proj_1/scripts/" },
			            { type: "newcolumn" },
			            { name: "btnScriptDir", type: "button", value: "browse" }
		            ]
	            },
	            { type: "fieldset", label: "Local Description Directories", disabled: true, inputWidth: "auto", list: [
			            { name: "cobolDir", type: "input", inputWidth: "320", label: "Cobol", value: "../User_directory/Proj_1/COBOL/" },
			            { name: "DBDDir", type: "input", inputWidth: "320", label: "DBD", value: "../User_directory/Proj_1/DBD/" },
			            { name: "DDLDir", type: "input", inputWidth: "320", label: "DDL", value: "../User_directory/Proj_1/DDL/" },
			            { name: "CDir", type: "input", inputWidth: "320", label: "C", value: "../User_directory/Proj_1/c/" },
			            { name: "DMLDir", type: "input", inputWidth: "320", label: "DML", value: "../User_directory/Proj_1/DML/" },
			            { name: "DTDDir", type: "input", inputWidth: "320", label: "XML/DTD", value: "../User_directory/Proj_1/DTD/" },
			            { type: "newcolumn" },
			            { name: "btnBrowseCobolDir", type: "button", value: "browse" },
			            { name: "btnBrowseDBDDir", type: "button", value: "browse" },
			            { name: "btnBrowseDDLDir", type: "button", value: "browse" },
			            { name: "btnBrowseCDir", type: "button", value: "browse" },
			            { name: "btnBrowseDMLDir", type: "button", value: "browse" },
			            { name: "btnBrowseDTDDir", type: "button", value: "browse" }
		            ]
	            },
	            { type: "fieldset", inputWidth: "auto", list: [
			            { name: "btnEnvSave", type: "button", value: "Save" },
			            { type: "newcolumn" },
			            { name: "btnEnvDelete", type: "button", value: "Delete" }
		            ]
	            }
            ];
        //            alert( "loadCtlEnv" );
        var propLayout = Tabbar_user_control.cells( "tabProp" ).attachLayout( "1C" );
        propLayout.cells( "a" ).setText( "Properties" );
        //            propLayout.cells( "a" ).setHeight( 300 );
        //            propLayout.cells( "b" ).setText( "Details" );
        var ctlProp = propLayout.cells( "a" ).attachForm( structEnv );
        //            ctlProp.setFontSize( '11px' );
        //            ctlProp.setItemHeight( "btnBrowseScriptDir", 10 );
    //    ctlProp.loadStruct( "../Studio/data/SQDFormEnv.json?etc=" + new Date().getTime(), "json" );
        //            var ctlPropbottom = propLayout.cells( "b" ).attachForm();
        //            ctlPropbottom.loadStruct( "../Studio/data/SQDFormProj.json?etc=" + new Date().getTime(), "json" );
        var dp = new dataProcessor( "../Studio/php/loadEnv.php" ); //instatiate dataprocessor
        dp.init( ctlProp ); //link form to dataprocessor

    //    alert( 'loadCtlEnv Name: ' + id + "\n" + "../Studio/php/loadEnv.php?id=" + tabId );

        ctlProp.load( "../Studio/php/loadEnv.php?id=" + tabId );

        ctlProp.attachEvent( "onButtonClick", function ( name )
        {
            propLayout.progressOn();
            if ( name == "btnEnvSave" )
            {
                if ( ctlProp.validate() )
                    ctlProp.save();
            }
            else if ( name == "btnEnvDelete" )
            {
                propLayout.progressOff();
                doDelete( id );
            }
            else
            {
           
                //            window.location.assign( "../Studio/login.html" );
                //                   window.location.assign( "../Studio/indexMain.php" )
            }
        } );
        ctlProp.attachEvent( 'onAfterSave', function ( id, xml )
        {
            propLayout.progressOff();
            IsSaved = true;
            dhtmlx.message( {
                text: "Environment " + ctlProp.getItemValue( 'envName' ) + " has been saved",
                expire: 5000
            } );
            //alert( "previousId: " + previousId );
            LoadCtl( previousId, previousTabId );
        } );
        ctlProp.attachEvent( "onChange", function ( name, value )
        {
            IsSaved = false;
        } );
    }
    catch ( err )
    {
        logError( err.message, err.name, "UserControls.js", "function loadCtlEnv( id, tabId )" );
    }
}
// ****************************************************************************************************************
function loadCtlConn( id, tabId )
{
    try
    {

        //            alert( "loadCtlConn" );
        var structConn = [
	        { type: "settings", position: "label-left", labelWidth: 120, inputWidth: 320 },
	        { type: "fieldset", label: "Connection Properties", inputWidth: "auto", list: [
                    { name: "id", type: "input", label: "id", value: "", hidden: true },
                    { name: "objid", type: "input", label: "objid", value: "", hidden: true },
                    { name: "projName", type: "input", label: "Project Name", value: "", hidden: true },
                    { name: "envName", type: "input", label: "Environment Name", value: "", hidden: true },
                    { name: "connName", type: "input", label: "Connection Name", required: true, readonly: true, value: "" },
			        { name: "connType", type: "select", inputWidth: "320", label: "Connection Type", options: [
					        { text: "ODBC", value: "ODBC" },
					        { text: "ODBC with substitution Variable", value: "ODBCsub" },
					        { text: "DB2", value: "DB2" },
					        { text: "OCI", value: "OCI" },
					        { text: "NATIVEORA", value: "NATIVEORA" }
				        ]
			        },
			        { type: "fieldset", label: "Description", inputWidth: 440, list: [
				        { name: "connDesc", type: "input", rows: "3", inputWidth: 400, value: "" }
			        ]
			        }
		        ]
	        },
	        { type: "fieldset", label: "Connection Database Properties", inputWidth: "auto", list: [
			        { name: "connDatabase", type: "input", inputWidth: "320", label: "Database", value: "" },
			        { name: "connDateFormat", type: "input", inputWidth: "320", label: "Date Format", value: "" }
		        ]
	        },
	        { type: "fieldset", label: "Connection Database User Properties", inputWidth: "auto", list: [
			        { name: "connUID", type: "input", inputWidth: "320", label: "Username", value: "" },
			        { name: "connPW", type: "password", inputWidth: "320", label: "Password", value: "" }
		        ]
	        },
	        { type: "fieldset", inputWidth: "auto", list: [
			        { name: "btnConnSave", type: "button", value: "Save" },
			        { type: "newcolumn" },
			        { name: "btnConnDelete", type: "button", value: "Delete" }
		        ]
	        }
        ];
        var propLayout = Tabbar_user_control.cells( "tabProp" ).attachLayout( "1C" );
        propLayout.cells( "a" ).setText( "Properties" );
        //            propLayout.cells( "a" ).setHeight( 300 );
        //            propLayout.cells( "b" ).setText( "Details" );
        var ctlProp = propLayout.cells( "a" ).attachForm( structConn );
        //            ctlProp.setFontSize( '11px' );
    //    ctlProp.loadStruct( "../Studio/data/SQDFormConn.json?etc=" + new Date().getTime(), "json" );
        //            var ctlPropbottom = propLayout.cells( "b" ).attachForm();
        //            ctlPropbottom.loadStruct( "../Studio/data/SQDFormProj.json?etc=" + new Date().getTime(), "json" );
        var dp = new dataProcessor( "../Studio/php/loadConn.php" ); //instatiate dataprocessor
        dp.init( ctlProp ); //link form to dataprocessor

        //    alert( 'loadCtlEnv Name: ' + id + "\n" + "../Studio/php/loadEnv.php?id=" + tabId );

        ctlProp.load( "../Studio/php/loadConn.php?id=" + tabId );

        ctlProp.attachEvent( "onButtonClick", function ( name )
        {
            propLayout.progressOn();
            if ( name == "btnConnSave" )
            {
                if ( ctlProp.validate() )
                    ctlProp.save();
            }
            else
            {
                propLayout.progressOff();
                doDelete( id );
    //            alert('Delete Connection: ' + ctlProp.getItemValue( 'connName' ));
            }
        } );
        ctlProp.attachEvent( 'onAfterSave', function ( id, xml )
        {
            propLayout.progressOff();
            IsSaved = true;
            dhtmlx.message( {
                text: "Connection " + ctlProp.getItemValue( 'connName' ) + " has been saved",
                expire: 5000
            } );
            //alert( "previousId: " + previousId );
            LoadCtl( previousId, previousTabId );
        } );
        ctlProp.attachEvent( "onChange", function ( name, value )
        {
            IsSaved = false;
        } );
    }
    catch ( err )
    {
        logError( err.message, err.name, "UserControls.js", "function loadCtlConn( id, tabId )" );
    }
}
// ****************************************************************************************************************
function loadCtlCOBOLDesc( id, tabId )
{
    try
    {
//        alert("Loaded id: " + id);

        var Direction = getDirFromId(id);

//        alert("Direction = " + Direction);

        var descName = MainTree.getItemText( id );
        var projName = getProjName( id );
        var envName = getEnvName( id );
        var DBDname = "";
        var segName = "";
        var segId = "";
        var dType = Direction + "IMSDBD";
        //            alert( "loadCtlCOBOLDesc" );

        var structDesc = [
	            { type: "settings", position: "label-left", labelAlign: "left", labelWidth: "90", inputWidth: "180", offsetLeft: "0" },
	            { type: "fieldset", label: "Description Properties", inputWidth: "auto", list: [
                    { name: "id", type: "input", label: "id", value: "", hidden: true },
                    { name: "objid", type: "input", label: "objid", value: "", hidden: true },
                    { name: "projName", type: "input", label: "Project Name", value: "", hidden: true },
			        { name: "envName", type: "input", label: "Environment Name", hidden: true, value: "" },
		            { name: "descName", type: "input", label: "Description Name", readonly: true, value: "" },
                    { name: "descType", type: "input", label: "Description Type", hidden: true, readonly: true, value: "" },
                    { name: "recId", type: "input", label: "Record ID", hidden: false, readonly: true, value: "" },
                    { name: "recName", type: "input", label: "Record Name", hidden: false, readonly: true, value: "" },
                    { name: "recAlias", type: "input", label: "Record Alias", hidden: false, readonly: true, value: "" },
                    { name: "DBDname", type: "input", label: "DBD Name", hidden: false, readonly: true, value: "" },
                    { name: "segName", type: "input", label: "Segment Name", hidden: false, readonly: true, value: "" },
		            { type: "fieldset", label: "Description", inputWidth: "auto", list: [
			            { name: "descDesc", type: "input", offsetLeft: "0", inputWidth: "245", rows: "3", value: "" }
		            ]
		            }
	            ]
	            },
	            { type: "fieldset", label: "Description File Properties", inputWidth: "auto", offsetLeft: "0", list: [
		            { name: "fpath2", type: "input", inputWidth: "160", position: "label-left", labelWidth: "65", label: "IMS DBD File" },
		            { name: "fpath1", type: "input", inputWidth: "160", position: "label-left", labelWidth: "65", label: "COBOL File" }
	            ]
	            },
	            { type: "fieldset", inputWidth: "auto", offsetLeft: "0", list: [
		            { name: "btnDescIMSDBDSave", type: "button", width: "80", value: "Save" },
		            { type: "newcolumn" },
		            { name: "btnDescIMSDBDDelete", type: "button", width: "80", value: "Delete" }
	            ]
	            }
            ];

        var propLayout = Tabbar_user_control.cells( "tabProp" ).attachLayout( "3U" );
        propLayout.cells( "a" ).setText( "Properties" );
        propLayout.cells( "a" ).setHeight( 340 );
        propLayout.cells( "a" ).setWidth( 400 );
        propLayout.cells( "b" ).setText( "Segment" );
        propLayout.cells( "c" ).setText( "Field Properties" );
        // attach form to cell a
        var ctlProp = propLayout.cells( "a" ).attachForm( structDesc );
        ctlProp.setFontSize( '11px' );

        // Attach segment tree to cell b
        var ctlPropSegmentTree = propLayout.cells( "b" ).attachTree();
        ctlPropSegmentTree.deleteChildItems( '0' );
        ctlPropSegmentTree.deleteItem( '0' );
        //    ctlPropSegmentTree.enableCheckBoxes( true, true );
        ctlPropSegmentTree.setSkin( 'dhx_skyblue' );
        ctlPropSegmentTree.setImagePath( '../Studio/data/SQDimgs/' );

        // attach field tree and grid to cell c
        var ctlPropFieldPropLayout = propLayout.cells( "c" ).attachLayout( "2U" );
        ctlPropFieldPropLayout.cells( "a" ).setText( "Field Name" );
        ctlPropFieldPropLayout.cells( "a" ).setWidth( 300 );
        ctlPropFieldPropLayout.cells( "b" ).setText( "Field Attributes" );

        // attach field tree to cell a
        var ctlPropFieldTree = ctlPropFieldPropLayout.cells( "a" ).attachTree();
        ctlPropFieldTree.deleteChildItems( '0' );
        ctlPropFieldTree.deleteItem( '0' );
        ctlPropFieldTree.setSkin( 'dhx_skyblue' );
        ctlPropFieldTree.setImagePath( '../Studio/data/SQDimgs/' );

        // attach attribute grid to cell b
        var ctlPropFieldAttbGrid = ctlPropFieldPropLayout.cells( "b" ).attachGrid();
        ctlPropFieldAttbGrid.setImagePath( "../Studio/dhtmlxSuite/dhtmlxGrid/codebase/imgs/" );
        ctlPropFieldAttbGrid.setHeader( "Attribute, Value" );
        ctlPropFieldAttbGrid.setInitWidths( "175,*" );
        ctlPropFieldAttbGrid.setColTypes( "ro,ro" );
        ctlPropFieldAttbGrid.enableCellIds( 'true' );
        ctlPropFieldAttbGrid.setColAlign( "left, left" );
        ctlPropFieldAttbGrid.setSkin( "dhx_skyblue" );
        ctlPropFieldAttbGrid.init();
        ctlPropFieldAttbGrid.load( "../Studio/data/SQDFldAttbGrid.xml" );
        ctlPropFieldAttbGrid.setEditable( false );
        // load the form
        ctlProp.load( "../Studio/php/loadDesc.php?id=" + tabId, function ()
        {
           
        } );   // end load field tree and form
        ctlProp.attachEvent( "onXLE", function ()
        {
            // after loading ended and data rendered (before user's callback)
            DBDname = ctlProp.getItemValue( 'DBDname' );
            segName = ctlProp.getItemValue( 'segName' );
            segId = projName + "." + envName + "." + DBDname + "." + Direction + "DBDDesc" + "." + segName;

            finishLoad();
        } );

        // form events
        var dp = new dataProcessor( "../Studio/php/saveDescForm.php" ); //instatiate dataprocessor
        dp.init( ctlProp ); //link form to dataprocessor
        ctlProp.attachEvent( "onButtonClick", function ( name )
        {
            propLayout.progressOn();
            if ( name == "btnDescIMSDBDSave" )
            {
                if ( ctlProp.validate() )
                    ctlProp.save();
            }
            else
            {
                doDelete( id );
                propLayout.progressOff();
                //            alert('Delete Connection: ' + ctlProp.getItemValue( 'connName' ));
            }
        } );
        ctlProp.attachEvent( 'onAfterSave', function ( id, xml )
        {
            propLayout.progressOff();
            IsSaved = true;
            dhtmlx.message( {
                text: "Description " + ctlProp.getItemValue( 'descName' ) + " has been saved",
                expire: 5000
            } );
            LoadCtl( previousId, previousTabId );
        } );
        ctlProp.attachEvent( "onChange", function ( name, value )
        {
            IsSaved = false;
        } );
        // field tree events
        ctlPropFieldTree.attachEvent( "onClick", function ( id )
        {
            // for loop though all field attributes to clear them
            var fldName = ctlPropFieldTree.getSelectedItemId();
            for ( var i = 0; i < FldAttrb.length; i++ )
            {
                ctlPropFieldAttbGrid.cells( FldAttrb[i], 1 ).setValue( ctlPropFieldTree.getUserData( fldName, FldAttrb[i] ) );
            }
        } );

        function finishLoad()
        {
            jQuery.ajax( {
                type: 'POST',  //type of request  GET or POST
                url: '../Studio/php/GetSegmentTree.php', // url to which the request is send
                data: { projName: projName,
                    envName: envName,
                    descName: DBDname,
                    descType: dType
                }, // data to be sent to server
                async: false, //            timeout: request_timeout, // timeout for request
                success: function ( return_data )
                {
                    // function to be called if the request succeeds
//                    alert("Before Segment Tree load data: " + return_data); // return data

                    ctlPropSegmentTree.loadXMLString( return_data, function ()
                    {
                        //                    propLayout.progressOff();
                        //                         alert( "After Tree load data: " + return_data );
                        ctlPropSegmentTree.openAllItems( '0' );
                        //                 ctlPropSegmentTree.openItem( nameProj );

                        ctlPropSegmentTree.selectItem(segId, true);

//                        ctlPropSegmentTree.lockTree( true );

                        jQuery.ajax( {
                            type: 'POST',  //type of request  GET or POST
                            url: '../Studio/php/GetFieldTree.php', // url to which the request is send
                            data: { descId: id }, // data to be sent to server
                            async: false,
                            success: function ( return_data )  // function to be called if the request succeeds
                            {
//                                                            alert( "Before Field Tree load data: " + return_data ); 
                                ctlPropFieldTree.loadXMLString( return_data, function ()  // load tree with return data XML
                                {
                                    propLayout.progressOff();
                                    //                                       alert( "After Tree load data: " + return_data );
                                    ctlPropFieldTree.openAllItems( '0' );
                                    ctlPropFieldTree.selectItem( ctlPropFieldTree.getChildItemIdByIndex( '0', '0' ), true );
                                } );
                            },
                            error: function ()
                            {
                                //function to be called if the request fail
                                propLayout.progressOff();
                                alert( 'error' );
                            }
                        } );  // end ajax
                    } );
                },
                error: function ()
                {
                    //function to be called if the request fail
                    propLayout.progressOff();
                    alert( 'error' );
                }
            } );
        };
        // Segment tree events
    //    ctlPropSegmentTree.attachEvent( "onSelect", function ( id )
    //    {
    ////        ctlPropFieldTree.deleteChildItems( '0' );
    ////        ctlPropFieldTree.deleteItem( '0' );
    ////        ctlPropFieldTree.loadXML( '../Studio/data/treeCOBDesc' + ctlPropSegmentTree.getItemText( id ) + '.xml', function ()
    ////        {
    ////            ctlPropFieldTree.openAllItems( '0' );
    ////        } );
    //     } );

        // Field attribute grid events
    //    ctlPropFieldAttbGrid.attachEvent( "onRowSelect", function ( id, ind )
    //    {
    //        //        alert( "id: " + id );
    //        //        ctlPropFieldAttbGrid.cells( id, 1 ).setValue( ctlPropFieldTree.getUserData( ctlPropFieldTree.getSelectedItemId(), id ) );
    //    } );

    }
    catch ( err )
    {
        logError( err.message, err.name, "UserControls.js", "function loadCtlCOBOLDesc( id, tabId )" );
    }
}
// ****************************************************************************************************************
function loadCtlDesc( id, tabId )
{
    try
    {
        var descName = MainTree.getItemText( id )
//        alert( "Desc Id (objid): " + id + '\ntabId = ' + tabId );
    //    var objid = MainTree.getUserData( objid, 'objid' );
    
        var structDesc = [
	        { type: "settings", position: "label-left", labelAlign: "left", labelWidth: "90", inputWidth: "180", offsetLeft: "0" },
	        { type: "fieldset", label: "Description Properties", inputWidth: "auto", list: [
                { name: "id", type: "input", label: "id", value: "", hidden: false },
                { name: "objid", type: "input", label: "objid", value: "", hidden: false },
                { name: "projName", type: "input", label: "Project Name", value: "", hidden: true },
			    { name: "envName", type: "input", label: "Environment Name", hidden: true, value: "" },
		        { name: "descName", type: "input", label: "Description Name", required: true, readonly: true, value: "" },
                { name: "descType", type: "input", label: "Description Type", hidden: true, readonly: true, value: "" },
                { name: "recId", type: "input", label: "Record ID", hidden: false, readonly: true, value: "" },
                { name: "recName", type: "input", label: "Record Name", hidden: false, readonly: true, value: "" },
                { name: "recAlias", type: "input", label: "Record Alias", hidden: false, readonly: true, value: "" },
		        { type: "fieldset", label: "Description", inputWidth: "auto", list: [
			        { name: "descDesc", type: "input", offsetLeft: "0", inputWidth: "245", rows: "3", value: "" }
		        ]
		        }
	        ]
	        },
	        { type: "fieldset", label: "Description File Properties", inputWidth: "auto", offsetLeft: "0", list: [
		        { name: "fpath1", type: "input", label: "Description File" }
	        ]
	        },
	        { type: "fieldset", inputWidth: "auto", offsetLeft: "0", list: [
		        { name: "btnDescSave", type: "button", width: "80", value: "Save" },
		        { type: "newcolumn" },
		        { name: "btnDescDelete", type: "button", width: "80", value: "Delete" }
	        ]
	        }
        ];

        var propLayout = Tabbar_user_control.cells( "tabProp" ).attachLayout( "3T" );
        propLayout.cells( "a" ).setText( "Properties" );
        propLayout.cells( "a" ).setHeight( 290 );
        propLayout.cells( "b" ).setText( "Fields" );
        propLayout.cells( "b" ).setWidth( 300 );
        propLayout.cells( "c" ).setText( "Field Properties" );

        // Fill in Grid
        var ctlPropFieldAttbGrid = propLayout.cells( "c" ).attachGrid();
        ctlPropFieldAttbGrid.setImagePath( "../Studio/dhtmlxSuite/dhtmlxGrid/codebase/imgs/" );
        ctlPropFieldAttbGrid.setHeader( "Attribute, Value" );
        ctlPropFieldAttbGrid.setInitWidths( "175,*" );
        ctlPropFieldAttbGrid.setColTypes( "ro,ro" );
        ctlPropFieldAttbGrid.setColAlign( "left, left" );
        ctlPropFieldAttbGrid.setSkin( "dhx_skyblue" );
        ctlPropFieldAttbGrid.init();
        ctlPropFieldAttbGrid.load( "../Studio/data/SQDFldAttbGrid.xml" );
        ctlPropFieldAttbGrid.setEditable( false );

        var ctlPropFieldTree = propLayout.cells( "b" ).attachTree();
        ctlPropFieldTree.deleteChildItems( '0' );
        ctlPropFieldTree.deleteItem( '0' );
        ctlPropFieldTree.setSkin( 'dhx_skyblue' );
        ctlPropFieldTree.setImagePath( '../Studio/data/SQDimgs/' );

        ctlPropFieldTree.attachEvent( "onClick", function ( id )
        {
            // for loop though all field attributes and display them in the grid
            for ( var i = 0; i < FldAttrb.length; i++ )
            {
                ctlPropFieldAttbGrid.cells( FldAttrb[i], 1 ).setValue( ctlPropFieldTree.getUserData( id, FldAttrb[i] ) );
            }
        } );

        var ctlProp = propLayout.cells( "a" ).attachForm( structDesc );
        ctlProp.setFontSize( '11px' );
        ctlProp.load( "../Studio/php/loadDesc.php?id=" + tabId, function ()
        {
            jQuery.ajax( {
                type: 'POST',  //type of request  GET or POST
                url: '../Studio/php/GetFieldTree.php', // url to which the request is send
                data: { descId: id }, // data to be sent to server
                success: function ( return_data )  // function to be called if the request succeeds
                {
    //                alert( "Before Tree load data: " + return_data ); 
                    ctlPropFieldTree.loadXMLString( return_data, function ()  // load tree with return data XML
                    {
                        propLayout.progressOff();
    //                    alert( "After Tree load data: " + return_data );
                        ctlPropFieldTree.openAllItems( '0' );
                        ctlPropFieldTree.selectItem( ctlPropFieldTree.getChildItemIdByIndex( '0', '0' ), true );
                    } );
                },
                error: function ()
                {
                    //function to be called if the request fail
                    propLayout.progressOff();
                    alert( 'error' );
                }
            } );  // end ajax
        } );   // end load field tree

        var dp = new dataProcessor( "../Studio/php/saveDescForm.php" ); //instatiate dataprocessor
        dp.init( ctlProp ); //link form to dataprocessor
        ctlProp.attachEvent( "onButtonClick", function ( name )
        {
            propLayout.progressOn();
            if ( name == "btnDescSave" )
            {
                if ( ctlProp.validate() ) 
                    ctlProp.save();
            }
            else
            {
                doDelete( id );
                propLayout.progressOff();
                //            alert('Delete Connection: ' + ctlProp.getItemValue( 'connName' ));
            }
        } );
        ctlProp.attachEvent( 'onAfterSave', function ( id, xml )
        {
            propLayout.progressOff();
            IsSaved = true;
            dhtmlx.message( {
                text: "Description " + ctlProp.getItemValue( 'descName' ) + " has been saved",
                expire: 5000
            } );
            LoadCtl( previousId, previousTabId );
        } );
        ctlProp.attachEvent( "onChange", function ( name, value )
        {
            IsSaved = false;
        } );
    }
    catch ( err )
    {
        logError( err.message, err.name, "UserControls.js", "function loadCtlDesc( id, tabId )" );
    }
}
// ****************************************************************************************************************
function loadCtlDMLDesc( id, tabId )
{
    try
    {
        //            alert( "loadCtlDMLDesc" );
        var propLayout = Tabbar_user_control.cells( "tabProp" ).attachLayout( "3T" );
        propLayout.cells( "a" ).setText( "Properties" );
        propLayout.cells( "a" ).setHeight( 300 );
        propLayout.cells( "b" ).setText( "Fields" );
        propLayout.cells( "c" ).setText( "Field Properties" );

        var ctlProp = propLayout.cells( "a" ).attachForm();
        ctlProp.setFontSize( '11px' );
        ctlProp.loadStruct( "../Studio/data/SQDFormDescDML.json?etc=" + new Date().getTime(), "json" );

        var ctlPropFieldTree = propLayout.cells( "b" ).attachTree();
        ctlPropFieldTree.deleteChildItems( '0' );
        ctlPropFieldTree.deleteItem( '0' );
        ctlPropSegmentTree.setSkin( 'dhx_skyblue' );
        ctlPropSegmentTree.setImagePath( '../Studio/data/SQDimgs/' );
        ctlPropFieldTree.loadXML( '../Studio/data/mainTree.xml', function ()
        {
            ctlPropFieldTree.openAllItems( '0' );
            //                alert( "Loaded" );
        } );

        // Fill in Grid
        var ctlPropFieldAttbGrid = propLayout.cells( "c" ).attachGrid();
        ctlPropFieldAttbGrid.setImagePath( "../Studio/dhtmlxSuite/dhtmlxGrid/codebase/imgs/" );
        ctlPropFieldAttbGrid.setHeader( "Attribute, Value" );
        ctlPropFieldAttbGrid.setInitWidths( "175,*" );
        ctlPropFieldAttbGrid.setColTypes( "ro,ro" );
        ctlPropFieldAttbGrid.setColAlign( "left, left" );
        ctlPropFieldAttbGrid.setSkin( "dhx_skyblue" );
        ctlPropFieldAttbGrid.init();
        ctlPropFieldAttbGrid.load( "../Studio/data/SQDFldAttbGrid.xml" );
    }
    catch ( err )
    {
        logError( err.message, err.name, "UserControls.js", "function loadCtlDMLDesc( id, tabId )" );
    }
}
// ****************************************************************************************************************
function loadCtlVar( id, tabId )
{
    try
    {
        var varStruct = [
	        { type: "settings", position: "label-left", labelWidth: 120, inputWidth: 320 },
	        { type: "fieldset", label: "Variable Properties", inputWidth: "auto", list: [
                    { name: "id", type: "input", label: "id", value: "", readonly: "true", hidden: true },
                    { name: "objid", type: "input", label: "objid", value: "", readonly: "true", hidden: true },
                    { name: "projName", type: "input", label: "Project", value: "", readonly: "true", hidden: true },
                    { name: "envName", type: "input", label: "Environment", value: "", readonly: "true", hidden: true },
                    { name: "sysName", type: "input", label: "System", value: "", readonly: "true", hidden: true },
                    { name: "engName", type: "input", label: "Engine", value: "", readonly: "true", hidden: true },
			        { name: "varName", type: "input", label: "Name", required: true, readonly: true, value: "" },
			        { name: "varSize", type: "input", label: "Size", value: "" },
			        { name: "varInitVal", type: "input", label: "Initial Value", value: "" },
			        { name: "gbVarDesc", type: "fieldset", label: "Description", inputWidth: 500, list: [
				        { name: "varDesc", type: "input", rows: "3", inputWidth: 460, value: "" }
			        ]
			        }
		        ]
	        },
	        { type: "fieldset", inputWidth: "auto", list: [
			        { name: "btnVarSave", type: "button", value: "Save" },
			        { type: "newcolumn" },
			        { name: "btnVarDelete", type: "button", value: "Delete" }
		        ]
	        }
        ];
        //var varName = MainTree.getItemText( id )
        //            alert( "loadCtlVar" );
        var propLayout = Tabbar_user_control.cells( "tabProp" ).attachLayout( "1C" );
        propLayout.cells( "a" ).setText( "Properties" );
        //            propLayout.cells( "a" ).setHeight( 300 );
        //            propLayout.cells( "b" ).setText( "Details" );
        var ctlProp = propLayout.cells( "a" ).attachForm( varStruct );
    //    ctlProp.setFontSize( '11px' );
    
        var dp = new dataProcessor( "../Studio/php/loadVar.php" ); //instatiate dataprocessor
        dp.init( ctlProp ); //link form to dataprocessor

        //    alert( 'loadCtlEnv Name: ' + id + "\n" + "../Studio/php/loadEnv.php?id=" + tabId );

        ctlProp.load( "../Studio/php/loadVar.php?id=" + tabId );

        ctlProp.attachEvent( "onButtonClick", function ( name )
        {
            if ( name == "btnVarSave" )
            {
                propLayout.progressOn();
                if ( ctlProp.validate() )
                    ctlProp.save();
            }
            else
            {
                doDelete( id );
                //            alert( 'Delete Variable: ' + ctlProp.getItemValue( 'varName' ) );
                propLayout.progressOff();
            }
        } );
        ctlProp.attachEvent( 'onAfterSave', function ( id, xml )
        {
            propLayout.progressOff();
            IsSaved = true;
            dhtmlx.message( {
                text: "Variable " + ctlProp.getItemValue( 'varName' ) + " has been saved",
                expire: 5000
            } );
            LoadCtl( previousId, previousTabId );
        } );
        ctlProp.attachEvent( "onChange", function ( name, value )
        {
            IsSaved = false;
        } );
    }
    catch ( err )
    {
        logError( err.message, err.name, "UserControls.js", "function loadCtlVar( id, tabId )" );
    }
}
// ****************************************************************************************************************
function loadCtlSys( id, tabId )
{
    try
    {
        var structSys = [
	        { type: "settings", position: "label-left", labelWidth: 120, inputWidth: 320 },
	        { type: "fieldset", label: "System Properties", inputWidth: "auto", list: [
                    { name: "id", type: "input", label: "id", value: "", readonly: "true", hidden: true },
                    { name: "objid", type: "input", label: "objid", value: "", readonly: "true", hidden: true },
                    { name: "projName", type: "input", label: "Project", value: "", readonly: "true", hidden: true },
                    { name: "envName", type: "input", label: "Environment", value: "", readonly: "true", hidden: true },
			        { name: "sysName", type: "input", label: "System Name", required: true, readonly: true, value: "" },
			        { name: "sysType", type: "select", inputWidth: 320, label: "System Type", options: [
					        { text: "z/OS", value: "z/OS" },
					        { text: "Unix", value: "Unix" },
					        { text: "Windows", value: "Windows" }
			        ]},
			        { type: "fieldset", label: "Description", inputWidth: 500, list: [
				        { name: "sysDesc", type: "input", rows: "3", inputWidth: 460, value: "" }
			        ]}
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
			        { name: "btnSysSave", type: "button", value: "Save" },
			        { type: "newcolumn" },
			        { name: "btnSysDelete", type: "button", value: "Delete" }
		        ]
	        }
        ];
        //            alert( "loadCtlSys" );
        var propLayout = Tabbar_user_control.cells( "tabProp" ).attachLayout( "1C" );
        propLayout.cells( "a" ).setText( "Properties" );
        //            propLayout.cells( "a" ).setHeight( 300 );
        //            propLayout.cells( "b" ).setText( "Details" );
        var ctlProp = propLayout.cells( "a" ).attachForm( structSys );
        //    ctlProp.setFontSize( '11px' );

        var dp = new dataProcessor( "../Studio/php/loadSys.php" ); //instatiate dataprocessor
        dp.init( ctlProp ); //link form to dataprocessor

        //    alert( 'loadCtlEnv Name: ' + id + "\n" + "../Studio/php/loadEnv.php?id=" + tabId );

        ctlProp.load( "../Studio/php/loadSys.php?id=" + tabId );

        ctlProp.attachEvent( "onButtonClick", function ( name )
        {
            propLayout.progressOn();
            if ( name == "btnSysSave" )
            {
                propLayout.progressOn();
                if ( ctlProp.validate() )
                    ctlProp.save();
            }
            else
            {
                propLayout.progressOff();
                doDelete( id );
    //            alert( 'Delete System: ' + ctlProp.getItemValue( 'sysName' ) );
            }
        } );
        ctlProp.attachEvent( 'onAfterSave', function ( id, xml )
        {
            propLayout.progressOff();
            IsSaved = true;
            dhtmlx.message( {
                text: "System " + ctlProp.getItemValue( 'sysName' ) + " has been saved",
                expire: 5000
            } );
            LoadCtl( previousId, previousTabId );
        } );
        ctlProp.attachEvent( "onChange", function ( name, value )
        {
            IsSaved = false;
        } );
    }
    catch ( err )
    {
        logError( err.message, err.name, "UserControls.js", "function loadCtlSys( id, tabId )" );
    }
}
// ****************************************************************************************************************
function loadCtlEng( id, tabId )
{
    try
    {
        var structEng = [
	        { type: "settings", position: "label-left", labelWidth: 120, inputWidth: 320 },
	        { type: "fieldset", label: "Engine Properties", inputWidth: "auto", list: [
                    { name: "id", type: "input", label: "id", value: "", readonly: "true", hidden: true },
                    { name: "objid", type: "input", label: "objid", value: "", readonly: "true", hidden: true },
                    { name: "projName", type: "input", label: "Project Name", value: "", readonly: "true", hidden: true },
                    { name: "envName", type: "input", label: "Environment Name", value: "", readonly: "true", hidden: true },
                    { name: "sysName", type: "input", label: "System Name", value: "", readonly: "true", hidden: true },
			        { name: "engName", type: "input", label: "Engine Name", required: true, readonly: true, value: "" },
                    { name: "engType", type: "input", label: "Engine Type", required: true, readonly: true, value: "" },
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
			        ]
			        }
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
			        { name: "btnEngSave", type: "button", value: "Save" },
			        { type: "newcolumn" },
			        { name: "btnEngDelete", type: "button", value: "Delete" }
		        ]
	        }
        ];

        //            alert( "loadCtlEng" );
        var propLayout = Tabbar_user_control.cells( "tabProp" ).attachLayout( "1C" );
        propLayout.cells( "a" ).setText( "Properties" );
        //            propLayout.cells( "a" ).setHeight( 300 );
        //            propLayout.cells( "b" ).setText( "Details" );
        var ctlProp = propLayout.cells( "a" ).attachForm( structEng );
        //ctlProp.setFontSize( '11px' );
        var dp = new dataProcessor( "../Studio/php/loadEng.php" ); //instatiate dataprocessor
        dp.init( ctlProp ); //link form to dataprocessor

        //    alert( 'loadCtlEnv Name: ' + id + "\n" + "../Studio/php/loadEnv.php?id=" + tabId );

        ctlProp.load( "../Studio/php/loadEng.php?id=" + tabId );

        ctlProp.attachEvent( "onButtonClick", function ( name )
        {
            if ( name == "btnEngSave" )
            {
                propLayout.progressOn();
                if ( ctlProp.validate() )
                    ctlProp.save();
            }
            else
            {
                doDelete( id );
                propLayout.progressOff();
                //            alert( 'Delete Engine: ' + ctlProp.getItemValue( 'engName' ) );
            }
        } );
        ctlProp.attachEvent( 'onAfterSave', function ( id, xml )
        {
            propLayout.progressOff();
            IsSaved = true;
            dhtmlx.message( {
                text: "Engine " + ctlProp.getItemValue( 'engName' ) + " has been saved",
                expire: 5000
            } );
            LoadCtl( previousId, previousTabId );
        } );
        ctlProp.attachEvent( "onChange", function ( name, value )
        {
            IsSaved = false;
        } );
    }
    catch ( err )
    {
        logError( err.message, err.name, "UserControls.js", "function loadCtlEng( id, tabId )" );
    }
}
// ****************************************************************************************************************
// SOURCE Datastore
// ****************************************************************************************************************
function loadCtlSDS( id, tabId )
{
    try
    {
        var DSName = "";
        var DSdescName = "";

        var fldrId = getProjName( id ) + "." + getEnvName( id ) + ".fldSrcDesc";
        var idPrefix = getProjName( id ) + "." + getEnvName( id ) + ".";
        var SQDtype = MainTree.getUserData( id, "sqdType" );
        var itmId = "";
        var newId;
        var eventFromCode = true;
//            alert( "id : " + id + '\n' + "SQDtype : " + SQDtype );

        if ( SQDtype == "objSDSsel" )
        {
            DSdescName = MainTree.getItemText( id );
            itmId = idPrefix + DSdescName;
            DSName = MainTree.getItemText( MainTree.getParentId( id ) );
        }
        else
        {
            DSName = MainTree.getItemText( id );
            DSdescName = "";
        }
        var ProjName = getProjName( id );
        var EnvName = getEnvName( id );
        var SysName = getSysName( id );
        var EngName = getEngName( id );
        var dsName = DSName;
        var DescName = "";
        var SelName = "";
        var updateKey = 0;
        var descID = "";

    //    alert( "SDSName : " + SDSName + '\n' + "SDSdescName : " + SDSdescName );
        var structSDS = [
	        { type: "settings", position: "label-left", labelAlign: "left", labelWidth: "90", inputWidth: "180", offsetLeft: "0" },
	        { type: "fieldset", label: "Source Datastore Properties", inputWidth: "auto", list: [
                { name: "id", type: "input", label: "id", value: "", readonly: "true", hidden: true },
                { name: "objid", type: "input", label: "objid", value: "", readonly: "true", hidden: true },
                { name: "projName", type: "input", label: "Project Name", value: "", readonly: "true", hidden: true },
                { name: "envName", type: "input", label: "Environment Name", value: "", readonly: "true", hidden: true },
                { name: "sysName", type: "input", label: "System Name", value: "", readonly: "true", hidden: true },
			    { name: "engName", type: "input", label: "Engine Name", value: "", readonly: "true", hidden: true },
                { name: "engType", type: "input", label: "Engine Type", value: "", readonly: "true", hidden: false },
                { name: "DSimage", type: "input", label: "Image File", value: "", readonly: "true", hidden: true },
			    { name: "DSname", type: "input", label: "Alias (name)", value: "CDCIN", required: true, readonly: true },
                { name: "DSdir", type: "input", label: "DS Direction", value: "", readonly: "true", hidden: true },
			    { name: "DSformat", type: "combo", inputWidth: "180", label: "Format", required: true, options: [
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
			    { name: "DStype", type: "combo", inputWidth: "180", required: true, label: "Type" , options: [
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
			    { name: "DSPhysName", type: "input", label: "Physical Name", required: false, value: "" },
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
				{ name: "DSDesc", type: "input", offsetLeft: "0", inputWidth: "245", rows: "3", value: "" }
			]
            },
            { type: "fieldset", inputWidth: "auto", offsetLeft: "0", list: [
			    { name: "btnSDSSave", type: "button", width: "80", value: "Save" },
			    { type: "newcolumn" },
			    { name: "btnSDSDelete", type: "button", width: "80", value: "Delete" }
		    ]
            }    
        ];

        var propLayout = Tabbar_user_control.cells( "tabProp" ).attachLayout( "3U" );
        propLayout.cells( "a" ).setText( "Properties" );
        propLayout.cells( "a" ).setHeight( 350 );
        propLayout.cells( "a" ).setWidth( 430 );
        propLayout.cells( "b" ).setText( "Description(s)" );
        //            propLayout.cells( "c" ).setText( "Fields" );
        propLayout.cells( "c" ).setWidth( 300 );
        propLayout.progressOn();

        // SDS Form
        var ctlProp = propLayout.cells( "a" ).attachForm( structSDS );
        ctlProp.setFontSize( '11px' );
        var dp = new dataProcessor( "../Studio/php/loadDS.php" ); //instatiate dataprocessor
        dp.init( ctlProp ); //link form to dataprocessor
        //    alert( 'loadCtlEnv Name: ' + id + "\n" + "../Studio/php/loadEnv.php?id=" + tabId );
        ctlProp.load( "../Studio/php/loadDS.php?id=" + tabId );
        ctlProp.attachEvent( "onXLE", function ()
        {
            var typeCombo = ctlProp.getCombo( "DStype" );
//            typeCombo.clearAll();
//            switch ( ctlProp.getItemValue( "DSformat" ) )
//            {
//                case "Binary":
//                    propLayout.cells( "a" ).setHeight( 410 );
//                   
//                    typeCombo.addOption( "File", "File" );
//                    typeCombo.addOption( "MQS", "MQ Series" );
//                    typeCombo.addOption( "JMS", "JMS" );
//                    typeCombo.addOption( "TCP", "TCP/IP" );
//                    typeCombo.addOption( "VSAM", "VSAM" );

//                    ctlProp.showItem( "boxExtend" );
//                    ctlProp.hideItem( "boxComp" );
//                    ctlProp.hideItem( "boxWTO" );
//                    ctlProp.hideItem( "delBox" );
//                    ctlProp.hideItem( "boxNetezza" );
//                    
//                    ctlProp.showItem( "DSHostName" );
//                    ctlProp.showItem( "DSPort" );
//                    ctlProp.enableItem( "DSaccept" );
//                    ctlProp.disableItem( "DSreconn" );
//                    ctlProp.disableItem( "RRS" );

//                    break;
//                case "Delimited":
//                    propLayout.cells( "a" ).setHeight( 460 );
//                    
//                    typeCombo.addOption( "File", "File" );
//                    typeCombo.addOption( "MQS", "MQ Series" );
//                    typeCombo.addOption( "JMS", "JMS" );
//                    typeCombo.addOption( "TCP", "TCP/IP" );

//                    ctlProp.showItem( "boxExtend" );
//                    ctlProp.hideItem( "boxComp" );
//                    ctlProp.hideItem( "boxWTO" );
//                    ctlProp.showItem( "delBox" );
//                    ctlProp.hideItem( "boxNetezza" );
//                    
//                    ctlProp.showItem( "DSHostName" );
//                    ctlProp.showItem( "DSPort" );
//                    ctlProp.enableItem( "DSaccept" );
//                    ctlProp.disableItem( "DSreconn" );
//                    ctlProp.disableItem( "RRS" );
//                    break;
//                case "XML":
//                    propLayout.cells( "a" ).setHeight( 410 );
//                    
//                    typeCombo.addOption( "File", "File" );
//                    typeCombo.addOption( "MQS", "MQ Series" );
//                    typeCombo.addOption( "JMS", "JMS" );
//                    typeCombo.addOption( "TCP", "TCP/IP" );

//                    ctlProp.showItem( "boxExtend" );
//                    ctlProp.hideItem( "boxComp" );
//                    ctlProp.hideItem( "boxWTO" );
//                    ctlProp.hideItem( "delBox" );
//                    ctlProp.hideItem( "boxNetezza" );
//                    
//                    ctlProp.showItem( "DSHostName" );
//                    ctlProp.showItem( "DSPort" );
//                    ctlProp.enableItem( "DSaccept" );
//                    ctlProp.disableItem( "DSreconn" );
//                    ctlProp.disableItem( "RRS" );
//                    break;
//                case "Relational":
//                    propLayout.cells( "a" ).setHeight( 410 );
//                    
//                    typeCombo.addOption( "Table", "Relational Table" );

//                    ctlProp.hideItem( "boxExtend" );
//                    ctlProp.hideItem( "boxComp" );
//                    ctlProp.hideItem( "boxWTO" );
//                    ctlProp.hideItem( "delBox" );
//                    ctlProp.hideItem( "boxNetezza" );
//                    
//                    ctlProp.hideItem( "DSHostName" );
//                    ctlProp.hideItem( "DSPort" );
//                    ctlProp.disableItem( "DSaccept" );
//                    ctlProp.disableItem( "DSreconn" );
//                    ctlProp.disableItem( "RRS" );
//                    break;
//                case "UTSCDC":
//                    propLayout.cells( "a" ).setHeight( 410 );

//                    typeCombo.addOption( "CDC", "CDC Store" );
//                    typeCombo.addOption( "MQS", "MQ Series" );
//                    typeCombo.addOption( "JMS", "JMS" );

//                    ctlProp.showItem( "boxExtend" );
//                    ctlProp.hideItem( "boxComp" );
//                    ctlProp.hideItem( "boxWTO" );
//                    ctlProp.hideItem( "delBox" );
//                    ctlProp.hideItem( "boxNetezza" );
//                    
//                    ctlProp.hideItem( "DSHostName" );
//                    ctlProp.hideItem( "DSPort" );
//                    ctlProp.disableItem( "DSaccept" );
//                    ctlProp.disableItem( "DSreconn" );
//                    ctlProp.disableItem( "RRS" );
//                    if(typeCombo.getSelectedValue() == "CDCStore")
//                    {
//                        ctlProp.enableItem( "DSaccept" );
//                        ctlProp.enableItem( "DSreconn" );
//                    };
//                    break;
//                case "DB2CDC":
//                    propLayout.cells( "a" ).setHeight( 410 );

//                    typeCombo.addOption( "CDC", "CDC Store" );
//                    typeCombo.addOption( "MQS", "MQ Series" );
//                    typeCombo.addOption( "JMS", "JMS" );

//                    ctlProp.showItem( "boxExtend" );
//                    ctlProp.hideItem( "boxComp" );
//                    ctlProp.hideItem( "boxWTO" );
//                    ctlProp.hideItem( "delBox" );
//                    ctlProp.hideItem( "boxNetezza" );
//                    
//                    ctlProp.hideItem( "DSHostName" );
//                    ctlProp.hideItem( "DSPort" );
//                    ctlProp.disableItem( "DSaccept" );
//                    ctlProp.enableItem( "DSreconn" );
//                    ctlProp.disableItem( "RRS" );
//                    break;
//                case "IMSCDC":
//                    propLayout.cells( "a" ).setHeight( 410 );
//                    
//                    typeCombo.addOption( "CDC", "CDC Store" );
//                    typeCombo.addOption( "MQS", "MQ Series" );
//                    typeCombo.addOption( "JMS", "JMS" );

//                    ctlProp.showItem( "boxExtend" );
//                    ctlProp.hideItem( "boxComp" );
//                    ctlProp.hideItem( "boxWTO" );
//                    ctlProp.hideItem( "delBox" );
//                    ctlProp.hideItem( "boxNetezza" );
//                    
//                    ctlProp.hideItem( "DSHostName" );
//                    ctlProp.hideItem( "DSPort" );
//                    ctlProp.disableItem( "DSaccept" );
//                    ctlProp.enableItem( "DSreconn" );
//                    ctlProp.disableItem( "RRS" );
//                    break;
//                case "VSAMCDC":
//                    propLayout.cells( "a" ).setHeight( 410 );

//                    frmNewSDS.addOption( "CDC", "CDC Store" );
//                    typeCombo.addOption( "MQS", "MQ Series" );
//                    typeCombo.addOption( "JMS", "JMS" );

//                    ctlProp.showItem( "boxExtend" );
//                    ctlProp.hideItem( "boxComp" );
//                    ctlProp.hideItem( "boxWTO" );
//                    ctlProp.hideItem( "delBox" );
//                    ctlProp.hideItem( "boxNetezza" );
//                    
//                    ctlProp.hideItem( "DSHostName" );
//                    ctlProp.hideItem( "DSPort" );
//                    ctlProp.enableItem( "DSaccept" );
//                    ctlProp.enableItem( "DSreconn" );
//                    ctlProp.enableItem( "RRS" );
//                    break;
//                case "OracleCDC":
//                    propLayout.cells( "a" ).setHeight( 410 );

//                    typeCombo.addOption( "CDC", "CDC Store" );
//                    typeCombo.addOption( "MQS", "MQ Series" );
//                    typeCombo.addOption( "JMS", "JMS" );

//                    ctlProp.showItem( "boxExtend" );
//                    ctlProp.hideItem( "boxComp" );
//                    ctlProp.hideItem( "boxWTO" );
//                    ctlProp.hideItem( "delBox" );
//                    ctlProp.hideItem( "boxNetezza" );
//                    
//                    ctlProp.hideItem( "DSHostName" );
//                    ctlProp.hideItem( "DSPort" );
//                    ctlProp.disableItem( "DSaccept" );
//                    ctlProp.enableItem( "DSreconn" );
//                    ctlProp.disableItem( "RRS" );
//                    break;
//                case "IMSDB":
//                    propLayout.cells( "a" ).setHeight( 410 );
//                    
//                    typeCombo.addOption( "IMS", "IMS" );

//                    ctlProp.hideItem( "boxExtend" );
//                    ctlProp.hideItem( "boxComp" );
//                    ctlProp.hideItem( "boxWTO" );
//                    ctlProp.hideItem( "delBox" );
//                    ctlProp.hideItem( "boxNetezza" );
//                    
//                    ctlProp.hideItem( "DSHostName" );
//                    ctlProp.hideItem( "DSPort" );
//                    break;
//                case "Netezza":
//                    propLayout.cells( "a" ).setHeight( 410 );
//                   
//                    typeCombo.addOption( "Table", "Relational Table" );

//                    ctlProp.hideItem( "boxExtend" );
//                    ctlProp.hideItem( "boxComp" );
//                    ctlProp.hideItem( "boxWTO" );
//                    ctlProp.hideItem( "delBox" );
//                    ctlProp.showItem( "boxNetezza" );
//                    
//                    ctlProp.hideItem( "DSHostName" );
//                    ctlProp.hideItem( "DSPort" );
//                    break;
//            };
//            if(typeCombo.getSelectedValue() == "TCP")
//            {
//                ctlProp.showItem( "DSHostName" );
//                ctlProp.showItem( "DSPort" );
//            }
//            else
//            {
//                ctlProp.hideItem( "DSHostName" );
//                ctlProp.hideItem( "DSPort" );
//            };
        } );

        // Description Tree
        var ctlPropDescTree = propLayout.cells( "b" ).attachTree();
        ctlPropDescTree.deleteChildItems( '0' );
        ctlPropDescTree.deleteItem( '0' );
        ctlPropDescTree.enableCheckBoxes( true, true );
        ctlPropDescTree.enableSmartCheckboxes( true );
        ctlPropDescTree.setSkin( 'dhx_skyblue' );
        ctlPropDescTree.setImagePath( '../Studio/data/SQDimgs/' );
        ctlPropDescTree.enableTreeImages( true );
        ctlPropDescTree.enableItemEditor( false );
        ctlPropDescTree.enableTreeLines( true );
        ctlPropDescTree.enableThreeStateCheckboxes( '1' );
        
        // Field Attributes area
        var ctlPropFieldPropLayout = propLayout.cells( "c" ).attachLayout( "2U" );
        ctlPropFieldPropLayout.cells( "a" ).setText( "Field Name" );
        ctlPropFieldPropLayout.cells( "a" ).setWidth( 300 );
        ctlPropFieldPropLayout.cells( "b" ).setText( "Field Attributes" );

        // Field Tree
        var ctlPropFieldTree = ctlPropFieldPropLayout.cells( "a" ).attachTree();
        ctlPropFieldTree.deleteChildItems( '0' );
        ctlPropFieldTree.deleteItem( '0' );
        ctlPropFieldTree.setSkin( 'dhx_skyblue' );
        ctlPropFieldTree.setImagePath( '../Studio/data/SQDimgs/' );

        // Field Attributes Grid
        var ctlPropFieldAttbGrid = ctlPropFieldPropLayout.cells( "b" ).attachGrid();
        ctlPropFieldAttbGrid.setImagePath( "../Studio/dhtmlxSuite/dhtmlxGrid/codebase/imgs/" );
        ctlPropFieldAttbGrid.setHeader( "Attribute, Value" );
        ctlPropFieldAttbGrid.setInitWidths( "175,*" );
        ctlPropFieldAttbGrid.setColTypes( "ro,ed" );
        ctlPropFieldAttbGrid.setColAlign( "left, left" );
        ctlPropFieldAttbGrid.setSkin( "dhx_skyblue" );
        ctlPropFieldAttbGrid.init();
        ctlPropFieldAttbGrid.load( "../Studio/data/SQDFldAttbGrid.xml" );

        ctlPropDescTree.attachEvent( "onClick", function ( id )
        {
            eventFromCode = true;
            propLayout.progressOn();
            ctlPropFieldTree.deleteChildItems( '0' );
            ctlPropFieldTree.deleteItem( '0' );
            
            jQuery.ajax( {
                type: 'POST',  //type of request  GET or POST
                url: '../Studio/php/GetDSFieldTree.php', // url to which the request is send
                data: { descId: id, DSName: dsName }, // data to be sent to server
                success: function ( return_data )  // function to be called if the request succeeds
                {
                    //                alert( "Before Tree load data: " + return_data ); 
                    ctlPropFieldTree.loadXMLString( return_data, function ()  // load tree with return data XML
                    {
                        //                    alert( "After Tree load data: " + return_data );
                        ctlPropFieldTree.openAllItems( '0' );
                        ctlPropFieldTree.selectItem( ctlPropFieldTree.getChildItemIdByIndex( '0', '0' ), true );
                        eventFromCode = false;
                        propLayout.progressOff();
                    } );
                },
                error: function ()
                {
                    //function to be called if the request fail
                    propLayout.progressOff();
                    alert( 'error' );
                }
            } );  // end ajax
        } );

        ctlPropFieldTree.attachEvent("onClick", function (id)
        {
            eventFromCode = true;
            propLayout.progressOn();
            // for loop though all field attributes to clear them
            //        alert( "Attr Grid selected id: " + id );
            for (var i = 0; i < FldAttrb.length; i++)
            {
                //            alert("fld attr : " + ctlPropFieldTree.getUserData( id, FldAttrb[i] ));

                ctlPropFieldAttbGrid.cells(FldAttrb[i], 1).setValue(ctlPropFieldTree.getUserData(id, FldAttrb[i]));
            };
            propLayout.progressOff();
            eventFromCode = false;
        });

        ctlPropFieldAttbGrid.attachEvent( "onCellChanged", function ( rId, cInd, nValue )
        {
            // rId = row Id
            // cInd = column index (zero-based)
            // nValue = changed value
            if ( eventFromCode == false )
            {
                propLayout.progressOn();
                // set the tree userdata to the new value
                var nodeId = ctlPropFieldTree.getSelectedItemId();
                // alert( "rId = " + rId + "\ncInd = " + cInd + "\nnValue = " + nValue + "\nnodeId = " + nodeId );

                if ( rId == "IsKey" )
                {
                    if ( nValue == "no" )
                    {
                        updateKey = 1;
                    }
                    else
                    {
                        updateKey = 2;
                        ctlPropFieldTree.setUserData( nodeId, "NullAllowed", "no" );
                    }
                }
                else
                {
                    updateKey = 0;
                };

                ctlPropFieldTree.setUserData( nodeId, rId, nValue );

                // set variables for Ajax
                var DescFldDesc = "";
                var DateFormat = ctlPropFieldTree.getUserData( nodeId, "DateFormat" );
                var Label = ctlPropFieldTree.getUserData( nodeId, "Label" );
                var InitVal = ctlPropFieldTree.getUserData( nodeId, "InitVal" );
                var Retype = ctlPropFieldTree.getUserData( nodeId, "ReType" );
                var Invalid = ctlPropFieldTree.getUserData( nodeId, "Invalid" );
                var ExtType = ctlPropFieldTree.getUserData( nodeId, "ExtType" );
                var isKey = ctlPropFieldTree.getUserData( nodeId, "IsKey" );
                var canNull = ctlPropFieldTree.getUserData( nodeId, "NullAllowed" );

                DescName = ctlPropDescTree.getSelectedItemText();
                SelName = DescName;
                var FldName = ctlPropFieldTree.getSelectedItemText();

                var descId = ctlPropDescTree.getSelectedItemId();
                var $descId = new Array();
                $descId = descId.split('.');
                $descId = $descId.reverse();
                var descType = $descId[0];

                //            alert( "DateFormat = " + DateFormat +
                //            "\nLabel = " + Label +
                //            "\nInitVal = " + InitVal +
                //            "\nRetype = " + Retype +
                //            "\nInvalid = " + Invalid +
                //            "\nExtType = " + ExtType +
                //            "\nDescName = " + DescName +
                //            "\nSelName = " + SelName +
                //            "\nFldName = " + FldName );

                // update the field attributes to the dsselfields table
                jQuery.ajax( {
                    type: 'POST',  //type of request  GET or POST
                    url: '../Studio/php/updateDSselfields.php', // url to which the request is send
                    data: {
                        fldDesc: DescFldDesc,
                        dateFormat: DateFormat,
                        isKey: isKey,
                        canNull: canNull,
                        label: Label,
                        initVal: InitVal,
                        retype: Retype,
                        invalid: Invalid,
                        extType: ExtType,
                        projName: ProjName,
                        envName: EnvName,
                        sysName: SysName,
                        engName: EngName,
                        DSname: dsName,
                        descName: DescName,
                        descType: descType,
                        selName: SelName,
                        fldName: FldName
                    }, // data to be sent to server
                    success: function ( return_data )  // function to be called if the request succeeds
                    {
                        if ( updateKey > 0 )
                        {
                            var image = "";
                            if ( updateKey == 1 )
                            {
                                image = "FieldList.ico";
                            }
                            else
                            {
                                image = "105.ico";
                            };
                            var fldid = descId + "." + FldName;
                            descID = descId;

                            //                        alert( "fldid = " + fldid + "\nimage = " + image + "\nisKey = " + isKey + "\ncanNull = " + canNull );

                            jQuery.ajax( {
                                type: 'POST',  //type of request  GET or POST
                                url: '../Studio/php/updateKeyField.php', // url to which the request is send
                                data: { objid: fldid,
                                    image: image,
                                    isKey: isKey,
                                    canNull: canNull
                                }, // data to be sent to server
                                success: function ( return_data )  // function to be called if the request succeeds
                                {
                                    //                                alert( "return_data: " + return_data );

                                    jQuery.ajax( {
                                        type: 'POST',  //type of request  GET or POST
                                        url: '../Studio/php/GetDSFieldTree.php', // url to which the request is send
                                        data: { descId: descID, DSName: dsName }, // data to be sent to server
                                        success: function ( return_data )  // function to be called if the request succeeds
                                        {
                                            //                                        alert( "Before Tree load data: " + return_data );
                                            ctlPropFieldTree.deleteChildItems( '0' );
                                            ctlPropFieldTree.deleteItem( '0' );
                                            ctlPropFieldTree.loadXMLString( return_data, function ()  // load tree with return data XML
                                            {
                                                propLayout.progressOff();
                                                //                                            alert( "After Tree load data: " + return_data );
                                                ctlPropFieldTree.openAllItems( '0' );
                                                ctlPropFieldTree.selectItem( ctlPropFieldTree.getChildItemIdByIndex( '0', '0' ), true );
                                                eventFromCode = false;
                                            } );
                                        },
                                        error: function ()
                                        {
                                            //function to be called if the request fail
                                            propLayout.progressOff();
                                            alert( 'error loading field tree' );
                                        }
                                    } );  // end ajax
//                                    propLayout.progressOff();
                                },
                                error: function ()
                                {
                                    //function to be called if the request fail
                                    propLayout.progressOff();
                                    alert( 'error updating key fields' );
                                }
                            } );  // end ajax

                        };
                        propLayout.progressOff();
                        //                    alert( "updateDSselfields return data: " + return_data );   
                    },
                    error: function ()
                    {
                        //function to be called if the request fail
                        propLayout.progressOff();
                        alert( 'error updating field attribute' );
                    }
                } );  // end ajax
            }
        } );

        ctlProp.attachEvent( "onButtonClick", function ( name )
        {
            if ( name == "btnSDSSave" )
            {
                propLayout.progressOn();
                if ( ctlProp.validate() )
                {
                    // save form
                    ctlProp.save();
                }
                else
                {
                    propLayout.progressOff();
                };
            }
            else
            {
                doDelete( id );
                propLayout.progressOff();
                //            alert( 'Delete Source Datastore: ' + ctlProp.getItemValue( 'DSName' ) );
            }
        } );

        ctlProp.attachEvent( 'onAfterSave', function ( id, xml )
        {
            propLayout.progressOff();
            IsSaved = true;
            dhtmlx.message( {
                text: "Source Datastore " + ctlProp.getItemValue( 'DSname' ) + " has been saved",
                expire: 5000
            } );
            LoadCtl( previousId, previousTabId );
        } );

        ctlProp.attachEvent( "onChange", function ( name, value )
        {
//            dhtmlx.message( {
//                text: "onChange  name: " + name + "\nvalue: " + value,
//                expire: 5000
//            } );
            IsSaved = false;
//            switch ( name )
//            {
//                case "DSformat":
//                    var typeCombo = ctlProp.getCombo( "DStype" );
//                    typeCombo.clearAll();
//                    ctlProp.setItemValue( "DStype", "" );
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
//                            
//                            ctlProp.showItem( "boxExtend" );
//                            ctlProp.hideItem( "boxComp" );
//                            ctlProp.hideItem( "boxWTO" );
//                            ctlProp.hideItem( "delBox" );
//                            ctlProp.hideItem( "boxNetezza" );
//                    
//                            ctlProp.showItem( "DSHostName" );
//                            ctlProp.showItem( "DSPort" );
//                            ctlProp.enableItem( "DSaccept" );
//                            ctlProp.disableItem( "DSreconn" );
//                            ctlProp.disableItem( "RRS" );
//                            break;
//                        case "Delimited":
//                            propLayout.cells( "a" ).setHeight( 460 );
//                           
//                            typeCombo.addOption( "File", "File" );
//                            typeCombo.addOption( "MQS", "MQ Series" );
//                            typeCombo.addOption( "JMS", "JMS" );
//                            typeCombo.addOption( "TCP", "TCP/IP" );

//                            ctlProp.showItem( "boxExtend" );
//                            ctlProp.hideItem( "boxComp" );
//                            ctlProp.hideItem( "boxWTO" );
//                            ctlProp.showItem( "delBox" );
//                            ctlProp.hideItem( "boxNetezza" );
//                    
//                            ctlProp.showItem( "DSHostName" );
//                            ctlProp.showItem( "DSPort" );
//                            ctlProp.enableItem( "DSaccept" );
//                            ctlProp.disableItem( "DSreconn" );
//                            ctlProp.disableItem( "RRS" );
//                            break;
//                        case "XML":
//                            propLayout.cells( "a" ).setHeight( 410 );
//                            
//                            typeCombo.addOption( "File", "File" );
//                            typeCombo.addOption( "MQS", "MQ Series" );
//                            typeCombo.addOption( "JMS", "JMS" );
//                            typeCombo.addOption( "TCP", "TCP/IP" );

//                            ctlProp.showItem( "boxExtend" );
//                            ctlProp.hideItem( "boxComp" );
//                            ctlProp.hideItem( "boxWTO" );
//                            ctlProp.hideItem( "delBox" );
//                            ctlProp.hideItem( "boxNetezza" );
//                    
//                            ctlProp.showItem( "DSHostName" );
//                            ctlProp.showItem( "DSPort" );
//                            ctlProp.enableItem( "DSaccept" );
//                            ctlProp.disableItem( "DSreconn" );
//                            ctlProp.disableItem( "RRS" );
//                            break;
//                        case "Relational":
//                            propLayout.cells( "a" ).setHeight( 410 );
//                            
//                            typeCombo.addOption( "Table", "Relational Table" );

//                            ctlProp.hideItem( "boxExtend" );
//                            ctlProp.hideItem( "boxComp" );
//                            ctlProp.hideItem( "boxWTO" );
//                            ctlProp.hideItem( "delBox" );
//                            ctlProp.hideItem( "boxNetezza" );
//                    
//                            ctlProp.hideItem( "DSHostName" );
//                            ctlProp.hideItem( "DSPort" );
//                            ctlProp.disableItem( "DSaccept" );
//                            ctlProp.disableItem( "DSreconn" );
//                            ctlProp.disableItem( "RRS" );
//                            break;
//                        case "UTSCDC":
//                            propLayout.cells( "a" ).setHeight( 410 );
//                            
//                            typeCombo.addOption( "CDC", "CDC Store" );
//                            typeCombo.addOption( "MQS", "MQ Series" );
//                            typeCombo.addOption( "JMS", "JMS" );

//                            ctlProp.showItem( "boxExtend" );
//                            ctlProp.hideItem( "boxComp" );
//                            ctlProp.hideItem( "boxWTO" );
//                            ctlProp.hideItem( "delBox" );
//                            ctlProp.hideItem( "boxNetezza" );
//                    
//                            ctlProp.hideItem( "DSHostName" );
//                            ctlProp.hideItem( "DSPort" );
//                            ctlProp.disableItem( "DSaccept" );
//                            ctlProp.disableItem( "DSreconn" );
//                            ctlProp.disableItem( "RRS" );
//                            if ( typeCombo.getSelectedValue() == "CDCStore" )
//                            {
//                                ctlProp.enableItem( "DSaccept" );
//                                ctlProp.enableItem( "DSreconn" );
//                            };
//                            break;
//                        case "DB2CDC":
//                            propLayout.cells( "a" ).setHeight( 410 );

//                            typeCombo.addOption( "CDC", "CDC Store" );
//                            typeCombo.addOption( "MQS", "MQ Series" );
//                            typeCombo.addOption( "JMS", "JMS" );

//                            ctlProp.showItem( "boxExtend" );
//                            ctlProp.hideItem( "boxComp" );
//                            ctlProp.hideItem( "boxWTO" );
//                            ctlProp.hideItem( "delBox" );
//                            ctlProp.hideItem( "boxNetezza" );
//                    
//                            ctlProp.hideItem( "DSHostName" );
//                            ctlProp.hideItem( "DSPort" );
//                            ctlProp.disableItem( "DSaccept" );
//                            ctlProp.enableItem( "DSreconn" );
//                            ctlProp.disableItem( "RRS" );
//                            break;
//                        case "IMSCDC":
//                            propLayout.cells( "a" ).setHeight( 410 );

//                            typeCombo.addOption( "CDC", "CDC Store" );
//                            typeCombo.addOption( "MQS", "MQ Series" );
//                            typeCombo.addOption( "JMS", "JMS" );

//                            ctlProp.showItem( "boxExtend" );
//                            ctlProp.hideItem( "boxComp" );
//                            ctlProp.hideItem( "boxWTO" );
//                            ctlProp.hideItem( "delBox" );
//                            ctlProp.hideItem( "boxNetezza" );
//                    
//                            ctlProp.hideItem( "DSHostName" );
//                            ctlProp.hideItem( "DSPort" );
//                            ctlProp.disableItem( "DSaccept" );
//                            ctlProp.enableItem( "DSreconn" );
//                            ctlProp.disableItem( "RRS" );
//                            break;
//                        case "VSAMCDC":
//                            propLayout.cells( "a" ).setHeight( 410 );

//                            typeCombo.addOption( "CDC", "CDC Store" );
//                            typeCombo.addOption( "MQS", "MQ Series" );
//                            typeCombo.addOption( "JMS", "JMS" );

//                            ctlProp.showItem( "boxExtend" );
//                            ctlProp.hideItem( "boxComp" );
//                            ctlProp.hideItem( "boxWTO" );
//                            ctlProp.hideItem( "delBox" );
//                            ctlProp.hideItem( "boxNetezza" );
//                    
//                            ctlProp.hideItem( "DSHostName" );
//                            ctlProp.hideItem( "DSPort" );
//                            ctlProp.enableItem( "DSaccept" );
//                            ctlProp.enableItem( "DSreconn" );
//                            ctlProp.enableItem( "RRS" );
//                            break;
//                        case "OracleCDC":
//                            propLayout.cells( "a" ).setHeight( 410 );

//                            typeCombo.addOption( "CDC", "CDC Store" );
//                            typeCombo.addOption( "MQS", "MQ Series" );
//                            typeCombo.addOption( "JMS", "JMS" );

//                            ctlProp.showItem( "boxExtend" );
//                            ctlProp.hideItem( "boxComp" );
//                            ctlProp.hideItem( "boxWTO" );
//                            ctlProp.hideItem( "delBox" );
//                            ctlProp.hideItem( "boxNetezza" );
//                    
//                            ctlProp.hideItem( "DSHostName" );
//                            ctlProp.hideItem( "DSPort" );
//                            ctlProp.disableItem( "DSaccept" );
//                            ctlProp.enableItem( "DSreconn" );
//                            ctlProp.disableItem( "RRS" );
//                            break;
//                        case "IMSDB":
//                            propLayout.cells( "a" ).setHeight( 410 );
//                            
//                            typeCombo.addOption( "IMS", "IMS" );

//                            ctlProp.hideItem( "boxExtend" );
//                            ctlProp.hideItem( "boxComp" );
//                            ctlProp.hideItem( "boxWTO" );
//                            ctlProp.hideItem( "delBox" );
//                            ctlProp.hideItem( "boxNetezza" );
//                    
//                            ctlProp.hideItem( "DSHostName" );
//                            ctlProp.hideItem( "DSPort" );
//                            break;
//                        case "Netezza":
//                            propLayout.cells( "a" ).setHeight( 410 );
//                           
//                            typeCombo.addOption( "Table", "Relational Table" );

//                            ctlProp.hideItem( "boxExtend" );
//                            ctlProp.hideItem( "boxComp" );
//                            ctlProp.hideItem( "boxWTO" );
//                            ctlProp.hideItem( "delBox" );
//                            ctlProp.showItem( "boxNetezza" );
//                    
//                            ctlProp.hideItem( "DSHostName" );
//                            ctlProp.hideItem( "DSPort" );
//                            break;
//                    };
//                    break;
//                case "DStype":
//                    switch ( value )
//                    {
//                        case "CDCStore":
//                            ctlProp.hideItem( "DSHostName" );
//                            ctlProp.hideItem( "DSPort" );
//                            break;
//                        case "File":
//                            ctlProp.hideItem( "DSHostName" );
//                            ctlProp.hideItem( "DSPort" );
//                            break;
//                        case "MQS":
//                            ctlProp.hideItem( "DSHostName" );
//                            ctlProp.hideItem( "DSPort" );
//                            break;
//                        case "JMS":
//                            ctlProp.hideItem( "DSHostName" );
//                            ctlProp.hideItem( "DSPort" );
//                            break;
//                        case "TCP":
//                            ctlProp.showItem( "DSHostName" );
//                            ctlProp.showItem( "DSPort" );
//                            break;
//                        case "Table":
//                            ctlProp.hideItem( "DSHostName" );
//                            ctlProp.hideItem( "DSPort" );
//                            break;
//                        case "IMS":
//                            ctlProp.hideItem( "DSHostName" );
//                            ctlProp.hideItem( "DSPort" );
//                            break;
//                        case "VSAM":
//                            ctlProp.hideItem( "DSHostName" );
//                            ctlProp.hideItem( "DSPort" );
//                            break;
//                        default:
//                            break;
//                    };
//                    break;
//                default:
//                    break;
//            }
        } );

        jQuery.ajax( {
            type: 'POST',  //type of request  GET or POST
            url: '../Studio/php/getDSdescTree.php', // url to which the request is send
            data: { projName: CURproj,
                descFldrId: fldrId
            }, // data to be sent to server
            async: false,
            success: function ( return_data )  // function to be called if the request succeeds
            {
//                alert("Before Tree load data: " + return_data);

                ctlPropDescTree.loadXMLString( return_data, function ()  // load tree with return data XML
                {
                    //                main_layout.progressOff();
                    //                                alert( "After Tree load data: " + return_data );
                    ctlPropDescTree.openAllItems( '0' );
                    jQuery.ajax( {
                        type: 'POST',  //type of request  GET or POST
                        url: '../Studio/php/getDSselchecked.php', // url to which the request is send
                        data: { projName: CURproj,
                            DSname: DSName
                        }, // data to be sent to server
                        async: false,
                        success: function ( return_data )  // function to be called if the request succeeds
                        {
                            //                        main_layout.progressOff();
//                                                    alert( "return_data: " + return_data );
                            var checkItems = JSON.parse( return_data );                       //   new Array();
                            //                        checkItems = return_data;
                            //                        alert( "DSselections : " + checkItems );
                            //                        alert( "checkItems.length : " + checkItems.length );
                            //                        alert( "checkItems.tostring : " + checkItems.toString() );
                            //                        alert( "checkItems.[1] : " + checkItems[1] );
                            for ( var i = 0; i < checkItems.length; i++ )
                            {
                                //                            alert( "checkItems[" + i + "]: " + checkItems[i] );
                                newId = idPrefix + checkItems[i];
//                                                            alert( "DSselections Id: " + newId );
                                ctlPropDescTree.setCheck( newId, true );
                            };

//                            var fndID = ctlPropDescTree.findItemIdByLabel(DSdescName, 1, 1);

//                            alert("fndID : " + fndID);

//                            ctlPropDescTree.selectItem(ctlPropDescTree.findItemIdByLabel(DSdescName, 1, 1), true);
                            ctlPropDescTree.findItem(DSdescName, 0, 1);
                        },
                        error: function ()
                        {
                            //function to be called if the request fail
                            propLayout.progressOff();
                            alert( 'error' );
                        }
                    } );  // end ajax
                } );
            },
            error: function ()
            {
                //function to be called if the request fail
                propLayout.progressOff();
                alert( 'error' );
            }
        } );           // end ajax

        propLayout.progressOff();
    }
    catch ( err )
    {
        logError( err.message, err.name, "UserControls.js", "function loadCtlSDS( id, tabId )" );
    }
}  
// ****************************************************************************************************************
function loadCtlTDS( id, tabId )
{
    try
    {
    //    var TDSName;
    //    var TDSdescName;

        var DSName = "";
        var DSdescName = "";
        var fldrId = getProjName( id ) + "." + getEnvName( id ) + ".fldTgtDesc";
        var idPrefix = getProjName( id ) + "." + getEnvName( id ) + ".";
        var SQDtype = MainTree.getUserData( id, "sqdType" );
        var itmId = "";
        var newId;
        var eventFromCode = true;

        //    alert( "id : " + id + '\n' + "SQDtype : " + SQDtype );

        if ( SQDtype == "objTDSsel" )
        {
            DSdescName = MainTree.getItemText( id );
            itmId = idPrefix + DSdescName;
            DSName = MainTree.getItemText( MainTree.getParentId( id ) );
        }
        else
        {
            DSName = MainTree.getItemText( id );
            DSdescName = "";
        }

        //    alert( "itmId: " + itmId );

        var ProjName = getProjName( id );
        var EnvName = getEnvName( id );
        var SysName = getSysName( id );
        var EngName = getEngName( id );
        var dsName = DSName;
        var DescName = "";
        var SelName = "";
        var updateKey = 0;
        var descID = "";

        var structTDS = [
	        { type: "settings", position: "label-left", labelAlign: "left", labelWidth: 90, inputWidth: 180 },
	        { type: "fieldset", label: "Target Datastore Properties", inputWidth: "auto", list: [
                { name: "id", type: "input", label: "id", value: "", readonly: "true", required: true, hidden: true },
			    { name: "objid", type: "input", label: "objid", value: "", readonly: "true", hidden: true },
                { name: "projName", type: "input", label: "Project Name", value: "", readonly: "true", hidden: true },
                { name: "envName", type: "input", label: "Environment Name", value: "", readonly: "true", hidden: true },
                { name: "sysName", type: "input", label: "System Name", value: "", readonly: "true", hidden: true },
			    { name: "engName", type: "input", label: "Engine Name", value: "", readonly: "true", hidden: true },
                { name: "engType", type: "input", label: "Engine Type", value: "", readonly: "true", hidden: false },
                { name: "DSimage", type: "input", label: "Image File", value: "", readonly: "true", hidden: true },
			    { name: "DSname", type: "input", label: "Alias", value: "", required: true, readonly: true },
			    { name: "DSdir", type: "input", label: "DS Direction", value: "", readonly: "true", hidden: true },
			    { name: "DSformat", type: "combo", inputWidth: "180", required: true, label: "Format", options: [
					{ text: "Binary", value: "Binary" },
					{ text: "Delimited", value: "Delimited" },
					{ text: "XML", value: "XML" },
					{ text: "Relational", value: "Relational" },
                    { text: "UTSCDC", value: "UTSCDC" },
                    { text: "DB2CDC", value: "DB2CDC" },
                    { text: "IMSCDC", value: "IMSCDC" },
                    { text: "VSAMCDC", value: "VSAMCDC" },
                    { text: "OracleCDC", value: "OracleCDC" },
					{ text: "IMSDB", value: "IMSDB" },
					{ text: "Netezza", value: "Netezza" }
			    ]
			    },
			    { name: "DStype", type: "combo", inputWidth: "180", required: true, label: "Type", options: [
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
			    { name: "DSHostName", type: "input", label: "Host Name", value: "", hidden: false },
			    { name: "DSPort", type: "input", label: "Port", value: "", hidden: false },
			    { name: "DSKeyChange", type: "checkbox", position: "label-left", labelAlign: "left", labelWidth: 150, hidden: false, label: "Allow for Key changes", checked: false },
			    { name: "DSException", type: "input", label: "Exception", value: "" },
                ]
	        },
			{ type: "fieldset", name: "boxExtend", label: "Extended Properties", inputWidth: "auto", offsetLeft: "0", list: [
                    { name: "DSUOW", type: "input", inputWidth: "90", labelWidth: "50", hidden: true, label: "UOW" },
                    { name: "DSaccept", type: "checkbox", position: "label-right", labelAlign: "left", labelWidth: "140", label: "Accept", checked: false },
                    { name: "DSreconn", type: "checkbox", position: "label-right", labelAlign: "left", labelWidth: "140", label: "Reconnect", checked: false, hidden: false },
			        { type: "newcolumn" },
			        { name: "DSIMSPathData", type: "checkbox", position: "label-left", labelAlign: "right", labelWidth: "100", hidden: false, label: "IMS PathData", checked: false },
			        { name: "DSSkipChangeCheck", type: "checkbox", position: "label-left", labelAlign: "right", labelWidth: "100", hidden: false, label: "Skip Change Check", checked: false },
                    { name: "DSchkBImg", type: "checkbox", position: "label-left", labelAlign: "right", labelWidth: "140",hidden: false, label: "Check Full Before Image", checked: false },
                    { name: "RRS", type: "checkbox", position: "label-left", labelAlign: "right", labelWidth: "140", label: "RRS", checked: false }
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
				{ name: "DSDesc", type: "input", offsetLeft: "0", inputWidth: "245", rows: "3", value: "" }
			]
            },
            { type: "fieldset", inputWidth: "auto", offsetLeft: "0", list: [
			    { name: "btnTDSSave", type: "button", width: "80", value: "Save" },
			    { type: "newcolumn" },
			    { name: "btnTDSDelete", type: "button", width: "80", value: "Delete" }
		    ]
		    }		    
        ];

        var propLayout = Tabbar_user_control.cells( "tabProp" ).attachLayout( "3U" );
        propLayout.cells( "a" ).setText( "Properties" );
        propLayout.cells( "a" ).setHeight( 330 );
        propLayout.cells( "a" ).setWidth( 400 );
        propLayout.cells( "b" ).setText( "Description(s)" );
        //            propLayout.cells( "c" ).setText( "Fields" );
        propLayout.cells( "c" ).setWidth( 300 );
        propLayout.progressOn();

        // Form TDS
        var ctlProp = propLayout.cells( "a" ).attachForm( structTDS );
        ctlProp.setFontSize( '11px' );
        var dp = new dataProcessor( "../Studio/php/loadDS.php" ); //initiate dataprocessor
        dp.init( ctlProp ); //link form to dataprocessor
        //    alert( 'loadCtlEnv Name: ' + id + "\n" + "../Studio/php/loadEnv.php?id=" + tabId );
        ctlProp.load( "../Studio/php/loadDS.php?id=" + tabId );
        ctlProp.attachEvent( "onXLE", function ()
        {
            var typeCombo = ctlProp.getCombo( "DStype" );
//            typeCombo.clearAll();
            var operCombo = ctlProp.getCombo( "DSOperationType" );
//            operCombo.clearAll();
//            switch ( ctlProp.getItemValue( "DSformat" ) )
//            {
//                case "Binary":
//                    propLayout.cells( "a" ).setHeight( 400 );
//                    
//                    typeCombo.addOption( "File", "File" );
//                    typeCombo.addOption( "MQS", "MQ Series" );
//                    typeCombo.addOption( "JMS", "JMS" );
//                    typeCombo.addOption( "TCP", "TCP/IP" );
//                    typeCombo.addOption( "VSAM", "VSAM" );

//                    ctlProp.hideItem( "boxExtend" );
//                    ctlProp.hideItem( "boxComp" );
//                    ctlProp.hideItem( "boxWTO" );
//                    ctlProp.hideItem( "delBox" );
//                    ctlProp.hideItem( "boxNetezza" );

//                    ctlProp.showItem( "DSHostName" );
//                    ctlProp.showItem( "DSPort" );
//                    ctlProp.hideItem( "DSaccept" );
//                    ctlProp.disableItem( "DSreconn" );
//                    ctlProp.disableItem( "RRS" );
//                    break;
//                case "Delimited":
//                    propLayout.cells( "a" ).setHeight( 450 );
//                    
//                    typeCombo.addOption( "File", "File" );
//                    typeCombo.addOption( "MQS", "MQ Series" );
//                    typeCombo.addOption( "JMS", "JMS" );
//                    typeCombo.addOption( "TCP", "TCP/IP" );

//                    ctlProp.hideItem( "boxExtend" );
//                    ctlProp.hideItem( "boxComp" );
//                    ctlProp.hideItem( "boxWTO" );
//                    ctlProp.showItem( "delBox" );
//                    ctlProp.hideItem( "boxNetezza" );

//                    ctlProp.showItem( "DSHostName" );
//                    ctlProp.showItem( "DSPort" );
//                    ctlProp.hideItem( "DSaccept" );
//                    ctlProp.disableItem( "DSreconn" );
//                    ctlProp.disableItem( "RRS" );
//                    break;
//                case "XML":
//                    propLayout.cells( "a" ).setHeight( 400 );
//                   
//                    typeCombo.addOption( "File", "File" );
//                    typeCombo.addOption( "MQS", "MQ Series" );
//                    typeCombo.addOption( "JMS", "JMS" );
//                    typeCombo.addOption( "TCP", "TCP/IP" );

//                    ctlProp.hideItem( "boxExtend" );
//                    ctlProp.hideItem( "boxComp" );
//                    ctlProp.hideItem( "boxWTO" );
//                    ctlProp.hideItem( "delBox" );
//                    ctlProp.hideItem( "boxNetezza" );

//                    ctlProp.showItem( "DSHostName" );
//                    ctlProp.showItem( "DSPort" );
//                    ctlProp.hideItem( "DSaccept" );
//                    ctlProp.disableItem( "DSreconn" );
//                    ctlProp.disableItem( "RRS" );
//                    break;
//                case "Relational":
//                    propLayout.cells( "a" ).setHeight( 400 );
//                    
//                    typeCombo.addOption( "RDBMS", "RDBMS Global" );
//                    typeCombo.addOption( "Table", "Relational Table" );

//                    ctlProp.hideItem( "boxExtend" );
//                    ctlProp.showItem( "boxComp" );
//                    ctlProp.showItem( "boxWTO" );
//                    ctlProp.hideItem( "delBox" );
//                    ctlProp.hideItem( "boxNetezza" );

//                    ctlProp.hideItem( "DSHostName" );
//                    ctlProp.hideItem( "DSPort" );
//                    ctlProp.hideItem( "DSaccept" );
//                    ctlProp.disableItem( "DSreconn" );
//                    ctlProp.disableItem( "RRS" );
//                    break;
//                case "UTSCDC":
//                    propLayout.cells( "a" ).setHeight( 400 );
//                    
//                    typeCombo.addOption( "MQS", "MQ Series" );
//                    typeCombo.addOption( "JMS", "JMS" );

//                    ctlProp.showItem( "boxExtend" );
//                    ctlProp.showItem( "boxComp" );
//                    ctlProp.showItem( "boxWTO" );
//                    ctlProp.hideItem( "delBox" );
//                    ctlProp.hideItem( "boxNetezza" );

//                    ctlProp.hideItem( "DSHostName" );
//                    ctlProp.hideItem( "DSPort" );
//                    ctlProp.hideItem( "DSaccept" );
//                    ctlProp.disableItem( "DSreconn" );
//                    ctlProp.disableItem( "RRS" );
//                    if ( typeCombo.getSelectedValue() == "CDCStore" )
//                    {
//                        ctlProp.enableItem( "DSaccept" );
//                    };
//                    break;
//                case "DB2CDC":
//                    propLayout.cells( "a" ).setHeight( 400 );
//                    
//                    typeCombo.addOption( "MQS", "MQ Series" );
//                    typeCombo.addOption( "JMS", "JMS" );

//                    ctlProp.showItem( "boxExtend" );
//                    ctlProp.showItem( "boxComp" );
//                    ctlProp.showItem( "boxWTO" );
//                    ctlProp.hideItem( "delBox" );
//                    ctlProp.hideItem( "boxNetezza" );

//                    ctlProp.hideItem( "DSHostName" );
//                    ctlProp.hideItem( "DSPort" );
//                    ctlProp.hideItem( "DSaccept" );
//                    ctlProp.enableItem( "DSreconn" );
//                    ctlProp.disableItem( "RRS" );
//                    break;
//                case "IMSCDC":
//                    propLayout.cells( "a" ).setHeight( 400 );
//                    
//                    typeCombo.addOption( "MQS", "MQ Series" );
//                    typeCombo.addOption( "JMS", "JMS" );

//                    ctlProp.showItem( "boxExtend" );
//                    ctlProp.showItem( "boxComp" );
//                    ctlProp.showItem( "boxWTO" );
//                    ctlProp.hideItem( "delBox" );
//                    ctlProp.hideItem( "boxNetezza" );

//                    ctlProp.hideItem( "DSHostName" );
//                    ctlProp.hideItem( "DSPort" );
//                    ctlProp.hideItem( "DSaccept" );
//                    ctlProp.enableItem( "DSreconn" );
//                    ctlProp.disableItem( "RRS" );
//                    break;
//                case "VSAMCDC":
//                    propLayout.cells( "a" ).setHeight( 400 );
//                    
//                    typeCombo.addOption( "MQS", "MQ Series" );
//                    typeCombo.addOption( "JMS", "JMS" );

//                    ctlProp.showItem( "boxExtend" );
//                    ctlProp.showItem( "boxComp" );
//                    ctlProp.showItem( "boxWTO" );
//                    ctlProp.hideItem( "delBox" );
//                    ctlProp.hideItem( "boxNetezza" );

//                    ctlProp.hideItem( "DSHostName" );
//                    ctlProp.hideItem( "DSPort" );
//                    ctlProp.hideItem( "DSaccept" );
//                    ctlProp.enableItem( "DSreconn" );
//                    ctlProp.enableItem( "RRS" );
//                    break;
//                case "OracleCDC":
//                    propLayout.cells( "a" ).setHeight( 400 );
//                   
//                    typeCombo.addOption( "MQS", "MQ Series" );
//                    typeCombo.addOption( "JMS", "JMS" );

//                    ctlProp.showItem( "boxExtend" );
//                    ctlProp.showItem( "boxComp" );
//                    ctlProp.showItem( "boxWTO" );
//                    ctlProp.hideItem( "delBox" );
//                    ctlProp.hideItem( "boxNetezza" );

//                    ctlProp.hideItem( "DSHostName" );
//                    ctlProp.hideItem( "DSPort" );
//                    ctlProp.hideItem( "DSaccept" );
//                    ctlProp.enableItem( "DSreconn" );
//                    ctlProp.disableItem( "RRS" );
//                    break;
//                case "IMSDB":
//                    propLayout.cells( "a" ).setHeight( 400 );
//                    
//                    typeCombo.addOption( "IMS", "IMS" );

//                    ctlProp.hideItem( "boxExtend" );
//                    ctlProp.showItem( "boxComp" );
//                    ctlProp.showItem( "boxWTO" );
//                    ctlProp.hideItem( "delBox" );
//                    ctlProp.hideItem( "boxNetezza" );

//                    ctlProp.hideItem( "DSHostName" );
//                    ctlProp.hideItem( "DSPort" );
//                    ctlProp.hideItem( "DSaccept" );
//                    ctlProp.disableItem( "DSreconn" );
//                    ctlProp.disableItem( "RRS" );
//                    break;
//                case "Netezza":
//                    propLayout.cells( "a" ).setHeight( 400 );
//                   
//                    typeCombo.addOption( "RDBMS", "RDBMS Global" );
//                    typeCombo.addOption( "Table", "Relational Table" );

//                    ctlProp.hideItem( "boxExtend" );
//                    ctlProp.showItem( "boxComp" );
//                    ctlProp.showItem( "boxWTO" );
//                    ctlProp.hideItem( "delBox" );
//                    ctlProp.showItem( "boxNetezza" );

//                    ctlProp.hideItem( "DSHostName" );
//                    ctlProp.hideItem( "DSPort" );
//                    ctlProp.hideItem( "DSaccept" );
//                    ctlProp.disableItem( "DSreconn" );
//                    ctlProp.disableItem( "RRS" );
//                    break;
//            };
//            switch ( ctlProp.getItemValue( "DStype" ) )
//            {
//                case "File":
//                    operCombo.addOption( "Insert", "Insert" );
//                    ctlProp.hideItem( "DSHostName" );
//                    ctlProp.hideItem( "DSPort" );
//                    break;
//                case "MQS":
//                    operCombo.addOption( "Insert", "Insert" );
//                    ctlProp.hideItem( "DSHostName" );
//                    ctlProp.hideItem( "DSPort" );
//                    break;
//                case "JMS":
//                    operCombo.addOption( "Insert", "Insert" );
//                    ctlProp.hideItem( "DSHostName" );
//                    ctlProp.hideItem( "DSPort" );
//                    break;
//                case "TCP":
//                    operCombo.addOption( "Insert", "Insert" );
//                    ctlProp.showItem( "DSHostName" );
//                    ctlProp.showItem( "DSPort" );
//                    break;
//                case "RDBMS":
//                    operCombo.addOption( "Insert", "Insert" );
//                    operCombo.addOption( "Change", "Change" );
//                    ctlProp.hideItem( "DSHostName" );
//                    ctlProp.hideItem( "DSPort" );
//                    break;
//                case "Table":
//                    operCombo.addOption( "Insert", "Insert" );
//                    operCombo.addOption( "Change", "Change" );
//                    ctlProp.hideItem( "DSHostName" );
//                    ctlProp.hideItem( "DSPort" );
//                    break;
//                case "IMS":
//                    operCombo.addOption( "Insert", "Insert" );
//                    operCombo.addOption( "Change", "Change" );
//                    ctlProp.hideItem( "DSHostName" );
//                    ctlProp.hideItem( "DSPort" );
//                    break;
//                case "VSAM":
//                    operCombo.addOption( "Insert", "Insert" );
//                    operCombo.addOption( "Change", "Change" );
//                    ctlProp.hideItem( "DSHostName" );
//                    ctlProp.hideItem( "DSPort" );
//                    break;
//                default:
//                    break;
//            };
        } );

        // Description Tree
        var ctlPropDescTree = propLayout.cells( "b" ).attachTree();
        ctlPropDescTree.deleteChildItems( '0' );
        ctlPropDescTree.deleteItem( '0' );
        ctlPropDescTree.enableCheckBoxes( true, true );
        ctlPropDescTree.setSkin( 'dhx_skyblue' );
        ctlPropDescTree.setImagePath( '../Studio/data/SQDimgs/' );
        ctlPropDescTree.enableTreeImages( true );
        ctlPropDescTree.enableItemEditor( false );
        ctlPropDescTree.enableTreeLines( true );
        ctlPropDescTree.enableThreeStateCheckboxes( '1' );

        // Field Attributes area
        var ctlPropFieldPropLayout = propLayout.cells( "c" ).attachLayout( "2U" );
        ctlPropFieldPropLayout.cells( "a" ).setText( "Field Name" );
        ctlPropFieldPropLayout.cells( "a" ).setWidth( 300 );
        ctlPropFieldPropLayout.cells( "b" ).setText( "Field Attributes" );

        // Field Attributes Grid
        var ctlPropFieldAttbGrid = ctlPropFieldPropLayout.cells( "b" ).attachGrid();
        ctlPropFieldAttbGrid.setImagePath( "../Studio/dhtmlxSuite/dhtmlxGrid/codebase/imgs/" );
        ctlPropFieldAttbGrid.setHeader( "Attribute, Value" );
        ctlPropFieldAttbGrid.setInitWidths( "175,*" );
        ctlPropFieldAttbGrid.setColTypes( "ro,ed" );
        ctlPropFieldAttbGrid.setColAlign( "left, left" );
        ctlPropFieldAttbGrid.setSkin( "dhx_skyblue" );

        //    ctlPropFieldAttbGrid.setCellExcellType( "ReType", 1, "co" );
        ctlPropFieldAttbGrid.init();
        ctlPropFieldAttbGrid.load( "../Studio/data/SQDFldAttbGrid.xml" );

        // Field Tree
        var ctlPropFieldTree = ctlPropFieldPropLayout.cells( "a" ).attachTree();
        ctlPropFieldTree.deleteChildItems( '0' );
        ctlPropFieldTree.deleteItem( '0' );
        ctlPropFieldTree.setSkin( 'dhx_skyblue' );
        ctlPropFieldTree.setImagePath( '../Studio/data/SQDimgs/' );

        ctlPropDescTree.attachEvent( "onClick", function ( id )
        {
            propLayout.progressOn();
            ctlPropFieldTree.deleteChildItems( '0' );
            ctlPropFieldTree.deleteItem( '0' );
            eventFromCode = true;
            jQuery.ajax( {
                type: 'POST',  //type of request  GET or POST
                url: '../Studio/php/GetDSFieldTree.php', // url to which the request is send
                data: { descId: id, DSName: dsName }, // data to be sent to server
                success: function ( return_data )  // function to be called if the request succeeds
                {
                    //                                alert( "Before Tree load data: " + return_data ); 
                    ctlPropFieldTree.loadXMLString( return_data, function ()  // load tree with return data XML
                    {
                        propLayout.progressOff();
                        //                    alert( "After Tree load data: " + return_data );
                        ctlPropFieldTree.openAllItems( '0' );
                        ctlPropFieldTree.selectItem( ctlPropFieldTree.getChildItemIdByIndex( '0', '0' ), true );
                        eventFromCode = false;
                    } );
                },
                error: function ()
                {
                    //function to be called if the request fail
                    propLayout.progressOff();
                    alert( 'error' );
                }
            } );  // end ajax
        } );

        ctlPropFieldTree.attachEvent("onClick", function (id)
        {
            eventFromCode = true;
            propLayout.progressOn();
            // for loop though all field attributes to clear them
            //        alert( "Attr Grid selected id: " + id );
            for (var i = 0; i < FldAttrb.length; i++)
            {
                //            alert("fld attr : " + ctlPropFieldTree.getUserData( id, FldAttrb[i] ));

                ctlPropFieldAttbGrid.cells(FldAttrb[i], 1).setValue(ctlPropFieldTree.getUserData(id, FldAttrb[i]));
            };
            propLayout.progressOff();
            eventFromCode = false;
        });

        ctlPropFieldAttbGrid.attachEvent("onCellChanged", function (rId, cInd, nValue)
        {
            // rId = row Id
            // cInd = column index (zero-based)
            // nValue = changed value
            if (eventFromCode == false)
            {
                propLayout.progressOn();
                // set the tree userdata to the new value
                var nodeId = ctlPropFieldTree.getSelectedItemId();

                //            alert( "rId = " + rId + "\ncInd = " + cInd + "\nnValue = " + nValue + "\nnodeId = " + nodeId );

                if (rId == "IsKey")
                {
                    if (nValue == "no")
                    {
                        updateKey = 1;
                    }
                    else
                    {
                        updateKey = 2;
                        ctlPropFieldTree.setUserData(nodeId, "NullAllowed", "no");
                    }
                }
                else
                {
                    updateKey = 0;
                };

                ctlPropFieldTree.setUserData(nodeId, rId, nValue);

                // set variables for Ajax
                var DescFldDesc = "";
                var DateFormat = ctlPropFieldTree.getUserData(nodeId, "DateFormat");
                var Label = ctlPropFieldTree.getUserData(nodeId, "Label");
                var InitVal = ctlPropFieldTree.getUserData(nodeId, "InitVal");
                var Retype = ctlPropFieldTree.getUserData(nodeId, "ReType");
                var Invalid = ctlPropFieldTree.getUserData(nodeId, "Invalid");
                var ExtType = ctlPropFieldTree.getUserData(nodeId, "ExtType");
                var isKey = ctlPropFieldTree.getUserData(nodeId, "IsKey");
                var canNull = ctlPropFieldTree.getUserData(nodeId, "NullAllowed");

                DescName = ctlPropDescTree.getSelectedItemText();
                SelName = DescName;
                var FldName = ctlPropFieldTree.getSelectedItemText();

                var descId = ctlPropDescTree.getSelectedItemId();
                var $descId = new Array();
                $descId = descId.split('.');
                $descId = $descId.reverse();
                var descType = $descId[0];

                //            alert( "DateFormat = " + DateFormat +
                //                        "\nLabel = " + Label +
                //                        "\nInitVal = " + InitVal +
                //                        "\nRetype = " + Retype +
                //                        "\nInvalid = " + Invalid +
                //                        "\nExtType = " + ExtType +
                //                        "\nDescName = " + DescName +
                //                        "\nSelName = " + SelName +
                //                        "\nFldName = " + FldName );

                // update the field attributes to the dsselfields table
                jQuery.ajax({
                    type: 'POST',  //type of request  GET or POST
                    url: '../Studio/php/updateDSselfields.php', // url to which the request is send
                    data: {
                        fldDesc: DescFldDesc,
                        dateFormat: DateFormat,
                        isKey: isKey,
                        canNull: canNull,
                        label: Label,
                        initVal: InitVal,
                        retype: Retype,
                        invalid: Invalid,
                        extType: ExtType,
                        projName: ProjName,
                        envName: EnvName,
                        sysName: SysName,
                        engName: EngName,
                        DSname: dsName,
                        descName: DescName,
                        descType: descType,
                        selName: SelName,
                        fldName: FldName
                    }, // data to be sent to server
                    success: function (return_data)  // function to be called if the request succeeds
                    {
                        //                    alert( "return_data = " + return_data );

                        if (updateKey > 0)
                        {
                            var image = "";
                            if (updateKey == 1)
                            {
                                image = "FieldList.ico";
                            }
                            else
                            {
                                image = "105.ico";
                            };
                            var fldid = descId + "." + FldName;
                            descID = descId;

                            //                        alert( "fldid = " + fldid + "\nimage = " + image + "\nisKey = " + isKey + "\ncanNull = " + canNull );

                            jQuery.ajax({
                                type: 'POST',  //type of request  GET or POST
                                url: '../Studio/php/updateKeyField.php', // url to which the request is send
                                data: { objid: fldid,
                                    image: image,
                                    isKey: isKey,
                                    canNull: canNull
                                }, // data to be sent to server
                                success: function (return_data)  // function to be called if the request succeeds
                                {
                                    //                                alert( "return_data: " + return_data );

                                    jQuery.ajax({
                                        type: 'POST',  //type of request  GET or POST
                                        url: '../Studio/php/GetDSFieldTree.php', // url to which the request is send
                                        data: { descId: descID, DSName: dsName }, // data to be sent to server
                                        success: function (return_data)  // function to be called if the request succeeds
                                        {
                                            //                                        alert( "Before Tree load data: " + return_data );
                                            ctlPropFieldTree.deleteChildItems('0');
                                            ctlPropFieldTree.deleteItem('0');
                                            ctlPropFieldTree.loadXMLString(return_data, function ()  // load tree with return data XML
                                            {
                                                propLayout.progressOff();
                                                //                                            alert( "After Tree load data: " + return_data );
                                                ctlPropFieldTree.openAllItems('0');
                                                //                                            ctlPropFieldTree.selectItem( fldid, true );
                                                ctlPropFieldTree.selectItem(ctlPropFieldTree.getChildItemIdByIndex('0', '0'), true);
                                                eventFromCode = false;
                                            });
                                        },
                                        error: function ()
                                        {
                                            //function to be called if the request fail
                                            propLayout.progressOff();
                                            alert('error');
                                        }
                                    });  // end ajax
                                    propLayout.progressOff();
                                },
                                error: function ()
                                {
                                    //function to be called if the request fail
                                    propLayout.progressOff();
                                    alert('error');
                                }
                            });  // end ajax

                        };
                        propLayout.progressOff();

                        //                    alert( "updateDSselfields return data: " + return_data );   
                    },
                    error: function ()
                    {
                        //function to be called if the request fail
                        propLayout.progressOff();
                        alert('error updating field attribute');
                    }
                });  // end ajax
            }
        });

        ctlProp.attachEvent( "onButtonClick", function ( name )
        {
            if ( name == "btnTDSSave" )
            {
                propLayout.progressOn();
                if ( ctlProp.validate() )
                {
                     ctlProp.save();
                }
            }
            else
            {
                doDelete( id );
                propLayout.progressOff();
    //            alert( 'Delete Target Datastore: ' + ctlProp.getItemValue( 'DSname' ) );
            }
        } );

        ctlProp.attachEvent( 'onAfterSave', function ( id, xml )
        {
            propLayout.progressOff();
            IsSaved = true;
            dhtmlx.message( {
                text: "Target Datastore " + ctlProp.getItemValue( 'DSname' ) + " has been saved",
                expire: 5000
            } );
            LoadCtl( previousId, previousTabId );
        } );

        ctlProp.attachEvent( "onChange", function ( name, value )
        {
//            dhtmlx.message( {
//                text: "onChange  name: " + name + "\nvalue: " + value,
//                expire: 5000
//            } );
            IsSaved = false;
            switch ( name )
            {
//                case "DSformat":
//                    var typeCombo = ctlProp.getCombo( "DStype" );
//                    typeCombo.clearAll();
//                    ctlProp.setItemValue( "DStype", "" );
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

//                            ctlProp.hideItem( "boxExtend" );
//                            ctlProp.hideItem( "boxComp" );
//                            ctlProp.hideItem( "boxWTO" );
//                            ctlProp.hideItem( "delBox" );
//                            ctlProp.hideItem( "boxNetezza" );

//                            ctlProp.hideItem( "DSHostName" );
//                            ctlProp.hideItem( "DSPort" );
//                            ctlProp.hideItem( "DSaccept" );
//                            ctlProp.disableItem( "DSreconn" );
//                            ctlProp.disableItem( "RRS" );
//                            break;
//                        case "Delimited":
//                            propLayout.cells( "a" ).setHeight( 450 );
//                            
//                            typeCombo.addOption( "File", "File" );
//                            typeCombo.addOption( "MQS", "MQ Series" );
//                            typeCombo.addOption( "JMS", "JMS" );
//                            typeCombo.addOption( "TCP", "TCP/IP" );

//                            ctlProp.hideItem( "boxExtend" );
//                            ctlProp.hideItem( "boxComp" );
//                            ctlProp.hideItem( "boxWTO" );
//                            ctlProp.showItem( "delBox" );
//                            ctlProp.hideItem( "boxNetezza" );

//                            ctlProp.hideItem( "DSHostName" );
//                            ctlProp.hideItem( "DSPort" );
//                            ctlProp.hideItem( "DSaccept" );
//                            ctlProp.disableItem( "DSreconn" );
//                            ctlProp.disableItem( "RRS" );
//                            break;
//                        case "XML":
//                            propLayout.cells( "a" ).setHeight( 400 );
//                           
//                            typeCombo.addOption( "File", "File" );
//                            typeCombo.addOption( "MQS", "MQ Series" );
//                            typeCombo.addOption( "JMS", "JMS" );
//                            typeCombo.addOption( "TCP", "TCP/IP" );

//                            ctlProp.hideItem( "boxExtend" );
//                            ctlProp.hideItem( "boxComp" );
//                            ctlProp.hideItem( "boxWTO" );
//                            ctlProp.hideItem( "delBox" );
//                            ctlProp.hideItem( "boxNetezza" );

//                            ctlProp.hideItem( "DSHostName" );
//                            ctlProp.hideItem( "DSPort" );
//                            ctlProp.hideItem( "DSaccept" );
//                            ctlProp.disableItem( "DSreconn" );
//                            ctlProp.disableItem( "RRS" );
//                            break;
//                        case "Relational":
//                            propLayout.cells( "a" ).setHeight( 400 );
//                           
//                            typeCombo.addOption( "RDBMS", "RDBMS Global" );
//                            typeCombo.addOption( "Table", "Relational Table" );

//                            ctlProp.hideItem( "boxExtend" );
//                            ctlProp.showItem( "boxComp" );
//                            ctlProp.showItem( "boxWTO" );
//                            ctlProp.hideItem( "delBox" );
//                            ctlProp.hideItem( "boxNetezza" );

//                            ctlProp.hideItem( "DSHostName" );
//                            ctlProp.hideItem( "DSPort" );
//                            ctlProp.hideItem( "DSaccept" );
//                            ctlProp.disableItem( "DSreconn" );
//                            ctlProp.disableItem( "RRS" );
//                            break;
//                        case "UTSCDC":
//                            propLayout.cells( "a" ).setHeight( 400 );
//                            
//                            typeCombo.addOption( "MQS", "MQ Series" );
//                            typeCombo.addOption( "JMS", "JMS" );

//                            ctlProp.showItem( "boxExtend" );
//                            ctlProp.showItem( "boxComp" );
//                            ctlProp.showItem( "boxWTO" );
//                            ctlProp.hideItem( "delBox" );
//                            ctlProp.hideItem( "boxNetezza" );

//                            ctlProp.hideItem( "DSHostName" );
//                            ctlProp.hideItem( "DSPort" );
//                            ctlProp.hideItem( "DSaccept" );
//                            ctlProp.disableItem( "DSreconn" );
//                            ctlProp.disableItem( "RRS" );
//                            if ( typeCombo.getSelectedValue() == "CDCStore" )
//                            {
//                                ctlProp.enableItem( "DSaccept" );
//                            };
//                            break;
//                        case "DB2CDC":
//                            propLayout.cells( "a" ).setHeight( 400 );
//                           
//                            typeCombo.addOption( "MQS", "MQ Series" );
//                            typeCombo.addOption( "JMS", "JMS" );

//                            ctlProp.showItem( "boxExtend" );
//                            ctlProp.showItem( "boxComp" );
//                            ctlProp.showItem( "boxWTO" );
//                            ctlProp.hideItem( "delBox" );
//                            ctlProp.hideItem( "boxNetezza" );

//                            ctlProp.hideItem( "DSHostName" );
//                            ctlProp.hideItem( "DSPort" );
//                            ctlProp.hideItem( "DSaccept" );
//                            ctlProp.enableItem( "DSreconn" );
//                            ctlProp.disableItem( "RRS" );
//                            break;
//                        case "IMSCDC":
//                            propLayout.cells( "a" ).setHeight( 400 );
//                            
//                            typeCombo.addOption( "MQS", "MQ Series" );
//                            typeCombo.addOption( "JMS", "JMS" );

//                            ctlProp.showItem( "boxExtend" );
//                            ctlProp.showItem( "boxComp" );
//                            ctlProp.showItem( "boxWTO" );
//                            ctlProp.hideItem( "delBox" );
//                            ctlProp.hideItem( "boxNetezza" );

//                            ctlProp.hideItem( "DSHostName" );
//                            ctlProp.hideItem( "DSPort" );
//                            ctlProp.hideItem( "DSaccept" );
//                            ctlProp.enableItem( "DSreconn" );
//                            ctlProp.disableItem( "RRS" );
//                            break;
//                        case "VSAMCDC":
//                            propLayout.cells( "a" ).setHeight( 400 );
//                            
//                            typeCombo.addOption( "MQS", "MQ Series" );
//                            typeCombo.addOption( "JMS", "JMS" );

//                            ctlProp.showItem( "boxExtend" );
//                            ctlProp.showItem( "boxComp" );
//                            ctlProp.showItem( "boxWTO" );
//                            ctlProp.hideItem( "delBox" );
//                            ctlProp.hideItem( "boxNetezza" );

//                            ctlProp.hideItem( "DSHostName" );
//                            ctlProp.hideItem( "DSPort" );
//                            ctlProp.hideItem( "DSaccept" );
//                            ctlProp.enableItem( "DSreconn" );
//                            ctlProp.enableItem( "RRS" );
//                            break;
//                        case "OracleCDC":
//                            propLayout.cells( "a" ).setHeight( 400 );
//                           
//                            typeCombo.addOption( "MQS", "MQ Series" );
//                            typeCombo.addOption( "JMS", "JMS" );

//                            ctlProp.showItem( "boxExtend" );
//                            ctlProp.showItem( "boxComp" );
//                            ctlProp.showItem( "boxWTO" );
//                            ctlProp.hideItem( "delBox" );
//                            ctlProp.hideItem( "boxNetezza" );

//                            ctlProp.hideItem( "DSHostName" );
//                            ctlProp.hideItem( "DSPort" );
//                            ctlProp.hideItem( "DSaccept" );
//                            ctlProp.enableItem( "DSreconn" );
//                            ctlProp.disableItem( "RRS" );
//                            break;
//                        case "IMSDB":
//                            propLayout.cells( "a" ).setHeight( 400 );
//                            ctlProp.hideItem( "delBox" );
//                            ctlProp.hideItem( "boxNetezza" );
//                            typeCombo.addOption( "IMS", "IMS" );

//                            ctlProp.hideItem( "boxExtend" );
//                            ctlProp.showItem( "boxComp" );
//                            ctlProp.showItem( "boxWTO" );
//                            ctlProp.hideItem( "delBox" );
//                            ctlProp.hideItem( "boxNetezza" );

//                            ctlProp.hideItem( "DSHostName" );
//                            ctlProp.hideItem( "DSPort" );
//                            ctlProp.hideItem( "DSaccept" );
//                            ctlProp.disableItem( "DSreconn" );
//                            ctlProp.disableItem( "RRS" );
//                            break;
//                        case "Netezza":
//                            propLayout.cells( "a" ).setHeight( 400 );
//                           
//                            typeCombo.addOption( "RDBMS", "RDBMS Global" );
//                            typeCombo.addOption( "Table", "Relational Table" );

//                            ctlProp.hideItem( "boxExtend" );
//                            ctlProp.showItem( "boxComp" );
//                            ctlProp.showItem( "boxWTO" );
//                            ctlProp.hideItem( "delBox" );
//                            ctlProp.showItem( "boxNetezza" );

//                            ctlProp.hideItem( "DSHostName" );
//                            ctlProp.hideItem( "DSPort" );
//                            ctlProp.hideItem( "DSaccept" );
//                            ctlProp.disableItem( "DSreconn" );
//                            ctlProp.disableItem( "RRS" );
//                            break;
//                    };
//                    break;
//                case "DStype":
//                    var operCombo = ctlProp.getCombo( "DSOperationType" );
//                    operCombo.clearAll();
//                    ctlProp.setItemValue( "DSOperationType", "" );
//                    switch ( value )
//                    {
//                        case "File":
//                            operCombo.addOption( "Insert", "Insert" );
//                            break;
//                        case "MQS":
//                            operCombo.addOption( "Insert", "Insert" );
//                            break;
//                        case "JMS":
//                            operCombo.addOption( "Insert", "Insert" );
//                            break;
//                        case "TCP":
//                            operCombo.addOption( "Insert", "Insert" );
//                            ctlProp.showItem( "DSHostName" );
//                            ctlProp.showItem( "DSPort" );
//                            break;
//                        case "RDBMS":
//                            operCombo.addOption( "Insert", "Insert" );
//                            operCombo.addOption( "Change", "Change" );
//                            break;
//                        case "Table":
//                            operCombo.addOption( "Insert", "Insert" );
//                            operCombo.addOption( "Change", "Change" );
//                            break;
//                        case "IMS":
//                            operCombo.addOption( "Insert", "Insert" );
//                            operCombo.addOption( "Change", "Change" );
//                            break;
//                        case "VSAM":
//                            operCombo.addOption( "Insert", "Insert" );
//                            operCombo.addOption( "Change", "Change" );
//                            break;
//                        default:
//                            break;
//                    };
//                    break;
                case "DScomp":
                    if( ctlProp.isItemChecked("DScomp"))
                    {
                        ctlProp.uncheckItem( "DScompWarn" );
                        ctlProp.uncheckItem( "DSnoComp" );
                    };
                    break;
                case "DScompWarn":
                if( ctlProp.isItemChecked("DScompWarn"))
                    {
                        ctlProp.uncheckItem( "DScomp" );
                        ctlProp.uncheckItem( "DSnoComp" );
                    };
                    break;
                case "DSnoComp":
                if( ctlProp.isItemChecked("DSnoComp"))
                    {
                        ctlProp.uncheckItem( "DScomp" );
                        ctlProp.uncheckItem( "DScompWarn" );
                    };
                    break;
                default:
                    break;
            }
        } );

        jQuery.ajax({
            type: 'POST',  //type of request  GET or POST
            url: '../Studio/php/getDSdescTree.php', // url to which the request is send
            data: { projName: CURproj,
                descFldrId: fldrId
            }, // data to be sent to server
            async: false,
            success: function (return_data)  // function to be called if the request succeeds
            {
                //                            alert( "Before Tree load data: " + return_data );

                ctlPropDescTree.loadXMLString(return_data, function ()  // load tree with return data XML
                {
                    //                main_layout.progressOff();
                    //                    alert("After Tree load data: " + return_data);

                    ctlPropDescTree.openAllItems('0');
                    jQuery.ajax({
                        type: 'POST',  //type of request  GET or POST
                        url: '../Studio/php/getDSselchecked.php', // url to which the request is send
                        data: { projName: CURproj,
                            DSname: DSName
                        }, // data to be sent to server
                        async: false,
                        success: function (return_data)  // function to be called if the request succeeds
                        {
                            //                            propLayout.progressOff();

                            //                            alert("return_data: " + return_data);

                            var checkItems = JSON.parse(return_data);                       //   new Array();
                            //                        checkItems = return_data;
                            //                        alert( "DSselections : " + checkItems );
                            //                        alert( "checkItems.length : " + checkItems.length );
                            //                        alert( "checkItems.tostring : " + checkItems.toString() );
                            //                        alert( "checkItems.[1] : " + checkItems[1] );
                            for (var i = 0; i < checkItems.length; i++)
                            {
                                //                            alert( "checkItems[" + i + "]: " + checkItems[i] );
                                newId = idPrefix + checkItems[i];

                                //                                alert("DSselections Id: " + newId);

                                ctlPropDescTree.setCheck(newId, true);
                            };
                            //                         alert( "itmId : " + itmId );
                            //                            ctlPropDescTree.selectItem(ctlPropDescTree.findItemIdByLabel(DSdescName, 1, 1), true);
                            ctlPropDescTree.findItem(DSdescName, 0, 1);
                        },
                        error: function ()
                        {
                            //function to be called if the request fail
                            propLayout.progressOff();
                            alert('error');
                        }
                    });  // end ajax
                });
            },
            error: function ()
            {
                //function to be called if the request fail
                propLayout.progressOff();
                alert('error');
            }
        });           // end ajax
    }
    catch ( err )
    {
        logError( err.message, err.name, "UserControls.js", "function loadCtlTDS( id, tabId )" );
    }
}

// ****************************************************************************************************************
function loadCtlProc( id, tabId )
{
    try
    {
        // *******************************************************************************************************
        // Test Area *********************************************************************************************
        // *******************************************************************************************************

//        alert( 'loadCtlProc' + '\n' + 'Selected Item id: ' + id + '\n' + 'tabId: ' + tabId );
    //    var procName = MainTree.getItemText(id);
    //    var procSDS = MainTree.getUserData(id, "SDS");
    //    var procTDS = MainTree.getUserData(id, "TDS");
    ////    var SrcSubs = MainTree.getSubItems(procSDS).split(",");
        ////    var TgtSubs = MainTree.getSubItems(procTDS).split(",");
        var nameProj = getProjName( id );
        var nameEnv = getEnvName( id );
        var nameSys = getSysName( id );
        var nameEng = getEngName( id );
        var nameTask = getProcName( id );
        var ParentObj = getParentId(id);
        var ParentNm = getParentName(id);
        var inID = id;
        var ListTgt = [];             // list of mapping targets
        var ListSrc = [];             // list of mapping sources
        var ListmappingId = [];       // list of mapping id of each mapping (numbered order)
        var ListmappingDesc = [];     // list of mapping descriptions
        var ListsrcType = [];         // list of source types
        var ListtgtType = [];         // list of target types
        var ListDSsrc = [];           // list of source DSs
        var ListDStgt = [];           // list of target DSs
        var ListParentsrc = [];
        var ListParenttgt = [];
        var TreeSRC;
        var TreeFun;
        var IsEventFromCode;
   
        // *******************************************************************************************
        // *********************************************************************************************
        // **********************************************************************************************
        var procStruct = [
	        { type: "settings", position: "label-left", labelWidth: 100, inputWidth: 180 },
	        { type: "fieldset", label: "Mapping Procedure", inputWidth: "auto", list: [
                    { name: "objid", type: "input", label: "objid", value: "", readonly: "true", required: true, hidden: true },
                    { name: "projName", type: "input", label: "Project Name", value: "", readonly: "true", hidden: true },
                    { name: "envName", type: "input", label: "Environment Name", value: "", readonly: "true", hidden: true },
                    { name: "sysName", type: "input", label: "System Name", value: "", readonly: "true", hidden: true },
			        { name: "engName", type: "input", label: "Engine Name", value: "", readonly: "true", hidden: true },
			        { name: "taskName", type: "input", label: "Procedure Name", value: "", required: true, readonly: true },
			        { type: "newcolumn" },
			        { name: "taskDesc", labelAlign: "right", label: "Description", type: "input", inputWidth: "260", rows: "3", value: "" },
                    { name: "taskType", labelAlign: "right", type: "input", label: "taskType", value: "MAP", readonly: "true", hidden: true },
			        { name: "engName", labelAlign: "right", type: "input", label: "taskSeqNo", value: "1", readonly: "false", hidden: true }
		        ]
	        },
            { type: "fieldset", inputWidth: "auto", list: [
			        { name: "btnProcSave", type: "button", value: "Save" },
			        { type: "newcolumn" },
			        { name: "btnProcDelete", type: "button", value: "Delete" }
		        ]
	        }
        ];

        // Main Layout
        var propLayout = Tabbar_user_control.cells( "tabProp" ).attachLayout( "4T" );
        propLayout.cells( "a" ).setText( "Properties" );
        propLayout.cells( "a" ).setHeight( 170 );
        propLayout.cells( "b" ).setWidth( 220 );
        propLayout.cells( "c" ).setWidth( 420 );
        propLayout.cells( "d" ).setWidth( 220 );
        propLayout.cells( "b" ).setText( "Targets" );
        propLayout.cells( "c" ).setText( "Mappings" );
    //    propLayout.cells( "d" ).setText( "Targets" );

        // Set Procedure form
        var ctlProp = propLayout.cells( "a" ).attachForm( procStruct );
        ctlProp.setFontSize( '11px' );
        var dp = new dataProcessor( "../Studio/php/loadTask.php" ); //instatiate dataprocessor
        dp.init( ctlProp ); //link form to dataprocessor
        // Load procedure form
        ctlProp.load( "../Studio/php/loadTask.php?id=" + tabId, function ( id, response )
        {
            nameTask = ctlProp.getItemValue( "taskName" );
//           alert( "ctlProp loaded\nnameTask = " + nameTask );

        } );
    
        // Attach Context Menu to srcGrid
        //******************************************************************************************
        var srcgridMenu = new dhtmlXMenuObject( null, "dhx_skyblue" );
        //        mainTreeMenu.setImagePath( "../Studio/data/SQDimgs/MenuImgs/" );
        srcgridMenu.setIconsPath( "../Studio/data/SQDimgs/" );
        srcgridMenu.renderAsContextMenu();
        //        mainTreeMenu.setOpenMode( "web" );
        //        mainTreeMenu.setSkin( "dhx_skyblue" );
        srcgridMenu.loadXML( "../Studio/data/MappingContMenu.xml", function ()
        {
//            	    alert("srcgridMenu Loaded");
        } );
    

        // Attach Context Menu to tgtGrid
        //******************************************************************************************
        var tgtgridMenu = new dhtmlXMenuObject( null, "dhx_skyblue" );
        //        mainTreeMenu.setImagePath( "../Studio/data/SQDimgs/MenuImgs/" );
        tgtgridMenu.setIconsPath( "../Studio/data/SQDimgs/" );
        tgtgridMenu.renderAsContextMenu();
        //        mainTreeMenu.setOpenMode( "web" );
        //        mainTreeMenu.setSkin( "dhx_skyblue" );
        tgtgridMenu.loadXML( "../Studio/data/MappingContMenu.xml", function ()
        {
//            	    alert("tgtgridMenu Loaded");
        } );
    
    
        // set targets tree
        var treeTGT = propLayout.cells( "b" ).attachTree();
        treeTGT.deleteChildItems( '0' );
        treeTGT.deleteItem( '0' );
        treeTGT.setSkin( 'dhx_skyblue' );
        treeTGT.setImagePath( '../Studio/data/SQDimgs/' );
        treeTGT.enableDragAndDrop( '1', true );
        treeTGT.enableMercyDrag( '1' );
        treeTGT.enableTreeImages( true );
        treeTGT.enableItemEditor( false );
        treeTGT.enableTreeLines( true );
        treeTGT.setDragBehavior( 'complex' );
    
        // load targets tree
        jQuery.ajax( {
            type: 'POST',  //type of request  GET or POST
            url: '../Studio/php/GetProcFieldTrees.php', // url to which the request is send
            data: { objid: inID,
                nameProj: nameProj,
                nameEnv: nameEnv,
                nameSys: nameSys,
                nameEng: nameEng,
                DSdir: 'T'
            }, // data to be sent to server
            async: false,
            success: function ( return_data )  // function to be called if the request succeeds
            {
//                alert("treeTGT Before Tree load data: " + return_data);

                treeTGT.loadXMLString( return_data, function ()  // load tree with return data XML
                {
//                    propLayout.progressOff();
//                    alert( "treeTGT After Tree load data: " + return_data );
                    treeTGT.openAllItems( '0' ); 
                } );
            },
            error: function ()
            {
                //function to be called if the request fail
                propLayout.progressOff();
                alert( 'error' );
            }
        } );   // end ajax

    //************************************************************************************************************************************
        //  Target tree events
        treeTGT.attachEvent( 'onSelect', function ( id )
        {
    //        dhtmlx.message( {
    //            text: 'treeTGT.onSelect \nid = ' + id,
    //            expires: 5000
    //        } );
        } ); // end onSelect

        //fires when the item's dragging starts (the item is selected and the mouse is moving)
        treeTGT.attachEvent( "onBeforeDrag", function ( sId )
        {
            return true;
        } );

        //fires when the item was dragged and dropped on some other item, but before item's moving has been processed
        treeTGT.attachEvent( "onDrag", function ( sId, tId, id, sObject, tObject )
        {
            return false;
        } );

        //fires when the item is dragged over some target the item can be dropped to
        treeTGT.attachEvent( "onDragIn", function ( sId, tId, sObject, tObject )
        {
            return false;
        } );

        //fires when drag-and-drop has already been processed; besides, fires when the nodes are moved programmatically
        treeTGT.attachEvent( "onDrop", function ( sId, tId, id, sObject, tObject )
        {
            return true;
        } );

//        alert( "makes it to tabbar" );
        // Set tabbar for sources 
        var tabbarSQDfun = propLayout.cells( "d" ).attachTabbar();
        propLayout.cells( "d" ).dock();
        tabbarSQDfun.setAlign( "top" );
        tabbarSQDfun.setImagePath( "../Studio/dhtmlxSuite/dhtmlxTabbar/codebase/imgs/" );
        tabbarSQDfun.setSkin( "dhx_skyblue" );
        tabbarSQDfun.enableTabCloseButton( false );
    //        Tabbar_user_control.enableAutoResize(true);      
    //    tabbarSQDfun.setHrefMode( "iframe" );
        tabbarSQDfun.addTab( "tabSRC", "Sources", "80px" );
        
        
        var treeSRC = tabbarSQDfun.cells( "tabSRC" ).attachTree();
        treeSRC.deleteChildItems( '0' );
        treeSRC.deleteItem( '0' );
        treeSRC.setSkin( 'dhx_skyblue' );
        treeSRC.setImagePath( '../Studio/data/SQDimgs/' );
        treeSRC.enableDragAndDrop( true, false );
        treeSRC.enableMercyDrag( true );
        treeSRC.enableTreeImages( true );
        treeSRC.enableItemEditor( false );
        treeSRC.enableTreeLines( true );
        treeSRC.setDragBehavior( 'complex' );
        treeSRC.enableImageDrag( true );

        TreeSRC = treeSRC;

        // load sources tree
        jQuery.ajax( {
            type: 'POST',  //type of request  GET or POST
            url: '../Studio/php/GetProcFieldTrees.php', // url to which the request is send
            data: { objid: inID,
                nameProj: nameProj,
                nameEnv: nameEnv,
                nameSys: nameSys,
                nameEng: nameEng,
                DSdir: 'S'
            }, // data to be sent to server
            async: false,
            success: function ( return_data )  // function to be called if the request succeeds
            {
//                alert("TreeSRC Before Tree load data: " + return_data);

                TreeSRC.loadXMLString( return_data, function ()  // load tree with return data XML
                {
//                                            alert( "After Tree load data: " + return_data );
                    propLayout.progressOff();
//                    alert( "TreeSRC After Tree load data: " + return_data );
                    TreeSRC.openAllItems( '0' );
                } );
            },
            error: function ()
            {
                //function to be called if the request fail
                propLayout.progressOff();
                alert( 'error' );
            }
        } );          // end ajax

        //  Source tree events
        TreeSRC.attachEvent( 'onSelect', function ( id )
        {
            //                dhtmlx.message( {
            //                    text: 'TreeSRC.onSelect \nid = ' + id,
            //                    expires: 5000
            //                } );
        } ); // end onSelect

        //fires when the item's dragging starts (the item is selected and the mouse is moving)
        TreeSRC.attachEvent( "onBeforeDrag", function ( sId )
        {
            return true;
        } );

        //fires when the item was dragged and dropped on some other item, but before item's moving has been processed
        TreeSRC.attachEvent( "onDrag", function ( sId, tId, id, sObject, tObject )
        {
            return false;
        } );

        //fires when the item is dragged over some target the item can be dropped to
        TreeSRC.attachEvent( "onDragIn", function ( sId, tId, sObject, tObject )
        {
            return false;
        } );

        //fires when drag-and-drop has already been processed; besides, fires when the nodes are moved programmatically
        TreeSRC.attachEvent( "onDrop", function ( sId, tId, id, sObject, tObject )
        {
            return true;
        } );

        tabbarSQDfun.addTab( "tabSQDFun", "Functions", "80px" );

        var treeFun = tabbarSQDfun.cells( "tabSQDFun" ).attachTree();
        treeFun.deleteChildItems( '0' );
        treeFun.deleteItem( '0' );
        treeFun.setSkin( 'dhx_skyblue' );
        treeFun.setImagePath( '../Studio/data/SQDimgs/' );
        treeFun.enableDragAndDrop( '1', true );
        treeFun.enableMercyDrag( '1' );
        treeFun.enableTreeImages( true );
        treeFun.enableItemEditor( false );
        treeFun.enableTreeLines( true );
        treeFun.setDragBehavior( 'sibling' );

        TreeFun = treeFun;
        TreeFun.loadXML( '../Studio/data/SQDSYFUN.XML', function ()
        {
            //                treeFun.openAllItems( '0' );
            //                                alert( "Loaded" );
        } ); // end loadFunctions

        //  Function tree events
        TreeFun.attachEvent( 'onSelect', function ( id )
        {

        } ); // end onSelect

        //fires when the item's dragging starts (the item is selected and the mouse is moving)
        TreeFun.attachEvent( "onBeforeDrag", function ( sId )
        {
            return true;
        } );

        //fires when the item was dragged and dropped on some other item, but before item's moving has been processed
        TreeFun.attachEvent( "onDrag", function ( sId, tId, id, sObject, tObject )
        {
            return false;
        } );

        //fires when the item is dragged over some target the item can be dropped to
        TreeFun.attachEvent( "onDragIn", function ( sId, tId, sObject, tObject )
        {
            return false;
        } );

        //fires when drag-and-drop has already been processed; besides, fires when the nodes are moved programmatically
        TreeFun.attachEvent( "onDrop", function ( sId, tId, id, sObject, tObject )
        {
            return false;
        } );

        // set tabbar actions
        tabbarSQDfun.attachEvent( 'onSelect', function ( id, last_id )
        {
            return true;
        } );
        // set source datastore as active tab
//        tabbarSQDfun.setTabActive( "tabSQDFun" );
        tabbarSQDfun.setTabActive( "tabSRC" );


    //    dhtmlx.message( {
    //        title: "Under Contruction",
    //        type: "error",
    //        text: "Mapping of fields and functions is currently under construction.",
    //        expires: 5000
    //    } );
   

        // set mapping grid
        var gridLayout = propLayout.cells( "c" ).attachLayout( "2U" );
        gridLayout.cells( "a" ).setText( "Target Mapping" );
        gridLayout.cells( "b" ).setText( "Source Mapping" );

        /// attach target grid
        var ctlPropMappingTgtGrid = gridLayout.cells( "a" ).attachGrid();
        ctlPropMappingTgtGrid.enableDragAndDrop( true );
        //        ctlPropMappingTgtGrid.setImagePath( "../Studio/dhtmlxSuite/dhtmlxGrid/codebase/imgs/" );
        ctlPropMappingTgtGrid.setImagePath( '../Studio/data/SQDimgs/' );
        ctlPropMappingTgtGrid.setHeader( "rowNum,SeqNo,Img,Type,Datastore,Description,FieldOrFunc" );
        ctlPropMappingTgtGrid.setNoHeader( true );
        ctlPropMappingTgtGrid.setInitWidths( "20,30,20,30,50,50,190" );
        ctlPropMappingTgtGrid.setColTypes( "ron,ron,img,rotxt,rotxt,rotxt,txt" );
        ctlPropMappingTgtGrid.setColAlign( "left,left,left,right,right,right,right" );
        ctlPropMappingTgtGrid.setColumnsVisibility( "true,true,false,true,true,true,false" );
        ctlPropMappingTgtGrid.setSkin( "dhx_skyblue" );
        ctlPropMappingTgtGrid.enableDragOrder( true );
        ctlPropMappingTgtGrid.setDragBehavior( "complex" );
        ctlPropMappingTgtGrid.enableMultiselect( true );
        ctlPropMappingTgtGrid.enableUndoRedo();
        // attach context menu
        ctlPropMappingTgtGrid.enableContextMenu( tgtgridMenu );
        ctlPropMappingTgtGrid.init();


        function loadTgtGrid()
        {
            // load Target Grid from DB
            propLayout.progressOn();
            // SELECT `id`, `objid`, `projName`, `envName`, `sysName`, `engName`, `taskName`, `taskType`, `mappingId`, `isMapped`, `mappingDesc`, `srcType`, `tgtType`, `mappingSrc`, `mappingTgt`, `srcParent`, `tgtParent`, `srcDS`, `tgtDS` FROM `taskmap` WHERE 1
            // load target mapping grid
            //    alert( "Before Grid input data: " + "\nprojName:" + nameProj + "\nenvName: " + nameEnv + "\nsysName: " + nameSys + "\nengName: " + nameEng + "\ntaskName: " +  nameTask + "\ngridSide: 'TGT'" );
            ctlPropMappingTgtGrid.clearAll();

            jQuery.ajax( {
                type: 'POST',  //type of request  GET or POST
                url: '../Studio/php/GetProcGrids.php', // url to which the request is send
                data: { projName: nameProj,
                    envName: nameEnv,
                    sysName: nameSys,
                    engName: nameEng,
                    taskName: nameTask,
                    gridSide: 'TGT'
                }, // data to be sent to server
                async: false,
                success: function ( return_data )  // function to be called if the request succeeds
                {
//                    alert( "Before Grid target load data: " + return_data );
                    ctlPropMappingTgtGrid.parse( return_data, function ()  // load tree with return data XML
                    {
                        //                alert( "After Grid target load data: " + return_data );
                        propLayout.progressOff();
                        IsSaved = true;
                        //                alert( "After Tree load data: " + return_data );
                        //                ctlPropMappingTgtGrid.openAllItems( '0' );
                    } );
                },
                error: function ()
                {
                    //function to be called if the request fail
                    propLayout.progressOff();
                    alert( 'error' );
                }
            } );          // end ajax
        }

        loadTgtGrid();


        /// attach source grid
        var ctlPropMappingSrcGrid = gridLayout.cells( "b" ).attachGrid();
        ctlPropMappingSrcGrid.enableDragAndDrop( true );
        ctlPropMappingSrcGrid.setImagePath( '../Studio/data/SQDimgs/' );
        ctlPropMappingSrcGrid.setHeader( "rowNum,SeqNo,Img,Type,Datastore,Description,FieldOrFunc" );
        ctlPropMappingSrcGrid.setNoHeader( true );
        ctlPropMappingSrcGrid.setInitWidths( "20,30,20,30,50,50,190" );
        ctlPropMappingSrcGrid.setColTypes( "ron,ron,img,rotxt,rotxt,rotxt,txt" );
        ctlPropMappingSrcGrid.setColAlign( "left,left,left,right,right,right,left" );
        ctlPropMappingSrcGrid.setColumnsVisibility( "true,true,false,true,true,true,false" );
        ctlPropMappingSrcGrid.setSkin( "dhx_skyblue" );
        ctlPropMappingSrcGrid.enableDragOrder( true );
        ctlPropMappingSrcGrid.setDragBehavior( "complex" );
        ctlPropMappingSrcGrid.enableMultiselect( true );
        ctlPropMappingSrcGrid.enableUndoRedo();
        // attach target context menu
        ctlPropMappingSrcGrid.enableContextMenu( srcgridMenu );
        ctlPropMappingSrcGrid.init();

    //    sinput = ctlPropMappingSrcGrid;  //.getInput( 'taskText' )
    //    alert( 'sinput: ' + sinput );
    //    TreeSRC.dragger.addDragLanding( sinput, new s_control( TreeSRC ) );

        function loadSrcGrid() {
            // Load SOurce grid from DB
            propLayout.progressOn();
            // load SOurce mapping grid
            ctlPropMappingSrcGrid.clearAll();

            jQuery.ajax( {
                type: 'POST',  //type of request  GET or POST
                url: '../Studio/php/GetProcGrids.php', // url to which the request is send
                data: { projName: nameProj,
                    envName: nameEnv,
                    sysName: nameSys,
                    engName: nameEng,
                    taskName: nameTask,
                    gridSide: 'SRC'
                }, // data to be sent to server
                async: false,
                success: function ( return_data )  // function to be called if the request succeeds
                {
//                    alert( "Before Grid source load data: " + return_data );
                    ctlPropMappingSrcGrid.parse( return_data, function ()  // load tree with return data XML
                    {
        //                alert( "After Grid source load data: " + return_data );
                        propLayout.progressOff();
                        IsSaved = true;
                        //                alert( "After Tree load data: " + return_data );
                        //                ctlPropMappingTgtGrid.openAllItems( '0' );
                    } );
                },
                error: function ()
                {
                    //function to be called if the request fail
                    propLayout.progressOff();
                    alert( 'error' );
                }
            } );          // end ajax
        }

        loadSrcGrid();

        //****************************************************************************************************************************************
        //  TGTgrid events

        //fires when an item is dragged to another target and the mouse is released, the event can be blocked
        ctlPropMappingTgtGrid.attachEvent( "onDrag", function ( sId, tId, sObj, tObj, sInd, tInd )
        {
    //        dhtmlx.message( {
    //            text: 'onDrag \nsId = ' + sId + '\ntId = ' + tId + '\nsObj = ' + sObj + '\nsObj.toString() = ' + sObj.toString() + '\ntObj = ' + tObj + '\nsInd = ' + sInd + '\ntInd = ' + tInd + '\nsObj.text = ' + sObj.text,
    //            expires: 5000
    //        } );
            if ( sObj == treeTGT )
            {
                z = true;
            }
            else if ( sObj == ctlPropMappingTgtGrid )
            {
                z = true;
            }
            else
            {
                z = false;
            }
    //        alert( 'dragContext: ' + ctlPropMappingTgtGrid.dragContext + '\ndragContext.source = ' + ctlPropMappingTgtGrid.dragContext.source + '\ndragContext.target = ' + ctlPropMappingTgtGrid.dragContext.target + '\ndragContext.sobj = ' + ctlPropMappingTgtGrid.dragContext.sobj + '\ndragContext.tobj = ' + ctlPropMappingTgtGrid.dragContext.tobj + '\ndragContext.dropmode = ' + ctlPropMappingTgtGrid.dragContext.dropmode + '\ndragContext.mode = ' + ctlPropMappingTgtGrid.dragContext.mode + '\ndragContext.slist() = ' + ctlPropMappingTgtGrid.dragContext.slist() + '\ndragContext.tid = ' + ctlPropMappingTgtGrid.dragContext.tid );
    //        //    dragContext.source - type of the source component (“tree”,”grid”,”treeGrid”);
    //        //    dragContext.target - type of the target component;
    //        //    dragContext.sobj - the source object;
    //        //    dragContext.tobj - the target object;
    //        //    dragContext.dropmode - whether the dragged item will be a “child” or a “sibling”;
    //        //    dragConetxt.mode - whether the dragged item will be copied or just moved: “copy” or “move”;
    //        //    dragContext.slist() - ID(s) of the dragged item(s);
    //        //    dragContext.tid - ID of the drag landing item;

    //        alert( 'onDrag \nsId = ' + sId + '\ntId = ' + tId + '\nsObj = ' + sObj + '\nsObj.toString() = ' + sObj.toString() + '\ntObj = ' + tObj + '\nsInd = ' + sInd + '\ntInd = ' + tInd + '\nsObj.text = ' + sObj.text );
            return z;
        } );

        //fires when an item is dragged to a potential target (the event can be blocked)
        ctlPropMappingTgtGrid.attachEvent( "onDragIn", function ( dId, tId, sObj, tObj )
        {
            return true;
        } );

        //fires when an item is dragged out of the potential target (the event can be blocked)
        ctlPropMappingTgtGrid.attachEvent( "onDragOut", function ( dId, tId, sObj, tObj )
        {
            return false;
        } );

        //fires when an item is already placed in its final position
        ctlPropMappingTgtGrid.attachEvent( "onDrop", function ( sId, tId, dId, sObj, tObj, sCol, tCol )
        {
            //                dhtmlx.message( {
            //                    text: 'onDrop \nsId = ' + sId + '\ntId = ' + tId + '\ndId = ' + dId + '\nsObj = ' + sObj + '\ntObj = ' + tObj + '\nsCol = ' + sCol + '\ntCol = ' + tCol,
            //                    expires: 5000
            //                } );
//            alert( 'onDrop \nsId = ' + sId + '\ntId = ' + tId + '\ndId = ' + dId + '\nsObj = ' + sObj + '\ntObj = ' + tObj + '\nsCol = ' + sCol + '\ntCol = ' + tCol );
            //            ctlPropMappingTgtGrid.cells( tId, 0 ).setValue( ctlPropMappingTgtGrid.getRowIndex( tId ) ); 
            //            alert( "added rows: " + ctlPropMappingTgtGrid.getChangedRows( true ) );
            if ( treeTGT.getUserData( sId, "DataType" ) == "GROUPITEM" || treeTGT.getUserData( sId, "DataType" ) == "DS" || treeTGT.getUserData( sId, "DataType" ) == "desc" )
            {
                ctlPropMappingTgtGrid.sortRows( 1, "int", "asc" );
            };
        } );

        // *****************************************************************************************************************************************
        //         redefine tree-to-grid drop element
        ctlPropMappingTgtGrid.treeToGridElement = function ( treeObj, treeNodeId, gridRowId )
        {
            try
            {
                var z;
                if ( treeObj == treeTGT )
                {
                    if ( treeObj.getUserData( treeNodeId, "DataType" ) == "GROUPITEM" )
                    {
                        // it's a groupitem so we will ask user if they want to map it, in the future, but for now return false
                        //z = false;
                        z = ["", treeObj.getUserData( treeNodeId, "RecId" ), "../Studio/data/SQDimgs/FieldList.ico", "FLD", treeObj.getUserData( treeNodeId, "DSname" ), treeObj.getUserData( treeNodeId, "descName" ), treeObj.getItemText( treeNodeId )];
                    }
                    else if ( treeObj.getUserData( treeNodeId, "DataType" ) == "DS" )   // It's a Datastore, so don't map
                    {
                        //z = false;
                        z = ["", treeObj.getUserData( treeNodeId, "RecId" ), "../Studio/data/SQDimgs/TDS.ico", "DS", treeObj.getUserData( treeNodeId, "DSname" ), treeObj.getUserData( treeNodeId, "descName" ), treeObj.getItemText( treeNodeId )];
                    }
                    else if ( treeObj.getUserData( treeNodeId, "DataType" ) == "desc" )   // It's a description, so don't map
                    {
                        //z = false;
                        z = ["", treeObj.getUserData( treeNodeId, "RecId" ), "../Studio/data/SQDimgs/desc.ico", "desc", treeObj.getUserData( treeNodeId, "DSname" ), treeObj.getUserData( treeNodeId, "descName" ), treeObj.getItemText( treeNodeId )];
                    }
                    else if ( treeObj.getUserData( treeNodeId, "DataType" ) == "var" )   // it's a variable so  fill it in
                    {
                        z = [ "", "", "../Studio/data/SQDimgs/var.ico", "var", "", "", treeObj.getItemText( treeNodeId )];
                    }
                    else if ( treeObj.getUserData( treeNodeId, "DataType" ) == "Proc" )   // it's a variable so  fill it in
                    {
                        z = ["", "", "../Studio/data/SQDimgs/" + treeObj.getUserData( treeNodeId, "Icon" ), "Proc", "", "", treeObj.getItemText( treeNodeId )];
                    }
                    else   // Must be a Field
                    {
                        z = ["", treeObj.getUserData( treeNodeId, "RecId" ), "../Studio/data/SQDimgs/FieldList.ico", "FLD", treeObj.getUserData( treeNodeId, "DSname" ), treeObj.getUserData( treeNodeId, "descName" ), treeObj.getItemText( treeNodeId )];
                    }
                }
                else
                {
                    z = false;
                }
                //        alert( 'z = ' + z );
                IsSaved = false;
                return z;
            }
            catch ( err )
            {
                logError( err.message, err.name, "UserControls.js", "ctlPropMappingTgtGrid.treeToGridElement = function ( treeObj, treeNodeId, gridRowId )" );
            };
        }
    
        //******************************************************************************************************************************
        ctlPropMappingTgtGrid.attachEvent( "onRowSelect", function ( id, ind )
        {
            var rindex = ctlPropMappingTgtGrid.getRowIndex( id );
    //        dhtmlx.message( {
    //            text: 'onRowSelect \nid = ' + id + '\nColindex = ' + ind + '\nRowindex = ' + rindex,
    //            expires: 5000
    //        } );
//            alert( 'onRowSelect \nid = ' + id + '\nColindex = ' + ind + '\nRowindex = ' + rindex );
    //        if ( IsEventFromCode == false )
    //        {
    //            //            IsEventFromCode = true;
    //            var idxarr = ctlPropMappingTgtGrid.getSelectedRowId();
    //            var r;
    //            //            alert( 'id= ' + id + '\n' + 'ind= ' + ind + '\n' + 'idxarr= ' + idxarr );
    //            idxarr = idxarr.split( "," );
    //            for ( r = 0; r < idxarr.length; r++ )
    //            {
    //                //            alert( "idxarr[r]= " + idxarr[r] );
    //                ctlPropMappingSrcGrid.selectRow( idxarr[r], true, true );
    //            };
    //            IsEventFromCode = false;
    //        }
        } );

        // Attach events for TGT context menu
        ctlPropMappingTgtGrid.attachEvent( "onBeforeContextMenu", function ( zoneId, ev )
        {
            //        alert( 'zoneId= ' + zoneId + '\n' + 'ev= ' + ev );

            ctlPropMappingTgtGrid.selectRow( zoneId, true, true );

            //tgtgridMenu.hideItem( "ins_src" );
            tgtgridMenu.hideItem( "del_src" );
            // returning "true" allows a context menu to be shown, "false" - cancels showing
            return true;
        } );

        ctlPropMappingTgtGrid.attachEvent( "onCellChanged", function ( rId, cInd, nValue )
        {
            IsSaved = false;
//            dhtmlx.message( {
//                title: "ctlPropMappingTgtGrid.onCellChanged",
//                text: "IsSaved: " + IsSaved,
//                expires: 5000
//            } );
        } );

        ctlPropMappingTgtGrid.attachEvent( "onRowInserted", function ( row, rInd )
        {
            IsSaved = false;
//            dhtmlx.message( {
//                title: "ctlPropMappingTgtGrid.onRowInserted",
//                text: "IsSaved: " + IsSaved,
//                expires: 5000
//            } );
        } );

        ctlPropMappingTgtGrid.attachEvent( "onRowAdded", function ( rId )
        {
            IsSaved = false;
//            dhtmlx.message( {
//                title: "ctlPropMappingTgtGrid.onRowAdded",
//                text: "IsSaved: " + IsSaved,
//                expires: 5000
//            } );
        } );

        ctlPropMappingTgtGrid.attachEvent( "onAfterRowDeleted", function ( id, pid )
        {
            IsSaved = false;
//            dhtmlx.message( {
//                title: "ctlPropMappingTgtGrid.onAfterRowDeleted",
//                text: "IsSaved: " + IsSaved,
//                expires: 5000
//            } );
        } );

        // ***********************************************************************************
        tgtgridMenu.attachEvent( 'onClick', function ( id, zoneId, casState )
        {
            //        alert( 'id= ' + id + '\n' + 'zoneId= ' + zoneId + '\n' + 'casState= ' + casState );

            var selectedid = ctlPropMappingTgtGrid.getSelectedCellIndex();
            var sqdType = ctlPropMappingTgtGrid.getUserData( selectedid, 'sqdType' );
            var Pid = "";
            var TPid = "";
            //        alert( 'SQDType: ' + sqdType );
            switch ( id )
            {
                case 'undo':
                    ctlPropMappingTgtGrid.doUndo();
                    break;
                case 'del_tgt':
                    ctlPropMappingTgtGrid.deleteSelectedRows();
                    break;
                case 'del_map':
                    var selectedIds = ctlPropMappingTgtGrid.getSelectedRowId();
                    var arrSelectedIds = [];
                    arrSelectedIds = selectedIds.split( "," );
                    var dlen = arrSelectedIds.length;
                    var rowIndxs = [];
                    for ( j = 0; j < dlen; j++ )
                    {
                        //                        alert( "arrSelectedIds[j]: " + arrSelectedIds[j] );
                        var selRow = ctlPropMappingTgtGrid.getRowIndex( arrSelectedIds[j] );
                        //                        alert( "selRow: " + selRow );
                        rowIndxs.push( selRow );
                    };
                    rowIndxs.sort( function ( a, b ) { return b - a } );
                    var Ilen = rowIndxs.length;
                    for ( i = 0; i < dlen; i++ )
                    {
                        var rowId = ctlPropMappingSrcGrid.getRowId( rowIndxs[i] );
                        //                        alert( "rowId: " + rowId );
                        ctlPropMappingSrcGrid.deleteRow( rowId );
                    };
                    ctlPropMappingTgtGrid.deleteSelectedRows();
                    break;
            }  // end switch
        } );     // end src context menu


        //****************************************************************************************************************************************
        //  SRCgrid events

        //fires when an item is dragged to another target and the mouse is released, the event can be blocked
        ctlPropMappingSrcGrid.attachEvent( "onDrag", function ( sId, tId, sObj, tObj, sInd, tInd )
        {
    //        dhtmlx.message( {
    //            text: 'onDrag \nsId = ' + sId + '\ntId = ' + tId + '\nsObj = ' + sObj + '\nsObj.toString() = ' + sObj.toString() + '\ntObj = ' + tObj + '\nsInd = ' + sInd + '\ntInd = ' + tInd + '\nsObj.text = ' + sObj.text,
    //            expires: 5000
    //        } );
            if ( sObj == TreeSRC )
            {
                z = true;
            }
            else if ( sObj == TreeFun )
            {
                z = true;
            }
            else if ( sObj == ctlPropMappingSrcGrid )
            {
                z = true;
            }
            else
            {
                z = false;
            }
    //        alert( 'dragContext: ' + ctlPropMappingSrcGrid.dragContext + '\ndragContext.source = ' + ctlPropMappingSrcGrid.dragContext.source + '\ndragContext.target = ' + ctlPropMappingSrcGrid.dragContext.target + '\ndragContext.sobj = ' + ctlPropMappingSrcGrid.dragContext.sobj + '\ndragContext.tobj = ' + ctlPropMappingSrcGrid.dragContext.tobj + '\ndragContext.dropmode = ' + ctlPropMappingSrcGrid.dragContext.dropmode + '\ndragContext.mode = ' + ctlPropMappingSrcGrid.dragContext.mode + '\ndragContext.slist() = ' + ctlPropMappingSrcGrid.dragContext.slist() + '\ndragContext.tid = ' + ctlPropMappingSrcGrid.dragContext.tid );
    //        //    dragContext.source - type of the source component (“tree”,”grid”,”treeGrid”);
    //        //    dragContext.target - type of the target component;
    //        //    dragContext.sobj - the source object;
    //        //    dragContext.tobj - the target object;
    //        //    dragContext.dropmode - whether the dragged item will be a “child” or a “sibling”;
    //        //    dragConetxt.mode - whether the dragged item will be copied or just moved: “copy” or “move”;
    //        //    dragContext.slist() - ID(s) of the dragged item(s);
    //        //    dragContext.tid - ID of the drag landing item;
    //        alert( 'onDrag \nsId = ' + sId + '\ntId = ' + tId + '\nsObj = ' + sObj + '\nsObj.toString() = ' + sObj.toString() + '\ntObj = ' + tObj + '\nsInd = ' + sInd + '\ntInd = ' + tInd + '\nsObj.text = ' + TreeSRC.getItemText( sId ) );
            return z;
        } );

        //fires when an item is dragged to a potential target (the event can be blocked)
        ctlPropMappingSrcGrid.attachEvent( "onDragIn", function ( dId, tId, sObj, tObj )
        {
            return true;
        } );

        //fires when an item is dragged out of the potential target (the event can be blocked)
        ctlPropMappingSrcGrid.attachEvent( "onDragOut", function ( dId, tId, sObj, tObj )
        {
            return false;
        } );

        //fires when an item is already placed in its final position
        ctlPropMappingSrcGrid.attachEvent( "onDrop", function ( sId, tId, dId, sObj, tObj, sCol, tCol )
        {
            //        dhtmlx.message( {
            //            text: 'onDrop \nsId = ' + sId + '\ntId = ' + tId + '\ndId = ' + dId + '\nsObj = ' + sObj.toString() + '\ntObj = ' + tObj.toString() + '\nsCol = ' + sCol + '\ntCol = ' + tCol + '\nsObj.text = ' + TreeSRC.getItemText( sId ),
            //            expires: 5000
            //        } );
            //            alert( 'onDrop \nsId = ' + sId + '\ntId = ' + tId + '\ndId = ' + dId + '\nsObj = ' + sObj.toString() + '\ntObj = ' + tObj.toString() + '\nsCol = ' + sCol + '\ntCol = ' + tCol + '\nsObj.text = ' + sObj.text );
            //            alert("added rows: " + ctlPropMappingSrcGrid.getChangedRows(true));
            try
            {
                if ( TreeSRC.getUserData( sId, "DataType" ) == "GROUPITEM" || TreeSRC.getUserData( sId, "DataType" ) == "DS" || TreeSRC.getUserData( sId, "DataType" ) == "desc" )
                {
                    ctlPropMappingSrcGrid.sortRows( 1, "int", "asc" );
                };
            }
            catch ( e )
            {
//                alert( "e: " + e );
            };

        } );


        //******************************************************************************************************************************
        //         redefine tree-to-grid drop element
        ctlPropMappingSrcGrid.treeToGridElement = function ( treeObj, treeNodeId, gridRowId )
        {
            //                alert( 'treeObj: ' + treeObj + '\ntreeNodeId: ' + treeNodeId + '\ngridRowId: ' + gridRowId );
            //        dhtmlx.message( {
            //            text: 'treeToGridElement \ntreeObj: ' + treeObj + '\ntreeNodeId: ' + treeNodeId + '\ngridRowId: ' + gridRowId,
            //            expires: 5000
            //        } );
            //        alert( 'treeToGridElement \ntreeObj: ' + treeObj + '\ntreeNodeId: ' + treeNodeId + '\ngridRowId: ' + gridRowId );
            var z;
            if ( treeObj == TreeSRC )
            {
                if ( treeObj.getUserData( treeNodeId, "DataType" ) == "GROUPITEM" )
                {
                    // it's a groupitem so we will ask user if they want to map it, in the future, but for now return false
                    //z = false;
                    z = ["", treeObj.getUserData( treeNodeId, "RecId" ), "../Studio/data/SQDimgs/FieldList.ico", "FLD", treeObj.getUserData( treeNodeId, "DSname" ), treeObj.getUserData( treeNodeId, "descName" ), treeObj.getItemText( treeNodeId )];
                }
                else if ( treeObj.getUserData( treeNodeId, "DataType" ) == "DS" )   // It's a Datastore, so don't map
                {
                    //z = false;
                    z = ["", treeObj.getUserData( treeNodeId, "RecId" ), "../Studio/data/SQDimgs/SDS.ico", "DS", treeObj.getUserData( treeNodeId, "DSname" ), treeObj.getUserData( treeNodeId, "descName" ), treeObj.getItemText( treeNodeId )];
                }
                else if ( treeObj.getUserData( treeNodeId, "DataType" ) == "desc" )   // It's a description, so don't map
                {
                    //z = false;
                    z = ["", treeObj.getUserData( treeNodeId, "RecId" ), "../Studio/data/SQDimgs/desc.ico", "desc", treeObj.getUserData( treeNodeId, "DSname" ), treeObj.getUserData( treeNodeId, "descName" ), treeObj.getItemText( treeNodeId )];
                }
                else if ( treeObj.getUserData( treeNodeId, "DataType" ) == "var" )   // it's a variable so  fill it in
                {
                    z = ["", "", "../Studio/data/SQDimgs/var.ico", "var", "", "", treeObj.getItemText( treeNodeId )];
                }
                else if ( treeObj.getUserData( treeNodeId, "DataType" ) == "Proc" )   // it's a variable so  fill it in
                {
                    z = ["", "", "../Studio/data/SQDimgs/" + treeObj.getUserData( treeNodeId, "Icon" ), "Proc", "", "", treeObj.getItemText( treeNodeId )];
                }
                else   // Must be a Field
                {
                    z = ["", treeObj.getUserData( treeNodeId, "RecId" ), "../Studio/data/SQDimgs/FieldList.ico", "FLD", treeObj.getUserData( treeNodeId, "DSname" ), treeObj.getUserData( treeNodeId, "descName" ), treeObj.getItemText( treeNodeId )];
                }
            }
            else if ( treeObj == TreeFun )
            {
                if ( treeObj.getUserData( treeNodeId, "NODETYPE" ) == 'Template' )
                {
//                    dhtmlx.message( {
//                        title: "Under Contruction",
//                        type: "error",
//                        text: "Templates are currently under construction.",
//                        expires: 5000
//                    } );
//                    var txt = treeObj.getItemText( treeNodeId );
//                    alert( 'txt ' + txt );
                    var outtxt = getTemplate( TreeSRC, treeObj.getItemText( treeNodeId ) );
//                    alert( 'outtxt ' + outtxt );
                    z = ["", "", "../Studio/data/SQDimgs/Template.ico", "Template", "", "", outtxt];
                }
                else
                {
                    z = ["", "", "../Studio/data/SQDimgs/Paste Function.ico", "Func", "", "", treeObj.getUserData( treeNodeId, "SYNTAX" )];
                }
            }
            else
            {
                z = false;
            }
            IsSaved = false;
            return z;
        }

        ctlPropMappingSrcGrid.attachEvent( "onRowSelect", function ( id, ind )
        {
            var rindex = ctlPropMappingSrcGrid.getRowIndex( id );
    //        dhtmlx.message( {
    //            text: 'onRowSelect \nid = ' + id + '\nColindex = ' + ind + '\nRowindex = ' + rindex,
    //            expires: 5000
            //        } );
            //alert( 'onRowSelect \nid = ' + id + '\nColindex = ' + ind + '\nRowindex = ' + rindex );
    //        if ( IsEventFromCode == false )
    //        {
    //            IsEventFromCode = true;
    //            var idxarr = ctlPropMappingSrcGrid.getSelectedRowId();
    //            var r;
    //            //        alert( 'id= ' + id + '\n' + 'ind= ' + ind + '\n' + 'idxarr= ' + idxarr );
    //            idxarr = idxarr.split( "," );
    //            for ( r = 0; r < idxarr.length; r++ )
    //            {
    //                //            alert( "idxarr[r]= " + idxarr[r] );
    //                ctlPropMappingTgtGrid.selectRow( idxarr[r], true, true );
    //            };
    //            IsEventFromCode = false;
    //        }
        } );

        // ***************************************************************************************************************
        // Attach events for SRC context menu

        ctlPropMappingSrcGrid.attachEvent( "onBeforeContextMenu", function ( zoneId, ev )
        {
            ctlPropMappingSrcGrid.selectRow( zoneId, true, true );

            //srcgridMenu.hideItem( "ins_tgt" );
            srcgridMenu.hideItem( "del_tgt" );
            // returning "true" allows a context menu to be shown, "false" - cancels showing
            return true;
        } );

        ctlPropMappingSrcGrid.attachEvent( "onCellChanged", function ( rId, cInd, nValue )
        {
            IsSaved = false;
        } );

        ctlPropMappingSrcGrid.attachEvent( "onRowInserted", function ( row, rInd )
        {
            IsSaved = false;
//            dhtmlx.message( {
//                title: "ctlPropMappingSrcGrid.onRowInserted",
//                text: "IsSaved: " + IsSaved,
//                expires: 5000
//            } );
        } );

        ctlPropMappingSrcGrid.attachEvent( "onRowAdded", function ( rId )
        {
            IsSaved = false;
//            dhtmlx.message( {
//                title: "ctlPropMappingSrcGrid.onRowAdded",
//                text: "IsSaved: " + IsSaved,
//                expires: 5000
//            } );
        } );

        ctlPropMappingSrcGrid.attachEvent( "onAfterRowDeleted", function ( id, pid )
        {
            IsSaved = false;
//            dhtmlx.message( {
//                title: "ctlPropMappingSrcGrid.onAfterRowDeleted",
//                text: "IsSaved: " + IsSaved,
//                expires: 5000
//            } );
        } );

        srcgridMenu.attachEvent( 'onClick', function ( id, zoneId, casState )
        {
            //        alert( 'id= ' + id + '\n' + 'zoneId= ' + zoneId + '\n' + 'casState= ' + casState );


            var selectedid = ctlPropMappingSrcGrid.getSelectedCellIndex();
            var sqdType = ctlPropMappingSrcGrid.getUserData( selectedid, 'sqdType' );
            var Pid = "";
            var TPid = "";
            //        alert( 'SQDType: ' + sqdType );
            switch ( id )
            {
                case 'undo':
                    ctlPropMappingSrcGrid.doUndo();
                    break;
                case 'del_src':
                    ctlPropMappingSrcGrid.deleteSelectedRows();
                    break;
                case 'del_map':
                    var selectedIds = ctlPropMappingSrcGrid.getSelectedRowId();
                    var arrSelectedIds = [];
                    arrSelectedIds = selectedIds.split( "," );
                    var dlen = arrSelectedIds.length;
                    var rowIndxs = [];
                    for ( j = 0; j < dlen; j++ )
                    {
//                        alert( "arrSelectedIds[j]: " + arrSelectedIds[j] );
                        var selRow = ctlPropMappingSrcGrid.getRowIndex( arrSelectedIds[j] );
//                        alert( "selRow: " + selRow );
                        rowIndxs.push( selRow );
                    };
                    rowIndxs.sort( function ( a, b ) { return b - a } );
                    var Ilen = rowIndxs.length;
                    for ( i = 0; i < dlen; i++ )
                    {
                        var rowId = ctlPropMappingTgtGrid.getRowId( rowIndxs[i] );
//                        alert( "rowId: " + rowId );
                        ctlPropMappingTgtGrid.deleteRow( rowId );
                    };
                    ctlPropMappingSrcGrid.deleteSelectedRows();
                    break;
            }  // end switch
        } );                 // end src context menu

        function getTemplate( inTree, tname )
        {
            try
            {
                var retval = tname;
                var tempret;
                var tnodes = [];
                switch ( tname )
                {
                    case "CASE":
                        retval = "--You will need to define a When condition\n" + "--You will need to define true and false actions\n\n" + "CASE\n" + "WHEN(condition)\n" + "DO\n" + "-- true_action\n" + "END\n\n" + "OTHERWISE\n" + "DO\n" + "-- false_action\n" + "END";
                        break;
                    case "RouteTraditional":
                        retval = "-- Replace '**ProcedureName**' with the correct Procedure Name\n\n";
                        tempret = inTree.getAllSubItems( "0" );
                        tnodes = tempret.split( "," );
                        var len = tnodes.length;
                        for ( i = 0; i < len; i++ )
                        {
                            var nodeType = inTree.getUserData( tnodes[i], "DataType" );
                            if ( nodeType == "DS" )
                            {
                                retval = retval + "CASE RECNAME(" + inTree.getItemText( tnodes[i] ) + ")\n";
                                var tempret2 = inTree.getAllSubItems( tnodes[i] );
                                var dnodes = [];
                                dnodes = tempret2.split( "," );
                                var dlen = dnodes.length;
                                for ( j = 0; j < dlen; j++ )
                                {
                                    nodeType = inTree.getUserData( dnodes[j], "DataType" );
                                    if ( nodeType == "desc" )
                                    {
                                        retval = retval + "     WHEN '" + inTree.getItemText( dnodes[j] ) + "'\n";
                                        retval = retval + "     DO\n";
                                        retval = retval + "          CALLPROC(**ProcedureName**)\n";
                                        retval = retval + "     END\n";
                                    };
                                };
                            };
                        };
                        break;
                    case "Route":
                        retval = "-- Replace '**ProcedureName**' with the correct Procedure Name\n\n";
                        tempret = inTree.getAllSubItems( "0" );
                        tnodes = tempret.split( "," );
                        var len = tnodes.length;
                        for ( i = 0; i < len; i++ )
                        {
                            var nodeType = inTree.getUserData( tnodes[i], "DataType" );
                            if ( nodeType == "DS" )
                            {
                                retval = retval + "CASE CDC_TBNAME(" + inTree.getItemText( tnodes[i] ) + ")\n";
                                var tempret2 = inTree.getAllSubItems( tnodes[i] );
                                var dnodes = [];
                                dnodes = tempret2.split( "," );
                                var dlen = dnodes.length;
                                for ( j = 0; j < dlen; j++ )
                                {
                                    nodeType = inTree.getUserData( dnodes[j], "DataType" );
                                    if ( nodeType == "desc" )
                                    {
                                        retval = retval + "     WHEN '" + inTree.getItemText( dnodes[j] ) + "'\n";
                                        retval = retval + "     DO\n";
                                        retval = retval + "          CALLPROC(**ProcedureName**)\n";
                                        retval = retval + "     END\n";
                                    };
                                };
                            };
                        };
                        break;
                    case "LOOK":
                        retval = "LOOK";
                        break;
                    case "SetImage":
                        retval = '--You will need to define a variable field V_IMAGE\n--You will need to create a Procedure Called P_ROUTE\n\n' + 'IF CDCOP(CDCIN) = "R" AND SETIMAGE("BEFORE") = TRUE\nDO\n' + '    V_IMAGE = "B"\n' + '    CALLPROC(P_ROUTE)\nEND\n\n' + 'IF SETIMAGE("AFTER") = TRUE\nDO\n' + '    V_IMAGE = "A"\n' + '    CALLPROC(P_ROUTE)\nEND';
                        break;
                    case "CURRENTDATE":
                        retval = "LEFT(DATETIME(),10)";
                        break;
                    case "MAPBEFOREkeyChng":
                        retval = '--CDCIN is Source Datastore\n--INDESC is the Source Description containing Key field\n--OUTDESC is the Target Description containing Key field\n--KFLDx are the Key fields\n--"R" represents the "Replace" Operation\n\n' + 'IF CDCOP(CDCIN) = "R" DO\n' + '      MAP_BEFORE(CDCBEFORE(CDCIN.INDESC.KFLD1), "OUTDESC.KFLD1")\n' + '      MAP_BEFORE(CDCBEFORE(CDCIN.INDESC.KFLD2), "OUTDESC.KFLD2")\n' + '--           .   .      .\n' + '--           .   .      .\n' + '--        Repeat as necessary\nEND\n';
                        break;
                    default:
                        retval = tname;
                }
                return retval;
            }
            catch ( err )
            {
                logError( err.message, err.name, "UserControls.js", "function getTemplate( tname )" );
            };
        }

    // Save Grids ****************************************************************************************
        function saveGrids()
        {
            var saved = true;
            var numrows = 0;
            var i = 0;

//            alert( 'saveGrids\n num Src Rows: ' + ctlPropMappingSrcGrid.getRowsNum() + '\n num Tgt Rows: ' + ctlPropMappingTgtGrid.getRowsNum() );

            if(ctlPropMappingSrcGrid.getRowsNum() > ctlPropMappingTgtGrid.getRowsNum())
            {
                numrows = ctlPropMappingSrcGrid.getRowsNum();
            }
            else
            {
                numrows = ctlPropMappingTgtGrid.getRowsNum();
            };

//            alert( "numrows: " + numrows );

            for ( i = 0; i < numrows; i++ )
            {
                ListmappingId.push( i );     // list of mapping id of each mapping
                ListmappingDesc.push( "" );      // list of mapping descriptions
                if ( i >= ctlPropMappingSrcGrid.getRowsNum() )
                {
                    ListsrcType.push( "" );
                    ListDSsrc.push( "" );
                    ListParentsrc.push( "" );
                    ListSrc.push( "" );
                }
                else
                {
//                    alert( "ctlPropMappingSrcGrid.getRowsNum(): " + ctlPropMappingSrcGrid.getRowsNum() + "\ni: " + i );
//                    alert( "ctlPropMappingSrcGrid.cells(ctlPropMappingSrcGrid.getRowId(i), 3 ).getValue(): " + ctlPropMappingSrcGrid.cells( ctlPropMappingSrcGrid.getRowId( i ), 3 ).getValue() );

                    // list of source data
                    ListsrcType.push( ctlPropMappingSrcGrid.cells( ctlPropMappingSrcGrid.getRowId( i ), 3 ).getValue() );
                    ListDSsrc.push( ctlPropMappingSrcGrid.cells( ctlPropMappingSrcGrid.getRowId( i ), 4 ).getValue() );
                    ListParentsrc.push( ctlPropMappingSrcGrid.cells( ctlPropMappingSrcGrid.getRowId( i ), 5 ).getValue() );
                    ListSrc.push( ctlPropMappingSrcGrid.cells( ctlPropMappingSrcGrid.getRowId( i ), 6 ).getValue() );
                    
                }
            };

//            alert( "makes it here" );
            
            for ( i = 0; i < numrows; i++ )
            {
                if ( i >= ctlPropMappingTgtGrid.getRowsNum() )
                {
                    ListtgtType.push( "" );
                    ListDStgt.push( "" );
                    ListParenttgt.push( "" );
                    ListTgt.push( "" );
                }
                else
                {
                    // list of target data            
                    ListtgtType.push( ctlPropMappingTgtGrid.cells( ctlPropMappingTgtGrid.getRowId( i ), 3 ).getValue() );
                    ListDStgt.push( ctlPropMappingTgtGrid.cells( ctlPropMappingTgtGrid.getRowId( i ), 4 ).getValue() );
                    ListParenttgt.push( ctlPropMappingTgtGrid.cells( ctlPropMappingTgtGrid.getRowId( i ), 5 ).getValue() );
                    ListTgt.push( ctlPropMappingTgtGrid.cells( ctlPropMappingTgtGrid.getRowId( i ), 6 ).getValue() );
                }
            };

            //        alert( "ListTgt: " + ListTgt.toString() );/
            //        alert( "ListSrc: " + ListSrc.toString() );
            //        alert( "ListmappingId: " + ListmappingId.toString() );
            //        alert( "ListmappingDesc: " + ListmappingDesc.toString() );
            //        alert( "ListsrcType: " + ListsrcType.toString() );
            //        alert( "ListtgtType: " + ListtgtType.toString() );
            //        alert( "ListDSsrc: " + ListDSsrc.toString() );
            //        alert( "ListDStgt: " + ListDStgt.toString() );
            //        alert( "ListParentsrc: " + ListParentsrc.toString() );
            //        alert( "ListParenttgt: " + ListParenttgt.toString() );

            var taskid = nameProj + "." + nameEnv + "." + nameSys + "." + nameEng + "." + nameTask;
            var typeTask = "MAP";
            var ListTgtfy = JSON.stringify( ListTgt );
            var ListSrcfy = JSON.stringify( ListSrc );
            var ListmappingIdfy = JSON.stringify( ListmappingId );
            var ListmappingDescfy = JSON.stringify( ListmappingDesc );
            var ListsrcTypefy = JSON.stringify( ListsrcType );
            var ListtgtTypefy = JSON.stringify( ListtgtType );
            var ListDSsrcfy = JSON.stringify( ListDSsrc );
            var ListDStgtfy = JSON.stringify( ListDStgt );
            var ListParentsrcfy = JSON.stringify( ListParentsrc );
            var ListParenttgtfy = JSON.stringify( ListParenttgt );

            ListTgt = [];             // list of mapping targets
            ListSrc = [];             // list of mapping sources
            ListmappingId = [];       // list of mapping id of each mapping (numbered order)
            ListmappingDesc = [];     // list of mapping descriptions
            ListsrcType = [];         // list of source types
            ListtgtType = [];         // list of target types
            ListDSsrc = [];           // list of source DSs
            ListDStgt = [];           // list of target DSs
            ListParentsrc = [];
            ListParenttgt = [];
            //                        alert( "ListTgtfy: " + ListTgtfy );
            //                        alert( "ListSrcfy: " + ListSrcfy );
            //                        alert( "ListmappingIdfy: " + ListmappingIdfy );
            //                        alert( "ListmappingDescfy: " + ListmappingDescfy );
            //                        alert( "ListsrcTypefy: " + ListsrcTypefy );
            //                        alert( "ListtgtTypefy: " + ListtgtTypefy );
            //                        alert( "ListDSsrcfy: " + ListDSsrcfy );
            //                        alert( "ListDStgtfy: " + ListDStgtfy );
            //                        alert( "ListParentsrcfy: " + ListParentsrcfy );
            //                        alert( "ListParenttgtfy: " + ListParenttgtfy );

            //(".$_POST["objid"].",".$_POST["projName"].",".$_POST["envName"].",".$_POST["sysName"].",".$_POST["engName"].",".$_POST["taskName"].",".$_POST["taskType"].",".$_POST["mappingId"].",".$_POST["isMapped"].",".$_POST["mappingDesc"].",".$_POST["srcType"].",".$_POST["tgtType"].",".$_POST["mappingSrc"].",".$_POST["mappingTgt"].",".$_POST["srcParent"].",".$_POST["tgtParent"].",".$_POST["srcDS"].",".$_POST["tgtDS"].")"

//            alert( "objid = " + taskid );
            jQuery.ajax( {
                type: 'POST',  //type of request  GET or POST
                url: '../Studio/php/delAllMappings.php', // url to which the request is send
                data: { objid: taskid }, // data to be sent to server
                async: false,
                success: function ( return_data )  // function to be called if the request succeeds
                {
                    //alert( "Delete mappings return data: " + return_data );
                    if ( return_data == 'true' )
                    {
                        jQuery.ajax( {
                            type: 'POST',  //type of request  GET or POST
                            url: '../Studio/php/updateProcGrids.php', // url to which the request is send
                            data: { objid: taskid,                  //proc objid
                                projName: nameProj,                 //proj Name
                                envName: nameEnv,                   //env name
                                sysName: nameSys,                   //sys name
                                engName: nameEng,                   //eng name
                                taskName: nameTask,                 //task name
                                taskType: typeTask,                 //task type
                                tgtList: ListTgtfy,                     // list of target fields
                                srcList: ListSrcfy,                     // list of source fields
                                mappingIdList: ListmappingIdfy,       // list of mapping id of each mapping
                                mappingDescList: ListmappingDescfy,   // list of mapping descriptions
                                srcTypeList: ListsrcTypefy,           // list of source types
                                tgtTypeList: ListtgtTypefy,           // list of target types
                                srcDSList: ListDSsrcfy,               // list of src ds
                                tgtDSList: ListDStgtfy,               // list of tgt ds
                                srcParentList: ListParentsrcfy,       // list of src parents (description name)
                                tgtParentList: ListParenttgtfy        // list of tgt parents (description name)
                            }, // data to be sent to server
                            async: false,
                            success: function ( return_data )  // function to be called if the request succeeds
                            {
                                //alert( "Update return data: " + return_data );
                                //                        alert( "After Tree load data: " + return_data );
                                propLayout.progressOff();
                                //                alert( "return true" );
                                //                ctlPropMappingTgtGrid.openAllItems( '0' );
                            },
                            error: function ()
                            {
                                //function to be called if the request fail
                                propLayout.progressOff();
                                //                alert( 'error' );
                                saved = false;
                            }
                        } );             // end ajax for insert
                    }
                },
                error: function ()
                {
                    //function to be called if the request fail
                    propLayout.progressOff();
                    //                alert( 'error' );
                    saved = false;
                }
            } );              // end ajax for delete
            return saved;
        };

        // save all things in form  ************************************************************
        ctlProp.attachEvent( "onButtonClick", function ( name )
        {
            if ( name == "btnProcSave" )
            {
                if ( ctlProp.validate() )
                {
                    propLayout.progressOn();
                    // Save taskMappings
                    // save grids
    //                var didSave = saveGrids()
    //                alert("didSave = " + didSave);
                    if ( saveGrids() == true )
                    {
                        ctlProp.save();
                    }
                    else
                    {
                        alert( "did not save" );
                    }          
                };
            }
            else
            {
                doDelete( id );
                propLayout.progressOff();
                //            alert( 'Delete Proc: ' + ctlProp.getItemValue( 'taskName' ) );
            }
        } );

        ctlProp.attachEvent( 'onAfterSave', function ( id, xml )
        {
            propLayout.progressOff();
            IsSaved = true;
            
            if ( id == previousId )
            {
                loadSrcGrid();
                loadTgtGrid();
            }
            else
            {
                LoadCtl( previousId, previousTabId );
            };
            dhtmlx.message( {
                text: "Procedure " + nameTask + " has been saved",
                expires: 5000
            } );
        } );

        ctlProp.attachEvent( "onChange", function ( name, value )
        {
            IsSaved = false;
        } );
    }
    catch ( err )
    {
        logError( err.message, err.name, "UserControls.js", "function loadCtlProc( id, tabId )" );
    }
}

// ***************************************************************************************************************************
// ****************************************** Main Control *******************************************************************
// ***************************************************************************************************************************
function loadCtlMain( id, tabId )
{
    try
    {
        //            alert( "loadCtlMain" );
        var inID = id;
        var nameProj = getProjName( id );
        var nameEnv = getEnvName( id );
        var nameSys = getSysName( id );
        var nameEng = getEngName( id );
        var nameTask = "";
        var ParentObj = getParentId(id);
        var ParentNm = getParentName(id);
        var mapSrcDS = "";
        var sinput;
        var finput;
        var TreeSRC;
        var TreeFun;

        var procStruct = [
	        { type: "settings", position: "label-left", labelWidth: 100, inputWidth: 180 },
	        { type: "fieldset", label: "Mapping Procedure", inputWidth: "auto", list: [
                    { name: "objid", type: "input", label: "objid", value: "", readonly: "true", required: true, hidden: true },
                    { name: "projName", type: "input", label: "Project Name", value: "", readonly: "true", hidden: true },
                    { name: "envName", type: "input", label: "Environment Name", value: "", readonly: "true", hidden: true },
                    { name: "sysName", type: "input", label: "System Name", value: "", readonly: "true", hidden: true },
			        { name: "engName", type: "input", label: "Engine Name", value: "", readonly: "true", hidden: true },
			        { name: "taskName", type: "input", label: "Procedure Name", value: "", required: true, readonly: true },
                    { type: "newcolumn" },
			        { name: "taskDesc", label: "Description", type: "input", inputWidth: "260", rows: "3", value: "" },
                    { name: "taskType", type: "input", label: "taskType", value: "", readonly: "true", hidden: true },
			        { name: "taskSeqNo", type: "input", label: "taskSeqNo", value: "1", readonly: "false", hidden: true }
		        ]
	        },
	        { type: "fieldset", inputWidth: "auto", list: [
			        { name: "btnProcSave", type: "button", value: "Save" },
			        { type: "newcolumn" },
			        { name: "btnProcDelete", type: "button", value: "Delete" }
		        ]
	        }
        ];

        var txtStruct = [
	        { type: "settings", position: "label-left", labelWidth: 100 },
	        { type: "fieldset", label: "Procedure Logic", inputWidth: "auto", list: [
                    { id: "taskText", name: "taskText", label: "", type: "input", inputWidth: "460", rows: "50", value: "" }
		        ]
	        }
        ];


        function s_control( treeIn )
        {
            this._drag = function ( sourceHtmlObject, dhtmlObject, targetHtmlObject )
            {
                targetHtmlObject.style.backgroundColor = ""
                var z;
                if ( treeIn.getUserData( sourceHtmlObject.parentObject.id, "DataType" ) == "GROUPITEM" )
                {
                    z = treeIn.getUserData( sourceHtmlObject.parentObject.id, 'descName' ) + "." + treeIn.getItemText( sourceHtmlObject.parentObject.id );
                    //treeIn.getUserData( sourceHtmlObject.parentObject.id, 'DSname' ) + "." + 
                }
                else if ( treeIn.getUserData( sourceHtmlObject.parentObject.id, "DataType" ) == "DS" )   // It's a Datastore, so don't map
                {
                    z = treeIn.getItemText( sourceHtmlObject.parentObject.id );
                }
                else if ( treeIn.getUserData( sourceHtmlObject.parentObject.id, "DataType" ) == "desc" )   // It's a description, so don't map
                {
                    z = treeIn.getItemText( sourceHtmlObject.parentObject.id );
                }
                else if ( treeIn.getUserData( sourceHtmlObject.parentObject.id, "DataType" ) == "var" )   // it's a variable so  fill it in
                {
                    z = treeIn.getItemText( sourceHtmlObject.parentObject.id );
                }
                else if ( treeIn.getUserData( sourceHtmlObject.parentObject.id, "DataType" ) == "Proc" )   // it's a variable so  fill it in
                {
                    z = treeIn.getItemText( sourceHtmlObject.parentObject.id );
                }
                else   // Must be a Field
                {
                    z = treeIn.getUserData( sourceHtmlObject.parentObject.id, 'descName' ) + "." + treeIn.getItemText( sourceHtmlObject.parentObject.id );
                    //treeIn.getUserData( sourceHtmlObject.parentObject.id, 'DSname' ) + "." + 
                };

                //                alert( "z: " + z );
                // return value
                IsSaved = false;
                targetHtmlObject.value = targetHtmlObject.value + "\n" + z;
            };
            this._dragIn = function ( htmlObject, shtmlObject )
            {
                htmlObject.style.backgroundColor = "#fffacd";
                return htmlObject;
            };
            this._dragOut = function ( htmlObject )
            {
                htmlObject.style.backgroundColor = "";
                return this;
            };
        };
        //    new dhtmlDragAndDropObject();
        function f_control( treeIn, SrcTree )
        {
            this._drag = function ( sourceHtmlObject, dhtmlObject, targetHtmlObject )
            {
                targetHtmlObject.style.backgroundColor = "";

                //                            alert( "sourceHtmlObject.parentObject.label = " + sourceHtmlObject.parentObject.label +
                //                            "\nsourceHtmlObject.parentObject.id = " + sourceHtmlObject.parentObject.id +
                //                            "\nsourceHtmlObject.parentObject.parentObject.id = " + sourceHtmlObject.parentObject.parentObject.id +
                //                            "\nsourceHtmlObject.parentObject.parentObject.parentObject.id = " + sourceHtmlObject.parentObject.parentObject.parentObject.id +
                //                            "\ntreeIn.getSelectedItemId() = " + treeIn.getSelectedItemId() +
                //                            "\ntreeIn.getUserData(sourceHtmlObject.parentObject.id,'SYNTAX') = " + treeIn.getUserData( sourceHtmlObject.parentObject.id, 'SYNTAX' ) +
                //                            "\ntargetHtmlObject.value = " + targetHtmlObject.value
                //                             );

                // "\ndhtmlObject.value = " + dhtmlObject.value + 
                // "\nsourceHtmlObject.parentObject.type = " + sourceHtmlObject.parentObject.type +
                // "\nsourceHtmlObject.label = " + sourceHtmlObject.label + 
                //"\ntargetHtmlObject.label = " + targetHtmlObject.label +            
                //"\ntreeSRC.getSelectedItemId() = " + treeSRC.getSelectedItemId()

                //                dhtmlx.message( {
                //                    title: "Under Contruction",
                //                    type: "error",
                //                    text: "Templates are currently under construction.",
                //                    expires: 5000
                //                } );

                var z;

                if ( treeIn.getUserData( sourceHtmlObject.parentObject.id, "NODETYPE" ) == 'Template' )
                {
//                    dhtmlx.message( {
//                        title: "Under Contruction",
//                        type: "error",
//                        text: "Templates are currently under construction.",
//                        expires: 5000
//                    } );
                    //                    var txt = treeObj.getItemText( treeNodeId );
                    //                    alert( 'txt ' + txt );
                    z = getTemplate( SrcTree, treeIn.getItemText( sourceHtmlObject.parentObject.id ) );  //treeIn.getSelectedItemId() 
                }
                else
                {
                    z = treeIn.getUserData( sourceHtmlObject.parentObject.id, "SYNTAX" );
                };
                IsSaved = false;
                targetHtmlObject.value = targetHtmlObject.value + "\n" + z;
            };
            this._dragIn = function ( htmlObject, shtmlObject )
            {
                htmlObject.style.backgroundColor = "#fffacd";
                return htmlObject;
            };
            this._dragOut = function ( htmlObject )
            {
                htmlObject.style.backgroundColor = "";
                return this;
            };
        };


        var propLayout = Tabbar_user_control.cells( "tabProp" ).attachLayout( "3T" );
        propLayout.cells( "a" ).setText( "Properties" );
        propLayout.cells( "a" ).setHeight( 170 );
        propLayout.cells( "b" ).setText( "Sources" );
        propLayout.cells( "c" ).setText( "" );
        propLayout.cells( "b" ).setWidth( 220 );
        //            propLayout.cells( "c" ).setWidth( 420 );

        var ctlProp = propLayout.cells( "a" ).attachForm( procStruct );
        ctlProp.setFontSize( '11px' );
        var dp = new dataProcessor( "../Studio/php/loadTask.php" ); //instatiate dataprocessor
        dp.init( ctlProp ); //link form to dataprocessor

        //    alert( 'loadCtlEnv Name: ' + id + "\n" + "../Studio/php/loadEnv.php?id=" + tabId );

        /// set text editing area for logic
        var ctlCodeEditor = propLayout.cells( "c" ).attachForm( txtStruct ); //, "dhx_skyblue" 

        ctlProp.attachEvent( "onChange", function ( name, value )
        {
            IsSaved = false;
        } );

        ctlCodeEditor.attachEvent( "onChange", function ( name, value )
        {
            IsSaved = false;
//            dhtmlx.message( {
//                title: "ctlCodeEditor.onChange",
//                text: "IsSaved: " + IsSaved,
//                expires: 5000
//            } );
        } );

        ctlCodeEditor.attachEvent( "onInputChange", function ( name, value, form )
        {
            IsSaved = false;
//            dhtmlx.message( {
//                title: "ctlCodeEditor.onInputChange",
//                text: "IsSaved: " + IsSaved,
//                expires: 5000
//            } );
        } );

        ctlProp.attachEvent( "onXLE", function ()
        {
            // after loading ended and data rendered (before user's callback)
            var getID = ctlProp.getItemValue( 'objid' );
            //        alert( "getID = " + getID );

            jQuery.ajax( {
                type: 'POST',  //type of request  GET or POST
                url: '../Studio/php/GetMainText.php', // url to which the request is send
                data: { objid: getID }, // data to be sent to server
                async: false,
                success: function ( return_data )  // function to be called if the request succeeds
                {
                    //                    alert( "Before Grid source load data: " + return_data );
                    ctlCodeEditor.setItemValue( "taskText", SQLunquote( return_data ) );   //

                    //                        alert( "After Tree load data: " + return_data );
                    propLayout.progressOff();
                    //                alert( "After Tree load data: " + return_data );
                    //                ctlPropMappingTgtGrid.openAllItems( '0' );
                    IsSaved = true;
                },
                error: function ()
                {
                    //function to be called if the request fail
                    propLayout.progressOff();
                    alert( 'error' );
                }
            } );          // end ajax
        } );

        // Load the form, then load the editor
        ctlProp.load( "../Studio/php/loadTask.php?id=" + tabId, function ()
        {
            
        } );
        
         // load Editor
    //     dhtmlx.message( {
    //         title: "Under Contruction",
    //         type: "error",
    //         text: "Loading of Procedure Logic is currently under construction.",
    //         expires: 5000
    //          } );
     
        /// set new tabbar for src DSs and functions
        var tabbarSQDfun = propLayout.cells( "b" ).attachTabbar();
        propLayout.cells( "b" ).dock();

        tabbarSQDfun.setAlign( "top" );
        tabbarSQDfun.setImagePath( "../Studio/dhtmlxSuite/dhtmlxTabbar/codebase/imgs/" );
        tabbarSQDfun.setSkin( "dhx_skyblue" );
        tabbarSQDfun.enableTabCloseButton( false );
        //    Tabbar_user_control.enableAutoResize(true);
    //    tabbarSQDfun.setHrefMode( "iframe" );

        tabbarSQDfun.addTab( "tabSRC", "Sources", "80px" );
        tabbarSQDfun.addTab( "tabSQDFun", "Functions", "80px" );

        tabbarSQDfun.attachEvent( 'onSelect', function ( id, last_id )
        {
            if ( id == "tabSRC" )
            {
                var treeSRC = tabbarSQDfun.cells( "tabSRC" ).attachTree( '0' );
                treeSRC.setSkin( 'dhx_skyblue' );
                treeSRC.setImagePath( '../Studio/data/SQDimgs/' );
                treeSRC.enableDragAndDrop( '1', true );
                treeSRC.enableMercyDrag( '1' );
                treeSRC.enableImageDrag( true );
                treeSRC.setDragBehavior( 'complex' );
                sinput = ctlCodeEditor.getInput( 'taskText' );
//                            alert( 'sinput: ' + sinput );
                treeSRC.dragger.addDragLanding( sinput, new s_control(treeSRC) );
           
                treeSRC.enableTreeImages( true );
                treeSRC.enableItemEditor( false );
                treeSRC.enableTreeLines( true );
                treeSRC.deleteChildItems( '0' );
                treeSRC.enableSmartXMLParsing( true );

                treeSRC.deleteItem( '0' );
                TreeSRC = treeSRC;

                // load sources tree
                jQuery.ajax( {
                    type: 'POST',  //type of request  GET or POST
                    url: '../Studio/php/GetProcFieldTrees.php', // url to which the request is send
                    data: { icontype: 'SDS.gif',
                        objid: inID,
                        DSdir: 'S',
                        nameProj: nameProj,
                        nameEnv: nameEnv,
                        nameSys: nameSys,
                        nameEng: nameEng
                    }, // data to be sent to server
                    async: false,
                    success: function ( return_data )  // function to be called if the request succeeds
                    {
//                        alert("Before Tree load data: " + return_data);

                        TreeSRC.loadXMLString(return_data, function ()  // load tree with return data XML     XMLString
                        {
//                                                    alert( "After Tree load data: " + return_data );
                            propLayout.progressOff();
//                                           alert( "After Tree load data: " + return_data );
                            TreeSRC.openAllItems( '0' );
                        } );
                    },
                    error: function ()
                    {
                        //function to be called if the request fail
                        propLayout.progressOff();
                        alert( 'error' );
                    }
                } );          // end ajax

                //  Source tree events
                TreeSRC.attachEvent( 'onSelect', function ( id )
                {
                    //                dhtmlx.message( {
                    //                    text: 'TreeSRC.onSelect \nid = ' + id,
                    //                    expires: 5000
                    //                } );
                } ); // end onSelect

                //fires when the item's dragging starts (the item is selected and the mouse is moving)
                TreeSRC.attachEvent( "onBeforeDrag", function ( sId )
                {
                    return true;
                } );

                //fires when the item was dragged and dropped on some other item, but before item's moving has been processed
                TreeSRC.attachEvent( "onDrag", function ( sId, tId, id, sObject, tObject )
                {
                    return false;
                } );

                //fires when the item is dragged over some target the item can be dropped to
                TreeSRC.attachEvent( "onDragIn", function ( sId, tId, sObject, tObject )
                {
                    return false;
                } );

                //fires when drag-and-drop has already been processed; besides, fires when the nodes are moved programmatically
                TreeSRC.attachEvent( "onDrop", function ( sId, tId, id, sObject, tObject )
                {
                    return true;
                } );
//                // load source tree
//                jQuery.ajax( {
//                    type: 'POST',  //type of request  GET or POST
//                    url: '../Studio/php/GetProcFieldTrees.php', // url to which the request is send
//                    data: { icontype: 'SDS.gif',
//                        objid: inID,
//                        DSdir: 'S',
//                        nameProj: nameProj,
//                        nameEnv: nameEnv,
//                        nameSys: nameSys,
//                        nameEng: nameEng
//                    }, // data to be sent to server
//                    async: false,
//                    success: function ( return_data )  // function to be called if the request succeeds
//                    {
//                        //                    alert( "Before Tree load data: " + return_data );
//                        treeSRC.loadXMLString( return_data, function ()  // load tree with return data XML
//                        {
//                            //                        alert( "After Tree load data: " + return_data );
//                            propLayout.progressOff();
//                            //                alert( "After Tree load data: " + return_data );
//                            treeSRC.openAllItems( '0' );
//                            mapSrcDS = treeSRC.getItemText( '0' );
//                        } );
//                    },
//                    error: function ()
//                    {
//                        //function to be called if the request fail
//                        propLayout.progressOff();
//                        alert( 'error' );
//                    }
//                } );          // end ajax
            }
            else
            {
                var treeFun = tabbarSQDfun.cells( "tabSQDFun" ).attachTree( '0' );
                treeFun.setSkin( 'dhx_skyblue' );
                treeFun.setImagePath( '../Studio/data/SQDimgs/' );
                treeFun.enableDragAndDrop( '1', true );
                treeFun.enableMercyDrag( '1' );
                treeFun.setDragBehavior( 'complex' );
                finput = ctlCodeEditor.getInput( 'taskText' );
                //            alert( 'sinput: ' + sinput );
                treeFun.dragger.addDragLanding( finput, new f_control( treeFun, TreeSRC ) );
                treeFun.enableTreeImages( true );
                treeFun.enableItemEditor( false );
                treeFun.enableTreeLines( true );
                treeFun.deleteChildItems( '0' );
                treeFun.deleteItem( '0' );
                treeFun.enableSmartXMLParsing( true );

                TreeFun = treeFun;
                TreeFun.loadXML( '../Studio/data/SQDSYFUN.XML', function ()
                {
                    //                treeFun.openAllItems( '0' );
                    //                                alert( "Loaded" );
                } ); // end loadFunctions

                //  Function tree events
                TreeFun.attachEvent( 'onSelect', function ( id )
                {

                } ); // end onSelect

                //fires when the item's dragging starts (the item is selected and the mouse is moving)
                TreeFun.attachEvent( "onBeforeDrag", function ( sId )
                {
                    return true;
                } );

                //fires when the item was dragged and dropped on some other item, but before item's moving has been processed
                TreeFun.attachEvent( "onDrag", function ( sId, tId, id, sObject, tObject )
                {
                    return false;
                } );

                //fires when the item is dragged over some target the item can be dropped to
                TreeFun.attachEvent( "onDragIn", function ( sId, tId, sObject, tObject )
                {
                    return false;
                } );

                //fires when drag-and-drop has already been processed; besides, fires when the nodes are moved programmatically
                TreeFun.attachEvent( "onDrop", function ( sId, tId, id, sObject, tObject )
                {
                    return false;
                } );
//                treeFun.loadXML( '../Studio/data/SQDSYFUN.XML', function ()
//                {
//                    //                treeFun.openAllItems( '0' );
//                    //                alert( "Loaded" );
//                } );
            }
            return true;
        } );
        tabbarSQDfun.attachEvent( 'onTabClose', function ( id )
        {
            return true;
        } );
        tabbarSQDfun.setTabActive( "tabSQDFun" );
        tabbarSQDfun.setTabActive( "tabSRC" );

        function getTemplate( inTree, tname )
        {
            try
            {
                var retval = tname;
                var tempret;
                var tnodes = [];
                switch ( tname )
                {
                    case "CASE":
                        retval = "--You will need to define a When condition\n" + "--You will need to define true and false actions\n\n" + "CASE\n" + "WHEN(condition)\n" + "DO\n" + "-- true_action\n" + "END\n\n" + "OTHERWISE\n" + "DO\n" + "-- false_action\n" + "END";
                        break;
                    case "RouteTraditional":
                        retval = "-- Replace '**ProcedureName**' with the correct Procedure Name\n\n";
                        tempret = inTree.getAllSubItems( "0" );
                        tnodes = tempret.split( "," );
                        var len = tnodes.length;
                        for ( i = 0; i < len; i++ )
                        {
                            var nodeType = inTree.getUserData( tnodes[i], "DataType" );
                            if ( nodeType == "DS" )
                            {
                                retval = retval + "CASE RECNAME(" + inTree.getItemText( tnodes[i] ) + ")\n";
                                var tempret2 = inTree.getAllSubItems( tnodes[i] );
                                var dnodes = [];
                                dnodes = tempret2.split( "," );
                                var dlen = dnodes.length;
                                for ( j = 0; j < dlen; j++ )
                                {
                                    nodeType = inTree.getUserData( dnodes[j], "DataType" );
                                    if ( nodeType == "desc" )
                                    {
                                        retval = retval + "     WHEN '" + inTree.getItemText( dnodes[j] ) + "'\n";
                                        retval = retval + "     DO\n";
                                        retval = retval + "          CALLPROC(**ProcedureName**)\n";
                                        retval = retval + "     END\n";
                                    };
                                };
                            };
                        };
                        break;
                    case "Route":
                        retval = "-- Replace '**ProcedureName**' with the correct Procedure Name\n\n";
                        tempret = inTree.getAllSubItems( "0" );
                        tnodes = tempret.split( "," );
                        var len = tnodes.length;
                        for ( i = 0; i < len; i++ )
                        {
                            var nodeType = inTree.getUserData( tnodes[i], "DataType" );
                            if ( nodeType == "DS" )
                            {
                                retval = retval + "CASE CDC_TBNAME(" + inTree.getItemText( tnodes[i] ) + ")\n";
                                var tempret2 = inTree.getAllSubItems( tnodes[i] );
                                var dnodes = [];
                                dnodes = tempret2.split( "," );
                                var dlen = dnodes.length;
                                for ( j = 0; j < dlen; j++ )
                                {
                                    nodeType = inTree.getUserData( dnodes[j], "DataType" );
                                    if ( nodeType == "desc" )
                                    {
                                        retval = retval + "     WHEN '" + inTree.getItemText( dnodes[j] ) + "'\n";
                                        retval = retval + "     DO\n";
                                        retval = retval + "          CALLPROC(**ProcedureName**)\n";
                                        retval = retval + "     END\n";
                                    };
                                };
                            };
                        };
                        break;
                    case "LOOK":
                        retval = "LOOK";
                        break;
                    case "SetImage":
                        retval = '--You will need to define a variable field V_IMAGE\n--You will need to create a Procedure Called P_ROUTE\n\n' + 'IF CDCOP(CDCIN) = "R" AND SETIMAGE("BEFORE") = TRUE\nDO\n' + '    V_IMAGE = "B"\n' + '    CALLPROC(P_ROUTE)\nEND\n\n' + 'IF SETIMAGE("AFTER") = TRUE\nDO\n' + '    V_IMAGE = "A"\n' + '    CALLPROC(P_ROUTE)\nEND';
                        break;
                    case "CURRENTDATE":
                        retval = "LEFT(DATETIME(),10)";
                        break;
                    case "MAPBEFOREkeyChng":
                        retval = '--CDCIN is Source Datastore\n--INDESC is the Source Description containing Key field\n--OUTDESC is the Target Description containing Key field\n--KFLDx are the Key fields\n--"R" represents the "Replace" Operation\n\n' + 'IF CDCOP(CDCIN) = "R" DO\n' + '      MAP_BEFORE(CDCBEFORE(CDCIN.INDESC.KFLD1), "OUTDESC.KFLD1")\n' + '      MAP_BEFORE(CDCBEFORE(CDCIN.INDESC.KFLD2), "OUTDESC.KFLD2")\n' + '--           .   .      .\n' + '--           .   .      .\n' + '--        Repeat as necessary\nEND\n';
                        break;
                    default:
                        retval = tname;
                }
                return retval;
            }
            catch ( err )
            {
                logError( err.message, err.name, "UserControls.js", "function getTemplate( tname )" );
            };
        }
        //******************************************************
        // ++++++++ Save +++++++++
        ctlProp.attachEvent( "onButtonClick", function ( name )
        {
            if ( name == "btnProcSave" )
            {
                if ( ctlProp.validate() )
                {
                    propLayout.progressOn();
                    nameTask = ctlProp.getItemValue( "taskName" );

                    // Save taskMappings
                    // save grids
                    //                alert( 'saveMainFun' );
                    //        var j = 0;
    //                dhtmlx.message( {
    //                    title: "Under Contruction",
    //                    type: "error",
    //                    text: "Saving of Procedure Logic is currently under construction.",
    //                    expires: 5000
    //                } );
                    //      
                    var taskid = nameProj + "." + nameEnv + "." + nameSys + "." + nameEng + "." + nameTask;
                    var typeTask = ctlProp.getItemValue( "taskType" ); ;
                    var mappingSrc = ctlCodeEditor.getInput( "taskText" );

                    //                alert( "mapping Source = " +  mappingSrc.value  );

                    mappingSrc = mappingSrc.value;

                    //                alert( "mapping Source = " +  mappingSrc );

                    var mappingTgt = "";
                    var mappingId = 1;   // mapping id of each mapping. Here always 1
                    var mappingDesc = "";     // mapping description. Here always ""
                    var mappingSrcType = "FUN";     // mapping source type. Here always 'main'
                    var mappingTgtType = "";
                    var mappingSrcDS = mapSrcDS; //root of Src Tree is DS name
                    var mappingTgtDS = "";
                    var mappingSrcParent = ctlCodeEditor.getUserData( "taskText", "desc" );
                    var mappingTgtParent = "";


                    jQuery.ajax( {
                        type: 'POST',  //type of request  GET or POST
                        url: '../Studio/php/updateMainFun.php',   // url to which the request is send
                        data: { objid: taskid,                      // proc objid
                            projName: nameProj,                     // proj Name
                            envName: nameEnv,                       // env name
                            sysName: nameSys,                       // sys name
                            engName: nameEng,                       // eng name
                            taskName: nameTask,                     // task name
                            taskType: typeTask,                     // task type
                            src: mappingSrc,                        // source field
                            tgt: mappingTgt,                        // target field ... nothing here
                            mappingId: mappingId,                   // mapping id of each mapping
                            mappingDesc: mappingDesc,               // mapping descriptions
                            srcType: mappingSrcType,                // source types
                            tgtType: mappingTgtType,                // target types ... nothing here
                            srcDS: mappingSrcDS,                    // src ds
                            tgtDS: mappingTgtDS,                    // tgt ds ... nothing here
                            srcParent: mappingSrcParent,                   // src parents (description name)
                            tgtParent: mappingTgtParent                    // tgt parents (description name) ... nothing here
                        }, // data to be sent to server
                        async: false,
                        success: function ( return_data )  // function to be called if the request succeeds
                        {
                            //                        alert( "Update return data: " + return_data );
                            //                        alert( "After Tree load data: " + return_data );
                            propLayout.progressOff();
    //                        alert( "After Tree load data: " + return_data );
                            //                ctlPropMappingTgtGrid.openAllItems( '0' );
                            ctlProp.save();
                        },
                        error: function ()
                        {
                            //function to be called if the request fail
                            propLayout.progressOff();
                            alert( 'error' );

                        }
                    } );          // end ajax
                };
            }
            else
            {
                doDelete( id );
                propLayout.progressOff();
    //            alert( 'Delete Proc: ' + ctlProp.getItemValue( 'taskName' ) );
            }
        } );

        ctlProp.attachEvent( 'onAfterSave', function ( id, xml )
        {
            propLayout.progressOff();
            IsSaved = true;
            LoadCtl( previousId, previousTabId );
            dhtmlx.message( {
                text: "Main Procedure " + nameTask + " has been saved",
                expires: 5000
            } );
        } );

        ctlProp.attachEvent( "onChange", function ( name, value )
        {
            IsSaved = false;
        } );
    }
    catch ( err )
    {
        logError( err.message, err.name, "UserControls.js", "function loadCtlMain( id, tabId )" );
    }
}