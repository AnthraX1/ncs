function ghostsearch(value, p, record){
	var str = Ext.String.format('<a href="#" style="color:blue" onclick="jmpPage(\'{1}\')">{0}</a>', value, value);
	//alert(str);
	return str;
}

function jmpPage(mac){
	
	Ext.getCmp("keyword_mobileaccount").setValue(mac);
	
	//alert(mac + ' �Ѿ����������а�');	 
	window.clipboardData.setData('Text', mac);
	copyToClipboard(mac);
}

function ghostsearchApname(value, p, record){
	var str = Ext.String.format('<a href="#" style="color:blue" onclick="jmpPageAp(\'{1}\')">{0}</a>', value, value);
	//alert(str);
	return str;
}

function jmpPageAp(apname){
	
	Ext.getCmp("keyword_mobileaccount").setValue(apname);	
	
	//alert(apname + ' �Ѿ����������а�')
	window.clipboardData.setData('Text', apname);	
	copyToClipboard(apname);
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
				id:        		'time_flag',                           
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
            },{
				fieldLabel:'������ؼ���',
				labelWidth: 80,	
                xtype:'textfield',
                id:'keyword_mobileaccount',
                width:260,
                name:'keyword5',
                //style:'color:#7aa7d5',             
                //emptyText:'�ȵ�MAC/SSID/��������/AP MAC',
				emptyText:'�ƶ��ɼ��豸����/���',
				//value: '3100123450034CBA0BA2B',
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
            },
			'-',
			{
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
            id:'id_tbar_paging',
            displayMsg: '��ʾ{0} - {1}����¼ ��{2}����¼',
            emptyMsg: "û�м�¼����ʾ",
            items:[ 
				'-',
				'-',	
				{
                    text:'�켣��ͼ',
                    anchor: 'termmap',
                    action:'termmacmap',
                    iconCls:'renyuanguiji'
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
			{header: '�ɼ��豸����', dataIndex: 'dispname', width: 150, hidden: true},
      {header: '�ɼ��豸���', dataIndex: 'apname', width: 160,
				renderer: ghostsearchApname },
			{header: '��ȫ��������', dataIndex: 'factoryname', flex: 1, hidden: true},
			{header: '�ɼ��豸����', dataIndex: 'longitude', flex: 1,sortable: true},
      {header: '�ɼ��豸γ��', dataIndex: 'latitude', flex: 1},
			{header: '�ɼ�ʱ��', dataIndex: 'stime',  width: 110},
			{header: '�ն�MAC', dataIndex: 'mac',  width: 130,
				renderer: ghostsearch
			},
			{header: '���ɼ��ն˳�ǿ', dataIndex: 'rssi', flex: 1},
			{header: '�������', dataIndex: 'vtype', hidden: true, flex: 1,
            	 renderer:function(value,metaData,record){
                    if(value=='0'){return '��ʵ���'}
                    else if(value=='1'){return '�������'}
                    else {return ''}
            		}
      },
      {header: '�������', dataIndex: 'vname', flex: 1, hidden: true},
			{header: '�����ȵ�SSID', dataIndex: 'ssid', flex: 1},
			{header: '�����ȵ�MAC', dataIndex: 'apmac',  width: 130,
				renderer: ghostsearch
			},
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
            	
            },			
			{header: '��ȫ������֯��������', dataIndex: 'factorycode', flex: 1, hidden: true}
			                       
        ];
     
        this.callParent(arguments);
    }// initComponent: function() {
    
});









