var bInfoquery = true;
var bAlarm = false;
var bDm = false;
var bOperation = false;
var bSystemset = false;
var bMyaccount = false;
var globalSelectId = "";
var globalSelectGroupId = "itm_infoquery";
var DEFAULT_SEARCH_TEXT = "MAC/�ֻ���/��������";
function f_MacGlobalContext(){
//˽�б���
	this.id_operation_status = -1;
	this.globalInfoMac = "";
	this.globalInfoTime = "";
	this.phoneNumber = ""; 
//�����ӿ�
	this.getIdOperationStatus = function(){
        return this.id_operation_status;
    }
	this.setIdOperationStatus = function(status){
		this.id_operation_status = status;
	}

	this.getGlobalInfoMac = function(){
		return this.globalInfoMac;
	}
	this.getGlobalInfoTime = function(){
		return this.globalInfoTime;
	}
	this.setGlobalInfoMac = function(mac){
		this.globalInfoMac = mac;
	}
	this.setGlobalInfoTime = function(tm){
		this.globalInfoTime = tm;
	}
	this.getPhoneNumber = function(){
		return this.phoneNumber;
	}
	this.setPhoneNumber = function(number){
		this.phoneNumber = number;
	}
//���߷���
    this.isInFocus = function(itmid){
		var tabs_center=Ext.getCmp("layout_center");
		var activeTab = tabs_center.getActiveTab();
		//if (activeTab || (typeof activeTab == "undefined")){
		if (!activeTab || typeof(activeTab)=="undefined" || activeTab==0){
			if(tabs_center.items.length>0){
				activeTab = tabs_center.items.items[0];
			}else{
				return false;
			}
		}
		if(activeTab.id == itmid){
			return true;
		}else{
			return false;
		}
	}

}

var macGlobalCtx = new f_MacGlobalContext(); 

var mapInfoquery = {
	'id_infoquery_mac':['itm_infoquery_mac','MAC��־��ѯ','mac_infoquery_mac'], 
	'id_infoquery_hotspot':['itm_infoquery_hotspot','�ȵ��ѯ','mac_infoquery_hotspot'], 
	'id_infoquery_place':['itm_infoquery_place','������Ϣ��ѯ','mac_infoquery_place'],
	'id_infoquery_move':['itm_infoquery_move','�ƶ��ɼ��豸','mac_infoquery_move'], 
	'id_infoquery_id':['itm_infoquery_id','ʵʱ��Ϣ','mac_infoquery_current'],
	'id_infoquery_vid':['itm_infoquery_vid','���������־','mac_infoquery_vid']
	
};
var mapAlarm = {
	'id_alarm_controlmanage':['itm_alarm_controlmanage','���ع���','mac_monitoralarm_controlmanage'],
	'id_alarm_warnlog':['itm_alarm_warnlog','�澯��Ϣ��ѯ','mac_monitoralarm_warnlog'],
	'id_alarm_peoplecalled':['itm_alarm_peoplecalled','�Ӿ���Ա����','mac_monitoralarm_peoplecalled']
};
var mapDm = {
	'id_dm_bab':['itm_dm_bab','������Ϊ����','mac_dm_bab'], 
	'id_dm_sample':['itm_dm_sample','��������','mac_dm_sample'],
	'id_dm_freCharact':['itm_dm_freCharact','��Ƶ�η���','mac_dm_freCharact'],
	'id_dm_track':['itm_dm_track','�켣����','mac_dm_track'],
	'id_dm_sus':['itm_dm_sus','�����ȵ����','mac_dm_sus'],
	'id_dm_crowd':['itm_dm_crowd','��������','mac_dm_crowd']
};
var mapOperation = {
	'id_operation_equipment':['itm_operation_equipment','�豸����','mac_operation_equipment'],
	'id_operation_dwsz':['itm_operation_dwsz','��λ����','mac_operation_dwsz'],
	'id_operation_normally':['itm_operation_normally','�ȵ����','mac_operation_normally'],
	'id_operation_place':['itm_operation_place','��������','mac_operation_place'],
	'id_operation_safety':['itm_operation_safety','��ȫ���̹���','mac_operation_safety'],
	'id_operation_terminal':['itm_operation_terminal','�ն���Ϣ����','mac_operation_terminal']
};
var mapSystemset = {
	'id_systemset_admin':['itm_systemset_admin','����Ա�˺�','mac_systemset_admin'],
	'id_systemset_alarm':['itm_systemset_alarm','ϵͳ��ά�澯','mac_systemset_alarm'],
	'id_systemset_preferences':['itm_systemset_preferences','Ȩ�޹���','mac_systemset_preferences'],
	'id_systemset_log':['itm_systemset_log','����Ա��־','mac_systemset_log'],
	'id_systemset_para':['itm_systemset_para','ϵͳ��������','mac_systemset_para']
	
};
var mapMyaccount = {
	'id_myaccount_username':['itm_myaccount_username','�޸�����','mac_myaccount_username'],
	'id_myaccount_toolbar':['itm_myaccount_toolbar','�ҵĹ�����','mac_myaccount_toolbar']
};
var listAllMap = [mapInfoquery, mapAlarm, mapDm, mapOperation, mapSystemset,mapMyaccount];
var left_tabs_glob='';


