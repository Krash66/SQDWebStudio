//v.3.6 build 130619

/*
Copyright Dinamenta, UAB http://www.dhtmlx.com
To use this component please contact sales@dhtmlx.com to obtain license
*/
function dhtmlXEditor(f,d){var a=this;this.skin=d||dhtmlx.skin||"dhx_skyblue";this.iconsPath=dhtmlx.image_path||"../../codebase/imgs/";typeof f=="string"&&(f=document.getElementById(f));for(this.base=f;this.base.childNodes.length>0;)this.base.removeChild(this.base.childNodes[0]);this.tbData=(this._isToolbar=this.initDhtmlxToolbar!=null&&window.dhtmlXToolbarObject!=null?!0:!1)?"":"<div class='dhxeditor_"+this.skin+"_btns'><a href='javascript:void(0);' onclick='return false;' tabindex='-1'><div actv='b' cmd='applyBold' class='dhxeditor_"+
this.skin+"_tbbtn btn_bold'></div></a><a href='javascript:void(0);' onclick='return false;' tabindex='-1'><div actv='i' cmd='applyItalic' class='dhxeditor_"+this.skin+"_tbbtn btn_italic'></div></a><a href='javascript:void(0);' onclick='return false;' tabindex='-1'><div actv='u' cmd='applyUnderscore' class='dhxeditor_"+this.skin+"_tbbtn btn_underline'></div></a><a href='javascript:void(0);' onclick='return false;' tabindex='-1'><div actv='c' cmd='clearFormatting' class='dhxeditor_"+this.skin+"_tbbtn btn_clearformat'></div></a><div class='verline_l'></div><div class='verline_r'></div></div>";
var h=_isIE?this.base.currentStyle.position:window.getComputedStyle(this.base,null).getPropertyValue("position");if(!(h=="relative"||h=="absolute"))this.base.style.position="relative";this.base.innerHTML=this.tbData+"<div style='position:absolute; width: 100%; overflow: hidden;'></div>";var g=new dhtmlXContainerLite(this.base);g.skin=this.skin;g.setContent(this.base.childNodes[this._isToolbar?0:1]);var m=this._isToolbar?0:this.base.childNodes[0].offsetHeight;this.base.adjustContent(this.base,m);this.cBlock=
document.createElement("DIV");this.cBlock.className="dhxcont_content_blocker";this.cBlock.style.display="none";this.base.appendChild(this.cBlock);this.editor=document.createElement("IFRAME");this.editor.className="dhxeditor_mainiframe_"+this.skin;this.editor.frameBorder=0;if(_isOpera)this.editor.scrolling="yes";var j=this.editor;if(_isIE)j.onreadystatechange=function(){if(j.readyState=="complete")try{this.contentWindow.document.body.attachEvent("onfocus",function(b){a._ev("focus",b)}),this.contentWindow.document.body.attachEvent("onblur",
function(b){a._ev("blur",b)}),this.contentWindow.document.body.attachEvent("onkeydown",function(b){a._ev("keydown",b)}),this.contentWindow.document.body.attachEvent("onkeyup",function(b){a._ev("keyup",b)}),this.contentWindow.document.body.attachEvent("onkeypress",function(b){a._ev("keypress",b)}),this.contentWindow.document.body.attachEvent("onmouseup",function(b){a._ev("mouseup",b)}),this.contentWindow.document.body.attachEvent("onmousedown",function(b){a._ev("mousedown",b)}),this.contentWindow.document.body.attachEvent("onclick",
function(b){a._ev("click",b)})}catch(b){}},j.onunload=function(){this.contentWindow.document.body.detachEvent("onfocus",function(){a._ev("focus",event)});this.contentWindow.document.body.detachEvent("onblur",function(){a._ev("blur",event)});this.contentWindow.document.body.detachEvent("onkeydown",function(){a._ev("keydown",event)});this.contentWindow.document.body.detachEvent("onkeyup",function(){a._ev("keyup",event)});this.contentWindow.document.body.detachEvent("onkeypress",function(){a._ev("keypress",
event)});this.contentWindow.document.body.detachEvent("onmouseup",function(){a._ev("mouseup",event)});this.contentWindow.document.body.detachEvent("onmousedown",function(){a._ev("mousedown",event)});this.contentWindow.document.body.detachEvent("onclick",function(){a._ev("click",event)})};else{var l=this.editor;j.onload=function(){this.contentWindow.addEventListener("focus",function(b){a._ev("focus",b)},!1);this.contentWindow.addEventListener("blur",function(b){a._ev("blur",b)},!1);this.contentWindow.addEventListener("keydown",
function(b){a._ev("keydown",b)},!1);this.contentWindow.addEventListener("keyup",function(b){a._ev("keyup",b)},!1);this.contentWindow.addEventListener("keypress",function(b){a._ev("keypress",b)},!1);this.contentWindow.addEventListener("mouseup",function(b){a._ev("mouseup",b)},!1);this.contentWindow.addEventListener("mousedown",function(b){a._ev("mousedown",b)},!1);this.contentWindow.addEventListener("click",function(b){a._ev("click",b)},!1)};j.onunload=function(){this.contentWindow.removeEventListener("focus",
function(b){a._ev("focus",b)},!1);this.contentWindow.removeEventListener("blur",function(b){a._ev("blur",b)},!1);this.contentWindow.removeEventListener("keydown",function(b){a._ev("keydown",b)},!1);this.contentWindow.removeEventListener("keyup",function(b){a._ev("keyup",b)},!1);this.contentWindow.removeEventListener("keypress",function(b){a._ev("keypress",b)},!1);this.contentWindow.removeEventListener("mouseup",function(b){a._ev("mouseup",b)},!1);this.contentWindow.removeEventListener("mousedown",
function(b){a._ev("mousedown",b)},!1);this.contentWindow.removeEventListener("click",function(b){a._ev("click",b)},!1)}}this._ev=function(b,a){this.callEvent("onAccess",[b,a])};this._focus=function(){_isIE?this.editor.contentWindow.document.body.focus():this.editor.contentWindow.focus()};this.base.attachObject(this.editor);this.edWin=this.editor.contentWindow;this.edDoc=this.edWin.document;this._prepareContent=function(b,a){var c="";b===!0&&this.getContent!=null&&(c=this.getContent());var e=this.editor.contentWindow.document;
e.open("text/html","replace");_isOpera?e.write("<html><head><style> html, body { overflow:auto;-webkit-overflow-scrolling: touch; padding:0px; padding-left:1px !important; height:100%; margin:0px; font-family:Tahoma; font-size:10pt; background-color:#ffffff;} </style></head><body "+(a!==!0?"contenteditable='true'":"")+" tabindex='0'></body></html>"):window._KHTMLrv?e.write("<html><head><style> html {overflow-x: auto;-webkit-overflow-scrolling: touch; overflow-y: auto;} body { overflow: auto; overflow-y: scroll;} html,body { padding:0px; padding-left:1px !important; height:100%; margin:0px; font-family:Tahoma; font-size:10pt; background-color:#ffffff;} </style></head><body "+
(a!==!0?"contenteditable='true'":"")+" tabindex='0'></body></html>"):_isIE?e.write("<html><head><style> html {overflow-y: auto;} body {overflow-y: scroll;-webkit-overflow-scrolling: touch;} html,body { overflow-x: auto; padding:0px; padding-left:1px !important; height:100%; margin:0px; font-family:Tahoma; font-size:10pt; background-color: #ffffff; outline: none;} </style></head><body "+(a!==!0?"contenteditable='true'":"")+" tabindex='0'></body></html>"):e.write("<html><head><style> html,body { overflow-x: auto; overflow-y:-webkit-overflow-scrolling: touch; scroll; padding:0px; padding-left:1px !important; height:100%; margin:0px; font-family:Tahoma; font-size:10pt; background-color:#ffffff;} </style></head><body "+
(a!==!0?"contenteditable='true'":"")+" tabindex='0'></body></html>");e.close();_isIE?e.contentEditable=a!==!0:e.designMode=a!==!0?"On":"Off";if(_isFF)try{e.execCommand("useCSS",!1,!0)}catch(h){}b===!0&&this.setContent!=null&&this.setContent(c)};this._prepareContent();this.setIconsPath=function(){};this.init=function(){};this.setSizes=function(){var b=this._isToolbar?0:this.base.childNodes[0].offsetHeight;this.base.adjustContent(this.base,b)};this._resizeTM=null;this._resizeTMTime=100;this._doOnResize=
function(){window.clearTimeout(a._resizeTM);a._resizeTM=window.setTimeout(function(){a.setSizes&&a.setSizes()},a._resizeTMTime)};this._doOnUnload=function(){window.detachEvent("onresize",this._doOnResize);window.removeEventListener("resize",this._doOnResize,!1)};dhtmlxEvent(window,"resize",this._doOnResize);this.base.childNodes[0].onselectstart=function(b){b=b||event;b.cancelBubble=!0;b.returnValue=!1;b.preventDefault&&b.preventDefault();return!1};for(var k=0;k<this.base.childNodes[0].childNodes.length-
2;k++)this.base.childNodes[0].childNodes[k].childNodes[0].onmousedown=function(){var b=this.getAttribute("cmd");typeof a[b]=="function"&&(a[b](),a.callEvent("onToolbarClick",[this.getAttribute("actv")]));return!1},this.base.childNodes[0].childNodes[k].childNodes[0].onclick=function(){return!1};this.runCommand=function(b,a){if(this._roMode!==!0){arguments.length<2&&(a=null);_isIE&&this.edWin.focus();try{var c=this.editor.contentWindow.document;c.execCommand(b,!1,a)}catch(e){}if(_isIE){this.edWin.focus();
var h=this;window.setTimeout(function(){h.edWin.focus()},1)}}};this.applyBold=function(){this.runCommand("Bold")};this.applyItalic=function(){this.runCommand("Italic")};this.applyUnderscore=function(){this.runCommand("Underline")};this.clearFormatting=function(){this.runCommand("RemoveFormat")};this._isToolbar&&this.initDhtmlxToolbar();dhtmlxEventable(this);dhtmlxEvent(this.edDoc,"click",function(b){var i=b||window.event,c=i.target||i.srcElement;a.showInfo(c)});_isOpera&&dhtmlxEvent(this.edDoc,"mousedown",
function(b){var i=b||window.event,c=i.target||i.srcElement;a.showInfo(c)});dhtmlxEvent(this.edDoc,"keyup",function(b){var i=b||window.event,c=i.keyCode,e=i.target||i.srcElement;(c==37||c==38||c==39||c==40||c==13)&&a.showInfo(e)});this.attachEvent("onFocusChanged",function(b){a._doOnFocusChanged&&a._doOnFocusChanged(b)});this.showInfo=function(b){if((b=this.getSelectionBounds().end?this.getSelectionBounds().end:b)&&this.setStyleProperty)try{if(this.edWin.getComputedStyle){var a=this.edWin.getComputedStyle(b,
null),c=a.getPropertyValue("font-weight")==401?700:a.getPropertyValue("font-weight");this.style={fontStyle:a.getPropertyValue("font-style"),fontSize:a.getPropertyValue("font-size"),textDecoration:a.getPropertyValue("text-decoration"),fontWeight:c,fontFamily:a.getPropertyValue("font-family"),textAlign:a.getPropertyValue("text-align")};if(window._KHTMLrv)this.style.fontStyle=a.getPropertyValue("font-style"),this.style.vAlign=a.getPropertyValue("vertical-align"),this.style.del=this.isStyleProperty(b,
"span","textDecoration","line-through"),this.style.u=this.isStyleProperty(b,"span","textDecoration","underline")}else a=b.currentStyle,this.style={fontStyle:a.fontStyle,fontSize:a.fontSize,textDecoration:a.textDecoration,fontWeight:a.fontWeight,fontFamily:a.fontFamily,textAlign:a.textAlign};this.setStyleProperty(b,"h1");this.setStyleProperty(b,"h2");this.setStyleProperty(b,"h3");this.setStyleProperty(b,"h4");window._KHTMLrv||(this.setStyleProperty(b,"del"),this.setStyleProperty(b,"sub"),this.setStyleProperty(b,
"sup"),this.setStyleProperty(b,"u"));this.callEvent("onFocusChanged",[this.style,a])}catch(e){return null}};this.getSelectionBounds=function(){var b,a,c,e;if(this.edWin.getSelection){var h=this.edWin.getSelection();b=h.getRangeAt(h.rangeCount-1);c=b.startContainer;e=b.endContainer;a=b.commonAncestorContainer;if(c.nodeName=="#text")a=a.parentNode;if(c.nodeName=="#text")c=c.parentNode;if(c.nodeName.toLowerCase()=="body")c=c.firstChild;if(e.nodeName=="#text")e=e.parentNode;if(e.nodeName.toLowerCase()==
"body")e=e.lastChild;c==e&&(a=c);return{root:a,start:c,end:e}}else if(this.edWin.document.selection){b=this.edDoc.selection.createRange();if(!b.duplicate)return null;a=b.parentElement();var d=b.duplicate(),g=b.duplicate();d.collapse(!0);g.moveToElementText(d.parentElement());g.setEndPoint("EndToStart",d);c=d.parentElement();d=b.duplicate();g=b.duplicate();g.collapse(!1);d.moveToElementText(g.parentElement());d.setEndPoint("StartToEnd",g);e=g.parentElement();if(c.nodeName.toLowerCase()=="body")c=c.firstChild;
if(e.nodeName.toLowerCase()=="body")e=e.lastChild;c==e&&(a=c);return{root:a,start:c,end:e}}return null};this.getContent=function(){return this.edDoc.body?_isFF?this.editor.contentWindow.document.body.innerHTML.replace(/<\/{0,}br\/{0,}>\s{0,}$/gi,""):_isIE&&this.edDoc.body.innerText.length==0?"":this.edDoc.body.innerHTML:""};this.setContent=function(b){b=b||"";if(this.edDoc.body){if(navigator.userAgent.indexOf("Firefox")!=-1){if(typeof this._ffTest=="undefined")this.editor.contentWindow.document.body.innerHTML=
"",this.runCommand("InsertHTML","test"),this._ffTest=this.editor.contentWindow.document.body.innerHTML.length>0;this._ffTest?this.editor.contentWindow.document.body.innerHTML=b:(this.editor.contentWindow.document.body.innerHTML="",b.length==0&&(b=" "),this.runCommand("InsertHTML",b))}else this.editor.contentWindow.document.body.innerHTML=b;this.callEvent("onContentSet",[])}else dhtmlxEvent(this.edWin,"load",function(){a.setContent(b)})};this.setContentHTML=function(a){(new dtmlXMLLoaderObject(this._ajaxOnLoad,
this,!1,!0)).loadXML(a)};this._ajaxOnLoad=function(a,h,c,e,d){d.xmlDoc.responseText&&a.setContent(d.xmlDoc.responseText)}}
function dhtmlXContainerLite(f){var d=this;this.obj=f;this.dhxcont=null;this.setContent=function(a){this.dhxcont=a;this.dhxcont.innerHTML="<div style='position: relative; left: 0px; top: 0px; overflow: hidden;'></div>";this.dhxcont.mainCont=this.dhxcont.childNodes[0];this.obj.dhxcont=this.dhxcont};this.obj._genStr=function(a){for(var h="",d="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",f=0;f<a;f++)h+=d.charAt(Math.round(Math.random()*(d.length-1)));return h};this.obj.adjustContent=
function(a,d,g,f,j){this.dhxcont.style.left=(this._offsetLeft||0)+"px";this.dhxcont.style.top=(this._offsetTop||0)+d+"px";var l=a.clientWidth+(this._offsetWidth||0);if(f!==!0)this.dhxcont.style.width=Math.max(0,l)+"px";if(f!==!0&&this.dhxcont.offsetWidth>l)this.dhxcont.style.width=Math.max(0,l*2-this.dhxcont.offsetWidth)+"px";var k=a.clientHeight+(this._offsetHeight||0);this.dhxcont.style.height=Math.max(0,k-d)+(g!=null?g:0)+"px";if(this.dhxcont.offsetHeight>k-d)this.dhxcont.style.height=Math.max(0,
(k-d)*2-this.dhxcont.offsetHeight)+"px";if(j&&!isNaN(j))this.dhxcont.style.height=Math.max(0,parseInt(this.dhxcont.style.height)-j)+"px";if(this._minDataSizeH!=null&&parseInt(this.dhxcont.style.height)<this._minDataSizeH)this.dhxcont.style.height=this._minDataSizeH+"px";if(this._minDataSizeW!=null&&parseInt(this.dhxcont.style.width)<this._minDataSizeW)this.dhxcont.style.width=this._minDataSizeW+"px";if(f!==!0&&(this.dhxcont.mainCont.style.width=this.dhxcont.clientWidth+"px",this.dhxcont.mainCont.offsetWidth>
this.dhxcont.clientWidth))this.dhxcont.mainCont.style.width=Math.max(0,this.dhxcont.clientWidth*2-this.dhxcont.mainCont.offsetWidth)+"px";var b=this.menu!=null?!this.menuHidden?this.menuHeight:0:0,i=this.toolbar!=null?!this.toolbarHidden?this.toolbarHeight:0:0,c=this.sb!=null?!this.sbHidden?this.sbHeight:0:0;this.dhxcont.mainCont.style.height=this.dhxcont.clientHeight+"px";if(this.dhxcont.mainCont.offsetHeight>this.dhxcont.clientHeight)this.dhxcont.mainCont.style.height=Math.max(0,this.dhxcont.clientHeight*
2-this.dhxcont.mainCont.offsetHeight)+"px";this.dhxcont.mainCont.style.height=Math.max(0,parseInt(this.dhxcont.mainCont.style.height)-b-i-c)+"px"};this.obj.attachToolbar=function(){var a=document.createElement("DIV");a.style.position="relative";a.style.overflow="hidden";a.id="dhxtoolbar_"+this._genStr(12);this.dhxcont.insertBefore(a,this.dhxcont.childNodes[this.menu!=null?1:0]);this.toolbar=new dhtmlXToolbarObject(a.id,this.skin);d.skin=="dhx_web"?(this.toolbarHeight=32,this.dhxcont.className="dhtmlx_editor_extended_"+
d.skin):d.skin=="dhx_terrace"?(this._attached?(this.toolbarHeight=46,a.style.marginBottom="14px"):(this.toolbarHeight=34,a.style.marginTop="2px",a.style.marginLeft="2px",a.style.marginBottom="2px"),this.dhxcont.className="dhtmlx_editor_extended_"+d.skin):this.toolbarHeight=a.offsetHeight+(this._isLayout&&this.skin=="dhx_skyblue"?2:0);this.toolbarId=a.id;this._doOnAttachToolbar&&this._doOnAttachToolbar("init");this.adjust();return this.toolbar};this.obj.attachObject=function(a,d){typeof a=="string"&&
(a=document.getElementById(a));if(d){a.style.visibility="hidden";a.style.display="";var f=a.offsetWidth,m=a.offsetHeight}this._attachContent("obj",a);if(d&&this._isWindow)a.style.visibility="visible",this._adjustToContent(f,m)};this.obj.adjust=function(){if(this.skin=="dhx_skyblue"&&this.toolbar){if(this._isWindow||this._isLayout)document.getElementById(this.toolbarId).style.height="29px",this.toolbarHeight=document.getElementById(this.toolbarId).offsetHeight,this._doOnAttachToolbar&&this._doOnAttachToolbar("show");
this._isCell&&(document.getElementById(this.toolbarId).className+=" in_layoutcell");this._isAcc&&(document.getElementById(this.toolbarId).className+=" in_acccell")}};this.obj._attachContent=function(a,f,g){for(;d.dhxcont.mainCont.childNodes.length>0;)d.dhxcont.mainCont.removeChild(d.dhxcont.mainCont.childNodes[0]);if(a=="obj"){if(this._isWindow&&f.cmp==null&&this.skin=="dhx_skyblue")this.dhxcont.mainCont.style.border="#a4bed4 1px solid",this.dhxcont.mainCont.style.backgroundColor="#FFFFFF",this._redraw();
d.dhxcont._frame=null;d.dhxcont.mainCont.appendChild(f);d.dhxcont.mainCont.style.overflow=g===!0?"auto":"hidden";f.style.display=""}};this.obj._dhxContDestruct=function(){for(;this.dhxcont.mainCont.childNodes.length>0;)this.dhxcont.mainCont.removeChild(this.dhxcont.mainCont.childNodes[0]);this.dhxcont.mainCont.innerHTML="";this.dhxcont.mainCont=null;try{delete this.dhxcont.mainCont}catch(a){}for(;this.dhxcont.childNodes.length>0;)this.dhxcont.removeChild(this.dhxcont.childNodes[0]);this.dhxcont.innerHTML=
"";this.dhxcont=null;try{delete this.dhxcont}catch(d){}this.attachToolbar=this.adjustContent=this.moveContentTo=this.attachObject=this.adjust=this._dhxContDestruct=this._attachContent=this._genStr=null}}(function(){dhtmlx.extend_api("dhtmlXEditor",{_init:function(f){return[f.parent,f.skin]},content:"setContent"},{})})();
dhtmlXEditor.prototype.unload=function(){if(this._isToolbar)this._unloadExtModule();else for(;this.base.childNodes[0].childNodes.length>0;){if(this.base.childNodes[0].childNodes[0].tagName&&String(this.base.childNodes[0].childNodes[0].tagName).toLowerCase()=="a")this.base.childNodes[0].childNodes[0].childNodes[0].onclick=null,this.base.childNodes[0].childNodes[0].childNodes[0].onmousedown=null,this.base.childNodes[0].childNodes[0].removeChild(this.base.childNodes[0].childNodes[0].childNodes[0]);this.base.childNodes[0].removeChild(this.base.childNodes[0].childNodes[0])}this.tbData=
this.base.childNodes[0].onselectstart=null;this.detachAllEvents();_isIE?this.editor.onreadystatechange=null:this.editor.onload=null;this.editor.parentNode.removeChild(this.editor);this.edWin=this.edDoc=this.editor=this.editor.onunload=null;this.base._dhxContDestruct();this.base._idd=null;for(this.base.name=null;this.base.childNodes.length>0;)this.base.removeChild(this.base.childNodes[0]);this.unload=this.isReadonly=this.setReadonly=this.setContentHTML=this.setContent=this.getContent=this.getSelectionBounds=
this.showInfo=this.detachAllEvents=this.detachEvent=this.eventCatcher=this.checkEvent=this.callEvent=this.attachEvent=this.clearFormatting=this.applyUnderscore=this.applyItalic=this.applyBold=this.runCommand=this.setSizes=this.init=this.setIconsPath=this._doOnUnload=this._doOnResize=this._prepareContent=this._focus=this._ev=this._ajaxOnLoad=this.iconsPath=this.skin=this._resizeTMTime=this._resizeTM=this._isToolbar=this.cBlock=this.base=null};
dhtmlXEditor.prototype.setReadonly=function(f){this._roMode=f===!0;this._prepareContent(!0,this._roMode);this.cBlock.style.display=this._roMode?"":"none"};dhtmlXEditor.prototype.isReadonly=function(){return this._roMode||!1};

//v.3.6 build 130619

/*
Copyright Dinamenta, UAB http://www.dhtmlx.com
To use this component please contact sales@dhtmlx.com to obtain license
*/