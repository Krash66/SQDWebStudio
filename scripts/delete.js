//
// SQData Delete Object Functions 
//**********************************************************************************************

// Main Delete functions
//**********************************************************************************************
function delAllObj( objid )
{
    alert( "Delete All Under Contruction, please delete objects individually \ndelAllObj objid = " + objid );

}
//**********************************************************************************************
function delObj( objid )
{
    // Delete chosen object after deleting all children recursively
    
    var tabId = MainTree.getUserData( objid, 'tabId' );
    var sqdType = MainTree.getUserData( objid, 'sqdType' );

//     alert( "Delete Under Contruction \ndelObj objid = " + objid + "\ntabId = " + tabId + "\nsqdType = " + sqdType );

    dhtmlx.message( {
        title: "Confirm Delete",
        type: "confirm-warning",
        text: "Are you sure you want to delete object " + objid + " and all it's children?",
        ok: "Yes", cancel: "No",
        callback: function ( success )
        {
            // alert( "success = " + success );

            if ( success == true )
            {
                //                dhtmlx.alert( {
                //                    title:"Important!",
                //                    type:"alert-error",
                //                    text: "Delete operations are currently being fixed to ensure DataBase integrity"
                //                } );
                var itmid = "";
                var itmstr = MainTree.getAllSubItems( objid );
                var itms = itmstr.split( "," );
                if ( itms.length > 1 )
                {
                    itms.reverse();
                    // alert( "objid = " + objid + "\nitms = " + itms + "\nitms.length = " + itms.length );

                    // Recursively delete all children
                    for ( var i = 0; i < itms.length; i++ )
                    {
                        itmid = itms[i];
//                        alert( "itmid = " + itmid );
                        if ( MainTree.getUserData( itmid, 'loadFunction' ) == 'loadCtlFolder' )
                        {
                            delMainTreeNode( itmid );
                            //            alert( 'Delete Folder: ' + itmid );
                        }
                        else
                        {
                            delTreeObject( itmid, MainTree.getUserData( itmid, 'sqdType' ), MainTree.getUserData( itmid, 'tabId' ) );
                            //                       alert( 'Delete Object: ' + itmid );
                        };
                    };
                };
                               
                // If object is not folder, then delete it too
                if ( MainTree.getUserData( objid, 'loadFunction' ) !== 'loadCtlFolder' )
                {
                    delTreeObject( objid, sqdType, tabId );
                };
            }
        }
    } );
}

//**********************************************************************************************
function delTreeObject( itmid, sqdType, tabId )
{
//    alert('Delete Tree Object: ' + itmid + "\nSQD type: " + sqdType + "\nTable Id: " + tabId);

    var tabName = "";
//    var treeWhere;
    var delExtra = "";
    var isDBD = false;

        // sort by OBJ type
    switch ( sqdType )
    {
        case 'objProj':
            tabName = "projects";
            break;
        case 'objEnv':
            tabName = "environments";
            break;
        case 'objConn':
            tabName = "connections";
            break;
        case 'objSel':
           
            break;
        case "SrcCOBOL":
            tabName = "descriptions";
            delExtra = "descriptions";
            break;
        case "SrcCOBIMS":
            tabName = "descriptions";
            delExtra = "descriptions";
            isDBD = true;
            break;
        case "SrcDTDDesc":
            tabName = "descriptions";
            delExtra = "descriptions";
            break;
        case "Srcdb2Desc":
            tabName = "descriptions";
            delExtra = "descriptions";
            break;
        case "SrcmssqlDesc":
            tabName = "descriptions";
            delExtra = "descriptions";
            break;
        case "SrcoraDesc":
            tabName = "descriptions";
            delExtra = "descriptions";
            break;
        case "SrcudbDesc":
            tabName = "descriptions";
            delExtra = "descriptions";
            break;
        case "SrcDMLDesc":
            tabName = "descriptions";
            delExtra = "descriptions";
            break;
        case "TgtCOBOL":
            tabName = "descriptions";
            delExtra = "descriptions";
            break;
        case "TgtCOBIMS":
            tabName = "descriptions";
            delExtra = "descriptions";
            isDBD = true;
            break;
        case "TgtDTDDesc":
            tabName = "descriptions";
            delExtra = "descriptions";
            break;
        case "Tgtdb2Desc":
            tabName = "descriptions";
            delExtra = "descriptions";
            break;
        case "TgtmssqlDesc":
            tabName = "descriptions";
            delExtra = "descriptions";
            break;
        case "TgtoraDesc":
            tabName = "descriptions";
            delExtra = "descriptions";
            break;
        case "TgtudbDesc":
            tabName = "descriptions";
            delExtra = "descriptions";
            break;
        case "TgtDMLDesc":
            tabName = "descriptions";
            delExtra = "descriptions";
            break;
        case 'objVar':
            tabName = "variables";
            break;
        case 'objSys':
            tabName = "systems";
            break;
        case 'objEng':
            tabName = "engines";
            break;
        case 'objSDS':
            tabName = "datastores";
            
            break;
        case 'objSDSsel':
            delExtra = "DSsel";
            break;
        case 'objTDS':
            tabName = "datastores";    
            break;
        case 'objTDSsel':
            delExtra = "DSsel";
            break;
        case 'objProc':
            tabName = "tasks";
            delExtra = "proc";
            break;
        case 'objLogic':
            tabName = "tasks";
            delExtra = "proc";
            break;
        case 'objInclProc':
            tabName = "tasks";
            delExtra = "proc";
            break;
        case 'objMain':
            tabName = "tasks";
            delExtra = "proc";
            break;
        case 'objMainIncl':
            tabName = "tasks";
            delExtra = "proc";
            break;
    };
    main_layout.progressOn();
    //
    // ************* remove object itself *********
    // alert( "makes it here 1" );

    jQuery.ajax( {
        type: 'POST',  //type of request  GET or POST
        url: '../Studio/php/delById.php', // url to which the request is send
        data: { id: tabId, 
                tabName: tabName }, // data to be sent to server
        async: false,
        //            timeout: request_timeout, // timeout for request
        success: function ( return_data )
        {
            main_layout.progressOff();

//            alert( "After delById return_data: " + return_data + "\ntabName: " + tabName );
//            alert("Switch tabname: " + tabName + "\nitmid: " + itmid + "\ndelExtra: " + delExtra);

            switch ( delExtra )
            {
                case "descriptions":
//                    alert("Switch tabname: " + tabName + "\nitmid: " + itmid + "\ndelExtra: " + delExtra);

                    delDescFlds( itmid );
                    break;
                case "DSsel":
                    //                    alert( "Switch tabname: " + tabName + "\nitmid: " + itmid + "\ndelExtra: " + delExtra );
                    delDSFlds( itmid );
                    break;
                case "proc":
                    //                    alert( "Switch tabname: " + tabName + "\nitmid: " + itmid + "\ndelExtra: " + delExtra );
                    delProcFlds( itmid );
                    break;
            };

            delMainTreeNode( itmid );
        },
        error: function ()
        {
            //function to be called if the request fail
            main_layout.progressOff();
            alert( 'error' );

        }
    } );
}
    
