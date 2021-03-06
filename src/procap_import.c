/*
     Modify 2015/8/14   by zyn*/
#define PAS_SRCFILE      9888
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/stat.h>
#include <string.h>
#include <locale.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <netdb.h>
#include <sys/time.h>
#include "utoall.h"
#include "utoplt01.h"
#include "pasdb.h"
#include "dsutl.h"
#include "dsclt.h"
#include "ncsdef.h"
#include "ncapi.h"
#include"dlfcn.h"
#include <time.h>
#define MAX_TIMEOUT_SECONDS (15*60)

static char *getDsGroupids()
{
    static char caReturn[1024];
    char caIds[1024], caTempid[1024];
    char caOpt[256];
    int iReturn, lId, iNum;
    pasDbCursor *psCur;
    memset(caReturn, 0, sizeof(caReturn));
    lId = 0;

    iReturn = dsCltGetMyInfo(1, "Userid", &lId);
    //printf("dsiReturn=%d\n", iReturn);
    if(iReturn != 0 || lId <= 0)
    {
        return &caReturn[0];
    }

    memset(caOpt, 0, sizeof(caOpt));
    pasDbOneRecord("select opt from dsuser where id=:id", 1, "id", UT_TYPE_LONG, lId, UT_TYPE_STRING, 255, caOpt);
    if(strstr(caOpt, "all"))
    {
        return &caReturn[0];
    }



    sprintf(caReturn, "%s", caOpt);
    sprintf(caIds, "%s", caOpt);

    while(strlen(caIds) > 0)
    {
        memset(caTempid, 0, sizeof(caTempid));
        iNum = 0;
        //printf("select groupid from ncsgroup where pid in(%s)\n ", caIds);
        psCur = pasDbOpenSqlF("select groupid from ncsgroup where pid in(%s) ", caIds);
        if(psCur)
        {
            iReturn = 0;
            iReturn = pasDbFetchInto(psCur, UT_TYPE_LONG, 4, &lId);
            while(iReturn == 0)
            {
                if(iNum == 0)
                {
                    sprintf(caTempid, "%d", lId);
                }
                else
                {
                    sprintf(caTempid + strlen(caTempid), ",%d", lId);
                }

                iReturn = pasDbFetchInto(psCur, UT_TYPE_LONG, 4, &lId);

                iNum++;

            }
        }
        pasDbCloseCursor(psCur);

        if(strlen(caTempid) > 0)
        {
            sprintf(caReturn + strlen(caReturn), ",%s", caTempid);
        }
        strcpy(caIds, caTempid);
    }



    return &caReturn[0];
}

static char *getServicecodesByDids(utShmHead *psShmHead, char *caGroupids)
{
    static char caReturn[8024];
    char caAllGroupIds[8024];
    char sql[8024];
    char caServicecode[32];
    int iReturn, lId, iNum;
    char caGroupId[12] = {0};
    pasDbCursor *psCur;
    memset(caReturn, 0, sizeof(caReturn));
    memset(caAllGroupIds, 0, sizeof(caAllGroupIds));
    strcpy(caAllGroupIds, caGroupids);
    if(strlen(caAllGroupIds) == 0)
        strcpy(caAllGroupIds, "0");
    int isBreak = 0;

    for(iNum = 0; iNum < 3; iNum++)
    {
        memset(sql, 0, sizeof(sql));
        sprintf(sql, "select groupid from ncsgroup where groupid in (%s) or pid in (%s)", caAllGroupIds, caAllGroupIds);
        //printf("iNum=%d,sql=[%s],groupids=[%s]\n", iNum, sql, caAllGroupIds);
        /*
            //放到sql以后就可以清空
            memset(caAllGroupIds, 0, sizeof(caAllGroupIds));
            */
        psCur = pasDbOpenSqlF(sql);
        if(psCur)
        {
            iReturn = 0;
            memset(caGroupId, 0, sizeof(caGroupId));
            iReturn = pasDbFetchInto(psCur, UT_TYPE_STRING, 11, caGroupId);
            while(iReturn == 0)
            {
                //不断壮大的groupid列表
                if(strlen(caAllGroupIds) == 0)
                {
                    sprintf(caAllGroupIds, "%s", caGroupId);
                }
                else
                {
                    if(!strstr(caAllGroupIds, caGroupId))
                        sprintf(caAllGroupIds + strlen(caAllGroupIds), ",%s", caGroupId);
                }
                memset(caGroupId, 0, sizeof(caGroupId));
                iReturn = pasDbFetchInto(psCur, UT_TYPE_STRING, 11, caGroupId);
            }
        }
        pasDbCloseCursor(psCur);
    }

    iNum = 0;
    memset(sql, 0, sizeof(sql));
    sprintf(sql, "select username from ncsuser a,ncsgroup b where a.groupid=b.groupid and (b.groupid in (%s) or b.pid in(%s)) limit 0,300 ", caAllGroupIds, caAllGroupIds);
#ifdef SHOWBAB_DEBUG
    printf("get servicecode list sql=[%s]\n", sql);
#endif
    psCur = pasDbOpenSqlF(sql);
    if(psCur)
    {
        iReturn = 0;
        memset(caServicecode, 0, sizeof(caServicecode));
        iReturn = pasDbFetchInto(psCur, UT_TYPE_STRING, 16, caServicecode);
        while(iReturn == 0)
        {
            //最终结果
            if(iNum == 0)
            {
                sprintf(caReturn, "\'%s\'", caServicecode);
            }
            else
            {
                sprintf(caReturn + strlen(caReturn), ",\'%s\'", caServicecode);
            }
            memset(caServicecode, 0, sizeof(caServicecode));
            iReturn = pasDbFetchInto(psCur, UT_TYPE_STRING, 16, caServicecode);
            iNum++;
        }
    }
    pasDbCloseCursor(psCur);
    return &caReturn[0];
}

/* 显示热点分组信息导入next界面  */
int ncsDrNext_mac(utShmHead *psShmHead, int iFd, utMsgHead *psMsgHead)
{
    pasDbCursor *psCur;
    char caTemp[400];
    FILE *fp;
    int i, iNum, iReturn;

    long lSid, lCount, lFlags;
    utPltDbHead *psDbHead;

    char caFile[256];
    char imp_file[129] = "";
    char temp_file[129] = "";
    char sqlbuf[1024] = "";
    int  m = 0;
    char caLocal[128], caRemote[128], caType[128];
    char caText[256], caBuf[16002];
    unsigned id = 0;
    char name[36];
    char *p;
#ifdef LDEBUG
    utMsgPrintMsg(psMsgHead);
#endif

    printf("-------51ncSenVidDrNext_v9 start-------");
    psDbHead = utPltInitDb();
    if(!utFileIsExist("/home/ncmysql/ncs/upload"))
    {
        if(mkdir("/home/ncmysql/ncs/upload", 777) != 0)
        {
            utWebDispMsg(iFd, psMsgHead, "nc/ncmsg_back.htm", ncsLang("0194导入"), ncsLang("0183打开文件出错"));
            return 0;

        }
    }
    system("chmod -Rf 777 /home/ncmysql/ncs/upload");
    //chmod("/home/ncmysql/ncs/upload",777);

    /*取分组描述*/
    sprintf(sqlbuf, "select groupid,groupdesc  from  nctermmacgroup order by groupid");

    psCur = pasDbOpenSql(sqlbuf, 0);
    if(psCur == NULL)
    {
        utWebDispMsg(iFd, psMsgHead, "nc/ncmsg_back.htm", ncsLang("0194导入"), ncsLang("0183打开文件出错"));
        return 0;
    }
    iReturn = 0;
    m = 0;
    while((iReturn == 0) || (iReturn == 1405))
    {
        memset(name, 0, sizeof(name));
        id = 0;
        iReturn = pasDbFetchInto(psCur,
                                 UT_TYPE_LONG, 4, &id,
                                 UT_TYPE_STRING, 16, name);

        if((iReturn == 0) || (iReturn == 1405))
        {
            m++;
            utPltPutLoopVar(psDbHead, "name", m, name);
            utPltPutLoopVarF(psDbHead, "id", m, "%lu", id);
        }
    }
    pasDbCloseCursor(psCur);
    /*取终端分组名称*/
    sprintf(sqlbuf, "select groupid,groupname from nctermmacgroup order by groupname ");
    psCur = pasDbOpenSql(sqlbuf, 0);
    if(psCur == NULL)
    {
        utWebDispMsg(iFd, psMsgHead, "nc/ncmsg_back.htm", ncsLang("0194导入"), ncsLang("0183打开文件出错"));
        return 0;
    }
    iReturn = 0;
    m = 0;
    while((iReturn == 0) || (iReturn == 1405))
    {
        memset(name, 0, sizeof(name));
        id = 0;
        iReturn = pasDbFetchInto(psCur,
                                 UT_TYPE_LONG, 4, &id,
                                 UT_TYPE_STRING, 16, name);

        if((iReturn == 0) || (iReturn == 1405))
        {
            m++;
            utPltPutLoopVar(psDbHead, "sname", m, name);
            utPltPutLoopVarF(psDbHead, "ntype", m, "%lu", id);
        }
    }
    pasDbCloseCursor(psCur);

    utMsgGetSomeNVar(psMsgHead, 1, "fname", UT_TYPE_STRING,  255, imp_file);

    printf("imp_file=%s\n", imp_file);
    if(strlen(imp_file) != 0)
    {
        p = utStrSkipSpaces(imp_file);
        p = utStrGetWord(p, temp_file, 200, ";\n");
        if((*p) == ';')
            p = utStrGetWord(p + 1, temp_file, 200, ";\n");

        fp = fopen(temp_file, "r");
        printf("temp_file=%s\n", temp_file);
        if(fp == NULL)
        {
            utWebDispMsg(iFd, psMsgHead, "nc/ncmsg_back.htm", ncsLang("0194导入"), ncsLang("0183打开文件出错"));
            return 0;
        }


        p = fgets(caBuf, 16000, fp);
        iNum = 0;
        while(p && *p)
        {

            p = utStrGetWord(p, caTemp, 300, ",\r\n");
            if(!utStrIsSpaces(caTemp))
            {
                iNum++;
                utPltPutLoopVar(psDbHead, "caTemp", iNum, caTemp);
                utPltPutLoopVarF(psDbHead, "iNum", iNum, "%lu", iNum - 1);

                if(iNum == 1)
                {
                    utPltPutVar(psDbHead, "webclass", caTemp);
                    utPltPutVarF(psDbHead, "webclass_num", "%lu", iNum - 1);
                }
            }
            if(*p != ',')
            {
                break;
            }
            p++;
        }
        fclose(fp);
    }
    utPltPutVar(psDbHead, "fname", temp_file);
    utPltOutToHtml(iFd, psMsgHead, psDbHead, "v4/MAC_import_next.htm");
    printf("-------411411411411ncs_imp_MAC end  temp_file=%d-------", temp_file);
    return 0;
}

