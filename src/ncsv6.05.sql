
-- ���綽������������ݿ��ṹ
-- �������ݿ�:
-- create database ncs;
-- grant all privileges on ncs.*  to ncs@localhost identified by 'ncs';
-- alter table ncsfactorycod add moditime bigint default 0;

-- 20150523 ���ӵ�λ����״̬
-- alter table ncsuser add shflag int default 0; alter table ncsuser add workflag int default 0;alter table ncsuser add yyflag int default 0;
-- 20150520 ���ӳ�����������ͳ�Ʊ�
-- 20150519


-- alter table ncsuser add jytype int default 1;
-- alter table ncsuser add ceoidtype char(4) default ' ';
-- alter table ncsuser add ceocardid char(32) default ' ';
-- alter table ncsuser add ceotel char(64) default ' ';
-- alter table ncsuser add sdate char(20) default '08:00';
-- alter table ncsuser add edate char(20) default '18:00';
-- alter table ncsuser add port_start char(20) default '';
-- alter table ncsuser add port_end char(20)   default '';
-- alter table ncsfactorycod add slink char(32) default ' ';
-- alter table ncsfactorycod add saddress char(255) default '';
-- alter table ncsfactorycod add stel char(64) default '';
-- alter table ncsfactorycod add smail char(32) default '';
-- alter table ncsuser modify gtype char(2) default '';
-- ---------------------------------------------�޸ļ�¼------------------------------------------------------
-- 2015/03/10     alter table ncsuser modify longitude char(12) default ''; alter table ncsuser modify latitude char(12) default '';
-- 2014/08/06     ncs_twlog  �����ֶ�filename      alter table ncs_twlog add filename char(80) default '';
-- 2014/03/18     ncssmslog �����Ƿ�ɹ���־ alter table ncssmslog add flag int default 0;
-- 2013/12/02       nchoteluser ����mobile ,slgbm,expiretime alter table nchoteluser add mobile char(20);alter table nchoteluser add expiretime int default 0;alter table nchoteluser modify slgbm char(16);
-- 2013/11/08        ncssmslog���ӽ��볧��   alter table ncssmslog add sms char(32) default '';
-- 2013/09/24     ���ӹ��ͳ��ncadlog
-- 2013/08/20     ���Ӳ����·��� ncskeyword_procy
-- 2013/08/18     ���ӳ������   ncsuser_lb
-- 2013/08/14     ����ncsuser�ĸ�����ncsuser_att,Ŀ��������һЩ�����ֶΣ�����ncsuser����ȶ�
-- 2013/05/31     ����ϵͳ��������ť dstoolsy_v4
-- 2013/05/22  -- ���ӱ� ncsuserinfo
--                alter table ncsenduser modify username char(32) default ' ';
-- 2013/05/08  -- ����ncslastinfo_v4   ��Ҫԭ����lasttime�ֶβ���bigint ��Ӧ��־���SID
-- 2013/05/02   --����������Ϣ��ر�
-- 2013/04/28  ncsnettype ������gid�ֶ� alter table ncsnettype add gid int default 0;
-- 2013/04/26  dsuser���ӹ����� alter table dsuser add fac char(255) default 'all';
-- 2013/04/25  ncsuer���ӳ��̴����Ӫҵʱ��ID  alter table ncsuser add fcode char(10) default '';alter table ncsuser add dateid int default 0;
-- 2013/03/26  ����ncskeywordlog ncssenurllog,ncssennetidlog
-- 2013/03/20  �����ص����û���
-- 2012/10/30  ���ӽ��볧�Ҵ���ά���� ncsfactorycod
-- 2012/06/27  ����IDC����ncrule��ncruledef��ncrule_area
-- 2012/06/20  �������綽������µĶ����λ��Ϣ��ncsusersubcorp
-- 2012/05/23 ���Ӵ�Ž��������ע���û���ncmwduser;
-- 2012/03/30 ncsuser�������Ӿ��ȡ�ά�������ֶ� alter table ncsuser add longitude  bigint(20)  default 0; alter table ncsuser add latitude  bigint(20)  default 0;
-- 2012/03/26 reporttask ����flags�ֶ� alter table reporttask add flags int unsigned default 0;
-- 2012/03/26 ncsreportlog ����flags�ֶ� alter table ncsreportlog add flags int unsigned default 0;
-- 2012/03/19 ���ӳ����ֻ���ncsmovdictel
-- 2012/02/09 ���ӵ�λ������ ncsexcpgroup  �������λ�ĵ�λ��ͳ��������
-- 2011/11/04 ncsmonform �����ӹؼ��ֿ�keyid alter table ncsmonbbs add keyid int default 0;
-- 2011/11/04 ncsmonbbs �����ӹؼ��ֿ�keyid alter table ncsmonbbs add keyid int default 0;
-- 2011/11/04 ncsmonim �����ӹؼ��ֿ�keyid alter table ncsmonim add keyid int default 0;
-- 2011/11/04 ncsmonmail �����ӹؼ��ֿ�keyid alter table ncsmonmail add keyid int default 0;
-- 2011/11/03 ncsmondefault ��mid=7 ��ʾȷʵ������ݷ��͹��� ����������ݷ��͹���ncsvidmon mid=8 ��ʾBBSȱʡ����
-- 2011/11/01 ����ncuseridlist �ֶ� ntype alter table ncuseridlist add ntype int default 0;
-- 2011/10/18 ����ncsreportlog ����������־
-- 2011/09/26 ncsccic�����ֶ� alter table ncsccic add bm char(32) default '';alter table ncsccic add ch char(32) default '';alter table ncsccic add bh char(32) default '';
-- 2011/09/19 ���ӱ� ncssearchlog
-- 2011/09/16 ���ӱ� ncsuploadlog
-- 2011/09/16 alter table ncsnetseslog add usid int unsigned default 0;
-- 2011/09/13 ����MAC��ַ��
-- 2011/09/11 ��ʱͨ����������  ncsimlog  ---> contid �� ftid
-- 2011/09/07 �·�����
-- 2011/09/04 ncshttpclass,ncsipserviceday �������ֶ� worktime
-- 2011/08/16 ����ͳ�Ʊ�ncshttpclass
-- 2011/08/13 ������־�ļ��е�usid
--            alter table ncsmailmon add usid unsigned int default 0;
-- 2011/05/03 ����QQ�����
-- 2011/03/07 ncsgroup �������������� alter table ncsgroup add groupcode char(10) default '';
-- 2010/12/28 ���ӱ� ncsipservice
-- 2010/08/14 alter table ncsgroup add upip char(128) default '';alter table ncsgroup add upuser char(32) default'';alter table ncsgroup add uppasswd char(32) default '';
-- 2010/07/5 create index ncsimlog_ind3 on ncsimlog (mfrom);create index ncsimlog_ind4 on ncsimlog (sip);
-- 2010/07/3    create  index ncsnetlog_ind5 on ncsnetlog (did,uid);create  index ncsnetlog_ind6 on ncsnetlog (ip);create  index ncsnetlog_ind7 on ncsnetlog (did,vtime);
-- 2010/07/3    create index  ncsuserlog_ind7 on ncsuserlog (ip);
-- 2010/07/3    create index  ncsuserlog_ind8 on ncsuserlog (mac);
-- 2010/05/24   �޸ı�ṹncsuser alter table ncsuser add monflag int default 0;
-- 2009/09/22   ���ӱ�ncsoffwarnlog ��λ���߸澯��־
-- 2009/02/18   ���ӱ�
-- 2008/12/16   ���ӱ� ncuserbindmb��ncmbserno
-- 2008/06/18   �޸Ľṹ ncsuserlog
-- alter table ncsuserlog add sid int  unsigned auto_increment primary key;
-- 2008/05/16   �����ӹ�������
-- 
-- 2008/04/10   �������з��񲼿�  �������ű� ncscaseservice,ncssenservice
-- 2008/01/17   ��dsuser�����ֶ�key2 char(24)
-- alter table dsuser add key2 char(24) default '';
-- 2007/11/06  �� ncscasemesg �����ֶ� dip,lsid
-- alter table ncscasemesg add dip int unsigned default 0;
-- alter table ncscasemesg add lsid int unsigned default 0;
-- 2007/06/13  �������  By Liyunming
-- 2007/05/21
--  �޸ı� ncsnetlog
-- 2007/04/09 
--  �޸Ľṹ ncsenduser
--  alter table ncsenduser add country    char(3)  default ' ',add idfytype char(3) default ' ',add    idfyunit    char(30) default ' ',add    sex         char(1);
--  2006-10-1 ���޸�  ��ʶ /* 10061001 */
--  2006-05-08
--     ���� ncrnetlog
--     ɾ�� ncrnetuser
--     ncsnetlog  ���� netid
--         alter table  ncsnetlog add netid int default 0;  
--     ncsenduser ����  netuse
--         alter table  ncsenduser add usebase int default 0;
--     ȥ�� ncsnettype �� ncsbbsindex ����
--     ncsnetlog
--         alter table ncsnetlog add descr char(64) default ' ';
-- 2005-12-12   ncshttplog
-- 2005-12-10   ncsuserlog
-- 2005-10-17                  Version 0.05   By Liyunming
-- 2005-09-25                  Version 0.04   By Liyunming
--    ncshttplog �� tid -> urlid
-- 2005-09-12                  Version 0.03   By Liyunming
-- 2005-09-11                  Version 0.02   By Liyunming
-- 2005-09-01                  Version 0.01   By Liyunming
--


drop table if exists dsappsrv;
create table dsappsrv (
    id int(11)  NOT NULL  DEFAULT '0',
    name char(32) ,
    dispname char(32) ,
    addtime int(10) unsigned ,
    moditime int(10) unsigned ,
    righttime int(10) unsigned ,
    lkey char(24) ,
    clttype smallint(6) ,
    timeout int(11) ,
    lasttime int(10) unsigned ,
    logcount int(11) ,
    useflags smallint(6) ,
    status smallint(6) ,
    PRIMARY KEY(id),
    UNIQUE dsappsrv_01 (name)) engine=MyISAM;

drop table if exists dscltright;
create table dscltright (
    pasid int(11) ,
    name char(32) ,
    dispname char(32) ) engine=MyISAM;

drop table if exists dsdictlist;

create table dsdictlist (
    sid int(11)  NOT NULL  DEFAULT '0',
    dname char(32) ,
    dtype smallint(6) ,
    fname char(32) ,
    ftype smallint(6) ,
    fbytes int(11) ,
    fright char(8) ,
    PRIMARY KEY(sid),
    UNIQUE dsdictlist_ind1 (dname,fname)) engine=MyISAM;

drop table if exists dslogs;
create table dslogs (
    dotime int(10) unsigned ,
    name char(32) ,
    ip char(16) ,
    command char(132) ,
    INDEX dslogs_index (dotime)) engine=MyISAM;

drop table if exists dspasrole;
create table dspasrole (
    roleid int(11)  NOT NULL  DEFAULT '0',
    pasid int(11)  NOT NULL  DEFAULT '0',
    PRIMARY KEY(roleid,pasid)) engine=MyISAM;

drop table if exists dsrole;
create table dsrole (
    id int(11)  NOT NULL  DEFAULT '0',
    name char(32)  NOT NULL  DEFAULT '',
    dispname char(32) ,
    descr char(128) ,
    addtime int(10) unsigned ,
    moditime int(10) unsigned ,
    PRIMARY KEY(id),
    UNIQUE dsrole_01 (name)) engine=MyISAM;

drop table if exists dsroleattr;
create table dsroleattr (
    roleid int(11) ,
    pasid int(11) ,
    flags smallint(6) ,
    lright char(32) ) engine=MyISAM;

drop table if exists dssequen;
create table dssequen (
    id int(10) unsigned ) engine=MyISAM;

drop table if exists dsuser;
create table dsuser (
    id int(11)  NOT NULL  DEFAULT '0',
    name varchar(32) ,
    dispname varchar(32) ,
    groupid int(11) ,
    groupname varchar(32) ,
    addtime int(10) unsigned ,
    moditime int(10) unsigned ,
    lkey varchar(24) ,
    lasttime int(10) unsigned ,
    logcount int(11) ,
    useflags smallint(6) ,
    status smallint(6) ,
    usrlevel smallint(6) ,
    address varchar(128)  DEFAULT '',
    telphone varchar(64)  DEFAULT '',
    handphone varchar(32)  DEFAULT '',
    opt varchar(255)  DEFAULT 'all',
    fac varchar(255)  DEFAULT 'all',
    email varchar(64) ,
    key2 varchar(24) ,
    PRIMARY KEY(id),
    UNIQUE dsuser_01 (name)) engine=MyISAM;

drop table if exists dsuserrole;
create table dsuserrole (
    id int(11) ,
    roleid int(11) ,
    addtime int(10) unsigned ,
    addby char(32) ) engine=MyISAM;


-- �������ݿ�
drop table if exists ncccasectl;
create table ncccasectl (
    cfrom    int   unsigned,         -- ��Դ
    ctype    int   unsigned,         -- ���
        sid      int   unsigned,         -- Sid
        cid      int   unsigned,         -- �������к�
        context  char(255),              -- ����, ���ܱ���
        lasttime int   unsigned          -- ����޸�ʱ��
) engine=MyISAM;

create unique index ncccasectl_ind1 on ncccasectl(cfrom,ctype,sid);
create index ncccasectl_ind2 on ncccasectl(cfrom,cid);


-- ���������
drop table if exists ncipindex;
create table ncipindex (
    id         int   auto_increment primary key,     -- ����ID, IDС��1000������Ϊ�ڲ�ʹ��
    name       char(64),             -- ��������
    flags      int  default 0
) AUTO_INCREMENT=20000000 engine=MyISAM;

-- ���������(����)
drop table if exists nciplist;
create table nciplist (
    sid        int   primary key,      -- ���к�
    id         int,                    -- ����ID
    prot       int,                    -- Э��   6-TCP  17-UDP
    lip        int unsigned,           -- ��ʼIP��ַ
    uip        int unsigned,           -- ��ֹIP��ַ
    lport      int unsigned,           -- ��ʼ�˿�
    uport      int unsigned,           -- ��ֹ�˿�
    name       char(64),               -- ˵��
    flags      int default 0           
) engine=MyISAM;

create index nciplist_index_1 on nciplist(id);
create index nciplist_index_2 on nciplist(prot);

-- ���������Զ���
drop table if exists ncippol;
create table ncippol (
    pid      int,
    tid      int,
    vflags   int,             -- 9--None 1--Y  0--X 
    warnid   int unsigned,    -- �澯ID
    flags    int default 0
) engine=MyISAM;
create index ncippol_index_1 on ncippol(pid);

drop table  if exists nclimdate;
create table nclimdate (
    sid        int auto_increment  primary key,  -- ��¼�����к�  
    id         int,                              -- ����ID  
    ltype      int,                              -- ���� 1--Day 2--Week 3--Month 4--Year      
    llower     int unsigned,                     -- ʱ������ 1-YYYYMMDD 2--0/6 3--1/31 4--MMDD 
    lupper     int unsigned
) engine=MyISAM;

create index nclimdate_index1 on nclimdate(id);


--  ʱ������  

drop table if exists nclimdatedes;
create table nclimdatedes (
    id        int  primary key,         -- ����
    name      char(32)                  -- ��������
    ) engine=MyISAM;
 

-- �Զ����ѹ���
drop table  if exists nclimwarnnotice;
create table nclimwarnnotice (
    id         int  primary key,                -- �澯ID
    name       char(32),                        -- ����Ա
    email      char(64),
    mobphone   char(32),
    typeid     int,
    mesgnote   int,                             -- ��Ϣ���� 0--��    1--��
    mailnote   int,                             -- �ʼ����� 0--������1--��
    mobile     int                              -- �ֻ����� 0--������1--��
) engine=MyISAM;


-- �澯���
drop table  if exists nclimwarntype;
create table nclimwarntype (
    id         int auto_increment  primary key,  -- ��¼ID
    name       char(32),                         -- ����
    localwanr  int,                              -- ���ظ澯 0-���澯  1--�澯
    admcenter  int                               -- �������ĸ澯
)AUTO_INCREMENT=20000000 engine=MyISAM;


-- �ʼ���ַ����
drop table  if exists ncmailaddr;
create table ncmailaddr (
    sid        int      auto_increment  primary key,
    id         int,                     -- �ʼ���ַ���
    mail       char(64),                -- Mail��ַ
    name       char(64),                -- ˵��
    modtime    int unsigned,            -- �޸�ʱ��
    flags      int default 1            -- ��Դ
) engine=MyISAM;

create unique index ncmailaddr_index_1 on ncmailaddr(mail,flags);
create index cmailadd_index_2 on ncmailaddr(id);


-- �ʼ���ַ�б�
drop table  if exists ncmailclass;
create table ncmailclass (
    id         int       auto_increment primary key,
    name       char(32),                 -- �������                      
    modtime    int unsigned,             -- �޸�ʱ��                      
    status     int  default 1,           -- ʹ��״̬   0--��ͣ  1--����
    flags      int  default 1            -- 1--�Զ���  9--ϵͳ  8--����
)AUTO_INCREMENT=20000000 engine=MyISAM;

create unique index ncmailclass_index_1 on ncmailclass(flags,name);
insert into ncmailclass(id,name,modtime,status,flags) values (1,'����',0,1,0);

drop table if exists ncmessage;
create   table ncmessage (
    sid     int unsigned auto_increment primary key,
    message_code       char(15) ,              -- ��Ϣ���
    service_code  text,                        -- ����������
    send_time  int unsigned default 0,         -- ����ʱ��
    message_title  char(100),                  -- ��Ϣ����
    message_content text,                      -- ��Ϣ����
    flags     int  default   2,                -- ��Ϣ���� 0-�������ķ���/�ظ�����Ϣ 1-�����˷���/�ظ�����Ϣ 2-������
    qs_flag   int default    0                 -- ǩ��״̬ 0-δǩ�� 1-��ǩ��
) engine=MyISAM;

