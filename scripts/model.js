//
// SQData Script Generation
//**********************************************************************************************

// Main Generator
//**********************************************************************************************
function DOmodel( id, tabId )
{
//        alert( "Modeler" );
       
    try
    {
        var descName = MainTree.getItemText( id );
        var srcType = MainTree.getUserData( id, "sqdType" );
//            alert("srcType: " + srcType);
        var typeMod = "";
        var NameMod = "";
        var FileMod = "";
        var PathMod = "";
        var newMod = "sample model text";
        //    alert( "Desc Id (objid): " + id + '\ntabId = ' + tabId );
        //    var objid = MainTree.getUserData( objid, 'objid' );

        var structDesc = [
	            { type: "settings", position: "label-left", labelAlign: "left", labelWidth: "90", inputWidth: "180", offsetLeft: "0" },
	            { type: "fieldset", label: "Description Properties", inputWidth: "auto", list: [
                    { name: "id", type: "input", label: "id", value: "", hidden: true },
                    { name: "objid", type: "input", label: "objid", value: "", hidden: true },
                    { name: "projName", type: "input", label: "Project Name", value: "", hidden: true },
			        { name: "envName", type: "input", label: "Environment Name", hidden: true, value: "" },
		            { name: "descName", type: "input", label: "Description Name", required: true, value: "" }
	            ]
	            },
	            { type: "fieldset", label: "Description File Properties", inputWidth: "auto", offsetLeft: "0", list: [
		            { name: "fpath1", type: "input", label: "Description File" }
	            ]
	            },
	            { type: "fieldset", label: "Choose New Type", inputWidth: "auto", offsetLeft: "0", list: [
		            { name: "modType", type: "combo", inputWidth: "180", label: "Type of Model", options: [
					    { text: "XML DTD", value: "DTD" },
					    { text: "DB2 DDL", value: "DB2" },
					    { text: "MS sql DDL", value: "mssql" },
					    { text: "Oracle DDL", value: "ora" },
                        { text: "SQD DDL", value: "UDB" },
					    { text: "C", value: "C" },
                        { text: "Oracle Load", value: "OraLoad" },
					    { text: "Oracle Trigger", value: "OraTrig" },
					    { text: "SQL Server Trigger", value: "mssqlTrig" },
					    { text: "MQ Trigger", value: "mqTrig" }					        
			        ]
		            },
                    { name: "modfile", type: "input", label: "Model Name" },
                    { name: "btnModel", type: "button", width: "180", value: "Model", disabled: true }
	            ]
	            }
            ];

        var txtModel = [
	            { type: "settings", position: "label-left", labelWidth: 100 },
	            { type: "fieldset", label: "Model Output", inputWidth: "auto", list: [
                { type: "fieldset", label: "Model on server", inputWidth: "auto", list: [
			        { name: "modPath", type: "input", inputWidth: "550", rows: "1", value: "" },
                    { type: "newcolumn" },
			        { name: "btnDownloadmod", type: "button", value: "Download Model", disabled: true }
		        ]
                },
                    { id: "modText", name: "modText", label: "", type: "input", inputWidth: "700", rows: "50", value: "" }
		        ]
	            }
            ];

        var propLayout = Tabbar_user_control.cells( "tabProp" ).attachLayout( "3U" );
        propLayout.cells( "a" ).setText( "Properties" );
        propLayout.cells( "a" ).setHeight( 320 );
        propLayout.cells( "b" ).setText( "Fields" );
        propLayout.cells( "a" ).setWidth( 400 );
        propLayout.cells( "c" ).setText( "Model" );

        // Model area
        var ctlModel = propLayout.cells( "c" ).attachForm( txtModel );
        ctlModel.setFontSize( '11px' );

        var ctlPropFieldTree = propLayout.cells( "b" ).attachTree();
        ctlPropFieldTree.enableCheckBoxes( true, true );
        ctlPropFieldTree.enableThreeStateCheckboxes( true );
        ctlPropFieldTree.enableSmartCheckboxes( true );
        ctlPropFieldTree.deleteChildItems( '0' );
        ctlPropFieldTree.deleteItem( '0' );
        ctlPropFieldTree.setSkin( 'dhx_skyblue' );
        ctlPropFieldTree.setImagePath( '../Studio/data/SQDimgs/' );

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
//                        alert( "Before Tree load data: " + return_data ); 
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

        var modCombo = ctlProp.getCombo( "modType" );
        modCombo.attachEvent( "onChange", function ()
        {
            typeMod = modCombo.getSelectedValue();
            switch ( typeMod )
            {
                case 'DTD':
                    ctlProp.setItemValue( "modfile", ctlProp.getItemValue( "descName" ) + ".dtd" );
                    ctlProp.enableItem( "btnModel" );
                    break;
                case 'DB2':
                    ctlProp.setItemValue( "modfile", ctlProp.getItemValue( "descName" ) + ".ddl" );
                    ctlProp.enableItem( "btnModel" );
                    break;
                case 'mssql':
                    ctlProp.setItemValue( "modfile", ctlProp.getItemValue( "descName" ) + ".sql" );
                    ctlProp.enableItem( "btnModel" );
                    break;
                case 'ora':
                    ctlProp.setItemValue( "modfile", ctlProp.getItemValue( "descName" ) + ".ddl" );
                    ctlProp.enableItem( "btnModel" );
                    break;
                case 'UDB':
                    ctlProp.setItemValue( "modfile", ctlProp.getItemValue( "descName" ) + ".ddl" );
                    ctlProp.enableItem( "btnModel" );
                    break;
                case 'C':
                    ctlProp.setItemValue( "modfile", ctlProp.getItemValue( "descName" ) + ".h" );
                    ctlProp.enableItem( "btnModel" );
                    break;
                case 'OraLoad':
                    ctlProp.setItemValue( "modfile", ctlProp.getItemValue( "descName" ) + ".lod" );
                    ctlProp.enableItem( "btnModel" );
                    break;
                case 'OraTrig':
                    ctlProp.setItemValue( "modfile", ctlProp.getItemValue( "descName" ) + ".sql" );
                    ctlProp.enableItem( "btnModel" );
                    break;
                case 'mssqlTrig':
                    ctlProp.setItemValue( "modfile", ctlProp.getItemValue( "descName" ) + ".sql" );
                    ctlProp.enableItem( "btnModel" );
                    break;
                case 'mqTrig':
                    ctlProp.setItemValue( "modfile", ctlProp.getItemValue( "descName" ) + ".TRG" );
                    ctlProp.enableItem( "btnModel" );
                    break;
            };
        } );

        ctlProp.attachEvent( "onButtonClick", function ( name )
        {
            propLayout.progressOn();
            if ( name == "btnModel" )
            {
                dhtmlx.message( {
                    text: "Model is being built",
                    expire: 5000
                } );
                propLayout.progressOn();
                // Modeling logic Here
                var ModName = ctlProp.getItemValue( "modfile" );
                var newModel = bldModel();
                ctlModel.setItemValue( "modText", newModel );
                if ( newModel != "false" )
                {
                    // write the model file on server
                    jQuery.ajax( {
                        type: 'POST',  //type of request  GET or POST
                        url: '../Studio/php/model.php',   // url to which the request is send
                        data: { modName: ModName,                 // proj Name
                            modText: newModel
                        }, // data to be sent to server
                        async: false,
                        success: function ( return_data )  // function to be called if the request succeeds
                        {
                            main_layout.progressOff();

                            //                            alert( "return_data :  " + return_data );

                            if ( return_data == "error" )
                            {
                                dhtmlx.message( {
                                    title: "Error Occured",
                                    type: "error",
                                    text: "An Error occured during Model File generation",
                                    expires: 5000
                                } );
                            }
                            else
                            {
                                FileMod = return_data;
                                PathMod = "http://" + location.hostname + "/" + return_data;
                                ctlModel.setItemValue( "modPath", PathMod );
                                //                                alert( "PathMod: " + PathMod );
                                jQuery.get( PathMod,
                                    function ( data, status, xhr )
                                    {
                                        //                                    alert( "data: " + data + "\nstatus: " + status + "\nxhr: " + xhr );
                                        // write scripts to SQD text area
                                        ctlModel.setItemValue( "modText", data );
                                        // activate Parse and download buttons here
                                        ctlModel.enableItem( "btnDownloadmod" );
                                    },
                                    "text" );
                            }
                        },
                        error: function ()
                        {
                            //function to be called if the request fail
                            main_layout.progressOff();
                            dhtmlx.message( {
                                title: "Error Occured",
                                type: "error",
                                text: "An Error occured before Model File generation",
                                expires: 5000
                            } );
                        }
                    } );          // end ajax
                }
                else
                {
                    alert( "That type of model not allowed from non-relational source" );
                }
                propLayout.progressOff();
            };
        } );

        ctlModel.attachEvent( "onButtonClick", function ( name )
        {
            // button to download sqd file
            if ( name == "btnDownloadmod" )
            {
                try
                {
                    dhtmlx.message( {
                        text: "Model download will begin shortly",
                        expire: 5000
                    } );
                    propLayout.progressOff();
                    // alert( "FileMod: " + FileMod );
                    iframe = document.getElementById( "download-container" );
                    if ( iframe === null )
                    {
                        iframe = document.createElement( 'iframe' );
                        iframe.id = "download-container";
                        iframe.style.visibility = 'hidden';
                        document.body.appendChild( iframe );
                    }
                    iframe.src = '../Studio/php/fileDwnld.php?filePath=' + FileMod;
                }
                catch ( err )
                {
                    logError( err.message, err.name, "model.js", "ctlModel.attachEvent( 'onButtonClick', function ( name )" );
                };
            };
        } );

        // logic of output models
        function bldModel()
        {
            try
            {
                var retMod = "";
                switch ( typeMod )
                {
                    case 'DTD':
                        retMod = objModelDTD();
                        break;
                    case 'DB2':
                        retMod = objModelDB2DDL();
                        break;
                    case 'mssql':
                        retMod = objModelSQLDDL();
                        break;
                    case 'ora':
                        retMod = objModelORADDL();
                        break;
                    case 'UDB':
                        retMod = objModelSQDDDL();
                        break;
                    case 'C':
                        retMod = objModelC();
                        break;
                    case 'OraLoad':
                        if ( srcType == "objDDLDesc" )
                        {
                            retMod = objModelLOD();
                        }
                        else
                        {
                            retMod = "false";
                        };
                        break;
                    case 'OraTrig':
                        if ( srcType == "objDDLDesc" )
                        {
                            retMod = objModelSQL();
                        }
                        else
                        {
                            retMod = "false";
                        };
                        break;
                    case 'mssqlTrig':
                        if ( srcType == "objDDLDesc" )
                        {
                            retMod = objModelMSSQL();
                        }
                        else
                        {
                            retMod = "false";
                        };
                        break;
                    case 'mqTrig':
                        if ( srcType == "objDDLDesc" )
                        {
                            retMod = objModelDB2Trig();
                        }
                        else
                        {
                            retMod = "false";
                        };
                        break;
                };
                return retMod;
            }
            catch ( err )
            {
                logError( err.message, err.name, "model.js", "function bldModel()" );
            };
        };

        // ****************************************************************************************************
        // XML model
        function objModelDTD()
        {
            try
            {
                var fldLen; // As String
                var FORcreate; // As String = String.Format("{0}{1}", "<!ELEMENT ", TableName)
                var FORfld; // As String
                var NameFld; // As String
                var fldattr; // As String
                var first = true;

                newMod = "<!ELEMENT " + ctlProp.getItemValue("descName") + "\n(\n";

                var chkarray = [];
                var chkd = ctlPropFieldTree.getAllChecked();
                chkarray = chkd.split( "," );
//                    alert("chkarray: " + chkarray);

                for ( i = 0; i < chkarray.length; i++ )
                {
                    // skip groupitems
                    fldId = chkarray[i];
                    NameFld = getFldName( fldId )
//                        alert( "fldId: " + fldId );
                    if ( ctlPropFieldTree.getUserData( fldId, "DataType" ) != "GROUPITEM" )
                    {
                        if (first == true)
                        {
                            NameFld = " " + NameFld;
                            first = false;
                        }
                        else
                        {
                            NameFld = "," + NameFld;
                        };
                        newMod = newMod + "       " + NameFld  + "\n";
                    };
                };
                newMod = newMod + ")>\n\n";

                for ( i = 0; i < chkarray.length; i++ )
                {
                    // skip groupitems
                    fldId = chkarray[i];
                    NameFld = getFldName( fldId )
//                        alert( "fldId: " + fldId );
                    if ( ctlPropFieldTree.getUserData( fldId, "DataType" ) != "GROUPITEM" )
                    {
                        newMod = newMod + "<!ELEMENT " + NameFld  + "     (#PCDATA)>\n";
                    };
                };

                return newMod;
            }
            catch ( err )
            {
                logError( err.message, err.name, "model.js", "function objModelDTD()" );
            }
        }

        // ****************************************************************************************************
        // DB2 model
        function objModelDB2DDL()
        {
            try
            {
                var fldLen; // As Integer
                var fldScl; // As Integer
                var FORcreate; //As String = String.Format("{0}{1}{2}", "CREATE ", "TABLE ", RDash(TableName))
                var FORKey; // As String
                var NameFld; // As String
                var fldId;
                var fldattr; // As String
                var OutAttr; // As String
                var first = true; // As Boolean

                newMod = "CREATE TABLE " + RDash( ctlProp.getItemValue( "descName" ) ) + "\n(\n";

                var chkarray = [];
                var chkd = ctlPropFieldTree.getAllChecked();
                chkarray = chkd.split( "," );
//                    alert("chkarray: " + chkarray);

                for ( i = 0; i < chkarray.length; i++ )
                {
                    // skip groupitems
                    fldId = chkarray[i];
                    NameFld = getFldName( fldId );
//                        alert( "fldId: " + fldId );
                    if ( ctlPropFieldTree.getUserData( fldId, "DataType" ) != "GROUPITEM" )
                    {
                        if (first == true)
                        {
                            NameFld = " " + RDash( NameFld );
                            first = false;
                        }
                        else
                        {
                            NameFld = "," + RDash( NameFld );
                        };
                        fldLen = ctlPropFieldTree.getUserData( fldId, "IntFieldLen" );
                        fldScl = ctlPropFieldTree.getUserData( fldId, "Scale" );
                        fldattr = ctlPropFieldTree.getUserData( fldId, "DataType" );
                        OutAttr = GetOutFldTypeStr( fldattr, "DB2DDL", fldLen, fldScl );

                        if ( ctlPropFieldTree.getUserData( fldId, "IsKey" ) == "yes" || ctlPropFieldTree.getUserData( fldId, "NullAllowed" ) == "no" )
                        {
                            newMod = newMod + "       " + NameFld + "     " + OutAttr + "   NOT NULL\n";
                        }
                        else
                        {
                            newMod = newMod + "       " + NameFld + "     " + OutAttr + "\n";
                        };
                    };
                }
                newMod = newMod + ");"

                return newMod;
            }
            catch ( err )
            {
                logError( err.message, err.name, "model.js", "function objModelDB2DDL()" );
            }
        };

        // ****************************************************************************************************
        // SQL Server Model
        function objModelSQLDDL()
        {
            try
            {
                var fldLen; // As Integer
                var fldScl; // As Integer
                var FORcreate; // As String
                var FORKey; // As String
                var NameFld; // As String
                var fldattr; // As String
                var OutAttr; // As String
                var first = true;

                newMod = "CREATE TABLE " + RDash( ctlProp.getItemValue( "descName" ) ) + "\n(\n";

                var chkarray = [];
                var chkd = ctlPropFieldTree.getAllChecked();
                chkarray = chkd.split( "," );
                //                    alert("chkarray: " + chkarray);

                for ( i = 0; i < chkarray.length; i++ )
                {
                    // skip groupitems
                    fldId = chkarray[i];
                    NameFld = getFldName( fldId );
                    //                        alert( "fldId: " + fldId );
                    if ( ctlPropFieldTree.getUserData( fldId, "DataType" ) != "GROUPITEM" )
                    {
                        if ( first == true )
                        {
                            NameFld = " " + RDash( NameFld );
                            first = false;
                        }
                        else
                        {
                            NameFld = "," + RDash( NameFld );
                        };
                        fldLen = ctlPropFieldTree.getUserData( fldId, "IntFieldLen" );
                        fldScl = ctlPropFieldTree.getUserData( fldId, "Scale" );
                        fldattr = ctlPropFieldTree.getUserData( fldId, "DataType" );
                        OutAttr = GetOutFldTypeStr( fldattr, "SQLDDL", fldLen, fldScl );

                        if ( ctlPropFieldTree.getUserData( fldId, "IsKey" ) == "yes" || ctlPropFieldTree.getUserData( fldId, "NullAllowed" ) == "no" )
                        {
                            newMod = newMod + "       " + NameFld + "     " + OutAttr + "   NOT NULL\n";
                        }
                        else
                        {
                            newMod = newMod + "       " + NameFld + "     " + OutAttr + "\n";
                        };
                    };
                }
                newMod = newMod + ");"

                return newMod;
            }
            catch ( err )
            {
                logError( err.message, err.name, "model.js", "function objModelSQLDDL()" );
            }
        }

        // ****************************************************************************************************
        // Oracle Model
        function objModelORADDL()
        {
            try
            {
                var fldLen; // As Integer
                var fldScl; // As Integer
                var FORcreate; // As String
                var FORKey; // As String
                var NameFld; // As String
                var fldattr; // As String
                var OutAttr; // As String
                var first = true;

                newMod = "CREATE TABLE " + RDash( ctlProp.getItemValue( "descName" ) ) + "\n(\n";

                var chkarray = [];
                var chkd = ctlPropFieldTree.getAllChecked();
                chkarray = chkd.split( "," );
                //                    alert("chkarray: " + chkarray);

                for ( i = 0; i < chkarray.length; i++ )
                {
                    // skip groupitems
                    fldId = chkarray[i];
                    NameFld = getFldName( fldId );
                    //                        alert( "fldId: " + fldId );
                    if ( ctlPropFieldTree.getUserData( fldId, "DataType" ) != "GROUPITEM" )
                    {
                        if ( first == true )
                        {
                            NameFld = " " + RDash( NameFld );
                            first = false;
                        }
                        else
                        {
                            NameFld = "," + RDash( NameFld );
                        };
                        fldLen = ctlPropFieldTree.getUserData( fldId, "IntFieldLen" );
                        fldScl = ctlPropFieldTree.getUserData( fldId, "Scale" );
                        fldattr = ctlPropFieldTree.getUserData( fldId, "DataType" );
                        OutAttr = GetOutFldTypeStr( fldattr, "ORADDL", fldLen, fldScl );

                        if ( ctlPropFieldTree.getUserData( fldId, "IsKey" ) == "yes" || ctlPropFieldTree.getUserData( fldId, "NullAllowed" ) == "no" )
                        {
                            newMod = newMod + "       " + NameFld + "     " + OutAttr + "   NOT NULL\n";
                        }
                        else
                        {
                            newMod = newMod + "       " + NameFld + "     " + OutAttr + "\n";
                        };
                    };
                }
                newMod = newMod + ");"

                return newMod;
            }
            catch ( err )
            {
                logError( err.message, err.name, "model.js", "function objModelORADDL()" );
            }
        }

        // ****************************************************************************************************
        // UBD DDL Model
        function objModelSQDDDL()
        {
            try
            {
                var fldLen; // As Integer
                var fldScl; // As Integer
                var FORcreate; // As String
                var FORKey; // As String
                var NameFld; // As String
                var fldattr; // As String
                var OutAttr; // As String
                var first = true;

                newMod = "CREATE TABLE " + RDash( ctlProp.getItemValue( "descName" ) ) + "\n(\n";

                var chkarray = [];
                var chkd = ctlPropFieldTree.getAllChecked();
                chkarray = chkd.split( "," );
                //                    alert("chkarray: " + chkarray);

                for ( i = 0; i < chkarray.length; i++ )
                {
                    // skip groupitems
                    fldId = chkarray[i];
                    NameFld = getFldName( fldId );
                    //                        alert( "fldId: " + fldId );
                    if ( ctlPropFieldTree.getUserData( fldId, "DataType" ) != "GROUPITEM" )
                    {
                        if ( first == true )
                        {
                            NameFld = " " + RDash( NameFld );
                            first = false;
                        }
                        else
                        {
                            NameFld = "," + RDash( NameFld );
                        };
                        fldLen = ctlPropFieldTree.getUserData( fldId, "IntFieldLen" );
                        fldScl = ctlPropFieldTree.getUserData( fldId, "Scale" );
                        fldattr = ctlPropFieldTree.getUserData( fldId, "DataType" );
                        OutAttr = GetOutFldTypeStr( fldattr, "SQDDDL", fldLen, fldScl );

                        if ( ctlPropFieldTree.getUserData( fldId, "IsKey" ) == "yes" || ctlPropFieldTree.getUserData( fldId, "NullAllowed" ) == "no" )
                        {
                            newMod = newMod + "       " + NameFld + "     " + OutAttr + "   NOT NULL\n";
                        }
                        else
                        {
                            newMod = newMod + "       " + NameFld + "     " + OutAttr + "\n";
                        };
                    };
                }
                newMod = newMod + ");"

                return newMod;
            }
            catch ( err )
            {
                logError( err.message, err.name, "model.js", "function objModelSQDDDL()" );
            }
        }

        // ****************************************************************************************************
        // C Header Model
        function objModelC()
        {
            try
            {
                var fldLen; // As Integer
                var fldScl; // As Integer
                var FORcreate; // As String
                var FORKey; // As String
                var NameFld; // As String
                var fldattr; // As String
                var OutAttr; // As String
                var OutLen;
                var first = true;

                newMod = "struct " +  ctlProp.getItemValue( "descName" ) + "\n{\n";

                var chkarray = [];
                var chkd = ctlPropFieldTree.getAllChecked();
                chkarray = chkd.split( "," );
                //                    alert("chkarray: " + chkarray);

                for ( i = 0; i < chkarray.length; i++ )
                {
                    // skip groupitems
                    fldId = chkarray[i];
                    NameFld = getFldName( fldId );
                    //                        alert( "fldId: " + fldId );
                    if ( ctlPropFieldTree.getUserData( fldId, "DataType" ) != "GROUPITEM" )
                    {
                        fldLen = ctlPropFieldTree.getUserData( fldId, "IntFieldLen" );
                        if (fldLen < 1)
                        {
                            OutLen = "";
                        }
                        else
                        {
                            OutLen = "(" + fldLen + ")";
                        };
                        fldScl = ctlPropFieldTree.getUserData( fldId, "Scale" );
                        fldattr = ctlPropFieldTree.getUserData( fldId, "DataType" );
                        OutAttr = GetOutFldTypeStr( fldattr, "H", fldLen, fldScl );
//                            FORfld = String.Format( "{0,4}{1,-20}{2,30}{3,6}", " ", OutAttr, NameFld, OutLen );
                        newMod = newMod + "       " + OutAttr + "     " + NameFld + "   " + OutLen + "\n";
                    };
                }
                newMod = newMod + "};"

                return newMod;
            }
            catch ( err )
            {
                logError( err.message, err.name, "model.js", "function objModelC()" );
            }
        }

        // ****************************************************************************************************
        // Oracle Load
        function objModelLOD()
        {
            try
            {
                var fldLen; // As String
                var fldScl; // As Integer
                var FORinfile; // As String = String.Format("{0}{1}{2}", "INFILE ", "'" & RDash(TableName) & ".dat' ", Chr(34) & "FIX 39" & Chr(34))
                var FORInto; // As String = String.Format("{0}{1}", "INTO TABLE ", RDash(TableName))
                var FORfld; // As String
                var NameFld; // As String
                var fldattr; // As String
                var OutAttr; // As String
                var first  = true;
                var Pos = 1;

                newMod = "LOAD DATA\n";
                newMod = newMod + "INFILE '" + RDash(ctlProp.getItemValue( "descName" )) + ".dat'  \"FIX 39\"\n";
                newMod = newMod + "INTO TABLE " + RDash(ctlProp.getItemValue( "descName" )) + "\n(\n";

                var chkarray = [];
                var chkd = ctlPropFieldTree.getAllChecked();
                chkarray = chkd.split( "," );
                //                    alert("chkarray: " + chkarray);

                for ( i = 0; i < chkarray.length; i++ )
                {
                    // skip groupitems
                    fldId = chkarray[i];
                    NameFld = getFldName( fldId );
                    //                        alert( "fldId: " + fldId );
                    if ( ctlPropFieldTree.getUserData( fldId, "DataType" ) != "GROUPITEM" )
                    {
                        if ( first == true )
                        {
                            NameFld = " " + RDash( NameFld );
                            first = false;
                        }
                        else
                        {
                            NameFld = "," + RDash( NameFld );
                        };
                        fldLen = "(" + Pos + ":" + ctlPropFieldTree.getUserData( fldId, "IntFieldLen" ) + ")";
                        fldScl = ctlPropFieldTree.getUserData( fldId, "Scale" );
                        fldattr = ctlPropFieldTree.getUserData( fldId, "DataType" );
                        OutAttr = GetOutFldTypeStr( fldattr, "ORADDL", 0, fldScl );
                
                        newMod = newMod + "       " + NameFld + "         POSITION" + fldLen + "   " + OutAttr + "\n";

                        Pos = Number(Pos) + Number(ctlPropFieldTree.getUserData( fldId, "IntFieldLen" ));
                    };
                }
                newMod = newMod + ");"

                return newMod;
            }
            catch ( err )
            {
                logError( err.message, err.name, "model.js", "function objModelLOD()" );
            }
        }

        // ****************************************************************************************************
        // Oracle Trigger
        function objModelSQL()
        {
            try
            {
                var FORCreateReplace; // As String = String.Format("{0}{1}", "CREATE OR REPLACE TRIGGER sqdaudit_", RDash(TableName))
                var FORAfter; // As String = String.Format("{0}{1}", "AFTER INSERT OR DELETE OR UPDATE ON ", RDash(TableName))
                var NameFld; // As String
                var first = true;
                var ArrayNoGroupItemCnt = 0;

                /// Get array count without Groupitems
                var chkarray = [];
                var chkd = ctlPropFieldTree.getAllChecked();
                chkarray = chkd.split( "," );
                //                    alert("chkarray: " + chkarray);
                for ( i = 0; i < chkarray.length; i++ )
                {
                    // skip groupitems
                    fldId = chkarray[i];
                    NameFld = getFldName( fldId );
                    //                        alert( "fldId: " + fldId );
                    if ( ctlPropFieldTree.getUserData( fldId, "DataType" ) != "GROUPITEM" )
                    {
                        ArrayNoGroupItemCnt++;
                    };
                };

                var newMod = "CREATE OR REPLACE TRIGGER sqdaudit_" + RDash( ctlProp.getItemValue( "descName" ) ) + "\n";
                newMod = newMod + "AFTER INSERT OR DELETE OR UPDATE ON " + RDash( ctlProp.getItemValue( "descName" ) ) + "\n";
                newMod = newMod + "FOR EACH ROW" + "\n";
                newMod = newMod + "DECLARE" + "\n";
                newMod = newMod + "    op CHAR(1);" + "\n";
                newMod = newMod + "BEGIN()" + "\n";
                newMod = newMod + "if updating then op := 'R'; END IF;" + "\n";
                newMod = newMod + "if inserting then op := 'I'; END IF;" + "\n";
                newMod = newMod + "if deleting then op := 'D'; END IF;" + "\n";
                newMod = newMod + "INSERT INTO SQDENGCD (" + "\n";
                newMod = newMod + "       EYECATCHER()" + "\n";
                newMod = newMod + "      ,CHANGEOP" + "\n";
                newMod = newMod + "      ,UPDATE_TSTMP" + "\n";
                newMod = newMod + "      ,UPDATE_RBA" + "\n";
                newMod = newMod + "      ,USER_UPDATED" + "\n";
                newMod = newMod + "      ,TABLE_ALIAS" + "\n";
                newMod = newMod + "      ,TABLE_UPDATED" + "\n";
                newMod = newMod + "      ,NUM_COLS" + "\n";
                newMod = newMod + "      ,CDC_AFTER_DATA" + "\n";
                newMod = newMod + "      ,CDC_BEFORE_DATA" + "\n";
                newMod = newMod + ") VALUES (" + "\n";
                newMod = newMod + "      'SQOR'" + "\n";
                newMod = newMod + "      ,op" + "\n";
                newMod = newMod + "      ,sysdate" + "\n";
                newMod = newMod + "      ,DBMS_TRANSACTION.LOCAL_TRANSACTION_ID" + "\n";
                newMod = newMod + "      ,user" + "\n";
                newMod = newMod + "      ,'" + RDash(ctlProp.getItemValue( "descName" )) + "'" + "\n";
                newMod = newMod + "      ,'" + RDash(ctlProp.getItemValue( "descName" )) + "'" + "\n";
                newMod = newMod + "      ," + ArrayNoGroupItemCnt + "\n";

                for ( i = 0; i < chkarray.length; i++ )
                {
                    // skip groupitems
                    fldId = chkarray[i];
                    NameFld = getFldName( fldId );
                    //                        alert( "fldId: " + fldId );
                    if ( ctlPropFieldTree.getUserData( fldId, "DataType" ) != "GROUPITEM" )
                    {
                        if (first == true)
                        {
                            NameFld = "      ,:NEW." + RDash( NameFld );
                            first = false;
                        }
                        else
                        {
                            NameFld = "||','||:NEW." + RDash( NameFld );
                        }
                    }
                    newMod = newMod + NameFld + "\n";
                };
                first = true;
                for ( i = 0; i < chkarray.length; i++ )
                {
                    // skip groupitems
                    fldId = chkarray[i];
                    NameFld = getFldName( fldId );
                    //                        alert( "fldId: " + fldId );
                    if ( ctlPropFieldTree.getUserData( fldId, "DataType" ) != "GROUPITEM" )
                    {
                        if (first == true)
                        {
                            NameFld = "      ,:OLD." + RDash( NameFld );
                            first = false;
                        }
                        else
                        {
                            NameFld = "||','||:OLD." + RDash( NameFld );
                        }
                    }
                    newMod = newMod + NameFld + "\n";
                };
                newMod = newMod + ");"+ "\n";
                newMod = newMod + "END sqdaudit_" + RDash( ctlProp.getItemValue( "descName" ) ) + ";\n"
                newMod = newMod + "/" + "\n";
                newMod = newMod + "COMMIT;" + "\n";

                return newMod;
            }
            catch ( err )
            {
                logError( err.message, err.name, "model.js", "function objModelSQL()" );
            }
        }

        // ****************************************************************************************************
        // MS SQL Trigger
        function objModelMSSQL()
        {
            try
            {
                var FORCreateTrig; // As String = String.Format("{0}{1}", "CREATE TRIGGER sqdaudit_I_", RDash(TableName))
                var FORAfter; // As String = String.Format("{0}{1}", "ON ", RDash(TableName))
                var NameFld;
                var firstFld = "";
                var first = true;
                var ArrayNoGroupItemCnt = 0;

                /// Get array count without Groupitems
                var chkarray = [];
                var chkd = ctlPropFieldTree.getAllChecked();
                chkarray = chkd.split( "," );
                //                    alert("chkarray: " + chkarray);
                for ( i = 0; i < chkarray.length; i++ )
                {
                    // skip groupitems
                    fldId = chkarray[i];
                    NameFld = getFldName( fldId );
                    //                        alert( "fldId: " + fldId );
                    if ( ctlPropFieldTree.getUserData( fldId, "DataType" ) != "GROUPITEM" )
                    {
                        ArrayNoGroupItemCnt++;
                    };
                };

                var newMod = "CREATE TRIGGER sqdaudit_I_" + RDash( ctlProp.getItemValue( "descName" ) ) + "\n";
                newMod = newMod + "ON " + RDash( ctlProp.getItemValue( "descName" ) ) + "\n";

                newMod = newMod + "AFTER UPDATE" + "\n";
                newMod = newMod + "AS" + "\n";
                newMod = newMod + "BEGIN" + "\n";
                newMod = newMod + "INSERT SQDENGCD" + "\n";
                newMod = newMod + "SELECT" + "\n";
                newMod = newMod + " 'SQMS'    AS EYECATCHER" + "\n";
                newMod = newMod + ",'I'       AS CHANGEOP" + "\n";
                newMod = newMod + ",GETDATE() AS UPDATE_TSTMP" + "\n";
                newMod = newMod + ",user      AS USER_UPDATED" + "\n";
                newMod = newMod + ",'" + RDash( ctlProp.getItemValue( "descName" )) + "' AS TABLE_UPDATED" + "\n";
                newMod = newMod + ",'" + RDash( ctlProp.getItemValue( "descName" )) + "' AS TABLE_ALIAS" + "\n";
                newMod = newMod + "," + ArrayNoGroupItemCnt + "\n";

                for ( i = 0; i < chkarray.length; i++ )
                {
                    // skip groupitems
                    fldId = chkarray[i];
                    NameFld = getFldName( fldId );
                    //                        alert( "fldId: " + fldId );
                    if ( ctlPropFieldTree.getUserData( fldId, "DataType" ) != "GROUPITEM" )
                    {
                        if ( first == true )
                        {
                            firstFld = RDash( NameFld );
                            NameFld = "    ,inserted." + RDash( NameFld );
                            first = false;
                        }
                        else
                        {
                            NameFld = "+','+inserted." + RDash( NameFld );
                        };
                        newMod = newMod + NameFld + "\n";
                    };
                };
                first = true;

                newMod = newMod + " AS CDC_AFTER_DATA" + "\n";
                newMod = newMod + ",'' AS CDC_BEFORE_DATA" + "\n";
                //'objWriteOut.WriteLine(");")
                newMod = newMod + "FROM inserted" + "\n";
                //'objWriteOut.WriteLine(";")
                newMod = newMod + "END" + "\n";
                newMod = newMod + "go" + "\n";
                newMod = newMod + "--------------------" + "\n";
                newMod = newMod + "CREATE TRIGGER sqdaudit_R_" + RDash( ctlProp.getItemValue( "descName" )) + "\n";
                newMod = newMod + "ON " + RDash( ctlProp.getItemValue( "descName" )) + "\n";
                newMod = newMod + "AFTER UPDATE" + "\n";
                newMod = newMod + "AS" + "\n";
                newMod = newMod + "BEGIN" + "\n";
                newMod = newMod + "INSERT SQDENGCD" + "\n";
                newMod = newMod + "SELECT" + "\n";
                newMod = newMod + " 'SQMS'    AS EYECATCHER" + "\n";
                newMod = newMod + ",'R'       AS CHANGEOP" + "\n";
                newMod = newMod + ",GETDATE() AS UPDATE_TSTMP" + "\n";
                newMod = newMod + ",user      AS USER_UPDATED" + "\n";
                newMod = newMod + ",'" + RDash( ctlProp.getItemValue( "descName" )) + "' AS TABLE_UPDATED" + "\n";
                newMod = newMod + ",'" + RDash( ctlProp.getItemValue( "descName" )) + "' AS TABLE_ALIAS" + "\n";
                newMod = newMod + "," + ArrayNoGroupItemCnt + "\n";

                for ( i = 0; i < chkarray.length; i++ )
                {
                    // skip groupitems
                    fldId = chkarray[i];
                    NameFld = getFldName( fldId );
                    //                        alert( "fldId: " + fldId );
                    if ( ctlPropFieldTree.getUserData( fldId, "DataType" ) != "GROUPITEM" )
                    {
                        if ( first == true )
                        {
                            NameFld = "    ,inserted." + RDash( NameFld );
                            first = false;
                        }
                        else
                        {
                            NameFld = "+','+inserted." + RDash( NameFld );
                        };
                        newMod = newMod + NameFld + "\n";
                    };
                };
                first = true;

                newMod = newMod + " AS CDC_AFTER_DATA" + "\n";

                for ( i = 0; i < chkarray.length; i++ )
                {
                // skip groupitems
                    fldId = chkarray[i];
                    NameFld = getFldName( fldId );
                    //                        alert( "fldId: " + fldId );
                    if ( ctlPropFieldTree.getUserData( fldId, "DataType" ) != "GROUPITEM" )
                    {
                        if ( first == true )
                        {
                            NameFld = "    ,deleted." + RDash( NameFld );
                            first = false;
                        }
                        else
                        {
                            NameFld = "+','+deleted." + RDash( NameFld );
                        };
                        newMod = newMod + NameFld + "\n";
                    };
                };
                first = true;
            
                newMod = newMod + " AS CDC_BEFORE_DATA" + "\n";
                //'wBracket(OpenClose.CLOSE, False)
                //'wSemiLine()
                newMod = newMod + "FROM inserted" + "\n";
                newMod = newMod + "INNER JOIN deleted on deleted." + firstFld + "= inserted." + firstFld + "\n";
                newMod = newMod +  ";\n";
                newMod = newMod + "END" + "\n";
                newMod = newMod + "go" + "\n";
                newMod = newMod + "--------------------" + "\n";
                newMod = newMod + "CREATE TRIGGER sqdaudit_D_" + RDash( ctlProp.getItemValue( "descName" )) + "\n";
                newMod = newMod + "ON " + RDash( ctlProp.getItemValue( "descName" )) + "\n";
                newMod = newMod + "AFTER UPDATE" + "\n";
                newMod = newMod + "AS" + "\n";
                newMod = newMod + "BEGIN" + "\n";
                newMod = newMod + "INSERT SQDENGCD" + "\n";
                newMod = newMod + "SELECT" + "\n";
                newMod = newMod + " 'SQMS'    AS EYECATCHER" + "\n";
                newMod = newMod + ",'D'       AS CHANGEOP" + "\n";
                newMod = newMod + ",GETDATE() AS UPDATE_TSTMP" + "\n";
                newMod = newMod + ",user      AS USER_UPDATED" + "\n";
                newMod = newMod + ",'" + RDash( ctlProp.getItemValue( "descName" )) + "' AS TABLE_UPDATED" + "\n";
                newMod = newMod + ",'" + RDash( ctlProp.getItemValue( "descName" )) + "' AS TABLE_ALIAS" + "\n";
                newMod = newMod + "," + ArrayNoGroupItemCnt + "\n";
                newMod = newMod + ",'' AS CDC_AFTER_DATA" + "\n";

                for ( i = 0; i < chkarray.length; i++ )
                {
                // skip groupitems
                    fldId = chkarray[i];
                    NameFld = getFldName( fldId );
                    //                        alert( "fldId: " + fldId );
                    if ( ctlPropFieldTree.getUserData( fldId, "DataType" ) != "GROUPITEM" )
                    {
                        if ( first == true )
                        {
                            NameFld = "    ,deleted." + RDash( NameFld );
                            first = false;
                        }
                        else
                        {
                            NameFld = "+','+deleted." + RDash( NameFld );
                        };
                        newMod = newMod + NameFld + "\n";
                    };
                };
                first = true;
            
                newMod = newMod + " AS CDC_BEFORE_DATA" + "\n";
                //'wBracket(OpenClose.CLOSE, False)
                //'wSemiLine()
                newMod = newMod + "FROM deleted" + "\n";
                newMod = newMod + ";\n";
                newMod = newMod + "END" + "\n";
                newMod = newMod + "go" + "\n";
                newMod = newMod + "--------------------" + "\n";

                return newMod;
            }
            catch ( err )
            {
                logError( err.message, err.name, "model.js", "function objModelMSSQL()" );
            }
        }

        // ****************************************************************************************************
        // DB2 Trigger
        function objModelDB2Trig()
        {
            try
            {
                var NameFld;
                var SchemaName = "xxxxxxxx."
                var newMod = "**** NOTE: Before Use, replace 'xxxxxxxx' with" + "\n";
                newMod = newMod + "****       Schema Name or Qualifier" + "\n\n";
                var FORDropTrigIns; // As String = String.Format("{0}{1}", "    DROP TRIGGER " & SchemaName, RDash(TableName) & "_PAD_INS;")
                var FORCreateTrigIns; // As String = String.Format("{0}{1}", "    CREATE TRIGGER " & SchemaName, RDash(TableName) & "_PAD_INS")
                var FORDropTrigUPD; // As String = String.Format("{0}{1}", "    DROP TRIGGER " & SchemaName, RDash(TableName) & "_PAD_UPD;")
                var FORCreateTrigUPD; // As String = String.Format("{0}{1}", "    CREATE TRIGGER " & SchemaName, RDash(TableName) & "_PAD_UPD")
                var FORDropTrigDEL; // As String = String.Format("{0}{1}", "    DROP TRIGGER " & SchemaName, RDash(TableName) & "_PAD_DEL;")
                var FORCreateTrigDEL; // As String = String.Format("{0}{1}", "    CREATE TRIGGER " & SchemaName, RDash(TableName) & "_PAD_DEL")
                var FORAfterINS; // As String = String.Format("{0}{1}", "        AFTER INSERT ON " & SchemaName, RDash(TableName) & "_PAD_TBL")
                var FORAfterUPD; // As String = String.Format("{0}{1}", "        AFTER UPDATE ON " & SchemaName, RDash(TableName) & "_PAD_TBL")
                var FORAfterDEL; // As String = String.Format("{0}{1}", "        AFTER DELETE ON " & SchemaName, RDash(TableName) & "_PAD_TBL")
                var FORRefNEW; // As String = String.Format("{0}", "        REFERENCING NEW AS N")
                var FORRefOLD; // As String = String.Format("{0}", "        REFERENCING OLD AS D")
                var FORForEach; // As String = String.Format("{0}", "        FOR EACH ROW MODE DB2SQL")
                var FORValues; // As String = String.Format("{0}", "        VALUES DB2MQ.MQSEND")
                var FORBody1; // As String = String.Format("{0}", "            CHAR(CURRENT TIMESTAMP)")
                var FORBodyComma; // As String = String.Format("{0}", "          ||','")
                var FORBody2; // As String = String.Format("{0}", "          ||SUBSTR(USER,1,8)")
                var FORBody3; // As String = String.Format("{0}", "          ||'" & RDash(TableName) & "DB'")
                var FORBody4; // As String = String.Format("{0}", "          ||'" & RDash(TableName) & "_PAD_TBL'")
                var FORBodyA; // As String = String.Format("{0}", "          ||'A'")
                var FORBodyB; // As String = String.Format("{0}", "          ||'B'")
                var FORBodyI; // As String = String.Format("{0}", "          ||'I'")
                var FORBodyU; // As String = String.Format("{0}", "          ||'U'")
                var FORBodyD; // As String = String.Format("{0}", "          ||'D'")
                var FORBodyOpen; // As String = String.Format("{0}", "      (")
                var FORBodyClose; // As String = String.Format("{0}", "      );")

                // Insert
                newMod = newMod + "    DROP TRIGGER " + SchemaName + RDash( ctlProp.getItemValue( "descName" )) + "_PAD_INS;" + "\n";
                newMod = newMod + "    CREATE TRIGGER " + SchemaName + RDash( ctlProp.getItemValue( "descName" )) + "_PAD_INS" + "\n";
                newMod = newMod + "        AFTER INSERT ON " + SchemaName + RDash( ctlProp.getItemValue( "descName" )) + "_PAD_TBL" + "\n";
                newMod = newMod + "        REFERENCING NEW AS N" + "\n";
                newMod = newMod + "        FOR EACH ROW MODE DB2SQL" + "\n";
                newMod = newMod + "        VALUES DB2MQ.MQSEND" + "\n";
                newMod = newMod + "      (" + "\n";
                newMod = newMod + "            CHAR(CURRENT TIMESTAMP)" + "\n";
                newMod = newMod + "          ||','" + "\n";
                newMod = newMod + "          ||SUBSTR(USER,1,8)" + "\n";
                newMod = newMod + "          ||','" + "\n";
                newMod = newMod + "          ||'" + RDash( ctlProp.getItemValue( "descName" )) + "DB'" + "\n";
                newMod = newMod + "          ||','" + "\n";
                newMod = newMod + "          ||'" + RDash( ctlProp.getItemValue( "descName" )) + "_PAD_TBL'" + "\n";
                newMod = newMod + "          ||','" + "\n";
                newMod = newMod + "          ||'A'" + "\n";
                newMod = newMod + "          ||','" + "\n";
                newMod = newMod + "          ||'I'" + "\n";

                var chkarray = [];
                var chkd = ctlPropFieldTree.getAllChecked();
                chkarray = chkd.split( "," );
                //                    alert("chkarray: " + chkarray);

                for ( i = 0; i < chkarray.length; i++ )
                {
                    // skip groupitems
                    fldId = chkarray[i];
                    NameFld = getFldName( fldId );
                    //                        alert( "fldId: " + fldId );
                    if ( ctlPropFieldTree.getUserData( fldId, "DataType" ) != "GROUPITEM" )
                    {
                        newMod = newMod + "          ||','" + "\n";
                        newMod = newMod + "          ||'N." + NameFld + "'" + "\n";
                    }
                };
                newMod = newMod + "      );" + "\n\n";

                // Update
                newMod = newMod + "    DROP TRIGGER " + SchemaName + RDash( ctlProp.getItemValue( "descName" )) + "_PAD_UPD;" + "\n";
                newMod = newMod + "    CREATE TRIGGER " + SchemaName + RDash( ctlProp.getItemValue( "descName" )) + "_PAD_UPD;" + "\n";
                newMod = newMod + "        AFTER UPDATE ON " + SchemaName + RDash( ctlProp.getItemValue( "descName" )) +"_PAD_TBL" + "\n";
                newMod = newMod + "        REFERENCING NEW AS N" + "\n";
                newMod = newMod + "        FOR EACH ROW MODE DB2SQL" + "\n";
                newMod = newMod + "        VALUES DB2MQ.MQSEND" + "\n";
                newMod = newMod + "      (" + "\n";
                newMod = newMod + "            CHAR(CURRENT TIMESTAMP)" + "\n";
                newMod = newMod + "          ||','" + "\n";
                newMod = newMod + "          ||SUBSTR(USER,1,8)" + "\n";
                newMod = newMod + "          ||','" + "\n";
                newMod = newMod + "          ||'" + RDash( ctlProp.getItemValue( "descName" )) + "DB'" + "\n";
                newMod = newMod + "          ||','" + "\n";
                newMod = newMod + "          ||'" + RDash( ctlProp.getItemValue( "descName" )) + "_PAD_TBL'" + "\n";
                newMod = newMod + "          ||','" + "\n";
                newMod = newMod + "          ||'A'" + "\n";
                newMod = newMod + "          ||','" + "\n";
                newMod = newMod + "          ||'U'" + "\n";

                for ( i = 0; i < chkarray.length; i++ )
                {
                    // skip groupitems
                    fldId = chkarray[i];
                    NameFld = getFldName( fldId );
                    //                        alert( "fldId: " + fldId );
                    if ( ctlPropFieldTree.getUserData( fldId, "DataType" ) != "GROUPITEM" )
                    {
                        newMod = newMod + "          ||','" + "\n";
                        newMod = newMod + "          ||'N." + NameFld + "'" + "\n";
                    }
                };
                newMod = newMod + "      );" + "\n\n";

                //Delete
                newMod = newMod + "    DROP TRIGGER " + SchemaName + RDash( ctlProp.getItemValue( "descName" ) ) + "_PAD_DEL;" + "\n";
                newMod = newMod + "    CREATE TRIGGER " + SchemaName + RDash( ctlProp.getItemValue( "descName" ) ) + "_PAD_DEL" + "\n";
                newMod = newMod + "        AFTER DELETE ON " + SchemaName + RDash( ctlProp.getItemValue( "descName" ) ) + "_PAD_TBL" + "\n";
                newMod = newMod + "        REFERENCING OLD AS D" + "\n";
                newMod = newMod + "        FOR EACH ROW MODE DB2SQL" + "\n";
                newMod = newMod + "        VALUES DB2MQ.MQSEND" + "\n";
                newMod = newMod + "      (" + "\n";
                newMod = newMod + "            CHAR(CURRENT TIMESTAMP)" + "\n";
                newMod = newMod + "          ||','" + "\n";
                newMod = newMod + "          ||SUBSTR(USER,1,8)" + "\n";
                newMod = newMod + "          ||','" + "\n";
                newMod = newMod + "          ||'" + RDash( ctlProp.getItemValue( "descName" ) ) + "DB'" + "\n";
                newMod = newMod + "          ||','" + "\n";
                newMod = newMod + "          ||'" + RDash( ctlProp.getItemValue( "descName" ) ) + "_PAD_TBL'" + "\n";
                newMod = newMod + "          ||','" + "\n";
                newMod = newMod + "          ||'B'" + "\n";
                newMod = newMod + "          ||','" + "\n";
                newMod = newMod + "          ||'D'" + "\n";

                for ( i = 0; i < chkarray.length; i++ )
                {
                    // skip groupitems
                    fldId = chkarray[i];
                    NameFld = getFldName( fldId );
                    //                        alert( "fldId: " + fldId );
                    if ( ctlPropFieldTree.getUserData( fldId, "DataType" ) != "GROUPITEM" )
                    {
                        newMod = newMod + "          ||','" + "\n";
                        newMod = newMod + "          ||'N." + NameFld + "'" + "\n";
                    }
                };
                newMod = newMod + "      );" + "\n\n";
            
                return newMod;
            }
            catch ( err )
            {
                logError( err.message, err.name, "model.js", "function objModelDB2Trig()" );
            }
        }

        // ****************************************************************************************************
        function RDash(fldName)
        {
            var rDash = fldName.replace( "-", "_" );
            return rDash;
        }
        
        // ****************************************************************************************************
        // convert original type to new type
        function GetOutFldTypeStr( InType, OutType, fldLen, fldScale )
        {
            try
            {
                var GetOutFldType = "";
                var numerator = 0;
                var OutSuffix;
                if (fldLen > 0)
                {
                    OutSuffix = "(" + fldLen + ")";
                }
                else
                {
                    OutSuffix = "";
                };

                switch( OutType )
                {

                    case "H":
                        switch( InType.toUpperCase() )
                        {
                            case "CHAR", "VARCHAR", "VARCHAR2", "NUMERIC", "DATE", "TIMESTAMP", "TIME", "TEXTNUM", "ZONE", "XMLCDATA":
                                GetOutFldType = "char";
                                break;
                            case "BINARY":
                                GetOutFldType = "unsigned char";
                                break;
                            case "INTEGER":
                                GetOutFldType = "int";
                                break;
                            case "SMALLINT":
                                GetOutFldType = "short";
                                break;
                            case "DECIMAL":
                                GetOutFldType = "double";
                                break;
                            default:
                                GetOutFldType = "char";
                                break;
                        };
                        break;

                    case "DB2DDL":
                        //                            ' binary()    varbinary()  Image()    BLOB()      BFILE()   char   nchar()  nvarchar()   varchar()
                        //                            ' varchar()   NTEXT()      TEXT()     CLOB()    DBCLOB()   NCLOB()
                        //                            ' DateTime()  smalldatetime()    timestamp()   DATE     DATETIME2()   DateTimeOffset()  TIME()
                        //                            ' TIMESTAMP WITH TIME ZONE
                        //                            ' bigint()    bit()    decimal      Int()    money()  number(p,s)  numeric()   smallint()   smallmoney()
                        //                            ' tinyint()   FLOAT()   REAL()  DECFLOAT(16)   DECFLOAT(34)    DOUBLE
                        //                            ' uniqueID()   DISTINCT (any DB2 data type)      GRAPHIC()   LONG VARGRAPHIC   ROWID()  VARGRAPHIC(n)   Xml()

                        switch ( InType.toUpperCase() )
                        {
                            case "CHAR", "BINARY", "XMLCDATA", "NCHAR":
                                GetOutFldType = "CHAR" & OutSuffix;
                                break;
                            case "VARCHAR2":
                                GetOutFldType = "VARCHAR" & OutSuffix;
                                break;
                            case "VARCHAR", "NVARCHAR":
                                if ( fldLen > 2 )
                                {
                                    GetOutFldType = "VARCHAR(" + ( fldLen - 2 ) + ")";
                                }
                                else if ( fldLen < 0 )
                                {
                                    GetOutFldType = "VARCHAR(8000)";
                                }
                                else
                                {
                                    GetOutFldType = "VARCHAR" + OutSuffix;
                                };
                                break;
                            case "VARBINARY":
                                GetOutFldType = "VARBINARY" + OutSuffix;
                                break;
                            case "BLOB", "IMAGE", "BFILE":
                                GetOutFldType = "BLOB" + OutSuffix;
                                break;
                            case "CLOB", "TEXT", "NTEXT":
                                GetOutFldType = "CLOB" + OutSuffix;
                                break;
                            case "DBCLOB":
                                GetOutFldType = "DBCLOB" + OutSuffix;
                                break;
                            case "TIMESTAMP":
                                GetOutFldType = "TIMESTAMP";
                                break;
                            case "DATE":
                                GetOutFldType = "DATE";
                                break;
                            case "DATETIME":
                                GetOutFldType = "DATETIME   <<< DataType unknown to DB2";
                                break;
                            case "SMALLDATETIME":
                                GetOutFldType = "SMALLDATETIME   <<< DataType unknown to DB2";
                                break;
                            case "DATETIME2":
                                GetOutFldType = "DATETIME2   <<< DataType unknown to DB2";
                                break;
                            case "DATETIMEOFFSET":
                                GetOutFldType = "DATETIMEOFFSET   <<< DataType unknown to DB2";
                                break;
                            case "TIME":
                                GetOutFldType = "TIME";
                                break;
                            case "TIMESTAMP WITH TIMEZONE":
                                GetOutFldType = "TIMESTAMP WITH TIMEZONE   <<< DataType unknown to DB2";
                                break;
                            case "BIGINT":
                                GetOutFldType = "BIGINT"; // + OutLen
                                break;
                            case "INTEGER", "INT":
                                GetOutFldType = "INTEGER"; // + OutLen
                                break;
                            case "SMALLINT", "TINYINT", "BIT":
                                GetOutFldType = "SMALLINT"; //'& OutLen
                                break;
                            case "SMALLMONEY":
                                GetOutFldType = "DECIMAL(11,4)";
                                break;
                            case "MONEY":
                                GetOutFldType = "DECIMAL(20,4)";
                                break;
                            case "DECIMAL", "NUMBER":
                                if ( srcType == "objCOBDesc" || srcType == "objDBDDesc" )
                                {
                                    fldLen = ( fldLen * 2 ) - 1;
                                };
                                OutSuffix = "(" + fldLen + "," + fldScale + ")";
                                GetOutFldType = "DECIMAL" + OutSuffix;
                                break;
                            case "ZONE", "TEXTNUM":
                                numerator = fldLen - fldScale;
                                GetOutFldType = "NUMBER" + "(" + numerator + "," + fldScale + ")";
                                break;
                            case "NUMERIC":
                                GetOutFldType = "DECIMAL(38)"; //' & OutSuffix
                                break;
                            case "FLOAT":
                                GetOutFldType = "FLOAT"; //' & OutSuffix
                                break;
                            case "REAL":
                                GetOutFldType = "REAL"; //' & OutSuffix
                                break;
                            case "DECFLOAT(16)":
                                GetOutFldType = "DECFLOAT(16)";
                                break;
                            case "DECFLOAT(34)":
                                GetOutFldType = "DECFLOAT(34)";
                                break;
                            case "DOUBLE":
                                GetOutFldType = "DOUBLE";
                                break;
                            case "UNIQUEIDENTIFIER", "ROWID":
                                GetOutFldType = "ROWID";
                                break;
                            case "GRAPHIC":
                                GetOutFldType = "GRAPHIC" + OutSuffix;
                                break;
                            case "LONG VARGRAPHIC":
                                GetOutFldType = "LONG VARGRAPHIC" //'& OutSuffix
                                break;
                            case "VARGRAPHIC":
                                GetOutFldType = "VARGRAPHIC" + OutSuffix;
                                break;
                            case "XML":
                                GetOutFldType = "XML" //'& OutSuffix
                                break;
                            default:
                                GetOutFldType = InType + OutSuffix;
                                break;
                        };
                        break;

                    case "ORADDL":
                        switch ( InType.toUpperCase() )
                        {
                            case "CHAR", "XMLCDATA", "NCHAR":
                                GetOutFldType = "CHAR" + OutSuffix;
                                break;
                            case "VARCHAR", "NVARCHAR", "VARBINARY":
                                if( fldLen < 0 )
                                {
                                    GetOutFldType = "VARCHAR(8000)";
                                }
                                else
                                {
                                    GetOutFldType = "VARCHAR" + OutSuffix;
                                };
                                break;
                            case "VARCHAR2":
                                GetOutFldType = "VARCHAR2" + OutSuffix;
                                break;
                            case "DATE", "DATETIME":
                                GetOutFldType = "DATE";
                                break;
                            case "TIMESTAMP":
                                GetOutFldType = "TIMESTAMP";
                                break;
                            case "SMALLDATETIME":
                                GetOutFldType = "SMALLDATETIME   <<< DataType unknown to Oracle";
                                break;
                            case "TIME":
                                GetOutFldType = "TIME   <<< DataType unknown to Oracle";
                                break;
                            case "BINARY":
                                GetOutFldType = "RAW" + OutSuffix;
                                break;
                            case "NUMERIC", "DECIMAL", "NUMBER":
                                if ( srcType == "objCOBDesc" || srcType == "objDBDDesc" )
                                {
                                    fldLen = ( fldLen * 2 ) - 1;
                                };
                                OutSuffix = "(" + fldLen + "," + fldScale + ")";
                                GetOutFldType = "NUMBER" + OutSuffix;
                                break;
                            case "ZONE", "TEXTNUM":
                                numerator = fldLen - fldScale;
                                GetOutFldType = "NUMBER" + "(" + numerator + "," + fldScale + ")";
                                break;
                            case "SMALLMONEY":
                                GetOutFldType = "NUMBER(11,4)";
                                break;
                            case "MONEY":
                                GetOutFldType = "NUMBER(20,4)";
                                break;
                            case "INTEGER", "INT", "SMALLINT", "TINYINT", "BIT", "BIGINT":
                                GetOutFldType = "NUMBER";
                                break;
                            case "UNIQUEIDENTIFIER":
                                GetOutFldType = "VARCHAR(128)";  //'& OutLen
                                break; 
                            case "GRAPHIC":
                                GetOutFldType = "CHAR" + OutSuffix;
                                break;
                            case "LONG VARGRAPHIC":
                                GetOutFldType = "CHAR" + OutSuffix;
                                break;
                            case "VARGRAPHIC":
                                GetOutFldType = "VARCHAR" + OutSuffix;
                                break;
                            default:
                                GetOutFldType = InType + OutSuffix;
                                break;
                        };
                        break;

                    case "SQLDDL":
                        switch ( InType.toUpperCase() )
                        {
                            case "CHAR", "XMLCDATA":
                                GetOutFldType = "CHAR" + OutSuffix;
                                break;
                            case "BINARY":
                                GetOutFldType = "BINARY" + OutSuffix;
                                break;
                            case "VARCHAR2":
                                fldLen = ( fldLen * 2 )
                                OutSuffix = "(" + fldLen + ")"
                                GetOutFldType = "VARCHAR" + OutSuffix;
                                break;
                            case "VARCHAR":
                                if ( fldLen == -1 )
                                {
                                    GetOutFldType = "VARCHAR(max)"; //'& OutLen 
                                }
                                else
                                {
                                    GetOutFldType = "VARCHAR" + OutSuffix;
                                };
                                break;
                            case "TEXT":
                                GetOutFldType = InType;  //'"[" &  & "]";
                                break;
                            case "BLOB", "IMAGE", "BFILE", "CLOB", "DBCLOB", "NCLOB":
                                GetOutFldType = "IMAGE";
                                break; //'& OutSuffix   
                            case "DATE", "TIMESTAMP", "TIME", "DATETIME", "SMALLDATETIME", "DATETIME2", "DATETIMEOFFSET":
                                GetOutFldType = InType;
                                break;
                            case "TIMESTAMP WITH TIMEZONE":
                                GetOutFldType = "TIMESTAMP WITH TIMEZONE  <<< DataType unknown to MSSQLserver";
                                break;
                            case "INTEGER", "INT":
                                GetOutFldType = "INTEGER";
                                break;
                            case "DECIMAL", "DOUBLE", "NUMERIC":
                                if ( srcType == "objCOBDesc" || srcType == "objDBDDesc" )
                                {
                                    fldLen = ( fldLen * 2 ) - 1;
                                };
                                OutSuffix = "(" + fldLen + "," + fldScale + ")";
                                GetOutFldType = "DECIMAL" + OutSuffix;
                                break;
                            case "ZONE", "TEXTNUM":
                                numerator = fldLen - fldScale;
                                GetOutFldType = "NUMBER" + "(" + numerator + "," + fldScale + ")";
                                break;
                            case "SMALLINT":
                                GetOutFldType = "SMALLINT";
                                break; //'& OutLen   
                            case "TINYINT":
                                GetOutFldType = "TINYINT";
                                break; //'& OutLen   
                            case "BIT":
                                GetOutFldType = "BIT";
                                break; //'& OutLen   
                            case "BIGINT":
                                GetOutFldType = "BIGINT";
                                break; //'& OutLen   
                            case "MONEY":
                                GetOutFldType = "MONEY";
                                break; //'& OutLen   
                            case "SMALLMONEY":
                                GetOutFldType = "SMALLMONEY";
                                break; //'& OutLen   
                            case "REAL":
                                GetOutFldType = "REAL";
                                break; //'& OutLen   
                            case "FLOAT", "DECFLOAT(16)", "DECFLOAT(34)":
                                GetOutFldType = "FLOAT";
                                break; //'& OutLen   
                            case "UNIQUEIDENTIFIER":
                                GetOutFldType = "UNIQUEIDENTIFIER";
                                break;
                            case "GRAPHIC":
                                GetOutFldType = "CHAR" + OutSuffix;
                                break;
                            case "LONG VARGRAPHIC":
                                GetOutFldType = "CHAR" + OutSuffix;
                                break;
                            case "VARGRAPHIC":
                                GetOutFldType = "VARCHAR" + OutSuffix;
                                break;
                            case "ROWID":
                                GetOutFldType = "VARCHAR(19)";
                                break; //' & OutSuffix   
                            default:
                                GetOutFldType = InType + OutSuffix;
                                break;  //'"[" &  & "]"   
                        };
                        break;

                    case "SQDDDL":
                        switch ( InType.toUpperCase() )
                        {
                            case "CHAR", "BINARY", "XMLCDATA", "NCHAR", "NCLOB", "CLOB", "DBCLOB", "TEXT", "NTEXT", "GRAPHIC", "LONG VARGRAPHIC":
                                GetOutFldType = "CHAR" + OutSuffix;
                                break;
                            case "VARCHAR", "VARCHAR2":
                                GetOutFldType = "VARCHAR" + OutSuffix;
                                break;
                            case "DECIMAL", "NUMERIC", "NUMBER":
                                if ( srcType == "objCOBDesc" || srcType == "objDBDDesc" )
                                {
                                    fldLen = ( fldLen * 2 ) - 1;
                                };
                                OutSuffix = "(" + fldLen + "," + fldScale + ")";
                                GetOutFldType = "DECIMAL" + OutSuffix;
                                break;
                            case "ZONE", "TEXTNUM":
                                numerator = fldLen - fldScale;
                                GetOutFldType = "NUMBER" + "(" + numerator + "," + fldScale + ")";
                                break;
                            case "MONEY":
                                GetOutFldType = "DECIMAL(20,4)"; //'& OutSuffix   
                                break;
                            case "SMALLMONEY":
                                GetOutFldType = "DECIMAL(11,4)"; // '& OutSuffix   
                                break;
                            case "BINARY":
                                GetOutFldType = "BINARY" + OutSuffix;
                                break;
                            case "TIMESTAMP":
                                GetOutFldType = "TIMESTAMP";  // '& OutSuffix
                                break;
                            case "DATE", "TIME", "DATETIME":
                                GetOutFldType = "DATE";   //'& OutSuffix   
                                break;
                            case "INTEGER", "INT":
                                GetOutFldType = "INTEGER"; //'& OutSuffix
                                break;
                            case "SMALLINT", "TINYINT", "BIT":
                                GetOutFldType = "SMALLINT"; //'& OutSuffix 
                                break;
                            case "INTEGER", "INT":
                                GetOutFldType = "INTEGER";
                                break;
                            case "BIGINT":
                                GetOutFldType = "INTEGER(20)";
                                break;
                            default:
                                GetOutFldType = InType + OutSuffix;  //'"[" &  & "]"   
                                break;
                        };
                        break;

                    default:
                        GetOutFldType = "";
                        break;
                    };
                    return GetOutFldType;
            }
            catch ( err )
            {
                logError( err.message, err.name, "model.js", "function GetOutFldTypeStr( InType, OutType, fldLen, fldScale )" );
            }
        }
        // END of main Modeling Function
    }
    catch ( err )
    {
        logError( err.message, err.name, "model.js", "function DOmodel( id, tabId )" );
    }
}