Ext.define('proauthRzAuthlog.view.common.AddGroup' ,{
  extend: 'Ext.window.Window',
  alias : 'widget.addgroup',

	title: null,
	modal: true,
	field1: null,
	field2: null,
	value1:null,

  initComponent: function() {
  	 var required='<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
  	
       var myDate = new Date();
      var yy = ( myDate.getYear() < 1900 ) ? ( 1900 + myDate.getYear() ) : myDate.getYear();
      var mm=myDate.getMonth()+1;
      if(mm<10)
      {
        mm='0'+mm;
      }
      var dd=myDate.getDate();
      if(dd<10)
      {
        dd='0'+dd;
      }
      var today=yy+'/'+mm+'/'+dd;
      var startday=yy+'/'+mm+'/'+dd;
  	 
    this.items = [{
      xtype: 'form',frame:true,

      
      items:[
                 {
                 	xtype:'fieldset',
                 	layout:'vbox',
                 	width:325,
                 	hight:500,
                 	
                 	items:[
				{
								xtype:'textfield',
								fieldLabel:'��������',
								id:'taskname',
								name:'taskname',
								value:''	,
								width:255,
								afterLabelTextTpl: required,
								allowBlank:false, //�Ƿ�����Ϊ��
						    blankText:'�������Ʋ���Ϊ�գ�',	
						    msgTarget:'qtip' //��ʾһ����������ʾ��Ϣ	
						},{
								xtype:'textfield',
								fieldLabel:'��������',
								id:'taskdesc',
								name:'taskdesc',
								width:255,
								value:''		
						},{
								xtype:'textfield',
								fieldLabel:'��mac��Ϣ',
								id:'mac',
								name:'mac',
								width:255,
		//						value:'[#name#]',
								afterLabelTextTpl: required,
								allowBlank:false, //�Ƿ�����Ϊ��
						    blankText:'��mac��Ϣ����Ϊ�գ�',	
						    msgTarget:'qtip' //��ʾһ����������ʾ��Ϣ 		
						},{
	
								
								    fieldLabel:'�����������',
	                                labelWidth:100,    
									width:          250,
									xtype:          'treecombox',
									mode:           'local',
									value:          '0',
									triggerAction:  'all',
									forceSelection: true,
									iconCls:'add',
									editable:       false,
								
									iconCls:'remove',
									emptyText:'ѡ��λ��ѯ',
									name:           'groupname',
									id:           'groupname',
									displayField:   'text',
									valueField:     'id',
									queryMode: 'local',
									value : '',
									store:store_classtree
							
				},
		 			    {       
                        xtype: 'fieldcontainer',         
                        layout: 'hbox',
                        defaults: {
    //                      flex: 1,
                            labelWidth: 100,
                            hideLabel: false
                        },
                       items: [
                       {              
                          fieldLabel:'��ʼʱ��',
                          xtype: 'datefield',
                          format: "Y/m/d",
                          width:195,
                          value:startday,
                          name:'sdate',
                           id:'sdate'
                      },                    
                      {xtype: 'textfield',fieldLabel: '',  id:'stime',name: 'stime', value:'00:00:00', width: 60},
                    ]},
                     {       
                        xtype: 'fieldcontainer',         
                        layout: 'hbox',
                        defaults: {
    //                      flex: 1,
                            labelWidth: 100,
                            hideLabel: false
                        },
                       items: [
                       {              
                          fieldLabel:'����ʱ��',
                          xtype: 'datefield',
                          format: "Y/m/d",
                          width:195,
                          value:today,
                          name:'edate',
                           id:'edate'
                      },
                                          
                      {xtype: 'textfield',fieldLabel: '', name: 'etime', id:'etime', value:'23:59:59', width: 60},
                    ]},
		                  {
		              width:255,
								xtype:'textfield',
								fieldLabel:'�ظ����ִ���',
								id:'servcount',
								name:'servcount',
								value:''
								
						},{
								xtype:'textfield',
								fieldLabel:'����Mac����',
								id:'maccount',
								name:'maccount',
								width:255,
								value:''
								
						}	]
						}			

				]
    }];
    
    this.buttons=[{
      text: '����',
      action: 'adds'
    },{
      text: 'ȡ��',
      scope: this,
      handler: this.close
    }];
    
    this.callParent(arguments);
    
  }
});
