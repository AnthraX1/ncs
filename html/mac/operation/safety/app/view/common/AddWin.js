
     
 
    
        			
        			       			
Ext.define('proauthApset.view.common.AddWin' ,{
  extend: 'Ext.window.Window',
  alias : 'widget.addwin',

	title: '新增安全厂商',
	modal: true,
	field1: null,
	field2: null,
	value1:null,
  initComponent: function() {
  	  var required='<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
       
       var facCombo = Ext.create('Ext.form.field.ComboBox', {
        fieldLabel: '接入厂商',
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
  	     xtype: 'form',frame:true,width:400, bodyPadding:5,
  	        items: [
  	        {xtype:'hidden',id:'groupid',name:'groupid',value:''},
            {
  	           xtype: 'fieldcontainer',layout: 'vbox',            
               items:[
			   { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                ,{xtype:'textfield',fieldLabel: '厂商全称',labelWidth: 110,emptyText: '厂商全称',width:230,name: 'dispname'}
			         ]
			         },{ xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                ,{xtype:'textfield',fieldLabel: '厂商简称',labelWidth: 110,emptyText: '厂商简称',width:230,name: 'name',afterLabelTextTpl:required}
			         ]
			         },{ xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                ,{xtype:'textfield',fieldLabel: '厂商组织机构代码',labelWidth:110,emptyText: '厂商组织机构代码',width:230,name: 'code',afterLabelTextTpl:required}
			         ]
			         },{ xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                ,{xtype:'textfield',fieldLabel: '厂商地址',labelWidth:110,emptyText: '厂商地址',width:230,name: 'saddress',afterLabelTextTpl:required}
			         ]
			         },{ xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                ,{xtype:'textfield',fieldLabel: '联系人',labelWidth:110,emptyText: '联系人',width:230,name: 'slink',afterLabelTextTpl:required}
			         ]
			         },{ xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                ,{xtype:'textfield',fieldLabel: '联系人电话',labelWidth:110,emptyText: '联系人电话',width:230,name: 'stel',afterLabelTextTpl:required}
			         ]
			         },{ xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                ,{xtype:'textfield',fieldLabel: '联系人邮件',labelWidth:110,emptyText: '联系人邮件',width:230,name: 'smail',afterLabelTextTpl:required}
			         ]
			         },
			   
			   
			   
			   /*
			         { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                ,{xtype:'textfield',fieldLabel: '厂商全称',labelWidth: 70,emptyText: 'AP显示名',width:210,name: 'gwid',afterLabelTextTpl:required}
               ,{xtype:'treecombox',fieldLabel: '&nbsp;厂商简称',labelWidth: 70,afterLabelTextTpl:required,
             width:220, 
            	name: 'servicename',  
            	valueField: 'id',  
						  displayField: 'text',
            	store:store_classtree},
            	{xtype:'textfield',fieldLabel:'场所编码',id:'servicecode',labelWidth: 70,emptyText: '选择场所名称后自动显示',width:210,name: 'servicecode',afterLabelTextTpl:required,readOnly:'true'}
			         ]
			         },
			         { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                {xtype:'textfield',fieldLabel: 'AP MAC',labelWidth: 70,emptyText: '可以多个，之间用“,”分割',width:320,name: 'mac',afterLabelTextTpl:required}   
                ,{xtype:'textfield',fieldLabel: '&nbsp;安装地址',labelWidth: 70,emptyText: '',width:320,name: 'address'}
			         ]
			         }
			         ,
			          { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                {xtype:'textfield',fieldLabel: '经度',labelWidth: 70,emptyText: '',width:210,name: 'longitude'}   
                ,{xtype:'textfield',fieldLabel: '&nbsp;纬度',labelWidth: 70,emptyText: '',width:210,name: 'latitude'}
                ,facCombo
			         ]
			         }
			         ,
			         { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                {xtype:'textfield',fieldLabel: 'SSID',labelWidth: 70,emptyText: '',width:210,name: 'ssid',afterLabelTextTpl:required}   
                ,{xtype:'textfield',fieldLabel: '车辆编号',labelWidth: 70,emptyText: '',width:210,name: 'plate'}   
                ,{xtype:'textfield',fieldLabel: '&nbsp;交通线路',labelWidth: 70,emptyText: '',width:220,name: 'line'}
			         ]
			         }
			          ,
			         { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                {xtype:'textfield',fieldLabel: '地图标签',labelWidth: 70,emptyText: '',width:210,name: 'mapid'}  
                ,{xtype:'textfield',fieldLabel: 'AP版本',labelWidth: 70,emptyText: '',width:210,name: 'version'}   
                , {
			            	 
			                fieldLabel: '&nbsp;审核状态',
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
                                        {name : '已审',   value: '1'},
                                        {name : '未审',   value: '0'}
                                      
                                       
                                    ]
                                })
			                
			                
			                
			                
			                
			            },
			         ]
			         }
			         ,			         			          ,
			         { xtype: 'fieldcontainer',layout: 'hbox',
                items:[
                {xtype:'textfield',fieldLabel: '上传间隔',labelWidth: 70,emptyText: '',width:210,name: 'uptimestep'}  
                , {
			            	 
			                fieldLabel: '&nbsp;AP类型',
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
                                        {name : '固定采集类型',   value: '1'},
                                        {name : '移动车载设备',   value: '2'},
                                        {name : '单兵采集类型',   value: '3'},
                                        {name : '其它',   value: '9'},
                                      
                                       
                                    ]
                                })
			                
			                
			                
			                
			                
			            }                 ,{xtype:'textfield',fieldLabel: '&nbsp;采集半径',labelWidth: 70,emptyText: '',width:220,name: 'radius',afterLabelTextTpl:required}
			            
			            
			            
			         ]
			         }
			         
			         */
			       ]
			     }
			     ],
			   	buttons:[
			   	 {xtype : 'displayfield',value:'&nbsp;&nbsp;'}
			   	,{text:'保存',action: 'addsave'}
			   	,{text:'关闭',handler: function() {
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