function searchMouseDown(){
	document.getElementById("imgbtn_search").src="/images/mac/top_icon/btn_search_click.png";
}

function searchMouseUp(){
	document.getElementById("imgbtn_search").src="/images/mac/top_icon/btn_search_normal.png";
}

function getItemShowCount(itmid){
	var myMap = {};
	var count = 0;
	if("itm_infoquery" == itmid){
		myMap = mapInfoquery;
	}else if("itm_alarm" == itmid){
		myMap = mapAlarm;
	}else if("itm_dm" == itmid){
		myMap = mapDm;
	}else if("itm_operation" == itmid){
		myMap = mapOperation;
	}else if("itm_systemset" == itmid){
		myMap = mapSystemset;
	}else if("itm_myaccount" == itmid){
		myMap = mapMyaccount;
	}
	for(var i in myMap){
		if(Ext.getCmp(i).menustatus == 1){
			count ++;
		}
	}
	return count;
}

function getRecordById(id){
	for(var i in listAllMap){
		for(var j in listAllMap[i]){
			if(j == id){
				return listAllMap[i][j];
			}
		}
	}
}

function jumpToDestPage(resultId, mac){
	var recordClt = getRecordById(resultId);
	var itemid = recordClt[0];
	var title = recordClt[1];
	var srcurl = "ncViewer."+recordClt[2];
 	//չʾ��ȡ����ҳ��
	var tabs_center=Ext.getCmp("layout_center");
	var tab_len=tabs_center.items.length;
	var m = 0;
	var i = 0;
	tabs_center.items.each(
		function(item){ 
			if(itemid==item.id){ 
				i++;
			}
			if(i==0){m++;}
		}
	);   
	if(i>0){
		tabs_center.setActiveTab(m);
		try{
			eval("lan_itm_infoquery_mac_s").setFieldMac(mac);
		}catch(e){
			
		}
		try{
			eval("lan_itm_infoquery_mac_s").setFieldVname(mac);
		}catch(e){
			
		}
		
		try{
			eval("lan_"+itemid+"_s").id_operation_tabload();
		}catch(e){
			
		}
		/*
		try{
			eval("lan_itm_operation_equipment_s").id_operation_tabload();
		}catch(e){
			
		}	
		try{
			eval("lan_itm_infoquery_mac_s").id_operation_tabload();			
		}catch(e){
			
		}
		try{
			eval("lan_itm_systemset_alarm_s").id_operation_tabload();			
		}catch(e){
			
		}	
		*/		
		return;
    } 
	if(tab_len>5){
		tabs_center.remove(0); 
	}
	var grid=Ext.create(srcurl);         	
	tabs_center.add({
		closable: true,
		autoScroll:false,
		id:itemid,          
		title: title,
		items:[grid]
	}).show();
	//eval("lan_itm_infoquery_mac_s").setFieldMac(mac);
	//eval("lan_itm_infoquery_mac_s").setFieldVname(mac);
}



