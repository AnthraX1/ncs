var g_dispname;					//�û��������groupid��username
var g_typename = "";		//ȫ�֣�Ĭ�ϴӹ�������������ѡ���������ƻ�������;
												//�����û��ǵ�������������(Ϊ0)����������(Ϊ1)
												
var g_Groupid = "";			//ȫ�֣��������ƶ�Ӧ groupid 
var g_Username = "";		//ȫ�֣��������ƶ�Ӧ username
																								
var clickRecord = "";   //��ȡ�����ӵ��ʱѡ��������


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
		Ext.getCmp("id_distinctmac").setText(str);     
    //alert("����������ص�" + g_distinctCount);
               
    //��ȫ�ֱ�־�ָ�Ĭ��ֵ              
		g_typename = "";  
    g_Groupid  = "";
		g_Username = "";   
		               
	}}); 
}


/* �����ӣ��ȵ�ssid���ȵ�MAC���ó����� */
function ghostsearch(value, p, record){
	var str = Ext.String.format('<a href="#" style="color:blue" onclick="jmpPage(\'{1}\')">{0}</a>', value, value);
	//var str = Ext.String.format('<a href="#" style="color:blue" onclick="(\'{1}\')">{0}</a>', value, value);
	
	//alert(str);
	return str;
}

//(��δʹ�� 2015/9/21 09:09)�����ӹ��ܣ����õ������ 
function jmpPage(mac){
	
	Ext.getCmp("keyword_mobileaccount").setValue(mac);
	
	/* IE�¸������ݵ������� */	
	window.clipboardData.setData('Text', mac);
	copyToClipboard(mac);		

}


/* �����ӣ��������� */
function ghostServicename(value, p, record){
	
	//var str = Ext.String.format('<a href="#" style="color:blue" onclick="checkMacInfo(\'{1}\')">{0}</a>', value, value);
	
	var str = Ext.String.format('<a href="#" style="color:blue" onclick="(\'{1}\')">{0}</a>', value, value);	
	return str;
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


//ȫ�ֺ���������������ƣ��鿴���ӵ�ͼ
function funElectricMap(){
	var servicecodevalue; 						       
	servicecodevalue = clickRecord.data.servicecode;
	
			
	var paraTrack = '<iframe src="/mac/datamining/map/place.htm?servicecode=' + servicecodevalue + '" frameborder="no" style="width:100%;height:500px;"></iframe>';
	//alert(paraTrack);
		
	var tabPanel = new Ext.TabPanel({           
		frame: true,
    layout: 'form',
    activeTab: 0,
    items: [{
      html: paraTrack
    }]
  });
	
	var winPeopleTrack = Ext.widget('window', {
    title: '���ӵ�ͼ',			
    x:parent.grid_width/7,
	  y:parent.grid_height/7,
	  width: parent.grid_width/2,
		height: parent.grid_height - 120,
    resizable: false,
    draggable:true,
    modal:true,
    items: tabPanel
  });
     
  winPeopleTrack.show();

}	
	



//���ܷ�װ����ȡʱ�������� Text ��Ӧ�� value
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
			url: '/pronline/Msg?FunName@ncsMacLog_ChosenMac_ChoseQueryPlace'
		},
		root: {
			text: 'ȫ������',
			id: 'all',			
			expanded: true
		}
}); 

Ext.define('proauthRzAuthlog.view.list.List1', {
	extend:'Ext.panel.Panel',
  alias : 'widget.myselfPanel',
  tbar: [	
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
	{
		id:'keyword_mobileaccount',
		title:'',
		xtype:'label',
        html:'<input id="id_keyword_mobileaccount" type="text" value="�������ȵ�����"/>'
	},	
	/*{			
    xtype:'textfield',
    id:'keyword_mobileaccount',
    width:160,
    name:'export',
    //style:'color:#7aa7d5',             
    emptyText:'�������ȵ�����',
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
  },*/
  '-',
  {
    text:'��ѯ',
    action:'keycx',
    iconCls:'accept'		
        
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
		id:'id_distinctmac',
		text:'',		
		focusCls:'',
		handleMouseEvents:false						
	}]
  
});