//导入热点分组信息
int ncs_imp_MAC(utShmHead  *psShmHead, int iFd, utMsgHead *psMsgHead)
{
    FILE *fp;
    int iReturn;
    char caFile[128] = "";

    char *p;
    long sid, id;
    char caUrl[68], caName[68], caUrlClass[36];

    long groupid = 0;
    long lcount = 0;
    char caFirst[12] = "";
    char caUrlNum[12] = "";
    char caNameNum[12] = "";
    char caIdNum[12] = "";
    char caDefid[16];
    long lUrl, lName, lId;
    long lTime = 0;
    char caTime[16] = "";
    int tReturn = 0;
    int lIdn = 0;
    char  caBuf[16000] = "";
    char sqlbuf[2048] = "";
    char caKeyword[64];
    char *APName;
    char caNtype[64];
    long sum = 0;
    utPltDbHead *psDbHead;
    //  psDbHead = utPltInitDb();
    //utMsgPrintMsg(psMsgHead);
    iReturn = utMsgGetSomeNVar(psMsgHead, 5,
                               "keyword", UT_TYPE_STRING, 11, caIdNum,
                               "defclass", UT_TYPE_STRING, 10, caDefid,
                               "sname_type", UT_TYPE_STRING, 63, caNtype,
                               "first",     UT_TYPE_STRING, 11,  caFirst,
                               "fname",   UT_TYPE_STRING, 127, caFile);

    lTime = time(0);
    printf("453ntype=%s\n", caNtype);
    if(utStrIsSpaces(caIdNum))
    {
        lId = 999;
    }
    else
    {
        lId = atol(caIdNum);
    }

    fp = fopen(caFile, "r");
    if(fp == NULL)
    {
        utWebDispMsg(iFd, psMsgHead, "nc/ncmsg_back.htm", ncsLang("0194导入"), ncsLang("0183打开文件出错"));
        return 0;
    }
    p = fgets(caBuf, 10000, fp);
    if(!utStrIsSpaces(caFirst))
    {
        /* 忽略第一行  */
        p = fgets(caBuf, 10000, fp);
    }
    while(p)
    {
        pmUtlGetCsvWord(caBuf, lId, caKeyword);

        id = atol(caDefid);


        if(!utStrIsSpaces(caKeyword))
        {
            lcount = 0;
            sprintf(sqlbuf, "select count(*) from nctermmacgroup,nctermmacgroupinfo where nctermmacgroup.groupid=nctermmacgroupinfo.groupid and groupname='%s' ", caNtype);
            //  printf("sqlbuf=%s\n",sqlbuf);
            pasDbOneRecord(sqlbuf, 0, UT_TYPE_LONG, 4, &lcount);

            printf("486caNtype=%s\n", caNtype);

            sprintf(sqlbuf, "select groupid from nctermmacgroup where groupname=\'%s\' ", caNtype);
            printf("490 sqlbuf=%s\n", sqlbuf);
            pasDbOneRecord(sqlbuf, 0, UT_TYPE_LONG, 4, &groupid);
            printf("490 groupid=%lu \n", groupid);
            sprintf(sqlbuf, "insert into nctermmacgroupinfo(groupid,mac) \
					values(%lu,\'%s\') ", \
                    groupid, caKeyword);
            printf("sqlbuf=%s\n", sqlbuf);
            pasDbExecSql(sqlbuf, 0);
            pasDbCommit(NULL);

        }
        p = fgets(caBuf, 10000, fp);
    }
    fclose(fp);
    utWebDispMsg(iFd, psMsgHead, "nc/ncmsg_back.htm", "导入完成!", "导入完成!");
    return 0;
}


/* 显示导入热点mac界面  */
int ncS_macUserDr_Next(utShmHead *psShmHead, int iFd, utMsgHead *psMsgHead)
{
    pasDbCursor *psCur;
    char caTemp[400];
    FILE *fp;
    int i, iNum, iReturn;

    long lSid, lCount, lFlags;
    utPltDbHead *psDbHead;
    char caCid[16];
    char caFile[256];
    char imp_file[129] = "";
    char temp_file[129] = "";
    char sqlbuf[1024] = "";
    int  m = 0;
    char caLocal[128], caRemote[128], caType[128];
    char caText[256], caBuf[16002];
    unsigned id = 0;
    char name[36];
    char caName[64];
    char *p;
#ifdef LDEBUG
    utMsgPrintMsg(psMsgHead);
#endif
    psDbHead = utPltInitDb();
    if(!utFileIsExist("/home/ncmysql/ncs/upload"))
    {
        if(mkdir("/home/ncmysql/ncs/upload", 555) != 0)
        {
            utWebDispMsg(iFd, psMsgHead, "nc/ncmsg_back.htm", ncsLang("0194导入"), ncsLang("0183打开文件出错"));
            return 0;

        }
    }
    system("chmod -Rf 777 /home/ncmysql/ncs/upload");

    utMsgGetSomeNVar(psMsgHead, 1, "fname", UT_TYPE_STRING,  255, imp_file);



    if(strlen(imp_file) != 0)
    {
        p = utStrSkipSpaces(imp_file);
        p = utStrGetWord(p, temp_file, 200, ";\n");
        if((*p) == ';')
            p = utStrGetWord(p + 1, temp_file, 200, ";\n");

        fp = fopen(temp_file, "r");
        if(fp == NULL)
        {
            utWebDispMsg(iFd, psMsgHead, "nc/ncmsg_back.htm", ncsLang("0194导入"), ncsLang("0183打开文件出错"));
            return 0;
        }



        p = fgets(caBuf, 16000, fp);
        iNum = 0;
        //解析文件
        while(p && *p)
        {
            p = utStrGetWord(p, caTemp, 300, ",\r\n");
            //        if(!utStrIsSpaces(caTemp)) {
            iNum++;
            utPltPutLoopVar(psDbHead, "caTemp", iNum, caTemp);
            utPltPutLoopVarF(psDbHead, "iNum", iNum, "%lu", iNum - 1);

            if(iNum == 1)
            {
                utPltPutVar(psDbHead, "name_name", caTemp);
                utPltPutVarF(psDbHead, "name_num", "%lu", iNum - 1);
            }

            if(iNum == 2)
            {
                utPltPutVar(psDbHead, "idno_name", caTemp);
                utPltPutVarF(psDbHead, "idno_num", "%lu", iNum - 1);
            }
            if(iNum == 3)
            {
                utPltPutVar(psDbHead, "Ispname_name", caTemp);
                utPltPutVarF(psDbHead, "Ispname_num", "%lu", iNum - 1);
            }
            if(iNum == 4)
            {
                utPltPutVar(psDbHead, "phone_name", caTemp);
                utPltPutVarF(psDbHead, "phone_num", "%lu", iNum - 1);
            }
            if(iNum == 5)
            {
                utPltPutVar(psDbHead, "mac_name", caTemp);
                utPltPutVarF(psDbHead, "mac_num", "%lu", iNum - 1);
            }
            //       }
            if(*p != ',')
            {
                break;
            }
            p++;
        }
        fclose(fp);


    }

    utPltPutVar(psDbHead, "fname", temp_file);
    utPltOutToHtml(iFd, psMsgHead, psDbHead, "v4/case/mac_userimport_next.htm");
    return 0;
}


//导入合规热点mac
int ncs_mac_imp(utShmHead *psShmHead, int iFd, utMsgHead *psMsgHead)
{
    FILE *fp;
    int iReturn;
    char caFile[128] = "";
    char caPhoneNum[128] = "";
    char caIspnameNum[128] = "";
    char caPhone[128] = "";
    char *p;
    long sid, id;
    char caUsername[128], caDispname[128], caCompname[128], caIspname[128], caIdtype[128], caIdcard[128];
    char caCid[16], caMacNum[128], caMACNum[128];
    long lIspname;
    unsigned long lNettype;
    long lcount = 0;
    char caFirst[12] = "";

    char caDispnameNum[12] = "";
    char caIdno[36], caDescr[64];
    char caFlags[16];
    long lUsernameNum, lDispnameNum, lIdno, lDescr, lPhone, lmac;
    long lNettypeNum, lNameNum;
    long lTime = 0;
    char caTime[16] = "";
    char caTname[36];
    int tReturn = 0;
    int lIdn = 0;
    char caCtype[16];
    char  caBuf[16000] = "";
    char sqlbuf[2048] = "";
    char *APName;
    char caBh[16], caBm[16], caCh[16];
    long lBh, lBm, lCh;
    char caBh_d[32], caBm_d[32], caCh_d[32];
    long sum = 0;
    char caMAC[128] = "";
    utPltDbHead *psDbHead;
    //  psDbHead = utPltInitDb();
    //utMsgPrintMsg(psMsgHead);
    iReturn = utMsgGetSomeNVar(psMsgHead, 7,
                               "idno", UT_TYPE_STRING, 8, caIdno,
                               "dispname", UT_TYPE_STRING, 8, caDispnameNum,
                               //接收
                               "Ispname", UT_TYPE_STRING, 8, caIspnameNum,
                               "first",     UT_TYPE_STRING, 11,  caFirst,
                               "fname",   UT_TYPE_STRING, 127, caFile,
                               "phone",   UT_TYPE_STRING, 127, caPhoneNum,
                               "mac",   UT_TYPE_STRING, 127, caMACNum
                              );
    lTime = time(0);

    printf("strat====%s\n", caIdno);

    if(utStrIsSpaces(caDispnameNum))
    {
        lDispnameNum = 999;
    }
    else
    {
        lDispnameNum = atol(caDispnameNum);
    }
    if(utStrIsSpaces(caIdno))
    {
        lIdno = 999;
    }
    else
    {
        lIdno = atol(caIdno);
    }

    if(utStrIsSpaces(caIspnameNum))
    {
        lIspname = 999;
    }
    else
    {
        lIspname = atol(caIspnameNum);
    }
    if(utStrIsSpaces(caPhoneNum))
    {
        lPhone = 999;
    }
    else
    {
        lPhone = atol(caPhoneNum);
    }
    if(utStrIsSpaces(caMACNum))
    {
        lmac = 999;
    }
    else
    {
        lmac = atol(caMACNum);
    }

    fp = fopen(caFile, "r");
    if(fp == NULL)
    {
        utWebDispMsg(iFd, psMsgHead, "nc/ncmsg_back.htm", ncsLang("0194导入"), ncsLang("0183打开文件出错"));
        return 0;
    }
    p = fgets(caBuf, 10000, fp);
    if(!utStrIsSpaces(caFirst))    /* 忽略第一行  */
    {
        p = fgets(caBuf, 10000, fp);
    }
    while(p)
    {

        pmUtlGetCsvWord(caBuf, lDispnameNum, caDispname);
        pmUtlGetCsvWord(caBuf, lIdno, caIdno);
        pmUtlGetCsvWord(caBuf, lIspname, caIspname);
        pmUtlGetCsvWord(caBuf, lPhone, caPhone);
        pmUtlGetCsvWord(caBuf, lmac, caMAC);



        lcount = 0;
        if(strlen(caDispname) > 0)
        {
            /*
            sprintf(sqlbuf,"select count(*) from ncszduser where dispname='%s' and idcard='%s' ",caDispname,caIdno);
            //  printf("sqlbuf=%s\n",sqlbuf);
            pasDbOneRecord(sqlbuf,0,UT_TYPE_LONG,4,&lcount);
                */
            if(lcount == 0)
            {
                sprintf(sqlbuf, "insert into nchotspotinfo(authflag,ISPemail,ssid,ISPname,ISPphone,servicequlity,servicetype,security) \
					values(1,\'%s\',\'%s\',\'%s\',\'%s\',1,0,1) ", \
                        caDispname, caIdno, caIspname, caPhone);
                printf("\n492sqlbuf=%s\n", sqlbuf);
                pasDbExecSql(sqlbuf, 0);
                sprintf(sqlbuf, "insert into nchotmacgroup(ssid,mac) values(\'%s\',\'%s\') ", caIdno, caMAC);
                printf("\n495sqlbuf=%s\n", sqlbuf);
                pasDbExecSql(sqlbuf, 0);
                pasDbCommit(NULL);

            }
        }
        //           printf("sqlbuf=%s\n",sqlbuf);


        p = fgets(caBuf, 10000, fp);
    }
    fclose(fp);
    printf("720debug");
    utWebDispMsg(iFd, psMsgHead, "nc/ncmsg_back.htm", "Sucess!!!", "Sucess!!!");
    return 0;

}

