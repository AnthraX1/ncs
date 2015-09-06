Ext.define('proauthMobileAccount.view.list.List' ,{
  extend: 'Ext.grid.Panel',
  alias : 'widget.mobileaccountlist',
  store : 'List', 
  height: 650,
  title:'',
  columnLines: true,
  initComponent: function() {
    var sm = Ext.create('Ext.selection.CheckboxModel',{
        listeners: {
            selectionchange: function(sm, selections) {  
            	var grid=Ext.ComponentQuery.query('mobileaccountlist')[0];
                  
              grid.down('#removeButton').setDisabled(selections.length == 0);
    //          grid.down('#moveGroupButton').setDisabled(selections.length == 0);
    
                
            }
        }
    
    });
    this.selModel=sm;

        var whCombo = Ext.create('Ext.form.field.ComboBox', {
        fieldLabel: '�շ�����',
        labelWidth: 60,
        width:170,
        valueField:'value',
        displayField: 'name',
        id:'whflag',
        name : 'flag',      
        value:'',
        allowBlank: true,
        forceSelection: false,
                                    store: Ext.create('Ext.data.Store', {
                                    fields : ['name', 'value'],
                                    data   : [
                                     {name:"ѡ���շ�����",value:""},
                                        {name : '������Ϣ',   value: '1'},
                                        {name : '������Ϣ',   value: '2'}
                                                                      
                                    ]
                                })
                                ,
        queryMode: 'local',
        typeAhead: true,
                listeners: {
			          'change':function(){
			             proauthMobileAccount.controller.Procy.loadProcyListStore();
			            }
			        }
    });
    
  //  this.plugins=rowEditing;
    this.tbar = Ext.create('Ext.PagingToolbar',{
    	store:'List',
      displayInfo: true,
      displayMsg: '��ʾ{0} - {1}����¼ ��{2}����¼',
     emptyMsg: "û�м�¼����ʾ",
     items:[
              whCombo,
              {
               xtype:'textfield',
               id:'keyword_mobileaccount',
               width:160,
               name:'keyword5',
               style:'color:#7aa7d5',             
               emptyText:'����/����/���շ��Ͷ���',
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
            {
                text:'��Ҫ����Ϣ',
                iconCls:'add',
                action:'addmesg'
   
            },
            '-',
     	 {
     	 	text:'ɾ��',
     	 	itemId: 'removeButton',
     	 	iconCls:'remove',
     	 	disabled: true,
     	 	action:'del'
     	},
         '-'
     ,
     	 {xtype:'label', html:'<span id="titledx"></span>'}
     	]
    }
    );
    
    
   
  	
    this.columns = [
            {
          header: '�ظ���Ϣ',
            xtype: 'actioncolumn',
            dataIndex: 'userid',
             icon: '/images/v4/edit_task.png',
            tooltip: '�����ͼ�����ظ����档',
            width: 55,
            align: 'center',
            sortable: false,
            handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
              var mmto=record.get('mfrom');
              var mmsubject='�ظ�:'+record.get('message_title');
  
              var fpw=Ext.create('Ext.FormPanel', {         
			        frame: true,
			        fieldDefaults: {
			           labelWidth: 65,                        
			           xtype: 'textfield' 
			        },
              bodyPadding: 10,
                  items: [
                   {xtype: 'hidden',name: 'mto',value:mmto},                                 
                 {
                        fieldLabel:'����',
                        xtype: 'textfield',
                        value:mmsubject,
                        name:'message_title'
                       
                 },{
                        fieldLabel:'����',
                        xtype: 'textarea',
                        name:'message_content'
                       
                    }       
                    ,{
                        xtype: 'button',
                        anchor: 'right',
                         style : 'margin-left:80px',
                        text:'��&nbsp;&nbsp;��',
               handler: function(){
               fpw.form.doAction('submit',{
               url:'/pronline/Msg',
                method:'POST',
               params:{FunName:'proauth_mesgsave_v8'},                
                success:function(form,action){ 
                	alert(action.result.msg);        					
         					 winw.close();
         					 reflash();
                 },
             		 failure:function(form,action){        		 
                     alert(action.result.msg);
                 
            		 }
                         
                         })
                  }
                       
                    },
							         {
							            text: '��&nbsp;&nbsp;��',
							            style : 'margin-left:10px',
							            xtype: 'button',
							            handler: function(){
							                winw.close();
							            }
							         }
							         
							         ]
                  });
                  
        var winw = Ext.widget('window', {
                title: '��Ҫ����Ϣ',
                closeAction: 'hide',
                x:400,
                y:32,
                width: 280,
                height: 280,
                minHeight: 280,
        //        layout: 'fit',
                resizable: true,
                modal: false,
                items: fpw
            });
             winw.show();  
          }

        },
      {header: 'ʱ��',dataIndex: 'stime',width:120, sortable: false},
      {header: '���ͷ�', dataIndex: 'mfrom_name', width:120,sortable: false},
      {header: '���շ�', dataIndex: 'mto_name', width:120,sortable: false},
      {header: '����', dataIndex: 'message_title', flex:1},

      {header: '����', dataIndex: 'message_content', flex:1}
     

      
    ];

    this.callParent(arguments);
  }
    
});