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
        labelWidth: 60,
        width:140,
        fieldLabel:'����״̬',
        valueField:'value',
        displayField: 'name',
        id:'statway',
        name : 'statway',      
        value:'3',
        allowBlank: true,
        forceSelection: false,
                                    store: Ext.create('Ext.data.Store', {
                                    fields : ['name', 'value'],
                                    data   : [
                                        {name : 'ȫ��',   value: '3'},
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
			/*Ext.create('Ext.tip.ToolTip', {
          target: 'keyword',
          html: '����������ʾ',
          trackMouse: true            //  ��������ƶ�
      });*/

        this.tbar = Ext.create('Ext.PagingToolbar',{
            store:'List',
            displayInfo: true,
            displayMsg: '��ʾ{0} - {1}����¼ ��{2}����¼',
            emptyMsg: "û�м�¼����ʾ",
            items:[              
               Combo
                ,
               '  ',
               {
                    iconCls:'question',
                    action:'help',
                    hidden:true
                    },
                {
                    xtype:'textfield',
                    id:'keyword',
                    width:180,
                    name:'keyword',
                    style:'color:#7aa7d5',             
                    emptyText:'�������������ƹؼ���',
                    value:'',
                    enableKeyEvents:true,
                    listeners:{
                        'focus':function(){
                        },           
                        'keydown' : function(i,e){
                             var aae=e.getKey() ; 
                             if(aae==13){
                                proauthRzAuthlog.controller.Procy.searchtype = ""; 
        proauthRzAuthlog.controller.Procy.SetPage(1);  
        proauthRzAuthlog.controller.Procy.loadProcyListStore();
                             }
                         }
                    }
                },'  ',
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
                   
                },
                '-',
                 {
                    text:'ɾ��',
                    iconCls:'remove',
                    action:'del'
                },
                '-',
                 {
                    text:'��Ч',
                    iconCls:'true',
                    action:'active',
                     itemId:'activebutton',
                      disabled:true
                   
                },
                '-',
                 {
                    text:'ʧЧ',
                    iconCls:'false',
                    action:'disable',
                    itemId:'disacbutton',
                     disabled:true
                },'-',
                
               {
			     	 	text:'����',
			     	 	itemId: 'expbutton',
			     	 	iconCls:'exp',
			     	 	action:'exp'
			 },
                {xtype:'label', html:'<span id="titledx"></span>'}
            ]
        });
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
            dataIndex: 'cid',
             icon: '/v4/images/edit_task.png',
            tooltip: '�����ͼ������޸Ľ��档',
            width: 40,
            align: 'center',
            sortable: false,
           handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                   
                  var win = Ext.create('proauthRzAuthlog.view.common.UpdateWin',{
                            title: "�༭��������",
                            field1: record

                          });
                 

                          win.showAt(340,20);        
                
               
            }

        },
            {header: 'cid', dataIndex: 'cid',align:'center', flex:1,sortable: true, hidden:true},
            {header: '��������', dataIndex: 'taskname',align:'center', flex:1,sortable: true},
            {header: '����״̬', dataIndex: 'result',  flex:1, align:'center',    renderer:function(value,metaData,record){
                    if(value=='0'){return '<font color="green">��Ч</font>'}
                    else if(value=='1'){return '<font color="red">ʧЧ</font>'}
                        else {return '<font color="orange">���</font>'}
                   
                }            },
            {header: '��������',dataIndex: 'taskdesc',align:'center', flex:1,sortable: false},
            {header: '������¼��', dataIndex: 'maccount',align:'center', flex:1,sortable: false},
            {header: '���±������ʱ��', dataIndex: 'reporttime',align:'center', flex:1,sortable: false},          
             {
             header: '�����б�',
            xtype: 'actioncolumn',
            dataIndex: 'cid',
             icon: '/newver/resources/themes/images/share/tezhengfenxi.png',
            tooltip: '����������±���',
            flex:1,
            align: 'center',
            sortable: false,
           handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                
                  var win = Ext.create('proauthRzAuthlog.view.common.DownWin',{
                            title: "�����б�",
                            field1:record

                          });
                          win.showAt(340,20);        
                
               
            }

        }
        ];
     
        this.callParent(arguments);
    }
    
});
