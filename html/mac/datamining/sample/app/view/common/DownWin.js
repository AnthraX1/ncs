Ext.define('proauthRzAuthlog.view.common.DownWin' ,{
  extend: 'Ext.window.Window',
  alias : 'widget.downwin',

	title: null,
	modal: true,
	field1: null,
	field2: null,
	value1:null,

  initComponent: function() {
  
var grid = new Ext.grid.GridPanel({
      
       height:500,
      columns: [
        { text: '��������', dataIndex: 'cid' },
        {
            text: '����ʱ��', dataIndex: 'cid',width:150
          
        },
         {
             header: '����',
            xtype: 'actioncolumn',
            dataIndex: 'cid',
             icon: '/newver/resources/themes/images/share/xiazai.png',
            tooltip: '����������±���',
            width: 100,
            align: 'center',
            sortable: false,
           handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                
                
               
            }
        }
    ]
   
    
});
  	 this.items = [grid];
    
    this.callParent(arguments);
    
  }
});

