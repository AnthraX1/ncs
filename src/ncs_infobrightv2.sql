-- 2013/09/18  �������ű�  
-- 2013/05/02  �޸�
-- Copy From ncs_infobright.sql  2014/04/22
-- ʹ��Inforbright ���ݿ�������ĵ����ݽṹ
-- iplog    IP���ʼ�¼

drop table if exists ncsiplog;
create table ncsiplog (
    servicecode  	char(14)  ,                         -- �����˱���
    username 		char(32),                           -- �û���¼��
    dispname   		char(32),                           -- ����
    mac     		char(18),                           -- mac��ַ
    position 		char(32)  default ' ' ,             -- λ�� �����Ƿ���ţ�IP��ַ��MAC��ַ��
    idno    		char(18)  default ' ',              -- ֤����
    idtype  		char(3)   default ' ',              -- ֤������
    did			    int,                                -- ����ID
    tid             int,                                -- �������ĵ���ID
    uid             int,                                -- �û�ID
    stime       	int ,                     	        -- ��ʼʱ��
    sip         	char(15),    		                -- ԴIP  
    dip         	char(15),    		                -- Ŀ��IP��ַ
    dport       	int,                   		        -- Ŀ��˿�
    conntime    	int,                         	    -- ����ʱ��  
    trantype    	smallint,                    	    -- Э�� 6:tcp  17:udp
    service     	smallint,              		        -- �������
    usid            bigint default 0,                   -- ��¼Sid
    ubytes      	int,                      	        -- �����ֽ��� 
    dbytes      	int,                      	        -- �����ֽ��� 
    sid             bigint default 0,                   -- ��¼���
    gid             int  default   0                     -- ����id
)  ;


-- httplog  Web���ʼ�¼
drop table if exists ncshttplog;
create table ncshttplog (
    servicecode  	char(14)  ,                     -- �����˱���
    username 		char(32)  ,                     -- �û���¼��
    dispname   		char(32)  ,                     -- ����
    mac     		char(18)  ,                     -- mac��ַ
    position 		char(32)  ,                     -- λ�� �����Ƿ���ţ�IP��ַ��MAC��ַ��
    idno    		char(18)  ,                     -- ֤����
    idtype  		char(3),                        -- ֤������
    did			    int,                            -- ����ID
    tid             int,                            -- �������ĵ���ID
    uid             int,                            -- �û�ID
    stime       	int,                        	-- ��ʼʱ��
    sip         	char(15)  ,                		-- ԴIP  
    dip         	char(15)  ,                		-- Ŀ��IP��ַ
    dport       	int,                   		    -- Ŀ��˿�
    conntime    	int,				            -- ����ʱ��
    host        	char(64)  ,                     -- �������� 
    uri         	char(128) ,                     -- Uri    
    title       	char(128) ,                     -- ����
    termtype        char(32)  ,                     -- �ն����   (����)
    os              char(32)  ,                     -- ����ϵͳ   (����)
    brower          char(32)  ,                     -- ������汾 (����)
    urlid       	int default 0,                  -- ��ַ����� 2005/01/11 ����
    webid           int default 0,                  -- ��Ӧ��ַID,���ô˹ؼ��ֲ鿴Url���ж�Ӧ��˵��
    usid            bigint default 0,               -- ��¼Sid
    sid             bigint default 0,               -- ��¼���
    gid             int  default   0,               -- ����id
    bytes       	int                          	-- �ֽ��� 
)  max_rows=20000000000 avg_row_length= 200;


-- ��
drop table if exists ncsformmon;
create table ncsformmon (
    servicecode  	    char(14)  ,     -- �����˱���
    username 		    char(32)  ,     -- �û���¼��
    dispname   		    char(32)  ,     -- ����
    mac     		    char(18)  ,     -- mac��ַ
    position 		    char(32)  ,     -- λ�� �����Ƿ���ţ�IP��ַ��MAC��ַ��
    idno    		    char(18)  ,     -- ֤����
    idtype              char(3),        -- ֤������
    did                 int,            --
    tid             	int,            -- �������ĵ���ID
    uid             	int,            -- �û�ID
    stime               int,           	-- ��ʼʱ��
    sip         	    char(15)  , 	-- ԴIP  
    dip         	    char(15)  , 	-- Ŀ��IP��ַ
    host 		        char(64) ,      -- ����
    url 		        char(64) ,      -- ����URL
    fileid              bigint default 0,  -- ��Ӧ���ļ���ŵ�ID
    asize               int,               -- ������С
    msize 		        int,               -- ����С
    usid                bigint default 0,
    sid                 bigint default 0,
    ccode 		        int,               -- ����
    gid                 int  default   0,               -- ����id
    filenum             int                                            -- �ļ���ţ�0001��0002��0003
);

