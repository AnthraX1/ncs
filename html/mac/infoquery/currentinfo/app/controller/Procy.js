
function currentRead(){
	var store = Ext.ComponentQuery.query('authloglist')[0].getStore();  
	
	var groupid="";
  var username="";
	var bRet = false;	
	
	//���� g_dispname �Ƿ�Ϊ�����жϣ��û��Ƿ�����ೡ����		
	if(g_dispname != null){
		
		//groupid��username��Ϊ��ʱ��Ĭ�ϲ�ѯ���г���
		try{			
			groupid = parent.getGlobalGroupId();	
			if(groupid != '')
				bRet = true;
			//alert(g_groupidquery);		
		}
		catch(e){
			alert(e.message);
		}
				
		try{						
			username = parent.getGlobalUserName();
			if(username != '')
				bRet = true;			
		}
		catch(e){
			alert(e.message);
		}
		
		if(bRet == false){
			groupid = "all";
		}	
	}
	/* �����ؼ��� */	
	var keyword = Ext.getCmp('keyword_mobileaccount').value;
					 	
  store.load({params:{keyword:keyword, groupid:groupid, username:username}});
}

Ext.define('proauthRzAuthlog.controller.Procy', {
    extend: 'Ext.app.Controller',  
    stores: ['List'],
    models: ['List'],  
    views: ['list.List'],
    servicecode:'',
    servicename:'',
    mac:'',
    apname:'',
    apmac:'',
    ssid:'',
    sdate:'',
    stime:'',
    edate:'',
    etime:'',
    searchtype:'',
  
    init: function() {
        this.control({
          'authloglist':{
 				 	//select: this.showTab,
            render: this.showRender
          },
          //�ؼ��ֲ�ѯ
          'myselfPanel button[action=keycx]':{
                click: this.dwglkeycx
          },
		  
		  		/* ���Ӱ�ť��2015/7/26 10:29  Ǯ���� */
		  		//��������
		  		'authloglist button[action=electricmap]':{
                click: this.placeelectricmap
          },
		  
		  		//�鿴ͼ��
		  		'authloglist button[action=checkgraph]':{
                click: this.placecheckgraph
          },
          
          //����
		  		'authloglist button[action=export]':{
        				click: this.infoexport
        	}
		  
        });
    },
    
    showRender: function(){
    	
    	var store = Ext.ComponentQuery.query('authloglist')[0].getStore();
    	 
    	/* �����ؼ��� */	
			//var keyword = Ext.getCmp('keyword_mobileaccount').value;
					 	
  		//store.load({params:{keyword:keyword}});
  		currentRead();
   	    	    	   	    	
			setInterval("currentRead();", 10000);
			     
    },

    //�ؼ��ֲ�ѯ
    dwglkeycx: function(thisBtn){
    	   			
			/* ͨ������ @ �����ж�������������ͣ�����ؼ��� ������ೡ���˵�ѡ�� */		
			/*var tempvalue = Ext.getCmp("keyword_mobileaccount").value;	
			var tempvalue2 = tempvalue.substr(0, 1);
			var tempvalue3 = tempvalue.substr(tempvalue.length - 1, 1);
				
			if(tempvalue2 == '@' && tempvalue3 != '@'){
				Ext.getCmp("keyword_mobileaccount").setValue(tempvalue);	
				alert(Ext.getCmp("keyword_mobileaccount").value);		
			}	*/
						
        proauthRzAuthlog.controller.Procy.searchtype = ""; 
        proauthRzAuthlog.controller.Procy.SetPage(1);  
        currentRead();
    },
  		
	//��������
	placeelectricmap: function(thisBtn){
		var tabPanelelectricmap = new Ext.Panel({    
			frame: true,
    	layout: 'form',
    	activeTab: 0,
      items: [{
      	//title: '���ӵ�ͼ',
      	//html: '<iframe src="/mac/datamining/track/track.htm" frameborder="no" style="width:100%;height:1000px;"></iframe>'
      	html: '<iframe src="/mac/infoquery/currentinfo/crowd/crowd.htm" frameborder="no" style="width:100%;height:640px;"></iframe>'
      }]
    });
		
		var win4 = Ext.widget('window', {
    	title: '��������',
				//closeAction: 'hide',
      	x:50,
      	y:80,
      	width: 750,
				height: 550,
      	resizable: true,
      	draggable:true,
        modal:true,
        items: tabPanelelectricmap
    });
       
    win4.show();		
	},
	
	//�鿴ͼ��
	placecheckgraph: function(thisBtn){
		var tabPanelchecktable = new Ext.Panel({    
			frame: true,
    	layout: 'form',
    	activeTab: 0,
    	items: [{             
    		html: '<iframe src="/mac/infoquery/currentinfo/checkgraph/allplacecollect.html" frameborder="no" style="width:100%;height:1000px;"></iframe>'
    	}]
  	});		
		var win5 = Ext.widget('window', {
  		title: '�鿴ͼ��',
			//closeAction: 'hide',
    	x:50,
    	y:80,
    	width: 850,
			height: 500,
    	resizable: true,
    	draggable:true,
    	modal:true,
    	items: tabPanelchecktable
  	});       
  	
  	win5.show();		
	},
	
	infoexport: function(thisBtn){
		
		var form1 = document.getElementById('form1');	
		form1.currentexport.value = 'export';		
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
         
         		
            store.load();
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

