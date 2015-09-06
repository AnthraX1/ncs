
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
                    id:             'State_flag',                           
                    name:           'State_flag',
                    displayField:   'name',
                    valueField:     'value',
                    queryMode:     'local',
                    store: Ext.create('Ext.data.Store', 
                    {
                        fields : ['name', 'value'],
                        data   : 
                        [
                            {name : '�Ϲ�',   value: '1'},
                            {name : '�Ƿ�',  value: '2'},
                            {name : '����',  value: '3'}
                          
                        ]
                    }),
                    emptyText:'�Ϲ�',allowBlank:true
                },
                {
                    xtype:'textfield',
                    id:'macInfo',
                    width:220,
                    name:'macInfo',
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
                    action:'normally_query'
                },
                '-',
             
             
                {
                    text:'���',
                    anchor: 'termacttrait',
                    action:'normally_add',
                    iconCls:'add'
                },
				'-',
              /*  {
                    text:'ɾ��',
                    anchor: 'termmap',
                    action:'normally_delete',
                    iconCls:'remove'
                },
				'-',
                {
                    text:'�Ӿ���¼',
                    anchor: 'idedit',
                    action:'normally_log',
                    iconCls:'add'
                },
				'-',
                {
                    text:'�Ӿ�����',
                    anchor: 'idedit',
                    action:'normally_act',
                    iconCls:'option'
                },
				'-',*/
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
			{header: '�����ȵ�SSID', dataIndex: 'ssid', width:140,sortable: true},
			{header: '�Ƿ�Ϲ�', dataIndex: 'onlinestatus',   width:140},
			{header: '�����ȵ��������', dataIndex: 'security',   width:140,
            	 renderer:function(value,metaData,record){
                    if(value=='01'){return 'WEP'}
                    else if(value=='02'){return 'WPA'}
                    else if(value=='03'){return 'WPA2'}
                    else if(value=='04'){return 'PSK'}
                    else if(value=='99'){return '����'}
                    else {return ''}
                }
            	
            },	
			{header: '����ĳ�����������', dataIndex: 'vtype',  width:140},			
            {header: '��������������', dataIndex: 'vnature',width:140,sortable: false},


			{header: '��Ӫ����ϵ��', dataIndex: 'OperatorContact',   width:140},            
            {header: '��Ӫ����ϵ�绰', dataIndex: 'OperatorContactNumber', width:140}, 
			{header: '��Ӫ�������ʼ�', dataIndex: 'OperatorMail',  width:140},
           
			                       
        ];
     
        this.callParent(arguments);
    }// initComponent: function() {
    
});
