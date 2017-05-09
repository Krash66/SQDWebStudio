//
// SQData Tree functions
//****************************************************************************************************
//
// Load Main Tree
//****************************************************************************************************
function loadMainTree( id, nameProj )
{
    try
    {
    //    alert( 'loadMainTree project name = ' + nameProj + '\n' + 'Project Number: ' + id );
        main_layout.progressOn();
    //   
        jQuery.ajax({
            type: 'POST',  //type of request  GET or POST
            url: '../Studio/php/GetMainTree.php', // url to which the request is send
            data: { id: id, projName: nameProj }, // data to be sent to server
    //            timeout: request_timeout, // timeout for request
            success: function(return_data)
            {
                // function to be called if the request succeeds
//                    alert( "Before Tree load data: " + return_data ); // return data
                MainTree.loadXMLString( return_data, function ()
                    {
                        main_layout.progressOff();
//                        alert( "After Tree load data: " + return_data );
                        MainTree.openAllItems( '0' );
                        MainTree.openItem( nameProj );
                        MainTree.selectItem( nameProj );
                    } );
            },
            error: function(e)
            {
                //function to be called if the request fail
                main_layout.progressOff();
                alert('error loading MainTree: ' + e.message);
            }
        });
    }
    catch ( err )
    {
        logError( err.message, err.name, "MainTree.js", "function loadMainTree( id, nameProj )" );
    }
}
//
//Add a Main Tree node to the DB with all it's user data
//****************************************************************************************************
function addNode( ndTPid, ndObjPid, ndName, ndSQDtype, ndIcon, ndFun, i1, i2, i3, ndType, tabId , repeat, descType, IsDesc)
{
    try
    {
        //        alert('TreeParentId: ndTPid = ' + ndTPid + '\n' + 'ObjParentId: ndObjPid = ' + ndObjPid + '\n' + 'New Node Name: ndName = ' + ndName + '\n' + 'New Node Icon: Icon = ' + ndIcon + '\n' + 'tabid:  ' + tabId + '\n' + 'descType:  ' + descType);

        var isDesc = false;
        if (IsDesc === true)
        {
            isDesc = true;
        };
        main_layout.progressOn();
        // Add  Node
        var NewId;
        if ( ndSQDtype == 'objProj' )
        {
            NewId = ndName;
        }
        else if ( ndType == 'folder' )
        {
            NewId = ndObjPid + "." + ndSQDtype;
//            alert('folder NewId = ' + NewId);
        }
        else if (isDesc == true)
        {
            NewId = ndObjPid + "." + ndName + "." + descType;
//            alert('IsDesc NewId = ' + NewId);
        }
        else
        {
            NewId = ndObjPid + "." + ndName;
//            alert('else NewId = ' + NewId);
        };

        MainTree.insertNewChild( ndTPid, NewId, ndName, 0, i1, i2, i3 );  //tmpTPid
        MainTree.setUserData( NewId, 'sqdType', ndSQDtype );
        MainTree.setUserData( NewId, 'Icon', ndIcon );
        MainTree.setUserData( NewId, 'loadFunction', ndFun );
        MainTree.setUserData( NewId, 'tabId', tabId );

        // Add node to DB into table maintree
        jQuery.post( '../Studio/php/addTreeNode.php',
            {
                projName: CURproj,
                objid: NewId,
                parentId: ndTPid,
                text: ndName,
                im0: i1,
                im1: i2,
                im2: i3,
                sqdType: ndSQDtype,
                loadFunction: ndFun,
                Icon: ndIcon,
                tabId: tabId
            },
            function ( data, status, xhr )
            {
                if ( status == 'success' )
                {
                    main_layout.progressOff();
//                                        alert( "Status: " + status + "\nReturn data: " + data );
                    MainTree.openItem( NewId );
                    MainTree.selectItem( NewId );
                    // So Engine folders add in correct order
                    if ( repeat == true ) { addNextNode() };
                } else
                {
                    main_layout.progressOff();
                    alert( "Error adding MainTree node: " + status + "\nReturn data: " + data );
                };
            },
            'text' );
    }
    catch ( err )
    {
        logError( err.message, err.name, "MainTree.js", "function addNode( ndTPid, ndObjPid, ndName, ndSQDtype, ndIcon, ndFun, i1, i2, i3, ndType, tabId , repeat)" );
    }
}

//
// Load Field Tree
//****************************************************************************************************      
function loadFldTree( objId )
{
    try
    {
        //    alert( 'loadMainTree project name = ' + nameProj + '\n' + 'Project Number: ' + id );
        main_layout.progressOn();
        //   
        jQuery.ajax( {
            type: 'POST',  //type of request  GET or POST
            url: '../Studio/php/GetFieldTree.php', // url to which the request is send
            data: { descId: descId }, // data to be sent to server
            success: function ( return_data )
            {
                // function to be called if the request succeeds
                //                alert( "Before Tree load data: " + return_data ); // return data
                ctlPropFieldTree.loadXMLString( return_data, function ()
                {
//                    main_layout.progressOff();
                    //                        alert( "After Tree load data: " + return_data );
               
                } );
            },
            error: function ()
            {
                //function to be called if the request fail
                main_layout.progressOff();
                alert( 'error loading field tree' );
            }
        } );
    }
    catch ( err )
    {
        logError( err.message, err.name, "MainTree.js", "function loadFldTree( objId )" );
    }
}
//
//Add a Field Tree node to the DB with all it's user data
//****************************************************************************************************
function addDescFldNode(ndTPid, ndObjPid, ndName, ndIcon, i1, i2, i3, ischecked, descId, seqno, dType)
{
    try
    {
//        alert( 'Add description field tree node ... descId: '+ descId );

        main_layout.progressOn();
        // Add  Node
        var NewId = descId + "." + ndName;

//        alert('NewId = ' + NewId);

        var ret = "";

        jQuery.ajax( {
            type: 'POST',  //type of request  GET or POST
            url: '../Studio/php/addDescFldTreeNode.php', // url to which the request is send
            data: {
                objid: NewId,
                projName: CURproj,
                parentId: ndTPid,
                text: ndName,
                im0: i1,
                im1: i2,
                im2: i3,
                checked: ischecked,
                descId: descId,
                descType: dType,
                seqno: seqno
            }, // data to be sent to server
            async: false,
            success: function ( return_data )
            {
    //            alert( "Before Tree load data: " + return_data ); // return data
//                main_layout.progressOff();
//                alert( "After Tree load data: " + return_data );
                ret = "true";
            },
            error: function ()
            {
                //function to be called if the request fail
                main_layout.progressOff();
                alert( 'error adding description field nodes' );
                ret = "false";
            }
        } );
    //    alert( "ret = " + ret );
        return ret;
    }
    catch ( err )
    {
        logError( err.message, err.name, "MainTree.js", "function addDescFldNode( ndTPid, ndObjPid, ndName, ndIcon, i1, i2, i3, ischecked, descId, seqno )" );
    }
}