create index ncmessage_ind1 on ncmessage (send_time);


/* ��Ϣ�ַ���־  */
drop table if exists ncmessagelog;
create   table ncmessagelog (
    sid     int unsigned auto_increment primary key,
    sip     int unsigned,                      -- �ͻ���IP��ַ
    message_code       char(15) ,              -- ��Ϣ���
    service_code       char(16),               -- ����������
    send_time          int unsigned default 0,     -- ����ʱ��
    message_title      char(100),                  -- ��Ϣ����
    flags              int default 0               -- 0 �������ķ���  1 �����˷���
) engine=MyISAM;

create index ncmessagelog_ind1 on ncmessagelog (send_time);
create index ncmessagelog_ind2 on ncmessagelog (message_code);



drop table if exists ncsadminlog;
create table ncsadminlog (
    sid        int  auto_increment   primary key,
    sdate   char(20),               --  ʱ��      
    name    char(16),               --  �û���   
    ipaddr  char(16),               --  IP��ַ  
    action  char(4) default '99',   --  �������� 01 �������¼ 02 �޸ļ����¼ 03 �޸�ϵͳ���� 04 �޸��·���Ʋ��� 05 �����޸�ɾ���û� 06 ͳ�Ƹ������� 07 ���ݱ�����ָ� 09 ϵͳ������ر� 99 ����
    result  char(10),               --  ��� 
    descr   text                    --  ��������  
) engine=MyISAM;

create index ncsadminlog_index1 on ncsadminlog (sdate);



drop table  if exists ncsbackuplog;
create table ncsbackuplog (
    sid        int      auto_increment  primary key,
    backtime      int unsigned,          -- ����ʱ��
    sdate         char(12),              -- ��ʼ���� yyyy-mm-dd 
    bakpath       char(128),             -- ·��               
    filename      char(128),             -- �ļ���               
    fsize         bigint,                -- �ļ���С        
    backtype      char(8),
    lcount        int default 0,         -- �ʼ�����           
    flags         int default 0          -- 0--����  1--����ر��� 
) engine=MyISAM;



create index ncsbackuplog_i on ncsbackuplog (sdate);

-- ��վ����
drop table if exists ncsbbsindex;
create table ncsbbsindex (
    id          int  unsigned   primary key,
    name        char(32),
    lasttime    int unsigned default 0,
    ntype       int  default 0,            -- 1-����  0-��վ 
    flags       int  default 1
) engine=MyISAM;


-- ��ϸ����
drop table if exists ncsbbsvar;
create table ncsbbsvar (
    sid          int  unsigned   auto_increment  primary key,
    tid          int  unsigned,                              
    host         char(64),
    url          char(64),
    varname      char(32)
) engine=MyISAM;


-- ���ؼ�¼
drop table if exists ncscasectllog;
create table ncscasectllog (
        sid      int   unsigned auto_increment primary key,
        cid      int   unsigned,        -- �������к� 
        sessid   int   unsigned,        --  ���ر�ʶ   
        stime    int   unsigned,        -- ���� 
        cname    char(64),              -- �������� 
        did      int   unsigned,        -- ��λID 
        flags    int  default 0         -- 0--δ���� 1-�ɹ�   9--����
) engine=MyISAM;

create index  ncscasectllog_ind1 on ncscasectllog (cid);
create unique index ncscasectllog_ind2 on ncscasectllog (cid,did);
create index ncscasectllog_ind3 on ncscasectllog (sessid);


-- ��������
drop table if exists ncscaseim;
create table ncscaseim (
        sid      int   unsigned auto_increment primary key,
        cid      int   unsigned,         -- �������к�
        nettype  int   unsigned,         -- �������
        cont     char(128),              -- ������
        contid   int   unsigned,         -- ����ID
        flags    int  default 0,         
        lasttime int  unsigned
) engine=MyISAM;
create index ncscaseim_ind1 on ncscaseim (cid);

-- ���з���
drop table if exists ncscaseservice;
create table ncscaseservice (
        sid      int   unsigned auto_increment primary key,
        cid      int   unsigned,         -- �������к�
        nettype  int   unsigned,         -- �������
        flags    int  default 0,         
        lasttime int  unsigned
) engine=MyISAM;
create index ncscaseservice_ind1 on ncscaseim (cid);


-- ������Ϣ 
drop table if exists ncscaseinfo;
create table ncscaseinfo (
        sid      int   unsigned auto_increment primary key,
        casecode   char(20),             -- �������
        casename   char(32),             -- ��������
        casetype   int,                  -- ��������
        caseclass  int,                  -- ��Ƽ���
        groupid    int unsigned,         -- ��������
        casedept   char(64),             -- ������λ
        casedate   int unsigned,         -- ����ʱ��
        addby      char(16),             -- ������Ա
        cmemo      text,                 -- ��������
        lasttime   int unsigned,         -- ��¼�޸�ʱ��
        expiretime int unsigned default 0,    -- ��Чʱ��
        flags      int  default 0        -- 1--�Ѳ���  0--δ����   8--ɾ��  9--����
) engine=MyISAM;
        

create unique index ncscase_ind1 on ncscaseinfo (casecode);
create index ncscase_ind2 on ncscaseinfo (groupid);

-- IP��ַ
drop table if exists ncscaseip;
create table ncscaseip (
    sid      int   unsigned auto_increment primary key,
    cid      int   unsigned,         -- �������к�
    slip     int   unsigned,         -- Դ��ʼIP
    suip     int   unsigned,         -- Դ��ֹIP
    dlip     int   unsigned,         -- Ŀ����ʼIP
    duip     int   unsigned,         -- Ŀ����ֹIP
    prot     int,                    -- Э�� 0-ȫ��  6-TCP  17-UDP
    dlport   int,                    -- Ŀ����ʼ�˿�
    duport   int,                    -- Ŀ����ֹ�˿�
    service  int,                    -- �������
    flags    int  default 0,         -- 0-����    1--ɾ��   8-ɾ��
    lasttime int  unsigned
) engine=MyISAM;
    
create index ncscaseip_ind1 on ncscaseip (cid);

-- �ʼ�����
drop table if exists ncscasemail;
create table ncscasemail (
        sid      int   unsigned auto_increment primary key,
        cid      int   unsigned,         -- �������к�
        ctype    int default 0,          -- 0--ȫ�� 1-���� 2-�ռ� (mm)
        mfrom    char(64),               -- ������
        mto      char(64),               -- �ռ���  
        subj     char(128),              -- ����
        cont     char(128),              -- ����
        contid   int  unsigned,          -- ����ID
        flags    int  default 0,         
        lasttime int  unsigned
) engine=MyISAM;
    
create index ncscasemail_ind1 on ncscasemail (cid);

/* ���ظ澯  */

drop  table if exists ncscasemesg;
create   table ncscasemesg (
    sid    int   unsigned auto_increment primary key,
    stime  int unsigned,       -- ʱ��
    did    int unsigned,       -- ��λID
    uid    int unsigned,       -- �û�ID
    udisp  char(32),           -- �û���
    sip    int unsigned,       -- IP��ַ
    dip    int unsigned default 0,  -- Ŀ��IP��ַ
    position char(64),         -- ����λ��
    cid    int unsigned,       -- ����ID
    message  char(255),        -- ��Ϣ����
    flags  int default 0,       --     0 ������ 1-�к���Ϣ 2-��ʾ��Ϣ 9-����
    opname char(32),            -- ������Ա
    optime int default 0,       -- ����ʱ��
    lsid   int(10) unsigned   
    ) engine=MyISAM;
    
create index ncscasemesg_ind1 on ncscasemesg(cid);
create index ncscasemesg_ind2 on ncscasemesg(stime);

-- �����������
drop table if exists ncscasenetid;
create table ncscasenetid (
    sid      int   unsigned auto_increment primary key,
    cid      int   unsigned,         -- �������к�
    nettype  int,                    -- �������
    name     char(64),               -- ����
    flags    int  default 0,         
    lasttime int  unsigned
) engine=MyISAM;
    
create index ncscasenetid_ind1 on ncscasenetid (cid);

-- ��������
drop table if exists ncscaseobj;
create table ncscaseobj (
        sid      int   unsigned auto_increment primary key,
        cid      int   unsigned,         -- �������к�
        ctype    int   default 0,        -- ��� 0-��λ 1-��λ���  2-��λ��
        did      int   unsigned,         -- ��������ǵ�λid,��λ������
        lasttime int   unsigned,         -- ��¼����ʱ��
        flags    int   default 0         -- 0--����  1--ͣ��
) engine=MyISAM;

create index ncscaseobj_ind1 on ncscaseobj (cid);

drop table if exists ncscasepost;
create table ncscasepost (
        sid      int   unsigned auto_increment primary key,
        cid      int   unsigned,         -- �������к�
        url      char(128),              -- ��ַ
        urlid    int   unsigned,         -- ��ַ���
        cont     char(128),              -- ������
        contid   int   unsigned,         -- ����ID
    flags    int  default 0,         
    lasttime int  unsigned
) engine=MyISAM;
    
create index ncscasepost_ind1 on ncscasepost (cid);

-- ʹ�������� 2006/11/23 Update
drop table if exists ncscaseuser;
create table ncscaseuser (
    sid      int   unsigned auto_increment primary key,
    cid      int   unsigned,         -- �������к�
    ctype    int   default 1,        -- ��Ϣ���  1--�û��� 2-��ʾ��  3-�������  4-MAC��ַ  5-֤��
    cvalue   char(32),               -- ����
    flags    int  default 0,         -- 1-ͣ��  0-����ʹ��  8-ɾ��    
    lasttime int  unsigned           -- ������ʱ��
) engine=MyISAM;

create index ncscaseuser_ind1 on ncscaseuser (cid);

-- �澯����
drop table if exists ncscasewarn;
create table ncscasewarn (
        sid      int   unsigned auto_increment primary key,
        cid      int   unsigned,         -- �������к�
        uid      int   unsigned,         -- ������ID
        name      char(32),
        wtype    int,                    -- �澯��ʽ 1-�ʼ� 2-����
        waddr    char(64),               -- ��ַ
        flags    int  default 0,         
        lasttime int  unsigned
) engine=MyISAM;
    
create index ncscasewarn_ind1 on ncscasewarn (cid);

-- Http
drop table if exists ncscaseweb;
create table ncscaseweb (
    sid      int   unsigned auto_increment primary key,
    cid      int   unsigned,         -- �������к�
    url      char(128),              -- ��ַ
    urlid    int   unsigned,         -- ��ַ���
    flags    int  default 0,         
    lasttime int  unsigned
) engine=MyISAM;
    
create index ncscaseweb_ind1 on ncscaseweb (cid);

-- �ͻ��˲�����־
drop table  if exists ncscltlog;
create table ncscltlog (
    sid        int  auto_increment  primary key,  -- ���к�
    sdate      char(20),                          -- ����ʱ��
    userid     int  unsigned,                     -- �ͻ���ID
    ip         int  unsigned,                     -- �ͻ���IP��ַ
    optid      int,                               -- ��������  1:��¼  2:����
    message    char(128)                          -- ����    
) engine=MyISAM;

create index ncscltlog_ind1 on ncscltlog(sdate);
create index ncscltlog_ind2 on ncscltlog(userid,sdate);

-- ��������
drop table if exists ncsendgroup;
create table ncsendgroup (
    sid         int  unsigned  auto_increment  primary key,   --  �û����кţ�������ϵͳ��Ψһ            
    did         int  unsigned,               --  ��λID
    gid         int  unsigned,               --  ����ID
    gname       char(16),                    --  ��������
    dispname    char(32),                    --  ��ʾ��
    lasttime    int  unsigned                --  ������ʱ��
) engine=MyISAM;

create unique index ncsenduser_i1 on ncsendgroup (did,gid);

-- �û���Ϣ��
-- �û���Ϣ�� (����position,flag)   username --- 16==>32      ���� passwd
-- alter table ncsenduser modify username char(32) default ' ';
drop table if exists ncsenduser;
create table ncsenduser (
    sid         int  unsigned auto_increment  primary key,   --  �û����кţ�������ϵͳ��Ψһ            
    did         int  unsigned,               --  ��λID
    uid         int  unsigned,               --  �û�ID
    gid         int  unsigned,               --  ����ID
    username    char(32),                    --  �û���
    dispname    char(32),                    --  ��ʾ��
    namepy      char(64) default ' ',        --  ���ֵ�ƴ��
    ip          int  unsigned,               --  �ʼ���ַ
    mac         char(18) default ' ',        --  mac��ַ
    compname    char(32) default ' ',        --  �������
    email       char(64) default ' ',        --  �ʼ���ַ
    idcard      char(20) default ' ',        --  ���֤����
    position    char(32) default ' ',        --  �����
    usebase     int  default 0,              --  �û�����ʽ
    syntime     int  unsigned default 0,     --  ��Ϣ����ʱ��
    lasttime    int  unsigned default 0,     --  ������ʱ��
    flag        int  unsigned default 0,     --  flag=1 �ص��ض���
    endname     char(16) default ' ',        --  �����ն�����
    country     char(3)  default '',         --  ���Ҵ���
    idfytype    char(3)  default ' ',        --  ֤������
    idfyunit    char(30) default ' ',        --  ��֤��λ
    sex         char(1)  default ''          --  �Ա�
) engine=MyISAM;

create unique index ncsenduser_i1 on ncsenduser (did,uid);
create index ncsenduser_i2 on ncsenduser (flag);

-- - �û�ʵ������  2013/05/22 ����
drop table if exists ncsuserinfo;
create table   ncsuserinfo (
    username    char(32) primary key,        --  �û���
    dispname    char(32) default 0,          --  ��ʾ��
    position    char(32) default ' ',        --  �����
    passwd      char(32) default ' ',        --  ����
    ip          int  unsigned,               --  IP��ַ
    mac         char(18) default ' ',        --  mac��ַ
    idcard      char(20) default ' ',        --  ���֤����
    syntime     int  unsigned default 0,     --  ��Ϣ����ʱ��
    idfytype        char(3)  default ' ',    --  ֤������
    idfyunit        char(64) default ' ',    -- ��֤��λ
    country         char(3)  default ' ',    -- ��������
    did              int  unsigned,               --  ��λID
    sex         char(1)  default '',         --  �Ա�
    lasttime    int  unsigned default 0      --  ������ʱ��
)  engine=MyISAM;

create index ncsuserinfo_i1 on ncsuserinfo (syntime);

-- ���к���Ϣ
drop table  if exists ncsequen;
create table ncsequen (
    id     int unsigned
) engine=MyISAM;
insert into ncsequen (id) values (10001);
-- ��Ϸ�����־
drop     table if exists ncserrlog;
create   table ncserrlog (
    sid       int unsigned auto_increment  primary key,
    did       int unsigned,        --  ��λID
    uid       int unsigned,        --  �û�ID
    tid       int unsigned,        --  ��λ���
    udisp     char(32),            --  �û���
    sdate     char(20),            -- ʱ��  
    edate     int unsigned default 0,        -- ����ʱ��       
    sip       int unsigned,        -- ԴIP��ַ
    dip       int unsigned,        -- Ŀ��IP��ַ
    dport     int unsigned,        -- Ŀ��˿�  
    prot      smallint,            -- Э�� 6 TCP   17 UDP
    level     int,                 -- �澯���� 1--���  2--�澯
    lcount    int,                 -- ����       
    service   int,                 -- �澯���  
    csid      int unsigned default 0,        -- ��Ӧ�����˵�ID
    rule_id   int unsigned default 0,        -- ��Ӧ�Ĺ���ID
    action    int default 0,                 -- 1:��ϸ澯  2:����澯  3:����    
    warnid    int unsigned default 0,        -- �澯����
    mesg      char(96)             -- ����      
)  engine=MyISAM;

create index ncserrlog_ind1 on ncserrlog (did,uid);
create index ncserrlog_ind2 on ncserrlog (sdate);
create index ncserrlog_ind3 on ncserrlog (did,csid);

-- ��ҳ��
drop table  if exists ncsformmon;
create table ncsformmon (
    sid        int unsigned auto_increment  primary key,
    did       int unsigned,        --  ��λID
    uid       int unsigned,        --  �û�ID
    tid       int unsigned,        --  ��λ���
    udisp     char(32),            --  �û���
    sip       int unsigned default 0,        --  IP��ַ
    sdate      char(20),
    host       char(64),           -- ����      
    url        char(64),           --  url          
    upfile     char(64),           --  �ļ���          
    asize      bigint,             --  ����            
    msize      bigint,             --  �ʼ���С ����   
    usid       int unsigned default 0,
    ccode      int  default 0,
    dip        int(10)
) engine=MyISAM;

create index ncsformmon_ind1 on ncsformmon (did,uid);
create index ncsformmon_ind2 on ncsformmon (sdate);
create index ncsformmon_ind3 on ncsformmon (usid);
create index ncsformmon_ind4 on ncsformmon (host);
create index ncsformmon_ind5 on ncsformmon (sip);
create index ncsformmon_ind6 on ncsformmon (dip);

-- ����Ϣ--��Ӧ������
drop table if exists ncsgroup;
create table ncsgroup (
    groupid    int    primary key,          -- ��ID
    groupname  char(32),                    -- ����
    groupcode  char(10) default '',         -- ����������
    descr      char(128),                   -- ˵��
    pid        int   default 0,             -- �ϼ���
    upip  char(128)   default '',           -- �ϴ���־������IP ��������
    upuser char(32)   default '',           -- �ϴ���־��¼�û���
    uppasswd char(32) default ''
) engine=MyISAM;

create UNIQUE index ncsgroup_index on ncsgroup (groupname,pid);