function showMacWindow_freCharact(mac, tm){
	eval("lan_itm_dm_freCharact_s").setPlaceValue(mac);
	winSearchListFre.hide();
}
function showMacWindow(mac, tm){	
	macGlobalCtx.setGlobalInfoMac(mac);
	macGlobalCtx.setGlobalInfoTime(tm);
	var tabPanel = new Ext.TabPanel({
		title: '��������',
		frame: true,        
		layout: 'form',
        activeTab: 0,
        items: [
			{
				title: 'Ƶ�����ֵ�ʱ��',
				html: '<iframe src="/mac/infoquery/macterm/featureanalysis/ChosenMacTimeOftenCount.html" frameborder="no" style="width:100%;height:1000px;"></iframe>'
			},{
				title: 'Ƶ�����ֵĳ���',
				html: '<iframe src="/mac/infoquery/macterm/featureanalysis/ChosenMacPlaceOftenCount.html" frameborder="no" style="width:100%;height:1000px;"></iframe>'
            },{
				title: 'Ƶ�����ֵĳ�������',
				html: '<iframe src="/mac/infoquery/macterm/featureanalysis/ChosenMacPlaceTypeOftenCount.html" frameborder="no" style="width:100%;height:1000px;"></iframe>'
            }
		]
    });
	var tabPanelmap = new Ext.Panel({
		title:'��Ա�켣',
		frame: true,
        layout: 'form',
        activeTab: 0,
        items: [{
			html: '<iframe src="/mac/datamining/track/track.htm" frameborder="no" style="width:100%;height:500px;"></iframe>'			
        }]
    });
	var tabPaneledit = new Ext.Panel({
		frame: true,
        layout: 'form',
		title:'��ݲ鿴',
        activeTab: 0,
		items:[{
			html: '<iframe src="/mac/infoquery/macterm/idcheck/idcheck.html" frameborder="no" style="width:100%;height:1000px;"></iframe>'
		}]			
	});
		
	var tb = Ext.createWidget('tabpanel', {
		resizeTabs: true,
		enableTabScroll: true,
		region:'center',
    	id:'macClipCenter',
    	margins: '2 2 1 0',
		defaults: {
			autoScroll: false,
			bodyPadding: 0
		},
		items: [tabPanel, tabPanelmap, tabPaneledit]
	});
	
	var win = Ext.widget('window', {
        title: mac,
		//closeAction: 'hide',
        x:50,
        y:80,
        width: 950,
		height: 540,
        resizable: false,
        draggable:true,
        modal:true,
        items: tb 
    });
       
    win.show();
}
var globalRDMac;
function getRDMac(){
	return globalRDMac;
}
function showOneMac(rdMac){
	globalRDMac = rdMac;
	var tabPaneledit = new Ext.Panel({
		frame: false,
        layout: 'form',
        activeTab: 0,
		items:[{
			html: '<iframe src="/mac/operation/normally/ncs_keyword_mac.htm" frameborder="no" style="width:100%;height:900px;"></iframe>'
		}]			
	});
	
	win = new Ext.Window ({
		title:"�ȵ�mac",
		x:300,
		y:100,
		width:290,
		height:350,
		bodyPadding: 0,
		modal:true,
		resizable:false,
		//draggable:false,
		items: tabPaneledit                                               
	});
	win.show();  	
}

var winSearchListFre;
function showSearchResult_freCharact(mac){
	var tabPaneledit = new Ext.Panel({
		frame: false,
        layout: 'form',
        activeTab: 0,
		items:[{
			html: '<iframe src="/mac/searchResult_freCharact.html" frameborder="no" style="width:100%;height:900px;"></iframe>'
		}]			
	});
	
	winSearchListFre = new Ext.Window ({
		title:"����["+mac+"]���",
		x:300,
		y:100,
		width:290,
		height:350,
		bodyPadding: 0,
		modal:true,
		resizable:false,
		//draggable:false,
		items: tabPaneledit                                               
	});
	winSearchListFre.show();  
}

function showSearchResult(){ 
	var tabPaneledit = new Ext.Panel({
		frame: false,
        layout: 'form',
        activeTab: 0,
		items:[{
			html: '<iframe src="/mac/searchResult.html" frameborder="no" style="width:100%;height:900px;"></iframe>'
		}]			
	});
	
	win = new Ext.Window ({
		title:"����["+searchKeyword+"]���",
		x:300,
		y:100,
		width:290,
		height:350,
		bodyPadding: 0,
		modal:true,
		resizable:false,
		//draggable:false,
		items: tabPaneledit                                               
	});
	win.show();  
}
var searchKeyword = "";
function getNeedMac(mac){
	str =  (mac.replace(/(.{2})/g,'$1-'));
	return str.substr(0, str.length-1);
}


var globalWaitDialog = "";
function showWaitDialog(){
	if(globalWaitDialog == ""){
		globalWaitDialog =  new Ext.Window ({
			x:window.screen.width/2-50,
			y:window.screen.height/2-40,
			width:100,
			height:80,
			bodyPadding: 0,
			header:false,
			modal:true,
			frame:false,
			plain:true,
			resizable:false,
			//cls:"cls_wait"
			//draggable:false,
			html:'<div class="cls_wait"><img src="/images/mac/wait.gif"/></div>'                                             
		});
	}
	globalWaitDialog.show();
}

function closeWaitDialog(){
	if(globalWaitDialog != "")
		globalWaitDialog.hide();
}

function doSearchClick(){
	searchClick();
}

