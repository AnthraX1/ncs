
  

Ext.define('proauthApMacset.view.list.List' ,{
 extend: 'Ext.Panel',
  alias : 'widget.apmacsetlist',
	title: '��־�ϴ���������',
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
                {fieldLabel: '&nbsp;��������BCP�ļ�����',labelWidth: 170,width:240,afterLabelTextTpl:required,
                	             xtype:          'combo',
                                mode:           'local',                              
                                triggerAction:  'all',
                                forceSelection: true,
                                editable:       false,                                
                                name:           'StartDb2Bcp',              
                                displayField:   'name',
                                valueField:     'value',
                                queryMode: 'local',
                                store: Ext.create('Ext.data.Store', {
                                    fields : ['name', 'value'],
                                    data   : [ {name : '����',   value: 'Yes'}, {name : '������',   value: 'No'}]
                                })
                	
                	},
                {xtype:'textfield',fieldLabel: '&nbsp;BCP�ļ����Ŀ¼',labelWidth: 130,emptyText: '/data/bcpout',width:340,name: 'Db2BcpOutPath'}

			         ]
			         }		         
			       ]
			     },
            {
  	           xtype: 'fieldcontainer',layout: 'vbox',            
               items:[			        
			         { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                {xtype:'numberfield',fieldLabel: '&nbsp;�����ļ�ʱ����(��λ:��)',labelWidth: 170,emptyText: '10',width:240,name: 'Db2BcpStep'}
                ,{xtype:'textfield',fieldLabel: '&nbsp;���ݼ�������',labelWidth: 130,emptyText: 'Ac123ASfgq',width:340,name: 'DB2BcpZipPass'}
			         ]
			         },
			        { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                {xtype:'textfield',fieldLabel: '&nbsp;���ݲ���Դ��ʶ',labelWidth: 170,emptyText: '310012',width:240,name: 'Db2BcpScode'}
                ,{xtype:'textfield',fieldLabel: '&nbsp;���ݴ���Ŀ���ʶ',labelWidth: 130,emptyText: '310000',width:340,name: 'Db2BcpDcode'}
			         ]
			         },
			         
			         
			         
			         { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
            
                  {fieldLabel: '&nbsp;���ݴ��ͺ��Ƿ񱣴��ļ�',labelWidth: 170,width:240,
                	             xtype:          'combo',
                                mode:           'local',
                              
                                triggerAction:  'all',
                                forceSelection: true,
                                editable:       false,                                
                                name:           'FtpKeep',              
                                displayField:   'name',
                                valueField:     'value',
                                queryMode: 'local',
                                store: Ext.create('Ext.data.Store', {
                                    fields : ['name', 'value'],
                                    data   : [ {name : '����',   value: 'Yes'}, {name : '������',   value: 'No'}]
                                })
                	
                	},
                	{xtype:'textfield',fieldLabel: '&nbsp;����·��',labelWidth: 130,emptyText: '/data/ftpkeep',width:340,name: 'FtpKeepPath'}
			         ]
			         }
			         ,
			         
			          { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
              {fieldLabel: '&nbsp;���ݴ��ͷ�ʽ',labelWidth: 170,width:240,
                	             xtype:          'combo',
                                mode:           'local',
                              
                                triggerAction:  'all',
                                forceSelection: true,
                                editable:       false,                                
                                name:           'Db2BcpSendType',              
                                displayField:   'name',
                                valueField:     'value',
                                queryMode: 'local',
                                store: Ext.create('Ext.data.Store', {
                                    fields : ['name', 'value'],
                                    data   : [ {name : 'FTP',   value: 'FTP'}]
                                })
                	
                	},
                 {fieldLabel: '&nbsp;����FTP���ͽ���',labelWidth: 130,width:340,
                	             xtype:          'combo',
                                mode:           'local',
                              
                                triggerAction:  'all',
                                forceSelection: true,
                                editable:       false,                                
                                name:           'StartSendFtp',              
                                displayField:   'name',
                                valueField:     'value',
                                queryMode: 'local',
                                store: Ext.create('Ext.data.Store', {
                                    fields : ['name', 'value'],
                                    data   : [ {name : '����',   value: 'Yes'}, {name : 'ֹͣ',   value: 'No'}]
                                })
                	
                	}
                
			         ]
			         },
			         { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                {xtype:'numberfield',fieldLabel: '&nbsp;FTP����ʱ����(��)',labelWidth: 170,emptyText: '10',width:240,name: 'FtpTimeStep'}
                ,{xtype:'textfield',fieldLabel: '&nbsp;FTP����Դ·��',labelWidth: 130,emptyText: '/data/bcpload',width:340,name: 'FtpLocalPath'}
			         ]
			         },
			         
			         { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                {xtype:'textfield',fieldLabel: '&nbsp;�ļ��������ؼ���',labelWidth: 170,emptyText: 'zip',width:240,name: 'FtpFileKey'}
                ,{xtype:'textfield',fieldLabel: '&nbsp;FTP����Զ��·��',labelWidth: 130,emptyText: '/data/proeim/',width:340,name: 'FtpRemotePath'}
			         ]
			         },
			         
			         { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                {xtype:'textfield',fieldLabel: '&nbsp;FTP�û���',labelWidth: 170,emptyText: 'proeim',width:240,name: 'FtpUser'}
                ,{xtype:'textfield',fieldLabel: '&nbsp;FTP��������ַ',labelWidth: 130,emptyText: '',width:340,name: 'FtpServer'}
			         ]
			         },
			         { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                {xtype:'textfield',fieldLabel: '&nbsp;FTP����',labelWidth: 170,emptyText: 'ProEIM123',width:300,name: 'FtpPass'}
              
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