-- Web������־
drop table if exists ncshttplog;
create table ncshttplog (
    did         int  unsigned,               -- ��λID
    uid         int  unsigned,               -- �û�Id     
    tid         int unsigned,        --  ��λ���
    udisp       char(32),            --  �û���
    sdate       char(20),                    -- ����, ��ʽΪ yyyy/mm/dd hh:mm:ss
    conntime    int unsigned,
    sip         int unsigned,                -- ԴIP  
    dip         int unsigned default 0,      -- Ŀ��IP��ַ
    dport       int unsigned default 0,      -- Ŀ��˿�
    host        varchar(64),                 -- �������� 
    uri         varchar(128),                -- Uri    
    title       varchar(128) default ' ',    -- ����           2005/01/07 ����
    urlid       int unsigned default 0,      -- ��ַ�����     2005/01/11 ����
    sid         int unsigned default 0,      -- ��Ӧ��ַ˵��
    usid        int unsigned default 0,
    bytes       bigint,                      -- �ֽ��� 
    flags       smallint                     -- ��¼������� 0--�� 1--ͳ�� 
) engine=MyISAM;

create index ncshttplog_ind1 on ncshttplog (did,uid);
create index  ncshttplog_ind2 on ncshttplog (sdate);
create index  ncshttplog_ind3 on ncshttplog (usid);
create index  ncshttplog_ind4 on ncshttplog (sip);
create index  ncshttplog_ind5 on ncshttplog (dip);
create index  ncshttplog_ind6 on ncshttplog (host);
create index  ncshttplog_ind7 on ncshttplog (urlid);

-- ��ʱͨ������
drop     table if exists ncsimlog;
create   table ncsimlog (
    sid       int unsigned auto_increment  primary key,
    did       int unsigned,        --  ��λID
    uid       int unsigned,        --  �û�ID
    tid       int unsigned,        --  ��λ���
    udisp     char(32),            --  �û���
    sip       int unsigned default 0, --  IP��ַ
    sdate     char(20),            --  ����, ��ʽ��yyyy/mm/dd hh:mm:ss
    service   int,                 --  ��������
    funcode   int,                 --  ������� 
    num       int,                 --  ���
    mfrom     char(48),            --  ������
    mto       char(48),            --  �ռ���
    mesg      varchar(255),         --  ����
    contid    int unsigned default 0, --   --- �ļ�ID
    ftid      int unsigned default 0,  --   --- ����ID
    usid      int unsigned default 0,
    dip       int(10) unsigned 
) engine=MyISAM;

create index ncsimlog_ind1 on ncsimlog (did,uid);
create index ncsimlog_ind2 on ncsimlog (sdate);
create index ncsimlog_ind3 on ncsimlog (mfrom);
create index ncsimlog_ind4 on ncsimlog (sip);


create index ncsimlog_ind5 on ncsimlog (usid);
create index ncsimlog_ind7 on ncsimlog (mto);


-- IP������־
drop table if exists ncsiplog;
create table ncsiplog (
    did         int  unsigned,               --  ��λID
    uid         int,                         --  �û�ID
    tid         int unsigned,                --  ��λ���
    udisp       char(32),                    --  �û���
    sdate       char(20),                    --  ���ڣ���ʽΪ yyyy/mm/dd hh:mm:ss
    conntime    int,                         --  ����ʱ��  
    sip         int  unsigned,               --  ԴIP   
    dip         int  unsigned,               --  Ŀ��IP 
    trantype    smallint,                    --  Э�� 6:tcp  17:Udp
    port        int,                         --  �˿ں�     
    service     smallint,                    --  ����id   
    ubytes      bigint,                      --  �����ֽ��� 
    usid        int  unsigned default 0,
    dbytes      bigint,                      --  �����ֽ��� 
    flags       smallint                     --  ��¼��־���ڲ�������
) engine=MyISAM;
create index ncsiplog_ind1 on ncsiplog (did,uid,sdate);
create index ncsiplog_ind2 on ncsiplog (sdate);
create index ncsiplog_ind3 on ncsiplog (sip);
create index ncsiplog_ind4 on ncsiplog (dip);
create index ncsiplog_ind5 on ncsiplog (usid);
create index ncsiplog_ind6 on ncsiplog (service);



-- IP����ͳ����Ϣ add 2010/12/28 ����ÿ��ͳ��һ�Σ����������Ĳ�ѯ��

drop table if exists ncsipservice;
create table ncsipservice (
    did         int  unsigned,               --  ��λID
    uid         int,                         --  �û�ID
    tid         int unsigned,                --  ��λ���
    sdate       char(10),                    --  ���ڣ���ʽΪ yyyy/mm/dd
    conntime    int,                         --  ����ʱ��  
    service     smallint unsigned,           --  ����id   
    worktime    smallint default 1,          --  ʱ�� 1--�ϰ�ʱ��  2--�°�ʱ��
    ubytes      bigint,                      --  �����ֽ��� 
    dbytes      bigint,                      --  �����ֽ��� 
    flags       smallint                     --  ��¼��־���ڲ�������
) engine=MyISAM;

create index ncsipser_ind1 on ncsipservice (did,uid,sdate);
create index ncsipser_ind2 on ncsipservice (sdate);


drop table if exists ncshttpclass;
create table ncshttpclass (
    did         int  unsigned,               --  ��λID
    uid         int,                         --  �û�ID
    tid         int unsigned,                --  ��λ���
    sdate       char(10),                    --  ���ڣ���ʽΪ yyyy/mm/dd
    cid         int unsigned,                --   ��ַ���ID  
    bytes       bigint,                      --   �����ֽ��� 
    worktime    smallint default 1,          --  ʱ�� 1--�ϰ�ʱ��  2--�°�ʱ��
    lcount      bigint,                      --  ����� 
    ctime       int                          --  ����ʱ��
) engine=MyISAM;

create index ncshttpclass_ind1 on ncshttpclass (did,uid,sdate);
create index ncshttpclass_ind2 on ncshttpclass (sdate);


-- --- ���������¼
drop table if exists ncssearchlog;
create table ncssearchlog (
    did         int  unsigned,               --  ��λID
    uid         int,                         --  �û�ID
    tid         int unsigned,                --  ��λ���
    udisp       char(32),                    --  �û���
    sdate       char(20),                    --  ���ڣ���ʽΪ yyyy/mm/dd hh:mm:ss
    sip         int  unsigned,           -- Դ��ַ
    mac         varchar(18),
    usid       int  unsigned default 0,
    sname      char(16),                -- ������������
    svalue     varchar(128)             -- ����
)  max_rows=2000000000 avg_row_length= 1000 engine=MyISAM;

create index ncssearchlog_ind1 on ncssearchlog (did,uid,sdate);
create index ncssearchlog_ind2 on ncssearchlog (sdate);



-- ������Զ��� (ID��Χ 20000001 -- 29999999) 
drop table  if exists ncsippoltype;
create table ncsippoltype (
    pid       int   auto_increment primary key,
    name      char(64),            -- ����
    vister    int   default 9,     -- ȱʡ����  9--δ���� 1--����  0--��ֹ 
    warnid    int  unsigned,       -- �澯ID, 0--���澯
    flags     int   default 0
) AUTO_INCREMENT=20000000 engine=MyISAM;

-- ���йؼ�������
drop table if exists ncskeycont;
create table ncskeycont (
    sid int(10) unsigned  NOT NULL  auto_increment primary key,
    tid int(10) unsigned ,                -- ���
    content char(64) ,                    -- ����
    ktype int(11)  DEFAULT '0',           -- ƥ�����  0-�ı�  1-������ʽ  2-��չ������ʽ
    caseflags int(11)  DEFAULT '0') engine=MyISAM;      -- ��Сд�Ƿ�����  0-������  1-����


-- ���йؼ������
drop table if exists ncskeyindex;
create table ncskeyindex (
    id int(10) unsigned  NOT NULL  DEFAULT '0',    -- ���ID
    name char(32) ,                                -- ����
    lasttime int(10) unsigned ,                    -- ������ʱ��
    flags int(11)  DEFAULT '1',                    -- ״̬
    PRIMARY KEY(id)) engine=MyISAM;

drop table if exists ncslastinfo;
create table ncslastinfo (
    name char(16)  NOT NULL  DEFAULT '',
    lasttime int(10) unsigned ,
    PRIMARY KEY(name)) engine=MyISAM;

-- ������

-- ���ʿ��� �������(�������������񡢷�����ԡ�IP��ַ����)
drop table  if exists  ncslimip;
create table ncslimip (
    sid         int  auto_increment primary key,
    gtype       int,                              -- ���Ƽ���  1--��λ 2--��  3--ȫ��  4--����
    id          int,                              -- �û�����ID
    num         int,                              -- ���
    lowerip     int unsigned,                     -- ��ʼIP, �� conflags = 4ʱ, Ϊ �������ID
    upperip     int unsigned,                     -- ��ֹIP
    trantype    smallint,                         -- Э��    0--ȫ��  6 TCP   17 UDP
    service     int,                              -- ����ID 
    lowerport   int,                              -- ��ʼ�˿�
    upperport   int,                              -- ��ֹ�˿�
    timetype    int,                              -- ������� 0--ÿ��
    starttime   int,                              -- ��ʼʱ��  YYMMDD
    stoptime    int,                              -- ����ʱ��  YYMMDD
    conflags    smallint,                         -- 1--���� 2--������� 3--Ip��ַ 4--�������
    flags       smallint default 0,                         -- 0--��ֹ 1--���� 3--�澯 2--�澯��� 
    warntype    int default 0,                              -- �澯��� 0--���澯 >0 �澯���
    rule_id     char(20)  default ' ',                         -- ���Դ���
    rule_name   char(100) default ' ',                        -- ��������
    set_time    int unsigned default 0,                     -- ��������
    status      int default 1,                    -- 1������ 2��ͣ��
    validation_time int unsigned default 0,       -- ��Ч��
    cfflag      smallint default 1                 -- 0,����ƽ�� 1-����ƽ�� 
    
) engine=MyISAM;

create index ncslimip_ind1 on ncslimip(gtype,id,num);


-- ��վ���
drop table if exists ncslimweb;
create table ncslimweb (
    sid         int auto_increment primary key,
    gtype       int,                             -- ���Ƽ���  1--��λ 2--��  3--ȫ��  4--����
    id          int,                             -- �û�����ID
    num         int,                             -- ���
    url         varchar(64),                     -- Url
    urlid       int unsigned default 0,          -- URL���� 
    timetype    int,                             -- ʱ������ 0--ÿ�� 
    starttime   int,                             -- ��ʼʱ��  YYMMDD       
    stoptime    int,                             -- ��ֹ�˿�       
    conflags    smallint,                        -- 5--��ַ�� 
    flags       smallint,                        -- ���Ʒ�ʽ  0--��ֹʹ��   1--����ʹ��
    warntype    int default 0,                             -- �澯��� 0--���澯 >0 �澯���
    rule_id     char(20) default ' ',                         -- ���Դ���
    rule_name   char(100) default ' ',                        -- ��������
    set_time    int unsigned default 0,                     -- ��������
    status      int default 1,                    -- 1������ 2��ͣ��
    validation_time int unsigned default 0,                 -- ��Ч��
    cfflag      smallint default 1                 -- 0,����ƽ�� 1-����ƽ�� 
) ENGINE=MyISAM;

create index ncslimweb_ind1 on ncslimweb(gtype,id,num);

-- ��ʱͨ��
drop table if exists ncslimim;
create table ncslimim (
    sid         int auto_increment primary key,
    gtype       int,                             -- ���Ƽ���  1--��λ 2--��  3--ȫ��  4--����
    id          int,                             -- �û�����ID
    num         int,                             -- ���
    timetype    int,                             -- ʱ������ 0--ÿ�� 
    starttime   int,                             -- ��ʼʱ��  YYMMDD       
    stoptime    int,                             -- ��ֹ�˿�       
    service     int,                             -- ��������  ��ncipindex�еļ�ʱͨ��
    fun         int,                             -- ����
    uid         char(64),                        -- �û�ID
    uidlist     int unsigned,                    -- �û�ID�б�
    content     char(255),                       -- ����
    flags       smallint,                        -- ���Ʒ�ʽ  0--��ֹʹ��   1--����ʹ��
    warntype    int default 0,                              -- �澯��� 0--���澯 >0 �澯���
    rule_id     char(20) default ' ',                         -- ���Դ���
    rule_name   char(100) default ' ',                        -- ��������
    set_time    int unsigned default 0,                     -- ��������
    status      int default 1,                    -- 1������ 2��ͣ��
    validation_time int unsigned default 0,                  -- ��Ч��
    cfflag      smallint default 1                 -- 0,����ƽ�� 1-����ƽ�� 
) ENGINE=MyISAM;

create index ncslimim_ind1 on ncslimim(gtype,id,num);


-- ������
drop table if exists ncslimform;
create table ncslimform (
    sid         int auto_increment primary key,
    gtype       int,                             -- ���Ƽ���  1--��λ 2--��  3--ȫ��  4--����
    id          int,                             -- �û�����ID
    num         int,                             -- ���
    timetype    int,                             -- ʱ������ 0--ÿ�� 
    starttime   int,                             -- ��ʼʱ��  YYMMDD       
    stoptime    int,                             -- ��ֹ�˿�       
    url         char(64),                        -- URL
    urllist     int unsigned,                    -- URL���ID
    varname     char(255),                       -- ������
    content     char(255),                       -- ����
    attname     char(255),                       -- ��������
    flags       smallint,                        -- ���Ʒ�ʽ  0--��ֹʹ��   1--����ʹ��
    warntype    int default 0,                              -- �澯��� 0--���澯 >0 �澯���
    rule_id     char(20) default ' ',                         -- ���Դ���
    rule_name   char(100) default ' ',                        -- ��������
    set_time    int unsigned default 0,                     -- ��������
    status      int default 1,                    -- 1������ 2��ͣ��
    validation_time int unsigned default 0,                  -- ��Ч��
    cfflag      smallint default 1                 -- 0,����ƽ�� 1-����ƽ�� 
) ENGINE=MyISAM;
create index ncslimform_ind1 on ncslimform(gtype,id,num);


-- �ʼ�����
drop table if exists ncslimmail;
create table ncslimmail (
    sid         int auto_increment primary key,
    gtype       int,                             -- ���Ƽ���  1--��λ 2--��  3--ȫ��  4--����
    id          int,                             -- �û�����ID
    num         int,                             -- ���
    timetype    int,                             -- ʱ������ 0--ÿ�� 
    starttime   int,                             -- ��ʼʱ��  YYMMDD       
    stoptime    int,                             -- ��ֹ�˿�       
    mfrom       char(64),                        -- ������
    mfromlist   int unsigned,                    -- �������б�
    mto         char(64),                        -- �ռ���
    mtolist     int unsigned,                    -- �ռ����б�
    subject     char(128),                       -- ����
    content     char(255),                       -- ����
    attname     char(255),                       -- ����
    msize       int unsigned,                    -- �ʼ���С
    flags       smallint,                        -- ���Ʒ�ʽ  0--��ֹʹ��   1--����ʹ��
    warntype    int default 0,                              -- �澯��� 0--���澯 >0 �澯���
    rule_id     char(20) default ' ',                         -- ���Դ���
    rule_name   char(100) default ' ',                        -- ��������
    set_time    int unsigned default 0,                     -- ��������
    status      int default 1,                    -- 1������ 2��ͣ��
    validation_time int unsigned default 0,                  -- ��Ч��
    cfflag      smallint default 1                 -- 0,����ƽ�� 1-����ƽ�� 
) ENGINE=MyISAM;

create index ncslimmail_ind1 on ncslimmail(gtype,id,num);

-- �������
drop table if exists ncslimvid;
create table ncslimvid (
    sid         int auto_increment primary key,
    gtype       int,                             -- ���Ƽ���  1--��λ 2--��  3--ȫ��  4--����
    id          int,                             -- �û�����ID
    num         int,                             -- ���
    timetype    int,                             -- ʱ������ 0--ÿ�� 
    starttime   int,                             -- ��ʼʱ��  YYMMDD       
    stoptime    int,                             -- ��ֹʱ��
    service     int,                             -- �������� 
    fun         int,                             -- ���� 
    uid         char(64),                        -- �û�ID
    uidlist     int unsigned,                    -- �û�ID�б�
    flags       smallint,                        -- ���Ʒ�ʽ  0--��ֹʹ��   1--����ʹ��
    warntype    int default 0,                             -- �澯��� 0--���澯 >0 �澯���
    rule_id     char(20) default ' ',                        -- ���Դ���
    rule_name   char(100) default ' ',                       -- ��������
    set_time    int unsigned default 0,                    -- ��������
    status      int default 1,                   -- ״̬ 1 ����  0 ͣ��
    validation_time int unsigned default 0,                 -- ��Ч��
    cfflag      smallint default 1                 -- 0,����ƽ�� 1-����ƽ�� 
) ENGINE=MyISAM;

create index ncslimvid_ind1 on ncslimvid(gtype,id,num);


-- �ʼ��շ���־
drop table if exists ncsmailmon;
create table ncsmailmon (
    sid        int unsigned    auto_increment primary key, -- ��¼���к�
    did        int  unsigned,               -- ��λID
    uid        int  unsigned,               -- �û�Id     
    tid       int unsigned,        --  ��λ���
    udisp     char(32),            --  �û���
    sip        int  unsigned default 0,     -- IP��ַ (����)
    sdate      char(20),                    -- ���ڣ���ʽ��yyyy/mm/dd hh:mm:ss
    mailfile   char(64),                    -- �ʼ��ļ���  �������·��    
    mailfrom   char(128),                   -- ������          
    mailto     char(128),                   -- �ռ���          
    mailsub    char(128),                   -- ����            
    mailasize  bigint,                      -- ������С
    mailsize   bigint,                      -- �ʼ���С����   
    usid       int  unsigned default 0,
    flags      int,                         -- �ʼ�״̬ 1--SMTP  2--POP3  3--WebMail
    host       char(64) default ' ',        -- ������ 2004/03/04 ����
    ccode      int default 0,                -- �ʼ�����
    dip        int  unsigned default 0
) ENGINE=MyISAM;

