Ext.define('proauthMac.view.list.List' ,{
  extend: 'Ext.grid.Panel',
  alias : 'widget.maclist',
  store : 'List', 
  height:parent.grid_height,
  autoScroll: true,
  title:'',
  columnLines: true,
  initComponent: function() {
    var sm = Ext.create('Ext.selection.CheckboxModel',{
        listeners: {
            selectionchange: function(sm, selections) {  
            	var grid=Ext.ComponentQuery.query('maclist')[0];
                  
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
     	
     	 {xtype:'label', html:'<span id="titledx"></span>'}
     	]
    }
    );
    
    
   
  	
    this.columns = [
      {header: 'Mac��ַ', dataIndex: 'mac', width:120, sortable: true},
      {header: '�ֻ���',dataIndex: 'mobile',width:120, sortable: false},
      {header: '����', dataIndex: 'dispname', width:120,sortable: false},
      {header: '���λ��', dataIndex: 'position', width:120,sortable: true},
      {header: '���ʹ��ʱ��', dataIndex: 'lasttime',   width:120},
      {header: '�����������', dataIndex: 'servicecode',   width:120},
      {header: '֤������', dataIndex: 'idtype',   width:70,
      	 renderer:function(value,metaData,record){
          if(value=='111'){return '���֤'}
          else if(value=='112'){return '��ʱ���֤'}
          else if(value=='114'){return '����֤'}
          else if(value=='123'){return '����֤'}
          else if(value=='116'){return '��ס֤'}
          else if(value=='133'){return 'ѧ��֤'}
          else if(value=='335'){return '��������ʻ֤'}
          else if(value=='411'){return '�⽻����'}
          else if(value=='412'){return '������'}
          else if(value=='414'){return '��ͨ����'}
          else if(value=='511'){return '̨��֤'}
          else {return ''}
        }},
      {header: '֤������', dataIndex: 'idno',   width:160},
      {header: '����ʱ��', dataIndex: 'addtime',   width:120},
      {header: '������Դ', dataIndex: 'fcode',   width:60},
      {flex:1}
    ];

    this.callParent(arguments);
  }
    
});