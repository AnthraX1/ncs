
     
 
    
        			
        			       			
Ext.define('proauthApset.view.common.AddWin' ,{
  extend: 'Ext.window.Window',
  alias : 'widget.addwin',

	title: '��λAP��Ϣ�༭',
	modal: true,
	field1: null,
	field2: null,
	value1:null,
  initComponent: function() {
  	  var required='<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
       
       var facCombo = Ext.create('Ext.form.field.ComboBox', {
        fieldLabel: '���볧��',
        labelWidth: 70,
        width: 220,
        valueField:'groupid',
        value:'',
        displayField: 'groupname',
        name : 'fcode',      
        allowBlank: false,
        afterLabelTextTpl:required,
//        forceSelection: true,
        store: store_fac,
        triggerAction: 'all',
//      queryMode:'remote',
         queryMode: 'local',
         typeAhead: true,
              listeners: {
			          'change':function(){
			           
			            }
			        }
    });
     
     
   
    
  	this.items = [
  	{
  	     xtype: 'form',frame:true,width:700, bodyPadding:5,
  	        items: [
  	        {xtype:'hidden',id:'groupid',name:'groupid',value:''},
            {
  	           xtype: 'fieldcontainer',layout: 'vbox',            
               items:[
			         { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                ,{xtype:'textfield',fieldLabel: 'AP���',labelWidth: 70,emptyText: 'AP���',width:210,name: 'gwid',afterLabelTextTpl:required}
               ,{xtype:'treecombox',fieldLabel: '&nbsp;��������',labelWidth: 70,afterLabelTextTpl:required,
             width:220, 
            	name: 'servicename',  
            	valueField: 'id',  
						  displayField: 'text',
            	store:store_classtree},
            	{xtype:'textfield',fieldLabel:'��������',id:'servicecode',labelWidth: 70,emptyText: 'ѡ�������ƺ��Զ���ʾ',width:210,name: 'servicecode',afterLabelTextTpl:required,readOnly:'true'}
			         ]
			         },
			         { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                {xtype:'textfield',fieldLabel: 'AP MAC',labelWidth: 70,emptyText: '���Զ����֮���á�,���ָ�',width:320,name: 'mac'}   
                ,{xtype:'textfield',fieldLabel: '&nbsp;��װ��ַ',labelWidth: 70,emptyText: '',width:320,name: 'address'}
			         ]
			         }
			         ,
			          { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                {xtype:'textfield',fieldLabel: '����',labelWidth: 70,emptyText: '',width:210,name: 'longitude'}   
                ,{xtype:'textfield',fieldLabel: '&nbsp;γ��',labelWidth: 70,emptyText: '',width:210,name: 'latitude'}
                ,facCombo
			         ]
			         }
			         ,
			         { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                {xtype:'textfield',fieldLabel: 'SSID',labelWidth: 70,emptyText: '',width:210,name: 'ssid',afterLabelTextTpl:required}   
                ,{xtype:'textfield',fieldLabel: '�������',labelWidth: 70,emptyText: '',width:210,name: 'plate'}   
                ,{xtype:'textfield',fieldLabel: '&nbsp;��ͨ��·',labelWidth: 70,emptyText: '',width:220,name: 'line'}
			         ]
			         }
			          ,
			         { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                {xtype:'textfield',fieldLabel: '��ͼ��ǩ',labelWidth: 70,emptyText: '',width:210,name: 'mapid'}  
                ,{xtype:'textfield',fieldLabel: 'AP�汾',labelWidth: 70,emptyText: '',width:210,name: 'version'}   
                , {
			            	 
			                fieldLabel: '&nbsp;���״̬',
			                labelWidth: 70,
			                width:220,
                                xtype:          'combo',
                                mode:           'local',
                                value:          '1',
                                triggerAction:  'all',
                                forceSelection: true,
                                editable:       false,                                
                                name:           'flags',              
                                displayField:   'name',
                                valueField:     'value',
                                queryMode: 'local',
                                store: Ext.create('Ext.data.Store', {
                                    fields : ['name', 'value'],
                                    data   : [
                                        {name : '����',   value: '1'},
                                        {name : 'δ��',   value: '0'}
                                      
                                       
                                    ]
                                })
			                
			                
			                
			                
			                
			            }
			         ]
			         }
			         ,			         			          ,
			         { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                {xtype:'textfield',fieldLabel: '�ϴ����',labelWidth: 70,emptyText: '',width:210,name: 'uptimestep'}  
                , {
			            	 
			                fieldLabel: '&nbsp;AP����',
			                labelWidth: 70,
			                width:210,
                                xtype:          'combo',
                                mode:           'local',
                                value:          '1',
                                triggerAction:  'all',
                                forceSelection: true,
                                editable:       false,                                
                                name:           'aptype',              
                                displayField:   'name',
                                valueField:     'value',
                                queryMode: 'local',
                                store: Ext.create('Ext.data.Store', {
                                    fields : ['name', 'value'],
                                    data   : [
                                        {name : '�̶��ɼ�����',   value: '1'},
                                        {name : '�ƶ������豸',   value: '2'},
                                        {name : '�����ɼ�����',   value: '3'},
                                        {name : '����',   value: '9'}
                                      
                                       
                                    ]
                                })
			                
			                
			                
			                
			                
			            }   ,{xtype:'textfield',fieldLabel: '&nbsp;�ɼ��뾶',labelWidth: 70,emptyText: '',width:220,name: 'radius',afterLabelTextTpl:required}
			            
			            
			            
			         ]
			         }			         ,			         			          ,
			         { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                {xtype:'textfield',fieldLabel: 'AP��ʾ��',labelWidth: 70,emptyText: '',width:210,name: 'dispname',afterLabelTextTpl:required}  
                 ,{
			            	  xtype     : 'displayfield',
			                value:'&nbsp;&nbsp;��ͳ��ͼ���б�ʶAP,������Ҫ����10���ַ�'
			            }
			            
			            
			         ]
			         }
			         
			         
			       ]
			     }
			     ],
			   	buttons:[
			   	 {xtype : 'displayfield',value:'&nbsp;&nbsp;'}
			   	,{text:'����',action: 'addsave'}
			   	,{text:'�ر�',handler: function() {
                        var tform=this.up('window').close();
		                    }	
					 }
	       ]		  
   
     }
    ];
  
    this.callParent(arguments);

     var tform=this.query('form')[0];
    
     if(this.field1&&this.field1!=''){    	
        tform.getForm().loadRecord(this.field1);          
     }

  }
});  
