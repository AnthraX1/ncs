Ext.define('quickResarch.view.list.left' ,{
  extend: 'Ext.form.Panel',
  alias : 'widget.left',
  region:'west',
  frame:true,    
  height: 2340,
  title:'',  
  initComponent: function() {
  
   this.items = [
     {     	
     	  xtype: 'fieldcontainer',                          
         layout: 'vbox',
          items:[
               {
                  xtype: 'fieldset',
                  collapsible: false,
                  collapsed:false,
                  title:'��ѯʱ��',
                   margin: '0 0 0 0',
  	              defaultType: 'textfield',
  	              items: [
                  {
          	       xtype: 'fieldcontainer',
                   layout: 'vbox',
                    items:[
                    { 
                      fieldLabel: 'ʱ���',
			                labelWidth: 40,
			                width:195, xtype:'combo',mode:'local',value:'1',triggerAction:  'all',forceSelection: true,editable:false,                                
                      id:'time_flag',name: 'time_flag', displayField:'name',valueField:'value', queryMode: 'local',
                      store: Ext.create('Ext.data.Store', {
                                    fields : ['name', 'value'],
                                    data   : [{name : '����',   value: '1'},{name : '��������',value: '2'},{name : '���һ��',value: '3'},{name : '���һ��',value: '4'},{name : '�������',value: '5'},{name : '�������',value: '6'},{name : '�Զ���ʱ��',value: '9'}
                                    ]
                      }),
                      listeners:{
			                 'change':function(){
			                 	if(Ext.getCmp('time_flag').value==9){
			                     Ext.getCmp('containersdate').setVisible(true);
			                     Ext.getCmp('containeredate').setVisible(true);
			                  }
			                  else{
			                  	 Ext.getCmp('containersdate').setVisible(false);
			                     Ext.getCmp('containeredate').setVisible(false);
			                  }
			                
                      }
                      }		                
			              },
			             { xtype: 'fieldcontainer',layout: 'hbox',hidden:true,id:'containersdate',
                   items:[{xtype: 'datefield',id:'sdate',format: "Y/m/d",fieldLabel: '��ʼ',labelWidth: 40,emptyText:'',width:135,name: 'sdate',value:''},	{                        
                        fieldLabel:'',
                        width:60,
                        format: "H:i",
                        xtype: 'timefield',
                        value:Ext.Date.add(new Date(), Ext.Date.HOUR, -1),
                        id:'stime',
                        name:'stime'
                     }]
			             }
			              ,
			           { xtype: 'fieldcontainer',layout: 'hbox',hidden:true,id:'containeredate',
                  items:[{xtype: 'datefield',id:'edate',format: "Y/m/d",fieldLabel: '��ֹ',labelWidth: 40,emptyText:'',width:135,name: 'edate',value:''},	{                        
                        fieldLabel:'',
                        width:60,
                        format: "H:i",
                        xtype: 'timefield',
                        value:Ext.Date.add(new Date(), Ext.Date.HOUR, -1),
                        id:'etime',
                        name:'etime'
                     }]
			             }
			              
			              
			              
			              
			              ]
			            }
			            ]
			          }
			          ,
			          {
                  xtype: 'fieldset',
                  collapsible: false,
                  collapsed:false,
                  title:'�û���Ϣ',
                   margin: '0 0 0 0',
  	              defaultType: 'textfield',
  	              items: [
  	               {xtype:'textfield',fieldLabel: '��¼��',labelWidth: 52,emptyText: '',width:195,name: 'username'},
  	               {xtype:'textfield',fieldLabel: '����',labelWidth: 52,emptyText: '',width:195,name: 'dispname'},
  	               {xtype:'textfield',fieldLabel: '֤����',labelWidth: 52,emptyText: '',width:195,name: 'idno'},
  	               {xtype:'textfield',fieldLabel: 'MAC��ַ',labelWidth: 52,emptyText: '',width:195,name: 'mac'}
  	              ]
  	            }
			          
			         ,
			          {
                  xtype: 'fieldset',
                  collapsible: false,
                  collapsed:false,
                  title:'�������',
                   margin: '0 0 0 0',
  	              defaultType: 'textfield',
  	              items: [
  	               {xtype:'textfield',fieldLabel: '�����ʺ�',labelWidth: 52,emptyText: '',width:195,name: 'netid'},
  	                  { 
        	                        width:          195,
        	                        fieldLabel: '�������',labelWidth: 52,
                                	xtype:          'treecombox',
                                	mode:           'local',
                                	value:          '',
                                	name:           'nettype',
                                	displayField:   'text',
                                	valueField:     'id',
                                	queryMode: 	'local',
                               	 	store:   store_classtree
	                
			              }
  	              ]
  	            }
  	           ,
			          {
                  xtype: 'fieldset',
                  collapsible: false,
                  collapsed:false,
                  title:'��ַ',
                   margin: '0 0 0 0',
  	              defaultType: 'textfield',
  	              items: [
  	               {xtype:'textfield',fieldLabel: '��ַ�ؼ���',labelWidth: 52,emptyText: '',width:195,name: 'url'}
  	             
  	              ]
  	            }
  	            
  	            
			          ,
			          {
                  xtype: 'fieldset',
                  collapsible: false,
                  collapsed:false,
                  title:'���ݹؼ���',
                   margin: '0 0 0 0',
  	              defaultType: 'textfield',
  	              items: [
  	               {xtype:'textfield',fieldLabel: '�ؼ���',labelWidth: 52,emptyText: '',width:195,name: 'keyword'}
  	             
  	              ]
  	            }
  	            ,
  	             { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
			          {
                  xtype: 'button',text:'��&nbsp;&nbsp;ѯ',
                  style : 'margin-top:10px;margin-left:50px',
                  handler:function(){
                  	var form1=this.up('form');
                  
             //     	alert(this.up('form'));
              	quickResarch.controller.Procy.loadProcyListStore(form1);
                  }
        
  	            },{
                  xtype: 'button',text:'�������',
                  style : 'margin-top:10px;margin-left:10px',
                  handler:function(){
                  	
                  }
        
  	            }]
			             }
			          
			          ]
			        }
     
   ]
    
  ;

    this.callParent(arguments);
  }
});            