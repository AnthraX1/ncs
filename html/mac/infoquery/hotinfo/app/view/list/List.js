function ghostsearch(value, p, record){
	var str = Ext.String.format('<a href="#" style="color:blue" onclick="jmpPage(\'{1}\')">{0}</a>', value, value);
	//alert(str);
	return str;
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
            emptyText:'�������ȵ�����',
						value: '',
						//value: '31001234567892',
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
            action:'keycx',
            iconCls:'accept'		
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
		id:'id_hotspottable',
		/*viewConfig:{
    	loadMask : false
    },*/
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
			{header: '�ɼ�ʱ��', dataIndex: 'stime', flex: 1},
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
    }// initComponent: function() {
    
});
