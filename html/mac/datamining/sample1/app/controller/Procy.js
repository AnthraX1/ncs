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
                click: this.add
          },
          'authloglist button[action=edit]':{
            click: this.edit
          },
          'authloglist button[action=del]':{
            click: this.cxyhdel
          },
          'authloglist button[action=hidShw]':{
            click: this.cxyhhidshw
          }
        });
    },
    
    showRender: function(){
        var store = Ext.ComponentQuery.query('authloglist')[0].getStore();
        store.on('beforeload', function (store, options) {
//������ͼ�߶�
        var qgrid=Ext.ComponentQuery.query('authloglist')[0];
    	  parent.grid_height=parent.Ext.getCmp('layout_center').getHeight()-56;
        qgrid.setHeight(parseInt(parent.grid_height));
        	
            var keyword = Ext.getCmp('keyword_mobileaccount').value;
           
           
         
       
            var new_params={keyword:keyword};
        
             Ext.apply(store.proxy.extraParams,new_params);

        });//store.on('beforeload', function (store, options) {

        proauthRzAuthlog.controller.Procy.loadProcyListStore();
    },// showRender: function(){
   showupload: function(thisBtn){
   var sid=thisBtn.up('form').getForm().findField('sid').getValue();
  
   if(sid==''){
		alert("���ȱ����¼,���ϴ�");
		return 0;	
		}
  
	   	var win = Ext.create('proauthRzAuthlog.view.common.UploadWin',{
	     title: "�ϴ�ͼƬ",
	    field1: sid,
	    field2:''
	    });
	    win.showAt(340,100); 
  
  },
    //�ؼ��ֲ�ѯ
    dwglkeycx: function(thisBtn){
    	 
        proauthRzAuthlog.controller.Procy.searchtype = ""; 
        proauthRzAuthlog.controller.Procy.SetPage(1);  
        proauthRzAuthlog.controller.Procy.loadProcyListStore();
    },
  
   edit:function(thisBtn){
         var win = Ext.create('proauthRzAuthlog.view.common.AddWin',{
        title: "�½�",
        field1: ""

      });
      win.showAt(300,20);      
      },
  add:function(thisBtn){
         var win = Ext.create('proauthRzAuthlog.view.common.AddWin',{
        title: "�½�",
        field1: ""

      });
      win.showAt(300,20);      
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

