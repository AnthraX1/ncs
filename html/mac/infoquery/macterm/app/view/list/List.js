
var g_dispname;					//�û��������groupid��username
var g_typename = "";		//ȫ�֣�Ĭ�ϴӹ�������������ѡ���������ƻ�������;
												//�����û��ǵ�������������(Ϊ0)����������(Ϊ1)
												
var g_Groupid = "";			//ȫ�֣��������ƶ�Ӧ groupid 
var g_Username = "";		//ȫ�֣��������ƶ�Ӧ username
																								

var g_count = 0;				//������ȫ�������ֻ���

var clickRecord = "";   //��ȡ�����ӵ��ʱ����


/* ��ೡ��������������ó������ƣ�ֱ�ӿ��ں�̨��ѯ ncsuser ���е� username */
function setSearchValue(typename, dispname){

	g_typename = typename;
	g_dispname = dispname;
		
  /* �������������ƻ����������õ��������˵� */	
	Ext.getCmp("id_mac_placetree").setValue(dispname);				
	
	/* ��� callback ��ȡjson��ȥ������ distinctCount */
	var store = Ext.ComponentQuery.query('authloglist')[0].getStore();	
	store.load({callback : function(r, option, success) {   
		
		var responseText =  eval("("+option.response.responseText+")");        		                
		var g_distinctCount = "";
		g_distinctCount = responseText.distinctCount;
    				
		var str = 'ȥ�غ�ɼ���mac���� <span style="color:red;font-size:1.5em">' + g_distinctCount + '</span>';							 						
		Ext.getCmp("id_click_leftplace").setText(str);     
    //alert("����������ص�" + g_distinctCount);
               
    //��ȫ�ֱ�־�ָ�Ĭ��ֵ              
		g_typename = "";  
    g_Groupid  = "";
		g_Username = "";   
		               
	}}); 
}
  
/* ���Ͻ����������룬�����ֻ������� Ǯ���� 2015/9/14 10:32 */
function setFieldVname(phonenumber){
	Ext.getCmp("keyword_mobileaccount").setValue(phonenumber);
	g_count++;
		
	alert("in setFieldVname,"+g_count);
		
	var store = Ext.ComponentQuery.query('authloglist')[0].getStore();
	store.load({callback : function(r, option, success) {  
		 
		var responseText =  eval("("+option.response.responseText+")");        		                
		var g_distinctCount = "";
		g_distinctCount = responseText.distinctCount;
	  				
		var str = 'ȥ�غ�ɼ���mac���� <span style="color:red;font-size:1.5em">' + g_distinctCount + '</span>';						 						
		Ext.getCmp("id_click_leftplace").setText(str);     
	  //alert("mac��־ҳ���µ��һ������" + g_distinctCount);
	   
	  //��ȫ�ֱ�־�ָ�Ĭ��ֵ               
		g_typename = "";  
	  g_Groupid  = "";
		g_Username = "";
				              
	}});
} 



/* �����ӣ��ն�mac */
function ghostMac(value, p, record){
	
	//var str = Ext.String.format('<a href="#" style="color:blue" onclick="checkMacInfo(\'{1}\')">{0}</a>', value, value);
	
	var str = Ext.String.format('<a href="#" style="color:blue" onclick="(\'{1}\')">{0}</a>', value, value);

	//�������ܵĳ�����	
	//var str = Ext.String.format('<a href="#" id="ghostMac_copy_a" style="color:blue" data-clipboard-text="{2}" onclick="checkMacInfo(\'{1}\')">{0}</a>',  value, value, value);
	//alert(str);
	
	return str;
}

// (��δʹ�� 2015/9/18 16:00)�����ӹ��ܣ��ն�mac, ����mac�������; ������ʾmac�����Ϣ 
function checkMacInfo(mac){
			
	Ext.getCmp("keyword_mobileaccount").setValue(mac);

  //��ȡѡ��ʱ�� 
  var time_Flag = getTimeFlag();  
  
  parent.showMacWindow(mac, time_Flag);
  
  /* IE�¸������ݵ������� */	
	window.clipboardData.setData('Text', mac);
	copyToClipboard(mac);	
  
	//���ƹ���
	/*var client2= new ZeroClipboard(document.getElementById("ghostMac_copy_a"), { movie: "/mac/infoquery/macterm/app/zeroclipboard/ZeroClipboard.swf" });
    client2.on("ready", function(readyEvent) {
        client2.on("aftercopy", function(event) {
            alert("���Ƴɹ�������Ϊ: " + event.data["text/plain"]);
        });
   });	
   */						
}



