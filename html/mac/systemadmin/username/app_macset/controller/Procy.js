

Ext.define('proauthApMacset.controller.Procy', {
  extend: 'Ext.app.Controller',  
  views: ['list.List'],
  init: function() {

		this.control({
		
		  'apmacsetlist':{
		    render: this.showRender
		  },
			//����
		  'apmacsetlist button[action=addsave]':{
				click: this.addsave
			}
	
			
		});
  },
  
  showRender: function(){


 //   proauthApMacset.controller.Procy.setTitle(parent.dxtitle);
  },
  addsave:function(thisBtn){

   	var tform=thisBtn.up('form');   	


    tform.getForm().doAction('submit',{
                url:'/pronline/Msg',
                 method:'post',
 //                waitMsg: '���ڱ���...',
                  params:{FunName:'ncsChangePass'},
                  success:function(form,action){
      Ext.Msg.alert("��ʾ",action.result.msg);
    //      tform.getForm().findField('sid').setValue(action.result.sid);  
    //      var store = Ext.ComponentQuery.query('resourcelist')[0].getStore();
        //       	Ext.Msg.alert(action.result.msg);
                 store_macparset.load();
         
                  }
                  ,
                 failure:function(form,action){
                 	Ext.Msg.alert("��ʾ",action.result.msg);

                   }
                     
                 })
    	
  },
  
  /**************************************
  * ȫ�ֺ��� 
  ***************************************/
  inheritableStatics:{
    loadProcyListStore:function(){    
    },
    SetPage:function(curpage){  
    },
    setTitle: function(title){
       document.getElementById("titledx").innerHTML='&nbsp'+title+'&nbsp;&nbsp;';   

    }
  }
});