/* 显示导入设备管理界面  */
int ncS_APsbDr_Next(utShmHead *psShmHead, int iFd, utMsgHead *psMsgHead)
{
    pasDbCursor *psCur;
    char caTemp[400];
    FILE *fp;
    int i, iNum, iReturn;

    long lSid, lCount, lFlags;
    utPltDbHead *psDbHead;
    char caCid[16];
    char caFile[256];
    char imp_file[129] = "";
    char temp_file[129] = "";
    char sqlbuf[1024] = "";
    int  m = 0;
    char caLocal[128], caRemote[128], caType[128];
    char caText[256], caBuf[16002];
    unsigned id = 0;
    char name[36];
    char caName[64];
    char *p;
#ifdef LDEBUG
    utMsgPrintMsg(psMsgHead);
#endif
    psDbHead = utPltInitDb();
    if(!utFileIsExist("/home/ncmysql/ncs/upload"))
    {
        if(mkdir("/home/ncmysql/ncs/upload", 555) != 0)
        {
            utWebDispMsg(iFd, psMsgHead, "nc/ncmsg_back.htm", ncsLang("0194导入"), ncsLang("0183打开文件出错"));
            return 0;

        }
    }
    system("chmod -Rf 777 /home/ncmysql/ncs/upload");
    /*
    从消息数据包中取指定数量的变量。按指定的长度返回。
    函数原型
    #include <stdarg.h>
    int utMsgGetSomeNVar(utMsgHead *psMsgHead,int iNumVar,...)
    */
    utMsgGetSomeNVar(psMsgHead, 1, "fname", UT_TYPE_STRING,  255, imp_file);
    if(strlen(imp_file) != 0)
    {
        p = utStrSkipSpaces(imp_file);
        p = utStrGetWord(p, temp_file, 200, ";\n");
        if((*p) == ';')
            p = utStrGetWord(p + 1, temp_file, 200, ";\n");

        fp = fopen(temp_file, "r");
        if(fp == NULL)
        {
            utWebDispMsg(iFd, psMsgHead, "nc/ncmsg_back.htm", ncsLang("0194导入"), ncsLang("0183打开文件出错"));
            return 0;
        }



        p = fgets(caBuf, 16000, fp);
        iNum = 0;
        //解析文件
        while(p && *p)
        {
            /*
            从指定的字符串中取一个词。
            函数原型：
            char *utStrGetWord(char *p,char *pOut,
                       short nMaxLen,char *pTerm);
            */
            p = utStrGetWord(p, caTemp, 300, ",\r\n");
            //        if(!utStrIsSpaces(caTemp)) {
            iNum++;
            utPltPutLoopVar(psDbHead, "caTemp", iNum, caTemp);
            utPltPutLoopVarF(psDbHead, "iNum", iNum, "%lu", iNum - 1);

            if(iNum == 1)
            {
                utPltPutVar(psDbHead, "aptype_name", caTemp);
                utPltPutVarF(psDbHead, "aptype_num", "%lu", iNum - 1);
            }

            if(iNum == 2)
            {
                utPltPutVar(psDbHead, "apname_name", caTemp);
                utPltPutVarF(psDbHead, "apname_num", "%lu", iNum - 1);
            }
            if(iNum == 3)
            {
                utPltPutVar(psDbHead, "dispname_name", caTemp);
                utPltPutVarF(psDbHead, "dispname_num", "%lu", iNum - 1);
            }
            if(iNum == 4)
            {
                utPltPutVar(psDbHead, "servicename_name", caTemp);
                utPltPutVarF(psDbHead, "servicename_num", "%lu", iNum - 1);
            }
            if(iNum == 5)
            {
                utPltPutVar(psDbHead, "code_name", caTemp);
                utPltPutVarF(psDbHead, "code_num", "%lu", iNum - 1);
            }
            //加入
            //接入厂家名
            if(iNum == 6)
            {
                utPltPutVar(psDbHead, "name_name", caTemp);
                utPltPutVarF(psDbHead, "name_num", "%lu", iNum - 1);
            }
            if(iNum == 7)
            {
                utPltPutVar(psDbHead, "mac_name", caTemp);
                utPltPutVarF(psDbHead, "mac_num", "%lu", iNum - 1);
            }
            if(iNum == 8)
            {
                utPltPutVar(psDbHead, "address_name", caTemp);
                utPltPutVarF(psDbHead, "address_num", "%lu", iNum - 1);
            }
            if(iNum == 9)
            {
                utPltPutVar(psDbHead, "longitude_name", caTemp);
                utPltPutVarF(psDbHead, "longitude_num", "%lu", iNum - 1);
            }
            if(iNum == 10)
            {
                utPltPutVar(psDbHead, "latitude_name", caTemp);
                utPltPutVarF(psDbHead, "latitude_num", "%lu", iNum - 1);
            }
            if(iNum == 11)
            {
                utPltPutVar(psDbHead, "ssid_name", caTemp);
                utPltPutVarF(psDbHead, "ssid_num", "%lu", iNum - 1);
            }
            if(iNum == 12)
            {
                utPltPutVar(psDbHead, "line_name", caTemp);
                utPltPutVarF(psDbHead, "line_num", "%lu", iNum - 1);
            }
            if(iNum == 13)
            {
                utPltPutVar(psDbHead, "plate_name", caTemp);
                utPltPutVarF(psDbHead, "plate_num", "%lu", iNum - 1);
            }
            if(iNum == 14)
            {
                utPltPutVar(psDbHead, "flags_name", caTemp);
                utPltPutVarF(psDbHead, "flags_num", "%lu", iNum - 1);
            }

            //       }
            if(*p != ',')
            {
                break;
            }
            p++;
        }
        fclose(fp);


    }

    utPltPutVar(psDbHead, "fname", temp_file);
    utPltOutToHtml(iFd, psMsgHead, psDbHead, "v4/case/mac_APsbimport_next.htm");
    return 0;
}


