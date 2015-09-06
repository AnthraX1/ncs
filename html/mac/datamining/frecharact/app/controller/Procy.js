Ext.define('proauthRzAuthlog.controller.Procy', {
    extend: 'Ext.app.Controller',  
    stores: ['List'],
    models: ['List'],  
    views: ['list.List'],

  
    init: function() {
        this.control({
          'authloglist':{
  //         select: this.showTab,
            render: this.showRender
          },
          //�ؼ��ֲ�ѯ
          'authloglist button[action=keycx]':{
                click: this.dwglkeycx
          },
          //���
          'authloglist button[action=advancecx]':{
                click: this.cxyhadd
          },
          			//��ʾ�ϴ�ͼƬ����
		     'addwin button[action=upfile]':{
				  click: this.showupload
			    },
			              //��ӱ���
          'authloglist button[action=add]':{
                click: this.cxyhadd
          },
          'authloglist button[action=exp]':{
            click: this.exp
          },
          'authloglist button[action=hidShw]':{
            click: this.cxyhhidshw
          },
          'authloglist button[action=help]':{
                click: this.help
          }
        });
    },
    
    showRender: function(){
      
       // proauthRzAuthlog.controller.Procy.loadProcyListStore();
    },
   showupload: function(thisBtn){
  
  },
    //�ؼ��ֲ�ѯ
    dwglkeycx: function(thisBtn){
    	 
        proauthRzAuthlog.controller.Procy.searchtype = ""; 
        proauthRzAuthlog.controller.Procy.SetPage(1);  
        proauthRzAuthlog.controller.Procy.loadProcyListStore();
    },
    cxyhadd: function(thisBtn){
    	  var keyword=Ext.getCmp('keyword_mobileaccount').value;
    },
     help:function  (thisBtn) {
    	Ext.Msg.alert("��ʾ","��ָ�������������볡���ؼ��ʣ���ָ���նˣ��������ն�MAC����ʽXX-XX.");
    },
    cxyhaddsave:function(thisBtn){


  	var tstore=Ext.ComponentQuery.query('authloglist')[0].getStore();
  	
   	var tform=thisBtn.up('window').query('form')[0];   	
   
    var aname=tform.getForm().findField('name').value;
    if(aname==''){
    	alert('��������Ʒ����');
    	return;
    }
    var acid=tform.getForm().findField('cid').value;
    if(acid==''){
    	alert('�������̳�����');
    	return;
    }
 
    tform.getForm().doAction('submit',{
                url:'/pronline/Msg',
                 method:'post',
                 waitMsg: '���ڱ���...',
                  params:{FunName:'ncmCxyh_Save'},
                  success:function(form,action){

         tform.getForm().findField('sid').setValue(action.result.sid);  
    //      var store = Ext.ComponentQuery.query('resourcelist')[0].getStore();
          Ext.Msg.alert('����',"����ɹ�");  
          tstore.load();         
                  }
                  ,
                 failure:function(form,action){
                 	Ext.Msg.alert(action.result.msg);

                   }         
                 })  	
   },
    exp:function(thisBtn){
        var form1 = document.getElementById('form1');
        
         //form1.keyword.value =  Ext.getCmp('keyword').value;
         //form1.statway.value = Ext.getCmp('statway').value;

        form1.exp.value='exp';
        form1.submit();
        form1.exp.value=""; 
      },
     cxyhdel:function(thisBtn){
     
         },
    cxyhhidshw:function(thisBtn){
      var grid=Ext.ComponentQuery.query('authloglist')[0];
       var tstore=grid.getStore();
       var rows = grid.getSelectionModel().getSelection(); 
       selsid='';
         for(var i=0;i<rows.length;i++){
          if(i==0){
           selsid="'" + rows[i].get('sid') + "'";
           }
           else{
            selsid=selsid + "," + "'" + rows[i].get('sid') + "'";
             }
           }
          tstore.load({params:{hidshw:"hidShw",selsid:selsid}});
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
            var reg_name=/[A-F\d]{2}-[A-F\d]{2}-[A-F\d]{2}-[A-F\d]{2}-[A-F\d]{2}-[A-F\d]{2}/; 
            var reg_name1=/[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}/; 
             /*if(!reg_name.test(keyword)&&!reg_name1.test(keyword))
    	  	{
    	  		 Ext.Msg.alert("����","��������ȷ��MAC��ַ");
    	  		}
    	  	else*/
            var keyword = Ext.getCmp('keyword_mobileaccount').value;
              if(typeof(keyword)=='undefined'||keyword=='')
    	  Ext.Msg.alert("��ʾ","�������ѯ�����ؼ���");
              else {
                  parent.doSearchByKeyword_freCharact(keyword);
    	  }
         // tstore.load();
        
          
        },
        SetPage:function(curpage){
          
        },
        setTitle: function(title){
             document.getElementById("titledx").innerHTML = 
                 '&nbsp'+ title +'&nbsp;&nbsp;';   
        }
    }
   
});