/* �����ӣ���ʷssid�б� */
function ghostHistorySsid(value, p, record){
	var str = Ext.String.format('<a href="#" style="color:blue" onclick="checkHistorySsid(\'{1}\')">{0}</a>', '��ʷssid�б�', '��ʷssid�б�');
	//alert(str);
	return str;
}

// �����ӹ��ܣ���ʷssid�б�, �����������̨ 
function checkHistorySsid(){
	var rows = Ext.getCmp('id_maclogtable').getSelectionModel();
	var macvalue = [];
	for(var i = 0; i <rows.selected.items.length;i++){											
			macvalue.push([rows.selected.items[i].data.mac]);			
	}
	
	var tabPaneledit = new Ext.Panel({
			frame: true,
      layout: 'form',
      activeTab: 0,
			items:[{
				html: '<iframe src="/mac/infoquery/macterm/historyssid/historyssid.html" frameborder="no" style="width:100%;height:900px;"></iframe>'
			}]			
		});
		
	var win1 = Ext.widget('window', {
  	title: '��ǰmac��' + macvalue ,    
    x:parent.grid_width/5,
	  y:parent.grid_height/5,
	  width: parent.grid_width/2,
		height: parent.grid_height/2,
		id: 'id_historyssid',
		autoScroll: true, 
    resizable: false,
    draggable:true,
    modal:true,
    items: tabPaneledit
  });
       
	win1.show();			
}	



/* �����ӣ�������֤�˺� */
function ghostVname(value, p, record){
	var Vname = [];
		
	Vname = value.split(','); 
	var str="";
	for(var i in Vname){	
		if(i==0){
			str = Ext.String.format('<a href="#" style="color:blue" onclick="(\'{1}\')">{0}</a>', Vname[i], Vname[i]);	
		}	else{
			str = str +","+ Ext.String.format('<a href="#" style="color:blue" onclick="(\'{1}\')">{0}</a>', Vname[i], Vname[i]);	
		}		
					
	}	
	//var str = Ext.String.format('<a href="#" style="color:blue" onclick="checkVname(\'{1}\')">{0}</a>', value, value);
	
	//����
	//var str = Ext.String.format('<a href="#" id="ghostMac_copy_a" style="color:blue" data-clipboard-text="{2}" onclick="checkVname(\'{1}\')">{0}</a>',  value, value, value);
	
	return str;
}

//(��δʹ�� 2015/9/19 17:21)�����ӹ��ܣ��鿴������֤�˺Ź�����Ϣ, mac���������
function checkVname(vname){
	Ext.getCmp("keyword_mobileaccount").setValue(vname);
		
	var rows = Ext.getCmp('id_maclogtable').getSelectionModel();
	var macValue = [];
	var vnameValue = [];
	for(var i = 0; i <rows.selected.items.length;i++){											
			macValue.push([rows.selected.items[i].data.mac]);	
			vnameValue.push([rows.selected.items[i].data.vname]);			
	}

		
	var tabPanel = new Ext.Panel({
			frame: true,
      layout: 'form',
      activeTab: 0,
			items:[{		
				html: '<iframe src="/pronline/Msg?FunName@ncsMacLog_ChosenMac_NetAuthID&mac@' + macValue + '" frameborder="no" style="width:100%;height:1000px;"></iframe>'										
			}]			
		});
		
	var win2 = Ext.widget('window', {
  	title: '��ǰ������֤�˺�Ϊ��' + vnameValue ,    
    x:20,
    y:80,
    width: 300,
		height: 500,
		id: 'id_vname',
    resizable: false,
    draggable:true,
    modal:true,
    
    items: tabPanel
  });
       
	win2.show();
			
}	

/* �����ӣ��������� */
function ghostServicename(value, p, record){
	
	//var str = Ext.String.format('<a href="#" style="color:blue" onclick="checkMacInfo(\'{1}\')">{0}</a>', value, value);
	
	var str = Ext.String.format('<a href="#" style="color:blue" onclick="(\'{1}\')">{0}</a>', value, value);	
	return str;
}