//导入设备
int ncs_APsb_imp(utShmHead *psShmHead, int iFd, utMsgHead *psMsgHead)
{
    FILE *fp;
    int iReturn;
    char caFile[128] = "";
    char caPhoneNum[128] = "";
    char caIspnameNum[128] = "";
    char caPhone[128] = "";
    char *p;
    long sid, id;
    char caUsername[128], caCompname[128], caIspname[128], caIdtype[128], caIdcard[128];
    char caCid[16], caMACNum[128];
    long lIspname;
    unsigned long lNettype;
    long lcount = 0;
    char caFirst[12] = "";

    char caIdno[36], caDescr[64];
    long lUsernameNum, lDispnameNum, lIdno, lDescr, lPhone, lmac;
    long lNettypeNum, lNameNum;
    long lTime = 0;
    char caTime[16] = "";
    char caTname[36];
    int tReturn = 0;
    int lIdn = 0;
    char caCtype[16];
    char  caBuf[16000] = "";
    char sqlbuf[2048] = "";
    char *APName;
    char caBh[16], caBm[16], caCh[16];
    long lBh, lBm, lCh;
    char caBh_d[32], caBm_d[32], caCh_d[32];
    long sum = 0;
    char caMAC[128] = "";
    utPltDbHead *psDbHead;
    char caAPtypeNum[36] = "";
    char caAPnameNum[36] = "";
    char caDispnameNum[36] = "";
    char caServicenameNum[36] = "";
    char caCodeNum[36] = "";
    char caNameNum[36] = "";
    char caMacNum[36] = "";
    char caAddressNum[36] = "";
    char caLongitudeNum[36] = "";
    char caLatitudeNum[36] = "";
    char caSsidNum[36] = "";
    char caLineNum[36] = "";
    char caPlateNum[36] = "";
    char caFlagsNum[36] = "";
    long lAPtype, lAPname, lServicename, lCode, lName, lMac, lAddress;
    long lLongitude, lLatitude, lSsid, lLine, lPlate, lFlags, lDispname;
    char caAPtype[36] = "";
    char caAPname[36] = "";
    char caServicename[36] = "";
    char caCode[36] = "";
    char caName[36] = "";
    char caMac[36] = "";
    char caAddress[36] = "";
    char caLongitude[36] = "";
    char caLatitude[36] = "";
    char caSsid[36] = "";
    char caLine[36] = "";
    char caPlate[36] = "";
    char caFlags[36] = "";
    char caDispname[36] = "";
    //  psDbHead = utPltInitDb();
    //utMsgPrintMsg(psMsgHead);
    iReturn = utMsgGetSomeNVar(psMsgHead, 19,
                               "idno", UT_TYPE_STRING, 8, caIdno,
                               //接收
                               "Ispname", UT_TYPE_STRING, 8, caIspnameNum,
                               "first",     UT_TYPE_STRING, 11,  caFirst,
                               "fname",   UT_TYPE_STRING, 127, caFile,
                               "phone",   UT_TYPE_STRING, 127, caPhoneNum,

                               "aptype", UT_TYPE_STRING, 32, caAPtypeNum,
                               "apname", UT_TYPE_STRING, 32, caAPnameNum,
                               "dispname", UT_TYPE_STRING, 32, caDispnameNum,
                               "servicename", UT_TYPE_STRING, 32, caServicenameNum,
                               "code", UT_TYPE_STRING, 32, caCodeNum,
                               "name", UT_TYPE_STRING, 32, caNameNum,
                               "mac", UT_TYPE_STRING, 32, caMacNum,
                               "address", UT_TYPE_STRING, 32, caAddressNum,
                               "longitude", UT_TYPE_STRING, 32, caLongitudeNum,
                               "latitude", UT_TYPE_STRING, 32, caLatitudeNum,
                               "ssid", UT_TYPE_STRING, 32, caSsidNum,
                               "line", UT_TYPE_STRING, 32, caLineNum,
                               "plate", UT_TYPE_STRING, 32, caPlateNum,
                               "flags", UT_TYPE_STRING, 32, caFlagsNum

                              );
    lTime = time(0);

    printf("strat====%s\n", caIdno);
    // int utStrIsSpaces(char *pIn);判断字符串是否为空。

    if(utStrIsSpaces(caIdno))
    {
        lIdno = 999;
    }
    else
    {
        lIdno = atol(caIdno);
    }

    if(utStrIsSpaces(caIspnameNum))
    {
        lIspname = 999;
    }
    else
    {
        lIspname = atol(caIspnameNum);
    }
    if(utStrIsSpaces(caPhoneNum))
    {
        lPhone = 999;
    }
    else
    {
        lPhone = atol(caPhoneNum);
    }
    //加入AP设备导入

    if(utStrIsSpaces(caAPtypeNum))
    {
        lAPtype = 999;
    }
    else
    {
        lAPtype = atol(caAPtypeNum);
    }

    if(utStrIsSpaces(caAPnameNum))
    {
        lAPname = 999;
    }
    else
    {
        lAPname = atol(caAPnameNum);
    }
    if(utStrIsSpaces(caDispnameNum))
    {
        lDispname = 999;
    }
    else
    {
        lDispname = atol(caDispnameNum);
    }

    if(utStrIsSpaces(caServicenameNum))
    {
        lServicename = 999;
    }
    else
    {
        lServicename = atol(caServicenameNum);
    }

    if(utStrIsSpaces(caCodeNum))
    {
        lCode = 999;
    }
    else
    {
        lCode = atol(caCodeNum);
    }

    if(utStrIsSpaces(caNameNum))
    {
        lName = 999;
    }
    else
    {
        lName = atol(caNameNum);
    }

    if(utStrIsSpaces(caMacNum))
    {
        lMac = 999;
    }
    else
    {
        lMac = atol(caMacNum);
    }

    if(utStrIsSpaces(caAddressNum))
    {
        lAddress = 999;
    }
    else
    {
        lAddress = atol(caAddressNum);
    }

    if(utStrIsSpaces(caLongitudeNum))
    {
        lLongitude = 999;
    }
    else
    {
        lLongitude = atol(caLongitudeNum);
    }

    if(utStrIsSpaces(caLatitudeNum))
    {
        lLatitude = 999;
    }
    else
    {
        lLatitude = atol(caLatitudeNum);
    }

    if(utStrIsSpaces(caSsidNum))
    {
        lSsid = 999;
    }
    else
    {
        lSsid = atol(caSsidNum);
    }

    if(utStrIsSpaces(caLineNum))
    {
        lLine = 999;
    }
    else
    {
        lLine = atol(caLineNum);
    }

    if(utStrIsSpaces(caPlateNum))
    {
        lPlate = 999;
    }
    else
    {
        lPlate = atol(caPlateNum);
    }

    if(utStrIsSpaces(caFlagsNum))
    {
        lFlags = 999;
    }
    else
    {
        lFlags = atol(caFlagsNum);
    }

    fp = fopen(caFile, "r");
    if(fp == NULL)
    {
        utWebDispMsg(iFd, psMsgHead, "nc/ncmsg_back.htm", ncsLang("0194导入"), ncsLang("0183打开文件出错"));
        return 0;
    }
    p = fgets(caBuf, 10000, fp);
    if(!utStrIsSpaces(caFirst))    /* 忽略第一行  */
    {
        p = fgets(caBuf, 10000, fp);
    }
    while(p)
    {


        pmUtlGetCsvWord(caBuf, lIdno, caIdno);
        pmUtlGetCsvWord(caBuf, lIspname, caIspname);
        pmUtlGetCsvWord(caBuf, lPhone, caPhone);

        pmUtlGetCsvWord(caBuf, lAPtype, caAPtype);
        pmUtlGetCsvWord(caBuf, lAPname, caAPname);
        pmUtlGetCsvWord(caBuf, lDispname, caDispname);
        pmUtlGetCsvWord(caBuf, lServicename, caServicename);
        pmUtlGetCsvWord(caBuf, lCode, caCode);
        pmUtlGetCsvWord(caBuf, lName, caName);
        pmUtlGetCsvWord(caBuf, lMac, caMac);
        pmUtlGetCsvWord(caBuf, lAddress, caAddress);
        pmUtlGetCsvWord(caBuf, lLongitude, caLongitude);
        pmUtlGetCsvWord(caBuf, lLatitude, caLatitude);
        pmUtlGetCsvWord(caBuf, lSsid, caSsid);
        pmUtlGetCsvWord(caBuf, lLine, caLine);
        pmUtlGetCsvWord(caBuf, lPlate, caPlate);
        pmUtlGetCsvWord(caBuf, lFlags, caFlags);



        lcount = 0;
        if(strlen(caCode) > 0)
        {

            sprintf(sqlbuf, "select count(*) from ncsfactorycod  where code='%s'", caCode);
            printf("sqlbuf=%s\n", sqlbuf);
            pasDbOneRecord(sqlbuf, 0, UT_TYPE_LONG, 4, &lcount);
            if(lcount == 0)
            {
                sprintf(sqlbuf, "insert into ncaplist(aptype,apname,servicename,fcode,mac,address,longitude,latitude,ssid,line,plate,flags,dispname)\
				values(\'%s\',\'%s\',\'%s\',\'%s\',\'%s\',\'%s\',\'%s\',\'%s\',\'%s\',\'%s\',\'%s\',\'%s\',\'%s\') ", \
                        caAPtype, caAPname, caServicename, caCode, caMac, caAddress, caLongitude, caLatitude, caSsid, caLine, caPlate, caFlags, caDispname);
                printf("\n492sqlbuf=%s\n", sqlbuf);
                pasDbExecSql(sqlbuf, 0);
                sprintf(sqlbuf, "insert into ncsfactorycod(code,name) values(\'%s\',\'%s\')", caCode, caName);
                printf("\n495sqlbuf=%s\n", sqlbuf);
                pasDbExecSql(sqlbuf, 0);

                pasDbCommit(NULL);

            }
        }
        //           printf("sqlbuf=%s\n",sqlbuf);


        p = fgets(caBuf, 10000, fp);
    }
    fclose(fp);
    utWebDispMsg(iFd, psMsgHead, "nc/ncmsg_back.htm", "apSucess!!!", "apSucess!!!");
    return 0;

}
//系统运维告警
int  ncsSysystem_alarm(utShmHead *psShmHead, int iFd, utMsgHead *psMsgHead)
{
    char  caAlarmcode[16] = "";
    char  caAlarmlevel[32] = "";
    char  caDevtype[8] = "";
    long  lAlarmtime;
    long  lUpdatetime;
    char     caDescription[128] = "";
    long  lStatus;
    //用于判断游标状态
    int iReturn = 0;
    //用于判断行数
    int iNum = 0;

    char sql[10240] = "";
    char sql_user[1024] = "";
    char sql_ap[1024] = "";
    char caLimit[16] = "";
    char caPage[16] = "";

    char caAlarmtime[20] = "";
    char caUpdatetime[20] = "";
    char caStatus[16] = "";
    int status = 0;
    char caSid[1024] = "";
    long lSid = 0;
    int sid = 0;
    char description[128] = "";
    char caTime_flag[16] = "";
    char caAlarm_reason[16] = "";
    char caisAlarm[16] = "";
    char strCondition[1024] = "";
    pasDbCursor *psCur = NULL;
    pasDbCursor *Cur = NULL;
    pasDbCursor *psCur_1 = NULL;
    pasDbCursor *psCur_2 = NULL;
    int time_flag = 100;
    int Alarm_reason = 3;
    int isAlarm = 100;
    char caServicecodes[8024] = "";

    char cakeyword[64] = "";
    char caTemp_d[256] = "";
    char caTemp[256] = "";
    char caHandle[16] = "";
    utPltDbHead *psDbHead = utPltInitDb();  // 初始化数据模板
    utMsgPrintMsg(psMsgHead);
    //该用户所管辖的区域列表
    char caGroupSql[8024] = "";
    strcpy(caGroupSql, (char*)getDsGroupcodeSql("servicecode"));
    strcpy(caServicecodes, getServicecodesByDids(psShmHead, getDsGroupids()));
    printf("liheng=======caGroupSql==[%s]==========\n\n", caGroupSql);
    iReturn = utMsgGetSomeNVar(psMsgHead, 9,
                               "limit", UT_TYPE_STRING, 10, caLimit,
                               "page", UT_TYPE_STRING, 10, caPage,
                               "status", UT_TYPE_STRING, 10, caStatus,
                               "sid", UT_TYPE_STRING, 1023, caSid,
                               "time_flag", UT_TYPE_STRING, 10, caTime_flag,
                               "Alarm_reason", UT_TYPE_STRING, 10, caAlarm_reason,
                               "isAlarm", UT_TYPE_STRING, 10, caisAlarm,
                               "keyword", UT_TYPE_STRING, 63, cakeyword,
                               "handle", UT_TYPE_STRING, 15, caHandle);

    if(strlen(caStatus) > 0)
    {
        status = atoi(caStatus);
    }
    if(strlen(caTime_flag) > 0)
    {
        time_flag = atoi(caTime_flag);
    }
    if(strlen(caAlarm_reason) > 0)
    {
        Alarm_reason = atoi(caAlarm_reason);
    }
    printf("Alarm_reason=%d\n", Alarm_reason);
    if(strlen(caisAlarm) > 0)
    {
        isAlarm = atoi(caisAlarm);
    }

    if(strlen(cakeyword) > 0)
    {
        strcpy(caTemp_d, pasCvtGBK(2, cakeyword, caTemp, 128));
        strcpy(cakeyword, caTemp_d);
    }
    if(strlen(cakeyword) > 0)
    {
        sprintf(strCondition + strlen(strCondition), " and (alarmcode like '%c%s%c' or dispname like '%c%s%c' ) ", '%', cakeyword, '%', '%', cakeyword, '%');
    }
    if(Alarm_reason == 2)           //场所离线
    {
        sprintf(strCondition + strlen(strCondition), " and (alarmcode  ='10007' or alarmcode='10008')  ");
    }
    else if(Alarm_reason == 1)      //设备离线
    {
        sprintf(strCondition + strlen(strCondition), " and (alarmcode  ='10011' or alarmcode='10012')  ");
    }
    else if(Alarm_reason == 3)      //全部
    {

    }
    if(isAlarm == 0)
    {
        sprintf(strCondition + strlen(strCondition), " and status=0 ");
    }
    else if(isAlarm == 1)
    {
        sprintf(strCondition + strlen(strCondition), " and status<>0  ");
    }

    if(time_flag == 1)
    {
        sprintf(strCondition + strlen(strCondition), " and alarmtime >=  UNIX_TIMESTAMP(DATE(NOW()))  AND alarmtime <= (UNIX_TIMESTAMP(NOW()))  ");
    }
    else if(time_flag == 2)
    {
        sprintf(strCondition + strlen(strCondition), " and  alarmtime >=  UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 3 DAY))  AND alarmtime <= (UNIX_TIMESTAMP(NOW())) ");
    }
    else if(time_flag == 3)
    {
        sprintf(strCondition + strlen(strCondition), " and alarmtime >=  UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 7 DAY))  AND alarmtime <= (UNIX_TIMESTAMP(NOW())) ");
    }
    else if(time_flag == 4)
    {
        sprintf(strCondition + strlen(strCondition), " and  alarmtime >=  UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 1 MONTH))  AND alarmtime <= (UNIX_TIMESTAMP(NOW())) ");
    }
    else if(time_flag == 5)
    {
        sprintf(strCondition + strlen(strCondition), " and  alarmtime >=  UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 3 MONTH))  AND alarmtime <= (UNIX_TIMESTAMP(NOW())) ");
    }
    else if(time_flag == 6)
    {
        sprintf(strCondition + strlen(strCondition), " and alarmtime >=  UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 6 MONTH))  AND alarmtime <= (UNIX_TIMESTAMP(NOW()))  ");
    }

    //？确认告警
    if(strlen(caStatus) > 0)
    {

        if(strlen(caHandle) > 0)
        {
            sprintf(sql, "update nctermsysalarm set status=%d   where sid in (%s)", status, caSid);
            printf("%d updatesql=%s", __LINE__, sql);
           // Cur = pasDbOpenSql(sql, 0);

        }
        else
        {
            if(strlen(caSid) > 0)
            {
                sid = atoi(caSid);
            }
            sprintf(sql, "update nctermsysalarm set status=%d   where sid=%d", status, sid);
           // Cur = pasDbOpenSql(sql, 0);
           // memset(sql, 0, sizeof(sql));
        }
		pasDbExecSqlF(sql);
        memset(sql, 0, sizeof(sql));
    }
  //  pasDbCloseCursor(Cur);

    // 获取场所。设备总数
    char sqlc[10240] = "";
    char sql_count[10240] = "";
    int iApcount = 0;
    int iClientCount = 0;
    char sqlA[10240] = "";
    pasDbCursor *pCur = NULL;
    //
    sprintf(sqlc, "select count(*) from nctermsysalarm,ncaplist where nctermsysalarm.description =ncaplist.apname");
	if(strlen(strCondition)>0){
		sprintf(sqlc+strlen(sqlc), "%s", strCondition);
	}
	pasDbOneRecord(sqlc, 0, UT_TYPE_LONG, 4, &iApcount);
    memset(sqlc, 0, sizeof(sqlc));
    if(strlen(caGroupSql) == 0)
    {
        sprintf(sql_count, "select count(*) from  nctermsysalarm,ncsuser WHERE nctermsysalarm.description=ncsuser.username  ");
    }
    else
    {
        sprintf(sql_count, "select count(*)  WHERE nctermsysalarm.description=ncsuser.username  and %s", getDsGroupcodeSql("description"));
    }
    if(strlen(strCondition)>0){
        sprintf(sql_count+ strlen(sql_count), " %s ", strCondition);
    }
    pasDbOneRecord(sql_count, 0, UT_TYPE_LONG, 4, &iClientCount);
    memset(sql_count, 0, sizeof(sql_count));
    printf("================iClientCount=%d\n", iClientCount);
    printf("================iApcount=%d\n", iApcount);
    //解决分页问题
    int Total = 0;
    int limit = 0;
    int ipage = 0;
    limit = atoi(caLimit);
    ipage = atoi(caPage);
    printf("=====limit=%d ===========ipage=%d\n", limit, ipage);
    //limit=40;
    int iAstart;
    int iCstart;
    int iAlimit, iClimit;
	int startIndex = (ipage-1)*limit;
	int endIndex = ipage * limit;
    if(Alarm_reason == 3)
    {
        Total = iClientCount + iApcount;
		if(endIndex<=iClientCount){
			iCstart = startIndex;
            iClimit = limit;
            iAstart = 0;
            iAlimit = 0;
		}else if((startIndex<=iClientCount)&&(endIndex>iClientCount)){
			iCstart = startIndex;
			iClimit = iClientCount - startIndex;
			iAstart = 0;
			iAlimit = limit - iClimit;
		}else if(startIndex>iClientCount){
			iCstart = 0;
            iClimit = 0;
			iAstart = startIndex-iClientCount;
            iAlimit = limit;
		}
		/*
        if(ipage * limit < iClientCount)
        {
            iCstart = (ipage - 1) * limit;
            iClimit = limit;
            iAstart = 0;
            iAlimit = 0;
        }
        else
        {
            if((iClientCount - (ipage - 1)*limit) > 0 && (iClientCount - ipage * limit) < 0)
            {
                iCstart = (ipage - 1) * limit;
                iClimit = limit;
                iAstart = ipage * limit - iClientCount;
                iAlimit = limit;
            }
            else
            {
                iCstart = 0;
                iClimit = 0;
                iAstart = ipage * limit - iClientCount;
                iAlimit = limit;
            }
        }*/
    }
    else if(1 == Alarm_reason)
    {
        Total = iApcount;
        iCstart = 0;
        iClimit = 0;
        iAstart = (ipage - 1) * limit;
        iAlimit = limit;

    }
    else if(2 == Alarm_reason)
    {
        Total = iClientCount;
        iCstart = (ipage - 1) * limit;
        iClimit = limit;
		iAstart = 0;
        iAlimit = 0;
    }
    utPltPutVarF(psDbHead, "TotRec", "%lu", Total);
    printf("================Alarm_reason=%d, Total=%d\n", Alarm_reason, Total);
    if(Alarm_reason != 1)   //条件：不需设备告警的
    {
        memset(sql, 0, sizeof(sql));
        if(strlen(caGroupSql) == 0)
        {
            sprintf(sql, "select sid,alarmcode,alarmlevel,devtype,from_unixtime(alarmtime),from_unixtime(updatetime),dispname,status from   nctermsysalarm,ncsuser WHERE nctermsysalarm.description=ncsuser.username ");
            printf("%dsql%s\n", __LINE__, sql);
        }
        else
        {
            sprintf(sql, "select sid,alarmcode,alarmlevel,devtype,from_unixtime(alarmtime),from_unixtime(updatetime),dispname,status from   nctermsysalarm,ncsuser WHERE nctermsysalarm.description=ncsuser.username and %s", getDsGroupcodeSql("description"));
            printf("%dsql%s\n", __LINE__, sql);
        }
		if(strlen(strCondition)>0){
			sprintf(sql + strlen(sql), " %s ", strCondition);
		}
        sprintf(sql + strlen(sql), " order by  from_unixtime(alarmtime)  desc limit %d,%d", iCstart, iClimit);

        printf("================sqlCCCCCCCCCC=%s\n", sql);

        psCur = pasDbOpenSql(sql, 0);
        printf("================psCurCCCCCCCCCC\n");
        lSid = 0;
        lStatus = 0;
        memset(caAlarmcode, 0, sizeof(caAlarmcode));
        memset(caAlarmlevel, 0, sizeof(caAlarmlevel));
        memset(caDevtype, 0, sizeof(caDevtype));
        memset(caAlarmtime, 0, sizeof(caAlarmtime));
        memset(caUpdatetime, 0, sizeof(caUpdatetime));
        memset(caDescription, 0, sizeof(caDescription));
        iReturn = pasDbFetchInto(psCur, UT_TYPE_LONG, 4, &lSid,
                                 UT_TYPE_STRING, sizeof(caAlarmcode) - 1,  caAlarmcode,
                                 UT_TYPE_STRING, sizeof(caAlarmlevel) - 1, caAlarmlevel,
                                 UT_TYPE_STRING, sizeof(caDevtype) - 1, caDevtype,
                                 UT_TYPE_STRING, sizeof(caAlarmtime) - 1,  caAlarmtime,
                                 UT_TYPE_STRING, sizeof(caUpdatetime) - 1, caUpdatetime,
                                 UT_TYPE_STRING, sizeof(caDescription) - 1, caDescription,
                                 UT_TYPE_LONG, 4,    &lStatus);
        printf("===iReturn11111=%d====", iReturn);

        while(0 == iReturn || 1405 == iReturn)
        {
            iNum++;
            if(iNum > 1)
            {
                //当循环到第二行，增加一个逗号
                utPltPutLoopVar(psDbHead, "dh", iNum, ","); // utPltPutLoopVar输出一个循环变量的值。
            }
            utPltPutLoopVarF(psDbHead, "sid", iNum, "%lu", lSid);
            utPltPutLoopVar(psDbHead, "alarmcode", iNum, caAlarmcode);
            utPltPutLoopVar(psDbHead, "alarmlevel", iNum, caAlarmlevel);
            utPltPutLoopVar(psDbHead, "devtype", iNum, caDevtype);
            utPltPutLoopVar(psDbHead, "alarmtime", iNum, caAlarmtime);
            utPltPutLoopVar(psDbHead, "updatetime", iNum, caUpdatetime);
            utPltPutLoopVar(psDbHead, "description", iNum, caDescription);
            utPltPutLoopVarF(psDbHead, "status", iNum, "%lu", lStatus);

            lSid = 0;
            lStatus = 0;
            memset(caAlarmcode, 0, sizeof(caAlarmcode));
            memset(caAlarmlevel, 0, sizeof(caAlarmlevel));
            memset(caDevtype, 0, sizeof(caDevtype));
            memset(caAlarmtime, 0, sizeof(caAlarmtime));
            memset(caUpdatetime, 0, sizeof(caUpdatetime));
            memset(caDescription, 0, sizeof(caDescription));
            iReturn = pasDbFetchInto(psCur, UT_TYPE_LONG, 4, &lSid,
                                     UT_TYPE_STRING, sizeof(caAlarmcode) - 1,    caAlarmcode,
                                     UT_TYPE_STRING, sizeof(caAlarmlevel) - 1,    caAlarmlevel,
                                     UT_TYPE_STRING, sizeof(caDevtype) - 1,    caDevtype,
                                     UT_TYPE_STRING, sizeof(caAlarmtime) - 1,    caAlarmtime,
                                     UT_TYPE_STRING, sizeof(caUpdatetime) - 1,    caUpdatetime,
                                     UT_TYPE_STRING, sizeof(caDescription) - 1,    caDescription,
                                     UT_TYPE_LONG, 4, &lStatus);
        }
        //关闭游标
        pasDbCloseCursor(psCur);
    }
    if(Alarm_reason != 2)          //条件：不需场所告警的
    {
        memset(sqlA, 0, sizeof(sqlA));
        sprintf(sqlA, "select sid,alarmcode,alarmlevel,devtype,from_unixtime(alarmtime),from_unixtime(updatetime),ncsuser.dispname,status from nctermsysalarm,ncaplist,ncsuser where nctermsysalarm.description =ncaplist.apname and ncaplist.servicecode = ncsuser.username");
        if(strlen(strCondition) > 0)
        {
            sprintf(sqlA + strlen(sqlA), " %s ", strCondition);
        }
        sprintf(sqlA + strlen(sqlA), " order by  from_unixtime(alarmtime)  desc limit %d,%d", iAstart, iAlimit);
        printf("================sql device alarm=%s\n", sqlA);
        pCur = pasDbOpenSqlF(sqlA, 0);
        lSid = 0;
        lStatus = 0;
        memset(caAlarmcode, 0, sizeof(caAlarmcode));
        memset(caAlarmlevel, 0, sizeof(caAlarmlevel));
        memset(caDevtype, 0, sizeof(caDevtype));
        memset(caAlarmtime, 0, sizeof(caAlarmtime));
        memset(caUpdatetime, 0, sizeof(caUpdatetime));
        memset(caDescription, 0, sizeof(caDescription));
        iReturn = pasDbFetchInto(pCur, UT_TYPE_LONG, 4, &lSid,
                                 UT_TYPE_STRING, sizeof(caAlarmcode) - 1,  caAlarmcode,
                                 UT_TYPE_STRING, sizeof(caAlarmlevel) - 1, caAlarmlevel,
                                 UT_TYPE_STRING, sizeof(caDevtype) - 1, caDevtype,
                                 UT_TYPE_STRING, sizeof(caAlarmtime) - 1,  caAlarmtime,
                                 UT_TYPE_STRING, sizeof(caUpdatetime) - 1, caUpdatetime,
                                 UT_TYPE_STRING, sizeof(caDescription) - 1, caDescription,
                                 UT_TYPE_LONG, 4,    &lStatus);
        printf("===iReturn22222=%d====", iReturn);

        while(0 == iReturn || 1405 == iReturn)
        {
            iNum++;
            if(iNum > 1)
            {
                //当循环到第二行，增加一个逗号
                utPltPutLoopVar(psDbHead, "dh", iNum, ","); // utPltPutLoopVar输出一个循环变量的值。
            }
            utPltPutLoopVarF(psDbHead, "sid", iNum, "%lu", lSid);
            utPltPutLoopVar(psDbHead, "alarmcode", iNum, caAlarmcode);
            utPltPutLoopVar(psDbHead, "alarmlevel", iNum, caAlarmlevel);
            utPltPutLoopVar(psDbHead, "devtype", iNum, caDevtype);
            utPltPutLoopVar(psDbHead, "alarmtime", iNum, caAlarmtime);
            utPltPutLoopVar(psDbHead, "updatetime", iNum, caUpdatetime);
            utPltPutLoopVar(psDbHead, "description", iNum, caDescription);
            utPltPutLoopVarF(psDbHead, "status", iNum, "%lu", lStatus);
            lSid = 0;
            lStatus = 0;
            memset(caAlarmcode, 0, sizeof(caAlarmcode));
            memset(caAlarmlevel, 0, sizeof(caAlarmlevel));
            memset(caDevtype, 0, sizeof(caDevtype));
            memset(caAlarmtime, 0, sizeof(caAlarmtime));
            memset(caUpdatetime, 0, sizeof(caUpdatetime));
            memset(caDescription, 0, sizeof(caDescription));
            iReturn = pasDbFetchInto(pCur, UT_TYPE_LONG, 4, &lSid,
                                     UT_TYPE_STRING, sizeof(caAlarmcode) - 1,    caAlarmcode,
                                     UT_TYPE_STRING, sizeof(caAlarmlevel) - 1,    caAlarmlevel,
                                     UT_TYPE_STRING, sizeof(caDevtype) - 1,    caDevtype,
                                     UT_TYPE_STRING, sizeof(caAlarmtime) - 1,    caAlarmtime,
                                     UT_TYPE_STRING, sizeof(caUpdatetime) - 1,    caUpdatetime,
                                     UT_TYPE_STRING, sizeof(caDescription) - 1,    caDescription,
                                     UT_TYPE_LONG, 4, &lStatus);
        }
        //关闭游标
        pasDbCloseCursor(pCur);
    }
    //把数据以json
    utPltOutToHtml(iFd, psMsgHead, psDbHead, "/normally/proauth_system_alarm.htm");
    return 0;
}