-- �ʼ�
drop table if exists ncsmailmon;
create table ncsmailmon (
    servicecode  	char(14)  ,     -- �����˱���
    username 		char(32)  ,     -- �û���¼��
    dispname   		char(32)  ,     -- ����
    mac     		char(18)  ,     -- mac��ַ
    position 		char(32)  ,     -- λ�� �����Ƿ���ţ�IP��ַ��MAC��ַ��
    idno    		char(18)  ,     -- ֤����
    idtype  		char(3),                        -- ֤������
    did			        int,
    tid             	int,                        -- �������ĵ���ID
    uid             	int,                        -- �û�ID
    stime       	int,                        	-- ��ʼʱ��
    sip         	char(15)  ,                		-- ԴIP  
    dip         	char(15)  ,                		-- Ŀ��IP��ַ
    
    mailfrom            char(255) ,   -- ������
    mailto  		char(255) ,       -- �ռ���
    mailsub 		char(255) ,       -- ����
    host 		    char(255) ,       -- ����(WebMail)
    fileid          bigint default,  -- ��Ӧ�ʼ��ļ���ŵ�ID
    mailasize 		int,             -- �ʼ�������С
    mailsize 		int,             -- �ʼ��ļ���С
    flags 		    smallint,        -- �ʼ���� 1--SMTP  2--POP3  3--WebMail
    usid            bigint default 0,
    sid             bigint default 0,
    ccode 		    smallint,
    gid             int  default   0,               -- ����id
    filenum         int                                            -- �ļ����
);

-- ��ʱͨѶ
drop table if exists ncsimlog;
create table ncsimlog (
    servicecode  	char(14)  ,     -- �����˱���
    username 		char(32)  ,     -- �û���¼��
    dispname   		char(32)  ,     -- ����
    mac     		char(18)  ,     -- mac��ַ
    position 		char(32)  ,     -- λ�� �����Ƿ���ţ�IP��ַ��MAC��ַ��
    idno    		char(18)  ,     -- ֤����
    idtype  		char(3),                        -- ֤������
    did             int,
    tid             	int,                            -- �������ĵ���ID
    uid             	int,                            -- �û�ID
    stime       	int,                        	-- ��ʼʱ��
    sip         	char(15)  ,                		-- ԴIP  
    dip         	char(15)  ,                		-- Ŀ��IP��ַ
    service     smallint,                           -- �������
    funcode     smallint,                           -- ����
    num         smallint,                           -- ���
    mfrom               char(48)  ,                 -- ������
    mto                 char(48)  ,                 -- �Է��˺�
    mesg        char(255) ,                         -- ��Ϣ����
    usid        bigint default 0 ,
    gid             int  default   0,               -- ����id
    sid         bigint default 0
);

-- BBS
drop table if exists ncsbbsmon;
create table ncsbbsmon (
    servicecode  	char(14)  ,     -- �����˱���
    username 		char(32)  ,     -- �û���¼��
    dispname   		char(32)  ,     -- ����
    mac     		char(18)  ,     -- mac��ַ
    position 		char(32)  ,     -- λ�� �����Ƿ���ţ�IP��ַ��MAC��ַ��
    idno    		char(18)  ,     -- ֤����
    idtype  		char(3),                        -- ֤������
    did             int,
    tid             	int,                            -- �������ĵ���ID
    uid             	int,                            -- �û�ID
    stime       	int,                        	-- ��ʼʱ��
    sip         	char(15)  ,                		-- ԴIP  
    dip         	char(15)  ,                		-- Ŀ��IP��ַ
    msize           smallint,                       -- BBS��С
    ccode           smallint,
    bbsname         char(48)  ,                     -- BBS����
    url                 char(128)  ,                -- ����URL
    upfile              char(48)  ,                 -- ���ļ�
    attfile             char(48)  ,                 -- �����ļ�
    subject             char(255)  ,                -- ����
    author              char(48)  ,                 -- ����
    content 		text  ,                         -- ����
    usid        bigint default 0,
    gid             int  default   0,               -- ����id
    sid         bigint default 0 
);