//��ȡʱ�������� Text ��Ӧ�� value
function getTimeFlag(){
	
	var timeFlagText = Ext.getCmp('time_flag').getText(); 
	var time_Flag = "1";
  switch(timeFlagText){
	  	case "����":
	  		time_Flag = "1";
	  		break;
	  	case "�������":
	  		time_Flag = "2";
	  		break;
	  	case "���һ��":
	  		time_Flag = "3";
	  		break;
	  	case "���һ��":
	  		time_Flag = "4";
	  		break;
	  	case "�������":
	  		time_Flag = "5";
	  		break;
	  	case "�������":
	  		time_Flag = "6";
	  		break;			
	  	deault:
	  	  time_Flag = "1";			    
	};
  //alert(timeFlagText + " , " + time_Flag);
  
  return time_Flag;        
}

//�������У���������Ҫ store Ǯ���� 2015/9/15 10:58
var store_areatree=Ext.create('Ext.data.TreeStore',{
		id:'store_areatree', 
		fields: ['text','id','code'],
		autoLoad : false,		
		proxy:{
			type: 'ajax',
			//url: '/pronline/Msg?FunName@ncsTreeUser_v9&plate@v4/ncs_user_tree.htm'
			
			url: '/pronline/Msg?FunName@ncsMacLog_ChosenMac_ChoseQueryPlace'
		},
		root: {
			text: 'ȫ������',
			id: 'all',			
			expanded: true
		}
}); 


//ȫ�ֺ�������������		
function funFeatureAnalysis(typemark){
	
	var macValue; 
	if(typemark == "1")					       
		macValue = clickRecord.data.mac;
	else
	{
		macValue = Ext.getCmp('keyword_mobileaccount').value;
		if(macValue == ''){
			alert('��������MAC��Ϣ');
			return ;
		}	
	}
	
	var time_Flag = getTimeFlag();    		
	//alert(time_Flag + " In funFeatureAnalysis," + macValue);  			
	parent.macGlobalCtx.setGlobalInfoTime(time_Flag);
	parent.macGlobalCtx.setGlobalInfoMac(macValue);		
	
	var tabPanel = new Ext.TabPanel({           
		frame: true,
    layout: 'form',
    activeTab: 0,
    items: [{
      title: 'Ƶ�����ֵ�ʱ��',
      html: '<iframe src="/mac/infoquery/macterm/featureanalysis/ChosenMacTimeOftenCount.html" frameborder="no" style="width:100%;height:900px;"></iframe>'
    },{
      title: 'Ƶ�����ֵĳ���',
      html: '<iframe src="/mac/infoquery/macterm/featureanalysis/ChosenMacPlaceOftenCount.html" frameborder="no" style="width:100%;height:900px;"></iframe>'
    },{
      title: 'Ƶ�����ֵĳ�������',
      html: '<iframe src="/mac/infoquery/macterm/featureanalysis/ChosenMacPlaceTypeOftenCount.html" frameborder="no" style="width:100%;height:900px;"></iframe>'
    }]
  });
	
	var winFeatureAnalysis = Ext.widget('window', {
    title: '��������',			
    x:parent.grid_width/5,
	  y:parent.grid_height/5,
	  width: parent.grid_width/1.4,
		height: parent.grid_height/1.5,
    resizable: false,
    draggable:true,
    modal:true,
    items: tabPanel
  });
     
  winFeatureAnalysis.show();  	
}

//ȫ�ֺ����������Ϣ
function funInfoCheck(typemark){
	
	var macValue; 
	if(typemark == "1")					       
		macValue = clickRecord.data.mac;
	else
	{
		macValue = Ext.getCmp('keyword_mobileaccount').value;
		if(macValue == ''){
			alert('��������MAC��Ϣ');
			return ;
		}	
	}	
      		
	parent.macGlobalCtx.setGlobalInfoMac(macValue);
	var tabPanel = new Ext.Panel({
		frame: true,
		layout: 'form',
		activeTab: 0,
		items:[{
			html: '<iframe src="/mac/infoquery/macterm/idcheck/idcheck.html" frameborder="no" style="width:100%;height:900px;"></iframe>'
		}]			
	});
		
	var winInfoCheck = Ext.widget('window', {
	  title: '��ݲ鿴MAC�� ' + macValue,				  
	  x:parent.grid_width/5,
	  y:parent.grid_height/5,
	  width: parent.grid_width/2,
		height: parent.grid_height/2,
		id: 'id_infocheck',
	  resizable: false,
	  draggable:true,
	  modal:true,
	  items: tabPanel
  });
 
  winInfoCheck.show(); 
}	