//2015年9月16日13:01:36
//运维系统告警，取特定sid的记录(弹窗详细信息)
int ncsSysystem_alarmOne(utShmHead *psShmHead, int iFd, utMsgHead *psMsgHead)
{
    utMsgPrintMsg(psMsgHead);
    utPltDbHead *psDbHead = utPltInitDb();

    char caUserName[128] = "" ; //ncsuser.username,
    char caGroupcode[10] = "";
    char caGroupname[32] = "";      //行政区域
    char caUserDispname[255] = "";  //场所名称
    char caAddress[255] = "";
    char caAplistDispname[128] = ""; //设备名称
    char capname[21] = "";
    char capsServicecode[32] = "";      //内存中的servicecode
    long totalCount = 0;
    int iReturn = 0;
    char sql[2048] = "";
    char casid[32] = "";
    int statuscode;     //设备状态，1在线，2离线
    pasDbCursor *psCur;

    memset(sql, 0, sizeof(sql));

    iReturn = utMsgGetSomeNVar(psMsgHead, 1, "dispname", UT_TYPE_STRING, 20, caUserDispname);
    //获取场所名称,场所地址
    sprintf(sql, "select username,address from ncsuser where dispname ='%s'", caUserDispname);
    iReturn = pasDbOneRecord(sql, 0, UT_TYPE_STRING, sizeof(caUserName) - 1, caUserName,
                             UT_TYPE_STRING, sizeof(caAddress) - 1, caAddress);


    utPltPutVarF(psDbHead, "userDispname", "%s", caUserDispname);
    utPltPutVarF(psDbHead, "address", "%s", caAddress);
    utPltPutVarF(psDbHead, "username", "%s", caUserName);

    //printf("caUserDispname=%s",caUserDispname);
    //printf("caAddress=%s",caAddress);
    memset(sql, 0, sizeof(sql));


    strncpy(caGroupcode , caUserName, 6);

    //获取行政区域
    sprintf(sql, "select groupname from ncsgroup where ncsgroup.groupcode ='%s'", caGroupcode);
    iReturn = pasDbOneRecord(sql, 0, UT_TYPE_STRING, 31, caGroupname);
    utPltPutVarF(psDbHead, "groupname", "%s", caGroupname);
    //printf("caGroupname=%s",caGroupname);

    memset(sql, 0, sizeof(sql));

    //获取关联设备总数
    sprintf(sql, "select count(*) from ncsuser,ncaplist where ncsuser.username = ncaplist.servicecode and username = '%s'", caUserName);
    iReturn = pasDbOneRecord(sql, 0, UT_TYPE_LONG, 4, &totalCount);
    if(!totalCount == 0)
    {
        utPltPutVarF(psDbHead, "totalCount", "%lu", totalCount);
        memset(sql, 0, sizeof(sql));

        //判断设备是否在线
        ncApSrvOnline *psOnline;
        pasHashInfo sHashInfo;
        uchar *pHash;
        pHash = utShmHashHead(psShmHead, NC_LNK_APSRVONLINE);
        int isInServiceList;
        if(pHash == NULL)
        {
            printf("NC_LNK_APSRVONLINE Memory Error \n");
            return -1;
        }
        long  maxTimeoutSeconds = utComGetVar_ld(psShmHead, "MaxTimeoutSecs", MAX_TIMEOUT_SECONDS);
        psOnline = (ncApSrvOnline *)pasHashFirst(pHash, &sHashInfo);
        int iNum = 0;
        char caApnames[8024];
        memset(caApnames, 0, sizeof(caApnames));
        while(psOnline)
        {
            isInServiceList = 1;
            if(strlen(caUserName) > 0)
            {
                if((strlen(psOnline->servicecode) > 0) && strstr(caUserName, psOnline->servicecode))
                {
                    isInServiceList = 1;
                }
                else
                {
                    isInServiceList = 0;
                }
            }
            if(isInServiceList)
            {
                iNum ++;
                if(iNum > 1)
                {
                    utPltPutLoopVar(psDbHead, "dh", iNum, ",");
                }
                if(strlen(psOnline->dispname) > 0)
                {
                    strcpy(caAplistDispname, psOnline->dispname);
                    utPltPutLoopVar(psDbHead, "aplistDispname", iNum, caAplistDispname);
                    if(time(0) - psOnline->lasttime < maxTimeoutSeconds)
                    {
                        utPltPutLoopVar(psDbHead, "statuscode", iNum, "1");
                    }
                    else
                    {
                        utPltPutLoopVar(psDbHead, "statuscode", iNum, "2");
                    }
                }
            }
            psOnline = (ncApSrvOnline *)pasHashNextS(&sHashInfo);
        }
    }
    utPltOutToHtml(iFd, psMsgHead, psDbHead, "/normally/proauth_system_alarmOne.htm");
    return 0;

}

