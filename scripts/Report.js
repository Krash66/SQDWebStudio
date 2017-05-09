//
// SQData Report Generation
//**********************************************************************************************

// Main Report Page
//**********************************************************************************************
function OpenReports()
{
    try
    {
        var structRpt = [
	        { type: "settings", position: "label-left", labelWidth: 120, inputWidth: 120 },
	        { type: "fieldset", label: "Project Reports", inputWidth: "auto", list: [
                    { name: "projName", type: "input", label: "Current Project", value: CURproj, readonly: "true", labelAlign:"center", hidden: false, inputWidth: "150" },
                    { type: "newcolumn" },
			        { name: "engName", type: "select", label: "Choose Engine", labelAlign: "center", validate: "NotEmpty", connector: "../Studio/php/comboEng.php" },
                    { type: "newcolumn" },
			        { name: "cbShowMapping", type: "checkbox", label: "    Include mappings?", labelAlign: "right", checked: true },
                    { type: "newcolumn" },
			        { name: "btnGenRpt", type: "button", label: "Generate", value: "Generate Report" }
                ]
	        },
            { type: "fieldset", label: "Engine Report Path", inputWidth: "auto", list: [
			        { name: "rptPath", type: "input", inputWidth: "550", rows: "1", value: "" },
                    { type: "newcolumn" },
			        { name: "btnDownload", type: "button", value: "Download Report File", disabled: true }
		        ]
            },
            { type: "fieldset", label: "Report", inputWidth: "auto", list: [
			        { name: "rptText", type: "input", inputWidth: "800", rows: "20", value: "" }
		        ]
            },
            { type: "fieldset", label: "Field Search", inputWidth: "auto", list: [
			        { name: "fname", type: "input", labelWidth: 350, label: "Enter a Field Name to Search (use '%' or '_' as wildcards)", inputWidth: "200", rows: "1", value: "" },
                    { type: "newcolumn" },
			        { name: "btnSrch", type: "button", value: "Search", disabled: false }
		        ]
            },
            { type: "fieldset", label: "Search Report Path", inputWidth: "auto", list: [
			        { name: "srchPath", type: "input", inputWidth: "550", rows: "1", value: "" },
                    { type: "newcolumn" },
			        { name: "btnDLsrch", type: "button", value: "Download Search Results File", disabled: true }
		        ]
            },
            { type: "fieldset", label: "Field found in the following:", inputWidth: "auto", list: [
			        { name: "srchText", type: "input", inputWidth: "800", rows: "20", value: "" }
		        ]
            }
        ]

        var propLayout = Tabbar_user_control.cells( "tabWeb" ).attachLayout( "1C" );
        propLayout.cells( "a" ).setText( "Reports" );
        //            propLayout.cells( "a" ).setHeight( 300 );
        //            propLayout.cells( "b" ).setText( "Details" );
        var ctlProp = propLayout.cells( "a" ).attachForm( structRpt );
        //ctlProp.setFontSize( '11px' );
        var rptFile = "";
        var srchFile = "";
        //        logFile = "SQDATA/Studio/temp/" + CURproj + ".log";
        //        ctlProp.setItemValue( "logPath", "http://" + location.hostname + "/" + logFile );

        //        jQuery.get( "http://" + location.hostname + "/" + logFile, function ( data )
        //        {
        //            // write log to text area
        //            ctlProp.setItemValue( "errorText", data );
        //        } );

        ctlProp.attachEvent( "onButtonClick", function ( name )
        {
            if ( name == "btnGenRpt" )
            {
                dhtmlx.message( {
                    text: "Report Generation Started",
                    expire: 5000
                } );
                propLayout.progressOn();
                var objid = ctlProp.getItemValue( "engName" );
                //                alert( "objid: " + objid );
                var nameProj = getProjName( objid );
                var nameEnv = getEnvName( objid );
                var nameSys = getSysName( objid );
                var nameEng = getEngName( objid );

                // generate report here
                jQuery.ajax( {
                    type: 'POST',  //type of request  GET or POST
                    url: '../Studio/php/genReport.php',   // url to which the request is send
                    data: { projName: nameProj,                 // proj Name
                        envName: nameEnv,                       // env name
                        sysName: nameSys,                       // sys name
                        engName: nameEng,                       // eng name
                        engID: objid                            // eng id
                    }, // data to be sent to server
                    async: false,
                    success: function ( return_data )  // function to be called if the request succeeds
                    {
                        propLayout.progressOff();
                        //                        alert( "return_data :  " + return_data );
                        if ( return_data == "error" )
                        {
                            dhtmlx.message( {
                                title: "Error Occured",
                                type: "error",
                                text: "An Error occured during script generation",
                                expires: 5000
                            } );
                        }
                        else
                        {
                            rptFile = return_data + ".rpt";
                            ctlProp.setItemValue( "rptPath", "http://" + location.hostname + "/" + return_data + ".rpt" );
                            jQuery.get( "http://" + location.hostname + "/" + return_data + ".rpt", function ( data )
                            {
                                // write Report to rpt text area
                                ctlProp.setItemValue( "rptText", data );
                                // activate download button here
                                ctlProp.enableItem( "btnDownload" );
                            } );
                        }
                    },
                    error: function ()
                    {
                        //function to be called if the request fail
                        propLayout.progressOff();
                        dhtmlx.message( {
                            title: "Error Occured",
                            type: "error",
                            text: "An Error occured before Report generation",
                            expires: 5000
                        } );
                    }
                } );          // end ajax
            };

            // Field Search
            if ( name == "btnSrch" )
            {
                if ( ctlProp.getItemValue( "fname" ) != "" )
                {
                    dhtmlx.message( {
                        text: "Field Search Started",
                        expire: 5000
                    } );
                    propLayout.progressOn();
                    jQuery.ajax( {
                        type: 'POST',                                  //type of request  GET or POST
                        url: '../Studio/php/genFldSrch.php',           // url to which the request is send
                        data: { projName: CURproj,                     // proj Name
                            fldName: ctlProp.getItemValue( "fname" )   // field name to search
                        }, // data to be sent to server
                        async: false,
                        success: function ( return_data )  // function to be called if the request succeeds
                        {
                            propLayout.progressOff();
//                            alert( "return_data :  " + return_data );
                            if ( return_data == "error" )
                            {
                                dhtmlx.message( {
                                    title: "Error Occured",
                                    type: "error",
                                    text: "An Error occured during script generation",
                                    expires: 5000
                                } );
                            }
                            else
                            {
                                srchFile = return_data + ".rpt";
                                ctlProp.setItemValue( "srchPath", "http://" + location.hostname + "/" + return_data + ".rpt" );
                                jQuery.get( "http://" + location.hostname + "/" + return_data + ".rpt", function ( data )
                                {
                                    // write Report to rpt text area
                                    ctlProp.setItemValue( "srchText", data );
                                    // activate download button here
                                    ctlProp.enableItem( "btnDLsrch" );
                                } );
                            }
                        },
                        error: function ()
                        {
                            //function to be called if the request fail
                            propLayout.progressOff();
                            dhtmlx.message( {
                                title: "Error Occured",
                                type: "error",
                                text: "An Error occured before Search report generation",
                                expires: 5000
                            } );
                        }
                    } );          // end ajax
                }
                else
                {
                    alert( "Please enter a fieldname" );
                }
            };

            // download Report
            if ( name == "btnDownload" )
            {
                dhtmlx.message( {
                    text: "Report Download Started",
                    expire: 5000
                } );

                iframe = document.getElementById( "download-container" );
                if ( iframe === null )
                {
                    iframe = document.createElement( 'iframe' );
                    iframe.id = "download-container";
                    iframe.style.visibility = 'hidden';
                    document.body.appendChild( iframe );
                }
                iframe.src = '../Studio/php/fileDwnld.php?filePath=' + rptFile;
            };

            // download Search
            if ( name == "btnDLsrch" )
            {
                dhtmlx.message( {
                    text: "Field Search Started",
                    expire: 5000
                } );

                iframe = document.getElementById( "download-container" );
                if ( iframe === null )
                {
                    iframe = document.createElement( 'iframe' );
                    iframe.id = "download-container";
                    iframe.style.visibility = 'hidden';
                    document.body.appendChild( iframe );
                }
                iframe.src = '../Studio/php/fileDwnld.php?filePath=' + srchFile;
            };
        } );
    }
    catch ( err )
    {
        logError( err.message, err.name, "Report.js", "function OpenReports()" );
    }
}