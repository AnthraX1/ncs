
var bInfoquery = true;
var bAlarm = false;
var bDm = false;
var bOperation = false;
var bSystemset = false;
var globalSelectId = "";
var globalSelectGroupId = "itm_infoquery";

var mapInfoquery = {'id_infoquery_mac':'MAC��', 'id_infoquery_hotspot':'�ȵ��ѯ', 'id_infoquery_place':'�����ɼ��豸', 'id_infoquery_move':'�ƶ��ɼ��豸', 'id_infoquery_id':'ʵʱ��Ϣ'};
var mapAlarm = {'id_alarm_controlmanage':'���ع���', 'id_alarm_peoplecalled':'�Ӿ���Ա����'};
var mapDm = {'id_dm_bab':'������Ϊ����', 'id_dm_sample':'��������', 'id_dm_freCharact':'��Ƶ�η���', 'id_dm_track':'�켣����', 'id_dm_sus':'�����ȵ����', 'id_dm_crowd':'��������'};
var mapOperation = {'id_operation_equipment':'�豸����', 'id_operation_normally':'�Ϲ��ȵ���Ϣ����', 'id_operation_place':'��������', 'id_operation_safety':'��ȫ���̹���', 'id_operation_terminal':'�ն������Ϣά��'};
var mapSystemset = {'id_systemset_admin':'����Ա�˺�', 'id_systemset_alarm':'ϵͳ��ά�澯', 'id_systemset_preferences':'ϵͳ��������', 'id_systemset_log':'ϵͳ��ά��־'};
var listAllMap = [mapInfoquery, mapAlarm, mapDm, mapOperation, mapSystemset];



