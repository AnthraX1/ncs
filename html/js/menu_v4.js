
 //�������й���˵�
   var menu_mggz = Ext.create('Ext.menu.Menu', {
        id: 'mggzMenu',
        style: {
            overflow: 'visible'     
        }
        ,
        items: [
          {
                text: '�ؼ��ֿ�ά��',
                iconCls: 'iadd',
                itemid:'keywordmenu', 
                tname:'keywordmenu', 
                srcurl:'/v4/case/ncs_case_keyword.htm',  
                handler:onItemClick    
       
           },
           {
           	    text: '�ص��ע�û���',
           	    iconCls: 'iadd',
                itemid:'zdyhmenu',
                tname:'zdyhmenu',
                srcurl:'/v4/sentive/ncs_sentive_user_list.htm',
                handler:onItemClick    
           },
           {
           	    text: '������ַ��ά��',
           	    iconCls: 'iadd',
                itemid:'mgurlmenu',
                tname:'mgurlmenu',
                srcurl:'/v4/sentive/ncs_sentive_url.htm',
                handler:onItemClick    
           },
           {
           	    text: '�ص�������ݿ�',
           	    iconCls: 'iadd',
                itemid:'zdvidmenu',
                tname:'zdvidmenu',
                srcurl:'/v4/sentive/ncs_sentive_netid.htm',
                handler:onItemClick    
           },
           {
           	    text: 'CCIC��ά��',
           	    iconCls: 'iadd',
                itemid:'ccicmenu',
                tname:'ccicmenu',
                srcurl:'/v4/sentive/ncs_sentive_ccic.htm',
                handler:onItemClick    
           },'-',
              {
           	    text: '�ؼ�����־�鵵',
           	    iconCls: 'viewlist',
                itemid:'keywordgdmenu',
                tname:'keywordgdmenu',
                srcurl:'/v4/sentive/ncs_keywordlog_list.htm',
                handler:onItemClick    
           },
            {
           	    text: '������ַ�鵵',
           	    iconCls: 'viewlist',
                itemid:'senwebgdmenu',
                tname:'senwebgdmenu',
                srcurl:'/v4/sentive/ncs_senurllog_list.htm',
                handler:onItemClick    
           },
            {
           	    text: '�ص�������ݹ鵵',
           	    iconCls: 'viewlist',
                itemid:'sennetidgdmenu',
                tname:'sennetidgdmenu',
                srcurl:'/v4/sentive/ncs_sennetidlog_list.htm',
                handler:onItemClick    
           },
            {
           	    text: '�ص��ע�û���־',
           	    iconCls: 'viewlist',
                itemid:'senuserlogmenu',
                tname:'senuserlogmenu',
                srcurl:'/v4/sentive/ncs_senuserlog_list.htm',
                handler:onItemClick    
           }
        ]

                
        
    });



 //����ϵͳ�˵�
   var menu_xtgl = Ext.create('Ext.menu.Menu', {
        id: 'xtglMenu',
        style: {
            overflow: 'visible'     
        }
        ,
        items: [
          {
                text: 'Ȩ�޽�ɫ',
                itemid:'rolemenu', 
                tname:'rolemenu', 
                srcurl:'/v4/ncs_role_list.htm',  
                handler:onItemClick    
       
           },
           {
           	    text: 'ϵͳ�û�',
                itemid:'xtyhmenu',
                tname:'xtyhmenu',
                srcurl:'/v4/ncs_adminuser_list.htm',
                handler:onItemClick    
           },
           {
           	    text: '�ƶ��ܱ�����',
                itemid:'ydmbmenu',
                tname:'ydmbmenu',
                srcurl:'/pronline/Msg?FunName@ncsWebReplace&plate@ds/ds_mbauth.htm&fname@ncWebDisplayMbManager',
                handler:onItemClick    
           },
           {
           	    text: 'ϵͳ������־',
                itemid:'czrimenu',
                tname:'czrimenu',
                srcurl:'/v4/ncs_syslog_list.htm',
                handler:onItemClick    
           }
        ]

        
        
        
    });


 //������ݿ�˵�
   var menu_sfkgl = Ext.create('Ext.menu.Menu', {
        id: 'sfkglMenu',
        style: {
            overflow: 'visible'     
        }
        ,
        items: [
          {
                text: '�����û���',
                itemid:'swyhkmenu', 
                tname:'swyhkmenu', 
                srcurl:'/v4/ncs_enduser_list.htm',  
                handler:onItemClick    
       
           },
           {
           	    text: '������ݿ�',
                itemid:'xnsfkmenu',
                tname:'xnsfkmenu',
                srcurl:'/v4/vid/ncs_vid_lab.htm',
                handler:onItemClick    
           }
        ]

        
        
        
    });





 //���������˵�
   var menu_dhtree = Ext.create('Ext.menu.Menu', {
        id: 'dhMenu_tree',
        style: {
            overflow: 'visible'     
        }
        ,
        items: [
          {
                text: '�˵���',
                id:'dhmenu', 
                tname:'dhtree', 
                srcurl:'/v4/main_dhleft.htm',
                checked:false,      
                checkHandler:onCheckItem    
       
           },
           {
           	    text: '��λ����',
                id:'dwzmenu',
                tname:'dwztree',
                srcurl:'/v4/ncs_tree_group.htm',
                checked:false, 
                checkHandler:onCheckItem    
           },
           {
           	    text: '��λ��',
           	    checked:false,
           	    srcurl:'/v4/ncs_tree_user.htm',
                id:'dwmenu',
                tname:'dwtree',
                checkHandler:onCheckItem
           }
        ]

        
        
        
    });