Ext.define('proauthRzAuthlog.view.list.List' ,{
  extend: 'Ext.grid.Panel',
  alias : 'widget.authloglist',
  store : 'List', 
  height:700,
  width:parent.grid_width,
  autoScroll: true,
	id:'id_hotspottable',	
  title:'',

  columnLines: true,
	initComponent: function() {
				
		this.tbar = Ext.create('Ext.PagingToolbar',{
		  store:'List',
		  displayInfo: true,
		  id:'id_tbar_paging',
		  displayMsg: '��ʾ{0} - {1}����¼ ��{2}����¼',
		  emptyMsg: "û�м�¼����ʾ",
		  items:[
			'-',
			'-',	
			{
	      text:'��ǺϹ�',
	      anchor: 'right',
	      action: 'ruleyes',
				itemId: 'idruleyes',
	      iconCls:'hege',
				disabled:true
	    },
			'-',
			{
	      text:'��ǷǺϹ�',
	      anchor: 'right',
	      action: 'ruleno',
				itemId: 'idruleno',
	      iconCls:'buhege',
				disabled:true
	    },	
			'-',
			{
	      text:'���ӵ�ͼ',
	      anchor: 'right',
	      action:'electricmap',
	      iconCls:'maps'
	    },
			'-',                
	    {
	      text:'����',
	      anchor: 'termexport',
	      action:'export',
	      iconCls:'exportimg'                    
	    },
      	{xtype:'label', html:'<span id="titledx"></span>'}
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
      	funElectricMap();       	            	
      }
    });
    
    //�������Ʋ˵�ѡ��
    var contextServicenameMenu = Ext.create('Ext.menu.Menu', {
        items: [
            placeDetail,
            electricMap           
        ]
    });	
		    
    this.viewConfig = {
        stripeRows: true,
        listeners: {
            cellclick: function (table, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                e.stopEvent();
                if(cellIndex == 3){
			          	contextServicenameMenu.showAt(e.getX(), e.getY());                	
			          	clickRecord = record;
			          }
                return false;
            }
        }
   	};
            
		/* ��Ӹ�ѡ�� */
		var sm = Ext.create('Ext.selection.CheckboxModel',{
    	listeners: {
      	selectionchange: function(sm, selections) {  
      		var grid=Ext.ComponentQuery.query('authloglist')[0];          
          var rows = Ext.getCmp('id_hotspottable').getSelectionModel();
         /* if(rows != null){
          	grid.down('#idruleyes').setDisabled(false); 
						grid.down('#idruleno').setDisabled(false);
        	}
        	else{
        		grid.down('#idruleyes').setDisabled(true); 
						grid.down('#idruleno').setDisabled(true);
        	}	
          	*/
          }
      }
   	});
   	
    this.selModel=sm; 			

    this.columns = [
			{header: '�Ƿ�Ϲ�', dataIndex: 'authflag', width:50, hidden: true, 
			  renderer:function(value,metaData,record){
				if(value == '0'){
					return '<font color="red">�ǺϹ�</font>'
				}
				else if(value == '1'){
					return '<font color="green">�Ϲ�</font>'
				}
	      else {
					return '<font color="orange">����</font>'
				}                                            
      }},
      {header: '�ȵ�SSID', dataIndex: 'ssid', width:110, sortable: true,
				renderer: ghostsearch},
			{header: '��������', dataIndex: 'servicename', width:90,
				renderer: ghostServicename
			},			
      {header: '�ȵ�Ƶ��', dataIndex: 'channel', width:70},
			{header: '�ȵ��������', dataIndex: 'security', width:80,
		  	renderer:function(value,metaData,record){
	        if(value=='01'){return 'WEP'}
	        else if(value=='02'){return 'WPA'}
	        else if(value=='03'){return 'WPA2'}
	        else if(value=='04'){return 'PSK'}
	        else if(value=='99'){return '����'}
	        else {return ''}
		    }            	
		  },
			{header: '�ɼ�ʱ��', dataIndex: 'stime', width:140},
			{header: '�ȵ�MAC��ַ', dataIndex: 'apmac', width:130, sortable: false,
				renderer: ghostsearch
			},
			{header: '�ȵ㳧��', dataIndex: 'hotspotfirm', flex: 1},
			{header: '�ȵ㳡ǿ', dataIndex: 'rssi', width:70}, 
			{header: '�ɼ��豸����', dataIndex: 'longitude', width:100},
      {header: '�ɼ��豸γ��', dataIndex: 'latitude', width:100},			
			{header: '�������', dataIndex: 'servicecode', flex: 1},                     
			{header: '�ɼ��豸���', dataIndex: 'apname', width:160},						
			{header: 'X����', dataIndex: 'xpos', flex: 1, hidden: true},
      {header: 'Y����', dataIndex: 'ypos', flex: 1, hidden: true}	            					            
			                       
   ];
      
   this.callParent(arguments);
	}
    
});
