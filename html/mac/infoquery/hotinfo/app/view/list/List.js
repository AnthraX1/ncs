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
  },
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
			
		/*var sellAction = Ext.create('Ext.Action', {
	    //iconCls   : 'maps',  
	    text: '�鿴',	    
	    handler: function() {
	       
	    	alert("�鿴��Ϣ");        
	    }
  	});
    
  	var buyAction = Ext.create('Ext.Action', {
      //iconCls: 'buhege',
      text: '����',      
      handler: function() {
         
      	//Ext.example.msg('Buy', 'Buy ');       
      	alert("������Ϣ");
      }
    });

    var contextMenu = Ext.create('Ext.menu.Menu', {
        items: [
            sellAction,
            buyAction            
        ]
    });
    
    this.viewConfig = {
        stripeRows: true,
        listeners: {
            cellclick: function (table, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                e.stopEvent();
                if(cellIndex == 2){
                	contextMenu.showAt(e.getXY());
                	clickRecord = record;
                }
                return false;
            }
        }
   	};*/
            
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
			{header: '��������', dataIndex: 'servicename', width:90},			
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
