
  

Ext.define('proauthApMacset.view.list.List' ,{
 extend: 'Ext.Panel',
  alias : 'widget.apmacsetlist',
	title: '����״̬����',
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
                {xtype:'textfield',fieldLabel: '&nbsp;��������������ʱʱ��',labelWidth: 170,emptyText: '600',width:240,name: 'NcTimeOut'}
                 ,{
			            	  xtype     : 'displayfield',
			                value:'&nbsp;(��λ:��) �����ĳ�����ʱ����û�н��յ�������Ϣʱ���жϸó�������'
			            }
                
              

			         ]
			         }
			         ,
			         
			          { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                {xtype:'textfield',fieldLabel: '&nbsp;���������ݳ�ʱʱ��',labelWidth: 170,emptyText: '86400',width:240,name: 'DataTimeOut'}
                 ,{
			            	  xtype     : 'displayfield',
			                value:'&nbsp;(��λ:��) �����ĳ�����ʱ����û�н��յ�����ʱ���жϸó���������'
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