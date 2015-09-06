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
        var timesCombo = Ext.create('Ext.form.field.ComboBox', {
        fieldLabel:'ָ��ʱ��',
        labelWidth: 60,
        width:160,
        valueField:'value',
        displayField: 'name',
        id:'times',
        name : 'times',      
        value:'0',
        allowBlank: true,
        forceSelection: false,
                                    store: Ext.create('Ext.data.Store', {
                                    fields : ['name', 'value'],
                                    data   : [
                                        {name : '����',   value: '0'},
                                        {name : 'ǰ����',   value: '1'},
                                        {name : 'ǰһ��',   value: '2'},
                                        {name : 'ǰһ��',   value: '3'},
                                         {name : 'ǰ����',   value: '3'},
                                          {name : 'ǰ����',   value: '3'}
                                        
                                                                
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
        var stylesCombo = Ext.create('Ext.form.field.ComboBox', {
        labelWidth: 60,
        width:75,
        valueField:'value',
        displayField: 'name',
        id:'styles',
        name : 'styles',      
        value:'0',
        allowBlank: true,
        forceSelection: false,
                                    store: Ext.create('Ext.data.Store', {
                                    fields : ['name', 'value'],
                                    data   : [
                                        {name : 'WEP',   value: '0'},
                                        {name : 'WPA',   value: '1'},
                                        {name : 'WPA2',   value: '2'},
                                        {name : 'PSK',   value: '3'},
                                        {name : '����',   value: '4'}
                                                                
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
         var statusCombo = Ext.create('Ext.form.field.ComboBox', {
        labelWidth: 60,
        width:75,
        valueField:'value',
        displayField: 'name',
        id:'places',
        name : 'places',      
        value:'0',
        allowBlank: true,
        forceSelection: false,
                                    store: Ext.create('Ext.data.Store', {
                                    fields : ['name', 'value'],
                                    data   : [
                                        {name : '�Ƿ�',   value: '0'},
                                        {name : '�Ϲ�',   value: '1'},
                                        {name : '����',   value: '2'}
                                                                
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
                timesCombo,
                '  ',
                {
                    xtype:'textfield',
                    id:'keyword',
                    width:180,
                    name:'keyword_bab',
                    style:'color:#7aa7d5',             
                    emptyText:'�������ȵ�SSID�ؼ���',
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
                '-',
                {
                    text:'��ѯ',
                    iconCls:'accept',
                    action:'keycx'
                },
                '-',
               /* {
                    text:'�߼�',
                    iconCls:'option',
                    action:'add'
                },
                '-',*/
                {
                    text:'����Ϲ��',
                    anchor: 'right',
                    action:'active',
                    iconCls:'add',
                    disabled:true	,
                    itemId:'activebutton'
                },
                 '-',
                {
                    text:'���Ϊ�Ƿ�',
                    anchor: 'right',
                    action:'disable',
                    iconCls:'remove',
                    disabled:true,
                    itemId:'disacbutton'
                },
                '-',
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
           
            {header: '�Ƿ�Ϲ�', dataIndex: 'result',align:'center',width:75,sortable: false,renderer:function(value,metaData,record){
                    if(value=='0'){return '<font color="green">�Ϲ�</font>'}
                    else if(value=='1'){return '<font color="red">���Ϲ�</font>'}
                    	
                   
                }},
            {header: '�ȵ�SSID', dataIndex: 'taskname',align:'center', width:110,sortable: true},
            {header: '��������', dataIndex: 'taskdesc',align:'center',width:110,sortable: false},
            
            {header: '�ȵ��������', dataIndex: 'maccount',  align:'center', width:110,
        renderer:function(value,metaData,record){
                    if(maccount=0){return 'WEP'}
                    else if(maccount==1){
                    	return 'WPA'
                    }
                     else if(maccount==2){
                    	return 'WPA2'
                    }
                     else if(maccount==3){
                    	return 'PSK'
                    }
                     else if(maccount==4){
                    	return '����'
                    }
                    }}, 
            {header: '���ֳ�������', dataIndex: 'servcount',align:'center', width:110,sortable: true},          
            {header: '���ֵĵ���ƽ��ʱ��(Сʱ)', dataIndex: 'maccount', align:'center',width:150,sortable: true},
            {header: '����ɼ�ʱ��', dataIndex: 'reporttime', align:'center',width:180    },
            {header: '����ɼ�ʱ��', dataIndex: 'reporttime',align:'center', width:180}

        ];
     
        this.callParent(arguments);
    }
    
});