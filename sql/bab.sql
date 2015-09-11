----������Ϊ���Ա�
drop table if exists ncbabtask;
create table ncbabtask (
    cid          int unsigned  auto_increment primary key,  --  ����
    groupid      int unsigned,     -- ������ID,�����û�Ȩ��
    starttime    int unsigned,     -- ��ʼʱ��
    endtime        int unsigned,     --  ����ʱ��
    taskname     char(64),           -- ��������
    taskdesc     char(255),          -- ��������
	dids         char(255) default '', -- ��������ĳ���ID�����Զ��,���ŷָ� ��Ϊȫ��
    mac          char(20),             -- ��MAC
    opname       char(32),           -- ����Ա
    optime       int unsigned,        -- ����Ա����ʱ��
    modtime      int unsigned,        -- ����Ա������ʱ��
    reoporttime  int unsigned  default 0,     -- �����¼����ʱ��
    updatetime   int unsigned  default 0,      -- ״̬����ʱ��
    flag       int unsigned default 0     -- ����״̬ 0-���� 1-ʧЧ 2-����
) engine=InnoDB;

/*
----������Ϊ���Գ�����ϵ��
drop table if exists ncbabtaskzone;
create table ncbabtaskzone (
	cid          int unsigned,     -- ����id
    servicecode   char(32)      -- ��������
) engine=InnoDB;
create unique index uqidx_ncbabtaskzone_cid_servicecode on ncbabtaskzone(cid,servicecode); 
ALTER TABLE ncbabtaskzone ADD CONSTRAINT fk_ncbabtaskzone_cid FOREIGN KEY (cid) REFERENCES ncbabtask(cid) ON DELETE CASCADE ON UPDATE CASCADE;


----ͳ�Ƹ���mac�ڲ�ͬʱ��γ��ִ�����ǰ20λ
drop table if exists ncbabappearrank;
create table ncbabappearrank (
	cid          int unsigned,     -- ����id
	mac          char(20),             -- ����MAC    
    appearcount   int unsigned default 0  -- ������ִ��� 
) engine=InnoDB;
create unique index uqidx_ncbabappearrank_cid_mac on ncbabappearrank(cid,mac); 
ALTER TABLE ncbabappearrank ADD CONSTRAINT fk_ncbabappearrank_cid FOREIGN KEY (cid) REFERENCES ncbabtask(cid) ON DELETE CASCADE ON UPDATE CASCADE;


----ͳ��ÿ�����������Ӧ��mac��ͳ����Ϣ������ͬmac���ֵĸ��� 
drop table if exists ncbabplacecount;
create table ncbabplacecount (
	cid          int unsigned,     -- ����id
	servicecode   char(32),     -- ��������
    maccount   int unsigned default 0  -- ��ͬmac���� 
) engine=InnoDB;
create unique index uqidx_ncbabplacecount_cid_mac on ncbabplacecount(cid,servicecode); 
ALTER TABLE ncbabplacecount ADD CONSTRAINT fk_ncbabplacecount_cid FOREIGN KEY (cid) REFERENCES ncbabtask(cid) ON DELETE CASCADE ON UPDATE CASCADE;

*/

----ͳ��ÿ�������ڸ���ʱ��Ρ��������ļ���mac 
drop table if exists ncbabplacetimemac;
create table ncbabplacetimemac (
	cid          int unsigned,     -- ����id
	servicecode   char(32),     -- ��������
	---timestr       char(20),     -- ʱ��2015080112
    mac   char(20),  -- ����mac
	starttime    int unsigned,     -- ��ʼʱ��
    endtime        int unsigned,     --  ����ʱ��
) engine=InnoDB;
create unique index uqidx_ncbabplacetimemac_cid_servicecode_timestr_mac on ncbabplacetimemac(cid,servicecode,timestr,mac); 
ALTER TABLE ncbabplacetimemac ADD CONSTRAINT fk_ncbabplacetimemac_cid FOREIGN KEY (cid) REFERENCES ncbabtask(cid) ON DELETE CASCADE ON UPDATE CASCADE;
