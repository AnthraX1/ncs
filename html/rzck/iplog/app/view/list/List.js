Ext.define('proauthRzSmslog.view.list.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.smsloglist',
    store : 'List', 
    height:parent.grid_height,
    width:parent.grid_width,
    autoScroll: true,
    title:'',
    columnLines: true,
    initComponent: function() {
    var sm = Ext.create('Ext.selection.CheckboxModel',{
        listeners: {
            selectionchange: function(sm, selections) {  
                var grid=Ext.ComponentQuery.query('smsloglist')[0];
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
            {
                xtype:'combo',mode:'local',                          
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
             width:140,
             name:'keyword5',
             style:'color:#7aa7d5',             
             emptyText:'�˺�/MAC/��������',
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
         
          {xtype:'label', html:'<span id="titledx"></span>'}
         ]
    }
    );
    
      
    this.columns = [
      {header: '�˺�', dataIndex: 'authAccount',width:110,sortable: false},
      {header: 'ʱ��', dataIndex: 'stime', width:110, sortable: false},
      {header: '�ն�MAC', dataIndex: 'mac',   width:110},
      {header: '��������', dataIndex: 'servicecode', width:110,sortable: true},
      {header: '��������', dataIndex: 'servicename',  width:110},
      {header: 'Ӧ�����', dataIndex: 'nettype',  width:110},
      {header: '����IP', dataIndex: 'sip',   width:110},
      {header: '�����˿�', dataIndex: 'sport1',   width:110},
      {header: '����IP', dataIndex: 'oip',   width:110},
      {header: '�����˿�', dataIndex: 'sport',   width:110},
      {header: 'Ŀ��IP', dataIndex: 'dip',   width:110},
      {header: 'Ŀ�Ķ˿�', dataIndex: 'dport',   width:110},
      {header: 'AP���', dataIndex: 'apname',  width:110},
      {header: 'AP MAC', dataIndex: 'apmac',  width:110},
      {header: 'AP����', dataIndex: 'longitude',  width:110},
      {header: 'AP γ��', dataIndex: 'latitude', width:110},
      {header: '�Ựid', dataIndex: 'sessionid',  width:110 }
    ];


    this.callParent(arguments);
  }
    
});
