// SQData Web Studio
//
// Object Module
//**************************************
// User info
function getUserInfo()
{
try
    {
//        alert( "Welcome to SQData Web Studio, " + CURuid );    //+ '\n' + "PW: " + CURpw 
        jQuery.getJSON( '../Studio/php/user.php', function ( data )
        {
            if ( !data )
            {
                alert( "error" );
            }
            else
            {
//                alert( 'data: ' + data );
                CURuid = data.username;
                CURpw = data.password;
//                alert( "Welcome to SQData Web Studio, " + CURuid );    //+ '\n' + "PW: " + CURpw 
                // call function after query complete
                afterUserInfo();
            }
        } );
    }
    catch ( err )
    {
        logError( err.message, err.name, "modObjects.js", "function getUserInfo()" );
    }
}
//
// ******* Error Logging *********************************************************************
function logError( message, name, filename, fun )
{
    //    alert( "errorLog CURproj = " + CURproj + "\nmessage: " + message + "\nname: " + name  );  // + "\nDescription: " + Description + "\nMessage: " + Message + "\nSeverity: " + Severity );
//    var browser = window.navigator.userAgent;
//    alert( "browser = " + browser );

    jQuery.ajax( {
        type: 'POST',  //type of request  GET or POST
        url: '../Studio/php/errorlog.php', // url to which the request is send
        data: { projName: CURproj,
            errMsg: message,
            errName: name,
            errFile: filename,
            errFun: fun
        }, // data to be sent to server
        async: true,
        success: function ( return_data )  // function to be called if the request succeeds
        {
//            alert( "Data Returned from Error Logging PHP: " + return_data );
            if ( return_data == "true" )
            {
                dhtmlx.message( {
                    title: "Error Logged",
                    type: "error",
                    text: "A JavaScript error has been logged",
                    expires: 5000
                } );
            }
            else
            {
                dhtmlx.message( {
                    title: "Error NOT Logged",
                    type: "error",
                    text: return_data,
                    expires: 5000
                } );
            };
        },
        error: function ()
        {
            //function to be called if the request fail
            propLayout.progressOff();
            alert( 'Ajax error Logging JavaScript error' );
        }
    } );             // end ajax
}

