   var rolestore = Ext.create('Ext.data.Store', {
        pageSize: 25,
        model: 'EimData',
        remoteSort: true,
        proxy: {
            type: 'ajax',
            url: '/pronline/Msg?FunName@ncsRolelist_v9',
            reader: {
                type:'json',
                root: 'eimdata',
                totalProperty: 'totalCount'
            },         
            simpleSortMode: true
        },
        sorters: [{
            property: 'userid',
            direction: 'DESC'
        }]
    });

Ext.define('proauthXtgl.controller.Procy', {
  extend: 'Ext.app.Controller',  
  stores: ['List'],
	models: ['List'],  
  views: [ 'list.List'],
  init: function() {
  	store_system_role.load();
//  	store_fac.load();

  
this.control({
		
		  'xtgllist':{
		    render: this.showRender
		  },
		  
		  //�ؼ��ֲ�ѯ
		  'xtgllist button[action=keycx]':{
				click: this.xtglkeycx
			},
			//��ӵ�λ
		  'xtgllist button[action=add]':{
				click: this.xtgladd
			},
		  			//ɾ����λ
		  'xtgllist button[action=del]':{
				click: this.xtgldel
			}
			,
			//�༭��λ
		  'xtgllist button[action=edit]':{
				click: this.xtgledit
			}
			,
			//�߼���ѯ
		  'xtgllist button[action=advancecx]':{
				click: this.xtglavcx
			}
			,
			//Ȩ�޹���
		  'xtgllist button[action=manager]':{
				click: this.xtglqxgl
			}
			
		});
  },
  
  showRender: function(){

  var store = Ext.ComponentQuery.query('xtgllist')[0].getStore();
  
  store.on('beforeload', function (store, options) {
	  var keyword=Ext.getCmp('keyword').value;
	  var groupid=parent.ncsgroupid;
	  var did=parent.corpdid;
	    if(did){
       groupid = "";
     }
	  var new_params={groupid:groupid,did:did,keyword:keyword};
     Ext.apply(store.proxy.extraParams,new_params);
      });	
   
   proauthXtgl.controller.Procy.loadProcyListStore();
 
  },
  //�ؼ��ֲ�ѯ
  xtglkeycx: function(thisBtn){
    proauthXtgl.controller.Procy.loadProcyListStore();
  },
  xtgldel: function(thisBtn){
  	var grid = Ext.ComponentQuery.query('xtgllist')[0];
    var rows = grid.getSelectionModel().getSelection();

     if(rows){
     	           var selsid;
     	            selsid='';
     	            Ext.MessageBox.confirm('ȷ��', 'ȷ��ɾ���ü�¼��', function(btn){
     	            	if(btn=='yes'){
     	       var store = grid.getStore();
     	
                  for(var i=0;i<rows.length;i++){
                  	if(i==0){
                  	 selsid=rows[i].get('userid');
                  	}
                  	else{
                       selsid=selsid+","+rows[i].get('userid');
                    }
                   
                   }

                   store.load({params:{del:"del",selsid:selsid}});
            
                  
                 }
     	        })
     }
    
    
  //  proauthDwgl.controller.Procy.loadProcyListStore();
  },

  xtgladd:function(){
    proauthXtgl.controller.Procy.showedit('','');

           
  },
 xtglqxgl:function(){
	        /* var Authority = new Ext.FormPanel({         
            frame: true,
            layout: 'form',
            fieldDefaults: {
               labelWidth: 85,                        
               width: 250
            },
            collapsible: false,
            bodyPadding: 10,
                items: [{					
                    layout: 'hbox',
                    xtype: 'container',                   
                    items:[
					{
                        fieldLabel:'��ɫ��',
                        xtype: 'textfield',
                        name:'servicecode'
                    }]
					
                },/*{
           xtype:'fieldset',
           title:'����Ȩ��',
           layout: 'form',
        	defaults: {
            labelStyle: 'padding-left:4px;'
        	},
         collapsible: false,
				items: [{
						xtype: 'checkboxgroup',
						name:'rightgroup',
						columns: 3,
						items:[{boxLabel: '��Ϣ��ѯ',checked:false},
							   {boxLabel: '���ظ澯',checked:false},
							   {boxLabel: '�����ھ�',checked:false},
							   {boxLabel: 'ҵ������',checked:false},
							   {boxLabel: 'ϵͳ����',checked:false},
							   {boxLabel: '�ҵ��˺�',checked:false}
							  ]
					}]
				},
				/*{					
                    layout: 'hbox',
                    xtype: 'container',                   
                    items:[
					{
                        fieldLabel:'�������',
                        xtype: 'textfield',
                        name:'servicecode'
                    },{
                        fieldLabel:'&nbsp;&nbsp;��������',
                        xtype: 'textfield',
                        name:'servicename'
                    }]
					
                },{
                    layout: 'hbox',
                    xtype: 'container',
                    items:[
                    {
						fieldLabel:'��ȫ��������',
                        xtype: 'textfield',
                        name:'safefactorycod'
                    },{                        
                        fieldLabel:'&nbsp;&nbsp;�������',
                        xtype: 'textfield',
                        name:'vname'
					}]
					
                },{
                    layout: 'hbox',
                    xtype: 'container',
                    items:[
                    {                        
                        fieldLabel:'�����ȵ�ssid',
                        xtype: 'textfield',
                        name:'ssid'
                    }]
                },{
                    layout: 'hbox',
                    xtype: 'container',
                    height:20
                },*//*{
                    layout: 'column',
                    xtype: 'container',                     
                    items:[
                    {
						xtype: 'container',
                        columnWidth: .40
                    },{
                        //fieldLabel:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;          ',
                        //labelWidth: 85,                        
                        xtype: 'button',
                        anchor: 'left',
                        //style : 'margin-left:80px',
                        text:'&nbsp;&nbsp;��&nbsp;&nbsp;�� &nbsp;&nbsp;',
                        columnWidth: .25, 
                   
                           
                   },{
                        xtype: 'container',
                            columnWidth: .10
                   },{
                        xtype: 'container',
                        columnWidth: .20
                   }]
				   
                }]
        });  */  
	  
	  var winqx = new Ext.Window({
            title: 'Ȩ�޹���',
//            closeAction: 'hide',
			buttonAlign: 'center',
            x:200,
            y:32,
            width: 580,
            resizable: true,
            draggable:true,
            modal:false,
            items:[{					
                     xtype:'fieldset',
					width:200,
					layout: 'form',  
					border:false,				
                    items:[
					{
                        fieldLabel:'������ɫ',
                        xtype: 'textfield',
                        name:'servicecode',
						id:'newrole',
						width:150,
						labelWidth:60
                    },{
             xtype:'treecombox',
             id: 'mgroupid1', 
						labelWidth: 60,
						fieldLabel:'�༭��ɫ',
            	name: 'mgroupname1',  
            	valueField: 'id',  
						  displayField: 'text',  
            	store:store_classtree
 				}]
					
                },{
           xtype:'fieldset',
           title:'����Ȩ��',
           layout: 'form',
        	defaults: {
            labelStyle: 'padding-left:4px;'
        	},
         collapsible: false,
				items: [{
						xtype: 'checkboxgroup',
						name:'rightgroup',
						id:'rightgroup',
						columns: 3,
						items:[{boxLabel: '��Ϣ��ѯ',checked:false},
							   {boxLabel: '���ظ澯',checked:false},
							   {boxLabel: '�����ھ�',checked:false},
							   {boxLabel: 'ҵ������',checked:false},
							   {boxLabel: 'ϵͳ����',checked:false},
							   {boxLabel: '�ҵ��˺�',checked:false}
							  ]
					}]
				}],buttons: [{text:'&nbsp;&nbsp;��&nbsp;&nbsp;�� &nbsp;&nbsp;',
							  handler: function(){
								var servicecode = Ext.getCmp('newrole').value; 
								var rightgroup = Ext.getCmp('rightgroup').getChecked();
								var checkrole = '';
								Ext.Array.each(rightgroup,function(item){
									
									checkrole += ","+item.boxLabel;
									
								});
								if(checkrole.substr(0,1)==',') checkrole = checkrole.substr(1);
								 Ext.MessageBox.alert('��ʾ', '���Ľ�ɫ���ǣ�'+servicecode+'Ȩ����'+checkrole);
								
								
								}
				}]
				   
        });
       
        winqx.show();
	  
  }, 

  
  /**************************************
  * ���Ա�ǩ 
  ***************************************/  
  showTips: function( thisTV, eOpts ){
    thisTV.tip = Ext.create('Ext.tip.ToolTip', {
      target: thisTV.el,
      trackMouse: true,
      dismissDelay : 60000,
      html: '<p>���磺</p><p>&nbsp;&nbsp;&nbsp;�����˿ڣ�80,21</p><p>&nbsp;&nbsp;&nbsp;�˿ڶΣ�2000~3000</p><p>&nbsp;&nbsp;&nbsp;��ϣ�80,2000~3000,3005</p>'
    });
  },
  /**************************************
  * ȫ�ֺ��� 
  ***************************************/
  inheritableStatics:{
    loadProcyListStore:function(){
      var store = Ext.ComponentQuery.query('xtgllist')[0].getStore();
      var keyword=Ext.getCmp('keyword').value;
      store.load();
    },
    SetPage:function(curpage){
      var store = Ext.ComponentQuery.query('xtgllist')[0].getStore();
      store.currentPage=curpage;
       
    },
    showedit:function(userid,record){	
    	 //ϵͳ��ɫ
    
      var temp_check='';
	     if(record!=''){
	         temp_check=record.data.role;	  
	     }
				var dataStr = "["; 
		    var i=0;
     
          var bCheck;
		      store_system_role.each(function(item){
		       bCheck="false";
		       if(temp_check.indexOf(item.get('username'))!=-1){
		           bCheck="true";
		       }
		      
           var caV;
           caV="v"+i;
	         if(i==0){
	       	
		       	    dataStr=dataStr+"{boxLabel: '"+item.get('username')+"' ,inputValue:'" +item.get('userid')+"',checked:"+bCheck+",name:'"+caV+"'}";
		       }
		       else{
		       	  dataStr=dataStr+",{boxLabel: '"+item.get('username')+"' ,inputValue:'" +item.get('userid')+"',checked:"+bCheck+",name:'"+caV+"'}";
		       }


		       i++;
		
		      });
          dataStr=dataStr+"]";
      	
 	    	var rightcheckGroup={
           xtype:'fieldset',
           title:'ѡ���ɫ',
           layout: 'form',
        	 defaults: {
               labelStyle: 'padding-left:4px;'
        	 },
            collapsible: false,
            items: [{
              xtype: 'checkboxgroup',
                name:'rightgroup',
                columns: 4,
                items: eval(dataStr)
            }]
            };
            
    	  var fp2=Ext.create('Ext.FormPanel', {
        frame: true,
        fieldDefaults: {
            labelWidth: 110
        },
        width: 600,
        bodyPadding: 10,
        items: [
             {
                xtype: 'fieldset', title: 'ϵͳ�û���Ϣ',
                collapsible: false,
                defaults: {labelWidth: 60,anchor: '100%',layout: {type: 'hbox',defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}}},
                items: [              
                {
                  xtype: 'fieldcontainer',     
                  defaults: {labelWidth: 60, hideLabel: false},
                items: [
										{xtype: 'textfield',fieldLabel: '��¼��', value: '',name:'username',width:250},
										{xtype: 'textfield',fieldLabel: '����', value: '',name:'dispname',width:250}
                ]
                },
                {
                xtype: 'fieldcontainer',     
                defaults: {labelWidth: 60, hideLabel: false},
                items: [
										{xtype: 'textfield',inputType: 'password',fieldLabel: '����', value: '',name:'password1',width:250},
										{xtype: 'textfield',inputType: 'password',fieldLabel: '����ȷ��', value: '',name:'password2',width:250}
                ]
                },
                {
                xtype: 'fieldcontainer',     
                defaults: {labelWidth: 60, hideLabel: false},
                items: [
										{
                             
                                width:          250,
                                xtype:          'treecombox',
                   //             id: 'xwzsgroupid_first',
                                mode:           'local',
                                value:          '0',
                                triggerAction:  'all',
                                forceSelection: true,
       //                         iconCls:'add',
                                editable:       false,
                                fieldLabel:     'ѡ������',
                                	iconCls:'remove',
                                name:           'groupname',
                                displayField:   'text',
                                valueField:     'id',
                                queryMode: 'local',
                                value : '',
                                store:store_classtree
                  
											}
				             ,
										{                              
                                width:         250,
                                xtype:          'treecomboxcheck',                               
                                triggerAction:  'all',                               
                                fieldLabel:     '����Χ',
                                optid:'optid',
                                opname:'opt',
                                id:'opt',
                                name:           'opt',
                                displayField:   'text',
                                valueField:     'id',
                             
                                value : '',
                                store:store_groupcheck
                   },
                   {xtype: 'hidden',name: 'facid', id:'facid',value: ''}
							
                ]
                },
                {
                xtype: 'fieldcontainer',     
                defaults: {labelWidth: 60, hideLabel: false},
                items: [
										{                              
                                width:         250,
                                xtype:          'treecomboxcheck_f',                               
                                triggerAction:  'all',                               
                                fieldLabel:     '���볧��',
                                optid:'facid',
                                opname:'fac',
                                id:'fac',
                                name:           'fac',
                                displayField:   'text',
                                valueField:     'id',
                             
                                value : '',
                                store:store_faccheck
                   },
                  {                              
                                width:          250,
                                xtype:          'combo',
                                mode:           'local',
                                value:          '0',
                                triggerAction:  'all',
                                forceSelection: true,
                                editable:       false,
                                fieldLabel:     '��ҳ��ʾ',
                                name:           'level',
                                displayField:   'name',
                                valueField:     'value',
                                allowBlank: true,
                                queryMode: 'local',
                                store: Ext.create('Ext.data.Store', {
                                    fields : ['name', 'value'],
                                    data   : [                                       
                                        {name : '��λ����',  value: '1'}
                                        ,{name : '��־�鿴',  value: '6'}
                                        ,{name : '���з���',  value: '12'}
                                        ,{name : '���볧�̹���',value:'13'}
                                        ,{name : 'ͳ�Ʊ���',  value: '14'}
                                        ,{name : 'ϵͳ����',  value: '5'}
                                        ,{name : 'ϵͳ����',  value: '15'}
                                    ]
                                })
                   }
                   ,
                                      
                   {xtype: 'hidden',name: 'optid', id:'optid',value: ''},
                   {xtype: 'hidden',name: 'userid', value: ''},
									 {xtype: 'hidden',name: 'sumright', value: ''}
							
                ]
                },
                {
                xtype: 'fieldcontainer',     
                defaults: {labelWidth: 60, hideLabel: false},
                items: [
										{xtype: 'textfield',fieldLabel: '��ϵ��ʽ', value: '',name:'email',width:250},
										{                              
                                width:          250,
                                xtype:          'combo',
                                mode:           'local',
                                value:          '0',
                                triggerAction:  'all',
                                forceSelection: true,
                                editable:       false,
                                fieldLabel:     '�ʺ�״̬',
                                name:           'useflags',
                                displayField:   'name',
                                valueField:     'value',
                                allowBlank: false,
                                queryMode: 'local',
                                store: Ext.create('Ext.data.Store', {
                                    fields : ['name', 'value'],
                                    data   : [                                       
                                        {name : '����',  value: '0'}
                                        ,{name : '����',  value: '1'}
                                       

                                    ]
                                })
                            }
                ]
                }
                
                
  /*              
                ,
                {
                xtype: 'fieldcontainer',     
                defaults: {labelWidth: 60, hideLabel: false},
                items: [
													{                              
                                width:          250,
                                xtype:          'combo',
                                mode:           'local',
                
                                triggerAction:  'all',
                          //      forceSelection: true,
                                editable:       false,
                                fieldLabel:     '��������Դ',
                                name:           'fcode',
                                displayField:   'dispname',
                                valueField:     'code',
                                allowBlank: false,
                                queryMode: 'local',
                                store: store_fac
                            }
                            ,
										{                              
                                width:          250,
                                xtype:          'combo',
                                mode:           'local',
                                value:          '0',
                                triggerAction:  'all',
                                forceSelection: true,
                                editable:       false,
                                fieldLabel:     '��ҳ��ʾ',
                                name:           'level',
                                displayField:   'name',
                                valueField:     'value',
                                allowBlank: false,
                                queryMode: 'local',
                                store: Ext.create('Ext.data.Store', {
                                    fields : ['name', 'value'],
                                    data   : [                                       
                                        {name : '�ۺ�ͳ��',  value: '0'}
                                        ,{name : 'ʵʱ���',  value: '1'}
                                       

                                    ]
                                })
                            }
                ]
                }
                                
*/         
                   
                ]
            }
           ,
        
        
        	rightcheckGroup
        ],
        buttons: [{
            text: '����',
            handler: function(){
            	if(fp2.getForm().getValues().password1!=fp2.getForm().getValues().password2){
            		alert('��������벻һ��');
            		return;
            	}
            	
            	var tpass=fp2.getForm().getValues().password1;
            	if(tpass.length<8){
            		alert('���볤�Ȳ���С��8λ');
            		return;
            	}
         if(!isNaN(tpass)){
						alert('�������ͬʱ�����ַ�������');
						return ;
					}
		var reg= /^[A-Za-z]+$/;
		if(reg.test(tpass)){
			alert('�������ͬʱ�����ַ�������');
			return;	
		}
				
					var baa=tpass.match(/\D/);
					if(!baa){
								alert('�������ͬʱ�����ַ�������');
						return ;
					}
            	
            	
            	if(fp2.getForm().getValues().username==''||fp2.getForm().getValues().dispname==''){
            		alert('��¼������������Ϊ��');
            		return ;
            	}
            		
            var groupcheck=fp2.getForm().findField('rightgroup');
            var checkvalue=groupcheck.getValue();
            var sum=store_system_role.getCount();
            fp2.getForm().findField('sumright').setValue(sum);
            
             fp2.form.doAction('submit',{
               url:'/pronline/Msg',
                method:'POST',
               params:{FunName:'ncAdminUserSave_v8'},
                 
                success:function(form,action){ 
                	alert(action.result.msg);
         		//			Ext.getCmp('addwindow').close();
         		//		  store_adminuser.currentPage=1;
            //      store_adminuser.load();
         					 var store = Ext.ComponentQuery.query('xtgllist')[0].getStore();
         					 store.load();
         					  Ext.getCmp('addwindow').close();
                 },
             		 failure:function(form,action){        		 
                     alert(action.result.msg);
                 
            		 }
                }
             )  
  
 
           
            }
        },{
            text: '�ر�',
            handler: function(){
            Ext.getCmp('addwindow').close();

            }
         }]
      });
        
      if(userid!=''){
      	fp2.loadRecord(record);
      	
      }
      
         var win2 = new Ext.Window ({
                             id:"addwindow",
                             title:"���ӻ��޸�ϵͳ�û�",
                             x:200,
                             y:20,
                             width:630,
                             height:600,
                             bodyPadding: 10,
                             modal:true,
                             resizable:true,
           //                  draggable:false,
                             items: fp2
                                               
         })
        win2.show();    
      
    	
    
       
    },
    setTitle: function(title){
       document.getElementById("titledx").innerHTML='&nbsp'+title+'&nbsp;&nbsp;';   
 /*     
      var grid = Ext.ComponentQuery.query('xtgllist')[0];
      var oldtitle = grid.title;
   
      var str = "";
      var index = oldtitle.indexOf('(');
      if(index>0){
        str = oldtitle.substring(0,index);
      }else{
        str = oldtitle;
      }
      
      grid.setTitle(str+"("+title+")");
 */
    }
  }
});