//ȫ�ֺ��������벼��
function funJoinGroupControl(typemark){
	
	var macValue; 
	if(typemark == "1")					       
		macValue = clickRecord.data.mac;
	else
	{
		//�ж��û��Ƿ���ѡ���
		if(!(Ext.getCmp('id_maclogtable').getSelectionModel().selected.length)){
			alert("��ѡ����Ҫ��������mac");
			return;
		}			
	}				
	
	var tabPanel = new Ext.Panel({    
		frame: true,
    layout: 'form',
    activeTab: 0,
    items: [{             
      html: '<iframe src="/mac/infoquery/macterm/joingroup/joingroup.html" frameborder="no" style="width:100%;height:1000px;"></iframe>'
    }]
	});
	
	var winJoinControl = Ext.widget('window', {
    title: '�������',
    style: 'font-size: 25px',			
    x:parent.grid_width/5,
	  y:parent.grid_height/5,
	  width: parent.grid_width/2,
		height: parent.grid_height/2,
    resizable: false,
    draggable:true,
    modal:true,
    items: tabPanel
	});

	winJoinControl.show();
	
}	

//ȫ�ֺ���������������ƣ��鿴������ϸ�����ӵ�ͼ
function funPlaceDetail(){
	//��ȡ������
	// FunName : ncsSysystem_alarmOne&sid@'sid'
	// plate : /home/ncmysql/ncs/plate/normally/proauth_system_alarmOne.htm
	
	var value = clickRecord.data.servicename;
	var itemRush=[];
	var username = "";			//��������
	var userDispname = "" ;		//������
	var groupname = "";			//��������
	var address = "";			//������ַ
	var totalCount = 0;			//�豸����
	var data =[] ;
	var jyxz;					//��Ӫ����
	var groupcode ="";			//1->��Ӫ�ԡ� 2->�Ǿ�Ӫ�ԡ� 3->���߲ɼ�ǰ��
	var status;					//���ߡ�����
	var statuscode;				//1->���ߡ� 2->����

	Ext.Ajax.request({
			url: '/pronline/Msg?FunName@ncsSysystem_alarmOne&dispname@'+value, 
			method: 'GET',
			success: function(resp,opts) {
				try{
					var respRecord =  resp.responseText;
					var record = eval("("+respRecord+")");	//�ַ���ת�ɽṹ��	
									
					
					username = record.username;
					userDispname = record.userDispname;
					groupname = record.groupname;
					address = record.address;
					groupcode = username[6];
					
					totalCount = record.totalCount;
					data = record.data;
					//�жϾ�Ӫ����
					
					switch(groupcode){
						case "1":
							jyxz = "��Ӫ��";
							break;
						case "2":
							jyxz = "�Ǿ�Ӫ��";
							break;
						case "3":
							jyxz = "���߲ɼ�ǰ��";
							break;
						default:
							jyxz = "����";
							break;
					}
					if(address==""){
						address='��';
					}
					
					itemRush.push(
						{html:'<a align="left"><b>��������</b></a>' + '<a align="right">'+ groupname+'</a>'},
						{html:'<a align="left"><b>��Ӫ���ʣ�</b></a>' + '<a align="right">' + jyxz+'</a>'},
						{html:'<a align="left"><b>�������ƣ�</b></a>' + '<a align="right">'+ userDispname+'</a>'},
						{html:'<a align="left"><b>�������룺</b></a>' + '<a align="right">' + username+'</a>'},
						{html:'<a align="left"><b>������ַ��</b></a>'},{html:'<a align="left">'+address+'</a>'},
						{html:'<a align="left"><b>�����豸�б�</b></a>'},{html:'<a align="left">'+totalCount+'</a>'}
					);
		
					for( var i=0; i< totalCount; i++){
						statuscode = data[i].statuscode;
						if(statuscode =='1'){
							status ='<font color=green>����</font>';
						}else if(statuscode =='2'){
							status ='<font color=red>����</font>';
						}
						itemRush.push({html:'<a align="left">'+data[i]['aplistDispname']+'</a>'}, 
							{html:'<a align="left">'+status+'</a>'}
						);
					}
					createDetailWin(itemRush);
				}
				catch(e){
					//console.log(e.message);
				}	
			},   
			failure: function(resp,opts) {   
				var respText = eval("("+respText+")");
				alert('����', respText.error);   
			}   				 
		});
		
	function createDetailWin(itemRush){	
		//��������
		var mytable = Ext.create('Ext.panel.Panel', {
			//title: '������Ϣ',
			layout: {
				type: 'table',
				columns: 2,		//����
				tableAttrs:{
					width:'100%'
				}
			},
			defaults: {
				bodyStyle: 'padding:5px',			
			},
			items:itemRush
		});
		
		var mywin = Ext.create('Ext.window.Window',{
			title:'������Ϣ',
			x:parent.grid_width/5,
		  y:parent.grid_height/5,
		  width: parent.grid_width/2,
			height: parent.grid_height/4,
			autoScroll: true,  
			resizable:false,
			items:mytable
		});
		mywin.show();
	}
}	

