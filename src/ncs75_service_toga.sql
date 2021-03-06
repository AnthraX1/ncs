-- 网络身份类别
drop table if exists ncsnettype_toga;
create table ncsnettype_toga (
    ntype       int  unsigned primary key,   --  身份类别ID
    name        char(32),                    --  名称
    gaid        int  unsigned
 
);

-- 虚拟账号
delete from ncsnettype_toga;
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'HTTP_POST',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'HTTP_GET',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'WAP_POST',1000003);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'WAP_GET',1000004);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'其它HTTP',1009999);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'SMTP',1010001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'POP3',1010002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'WEBMAIL',1010003);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'IMAP',1010005);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'邮件新闻组',1010007);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'其他邮件',1019999);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'QQ',1030001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'ICQ',1030002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'YahooMsg',1030003);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'AOL',1030004);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'MSN',1030005);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'IRC',1030006);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'PP点点通',1030007);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'SOQ 搜Q',1030008);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'UCSina',1030009);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'POPO网易泡泡',1030010);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'BEE小蜜蜂',1030011);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'UUT',1030012;
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'新浪通(IRC)',1030013);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'IMU',1030014);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'卡盟(KAMUN)',1030015);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'快递通(KDT)',1030016);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'策骑(CHATKEY)',1030017);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000001);
insert into ncsnettype_toga (ntype,name,gaid) values (2001,'联众游戏',1000002);