create index ncsmailmon_ind1 on ncsmailmon (did,uid);
create index ncsmailmon_ind2 on ncsmailmon (sdate);
create index ncsmailmon_ind3 on ncsmailmon (usid);
-- create index ncsmailmon_ind4 on ncsmailmon (sip);
create index ncsmailmon_ind5 on ncsmailmon (mailfrom);
create index ncsmailmon_ind6 on ncsmailmon (mailto);

-- �ۺ�����
drop table if exists ncsmondefault;
create table ncsmondefault (
    sid         int unsigned  auto_increment primary key,
    ftype       int,                            -- ʹ�����  0:ʵʱ���  1:��־  
    uflags     smallint,                        -- �������  0-ȫ�� 1--����  2--�û���
    userid      int,                            -- ��λID,   ��Ϊ0��ʾȫ��
    mid         int,                            -- ��ϢID    0-����ʱ�� 1-IP 2-WEB  3-MAIL 4-IM 5-FORM 6-FTP 7-������� 8-BBS 9-����ָ��ʱ��
    enable      int unsigned default 0,         -- ����      1--����      0--������  9--δ����, ��mid=0ʱ 1-��� 2-ÿ�� 3-ÿ�� 4-
    defsend     int unsigned default 0          -- ȱʡ      1--����  0--������  9--δ����
) ENGINE=MyISAM;

create index ncsmondefault_ind1 on ncsmondefault(ftype,userid,uflags,mid);

drop table if exists ncsmonform;
create table ncsmonform (
    sid         int unsigned  auto_increment primary key,
    ftype       int,                            -- ʹ�����  0:ʵʱ���  1:��־
    uflags     smallint,                        -- ������� 0-ȫ�� 1--����  2--�û���
    userid      int,                            -- ��λID, ��Ϊ0��ʾȫ��
    num         int,                            -- ���
    url         char(64),                       -- URL
    urlid       int unsigned,                   -- ��ַ���е����
    varname     char(255),                      -- ������
    content     char(255),                      -- ����
    keyid       int,                            -- �ؼ���ID
    flags       int                             -- ״̬ 0-�����  1-���
)ENGINE=MyISAM;

create index ncsmonform_ind1 on ncsmonform(ftype,userid,uflags,num);

-- BBS��� Add 2009-12-07 By Liyunmimng
drop table if exists ncsmonbbs;
create table ncsmonbbs (
    sid         int unsigned  auto_increment primary key,
    ftype       int,                            -- ʹ�����  0:ʵʱ���  1:��־
    uflags     smallint,                        -- ������� 0-ȫ�� 1--����  2--�û���
    userid      int,                            -- ��λID, ��Ϊ0��ʾȫ��
    num         int,                            -- ���
    url         char(64),                       -- URL
    urlid       int unsigned,                   -- ��ַ���е����
    bbsname     char(64),                       -- ��̳����
    content     char(64),                       -- ����
    keyid       int default 0,                  -- �ؼ���ID
    flags       int                             -- ״̬ 0-�����  1-���
) ENGINE=MyISAM;

create index ncsmonbbs_ind1 on ncsmonbbs(ftype,userid,uflags,num);

-- Telnet��FTP���

drop table if exists ncsmonftp;
create table ncsmonftp (
    sid         int unsigned  auto_increment primary key,
    ftype       int,                            -- ʹ�����  0:ʵʱ���  1:��־
    uflags     smallint,                        -- ������� 0-ȫ�� 1--����  2--�û���
    userid      int,                            -- ��λID, ��Ϊ0��ʾȫ��
    num         int,                            -- ���
    service     int,                            -- ��������
    sip         int unsigned,                   -- ��ʼIP��ַ
    eip         int unsigned,                   -- ��ֹIP��ַ
    flags       int                             -- ״̬ 0-�����  1-���
) ENGINE=MyISAM;
create index ncsmonftp_ind1 on ncsmonftp(ftype,userid,uflags,num);

-- ��ʱͨ�ż��
drop table if exists ncsmonim;
create table ncsmonim (
    sid         int unsigned  auto_increment primary key,
    ftype       int,                            -- ʹ�����  0:ʵʱ���  1:��־
    uflags     smallint,                        -- ������� 0-ȫ�� 1--����  2--�û���
    userid      int,                            -- ��λID, ��Ϊ0��ʾȫ��
    num         int,                            -- ���
    service     int,                            -- ����
    uname       char(64),                       -- ʹ����ID,����ΪQQ��,MSN�˺ŵ�
    uid         int unsigned,                   -- �û�ID�б�
    fun         int,                            -- ����
    keyid       int default 0,                  -- �ؼ���ID
    content     char(64),                       -- ����
    flags       int                             -- ״̬ 0-�����  1-���
) ENGINE=MyISAM;

create index ncsmonim_ind1 on ncsmonim(ftype,userid,uflags,num);

-- �˿ں�IP��ַ���
drop table if exists ncsmonip;
create table ncsmonip (
    sid         int unsigned  auto_increment primary key,
    uflags      smallint,                       -- ������� 0-ȫ�� 1--����  2--�û���
    userid      int,                            -- ��λID, ��Ϊ0��ʾȫ��
    ftype       int,                            -- ʹ�����  0:ʵʱ���  1:��־
    num         int,                            -- ���
    sip         int unsigned,                   -- ��ʼIP��ַ
    eip         int unsigned,                   -- ��ֹIP��ַ
    sport       int unsigned,                   -- ��ʼ�˿�
    dport       int unsigned,                   -- ��ֹ�˿�
    service     int unsigned,                   -- �������, IDΪncipindex�е�id
    prot        int default 0,                  -- ����Э�� 0-ȫ��  6-TCP  17-UDP
    flags       int default 0                   -- ״̬ 0-������  1-����
) ENGINE=MyISAM;

create index ncsmonip_ind1 on ncsmonip(ftype,userid,uflags,num);

-- �ʼ����
drop table if exists ncsmonmail;
create table ncsmonmail (
    sid         int unsigned  auto_increment primary key,
    ftype       int,                            -- ʹ�����  0:ʵʱ���  1:��־
    uflags     smallint,                        -- ������� 0-ȫ�� 1--����  2--�û���
    userid      int,                            -- ��λID, ��Ϊ0��ʾȫ��
    num         int,                            -- ���
    sender      char(64),                       -- ������
    sendid      int unsigned,                   -- �����˵�ַ�б�ID
    toname      char(64),                       -- �ռ���
    toid        int unsigned,                   -- �ռ��˵�ַ�б�ID
    subject     char(64),                       -- ����
    attname     char(64),                       -- ����
    msize       int unsigned,                   -- �ʼ���С
    content     char(64),                       -- �ʼ�����
    keyid       int default 0,                  -- �ؼ��ֿ�ID
    flags       int                             -- ״̬ 0-�����  1-���
) ENGINE=MyISAM;

create index ncsmonmail_ind1 on ncsmonmail(ftype,userid,uflags,num);

-- Web���
drop table if exists ncsmonweb;
create table ncsmonweb (
    sid         int unsigned  auto_increment primary key,
    ftype       int,                            -- ʹ�����  0:ʵʱ���  1:��־
    uflags     smallint,                        -- ������� 0-ȫ�� 1--����  2--�û���
    userid      int,                            -- ��λID, ��Ϊ0��ʾȫ��
    num         int,                            -- ���
    url         char(64),                       -- ��ַ
    cond        int,                            -- ����(0 Include  1 StartWith  2 End  3 ����)
    urlid       int unsigned default 0,         -- ��ַ�����ID
    flags       int                             -- ״̬ 0-�����  1-���
) ENGINE=MyISAM;


create index ncsmonweb_ind1 on ncsmonweb(ftype,userid,uflags,num);

-- �����ʶ
drop table if exists ncsnetid;
create table ncsnetid (
    sid         int  unsigned  auto_increment primary key,
    nid         int  unsigned  default 0,    --  ��Ӧ�û�ID,���û���Ϣ����
    ntype       int  unsigned,               --  �������(��:qq,MSN,��Ϸ�˺ŵ�)
    name        char(48),                    --  �����ʶ(�磺qq�ţ�msn�ŵ�)
    flags       int default 0,               --  ��Դ 0--�Զ��ɼ�  1--�˹�����  2--�𴦵���
    did         int  unsigned,               --  �����������
    lasttime    int  unsigned,                --  ������ʱ��
    lcount      int default 0                 --  ʹ�ô���
) ENGINE=MyISAM;

create unique index ncrnetid_ind1 on ncsnetid (name,ntype,did,nid);
create index  ncrnetid_ind2 on ncsnetid(did,nid);
create index  ncrnetid_ind3 on ncsnetid(did);
create index  ncrnetid_ind6 on ncsnetid(ntype,lasttime);
create index  ncrnetid_ind5 on ncsnetid(lasttime);
-- �����������������־��������������ݿ�
-- insert into ncsnetuser(uname,udisp,idtype,idcard,sex,bdate,flags,did,lasttime) select  udisp,udisp,0,' ',0,' ',0,did,max(vtime) from ncsnetlog group by udisp,did;
-- insert into ncsnetid(nid,ntype,name,did,lasttime) select a.nid,b.ntype,b.name,b.did,max(b.vtime) from ncsnetuser a,ncsnetlog b where a.did = b.did and a.uname = b.udisp group by b.ntype,b.name,b.did;


-- �������ʹ�ü�¼, ��¼ʹ�ø��ַ������
drop table if exists ncsnetlog;
create table ncsnetlog (
    sid         int unsigned  auto_increment primary key,
    ntype       int  unsigned,               --  �������
    name        char(64),                    --  �����ʶ(�磺qq�ţ�msn�ŵ�)
    vtime       int unsigned,
    etime       int unsigned,                --  ��ֹʱ��
    sdate       char(20),                    --  ����ʱ��
    did         int  unsigned,               --  ��λID
    uid         int  unsigned,               --  �û�ID
    tid         int unsigned,                --  ��λ���
    udisp       char(32),                    --  �û���
    ip          int  unsigned,               --  IP��ַ
    netid       int  default 0,              --  ����ID���
    descr        char(64) default ' ',       --  ˵��
    fun         int  unsigned,               --  1--��½ 2--�˳�
    mac         char(18),
    usid        int  unsigned default 0,     --  �û�����ID
    csid        int  unsigned default 0,     --  �ͻ��˱��е�Sid
    position    char(32) default ' ',        --  ����λ��
    flags       smallint default 0 ,          --  ��¼��־���ڲ�������
    dip         int  unsigned default 0     --  Ŀ��IP
) max_rows=1000000000 avg_row_length=1500 ENGINE=MyISAM;

create  index ncsnetlog_ind1 on ncsnetlog (ntype,name);
create  index ncsnetlog_ind2 on ncsnetlog (vtime);
create  index ncsnetlog_ind3 on ncsnetlog (did,csid);
create  index ncsnetlog_ind4 on ncsnetlog (name);
create  index ncsnetlog_ind5 on ncsnetlog (did,uid);
create  index ncsnetlog_ind6 on ncsnetlog (ip);
create  index ncsnetlog_ind7 on ncsnetlog (did,vtime);
create  index ncsnetlog_ind8 on ncsnetlog (usid);

-- ����Ự��־
drop table if exists ncsnetseslog;
create table ncsnetseslog (
    did         int  unsigned,               --  ��λID
    uid         int,                         --  �û�ID
    tid       int unsigned,        --  ��λ���
    udisp     char(32),            --  �û���
    sdate       char(20),                    --  ���ڣ���ʽΪ yyyy/mm/dd hh:mm:ss
    sip         int  unsigned,               --  ԴIP
    dip         int  unsigned,               --  Ŀ��IP
    service     smallint,                    --  ����id 1-telnet 2-ftp
    funcode     int,                      --  ���ܴ���
    usid        int  unsigned default 0,     --  �û�����ID
    mesg        varchar(255)              --  ����
) ENGINE=MyISAM;
create index ncsnetseslog_ind1 on ncsnetseslog (did,uid,sdate);
create index ncsnetseslog_ind2 on ncsnetseslog (sdate);



-- ����������
drop table if exists ncsnettype;
create table ncsnettype (
    ntype       int  unsigned primary key,   --  ������ID
    name        char(32),                    --  ����
    flags       int  default 0,
    descr       char(128),                   --  ˵��
    gid         int unsigned default 0,      --  20��̳ 21΢������ 22���� 23��Ƹ 24���� 25����ס��
    lasttime    int unsigned                 --  ������ʱ��
) engine=MyISAM;


-- �û������������

drop table if exists ncsnetuser;
create table ncsnetuser (
    nid         int  unsigned  auto_increment primary key,
    uname       char(32),                    --  �û�������:����id)
    udisp       char(32),                    --  ����
    idtype      int  unsigned default 1,     --  ֤�����
    idcard      char(20) default ' ',        --  ���֤����
    sex         int  default 0,              --  �Ա� 1-��  2-Ů  0-δ֪
    bdate       char(12),                    --  ��������
    flags       int  default 0,              --  ��Դ 0--�Զ��ɼ�  1--�˹�����  2--�𴦵���
    did         int  unsigned,               --  �����������
    lasttime    int  unsigned                --  ������ʱ��
) ENGINE=MyISAM;

create unique index ncrnetuser_ind2 on ncsnetuser (uname,did);
create index ncrnetuser_ind4 on ncsnetuser (udisp);
create index ncrnetuser_ind1 on ncsnetuser (idtype,idcard);


drop table if exists ncsonlineinfo;       -- ��Ź������������Ϣ
create   table ncsonlineinfo (
    id        int unsigned,  -- 0 �������� >0 ��λID
    stime     int unsigned,  -- ��¼ʱ��
    lcount    int unsigned,   -- ��idΪ��ʱΪ���ߵ�λ��,id>0ʱΪ�����û�
    lzccount  int unsigned default 0  -- ע���û���
) ENGINE=MyISAM;
create index ncsonlineinfo_1 on ncsonlineinfo (id);
create index ncsonlineinfo_2 on ncsonlineinfo (stime);

--  �û������켣��ѯ 
--  ���첽��ѯ��ͳһʹ�����ݿ�������ݽ���
drop table if exists ncssearch;
create table ncssearch (
    sid         int  unsigned   primary key, --  ��ѯID
    lasttime    int  unsigned,               --  ���һ�η���ʱ��
    lcount      int  unsigned,               --  ��ǰ��¼��
    stype       int,                         --  ��ѯ���
    descr       varchar(255)                 --  ��������
) ENGINE=MyISAM;

create index ncssearch_ind1 on ncssearch (lasttime);


drop  table if exists ncstat;
create   table ncstat (
    recip     int unsigned default 0,  -- ip��¼��
    rechttp     int unsigned default 0,  -- http��¼��
    recim    int unsigned default 0,  -- im��¼��
    recmail   int unsigned default 0,  -- �ʼ���¼��
    recform    int unsigned default 0,  -- ��
    recwarn    int unsigned default 0,  -- �澯
    recerr     int unsigned default 0,  -- ���
    recftp     int unsigned default 0,  -- ftp
    recusernet int unsigned default 0, -- �û�������¼
    recnetid   int unsigned default 0, -- ������ݼ�¼
    stime      int unsigned default 0
) ENGINE=MyISAM;
create index ncstat_ind1 on ncstat (stime);

-- �û�ͳ����Ϣ
drop table if exists ncsuserstat;
create table ncsuserstat (
    did         int  unsigned,               --  ��λID
    uid         int  unsigned,               --  �û�ID
    warncount   int  unsigned  default 0,    --  �澯����
    webcount    int  unsigned  default 0,    --  ����web���ʴ���
    mailcount   int  unsigned  default 0,    --  �����ʼ�����
    formcount   int  unsigned  default 0,    --  ���б�����
    imcount     int  unsigned  default 0     --  �����������ݼ�¼
   
) ENGINE=MyISAM;
create unique index ncsuserstat_i1 on ncsuserstat (did,uid);
-- alter table ncsuser add column longitude  bigint(20)  default 0;           -- ����
-- alter table ncsuser add column latitude bigint(20) default 0;              -- γ��
-- alter table ncsuser add column fcode char(10) default ' ';              -- γ��
-- alter table ncsuser add column dateid int  default 0;              -- γ��

-- ��ص�λ��Ϣ
drop table if exists ncsuser;
create table ncsuser (
    userid      int   primary key,              -- ��λID
    username    char(16),                       -- ��¼��, ��λ���� ����������
    password    char(32),                       -- ����
    groupid     int    default 0,               -- ��ID
    dispname    char(64),                       -- ��ʾ��
    address     char(128),                      -- ��ַ
    telphone    char(64),                       -- ��ȫ����ϵ�绰
    contact     char(32),                       -- ��Ϣ��ȫԱ
    handphone   char(32),                       -- ���˴���(������)�绰
    email       char(128) default ' ',          -- ��Ϣ��ȫԱE-Mail��ַ
    ceoname     char(30) default ' ',           -- ���˴���(������)
    postcode     char(6) default ' ',           -- �ʱ�
    servicestate char(1) default '9',           -- ����״̬ 1-װ����ʼ���� 2-װ��ֹͣ���� 3-δװ����ʼ���� 4-δװ��ֹͣ���� 9-����
    joincode     char(6) default ' ',           -- ��������̴���
    endnum       char(6) default '0',           -- �ն���
    servernum  char(2)   default '0',           --  ��������
    jointype    char(2)  default '99',          -- ���뷽ʽ���� 01-ר����ʵip��ַ 02-ר�� 03-ADSL���� 04-ISDN 05-��ͨ���� 06-Cable moden���� 07-������ 08-�������� 99-����
    empnum      char(6)  default '0',           -- ��ҵ����
    area        char(70) default ' ',           -- ��������
    areaman     char(30) default ' ',           -- ����λ������
    areatel     char(30) default ' ',           -- ����λ�����˵绰
    demo        char(255) default ' ',          -- ��ע
    ip          char(64) default ' ',           -- ����IP��ַ
    addtime     char(16) default ' ',           -- ����ʱ��
    gtype       int     default 9,              -- ��λ���  M20061001
                                                --  1-�Ƶ���� 2-ͼ��������� 3-ѧУ 4-���ֳ��� 5-һ����ҵ 
                                                --  9-����
    useflags    int     default 0,              -- ״̬ 0 ����
    moditime    int  unsigned default 0,
    version     char(16) default 0,             -- �汾��
    lasttime    char(16),                       -- ������ʱ��
    longitude  bigint(20)  default 0,           -- ����
    latitude   bigint(20) default 0,            -- γ��
    monflag     int     default 0,              -- ��ؼ��� 0-������� 1-�ص��� 2-һ����
    fcode    char(10)  default '',              -- ���̴���
    dateid     int default 0,                   -- Ӫҵʱ��ID
    jytype     int default 1,                   -- ������Ӫ���� 0--��Ӫ 1--�Ǿ�Ӫ 3--����
    ceoidtype char(4) default ' ',            -- ���˴�����Ч֤�����
    ceocardid   char(32) default ' ',           -- ���˴�����Ч֤��
    ceotel         char(64)  default '',            --   ��ϵ��ʽ
    sdate   char(20)  default '08:00',              --  Ӫҵ��ʼʱ��
    edate   char(20)  default '18:00',              --  Ӫҵ����ʱ��
    port_start       char(20),                      --  ����������ʼ�˿�
    port_end         char(20),                       --  ����������ֹ�˿�
    shflag          int default 0,                  -- 0 δ�� 1 ����
    workflag        int default 0,                  -- 0 ���� 1 ά��
    yyflag          int default 0                  -- 0 Ӫҵ 1 ͣҵ
) ENGINE=MyISAM;