//显示接入厂商代码维护
int ncsFacCode_v9(utShmHead *psShmHead, int iFd, utMsgHead *psMsgHead)
{
    pasDbCursor *psCur;
    utPltDbHead *psDbHead;
    long iReturn, lCount;
    char caStart[16], caTemp[2048], caCurPg[16];
    long lCurPg, lRowNum, lStartRec, sid, nettype, flags;
    char caTemp_d[256];
    long lSid, lTid;
    char caPre[36];
    char caDispname[68], caMac[24];
    long lStatus;
    long iNum;
    long factory_flags;


    long lktype, lcaseflags, ltid;
    char caFacs[1024];
    char caDescr[64], caBh[32], caBm[32], caCh[32], caIdno[32];
    char caDelall[16], caJoin[16];
    char caSlink[36], caSaddress[256], caStel[68], caSmail[64];
    char caCid[16], caLimit[16], caPage[16], caDel[16], caDir[16], caCode[16], caSelsid[1024], caUpdate[16], caNtype[16], caNetid[64], caSid[16];
    utMsgPrintMsg(psMsgHead);
    char caUsername2[36];
    memset(caUsername2, 0, sizeof(caUsername2));
    dsCltGetSessionValue(1, "dispname", UT_TYPE_STRING, 30, caUsername2);

    strcpy(caFacs, getDsFacs());
    iReturn = utMsgGetSomeNVar(psMsgHead, 14,
                               "dispname",     UT_TYPE_STRING, 63, caDispname,
                               "limit",        UT_TYPE_STRING, 10, caLimit,
                               "page",          UT_TYPE_STRING, 10, caPage,
                               "del",           UT_TYPE_STRING, 8, caDel,
                               "dir",           UT_TYPE_STRING, 8, caDir,
                               "selsid", UT_TYPE_STRING, 1000, caSelsid,
                               "code", UT_TYPE_STRING, 10, caCode,
                               "update", UT_TYPE_STRING, 10, caUpdate,
                               "sid", UT_TYPE_STRING, 10, caSid,
                               "slink", UT_TYPE_STRING, 31, caSlink,
                               "saddress", UT_TYPE_STRING, 254, caSaddress,
                               "stel", UT_TYPE_STRING, 63, caStel,
                               "smail", UT_TYPE_STRING, 31, caSmail,
                               "start", UT_TYPE_STRING, 10, caStart);
    printf("caUpdate=[%s],caSmail=[%s]\n", caUpdate, caSmail);
    if(strlen(caDispname) > 0)
    {
        strcpy(caTemp_d,  pasCvtGBK(2, caDispname, caTemp, 63));
        strcpy(caDispname, caTemp_d);
    }
    if(strlen(caSlink) > 0)
    {
        strcpy(caTemp_d,  pasCvtGBK(2, caSlink, caTemp, 31));
        strcpy(caSlink, caTemp_d);
    }
    if(strlen(caSaddress) > 0)
    {
        strcpy(caTemp_d,  pasCvtGBK(2, caSaddress, caTemp, 127));
        strcpy(caSaddress, caTemp_d);
    }
    if(strlen(caSmail) > 0)
    {
        strcpy(caTemp_d,  pasCvtGBK(2, caSmail, caTemp, 31));
        strcpy(caSmail, caTemp_d);
    }
    lRowNum = atol(caLimit);
    if(lCurPg <= 0) lCurPg = 1;
    lStartRec = atol(caStart);

    psDbHead = utPltInitDb();

    if(strcmp(caUpdate, "update") == 0)
    {
        if(strlen(caSid) == 0)
        {
            sprintf(caTemp, "select count(*) from ncsfactorycod where name='%s'  and code='%s' ", caDispname, caCode);
            lCount = 0;
            printf("caTemp=%s\n", caTemp);
            pasDbOneRecord(caTemp, 0, UT_TYPE_LONG, 4, &lCount);
            if(lCount == 0)
            {
                printf("insert into ncsfactorycod(name,code,slink,saddress,stel,smail) values('%s','%s','%s','%s','%s','%s')\n", caDispname, caCode, caSlink, caSaddress, caStel, caSmail);

                pasDbExecSqlF("insert into ncsfactorycod(name,code,slink,saddress,stel,smail) \
	       		values('%s','%s','%s','%s','%s','%s')", caDispname, caCode, caSlink, caSaddress, caStel, caSmail);
                pasDbExecSqlF("update ncsfactorycode set moditime=%d where code='%s' ", time(0), caCode);
                sprintf(caTemp, "添加接入厂商:%s", caDispname);
                ncsWriteSysLog(psMsgHead, caUsername2, "05", "成功", caTemp);
            }
        }
        else
        {
            sprintf(caTemp, "select count(*) from ncsfactorycod where name='%s' and code='%s' and sid!=%s ", caDispname, caCode, caSid);
            lCount = 0;
            pasDbOneRecord(caTemp, 0, UT_TYPE_LONG, 4, &lCount);
            if(lCount == 0)
            {

                pasDbExecSqlF("update ncsfactorycod set name='%s',code='%s',slink='%s',saddress='%s',stel='%s',smail='%s' where sid=%s ", caDispname, caCode, caSlink, caSaddress, caStel, caSmail, caSid);
                pasDbExecSqlF("update ncsfactorycode set moditime=%d where sid=%s ", time(0), caSid);
                sprintf(caTemp, "修改接入厂商:%s", caDispname);
                ncsWriteSysLog(psMsgHead, caUsername2, "05", "成功", caTemp);
            }
        }

    }
    if(strcmp(caDel, "del") == 0 && strlen(caSelsid) > 0)
    {
        memset(caTemp, 0, sizeof(caTemp));
        sprintf(caTemp, "select count(*)  from  ncsuser  where fcode in (select code from ncsfactorycod where sid in (%s) ) ", caSelsid);
        pasDbOneRecord(caTemp, 0, UT_TYPE_LONG, 4, &factory_flags);

        printf("%d,factory_flags=[%lu],caTemp==%s\n", __LINE__, factory_flags, caTemp);
        memset(caTemp, 0, sizeof(caTemp));
        if(factory_flags == 0)
        {
            pasDbExecSqlF("delete from  ncsfactorycod  where sid in(%s)", caSelsid);
            sprintf(caTemp, "select dispname from ncsfactorycode where sid in (%s)", caSelsid);
            memset(caDispname, 0, sizeof(caDispname));
            pasDbOneRecord(caTemp, 0, UT_TYPE_STRING, 31, caDispname);

            sprintf(caTemp, "删除接入厂商:%s", caDispname);
            ncsWriteSysLog(psMsgHead, caUsername2, "05", "成功", caTemp);
        }
    }



    sprintf(caTemp, "select count(*) from ncsfactorycod where 1=1 ");
    if(strlen(caFacs) > 0)
    {
        sprintf(caTemp + strlen(caTemp), " and code in (%s) ", caFacs);
    }
    lCount = 0;
    iReturn = pasDbOneRecord(caTemp, 0, UT_TYPE_LONG, 4, &lCount);


    sprintf(caTemp, "select sid,name,code,slink,saddress,stel,smail from ncsfactorycod where 1=1");
    if(strlen(caFacs) > 0)
    {
        sprintf(caTemp + strlen(caTemp), " and code in (%s) ", caFacs);
    }
    sprintf(caTemp + strlen(caTemp), " order by sid desc  limit %d,%d", lStartRec, lRowNum);

    printf("5537======caTemp=%s\n", caTemp);


    psCur = pasDbOpenSql(caTemp, 0);

    if(psCur == NULL)
    {
        utWebDispMsg(iFd, psMsgHead, "ncs/ncmsg_back.htm", ncsLang("0561数据统计出错"), ncsLang("0171查询数据出错"));
        return 0;
    }


    iReturn = 0;
    iNum = 0;
    while((iReturn == 0 || iReturn == 1405) && iNum < lRowNum)
    {

        lSid = 0;
        memset(caDispname, 0, sizeof(caDispname));
        memset(caCode, 0, sizeof(caCode));
        memset(caSlink, 0, sizeof(caSlink));
        memset(caSaddress, 0, sizeof(caSaddress));
        memset(caStel, 0, sizeof(caStel));
        memset(caSmail, 0, sizeof(caSmail));
        iReturn = pasDbFetchInto(psCur,    UT_TYPE_LONG, 4, &lSid,
                                 UT_TYPE_STRING, 63, caDispname,
                                 UT_TYPE_STRING, 10, caCode,
                                 UT_TYPE_STRING, 31, caSlink,
                                 UT_TYPE_STRING, 127, caSaddress,
                                 UT_TYPE_STRING, 31, caStel,
                                 UT_TYPE_STRING, 31, caSmail);




        if((iReturn != 0) && (iReturn != 1405)) break;
        iNum++;
        if(iNum > 1)
        {
            utPltPutLoopVar(psDbHead, "dh", iNum, ",");
        }
        utPltPutLoopVarF(psDbHead, "sid", iNum, "%lu", lSid);
        utPltPutLoopVar(psDbHead, "dispname", iNum, caDispname);
        utPltPutLoopVar(psDbHead, "code", iNum, caCode);
        utPltPutLoopVar(psDbHead, "slink", iNum, caSlink);
        utPltPutLoopVar(psDbHead, "saddress", iNum, caSaddress);
        utPltPutLoopVar(psDbHead, "stel", iNum, caStel);
        utPltPutLoopVar(psDbHead, "smail", iNum, caSmail);

        utPltPutLoopVarF(psDbHead, "num", iNum, "%lu", iNum);



    }
    pasDbCloseCursor(psCur);

    utPltPutVarF(psDbHead, "factory_flags", "%lu", factory_flags);
    utPltPutVarF(psDbHead, "TotRec", "%lu", lCount);

    utPltOutToHtml(iFd, psMsgHead, psDbHead, "v4/ncs_faccode_list.htm");
    return 0;
}
//显示单位组列表
int ncsWebClientClassList_v9(utShmHead *psShmHead, int iFd, utMsgHead *psMsgHead)
{
    char caWhere[512], caCond[64], caCond0[64];
    char caTotPg[16], caCurPg[16], caSort[16], caSortby[6];
    char caGroupname[32];
    char caGroupid[16];

    char caTemp[2024];

    char caAll[1024];


    unsigned long lGroupid, lPid, lCurPg, lTotPg;
    int lCount;
    int i, iNum, lId;
    char caGroupcode[16];

    char caSmt[4048], caOrder[64];
    char caDel[16], caExport[16];
    utPltDbHead *psDbHead;
    int iReturn;
    long lGroupid0, lRowNum, lUseflags, lStartRec, lUseflags0, lTotRec;
    char servicecode1[24], dispname1[68], address1[130], ceoname1[32], handphone1[34], contact1[34], telphone1[68], email1[130];
    char ip1[20], servicestate1[4], jointype1[4], area1[72], areaman1[32], joincode1[8];
    pasDbCursor *psCur;
    char caUsername2[32];
    char caMsg[1024];
    char caOnlineflag[16];
    long lMonflag = 0;
    unsigned long lCurtime, lTime, lRuntime;
    unsigned long lCase;
    char caYear[30];
    char caPlate[128];
    char caOpt[256];
    char caPage[16], caLimit[16];
    char caDir[12];
    FILE *fp;
    char pFile[256], caBuf[128];
    unsigned char *pHash;
    struct stData
    {
        unsigned long id;
        char caGroupname[36];
        long lCount;
    };
    char sql[1024] = "";
    long lCount_d;
    struct stData *psData;
    char caTemp_d[256];
    char caSesid[1024];
    long lSumHash, js_flag;
    long lGroupid3;
    char caUpdate[12], caPid[64];
    char caGroups[1024];
    char caGroupname2[36], caGroupcode2[20], caGroupid2[20];
    long  handle = 0;
    long child_node = 0;
    memset(caAll, 0, sizeof(caAll));
    strcpy(caGroups, getDsGroupid());

    memset(caOpt, 0, sizeof(caOpt));
    iReturn = dsCltGetMyInfo(1, "Userid", &lId);
    if(iReturn == 0)
    {
        pasDbOneRecord("select opt from dsuser where id=:id", 1, "id", UT_TYPE_LONG, lId, UT_TYPE_STRING, 255, caOpt);
    }

    dsCltGetSessionValue(1, "dispname", UT_TYPE_STRING, 30, caUsername2);
    iReturn = dsCltGetMyInfo(1, "Userid", &lId);
    js_flag = 0;



    utMsgPrintMsg(psMsgHead);
    iReturn = utMsgGetSomeNVar(psMsgHead, 13,
                               "groupid",          UT_TYPE_STRING, 10, caGroupid,
                               "groupid2",          UT_TYPE_STRING, 12, caGroupid2,
                               "sort",            UT_TYPE_STRING, 15, caSort,
                               "dir",          UT_TYPE_STRING, 8,  caDir,
                               "del",             UT_TYPE_STRING, 10, caDel,
                               "export",          UT_TYPE_STRING, 10, caExport,
                               "groupname",       UT_TYPE_STRING, 31, caGroupname2,
                               "groupcode",       UT_TYPE_STRING, 16, caGroupcode2,
                               "page",            UT_TYPE_STRING, 10, caPage,
                               "limit",           UT_TYPE_STRING, 10, caLimit,
                               "selsid", UT_TYPE_STRING, 1000, caSesid,
                               "update", UT_TYPE_STRING, 10, caUpdate,
                               "pid", UT_TYPE_STRING, 60, caPid);

    if(strlen(caGroupname2) > 0)
    {
        strcpy(caTemp_d, pasCvtGBK(2, caGroupname2, caTemp, 64));
        strcpy(caGroupname, caTemp_d);
    }
    if(strlen(caGroupcode2) > 0)
    {
        strcpy(caTemp_d, pasCvtGBK(2, caGroupcode2, caTemp, 15));
        strcpy(caGroupcode, caTemp_d);
    }

    if(strlen(caPid) > 0)
    {
        strcpy(caTemp_d, pasCvtGBK(2, caPid, caTemp, 64));
        strcpy(caPid, caTemp_d);

        sprintf(caTemp, "select groupid from ncsgroup where groupname='%s' ", caPid);
        printf("caTemp=%s\n", caTemp);
        lGroupid3 = 0;
        pasDbOneRecord(caTemp, 0, UT_TYPE_LONG, 4, &lGroupid3);
        if(lGroupid3 > 0)
        {
            sprintf(caPid, "%d", lGroupid3);
        }
    }



    if(strcmp(caUpdate, "update") == 0)
    {
        lPid = atol(caPid);
        lGroupid = atol(caGroupid2);
        if(lGroupid > 0)
        {
            if((lGroupid != lPid) && strlen(caGroupname) > 0)
            {
                pasDbExecSqlF("update ncsgroup set groupname='%s',pid=%d,groupcode='%s' where groupid=%d ", caGroupname, lPid, caGroupcode, lGroupid);
            }
        }
        else
        {
            lGroupid = utMd5Code(caGroupname, strlen(caGroupname), "ffff");
            if(lGroupid > 2000000000) lGroupid = lGroupid - 2000000000;

            if(lGroupid > 2000000000) lGroupid = lGroupid - 2000000000;

            sprintf(caTemp, "select count(*) from ncsgroup where groupid=%d ", lGroupid);
            lCount = 0;
            pasDbOneRecord(caTemp, 0, UT_TYPE_LONG, 4, &lCount);
            if(lCount > 0)
            {
                pasDbExecSqlF("update ncsgroup set groupname='%s',pid=%d,groupcode='%s' where groupid=%d ", caGroupname, lPid, caGroupcode, lGroupid);
            }
            else
            {
                pasDbExecSqlF("insert into ncsgroup(groupid,groupname,descr,pid,groupcode) values(%d,'%s','%s',%d,'%s')", lGroupid, caGroupname, caGroupname, lPid, caGroupcode);
            }
        }
        strcpy(caGroupcode2, "");
        strcpy(caGroupname2, "");
        strcpy(caGroupid2, "");
    }

    if(!utStrIsSpaces(caDel))    /* 删除选中的项目*/
    {
        if(strlen(caSesid) > 0)
        {
            sprintf(sql, "select count(*) from  ncsuser  where groupid in(%s)\n", caSesid);
            pasDbOneRecord(sql, 0, UT_TYPE_LONG, 4, &handle);
            memset(sql, 0, sizeof(sql));
            sprintf(sql, "select count(*) from  ncsgroup where pid in (%s)\n", caSesid);
            pasDbOneRecord(sql, 0, UT_TYPE_LONG, 4, &child_node);
            if(handle == 0 && child_node == 0)
            {
                //printf("delete from ncsuser where groupid in(%s)\n",caSesid);
                //iReturn = pasDbExecSqlF("delete from ncsuser where groupid in(%s)",caSesid);

                iReturn = pasDbExecSqlF("delete from ncsgroup where groupid in(%s)", caSesid);
                printf("delete from ncsgroup where groupid in(%s)\n", caSesid);
                sprintf(caMsg, "delete from ncsgroup where groupid in(%s) ", caSesid);
                if(iReturn == 0)
                {
                    ncsWriteSysLog(psMsgHead, caUsername2, "05", "成功", caMsg);
                }
                else
                {
                    ncsWriteSysLog(psMsgHead, caUsername2, "05", "失败", caMsg);
                }
            }


        }

    }

    lCurPg = atol(caPage);//当前页面
    if(lCurPg <= 0) lCurPg = 1 ;//如若当前页面小于0，置1


    if(strlen(caLimit) > 0)
    {
        lRowNum = atol(caLimit);
    }
    else
    {
        lRowNum = 40; //每一页面行数
    }

    lStartRec = (lCurPg - 1) * lRowNum;   //当前页面的开始第一行的行数


    sprintf(caSmt, "select count(*) from ncsgroup where 1=1");

    if(strlen(caGroupname2) != 0)
    {
        sprintf(caSmt + strlen(caSmt), "  and groupname like '%c%s%c' ", '%', caGroupname2, '%');
    }

    if(strlen(caGroupcode2) > 0)
    {
        sprintf(caSmt + strlen(caSmt), " and groupcode=%s ", caGroupcode2);
    }
    if(strlen(caGroupid) > 0)
    {
        sprintf(caSmt + strlen(caSmt), " and groupid in (%s) ", getGroupid(atol(caGroupid)));
    }
    if(strlen(caGroups) > 0)
    {
        sprintf(caSmt + strlen(caSmt), " and groupid in (%s) ", caGroups);
    }

    // printf("caSmt=%s\n",caSmt);
    iReturn = pasDbOneRecord(caSmt, 0, UT_TYPE_LONG, 4, &lCount);


    if(iReturn != 0)
    {
        utWebDispMsg(iFd, psMsgHead, "nc/ncmsg_back.htm", "用户查询", "查询数据出错 ");
        return 0;
    }

    //  lSumHash=lCount*1.3+1;
    lSumHash = 1000;
    //printf("lSumHash=%d\n",lSumHash);
    pHash = (unsigned char *)pasLHashInit(lSumHash, lSumHash, sizeof(struct stData), 0, 4);
    if(pHash == NULL)
    {
        utWebDispMsg(iFd, psMsgHead, "nc/ncmsg_back.htm", "分配内存出错", "分配内存出错");
        return (-1);
    }



    sprintf(caTemp, "select groupid,groupname from ncsgroup  ");
    psCur = pasDbOpenSql(caTemp, 0);
    lGroupid = 0;
    memset(caGroupname, 0, sizeof(caGroupname));
    iReturn = pasDbFetchInto(psCur,
                             UT_TYPE_LONG, 4, &lGroupid,
                             UT_TYPE_STRING, 32, caGroupname);



    while((iReturn == 0) || (iReturn == 1405))
    {

        psData = (struct stData *)pasLHashLookA(pHash, &lGroupid);
        if(psData)
        {
            strcpy(psData->caGroupname, caGroupname);
        }
        lGroupid = 0;
        memset(caGroupname, 0, sizeof(caGroupname));
        iReturn = pasDbFetchInto(psCur,
                                 UT_TYPE_LONG, 4, &lGroupid,
                                 UT_TYPE_STRING, 32, caGroupname);
    }
    pasDbCloseCursor(psCur);



    sprintf(caTemp, "select count(*),groupid from ncsuser group by groupid ");
    psCur = pasDbOpenSql(caTemp, 0);
    lCount_d = 0;
    lGroupid = 0;
    iReturn = pasDbFetchInto(psCur,
                             UT_TYPE_LONG, 4, &lCount_d,
                             UT_TYPE_LONG, 4, &lGroupid);



    while((iReturn == 0) || (iReturn == 1405))
    {

        psData = (struct stData *)pasLHashLookA(pHash, &lGroupid);
        if(psData)
        {
            psData->lCount = lCount_d;
        }
        lCount_d = 0;
        lGroupid = 0;
        iReturn = pasDbFetchInto(psCur,
                                 UT_TYPE_LONG, 4, &lCount_d,
                                 UT_TYPE_LONG, 4, &lGroupid);
    }
    pasDbCloseCursor(psCur);






    sprintf(caSmt, "select groupid,groupname,pid,groupcode from ncsgroup where 1=1");
    if(strlen(caGroupid) > 0)
    {
        sprintf(caSmt + strlen(caSmt), " and groupid in (%s) ", getGroupid(atol(caGroupid)));
    }
    if(strlen(caGroups) > 0)
    {
        sprintf(caSmt + strlen(caSmt), " and groupid in (%s) ", caGroups);
    }
    if(strlen(caGroupname2) != 0)
    {
        sprintf(caSmt + strlen(caSmt), "  and groupname like '%c%s%c' ", '%', caGroupname2, '%');
    }

    if(strlen(caGroupcode2) > 0)
    {
        sprintf(caSmt + strlen(caSmt), " and groupcode=%s ", caGroupcode2);
    }

    if(strlen(caSort) > 0)
    {
        sprintf(caSmt + strlen(caSmt), "  order by pid limit %lu,%lu", lStartRec, lRowNum);
    }
    else
    {
        sprintf(caSmt + strlen(caSmt), "  order by pid limit %lu,%lu", lStartRec, lRowNum);
    }
    printf("caSmt=%s\n", caSmt);

    psCur = pasDbOpenSql(caSmt, 0);
    if(psCur == NULL)
    {
        free(pHash);
        utWebDispMsg(iFd, psMsgHead, "nc/ncmsg_back.htm", ncsLang("0613网站访问查询"), ncsLang("0549数据库出错"));
        return 0;
    }


    psDbHead = utPltInitDb();


    lGroupid = 0;
    lPid = 0;
    memset(caGroupcode, 0, sizeof(caGroupcode));
    memset(caGroupname, 0, sizeof(caGroupname));
    iReturn = pasDbFetchInto(psCur, UT_TYPE_LONG, 4, &lGroupid,
                             UT_TYPE_STRING, 30, caGroupname,
                             UT_TYPE_LONG, 4, &lPid,
                             UT_TYPE_STRING, 10, caGroupcode);
    iNum = 0;

    while(iReturn == 0 || iReturn == 1405 && iNum < lRowNum)
    {
        if(iNum > 0)
        {
            utPltPutLoopVar(psDbHead, "dh", iNum + 1, ",");
        }
        iNum++;
        utPltPutLoopVar(psDbHead, "groupname", iNum, caGroupname);
        utPltPutLoopVarF(psDbHead, "groupid", iNum, "%d", lGroupid);
        utPltPutLoopVar(psDbHead, "groupcode", iNum, caGroupcode);
        utPltPutLoopVarF(psDbHead, "pid", iNum, "%d", lPid);

        psData = (struct stData *)pasLHashLook(pHash, &lPid);
        if(psData)
        {
            utPltPutLoopVar(psDbHead, "pname", iNum, psData->caGroupname);

        }

        else
        {

            utPltPutLoopVar(psDbHead, "pname", iNum, "");

        }
        psData = (struct stData *)pasLHashLook(pHash, &lGroupid);
        if(psData)
        {
            utPltPutLoopVarF(psDbHead, "count", iNum, "%d", psData->lCount);
        }

        lGroupid = 0;
        lPid = 0;
        memset(caGroupcode, 0, sizeof(caGroupcode));
        memset(caGroupname, 0, sizeof(caGroupname));
        iReturn = pasDbFetchInto(psCur, UT_TYPE_LONG, 4, &lGroupid,
                                 UT_TYPE_STRING, 30, caGroupname,
                                 UT_TYPE_LONG, 4, &lPid,
                                 UT_TYPE_STRING, 10, caGroupcode);
    }
    pasDbCloseCursor(psCur);
    lTotPg = (lCount - 1) / lRowNum + 1;
    lTotRec = lCount;
    i = 0;

    utPltPutVar(psDbHead, "sort", caSort);
    utPltPutVar(psDbHead, "sortby", caSortby);
    utPltPutVarF(psDbHead, "child_node", "%lu", child_node);
    utPltPutVarF(psDbHead, "handle", "%lu", handle);
    utPltPutVarF(psDbHead, "TotRec", "%lu", lTotRec);
    utPltPutVarF(psDbHead, "TotPg", "%lu", lTotPg);
    utPltPutVarF(psDbHead, "CurPg", "%lu", lCurPg);
    utPltPutVar(psDbHead, "groupid", caGroupid);

    if(pHash) free(pHash);


    ncsWriteSysLog(psMsgHead, caUsername2, "06", "成功", "查看上网服务场所列表信息");


    utPltOutToHtml(iFd, psMsgHead, psDbHead, "v4/ncs_dwfzgl_list.htm");


    return 0;
}


