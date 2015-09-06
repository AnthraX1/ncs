Ext.define('proauthRzSmslog.view.list.List' ,{
  extend: 'Ext.grid.Panel',
  alias : 'widget.smsloglist',
  store : 'List', 
  height: 900,
  title:'',
  columnLines: true,
  initComponent: function() {
    var sm = Ext.create('Ext.selection.CheckboxModel',{
        listeners: {
            selectionchange: function(sm, selections) {  
            	var grid=Ext.ComponentQuery.query('authloglist')[0];
                  
     //         grid.down('#removeButton').setDisabled(selections.length == 0);
    //          grid.down('#moveGroupButton').setDisabled(selections.length == 0);
    
                
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
                                	queryMode: 	'local',
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
emptyText:'����',allowBlank:true},
     
              {
               xtype:'textfield',
               id:'keyword_mobileaccount',
               width:140,
               name:'keyword5',
               style:'color:#7aa7d5',             
               emptyText:'�ֻ���/MAC/��������',
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
     	
     	 {xtype:'label', html:'<span id="titledx"></span>'}
     	]
    }
    );
    
    
   
  	
    this.columns = [
      {header: '�ֻ���', dataIndex: 'mobile', flex:1, sortable: true},
      {header: '����',dataIndex: 'acode',width:100, sortable: false},
      {header: 'ʱ��', dataIndex: 'stime', flex:1,sortable: false},
      {header: 'MAC��ַ', dataIndex: 'mac', flex:1,sortable: true},
      {header: '��Ʒ���к�', dataIndex: 'sn',   flex:1,hidden:true},
      {header: '��������', dataIndex: 'servicecode',   flex:1},
       {header: '��������', dataIndex: 'servicename',   flex:1},
      {header: '���ŷ�����', dataIndex: 'sms',   flex:1},
      {header: '��������', dataIndex: 'message',   flex:1},
      {header: '����״̬', dataIndex: 'status',   flex:1,
      	      	renderer:function(value,metaData,record){
          if(value=='0'){return '�ɹ�'}
          else if(value=='1'){return 'ʧ��'}
          else {return ''}
        }},
      {header: '������Դ', dataIndex: 'fcode',   flex:1}
    ];

    this.callParent(arguments);
  }
    
});