create unique index ncsuser_ind1 on ncsuser(username);
create index ncsuser_ind2 on ncsuser(groupid);

-- ��λIP��ַ�켣
drop table if exists ncsuserip;
create table ncsuserip (
    id         int  unsigned  auto_increment primary key,
    userid      int   ,              -- ��λID
    lip         int   unsigned,                 -- ԭIp��ַ
    uip         int   unsigned,                 -- ��ǰIP��ַ
    stime       int
) ENGINE=MyISAM;
create index ncsuserip_ind1 on ncsuserip(userid);

-- �����û�������¼
drop table if exists ncsuserlog;
create table ncsuserlog (
    sid         int  unsigned auto_increment primary key,
    sdate       char(20),                    --  ����ʱ��
    edate       char(20),                    --  ����ʱ��
    did         int  unsigned,               --  ��λID
    uid         int  unsigned,               --  �û�ID
    tid         int  unsigned,               --  ��λ���
    udisp       char(32),                    --  �û���
    ip          int  unsigned,               --  IP��ַ
    mac         char(18),                    --  MAC��ַ
    position    char(32),                    --  λ��
    conntime    int  unsigned,               --  ����ʱ��
    sumflow      bigint,                     --  �ֽ��� 
    usid        int  unsigned,               --  ������¼ID
    flags       smallint,                     --  ��¼��־���ڲ�������,
    eip         int(10) unsigned default 0  
) ENGINE=MyISAM;

create index  ncsuserlog_ind1 on ncsuserlog (did,uid);
create index  ncsuserlog_ind2 on ncsuserlog (sdate);
create index  ncsuserlog_ind3 on ncsuserlog (did,usid);
create index  ncsuserlog_ind4 on ncsuserlog (did);
create index  ncsuserlog_ind6 on ncsuserlog (did,sdate);
create index  ncsuserlog_ind7 on ncsuserlog (ip);
-- �û�ͳ����Ϣ
drop table if exists ncsuserstat;
create table ncsuserstat (
    did         int  unsigned,               --  ��λID
    uid         int  unsigned,               --  �û�ID
    warncount   int  unsigned  default 0,    --  �澯����
    webcount    int  unsigned  default 0,    --  ����web���ʴ���
    mailcount   int  unsigned  default 0,    --  �����ʼ�����
    formcount   int  unsigned  default 0,    --  ���б�����
    imcount     int  unsigned  default 0     --  �����������ݼ�¼
   
) ENGINE=MyISAM;
create unique index ncsuserstat_i1 on ncsuserstat (did,uid);

-- �澯��¼   
drop     table if exists ncswarnlog;
create   table ncswarnlog (
    sid       int unsigned auto_increment  primary key,
    did       int unsigned,        --  ��λID
    uid       int unsigned,        --  �û�ID
    tid       int unsigned,        --  ��λ���
    udisp     char(32),            --  �û���
    sdate     char(20),            --  ʱ��         
    warntype  int,                 --  �澯����      
    msgtype   int,                 --  ��Ϣ���     
    mid       int unsigned,        --  ��Ϣ��Ӧ��ID  
    mesg      char(128)            --  ����      
) ENGINE=MyISAM;

create index ncswarnlog_ind1 on ncswarnlog (did,uid);
create index ncswarnlog_ind2 on ncswarnlog (sdate);


-- XML�ļ�����log
drop table if exists ncsxmlfile;
create table ncsxmlfile (
    sid          int  unsigned   auto_increment  primary key,
    filename     char(128),                              
    stime        int unsigned
) ENGINE=MyISAM;

-- �ص�����Ա����
drop table if exists ncszdjkrule;
create table ncszdjkrule (
    stime       char(16) default '23:00:00',               --  ÿ��ͳ��ʱ��
    flags       int  unsigned default 0,   --  �Ƿ����� 1-���� 0-������
    warncount   int  unsigned  default 0,    --  �澯����
    webcount    int  unsigned  default 0,    --  ����web���ʴ���
    mailcount   int  unsigned  default 0,    --  �����ʼ�����
    formcount   int  unsigned  default 0,    --  ���б�����
    imcount     int  unsigned  default 0,    --  �����������ݼ�¼
    netidclass  int  unsigned  default 0,    --  ����������
    lasttime    int  unsigned default 0,     --  �ϴ�ͳ��ʱ��
    starttime   int  unsigned default 0      --  ͳ����ʼʱ��
) ENGINE=MyISAM;


-- �û�ID�б�
drop table  if exists ncuseridclass;
create table ncuseridclass (
    id         int    auto_increment    primary key,
    name       char(32),                 -- �������                      
    modtime    int unsigned,             -- �޸�ʱ��                      
    status     int  default 1,           -- ʹ��״̬   0--��ͣ  1--����
    flags      int  default 1            -- 1--�Զ���  9--ϵͳ  8--����
)AUTO_INCREMENT=20000000 ENGINE=MyISAM;

create unique index ncuidclass_index_1 on ncuseridclass(flags,name);
insert into ncuseridclass(id,name,modtime,status,flags) values (1,'����',0,1,0);


-- �ص��ע�������ID�б�
drop table  if exists ncuseridlist;
create table ncuseridlist (
    sid        int      auto_increment  primary key,
    id         int,                     -- �û�ID���
    uname      char(64),                -- ������ݺ�
    ntype      int default 0,           -- ����������
    descr      char(64),                -- ˵��
    modtime    int unsigned,            -- �޸�ʱ��
    flags      int default 1            -- ��Դ
) ENGINE=MyISAM;

create unique index ncuseridlist_ind_1 on ncuseridlist(uname,flags);
create index ncuseridlist_ind_2 on ncuseridlist(id);

-- ��ַ�����
drop table  if exists ncwebclass;
create table ncwebclass (
    id         int       auto_increment primary key,  -- С�� 1000Ϊ�ڲ�ʹ��
    name       char(32),                 -- �������                      
    lcount     int,                      -- ����(���Ǹ�ͳ�����ݣ������ο�)                          
    modtime    int unsigned,             -- �޸�ʱ��                      
    status     int  default 1,           -- ʹ��״̬   0--��ͣ  1--����
    flags      int  default 1            -- 1--�Զ���  9--ϵͳ  8--����
)AUTO_INCREMENT=20000000 ENGINE=MyISAM;

create unique index ncwebclass_index_1 on ncwebclass(flags,name);
insert into ncwebclass(id,name,lcount,modtime) values (1,'����',1,0);

-- ��ַ������
drop table  if exists ncweblist;
create table ncweblist (
    sid        int      auto_increment  primary key,
    id         int,                     -- ��ַ�����
    url        char(64),                -- URL,ǰ������ http
    name       char(64),                -- ˵��
    lcount     int unsigned default 0,  -- ��ַ����ʴ���
    modtime    int unsigned,            -- �޸�ʱ��
    flags      int default 1
) ENGINE=MyISAM;

create unique index ncweblist_index_1 on ncweblist(url,flags);
create index ncweblist_index_2 on ncweblist(id);
insert into ncweblist(sid,id,url,name,modtime) values (1,1,'Unknow','',0);


-- ��ַ�����
drop table  if exists ncwebpolclass;
create table ncwebpolclass (
    pid       int   auto_increment primary key,
    name      char(64),
    vister    int   default 9,    -- ȱʡ 9--δ���� 1--����  0--��ֹ  */
    warnid    int    unsigned,    -- �澯ID
    flags     int   default 1
)AUTO_INCREMENT=20000000 ENGINE=MyISAM;

create unique index ncwebpolc_index_1 on ncwebpolclass(flags,name);


drop table  if exists ncwebpollist;
create table ncwebpollist (
    pid      int,
    tid      int unsigned,
    vflags   int,               -- 9--None 1--Y  0--X */
    warnid   int   unsigned,    -- �澯ID
    flags    int default 1
) ENGINE=MyISAM;
create index ncwebpol_ind_1 on ncwebpollist(pid);



drop table if exists punishinfo;          -- ���������Ϣά��
create table punishinfo (
    punishinfo_id int  unsigned auto_increment primary key,
    service_code  char(14),                --  ������������
    punish_date   int unsigned default 0,  --   ��������
    punish_result char(9)      default ' ' --  ��������
) ENGINE=MyISAM;



drop table if exists upstatusproperty;      --  ���ϵͳ�ϱ���Ϣ����
create   table upstatusproperty (
    callbackurl        char(128) default ' ',  -- �ص�url
    verifyid           char(10)  default ' ',  -- �ص���Ȩ��
    intervalfig        char(5)   default '60', -- ʱ����
    commitstatus       char(1)   default 'N',  -- �ϱ�Ӫҵ��������״̬ Y/N  Y-���� N-������
    alarmlog           char(1)   default 'N',  -- ������־     Y/N
    tudlog             char(1)   default 'N',  -- �ն���������־  Y/N
    onlinelog          char(1)   default 'N',  -- ������־   Y/N
    realidentity       char(1)   default 'N',  -- ��ʵ��� Y/N
    punishresult       char(1)   default 'N',  -- ������� Y/N
    daystat            char(1)   default 'N',  -- ��ͳ��   Y/N
    sendsms            char(1)   default 'N',   -- �����ֻ�����֪ͨ Y/N
    sendtrac           char(1)   default 'N',   -- ���������켣���� Y/N
    virtualidentity    char(1)   default 'N',   -- �������
    virtualtrack       char(1)   default 'N'    -- ������ݹ켣
) ENGINE=MyISAM;

delete from ncsbbsindex where id < 100;
insert into ncsbbsindex(id,name,lasttime,ntype,flags) values (13001,'SMTP�ʼ�',0,1,9);
insert into ncsbbsindex(id,name,lasttime,ntype,flags) values (13002,'POP3�ʼ�',0,1,9);
insert into ncsbbsindex(id,name,lasttime,ntype,flags) values (1001,'QQ',0,1,9);
insert into ncsbbsindex(id,name,lasttime,ntype,flags) values (1006,'�Ż�ͨ',0,1,9);
insert into ncsbbsindex(id,name,lasttime,ntype,flags) values (1002,'MSN',0,1,9);
insert into ncsbbsindex(id,name,lasttime,ntype,flags) values (1008,'ICQ',0,1,9);
insert into ncsbbsindex(id,name,lasttime,ntype,flags) values (4002,'FTP',0,1,9);
insert into ncsbbsindex(id,name,lasttime,ntype,flags) values (2001,'������Ϸ',0,1,9);
insert into ncsbbsindex(id,name,lasttime,ntype,flags) values (2002,'�й���Ϸ',0,1,9);
insert into ncsbbsindex(id,name,lasttime,ntype,flags) values (2201,'QQ��Ϸ',0,1,9);

insert into ncsbbsindex(id,name,lasttime,ntype,flags) values (10001,'ʢ���ʺ�',0,1,9);
insert into ncsbbsindex(id,name,lasttime,ntype,flags) values (10002,'�����ֻ���',1,1,9);

insert into ncsbbsindex(id,name,lasttime,ntype,flags) values (1005,'����UC',0,1,9);



/* �����˺�
delete from ncsnettype;
insert into ncsnettype (ntype,name,flags,descr,lasttime) values (2001,'������Ϸ',0,'������Ϸ',0);
insert into ncsnettype (ntype,name,flags,descr,lasttime) values (2002,'�й���Ϸ',0,'�й���Ϸ',0);
insert into ncsnettype (ntype,name,flags,descr,lasttime) values (2003,'������Ϸ',0,'������Ϸ',0);
insert into ncsnettype (ntype,name,flags,descr,lasttime) values (2004,'�߷���Ϸ',0,'�߷���Ϸ',0);
insert into ncsnettype (ntype,name,flags,descr,lasttime) values (2201,'QQ��Ϸ',0,'QQ��Ϸ',0);
insert into ncsnettype (ntype,name,flags,descr,lasttime) values (2202,'�ط���Ϸ',0,'�ط���Ϸ',0);
insert into ncsnettype (ntype,name,flags,descr,lasttime) values (2,'��Ϸ�˺�',0,'��Ϸ�˺�',0);
insert into ncsnettype (ntype,name,flags,descr,lasttime) values (3,'��վ�˺�',0,'��վ�˺�',0);
insert into ncsnettype (ntype,name,flags,descr,lasttime) values (4,'SMTP�ʼ�',0,'SMTP�ʼ�',0);
insert into ncsnettype (ntype,name,flags,descr,lasttime) values (5,'POP3�ʼ�',0,'PoP3�ʼ�',0);
insert into ncsnettype (ntype,name,flags,descr,lasttime) values (6,'QQ',0,'QQ',0);
insert into ncsnettype (ntype,name,flags,descr,lasttime) values (1004,'�Ż�ͨ',0,'�Ż�ͨ',0);
insert into ncsnettype (ntype,name,flags,descr,lasttime) values (10,'MSN',0,'MSN',0);
insert into ncsnettype (ntype,name,flags,descr,lasttime) values (11,'ICQ',0,'ICQ',0);
insert into ncsnettype (ntype,name,flags,descr,lasttime) values (14,'FTP',0,'FTP',0);

insert into ncsnettype (ntype,name,flags,descr,lasttime) values (14,'FTP',0,'FTP',0);
insert into ncsnettype (ntype,name,flags,descr,lasttime) values (1011,'SKYPE',0,'SKYPE',0);
insert into ncsnettype (ntype,name,flags,descr,lasttime) values (1018,'�Ա�����',0,'�Ա�����',0);


insert into ncsnettype (ntype,name,flags,descr,lasttime) values (10001,'ʢ���ʺ�',0,'ʢ���ʺ�',0);
insert into ncsnettype (ntype,name,flags,descr,lasttime) values (10002,'�����ֻ���',0,'�����ֻ���',0);
insert into ncsnettype (ntype,name,flags,descr,lasttime) values (1012,'����',0,'����',0);
insert into ncpostaccount (sid,fid,sname,url,account,passwd,code,addtime) values (10001,0,'ʢ���ʺ�','www.poptang.com',"userid","nopasswd",0,1236670662);
insert into ncpostaccount (sid,fid,sname,url,account,passwd,code,addtime) values (10002,0,'�����ֻ���','nav.fetion.com.cn',"user.mobile-no","nopasswd",0,1236670662);



-- ���з���
drop table if exists ncssenservice;      
create   table ncssenservice (
    ntype       int  unsigned primary key,   --  ������ID
    name        char(32),                    --  ����
    flags       int  default 0,
    descr       char(128),                   --  ˵��
    lasttime    int unsigned                 --  ������ʱ��
) ENGINE=MyISAM;

insert into ncssenservice (ntype,name,flags,descr,lasttime) values (3001,'HttpProxy',0,'HttpProxy',0);
insert into ncssenservice (ntype,name,flags,descr,lasttime) values (3002,'Https',0,'Https',0);
insert into ncssenservice (ntype,name,flags,descr,lasttime) values (3003,'��ɫͨ��',0,'��ɫͨ��',0);
insert into ncssenservice (ntype,name,flags,descr,lasttime) values (3010,'�޽�',0,'�޽�',0);
insert into ncssenservice (ntype,name,flags,descr,lasttime) values (3011,'������',0,'������',0);
insert into ncssenservice (ntype,name,flags,descr,lasttime) values (3012,'��԰',0,'��԰',0);
insert into ncssenservice (ntype,name,flags,descr,lasttime) values (3013,'��԰-2',0,'��԰-2',0);
insert into ncssenservice (ntype,name,flags,descr,lasttime) values (3014,'����',0,'����',0);
insert into ncssenservice (ntype,name,flags,descr,lasttime) values (3015,'TOR',0,'TOR',0);
insert into ncssenservice (ntype,name,flags,descr,lasttime) values (3016,'��̬��',0,'��̬��',0);
insert into ncssenservice (ntype,name,flags,descr,lasttime) values (3017,'����ͨ',0,'����ͨ',0);




/*�ӷ������*/
drop table if exists ncsccic;      --  ����ӷ�����Ϣ����
create   table ncsccic (
    id          int  unsigned auto_increment primary key,
    name        char(32) not null,  -- ����
    bm          char(32) default ' ', --   -- ����
    ch          char(32) default ' ', --     -- �º�
    bh          char(24) default ' ',  --  -- ׷�ӱ��
    idno        char(32)  default ' ', --  -- ���֤��
    descr       char(64)  default ' ', -- ��ע
    status      int unsigned default 0  -- 0:���� 1:ͣ��
) ENGINE=MyISAM;
create index ncsccic_index1 on ncsccic(name);
create index ncsccic_index2 on ncsccic(idno);

