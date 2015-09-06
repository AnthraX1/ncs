var g_groupidquery = ""; 
var g_usernamequery = "";
var g_dispname;

function ghostsearch(value, p, record){
	var str = Ext.String.format('<a href="#" style="color:blue" onclick="jmpPage(\'{1}\')">{0}</a>', value, value);
	//alert(str);
	return str;
}

/* ���ó������ƣ�ֱ�ӿ��ں�̨��ѯ ncsuser ���е� username */
function setSearchValue(typename, dispname){
	g_dispname = dispname;
	
	var store = Ext.ComponentQuery.query('authloglist')[0].getStore();		
	var groupid="";
	var username="";	
	var bRet = false;
	
    /* ������ mac ���õ������ */
	Ext.getCmp("keyword_mobileaccount").setValue( '@' + dispname + '@');	
	if(typename == '0'){		
		try{
			
			g_groupidquery = parent.getGlobalGroupId();	
			groupid = g_groupidquery;
			//alert(typename + ',' + groupid);		
			if(groupid != '')
				bRet = true;
		}
		catch(e){
			alert(e.message);
		}
		
	}
	else{
		
		try{
						
			g_usernamequery = parent.getGlobalUserName();			
			username = g_usernamequery;
			if(username != '')
						bRet = true;
			//alert(typename + ',,' + username);		
			
		}
		catch(e){
			alert(e.message);
		}
		
	}
	
	if(bRet == false){
					groupid = "all";
	}
			
	var keyword = Ext.getCmp('keyword_mobileaccount').value;				
	store.load({params:{keyword:keyword, groupid:groupid, username:username}});
	
}
 

function jmpPage(mac){
	
	Ext.getCmp("keyword_mobileaccount").setValue(mac);	
	
	/* IE�¸������ݵ������� */	
	window.clipboardData.setData('Text', mac);	 	
	copyToClipboard(mac);
	
}


Ext.define('proauthRzAuthlog.view.list.List1', {
	extend:'Ext.panel.Panel',
    alias : 'widget.myselfPanel',
    tbar: [
			{
				fieldLabel:'������ؼ���',
				labelWidth: 80,
                xtype:'textfield',
                id:'keyword_mobileaccount',
                width:250,
                name:'keyword5',                  
                emptyText:'������MAC��Ϣ/��������',				
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
            },{
                text:'��ѯ',
								action:'keycx',
								iconCls:'accept'			
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
		viewConfig:{
    	loadMask : false
    },
    title:'',
	
    columnLines: true,
    initComponent: function() {
		
		/* ��Ӹ�ѡ�� */
		/* var sm = Ext.create('Ext.selection.CheckboxModel',{
            listeners: {
                selectionchange: function(sm, selections) {  
                    var grid=Ext.ComponentQuery.query('authloglist')[0];
                }
            }
        });
        this.selModel=sm; */
		
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
                    text:'��������',
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
                {xtype:'label', html:'<span id="titledx"></span>'}
            ]
        });

        this.columns = [
			{header: '��������', dataIndex: 'servicename', width:100,
				renderer: ghostsearch},	
			{header: '�ɼ��豸����', dataIndex: 'dispname', width:100},
			{header: '�ɼ�ʱ��', dataIndex: 'stime', width:140},
			{header: '�����ն˳�ǿ', dataIndex: 'lssi', flex: 1},
			{header: '����ն˳�ǿ', dataIndex: 'ussi', flex: 1},
			{header: '�ն�MAC��ַ', dataIndex: 'mac', width:130, sortable: false,
				renderer: ghostsearch
			},
			{header: '�ɼ��豸����', dataIndex: 'longitude', flex: 1, hidden: true},
      {header: '�ɼ��豸γ��', dataIndex: 'latitude', flex: 1, hidden: true},
			{header: '�����ȵ�SSID', dataIndex: 'ssid', flex: 1,sortable: true},
			{header: '�����ȵ�MAC', dataIndex: 'apmac', width:130,
				renderer: ghostsearch
			},
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
			{header: '�������', dataIndex: 'servicecode', flex: 1},            
			{header: '�ɼ��豸���', dataIndex: 'apname', flex: 1}, 			
      {header: '�������', dataIndex: 'vname', flex: 1},				         
			{header: '�ն�Ʒ��', dataIndex: 'termtype', flex: 1}			                       
        ];
     
        this.callParent(arguments);
    }
    
});
