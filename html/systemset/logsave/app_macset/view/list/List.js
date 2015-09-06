
  

Ext.define('proauthApMacset.view.list.List' ,{
 extend: 'Ext.Panel',
  alias : 'widget.apmacsetlist',
	title: '��־��������',
	modal: true,
	field1: null,
	field2: null,
	value1:null,
	frame:true,
	layout: { pack: 'center', type: 'hbox' } ,
	height:900,
	
  initComponent: function() {
  	  var required='<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
      
  	this.items = [
  	{
  	     xtype: 'form',frame:true,width:700, bodyPadding:5,margin: '50 0 0 0',
  	     id:'formmacset',
  	        items: [
  	                    {
  	           xtype: 'fieldcontainer',layout: 'vbox',            
               items:[			        
			         { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                {fieldLabel: '&nbsp;������־���湦��',labelWidth: 170,width:240,afterLabelTextTpl:required,
                	             xtype:          'combo',
                                mode:           'local',
                              
                                triggerAction:  'all',
                                forceSelection: true,
                                editable:       false,                                
                                name:           'StartAutoClean',              
                                displayField:   'name',
                                valueField:     'value',
                                queryMode: 'local',
                                store: Ext.create('Ext.data.Store', {
                                    fields : ['name', 'value'],
                                    data   : [ {name : '����',   value: 'Yes'}, {name : '������',   value: 'No'}]
                                })
                	
                	}   

			         ]
			         }		         
			       ]
			     },
            {
  	           xtype: 'fieldcontainer',layout: 'vbox',            
               items:[			        
			         { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                {xtype:'numberfield',fieldLabel: '&nbsp;��������־���ݿⱣ��ʱ��',labelWidth: 170,emptyText: '6',width:240,name: 'termlog'}
                 ,{
			            	  xtype     : 'displayfield',
			                value:'&nbsp;(��λ:��) �����ϱ������ݿ���־����ʱ��'
			            }
			         ]
			         },
			         { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                {xtype:'numberfield',fieldLabel: '&nbsp;��������־�����ļ�ʱ��',labelWidth: 170,emptyText: '30',width:240,name: 'termlogfile'}
                 ,{
			            	  xtype     : 'displayfield',
			                value:'&nbsp;(��λ:��) '
			            }
			         ]
			         }
			         ,
			         
			          { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                {xtype:'numberfield',fieldLabel: '&nbsp;������־���ݿⱣ��ʱ��',labelWidth: 170,emptyText: '6',width:240,name: 'termiplog'}
                 ,{
			            	  xtype     : 'displayfield',
			                value:'&nbsp;(��λ:��) �����ϱ������ݿ���־����ʱ��'
			            }
			         ]
			         },
			         { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                {xtype:'numberfield',fieldLabel: '&nbsp;������־�ļ�����ʱ��',labelWidth: 170,emptyText: '30',width:240,name: 'termiplogfile'}
                 ,{
			            	  xtype     : 'displayfield',
			                value:'&nbsp;(��λ:��) '
			            }
			         ]
			         }
			         
			         ,
			         { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                {xtype:'numberfield',fieldLabel: '&nbsp;�ն�������Ϣ����ʱ��',labelWidth: 170,emptyText: '30',width:240,name: 'termmaclog'}
                 ,{
			            	  xtype     : 'displayfield',
			                value:'&nbsp;(��λ:��) '
			            }
			         ]
			         }
			         ,
			         { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                {xtype:'numberfield',fieldLabel: '&nbsp;�ȵ���Ϣ����ʱ��',labelWidth: 170,emptyText: '30',width:240,name: 'hotinfolog'}
                 ,{
			            	  xtype     : 'displayfield',
			                value:'&nbsp;(��λ:��) '
			            }
			         ]
			         }
			          ,
			         { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                {xtype:'numberfield',fieldLabel: '&nbsp;�ƶ�AP�켣����ʱ��',labelWidth: 170,emptyText: '30',width:240,name: 'mobileaplog'}
                 ,{
			            	  xtype     : 'displayfield',
			                value:'&nbsp;(��λ:��) '
			            }
			         ]
			         }
			         
			         ,
			         { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                {xtype:'numberfield',fieldLabel: '&nbsp;������־����ʱ��',labelWidth: 170,emptyText: '30',width:240,name: 'operlog'}
                 ,{
			            	  xtype     : 'displayfield',
			                value:'&nbsp;(��λ:��) '
			            }
			         ]
			         }
			         
			         
			         
			         
			         	         
			       ]
			     }
			     
			     
			     
			     	
			     
			     ],
			   	buttons:[			  
			   	 {xtype : 'displayfield',value:'&nbsp;&nbsp;'}
			   	,{text:'����',action: 'addsave'}
	//	   	,{text:'ȡ��',handler: function() {
  //                     var tform=this.up('form').getForm().reset();
	//                    }	
	
	//				 }
	       ]		  
   
     }
    ];
 
    this.callParent(arguments);
     var tform=this.query('form')[0];
   store_logsave.load({callback:function(r,options,success){
	  if(success){          
	     tform.getForm().loadRecord(r[0]); 
	  }
    }
    });
  }    
});