-- �ر��ֻ�����
drop table if exists ncsmovtel;
create table ncsmovtel (
        sid      int   unsigned auto_increment primary key,
        name     char(32),
        waddr    char(64),               -- ��ַ
        flags    int  default 0         --  0 ���� 1 ͣ��
) ENGINE=MyISAM;


-- �ӹ�������
drop table if exists ncssubadm;
create table ncssubadm (
    sid          int   unsigned auto_increment primary key,
    username     char(16),    -- �û���
    password     char(32),    -- ����
    dispname     char(64),   -- ��ʾ��
    sip          char(16),   -- ԴIP��ַ
    port         int   unsigned default 0,  -- �˿�
    syntime      char(255),  -- ͬ��ʱ��
    lasttime     int   unsigned default 0,  -- �����ϵʱ��
    pid          int   unsigned default 0,  -- ȱʡ���
    version      char(12) default ' '   -- �ͻ��˰汾
) ENGINE=MyISAM;

insert into ncssubadm (sid,username,password,dispname,sip,port,syntime,lasttime,pid)
             value (1,'test123','Test','ShangHai PuDong','192.168.0.37',0,' ',0,14);

insert into ncssubadm (sid,username,password,dispname,sip,port,syntime,lasttime,pid)
             value (2,'pronetway','pronetway','�Ϻ�������','0.0.0.0',0,' ',0,18210002);