-- ��������
drop table if exists ncssearchlog;
create table ncssearchlog (
    servicecode  	char(14)  ,     -- �����˱���
    username 		char(32)  ,     -- �û���¼��
    dispname   		char(32)  ,     -- ����
    mac     		char(18)  ,     -- mac��ַ
    position 		char(32)  ,     -- λ�� �����Ƿ���ţ�IP��ַ��MAC��ַ��
    idno    		char(18)  ,     -- ֤����
    idtype  		char(3),                        -- ֤������
    did	    		int,
    tid             	int,                            -- �������ĵ���ID
    uid         	int,                            -- �û�ID
    stime       	int,                        	-- ��ʼʱ��
    sip         	char(15)  ,                		-- ԴIP  
   
    sname             	char(48)  ,     -- ������������
    svalue              char(255) ,     -- �����ؼ���
    usid        bigint default 0,
    gid             int  default   0,               -- ����id
    sid         bigint default 0
)engine=brighthouse;

-- �������������
drop table if exists ncsnetlog;
create table ncsnetlog (
    servicecode  	char(14)  ,     -- �����˱���
    username 		char(32)  ,     -- �û���¼��
    dispname   		char(32)  ,     -- ����
    mac     		char(18)  ,     -- mac��ַ
    position 		char(32)  ,     -- λ�� �����Ƿ���ţ�IP��ַ��MAC��ַ��
    idno    		char(18)  ,     -- ֤����
    idtype  		char(3),                        -- ֤������
    did			        int,
    tid             	int,                            -- �������ĵ���ID
    uid             	int,                            -- �û�ID
    stime       	int,                        	-- ��ʼʱ��
    sip         	char(15)  ,                		-- ԴIP  
    dip         	char(15)  ,                		-- Ŀ��IP��ַ
    netid		    int,                            -- ����������
    csid		    int,
    descr		 char(64) ,
    ntype             	smallint,     			       -- �����������
    name                char(64) ,     -- �����������(�˺�)
    funcode		    smallint,
    flag		    smallint,
    etime           int,                         	        -- ����ʱ��
    usid            bigint default 0,
    gid             int  default   0,               -- ����id
    sid         bigint default 0
);


-- ����Ự��־
drop table if exists ncsnetseslog;
create table ncsnetseslog (
    servicecode  	char(14)  ,     -- �����˱���
    username 		char(32)  ,     -- �û���¼��
    dispname   		char(32)  ,     -- ����
    mac     		char(18)  ,     -- mac��ַ
    position 		char(32)  ,     -- λ�� �����Ƿ���ţ�IP��ַ��MAC��ַ��
    idno    		char(18)  ,     -- ֤����
    idtype  		char(3),                        -- ֤������
    did			    int,
    tid             	int,                            -- �������ĵ���ID
    uid             	int,                            -- �û�ID
    stime       	int,                        	-- ��ʼʱ��
    sip         	char(15)  ,                		-- ԴIP  
    dip         	char(15)  ,                		-- Ŀ��IP��ַ
    service             smallint,     			--
    funcode		    smallint,
    mesg                char(255) ,     --
    usid              bigint  default 0,
    sid               bigint  default 0,
    gid             int  default   0,               -- ����id
    contid       	int                        	-- 
) ;

-- �û�������
drop table if exists ncsuserlog;
create table ncsuserlog (
    servicecode  	char(14)  ,     -- �����˱���
    username 		char(32)  ,     -- �û���¼��
    dispname   		char(32)  ,     -- ����
    mac     		char(18)  ,     -- mac��ַ
    position 		char(32)  ,     -- λ�� �����Ƿ���ţ�IP��ַ��MAC��ַ��
    idno    		char(18)  ,     -- ֤����
    idtype  		char(3),                        -- ֤������
    did			    int,
    tid             int,                        -- �������ĵ���ID
    uid             int,                        -- �û�ID
    stime       	int,                        	-- ��ʼʱ��
    sip         	char(15),                		-- ԴIP  
    conntime		int,
    etime		    int,                            -- ����ʱ�� 
    sumflow		    bigint,
    flags		    smallint,                       -- ״̬ 1 ����  2 ���߻�ʱ
    usid            bigint default 0,
    sid             bigint default 0,
    gid             int
);

