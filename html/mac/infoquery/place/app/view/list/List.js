function ghostsearch(value, p, record){
	var str = Ext.String.format('<a href="#" style="color:blue" onclick="jmpPage(\'{1}\')">{0}</a>', value, value);
	//alert(str);
	return str;
}
var g_groupidquery = ""; 
var g_usernamequery = "";
var g_dispname;

/* ���ó������ƣ�ֱ�ӿ��ں�̨��ѯ ncsuser ���е� username */
function setSearchValue(typename, dispname){
	
	g_dispname = dispname;
	
    /* ������ mac ���õ������ */
	Ext.getCmp("keyword_mobileaccount").setValue( '@' + dispname + '@');	
	
	
	if(typename == '0'){
		
		try{
			
			g_groupidquery = parent.getGlobalGroupId();	
			
			//alert(g_groupidquery);		
		}
		catch(e){
			alert(e.message);
		}
		
	}
	else{
		
		try{
						
			g_usernamequery = parent.getGlobalUserName();
			
			//alert(g_usernamequery);
		}
		catch(e){
			alert(e.message);
		}
		
	}	
				
	var store = Ext.ComponentQuery.query('authloglist')[0].getStore();	
	
	/* ��� callback ��ȡjson��ȥ������������дԭ���� tbar �е� displayMsg  */
	store.load({callback : function(r, option, success) {   
            	var responseText =  eval("("+option.response.responseText+")");        		                
               var g_distinctCount = "";
               g_distinctCount = responseText.distinctCount;
               
               var playInfo = Ext.getCmp('id_tbar_paging');
               playInfo.displayMsg = '��ʾ{0} - {1}����¼ ��{2}����¼,ȥ�غ�<span style="color:red;font-size:1.5em">' + g_distinctCount + '</span>����¼';
              
               playInfo.doRefresh();
               
            
   }
  }); 
	
}


function ghostsearchPlace(value, p, record){
	var str = Ext.String.format('<a href="#" style="color:blue" onclick="jmpPagePlace(\'{1}\')">{0}</a>', value, value);
	//alert(str);
	return str;
}

function jmpPagePlace(place){
	
	Ext.getCmp("keyword_mobileaccount").setValue(place);	
	
	//alert(place + ' �Ѿ����������а�')
	window.clipboardData.setData('Text', place);	
	copyToClipboard(place);
}


function jmpPage(mac){
	
	Ext.getCmp("keyword_mobileaccount").setValue(mac);
	//alert(mac + ' �Ѿ����������а�');	
	
	/* IE�¸������ݵ������� */	
	window.clipboardData.setData('Text', mac);
	copyToClipboard(mac);		
			
}


Ext.define('proauthRzAuthlog.view.list.List1', {
	extend:'Ext.panel.Panel',
    alias : 'widget.myselfPanel',
    tbar: [
		{
			fieldLabel:'��ѡ��ʱ��',
			labelWidth: 70,
			xtype:'combo',mode:'local',                          
            triggerAction:  'all',
            forceSelection: true,
            width:170,
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
            emptyText:'����',allowBlank:true
        },
		'-',
		{
			fieldLabel:'������ؼ���',
			labelWidth: 80,	
            xtype:'textfield',
            id:'keyword_mobileaccount',
            width:260,
            name:'export',
            //style:'color:#7aa7d5',             
            emptyText: '��������/��������/������Ӫ����',
						//value:'test_zone3',			
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
        },'-',{
            text:'��ѯ',
            iconCls:'accept',            
						action:'keycx'
						
        },'-',{
            text:'�߼�',
            anchor: 'right',
            action:'advancecx',
            iconCls:'option'
        }
    ]
});

Ext.define('proauthRzAuthlog.view.list.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.authloglist',
    store : 'List', 
    height:parent.grid_height+25,
    width:parent.grid_width,
    autoScroll: true,
	
    title:'',
	
    columnLines: true,
    initComponent: function() {
		
		/* ��Ӹ�ѡ�� */
		var sm = Ext.create('Ext.selection.CheckboxModel',{
            listeners: {
                selectionchange: function(sm, selections) {  
                    var grid=Ext.ComponentQuery.query('authloglist')[0];
                }
            }
        });
        this.selModel=sm; 
		    
        this.tbar = Ext.create('Ext.PagingToolbar',{
            store:'List',
            displayInfo: true,
            displayMsg: '��ʾ{0} - {1}����¼ ��{2}����¼',
            id:'id_tbar_paging',
            //displayMsg: '��ʾ{0} - {1}����¼ ��{2}����¼,ȥ�غ�{3}����¼',
            emptyMsg: "û�м�¼����ʾ",
            items:[ 
				'-',
				'-',	
                {
                    text:'���ӵ�ͼ',
                    anchor: 'right',
                    action:'electricmap',
                    iconCls:'maps'
                },
				'-',
				{
                    text:'�鿴ͼ��',
                    anchor: 'right',
                    action:'checkgraph',
                    iconCls:'chakantubiao'
                },
				'-',                
                {
                    text:'����',
                    anchor: 'termexport',
                    action:'export',
                    iconCls:'exportimg'
                    
                },
                {xtype:'label', id:'id_label', html:'<span id="titledx"></span>'}
            ]
        });

        this.columns = [
			{header: '��������', dataIndex: 'servicename', flex: 1,
				renderer: ghostsearchPlace },
			{header: '�ɼ��豸����', dataIndex: 'dispname', flex: 1, hidden: true},	
			{header: '��ȫ��������', dataIndex: 'factoryname', flex: 1, hidden: true},
      {header: '�ɼ�ʱ��', dataIndex: 'stime',  flex: 1},			
      {header: '�ɼ��ն�MAC', dataIndex: 'mac', flex: 1,sortable: false,
				renderer: ghostsearch
			},
			{header: '���ɼ��ն˳�ǿ', dataIndex: 'rssi', flex: 1},							
      {header: '�����ȵ�SSID', dataIndex: 'ssid', flex: 1,sortable: true},
			{header: '�����ȵ�MAC', dataIndex: 'apmac', flex: 1,
				renderer: ghostsearch
			},
			{header: '�����ȵ�Ƶ��', dataIndex: 'channel', width:110},
			{header: '�����ȵ��������', dataIndex: 'security', flex: 1,
            	 renderer:function(value,metaData,record){
                    if(value=='01'){return 'WEP'}
                    else if(value=='02'){return 'WPA'}
                    else if(value=='03'){return 'WPA2'}
                    else if(value=='04'){return 'PSK'}
                    else if(value=='99'){return '����'}
                    else {return ''}
                }
            	
      },			
			{header: '�������', dataIndex: 'servicecode', width: 120}, 
			{header: '�ɼ��豸���', dataIndex: 'apname', width: 160}, 
			{header: '������ϸ��ַ', dataIndex: 'address', flex: 1, hidden: true},
			//{header: '�豸��ַ', dataIndex: 'address', flex: 1}, 
			{header: '��ȫ������֯��������', dataIndex: 'factorycode', flex: 1, hidden: true}
			                       
        ];
     
        this.callParent(arguments);
    }// initComponent: function() {
    	
});
