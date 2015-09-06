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

insert into dsroleattr(roleid,pasid,flags,lright)values(101,1004,0,'dwgl_s');
insert into dsroleattr(roleid,pasid,flags,lright)values(101,1004,0,'ap_s');
insert into dsroleattr(roleid,pasid,flags,lright)values(101,1004,0,'fac_s');
insert into dsroleattr(roleid,pasid,flags,lright)values(101,1004,0,'dwzgl_s');
insert into dsroleattr(roleid,pasid,flags,lright)values(101,1004,0,'cslb_s');

insert into dsroleattr(roleid,pasid,flags,lright)values(101,1004,0,'��־�鿴');
insert into dsroleattr(roleid,pasid,flags,lright)values(101,1004,0,'authlog_s');
insert into dsroleattr(roleid,pasid,flags,lright)values(101,1004,0,'smslog_s');

insert into dsroleattr(roleid,pasid,flags,lright)values(101,1004,0,'ϵͳ����');
insert into dsroleattr(roleid,pasid,flags,lright)values(101,1004,0,'rightrole');
insert into dsroleattr(roleid,pasid,flags,lright)values(101,1004,0,'adminuser');
insert into dsroleattr(roleid,pasid,flags,lright)values(101,1004,0,'operlog');

insert into dsroleattr(roleid,pasid,flags,lright)values(101,1004,0,'�˳�ϵͳ');
insert into dsroleattr(roleid,pasid,flags,lright)values(101,1004,0,'���з���');
insert into dsroleattr(roleid,pasid,flags,lright)values(101,1004,0,'sszxl_s');
insert into dsroleattr(roleid,pasid,flags,lright)values(101,1004,0,'lbzxl_s');
insert into dsroleattr(roleid,pasid,flags,lright)values(101,1004,0,'zxdw_s');
insert into dsroleattr(roleid,pasid,flags,lright)values(101,1004,0,'lxdw_s_s');
insert into dsroleattr(roleid,pasid,flags,lright)values(101,1004,0,'whdw_s');
insert into dsroleattr(roleid,pasid,flags,lright)values(101,1004,0,'tydw_s');

insert into dsroleattr(roleid,pasid,flags,lright)values(101,1004,0,'ͳ�Ʊ���');
insert into dsroleattr(roleid,pasid,flags,lright)values(101,1004,0,'�������ͳ��');
insert into dsroleattr(roleid,pasid,flags,lright)values(101,1004,0,'xnsf_s');
insert into dsroleattr(roleid,pasid,flags,lright)values(101,1004,0,'��������ͳ��');
insert into dsroleattr(roleid,pasid,flags,lright)values(101,1004,0,'users_s');

insert into dsroleattr(roleid,pasid,flags,lright)values(101,1004,0,'ϵͳ����');
insert into dsroleattr(roleid,pasid,flags,lright)values(101,1004,0,'statusset');
insert into dsroleattr(roleid,pasid,flags,lright)values(101,1004,0,'logsave');
insert into dsroleattr(roleid,pasid,flags,lright)values(101,1004,0,'logftppar');
insert into dsroleattr(roleid,pasid,flags,lright)values(101,1004,0,'warnoffpar');

insert into dsroleattr(roleid,pasid,flags,lright)values(101,1004,0,'���볧�̹���');
insert into dsroleattr(roleid,pasid,flags,lright) values(101,1004,0,'csyxzt');

insert into dsroleattr(roleid,pasid,flags,lright)values(101,1004,0,'�ն�������Ϣ');
insert into dsroleattr(roleid,pasid,flags,lright)values(101,1004,0,'�ȵ���Ϣ');

insert into dsroleattr(roleid,pasid,flags,lright)values(101,1004,0,'�ƶ�AP�켣');

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


insert into ncsuser_lb(code,name) values('1','�ù���');
insert into ncsuser_lb(code,name) values('2','ͼ���������');
insert into ncsuser_lb(code,name) values('3','������ѵ����');
insert into ncsuser_lb(code,name) values('4','���ֳ�����');
insert into ncsuser_lb(code,name) values('5','��ͨ��Ŧ');
insert into ncsuser_lb(code,name) values('6','������ͨ����');

insert into ncsuser_lb(code,name) values('7','����������');
insert into ncsuser_lb(code,name) values('8','���ڷ�����');
insert into ncsuser_lb(code,name) values('9','����');
insert into ncsuser_lb(code,name) values('A','���ﳡ��');
insert into ncsuser_lb(code,name) values('B','����������');
insert into ncsuser_lb(code,name) values('C','�Ļ�������');
insert into ncsuser_lb(code,name) values('D','�������г���');


drop table if exists ncswhlog;       -- ά����¼
create   table ncswhlog (
    sid        int auto_increment primary key,     -- ���к� 
    stime      int unsigned,  -- ��¼ʱ��
    servicecode char(20),    -- ��������
    servicename char(64),    -- ��������
    did        int unsigned,   -- ����ID
    mesg       char(255),       -- ά������
    fcode      char(16),        -- ���̴���
    wman       char(32),         -- ά���� 
    flag       int default 0    -- 0 �ָ����� 1-ά��  
) ENGINE=MyISAM;
create index ncswhlog_1 on ncswhlog (stime);
create index ncswhlog_2 on ncswhlog (fcode);

drop table if exists ncsmessage;
create   table ncsmessage (
    sid     int unsigned auto_increment primary key,
    send_time  int unsigned default 0,         -- ����ʱ��
    message_title  char(255),                  -- ��Ϣ����
    message_content text,                      -- ��Ϣ����
    mfrom char(16),                            -- ���ͷ�
    mto char(16),                               -- ���շ�
    flag int default 0                         -- 0 δ�� 1-�Ѷ�
) engine=MyISAM;


create table if not exists ncipindex_ga (
 code      char(4)      primary key,
 name      char(30) 
)  engine=MYISAM max_rows=1000000000 avg_row_length=1500;

insert into ncipindex_ga(code,name) value ('01','HTTPЭ��');
insert into ncipindex_ga(code,name) value ('02','WAPЭ��');
insert into ncipindex_ga(code,name) value ('03','SMTPЭ��');
insert into ncipindex_ga(code,name) value ('04','POP3Э��');
insert into ncipindex_ga(code,name) value ('05','IMAPЭ��');
insert into ncipindex_ga(code,name) value ('06','NNTPЭ��');
insert into ncipindex_ga(code,name) value ('07','FTPЭ��');
insert into ncipindex_ga(code,name) value ('08','SFTPЭ��');
insert into ncipindex_ga(code,name) value ('09','TELNETЭ��');
insert into ncipindex_ga(code,name) value ('10','HTTPSЭ��');
insert into ncipindex_ga(code,name) value ('11','RSTPЭ��');
insert into ncipindex_ga(code,name) value ('12','MMSЭ��');
insert into ncipindex_ga(code,name) value ('13','WEPЭ��');
insert into ncipindex_ga(code,name) value ('14','WPAЭ��');
insert into ncipindex_ga(code,name) value ('15','PPTPЭ��');
insert into ncipindex_ga(code,name) value ('16','L2TPЭ��');
insert into ncipindex_ga(code,name) value ('17','SOCKSЭ��');
insert into ncipindex_ga(code,name) value ('18','Compo');