function setItemStatById(id, isNormal){
	var hasFound = false;
	for(i in listAllMap){
		for(key in listAllMap[i]){
			if(key == id){
				hasFound = true;
				if(isNormal){
					Ext.getCmp(key).setText('<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+listAllMap[i][key]+'</font>');
				}else{
					Ext.getCmp(key).setText('<font style="font-size : 12px !important;color:#0D3967;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+listAllMap[i][key]+'</font>');
				}
				break;
			}
		}
		if(hasFound == true)
			break;
	}
}

function toggleClickItem(item){
	//�Ѿɵĸ�Ϊ��ͨ��ʽ
	if(globalSelectId != ""){
		setItemStatById(globalSelectId, true);
	}
	globalSelectId = item.id;
	setItemStatById(globalSelectId, false);
}

function setGroupHeader(isExpand, groupId){
	var groupHeader = Ext.getCmp(groupId);
	if(isExpand){
		if(groupHeader.hasCls("cls_menu_first_normal")){
			groupHeader.removeCls("cls_menu_first_normal");
			groupHeader.addCls("cls_menu_first_focus");
		}
	}else{
		if(groupHeader.hasCls("cls_menu_first_focus")){
			groupHeader.removeCls("cls_menu_first_focus");
			groupHeader.addCls("cls_menu_first_normal");			
		}
	}
}

function toggleInfoquery(bVisible){
	bInfoquery = bVisible;
	setGroupHeader(bInfoquery, "id_infoquery");
	var itm;
	for (i in mapInfoquery){
		itm=Ext.getCmp(i);
		itm.setVisible(bVisible);
	}
}

function toggleAlarm(bVisible){
	bAlarm = bVisible;
	setGroupHeader(bAlarm, "id_alarm");
	var itm;
	for (i in mapAlarm){
		itm=Ext.getCmp(i);
		itm.setVisible(bVisible);
	}
}
	
function toggleDm(bVisible){
	bDm = bVisible;
	setGroupHeader(bDm, "id_dm");
	var itm;
	for (i in mapDm){
		itm=Ext.getCmp(i);
		itm.setVisible(bVisible);
	}
}

function toggleOperation(bVisible){
	bOperation = bVisible;
	setGroupHeader(bOperation, "id_operation");
	var itm; 
	for (i in mapOperation){
		itm=Ext.getCmp(i);
		itm.setVisible(bVisible);
	}
}

function toggleSystemset(bVisible){
	bSystemset = bVisible;
	setGroupHeader(bSystemset, "id_systemset");
	var itm;
	for (key in mapSystemset){
		itm=Ext.getCmp(key);
		itm.setVisible(bVisible);
	}
}
	



Ext.Loader.setConfig({enabled: true,paths:{'ncViewer':'/js/v9'}});
Ext.define('ncViewer.App', {
    extend: 'Ext.container.Viewport',    
    uses:['ncViewer.frontPage','ncViewer.lanGroupTree','ncViewer.mac_infoquery_mac','ncViewer.mac_infoquery_move','ncViewer.mac_infoquery_place','ncViewer.mac_infoquery_current','ncViewer.mac_infoquery_hotspot','ncViewer.mac_monitoralarm_controlmanage','ncViewer.mac_monitoralarm_peoplecalled','ncViewer.mac_dm_bab','ncViewer.mac_dm_sample','ncViewer.mac_dm_freCharact','ncViewer.mac_dm_track','ncViewer.mac_dm_sus','ncViewer.mac_dm_crowd','ncViewer.mac_operation_place','ncViewer.mac_operation_equipment','ncViewer.mac_operation_safety','ncViewer.mac_operation_normally','ncViewer.mac_operation_terminal','ncViewer.mac_systemset_admin','ncViewer.mac_systemset_alarm','ncViewer.mac_systemset_preferences','ncViewer.mac_systemset_log'],
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

	 //����ͳ�Ʊ���˵�
	    var menu_tj = Ext.create('Ext.menu.Menu', {
			id: 'baseMenu',
			style: {
				overflow: 'visible'  
			},
			items: [
			  {
				  text: '�������ͳ��',
				  itemid:'vidstat',
				  srcurl:'ncViewer.proauthVidstat',  
				  handler:this.onItemClick       
			   },
			   {
				  text: '��������ͳ��',
				  itemid:'usersstat',
				  srcurl:'ncViewer.proauthUsersStat',  
				  handler:this.onItemClick
		   
			   }
			]
		});

		menu_tj.items.each(function(item){
			if(right_fun_s.indexOf(item.text)== -1){
				item.destroy();
			}
		});
		

		
    	var tb = Ext.create('Ext.toolbar.Toolbar',{ style: 'background-image:url(/images/large/toolbarbackground.png);',id: "maintab"});
    	    tb.add({
	    	    itemid:'logo',
				xtype:'label',
        		html:'&nbsp;<img src="/images/mac/banner_logo.png" style="margin:0 30px 0 30px;" width="125" height="40">'
         	},'-',{
				text: '��ҳ',
				itemid:'itm_frontPage',
				scale:'large',
				iconAlign: 'top',
				srcurl:'ncViewer.frontPage',
				iconCls: 'dvd',
				handler:this.onItemClick        
			}
			/*,'-',{
				itemid:'rzck',
				hidden:false,
				text:'��־�鿴',
				scale:'large',
				iconCls: 'search',
				iconAlign: 'top',
	//            menu:menu_procy
				srcurl:'ncViewer.proauthRz',
				handler:this.onItemClick
			},'-',{
				itemid:'aqcs',
				hidden:false,
				text:'��ȫ���̹���',
				scale:'large',
				iconCls: 'address',
				iconAlign: 'top',
				srcurl:'ncViewer.proauthSfac',
				handler:this.onItemClick
			},'-',{
				itemid:'itm_infoquery_hotspot',
				hidden:false,
				text:'�ȵ���Ϣ',
				scale:'large',
				iconCls: 'lamp',
				iconAlign: 'top',
				srcurl:'ncViewer.mac_infoquery_hotspot',
				handler:this.onItemClick
			},'-',{
				itemid:'itm_infoquery_mac',
				hidden:false,
				text:'�ն�������Ϣ',
				scale:'large',
				iconCls: 'sitemap',
				iconAlign: 'top',
				srcurl:'ncViewer.mac_infoquery_mac',
				handler:this.onItemClick
			},'-',{
				itemid:'itm_infoquery_move',
				hidden:false,
				text:'�ƶ�AP�켣',
				scale:'large',
				iconCls: 'dvd',
				iconAlign: 'top',
				srcurl:'ncViewer.mac_infoquery_move',
				handler:this.onItemClick
			},'-',{
				itemid:'tjbb',
				hidden:false,
				text:'ͳ�Ʊ���',
				scale:'large',
				iconCls: 'static',
				menu:menu_tj,
				iconAlign: 'top'
			}, '-',{
				itemid:'glyzh',
				hidden:false,
				text:'����Ա�ʺ�',
				scale:'large',
				iconCls: 'address',
				iconAlign: 'top',
				srcurl:'ncViewer.proauthSysuser',
				handler:this.onItemClick
			}, '-',{
				itemid:'sysset',
				hidden:false,
				text:'ϵͳ����',
				scale:'large',
				iconCls: 'pencil',
				iconAlign: 'top',
				srcurl:'ncViewer.portalSysset',
				handler:this.onItemClick
			} */, '-','-','->','->',
			{
				xtype:'combo',
				id:'id_global_search',
				width:200,
				//cls:"search_box", 
				name:'name_global_search',
				frame:false,
				text:'MAC/�ֻ���/��������',
				enableKeyEvents:true,
				listeners:{
					'focus':function(i){
							if(Ext.getCmp("id_global_search").getText() == "MAC/�ֻ���/��������"){
								Ext.getCmp("id_global_search").setText("");
							}							
                    },
                    'keydown' : function(i,e){
                        var aae=e.getKey() ; 
                        if(aae==13){
                        }
                    }
				}
			},{
	    	    itemid:'eee',
				xtype:'label',
        		html:'&nbsp;<img src="/images/large/search.png" style="margin-left:-205px;" width="15" height="15">'
         	},{
				text: 'ϵͳˢ��',
				itemid:'xtsx',
				scale:'large',
				iconAlign: 'top',
				iconCls: 'refresh',
				handler: this.onItemReflash
			},'-',{
				text: '���µ�¼',
				scale:'large',
				itemid:'cxdl',
				iconAlign: 'top',
				iconCls: 'unlock',
				handler: this.onItemClose
			},{
				text: '�˳�ϵͳ',
				scale:'large',
				itemid:'tcxt',
				iconAlign: 'top',
				iconCls: 'macs',
				handler: this.onItemClose2
			}        
        ); 
        
        //console.info(right_fun_s);
        var isep=0;


/*  Ȩ����ʱע�͵�
         tb.items.each(function(item){
 //     console.info(right_fun_s);
 //     console.info(item.text);
      	if((right_fun_s.indexOf(item.text)!=-1)||(item.text=='ϵͳˢ��')||(item.text=='���µ�¼')||item.itemid=='logo'){
      	
      	    item.hidden=false;
      	    isep=1;
      	 
      	}
      	else{
      		if(item.text){

      			item.hidden=true;
      			isep=0;
      		
      		}
      		else{
      			
      			if(isep==0){
      			 item.hidden=true;
      			 isep=1;
      			}
      			else{
      				item.hidden=false;
      				isep=0;
      			}
      		}
      	
      	}

      	 
      	});  
 */
		this.toolPanel = Ext.create(Ext.panel.Panel, {
             id: 'header',
             margins: '0 2 0 2',
             border: true,
             region: 'north',
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
    	var left_tabs=Ext.createWidget('tabpanel', {
			width: 290,
			border:false,
			margins: '0 0 0 0',
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
   
		left_tabs.add({
						closable: false,
						border:false,
						items:[Ext.create(ncViewer.lanGroupTree)],
						title: '���볡��'
		});
	//     
		var sy_obj;
		var sy_title,sy_id;
		if(right_sy=='��־�鿴'){
			sy_title='��־�鿴';
		}
		else if(right_sy=='��λ����'){
			sy_title='��λ����';
		}
		else if(right_sy=='���з���'){
			 sy_title='���з���';
		}
		else if(right_sy=='���볧�̹���'){
			 sy_title='���볧�̹���';
		}
		else if(right_sy=='ͳ�Ʊ���'){
			 sy_title='ͳ�Ʊ���';
		}
		else if(right_sy=='ϵͳ����'){
			 sy_title='ϵͳ����';
		}
		else if(right_sy=='ϵͳ����'){
			 sy_title='ϵͳ����';
		}
		else{
			sy_title='��λ����';
		}
		var formTmp = Ext.create('Ext.form.Panel');
		  
		this.leftPanel=Ext.create(Ext.panel.Panel, {
				id: 'left',
				margins: '0 2 0 2',          
			   // layout: 'border',
				title:'��ǰλ�ã�'+sy_title,
				region: 'west',
				collapsible: true,
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
				//bodyStyle: 'background:#F0F3F8;',
				split:true,
				width: 200,
				minWidth:200,
				maxWidth:500,
				minSize: 100,
				maxSize: 500,   
				items: [
						{  
							columnWidth: 10 / 10,        //�����еĿ��
							items:
							[
								{
									xtype : 'button',
									iconCls: "mi_infoquery", 
									bodyStyle: 'background:#F0F3F8;',
									cls:"cls_menu_first_focus", 
									style: 'border-radius:0;background:#D5DDF0; margin:1px 0 0px 0px;',
									text : '<font style="font-size : 14px !important;color:#0D3967;margin:10px 0 0 60px !important;">��Ϣ��ѯ</font>',
									id : 'id_infoquery',
									itemid : 'itm_infoquery',
									listeners:{
										click:this.onToggleFirst
									}
								},{
									xtype : 'button',
									hidden  : false,
									//overCls : 'clsListItemOver',
									cls:"cls_menu_second_normal", 
									text : '<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MAC��</font>',
									title : 'MAC��',
									itemid:'itm_infoquery_mac',
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
									//overCls : 'clsListItemOver',��111��
									cls:"cls_menu_second_normal", 
									text : '<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;�ȵ��ѯ</font>',
									title : '�ȵ��ѯ',
									itemid:'itm_infoquery_hotspot',
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
									//overCls : 'clsListItemOver',
									style: 'text-align: left !important;',
									text : '<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;�����ɼ��豸</font>',
									title : '�����ɼ��豸',
									id:'id_infoquery_place',
									itemid:'itm_infoquery_place',
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
									//overCls : 'clsListItemOver',
									text : '<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;�ƶ��ɼ��豸</font>',
									title:'�ƶ��ɼ��豸',
									itemid:'itm_infoquery_move',
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
									id:'id_infoquery_id',
									srcurl:'ncViewer.mac_infoquery_current',
									listeners:{
									    mouseover:this.changeOnOver,
										mouseout:this.changeOnOut,
										click:this.onItemClick
									}
								},{
									xtype : 'button',
									iconCls: "mi_alarm", 
									cls:"cls_menu_first_normal", 
									bodyStyle: 'background:#F0F3F8;',
									style: 'border-radius:0;background:#D5DDF0; margin:1px 0 0px 0px;',
									text : '<font style="font-size : 14px !important;color:#0D3967;margin:10px 0 0 60px !important;">���ظ澯</font>',
									id : 'id_alarm',
									itemid : 'itm_alarm',
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
									text : '<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;�Ӿ���Ա����</font>',
									title : '�Ӿ���Ա����',
									itemid:'itm_alarm_peoplecalled',
									id:'id_alarm_peoplecalled',
									srcurl:'ncViewer.mac_monitoralarm_peoplecalled',  
									listeners:{
										mouseover:this.changeOnOver,
										mouseout:this.changeOnOut,
										click:this.onItemClick
									}
								},{
									xtype : 'button',
									iconCls: "mi_dm", 
									cls:"cls_menu_first_normal", 
									bodyStyle: 'background:#F0F3F8;',
									style: 'border-radius:0;background:#D5DDF0; margin:1px 0 0px 0px;',
									text : '<font style="font-size : 14px !important;color:#0D3967;margin:10px 0 0 60px !important;">�����ھ�</font>',
									itemid : 'itm_dm',
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
									id:'id_dm_crowd',
									srcurl:'ncViewer.mac_dm_crowd',
									listeners:{
										mouseover:this.changeOnOver,
										mouseout:this.changeOnOut,
										click:this.onItemClick
									}
								},{
									xtype : 'button',
									iconCls: "mi_operation", 
									cls:"cls_menu_first_normal", 
									bodyStyle: 'background:#F0F3F8;',
									style: 'border-radius:0;background:#D5DDF0; margin:1px 0 0px 0px;',
									text : '<font style="font-size : 14px !important;color:#0D3967;margin:10px 0 0 60px !important;">ҵ������</font>',
									id : 'id_operation',
									itemid : 'itm_operation',
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
									text : '<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;�Ϲ��ȵ���Ϣ����</font>',
									title : '�Ϲ��ȵ���Ϣ����',
									itemid:'itm_operation_normally',
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
									text : '<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;�ն������Ϣά��</font>',
									title : '�ն������Ϣά��',
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
									iconCls: "mi_systemset", 
									cls:"cls_menu_first_normal", 
									bodyStyle: 'background:#F0F3F8;',
									style: 'border-radius:0;background:#D5DDF0; margin:1px 0 0px 0px;',
									text : '<font style="font-size : 14px !important;color:#0D3967;margin:10px 0 0 60px !important;">ϵͳ����</font>',
									id : 'id_systemset',
									itemid : 'itm_systemset',
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
									text : '<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ϵͳ��������</font>',
									title : 'ϵͳ��������',
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
									text : '<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ϵͳ��ά��־</font>',
									title : 'ϵͳ��ά��־',
									itemid:'itm_systemset_log',
									id:'id_systemset_log',
									srcurl:'ncViewer.mac_systemset_log',  
									listeners:{
										mouseover:this.changeOnOver,
										mouseout:this.changeOnOut,
										click:this.onItemClick
									}
								}
							]
						}          
					],
				dockedItems: [{
					dock: 'top',
	 //           margins: '0 0 0 0',
					border:true,
					xtype: 'toolbar',
					items: [
								{     
									width:          200,
									xtype:          'treecombox',
									mode:           'local',
									value:          '0',
									triggerAction:  'all',
									forceSelection: true,
									iconCls:'add',
									editable:       false,
									fieldLabel:     '',
									iconCls:'remove',
									style:'color:red;background:green;',
									emptyText:'ѡ��λ��ѯ',
									name:           'groupname',
									displayField:   'text',
									valueField:     'id',
									queryMode: 'local',
									value : '',
									store:store_classtree
								}            
						]
				}]

	 //            items:[left_tabs]
			});
						
			return this.leftPanel;
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
		
		if(right_sy=='��־�鿴'){
			sy_title='��־�鿴';
			sy_id='rzck';
			sy_obj=ncViewer.mac_operation_equipment;
		}
		else if(right_sy=='��λ����'){
			sy_obj=ncViewer.mac_operation_equipment;
			sy_title='��λ����';
			sy_id='dwgl';
		}
		else if(right_sy=='���з���'){
			sy_obj=ncViewer.mac_operation_equipment;
			sy_title='���з���';
			sy_id='yxfx';
		}
		else if(right_sy=='���볧�̹���'){
			sy_obj=ncViewer.mac_operation_equipment;
			sy_title='���볧�̹���';
			sy_id='jrcs';
		}
		else if(right_sy=='ͳ�Ʊ���'){
			sy_obj=ncViewer.mac_operation_equipment;
			sy_title='ͳ�Ʊ���';
			sy_id='tjbb';
		}
		else if(right_sy=='ϵͳ����'){
			sy_obj=ncViewer.mac_operation_equipment;
			sy_title='ϵͳ����';
			sy_id='system';
		}
		else if(right_sy=='ϵͳ����'){
			sy_obj=ncViewer.mac_operation_equipment;
			sy_title='ϵͳ����';
			sy_id='sysset';
		}
		else{
			sy_obj=ncViewer.frontPage;
			sy_title='��ҳ';
			sy_id='id_frontPage';
		}
      
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
		}else if('itm_alarm' == item.itemid){
			toggleInfoquery(false);
			toggleAlarm(!bAlarm);
			toggleDm(false);
			toggleOperation(false);
			toggleSystemset(false);
		}else if('itm_dm' == item.itemid){
			toggleInfoquery(false);
			toggleAlarm(false);
			toggleDm(!bDm);
			toggleOperation(false);
			toggleSystemset(false);
		}else if('itm_operation' == item.itemid){
			toggleInfoquery(false);
			toggleAlarm(false);
			toggleDm(false);
			toggleOperation(!bOperation);
			toggleSystemset(false);
		}else if('itm_systemset' == item.itemid){
			toggleInfoquery(false);
			toggleAlarm(false);
			toggleDm(false);
			toggleOperation(false);
			toggleSystemset(!bSystemset);
		}
		
	},
	changeOnOut:function(item){
		//Ext.fly(item.id).removeCls("x-btn-center_3");
		//Ext.fly(item.id).addCls("cls_menu_second_normal");
		if(item.id != globalSelectId){
			Ext.getCmp(item.id).setText('<font style="font-size : 12px !important;color:#828282;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+item.title+'</font>');
		}				
	},
	changeOnOver:function(item){
		/*
		var myself = Ext.getCmp(item.id);
		myself.removeClass("cls_menu_second_normal");
		myself.addClass("x-btn-center_3");	
		*/
		//Ext.fly(item.id).removeCls("cls_menu_second_normal");
		//Ext.fly(item.id).addCls("x-btn-center_3");	
		if(item.id != globalSelectId){
			Ext.getCmp(item.id).setText('<font style="font-size : 12px !important;color:#328BE4;margin-left: 24px !important;">��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+item.title+'</font>');
		}
	},
    onItemClick:function(item){
    	 //bbbb=document.all('ltitle');
		toggleClickItem(item);
    	var tab_title='';
    	var temp_text=item.text;    	 
    	if(temp_text.indexOf('font')== -1){
			tab_title=temp_text;
    	}
    	else{
    		tab_title=item.title;
    	}
		Ext.getCmp('left').setTitle('��ǰλ�ã�'+tab_title);          
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
