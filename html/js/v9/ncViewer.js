
var bInfoquery = true;
var bAlarm = false;
var bDm = false;
var bOperation = false;
var bSystemset = false;
var bMyaccount = false;
var globalSelectId = "";
var globalSelectGroupId = "itm_infoquery";
var DEFAULT_SEARCH_TEXT = "MAC/�ֻ���/��������";

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

function isInFocus(itmid){
	var tabs_center=Ext.getCmp("layout_center");
	var activeTab = tabs_center.getActiveTab();
	if(activeTab.id == itmid){
		return true;
	}else{
		return false;
	}
}

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
		eval("lan_itm_infoquery_mac_s").setFieldMac(mac);
		eval("lan_itm_infoquery_mac_s").setFieldVname(mac);
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
	eval("lan_itm_infoquery_mac_s").setFieldMac(mac);
	eval("lan_itm_infoquery_mac_s").setFieldVname(mac);
}

var globalInfoMac = "";
var globalInfoTime = "";

function getGlobalInfoMac(){
	return globalInfoMac;
}
function getGlobalInfoTime(){
	return globalInfoTime;
}
function setGlobalInfoMac(mac){
	globalInfoMac = mac;
}
function setGlobalInfoTime(tm){
	globalInfoTime = tm;
}

function showMacWindow_freCharact(mac, tm){
	eval("lan_itm_dm_freCharact_s").setPlaceValue(mac);
	winSearchListFre.hide();
}
function showMacWindow(mac, tm){	
	setGlobalInfoMac(mac);
	setGlobalInfoTime(tm);
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
            html: '<iframe src="/mac/infoquery/macterm/peopletrack/track.htm" frameborder="no" style="width:100%;height:500px;"></iframe>'
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


Ext.Loader.setConfig({enabled: true,paths:{'ncViewer':'/js/v9'}});
Ext.define('ncViewer.App', {
    extend: 'Ext.container.Viewport',    
    uses:['ncViewer.frontPage','ncViewer.lanGroupTree','ncViewer.mac_infoquery_mac','ncViewer.mac_infoquery_move','ncViewer.mac_infoquery_place','ncViewer.mac_infoquery_current','ncViewer.mac_infoquery_hotspot','ncViewer.mac_monitoralarm_controlmanage','ncViewer.mac_monitoralarm_peoplecalled','ncViewer.mac_dm_bab','ncViewer.mac_dm_sample','ncViewer.mac_dm_freCharact','ncViewer.mac_dm_track','ncViewer.mac_dm_sus','ncViewer.mac_dm_crowd','ncViewer.mac_operation_place','ncViewer.mac_operation_equipment','ncViewer.mac_operation_safety','ncViewer.mac_operation_normally','ncViewer.mac_operation_terminal','ncViewer.mac_systemset_admin','ncViewer.mac_systemset_alarm','ncViewer.mac_systemset_preferences','ncViewer.mac_systemset_log','ncViewer.mac_systemset_para','ncViewer.mac_myaccount_username','ncViewer.mac_myaccount_toolbar'],
     initComponent: function(){
        Ext.define('State', {
            extend: 'Ext.data.Model',
            fields: ['groupid', 'groupname']
        });       
        Ext.apply(this, {
            layout: {
                type: 'border',
                padding: 2
            },
            items: [this.createNcTb(),this.createNcLeft(),this.createNcCenter(),this.createNcStatus()]
        });
       
        this.callParent(arguments);
        
    },
  
    /**
    ����������
     */
    createNcTb: function(){
			
        var right_fun_s=right_fun;

    	var tb = Ext.create('Ext.toolbar.Toolbar',{ style: 'background:#00B1F1 !important;',id: "maintab"});
        tb.add({
	    	    itemid:'logo',
				//title:'',
				xtype:'label',
        		html:'&nbsp;<img src="/images/mac/banner_logo.png" style="margin:0 30px 0 30px;" width="125" height="40">'
         	},'-',{
				text: '<font style="font-size : 12px !important; color:#FFF;">��ҳ</font>',
				title: '��ҳ',
				//id:'id_frontPage',
				itemid:'itm_frontPage',
				menustatus:1,
				scale:'large',
				iconAlign: 'top',
				srcurl:'ncViewer.frontPage',
				iconCls: 'icon_frontpage',
				handler:this.onItemClick        
			},'-',{
				text: '<font style="font-size : 12px !important;color:#FFF;">MAC��־��ѯ</font>',
				title : 'MAC��־��ѯ',
				itemid:'itm_infoquery_mac',
				menustatus:1,
				scale:'large',
				hidden:false,
				iconAlign: 'top',
				srcurl:'ncViewer.mac_infoquery_mac',
				iconCls:'icon_infoquery_mac',
				handler: this.onItemClick 
			},'-',{
				text: '<font style="font-size : 12px !important;color:#FFF;">�ȵ��ѯ</font>',
				title : '�ȵ��ѯ',
				itemid:'itm_infoquery_hotspot',
				menustatus:1,
				srcurl:'ncViewer.mac_infoquery_hotspot',  
				scale:'large',
				hidden:true,
				iconAlign: 'top',
				iconCls:'icon_infoquery_hotspot',
				handler: this.onItemClick 
			},'-',{
				text: '<font style="font-size : 12px !important;color:#FFF;">������Ϣ��ѯ</font>',
				title : '������Ϣ��ѯ',
				//id:'id_infoquery_place',
				itemid:'itm_infoquery_place',
				menustatus:1,
				srcurl:'ncViewer.mac_infoquery_place',
				scale:'large',
				hidden:true,
				iconAlign: 'top',
				iconCls:'icon_infoquery_place',
				handler: this.onItemClick 
			},'-',{
				text: '<font style="font-size : 12px !important;color:#FFF;">�ƶ��ɼ��豸</font>',
				title:'�ƶ��ɼ��豸',
				itemid:'itm_infoquery_move',
				menustatus:1,
				//id:'id_infoquery_move',
				srcurl:'ncViewer.mac_infoquery_move',  
				scale:'large',
				hidden:true,
				iconAlign: 'top',
				iconCls:'icon_infoquery_move',
				handler: this.onItemClick 
			},'-',{
				text: '<font style="font-size : 12px !important;color:#FFF;">ʵʱ��Ϣ</font>',
				title : 'ʵʱ��Ϣ',
				itemid:'itm_infoquery_id',
				menustatus:1,
				//id:'id_infoquery_id',
				srcurl:'ncViewer.mac_infoquery_current',
				scale:'large',
				hidden:true,
				iconAlign: 'top',
				iconCls:'icon_infoquery_current',
				handler: this.onItemClick 
			},'-',{
				text: '<font style="font-size : 12px !important;color:#FFF;">���������־</font>',
				title : '���������־',
				itemid:'itm_infoquery_vid',
				menustatus:1,
				//id:'id_infoquery_vid',
				srcurl:'ncViewer.mac_infoquery_vid',
				scale:'large',
				hidden:true,
				iconAlign: 'top',
				iconCls:'icon_infoquery_vid',
				handler: this.onItemClick 
			},'-',{
				text: '<font style="font-size : 12px !important;color:#FFF;">���ع���</font>',
				title : '���ع���',
				itemid:'itm_alarm_controlmanage',
				menustatus:1,
				//id:'id_alarm_controlmanage',
				srcurl:'ncViewer.mac_monitoralarm_controlmanage',
				scale:'large',
				hidden:true,
				iconAlign: 'top',
				iconCls:'icon_alarm_controlmanage',
				handler: this.onItemClick 
			},'-',{
				text: '<font style="font-size : 12px !important;color:#FFF;">�澯��Ϣ��ѯ</font>',
				title : '�澯��Ϣ��ѯ',
				itemid:'itm_alarm_warnlog',
				menustatus:1,
				srcurl:'ncViewer.mac_monitoralarm_warnlog',
				scale:'large',
				hidden:true,
				iconAlign: 'top',
				iconCls:'icon_alarm_warnlog',
				handler: this.onItemClick 
			},'-',{
				text: '<font style="font-size : 12px !important;color:#FFF;">�Ӿ���Ա����</font>',
				title : '�Ӿ���Ա����',
				itemid:'itm_alarm_peoplecalled',
				menustatus:1,
				//id:'id_alarm_peoplecalled',
				srcurl:'ncViewer.mac_monitoralarm_peoplecalled',  
				scale:'large',
				hidden:true,
				iconAlign: 'top',
				iconCls:'icon_alarm_peoplecalled',
				handler: this.onItemClick 
			},'-',{
				text: '<font style="font-size : 12px !important;color:#FFF;">������Ϊ����</font>',
				title : '������Ϊ����',
				itemid:'itm_dm_bab',
				menustatus:1,
				//id:'id_dm_bab',
				srcurl:'ncViewer.mac_dm_bab',
				scale:'large',
				hidden:true,
				iconAlign: 'top',
				iconCls:'icon_dm_bab',
				handler: this.onItemClick 
			},'-',{
				text: '<font style="font-size : 12px !important;color:#FFF;">��������</font>',
				title : '��������',
				itemid:'itm_dm_sample',
				menustatus:1,
				//id:'id_dm_sample',
				srcurl:'ncViewer.mac_dm_sample', 
				scale:'large',
				hidden:true,
				iconAlign: 'top',
				iconCls:'icon_dm_sample',
				handler: this.onItemClick 
			},'-',{
				text: '<font style="font-size : 12px !important;color:#FFF;">��Ƶ�η���</font>',
				title : '��Ƶ�η���',
				itemid:'itm_dm_freCharact',
				menustatus:1,
				//id:'id_dm_freCharact',
				srcurl:'ncViewer.mac_dm_freCharact',
				scale:'large',
				hidden:true,
				iconAlign: 'top',
				iconCls:'icon_shortcut',
				handler: this.onItemClick 
			},'-',{
				text: '<font style="font-size : 12px !important;color:#FFF;">�켣����</font>',
				title : '�켣����',
				itemid:'itm_dm_track',
				menustatus:1,
				//id:'id_dm_track',
				srcurl:'ncViewer.mac_dm_track',
				scale:'large',
				hidden:true,
				iconAlign: 'top',
				iconCls:'icon_dm_track',
				handler: this.onItemClick 
			},'-',{
				text: '<font style="font-size : 12px !important;color:#FFF;">�����ȵ����</font>',
				title : '�����ȵ����',
				itemid:'itm_dm_sus',
				menustatus:1,
				//id:'id_dm_sus',
				srcurl:'ncViewer.mac_dm_sus',
				scale:'large',
				hidden:true,
				iconAlign: 'top',
				iconCls:'icon_dm_sus',
				handler: this.onItemClick 
			},'-',{
				text: '<font style="font-size : 12px !important;color:#FFF;">��������</font>',
				title : '��������',
				itemid:'itm_dm_crowd',
				menustatus:1,
				//id:'id_dm_crowd',
				srcurl:'ncViewer.mac_dm_crowd',
				scale:'large',
				hidden:true,
				iconAlign: 'top',
				iconCls:'icon_dm_crowd',
				handler: this.onItemClick 
			},'-',{
				text: '<font style="font-size : 12px !important;color:#FFF;">��������</font>',
				title : '��������',
				itemid:'itm_operation_place',
				menustatus:1,
				//id:'id_operation_place',
				srcurl:'ncViewer.mac_operation_place',  
				scale:'large',
				hidden:true,
				iconAlign: 'top',
				iconCls:'icon_operation_place',
				handler: this.onItemClick 
			},'-',{
				text: '<font style="font-size : 12px !important;color:#FFF;">�豸����</font>',
				title : '�豸����',
				itemid:'itm_operation_equipment',
				menustatus:1,
				//id:'id_operation_equipment',
				srcurl:'ncViewer.mac_operation_equipment',  
				scale:'large',
				hidden:true,
				iconAlign: 'top',
				iconCls:'icon_operation_equipment',
				handler: this.onItemClick 
			},'-',{
				text: '<font style="font-size : 12px !important;color:#FFF;">��ȫ���̹���</font>',
				title : '��ȫ���̹���',
				itemid:'itm_operation_safety',
				menustatus:1,
				//id:'id_operation_safety',
				srcurl:'ncViewer.mac_operation_safety',  
				scale:'large',
				hidden:true,
				iconAlign: 'top',
				iconCls:'icon_operation_safety',
				handler: this.onItemClick 
			},'-',{
				text: '<font style="font-size : 12px !important;color:#FFF;">�ȵ����</font>',
				title : '�ȵ����',
				itemid:'itm_operation_normally',
				menustatus:1,
				//id:'id_operation_normally',
				srcurl:'ncViewer.mac_operation_normally',  
				scale:'large',
				hidden:true,
				iconAlign: 'top',
				iconCls:'icon_operation_normally',
				handler: this.onItemClick 
			},'-',{
				text: '<font style="font-size : 12px !important;color:#FFF;">�ն���Ϣ����</font>',
				title : '�ն���Ϣ����',
				itemid:'itm_operation_terminal',
				menustatus:1,
				//id:'id_operation_terminal',
				srcurl:'ncViewer.mac_operation_terminal', 
				scale:'large',
				hidden:true,
				iconAlign: 'top',
				iconCls:'icon_operation_terminal',
				handler: this.onItemClick 
			},'-',{
				text: '<font style="font-size : 12px !important;color:#FFF;">����Ա�˺�</font>',
				title : '����Ա�˺�',
				itemid:'itm_systemset_admin',
				menustatus:1,
				//id:'id_systemset_admin',
				srcurl:'ncViewer.mac_systemset_admin', 
				scale:'large',
				hidden:true,
				iconAlign: 'top',
				iconCls:'icon_systemset_admin',
				handler: this.onItemClick 
			},'-',{
				text: '<font style="font-size : 12px !important;color:#FFF;">ϵͳ��ά�澯</font>',
				title : 'ϵͳ��ά�澯',
				itemid:'itm_systemset_alarm',
				menustatus:1,
				//id:'id_systemset_alarm',
				srcurl:'ncViewer.mac_systemset_alarm',
				scale:'large',
				hidden:true,
				iconAlign: 'top',
				iconCls:'icon_systemset_alarm',
				handler: this.onItemClick 
			},'-',{
				text: '<font style="font-size : 12px !important;color:#FFF;">Ȩ�޹���</font>',
				title : 'Ȩ�޹���',
				itemid:'itm_systemset_preferences',
				menustatus:1,
				srcurl:'ncViewer.mac_systemset_preferences',  
				scale:'large',
				hidden:true,
				iconAlign: 'top',
				iconCls:'icon_systemset_preferences',
				handler: this.onItemClick 
			},'-',{
				text: '<font style="font-size : 12px !important;color:#FFF;">����Ա��־</font>',
				title : '����Ա��־',
				itemid:'itm_systemset_log',
				menustatus:1,
				//id:'id_systemset_log',
				srcurl:'ncViewer.mac_systemset_log', 
				scale:'large',
				hidden:true,
				iconAlign: 'top',
				iconCls:'icon_systemset_log',
				handler: this.onItemClick 
			},'-',{
				text: '<font style="font-size : 12px !important;color:#FFF;">ϵͳ��������</font>',
				title : 'ϵͳ��������',
				itemid:'itm_systemset_para',
				menustatus:1,
				srcurl:'ncViewer.mac_systemset_para', 
				scale:'large',
				hidden:true,
				iconAlign: 'top',
				iconCls:'icon_systemset_para',
				handler: this.onItemClick 
			},'-','-','->','->',{
				id:'id_search',
				title:'',
	    	    itemid:'itm_search',
				xtype:'label',
        		html:'<div class="cls_search"><img id="imgbtn_search" onmousedown="searchMouseDown();" onmouseup="searchMouseUp();"  onclick="doSearchClick()" src="/images/mac/top_icon/btn_search_normal.png"/><input id="id_search_input" type="text" onfocus="doFocus()" onblur="doBlur()" onkeypress="doKeyPress(event)" " value="MAC/�ֻ���/��������"/></div>'
         	},'-',{
				text: '<font style="font-size : 12px !important;color:#FFF;">ϵͳˢ��</font>',
				itemid:'itm_xtsx',
				title:'ϵͳˢ��',
				scale:'large',
				iconAlign: 'top',
				iconCls: 'refresh',
				handler: this.onItemReflash
			},'-',{
				text: '<font style="font-size : 12px !important;color:#FFF;">���µ�¼</font>',
				title:'���µ�¼',
				scale:'large',
				itemid:'itm_cxdl',
				iconAlign: 'top',
				iconCls: 'unlock',
				handler: this.onItemClose
			}     
        ); 

			
        
        //console.info(right_tool);
        var isep=0;
		var right_tool_s = right_tool;
		var right_fun_s = right_fun;
		tb.items.each(function(item){
			if((right_tool_s.indexOf(item.title)!=-1)||(item.title=='ϵͳˢ��')||(item.title=='���µ�¼')/*||(item.title=='�˳�ϵͳ')*/||(item.title=='��ҳ')||(item.itemid=='logo')||(item.itemid == 'itm_search')){
				if((right_fun_s.indexOf(item.title)!=-1)||(item.title=='ϵͳˢ��')||(item.title=='���µ�¼')/*||(item.title=='�˳�ϵͳ')*/||(item.title=='��ҳ')||(item.itemid=='logo')||(item.itemid == 'itm_search')){
					item.hidden=false;
				}else{
					item.hidden=true;
				}				
				isep=1;      	 
			}else{
				if(item.text){
					item.hidden=true;
					isep=0;				
				}else{					
					if(isep==0){
						item.hidden=true;
						isep=1;
					}else{
						item.hidden=false;
						isep=0;
					}
				}			
			}
		});
		

		this.toolPanel = Ext.create(Ext.panel.Panel, {
            id: 'header',
            margins: '0 2 0 2',
            border: true,
            region: 'north',   
			bodyStyle: 'background:#00B1F1 !important;',
            items:[tb]
        });
        return this.toolPanel;
       
    },
    onItemClose:function(){
    	self.location='/login.htm';
    },
    onItemClose2:function(){
    	self.location='/pronline/Msg?FunName@proauthExit';
    },
    onItemReflash:function(){
          var fp=Ext.create('Ext.FormPanel');
               fp.form.doAction('submit',{
               url:'/pronline/Msg',
                method:'POST',
                waitMsg:'�������¼�������, ���Ժ�...', 
				        waitTitle:'��ʾ', 
               params:{FunName:'ncsSysReflesh_v4'},
                 
                success:function(form,action){ 
           					Ext.Msg.alert('����',"�������!");
                 },
             		 failure:function(form,action){        		 
                    Ext.Msg.alert('����',"ϵͳ��æ,�Ժ�����!");
                   
            		 }
                }
             )
					  
	//				    loadFn('win-button', 'win-statusbar');
    
    },
	createNcLeft:function(){  
		var leftMenu=Ext.create(Ext.panel.Panel, {
			margins: '0 0 0 0',          
			// layout: 'border',
			id:'leftMenu',
			height:1100,
			autoScroll: true,
			animCollapse: true,
			layout: "column",  //����Ϊ�ַ��ٲ���
			layoutConfig: {
				animate: true
			},  
			defaults:{                     
				layout: 'anchor', 
				defaults: {   anchor: '100%'  } 
			},  
			bodyStyle: 'background:#ECFAFF !important;',
			cls:'cls_menu_panel',
			//split:true,
			width: 210,
			//minWidth:200,
			//maxWidth:500,
			minSize: 100,
			maxSize: 500,							
			columnWidth: 10 / 10,        //�����еĿ��
			items:
			[
				{
					xtype : 'button',
					cls:"bkmenuf_id_infoquery", 
					text : '<font style="font-size : 14px !important;color:#0D3967;margin:13px 0 0 60px !important;">��Ϣ��ѯ</font>',
					id : 'id_infoquery',
					itemid : 'itm_infoquery',
					menustatus:0,
					listeners:{
						click:this.onToggleFirst
					}
				},{
					xtype : 'button',
					hidden  : false,
					cls:"cls_menu_second_normal", 
					text : '<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MAC��־��ѯ</font>',
					title : 'MAC��־��ѯ',
					itemid:'itm_infoquery_mac',
					menustatus:1,
					id:'id_infoquery_mac',
					srcurl:'ncViewer.mac_infoquery_mac',
					listeners:{
						mouseover:this.changeOnOver,
						mouseout:this.changeOnOut,
						click:this.onItemClick
					}
				},{
					xtype : 'button',
					hidden  : false,
					cls:"cls_menu_second_normal", 
					text : '<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;�ȵ��ѯ</font>',
					title : '�ȵ��ѯ',
					itemid:'itm_infoquery_hotspot',
					menustatus:1,
					id: 'id_infoquery_hotspot',
					srcurl:'ncViewer.mac_infoquery_hotspot',  
					listeners:{
						mouseover:this.changeOnOver,
						mouseout:this.changeOnOut,
						click:this.onItemClick
					}
				},{
					xtype : 'button',
					hidden  : false,
					cls:"cls_menu_second_normal", 
					style: 'text-align: left !important;',
					text : '<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;������Ϣ��ѯ</font>',
					title : '������Ϣ��ѯ',
					id:'id_infoquery_place',
					itemid:'itm_infoquery_place',
					menustatus:1,
					srcurl:'ncViewer.mac_infoquery_place',
					listeners:{
						mouseover:this.changeOnOver,
						mouseout:this.changeOnOut,
						click:this.onItemClick
					}
				},{
					xtype : 'button',
					hidden  : false,
					cls:"cls_menu_second_normal", 
					text : '<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;�ƶ��ɼ��豸</font>',
					title:'�ƶ��ɼ��豸',
					itemid:'itm_infoquery_move',
					menustatus:1,
					id:'id_infoquery_move',
					srcurl:'ncViewer.mac_infoquery_move',  
					listeners:{
						mouseover:this.changeOnOver,
						mouseout:this.changeOnOut,
						click:this.onItemClick
					}
				},{
					xtype : 'button',
					hidden  : false,
					cls:"cls_menu_second_normal", 
					//overCls : 'clsListItemOver',
					text : '<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ʵʱ��Ϣ</font>',
					title : 'ʵʱ��Ϣ',
					itemid:'itm_infoquery_id',
					menustatus:1,
					id:'id_infoquery_id',
					srcurl:'ncViewer.mac_infoquery_current',
					listeners:{
						mouseover:this.changeOnOver,
						mouseout:this.changeOnOut,
						click:this.onItemClick
					}
				},{
					xtype : 'button',
					hidden  : false,
					cls:"cls_menu_second_normal", 
					//overCls : 'clsListItemOver',
					text : '<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;���������־</font>',
					title : '���������־',
					itemid:'itm_infoquery_vid',
					menustatus:1,
					id:'id_infoquery_vid',
					srcurl:'ncViewer.mac_infoquery_vid',
					listeners:{
						mouseover:this.changeOnOver,
						mouseout:this.changeOnOut,
						click:this.onItemClick
					}
				},{
					xtype : 'button',
					//iconCls: "mi_alarm", 
					cls:"bkmenun_id_alarm", 
					//bodyStyle: 'background:#F0F3F8;',
					//style: 'border-radius:0;background:#D5DDF0 !important; margin:1px 0 0px 0px;',
					text : '<font style="font-size : 14px !important;color:#0D3967;margin:13px 0 0 60px !important;">���ظ澯</font>',
					id : 'id_alarm',
					itemid : 'itm_alarm',
					menustatus:0,
					listeners:{
						click:this.onToggleFirst
					}
				},{
					xtype : 'button',
					hidden  : true,
					cls:"cls_menu_second_normal", 
					//overCls : 'clsListItemOver',
					text : '<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;���ع���</font>',
					title : '���ع���',
					itemid:'itm_alarm_controlmanage',
					menustatus:1,
					id:'id_alarm_controlmanage',
					srcurl:'ncViewer.mac_monitoralarm_controlmanage',
					listeners:{									
						mouseover:this.changeOnOver,
						mouseout:this.changeOnOut,
						click:this.onItemClick
					}
				},{
					xtype : 'button',
					hidden  : true,
					cls:"cls_menu_second_normal", 
					//overCls : 'clsListItemOver',
					text : '<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;�澯��Ϣ��ѯ</font>',
					title : '�澯��Ϣ��ѯ',
					itemid:'itm_alarm_warnlog',
					id:'id_alarm_warnlog',
					srcurl:'ncViewer.mac_monitoralarm_warnlog',  
					listeners:{
						mouseover:this.changeOnOver,
						mouseout:this.changeOnOut,
						click:this.onItemClick
					}
				},{
					xtype : 'button',
					hidden  : true,
					cls:"cls_menu_second_normal", 
					//overCls : 'clsListItemOver',
					text : '<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;�Ӿ���Ա����</font>',
					title : '�Ӿ���Ա����',
					itemid:'itm_alarm_peoplecalled',
					menustatus:1,
					id:'id_alarm_peoplecalled',
					srcurl:'ncViewer.mac_monitoralarm_peoplecalled',  
					listeners:{
						mouseover:this.changeOnOver,
						mouseout:this.changeOnOut,
						click:this.onItemClick
					}
				},{
					xtype : 'button',
					//iconCls: "mi_dm", 
					cls:"bkmenun_id_dm", 
					//bodyStyle: 'background:#F0F3F8;',
					//style: 'border-radius:0;background:#D5DDF0; margin:1px 0 0px 0px;',
					text : '<font style="font-size : 14px !important;color:#0D3967;margin:13px 0 0 60px !important;">�����ھ�</font>',
					itemid : 'itm_dm',
					menustatus:0,
					id:'id_dm',
					listeners:{
						click:this.onToggleFirst
					}								
				},{
					xtype : 'button',
					hidden  : true,
					cls:"cls_menu_second_normal", 
					//overCls : 'clsListItemOver',
					text : '<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;������Ϊ����</font>',
					title : '������Ϊ����',
					itemid:'itm_dm_bab',
					menustatus:1,
					id:'id_dm_bab',
					srcurl:'ncViewer.mac_dm_bab',
					listeners:{
						mouseover:this.changeOnOver,
						mouseout:this.changeOnOut,
						click:this.onItemClick
					}
				},{
					xtype : 'button',
					hidden  : true,
					cls:"cls_menu_second_normal", 
					//overCls : 'clsListItemOver',
					text : '<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;��������</font>',
					title : '��������',
					itemid:'itm_dm_sample',
					menustatus:1,
					id:'id_dm_sample',
					srcurl:'ncViewer.mac_dm_sample', 
					listeners:{
						mouseover:this.changeOnOver,
						mouseout:this.changeOnOut,
						click:this.onItemClick
					}
				},{
					xtype : 'button',
					hidden  : true,
					cls:"cls_menu_second_normal", 
					//overCls : 'clsListItemOver',
					text : '<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;��Ƶ�η���</font>',
					title : '��Ƶ�η���',
					itemid:'itm_dm_freCharact',
					menustatus:1,
					id:'id_dm_freCharact',
					srcurl:'ncViewer.mac_dm_freCharact',
					listeners:{
						mouseover:this.changeOnOver,
						mouseout:this.changeOnOut,
						click:this.onItemClick
					}
				},{
					xtype : 'button',
					hidden  : true,
					cls:"cls_menu_second_normal", 
					//overCls : 'clsListItemOver',
					text : '<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;�켣����</font>',
					title : '�켣����',
					itemid:'itm_dm_track',
					menustatus:1,
					id:'id_dm_track',
					srcurl:'ncViewer.mac_dm_track',
					listeners:{
						mouseover:this.changeOnOver,
						mouseout:this.changeOnOut,
						click:this.onItemClick
					}
				},{
					xtype : 'button',
					hidden  : true,
					cls:"cls_menu_second_normal", 
					//overCls : 'clsListItemOver',
					text : '<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;�����ȵ����</font>',
					title : '�����ȵ����',
					itemid:'itm_dm_sus',
					menustatus:1,
					id:'id_dm_sus',
					srcurl:'ncViewer.mac_dm_sus',
					listeners:{
						mouseover:this.changeOnOver,
						mouseout:this.changeOnOut,
						click:this.onItemClick
					}
				},{
					xtype : 'button',
					hidden  : true,
					cls:"cls_menu_second_normal", 
					//overCls : 'clsListItemOver',
					text : '<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;��������</font>',
					title : '��������',
					itemid:'itm_dm_crowd',
					menustatus:1,
					id:'id_dm_crowd',
					srcurl:'ncViewer.mac_dm_crowd',
					listeners:{
						mouseover:this.changeOnOver,
						mouseout:this.changeOnOut,
						click:this.onItemClick
					}
				},{
					xtype : 'button',
					//iconCls: "mi_operation", 
					cls:"bkmenun_id_operation", 
					//bodyStyle: 'background:#F0F3F8;',
					//style: 'border-radius:0;background:#D5DDF0; margin:1px 0 0px 0px;',
					text : '<font style="font-size : 14px !important;color:#0D3967;margin:13px 0 0 60px !important;">ҵ������</font>',
					id : 'id_operation',
					itemid : 'itm_operation',
					menustatus:0,
					listeners:{
						click:this.onToggleFirst
					}
				},{
					xtype : 'button',
					hidden  : true,
					cls:"cls_menu_second_normal", 
					//overCls : 'clsListItemOver',
					text : '<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;��������</font>',
					title : '��������',
					itemid:'itm_operation_place',
					menustatus:1,
					id:'id_operation_place',
					srcurl:'ncViewer.mac_operation_place',  
					listeners:{
						mouseover:this.changeOnOver,
						mouseout:this.changeOnOut,
						click:this.onItemClick
					}
				},{
					xtype : 'button',
					hidden  : true,
					cls:"cls_menu_second_normal", 
					//overCls : 'clsListItemOver',
					text : '<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;�豸����</font>',
					title : '�豸����',
					itemid:'itm_operation_equipment',
					menustatus:1,
					id:'id_operation_equipment',
					srcurl:'ncViewer.mac_operation_equipment',  
					listeners:{
						mouseover:this.changeOnOver,
						mouseout:this.changeOnOut,
						click:this.onItemClick
					}
				},{
					xtype : 'button',
					hidden  : true,
					cls:"cls_menu_second_normal", 
					text : '<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;��λ����</font>',
					title : '��λ����',
					itemid:'itm_operation_dwsz',
					menustatus:1,
					id:'id_operation_dwsz',
					srcurl:'ncViewer.mac_operation_dwsz',  
					listeners:{
						mouseover:this.changeOnOver,
						mouseout:this.changeOnOut,
						click:this.onItemClick
					}
				},{
					xtype : 'button',
					hidden  : true,
					cls:"cls_menu_second_normal", 
					//overCls : 'clsListItemOver',
					text : '<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;��ȫ���̹���</font>',
					title : '��ȫ���̹���',
					itemid:'itm_operation_safety',
					id:'id_operation_safety',
					srcurl:'ncViewer.mac_operation_safety',  
					listeners:{
						mouseover:this.changeOnOver,
						mouseout:this.changeOnOut,
						click:this.onItemClick
					}
				},{
					xtype : 'button',
					hidden  : true,
					cls:"cls_menu_second_normal", 
					//overCls : 'clsListItemOver',
					text : '<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;�ȵ����</font>',
					title : '�ȵ����',
					itemid:'itm_operation_normally',
					menustatus:1,
					id:'id_operation_normally',
					srcurl:'ncViewer.mac_operation_normally',  
					listeners:{
						mouseover:this.changeOnOver,
						mouseout:this.changeOnOut,
						click:this.onItemClick
					}
				},{
					xtype : 'button',
					hidden  : true,
					cls:"cls_menu_second_normal", 
					//overCls : 'clsListItemOver',
					text : '<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;�ն���Ϣ����</font>',
					title : '�ն���Ϣ����',
					itemid:'itm_operation_terminal',
					id:'id_operation_terminal',
					srcurl:'ncViewer.mac_operation_terminal',  
					listeners:{
						mouseover:this.changeOnOver,
						mouseout:this.changeOnOut,
						click:this.onItemClick
					}
				},{
					xtype : 'button',
					//iconCls: "mi_systemset", 
					cls:"bkmenun_id_systemset", 
					//bodyStyle: 'background:#F0F3F8;',
					//style: 'border-radius:0;background:#D5DDF0; margin:1px 0 0px 0px;',
					text : '<font style="font-size : 14px !important;color:#0D3967;margin:13px 0 0 60px !important;">ϵͳ����</font>',
					id : 'id_systemset',
					itemid : 'itm_systemset',
					menustatus:0,
					listeners:{
						click:this.onToggleFirst
					}
				},{
					xtype : 'button',
					hidden  : true,
					cls:"cls_menu_second_normal", 
					//overCls : 'clsListItemOver',
					text : '<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;����Ա�˺�</font>',
					title : '����Ա�˺�',
					itemid:'itm_systemset_admin',
					id:'id_systemset_admin',
					srcurl:'ncViewer.mac_systemset_admin',  
					listeners:{
						mouseover:this.changeOnOver,
						mouseout:this.changeOnOut,
						click:this.onItemClick
					}
				},{
					xtype : 'button',
					hidden  : true,
					cls:"cls_menu_second_normal", 
					//overCls : 'clsListItemOver',
					text : '<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ϵͳ��ά�澯</font>',
					title : 'ϵͳ��ά�澯',
					itemid:'itm_systemset_alarm',
					menustatus:1,
					id:'id_systemset_alarm',
					srcurl:'ncViewer.mac_systemset_alarm',  
					listeners:{
						mouseover:this.changeOnOver,
						mouseout:this.changeOnOut,
						click:this.onItemClick
					}
				},{
					xtype : 'button',
					hidden  : true,
					cls:"cls_menu_second_normal", 
					//overCls : 'clsListItemOver',
					text : '<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ȩ�޹���</font>',
					title : 'Ȩ�޹���',
					itemid:'itm_systemset_preferences',
					id:'id_systemset_preferences',
					srcurl:'ncViewer.mac_systemset_preferences',  
					listeners:{
						mouseover:this.changeOnOver,
						mouseout:this.changeOnOut,
						click:this.onItemClick
					}
				},{
					xtype : 'button',
					hidden  : true,
					cls:"cls_menu_second_normal", 
					//overCls : 'clsListItemOver',
					text : '<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;����Ա��־</font>',
					title : '����Ա��־',
					itemid:'itm_systemset_log',
					menustatus:1,
					id:'id_systemset_log',
					srcurl:'ncViewer.mac_systemset_log',  
					listeners:{
						mouseover:this.changeOnOver,
						mouseout:this.changeOnOut,
						click:this.onItemClick
					}
				},{
					xtype : 'button',
					hidden  : true,
					cls:"cls_menu_second_normal", 
					//overCls : 'clsListItemOver',
					text : '<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ϵͳ��������</font>',
					title : 'ϵͳ��������',
					itemid:'itm_systemset_para',
					menustatus:1,
					id:'id_systemset_para',
					srcurl:'ncViewer.mac_systemset_para',  
					listeners:{
						mouseover:this.changeOnOver,
						mouseout:this.changeOnOut,
						click:this.onItemClick
					}
				},{
					xtype : 'button',
					cls:"bkmenun_id_myaccount", 
					//bodyStyle: 'background:#F0F3F8;',
					//style: 'border-radius:0;background:#D5DDF0; margin:1px 0 0px 0px;',
					text : '<font style="font-size : 14px !important;color:#0D3967;margin:13px 0 0 60px !important;">�ҵ��˻�</font>',
					id : 'id_myaccount',
					itemid : 'itm_myaccount',
					menustatus:0,
					listeners:{
						click:this.onToggleFirst
					}
				},{
					xtype : 'button',
					hidden  : true,
					cls:"cls_menu_second_normal", 
					//overCls : 'clsListItemOver',
					text : '<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;�޸�����</font>',
					title : '�޸�����',
					itemid:'itm_myaccount_username',
					menustatus:1,
					id:'id_myaccount_username',
					srcurl:'ncViewer.mac_myaccount_username',
					listeners:{									
						mouseover:this.changeOnOver,
						mouseout:this.changeOnOut,
						click:this.onItemClick
					}
				},{
					xtype : 'button',
					hidden  : true,
					cls:"cls_menu_second_normal", 
					text : '<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;�ҵĹ�����</font>',
					title : '�ҵĹ�����',
					itemid:'itm_myaccount_toolbar',
					menustatus:1,
					id:'id_myaccount_toolbar',
					srcurl:'ncViewer.mac_myaccount_toolbar',
					listeners:{									
						mouseover:this.changeOnOver,
						mouseout:this.changeOnOut,
						click:this.onItemClick
					}
				}        
			]
		});	
		var right_fun_s = right_fun;
		leftMenu.items.each(function(item){
			if(item.menustatus != 0){
				// 1-�����˵���ʾ 2-�����˵�����ʾ	
				if(right_fun_s.indexOf(item.title)!=-1){
					item.menustatus = 1;
					//item.hidden = false;
				}else{
					item.menustatus = 2;
					item.hidden = true;
				}
			}
		});
		//�ж��Ƿ�����һ���˵�
		leftMenu.items.each(function(item){
			if(item.menustatus == 0){
				if(getItemShowCount(item.itemid)>0){
					item.hidden = false;
				}else{
					item.hidden = true;
				}				
			}
		});

		this.left_tabs=Ext.createWidget('tabpanel', {
			width: 210,
			border:false,
			margins: '0 2 0 2',
			id: 'left',
			layout: 'border',
			title:'��ǰλ�ã�ȫ������',
			collapsible: true,
			region: 'west',
			height:700,
			tabPosition: 'bottom',
			id:'treetab',    
			activeTab: 0,
			defaults :{
				bodyPadding: 0
			},
			listeners: {              
				tabchange:function(tp,p){
					servicecode='';
					corpdid='';
					ncsgroupid='';
					dxtitle='';
					fcode='';
				}
			}
		});

		this.left_tabs.add({ closable: false,border:false,items:[leftMenu],title: '�л��ز˵�'});   
		this.left_tabs.add({closable: false, border:false, items:[Ext.create(ncViewer.lanGroupTree)],title: '�л�������'});
		left_tabs_glob=this.left_tabs;
		return this.left_tabs;
    },
    createNcCenter:function(){
		//   var charPort=Ext.create('widget.ncCharPoral');
		servicecode='';
		corpdid='';
		ncsgroupid='';    
		compid='';
		dxtitle='';
		var sy_obj;
		var sy_title,sy_id;
		sy_obj=ncViewer.frontPage;
		sy_title='��ҳ';
		sy_id='itm_frontPage';
      
    	this.centerPanel=Ext.createWidget('tabpanel', {
			resizeTabs: true,
			enableTabScroll: true,
			region:'center',
        	id:'layout_center',
        	margins: '2 2 1 0',
			defaults: {
				autoScroll: false,
				bodyPadding: 0
			},
			items: [
			{
				closable: true,
				autoScroll:false,
				id:sy_id,
				iconCls: 'add16',          
				title: sy_title,
				items:[Ext.create(sy_obj)]
			}],
			plugins: Ext.create('Ext.ux.TabCloseMenu', {
				extraItemsTail: [
					'-',
					{
						text: 'Closable',
						checked: true,
						hideOnClick: true,
						handler: function (item) {
							currentItem.tab.setClosable(item.checked);
						}
					},
					'-',
					{
						text: 'Enabled',
						checked: true,
						hideOnClick: true,
						handler: function(item) {
							currentItem.tab.setDisabled(!item.checked);
						}
					}
				],
            listeners: {
                aftermenu: function () {
                    currentItem = null;
                },
                beforemenu: function (menu, item) {
                    menu.child('[text="Closable"]').setChecked(item.closable);
                    menu.child('[text="Enabled"]').setChecked(!item.tab.isDisabled());
                    currentItem = item;
                }
            }
         }),
         listeners: {              
            tabchange:function(tp,p){
				console.log(p.id);
				toggleClickItem(p.id);
				/*
            	grid_height=Ext.getCmp('layout_center').getHeight()-36;
            	grid_width=Ext.getCmp('layout_center').getWidth()-56;
				var tabs_center=Ext.getCmp("layout_center");
        	    var active = tabs_center.getActiveTab();
				var frame1 = Ext.get(active.el).frame();
				var childComp = frame1.getCmp("keyword"); //ȡ�ÿؼ�
				childComp.setText("success");
				
				console.log(active.getId());
        	    
              //console.log(active.getId());
		        	var active_id='lan_'+active.id;
		        	if(active_id=='lan_hotinfo'||active_id=='itm_infoquery_mac'||active_id=='itm_infoquery_move'){
		        		return;
		        	}
	    
		        	var tabs_if=Ext.getCmp(active_id).getActiveTab();
		        	if(tabs_if){
			          if(tabs_if.id=='immon'){
			           	bStartcomp=0;
			           	bStartim=1;
			          }
			          else if(tabs_if.id=='sjcomputer'){
			          	bStartcomp=1;
			          	bStartim=0;
			          }
          		  else if(tabs_if.id=='sspm'){
          		 	  bStartcomp=0;
			          	bStartim=0;
          		  }
          		  var vframe= active_id+"_"+tabs_if.getId()
          		  //alert(vframe);
          		  try{
            		  eval(vframe).reflash();
            		}catch(e){}
          		}
			*/
          	}
         }
                
       });

//     console.log(right_fun); 
      
       var right_fun_s=right_fun;
       var item2 = Ext.getCmp("maintab").items.items;
//console.info(right_fun_s);  



   /*
      for(var i=0;i<item2.length;i++){
   //   alert(right_fun_s);
      	
        //console.log(item2[i]);
        try{
          if((right_fun_s.indexOf(item2[i].text)!=-1)){
        	  if(item2[i].itemid=="jcxxgl"){
        	    continue;
        	  }
        	  
    if(item2[i].itemid=='dwgl'){
          this.onItemClick(item2[i]);
            break;
          }
        	}
        }catch(e){}  
  	
      }
       
       */
       
       return this.centerPanel;
    },
    createNcStatus:function(){   	
    	this.ncstatus=Ext.create('Ext.ux.StatusBar', {
        id: 'statusbar',
        region: 'south',
        margins: '1 2 0 2',
        defaultText: 'Default status text',
        text: 'Ready',
		style: 'background:#00B1F1 !important;',
        iconCls: 'x-status-valid',
        items: [
			{
				xtype: 'button',
				text: ''
			},{
				xtype: 'button',
				text: '�Ϻ���������Ϣ�����ɷ����޹�˾&nbsp;&nbsp;',
				handler: function (){
					var sb = Ext.getCmp('statusbar');
					sb.setStatus({
						text: 'Oops!',
						iconCls: 'x-status-error',
						clear: true // auto-clear after a set interval
					});
				}
			}]
      });
      return this.ncstatus;
    },
	onToggleFirst:function(item){
		if('itm_infoquery' == item.itemid){
			toggleInfoquery(!bInfoquery);
			toggleAlarm(false);
			toggleDm(false);
			toggleOperation(false);
			toggleSystemset(false);
			toggleMyaccount(false);
		}else if('itm_alarm' == item.itemid){
			toggleInfoquery(false);
			toggleAlarm(!bAlarm);
			toggleDm(false);
			toggleOperation(false);
			toggleSystemset(false);
			toggleMyaccount(false);
		}else if('itm_dm' == item.itemid){
			toggleInfoquery(false);
			toggleAlarm(false);
			toggleDm(!bDm);
			toggleOperation(false);
			toggleSystemset(false);
			toggleMyaccount(false);
		}else if('itm_operation' == item.itemid){
			toggleInfoquery(false);
			toggleAlarm(false);
			toggleDm(false);
			toggleOperation(!bOperation);
			toggleSystemset(false);
			toggleMyaccount(false);
		}else if('itm_systemset' == item.itemid){
			toggleInfoquery(false);
			toggleAlarm(false);
			toggleDm(false);
			toggleOperation(false);
			toggleSystemset(!bSystemset);
			toggleMyaccount(false);
		}else if('itm_myaccount' == item.itemid){
			toggleInfoquery(false);
			toggleAlarm(false);
			toggleDm(false);
			toggleOperation(false);
			toggleSystemset(false);
			toggleMyaccount(!bMyaccount);
		}
		
	},
	changeOnOut:function(item){
		if(item.id != globalSelectId){
			try{
				Ext.getCmp(item.id).setText('<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+item.title+'</font>');
			}catch(e){
				alert(e.message);
			}
		}		
	},
	changeOnOver:function(item){	
		if(item.id != globalSelectId){
			try{
				Ext.getCmp(item.id).setText('<font style="font-size : 12px !important;color:#328BE4;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+item.title+'</font>');
			}catch (e) {
				alert(e.message);
			}
		}
	},
    onItemClick:function(item){
    	 //bbbb=document.all('ltitle');
		toggleClickItem(item.itemid);
    	var tab_title='';
    	var temp_text=item.text;    	 
    	if(temp_text.indexOf('font')== -1){
			tab_title=temp_text;
    	}
    	else{
    		tab_title=item.title;
    	}
    
    //	left_tabs_glob.setTitle('��ǰλ�ã�'+tab_title); 
	//	Ext.getCmp('left').setTitle('��ǰλ�ã�'+tab_title);          
		//�ı��м����ͼ      
		var i=0;
		var m=0;
		var tab_src=item.srcurl;
		var tab_id=item.itemid;
		var tabs_center=Ext.getCmp("layout_center");
		var tab_len=tabs_center.items.length;
		tabs_center.items.each(function(item) { 
	     	if(item.id==tab_id)
	     	{ 
				i++;
			}
			if(i==0){m++;}
		});   
		if(i>0){
			tabs_center.setActiveTab(m);
			return;
     	} 
		if(tab_len>5){
			tabs_center.remove(0); 
			//tabs_center.remove(1);  
		}  
		//alert(grid_height);
		//grid_height=Ext.getCmp('layout_center').getHeight()-36;        
		//grid_width=Ext.getCmp('layout_center').getWidth()-56;
		var grid=Ext.create(tab_src);
		/*��ʱȥ��Ȩ�޼��
		var str = right_fun;
//console.log(right_fun);      
		grid.items.each(function(item){
	 //   console.info(str);
	 //   console.info(item.getId());
	 //   console.info(str.indexOf(item.getId()));
	//     console.log(item.getId());   	
			if(str.indexOf(item.getId())== -1){
				item.destroy();
			}
		});
     */
                  	
		tabs_center.add({
			closable: true,
			autoScroll:false,
			id:tab_id,
			iconCls: 'add16',          
			title: tab_title,
			items:[grid]
		}).show();
    },
    showTabs:function(parentTab,childTab){
		alert("show tabs");
    	/*
    	var i=0;
			var m=0;
			var tab_title=parentTab.text;
			var tab_src=parentTab.srcurl;
			var tab_id=parentTab.itemid;
			var tabs_center=Ext.getCmp("layout_center");
			var tab_len=tabs_center.items.length;
			tabs_center.items.each(function(item) { 
				if(item.id==tab_id){
					i++;
				}
				if(i==0){
					m++;
				}
			});
      if(i>0){
      	tabs_center.remove(m);
     	} 
      if(tab_len>5){
      	tabs_center.remove(1);  
      }

      var grid=Ext.create(tab_src,{activeTab:childTab});
      
      //Ȩ�޴���
      var str = right_fun;
    
      grid.items.each(function(item){
//console.info(str,",",item.getId(),",",str.indexOf(item.getId()));
      	if(str.indexOf(item.getId())== -1){
      		item.destroy();
      	}
      });
      
      tabs_center.add({
        closable: true,
        autoScroll:false,
        id:tab_id,
        iconCls: 'add16',          
        title: tab_title,
        items:[grid]
      }).show();
      //Ext.getCmp('lay_'+tab_id).setActiveTab(childTab);
      */
  
    },
    refreshComTree: function(){
      Ext.getCmp('treeBtn').fireEvent('click');
    }

 
});
