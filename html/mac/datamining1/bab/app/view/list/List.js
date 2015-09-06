
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
            emptyMsg: "û�м�¼����ʾ",
            items:[
                   {xtype:'combo',mode:'local',                          
                    triggerAction:  'all',
                    forceSelection: true,
                    width:140,
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
                {
                    xtype:'textfield',
                    id:'keyword_mobileaccount',
                    width:220,
                    name:'keyword5',
                    style:'color:#7aa7d5',             
                    emptyText:'������MAC��Ϣ: XX-XX-XX-XX-XX-XX',
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
                    text:'��������',
                    anchor: 'termacttrait',
                    action:'termac',
                    iconCls:'option'
                },
				'-',
                {
                    text:'��Ա�켣',
                    anchor: 'termmap',
                    action:'termmacmap',
                    iconCls:'option'
                },
				'-',
                {
                    text:'��ݱ༭',
                    anchor: 'idedit',
                    action:'edit',
                    iconCls:'option'
                },
				'-',
                {
                    text:'����',
                    anchor: 'termexport',
                    action:'export',
                    iconCls:'exportimg'
                },
                {xtype:'label', html:'<span id="titledx"></span>'}
            ]// items:[
        });//this.tbar = Ext.create('Ext.PagingToolbar',{

        this.columns = [
			{header: '����״̬', dataIndex: 'onlinestatus',   width:110},
            {header: '�ն�MAC��ַ', dataIndex: 'mac',width:110,sortable: false},
			{header: '�ɼ�ʱ��', dataIndex: 'stime',   width:110},
			{header: '�ն˳�ǿ', dataIndex: 'rssi',   width:110},
			{header: '�������', dataIndex: 'vtype',  width:110,
            	 renderer:function(value,metaData,record){
                    if(value=='0'){return '��ʵ���'}
                    else if(value=='1'){return '�������'}
                    else {return ''}
            }},
            {header: '�������', dataIndex: 'vname',  width:110},			
			{header: '��������', dataIndex: 'servicename',  width:110},			
			{header: '�ɼ��豸����', dataIndex: 'apname',   width:110},
			{header: '�ն�Ʒ��', dataIndex: 'termtype',  width:110},			              			
            {header: '�ն���ʷSSID�б�', dataIndex: 'apssid', width:110,sortable: true},
			{header: '�����ȵ�SSID', dataIndex: 'ssid', width:110,sortable: true},
			{header: '�����ȵ�MAC', dataIndex: 'apmac',  width:110},
			{header: '�����ȵ�Ƶ��', dataIndex: 'channel',  width:110},
			{header: '�����ȵ��������', dataIndex: 'security',   width:110,
            	 renderer:function(value,metaData,record){
                    if(value=='01'){return 'WEP'}
                    else if(value=='02'){return 'WPA'}
                    else if(value=='03'){return 'WPA2'}
                    else if(value=='04'){return 'PSK'}
                    else if(value=='99'){return '����'}
                    else {return ''}
                }
            	
            },			
			{header: '�������', dataIndex: 'servicecode',   width:110},            
            {header: '�ɼ��豸���', dataIndex: 'apcollectcode', width:110}, 
			{header: '�ɼ��豸����', dataIndex: 'longitude',  width:110},
            {header: '�ɼ��豸γ��', dataIndex: 'latitude', width:110},
			{header: '��Բɼ��豸X����', dataIndex: 'xcoord',  width:110},
            {header: '��Բɼ��豸Y����', dataIndex: 'ycoord', width:110}
			
            //{header: '��װ�ص�', dataIndex: 'address',  width:110},
			                       
        ];
     
        this.callParent(arguments);
    }// initComponent: function() {
    
});
