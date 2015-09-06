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
       
         var Combo = Ext.create('Ext.form.field.ComboBox', {
        fieldLabel:'����״̬',
        labelWidth: 60,
        width:140,
        valueField:'value',
        displayField: 'name',
        id:'statway',
        name : 'statway',      
        value:'0',
        allowBlank: true,
        forceSelection: false,
                                    store: Ext.create('Ext.data.Store', {
                                    fields : ['name', 'value'],
                                    data   : [
                                       
                                        {name : '��Ч',   value: '0'},
                                        {name : 'ʧЧ',   value: '1'},
                                        {name : '���',   value: '2'}
                                    ]
                                })
                                ,
        queryMode: 'local',
        typeAhead: true,
                listeners: {
                      'change':function(){
                      
                        }
                    }
        });
        this.tbar = Ext.create('Ext.PagingToolbar',{
            store:'List',
            displayInfo: true,
            displayMsg: '��ʾ{0} - {1}����¼ ��{2}����¼',
            emptyMsg: "û�м�¼����ʾ",
            items:[
             
                Combo,
                 '  ' ,
                {
                    xtype:'textfield',
                    id:'keyword_mobileaccount',
                    width:180,
                    name:'keyword_bab',
                    style:'color:#7aa7d5',             
                    emptyText:'�������������ƹؼ���',
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
                    text:'�½�',
                    iconCls:'add',
                    action:'add'
                }
                 ,
                '-',
                 {
                    text:'��Ч',
                    iconCls:'true',
                    action:'add',
                    itemId:'activebutton',
                     disabled:true
                 
                }
                 ,
                '-',
                 {
                    text:'ʧЧ',
                    iconCls:'false',
                    action:'add',
                    itemId:'disacbutton',
                    disabled:true
                   

                }
                 ,
                '-',
               
                 {
                    text:'ɾ��',
                    iconCls:'remove',
                    action:'remove'
                },
                '-',
             {
			     	 	text:'����',
			     	 	itemId: 'expbutton',
			     	 	iconCls:'exp',
			     	 	action:'exp'
			     	 },
                {xtype:'label', html:'<span id="titledx"></span>'}
            ]// items:[
        });//this.tbar = Ext.create('Ext.PagingToolbar',{
    var sm = Ext.create('Ext.selection.CheckboxModel',{
        listeners: {
            selectionchange: function(sm, selections) {  
            	var grid=Ext.ComponentQuery.query('authloglist')[0];                  
                grid.down('#activebutton').setDisabled(selections.length == 0); 
               grid.down('#disacbutton').setDisabled(selections.length == 0);        
            }
        }
    
    });
     this.selModel=sm;
  
        this.columns = [
       {
          header: '�༭',
            xtype: 'actioncolumn',
            dataIndex: 'sid',
             icon: '/v4/images/edit_task.png',
            tooltip: '�����ͼ������޸Ľ��档',
            width: 40,
            align: 'center',
            sortable: false,
            handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                
                  var win = Ext.create('proauthRzAuthlog.view.common.AddWin',{
                            title: "�½�",
                            field1: record
                    
                          });
                          win.showAt(300,20);        
                
               
            }

        },
             {header: '����״̬', dataIndex: 'vara',  align:'center', width:70,
            renderer:function(value,metaData,record){
                    if(value=='v0'){return '<img  src="/newver/resources/themes/images/map/qualified.png">'}
                    else if(value=='v1'){return '<img  src="/newver/resources/themes/images/map/unqualified.png">'}
                   
                }
                 
            },    
            {header: '��������', dataIndex: 'vara',align:'center',width:110,sortable: false},
            {header: '��������', dataIndex: 'checked1', width:110,align:'center',sortable: true},
             {header: '������¼��', dataIndex: 'checked1',align:'center', width:110,sortable: true},
              {header: '���±������ʱ��', dataIndex: 'checked1', align:'center',width:110,sortable: true},

            { header: '���±���',
            xtype: 'actioncolumn',
            dataIndex: 'sid',
             icon: '/newver/resources/themes/images/share/tezhengfenxi.png',
            tooltip: '����������±���',
            width: 90,
            align: 'center',
            sortable: false,
            handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {

               
            }}
        ];
     
        this.callParent(arguments);
    }
    
});