//获取设备警总数和场所告警总数
int getAlarmNum(utShmHead *psShmHead, int iFd, utMsgHead *psMsgHead)
{
    utPltDbHead *psDbHead = utPltInitDb();

    char sql[2048];
    int iReturn;
    int iClientAlarmCount = 0;
    int iApAlarmCount = 0;
    //获取场所告警数量:
    memset(sql, 0, sizeof(sql));
    strcpy(sql, "select count(*) from (select description from ncsuser,nctermsysalarm where ncsuser.username=nctermsysalarm.description and  alarmcode='10007' and status=0) as aa");
    iReturn = pasDbOneRecord(sql, 0, UT_TYPE_LONG, 4, &iClientAlarmCount);
    if(iReturn != 0)
    {
        printf("sql = %s 执行错误\n", sql);
    }
    memset(sql, 0, sizeof(sql));

    //获取设备离线告警数量:
    unsigned char* pHash = NULL;
    ncApSrvOnline *psDevOnline;
    pasHashInfo sHashInfo;
    long lTime = 0;
    long  maxTimeoutSeconds = utComGetVar_ld(psShmHead, "MaxTimeoutSecs", MAX_TIMEOUT_SECONDS);

    pHash = utShmHashHead(psShmHead, NC_LNK_APSRVONLINE);
    if(pHash == NULL)
    {
        printf("NC_LNK_APSRVONLINE Memory Error \n");
        return (-1);
    }
    lTime = time(0);
    psDevOnline = (ncApSrvOnline *)pasHashFirst(pHash, &sHashInfo);
    while(psDevOnline)
    {
        if(lTime - psDevOnline->lasttime > maxTimeoutSeconds)
        {
            //离线设备
            iApAlarmCount++;
        }
        else
        {
            //在线设备
        }
        psDevOnline = (ncApSrvOnline *)pasHashNextS(&sHashInfo);
    }
    utPltPutVarF(psDbHead, "ClientAlarmCount", "%lu", iClientAlarmCount);
    utPltPutVarF(psDbHead, "ApAlarmCount", "%lu", iApAlarmCount);
    printf("iClientAlarmCount=%lu\n", iClientAlarmCount);
    printf("iApAlarmCount=%d\n", iApAlarmCount);
    //utPltOutToHtml(iFd, psMsgHead, psDbHead, "mac/frontPage/getAlarmNum.htm");
    utPltOutToHtml(iFd, psMsgHead, psDbHead, "/normally/getAlarmNum.htm");
    return 0;

}

int procapImportSetFun(utShmHead *psShmHead)
{

    pasSetTcpFunName("ncs_imp_MAC", ncs_imp_MAC, 0);
    pasSetTcpFunName("ncsDrNext_mac", ncsDrNext_mac, 0);
    pasSetTcpFunName("ncs_mac_imp", ncs_mac_imp, 0);
    pasSetTcpFunName("ncS_macUserDr_Next", ncS_macUserDr_Next, 0);
    pasSetTcpFunName("ncs_APsb_imp", ncs_APsb_imp, 0);
    pasSetTcpFunName("ncS_APsbDr_Next", ncS_APsbDr_Next, 0);
    pasSetTcpFunName("ncsSysystem_alarm", ncsSysystem_alarm, 0);
    pasSetTcpFunName("ncsFacCode_v9", ncsFacCode_v9, 0);
    //显示单位组列表
    pasSetTcpFunName("ncsWebClientClassList_v9", ncsWebClientClassList_v9, 0);
    pasSetTcpFunName("ncsSysystem_alarmOne", ncsSysystem_alarmOne, 0);
    //获取设备警总数和场所告警总数
    pasSetTcpFunName("getAlarmNum", getAlarmNum, 0);
}