//ȫ�ֺ��������������֤�˺ţ��鿴�������
function funNetAuthID(){
		
	var macValue = clickRecord.data.mac;
	var vnameValue = clickRecord.data.vname;
		
	var tabPanel = new Ext.Panel({
			frame: true,
      layout: 'form',
      activeTab: 0,
			items:[{		
				html: '<iframe src="/pronline/Msg?FunName@ncsMacLog_ChosenMac_NetAuthID&mac@' + macValue + '" frameborder="no" style="width:100%;height:1000px;"></iframe>'										
			}]			
		});
		
	var winRelateId = Ext.widget('window', {
  	title: '��ǰ������֤�˺�Ϊ��' + vnameValue ,    
    x:parent.grid_width/5,
	  y:parent.grid_height/5,
	  width: parent.grid_width/3,
		height: parent.grid_height/3,
		id: 'id_vname',
		autoScroll: true, 
    resizable: false,
    draggable:true,
    modal:true,
    
    items: tabPanel
  });
       
	winRelateId.show();
}

Ext.define('proauthRzAuthlog.view.list.List1', {
	extend:'Ext.panel.Panel',
    alias : 'widget.myselfPanel',    
    tbar: [    
		/*{
			//fieldLabel:'��ѡ��ʱ��',
			//labelWidth: 70,			
			xtype: 'combo',
			mode: 'local',                          
			//inputType: 'button',
      triggerAction:  'all',
      forceSelection: true,      
      width:100,
      editable:       false,   
      id:             'time_flag',                           
      name:           'time_flag',
      displayField:   'name',
      valueField:     'value',
      queryMode:     'local',
      store: Ext.create('Ext.data.Store', 
      {
          fields : ['name', 'value'],
          data   : 
          [
              {name : '����',   value: '1'},
              {name : '�������',  value: '2'},
              {name : '���һ��',  value: '3'},
              {name : '���һ��',   value: '4'},
              {name : '�������',  value: '5'},
              {name : '�������',  value: '6'}
          ]
      }),
      emptyText:'����',                        
      allowBlank:true
		}, */		
		
		{			
			xtype: 'cycle',			
			showText: true,
			id: 'time_flag', 			
			menu: 
			{
        items: 
        [
            { text: '����'},
            { text: '�������'},
            { text: '���һ��'},
            { text: '���һ��'},
            { text: '�������'},
            { text: '�������'} 
        ]
    	}    	  	
		},
		'-',
		'-',
		'-',
		{
			xtype:'label',
			width: 80,
			id:'id_click_leftplace',
			text:'������ؼ���'						
		},
		{				
    	xtype:'textfield',
      id:'keyword_mobileaccount',
      width:200,
      name:'export',
      //style:'color:#7aa7d5',             
      emptyText:'������MAC��Ϣ��XX-XX-XX-XX-XX-XX',							
			value: '',
      enableKeyEvents:true,
      listeners:{
      	'focus':function(){
        },            
        'keydown' : function(i,e){
        	var aae=e.getKey() ; 
          	if(aae==13){
            }
          }
      }
     },
     '-',
     {
     	text:'��ѯ',
      iconCls:'accept',
      action:'keycx'
     },
     '-',
     {
     	text:'�߼�',
      anchor: 'right',
     	action:'advancecx',
      iconCls:'option'
     },
     '-',
     {
     	/*text:'����ѡ��',
     	xtype:'treecombox',
      anchor: 'right',
     	action:'choseplace',
      iconCls:'option'
      */
      
      id:'id_mac_placetree',
			name: 'groupid',
			width: 100,						
			xtype: 'treecombox',														
			valueField: 'id',									
			displayField: 'text',						
			store:store_areatree
     },               
     {
     	xtype:'button',						
			id:'id_click_leftplace',
			text:''
     }     
   ]
});