function doSearchByKeyword_freCharact(tKeyword)
{
	showWaitDialog();
	//Ext.MessageBox.wait("���ڴ������Ժ�...", "�ȴ�");
	Ext.Ajax.request({     
		url: '/pronline/Msg?FunName@macFrontPageSearch&groupid@'+getGlobalGroupId+"&keyword@"+tKeyword,  
		method: 'GET',
		success: function(resp,opts) { 
			closeWaitDialog();
			//Ext.MessageBox.close();
			try{
				var respText = resp.responseText; 
				var respRecord = eval("("+respText+")");
				if(respRecord.result == "0"){
					if(respRecord.totalCount == 0){
						alert("δ��ѯ��["+tKeyword+"]�Ľ��!!");	
						eval("lan_itm_dm_freCharact_s").setPlaceValue(tKeyword);
					}else if(respRecord.totalCount == 1){
						eval("lan_itm_dm_freCharact_s").setPlaceValue(getNeedMac(respRecord.data[0].mac));
					}else{
						showSearchResult_freCharact(getNeedMac(respRecord.data[0].mac));
					}	
				}else if(respRecord.result == "1"){
					macGlobalCtx.setPhoneNumber(respRecord.data[0].mac);
					jumpToDestPage(respRecord.itemid, respRecord.data[0].mac);
				}else{
					alert("���ʹ���");
				}
			
			}catch(e){
				//console.log(e.message);
			}										
		},   
		failure: function(resp,opts) {   
			closeWaitDialog();
			var respText = eval("("+respText+")");
			alert('����', respText.error);   
		}   				 
	});		
}

function doSearchByKeyword(tKeyword)
{
	showWaitDialog();
	//Ext.MessageBox.wait("���ڴ������Ժ�...", "�ȴ�");
	Ext.Ajax.request({     
		url: '/pronline/Msg?FunName@macFrontPageSearch&groupid@'+getGlobalGroupId+"&keyword@"+tKeyword,  
		method: 'GET',
		success: function(resp,opts) { 
			closeWaitDialog();
			//Ext.MessageBox.close();
			try{
				var respText = resp.responseText; 
				var respRecord = eval("("+respText+")");
				if(respRecord.result == "0"){
					if(respRecord.totalCount == 0){
						alert("δ��ѯ��["+tKeyword+"]�Ľ��!!");	
					}else if(respRecord.totalCount == 1){
						showMacWindow(getNeedMac(respRecord.data[0].mac), "");
					}else{
						showSearchResult();
					}	
				}else if(respRecord.result == "1"){
					macGlobalCtx.setPhoneNumber(respRecord.data[0].mac);
					jumpToDestPage(respRecord.itemid, respRecord.data[0].mac);
				}else{
					alert("���ʹ���");
				}
			
			}catch(e){
				//console.log(e.message);
			}										
		},   
		failure: function(resp,opts) {   
			Ext.MessageBox.close();
			var respText = eval("("+respText+")");
			alert('����', respText.error);   
		}   				 
	});		
}

function searchClick(){
	searchKeyword = document.getElementById("id_search_input").value;
	if(searchKeyword == DEFAULT_SEARCH_TEXT){
		alert("��������������!!");
		return;
	}
	doSearchByKeyword(searchKeyword);
}


function doFocus(){
	if(document.getElementById("id_search_input").value == DEFAULT_SEARCH_TEXT){
		document.getElementById("id_search_input").value="";	
	}	
}

function doBlur(){
	if(document.getElementById("id_search_input").value == ''){
		document.getElementById("id_search_input").value=DEFAULT_SEARCH_TEXT;	
	}	
}

function EnterPress(e){ //���� event

} 

function doKeyPress(e){
	var e = e || window.event;
	if(e.keyCode == 13){
		searchClick();
	}	
}