`
-- IPservice

drop table if exists ncsipservice;
create table ncsipservice (
    servicecode  	char(14)  ,     -- �����˱���
    username 		char(32),     -- �û���¼��
    dispname   		char(32),     -- ����
    mac     		char(18),     -- mac��ַ
    did			    int,
    tid             int,                            -- �������ĵ���ID
    uid             int,                            -- �û�ID
    sdate       	char(10),                     	-- ���ڣ���ʽΪ yyy/mm/dd
    conntime    int,                         --  ����ʱ��  
    service     smallint unsigned,           --  ����id   
    worktime    smallint default 1,          --  ʱ�� 1--�ϰ�ʱ��  2--�°�ʱ��
    ubytes      bigint,                      --  �����ֽ��� 
    dbytes      bigint,                      --  �����ֽ��� 
    flags       smallint,                     --  ��¼��־���ڲ�������
    sid         bigint default 0,            -- ��¼���    
    gid         int default 0            -- ��¼���    
} ;


drop table if exists ncshttpclass;
create table ncshttpclass (
    servicecode  	char(14)  ,     -- �����˱���
    username 		char(32),     -- �û���¼��
    dispname   		char(32),     -- ����
    mac     		char(18),     -- mac��ַ
    did			    int,
    tid             int,                            -- �������ĵ���ID
    uid             int,                            -- �û�ID
    sdate       	char(10),                     	-- ���ڣ���ʽΪ yyy/mm/dd
    cid         int unsigned,                --   ��ַ���ID  
    bytes       bigint,                      --   �����ֽ��� 
    worktime    smallint default 1,          --  ʱ�� 1--�ϰ�ʱ��  2--�°�ʱ��
    lcount      bigint,                      --  ����� 
    ctime       int,                          --  ����ʱ��
    sid         bigint default 0,            -- ��¼���    
    gid         int default 0            -- ��¼���    
};



-- ������ݿ�
-- �������Ϊ��Ҫ�޸ļ�¼���ݣ����ǲ���brighthours

drop table if exists ncsnetid;
create table ncsnetid_if (
    servicecode  	  char(14)  ,     -- �����˱���
    username 		  char(32)  ,     -- �û���¼��
    dispname   		  char(32)  ,     -- ����
    mac     		  char(18)  ,     -- mac��ַ
    position 		  char(32)  ,     -- λ�� �����Ƿ���ţ�IP��ַ��MAC��ַ��
    idno    		  char(18)  ,     -- ֤����
    idtype  		  char(3),                        -- ֤������
    did			      int,
    tid               int,                            -- �������ĵ���ID
    uid               int,                            -- �û�ID
    sip         	  char(15)  ,                	  -- ԴIP  
    ntype             int  ,                  --  �������(��:qq,MSN,��Ϸ�˺ŵ�)
    name              char(64) ,      --  �����ʺ�(�磺qq�ţ�msn�ŵ�)
    starttime         int ,
    lasttime       	  int ,                   -- ������ʱ��
    ndbsid            bigint default 0                -- ��� did,uid,name,ntype ����  (�޸�) (ԭ��num)
) engine=MyISAM;

create index ncsnetid_if_ind1 on ncsnetid_if (ndbsid);
create index ncsnetid_if_ind2 on ncsnetid_if (ntype);
create index ncsnetid_if_ind3 on ncsnetid_if (tid);
create index ncsnetid_if_ind4 on ncsnetid_if (did);
create index ncsnetid_if_ind5 on ncsnetid_if (lasttime);
create index ncsnetid_if_ind6 on ncsnetid_if (name);
drop table if exists ncsfiles;

-- �ļ�����
create table ncsfiles (
    fileid          bigint  primary key,
    fsize           int,
    stime           int,
    content         mediumtext
 )  engine=MyISAM;
 