Ext.define('proauthRzAuthlog.view.list.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.authloglist',
    store : 'List', 
    height:parent.grid_height+25,
    width:parent.grid_width,	
    id:'id_maclogtable',
		
    autoScroll: true,    	
		scrollOffset: 0,
    title:'',
    columnLines: true,
    initComponent: function() {	
		var sm = Ext.create('Ext.selection.CheckboxModel',{
	    listeners: {
	        selectionchange: function(sm, selections) {  
	            var grid=Ext.ComponentQuery.query('authloglist')[0];
	            grid.down('#id_joingroupcontrol').setDisabled(selections.length == 0); 
	        }
	    }
    });
    this.selModel=sm;
		
		this.tbar = Ext.create('Ext.PagingToolbar',{
	    store:'List',
	    displayInfo: true,
	    id:'id_tbar_paging',
	    autoWidth:true,
	    displayMsg: '��ʾ{0} - {1}����¼ ��{2}����¼',
	    emptyMsg: "û�м�¼����ʾ",
        items:[
				'-',
				'-',
        {
            text:'��������',
            anchor: 'termacttrait',
            action:'termac',
            iconCls:'tezhengfenxi'
        },
				'-',
        {
            text:'��Ա�켣',
            anchor: 'termmap',
            action:'termmacmap',
            iconCls:'renyuanguiji'
        },
				'-',
        {
            text:'�����Ϣ',
            anchor: 'idedit',
            action:'idcheck',
            iconCls:'shenfenchakan'
        },
				'-',
				{
            text:'���벼��',
            anchor: 'right',
            action:'joingroup',
            iconCls:'jiarufenzu',
            id:'id_joingroupcontrol',            
            disabled:true
        },	
				'-',
        {
            text:'����',
            anchor: 'termexport',
            action: 'export',
            iconCls: 'exportimg'          
	
        },
        	{xtype:'label', html:'<span id="titledx"></span>'}
        ]
    });
    
    
    /* ����ն�mac ���ܹ����������������������Ϣ�����벼�ء��켣��ͼ */
    
    //��������
    var featureAnalysis = Ext.create('Ext.Action', {
	    iconCls   : 'tezhengfenxi',  
	    text: '��������',	    
	    handler: function() {
	      	           		    
  			funFeatureAnalysis("1");
	    }
  	});
    
    //�����Ϣ
  	var infoCheck = Ext.create('Ext.Action', {
      iconCls: 'shenfenchakan',
      text: '�����Ϣ',      
      handler: function() {
      	funInfoCheck("1");        	            	
      }
    });
    
    //���벼��
  	var joinGroupControl = Ext.create('Ext.Action', {
      iconCls: 'jiarufenzu',
      text: '���벼��',      
      handler: function() {
      	funJoinGroupControl("1");        	            	
      }
    });
    
    //�ն�mac�˵�        
    var contextMacMenu = Ext.create('Ext.menu.Menu', {
        items: [
            featureAnalysis,
            infoCheck,
            joinGroupControl            
        ]
    }); 
    
    /* ����������ƹ�������������ϸ�����ӵ�ͼ */
    var placeDetail = Ext.create('Ext.Action', {
      iconCls: 'jiarufenzu',
      text: '������ϸ',      
      handler: function() {
      	funPlaceDetail();        	            	
      }
    });
    
    var electricMap = Ext.create('Ext.Action', {
      iconCls: 'electricmap',
      text: '���ӵ�ͼ',      
      handler: function() {
      	alert("���ӵ�ͼ");        	            	
      }
    });
    
    //�������Ʋ˵�
    var contextServicenameMenu = Ext.create('Ext.menu.Menu', {
        items: [
            placeDetail,
            electricMap           
        ]
    });
    
    /* ���������֤�˺Ź�������������� */
    var relateId = Ext.create('Ext.Action', {
      iconCls: 'relateid',
      text: '�������',      
      handler: function() {
      	 funNetAuthID();    	            	
      }
    });
    
    //������֤�˺Ų˵�
    var contextNetAuthID = Ext.create('Ext.menu.Menu', {
        items: [
           relateId          
        ]
    });
    
    this.viewConfig = {
        stripeRows: true,
        listeners: {
            cellclick: function (table, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                e.stopEvent();
                if(cellIndex == 1){
                	//parent.xxx(e.getX(), e.getY(), record);
                	//parent.contextMacMenu.showAt(e.getX()+215, e.getY()+99);
                	
                	contextMacMenu.showAt(e.getX(), e.getY());                	                	
                	Ext.getCmp("keyword_mobileaccount").setValue(record.data.mac);
                	Ext.getCmp("id_joingroupcontrol").setDisabled(false);
                	clickRecord = record;
                }
                else if(cellIndex == 2){
                	contextNetAuthID.showAt(e.getX(), e.getY());                	                	
                	Ext.getCmp("keyword_mobileaccount").setValue(record.data.vname)
                	clickRecord = record;
                }
                else if(cellIndex == 5){
                	contextServicenameMenu.showAt(e.getX(), e.getY());                	
                	clickRecord = record;
                }                		
                return false;
            }
        }
   	};
						
    this.columns = [
      			
    {header: '�ն�MAC��ַ', dataIndex: 'mac', width:130,
			renderer: ghostMac
		},
		{header: '������֤�˺�', dataIndex: 'vname',  flex: 1,
			renderer: ghostVname
		},
		{header: '�ɼ�ʱ��', dataIndex: 'stime',	width:140},			
		{header: '�ն˳�ǿ', dataIndex: 'rssi',   flex: 1},					
		{header: '��������', dataIndex: 'servicename', flex: 1,
			renderer: ghostServicename
		},			
		{header: '��ȫ����', dataIndex: 'factoryname', width:80, 
			renderer:function(value,metaData,record){
		        return "�Ϻ�������";
			}
		},
		{header: '�ɼ��豸����', dataIndex: 'dispname', flex: 1, hidden: true},								
		{header: '�������', dataIndex: 'servicecode',  flex: 1, hidden: true},            
    {header: '�ɼ��豸���', dataIndex: 'apname', flex: 1}, 
		{header: '�ɼ��豸����', dataIndex: 'longitude', flex: 1},
    {header: '�ɼ��豸γ��', dataIndex: 'latitude', flex: 1},			            
		{header: '�ն�Ʒ��', dataIndex: 'termtype', flex: 1},			              			
		{header: '��Բɼ��豸X����', dataIndex: 'xpos', flex: 1, hidden: true},
    {header: '��Բɼ��豸Y����', dataIndex: 'ypos', flex: 1, hidden: true},
		{header: '�����ȵ�SSID', dataIndex: 'ssid', flex: 1},
		{header: '��ʷSSID�б�', dataIndex: 'historyssid', flex: 1,	 
			renderer: ghostHistorySsid
		},	
		{header: '�����ȵ�MAC', dataIndex: 'apmac', flex: 1, hidden: true},
		{header: '�����ȵ�Ƶ��', dataIndex: 'channel', flex: 1},
		{header: '�����ȵ��������', dataIndex: 'security', flex: 1,
			renderer:function(value,metaData,record){
		        if(value=='01'){return 'WEP'}
		        else if(value=='02'){return 'WPA'}
		        else if(value=='03'){return 'WPA2'}
		        else if(value=='04'){return 'PSK'}
		        else if(value=='99'){return '����'}
		        else {return ''}
			}            	
     }			            
    ];	
		
		this.callParent(arguments);	
   }	
});