//************************** delete a main tree node by objid *********************************************
function delMainTreeNode( itmid )
{
    main_layout.progressOn();
    //
    jQuery.ajax( {
        type: 'POST',  //type of request  GET or POST
        url: '../Studio/php/delMainTree.php', // url to which the request is send
        data: { objid: itmid }, // data to be sent to server
        //            timeout: request_timeout, // timeout for request
        success: function ( return_data )
        {
            main_layout.progressOff();
            //            alert( "After delMainTreeNode return_data: " + return_data );
            MainTree.deleteItem( itmid, true );
        },
        error: function ()
        {
            //function to be called if the request fail
            main_layout.progressOff();
            alert( 'error' );
        }
    } );
}
//**********************************************************************************************
function delDescFlds( itmid )
{
//    main_layout.progressOn();
    var nameProj = getProjName( itmid );
    var nameEnv = getEnvName( itmid );
    var nameDesc = getDescName(itmid);

//    alert( "delDescFlds\nnameProj = " + nameProj + "\nnameEnv = " + nameEnv + "\nnameDesc = " + nameDesc );

    //
    jQuery.ajax( {
        type: 'POST',  //type of request  GET or POST
        url: '../Studio/php/delDescFlds.php',    // url to which the request is send
        data: { objid: itmid,
                projName: nameProj,
                envName: nameEnv,
                descName: nameDesc }, // data to be sent to server
        async: false,
        //            timeout: request_timeout, // timeout for request
        success: function ( return_data )
        {
            main_layout.progressOff();
//            alert( "After delDescFlds return_data: " + return_data );
            //            MainTree.deleteItem( itmid, true );
            
        },
        error: function ()
        {
            //function to be called if the request fail
            main_layout.progressOff();
            alert( 'error' );
            
        }
    } );
}
//************************************************************************************************
function delDSFlds( itmid )
{
    main_layout.progressOn();
    var nameProj = getProjName( itmid );
    var nameEnv = getEnvName( itmid );
    var nameSys = getSysName( itmid );
    var nameEng = getEngName( itmid );
    var nameDS = getDSName( itmid );
    //
    jQuery.ajax( {
        type: 'POST',  //type of request  GET or POST
        url: '../Studio/php/delDSFlds.php', // url to which the request is send
        data: { objid: itmid,
            projName: nameProj,
            envName: nameEnv,
            sysName: nameSys,
            engName: nameEng,
            DSname: nameDS
        }, // data to be sent to server
        async: false,
        //            timeout: request_timeout, // timeout for request
        success: function ( return_data )
        {
            main_layout.progressOff();
            //            alert( "After delMainTreeNode return_data: " + return_data );
            //            MainTree.deleteItem( itmid, true );

        },
        error: function ()
        {
            //function to be called if the request fail
            main_layout.progressOff();
            alert( 'error' );

        }
    } );
}
//***************************************************************************************************
function delProcFlds( itmid )
{
    main_layout.progressOn();
    //
    jQuery.ajax( {
        type: 'POST',  //type of request  GET or POST
        url: '../Studio/php/delProcFlds.php', // url to which the request is send
        data: { objid: itmid }, // data to be sent to server
        async: false,
        //            timeout: request_timeout, // timeout for request
        success: function ( return_data )
        {
            main_layout.progressOff();
            //            alert( "After delMainTreeNode return_data: " + return_data );
            //            MainTree.deleteItem( itmid, true );

        },
        error: function ()
        {
            //function to be called if the request fail
            main_layout.progressOff();
            alert( 'error' );

        }
    } );
}