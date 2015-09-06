Ext.define('proauthRzAuthlog.view.list.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.authloglist',
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
                    var grid=Ext.ComponentQuery.query('authloglist')[0];
                }
            }
        });
        this.selModel=sm;
   
   
        var actionCombo = Ext.create('Ext.form.field.ComboBox', {
        fieldLabel: '��־����',
        labelWidth: 60,
        width:150,
        valueField:'value',
        displayField: 'name',
        name : 'shflag',      
        value:'2',
        allowBlank: true,
        forceSelection: false,
                                    store: Ext.create('Ext.data.Store', {
                                    fields : ['name', 'value'],
                                    data   : [
                                        {name : '������־',   value: '2'},
                                        {name : '������־',   value: '1'}
                                                                      
                                    ]
                                })
                                ,
        queryMode: 'local',
        typeAhead: true,
                listeners: {
			          'change':function(){
			          	proauthRzAuthlog.controller.Procy.oprFlag=this.value;
			          	
		//	              document.getElementById('form1').shflag.value=this.value;
    //                reflash()
			            }
			        }
    });
   
   
        this.tbar = Ext.create('Ext.PagingToolbar',{
            store:'List',
            displayInfo: true,
            displayMsg: '��ʾ{0} - {1}����¼ ��{2}����¼',
            emptyMsg: "û�м�¼����ʾ",
            items:[
                   actionCombo,
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
                    width:140,
                    name:'keyword5',
                    style:'color:#7aa7d5',             
                    emptyText:'�ʺ�/MAC/��������',
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
            ]// items:[
        });//this.tbar = Ext.create('Ext.PagingToolbar',{

        this.columns = [
            {header: '��֤����',dataIndex: 'atype',width:100, sortable: false,
                renderer:function(value,metaData,record){
                    if(value=='1020004'){return '�ֻ���֤'}
                    else if(value=='1020100'){return 'APP��֤'}
                    else if(value=='1020002'){return 'MAC��֤'}
                    else if(value=='1021000'){return '֤������֤'}
                    else {return value}
                }
            },
            {header: '��֤ �ʺ�', dataIndex: 'authAccount',width:110,sortable: false},
            {header: '��������', dataIndex: 'servicecode', width:110,sortable: true},
            {header: '��������', dataIndex: 'servicename',  width:110},
            {header: '����ʱ��', dataIndex: 'stime',   width:110},
            {header: '����ʱ��', dataIndex: 'etime',  width:110},
            {header: '����IP', dataIndex: 'sip',   width:110},
            {header: '����IP', dataIndex: 'oip',   width:110},
            {header: '�����˿�', dataIndex: 'sport',   width:110},
            {header: '�ն�MAC', dataIndex: 'mac',   width:110},
            {header: 'AP���', dataIndex: 'apname',  width:110},
            {header: 'AP MAC', dataIndex: 'apmac',  width:110},
            {header: 'AP����', dataIndex: 'longitude',  width:110},
            {header: 'AP γ��', dataIndex: 'latitude', width:110},
            {header: '��ǿ', dataIndex: 'rssi',  width:110},
            {header: '�ỰID', dataIndex: 'sessionid',width:110},
            {header: '��Ϊ', dataIndex: 'flags',width:110}
        ];
     
        this.callParent(arguments);
    }// initComponent: function() {
    
});
