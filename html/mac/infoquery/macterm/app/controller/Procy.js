
Ext.define('proauthRzAuthlog.controller.Procy', {
	extend: 'Ext.app.Controller',  
	stores: ['List'],
	models: ['List'],  
	views: 	['list.List'],    	
	
	searchtype:'',       
	sdate:'',
	stime:'',
	edate:'',
	etime:'',	
	mac:'',    
	apmac:'',
	     
	servicecode:'',
	servicename:'',    
	sname:'',
	ssid:'',
	apname:'',	
	vname:'',      
		
  init: function() {
  	this.control({
  		
			//�ؼ��ֲ�ѯ
		  'myselfPanel button[action=keycx]':{
		  		click: this.dwglkeycx
		  },
  		
    	//�߼���ѯ	
	  	'myselfPanel button[action=advancecx]':{
					click:this.highquery  
	  	},
	  	
	  	/* ����ѡ��Ǯ���� 2015/9/13 */
	  	'myselfPanel button[action=choseplace]':{
					click:this.infoquerychoseplace  
	  	},
     
     	//select: this.showTab, 	
    	'authloglist':{ 				
    			render: this.showRender
    	},		        	
	            		  
	  	/* ���Ӱ�ť��Ǯ����2015/7/20/11:00 */
	  	//��������
      'authloglist button[action=termac]':{
      		click: this.featureAnalysis
      },
	  
	  	/* ���Ӱ�ť��Ǯ����2015/7/20/15:00 */
	  	//��Ա�켣
	  	'authloglist button[action=termmacmap]':{
      		click: this.infoquerymap
      },
	  
	  	/* ���Ӱ�ť��Ǯ����2015/7/22/15:30 */
	  	//�����Ϣ
	  	'authloglist button[action=idcheck]':{
      		click: this.infoCheck
      },
	  
	  	/* ���Ӱ�ť��2015/7/26 10:55  Ǯ���� */
	  	//���벼��
	  	'authloglist button[action=joingroup]':{
      		click: this.joinGroupControl
      },
      
      //����
	  	'authloglist button[action=export]':{
      		click: this.infoexport
      }
	  		 		 
    });
  },
    
  showRender: function(){
  	//alert("in showrender");	    	
  	var store = Ext.ComponentQuery.query('authloglist')[0].getStore();	
  	
  	if(parent.macGlobalCtx.getPhoneNumber() != ""){
  		  
  			/* ���Ͻ�ȫ�������������ֻ��ţ���һ�μ�����ʾ������� Ǯ���� 2015/9/14 10:32 */
  									
				g_count++;
				var phonenumber = parent.macGlobalCtx.getPhoneNumber();  
    		Ext.getCmp("keyword_mobileaccount").setValue(phonenumber);
    		
				//alert("in ShowRender " + phonenumber);		 
  	}    	
  											
		store.on('beforeload', function (store, options) {					
		
			var groupid="";
			var username="";				
			
			//alert("in beforeload");	
					
			//������ͼ�߶�
			var qgrid=Ext.ComponentQuery.query('authloglist')[0];
			parent.grid_height=parent.Ext.getCmp('layout_center').getHeight()-56;
			qgrid.setHeight(parseInt(parent.grid_height)+25-100);
			
			//��ೡ������������ơ����߳������ơ� ���߹�������ѡ��
			if(g_typename == '0'){		
				try{
		
					groupid = parent.getGlobalGroupId();															
				}
				catch(e){
					alert(e.message);
				}											
			}
			else if(g_typename == '1'){
										
				try{									
					username = parent.getGlobalUserName();								
				}
				catch(e){
					alert(e.message);
				}						
			}
			else{
				
				//��ѯ��־��Ϊ""��Ĭ�ϴӹ�������ȡ�����������											
				var allChosen = Ext.getCmp("id_mac_placetree").rawValue;
	    	if((allChosen == "ȫ������") || (allChosen == "")){
	    		
	    		g_Groupid = "all";    	    		    		 		 
		    	//alert("���г��� g_Groupid Ϊ " + g_Groupid);
	    	}	
	    	else{
	    		var treeChosen = Ext.getCmp("id_mac_placetree").picker.getSelectionModel();
		    	var bChosenType = treeChosen.selected.items[0].raw.cls;
		    	
		    	if(bChosenType == "folder"){    		
		    		
		    		g_Groupid = treeChosen.selected.items[0].raw.id;		    				    	  			
		    		//alert("ѡ���������� g_Groupid Ϊ " + g_Groupid);
		    	}	
		  		else{	  			
		  			
		  			g_Username = treeChosen.selected.items[0].raw.code;			  						
		  			//alert("ѡ�г�������g_Username Ϊ  " + g_Username);
		  		}	
	    	}
		    	
	    	groupid		= g_Groupid;
				username	= g_Username; 				    	 	 							 
					
			}

			//��ȡ�ؼ��в�ѯ������combox ��ѡ���ʱ�䡢������йؼ���
			//var time_flag = Ext.getCmp('time_flag').value;			      	
						 
		  var time_flag = getTimeFlag(); 
		  //alert("In showRender " + time_flag);
			//�ؼ��ֲ�ѯ    
			var keyword = Ext.getCmp('keyword_mobileaccount').value;      				      					       	          
      	    	      	      	    	      	
    	//�߼���ѯ�ֶ�      	
    	var searchtype = proauthRzAuthlog.controller.Procy.searchtype;         			       
    	var sdate = proauthRzAuthlog.controller.Procy.sdate;
    	var stime = proauthRzAuthlog.controller.Procy.stime;
    	var edate = proauthRzAuthlog.controller.Procy.edate;
    	var etime = proauthRzAuthlog.controller.Procy.etime;      	
    	var mac = proauthRzAuthlog.controller.Procy.mac;      	      	      	      	
    	var apmac = proauthRzAuthlog.controller.Procy.apmac;    	
    	var servicename = proauthRzAuthlog.controller.Procy.servicename;     
    	var servicecode = proauthRzAuthlog.controller.Procy.servicecode; 	
    	var sname = proauthRzAuthlog.controller.Procy.sname;
    	var ssid = proauthRzAuthlog.controller.Procy.ssid;  
    	var apname = proauthRzAuthlog.controller.Procy.apname;    	
    	var vname = proauthRzAuthlog.controller.Procy.vname;      	     	
    
    	    	
    	var new_params="";
    	if(g_count>0){
    		
    		//alert(">0");
    		/* g_count > 0ʱ��store ��������Ҫ���� phonenumber��Ǯ���� 2015/9/14 10:32 */
    		
    		//var phonenumber = parent.macGlobalCtx.getPhoneNumber();  
    		//Ext.getCmp("keyword_mobileaccount").setValue(phonenumber);
    		
    		new_params = {phonenumber:phonenumber, groupid:groupid, username:username, keyword:keyword,time_flag:time_flag, mac:mac, apmac:apmac, sdate:sdate,stime:stime,edate:edate,etime:etime, servicecode:servicecode, servicename:servicename, searchtype:searchtype, sname:sname, ssid:ssid, apname:apname, vname:vname};
    		
    	}
    	else{
    		//alert("=0");
    		
    		/* g_count == 0ʱ��store ��������Ȼ�� phonenumber��
    			 ��ʱ��Ҫ������Ϊ "" ���ɲ���ѯ�ֻ��� Ǯ���� 2015/9/14 10:32 */
        store.proxy.extraParams["phonenumber"] = "";   
                 
    		new_params = {groupid:groupid, username:username, keyword:keyword,time_flag:time_flag, mac:mac, apmac:apmac, sdate:sdate,stime:stime,edate:edate,etime:etime, servicecode:servicecode, servicename:servicename, searchtype:searchtype, sname:sname, ssid:ssid, apname:apname, vname:vname};
    	}
    	        
    	Ext.apply(store.proxy.extraParams,new_params);
 		});
 		
 		//���Ͻ�ȫ�������ֻ��ż��ع��󣬽���־��0
 		store.on('load', function (store, options){
			//alert("in load,"+g_count);
			
			//ʹ����ȫ������֮��Ҫ���parent�����PhoneNumber
			if(g_count>0)
				g_count--;						
				
			parent.macGlobalCtx.setPhoneNumber("");
			
			
		});
	
 		
  	proauthRzAuthlog.controller.Procy.loadProcyListStore();
  },

  //�ؼ��ֲ�ѯ
  dwglkeycx: function(thisBtn){        	    
  			    	
  	proauthRzAuthlog.controller.Procy.searchtype = ""; 
    proauthRzAuthlog.controller.Procy.SetPage(1);  
   	proauthRzAuthlog.controller.Procy.loadProcyListStore();
   	
  },
		
	//�߼���ѯ
  highquery: function(thisBtn){
		var myDate = new Date();
    var yy = ( myDate.getYear() < 1900 ) ? ( 1900 + myDate.getYear() ) : myDate.getYear();
    var mm = myDate.getMonth()+1;
    if(mm<10)
    {
    	mm = '0'+mm;
    }
    var dd = myDate.getDate();
    if(dd<10)
    {
    	dd = '0'+dd;
    }
    var today = yy+'/'+mm+'/'+dd;
    var startday = yy+'/'+mm+'/'+'01';

    var formquery = new Ext.FormPanel({         
    	frame: true,
      layout: 'form',
      fieldDefaults: {
      	labelWidth: 85,                        
        width: 250
      },
      collapsible: false,
      bodyPadding: 10,
      items: [
			{
  			layout: 'hbox',
    		xtype: 'container',  					
    		items:[
				{                        
					fieldLabel:'��ʼ����',
  				xtype: 'datefield',
  				format: "Y/m/d",
  				value:startday,
  				name:'sdate',
  				id:'sdate'
				},
				{
  				fieldLabel:'&nbsp;&nbsp;��ʼʱ��',
  				xtype: 'textfield',
  				value:'00:00:00',
  				name:'stime',
  				regex :/^[0-2][0-9]:[0-6][0-9]:[0-6][0-9]$/,
  				regexText: "��ʽ��xx:xx:xx",
  				allowBlank  : false,
  				id:'stime'
				}]    					
  		},
  		{					
				layout: 'hbox',
    		xtype: 'container',                   
    		items:[
				{
					fieldLabel:'��������',
  				xtype: 'datefield',
  				id:'edate',
  				format: "Y/m/d",
  				value:today,
  				name:'edate'
				},
				{
					fieldLabel:'&nbsp;&nbsp;����ʱ��',
  				xtype: 'textfield',
  				value:'23:59:59',
  				name:'etime',
  				regex :/^[0-2][0-9]:[0-6][0-9]:[0-6][0-9]$/,
  				regexText: "��ʽ��xx:xx:xx",
  				allowBlank  : false,
  				id:'etime'
				}]					
  		},
  		{					
  			layout: 'hbox',
    		xtype: 'container',                   
    		items:[
				{
					fieldLabel:'�������',
  				xtype: 'textfield',
  				name:'servicecode'
				},
				{
  				fieldLabel:'&nbsp;&nbsp;��������',
  				xtype: 'textfield',
  				name:'servicename'
				}]					
 			},
 			{
				layout: 'hbox',
  			xtype: 'container',
  			items:[
				{
					fieldLabel:'��ȫ��������',
					xtype: 'textfield',
					name:'sname'
				},
				{ 
					fieldLabel:'&nbsp;&nbsp;�����ȵ�ssid',
          xtype: 'textfield',
          name:'ssid'                                 						
				}]					
  		},
  		{
  			layout: 'hbox',
  			xtype: 'container',
  			items:[
				{                        
        	fieldLabel:'�ɼ��豸���',
					xtype: 'textfield',
					name:'apname'
        },
        {                        
        	fieldLabel:'&nbsp;&nbsp;������֤�˺�',
					xtype: 'textfield',
					name:'vname'
        }]
      },
      {
        layout: 'hbox',
        xtype: 'container',
        items:[
        {                        
        	fieldLabel:'MAC��Ϣ',
					xtype: 'textfield',
					name:'mac'
        }]    
      },
      {
    	  layout: 'column',
        xtype: 'container',                     
        items:[
        {
					xtype: 'container',
          columnWidth: .20
        },
        {                    	                        
          xtype: 'button',
          anchor: 'left',                     
          text:'&nbsp;&nbsp;&nbsp;&nbsp;��&nbsp;&nbsp;ѯ &nbsp;&nbsp;',
          columnWidth: .25, 
          handler: function(){
						var grid = Ext.ComponentQuery.query('authloglist')[0];             
						var store = grid.getStore();
						
						proauthRzAuthlog.controller.Procy.searchtype ='adv';
						
						proauthRzAuthlog.controller.Procy.sdate = 
						formquery.getForm().getValues().sdate;
	
						proauthRzAuthlog.controller.Procy.stime = 
						formquery.getForm().getValues().stime;
	
						proauthRzAuthlog.controller.Procy.edate = 
						formquery.getForm().getValues().edate;
	
						proauthRzAuthlog.controller.Procy.etime = 
						formquery.getForm().getValues().etime;
											
											
											
						proauthRzAuthlog.controller.Procy.servicecode = 
						formquery.getForm().getValues().servicecode;
	
						proauthRzAuthlog.controller.Procy.servicename = 
						formquery.getForm().getValues().servicename;
																																																	
							proauthRzAuthlog.controller.Procy.sname = 
						formquery.getForm().getValues().sname;
																											
						proauthRzAuthlog.controller.Procy.ssid = 
						formquery.getForm().getValues().ssid; 																					
																																														
						proauthRzAuthlog.controller.Procy.apname = 
						formquery.getForm().getValues().apname;
											
						proauthRzAuthlog.controller.Procy.vname = 
						formquery.getForm().getValues().vname;	
						
						proauthRzAuthlog.controller.Procy.mac = 
						formquery.getForm().getValues().mac;		
									
						store.load({callback : function(r, option, success) { 
	  
          	 	var responseText =  eval("("+option.response.responseText+")");        		        
	             	var g_distinctCount = "";
             	g_distinctCount = responseText.distinctCount;

        			var str = 'ȥ�غ�ɼ���mac���� <span style="color:red;font-size:1.5em">' + g_distinctCount + '</span>';	 							 						
    					Ext.getCmp("id_click_leftplace").setText(str);      
              //alert("��ѯ�е����ص� " + g_distinctCount);  
              
              //����־�����ָ�Ĭ��ֵ              
							g_typename = "";  
			        g_Groupid  = "";
							g_Username = "";  
							          				
	 					}});
          }
               
       	},
       	{
       		xtype: 'container',
          columnWidth: .10
       	}]
	   
      }]
         
    });    
  
    var win3 = Ext.widget('window', {
    	title: '�߼���ѯ',
			//closeAction: 'hide',
      x:200,
      y:32,
      width: 580,
      resizable: false,
      draggable:true,
      modal:false,
      items: formquery
    });
     
    win3.show();
  },
	
	
	//��������
	featureAnalysis: function(thisBtn){	
			
		funFeatureAnalysis("0");						
	},
	
	
	/* ���Ӱ�ť��Ǯ����2015/7/20/15:00 */
	//��Ա�켣
	infoquerymap: function(thisBtn){
		var macValue = Ext.getCmp('keyword_mobileaccount').value;	
		if(macValue == ''){
			alert('��������MAC��Ϣ');
			return ;
		} 
		
		var time_flag = getTimeFlag(); 
		
		//parent.macGlobalCtx.setGlobalInfoTime(Ext.getCmp('time_flag').value);
		
		parent.macGlobalCtx.setGlobalInfoTime(time_flag);
		parent.macGlobalCtx.setGlobalInfoMac(Ext.getCmp('keyword_mobileaccount').value);
		
		var tabPanelmap = new Ext.Panel({            
			frame: true,
      layout: 'form',
      activeTab: 0,
      items: [{
        //title: '��Ա�켣',
        //html: '<iframe src="/mac/infoquery/macterm/peopletrack/peopletrack.htm" frameborder="no" style="width:100%;height:500px;"></iframe>'
        html: '<iframe src="/mac/datamining/track/track1.htm" frameborder="no" style="width:100%;height:500px;"></iframe>'
        
      }]
 		});
		
		var win5 = Ext.widget('window', {
	    title: '��Ա�켣',			
	    x:50,
	    y:80,
	    width: 700,
			height: 480,
	    resizable: false,
	    draggable:true,
	    modal:true,
	    items: tabPanelmap
		});
	
		win5.show();
		
	},
		
		
	//���벼��
	joinGroupControl: function(thisBtn){
		
		funJoinGroupControl("0");
		
	},	
				
	
	/* ���Ӱ�ť: Ǯ���� 2015/7/22/17:00 */
	//�����Ϣ
	infoCheck: function(thisBtn){
		
		funInfoCheck("0");
	},
	
	
	/* (δʹ�ã�����������ֱ�Ӵ���������)����ѡ��Ǯ���� 2015/9/15 */
	infoquerychoseplace: function(thisBtn){
		/*var btnchoseplace = new Ext.Panel({
			frame: true,
	    layout: 'form',
	    activeTab: 0,
			items:[{		
				//html: '<iframe src="/pronline/Msg?FunName@ncsMacLog_ChosenMac_ChoseQueryPlace" frameborder="no" style="width:100%;height:1000px;"></iframe>'
				
				//�ɴ�����壺�������� '����'
				//html: '<iframe src="/pronline/Msg?FunName@ncsWebDispClientAddForm_wif" scrolling="no" name="moduleIframe" frameborder="no" style="width:100%;height:640px"></iframe>'										
				
				//ͬ���ɴ�����壺��̨�����У�����json�ļ���Ϊ nc_form_clientedit.htm			
				html: '<iframe src="/pronline/Msg?FunName@ncsMacLog_ChosenMac_ChoseQueryPlace" scrolling="no" name="moduleIframe" frameborder="no" style="width:100%;height:640px"></iframe>'
				
			}]			
		});
		
		var win8 = Ext.widget('window', {
			title: '��ѡ����Ҫ��ѯ�������������',    
	  	x:20,
	  	y:80,
	  	width: 800,
			height: 500,
			id: 'id_vname',
	  	resizable: false,
	  	draggable:true,
	  	modal:true,
	  
	  	items: btnchoseplace
		});
	     
		win8.show(); */
},
	
	
	/* �������� */
	infoexport: function(thisBtn){
		
		var time_flag = getTimeFlag(); 
		
		var form1 = document.getElementById('form1');	
		form1.macLogExport.value = 'macexport';
		form1.time_flag.value =  timeFlag;	
		form1.submit();
		
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
	    var store = Ext.ComponentQuery.query('authloglist')[0].getStore();          
	 
	 	  /* ��� callback ��ȡjson��ȥ������ distinctCount */
	    store.load({callback : function(r, option, success) { 
	    	  
	  	 	var responseText =  eval("("+option.response.responseText+")");        		             
	     	var g_distinctCount = "";
	     	g_distinctCount = responseText.distinctCount;
	
				var str = 'ȥ�غ�ɼ���mac���� <span style="color:red;font-size:1.5em">' + g_distinctCount+ '</span>';	 							 						
				Ext.getCmp("id_click_leftplace").setText(str);      
	      //alert("��ѯ�е����ص� " + g_distinctCount);  
	      
	      //����־�����ָ�Ĭ��ֵ              
				g_typename = "";  
	      g_Groupid  = "";
				g_Username = "";  
				          				
	    }}); 
	      
	  },
	  SetPage:function(curpage){
	    var store = Ext.ComponentQuery.query('authloglist')[0].getStore();
	    store.currentPage = curpage;
	  },
	  setTitle: function(title){
	    document.getElementById("titledx").innerHTML = 
	         '&nbsp'+ title +'&nbsp;&nbsp;';   
	  }
  }
    
    
    
});