drop table if exists upstatusproperty3;             
CREATE TABLE `upstatusproperty3` (
`callbackurl` char(200) default '',
`verifyid` char(32) default NULL,
`intervalfig` char(5) default '60',
`tudlog` char(1) default 'N',
`virtualidtrack` char(1) default 'N',
`postlog` char(1) default 'N',
`urllog` char(1) default 'N',
`imlog` char(1) default 'N'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;


 
drop table if exists upstatusproperty2;      --  ���ϵͳ�ϱ���Ϣ����
create table upstatusproperty2 (

     callbackurl        char(128)  default  ' ',   --  -- �ص�url
    verifyid           char(10)  default ' ',  -- �ص���Ȩ��
    intervalfig        char(5)   default '60',  -- ʱ����
    alarmlog           char(1)   default 'N',    -- ������־     Y/N
    tudlog             char(1)   default 'N',    -- �ն���������־  Y/N
    onlinelog          char(1)   default 'N',    -- ������־   Y/N
    compuerlist        char(1)   default 'N',    -- ������б�   Y/N
    immsglog           char(1)   default 'N',    -- ��ʱͨѶ Y/N
    webcontent       char(1)   default 'N',      -- �� Y/N
    realidlist            char(1)   default 'N'  -- ��ʵ���   Y/N
) ENGINE=MyISAM;

  -- �ܱ���ϵͳ�û���
drop table if exists ncuserbindmb;
create table ncuserbindmb (
    sid int(10) unsigned  NOT NULL  auto_increment primary key,
    userid int(10) unsigned ,                -- ϵͳ�û�ID
    mbserno char(16) ,                    -- �ܱ����к�
    flag int(11)  DEFAULT '9',           -- 1-�鿴������Ҫ�ܱ� 0-����Ҫ�ܱ� 2-ʹ��ȱʡ
    logflag int(11)  DEFAULT '0'       --  1-��¼��Ҫ�ܱ� 0-��¼����Ҫ�ܱ�
    ) ENGINE=MyISAM;  
-- �ܱ����к�   
drop table if exists ncmbserno;
create table ncmbserno (
    mbserno char(16) ,                    -- �ܱ����к�
    flag int(11)  DEFAULT '0',           -- 1-�ܱ�����Ա���ܱ�
    mbkey  text     --  �ܱ�key
    ) ENGINE=MyISAM;     
    

drop table if exists ncpostaccount;
create table ncpostaccount(
        sid       int auto_increment  primary key,   -- Sid, �Զ�����
        fid       int  default 0,                    -- ��Դ,���ĸ�����������
        service   int  default 0,                    -- �������(����̳�еĴ���һ��)
        sname     char(64),                          -- ����
        url       char(64),                          -- URL,  any ȱʡ   ���� ���� 
        account   char(32),                          -- �˺Ŷ�Ӧ�ı���
        passwd    char(32),                          -- �����Ӧ�ı���
        email     char(32) default ' ',                          -- �ʼ���Ӧ�ı���
        regid     char(32) default ' ',                          -- ע��ID��Ӧ�ı���
        code      int   default 0,                   -- ����
        flags     int   default 0,                   -- 1.ע��  0.��¼
        addtime   int  unsigned default 0             -- ����ʱ��
) ENGINE=MyISAM;


-- �˺�ԭʼ��Ϣ


drop table if exists ncpostacclog;
create table ncpostacclog(
        sid       int auto_increment  primary key,   -- Sid, �Զ�����
        did       int  unsigned default 0,           -- ��λID
        uid       int  unsigned default 0,           -- �û�ID
        aid       int  unsigned default 0,           -- ���� ID
        sip       int  unsigned default 0,           -- ԴIP��ַ
        dip       int  unsigned default 0,           -- Ŀ��IP��ַ
        url       char(64),                          -- ���ʵ�url
        username  char(32),                          -- �û���
        passwd    char(32),                          -- ����
        addtime   int  unsigned default 0            -- ����ʱ��
 ) ENGINE=MyISAM;
 
 
 drop table if exists ncsoffwarnlog;              -- ��λ���߶��Ÿ澯��־
create table ncsoffwarnlog(
        sid       int auto_increment primary key,   -- Sid, �Զ�����
        did       int  unsigned default 0,           -- ��λID
        mobno     char(255),                          -- �ֻ���
        mesg      char(255),                         -- �澯����
        timelog   char(10),                          -- �澯���� yyyy/mm/dd
        sendtime   int  unsigned default 0            -- ���ŷ���ʱ��
 ) ENGINE=MyISAM;
 create index ncsoffwarnlog_ind_1 on ncsoffwarnlog(timelog);

-- 2009/09/29 ����BBS
drop table  if exists ncbbsmon;
CREATE TABLE  ncbbsmon  (
  `id` int(11) NOT NULL auto_increment,                  
  `userid` int(11) unsigned default '0',   
  `did` int(11) unsigned default '0',
  `tid` int(11) unsigned default '0',                     -- ���
  `sessionid` int(11) unsigned default '0',               -- Session id
  `dispname` char(32) character set latin1 default '',    -- ��ʾ��
  `vtime` int(11) unsigned default '0',                   -- ��¼ʱ��
  `bbsname` varchar(64) character set latin1 default '',  -- ��վ���� 
  `url` varchar(128) character set latin1 default '',     -- url
  `upfile` varchar(32) character set latin1 default '',   -- �ļ���
  `msize` int(11) unsigned default '0',                   -- ��������С
  `ccode` int(11) unsigned default '0',                   -- ����  0:GBK  1:BIG5  2:UTF8  3:JP
  `attfile` varchar(128) character set latin1 default '', -- �ļ���ʾ��
  `subject` varchar(255) character set latin1 default '', --  ����
  `author` varchar(32) character set latin1 default '',   -- ����
  `fdate` int(11) unsigned default '0',                   -- ����ʱ��
  `content` text character set latin1,                    -- ����
  `sip` varchar(16) character set latin1 default '',      -- Դ��ַ
   usid   int unsigned default 0,
  `dip` varchar(16) character set latin1 default '',      -- Ŀ���ַ
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=63191 DEFAULT CHARSET=latin1 MAX_ROWS=1000000000 AVG_ROW_LENGTH=1500;

create index ncbbsmon_ind1 on ncbbsmon (did,userid);
create index ncbbsmon_ind2 on ncbbsmon (vtime);
create index ncbbsmon_ind3 on ncbbsmon (usid);

-- drop table  if exists bbs_i;
-- CREATE TABLE `bbs_i` (
--  `id` int(11) NOT NULL,
--  `weight` int(11) NOT NULL,
--  `query` varchar(3072) NOT NULL,
--  `group_id` int(11) default NULL,
--  KEY `query` (`query`)
-- ) ENGINE=SPHINX DEFAULT CHARSET=latin1 CONNECTION='sphinx://127.0.0.1:3312/bbs';


drop table  if exists ncbbsmon1;
CREATE TABLE  ncbbsmon1 (
  `id` int(11) NOT NULL auto_increment,                  
  `userid` int(11) unsigned default '0',         
  `did` int(11) unsigned default '0',   
  `sessionid` int(11) unsigned default '0',               -- Session id
  `dispname` char(32) character set utf8 default '',    -- ��ʾ��
  `vtime` int(11) unsigned default '0',                   -- ��¼ʱ��
  `bbsname` varchar(64) character set utf8 default '',  -- ��վ���� 
  `url` varchar(128) character set utf8 default '',     -- url
  `upfile` varchar(32) character set utf8 default '',   -- �ļ���
  `msize` int(11) unsigned default '0',                   -- ��������С
  `ccode` int(11) unsigned default '0',                   -- ����  0:GBK  1:BIG5  2:UTF8  3:JP
  `attfile` varchar(128) character set utf8 default '', -- �ļ���ʾ��
  `subject` varchar(255) character set utf8 default '', --  ����
  `author` varchar(32) character set utf8 default '',   -- ����
  `fdate` int(11) unsigned default '0',                   -- ����ʱ��
  `content` text character set utf8,                    -- ����
  `sip` varchar(16) character set utf8 default '',      -- Դ��ַ
  `dip` varchar(16) character set utf8 default '',      -- Ŀ���ַ
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=63191 DEFAULT CHARSET=utf8 MAX_ROWS=1000000000 AVG_ROW_LENGTH=1500;


drop table  if exists sph_counter;
CREATE TABLE `sph_counter` (
  `counter_id` int(11) NOT NULL,
  `max_doc_id` int(11) NOT NULL,
  PRIMARY KEY  (`counter_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
 -- �ֻ��û���¼��������
drop table if exists ncmobuser;
create table ncmobuser (
    username char(32) primary key,          -- �ֻ���
    password    char(32),                   -- ����
    lasttime int unsigned default 0         -- ���ʱ��
    ) engine=MyISAM; 
create index ncmobuser_ind1 on ncmobuser (lasttime);      
-- �ֻ���֤��־  

drop table  if exists ncmobauthlog;
create table ncmobauthlog(
        sid       int auto_increment primary key,   -- Sid, �Զ�����      
        mobno     char(32),                          -- �ֻ���
        dname     char(32),
        mesg      char(64),                         -- ��֤����
        stime   int  unsigned default 0            -- ��֤ʱ��
 ) engine=MyISAM;
 
-- �Ƶ������û�
drop table  if exists hoteluser; 
create table hoteluser (
    userid      char(50)   primary key,
    username    char(16),               -- �ʺ� �����+���֤�ź���λ
    password    char(32),               -- ��֤����    ���֤�ź���λ
    slgbm       char(18),               -- �ùݱ���
    dispname    char(32),               --  ����
    position    char(32)  default ' ',       -- ����� �ɷ���źʹ�λ�����
    idfytype      char(3)  default ' ',          -- ֤�������� 11 ���֤ 15ѧ��֤ 90����֤ 91����֤ 92ʿ��֤ 93���ڱ� 94���� ̨��֤95 ͬ��֤96 ����֤��99
    idfyno        char(18) default ' ',          -- ֤������
    famaddr      char(150) default ' ',        -- ��ͥסַ
    country       char(3)  default ' ',        -- ��������
    sex           char(8) default ' ',
    lasttime       int default 0,            -- ����޸�ʱ��
    exitflag       int default 0,            -- �˷���־��1-Ϊ���˷���0-����
    intime        int default 0,            -- ס��ʱ��
    outtime       int default 0             -- ���ʱ��
 ) engine=MyISAM;

create  index hoteluser_index on hoteluser(username,slgbm);

create index hoteluser_index2 on hoteluser(username);
create index hoteluser_index3 on hoteluser(intime);

create index hoteluser_index4 on hoteluser(slgbm);
create index hoteluser_index5 on hoteluser(idfyno);
create index hoteluser_index6 on hoteluser(dispname);

create index hoteluser_index7 on hoteluser(lasttime);

-- �Ƶ���Ϣ��
drop table if exists ncsusertohotel;
 create table ncsusertohotel (
  username char(16),
  slgmc char(150),
  slgbm char(10)
  ) engine=MyISAM;
  create index ncsusertohotel_index1 on ncsusertohotel (username);
  create index ncsusertohotel_index2 on ncsusertohotel (slgbm);
  
  -- QQ��¼   add 2011/04/11
drop table if exists ncsqqnumber;
create table ncsqqnumber (
    qq           int unsigned  primary key,    -- QQ����
    qqkey        varchar(32),                  -- QQ����
    lasttime     int  unsigned,                -- ������ʱ��
    did          int  default   0
) engine=MyISAM;


-- �·�����
drop table if exists ncsdowncom;
create table ncsdowncom (
    sid          int unsigned  primary key,    -- ���к�
    gtype        int unsigned  default 0,      -- ��� 0--ȫ��  1--��  2--���  3--����
    id           int unsigned  default 0,      -- �û�����ID
    name         char(64),                     -- ˵��
    commstr      text,                         -- ��������
    addtime      int  unsigned,                -- ����ʱ��
    expiretime   int  unsigned default 0,      -- ����ʧЧʱ��
    flags        int  default  1               -- 0--��Ч  1--��Ч
) engine=MyISAM;


-- ��־�ϴ���Ϣ
drop table if exists ncsuploadlog;
create table ncsuploadlog (
    sid          int unsigned  auto_increment primary key,    -- ���к�
    stime        int unsigned  default 0,      -- �ϴ�ʱ��
    did          int unsigned  default 0,      -- ��λID
    dispname     char(64),                     -- Ӫҵ������
    filename     char(128),                    -- �ļ���
    sumbytes     bigint unsigned  default 0,   -- �ֽ���
    errrecord    int   unsigned default 0,     -- �����¼
    optflags     int default 0                 -- ���� 1--�ϴ�  2--�´�  3--���ݵ��� 
) engine=MyISAM;
 create index ncsuploadlog1 on ncsuploadlog (did);


-- MAC��ַ��
drop table if exists ncsmac;
create table ncsmac (
    sid         int  unsigned  auto_increment primary key,
    mac         char(18) default '',         --  MAC��ַ
    did         int  unsigned  default 0,    --  ���ʹ�õ���������
    uid         int  unsigned,               --  ���ʹ����
    dispname    char(32),                    --  ʹ����
    lasttime    int  unsigned                --  ������ʱ��
) engine=MyISAM;

  create index ncsmac_index1 on ncsmac (mac);
  create unique index ncsmac_index2 on ncsmac (did,uid,mac);

-- ������־
drop table if exists ncsreportlog;
create table ncsreportlog (
    sid         int  unsigned  auto_increment primary key,
    reportname     char(100) default '', 
    filename       char(100),            
    stime         int  unsigned,
    flags         int unsigned       -- 1 �ص���ģ�����ɵı���         
) engine=MyISAM;


-- �ص�����־����������ݷ��͹���
drop table  if exists  ncsvidmon;
create table ncsvidmon (
    sid         int  auto_increment primary key,
    uflags     smallint,                        -- ������� 0-ȫ�� 1--����  2--�û���
    userid      int,                            -- ��λID, ��Ϊ0��ʾȫ��
    num         int,                            -- ���
    vid         int,                            -- ����������   ��Ӧncuseridclass �е�ID
    flags       int unsigned default 1           -- 1-���� 0-������   
) engine=MyISAM;

-- ����������
drop table if exists reporttask;
create table reporttask (
    sid         int  unsigned  auto_increment primary key,
    tname       char(64) default '',            --  ��������
    sdate       char(10),                       --  ͳ����ʼʱ��
    edate       char(10),                       --  ͳ�ƽ���ʱ��
    addtime    int  unsigned,                    --  ����ʱ��
    flags      int unsigned default 0            --  1Ϊ �ص���ģ��
) engine=MyISAM;
-- ����������ϸ
drop table if exists taskdet;
create table taskdet (
    sid         int  unsigned  auto_increment primary key,
    rpname     char(32),
    id          int unsigned,                   -- �ͱ�������ID����
    worktime    char(12) default '',            --  ��������
    sortby       char(12),                       --  ����
    gid          char(12),                       --  ����ID
    tid          char(12),                       --  ��λ��ID
    did          char(12),                       --  ��λID,
    opt          char(12),                       -- ͳ�ƶ���
    gname        char(32),                      -- ���Ű���
    cheIDW       char(255),                    -- ��ַ��ID,
    cheIDS       char(255)                     -- ����ID
) engine=MyISAM;
-- ���ⵥλ�� ���������ĵ�λ����ͳ��
drop table if exists ncsexcpgroup;
create table ncsexcpgroup (
    sid         int  unsigned  auto_increment primary key,
    ccode        char(16),                       -- ��λ����
    uid          int unsigned,                   -- ��λID
    dispname     char(64) default '',            --  ��λ����
    groupname     char(64)                      --  ��   
) engine=MyISAM;

-- �����ֻ�����
drop table if exists ncsmovdictel;
create table ncsmovdictel (
        sid      int   unsigned auto_increment primary key,
        name     char(32),
        waddr    char(64)               -- ��ַ
) engine=MyISAM;


-- ���±�Ϊ 2012/05/04 ����
-- - �ؼ������
--
drop table if exists nckeygroup;
create table nckeygroup (
    sid        int   unsigned     primary key,     -- ���ID
    name      char(64),                        -- ����
    memo     char(255),                       -- ˵��
    modtime   int unsigned default 0,             -- ����޸�ʱ��
    keytype    int  default 0,                   --
-- �ؼ������ 1---��ҳ���� 2-Url  3-Ip  4-�ʺ�
--            5--��������
    flags       int  unsigned default 0,              --  ��Դ
    status     int default 0               -- ʹ��״̬ 0-û����  1-����  9-ɾ��
) engine=MyISAM;

-- - �ؼ�������
drop table if exists nckeyword;
create table nckeyword (
    sid         int unsigned    auto_increment  primary key,    -- �ؼ������к�
    gid         int unsigned     default 0,      -- ��ID
    kid         int unsigned     default 0,      -- �ؼ�����ID
    keyword     char(128),                    -- �ؼ���
    modtime    int unsigned default 0,         -- ����ʱ��
    starttime    int unsigned default 0,          -- ��ʼʱ��
    endtime    int unsigned default 0,          -- ��ֹʱ��
    did         int unsigned default 0,         -- 0--���е�λ
    dtype       int default  0,                --  0-��λ 1-��λ���  2-��λ��
    status       int default 1                  -- 1 ����  0 -- ͣ�� 9--ɾ��
) engine=MyISAM;

create  UNIQUE index nckeyword_index on nckeyword (gid,keyword);

drop table if exists nchttpsnap;
create table nchttpsnap ( 
    did         int  unsigned,               -- ��λID
    uid         int  unsigned,               -- �û�Id     
    tid         int unsigned,        		   --  ��λ���
    udisp       char(32),                    --  �û���
    stime       int unsigned,                -- ʱ��
    rid         int unsigned ,               -- ��Ӧ�Ĺ���ID
    usid      int unsigned,                -- userlog�е�sid
    groupid   int unsigned,                -- ����ID
    sip       int unsigned,                -- Դ��ַ
    dip       int unsigned,                -- Ŀ���ַ
    dport     int unsigned,                -- Ŀ��˿�
    host      char(64),                   -- ����
    url       char(128),                   -- Url
    keyword   char(128),                   -- ���йؼ���
    htmlfile  char(64),                    -- Html�ļ�
    title     char(128),                   -- ��ҳ����
    ccode     int  default 0,              -- ��ҳ����
    flags     int  default 0               -- ��ʶ
    ) engine=MyISAM;



drop table if exists nchttpacclog;
create table nchttpacclog(
    did         int  unsigned,               -- ��λID
    uid         int  unsigned,               -- �û�Id     
    tid         int unsigned,        		   --  ��λ���
    udisp       char(32),                    --  �û���
    userid    int  unsigned default 0,           -- �û� ID
   	usid      int  unsigned,                  --  ��������ID
    mac      char(18),                       -- MAC��ַ
    sip       int  unsigned default 0,           -- ԴIP��ַ
    dip       int  unsigned default 0,           -- Ŀ��IP��ַ
    url       char(128),                       -- ���ʵ�url
    ntype   int  unsigned default 0,             -- ����������
    username  char(32),                       -- �û���
    dispname  char(32),                       -- ��ʾ��
    passwd    char(32),                       -- ����
    addtime   int  unsigned default 0            -- ����ʱ��
 ) engine=MyISAM;
create index nchttpacclog_ini on nchttpacclog(ntype,username);

--  ��Աע���¼

drop table if exists nchttpaccreg;
create table nchttpaccreg (
        did         int  unsigned,               -- ��λID
    	uid         int  unsigned,               -- �û�Id     
    	tid         int unsigned,        		   --  ��λ���
        userid    int  unsigned default 0,           -- �û� ID
    	udisp       char(32),                    --  �û���
        sip       int  unsigned default 0,           -- ԴIP��ַ
        dip       int  unsigned default 0,           -- Ŀ��IP��ַ
        mac        char(18),                    --  MAC��ַ
        email      char(64),                    -- �ʼ��ʺ�
        usid        int  unsigned,               --  ��������ID
        url       char(128),                       -- ���ʵ�url
        ntype   int  unsigned default 0,             -- ����������
        regid      char(32),                       -- ע��ID
        username  char(32),                       -- �û���
        dispname  char(32),                       -- ��ʾ��
        passwd    char(32),                       -- ����
        addtime   int  unsigned default 0,           -- ����ʱ��
        lasttime    int   unsigned default 0,       -- �������ʱ��
        flags       int     default 0             -- ������Դ 1-����POST 2-�Զ�
) engine=MyISAM;
create index nchttpaccreg_ini on nchttpaccreg(ntype,username);
-- - ��������ע���û���Ϣ
drop table if exists ncmwduser;
create table ncmwduser(
        sid         int auto_increment  primary key,   -- Sid, �Զ�����
        username        char(32),                      -- �ʺ�
        password        char(32),                      -- ����
        expiretime      int  unsigned default 0,       -- ��Ч��
        dispname        char(32),                      -- ����
        sex             char(1) default 'M',           -- �Ա�
        idtype          char(3) default '',            -- ֤�����
        idno            char(20) default '',           -- ֤������
        country         char(3)  default 'CHN',        -- ����
        addr            char(255) default '',          -- ��ַ
        mobile          char(20)  default '',           -- �ֻ���
        lasttime        int unsigned default 0          -- ������ʱ��
) engine=MyISAM;
create  UNIQUE index ncmwduser_index on ncmwduser (username,password);
create  index ncmwduser_index2 on ncmwduser (lasttime);

delete from ncpostaccount;

insert into ncpostaccount(fid,service,sname,url,account,passwd,email,regid,code,flags) values(8,20010,'discuz��̳','bbs.xtrb.cn','username','password','','loginsubmit',0,0);
insert into ncpostaccount(fid,service,sname,url,account,passwd,email,regid,code,flags) values(8,20010,'discuz��̳','/dz/','username','password','','loginsubmit',0,0);
insert into ncpostaccount(fid,service,sname,url,account,passwd,email,regid,code,flags) values(8,20010,'discuz��̳','/dz/','username','password','','loginfield',0,0);

insert into ncpostaccount(fid,service,sname,url,account,passwd,email,regid,code,flags) values(8,20010,'discuz��̳','/dz/','username','password','email','regsubmit',0,1);
insert into ncpostaccount(fid,service,sname,url,account,passwd,email,regid,code,flags) values(8,20010,'discuz��̳','/dz/','username','password','email','handlekey',0,1);

-- ��̨��̳
insert into ncpostaccount(fid,service,sname,url,account,passwd,email,regid,code,flags) values(8,20011,'��̨��̳','bbs.xtrb.cn','usernamee','passwordd12','emailll','regsubmit',0,1);
insert into ncpostaccount(fid,service,sname,url,account,passwd,email,regid,code,flags) values(8,20011,'��̨��̳','bbs.xtrb.cn','username','password','', 'handlekey',0,0);

insert into ncpostaccount(fid,service,sname,url,account,passwd,email,regid,code,flags) values(8,20010,'婱���̳','0513.org','username','password','','loginsubmit',0,0);

-- ����豸����ļ�ص�λ��Ϣ��һ̨���綽���ض�̨���綽�죩
drop table if exists ncsusersubcorp;
create table ncsusersubcorp (
    sid         int   primary key,              -- ����   
    userid      int  unsigned default 0,        -- ��λID
    username    char(16),                       -- ��¼��, ��λ���� ����������
    dispname    char(64),                       -- ��ʾ��
    address     char(128),                      -- ��ַ
    telphone    char(64),                       -- ��ȫ����ϵ�绰
    contact     char(32),                       -- ��Ϣ��ȫԱ
    handphone   char(32),                       -- ���˴���(������)�绰
    email       char(128) default ' ',          -- ��Ϣ��ȫԱE-Mail��ַ
    ceoname     char(30) default ' ',           -- ���˴���(������)
    postcode     char(6) default ' ',           -- �ʱ�
    endnum       char(6) default '0',           -- �ն���
    servernum  char(2)   default '0',           --  ��������
    empnum      char(6)  default '0',                        -- ��ҵ����
    area        char(70) default ' ',                       -- ��������
    areaman     char(30) default ' ',                       -- ����λ������
    areatel     char(30) default ' ',                       -- ����λ�����˵绰
    demo        char(255) default ' ',                      -- ��ע
    modtime     int  unsigned default 0,                   -- ����޸�ʱ��
    gtype       int     default 9               -- ��λ���  M20061001
                                                --  1-�Ƶ���� 2-ͼ��������� 3-ѧУ 4-���ֳ��� 5-һ����ҵ 
                                                --  9-����
) engine=MyISAM;

-- - ���Ա�
drop table if exists ncrule;
create table ncrule (
    sid         int unsigned   primary key auto_increment,      -- ����ID
    gid         int unsigned   default 0,        -- ������ID
    kid         int unsigned   default 0,        -- �ؼ�����ID
    modtime     int unsigned   default 0,        -- ����ʱ��
    starttime   int unsigned   default 0,        -- ��ʼʱ��
    endtime     int unsigned   default 0,        -- ��ֹʱ��
    status      int default  1                   -- 1 ����  0 -- ͣ�� 9--ɾ��
) engine=MyISAM;
-- - ����ά����    (��ʾ��)
drop table if exists ncruledef;
create table ncruledef (
    kid         int unsigned    primary key,    -- �ؼ�����ID ������ID��
    gid         int unsigned    default 0,      -- ������ID    82000-88000
    rname       char(128),                      -- ����������
    kname       char(128),                      -- �ؼ�������  (������)
    starttime   int unsigned    default 0,      -- ��ʼʱ��
    endtime     int unsigned    default 0,      -- ��ֹʱ��
    modtime     int unsigned    default 0,      -- ����ʱ��
    status      int default     1               -- 1 ����  0 -- ͣ�� 9--ɾ��
) engine=MyISAM;
-- ����sql����������ݿ⣬����������ά���á�
insert into ncruledef(kid,gid,rname,kname,modtime) values(1,82000,"��ֹ��ҳ�ؼ���","",0);
insert into ncruledef(kid,gid,rname,kname,modtime) values(2,83000,"��ֹ�û��鿴URL","",0);
insert into ncruledef(kid,gid,rname,kname,modtime) values(3,84000,"��ֹPOST","",0);
insert into ncruledef(kid,gid,rname,kname,modtime) values(4,85000,"�·��ص��ע�û���","",0);
insert into ncruledef(kid,gid,rname,kname,modtime) values(5,86000,"�·��ص��עIP","",0);
insert into ncruledef(kid,gid,rname,kname,modtime) values(6,87000,"�·��ص��ע����","",0);
insert into ncruledef(kid,gid,rname,kname,modtime) values(7,88000,"��ֹ������IP","",0);

-- - �������÷�Χ��   
drop table if exists ncrule_area;
create table ncrule_area (
    sid         int unsigned   primary key auto_increment,     -- ����
    gid         int unsigned   default 0,       -- ������ID
    kid         int unsigned   default 0,       -- �ؼ�����ID
    did         int unsigned   default 0,       -- 0--���е�λ            -- ��Ӧncsuser���userid
    dtype       int default    0,               --  0-��λ 1-��λ���  2-��λ��   4- �ֹܹ�������
    modtime     int unsigned   default 0,       -- ����ʱ��
    status      int default    1                -- 1 ����  0 -- ͣ�� 9--ɾ��
) engine=MyISAM;
create index ncrule_area_in on ncrule_area(sid);



-- - ���볧�Ҵ���ά��   
drop table if exists ncsfactorycod;
create table ncsfactorycod (
    sid          int unsigned   primary key, --  ����
    code         char(10),                   --  ����
    name         char(64),                   --  ��������
    slink        char(32) default '',        --  ��ȫ������ϵ��
    saddress     char(255) default '',       --  ��ȫ���̵�ַ
    stel         char(64) default '',        --  ��ϵ�绰
    smail        char(32) default ''         --  �ʼ���ַ
)engine=MyISAM;
create unique index ncsfactory_ind1 on ncsfactorycod(code);

-- ���ж��Ŵ���
drop table if exists ncscentersms;
create table ncscentersms (
    sid        int  unsigned  auto_increment primary key,
    mobno      char(24) default '',   -- �ֻ���
    mesg       char(255),             -- �������� 
    stime      int  unsigned,        -- �յ�����ʱ��
    fstime         int unsigned  default 0,      -- ����ʱ�䷢����ʱ��  
    iReturn       int unsigned default 0         -- ���ŷ��ͷ���ֵ     
) engine=MyISAM;


-- �ص����û������� 
drop table if exists ncszduser;
create table ncszduser (
    sid         int  unsigned auto_increment  primary key,   --  �û����кţ�������ϵͳ��Ψһ            
    dispname    char(32),                    --  ��ʾ��
    idcard      char(20) default ' ',        --  ���֤����
    mac         char(20) default '',         --  mac��ַ
    status      int default 1,               --  0 ͣ�� 1 ����
    modtime    int  unsigned default 0     --  ������ʱ��
)engine=MyISAM;


-- �ؼ��ֿ�鵵��־ 
drop table if exists ncskeywordlog;
create table ncskeywordlog (
    sid         int  unsigned auto_increment  primary key,   --  ���кţ�������ϵͳ��Ψһ 
    did         int,
    uid         int,    
    tid          int,       
    dispname    char(32),                    --  ��ʾ��
    idcard      char(20) default ' ',        --  ���֤����
    mac         char(20) default '',         --  mac��ַ
    idtype      char(3)  default '',         --  ֤������
    position    char(32) ,                   --  �����
    sip         char(16),                    --  ԴIP
    vtime       int,                        --   ����ʱ��
    kid         int,                        --   �ؼ�����ID,
    keyword     char(64),                   --   ���йؼ���
    subject     varchar(255),               --   ����
    content     text,                       --   ����
    url         char(128),                   --   url��IP
    descr       varchar(255),                --   ��ע
    flag        int default 0,              --  0 ������ 1-�к���Ϣ 2-������Ϣ
    type        int,                        --  1- �ʼ� 2-BBS 3-�������� 4-������־
    opname      char(32),                    --  ������
    optime      int                         -- ����ʱ��
)engine=MyISAM;

create index ncskeywordlog_in1 on ncskeywordlog(did);
create index ncskeywordlog_in2 on ncskeywordlog(kid);

-- ������ַ��鵵��־ 
drop table if exists ncssenurllog;
create table ncssenurllog (
    sid         int  unsigned auto_increment  primary key,   --  ���кţ�������ϵͳ��Ψһ 
    did         int,
    uid         int,      
    tid         int,     
    dispname    char(32),                    --  ��ʾ��
    idcard      char(20) default ' ',        --  ���֤����
    mac         char(20) default '',         --  mac��ַ
    idtype      char(3)  default '',         --  ֤������
    position    char(32) ,                   --  �����
    sip         char(16),                    --  ԴIP
    vtime       int,                        --   ����ʱ��
    kid         int,                        --   �ؼ�����ID,
    keyword     char(64),                   --   ���йؼ���
    host        varchar(64),                --   ��������
    urlid       int  default 0,             --   ����
    uri         varchar(128),               --   url��IP
    title       varchar(128),                --   ����
    opname      char(32) default '',                    --  ������
    optime      int default 0,                         -- ����ʱ��
    flag        int default 0              --  0 ������ 1-�к���Ϣ 2-������Ϣ
)engine=MyISAM;

create index ncssenurllog_in1 on ncssenurllog(did);
create index ncssenurllog_in2 on ncssenurllog(kid);

-- ����������ݿ�鵵��־ 
drop table if exists ncssennetidlog;
create table ncssennetidlog (
    sid         int  unsigned auto_increment  primary key,   --  ���кţ�������ϵͳ��Ψһ 
    did         int,
    uid         int,           
    tid         int,
    dispname    char(32),                    --  ��ʾ��
    idcard      char(20) default ' ',        --  ���֤����
    mac         char(20) default '',         --  mac��ַ
    idtype      char(3)  default '',         --  ֤������
    position    char(32) ,                   --  �����
    sip         char(16),                    --  ԴIP
    vtime       int,                        --   ����ʱ��
    kid         int,                        --   �ؼ�����ID,
    keyword     char(64),                   --   ���йؼ���
    ntype       int unsigned,                --   ����������
    netid       char(64),                    --    �������
    dip         char(16),      --   Ŀ��IP
    fun         int unsigned,                 --   1--��¼  2--�˳�
    opname      char(32) default '',                    --  ������
    optime      int default 0,                        -- ����ʱ��
    flag        int default 0              --  0 ������ 1-�к���Ϣ 2-������Ϣ
)engine=MyISAM;

create index ncssennetidlog_in1 on ncssennetidlog(did);
create index ncssennetidlog_in2 on ncssennetidlog(kid);

-- �ص��û������߹鵵��־ 
drop table if exists ncssenuserlog;
create table ncssenuserlog (
    sid         int  unsigned auto_increment  primary key,   --  ���кţ�������ϵͳ��Ψһ 
    did         int,
    uid         int,
    tid         int,           
    dispname    char(32),                    --  ��ʾ��
    idcard      char(20) default ' ',        --  ���֤����
    mac         char(20) default '',         --  mac��ַ
    idtype      char(3)  default '',         --  ֤������
    position    char(32) ,                   --  �����
    sip         char(16),                    --  ԴIP
    vtime       int,                        --   ����ʱ��
    keyword     char(64),                   --   ���йؼ���
    fun         int unsigned,              --    1--���� 2--����
    opname      char(32) default '',                    --  ������
    optime      int  default 0,                       -- ����ʱ��
    flag        int default 0                --     0 ������ 1-�к���Ϣ 2-������Ϣ
)engine=MyISAM;
create index ncssenuserlog_in1 on ncssenuserlog(did);

-- ������Ϣ��� 
drop table if exists ncslogistlog;
create table  ncslogistlog (
    sid         int  unsigned auto_increment  primary key,   --  ���кţ�������ϵͳ��Ψһ 
    did         int,
    uid         int,     
    tid         int default 0,                        --   ��ID      
    dispname    char(32),                    --  ��ʾ��
    idcard      char(20) default ' ',        --  ���֤����
    mac         char(20) default '',         --  mac��ַ
    idtype      char(3)  default '',         --  ֤������
    position    char(32) ,                    --  �����
    sip         char(16),                     --  ԴIP
    vtime       int,                          --   ����ʱ��
    url         varchar(128),                 --   URL��ַ
    ddno        char(20),                     -- ������
    mfrom        varchar(64),                   --   ������
    fromadress  varchar(128),                  --   �����˵�ַ
    fromtel     varchar(20),                   --   �����˵绰
    mto          varchar(64),                   --   �ռ���
    toaddress   varchar(128),                  --   �ռ��˵�ַ
    totel       varchar(20),                   --   �ռ��˵绰
    email       varchar(64)                    --   �ʼ���ַ
)engine=MyISAM;
create index ncslogistlog_in1 on ncslogistlog(did);
create index ncslogistlog_in2 on ncslogistlog(vtime);


drop table if exists ncslastinfo_v4;
create table ncslastinfo_v4 (
    name char(16)  NOT NULL  DEFAULT '',
    lasttime bigint ,
    PRIMARY KEY(name)) engine=MyISAM;

drop table if exists dstool_v4;
create table dstool_v4 (
    sid  int auto_increment primary key,
    tname  char(32),                       -- ���߰�ť����
    id   int                               -- ϵͳ�û�ID
    ) engine=MyISAM;

drop table if exists dstoolsy_v4;
create table dstoolsy_v4 (
    sid  int auto_increment primary key,
    tname  char(32),                       -- ���߰�ť����
    id   int                               -- ϵͳ�û�ID
    ) engine=MyISAM;



insert into ncslogistlog (did,uid,tid,dispname,idcard,sip,vtime,url,ddno,mfrom,fromadress,fromtel,mto,toaddress,totel,email) values(10,10,1,'dispname','idcard','192.168.20.38',1367424000,'cart.jd.com','ddno','mfrom','fromadress','fromtel','�����','�н�·879��������԰20��¥4���Ϻ�������','1304332222','email');
-- insert into ncsnetid_if (servicecode,username,dispname,mac,position,idno,idtype,did,tid,uid,sip,ntype,name,lasttime) (select servicecode,username,dispname,mac,position,idno,idtype,did,tid,uid,sip,ntype,name,stime from ncsnetlog_if_201305 group by servicecode,username,dispname,mac,position,idno,idtype,did,tid,uid,sip,ntype,name);

drop table if exists ncsuser_att;
create table ncsuser_att (
    userid  int,
    tw_shflag  int default 0                      -- ������� 0 ����� 1-���ͨ��
 ) engine=MyISAM;
 
 create index ncsuser_att_1 on ncsuser_att(userid);
 
 -- - ����������ά��   
drop table if exists ncsuser_lb;
create table ncsuser_lb (
    sid         int unsigned   primary key auto_increment,     -- ����
    code         char(10),       -- ����
    name         char(64)                       -- �����������
)engine=MyISAM;

insert into ncsuser_lb(code,name) values('10','����');
insert into ncsuser_lb(code,name) values('21','�õ������');
insert into ncsuser_lb(code,name) values('22','ͼ���������');
insert into ncsuser_lb(code,name) values('23','������������');
insert into ncsuser_lb(code,name) values('24','��������');
insert into ncsuser_lb(code,name) values('25','����ҵ��λ');

insert into ncsuser_lb(code,name) values('26','��רԺУ');
insert into ncsuser_lb(code,name) values('27','��רԺУ');
insert into ncsuser_lb(code,name) values('28','��Сѧ');
insert into ncsuser_lb(code,name) values('29','����Ӫҵ��������');


 -- - �ؼ����·�   
drop table if exists ncskeyword_procy;
create table ncskeyword_procy (
    sid         int unsigned   primary key auto_increment,     -- ����
    kid         int unsigned default 0,                        -- �ؼ�����ID ncskeycont�е�tid
    ktype       int unsigned default 0,                        -- 0 �ؼ��� 1-��ַ 2-������� 3-�û�������� ��������֤���š�mac��ַ�� 
    ids         text,                                          -- �������ID���� ���ŷָ� ����1-04,1-02,2-110002  �������   2-��λ 1-��λ��� 3-��λ�� 0-ȫ��
    validtime   int unsigned,                                 -- ʧЧʱ��
    stime       int unsigned,                                 -- �·�ʱ��
    addtime     int unsigned,                                 -- ���ʱ��
    opname      char(32)                                     -- ����Ա 
)engine=MyISAM;

-- �����շ���־
drop table if exists ncssmslog;
create table ncssmslog (
    sid         int unsigned   primary key auto_increment,     -- ����
    no         char(20),                                       -- �ֻ���
    sn         char(20),                                       -- 0 ��Ʒ���к�
    scode      char(20),                                       -- ��������
    stime      int,                                              -- ʱ��  
    sms        char(32),                                          --  ���ų���
    flag      int default 0,                                       -- 0�ɹ� -1 ���ɹ� -999 tcp��ͨ -888����
    message   varchar(128)                                         -- ��������
)engine=MyISAM;

create index ncssmslog_in1 on ncssmslog(no);



 -- - ͳ��ÿ�����ŵ�λ�û���   
drop table if exists ncsclient_enduserstat;
create table ncsclient_enduserstat (
    userid         int unsigned ,     -- ��λ
    groupid         int unsigned default 0,                        -- ��ID
    lcount       int unsigned default 0
)engine=MyISAM;

-- insert into ncsclient_enduserstat(userid,groupid,lcount) select a.userid,a.groupid,count(a.userid) from ncsuser a,ncsenduser b where a.userid=b.did and a.groupid!=0  group by a.groupid,a.userid;


 -- - ͳ�����������־��������  
drop table if exists ncs_twlog;
create table ncs_twlog (
    stime         int unsigned ,     -- ʱ��
    lcount        int unsigned default 0,                        -- ��¼��
    type_desc     char(64),                                       -- ��־����
    servicecode   char(16),
    filename      char(80) default ''                                        --  �ļ���
)engine=MyISAM;
create index ncs_twlog_in1 on ncs_twlog(stime);
create index ncs_twlog_in2 on ncs_twlog(servicecode);

-- ������־
drop table if exists ncsreportlog;
create table ncsreportlog (
    sid         int  unsigned  auto_increment primary key,
    reportname     char(100) default '', 
    filename       char(100),            
    stime         int  unsigned,
    flags         int unsigned       -- 1 �ص���ģ�����ɵı���         
) engine=MyISAM;

-- ���ͳ��
drop table if exists ncadlog;
create table ncadlog(
    sid         int  unsigned  auto_increment primary key,
    url     char(128) default '', 
    ncname       char(36), 
    username     char(32),
    sip          char(16),           
    lasttime         int  unsigned,
    lcount         int unsigned
) engine=MyISAM;
create index ncadlog2 on ncadlog(lasttime);

-- �Ƶ������û�   ����ı����ڽ���һ�´��ĳ����4S���û�ͬ����Ϣ
drop table  if exists nchoteluser; 
create table nchoteluser (
    sid         int  unsigned  auto_increment primary key,
    username    char(32),               -- �ʺ� �����+���֤�ź���λ
    password    char(32),               -- ��֤����    ���֤�ź���λ
    slgbm       char(18),               -- �ùݱ���
    dispname    char(32),               --  ����
    position    char(32)  default ' ',       -- ����� �ɷ���źʹ�λ�����
    idfytype      char(3)  default ' ',          -- ֤�������� 11 ���֤ 15ѧ��֤ 90����֤ 91����֤ 92ʿ��֤ 93���ڱ� 94���� ̨��֤95 ͬ��֤96 ����֤��99
    idfyno        char(18) default ' ',          -- ֤������
    famaddr      char(150) default ' ',        -- ��ͥסַ
    country       char(3)  default ' ',        -- ��������
    mobile        char(18) default  '',        -- �绰����
    sex           char(8) default ' ',
    lasttime       int default 0,            -- ����޸�ʱ��
    exitflag       int default 0,            -- �˷���־��1-Ϊ���˷���0-����
    intime        int default 0,            -- ס��ʱ��
    outtime       int default 0,             -- ���ʱ��     ���expiretime
    ip            char(16),
    mac           char(20)        
 ) engine=MyISAM;
 
 create index nchoteluser_index1 on nchoteluser(slgbm);
 
drop table  if exists ncsusbkeyuser;                  -- ��̨usbkey��Ӧ�û�
create table ncsusbkeyuser (
    sid         int  unsigned  auto_increment primary key,
    kid      char(32),               -- usbkeyid
    dispname char(32),             -- ʹ����
    dwname   char(100),            -- ��λ
    mobile   char(32),             -- ��ϵ�绰
    demo     char(200),            -- ��ע
    flag     int default 0         -- 0 ���� 1-���� 
  
 ) engine=MyISAM;
 create index ncsusbkeyuser_index1 on ncsusbkeyuser(kid);
 
 
drop table  if exists ncsusbkeylog;                  -- ��̨usbkeyά����־
create table ncsusbkeylog (
    sid         int  unsigned  auto_increment primary key,
    kid      char(32),               -- usbkeyid
    dispname char(32),             -- ʹ����
    servicecode char(16),          -- ��������
    dwname      char(100),         -- ��λ����
    address     char(128),         -- ��λ��ַ
    endnum        char(10),          -- �ն�����
    oemname       char(32),         --  ����������
    oemtel        char(20),         --  �����˵绰
    idno          char(20),         --   ������֤������
    aqname        char(32),         --  ��ȫԱ����
    aqtel         char(32),         --  ��ȫԱ�绰
    yhxz          char(6) default '��λ',          --    ��λ ����
    hylb          char(4) default '25',        --  25 ����ҵ��λ  21 ���ݾƵ� 24 �������� 99 ���� 26-ѧУ
    star          char(4) default '',          --  �Ƶ��Ǽ�
    fws           char(32),                    -- ���������
    swfs         char(16),             -- 08  ���� 09- ����+���� 01 -����
    ip           char(16),             -- IP��ַ
    sn           char(20),             -- ��Ʒ���к�
    netflag      char(16),             -- ��֤��ʽ
    httpcount    int default 0,        -- http��
    ipcount      int default 0,        -- ipcount��
    formcount    int default 0,        --  ����
    mailcount    int default 0,        --  �ʼ���
    stime        int default 0         --  ��¼ʱ��    
 ) engine=MyISAM;
 create index ncsusbkeylog_index1 on ncsusbkeylog(kid);
 create index ncsusbkeylog_index2 on ncsusbkeylog(stime);
 create index ncsusbkeylog_index3 on ncsusbkeylog(servicecode);
 
 
drop table if exists ncsrvgroupap;
create table  ncsrvgroupap (
    portalname          char(32),
    gwid               char(32),
    mac                char(18)  default ' ',          -- AP��MAC��ַ
    groupid            int unsigned default 0,         -- ��Ӧ�ĵ�λID
    address            char(255) default ' ',          -- ��װ��ַ
    model              char(16)  default ' ',
    version            char(16)  default ' ',
    mark               char(64)  default ' ',          -- ��ǩ
    longitude          double default 0,               -- λ�ã����ȣ�
    latitude           double default 0,               -- λ��(γ��)
    addtime            int unsigned default 0,         -- ����ʱ��
    lasttime           int unsigned default 0,         -- ���ʹ��ʱ��
    flags              int                             -- 1 ����ʹ��   0--δ��ͨ
) max_rows=1000000000 avg_row_length=256 engine=MyISAM;

create index ncsrvgroupap_i1 on ncsrvgroupap (groupid);
create unique index ncsrvgroupap_i2 on ncsrvgroupap (portalname,gwid); 

-- Macͳ����Ϣ
drop table if exists ncsrvmaclog;
create table ncsrvmaclog (
    pname            char(32),                                -- Portal Name
    mac              char(18),                                -- Mac��ַ
    apmac            char(18),                                -- AP Mac��ַ
    groupid          int unsigned default 0,                  -- ��λID
    groupcode        char(32),                                -- ��λ����
    mark             char(64)     default ' ',                -- ��ǩ
    lrssi            int          default 0,
    urssi            int          default 0,
    starttime        int unsigned default 0,                  -- ��ʼʱ��
    endtime          int unsigned default 0,                  -- ����ʱ��
    flag             int default 0                            --
) engine=MyISAM;




create index ncsrvmaclog_ind1 on ncsrvmaclog(pname);
create index ncsrvmaclog_ind2 on ncsrvmaclog(mac);
create index ncsrvmaclog_ind3 on ncsrvmaclog(apmac);
create index ncsrvmaclog_ind4 on ncsrvmaclog(starttime);
create index ncsrvmaclog_ind5 on ncsrvmaclog(mark);


-- �������ÿ��ͳ������
drop table if exists ncsnetidstatday;
create table ncsnetidstatday (
    service    int default 0,                    --  ����
    sdate      char(10),                         --  ����
    lcount     int unsigned default 0,           --  ��¼��
    did        int default 0                     --  ��λID
)engine=MyISAM;;
create index ncsnetidstatday_1 on ncsnetidstatday (sdate);

-- ������ÿ��ͳ������
drop table if exists ncsuserlogstatday;
create table ncsuserlogstatday (
    sdate      char(10),                         --  ����
    lcount     int unsigned default 0,           --  ��¼��
    did        int default 0                     --  ��λID
)engine=MyISAM;
create index ncsuserlogstatday_1 on ncsuserlogstatday (sdate);


drop table if exists ncsmaclog_if;
create table ncsmaclog_if (
    servicecode char(18)      default ' ',                 -- �����˱���
    servicename char(64)      default ' ',                 -- ����������
    address     char(64)      default ' ',                 -- ��װλ��
    mac         char(18)      default ' ',                 -- Mac��ַ
    apname      char(32),                                  -- AP����
    apmac       char(18),                                  -- APMac��ַ
    lrssi       int  default 0,                            -- ��ʼ��ǿ
    urssi       int  default 0,                            -- �뿪��ǿ
    ssid        char(64)      default ' ',                 -- SSID,������ö��ŷָ�    
    plate       char(32)      default ' ',                 -- �������
    line        char(32)      default ' ',                 -- ��ͨ��·����
    mapid       char(32)      default ' ',                 -- ��ͼ��ʶ(����ֵ���ڣ�����ά��Ϊ�룬x,y����
    longitude   char(16)      default ' ',                 -- ����
    latitude    char(16)      default ' ',                 -- ά��
    sendtime         int unsigned default 0,
    starttime        int unsigned default 0,               -- ����ʱ��
    endtime          int unsigned default 0,               -- �뿪ʱ��
    flag             int default 0                         -- 0--����  1--�뿪
) engine=MyISAM;


-- ��������
drop table  if exists ncssyscontrol; 
create table ncssyscontrol (
    sid         int auto_increment primary key,     -- ���к� 
    cfrom       char(16) default ' ',               -- ָ����Դ
    funname     char(16) default ' ',               -- ִ�й���
    stime       int unsigned default 0,             -- ʱ��
    command     char(255) default ' ',              -- ����
    timeout     int unsigned default 0,             -- ��ʱʱ��
    message     char(255) default ' ',              -- ��Ϣ
    checksum    char(32)   default ' '              -- md5(time+funname)
 ) engine=MyISAM;

-- ״̬ͳ�Ʊ�
drop table  if exists ncssyscontrol; 
create table ncssyscontrol (
    sid         int auto_increment primary key,     -- ���к� 
    cfrom       char(16) default ' ',               -- ָ����Դ
    funname     char(16) default ' ',               -- ִ�й���
    stime       int unsigned default 0,             -- ʱ��
    command     char(255) default ' ',              -- ����
    timeout     int unsigned default 0,             -- ��ʱʱ��
    message     char(255) default ' ',              -- ��Ϣ
    checksum    char(32)   default ' '              -- md5(time+funname)
 ) engine=MyISAM;
-- ͳ�����������������ֻ��û������ֻ��ŷǷ���֤���ŷǷ�����MAC��ַ�Ƿ���
drop table if exists ncsservicestat;       -- ����ͳ��
create   table ncsservicestat (
    sid        int auto_increment primary key,     -- ���к� 
    stime      int unsigned,  -- ��¼ʱ��
    servicecode char(20),    -- ��������
    ucount     int unsigned default 0,             --   ������¼��
    mobcount     int unsigned default 0,           --    �ֻ��ż�¼��
    idcount    int unsigned default 0,             --    ���֤�ż�¼��
    mcount_e   int unsigned default 0,             --    �ֻ��ŷǷ���
    idcount_e  int unsigned default 0,             --    ���֤�ŷǷ���
    maccount_e int unsigned default 0              --    mac��ַ�Ƿ���
) ENGINE=MyISAM;
create index ncsservicestat_1 on ncsservicestat (stime);
create index ncsservicestat_2 on ncsservicestat (servicecode);


-- AP��Ϣ����, ��ԭ�л����������޸� 2015/04
drop table if exists ncaplist;
create table if not exists ncaplist (
    apname      char(21)      primary key,                 -- AP�豸���
    servicecode char(18)      default ' ',                 -- �����˱���
    servicename char(64)      default ' ',                 -- ����������
    did         int  unsigned default 0,                   -- ������ID
    version     char(16)      default ' ',                 -- �汾��
    model       char(16)      default ' ',                 -- �豸�ͺ�
    devid       char(32)      default ' ',                 -- �豸ID
    ip          char(16)      default ' ',                 -- IP��ַ
    mac         char(64)      default ' ',                 -- AP MAC��ַ,������ö��ŷָ�,һ��AP���ܻ��Ӧ���MAC��ַ
    ssid        char(64)      default ' ',                 -- SSID,������ö��ŷָ�    
    address     char(64)      default ' ',                 -- ��װλ��
    plate       char(32)      default ' ',                 -- �������,���ƺ���
    line        char(32)      default ' ',                 -- ��ͨ��·���ƣ�������·
    mapid       char(32)      default ' ',                 -- ��ͼ��ʶ(����ֵ���ڣ�����ά��Ϊ�룬x,y����
    longitude   char(11)      default ' ',                 -- ����
    latitude    char(11)      default ' ',                 -- ά��
    starttime   int unsigned  default 0,                   -- ��ʼʱ��
    lasttime    int unsigned  default 0,                   -- ���ʹ��ʱ��
    bpflasttime int unsigned  default 0,                   -- Bpf���ʱ��
    cursrvbpfrule char(255)   default 0,                   -- Bpf���ͬ������
    flags       int default 1                              -- 0--����  1--����
);
