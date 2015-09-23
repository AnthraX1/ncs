
var g_ssid = [];

var g_security = [];
var g_authflag = [];

var g_mac = []; 

Ext.define('proauthRzAuthlog.controller.Procy', {
  extend: 'Ext.app.Controller',  
  stores: ['List'],
  models: ['List'],  
  views: ['list.List'],                       
  
  searchtype:'',              
  sdate:'',
  stime:'',
  edate:'',
  etime:'',  
	servicecode:'',
	servicename:'',                
	mac:'', 
	apmac:'',
	apname:'',

  init: function() {
    this.control({
    	
    //select: this.showTab,	
    'authloglist':{  			
    	render: this.showRender
    },	
    	
    //�߼���ѯ	
  	'myselfPanel button[action=advancecx]':{
			click:this.highquery  
  	},                
    
    //�ؼ��ֲ�ѯ  
      'myselfPanel button[action=keycx]':{
      	click: this.dwglkeycx
      },
  		  		  
  	//���ӵ�ͼ
  	'authloglist button[action=electricmap]':{
    	click: this.placeelectricmap
    },
  
  	/* ������ť���Ƿ�Ϲ�  Ǯ���� 15:53 */
  	'authloglist button[action=ruleyes]':{
     	click: this.hotmarkruleyes
    },
  
  	'authloglist button[action=ruleno]':{
    	click: this.hotmarkruleno
    },
    
    //����
  	'authloglist button[action=export]':{
    	click: this.infoexport
    }
  
  
    });
  },
    
  showRender: function(){
  	
  	//��һ������ȥ����ʾButton�ؼ�λ��;
  	doOnResize();
  	
    var store = Ext.ComponentQuery.query('authloglist')[0].getStore();    
    store.on('beforeload', function (store, options) {
    	
    	var groupid="";
			var username="";
    	
			//������ͼ�߶�
		  var qgrid = Ext.ComponentQuery.query('authloglist')[0];
		  parent.grid_height = parent.Ext.getCmp('layout_center').getHeight()-56;
		  qgrid.setHeight(parseInt(parent.grid_height)+25);
		  
		  if(g_dispname == "ȫ������"){
				groupid = 'all';
			}
			else{
		  
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
		    	}	
		    	else{
		    		var treeChosen = Ext.getCmp("id_mac_placetree").picker.getSelectionModel();
			    	var bChosenType = treeChosen.selected.items[0].raw.cls;
			    	
			    	if(bChosenType == "folder"){    		
			    		
			    		g_Groupid = treeChosen.selected.items[0].raw.id;		    				    	  					    		
			    	}	
			  		else{	  			
			  			
			  			g_Username = treeChosen.selected.items[0].raw.code;			  								  			
			  		}	
		    	}
			    	
					groupid		= g_Groupid;
					username	= g_Username; 			    	 	 							 
						
				}
			}	
		  
		  //��ȡ ������ť��ѡ���ʱ��
		  var time_flag = getTimeFlag();
		  
		  //�ؼ��ֲ�ѯ  	
		  var keyword = Ext.getCmp('keyword_mobileaccount').value;		  			             
		
		  //�߼���ѯ�ֶ�   
		  var searchtype = proauthRzAuthlog.controller.Procy.searchtype;  		  		  
		  var sdate = proauthRzAuthlog.controller.Procy.sdate;
		  var stime = proauthRzAuthlog.controller.Procy.stime;
		  var edate = proauthRzAuthlog.controller.Procy.edate;
		  var etime = proauthRzAuthlog.controller.Procy.etime;            
		  var servicecode = proauthRzAuthlog.controller.Procy.servicecode;  		  
		  var servicename = proauthRzAuthlog.controller.Procy.servicename;
		  var ssid = proauthRzAuthlog.controller.Procy.ssid;		  		  		  
		  var apname = proauthRzAuthlog.controller.Procy.apname;
		  var mac = proauthRzAuthlog.controller.Procy.mac;
		  var apmac = proauthRzAuthlog.controller.Procy.apmac;
							       
		  var new_params={groupid:groupid, keyword:keyword, username:username, time_flag:time_flag,ssid:ssid, sdate:sdate, stime:stime, edate:edate, etime:etime, servicecode:servicecode, servicename:servicename, searchtype:searchtype, apname:apname, mac:mac, apmac:apmac};
		
		   Ext.apply(store.proxy.extraParams,new_params);

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
     
    var formPanelQuery = new Ext.FormPanel({         
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
            }
        ]					
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
            }
        ]					
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
            }
        ]					
      },
      {
      	layout: 'hbox',
        xtype: 'container',
        items:[
        		{
							fieldLabel:'�ȵ�MAC',
              xtype: 'textfield',
              name:'apmac'
            },
            {                        
            	fieldLabel:'&nbsp;&nbsp;�ɼ��豸���',
              xtype: 'textfield',
              name:'apname'
            }
        ]					
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
          //style : 'margin-left:80px',
          text:'&nbsp;&nbsp;��&nbsp;&nbsp;ѯ &nbsp;&nbsp;',
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
						
						
						proauthRzAuthlog.controller.Procy.apmac = 
						formquery.getForm().getValues().apmac;
				
						proauthRzAuthlog.controller.Procy.apname = 
						formquery.getForm().getValues().apname; 
																			
						store.load({callback : function(r, option, success) { 

          	 	var responseText =  eval("("+option.response.responseText+")");        		        
	             	var g_distinctCount = "";
             	g_distinctCount = responseText.distinctCount;

        			var str = 'ȥ�غ�ɼ���mac���� <span style="color:red;font-size:1.5em">' + g_distinctCount + '</span>';	 							 						
    					Ext.getCmp("id_distinctmac").setText(str);      
              //alert("�߼���ѯ�е����ص� " + g_distinctCount);  
              
              //����־�����ָ�Ĭ��ֵ              
							g_typename = "";  
			        g_Groupid  = "";
							g_Username = "";  
							          				
	 					}});
          }
               
       	}]
   
      }]
    });    
  
      var winHighQuery = Ext.widget('window', {
          title: '�߼���ѯ',
          x:200,
          y:32,
          width: 580,
          resizable: true,
          draggable:true,
          modal:false,
          items: formPanelQuery
      });
     
      winHighQuery.show();
  },
	
	/* ������ť���Ƿ�Ϲ�  Ǯ���� 16:03 */
	hotmarkruleyes:function(thisBtn){		
		  	
		g_authflag = ["1"];		  				
		g_ssid = [];		
		g_mac = [];	
		
		/* ��ȡ�û����ȵ���Ϣ��ѯѡ������� */	
		//��ȡ����ѡ����
		var rows = Ext.getCmp('id_hotspottable').getSelectionModel(); 
	
		for(var i = 0; i <rows.selected.items.length;i++){					
			g_ssid.push([rows.selected.items[i].data.ssid]);			
			g_mac.push([rows.selected.items[i].data.mac]);			
		}
		
		alert(g_authflag);		
		alert(g_ssid);
		alert(g_mac);		
				
		Ext.Ajax.request({			
		url: '/pronline/Msg?FunName@ncsHotSpot_MarkRuleorNot&authflag@' 
					+ g_authflag + '&ssid@' + g_ssid + '&mac@' + g_mac , 
		
		method: 'GET',		
		success: function(resp, opts){			
			var respText = resp.responseText; 			//��ȡ���� JSON ���ݵ��ַ���
			try{
				var respRecord = eval("("+respText+")");	//�ַ���ת�ɽṹ��
				
				var result = respRecord.result;
				var message = respRecord.data[0].message;
				
				if(result)
				{									
					alert(message);				
					var store = Ext.ComponentQuery.query('authloglist')[0].getStore();
					store.load();																	
				}
				else
				{
					alert("���ʧ��");					
				}
				
			}
			catch(e){
				alert(e.message);
			}
							
		},
		failure: function(resp, opts){
			var resqText = eval("(" + resqText + ")");
			alert('����', resqText.error);
		} 
		
	});
		
  },
	   
  hotmarkruleno:function(thisBtn){
		
  	g_authflag = ["0"];
		g_ssid = [];  	
		
		/* ��ȡ�û����ȵ���Ϣ��ѯѡ������� */	
		//��ȡ����ѡ����
		var rows = Ext.getCmp('id_hotspottable').getSelectionModel(); 
	
		for(var i = 0; i <rows.selected.items.length;i++){					
			g_ssid.push([rows.selected.items[i].data.ssid]);
		}
		
		//alert(g_authflag);
		//alert(g_ssid);
		
		
		Ext.Ajax.request({			
		url: '/pronline/Msg?FunName@ncsHotSpot_MarkRuleorNot&authflag@' 
					+ g_authflag + '&ssid@' + g_ssid, 
		
		method: 'GET',		
		success: function(resp, opts){			
			var respText = resp.responseText; 			//��ȡ���� JSON ���ݵ��ַ���
			try{
				var respRecord = eval("("+respText+")");	//�ַ���ת�ɽṹ��
				
				var result = respRecord.result;
				var message = respRecord.data[0].message;
				
				if(result)
				{									
					alert(message);
					var store = Ext.ComponentQuery.query('authloglist')[0].getStore();
					store.load();																						
				}
				else
				{					
					alert("���ʧ��");
				}
				
			}
			catch(e){
				alert(e.message);
			}
							
		},
		failure: function(resp, opts){
			var resqText = eval("(" + resqText + ")");
			alert('����', resqText.error);
		} 
		
	});
		
         
  },
	   
		
	//���ӵ�ͼ
	placeelectricmap: function(thisBtn){
		var tabPanelchecktable = new Ext.Panel({
            //renderTo: "grid",
			frame: true,
            layout: 'form',
            activeTab: 0,
            items: [{             
              //html: '<iframe src="/mac/infoquery/hotinfo/peoplecrew/crowd/crowd.htm" frameborder="no" style="width:100%;height:1000px;"></iframe>'
              html: '<iframe src="/mac/datamining/track/hotspot.htm" frameborder="no" style="width:100%;height:540px;"></iframe>'
            }]
        });
		
		var win5 = Ext.widget('window', {
            title: '���ӵ�ͼ',
//            closeAction: 'hide',
            x:150,
            y:60,
            width: 800,
			height: 550,
//            height: 330,
            //minHeight: 330,
//            layout: 'fit',
            resizable: true,
            draggable:true,
            modal:false,
            items: tabPanelchecktable
        });
       
        win5.show();
		
	},
	
	infoexport: function(thisBtn){
		
		var time_flag = getTimeFlag(); 
		var form1 = document.getElementById('form1');	
		form1.hotinfoexport.value = 'export';
		form1.time_flag.value =  time_flag;	
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
      var keyword = Ext.getCmp('keyword_mobileaccount').value;
   
      /* ��� callback ��ȡjson��ȥ������ distinctCount */
	    store.load({callback : function(r, option, success) { 
	    	  
	  	 	var responseText =  eval("("+option.response.responseText+")");        		             
	     	var g_distinctCount = "";
	     	g_distinctCount = responseText.distinctCount;
	
				var str = 'ȥ�غ�ɼ���mac���� <span style="color:red;font-size:1.5em">' + g_distinctCount+ '</span>';	 							 						
				Ext.getCmp("id_distinctmac").setText(str);      
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

