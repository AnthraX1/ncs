Ext.define('proauthRzAuthlog.view.common.AddWin' ,{
  extend: 'Ext.window.Window',
  alias : 'widget.addwin',

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

  	   var actionCombo = Ext.create('Ext.form.field.ComboBox', {
  	   	fieldLabel:'������Ϊģʽ',
        labelWidth: 100,
        width:250,
        valueField:'value',
        displayField: 'name',
        id:'actions',
        name : 'actions',      
        value:'0',
        allowBlank: true,
        forceSelection: false,
          store: Ext.create('Ext.data.Store', {
           fields : ['name', 'value'],
            data   : [
             {name : '�켣�غ�',   value: '0'}
                       ]
                                }) ,
        queryMode: 'local',
        typeAhead: true,
                listeners: {
                      'change':function(){
                      
                        }
                    }
        });
  	   var freCombo = Ext.create('Ext.form.field.ComboBox', {
  	   	fieldLabel:'������Ϊģʽ',
        labelWidth: 100,
        width:250,
        valueField:'value',
        displayField: 'name',
        id:'freq',
        name : 'freq',      
        value:'0',
        allowBlank: true,
        forceSelection: false,
          store: Ext.create('Ext.data.Store', {
           fields : ['name', 'value'],
            data   : [
             {name : 'ÿ��һ��',   value: '0'},
             {name : 'ÿ��һ��',   value: '1'},
             {name : 'ÿ��һ��',   value: '2'},
             {name : '�Զ���',   value: '3'}
                       ]
                                }) ,
        queryMode: 'local',
        typeAhead: true,
                listeners: {
                      'change':function(){
                      
                        }
                    }
        });


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
								fieldLabel:'�ն˷���',
								id:'group',
								name:'group',
								value:''	,
								afterLabelTextTpl: required,
								allowBlank:false, //�Ƿ�����Ϊ��
						    blankText:'�ն˷��鲻��Ϊ�գ�'
						    	
						},actionCombo,
						freCombo,
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
                          fieldLabel:'ִ��ʱ��',
                          xtype: 'datefield',
                          format: "Y/m/d",
                          width:250,
                          value:today,
                          name:'sdate'
                      }                    
                      
                    ]}	]
						}			

				]
    }];
    
    this.buttons=[{
      text: '����',
      action: 'add'
    },{
      text: 'ȡ��',
      scope: this,
      handler: this.close
    }];
    
       this.callParent(arguments);
     var tform=this.query('form')[0];
       if(this.field1&&this.field1!=''){
       tform.getForm().loadRecord(this.field1);  
      //Ext.getCmp('img_cxyh').setSrc(this.field1.get('imgpath'));
     }
 
  }
});