function OpenLogFile()
{
    try
    {
        var structLog = [
	        { type: "settings", position: "label-left", labelWidth: 120, inputWidth: 320 },
	        { type: "fieldset", label: "Project Error Log", inputWidth: "auto", list: [
                    { name: "projName", type: "input", value: CURproj, readonly: "true", hidden: false, inputWidth: "550" },
                    { type: "newcolumn" },
			        { name: "btnClear", type: "button", value: "Clear Log File", disabled: false }
                ]
	        },
            { type: "fieldset", label: "Log Path on server", inputWidth: "auto", list: [
			        { name: "logPath", type: "input", inputWidth: "550", rows: "1", value: "" },
                    { type: "newcolumn" },
			        { name: "btnDownload", type: "button", value: "Download Log File", disabled: false }
		        ]
            },
            { type: "fieldset", label: "Error Log", inputWidth: "auto", list: [
			        { name: "errorText", type: "input", inputWidth: "700", rows: "30", value: "" }
		        ]
            }
        ]

        var propLayout = Tabbar_user_control.cells( "tabLog" ).attachLayout( "1C" );
        propLayout.cells( "a" ).setText( "Error Log" );
        //            propLayout.cells( "a" ).setHeight( 300 );
        //            propLayout.cells( "b" ).setText( "Details" );
        var ctlProp = propLayout.cells( "a" ).attachForm( structLog );
        //ctlProp.setFontSize( '11px' );

        logFile = "SQDATA/Studio/temp/" + CURproj + ".log";
        ctlProp.setItemValue( "logPath", "http://" + location.hostname + "/" + logFile );

        jQuery.get( "http://" + location.hostname + "/" + logFile, function ( data )
        {
            // write log to text area
            ctlProp.setItemValue( "errorText", data );
        } );

        ctlProp.attachEvent( "onButtonClick", function ( name )
        {
            if ( name == "btnDownload" )
            {
                dhtmlx.message( {
                    text: "Error Log download will begin shortly",
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
                iframe.src = '../Studio/php/fileDwnld.php?filePath=' + logFile;
            };
            if ( name == "btnClear" )
            {
                jQuery.ajax( {
                    type: 'POST',  //type of request  GET or POST
                    url: '../Studio/php/clearLog.php', // url to which the request is send
                    data: { projName: CURproj }, // data to be sent to server
                    async: false,
                    success: function ( return_data )  // function to be called if the request succeeds
                    {
//                        alert( "Data Returned from Error Logging PHP: " + return_data );
                        if ( return_data == "true" )
                        {
                            dhtmlx.message( {
                                title: "Error Log Deleted",
                                text: "Project Error Log Deleted",
                                expires: 5000
                            } );
                        }
                        else
                        {
                            dhtmlx.message( {
                                title: "Error Log NOT deleted",
                                type: "error",
                                text: "Project Error Log NOT deleted",
                                expires: 5000
                            } );
                        };
                    },
                    error: function ()
                    {
                        //function to be called if the request fail
                        propLayout.progressOff();
                        alert( 'Ajax error Deleting Project error log' );
                    }
                } );             // end ajax
            };
        } );
    }
    catch ( err )
    {
        logError( err.message, err.name, "modObjects.js", "function OpenLogFile()" );
    }
}

//
//************************************************************************************************************************
// Get Names of Parent Items
function getProjName(id)
{
    var idArr = id.split(".");
    var projName = idArr[0];
    return projName;
}
function getEnvName(id)
{
    var idArr = id.split(".");
    var EnvName = idArr[1];
    return EnvName;
}
function getSysName(id)
{
    var idArr = id.split( "." );
    var SysName = "";
    if ( idArr.length >= 3 )
    {
        SysName = idArr[2]; 
    }
    return SysName;
}
function getDescName( id )
{
    var idArr = id.split( "." );
    var DescName = "";
    if ( idArr.length >= 4 )
    {
        DescName = idArr[2];
    }
    return DescName;
}
function getDescType(id)
{
    var idArr = id.split(".");
    var DescType = "";
    if (idArr.length >= 4)
    {
        DescType = idArr[3];
    }
    return DescType;
}
function getFldName( id )
{
    var idArr = id.split( "." );
    var fldName = "";
    if ( idArr.length >= 5 )
    {
        fldName = idArr[4];
    }
    return fldName;
}
function getDirFromId(id)
{
    var idArr = id.split(".");
    var dType = "";
    var dir = "";
    if (idArr.length >= 4)
    {
        dType = idArr[3];
        dir = dType.substr(0, 3);
    }
    return dir;
}

function getEngName(id)
{
    var idArr = id.split( "." );
    var EngName = "";
    if ( idArr.length >= 4 )
    {
        EngName = idArr[3];
    }
    return EngName;
}
function getDSName(id)
{
    var idArr = id.split(".");
    var DSName = idArr[4];
    return DSName;
}
function getProcName( id )
{
    var idArr = id.split( "." );
    var ProcName = idArr[4];
    return ProcName;
}
function getParentName(ChildId)
{
    var ParentId = getParentId(ChildId);
    var ParIdArr = ParentId.split(".");
    var ParentName = ParIdArr[ParIdArr.length - 1];
    return ParentName;
}

// Get IDs
function getParentId(ChildId)
{
    var ParentId = ChildId.substring(0, ChildId.lastIndexOf("."));
    return ParentId;
}
function getProjId(id)
{
    var idArr = id.split(".");
    var projId = idArr[0];
    return projId;
}

// Get Folder ID
//function getFldrId(id)
//{
//    var idArr = id.split(".");
//    var projId = idArr[0];
//    return projId;
//}

// Get Node Types
//function getNodeType(id)
//{
//    var idArr = id.split(".");
//    var projName = idArr[0];
//    return projName;
//}

// Get SQD Types
//function getSQDType(id)
//{
//    var idArr = id.split(".");
//    var projName = idArr[0];
//    return projName;
//}
function SQLquote( str )
{
    var newstr = str.replace( "'", "\'" );
    return newstr;
}
function SQLunquote( str )
{
    var newstr = str.replace( "\'", "'" );
    return newstr;
}
function toStrNTrim( obj )
{
    var str = "";
    var strout = "";
    if ( obj )
    {
        str = obj.toString();
        strout = trim1( str );
    }
    return strout;
}
function trim1( str )
{
    return str.replace( /^\s\s*/, '' ).replace( /\s\s*$/, '' );
}