function setItemStatById(id, isNormal){
	var hasFound = false;
	for(i in listAllMap){
		for(key in listAllMap[i]){
			if(key == id){
				hasFound = true;
				if(isNormal){
					Ext.getCmp(key).setText('<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+listAllMap[i][key][1]+'</font>');
				}else{
					Ext.getCmp(key).setText('<font style="font-size : 12px !important;color:#0D3967;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+listAllMap[i][key][1]+'</font>');
				}
				break;
			}
		}
		if(hasFound == true)
			break;
	}
}

function toggleFirstByGroupId(itemid, isVisible){
	if(itemid == "itm_infoquery"){
		toggleInfoquery(isVisible);
	}else if(itemid == "itm_alarm"){
		toggleAlarm(isVisible);
	}else if(itemid == "itm_dm"){
		toggleDm(isVisible);
	}else if(itemid == "itm_operation"){
		toggleOperation(isVisible);
	}else if(itemid == "itm_systemset"){
		toggleSystemset(isVisible);
	}else if(itemid == "itm_myaccount"){
		toggleMyaccount(isVisible);
	}
}

function getIdByItemid(itemid){
	var tmpGroupId = globalSelectGroupId;
	var hasFound = false;
	var resultId = "id_frontPage";
	for(var i in mapInfoquery){
		if(mapInfoquery[i][0] == itemid){
			tmpGroupId = "itm_infoquery";
			resultId = i;
			hasFound = true;
			break;
		}
	}
	if(hasFound == false){
		for(var i in mapAlarm){
			if(mapAlarm[i][0] == itemid){
				tmpGroupId = "itm_alarm";
				resultId = i;
				hasFound = true;
				break;
			}
		}
	}
	if(hasFound == false){
		for(var i in mapDm){
			if(mapDm[i][0] == itemid){
				tmpGroupId = "itm_dm";
				resultId = i;
				hasFound = true;
				break;
			}
		}
	}
	if(hasFound == false){
		for(var i in mapOperation){
			if(mapOperation[i][0] == itemid){
				tmpGroupId = "itm_operation";
				resultId = i;
				hasFound = true;
				break;
			}
		}
	}
	if(hasFound == false){
		for(var i in mapSystemset){
			if(mapSystemset[i][0] == itemid){
				tmpGroupId = "itm_systemset";
				resultId = i;
				hasFound = true;
				break;
			}
		}
	}
	if(hasFound == false){
		for(var i in mapMyaccount){
			if(mapMyaccount[i][0] == itemid){
				tmpGroupId = "itm_myaccount";
				resultId = i;
				hasFound = true;
				break;
			}
		}
	}
	if(globalSelectGroupId!=tmpGroupId){
		//�ı�һ���˵�������
		toggleFirstByGroupId(globalSelectGroupId, false);
		toggleFirstByGroupId(tmpGroupId, true);
		globalSelectGroupId = tmpGroupId;
	}
	return resultId;
}

function toggleClickItem(itemid){
	//�Ѿɵĸ�Ϊ��ͨ��ʽ
	if(globalSelectId != ""){
		setItemStatById(globalSelectId, true);
	}
	globalSelectId = getIdByItemid(itemid);//item.id;
	setItemStatById(globalSelectId, false);
}

function setGroupHeader(isExpand, groupId){
	var groupHeader = Ext.getCmp(groupId);
	if(isExpand){
		if(groupHeader.hasCls("bkmenun_"+groupId)){
			groupHeader.removeCls("bkmenun_"+groupId);
			groupHeader.addCls("bkmenuf_"+groupId);
		}
	}else{
		if(groupHeader.hasCls("bkmenuf_"+groupId)){
			groupHeader.removeCls("bkmenuf_"+groupId);
			groupHeader.addCls("bkmenun_"+groupId);			
		}
	}
}

function toggleInfoquery(bVisible){
	bInfoquery = bVisible;
	setGroupHeader(bInfoquery, "id_infoquery");
	var itm;
	for (i in mapInfoquery){
		itm=Ext.getCmp(i);
		if(itm.menustatus == 1){
			itm.setVisible(bVisible);
		}	
	}
}

function toggleAlarm(bVisible){
	bAlarm = bVisible;
	setGroupHeader(bAlarm, "id_alarm");
	var itm;
	for (i in mapAlarm){
		itm=Ext.getCmp(i);
		if(itm.menustatus == 1){
			itm.setVisible(bVisible);
		}		
	}
}
	
function toggleDm(bVisible){
	bDm = bVisible;
	setGroupHeader(bDm, "id_dm");
	var itm;
	for (i in mapDm){
		itm=Ext.getCmp(i);
		if(itm.menustatus == 1){
			itm.setVisible(bVisible);
		}	
	}
}

function toggleOperation(bVisible){
	bOperation = bVisible;
	setGroupHeader(bOperation, "id_operation");
	var itm; 
	for (i in mapOperation){
		itm=Ext.getCmp(i);
		if(itm.menustatus == 1){
			itm.setVisible(bVisible);
		}	
	}
}

function toggleSystemset(bVisible){
	bSystemset = bVisible;
	setGroupHeader(bSystemset, "id_systemset");
	var itm;
	for (key in mapSystemset){
		itm=Ext.getCmp(key);
		if(itm.menustatus == 1){
			itm.setVisible(bVisible);
		}	
	}
}

function toggleMyaccount(bVisible){
	bMyaccount = bVisible;
	setGroupHeader(bMyaccount, "id_myaccount");
	var itm;
	for (key in mapMyaccount){
		itm=Ext.getCmp(key);
		if(itm.menustatus == 1){
			itm.setVisible(bVisible);
		}	
	}
}