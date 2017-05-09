//
// SQData Script Generation
//**********************************************************************************************

// Main Generator
//**********************************************************************************************
function DOgenerate( id , tabId)
{
//    alert( "script generator" );
//    dhtmlx.message( {
//        text: "Script Generator is currently under construction",
//        expire: 5000
//    } );

    var structGen = [
	    { type: "settings", position: "label-left", labelWidth: 120, inputWidth: 320 },
	    { type: "fieldset", label: "Script Generator", inputWidth: "auto", list: [
                { name: "id", type: "input", label: "id", value: "", readonly: "true", hidden: true },
                { name: "objid", type: "input", label: "objid", value: "", readonly: "true", hidden: true },
                { name: "projName", type: "input", label: "Project Name", value: "", readonly: "true", hidden: true },
                { name: "envName", type: "input", label: "Environment Name", value: "", readonly: "true", hidden: true },
                { name: "sysName", type: "input", label: "System Name", value: "", readonly: "true", hidden: true },
			    { name: "engName", type: "input", label: "Engine Name", required: true, value: "", readonly: "true" }
            ]
	    },
        { type: "fieldset", label: "Mapping Precision", inputWidth: "auto", list: [
			    { type: "radio", position: "label-right", name: "prec", value: 1, label: "Field Name Only", checked: true },
                { type: "newcolumn" },
			    { type: "radio", position: "label-right", name: "prec", value: 2, label: "Desc Name.Field Name" },
                { type: "newcolumn" },
			    { type: "radio", position: "label-right", name: "prec", value: 3, label: "DS Name.Desc Name.Field Name" },
		    ]
        },
	    { type: "fieldset", label: "Generate", inputWidth: "auto", list: [

			    { name: "btnGen", type: "button", value: "Generate Script" },
                { type: "newcolumn" },
			    { name: "btnParseSQD", type: "button", value: "Parse SQD Script", disabled: true },
                { type: "newcolumn" },
			    { name: "btnParseINL", type: "button", value: "Parse INL Script", disabled: true }
		    ]
	    },
        { type: "fieldset", label: "Script Path on server", inputWidth: "auto", list: [
			    { name: "scriptPath", type: "input", inputWidth: "550", rows: "1", value: "" },
                { name: "inlPath", type: "input", inputWidth: "550", rows: "1", value: "" },
                { type: "newcolumn" },
			    { name: "btnDownload", type: "button", value: "Download SQD Script", disabled: true },
			    { name: "btnDownloadinl", type: "button", value: "Download INL Script", disabled: true }
		    ]
        },
        { type: "fieldset", label: "Generated SQD Script file", inputWidth: "auto", list: [
			    { name: "scriptText",  type: "input", inputWidth: "600", rows: "10", value: "" }
		    ]
        },
        { type: "fieldset", label: "Generated INL Script file", inputWidth: "auto", list: [
			    { name: "scriptTextINL", type: "input", inputWidth: "600", rows: "10", value: "" }
		    ]
        },
        { type: "fieldset", label: "Parser Report on server", inputWidth: "auto", list: [
			    { name: "parsePath", type: "input", inputWidth: "550", rows: "1", value: "" },
                { type: "newcolumn" },
			    { name: "btnDownloadRPT", type: "button", value: "Download Parser Report", disabled: true }
		    ]
        },
        { type: "fieldset", label: "Parsed RPT Script file", inputWidth: "auto", list: [
			    { name: "parseText", type: "input", inputWidth: "600", rows: "15", value: "" }
		    ]
        }
    ]

    //            alert( "loadCtlEng" );
    var propLayout = Tabbar_user_control.cells( "tabProp" ).attachLayout( "1C" );
    propLayout.cells( "a" ).setText( "Properties" );
    //            propLayout.cells( "a" ).setHeight( 300 );
    //            propLayout.cells( "b" ).setText( "Details" );
    var ctlProp = propLayout.cells( "a" ).attachForm( structGen );
    //ctlProp.setFontSize( '11px' );
    var dp = new dataProcessor( "../Studio/php/loadEng.php" ); //instatiate dataprocessor
    dp.init( ctlProp ); //link form to dataprocessor

//        alert( 'loadCtlEnv Name: ' + id + "\n" + "../Studio/php/loadEnv.php?id=" + tabId );

        ctlProp.load( "../Studio/php/loadEng.php?id=" + tabId );

    ctlProp.setItemValue( "engName", getEngName( id ) );

    var sName = "";
    var sFile = "";
    var EngName = "";

    var sqdFile = "";
    var inlFile = "";
    var rptFile = "";

    var iframe;

    ctlProp.attachEvent( "onButtonClick", function ( name )
    {
        if ( name == "btnGen" )
        {
            main_layout.progressOn();

            var nameProj = getProjName( id );
            var nameEnv = getEnvName( id );
            var nameSys = getSysName( id );
            var nameEng = getEngName( id );
            var Prec = ctlProp.getItemValue( "prec" );
            // Generate script here
            jQuery.ajax( {
                type: 'POST',  //type of request  GET or POST
                url: '../Studio/php/genScript.php',   // url to which the request is send
                data: { projName: nameProj,                 // proj Name
                    envName: nameEnv,                       // env name
                    sysName: nameSys,                       // sys name
                    engName: nameEng,                       // eng name
                    engID: id,                               // eng id
                    prec: Prec
                }, // data to be sent to server
                async: false,
                success: function ( return_data )  // function to be called if the request succeeds
                {
                    main_layout.progressOff();
//                    alert( "return_data :  " + return_data );
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
                        sqdFile = return_data + ".sqd";
                        ctlProp.setItemValue( "scriptPath", "http://" + location.hostname + "/" + return_data + ".sqd" );
                        inlFile = return_data + ".inl";
                        ctlProp.setItemValue( "inlPath", "http://" + location.hostname + "/" + return_data + ".inl" );
                        jQuery.get( "http://" + location.hostname + "/" + return_data + ".sqd", function ( data )
                        {
                            // write scripts to SQD text area
                            ctlProp.setItemValue( "scriptText", data );
                            // activate Parse and download buttons here
                            ctlProp.enableItem( "btnParseSQD" );
                            ctlProp.enableItem( "btnDownload" );

                        } );
                        jQuery.get( "http://" + location.hostname + "/" + return_data + ".inl", function ( data )
                        {
                            // write scripts to INL text area
                            ctlProp.setItemValue( "scriptTextINL", data );
                            // activate Parse and download buttons here
                            ctlProp.enableItem( "btnParseINL" );
                            ctlProp.enableItem( "btnDownloadinl" );
                        } );
                    }
                },
                error: function ()
                {
                    //function to be called if the request fail
                    main_layout.progressOff();
                    dhtmlx.message( {
                        title: "Error Occured",
                        type: "error",
                        text: "An Error occured before script generation",
                        expires: 5000
                    } );
                }
            } );          // end ajax
        }
        if ( name == "btnParseSQD" )
        {
//            dhtmlx.message( {
//                text: "Parsing feature is currently under construction",
//                expire: 5000
//            } );

            EngName = getEngName( id );
            sName = EngName;
            sFile = sName + ".sqd";

            jQuery.ajax( {
                type: 'POST',  //type of request  GET or POST
                url: '../Studio/php/parseScript.php', // url to which the request is send
                data: { scriptName: sName,
                    scriptFile: sFile
                }, // data to be sent to server
                async: false,
                success: function ( return_data )
                {
                    if ( return_data != "false" )
                    {
                        rptFile = return_data;

                        ctlProp.setItemValue( "parsePath", "http://" + location.hostname + "/" + return_data );

                        jQuery.get( "http://" + location.hostname + "/" + return_data, function ( data )
                        {
                            // put parser report in text area
                            ctlProp.setItemValue( "parseText", data );
                            ctlProp.enableItem( "btnDownloadRPT" );
                        } ); // end ajax file request
                    }
                    else
                    {
                        main_layout.progressOff();
                        dhtmlx.message( {
                            title: "Error Occured",
                            type: "error",
                            text: "An Error occured running the parser",
                            expires: 5000
                        } );
                    }
                }
            } );  // end ajax parser run
        }
        if ( name == "btnParseINL" )
        {
//            dhtmlx.message( {
//                text: "Parsing feature is currently under construction",
//                expire: 5000
//            } );

            EngName = getEngName( id );
            sName = EngName;
            sFile = sName + ".inl";

            jQuery.ajax( {
                type: 'POST',  //type of request  GET or POST
                url: '../Studio/php/parseScript.php', // url to which the request is send
                data: { scriptName: sName,
                    scriptFile: sFile
                }, // data to be sent to server
                async: false,
                success: function ( return_data )
                {
                    if ( return_data != "false" )
                    {
                        rptFile = return_data;

                        ctlProp.setItemValue( "parsePath", "http://" + location.hostname + "/" + return_data );

                        jQuery.get( "http://" + location.hostname + "/" + return_data, function ( data )
                        {
                            // put parser report in text area
                            ctlProp.setItemValue( "parseText", data );
                            ctlProp.enableItem( "btnDownloadRPT" );
                        } ); // end ajax file request
                    }
                    else
                    {
                        main_layout.progressOff();
                        dhtmlx.message( {
                            title: "Error Occured",
                            type: "error",
                            text: "An Error occured running the parser",
                            expires: 5000
                        } );
                    }
                }
            } );  // end ajax parser run
        }
        // button to download sqd file
        if ( name == "btnDownload" )
        {
            dhtmlx.message( {
                text: "Script download will begin shortly",
                expire: 5000
            } );

            //            var path2file = sqdFile;
            //            alert( "script Path : " + path2file );
            //            var myTempWindow = window.open( path2file, '', 'left=10000,screenX=10000' );
            //           document.execCommand( 'SaveAs', 'null',  path2file );
            //            myTempWindow.close();


            iframe = document.getElementById( "download-container" );
            if ( iframe === null )
            {
                iframe = document.createElement( 'iframe' );
                iframe.id = "download-container";
                iframe.style.visibility = 'hidden';
                document.body.appendChild( iframe );
            }
            iframe.src = '../Studio/php/fileDwnld.php?filePath=' + sqdFile;

            //            document.location = '../Studio/php/fileDwnld.php?filePath="' + path2file + '"';
        }
        // button to download inl file
        if ( name == "btnDownloadinl" )
        {
            dhtmlx.message( {
                text: "Script download will begin shortly",
                expire: 5000
            } );
            //            var iframe;
            iframe = document.getElementById( "download-container" );
            if ( iframe === null )
            {
                iframe = document.createElement( 'iframe' );
                iframe.id = "download-container";
                iframe.style.visibility = 'hidden';
                document.body.appendChild( iframe );
            }
            iframe.src = '../Studio/php/fileDwnld.php?filePath=' + inlFile;
        }
        // button to download rpt file
        if ( name == "btnDownloadRPT" )
        {
            dhtmlx.message( {
                text: "Parser Report download will begin shortly",
                expire: 5000
            } );
            //            alert( "return data (parsePath) : " + rptFile );
            //            var iframe;
            iframe = document.getElementById( "download-container" );
            if ( iframe === null )
            {
                iframe = document.createElement( 'iframe' );
                iframe.id = "download-container";
                iframe.style.visibility = 'hidden';
                document.body.appendChild( iframe );
            }
            iframe.src = '../Studio/php/fileDwnld.php?filePath=' + rptFile;
        }
    } );
}


