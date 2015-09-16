/* ������---�й�Web��Ӧ��
     Modify 2002/9/9   by Liyunming*/
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
#include <time.h>
#include "utoall.h"
#include "utoplt01.h"
#include "pasdb.h"
#include "dsutl.h"
#include "dsclt.h"
#include "ncsdef.h"
#include"dlfcn.h"

#include "pasdef.h"

/* ͷ�ļ��ؼ����ݽṹ */
#include "ncapi.h"
#include "ncmac.h"

#define INFOQUERY_DEBUG


//ncsCurrent_FromRAM  ����ʵʱ��Ϣ�Ľṹ��
typedef  struct stCurrentInfo
{
    uchar caServicename[68];
    uchar caDispname[68];
    uint4 caStime;
    char    lrssi;
    char    urssi;
    uchar caMac[36];
    uchar caLongitude[16];
    uchar caLatitude[16];
    uchar caSsid[36];
    uchar caApmac[36];
    uchar   encrypt;
    uchar caServiceCode[20];
    uchar caApname[24];
    uchar caVname[64];
    uchar caTermtype[36];

} stCurInfoForty;

//ncsCurrent_FromRAM  �����¼���ṹ��������
static int InsertItemToStuct(stCurInfoForty* pStCurrentForty, int iNum, ncApSrvOnline* psAp, ncLbsMacLocation *psMacLoc)
{
    char caMacStr[20] = "", caMacStr1[20] = "";
    if(psAp && psMacLoc)
    {
        snprintf(pStCurrentForty[iNum].caServicename, sizeof(pStCurrentForty[iNum].caServicename) - 1, "%s", psAp->servicename);
        snprintf(pStCurrentForty[iNum].caDispname, sizeof(pStCurrentForty[iNum].caDispname) - 1, "%s", psAp->dispname);

        pStCurrentForty[iNum].caStime = psMacLoc->starttime;

        pStCurrentForty[iNum].lrssi = psMacLoc->lrssi;
        pStCurrentForty[iNum].urssi = psMacLoc->urssi;

        snprintf(pStCurrentForty[iNum].caMac, sizeof(pStCurrentForty[iNum].caMac) - 1, "%s", (const char*)pasCvtMacStr(psMacLoc->mac, caMacStr));
        snprintf(pStCurrentForty[iNum].caLongitude, sizeof(pStCurrentForty[iNum].caLongitude) - 1, "%s", psMacLoc->longitude);
        snprintf(pStCurrentForty[iNum].caLatitude, sizeof(pStCurrentForty[iNum].caLatitude) - 1, "%s", psMacLoc->latitude);
        snprintf(pStCurrentForty[iNum].caSsid, sizeof(pStCurrentForty[iNum].caSsid) - 1, "%s", psMacLoc->ssid);
        snprintf(pStCurrentForty[iNum].caApmac, sizeof(pStCurrentForty[iNum].caApmac) - 1, "%s", (const char*)pasCvtMacStr(psMacLoc->apmac, caMacStr1));

        pStCurrentForty[iNum].encrypt = psMacLoc->encrypt;
        snprintf(pStCurrentForty[iNum].caServiceCode, sizeof(pStCurrentForty[iNum].caServiceCode) - 1, "%s", psAp->servicecode);

#ifdef  INFOQUERY_DEBUG
        //�������
        /*printf("\n\n InsertItemToStuct pStCurrentForty[%d].caServicename) = %s\n", iNum, pStCurrentForty[iNum].caServicename);
        printf("InsertItemToStuct pStCurrentForty[%d].caMac) = %s\n", iNum, pStCurrentForty[iNum].caMac);
        printf("InsertItemToStuct pStCurrentForty[%d].caApmac) = %s\n", iNum, pStCurrentForty[iNum].caApmac);*/
#endif

        snprintf(pStCurrentForty[iNum].caApname, sizeof(pStCurrentForty[iNum].caApname) - 1, "%s", psAp->apname);
        snprintf(pStCurrentForty[iNum].caVname, sizeof(pStCurrentForty[iNum].caVname) - 1, "%s", psMacLoc->name);
        snprintf(pStCurrentForty[iNum].caTermtype, sizeof(pStCurrentForty[iNum].caTermtype) - 1, "%s", psMacLoc->termtype);
    }
    else
    {
        return -1;
    }

    return 0;
}

//ncsCurrent_FromRAM  ʵʱ��Ϣ������ʱ������
static void choiseSort(stCurInfoForty *pstrCur, int iLen)
{
    int i, j, k;
    stCurInfoForty stTemp;


    for(i = 0; i < iLen - 1; i++)
    {
        k = i; //���ǺŸ�ֵ
        for(j = i + 1; j < iLen; j++)
        {
            if(pstrCur[k].caStime > pstrCur[j].caStime)
                k = j; //��k����ָ����СԪ��

            if(i != k)
            {
                //��k!=i�ǲŽ���������a[i]��Ϊ��С
                memset(&stTemp, 0, sizeof(stTemp));
                memcpy(&stTemp, &pstrCur[i], sizeof(stCurInfoForty));
                memcpy(&pstrCur[i], &pstrCur[k], sizeof(stCurInfoForty));
                memcpy(&pstrCur[k], &stTemp, sizeof(stCurInfoForty));

            }
        }
    }
}

//ncsCurrent_FromRAM  ������ݵ�������
static int outPutJson_current(utPltDbHead *psDbHead, stCurInfoForty* pStCurrentForty, int i)
{
    if(psDbHead)
    {
        /* ���뻺���� */
        utPltPutLoopVarF(psDbHead, "servicename", i + 1, "%s", pStCurrentForty[i].caServicename);
        utPltPutLoopVarF(psDbHead, "dispname", i + 1, "%s", pStCurrentForty[i].caDispname);
        utPltPutLoopVarF(psDbHead, "stime", i + 1, "%s", utTimFormat("%Y-%m-%d %H:%M:%S", pStCurrentForty[i].caStime));

        //�������

#ifdef  INFOQUERY_DEBUG
        /*printf("\n\n outPutJson_current pStCurrentForty[%d].caServicename) = %s\n", i, pStCurrentForty[i].caServicename);
        printf("outPutJson_current pStCurrentForty[%d].caMac) = %s\n", i, pStCurrentForty[i].caMac);
        printf("outPutJson_current pStCurrentForty[%d].caApmac) = %s\n", i, pStCurrentForty[i].caApmac);*/
#endif


        utPltPutLoopVarF(psDbHead, "lssi", i + 1, "%5d", pStCurrentForty[i].lrssi);
        utPltPutLoopVarF(psDbHead, "ussi", i + 1, "%5d", pStCurrentForty[i].urssi);
        utPltPutLoopVarF(psDbHead, "mac", i + 1, "%s", pStCurrentForty[i].caMac);
        utPltPutLoopVarF(psDbHead, "longitude", i + 1, "%s", pStCurrentForty[i].caLongitude);
        utPltPutLoopVarF(psDbHead, "latitude", i + 1, "%s", pStCurrentForty[i].caLatitude);
        utPltPutLoopVarF(psDbHead, "ssid", i + 1, "%s", pStCurrentForty[i].caSsid);
        utPltPutLoopVarF(psDbHead, "apmac", i + 1, "%s", pStCurrentForty[i].caApmac);
        utPltPutLoopVarF(psDbHead, "security", i + 1, "%d", pStCurrentForty[i].encrypt);
        utPltPutLoopVarF(psDbHead, "servicecode", i + 1, "%s", pStCurrentForty[i].caServiceCode);
        utPltPutLoopVarF(psDbHead, "apname", i + 1, "%s", pStCurrentForty[i].caApname);
        utPltPutLoopVarF(psDbHead, "vname", i + 1, "%s", pStCurrentForty[i].caVname);
        utPltPutLoopVarF(psDbHead, "termtype", i + 1, "%s", pStCurrentForty[i].caTermtype);

        return 0;
    }

    return -1;
}

//ͨ�� GroupId ��ȡ�������� groupid
static char *myGetGroupCodeByGroupid(utShmHead *psShmHead, char *caGroupid)
{
    static char caReturn[8024];
    char caServicecode[32];
    char caGroupcode[30];
    char caIds[1024];
    char caTempid[1024], caTempcode[1024];
    int iReturn, lId, iNum;
    pasDbCursor *psCur;
    memset(caReturn, 0, sizeof(caReturn));

    iNum = 0;

    psCur = pasDbOpenSqlF("select distinct groupcode from ncsgroup where   groupid in(%s) ", caGroupid);
    if(psCur)
    {
        iReturn = 0;
        lId = 0;
        memset(caGroupcode, 0, sizeof(caGroupcode));
        iReturn = pasDbFetchInto(psCur,
                                 UT_TYPE_STRING, 14, caGroupcode);
        iNum = 0;
        while(iReturn == 0 || iReturn == 1405)
        {
            if(iNum == 0)
            {
                sprintf(caReturn, "\"%s\"", caGroupcode);
            }
            else
            {
                sprintf(caReturn + strlen(caReturn), ",\"%s\"", caGroupcode);
            }
            iNum++;

            memset(caGroupcode, 0, sizeof(caGroupcode));
            iReturn = pasDbFetchInto(psCur,
                                     UT_TYPE_STRING, 14, caGroupcode);
        }
        pasDbCloseCursor(psCur);
    }
    //printf("*************************************************************\n");
    //printf("caReturn = %s\n\n", caReturn);

    //       sprintf(caReturn,"%s",caOpt);
    sprintf(caIds, "%s", caGroupid);
    iNum = 0;
    while(strlen(caIds) > 0)
    {
        memset(caTempid, 0, sizeof(caTempid));
        iNum = 0;

        //printf("caIds = %s\n\n", caIds);

        psCur = pasDbOpenSqlF("select groupid,groupcode from ncsgroup where   pid in(%s) ", caIds);
        if(psCur)
        {
            iReturn = 0;
            lId = 0;
            memset(caGroupcode, 0, sizeof(caGroupcode));
            iReturn = pasDbFetchInto(psCur, UT_TYPE_ULONG, 4, &lId,
                                     UT_TYPE_STRING, 14, caGroupcode);
            while(iReturn == 0 || iReturn == 1405)
            {
                if(iNum == 100) break;
                if(iNum == 0)
                {
                    sprintf(caTempid, "%lu", lId);
                    sprintf(caTempcode, "\"%s\"", caGroupcode);
                }
                else
                {
                    sprintf(caTempid + strlen(caTempid), ",%lu", lId);
                    sprintf(caTempcode + strlen(caTempcode), ",\"%s\"", caGroupcode);
                }

                memset(caGroupcode, 0, sizeof(caGroupcode));
                iReturn = pasDbFetchInto(psCur, UT_TYPE_ULONG, 4, &lId,
                                         UT_TYPE_STRING, 14, caGroupcode);

                iNum++;

            }

        }
        pasDbCloseCursor(psCur);

        strcpy(caIds, caTempid);

        //printf("caTempcode = %s\n\n", caTempcode);
        if(strlen(caTempcode) > 0)
        {
            sprintf(caReturn + strlen(caReturn), ",%s", caTempcode);
        }
    }

    //if(strlen(caTempcode)>0){
    //         sprintf(caReturn+strlen(caReturn),",%s",caTempcode);
    // }

    //printf("caReturn = %s\n\n", caReturn);
    //printf("*************************************************************\n");
    return &caReturn[0];



}


/* ���ܷ�װ������ȡ���ڸ�ʽ�е��ꡢ�� */
static int timeToStringPlace(time_t now, char *year, char *mon)
{
    if((year == NULL) || (mon == NULL) || (now == 0))
    {
        return -1;
    }
    struct tm*  time1 = (struct tm *)localtime(&now);
    //��
    snprintf(year, 5, "%d", time1->tm_year + 1900);
    //��
    if((time1->tm_mon + 1 > 0) && (time1->tm_mon + 1 <= 9))
        snprintf(mon, 3, "0%d", time1->tm_mon + 1);
    else
        snprintf(mon, 3, "%d", time1->tm_mon + 1);
    return 0;
}

static char* MyreplaceAll(char* src, char oldChar, char newChar)
{
    char * head = src;
    while(*src != '\0')
    {
        if(*src == oldChar)
            *src = newChar;
        src++;
    }
    return head;
}

static void MyremoveAll(char* src, char ch)
{
    int i, j;
    for(i = 0; src[i] != '\0'; i++)
    {
        if(src[i] == ch)
        {
            for(j = i; src[j] != '\0'; j++)
                src[j] = src[j + 1];
        }
    }
}


/* (��δ���� ��ֹ2015/9/6 9:21)��ȡ��ǰ�û�ѡ������ caSelectGroups ��
             ����Ȩ�޷�Χ�ڵ� caAuthorityGroups ���е� outbuf(servicecodes) */
static int selectGroupsIsInAuthorityGroups(char *caSelectGroups, char *caAuthorityGroups, char* outbuf, int buflen)
{
    if(!strlen(outbuf))
    {
        memcpy(outbuf, "��ǰ�û���Ȩ�޲鿴��ѡ������", strlen("��ǰ�û���Ȩ�޲鿴��ѡ������"));
        return -1;
    }

    //��ȡ��Ȩ�����г��� servicecode
    int len = strlen(caAuthorityGroups) + 1;
    char* pos1 = caAuthorityGroups;
    char* pos2 = NULL;
    int   len1 = 0, len2 = 0;
    char  idbuf[24] = "";
    memset(outbuf, 0, buflen);

    pos2 = strchr(pos1, ',');               //��ȡ��һ��','��λ��
    while(pos2 != NULL)
    {
        len1 = pos2 - pos1;                 //��ȡ��һ��','֮ǰ�ַ�������
        if(len1 > 20)
            break;

        len2 = strlen(outbuf);              //��λoutbuf������
        if(len2 > (len - 20))
            break;

        memset(idbuf, 0, sizeof(idbuf));
        memcpy(idbuf, pos1, len1);          //������ǰ pos1 ',' ��֮ǰ
        if(strstr(caSelectGroups, idbuf) != NULL) //�ȶԵ�ǰ pos1 �� caSelectGroups �г��ֵ�λ��
        {
            if(outbuf[0])
            {
                sprintf(outbuf + strlen(outbuf), ",");
                len2 = strlen(outbuf);
                memcpy(outbuf + len2, idbuf, strlen(idbuf));
            }
            else
            {
                memcpy(outbuf + len2, idbuf, strlen(idbuf));
            }
        }
        pos1 = pos2 + 1;
        pos2 = strchr(pos1, ',');
    }
    if(strlen(pos1) == 16)
    {
        memset(idbuf, 0, sizeof(idbuf));
        memcpy(idbuf, pos1, 16);
        if(strstr(caSelectGroups, idbuf) != NULL)
        {
            sprintf(outbuf + strlen(outbuf), ",");
            len2 = strlen(outbuf);
            memcpy(outbuf + len2, idbuf, strlen(idbuf));
        }
    }
    if(!strlen(outbuf))
    {
        memcpy(outbuf, "��ǰ�û���Ȩ�޲鿴��ѡ������", strlen("��ǰ�û���Ȩ�޲鿴��ѡ������"));
        return -1;
    }

    return 0;
}


/*
    ncsMacLog_mactermlist_v4 mac��־�߼���ѯ���ܣ����ݰ�ȫ�������ƻ�ȡ servicecodes
    ���̣� ncsfactorycod ���У�caSname -> code;
          ncsfactorycod.code = ncaplist.fcode; ��ȡ ncaplist.servicecode;
*/
static int getServicecodeBycaSname(utShmHead *psShmHead, char *caSname, char *outbuf, int buflen)
{
    if(!psShmHead && !caSname && !outbuf && !buflen)
    {
        memcpy(outbuf, "��ǰ�����������", strlen("��ǰ�����������"));
        return -1;
    }

    //1.���� ncsfactorycod.name ��ѯ�� ncsfactorycod.code;
    //2.���� ncaplist.fcode in ncsfactorycod.code ��ѯ�� ncaplist.servicecode ������;
    char caSql[1024] = "";
    snprintf(caSql, sizeof(caSql) - 1, "select distinct(b.servicecode) from ncaplist b where b.fcode in (select a.code from ncsfactorycod a where a.name like '%c%s%c') ", '%', caSname, '%');
    //printf(" ��ȫ�������ƣ�%s   caSql = %s\n\n ", caSname, caSql);

    memset(outbuf, 0, buflen);

    int iReturn = 0;
    int iNum = 0;
    pasDbCursor *psCur;
    psCur = pasDbOpenSqlF(caSql);
    if(psCur)
    {
        int nRet = 0;
        char caServiceCode[16] = "";

        nRet = pasDbFetchInto(psCur, UT_TYPE_STRING, 15, &caServiceCode);
        while(0 == nRet || 1405 == nRet)
        {
            if(0 == iNum)
            {
                //snprintf(outbuf, sizeof(outbuf) - 1, "\"%s\"", caServiceCode);
                sprintf(outbuf, "\"%s\"", caServiceCode);
            }
            else
            {
                //snprintf(outbuf + strlen(outbuf), sizeof(outbuf) - 1, ",\"%s\"", caServiceCode);
                sprintf(outbuf + strlen(outbuf), ",\"%s\"", caServiceCode);
            }
            iNum++;

            memset(caServiceCode, 0, sizeof(caServiceCode));
            nRet = pasDbFetchInto(psCur, UT_TYPE_STRING, 15, caServiceCode);
        }

        pasDbCloseCursor(psCur);
    }
    //printf(" outbuf = %s\n\n", outbuf);
    return 0;
}

/*
    ncsMacLog_mactermlist_v4 mac��־��ѯ���ù��ܣ�����ǰ̨������ʱ���־��
*/
//static int selectMacInfoByTimeAndPage()

static char **ncsUtlGetTable3(char *sdate, char *edate, char *stime1, char *etime1, char *prefix, unsigned long *lStartTime, unsigned long *lEndTime, int *lCount)
{
    char stime[15] = "";
    char etime[15] = "";

    snprintf(stime, sizeof(stime), "%c%c%c%c%c%c%c%c%c%c%c%c%c%c", sdate[0], sdate[1], sdate[2], sdate[3], sdate[5], sdate[6], sdate[8], sdate[9], stime1[0], stime1[1], stime1[3], stime1[4], stime1[6], stime1[7]);
    snprintf(etime, sizeof(stime), "%c%c%c%c%c%c%c%c%c%c%c%c%c%c", edate[0], edate[1], edate[2], edate[3], edate[5], edate[6], edate[8], edate[9], etime1[0], etime1[1], etime1[3], etime1[4], etime1[6], etime1[7]);
    *lStartTime = utTimStrToLong("%Y%m%d%H%M%S", stime);

    unsigned long lTime = utTimStrToLong("%Y%m%d%H%M%S", etime);
    *lEndTime = lTime;

    unsigned long lStartTime1 = *lStartTime;

    int i = 0;

    char minYear[5] = "";
    char maxYear[5] = "";
    char minMon[3] = "";
    char maxMon[3] = "";

    strcpy(minYear, utTimFormat("%Y", lStartTime1));
    strcpy(maxYear, utTimFormat("%Y", lTime));

    strcpy(minMon, utTimFormat("%m", lStartTime1));
    strcpy(maxMon, utTimFormat("%m", lTime));

    int iMin = atoi(minYear) * 12 + atoi(minMon);
    int iMax = atoi(maxYear) * 12 + atoi(maxMon);
    int strLen = strlen(prefix) + 7;

    *lCount = (iMax - iMin) + 1;

    int a;
    int b;
    char **tmp = (char **)malloc(sizeof(char *) * ((iMax - iMin) + 1));
    if(tmp != NULL)
    {
        int j = 0;
        for(i = iMin; i <= iMax; i++)
        {
            tmp[j] = (char *)malloc(strLen);
            if(tmp[j] != NULL)
            {
                a = i / 12;
                b = i % 12;
                if(b == 0)
                {
                    a--;
                    b = 12;
                }
                snprintf(tmp[j], strLen, "%s%04d%02d", prefix, a, b);
            }
            j++;
        }
    }
    return tmp;
}
static char **ncsUtlGetTable(unsigned long lTime, int days, char *prefix, unsigned long *lStartTime, int *lCount)
{
    char sdate[33] = "";
    strcpy(sdate, utTimFormat("%Y-%m-%d", lTime));//��ǰ����
    strcat(sdate, " 00:00:00");
    *lStartTime = utTimStrToLong("%Y/%m/%d %H:%M:%S", sdate) - (days - 1) * 86400;

    unsigned long lStartTime1 = *lStartTime;

    int i = 0;

    char minYear[5] = "";
    char maxYear[5] = "";
    char minMon[3] = "";
    char maxMon[3] = "";

    strcpy(minYear, utTimFormat("%Y", lStartTime1));
    strcpy(maxYear, utTimFormat("%Y", lTime));

    strcpy(minMon, utTimFormat("%m", lStartTime1));
    strcpy(maxMon, utTimFormat("%m", lTime));

    int iMin = atoi(minYear) * 12 + atoi(minMon);
    int iMax = atoi(maxYear) * 12 + atoi(maxMon);
    int strLen = strlen(prefix) + 7;

    *lCount = (iMax - iMin) + 1;

    int a;
    int b;
    char **tmp = (char **)malloc(sizeof(char *) * ((iMax - iMin) + 1));
    if(tmp != NULL)
    {
        int j = 0;
        for(i = iMin; i <= iMax; i++)
        {
            tmp[j] = (char *)malloc(strLen);
            if(tmp[j] != NULL)
            {
                a = i / 12;
                b = i % 12;
                if(b == 0)
                {
                    a--;
                    b = 12;
                }
                snprintf(tmp[j], strLen, "%s%04d%02d", prefix, a, b);
            }
            j++;
        }
    }
    return tmp;
}
static char *getDsGroupid()
{
    static char caReturn[1024];
    char caIds[1024], caTempid[1024];
    char caOpt[256];
    int iReturn, lId, iNum;
    pasDbCursor *psCur;
    memset(caReturn, 0, sizeof(caReturn));
    lId = 0;

    iReturn = dsCltGetMyInfo(1, "Userid", &lId);
    printf("dsiReturn=%d\n", iReturn);
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
        printf("select groupid from ncsgroup where pid in(%s)\n ", caIds);
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
//���ݳ���Ȩ��,��ȡ��λ��ID���
static char *getDsFacGroupid()
{
    static char caReturn[1024];
    char caIds[1024], caTempid[1024];
    char caOpt[256];
    int iReturn, lId, iNum;
    pasDbCursor *psCur;
    char caObj[100][50];
    long i;
    long num = 0;
    memset(caReturn, 0, sizeof(caReturn));


    iReturn = dsCltGetMyInfo(1, "Userid", &lId);
    if(iReturn != 0 || lId <= 0)
    {
        return &caReturn[0];
    }

    memset(caOpt, 0, sizeof(caOpt));
    pasDbOneRecord("select fac from dsuser where id=:id", 1, "id", UT_TYPE_LONG, lId, UT_TYPE_STRING, 255, caOpt);
    if(strstr(caOpt, "all") || strlen(caOpt) == 0)
    {
        return &caReturn[0];
    }
    num = ncs_SepChar0(caOpt, ',', caObj);
    for(i = 0; i < num; i++)
    {
        if(i == 0)
            sprintf(caReturn, "\'%s\'", caObj[0]);
        else
        {
            sprintf(caReturn + strlen(caReturn), ",\'%s\'", caObj[i]);
        }
    }

    return &caReturn[0];
}

static char *getGroupcodeSql(char *field, char *caGroupid)
{
    static char caReturn[1024];
    char caIds[1024], caTempid[1024];
    char caGroupcode[20];
    char caTempcode[1024];
    char caOpt[256];
    pasLHashInfo sHashInfo;
    int iReturn, lId, iNum;
    pasDbCursor *psCur;
    long lLen;
    typedef struct ncsDsData_s
    {
        long len;                //�ֶγ���
        char codes[1024];
        long count;
    } ncsDsData;
    char *pHash;
    ncsDsData *psData;

    memset(caReturn, 0, sizeof(caReturn));





    lId = 0;



    pHash = (unsigned char *)pasLHashInit(100, 100, sizeof(struct ncsDsData_s), 0, 4);
    if(pHash == NULL)
    {
        return &caReturn[0];
    }


    psCur = pasDbOpenSqlF("select groupcode from ncsgroup where   groupid in(%s) ", caGroupid);
    if(psCur)
    {
        iReturn = 0;
        lId = 0;
        memset(caGroupcode, 0, sizeof(caGroupcode));
        iReturn = pasDbFetchInto(psCur,
                                 UT_TYPE_STRING, 14, caGroupcode);
        iNum = 0;
        while(iReturn == 0 || iReturn == 1405)
        {
            lLen = strlen(caGroupcode);
            psData = (ncsDsData *)pasLHashLookA(pHash, (char*)&lLen);
            if(psData)
            {
                if(psData->count == 0)
                {
                    sprintf(psData->codes, "\"%s\"", caGroupcode);
                }
                else
                {
                    sprintf(psData->codes + strlen(psData->codes), ",\"%s\"", caGroupcode);
                }
                psData->count++;
            }




            memset(caGroupcode, 0, sizeof(caGroupcode));
            iReturn = pasDbFetchInto(psCur,
                                     UT_TYPE_STRING, 14, caGroupcode);
        }
        pasDbCloseCursor(psCur);
    }


    //       sprintf(caReturn,"%s",caOpt);
    sprintf(caIds, "%s", caGroupid);
    iNum = 0;
    while(strlen(caIds) > 0)
    {
        memset(caTempid, 0, sizeof(caTempid));
        iNum = 0;

        psCur = pasDbOpenSqlF("select groupid,groupcode from ncsgroup where   pid in(%s) ", caIds);
        if(psCur)
        {
            iReturn = 0;
            lId = 0;
            memset(caGroupcode, 0, sizeof(caGroupcode));
            iReturn = pasDbFetchInto(psCur, UT_TYPE_ULONG, 4, &lId,
                                     UT_TYPE_STRING, 14, caGroupcode);
            while(iReturn == 0 || iReturn == 1405)
            {
                if(iNum == 100) break;

                lLen = strlen(caGroupcode);
                psData = (ncsDsData *)pasLHashLookA(pHash, (char*)&lLen);
                if(psData)
                {
                    if(psData->count == 0)
                    {
                        sprintf(psData->codes, "\"%s\"", caGroupcode);
                    }
                    else
                    {
                        sprintf(psData->codes + strlen(psData->codes), ",\"%s\"", caGroupcode);
                    }
                    psData->count++;
                }

                if(iNum == 0)
                {
                    sprintf(caTempid, "%lu", lId);

                }
                else
                {
                    sprintf(caTempid + strlen(caTempid), ",%lu", lId);

                }

                memset(caGroupcode, 0, sizeof(caGroupcode));
                iReturn = pasDbFetchInto(psCur, UT_TYPE_ULONG, 4, &lId,
                                         UT_TYPE_STRING, 14, caGroupcode);

                iNum++;

            }
        }
        pasDbCloseCursor(psCur);


        strcpy(caIds, caTempid);
    }

    //ƴװSQL���
    psData = (ncsDsData *)pasLHashFirst(pHash, &sHashInfo);
    iNum = 0;
    memset(caReturn, 0, sizeof(caReturn));
    while(psData)
    {
        if(iNum == 0)
        {
            sprintf(caReturn, "( left(%s,%d) in (%s) ", field, psData->len, psData->codes);
        }
        else
        {
            sprintf(caReturn + strlen(caReturn), " or left(%s,%d) in (%s) ", field, psData->len, psData->codes);
        }
        iNum++;

        psData = (ncsDsData *)pasLHashNext(&sHashInfo);
    }




    if(iNum > 0)
    {
        sprintf(caReturn + strlen(caReturn), ")");
    }
    free(pHash);
    return &caReturn[0];
}
/* MAC��־��ѯ����ʾ�ն�������Ϣ��־ */
int ncsMacLog_mactermlist_v4(utShmHead *psShmHead, int iFd, utMsgHead *psMsgHead)
{
    char instr_t[8192] = "";
    int iTime_flag = 0;
    int days = 0;
    int iret = 0;
    int _break = 0;
    int i = 0;
    int lCount = 0;
    int num = 0;
    int iNum = 0;

    unsigned long did = 0;
    unsigned long iStart = 0;
    unsigned long iLimit = 0;
    unsigned long lCount1 = 0;
    unsigned long lStartTime = 0;
    unsigned long lTime = time(0);
    unsigned long lTotRec = 0;

    char sdate[11] = "";
    char edate[11] = "";
    char time_flag[2] = "";
    char start[17] = "";
    char limit[17] = "";
    char sort[17] = "";
    char dir[9] = "";
    long lCurPg, lRowNum, lStartRec, lSstarttime;
    char sql[40960] = "";
    char caTotPg[16] = "", caCurPg[16] = "";
    char caPage[12] = "", caLimit[16] = "", caSort[16] = "", caDir[16] = "";
    char caKeyword[64] = "", caMacKeyword[64] = "", caTime_flag[32] = "";
    char sql2[256] = "";
    char frmfile[256] = "";
    char *tmpgbk = NULL;
    char **ptmp = NULL;

    struct sttable
    {
        char tname[32];
        unsigned long lCount;
    };
    struct sttable tableinfo[120];//10�ꣿ
    pasDbCursor *psCur = NULL;
    char caGroups[1024] = "";
    char caFacs[1024] = "";
    char caArea[256] = "", caName2[256] = "";
    char caTemp[1024] = "";
    long iReturn;
    unsigned long lIp;
    char caStime[16] = "";
    char caEtime[16] = "";
    char caTemp_d[64] = "";
    char caGroupid[36] = "", caDid[36] = "";
    char caSdate[24] = "", caEdate[24] = "";
    char caApmac[36] = "", caMac[36] = "", caApname[64] = "", caPosition[64] = "";
    char caCorpname[128] = "";
    char caCont[2048] = "";
    char caServicecode[16] = "", caSearchtype[32] = "";

    /* �û�������˵����еĳ������� */
    char caUserName[64] = "";

    /* �߼���ѯ�����ֶ� */
    char caSname[32] = "";
    char caSsid[36] = "";

    /* �ֻ������� */
    char caPhoneNumber[64] = "";
    char caVname[64] = "";

    /* ���� */
    char caExport[10] = "";

    memset(caKeyword, 0, sizeof(caKeyword));
    strcpy(caFacs, (const char*)getDsFacDid());
    strcpy(caGroups, (const char*)getDsGroupid());
    //printf("*********************************************************************");
    //printf("caGroups = %s\n\n", caGroups);
    //printf("*********************************************************************");

    utPltDbHead *psDbHead = utPltInitDb();
    utMsgPrintMsg(psMsgHead);
    iReturn = utMsgGetSomeNVar(psMsgHead, 26,
                               "TotPg",      UT_TYPE_STRING, 12, caTotPg,
                               "CurPg",      UT_TYPE_STRING, 12, caCurPg,
                               "keyword", UT_TYPE_STRING, 60, caKeyword,
                               "page",            UT_TYPE_STRING, 10, caPage,
                               "limit",           UT_TYPE_STRING, 10, caLimit,
                               "sort",            UT_TYPE_STRING, 15, caSort,
                               "dir",          UT_TYPE_STRING, 8,  caDir,
                               "time_flag",    UT_TYPE_STRING, 8, caTime_flag,
                               "did",          UT_TYPE_STRING, 10, caDid,
                               "groupid",      UT_TYPE_STRING, 10, caGroupid,
                               "username",      UT_TYPE_STRING, 63, caUserName,
                               "sdate",        UT_TYPE_STRING, 12, sdate,
                               "stime",        UT_TYPE_STRING, 10, caStime,
                               "edate",        UT_TYPE_STRING, 12, edate,
                               "etime",        UT_TYPE_STRING, 10, caEtime,
                               "apmac",        UT_TYPE_STRING, 20, caApmac,
                               "mac",          UT_TYPE_STRING, 20, caMac,
                               "macLogExport",      UT_TYPE_STRING, 9, caExport,
                               "searchtype",      UT_TYPE_STRING, 10, caSearchtype,
                               "servicecode",     UT_TYPE_STRING, 15, caServicecode,
                               "servicename",     UT_TYPE_STRING, 60, caCorpname,
                               "sname",           UT_TYPE_STRING, 31, caSname,
                               "ssid",            UT_TYPE_STRING, 30, caSsid,
                               "apname",       UT_TYPE_STRING, 31, caApname,
                               "vname",      UT_TYPE_STRING, 63, caVname,
                               "phonenumber",      UT_TYPE_STRING, 63, caPhoneNumber);

    memcpy(caMacKeyword, caKeyword, sizeof(caKeyword));
    MyremoveAll(caMacKeyword, '-');
    MyremoveAll(caMacKeyword, ':');
    MyremoveAll(caMac, '-');
    MyremoveAll(caMac, ':');
    MyremoveAll(caApmac, '-');
    MyremoveAll(caApmac, ':');
    MyremoveAll(caKeyword, '-');
    MyremoveAll(caKeyword, ':');

    if(strlen(caSearchtype) > 0)
    {
        strcpy(caKeyword, "");
    }
    else
    {
        strcpy(sdate, "");
        strcpy(edate, "");
    }
    memset(caCont, 0, sizeof(caCont));


    if(strlen(caKeyword) > 0)
    {
        strcpy(caTemp_d, pasCvtGBK(2, caKeyword, caTemp, 60));
        strcpy(caKeyword, caTemp_d);
    }
    if(strlen(caCorpname) > 0)
    {
        strcpy(caTemp_d, pasCvtGBK(2, caCorpname, caTemp, 60));
        strcpy(caCorpname, caTemp_d);
    }
    if(strlen(caApname) > 0)
    {
        strcpy(caTemp_d, pasCvtGBK(2, caApname, caTemp, 60));
        strcpy(caApname, caTemp_d);
    }
    if(strlen(caSsid) > 0)
    {
        strcpy(caTemp_d, pasCvtGBK(2, caSsid, caTemp, 60));
        strcpy(caSsid, caTemp_d);
    }

    lCurPg = atol(caPage);
    if(lCurPg <= 0)
        lCurPg = 1;

    if(strlen(caLimit) > 0)
    {
        lRowNum = atol(caLimit);
    }
    else
    {
        lRowNum = 40; //ÿһҳ������
    }
    lStartRec = (lCurPg - 1) * lRowNum;

    iTime_flag = atoi(caTime_flag);
    switch(iTime_flag)
    {
        case 1://����
            days = 1;
            break;
        case 2://�������
            days = 3;
            break;
        case 3://���һ��
            days = 7;
            break;
        case 4://���һ��
            days = 30;
            break;
        case 5://�������
            days = 90;
            break;
        case 6://������꣺����ѯȫ��
            days = 180;
            break;
        default:
            days = 1;
            break;
    }

    if(strlen(sdate) > 0 && strlen(edate) > 0)
    {
        ptmp = ncsUtlGetTable3(sdate, edate, caStime, caEtime, "ncmactermatt_if_", &lStartTime, &lTime, &lCount);
        printf("lStartTime=%d,sdate=%s\n", lStartTime, sdate);
    }
    else
    {
        ptmp = ncsUtlGetTable(lTime, days, "ncmactermatt_if_",  &lStartTime, &lCount);
        lTime = lTime + 2 * 3600;
    }

    memset(caCont, 0, sizeof(caCont));


    char caGroupidJudge[30] = "";   //�ж��������������@ �ַ�
    char caAdvancedPlace[4096] = "";    //����߼���ѯ�������밲ȫ���������µĳ�������;
    if(strlen(caSearchtype) > 0)
    {
        if(strlen(caMac) > 0)
        {
            sprintf(caCont + strlen(caCont), " and replace(a.mac,'-','') like '%c%s%c' ", '%', caMac, '%');
        }
        if(strlen(caApmac) > 0)
        {
            sprintf(caCont + strlen(caCont), " and replace(a.apmac, '-','') like '%c%s%c' ", '%', caApmac, '%');
        }

        /* �߼���ѯ�����ֶ� */
        if(strlen(caServicecode) > 0) //�������
        {
            sprintf(caCont + strlen(caCont), " and a.servicecode like '%c%s%c' ", '%', caServicecode, '%');
        }
        if(strlen(caCorpname) > 0)  //��������
        {
            sprintf(caCont + strlen(caCont), " and a.servicename like '%c%s%c' ", '%', caCorpname, '%');
        }

        if(strlen(caSname) > 0)     //��ȫ�������Ʋ�ѯ
        {
            char caTemp_name[32] = "";
            char caTemp_name2[1024] = "";
            strcpy(caTemp_name, pasCvtGBK(2, caSname, caTemp_name2, 60));
            strcpy(caSname, caTemp_name);

            int* pCount = NULL;

            //ͨ����ȫ�������ƣ���ȡ���Ӧ servicecodes
            int iRet = getServicecodeBycaSname(psShmHead, caSname, caAdvancedPlace, 4096);

            printf("caSname = %s �µĳ�������Ϊ %s \n\n", caSname, caAdvancedPlace);
            sprintf(caCont + strlen(caCont), " and a.servicecode in (%s) ", caAdvancedPlace);

        }
        if(strlen(caSsid) > 0)      //�����ȵ�ssid
        {
            sprintf(caCont + strlen(caCont), " and a.ssid like '%c%s%c' ", '%', caSsid, '%');
        }
        if(strlen(caApname) > 0)    //�ɼ��豸���
        {
            sprintf(caCont + strlen(caCont), " and a.apname like '%c%s%c' ", '%', caApname, '%');
        }
        if(strlen(caVname) > 0)     //������֤�˺�
        {
            sprintf(caCont + strlen(caCont), " and a.vname like '%c%s%c' ", '%', caVname, '%');
        }
    }
    else
    {
        if(strlen(caPhoneNumber) > 0)
        {
            //�ֻ���������1.��̽ǰ̨ҳ��ȫ����������ʹ��; 2.�߼���������;
            if(strlen(caPhoneNumber) > 0)
            {
                sprintf(caCont + strlen(caCont), " and (a.vname like '%c%s%c' ) ", '%', caPhoneNumber, '%');
                printf("caPhoneNumber = %s\n\n", caPhoneNumber);

            }
        }
        if(strlen(caKeyword) > 0)
        {
            /*char caTempKeyword[64] = "";
            caTempKeyword = convmac(caKeyword);
            printf("caTempKeyword = %s, caKeyword = %s\n", caTempKeyword, caKeyword);
            */

            /* �ַ�����Сдת��д */
            int i = 0, j = 0;
            j = strlen(caKeyword);

            for(i = 0; i <= j; i++)
            {
                if(caKeyword[i] >= 'a' && caKeyword[i] <= 'z')
                    caKeyword[i] = caKeyword[i] - 32;
            }
            //Keyword[i] = '\0';
            //printf("After strToUpper: caKeyword = %s \n", caKeyword);

            if(strcmp(caGroupid, "all") == 0)
            {
                printf("��ѯ���г���\n\n");
            }
            else
            {
                /* ���caKeyword��һ���ַ�Ϊ '@' */
                strncpy(caGroupidJudge, caKeyword, 1);
                if(strcmp(caGroupidJudge, "@") == 0)
                {
                    if(strlen(caGroupid) > 0)
                    {
                        sprintf(caCont + strlen(caCont), " and %s", getGroupcodeSql("servicecode", caGroupid));
                    }
                    else
                    {
                        if(strlen(caUserName) > 0)
                        {
                            //printf("In caKeyword @ caUserName = %s\n", caUserName);

                            //ͨ�� caUserId ȥ��ȡ���Ӧ lGroupId
                            sprintf(caCont + strlen(caCont), " and a.servicecode = \'%s\'", caUserName);

                            //printf("caCont = %s \n", caCont);
                        }
                    }


                    /* �ж������caKeyword �Ƿ��еڶ���'@'  �ַ�: ����У���ȡ�����ֵ��Ϊ�������� */
                    memset(caGroupidJudge, 0, sizeof(caGroupidJudge));
                    char *pstrKeywordServiceName = NULL, *pstrKeywordMac = NULL;
                    pstrKeywordServiceName = strtok_r(caKeyword, "@", &pstrKeywordMac);
                    printf("pstrKeywordServiceName, pstrKeywordMac = %s\n", pstrKeywordServiceName, pstrKeywordMac);

                    /* @  ����@  �������������mac/apmac */
                    if(strcmp(pstrKeywordMac, "") != 0)
                        sprintf(caCont + strlen(caCont), " and (replace(a.mac,'-','') like '%c%s%c' or replace(a.apmac,'-','') like '%c%s%c') ", '%', pstrKeywordMac, '%', '%', pstrKeywordMac, '%');
                    //sprintf(caCont+strlen(caCont)," and (a.mac like '%c%s%c' or a.apmac   like '%c%s%c') ",'%',pstrKeywordMac,'%','%',pstrKeywordMac,'%');

                }
                else
                {

                    sprintf(caCont + strlen(caCont), " and (replace(a.mac,'-','') like '%c%s%c' or replace(a.apmac,'-','') like '%c%s%c' or a.vname like '%c%s%c' ) ", '%', caKeyword, '%', '%', caKeyword, '%', '%', caKeyword, '%');
                }
            }

            printf("caCont = %s\n", caCont);
        }

    }



    /*  ��ǰ�û�Ȩ�������ܲ�ѯ���� */
    if(strlen(caGroups) > 0)
    {
        sprintf(caCont + strlen(caCont), " and %s ", getDsGroupcodeSql("servicecode"));
    }


    if(!strlen(caKeyword) && !strlen(caPhoneNumber) && (1 == days || 6 == days))
    {
        //��ȡȥ�غ�mac��
        long lTodayTermMac = 0;
        long lTotalTermMac = 0;
        getMacCount(psShmHead, &lTodayTermMac, &lTotalTermMac);
        printf("��������ȥ��mac�� = %lu, mac��������ȥ��mac��  = %lu\n\n", lTodayTermMac, lTotalTermMac);
        if(1 == days)
            utPltPutVarF(psDbHead, "distinctCount", "%lu", lTodayTermMac);
        else
            utPltPutVarF(psDbHead, "distinctCount", "%lu", lTotalTermMac);
    }
    else
    {
        char sql3[4096] = "";
        unsigned long lCount2 = 0;
        unsigned long lTotRec2 = 0;
        int num2 = 0;

        /* ȥ�غ��ѯ��� */
        for(i = 0; i < lCount; i++)
        {
            lCount2 = 0;
            memset(sql3, 0, sizeof(sql3));
            snprintf(sql3, sizeof(sql3), "select count(distinct a.mac) from %s a where a.stime >= %lu and a.stime <= %lu",  ptmp[i], lStartTime, lTime);
            strcat(sql3, caCont);
            printf("sql3 = %s\n", sql3);
            pasDbOneRecord(sql3, 0, UT_TYPE_ULONG, 4, &lCount2);
            if(lCount2 > 0)
            {
                strcpy(tableinfo[num2].tname, ptmp[i]);
                tableinfo[num2].lCount = lCount2;
                num2++;
            }

            //free(ptmp[i]);
        }
        //free(ptmp);

        for(i = 0; i < num2; i++)
        {
            lTotRec2 += tableinfo[i].lCount;
        }
        printf(" lCount2 = %lu  num2 = %d  lTotRec2 = %lu\n\n", lCount2, num2, lTotRec2);
        utPltPutVarF(psDbHead, "distinctCount", "%lu", lTotRec2);
    }


    for(i = 0; i < lCount; i++)
    {
        lCount1 = 0;
        memset(sql, 0, sizeof(sql));
        snprintf(sql, sizeof(sql), "select count(*) from %s a where a.stime >= %lu and a.stime <= %lu",  ptmp[i], lStartTime, lTime);
        strcat(sql, caCont);

        printf("i=%d, sql = %s\n", i, sql);
        pasDbOneRecord(sql, 0, UT_TYPE_ULONG, 4, &lCount1);
        if(lCount1 > 0)
        {
            strcpy(tableinfo[num].tname, ptmp[i]);
            tableinfo[num].lCount = lCount1;
            num++;
        }

        free(ptmp[i]);
    }
    free(ptmp);

    for(i = 0; i < num; i++)
    {
        lTotRec += tableinfo[i].lCount;
    }
    utPltPutVarF(psDbHead, "TotRec", "%lu", lTotRec);

    for(i = num - 1; i >= 0; i--)
    {
        printf("table[%d] = %s, _lCount1[%d] = %lu\n", i, tableinfo[i].tname, i, tableinfo[i].lCount);
    }



    /* �������� */
    FILE *fp;
    char caFilename[32];
    char caFile[128];
    char caPath[128];

    //ѡ�񵼳��Ļ�
    if(strlen(caExport) > 0)
    {
        printf(" fp caExport  = %s\n\n", caExport);
        sprintf(caFilename, "maclog.csv");
        sprintf(caPath, "%s", "/home/ncmysql/ncs");
        sprintf(caFile, "%s/%s", caPath, caFilename);
        fp = fopen(caFile, "w");
        if(fp == NULL)
        {
            printf("���ݵ�������\n\n");
            return 0;
        }
        fprintf(fp, "mac��־��ѯ\n");   //����
        printf(" д��mac��־��ѯ\n\n");
        ncUtlPrintCsv(fp, 18,
                      UT_TYPE_STRING, "�ն�MAC��ַ",
                      UT_TYPE_STRING, "������֤�˺�",
                      UT_TYPE_STRING, "�ɼ�ʱ��",
                      UT_TYPE_STRING, "�ն˳�ǿ",
                      UT_TYPE_STRING, "��������",
                      UT_TYPE_STRING, "�ɼ��豸����",
                      UT_TYPE_STRING, "�������",
                      UT_TYPE_STRING, "�ɼ��豸���",
                      UT_TYPE_STRING, "�ɼ��豸����",
                      UT_TYPE_STRING, "�ɼ��豸γ��",
                      UT_TYPE_STRING, "�ն�Ʒ��",
                      UT_TYPE_STRING, "�ն���ʷSSID�б�",
                      UT_TYPE_STRING, "��Բɼ��豸X����",
                      UT_TYPE_STRING, "��Բɼ��豸Y����",
                      UT_TYPE_STRING, "�����ȵ�SSID",
                      UT_TYPE_STRING, "�����ȵ�MAC",
                      UT_TYPE_STRING, "�����ȵ�Ƶ��",
                      UT_TYPE_STRING, "�����ȵ��������");
    }
    printf(" num = %d\n\n", num);

    iNum = 0;
    iStart = lStartRec;
    iLimit = lRowNum;

    for(i = num - 1; i >= 0; i--)
    {
        memset(sql, 0, sizeof(sql));
        if(tableinfo[i].lCount <= iStart)
        {
            iStart -= tableinfo[i].lCount;
            continue;
        }
        /* ���ϲɼ��豸���� */
        //snprintf(sql, sizeof(sql), "select a.servicecode,a.servicename,a.address,a.mac,a.apname,a.apmac,a.ssid,a.stime,a.channel,a.rssi,a.security,a.longitude,a.latitude,a.termtype,a.vtype,a.vname, b.dispname from %s a, ncaplist b where a.stime >= %lu and a.stime <= %lu and b.apname = RIGHT(a.apname, 12) ", tableinfo[i].tname, lStartTime, lTime);

        /* ȥ���ɼ��豸���ƹ�����ѯ */
        snprintf(sql, sizeof(sql), "select a.servicecode,a.servicename,a.address,a.mac,a.apname,a.apmac,a.ssid,a.stime,a.channel,a.rssi,a.security,a.longitude,a.latitude,a.termtype,a.vtype,a.vname from %s a where a.stime >= %lu and a.stime <= %lu ", tableinfo[i].tname, lStartTime, lTime);
        strcat(sql, caCont);

        //printf("\n\n sql = %s \n\n caCont = %s\n\n", sql, caCont);

        snprintf(sql + strlen(sql), sizeof(sql) - strlen(sql), " order by a.stime desc limit %lu, %lu", iStart, iLimit < tableinfo[i].lCount ? iLimit : tableinfo[i].lCount);

        if(tableinfo[i].lCount > iStart && tableinfo[i].lCount < iStart + iLimit)
        {
            iLimit = iLimit - (tableinfo[i].lCount - iStart);
            iStart = 0;
        }
        else
        {
            _break = 1;
        }

        printf("__line = %d, sql = %s\n", __LINE__, sql);
        psCur = pasDbOpenSql(sql, 0);

        if(psCur != NULL)
        {
            char caServicecode[16], caServicename[64], caAddress[64], caMac[20], caApname[32], caApmac[20], caSsid[64];
            long lStarttime, lEndtime, lFlags;
            char caChannel[32], caRssi[16], caSecurity[16], caLongitude[16], caLatitude[16];
            char caTermtype[128], caVname[64];
            long lVtype;

            /* �ɼ��豸���� */
            char caDispname[32] = "";

            memset(caServicecode, 0, sizeof(caServicecode));
            memset(caServicename, 0, sizeof(caServicename));
            memset(caAddress, 0, sizeof(caAddress));
            memset(caMac, 0, sizeof(caMac));
            memset(caApname, 0, sizeof(caApname));
            memset(caApmac, 0, sizeof(caApmac));
            memset(caSsid, 0, sizeof(caSsid));
            lStarttime = 0;
            memset(caChannel, 0, sizeof(caChannel));
            memset(caRssi, 0, sizeof(caRssi));
            memset(caSecurity, 0, sizeof(caSecurity));
            memset(caLongitude, 0, sizeof(caLongitude));
            memset(caLatitude, 0, sizeof(caLatitude));
            memset(caTermtype, 0, sizeof(caTermtype));
            memset(caVname, 0, sizeof(caVname));

            lVtype = 0;
            iret = pasDbFetchInto(psCur,
                                  UT_TYPE_STRING, 14, caServicecode,
                                  UT_TYPE_STRING, 63, caServicename,
                                  UT_TYPE_STRING, 63, caAddress,
                                  UT_TYPE_STRING, 18, caMac,
                                  UT_TYPE_STRING, 31, caApname,
                                  UT_TYPE_STRING, 18, caApmac,
                                  UT_TYPE_STRING, 63, caSsid,
                                  UT_TYPE_LONG, 4, &lStarttime,
                                  UT_TYPE_STRING, 2, caChannel,
                                  UT_TYPE_STRING, 8, caRssi,
                                  UT_TYPE_STRING, 2, caSecurity,
                                  UT_TYPE_STRING, 11, caLongitude,
                                  UT_TYPE_STRING, 11, caLatitude,
                                  UT_TYPE_STRING, 100, caTermtype,
                                  UT_TYPE_LONG, 4, &lVtype,
                                  UT_TYPE_STRING, 63, caVname,
                                  UT_TYPE_STRING, 31, caDispname);

            while((iret == 0) || (iret == 1405))
            {
                /* ѡ�񵼳��Ļ� */
                if(strlen(caExport) > 0)
                {
                    ncUtlPrintCsv(fp, 18,
                                  UT_TYPE_STRING, caMac,
                                  UT_TYPE_STRING, caVname,
                                  UT_TYPE_LONG, lStarttime,
                                  UT_TYPE_STRING, caRssi,
                                  UT_TYPE_STRING, caServicename,
                                  UT_TYPE_STRING, caDispname,
                                  UT_TYPE_STRING, caServicecode,
                                  UT_TYPE_STRING, caApname,
                                  UT_TYPE_STRING, caLongitude,
                                  UT_TYPE_STRING, caLatitude,
                                  UT_TYPE_STRING, caTermtype,
                                  UT_TYPE_STRING, "�ն���ʷssid�б�",
                                  UT_TYPE_STRING, "X����",
                                  UT_TYPE_STRING, "Y����",
                                  UT_TYPE_STRING, caSsid,
                                  UT_TYPE_STRING, caApmac,
                                  UT_TYPE_STRING, caChannel,
                                  UT_TYPE_STRING, caSecurity);
                }
                else
                {
                    iNum++;
                    if(iNum > 1)
                    {
                        utPltPutLoopVar(psDbHead, "dh", iNum, ",");
                    }

                    utPltPutLoopVar(psDbHead, "stime", iNum, utTimFormat("%Y-%m-%d %H:%M:%S", lStarttime));

                    utPltPutLoopVar(psDbHead, "address", iNum, caAddress);
                    utPltPutLoopVar(psDbHead, "apname", iNum, caApname);
                    utPltPutLoopVar(psDbHead, "mac", iNum, caMac);
                    utPltPutLoopVar(psDbHead, "apmac", iNum, caApmac);
                    utPltPutLoopVar(psDbHead, "servicename", iNum, caServicename);
                    utPltPutLoopVar(psDbHead, "channel", iNum, caChannel);
                    utPltPutLoopVar(psDbHead, "rssi", iNum, caRssi);
                    //printf("caSecurity=%s\n",caSecurity);
                    utPltPutLoopVar(psDbHead, "security", iNum, caSecurity);
                    utPltPutLoopVar(psDbHead, "longitude", iNum, caLongitude);
                    utPltPutLoopVar(psDbHead, "latitude", iNum, caLatitude);
                    utPltPutLoopVar(psDbHead, "ssid", iNum, caSsid);
                    utPltPutLoopVar(psDbHead, "servicecode", iNum, caServicecode);
                    utPltPutLoopVar(psDbHead, "termtype", iNum, caTermtype);
                    utPltPutLoopVar(psDbHead, "vname", iNum, caVname);
                    utPltPutLoopVarF(psDbHead, "vtype", iNum, "%d", lVtype);
                    utPltPutLoopVarF(psDbHead, "dispname", iNum, "%s", caDispname);
                }

                memset(caServicecode, 0, sizeof(caServicecode));
                memset(caServicename, 0, sizeof(caServicename));
                memset(caAddress, 0, sizeof(caAddress));
                memset(caMac, 0, sizeof(caMac));
                memset(caApname, 0, sizeof(caApname));
                memset(caApmac, 0, sizeof(caApmac));
                memset(caSsid, 0, sizeof(caSsid));
                memset(caServicecode, 0, sizeof(caServicecode));
                memset(caServicename, 0, sizeof(caServicename));
                memset(caAddress, 0, sizeof(caAddress));
                memset(caMac, 0, sizeof(caMac));
                memset(caApname, 0, sizeof(caApname));
                memset(caApmac, 0, sizeof(caApmac));
                memset(caSsid, 0, sizeof(caSsid));
                lStarttime = 0;
                memset(caChannel, 0, sizeof(caChannel));
                memset(caRssi, 0, sizeof(caRssi));
                memset(caSecurity, 0, sizeof(caSecurity));
                memset(caLongitude, 0, sizeof(caLongitude));
                memset(caLatitude, 0, sizeof(caLatitude));
                memset(caTermtype, 0, sizeof(caTermtype));
                memset(caVname, 0, sizeof(caVname));
                memset(caDispname, 0, sizeof(caDispname));

                lVtype = 0;

                iret = pasDbFetchInto(psCur,
                                      UT_TYPE_STRING, 14, caServicecode,
                                      UT_TYPE_STRING, 63, caServicename,
                                      UT_TYPE_STRING, 63, caAddress,
                                      UT_TYPE_STRING, 18, caMac,
                                      UT_TYPE_STRING, 31, caApname,
                                      UT_TYPE_STRING, 18, caApmac,
                                      UT_TYPE_STRING, 63, caSsid,
                                      UT_TYPE_LONG, 4, &lStarttime,
                                      UT_TYPE_STRING, 2, caChannel,
                                      UT_TYPE_STRING, 8, caRssi,
                                      UT_TYPE_STRING, 2, caSecurity,
                                      UT_TYPE_STRING, 11, caLongitude,
                                      UT_TYPE_STRING, 11, caLatitude,
                                      UT_TYPE_STRING, 100, caTermtype,
                                      UT_TYPE_LONG, 4, &lVtype,
                                      UT_TYPE_STRING, 63, caVname,
                                      UT_TYPE_STRING, 31, caDispname);
            }
            pasDbCloseCursor(psCur);
        }

        if(_break == 1)
            break;
    }
    /* ѡ�񵼳��Ļ� */
    if(strlen(caExport) > 0)
    {
        fclose(fp);
        utPltFileDownload(iFd, "application/text", caPath, caFilename, caFilename);
        remove(caFile);
        return 0;
    }

    utPltOutToHtml(iFd, psMsgHead, psDbHead, "rzcx/proauth_hotinfo_list.htm");
    return 0;
}

/* MAC��־��ѯ����������1��Ƶ�����ֵ�ʱ�� */
int ncsMacLog_ChosenMac_TimeOftenCount(utShmHead *psShmHead, int iFd, utMsgHead *psMsgHead)
{
    /* ��ʼ��ģ�����ݻ����� */
    utPltDbHead *psDbHead = utPltInitDb();

    /* �����ݰ���ʾ����,��������Ҫ���ڵ��ԡ�
    ��ʾʱ����ʾ���ݰ���ͷ����Ȼ����ʾ���ݰ������ݡ�*/
    utMsgPrintMsg(psMsgHead);

    /* ������š���ѯʱ������(�졢�ܡ��¡����¡����ȡ���) */
    char caTimeFlag[10] = "";
    char caMac[32] = "";
    int iReturn = 0;
    /* ����Ϣ���ݰ� psMsgHead ����ȡָ�������ı��� */
    iReturn = utMsgGetSomeNVar(psMsgHead, 2,
                               "timevalue", UT_TYPE_STRING, sizeof(caTimeFlag) - 1, caTimeFlag,
                               "mac", UT_TYPE_STRING, sizeof(caMac) - 1, caMac);

    MyremoveAll(caMac, '-');
    MyremoveAll(caMac, ':');


    printf("timevalue = %s\n", caTimeFlag);
    printf("mac = %s\n", caMac);

    //1.���ݵ�ǰ�������ɱ���
    char table_name[1024] = "";
    char  year[10];
    char  mon[10];
    memset(year, 0, sizeof(year));
    memset(mon, 0 , sizeof(mon));
    time_t now;
    time(&now);
    timeToStringPlace(now, year, mon);
    int syear = atoi(year);
    int smonth = atoi(mon);
    snprintf(table_name + strlen(table_name), 1024 - strlen(table_name), "ncmactermatt_if_%4u%02u", syear, smonth);

    //2.���ݲ�ѯʱ������ѡ����Ӧʱ������
    char caStartDate[32] = "";
    char caEndDate[32] = "";

    char sql[4096] = "";
    char sqlTmp[4096] = "";
    snprintf(sql, sizeof(sql), "select mac, count(*) AS '���ִ���',HOUR(FROM_UNIXTIME(d.stime)) as hourtime  from %s d where d.stime >= ", table_name);

    if(strcmp(caTimeFlag, "null") == 0)     //��ѯ���죺Ĭ��
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 1 DAY)) ");
    }
    else if(strcmp(caTimeFlag, "1") == 0)   //��ѯ���죺�û�ѡ��
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 1 DAY)) ");
    }
    else if(strcmp(caTimeFlag, "2") == 0)   //�������
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 3 DAY)) ");
    }
    else if(strcmp(caTimeFlag, "3") == 0)   //���һ��
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 7 DAY)) ");
    }
    else if(strcmp(caTimeFlag, "4") == 0)   //���һ��
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 1 MONTH)) ");
    }
    else if(strcmp(caTimeFlag, "5") == 0)   //�������
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 3 MONTH)) ");
    }
    else if(strcmp(caTimeFlag, "6") == 0)   //�������
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 6 MONTH)) ");
    }
    else    //�������
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 6 MONTH)) ");
    }

    //printf(sqlTmp);
    printf("\n");

    /* ��ԭ����sql�����Ч�ַ���β����׷���� sqlTmp */
    snprintf(sql + strlen(sql), sizeof(sql) - strlen(sql), "%s", sqlTmp);
    snprintf(sql + strlen(sql), sizeof(sql) - strlen(sql), " and d.stime <= (UNIX_TIMESTAMP(NOW())) and replace(d.mac,'-','') like '%c%s%c' GROUP BY hourtime ORDER BY count(*) desc limit 10 ", '%', caMac, '%');

    printf("\n");
    printf("\n");
    printf("%s", sql);
    printf("\n");

    int iNum = 0, iRet = 0;
    unsigned long dwCountMax = 0;
    pasDbCursor *psCur = NULL;
    psCur = pasDbOpenSql(sql, 0);
    if(psCur != NULL)
    {
        printf("\n psCur is not null\n\n");
        char caMac[36] = "";
        unsigned long dwCount = 0;
        char caHour[36] = "";

        int nRet = 0;
        while(0 == (nRet = pasDbFetchInto(psCur, UT_TYPE_STRING, 32, &caMac,
                                          UT_TYPE_LONG,  20, &dwCount,
                                          UT_TYPE_STRING, 32, &caHour)) || 1405 == nRet)
        {
            iNum++;
            if(iNum > 1)
            {
                utPltPutLoopVar(psDbHead, "dh", iNum, ",");
            }
            utPltPutLoopVarF(psDbHead, "mac", iNum, "%s", caMac);
            utPltPutLoopVarF(psDbHead, "count", iNum, "%lu", dwCount);
            utPltPutLoopVarF(psDbHead, "hour", iNum, "%s", caHour);

            if(dwCount >= dwCountMax)
            {
                dwCountMax = dwCount;
            }

            //�������
            memset(caMac, 0, sizeof(caMac));
            memset(caHour, 0, sizeof(caHour));
            dwCount = 0;
        }
    }

    pasDbCloseCursor(psCur);
    utPltPutVarF(psDbHead, "result", "%d\n", iNum);
    utPltPutVarF(psDbHead, "max", "%lu\n", dwCountMax);
    printf("final iNum = %d\n", iNum);
    utPltOutToHtml(iFd, psMsgHead, psDbHead, "mac/infoquery/macterm/ChosenMacTimeOftenCount.htm");
    return 0;
}

/* MAC��־��ѯ����������2��Ƶ�����ֵĳ��� */
int ncsMacLog_ChosenMac_PlaceOftenCount(utShmHead *psShmHead, int iFd, utMsgHead *psMsgHead)
{
    /* ��ʼ��ģ�����ݻ����� */
    utPltDbHead *psDbHead = utPltInitDb();

    /* �����ݰ���ʾ����,��������Ҫ���ڵ��ԡ�
    ��ʾʱ����ʾ���ݰ���ͷ����Ȼ����ʾ���ݰ������ݡ�*/
    utMsgPrintMsg(psMsgHead);

    /* ������š���ѯʱ������(�졢�ܡ��¡����¡����ȡ���) */
    char caTimeFlag[10] = "";
    char caMac[32] = "";
    int iReturn = 0;
    /* ����Ϣ���ݰ� psMsgHead ����ȡָ�������ı��� */
    iReturn = utMsgGetSomeNVar(psMsgHead, 2,
                               "timevalue", UT_TYPE_STRING, sizeof(caTimeFlag) - 1, caTimeFlag,
                               "mac", UT_TYPE_STRING, sizeof(caMac) - 1, caMac);

    MyremoveAll(caMac, '-');
    MyremoveAll(caMac, ':');

    printf("\n");
    printf("timevalue = %s\n", caTimeFlag);
    printf("mac = %s\n", caMac);

    //1.���ݵ�ǰ�������ɱ���
    char table_name[1024] = "";
    char  year[10];
    char  mon[10];
    memset(year, 0, sizeof(year));
    memset(mon, 0 , sizeof(mon));
    time_t now;
    time(&now);
    timeToStringPlace(now, year, mon);
    int syear = atoi(year);
    int smonth = atoi(mon);
    snprintf(table_name + strlen(table_name), 1024 - strlen(table_name), "ncmactermatt_if_%4u%02u", syear, smonth);

    //2.���ݲ�ѯʱ������ѡ����Ӧʱ������
    char caStartDate[32] = "";
    char caEndDate[32] = "";

    char sql[4096] = "";
    char sqlTmp[4096] = "";
    snprintf(sql, sizeof(sql), "select servicename, servicecode, count(stime) from %s where stime >= ", table_name);

    if(strcmp(caTimeFlag, "null") == 0)     //��ѯ���죺Ĭ��
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 1 DAY)) ");
    }
    else if(strcmp(caTimeFlag, "1") == 0)   //��ѯ���죺�û�ѡ��
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 1 DAY)) ");
    }
    else if(strcmp(caTimeFlag, "2") == 0)   //�������
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 3 DAY)) ");
    }
    else if(strcmp(caTimeFlag, "3") == 0)   //���һ��
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 7 DAY)) ");
    }
    else if(strcmp(caTimeFlag, "4") == 0)   //���һ��
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 1 MONTH)) ");
    }
    else if(strcmp(caTimeFlag, "5") == 0)   //�������
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 3 MONTH)) ");
    }
    else if(strcmp(caTimeFlag, "6") == 0)   //�������
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 6 MONTH)) ");
    }
    else    //�������
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 6 MONTH)) ");
    }

    //printf(sqlTmp);
    printf("\n");

    /* ��ԭ����sql�����Ч�ַ���β����׷���� sqlTmp */
    snprintf(sql + strlen(sql), sizeof(sql) - strlen(sql), "%s", sqlTmp);
    snprintf(sql + strlen(sql), sizeof(sql) - strlen(sql), " and stime <= (UNIX_TIMESTAMP(NOW())) and servicename != '' and replace(mac,'-','') like '%c%s%c' GROUP BY servicecode ORDER BY 3 desc limit 10 ", '%', caMac, '%');

    printf("\n");
    printf("\n");
    printf("%s", sql);
    printf("\n");

    int iNum = 0, iRet = 0;
    unsigned long dwCountMax = 0;
    pasDbCursor *psCur = NULL;
    psCur = pasDbOpenSql(sql, 0);
    if(psCur != NULL)
    {
        printf("\n psCur is not null\n\n");
        char caServicename[36] = "";
        char caServicecode[36] = "";
        unsigned long dwCount = 0;
        int nRet = 0;
        while(0 == (nRet = pasDbFetchInto(psCur, UT_TYPE_STRING, 32, &caServicename,
                                          UT_TYPE_STRING, 32, &caServicecode,
                                          UT_TYPE_LONG,  20, &dwCount)) || 1405 == nRet)
        {
            iNum++;
            if(iNum > 1)
            {
                utPltPutLoopVar(psDbHead, "dh", iNum, ",");
            }
            utPltPutLoopVarF(psDbHead, "servicename", iNum, "%s", caServicename);
            utPltPutLoopVarF(psDbHead, "servicecode", iNum, "%s", caServicecode);
            utPltPutLoopVarF(psDbHead, "count", iNum, "%lu", dwCount);

            if(dwCount >= dwCountMax)
            {
                dwCountMax = dwCount;
            }

            //�������
            memset(caServicename, 0, sizeof(caServicename));
            dwCount = 0;
        }
    }

    pasDbCloseCursor(psCur);
    utPltPutVarF(psDbHead, "result", "%d\n", iNum);
    utPltPutVarF(psDbHead, "max", "%lu\n", dwCountMax);
    printf("final iNum = %d\n", iNum);
    utPltOutToHtml(iFd, psMsgHead, psDbHead, "mac/infoquery/macterm/ChosenMacPlaceOftenCount.htm");
    return 0;
}

/* MAC��־��ѯ����������3��Ƶ�����ֵĳ������� */
int ncsMacLog_ChosenMac_PlaceTypeOftenCount(utShmHead *psShmHead, int iFd, utMsgHead *psMsgHead)
{
    /* ��ʼ��ģ�����ݻ����� */
    utPltDbHead *psDbHead = utPltInitDb();

    /* �����ݰ���ʾ����,��������Ҫ���ڵ��ԡ�
    ��ʾʱ����ʾ���ݰ���ͷ����Ȼ����ʾ���ݰ������ݡ�*/
    utMsgPrintMsg(psMsgHead);

    /* ������š���ѯʱ������(�졢�ܡ��¡����¡����ȡ���) */
    char caTimeFlag[10] = "";
    char caMac[32] = "";
    int iReturn = 0;
    /* ����Ϣ���ݰ� psMsgHead ����ȡָ�������ı��� */
    iReturn = utMsgGetSomeNVar(psMsgHead, 2,
                               "timevalue", UT_TYPE_STRING, sizeof(caTimeFlag) - 1, caTimeFlag,
                               "mac", UT_TYPE_STRING, sizeof(caMac) - 1, caMac);
    MyremoveAll(caMac, '-');
    MyremoveAll(caMac, ':');

    printf("\n");
    printf("timevalue = %s\n", caTimeFlag);
    printf("mac = %s\n", caMac);

    //1.���ݵ�ǰ�������ɱ���
    char table_name[1024] = "";
    char  year[10];
    char  mon[10];
    memset(year, 0, sizeof(year));
    memset(mon, 0 , sizeof(mon));
    time_t now;
    time(&now);
    timeToStringPlace(now, year, mon);
    int syear = atoi(year);
    int smonth = atoi(mon);
    snprintf(table_name + strlen(table_name), 1024 - strlen(table_name), "ncmactermatt_if_%4u%02u", syear, smonth);

    //2.���ݲ�ѯʱ������ѡ����Ӧʱ������
    char caStartDate[32] = "";
    char caEndDate[32] = "";

    char sql[4096] = "";
    char sqlTmp[4096] = "";
    snprintf(sql, sizeof(sql), "SELECT CASE a.gtype WHEN 1 THEN '�õ������' WHEN 2 THEN 'ͼ���������' WHEN 3 THEN '������ѵ������' WHEN 4 THEN '���ֳ�����' WHEN 5 THEN '��ͨ��Ŧ' WHEN 6 THEN '������ͨ����' WHEN 7 THEN '����������' WHEN 8 THEN '���ڷ�����' WHEN 10 THEN '���ﳡ��' WHEN 11 THEN '����������' WHEN 12 THEN '�Ļ�������' WHEN 13 THEN '�������г���' WHEN 14 THEN '����' END AS '��������', SUM( times) times FROM ncsuser a, (SELECT servicecode, COUNT(stime) AS times from %s where stime >= ", table_name);

    if(strcmp(caTimeFlag, "null") == 0)     //��ѯ���죺Ĭ��
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 1 DAY)) ");
    }
    else if(strcmp(caTimeFlag, "1") == 0)   //��ѯ���죺�û�ѡ��
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 1 DAY)) ");
    }
    else if(strcmp(caTimeFlag, "2") == 0)   //�������
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 3 DAY)) ");
    }
    else if(strcmp(caTimeFlag, "3") == 0)   //���һ��
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 7 DAY)) ");
    }
    else if(strcmp(caTimeFlag, "4") == 0)   //���һ��
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 1 MONTH)) ");
    }
    else if(strcmp(caTimeFlag, "5") == 0)   //�������
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 3 MONTH)) ");
    }
    else if(strcmp(caTimeFlag, "6") == 0)   //�������
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 6 MONTH)) ");
    }
    else    //�������
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 6 MONTH)) ");
    }

    //printf(sqlTmp);
    printf("\n");

    /* ��ԭ����sql�����Ч�ַ���β����׷���� sqlTmp */
    snprintf(sql + strlen(sql), sizeof(sql) - strlen(sql), "%s", sqlTmp);
    snprintf(sql + strlen(sql), sizeof(sql) - strlen(sql), " and stime <= (UNIX_TIMESTAMP(NOW())) and replace(mac,'-','') like '%c%s%c' GROUP BY servicecode ) b WHERE b.servicecode =a.username ", '%', caMac, '%');

    printf("\n");
    printf("\n");
    printf("%s", sql);
    printf("\n");

    int iNum = 0, iRet = 0;
    unsigned long dwCountMax = 0;
    pasDbCursor *psCur = NULL;
    psCur = pasDbOpenSql(sql, 0);
    if(psCur != NULL)
    {
        printf("\n psCur is not null\n\n");
        //char caServicename[36] = "";
        char caGtype[36] = "";      //��������
        unsigned long dwCount = 0;
        int nRet = 0;
        while(0 == (nRet = pasDbFetchInto(psCur, UT_TYPE_STRING, 32, &caGtype,
                                          UT_TYPE_LONG,  20, &dwCount)) || 1405 == nRet)
        {
            iNum++;
            if(iNum > 1)
            {
                utPltPutLoopVar(psDbHead, "dh", iNum, ",");
            }
            utPltPutLoopVarF(psDbHead, "gtype", iNum, "%s", caGtype);
            utPltPutLoopVarF(psDbHead, "count", iNum, "%lu", dwCount);

            if(dwCount >= dwCountMax)
            {
                dwCountMax = dwCount;
            }

            //�������
            memset(caGtype, 0, sizeof(caGtype));
            dwCount = 0;
        }
    }

    pasDbCloseCursor(psCur);
    utPltPutVarF(psDbHead, "result", "%d\n", iNum);
    utPltPutVarF(psDbHead, "max", "%lu\n", dwCountMax);
    printf("final iNum = %d\n", iNum);
    utPltOutToHtml(iFd, psMsgHead, psDbHead, "mac/infoquery/macterm/ChosenMacPlaceTypeOftenCount.htm");
    return 0;
}

/* MAC��־��ѯ��ݲ鿴����ѯָ��mac������������͡����� */
int ncsMacLog_ChosenMac_IDCheck(utShmHead *psShmHead, int iFd, utMsgHead *psMsgHead)
{
    /* ��ʼ��ģ�����ݻ����� */
    utPltDbHead *psDbHead = utPltInitDb();

    /* �����ݰ���ʾ����,��������Ҫ���ڵ��ԡ�
    ��ʾʱ����ʾ���ݰ���ͷ����Ȼ����ʾ���ݰ������ݡ�*/
    utMsgPrintMsg(psMsgHead);

    char caMac[32] = "";
    memset(caMac, 0, sizeof(caMac));
    int iReturn = 0;
    /* ����Ϣ���ݰ� psMsgHead ����ȡָ�������ı��� */
    iReturn = utMsgGetSomeNVar(psMsgHead, 1,
                               "mac", UT_TYPE_STRING, sizeof(caMac) - 1, caMac);

    printf("\n");

#ifdef INFOQUERY_DEBUG
    printf("mac = %s\n", caMac);
#endif


    char sql[4096] = "";
    snprintf(sql, sizeof(sql), "select a.name, b.vname from ncsnettype a, nctermnetlog b where b.mac like '%c%s%c' and a.ntype = b.nettype", '%', caMac, '%');

#ifdef INFOQUERY_DEBUG
    printf("\n");
    printf("%s\n", sql);
    printf("\n");
#endif


    int iNum = 0, iRet = 0;
    unsigned long dwCountMax = 0;
    pasDbCursor *psCur = NULL;
    psCur = pasDbOpenSql(sql, 0);
    if(psCur != NULL)
    {
        printf("\n psCur is not null\n\n");
        char caVtype[36] = "";
        char caVname[36] = "";

        int nRet = 0;
        while(0 == (nRet = pasDbFetchInto(psCur, UT_TYPE_STRING, 32, &caVtype,
                                          UT_TYPE_STRING, 32, &caVname)) || 1405 == nRet)
        {
            iNum++;
            if(iNum > 1)
            {
                utPltPutLoopVar(psDbHead, "dh", iNum, ",");
            }
            utPltPutLoopVarF(psDbHead, "vtype", iNum, "%s", caVtype);
            utPltPutLoopVarF(psDbHead, "vname", iNum, "%s", caVname);

            //�������
            memset(caVtype, 0, sizeof(caVtype));
            memset(caVname, 0, sizeof(caVname));
        }
    }

    pasDbCloseCursor(psCur);
    utPltPutVarF(psDbHead, "result", "%d\n", iNum);

#ifdef INFOQUERY_DEBUG
    printf("final iNum = %d\n", iNum);
#endif

    utPltOutToHtml(iFd, psMsgHead, psDbHead, "mac/infoquery/macterm/IdCheck.htm");
    return 0;
}

/* MAC��־��ѯ�������1����ѯ�ն�mac����Ϣ��mac������ */
int ncsMacLog_ChosenMac_GetMacGroupInfo(utShmHead *psShmHead, int iFd, utMsgHead *psMsgHead)
{
    /* ��ʼ��ģ�����ݻ����� */
    utPltDbHead *psDbHead = utPltInitDb();

    /* �����ݰ���ʾ����,��������Ҫ���ڵ��ԡ�
    ��ʾʱ����ʾ���ݰ���ͷ����Ȼ����ʾ���ݰ������ݡ�*/
    utMsgPrintMsg(psMsgHead);

    char caMac[32] = "";
    memset(caMac, 0, sizeof(caMac));
    int iReturn = 0;
    char sql[1024] = "";

    snprintf(sql, sizeof(sql), "select groupid, groupname, groupdesc from nctermmacgroup");

#ifdef INFOQUERY_DEBUG
    printf("\n");
    printf("%s\n", sql);
    printf("\n");
#endif

    int iNum = 0, iRet = 0;
    unsigned long dwCountMax = 0;
    pasDbCursor *psCur = NULL;
    psCur = pasDbOpenSql(sql, 0);
    if(psCur != NULL)
    {

#ifdef INFOQUERY_DEBUG
        printf("\n psCur is not null\n\n");
#endif

        char caGrouid[12] = "";
        char caGroupname[36] = "";
        char caGroupdesc[256] = "";

        int nRet = 0;
        while(0 == (nRet = pasDbFetchInto(psCur, UT_TYPE_STRING, 12, &caGrouid,
                                          UT_TYPE_STRING, 36, &caGroupname,
                                          UT_TYPE_STRING, 256, &caGroupdesc)) || 1405 == nRet)
        {
            iNum++;
            if(iNum > 1)
            {
                utPltPutLoopVar(psDbHead, "dh", iNum, ",");
            }

            utPltPutLoopVarF(psDbHead, "groupid", iNum, "%s", caGrouid);
            utPltPutLoopVarF(psDbHead, "groupname", iNum, "%s", caGroupname);
            utPltPutLoopVarF(psDbHead, "groupdesc", iNum, "%s", caGroupdesc);

            //�������
            memset(caGrouid, 0, sizeof(caGrouid));
            memset(caGroupname, 0, sizeof(caGroupname));
            memset(caGroupdesc, 0, sizeof(caGroupdesc));
        }
    }

    pasDbCloseCursor(psCur);
    utPltPutVarF(psDbHead, "result", "%d\n", iNum);

#ifdef INFOQUERY_DEBUG
    printf("final iNum = %d\n", iNum);
#endif

    utPltOutToHtml(iFd, psMsgHead, psDbHead, "mac/infoquery/macterm/GetMacGroupInfo.htm");
    return 0;
}

/* MAC��־��ѯ�������2������ѡ��mac������Ӧmac���������� */
int ncsMacLog_ChosenMac_JoinMacGroup(utShmHead *psShmHead, int iFd, utMsgHead *psMsgHead)
{
    /* ��ʼ��ģ�����ݻ����� */
    utPltDbHead *psDbHead = utPltInitDb();

    /* �����ݰ���ʾ����,��������Ҫ���ڵ��ԡ�
    ��ʾʱ����ʾ���ݰ���ͷ����Ȼ����ʾ���ݰ������ݡ�*/
    utMsgPrintMsg(psMsgHead);

    char caMac[1024] = "";
    char caGroupId[12] = "";
    int iReturn = 0;

    /* ����Ϣ���ݰ� psMsgHead ����ȡָ�������ı��� */
    iReturn = utMsgGetSomeNVar(psMsgHead, 2,
                               "mac", UT_TYPE_STRING, sizeof(caMac) - 1, caMac,
                               "groupid", UT_TYPE_STRING, sizeof(caGroupId) - 1, caGroupId);

    printf("\n");

#ifdef INFOQUERY_DEBUG
    /* iReturn ��ֵ�����ӡ�ᵼ���������ִ���쳣 */
    //printf("iReturn = %s\n", iReturn);
    printf("mac = %s\n", caMac);
    printf("groupid = [%s]\n", caGroupId);
#endif

    int iRet = 0;
    char sql[1024] = "";

    /* ѭ����ȡ�� caMac �еĶ��macֵ */
    char *pMac = NULL;
    pMac = strtok(caMac, ",");
    while(pMac)
    {
        //printf("%s\n", pMac);

        snprintf(sql, sizeof(sql), "insert into nctermmacgroupinfo(mac, groupid, modtime) values(\'%s\', \'%s\', UNIX_TIMESTAMP(NOW())) ", pMac, caGroupId);

        iRet = pasDbExecSqlF(sql);
        if(iRet)
        {
            utPltPutVar(psDbHead, "result", "false");
            utPltPutVar(psDbHead, "message", "�������ʧ��");
        }

#ifdef INFOQUERY_DEBUG
        printf("sql = %s\n", sql);
#endif

        memset(sql, 0 , sizeof(sql));
        pMac = NULL;
        pMac = strtok(NULL, ",");
    }
    if(!iRet)
    {
        utPltPutVar(psDbHead, "result", "true");
        utPltPutVar(psDbHead, "message", "�������ɹ�");
    }

    utPltOutToHtml(iFd, psMsgHead, psDbHead, "mac/infoquery/macterm/JoinGroup.htm");
    return 0;
}

/* MAC��־��ѯ��list ��� "��ʷssid�б�" ��ѯѡ��MAC�� ssid ȥ���б� */
int ncsMacLog_ChosenMac_DistinctSsid(utShmHead *psShmHead, int iFd, utMsgHead *psMsgHead)
{
    /* ��ʼ��ģ�����ݻ����� */
    utPltDbHead *psDbHead = utPltInitDb();
    //long infoqueryDebug = utComGetVar_ld(psShmHead, "InfoqueryDebug", 0);

    /* �����ݰ���ʾ����,��������Ҫ���ڵ��ԡ�
    ��ʾʱ����ʾ���ݰ���ͷ����Ȼ����ʾ���ݰ������ݡ�*/
    utMsgPrintMsg(psMsgHead);

    char caMac[32] = "";
    char caTimeFlag[10] = "";
    int iReturn = 0;

    /* ����Ϣ���ݰ� psMsgHead ����ȡָ�������ı��� */
    iReturn = utMsgGetSomeNVar(psMsgHead, 2,
                               "mac", UT_TYPE_STRING, sizeof(caMac) - 1, caMac,
                               "timevalue", UT_TYPE_STRING, sizeof(caTimeFlag) - 1, caTimeFlag);

    //MyremoveAll(caMac, '-');
    //MyremoveAll(caMac, ':');

    printf("mac = %s\n", caMac);
    printf("timevalue = %s\n", caTimeFlag);

    /* iReturn ��ֵ�����ӡ�ᵼ���������ִ���쳣 */
    //printf("iReturn = %s\n", iReturn);

    //1.���ݵ�ǰ�������ɱ���
    char table_name[1024] = "";
    char  year[10];
    char  mon[10];
    memset(year, 0, sizeof(year));
    memset(mon, 0 , sizeof(mon));
    time_t now;
    time(&now);
    timeToStringPlace(now, year, mon);
    int syear = atoi(year);
    int smonth = atoi(mon);
    snprintf(table_name + strlen(table_name), 1024 - strlen(table_name), "ncmactermatt_if_%4u%02u", syear, smonth);

    //2.���ݲ�ѯʱ������ѡ����Ӧʱ������
    //printf("table_name = %s\n\n", table_name);

    char sql[4096] = "";
    char sqlTmp[4096] = "";
    snprintf(sql, sizeof(sql), "select distinct ssid, servicename from %s where ", table_name);

    if(strcmp(caTimeFlag, "null") == 0)     //��ѯ���죺Ĭ��
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 1 DAY)) ");
    }
    else if(strcmp(caTimeFlag, "1") == 0)   //��ѯ���죺�û�ѡ��
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 1 DAY)) ");
    }
    else if(strcmp(caTimeFlag, "2") == 0)   //�������
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 3 DAY)) ");
    }
    else if(strcmp(caTimeFlag, "3") == 0)   //���һ��
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 7 DAY)) ");
    }
    else if(strcmp(caTimeFlag, "4") == 0)   //���һ��
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 1 MONTH)) ");
    }
    else if(strcmp(caTimeFlag, "5") == 0)   //�������
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 3 MONTH)) ");
    }
    else if(strcmp(caTimeFlag, "6") == 0)   //�������
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 6 MONTH)) ");
    }
    else    //�������
    {
        //snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 6 MONTH)) ");
    }


    /* ��ԭ����sql�����Ч�ַ���β����׷���� sqlTmp */
    snprintf(sql + strlen(sql), sizeof(sql) - strlen(sql), "%s", sqlTmp);
    snprintf(sql + strlen(sql), sizeof(sql) - strlen(sql), " mac = \'%s\' and ssid != '' ORDER BY ssid asc", caMac);

    printf("sql = %s\n\n", sql);

    int iNum = 0, iRet = 0;
    pasDbCursor *psCur = NULL;
    psCur = pasDbOpenSql(sql, 0);
    if(psCur != NULL)
    {
        printf("\n psCur is not null\n\n");
        char caSsid[36] = "";
        char caServicename[36] = "";
        int nRet = 0;
        while(0 == (nRet = pasDbFetchInto(psCur, UT_TYPE_STRING, 35, &caSsid,
                                          UT_TYPE_STRING, 35, &caServicename)) || 1405 == nRet)
        {
            iNum++;
            if(iNum > 1)
            {
                utPltPutLoopVar(psDbHead, "dh", iNum, ",");
            }
            utPltPutLoopVarF(psDbHead, "ssid", iNum, "%s", caSsid);
            utPltPutLoopVarF(psDbHead, "servicename", iNum, "%s", caServicename);

            //�������
            memset(caSsid, 0, sizeof(caSsid));
            memset(caServicename, 0, sizeof(caServicename));
        }
    }

    pasDbCloseCursor(psCur);


    utPltPutVarF(psDbHead, "totalCount", "%d\n", iNum);
    utPltOutToHtml(iFd, psMsgHead, psDbHead, "mac/infoquery/macterm/DistinctSsid.htm");
    return 0;
}

/*
    MAC��־��ѯ��list  "������֤�˺Ź���"����ѯ vname ��ص�mac�µ�name��vname
    ���ڣ�2015/09/11 Ǯ����
*/
int ncsMacLog_ChosenMac_NetAuthID(utShmHead *psShmHead, int iFd, utMsgHead *psMsgHead)
{
    /* ��ʼ��ģ�����ݻ����� */
    utPltDbHead *psDbHead = utPltInitDb();

    /* �����ݰ���ʾ����,��������Ҫ���ڵ��ԡ�
    ��ʾʱ����ʾ���ݰ���ͷ����Ȼ����ʾ���ݰ������ݡ�*/
    utMsgPrintMsg(psMsgHead);

    char caMac[32] = "";
    char caTimeFlag[10] = "";
    int iReturn = 0;

    /* ����Ϣ���ݰ� psMsgHead ����ȡָ�������ı��� */
    iReturn = utMsgGetSomeNVar(psMsgHead, 2,
                               "mac", UT_TYPE_STRING, sizeof(caMac) - 1, caMac,
                               "timevalue", UT_TYPE_STRING, sizeof(caTimeFlag) - 1, caTimeFlag);

    printf("mac = %s\n\n", caMac);

    char sql[1024] = "";
    //snprintf(sql, sizeof(sql), "select mac, vname, vdisp from nctermnetlog where mac = \'%s\' ", caMac);
    snprintf(sql , sizeof(sql), "select b.mac, a.name, b.vname from ncsnettype a, nctermnetlog b where b.mac = \'%s\' and a.ntype = b.nettype ", caMac);

    printf("sql = %s\n\n", sql);

    int iNum = 0, iRet = 0;
    pasDbCursor *psCur = NULL;
    psCur = pasDbOpenSql(sql, 0);
    if(psCur != NULL)
    {
        printf("\n psCur is not null\n\n");
        char caTempMac[36] = "";
        char caName[36] = "";
        char caVname[36] = "";
        int nRet = 0;
        while(0 == (nRet = pasDbFetchInto(psCur, UT_TYPE_STRING, 35, &caTempMac,
                                          UT_TYPE_STRING, 35, &caName,
                                          UT_TYPE_STRING, 35, &caVname)) || 1405 == nRet)
        {
            iNum++;
            if(iNum > 1)
            {
                utPltPutLoopVar(psDbHead, "dh", iNum, ",");
            }
            utPltPutLoopVarF(psDbHead, "mac", iNum, "%s", caTempMac);
            utPltPutLoopVarF(psDbHead, "name", iNum, "%s", caName);
            utPltPutLoopVarF(psDbHead, "vname", iNum, "%s", caVname);

            //�������
            memset(caTempMac, 0, sizeof(caTempMac));
            memset(caName, 0, sizeof(caName));
            memset(caVname, 0, sizeof(caVname));
        }
    }

    pasDbCloseCursor(psCur);


    utPltOutToHtml(iFd, psMsgHead, psDbHead, "mac/infoquery/macterm/NetAuthID.html");
    return 0;
}




/*
    MAC��־��ѯ�������� button ѡ����������ǰ̨��״�˵�
    ���ڣ�2015/09/13 Ǯ����
*/
int ncsMacLog_ChosenMac_ChoseQueryPlace(utShmHead *psShmHead, int iFd, utMsgHead *psMsgHead)
{
    pasDbCursor *psCur;
    char caLevel[16];
    char caPlate[128];
    char caGroupname[72], caGroupid[16];
    char caTemp[4024];
    char caName[32];
    char caWhere[256];

    char caCurPg[16], caTotRec[16];
    char caPid[16];
    unsigned long lLevel, lPid;
    int  iNum;
    char caFilter[256];
    char caNo[16];
    unsigned long lGroupid, lGroupid0, lCurPg, lTotRec, lRowNum, lStartRec;
    utPltDbHead *psDbHead;
    int iReturn, i;
    char caVar[256], caFname[64], caBfname[64];
    char caValue[256];
    char caVar1[32];
    char caOpt[256];
    char caGroups[1024];
    char caFacs[1024];
    long lId;
    char *p, *pVar;
    unsigned char *pHash;
    char caCname[72];
    char caUsername[36];
    pasLHashInfo  sHashInfo;
    struct stData
    {
        unsigned long id;
        unsigned long count;
    };
    long lCount;
    struct stData *psData;
    char caCname1[72];
    char caSql[2048];
    char caWireflag[20];
    char caFaccods[1024];

#ifdef LDEBUG1
    utMsgPrintMsg(psMsgHead);
#endif
    utMsgPrintMsg(psMsgHead);
    strcpy(caGroups, getDsGroupid());
    strcpy(caFacs, getDsFacGroupid());
    printf("caFacs=%s\n", caFacs);
    //      strcpy(caFaccods,getDsFacs()));
    memset(caCname, 0, sizeof(caCname));
    iReturn = utMsgGetSomeNVar(psMsgHead, 4,
                               "node",        UT_TYPE_STRING, 10, caPid,
                               "cname",       UT_TYPE_STRING, 30, caCname1,
                               "plate",       UT_TYPE_STRING, 100, caPlate,
                               "wireflag",    UT_TYPE_STRING, 10, caWireflag);
    //����
    pHash = (unsigned char *)pasLHashInit(1000, 1000, sizeof(struct stData), 0, 4);
    if(pHash == NULL) return 0;

    psCur = pasDbOpenSql("select pid from ncsgroup where pid!=0 ", 0);
    if(psCur)
    {
        iReturn = pasDbFetchInto(psCur, UT_TYPE_ULONG, 4, &lPid);
        while(iReturn == 0)
        {
            psData = (struct stData *)pasLHashLookA(pHash, (char*)&lPid);
            if(psData)
            {
                psData->count++;
            }
            iReturn = pasDbFetchInto(psCur, UT_TYPE_ULONG, 4, &lPid);
        }
        pasDbCloseCursor(psCur);
    }

    //��λ

    psCur = pasDbOpenSql("select distinct groupid from ncsuser  ", 0);
    if(psCur)
    {
        iReturn = pasDbFetchInto(psCur, UT_TYPE_ULONG, 4, &lPid);
        while(iReturn == 0)
        {
            psData = (struct stData *)pasLHashLookA(pHash, (char*)&lPid);
            if(psData)
            {
                psData->count++;
            }
            iReturn = pasDbFetchInto(psCur, UT_TYPE_ULONG, 4, &lPid);
        }
        pasDbCloseCursor(psCur);
    }

    if(strlen(caCname1) > 0)
    {
        strcpy(caCname, pasCvtGBK(2, caCname1, caTemp, 30));
    }
    //    iReturn = dsCltGetSessionValue(1,"groupid",UT_TYPE_LONG,sizeof(long),&lGroupid0);
    strcpy(caWhere, "\0");

    memset(caOpt, 0, sizeof(caOpt));
    iReturn = dsCltGetMyInfo(1, "Userid", &lId);
    if(iReturn == 0)
    {
        pasDbOneRecord("select opt from dsuser where id=:id", 1, "id", UT_TYPE_LONG, lId, UT_TYPE_STRING, 255, caOpt);
    }

    lRowNum = utComGetVar_ld(psShmHead, "GroupTreeRow", 300);



    iNum = 0;

    psDbHead = utPltInitDb();
    if(strlen(caCname) == 0)
    {
        lStartRec = (lCurPg - 1) * lRowNum;
        sprintf(caTemp, "select groupname,groupid,pid from ncsgroup where 1=1 ");
        if(strlen(caGroups) > 0)
        {
            if(strlen(caPid) == 0)
            {
                sprintf(caSql, "select pid from ncsgroup where pid not in (%s) and groupid in (%s) ", caGroups, caGroups);
                lPid = 0;
                pasDbOneRecord(caSql, 0, UT_TYPE_LONG, 4, &lPid);
                sprintf(caPid, "%d", lPid);
            }
            sprintf(caTemp + strlen(caTemp), "and groupid in (%s) ", caGroups);
        }
        //      if(strlen(caFacs)>0){
        //          sprintf(caTemp+strlen(caTemp)," and groupid in (%s) ",caFacs);
        //      }
        sprintf(caTemp + strlen(caTemp), " and pid=%d ", atol(caPid));
        sprintf(caTemp + strlen(caTemp), " order by groupname limit %lu,%lu ", 0, lRowNum);
        printf("caTemp=%s\n", caTemp);
        psCur = pasDbOpenSql(caTemp, 0);

        if(psCur == NULL)
        {
            utWebDispMsg(iFd, psMsgHead, "ncs/ncmsg_back.htm", "���Ų�ѯ", "���ݿ����");
            //        free(pHash);
            return 0;
        }




        memset(caGroupname, 0, sizeof(caGroupname));
        lGroupid = 0;
        lPid = 0;
        iReturn = pasDbFetchInto(psCur, UT_TYPE_STRING, 68, caGroupname,
                                 UT_TYPE_LONG, 4, &lGroupid,
                                 UT_TYPE_LONG, 4, &lPid);


        while(iReturn == 0)
        {
            psData = (struct stData *)pasLHashLook(pHash, (char*)&lGroupid);
            if(psData)
            {
                if(iNum > 0)
                {
                    utPltPutLoopVar(psDbHead, "dh", iNum + 1, ",");
                }
                iNum++;
                utPltSetCvtHtml(1);
                utPltPutLoopVar(psDbHead, "groupname", iNum, utStrGetCharHan(caGroupname, 48));
                utPltSetCvtHtml(0);
                utPltPutLoopVarF(psDbHead, "groupid",   iNum, "%ld", lGroupid);


                utPltPutLoopVar(psDbHead, "leaf", iNum, "false");
                utPltPutLoopVar(psDbHead, "cls", iNum, "folder");


                //      else{
                //              utPltPutLoopVar(psDbHead,"leaf", iNum,"true");
                //                utPltPutLoopVar(psDbHead,"cls", iNum,"folder");

                //           }
                utPltPutLoopVar(psDbHead, "dtype", iNum, "2");

                utPltPutLoopVarF(psDbHead, "iNum", iNum, "%d", iNum - 1);

                utPltPutLoopVarF(psDbHead, "pid", iNum, "%d", lPid);
            }
            memset(caGroupname, 0, sizeof(caGroupname));
            lGroupid = 0;
            lLevel = 0;
            lPid = 0;
            iReturn = pasDbFetchInto(psCur, UT_TYPE_STRING, 68, caGroupname,
                                     UT_TYPE_LONG, 4, &lGroupid,
                                     UT_TYPE_LONG, 4, &lPid);
        }
        pasDbCloseCursor(psCur);
        //     free(pHash);
        utPltPutVar(psDbHead, "rootname", utComGetVar_sd(psShmHead, "rootname", "ȫ����λ"));

    }
    sprintf(caTemp, "select dispname,userid,groupid,username from ncsuser where 1=1 ");
    if(strlen(caGroups) > 0)
    {
        sprintf(caTemp + strlen(caTemp), " and groupid in (%s) ", caGroups);
    }
    if(strlen(caFacs) > 0)
    {
        sprintf(caTemp + strlen(caTemp), " and fcode in (%s) ", caFacs);
    }
    if(strlen(caWireflag) > 0)
    {
        if(strcmp(caWireflag, "2") == 0)
        {
            sprintf(caTemp + strlen(caTemp), " and (jointype='08' or jointype='09') ");
        }
        else if(strcmp(caWireflag, "1") == 0)
        {
            sprintf(caTemp + strlen(caTemp), " and jointype!='08' ");
        }

    }


    if(strlen(caCname) == 0)
    {

        if(strlen(caPid) == 0)
        {
            sprintf(caTemp + strlen(caTemp), " and groupid not in (select groupid from ncsgroup ) ");

        }
        else
        {
            sprintf(caTemp + strlen(caTemp), " and groupid=%d ", atol(caPid));

        }
    }
    else
    {
        sprintf(caTemp + strlen(caTemp), "and (dispname like '%c%s%c' or username like '%c%s%c') ", '%', caCname, '%', '%', caCname, '%');



    }
    sprintf(caTemp + strlen(caTemp), " order by dispname limit %lu,%lu", 0, lRowNum);
    printf("caTemp=%s\n", caTemp);
    psCur = pasDbOpenSql(caTemp, 0);
    if(psCur != NULL)
    {
        memset(caGroupname, 0, sizeof(caGroupname));
        lGroupid = 0;
        lPid = 0;
        memset(caUsername, 0, sizeof(caUsername));
        iReturn = pasDbFetchInto(psCur, UT_TYPE_STRING, 68, caGroupname,
                                 UT_TYPE_LONG, 4, &lGroupid,
                                 UT_TYPE_LONG, 4, &lPid,
                                 UT_TYPE_STRING, 15, caUsername);

        while(iReturn == 0)
        {

            if(iNum > 0)
            {
                utPltPutLoopVar(psDbHead, "dh", iNum + 1, ",");
            }
            iNum++;
            utPltSetCvtHtml(1);
            utPltPutLoopVar(psDbHead, "groupname", iNum, utStrGetCharHan(caGroupname, 48));
            utPltSetCvtHtml(0);
            utPltPutLoopVarF(psDbHead, "did",   iNum, "%ld", lGroupid);

            utPltPutLoopVar(psDbHead, "leaf", iNum, "true");
            utPltPutLoopVar(psDbHead, "cls", iNum, "file");

            utPltPutLoopVar(psDbHead, "dtype", iNum, "0");
            utPltPutLoopVar(psDbHead, "code", iNum, caUsername);


            utPltPutLoopVarF(psDbHead, "iNum", iNum, "%d", iNum - 1);

            utPltPutLoopVarF(psDbHead, "pid", iNum, "%d", lPid);

            memset(caGroupname, 0, sizeof(caGroupname));
            lGroupid = 0;
            lLevel = 0;
            lPid = 0;
            memset(caUsername, 0, sizeof(caUsername));
            iReturn = pasDbFetchInto(psCur, UT_TYPE_STRING, 68, caGroupname,
                                     UT_TYPE_LONG, 4, &lGroupid,
                                     UT_TYPE_LONG, 4, &lPid,
                                     UT_TYPE_STRING, 15, caUsername);
        }
        pasDbCloseCursor(psCur);
    }
    if(pHash)
        free(pHash);

    if(strlen(caPlate) > 0)
    {
        printf("\n\n caPlate > 0 \n\n");
        utPltOutToHtml(iFd, psMsgHead, psDbHead, caPlate);
    }
    else
    {
        printf("\n\n caPlate <=0 ���json�� mac/infoquery/macterm/ncs_user_tree.htm \n\n");
        //utPltOutToHtml(iFd, psMsgHead, psDbHead, "v4/ncs_user_tree.htm");
        utPltOutToHtml(iFd, psMsgHead, psDbHead, "mac/infoquery/macterm/ncs_user_tree.htm");
    }
    return 0;
}




/* �ȵ��ѯ����ʾ�ȵ���Ϣ��־ */
int ncsHotSpot_infolist_v4(utShmHead *psShmHead, int iFd, utMsgHead *psMsgHead)
{
    char instr_t[8192] = "";
    int iTime_flag = 0;
    int days = 0;
    int iret = 0;
    int _break = 0;
    int i = 0;
    int lCount = 0;
    int num = 0;
    int iNum = 0;

    unsigned long did = 0;
    unsigned long iStart = 0;
    unsigned long iLimit = 0;
    unsigned long lCount1 = 0;
    unsigned long lStartTime = 0;
    unsigned long lTime = time(0);
    unsigned long lTotRec = 0;

    char sdate[11] = "";
    char edate[11] = "";
    char time_flag[2] = "";
    char start[17] = "";
    char limit[17] = "";
    char sort[17] = "";
    char dir[9] = "";
    long lCurPg, lRowNum, lStartRec, lSstarttime;
    char sql[40960] = "";
    char caTotPg[16], caCurPg[16];
    char caPage[12], caLimit[16], caSort[16], caDir[16];
    char caKeyword[64], caTime_flag[32];
    char sql2[256] = "";
    char frmfile[256] = "";
    char *tmpgbk = NULL;
    char **ptmp = NULL;

    struct sttable
    {
        char tname[32];
        unsigned long lCount;
    };
    struct sttable tableinfo[120];//10�ꣿ
    pasDbCursor *psCur = NULL;
    char caGroups[1024];
    char caFacs[1024];
    char caArea[256], caName2[256];
    char caTemp[1024];
    long iReturn;
    unsigned long lIp;
    char caStime[16];
    char caEtime[16];
    char caTemp_d[64];
    char caGroupid[36], caDid[36];
    char caSdate[24], caEdate[24];
    char caApmac[36], caMac[36], caApname[64], caPosition[64];
    char caCorpname[128];
    char caCont[2048], caSsid[32] = "";
    char caServicecode[16], caSearchtype[32];
    strcpy(caFacs, (const char*)getDsFacDid());
    strcpy(caGroups, (const char*)getDsGroupid());

    /* ������� */
    char caExport[10] = "";



    utPltDbHead *psDbHead = utPltInitDb();
    utMsgPrintMsg(psMsgHead);
    iReturn = utMsgGetSomeNVar(psMsgHead, 22,
                               "TotPg",        UT_TYPE_STRING, 12, caTotPg,
                               "CurPg",        UT_TYPE_STRING, 12, caCurPg,
                               "keyword",      UT_TYPE_STRING, 60, caKeyword,
                               "page",         UT_TYPE_STRING, 10, caPage,
                               "limit",        UT_TYPE_STRING, 10, caLimit,
                               "sort",         UT_TYPE_STRING, 15, caSort,
                               "dir",          UT_TYPE_STRING, 8,  caDir,
                               "time_flag",    UT_TYPE_STRING, 8, caTime_flag,
                               "did",          UT_TYPE_STRING, 10, caDid,
                               "groupid",      UT_TYPE_STRING, 10, caGroupid,
                               "sdate",        UT_TYPE_STRING, 12, sdate,
                               "stime",        UT_TYPE_STRING, 10, caStime,
                               "edate",        UT_TYPE_STRING, 12, edate,
                               "etime",        UT_TYPE_STRING, 10, caEtime,
                               "mac",          UT_TYPE_STRING, 20, caMac,
                               "ssid",         UT_TYPE_STRING, 30, caSsid,
                               "searchtype",   UT_TYPE_STRING, 10, caSearchtype,
                               "hotinfoexport",      UT_TYPE_STRING, 9, caExport,
                               "servicecode",  UT_TYPE_STRING, 15, caServicecode,
                               "servicename",  UT_TYPE_STRING, 60, caCorpname,
                               "apmac",        UT_TYPE_STRING, 20, caApmac,
                               "apname",       UT_TYPE_STRING, 31, caApname);

    if(strlen(caSearchtype) > 0)
    {
        strcpy(caKeyword, "");
    }
    else
    {
        strcpy(sdate, "");
        strcpy(edate, "");
    }
    memset(caCont, 0, sizeof(caCont));

    if(strlen(caKeyword) > 0)
    {
        strcpy(caTemp_d, pasCvtGBK(2, caKeyword, caTemp, 60));
        strcpy(caKeyword, caTemp_d);
    }
    if(strlen(caCorpname) > 0)
    {
        strcpy(caTemp_d, pasCvtGBK(2, caCorpname, caTemp, 60));
        strcpy(caCorpname, caTemp_d);
    }

    if(strlen(caApname) > 0)
    {
        strcpy(caTemp_d, pasCvtGBK(2, caApname, caTemp, 60));
        strcpy(caApname, caTemp_d);
    }
    if(strlen(caSsid) > 0)
    {
        strcpy(caTemp_d, pasCvtGBK(2, caSsid, caTemp, 60));
        strcpy(caSsid, caTemp_d);
    }

    lCurPg = atol(caPage);
    if(lCurPg <= 0) lCurPg = 1;

    if(strlen(caLimit) > 0)
    {
        lRowNum = atol(caLimit);
    }
    else
    {
        lRowNum = 40; //ÿһҳ������
    }
    lStartRec = (lCurPg - 1) * lRowNum;

    iTime_flag = atoi(caTime_flag);
    switch(iTime_flag)
    {
        case 1://����
            days = 1;
            break;
        case 2://�������
            days = 3;
            break;
        case 3://���һ��
            days = 7;
            break;
        case 4://���һ��
            days = 30;
            break;
        case 5://�������
            days = 90;
            break;
        case 6://�������
            days = 180;
            break;
        default:
            days = 1;
            break;
    }

    if(strlen(sdate) > 0 && strlen(edate) > 0)
    {
        ptmp = ncsUtlGetTable3(sdate, edate, caStime, caEtime, "ncmachotinfo_if_", &lStartTime, &lTime, &lCount);
        printf("lStartTime=%d,sdate=%s\n", lStartTime, sdate);
    }
    else
    {
        ptmp = ncsUtlGetTable(lTime, days, "ncmachotinfo_if_",  &lStartTime, &lCount);
        lTime = lTime + 2 * 3600;
    }

    memset(caCont, 0, sizeof(caCont));

    /* �߼���ѯ�����ֶ� */
    if(strlen(caSearchtype) > 0)
    {
        if(strlen(caApmac) > 0)         //�ȵ�MAC
        {
            sprintf(caCont + strlen(caCont), " and apmac like '%c%s%c' ", '%', caApmac, '%');
        }
        if(strlen(caApname) > 0)        //�ɼ��豸���
        {
            sprintf(caCont + strlen(caCont), " and apname like '%c%s%c' ", '%', caApname, '%');
        }
        if(strlen(caServicecode) > 0)   //�������
        {
            sprintf(caCont + strlen(caCont), " and servicecode like '%c%s%c' ", '%', caServicecode, '%');
        }
        if(strlen(caCorpname) > 0)      //��������
        {
            sprintf(caCont + strlen(caCont), " and servicename like '%c%s%c' ", '%', caCorpname, '%');
        }
    }
    else
    {
        if(strlen(caKeyword) > 0)
        {
            sprintf(caCont, " and (mac like '%c%s%c' or ssid like '%c%s%c' or servicecode like '%c%s%c' or servicename like '%c%s%c' or apmac like '%c%s%c') ", '%', caKeyword, '%', '%', caKeyword, '%', '%', caKeyword, '%', '%', caKeyword, '%', '%', caKeyword, '%');
        }
    }

    /*  ��ǰ�û�Ȩ�������ܲ�ѯ����*/
    if(strlen(caGroups) > 0)
    {
        sprintf(caCont + strlen(caCont), " and %s", getDsGroupcodeSql("servicecode"));
    }

    char sql3[4096] = "";
    unsigned long lCount2 = 0;
    unsigned long lTotRec2 = 0;
    int num2 = 0;
    /* ȥ�غ��ѯ��� */
    for(i = 0; i < lCount; i++)
    {
        lCount2 = 0;
        memset(sql3, 0, sizeof(sql3));
        snprintf(sql3, sizeof(sql3), "select count(distinct a.mac) from %s a where a.stime >= %lu and a.stime <= %lu  ",  ptmp[i], lStartTime, lTime);
        strcat(sql3, caCont);
        printf("sql3 = %s\n", sql3);
        pasDbOneRecord(sql3, 0, UT_TYPE_ULONG, 4, &lCount2);
        if(lCount2 > 0)
        {
            strcpy(tableinfo[num2].tname, ptmp[i]);
            tableinfo[num2].lCount = lCount2;
            num2++;
        }
        //free(ptmp[i]);
    }
    //free(ptmp);

    for(i = 0; i < num2; i++)
    {
        lTotRec2 += tableinfo[i].lCount;
    }
    printf(" lCount2 = %lu  num2 = %d  lTotRec2 = %lu\n\n", lCount2, num2, lTotRec2);
    utPltPutVarF(psDbHead, "distinctCount", "%lu", lTotRec2);

    for(i = 0; i < lCount; i++)
    {
        lCount1 = 0;
        memset(sql, 0, sizeof(sql));

        /* ������ѯ */
        //snprintf(sql, sizeof(sql), "select count(*) from %s a, nchotspotinfo b where a.stime >= %lu and a.stime <= %lu and a.ssid != \'\' AND a.ssid = b.ssid ",  ptmp[i], lStartTime, lTime);

        /* �ǹ�����ѯ */
        snprintf(sql, sizeof(sql), "select count(*) from %s a where a.stime >= %lu and a.stime <= %lu and a.ssid != \'\' ",  ptmp[i], lStartTime, lTime);
        strcat(sql, caCont);

        printf("sql = %s\n", sql);

        pasDbOneRecord(sql, 0, UT_TYPE_ULONG, 4, &lCount1);
        if(lCount1 > 0)
        {
            strcpy(tableinfo[num].tname, ptmp[i]);
            tableinfo[num].lCount = lCount1;
            num++;
        }
        free(ptmp[i]);
    }
    free(ptmp);

    printf(" num = %d\n", num);
    for(i = 0; i < num; i++)
    {
        lTotRec += tableinfo[i].lCount;
    }
    utPltPutVarF(psDbHead, "TotRec", "%lu", lTotRec);


    for(i = num - 1; i >= 0; i--)
    {
        printf("table[%d] = %s, _lCount1[%d] = %lu\n", i, tableinfo[i].tname, i, tableinfo[i].lCount);
    }

    /* �������� */
    FILE *fp;
    char caFilename[32];
    char caFile[128];
    char caPath[128];

    //ѡ�񵼳��Ļ�
    if(strlen(caExport) > 0)
    {
        printf(" fp caExport  = %s\n\n", caExport);
        sprintf(caFilename, "hotInfoLog.csv");
        sprintf(caPath, "%s", "/home/ncmysql/ncs");
        sprintf(caFile, "%s/%s", caPath, caFilename);
        fp = fopen(caFile, "w");
        if(fp == NULL)
        {
            printf("���ݵ�������\n\n");
            return 0;
        }
        fprintf(fp, "�ȵ��ѯ\n");  //����
        printf(" д���ȵ��ѯ\n\n");
        ncUtlPrintCsv(fp, 14,
                      UT_TYPE_STRING, "�Ƿ�Ϲ�",
                      UT_TYPE_STRING, "�ȵ�SSID",
                      UT_TYPE_STRING, "��������",
                      UT_TYPE_STRING, "�ȵ�Ƶ��",
                      UT_TYPE_STRING, "�ȵ��������",
                      UT_TYPE_STRING, "�ɼ�ʱ��",
                      UT_TYPE_STRING, "�ȵ�MAC��ַ",
                      UT_TYPE_STRING, "�ȵ㳡ǿ",
                      UT_TYPE_STRING, "�ɼ��豸����",
                      UT_TYPE_STRING, "�ɼ��豸γ��",
                      UT_TYPE_STRING, "�������",
                      UT_TYPE_STRING, "�ɼ��豸���",
                      UT_TYPE_STRING, "X����",
                      UT_TYPE_STRING, "Y����");
    }
    //printf(" num = %d\n\n", num);

    iNum = 0;
    iStart = lStartRec;
    iLimit = lRowNum;

    for(i = num - 1; i >= 0; i--)
    {
        memset(sql, 0, sizeof(sql));
        if(tableinfo[i].lCount <= iStart)
        {
            iStart -= tableinfo[i].lCount;
            continue;
        }
        /* �����Ƿ�Ϲ��ֶ� */
        //snprintf(sql, sizeof(sql), "select a.servicecode, a.servicename, a.address, a.mac, a.apname, a.apmac, a.ssid, a.stime, a.channel, a.rssi, a.security, a.longitude, a.latitude, b.authflag from %s a, nchotspotinfo b where a.stime >= %lu and a.stime <= %lu and a.ssid != \'\' AND a.ssid = b.ssid ", tableinfo[i].tname, lStartTime, lTime);

        /* ȥ���Ƿ�Ϲ��ֶ� */
        snprintf(sql, sizeof(sql), "select a.servicecode, a.servicename, a.address, a.mac, a.apname, a.apmac, a.ssid, a.stime, a.channel, a.rssi, a.security, a.longitude, a.latitude from %s a where a.stime >= %lu and a.stime <= %lu and a.ssid != \'\' ", tableinfo[i].tname, lStartTime, lTime);

        strcat(sql, caCont);

        snprintf(sql + strlen(sql), sizeof(sql) - strlen(sql), " order by a.stime desc limit %lu, %lu", iStart, iLimit < tableinfo[i].lCount ? iLimit : tableinfo[i].lCount);


        if(tableinfo[i].lCount > iStart && tableinfo[i].lCount < iStart + iLimit)
        {
            iLimit = iLimit - (tableinfo[i].lCount - iStart);
            iStart = 0;
        }
        else
        {
            _break = 1;
        }

        printf("__line = %d, sql = %s\n", __LINE__, sql);
        psCur = pasDbOpenSql(sql, 0);
        if(psCur != NULL)
        {
            char caServicecode[16], caServicename[64], caAddress[64], caMac[20], caApname[32], caApmac[20], caSsid[64];
            long lStarttime, lEndtime, lFlags;
            char caChannel[32], caRssi[16], caSecurity[16], caLongitude[16], caLatitude[16], caAuthFlag[3] = "";
            char caHotspotfirm[32] = "", caMacBinary[16] = "";
            unsigned char *pHotspotfirm;

            memset(caServicecode, 0, sizeof(caServicecode));
            memset(caServicename, 0, sizeof(caServicename));
            memset(caAddress, 0, sizeof(caAddress));
            memset(caMac, 0, sizeof(caMac));
            memset(caApname, 0, sizeof(caApname));
            memset(caApmac, 0, sizeof(caApmac));
            memset(caSsid, 0, sizeof(caSsid));
            lStarttime = 0;
            memset(caChannel, 0, sizeof(caChannel));
            memset(caRssi, 0, sizeof(caRssi));
            memset(caSecurity, 0, sizeof(caSecurity));
            memset(caLongitude, 0, sizeof(caLongitude));
            memset(caLatitude, 0, sizeof(caLatitude));
            iret = pasDbFetchInto(psCur,
                                  UT_TYPE_STRING, 14, caServicecode,
                                  UT_TYPE_STRING, 63, caServicename,
                                  UT_TYPE_STRING, 63, caAddress,
                                  UT_TYPE_STRING, 18, caMac,
                                  UT_TYPE_STRING, 31, caApname,
                                  UT_TYPE_STRING, 18, caApmac,
                                  UT_TYPE_STRING, 63, caSsid,
                                  UT_TYPE_LONG, 4, &lStarttime,
                                  UT_TYPE_STRING, 2, caChannel,
                                  UT_TYPE_STRING, 8, caRssi,
                                  UT_TYPE_STRING, 2, caSecurity,
                                  UT_TYPE_STRING, 11, caLongitude,
                                  UT_TYPE_STRING, 11, caLatitude,
                                  UT_TYPE_STRING, 3, caAuthFlag);

            //printf("\n\n**********************************************");
            while(((iret == 0) || (iret == 1405)))
            {
                /* ѡ�񵼳��Ļ� */
                if(strlen(caExport) > 0)
                {
                    if(strcmp(caAuthFlag, "0"))
                    {
                        strcpy(caAuthFlag, "�ǺϹ�");
                    }
                    else if(strcmp(caAuthFlag, "1"))
                    {
                        strcpy(caAuthFlag, "�Ϲ�");
                    }
                    else
                    {
                        strcpy(caAuthFlag, "����");
                    }

                    ncUtlPrintCsv(fp, 14,
                                  UT_TYPE_STRING, caAuthFlag,
                                  UT_TYPE_STRING, caSsid,
                                  UT_TYPE_STRING, caServicename,
                                  UT_TYPE_STRING, caChannel,
                                  UT_TYPE_STRING, caSecurity,
                                  UT_TYPE_LONG, lStarttime,
                                  UT_TYPE_STRING, caApmac,
                                  UT_TYPE_STRING, caRssi,
                                  UT_TYPE_STRING, caLongitude,
                                  UT_TYPE_STRING, caLatitude,
                                  UT_TYPE_STRING, caServicecode,
                                  UT_TYPE_STRING, caApname,
                                  UT_TYPE_STRING, "X����",
                                  UT_TYPE_STRING, "Y����");
                }
                else
                {
                    iNum++;
                    if(iNum > 1)
                    {
                        utPltPutLoopVar(psDbHead, "dh", iNum, ",");
                    }

                    utPltPutLoopVar(psDbHead, "authflag", iNum, caAuthFlag);
                    utPltPutLoopVar(psDbHead, "stime", iNum, utTimFormat("%Y-%m-%d %H:%M:%S", lStarttime));
                    utPltPutLoopVar(psDbHead, "address", iNum, caAddress);
                    utPltPutLoopVar(psDbHead, "apname", iNum, caApname);
                    //utPltPutLoopVar(psDbHead,"mac",iNum,caMac);

                    //д���ȵ㳡��
                    memset(caHotspotfirm, 0, sizeof(caHotspotfirm));
                    memset(caMacBinary, 0, sizeof(caMacBinary));
                    pasCvtMacI(caMac, caMacBinary);

                    pHotspotfirm = ncUtlCvtMac2Vendor(caMacBinary, caHotspotfirm);
                    if(pHotspotfirm == NULL)
                    {
                        snprintf(caHotspotfirm, sizeof(caHotspotfirm) - 1, "%s", "����");
                    }
                    //printf("\n caMac = %s, caMacBinary = %s, pHotspotfirm = %p, caHotspotfirm = %s\n", caMac, caMacBinary, pHotspotfirm, caHotspotfirm);

                    utPltPutLoopVar(psDbHead, "hotspotfirm", iNum, caHotspotfirm);


                    utPltPutLoopVar(psDbHead, "apmac", iNum, caMac); //ǰ̨�ȵ�mac��ʾΪmac��ַ
                    utPltPutLoopVar(psDbHead, "servicename", iNum, caServicename);
                    utPltPutLoopVar(psDbHead, "channel", iNum, caChannel);
                    utPltPutLoopVar(psDbHead, "rssi", iNum, caRssi);
                    //printf("caSecurity=%s\n",caSecurity);
                    utPltPutLoopVar(psDbHead, "security", iNum, caSecurity);
                    utPltPutLoopVar(psDbHead, "longitude", iNum, caLongitude);
                    utPltPutLoopVar(psDbHead, "latitude", iNum, caLatitude);
                    utPltPutLoopVar(psDbHead, "ssid", iNum, caSsid);
                    utPltPutLoopVar(psDbHead, "servicecode", iNum, caServicecode);
                }

                memset(caAuthFlag, 0, sizeof(caAuthFlag));
                memset(caServicecode, 0, sizeof(caServicecode));
                memset(caServicename, 0, sizeof(caServicename));
                memset(caAddress, 0, sizeof(caAddress));
                memset(caMac, 0, sizeof(caMac));
                memset(caApname, 0, sizeof(caApname));
                memset(caApmac, 0, sizeof(caApmac));
                memset(caSsid, 0, sizeof(caSsid));
                lStarttime = 0;
                memset(caChannel, 0, sizeof(caChannel));
                memset(caRssi, 0, sizeof(caRssi));
                memset(caSecurity, 0, sizeof(caSecurity));
                memset(caLongitude, 0, sizeof(caLongitude));
                memset(caLatitude, 0, sizeof(caLatitude));
                iret = pasDbFetchInto(psCur,
                                      UT_TYPE_STRING, 14, caServicecode,
                                      UT_TYPE_STRING, 63, caServicename,
                                      UT_TYPE_STRING, 63, caAddress,
                                      UT_TYPE_STRING, 18, caMac,
                                      UT_TYPE_STRING, 31, caApname,
                                      UT_TYPE_STRING, 18, caApmac,
                                      UT_TYPE_STRING, 63, caSsid,
                                      UT_TYPE_LONG, 4, &lStarttime,
                                      UT_TYPE_STRING, 2, caChannel,
                                      UT_TYPE_STRING, 8, caRssi,
                                      UT_TYPE_STRING, 2, caSecurity,
                                      UT_TYPE_STRING, 11, caLongitude,
                                      UT_TYPE_STRING, 11, caLatitude,
                                      UT_TYPE_STRING, 3, caAuthFlag);

            }
            //printf("**********************************************\n\n");
            pasDbCloseCursor(psCur);
        }

        if(_break == 1)
            break;
    }
    /* ѡ�񵼳��Ļ� */
    if(strlen(caExport) > 0)
    {
        fclose(fp);
        utPltFileDownload(iFd, "application/text", caPath, caFilename, caFilename);
        remove(caFile);
        return 0;
    }

    utPltOutToHtml(iFd, psMsgHead, psDbHead, "rzcx/proauth_hotinfo_list.htm");
    return 0;
}

/* �ȵ��ѯ����ǺϹ桢���Ϲ� */
int ncsHotSpot_MarkRuleorNot(utShmHead *psShmHead, int iFd, utMsgHead *psMsgHead)
{
    /* ��ʼ��ģ�����ݻ����� */
    utPltDbHead *psDbHead = utPltInitDb();

    /* �����ݰ���ʾ����,��������Ҫ���ڵ��ԡ�
    ��ʾʱ����ʾ���ݰ���ͷ����Ȼ����ʾ���ݰ������ݡ�*/
    utMsgPrintMsg(psMsgHead);

    char caAuthflag[60] = "";
    char caSsid[1024] = "";
    char caMac[1024] = "";
    int iReturn = 0;

    /* ����Ϣ���ݰ� psMsgHead ����ȡָ�������ı��� */
    iReturn = utMsgGetSomeNVar(psMsgHead, 3,
                               "authflag", UT_TYPE_STRING, sizeof(caAuthflag) - 1, caAuthflag,
                               "ssid", UT_TYPE_STRING, sizeof(caSsid) - 1, caSsid,
                               "mac", UT_TYPE_STRING, sizeof(caMac) - 1, caMac);

    printf("\n");

    //caSsid[1024] = "MERCURY_661788,MERCURY_661788,Test_HKPLAZA,Test_HKPLAZA";
    //caMac[1024]  = "14-CF-92-66-17-88,14-CF-92-66-17-88,02-34-CB-C0-A1-5F,02-34-CB-C0-A1-5F";

#ifdef INFOQUERY_DEBUG

    /* iReturn ��ֵ�����ӡ�ᵼ���������ִ���쳣 */
    //printf("authflag = [%s]\n", caAuthflag);
    printf("ssid = %s\n", caSsid);
    printf("mac = %s\n", caMac);
#endif

    int iRet = 0;
    char sql[1024] = "";

    char *pSsidNow = NULL;
    char *pSsidLeft = NULL;
    char *pMacNow = NULL;
    char *pMacLeft = NULL;


    pSsidNow = strtok_r(caSsid, ",", &pSsidLeft);
    pMacNow = strtok_r(caMac, ",", &pMacLeft);
    //while(pSsidNow)
    {
        //snprintf(sql, sizeof(sql), "update nchotspotinfo set authflag = \'%s\' where ssid = \'%s\' ", caAuthflag, pSsid);

        iRet = pasDbExecSqlF("select ssid from nchotspotinfo where ssid = '1234'");
        printf("iRet = %d\n", iRet);
        if(iRet)
        {
            utPltPutVar(psDbHead, "result", "false");
            utPltPutVar(psDbHead, "message", "���ʧ��");
        }

#ifdef INFOQUERY_DEBUG
        printf("sql = %s\n", sql);
#endif
        memset(sql, 0 , sizeof(sql));

        //printf("pMacNow = %s\n", pMacNow);
        pMacNow = strtok_r(NULL, ",", &pMacLeft);

        //printf("pSsidNow = %s\n", pSsidNow);
        pSsidNow = strtok_r(NULL, ",", &pSsidLeft);


    }
    if(!iRet)
    {
        utPltPutVar(psDbHead, "result", "true");
        utPltPutVar(psDbHead, "message", "��ǳɹ�");
    }

    utPltOutToHtml(iFd, psMsgHead, psDbHead, "mac/infoquery/hotinfo/MarkRuleorNot.htm");
    return 0;

}




/* ������Ϣ��ѯ����ʾ�ն�������Ϣ��־�� */
int ncsPlace_mactermlist_v4(utShmHead *psShmHead, int iFd, utMsgHead *psMsgHead)
{
    char instr_t[8192] = "";
    int iTime_flag = 0;
    int days = 0;
    int iret = 0;
    int _break = 0;
    int i = 0;
    int lCount = 0;
    int num = 0;
    int iNum = 0;

    unsigned long did = 0;
    unsigned long iStart = 0;
    unsigned long iLimit = 0;
    unsigned long lCount1 = 0;
    unsigned long lStartTime = 0;
    unsigned long lTime = time(0);
    unsigned long lTotRec = 0;

    char sdate[11] = "";
    char edate[11] = "";
    char time_flag[2] = "";
    char start[17] = "";
    char limit[17] = "";
    char sort[17] = "";
    char dir[9] = "";
    long lCurPg, lRowNum, lStartRec, lSstarttime;
    char sql[40960] = "";
    char caTotPg[16], caCurPg[16];
    char caPage[12], caLimit[16], caSort[16], caDir[16];
    char caKeyword[64], caTime_flag[32];
    char sql2[256] = "";
    char frmfile[256] = "";
    char *tmpgbk = NULL;
    char **ptmp = NULL;

    struct sttable
    {
        char tname[32];
        unsigned long lCount;
    };
    struct sttable tableinfo[120];//10�ꣿ
    pasDbCursor *psCur = NULL;
    char caGroups[1024];
    char caFacs[1024];
    char caArea[256], caName2[256];
    char caTemp[1024];
    long iReturn;
    unsigned long lIp;
    char caStime[16] = "";
    char caEtime[16] = "";
    char caTemp_d[64];
    char caGroupid[36], caDid[36];
    char caSdate[24], caEdate[24];
    char caApmac[36], caMac[36], caApname[64], caPosition[64];
    char caCorpname[128];
    char caCont[2048];
    char caServicecode[16];
    char caSsid[36] = "";
    char caUserName[64] = "";
    strcpy(caFacs, (const char*)getDsFacDid());
    strcpy(caGroups, (const char*)getDsGroupid());

    /* ѡ�񵼳��Ļ� */
    char caExport[10] = "";


    /* �߼���ѯ�����ֶ� */
    char caSearchtype[32] = "";
    char caSname[32] = "";
    char caServicegtype[32] = "";
    char caServicearea[36] = "";
    char caCeoname[32] = "";
    char caJytype[32] = "";

    utPltDbHead *psDbHead = utPltInitDb();
    utMsgPrintMsg(psMsgHead);
    iReturn = utMsgGetSomeNVar(psMsgHead, 27,
                               "TotPg",        UT_TYPE_STRING, 12, caTotPg,
                               "CurPg",        UT_TYPE_STRING, 12, caCurPg,
                               "keyword",      UT_TYPE_STRING, 60,  caKeyword,
                               "page",         UT_TYPE_STRING, 10,  caPage,
                               "limit",        UT_TYPE_STRING, 10,  caLimit,
                               "sort",         UT_TYPE_STRING, 15, caSort,
                               "dir",          UT_TYPE_STRING, 8,  caDir,
                               "time_flag",    UT_TYPE_STRING, 8,   caTime_flag,
                               "did",          UT_TYPE_STRING, 10,  caDid,
                               "groupid",      UT_TYPE_STRING, 16,  caGroupid,
                               "sdate",        UT_TYPE_STRING, 12,  sdate,
                               "stime",        UT_TYPE_STRING, 10,  caStime,
                               "edate",        UT_TYPE_STRING, 12,  edate,
                               "etime",        UT_TYPE_STRING, 10,  caEtime,
                               "apmac",        UT_TYPE_STRING, 20,  caApmac,
                               "mac",          UT_TYPE_STRING, 20,  caMac,
                               "apname",       UT_TYPE_STRING, 31,  caApname,
                               "username",     UT_TYPE_STRING, 16,  caUserName,
                               "ssid",         UT_TYPE_STRING, 30,  caSsid,
                               "servicename",  UT_TYPE_STRING, 60,  caCorpname,
                               "servicecode",  UT_TYPE_STRING, 15,  caServicecode,

                               "searchtype",   UT_TYPE_STRING, 10,  caSearchtype,
                               "sname",      UT_TYPE_STRING, 31, caSname,
                               "servicegtype",      UT_TYPE_STRING, 31, caServicegtype,
                               "servicearea",      UT_TYPE_STRING, 35, caServicearea,
                               "ceoname",      UT_TYPE_STRING, 31, caCeoname,
                               "jytype",      UT_TYPE_STRING, 31, caJytype);

    char caGroupcodeSql[1024] = "";
    strcpy(caGroupcodeSql, getGroupcodeSql("servicecode", caGroupid));

    MyremoveAll(caKeyword, '-');
    MyremoveAll(caKeyword, ':');

    if(strlen(caSearchtype) > 0)
    {
        strcpy(caKeyword, "");
    }
    else
    {
        strcpy(sdate, "");
        strcpy(edate, "");
    }
    memset(caCont, 0, sizeof(caCont));


    if(strlen(caKeyword) > 0)
    {
        strcpy(caTemp_d, pasCvtGBK(2, caKeyword, caTemp, 60));
        strcpy(caKeyword, caTemp_d);
    }
    if(strlen(caCorpname) > 0)
    {
        strcpy(caTemp_d, pasCvtGBK(2, caCorpname, caTemp, 60));
        strcpy(caCorpname, caTemp_d);
    }
    if(strlen(caApname) > 0)
    {
        strcpy(caTemp_d, pasCvtGBK(2, caApname, caTemp, 60));
        strcpy(caApname, caTemp_d);
    }
    if(strlen(caSsid) > 0)
    {
        strcpy(caTemp_d, pasCvtGBK(2, caSsid, caTemp, 60));
        strcpy(caSsid, caTemp_d);
    }

    lCurPg = atol(caPage);
    if(lCurPg <= 0) lCurPg = 1;

    if(strlen(caLimit) > 0)
    {
        lRowNum = atol(caLimit);
    }
    else
    {
        lRowNum = 40; //ÿһҳ������
    }
    lStartRec = (lCurPg - 1) * lRowNum;

    iTime_flag = atoi(caTime_flag);
    switch(iTime_flag)
    {
        case 1://����
            days = 1;
            break;
        case 2://�������
            days = 3;
            break;
        case 3://���һ��
            days = 7;
            break;
        case 4://���һ��
            days = 30;
            break;
        case 5://�������
            days = 90;
            break;
        case 6://�������
            days = 180;
            break;
        default:
            days = 1;
            break;
    }

    if(strlen(sdate) > 0 && strlen(edate) > 0)
    {
        ptmp = ncsUtlGetTable3(sdate, edate, caStime, caEtime, "ncmactermatt_if_", &lStartTime, &lTime, &lCount);
        printf("lStartTime=%d,sdate=%s\n", lStartTime, sdate);
    }
    else
    {
        ptmp = ncsUtlGetTable(lTime, days, "ncmactermatt_if_",  &lStartTime, &lCount);
        lTime = lTime + 2 * 3600;
    }

    memset(caCont, 0, sizeof(caCont));

    /* ���������������жϣ������ @���ǹؼ��֣��������� */
    char caGroupidJudge[30] = "";

    /* �߼���ѯ���� */
    if(strlen(caSearchtype) > 0)
    {
        if(strlen(caMac) > 0)
        {
            sprintf(caCont + strlen(caCont), " and a.mac like '%c%s%c' ", '%', caMac, '%');
        }
        if(strlen(caApmac) > 0)
        {
            sprintf(caCont + strlen(caCont), " and a.apmac like '%c%s%c' ", '%', caApmac, '%');
        }
        if(strlen(caApname) > 0)
        {
            sprintf(caCont + strlen(caCont), " and a.apname like '%c%s%c' ", '%', caApname, '%');
        }
        if(strlen(caCorpname) > 0)
        {
            sprintf(caCont + strlen(caCont), " and a.servicename like '%c%s%c' ", '%', caCorpname, '%');
        }

        /* �߼���ѯ���� */
        if(strlen(caSname) > 0)         //��ȫ�������Ʋ�ѯ
        {
            //sprintf(caCont+strlen(caCont)," and servicename like '%c%s%c' ",'%',caSname,'%');
            printf(" ��ȫ��������Ϊ %s \n\n", caSname);
        }
        if(strlen(caServicecode) > 0)   //�������
        {
            sprintf(caCont + strlen(caCont), " and a.servicecode like '%c%s%c' ", '%', caServicecode, '%');
        }
        if(strlen(caServicegtype) > 0)  //������������
        {
            //sprintf(caCont+strlen(caCont)," and servicename like '%c%s%c' ",'%',caIdname,'%');
            printf(" ������������ %s \n\n", caServicegtype);
        }
        if(strlen(caServicearea) > 0)   //������������
        {
            printf(" ������������ %s \n\n", caServicearea);
        }
        if(strlen(caCeoname) > 0)       //�������˻���������
        {
            printf(" �������˻��������� %s \n\n", caCeoname);
        }
        if(strlen(caJytype) > 0)        //������Ӫ����
        {
            printf(" �������˻��������� %s \n\n", caJytype);
        }
    }
    else
    {
        printf(" if outer caKeyword = %s\n\n", caKeyword);
        if(strlen(caKeyword) > 0)
        {
            /* �ַ�����Сдת��д */
            int i = 0, j = 0;
            j = strlen(caKeyword);

            for(i = 0; i <= j; i++)
            {
                if(caKeyword[i] >= 'a' && caKeyword[i] <= 'z')
                    caKeyword[i] = caKeyword[i] - 32;
            }
            caKeyword[i] = '\0';
            //printf("After strToUpper: caKeyword = %s \n", caKeyword);

            if(strcmp(caGroupid, "all") == 0)
            {
                printf("��ѯ���г���\n\n");
            }
            else
            {
                strncpy(caGroupidJudge, caKeyword, 1);
                if(strcmp(caGroupidJudge, "@") == 0)
                {
                    printf("caKeyword = %s, caGroupidJudge = %s\n\n", caKeyword, caGroupidJudge);
                    if(strlen(caGroupid) > 0)
                    {
                        if(strlen(caGroupcodeSql) > 0)
                            sprintf(caCont + strlen(caCont), " and %s", caGroupcodeSql);

                        printf(" caGroupid = %s, caCont = %s", caGroupid, caCont);
                    }
                    else
                    {
                        if(strlen(caUserName) > 0)
                        {
                            //printf("In caKeyword @ caUserName = %s\n", caUserName);

                            //ͨ�� caUserId ȥ��ȡ���Ӧ lGroupId
                            sprintf(caCont + strlen(caCont), " and a.servicecode = \'%s\'", caUserName);

                            printf(" caUserName = %s, caCont = %s", caUserName, caCont);
                        }
                    }


                    /* �ж������caKeyword �Ƿ��еڶ���'@'  �ַ�: ����У���ȡ�����ֵ��Ϊ�������� */
                    memset(caGroupidJudge, 0, sizeof(caGroupidJudge));
                    char *pstrKeywordServiceName = NULL, *pstrKeywordMac = NULL;
                    pstrKeywordServiceName = strtok_r(caKeyword, "@", &pstrKeywordMac);
                    //printf("pstrKeywordServiceName, pstrKeywordMac = %s\n", pstrKeywordServiceName, pstrKeywordMac);

                    /* @  ����@  �������������mac/apmac */
                    if(strcmp(pstrKeywordMac, "") != 0)
                        sprintf(caCont + strlen(caCont), " and (replace(a.mac,'-','') like '%c%s%c' or replace(a.apmac,'-','') like '%c%s%c') ", '%', pstrKeywordMac, '%', '%', pstrKeywordMac, '%');
                }
                else
                {
                    sprintf(caCont + strlen(caCont), " and (a.servicecode like '%c%s%c' or a.servicename like '%c%s%c' or a.apname like '%c%s%c') ", '%', caKeyword, '%', '%', caKeyword, '%', '%', caKeyword, '%');
                }
            }

        }
    }

    /*if(strlen(caDid)>0)
    {

        sprintf(caCont+strlen(caCont)," and a.servicecode='%s' ",getServicecodeByid(psShmHead,atol(caDid)));
    }*/

    /*  ��ǰ�û�Ȩ�������ܲ�ѯ����*/
    if(strlen(caGroups) > 0)
    {
        sprintf(caCont + strlen(caCont), " and %s", getDsGroupcodeSql("servicecode"));
    }


    char sql3[4096] = "";
    unsigned long lCount2 = 0;
    unsigned long lTotRec2 = 0;
    int num2 = 0;

    /* ȥ�غ��ѯ��� */
    for(i = 0; i < lCount; i++)
    {
        lCount2 = 0;
        memset(sql3, 0, sizeof(sql3));
        snprintf(sql3, sizeof(sql3), "select count(distinct a.mac) from %s a where a.stime >= %lu and a.stime <= %lu  ",  ptmp[i], lStartTime, lTime);
        strcat(sql3, caCont);
        printf("sql3 = %s\n", sql3);
        pasDbOneRecord(sql3, 0, UT_TYPE_ULONG, 4, &lCount2);
        if(lCount2 > 0)
        {
            strcpy(tableinfo[num2].tname, ptmp[i]);
            tableinfo[num2].lCount = lCount2;
            num2++;
        }
        //free(ptmp[i]);
    }
    //free(ptmp);

    for(i = 0; i < num2; i++)
    {
        lTotRec2 += tableinfo[i].lCount;
    }
    printf(" lCount2 = %lu  num2 = %d  lTotRec2 = %lu\n\n", lCount2, num2, lTotRec2);
    utPltPutVarF(psDbHead, "distinctCount", "%lu", lTotRec2);


    for(i = 0; i < lCount; i++)
    {
        lCount1 = 0;
        memset(sql, 0, sizeof(sql));
        snprintf(sql, sizeof(sql), "select count(*) from %s a where a.stime >= %lu and a.stime <= %lu  ", ptmp[i], lStartTime, lTime);
        strcat(sql, caCont);
        printf("sql = %s\n", sql);
        pasDbOneRecord(sql, 0, UT_TYPE_ULONG, 4, &lCount1);
        if(lCount1 > 0)
        {
            strcpy(tableinfo[num].tname, ptmp[i]);
            tableinfo[num].lCount = lCount1;
            num++;
        }
        free(ptmp[i]);
    }
    free(ptmp);

    for(i = 0; i < num; i++)
    {
        lTotRec += tableinfo[i].lCount;
    }
    printf(" lCount1 = %lu  num = %d  lTotRec = %lu\n\n", lCount1, num, lTotRec);
    utPltPutVarF(psDbHead, "TotRec", "%lu", lTotRec);


    for(i = num - 1; i >= 0; i--)
    {
        printf("table[%d] = %s, _lCount1[%d] = %lu\n", i, tableinfo[i].tname, i, tableinfo[i].lCount);
    }

    /* �������� */
    FILE *fp;
    char caFilename[32];
    char caFile[128];
    char caPath[128];

    //ѡ�񵼳��Ļ�
    if(strlen(caExport) > 0)
    {
        printf(" fp caExport  = %s\n\n", caExport);
        sprintf(caFilename, "placeLog.csv");
        sprintf(caPath, "%s", "/home/ncmysql/ncs");
        sprintf(caFile, "%s/%s", caPath, caFilename);
        fp = fopen(caFile, "w");
        if(fp == NULL)
        {
            printf("���ݵ�������\n\n");
            return 0;
        }
        fprintf(fp, "������Ϣ��ѯ\n");  //����
        printf(" д�볡����Ϣ��ѯ��־\n\n");
        ncUtlPrintCsv(fp, 14,
                      UT_TYPE_STRING, "��������",
                      UT_TYPE_STRING, "�ɼ��豸����",
                      UT_TYPE_STRING, "��ȫ��������",
                      UT_TYPE_STRING, "�ɼ�ʱ��",
                      UT_TYPE_STRING, "�ɼ��ն�MAC",
                      UT_TYPE_STRING, "���ɼ��ն˳�ǿ",
                      UT_TYPE_STRING, "�����ȵ�SSID",
                      UT_TYPE_STRING, "�����ȵ�MAC",
                      UT_TYPE_STRING, "�����ȵ�Ƶ��",
                      UT_TYPE_STRING, "�����ȵ��������",
                      UT_TYPE_STRING, "�������",
                      UT_TYPE_STRING, "�ɼ��豸���",
                      UT_TYPE_STRING, "������ϸ��ַ",
                      UT_TYPE_STRING, "��ȫ������֯��������");

    }
    //printf(" num = %d\n\n", num);

    iNum = 0;
    iStart = lStartRec;
    iLimit = lRowNum;

    for(i = num - 1; i >= 0; i--)
    {
        memset(sql, 0, sizeof(sql));
        if(tableinfo[i].lCount <= iStart)
        {
            iStart -= tableinfo[i].lCount;
            continue;
        }
        /* ���Ϲ����ֶ� */
        //snprintf(sql, sizeof(sql), "select a.servicecode,a.servicename,d.address,a.mac,a.apname,a.apmac,a.ssid,a.stime,a.channel,a.rssi,a.security,a.longitude,a.latitude,a.termtype,a.vtype,a.vname, b.dispname, b.fcode, c.name from %s a, ncaplist b, ncsfactorycod c, ncsuser d where a.stime >= %lu and a.stime <= %lu and b.apname = RIGHT(a.apname, 12) and b.fcode = c.code and a.servicecode = d.username ", tableinfo[i].tname, lStartTime, lTime);

        /* ȥ���ֶ� */
        snprintf(sql, sizeof(sql), "select a.servicecode,a.servicename,a.address,a.mac,a.apname,a.apmac,a.ssid,a.stime,a.channel,a.rssi,a.security,a.longitude,a.latitude,a.termtype,a.vtype,a.vname from %s a where a.stime >= %lu and a.stime <= %lu ", tableinfo[i].tname, lStartTime, lTime);


        strcat(sql, caCont);

        snprintf(sql + strlen(sql), sizeof(sql) - strlen(sql), " order by a.stime desc limit %lu, %lu", iStart, iLimit < tableinfo[i].lCount ? iLimit : tableinfo[i].lCount);

        if(tableinfo[i].lCount > iStart && tableinfo[i].lCount < iStart + iLimit)
        {
            iLimit = iLimit - (tableinfo[i].lCount - iStart);
            iStart = 0;
        }
        else
        {
            _break = 1;
        }

        printf("__line = %d, sql = %s\n", __LINE__, sql);
        psCur = pasDbOpenSql(sql, 0);
        if(psCur != NULL)
        {
            char caServicecode[16], caServicename[64], caAddress[64], caMac[20], caApname[32], caApmac[20], caSsid[64];
            long lStarttime, lEndtime, lFlags;
            char caChannel[32], caRssi[16], caSecurity[16], caLongitude[16], caLatitude[16];
            char caTermtype[128], caVname[64];
            long lVtype;

            /* �ɼ��豸���ơ���ȫ�������ơ�������֯�������� */
            char caDispname[32] = "";
            char caFactoryname[32] = "";
            char caFactorycode[32] = "";

            memset(caServicecode, 0, sizeof(caServicecode));
            memset(caServicename, 0, sizeof(caServicename));
            memset(caAddress, 0, sizeof(caAddress));
            memset(caMac, 0, sizeof(caMac));
            memset(caApname, 0, sizeof(caApname));
            memset(caApmac, 0, sizeof(caApmac));
            memset(caSsid, 0, sizeof(caSsid));
            lStarttime = 0;
            memset(caChannel, 0, sizeof(caChannel));
            memset(caRssi, 0, sizeof(caRssi));
            memset(caSecurity, 0, sizeof(caSecurity));
            memset(caLongitude, 0, sizeof(caLongitude));
            memset(caLatitude, 0, sizeof(caLatitude));
            memset(caTermtype, 0, sizeof(caTermtype));
            memset(caVname, 0, sizeof(caVname));
            lVtype = 0;
            iret = pasDbFetchInto(psCur,
                                  UT_TYPE_STRING, 14, caServicecode,
                                  UT_TYPE_STRING, 63, caServicename,
                                  UT_TYPE_STRING, 63, caAddress,
                                  UT_TYPE_STRING, 18, caMac,
                                  UT_TYPE_STRING, 31, caApname,
                                  UT_TYPE_STRING, 18, caApmac,
                                  UT_TYPE_STRING, 63, caSsid,
                                  UT_TYPE_LONG, 4, &lStarttime,
                                  UT_TYPE_STRING, 2, caChannel,
                                  UT_TYPE_STRING, 8, caRssi,
                                  UT_TYPE_STRING, 2, caSecurity,
                                  UT_TYPE_STRING, 11, caLongitude,
                                  UT_TYPE_STRING, 11, caLatitude,
                                  UT_TYPE_STRING, 100, caTermtype,
                                  UT_TYPE_LONG, 4, &lVtype,
                                  UT_TYPE_STRING, 63, caVname,
                                  UT_TYPE_STRING, 31, caDispname,
                                  UT_TYPE_STRING, 31, caFactoryname,
                                  UT_TYPE_STRING, 31, caFactorycode);


            while((iret == 0) || (iret == 1405))
            {
                /* ѡ�񵼳��Ļ� */
                if(strlen(caExport) > 0)
                {
                    ncUtlPrintCsv(fp, 14,
                                  UT_TYPE_STRING, caServicename,
                                  UT_TYPE_STRING, caDispname,
                                  UT_TYPE_STRING, caFactoryname,
                                  UT_TYPE_LONG, lStarttime,
                                  UT_TYPE_STRING, caMac,
                                  UT_TYPE_STRING, caRssi,
                                  UT_TYPE_STRING, caSsid,
                                  UT_TYPE_STRING, caApmac,
                                  UT_TYPE_STRING, caChannel,
                                  UT_TYPE_STRING, caSecurity,
                                  UT_TYPE_STRING, caServicecode,
                                  UT_TYPE_STRING, caApname,
                                  UT_TYPE_STRING, caAddress,
                                  UT_TYPE_STRING, caFactorycode);
                }
                else
                {
                    iNum++;
                    if(iNum > 1)
                    {
                        utPltPutLoopVar(psDbHead, "dh", iNum, ",");
                    }
                    utPltPutLoopVar(psDbHead, "stime", iNum, utTimFormat("%Y-%m-%d %H:%M:%S", lStarttime));
                    utPltPutLoopVar(psDbHead, "address", iNum, caAddress);
                    utPltPutLoopVar(psDbHead, "apname", iNum, caApname);
                    utPltPutLoopVar(psDbHead, "mac", iNum, caMac);
                    utPltPutLoopVar(psDbHead, "apmac", iNum, caApmac);
                    utPltPutLoopVar(psDbHead, "servicename", iNum, caServicename);
                    utPltPutLoopVar(psDbHead, "channel", iNum, caChannel);
                    utPltPutLoopVar(psDbHead, "rssi", iNum, caRssi);
                    //printf("caSecurity=%s\n",caSecurity);
                    utPltPutLoopVar(psDbHead, "security", iNum, caSecurity);
                    utPltPutLoopVar(psDbHead, "longitude", iNum, caLongitude);
                    utPltPutLoopVar(psDbHead, "latitude", iNum, caLatitude);
                    utPltPutLoopVar(psDbHead, "ssid", iNum, caSsid);
                    utPltPutLoopVar(psDbHead, "servicecode", iNum, caServicecode);
                    utPltPutLoopVar(psDbHead, "termtype", iNum, caTermtype);
                    utPltPutLoopVar(psDbHead, "vname", iNum, caVname);
                    utPltPutLoopVarF(psDbHead, "vtype", iNum, "%d", lVtype);

                    utPltPutLoopVarF(psDbHead, "dispname", iNum, "%s", caDispname);
                    utPltPutLoopVarF(psDbHead, "factoryname", iNum, "%s", caFactoryname);
                    utPltPutLoopVarF(psDbHead, "factorycode", iNum, "%s", caFactorycode);
                }

                memset(caServicecode, 0, sizeof(caServicecode));
                memset(caServicename, 0, sizeof(caServicename));
                memset(caAddress, 0, sizeof(caAddress));
                memset(caMac, 0, sizeof(caMac));
                memset(caApname, 0, sizeof(caApname));
                memset(caApmac, 0, sizeof(caApmac));
                memset(caSsid, 0, sizeof(caSsid));
                lStarttime = 0;
                memset(caChannel, 0, sizeof(caChannel));
                memset(caRssi, 0, sizeof(caRssi));
                memset(caSecurity, 0, sizeof(caSecurity));
                memset(caLongitude, 0, sizeof(caLongitude));
                memset(caLatitude, 0, sizeof(caLatitude));
                memset(caTermtype, 0, sizeof(caTermtype));
                memset(caVname, 0, sizeof(caVname));
                memset(caDispname, 0, sizeof(caDispname));
                memset(caFactoryname, 0, sizeof(caFactoryname));
                memset(caFactorycode, 0, sizeof(caFactorycode));

                lVtype = 0;
                iret = pasDbFetchInto(psCur,
                                      UT_TYPE_STRING, 14, caServicecode,
                                      UT_TYPE_STRING, 63, caServicename,
                                      UT_TYPE_STRING, 63, caAddress,
                                      UT_TYPE_STRING, 18, caMac,
                                      UT_TYPE_STRING, 31, caApname,
                                      UT_TYPE_STRING, 18, caApmac,
                                      UT_TYPE_STRING, 63, caSsid,
                                      UT_TYPE_LONG, 4, &lStarttime,
                                      UT_TYPE_STRING, 2, caChannel,
                                      UT_TYPE_STRING, 8, caRssi,
                                      UT_TYPE_STRING, 2, caSecurity,
                                      UT_TYPE_STRING, 11, caLongitude,
                                      UT_TYPE_STRING, 11, caLatitude,
                                      UT_TYPE_STRING, 100, caTermtype,
                                      UT_TYPE_LONG, 4, &lVtype,
                                      UT_TYPE_STRING, 63, caVname,
                                      UT_TYPE_STRING, 31, caDispname,
                                      UT_TYPE_STRING, 31, caFactoryname,
                                      UT_TYPE_STRING, 31, caFactorycode);
            }
            pasDbCloseCursor(psCur);
        }

        if(_break == 1)
            break;
    }
    /* ѡ�񵼳��Ļ� */
    if(strlen(caExport) > 0)
    {
        fclose(fp);
        utPltFileDownload(iFd, "application/text", caPath, caFilename, caFilename);
        remove(caFile);
        return 0;
    }


    utPltOutToHtml(iFd, psMsgHead, psDbHead, "rzcx/proauth_hotinfo_list.htm");
    return 0;
}

/* ������Ϣ��ѯ�²鿴ͼ��1������Ƶ�����ֵ��ն�TOP10ͳ��
    (�����û�ѡ���ʱ��㡢�������ƻ���) */
int ncsPlace_Chosenplace_TerminalmacTop(utShmHead *psShmHead, int iFd, utMsgHead *psMsgHead)
{
    /* ��ʼ��ģ�����ݻ����� */
    utPltDbHead *psDbHead = utPltInitDb();

    /* �����ݰ���ʾ����,��������Ҫ���ڵ��ԡ�
    ��ʾʱ����ʾ���ݰ���ͷ����Ȼ����ʾ���ݰ������ݡ�*/
    utMsgPrintMsg(psMsgHead);

    /* ������š���ѯʱ������(�졢�ܡ��¡����¡����ȡ���) */
    char caTimeFlag[10] = "";
    char caServicename[32] = "";
    int iReturn = 0;
    /* ����Ϣ���ݰ� psMsgHead ����ȡָ�������ı��� */
    iReturn = utMsgGetSomeNVar(psMsgHead, 2,
                               "timevalue", UT_TYPE_STRING, sizeof(caTimeFlag) - 1, caTimeFlag,
                               "servicename", UT_TYPE_STRING, sizeof(caServicename) - 1, caServicename);

    printf("\n");
    printf("timevalue = %s\n", caTimeFlag);
    printf("servicename = %s\n", caServicename);

    if(strlen(caServicename) <= 0)
    {
        int a = 0;
        utPltPutVarF(psDbHead, "result", "%d\n", a);
        utPltOutToHtml(iFd, psMsgHead, psDbHead, "mac/infoquery/place/PlaceTerminalmacTop.htm");
        return 0;
    }

    /* ��ʼʱ�䡢����ʱ�� */
    /*char caStemptime[24] = "";
    long lstime, lttime, letime;
    //��ѯ��������������еĵ�
    long collect_number = 0; */

    //1.���ݵ�ǰ�������ɱ���
    char table_name[1024] = "";
    char  year[10];
    char  mon[10];
    memset(year, 0, sizeof(year));
    memset(mon, 0 , sizeof(mon));
    time_t now;
    time(&now);
    timeToStringPlace(now, year, mon);
    int syear = atoi(year);
    int smonth = atoi(mon);
    snprintf(table_name + strlen(table_name), 1024 - strlen(table_name), "ncmactermatt_if_%4u%02u", syear, smonth);

    //2.���ݲ�ѯʱ������ѡ����Ӧʱ������
    char caStartDate[32] = "";
    char caEndDate[32] = "";

    char sql[4096] = "";
    char sqlTmp[4096] = "";
    snprintf(sql, sizeof(sql), "select mac , count(stime) from %s where stime >= ", table_name);

    if(strcmp(caTimeFlag, "null") == 0)     //��ѯ���죺Ĭ��
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 1 DAY)) ");
    }
    else if(strcmp(caTimeFlag, "1") == 0)   //��ѯ���죺�û�ѡ��
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 1 DAY)) ");
    }
    else if(strcmp(caTimeFlag, "2") == 0)   //�������
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 3 DAY)) ");
    }
    else if(strcmp(caTimeFlag, "3") == 0)   //���һ��
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 7 DAY)) ");
    }
    else if(strcmp(caTimeFlag, "4") == 0)   //���һ��
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 1 MONTH)) ");
    }
    else if(strcmp(caTimeFlag, "5") == 0)   //�������
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 3 MONTH)) ");
    }
    else if(strcmp(caTimeFlag, "6") == 0)   //�������
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 6 MONTH)) ");
    }
    else    //�������
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 6 MONTH)) ");
    }

    //printf(sqlTmp);
    printf("\n");

    /* ��ԭ����sql�����Ч�ַ���β����׷���� sqlTmp */
    snprintf(sql + strlen(sql), sizeof(sql) - strlen(sql), "%s", sqlTmp);
    snprintf(sql + strlen(sql), sizeof(sql) - strlen(sql), " and stime <= (UNIX_TIMESTAMP(NOW())) and servicename like '%c%s%c' GROUP BY mac ORDER BY 2 desc limit 10 ", '%', caServicename, '%');


    /* snprintf(sql, sizeof(sql), "select mac , count(stime) from %s where stime >= UNIX_TIMESTAMP('2015-08-05 00:00:00') and stime <= (UNIX_TIMESTAMP(NOW())) and servicecode = \'%s\' GROUP BY mac ORDER BY 2 desc limit 10 ", table_name, caServiceCode); */
    printf("\n");
    printf("\n");
    printf("%s", sql);
    printf("\n");

    int iNum = 0, iRet = 0;
    unsigned long dwCountMax = 0;
    pasDbCursor *psCur = NULL;
    psCur = pasDbOpenSql(sql, 0);
    if(psCur != NULL)
    {
        printf("\n psCur is not null\n\n");
        char caMac[36] = "";
        unsigned long dwCount = 0;
        int nRet = 0;
        while(0 == (nRet = pasDbFetchInto(psCur, UT_TYPE_STRING, 32, &caMac,
                                          UT_TYPE_LONG,  20, &dwCount)) || 1405 == nRet)
        {
            iNum++;
            if(iNum > 1)
            {
                utPltPutLoopVar(psDbHead, "dh", iNum, ",");
            }
            utPltPutLoopVarF(psDbHead, "mac", iNum, "%s", caMac);
            utPltPutLoopVarF(psDbHead, "count", iNum, "%lu", dwCount);

            if(dwCount >= dwCountMax)
            {
                dwCountMax = dwCount;
            }

            //�������
            memset(caMac, 0, sizeof(caMac));
            dwCount = 0;
        }
    }

    pasDbCloseCursor(psCur);
    utPltPutVarF(psDbHead, "result", "%d\n", iNum);
    utPltPutVarF(psDbHead, "max", "%lu\n", dwCountMax);
    printf("final iNum = %d\n", iNum);
    utPltOutToHtml(iFd, psMsgHead, psDbHead, "mac/infoquery/place/PlaceTerminalmacTop.htm");
    return 0;
}

/* ������Ϣ��ѯ�²鿴ͼ��2��ָ�������������ܼ�ʱ��(�����û�ѡ���ʱ��㡢�������ƻ���) */
int ncsPlace_Chosenplace_PeopleCrowedTime(utShmHead *psShmHead, int iFd, utMsgHead *psMsgHead)
{
    /* ��ʼ��ģ�����ݻ����� */
    utPltDbHead *psDbHead = utPltInitDb();

    /* �����ݰ���ʾ����,��������Ҫ���ڵ��ԡ�
    ��ʾʱ����ʾ���ݰ���ͷ����Ȼ����ʾ���ݰ������ݡ�*/
    utMsgPrintMsg(psMsgHead);

    /* ������š���ѯʱ������(�졢�ܡ��¡����¡����ȡ���) */
    char caTimeFlag[10] = "";
    char caServicename[32] = "";
    int iReturn = 0;
    /* ����Ϣ���ݰ� psMsgHead ����ȡָ�������ı��� */
    iReturn = utMsgGetSomeNVar(psMsgHead, 2,
                               "timevalue", UT_TYPE_STRING, sizeof(caTimeFlag) - 1, caTimeFlag,
                               "servicename", UT_TYPE_STRING, sizeof(caServicename) - 1, caServicename);

    printf("\n");
    printf("timevalue = %s\n", caTimeFlag);
    printf("servicename = %s\n", caServicename);

    //1.���ݵ�ǰ�������ɱ���
    char table_name[1024] = "";
    char  year[10];
    char  mon[10];
    memset(year, 0, sizeof(year));
    memset(mon, 0 , sizeof(mon));
    time_t now;
    time(&now);
    timeToStringPlace(now, year, mon);
    int syear = atoi(year);
    int smonth = atoi(mon);
    snprintf(table_name + strlen(table_name), 1024 - strlen(table_name), "ncmactermatt_if_%4u%02u", syear, smonth);

    //2.���ݲ�ѯʱ������ѡ����Ӧʱ������
    char caStartDate[32] = "";
    char caEndDate[32] = "";

    char sql[4096] = "";
    char sqlTmp[4096] = "";
    snprintf(sql, sizeof(sql), "select servicename, count(*) as '���ִ���', HOUR(FROM_UNIXTIME(d.stime)) as hourtime from %s d where d.stime >= ", table_name);

    if(strcmp(caTimeFlag, "null") == 0)     //��ѯ���죺Ĭ��
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 1 DAY)) ");
    }
    else if(strcmp(caTimeFlag, "1") == 0)   //��ѯ���죺�û�ѡ��
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 1 DAY)) ");
    }
    else if(strcmp(caTimeFlag, "2") == 0)   //�������
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 3 DAY)) ");
    }
    else if(strcmp(caTimeFlag, "3") == 0)   //���һ��
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 7 DAY)) ");
    }
    else if(strcmp(caTimeFlag, "4") == 0)   //���һ��
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 1 MONTH)) ");
    }
    else if(strcmp(caTimeFlag, "5") == 0)   //�������
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 3 MONTH)) ");
    }
    else if(strcmp(caTimeFlag, "6") == 0)   //�������
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 6 MONTH)) ");
    }
    else    //�������
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 6 MONTH)) ");
    }

    //printf(sqlTmp);
    printf("\n");

    /* ��ԭ����sql�����Ч�ַ���β����׷���� sqlTmp */
    snprintf(sql + strlen(sql), sizeof(sql) - strlen(sql), "%s", sqlTmp);
    snprintf(sql + strlen(sql), sizeof(sql) - strlen(sql), " and d.stime <= (UNIX_TIMESTAMP(NOW())) and d.servicename like '%c%s%c' GROUP BY hourtime ORDER BY d.stime asc ", '%', caServicename, '%');


    printf("\n");
    printf("\n");
    printf("%s", sql);
    printf("\n");

    int iNum = 0, iRet = 0;
    unsigned long dwCountMax = 0;
    pasDbCursor *psCur = NULL;
    psCur = pasDbOpenSql(sql, 0);
    if(psCur != NULL)
    {
        printf("\n psCur is not null\n\n");
        char caServicename[36] = "";
        unsigned long dwCount = 0;
        char caHour[36] = "";

        int nRet = 0;
        while(0 == (nRet = pasDbFetchInto(psCur, UT_TYPE_STRING, 32, &caServicename,
                                          UT_TYPE_LONG,  20, &dwCount,
                                          UT_TYPE_STRING, 32, &caHour)) || 1405 == nRet)
        {
            iNum++;
            if(iNum > 1)
            {
                utPltPutLoopVar(psDbHead, "dh", iNum, ",");
            }

            utPltPutLoopVarF(psDbHead, "servicename", iNum, "%lu", caServicename);
            utPltPutLoopVarF(psDbHead, "count", iNum, "%lu", dwCount);
            utPltPutLoopVarF(psDbHead, "hour", iNum, "%s", caHour);

            if(dwCount >= dwCountMax)
            {
                dwCountMax = dwCount;
            }

            //�������
            memset(caServicename, 0, sizeof(caServicename));
            memset(caHour, 0, sizeof(caHour));
            dwCount = 0;
        }
    }

    pasDbCloseCursor(psCur);
    utPltPutVarF(psDbHead, "result", "%d\n", iNum);
    utPltPutVarF(psDbHead, "max", "%lu\n", dwCountMax);
    printf("final iNum = %d\n", iNum);
    utPltOutToHtml(iFd, psMsgHead, psDbHead, "mac/infoquery/place/ChosenPlacePeopleCrowedTime.htm");
    return 0;
}



/* �ƶ��ɼ��豸����ʾ�ն�������Ϣ��־ */
int ncsMobileap_mactermlist_v4(utShmHead *psShmHead, int iFd, utMsgHead *psMsgHead)
{
    char instr_t[8192] = "";
    int iTime_flag = 0;
    int days = 0;
    int iret = 0;
    int _break = 0;
    int i = 0;
    int lCount = 0;
    int num = 0;
    int iNum = 0;

    unsigned long did = 0;
    unsigned long iStart = 0;
    unsigned long iLimit = 0;
    unsigned long lCount1 = 0;
    unsigned long lStartTime = 0;
    unsigned long lTime = time(0);
    unsigned long lTotRec = 0;

    char sdate[11] = "";
    char edate[11] = "";
    char time_flag[2] = "";
    char start[17] = "";
    char limit[17] = "";
    char sort[17] = "";
    char dir[9] = "";
    long lCurPg, lRowNum, lStartRec, lSstarttime;
    char sql[40960] = "";
    char caTotPg[16], caCurPg[16];
    char caPage[12], caLimit[16], caSort[16], caDir[16];
    char caKeyword[64], caTime_flag[32];
    char sql2[256] = "";
    char frmfile[256] = "";
    char *tmpgbk = NULL;
    char **ptmp = NULL;

    struct sttable
    {
        char tname[32];
        unsigned long lCount;
    };
    struct sttable tableinfo[120];//10�ꣿ
    pasDbCursor *psCur = NULL;
    char caGroups[1024];
    char caFacs[1024];
    char caArea[256], caName2[256];
    char caTemp[1024];
    long iReturn;
    unsigned long lIp;
    char caStime[16];
    char caEtime[16];
    char caTemp_d[64];
    char caGroupid[36], caDid[36];
    char caSdate[24], caEdate[24];
    char caApmac[36], caMac[36], caApname[64], caPosition[64];
    char caCorpname[128];
    char caCont[2048];
    char caSsid[36] = "";
    char caServicecode[16], caSearchtype[32];
    strcpy(caFacs, (const char*)getDsFacDid());
    strcpy(caGroups, (const char*)getDsGroupid());

    /* ѡ�񵼳��Ļ� */
    char caExport[10] = "";

    /* �߼���ѯ�����ֶ� */
    char caModel[32] = "";
    char caDevid[32] = "";
    char caPlate[32] = "";
    char caLine[32] = "";
    char caAptype[32] = "";

    utPltDbHead *psDbHead = utPltInitDb();
    utMsgPrintMsg(psMsgHead);
    iReturn = utMsgGetSomeNVar(psMsgHead, 27,
                               "TotPg",      UT_TYPE_STRING, 12, caTotPg,
                               "CurPg",      UT_TYPE_STRING, 12, caCurPg,
                               "keyword", UT_TYPE_STRING, 60, caKeyword,
                               "page",            UT_TYPE_STRING, 10, caPage,
                               "limit",           UT_TYPE_STRING, 10, caLimit,
                               "sort",            UT_TYPE_STRING, 15, caSort,
                               "dir",          UT_TYPE_STRING, 8,  caDir,
                               "time_flag",    UT_TYPE_STRING, 8, caTime_flag,
                               "did",          UT_TYPE_STRING, 10, caDid,
                               "groupid",      UT_TYPE_STRING, 10, caGroupid,
                               "sdate",        UT_TYPE_STRING, 12, sdate,
                               "stime",        UT_TYPE_STRING, 10, caStime,
                               "edate",        UT_TYPE_STRING, 12, edate,
                               "etime",        UT_TYPE_STRING, 10, caEtime,
                               "apmac",        UT_TYPE_STRING, 20, caApmac,
                               "mac",          UT_TYPE_STRING, 20, caMac,
                               "apname",       UT_TYPE_STRING, 31, caApname,
                               "servicecode",     UT_TYPE_STRING, 15, caServicecode,
                               "servicename",     UT_TYPE_STRING, 60, caCorpname,
                               "ssid",            UT_TYPE_STRING, 30, caSsid,
                               "searchtype",      UT_TYPE_STRING, 10, caSearchtype,
                               "model",       UT_TYPE_STRING, 31, caModel,
                               "devid",      UT_TYPE_STRING, 31, caDevid,
                               "plate",      UT_TYPE_STRING, 31, caPlate,
                               "line",       UT_TYPE_STRING, 31, caLine,
                               "aptype",      UT_TYPE_STRING, 31, caAptype,
                               "mobileexport",      UT_TYPE_STRING, 9, caExport);

    if(strlen(caSearchtype) > 0)
    {
        strcpy(caKeyword, "");
    }
    else
    {
        strcpy(sdate, "");
        strcpy(edate, "");
    }
    memset(caCont, 0, sizeof(caCont));

    if(strlen(caKeyword) > 0)
    {
        strcpy(caTemp_d, pasCvtGBK(2, caKeyword, caTemp, 60));
        strcpy(caKeyword, caTemp_d);
    }
    if(strlen(caCorpname) > 0)
    {
        strcpy(caTemp_d, pasCvtGBK(2, caCorpname, caTemp, 60));
        strcpy(caCorpname, caTemp_d);
    }

    if(strlen(caApname) > 0)
    {
        strcpy(caTemp_d, pasCvtGBK(2, caApname, caTemp, 60));
        strcpy(caApname, caTemp_d);
    }
    if(strlen(caSsid) > 0)
    {
        strcpy(caTemp_d, pasCvtGBK(2, caSsid, caTemp, 60));
        strcpy(caSsid, caTemp_d);
    }

    lCurPg = atol(caPage);
    if(lCurPg <= 0) lCurPg = 1;


    if(strlen(caLimit) > 0)
    {
        lRowNum = atol(caLimit);
    }
    else
    {
        lRowNum = 40; //ÿһҳ������
    }
    lStartRec = (lCurPg - 1) * lRowNum;

    iTime_flag = atoi(caTime_flag);
    switch(iTime_flag)
    {
        case 1://����
            days = 1;
            break;
        case 2://�������
            days = 3;
            break;
        case 3://���һ��
            days = 7;
            break;
        case 4://���һ��
            days = 30;
            break;
        case 5://�������
            days = 90;
            break;
        case 6://�������
            days = 180;
            break;
        default:
            days = 1;
            break;
    }

    if(strlen(sdate) > 0 && strlen(edate) > 0)
    {
        ptmp = ncsUtlGetTable3(sdate, edate, caStime, caEtime, "ncmactermatt_if_", &lStartTime, &lTime, &lCount);
        printf("lStartTime=%d,sdate=%s\n", lStartTime, sdate);
    }
    else
    {
        ptmp = ncsUtlGetTable(lTime, days, "ncmactermatt_if_",  &lStartTime, &lCount);
        lTime = lTime + 2 * 3600;
    }

    memset(caCont, 0, sizeof(caCont));
    if(strlen(caSearchtype) > 0)
    {
        if(strlen(caMac) > 0)
        {
            sprintf(caCont + strlen(caCont), " and a.mac like '%c%s%c' ", '%', caMac, '%');
        }
        if(strlen(caApmac) > 0)
        {
            sprintf(caCont + strlen(caCont), " and a.apmac like '%c%s%c' ", '%', caApmac, '%');
        }
        if(strlen(caApname) > 0)
        {
            sprintf(caCont + strlen(caCont), " and a.apname like '%c%s%c' ", '%', caApname, '%');
        }
        if(strlen(caServicecode) > 0)
        {
            sprintf(caCont + strlen(caCont), " and a.servicecode like '%c%s%c' ", '%', caServicecode, '%');
        }
        if(strlen(caCorpname) > 0)
        {
            sprintf(caCont + strlen(caCont), " and a.servicename like '%c%s%c' ", '%', caCorpname, '%');
        }

        /* �߼���ѯ�����ֶ� */
        if(strlen(caModel) > 0) //������
        {
            printf(" ������ %s \n\n", caModel);
        }
        if(strlen(caDevid) > 0) //���ƺ���
        {
            printf(" ���ƺ��� %s \n\n", caDevid);
        }
        if(strlen(caPlate) > 0) //վ������
        {
            printf(" վ������ %s \n\n", caPlate);
        }
        if(strlen(caLine) > 0)  //��·����
        {
            printf(" ��·���� %s \n\n", caLine);
        }
        if(strlen(caAptype) > 0) //�豸����
        {
            printf(" �豸���� %s \n\n", caAptype);
        }

    }
    else
    {
        if(strlen(caKeyword) > 0)
        {
            sprintf(caCont, " and (a.apname like '%c%s%c' or a.apmac like '%c%s%c') ", '%', caKeyword, '%', '%', caKeyword, '%');
        }
    }

    /*  ��ǰ�û�Ȩ�������ܲ�ѯ����*/
    if(strlen(caGroups) > 0)
    {
        sprintf(caCont + strlen(caCont), " and %s", getDsGroupcodeSql("servicecode"));
    }


    char sql3[4096] = "";
    unsigned long lCount2 = 0;
    unsigned long lTotRec2 = 0;
    int num2 = 0;
    /* ȥ�غ��ѯ��� */
    for(i = 0; i < lCount; i++)
    {
        lCount2 = 0;
        memset(sql3, 0, sizeof(sql3));
        snprintf(sql3, sizeof(sql3), "select count(distinct a.mac) from %s a where a.stime >= %lu and a.stime <= %lu  ",  ptmp[i], lStartTime, lTime);
        strcat(sql3, caCont);
        printf("sql3 = %s\n", sql3);
        pasDbOneRecord(sql3, 0, UT_TYPE_ULONG, 4, &lCount2);
        if(lCount2 > 0)
        {
            strcpy(tableinfo[num2].tname, ptmp[i]);
            tableinfo[num2].lCount = lCount2;
            num2++;
        }
        //free(ptmp[i]);
    }
    //free(ptmp);

    for(i = 0; i < num2; i++)
    {
        lTotRec2 += tableinfo[i].lCount;
    }
    printf(" lCount2 = %lu  num2 = %d  lTotRec2 = %lu\n\n", lCount2, num2, lTotRec2);
    utPltPutVarF(psDbHead, "distinctCount", "%lu", lTotRec2);


    for(i = 0; i < lCount; i++)
    {

        lCount1 = 0;
        memset(sql, 0, sizeof(sql));
        snprintf(sql, sizeof(sql), "select count(*) from %s a where a.stime >= %lu and a.stime <= %lu  ",  ptmp[i], lStartTime, lTime);
        strcat(sql, caCont);

        printf("sql = %s\n", sql);
        pasDbOneRecord(sql, 0, UT_TYPE_ULONG, 4, &lCount1);
        if(lCount1 > 0)
        {
            strcpy(tableinfo[num].tname, ptmp[i]);
            tableinfo[num].lCount = lCount1;
            num++;
        }
        //  }
        free(ptmp[i]);
    }
    free(ptmp);
    for(i = 0; i < num; i++)
    {
        lTotRec += tableinfo[i].lCount;
    }
    utPltPutVarF(psDbHead, "TotRec", "%lu", lTotRec);

    for(i = num - 1; i >= 0; i--)
    {
        printf("table[%d] = %s, _lCount1[%d] = %lu\n", i, tableinfo[i].tname, i, tableinfo[i].lCount);
    }

    /* �������� */
    FILE *fp;
    char caFilename[32];
    char caFile[128];
    char caPath[128];

    //ѡ�񵼳��Ļ�
    if(strlen(caExport) > 0)
    {
        printf(" fp caExport  = %s\n\n", caExport);
        sprintf(caFilename, "mobileLog.csv");
        sprintf(caPath, "%s", "/home/ncmysql/ncs");
        sprintf(caFile, "%s/%s", caPath, caFilename);
        fp = fopen(caFile, "w");
        if(fp == NULL)
        {
            printf("���ݵ�������\n\n");
            return 0;
        }
        fprintf(fp, "�ƶ���Ϣ��ѯ\n");  //����
        printf(" д���ƶ���Ϣ��ѯ\n\n");

        ncUtlPrintCsv(fp, 15,
                      UT_TYPE_STRING, "�ɼ��豸����",
                      UT_TYPE_STRING, "�ɼ��豸���",
                      UT_TYPE_STRING, "��ȫ��������",
                      UT_TYPE_STRING, "�ɼ��豸����",
                      UT_TYPE_STRING, "�ɼ��豸γ��",
                      UT_TYPE_STRING, "�ɼ�ʱ��",
                      UT_TYPE_STRING, "�ն�MAC",
                      UT_TYPE_STRING, "���ɼ��ն˳�ǿ",
                      UT_TYPE_STRING, "�������",
                      UT_TYPE_STRING, "�������",
                      UT_TYPE_STRING, "�����ȵ�SSID",
                      UT_TYPE_STRING, "�����ȵ�MAC",
                      UT_TYPE_STRING, "�����ȵ�Ƶ��",
                      UT_TYPE_STRING, "�����ȵ��������",
                      UT_TYPE_STRING, "��ȫ������֯��������");
    }

    iNum = 0;
    iStart = lStartRec;
    iLimit = lRowNum;

    for(i = num - 1; i >= 0; i--)
    {
        memset(sql, 0, sizeof(sql));
        if(tableinfo[i].lCount <= iStart)
        {
            iStart -= tableinfo[i].lCount;
            continue;
        }
        snprintf(sql, sizeof(sql), "select a.servicecode,a.servicename,a.address,a.mac,a.apname,a.apmac,a.ssid,a.stime,a.channel,a.rssi,a.security,a.longitude,a.latitude,a.termtype,a.vtype,a.vname from %s a where a.stime >= %lu and a.stime <= %lu ", tableinfo[i].tname, lStartTime, lTime);
        strcat(sql, caCont);

        snprintf(sql + strlen(sql), sizeof(sql) - strlen(sql), " order by a.stime desc limit %lu, %lu", iStart, iLimit < tableinfo[i].lCount ? iLimit : tableinfo[i].lCount);


        if(tableinfo[i].lCount > iStart && tableinfo[i].lCount < iStart + iLimit)
        {
            iLimit = iLimit - (tableinfo[i].lCount - iStart);
            iStart = 0;
        }
        else
        {
            _break = 1;
        }

        printf("__line = %d, sql = %s\n", __LINE__, sql);
        psCur = pasDbOpenSql(sql, 0);
        if(psCur != NULL)
        {
            char caServicecode[16], caServicename[64], caAddress[64], caMac[20], caApname[32], caApmac[20], caSsid[64];
            long lStarttime, lEndtime, lFlags;
            char caChannel[32], caRssi[16], caSecurity[16], caLongitude[16], caLatitude[16];
            char caTermtype[128], caVname[64];
            long lVtype;

            /* �ɼ��豸���ơ���ȫ�������ơ�������֯�������� */
            char caDispname[32] = "";
            char caFactoryname[32] = "";
            char caFactorycode[32] = "";

            memset(caServicecode, 0, sizeof(caServicecode));
            memset(caServicename, 0, sizeof(caServicename));
            memset(caAddress, 0, sizeof(caAddress));
            memset(caMac, 0, sizeof(caMac));
            memset(caApname, 0, sizeof(caApname));
            memset(caApmac, 0, sizeof(caApmac));
            memset(caSsid, 0, sizeof(caSsid));
            lStarttime = 0;
            memset(caChannel, 0, sizeof(caChannel));
            memset(caRssi, 0, sizeof(caRssi));
            memset(caSecurity, 0, sizeof(caSecurity));
            memset(caLongitude, 0, sizeof(caLongitude));
            memset(caLatitude, 0, sizeof(caLatitude));
            memset(caTermtype, 0, sizeof(caTermtype));
            memset(caVname, 0, sizeof(caVname));
            lVtype = 0;
            iret = pasDbFetchInto(psCur,
                                  UT_TYPE_STRING, 14, caServicecode,
                                  UT_TYPE_STRING, 63, caServicename,
                                  UT_TYPE_STRING, 63, caAddress,
                                  UT_TYPE_STRING, 18, caMac,
                                  UT_TYPE_STRING, 31, caApname,
                                  UT_TYPE_STRING, 18, caApmac,
                                  UT_TYPE_STRING, 63, caSsid,
                                  UT_TYPE_LONG, 4, &lStarttime,
                                  UT_TYPE_STRING, 2, caChannel,
                                  UT_TYPE_STRING, 8, caRssi,
                                  UT_TYPE_STRING, 2, caSecurity,
                                  UT_TYPE_STRING, 11, caLongitude,
                                  UT_TYPE_STRING, 11, caLatitude,
                                  UT_TYPE_STRING, 100, caTermtype,
                                  UT_TYPE_LONG, 4, &lVtype,
                                  UT_TYPE_STRING, 63, caVname,
                                  UT_TYPE_STRING, 31, caDispname,
                                  UT_TYPE_STRING, 31, caFactoryname,
                                  UT_TYPE_STRING, 31, caFactorycode);


            while((iret == 0) || (iret == 1405))
            {
                /* ѡ�񵼳��Ļ� */
                if(strlen(caExport) > 0)
                {
                    ncUtlPrintCsv(fp, 15,
                                  UT_TYPE_STRING, caDispname,
                                  UT_TYPE_STRING, caApname,
                                  UT_TYPE_STRING, caFactoryname,
                                  UT_TYPE_STRING, caLongitude,
                                  UT_TYPE_STRING, caLatitude,
                                  UT_TYPE_LONG, lStarttime,
                                  UT_TYPE_STRING, caMac,
                                  UT_TYPE_STRING, caRssi,
                                  UT_TYPE_LONG, lVtype,
                                  UT_TYPE_STRING, caVname,
                                  UT_TYPE_STRING, caSsid,
                                  UT_TYPE_STRING, caApmac,
                                  UT_TYPE_STRING, caChannel,
                                  UT_TYPE_STRING, caSecurity,
                                  UT_TYPE_STRING, caFactorycode);
                }
                else
                {
                    iNum++;
                    if(iNum > 1)
                    {
                        utPltPutLoopVar(psDbHead, "dh", iNum, ",");
                    }

                    utPltPutLoopVar(psDbHead, "stime", iNum, utTimFormat("%Y-%m-%d %H:%M:%S", lStarttime));

                    utPltPutLoopVar(psDbHead, "address", iNum, caAddress);
                    utPltPutLoopVar(psDbHead, "apname", iNum, caApname);
                    utPltPutLoopVar(psDbHead, "mac", iNum, caMac);
                    utPltPutLoopVar(psDbHead, "apmac", iNum, caApmac);
                    utPltPutLoopVar(psDbHead, "servicename", iNum, caServicename);
                    utPltPutLoopVar(psDbHead, "channel", iNum, caChannel);
                    utPltPutLoopVar(psDbHead, "rssi", iNum, caRssi);
                    //printf("caSecurity=%s\n",caSecurity);
                    utPltPutLoopVar(psDbHead, "security", iNum, caSecurity);
                    utPltPutLoopVar(psDbHead, "longitude", iNum, caLongitude);
                    utPltPutLoopVar(psDbHead, "latitude", iNum, caLatitude);
                    utPltPutLoopVar(psDbHead, "ssid", iNum, caSsid);
                    utPltPutLoopVar(psDbHead, "servicecode", iNum, caServicecode);
                    utPltPutLoopVar(psDbHead, "termtype", iNum, caTermtype);
                    utPltPutLoopVar(psDbHead, "vname", iNum, caVname);
                    utPltPutLoopVarF(psDbHead, "vtype", iNum, "%d", lVtype);

                    utPltPutLoopVarF(psDbHead, "dispname", iNum, "%s", caDispname);
                    utPltPutLoopVarF(psDbHead, "factoryname", iNum, "%s", caFactoryname);
                    utPltPutLoopVarF(psDbHead, "factorycode", iNum, "%s", caFactorycode);
                }

                memset(caServicecode, 0, sizeof(caServicecode));
                memset(caServicename, 0, sizeof(caServicename));
                memset(caAddress, 0, sizeof(caAddress));
                memset(caMac, 0, sizeof(caMac));
                memset(caApname, 0, sizeof(caApname));
                memset(caApmac, 0, sizeof(caApmac));
                memset(caSsid, 0, sizeof(caSsid));
                lStarttime = 0;
                memset(caChannel, 0, sizeof(caChannel));
                memset(caRssi, 0, sizeof(caRssi));
                memset(caSecurity, 0, sizeof(caSecurity));
                memset(caLongitude, 0, sizeof(caLongitude));
                memset(caLatitude, 0, sizeof(caLatitude));
                memset(caTermtype, 0, sizeof(caTermtype));
                memset(caVname, 0, sizeof(caVname));

                memset(caDispname, 0, sizeof(caDispname));
                memset(caFactoryname, 0, sizeof(caFactoryname));
                memset(caFactorycode, 0, sizeof(caFactorycode));

                lVtype = 0;
                iret = pasDbFetchInto(psCur,
                                      UT_TYPE_STRING, 14, caServicecode,
                                      UT_TYPE_STRING, 63, caServicename,
                                      UT_TYPE_STRING, 63, caAddress,
                                      UT_TYPE_STRING, 18, caMac,
                                      UT_TYPE_STRING, 31, caApname,
                                      UT_TYPE_STRING, 18, caApmac,
                                      UT_TYPE_STRING, 63, caSsid,
                                      UT_TYPE_LONG, 4, &lStarttime,
                                      UT_TYPE_STRING, 2, caChannel,
                                      UT_TYPE_STRING, 8, caRssi,
                                      UT_TYPE_STRING, 2, caSecurity,
                                      UT_TYPE_STRING, 11, caLongitude,
                                      UT_TYPE_STRING, 11, caLatitude,
                                      UT_TYPE_STRING, 100, caTermtype,
                                      UT_TYPE_LONG, 4, &lVtype,
                                      UT_TYPE_STRING, 63, caVname,
                                      UT_TYPE_STRING, 31, caDispname,
                                      UT_TYPE_STRING, 31, caFactoryname,
                                      UT_TYPE_STRING, 31, caFactorycode);
            }
            pasDbCloseCursor(psCur);
        }

        if(_break == 1)
            break;
    }
    /* ѡ�񵼳��Ļ� */
    if(strlen(caExport) > 0)
    {
        fclose(fp);
        utPltFileDownload(iFd, "application/text", caPath, caFilename, caFilename);
        remove(caFile);
        return 0;
    }

    utPltOutToHtml(iFd, psMsgHead, psDbHead, "rzcx/proauth_hotinfo_list.htm");
    return 0;
}

/* �ƶ��ɼ��豸�²鿴ͼ��1��ָ��AP Ƶ�����ֵ��ն˴���(�����û�ѡ���ʱ��㡢�ɼ��豸���ƻ���) */
int ncsMobileap_Chosenplace_TerminalmacTop(utShmHead *psShmHead, int iFd, utMsgHead *psMsgHead)
{
    /* ��ʼ��ģ�����ݻ����� */
    utPltDbHead *psDbHead = utPltInitDb();

    /* �����ݰ���ʾ����,��������Ҫ���ڵ��ԡ�
    ��ʾʱ����ʾ���ݰ���ͷ����Ȼ����ʾ���ݰ������ݡ�*/
    utMsgPrintMsg(psMsgHead);

    /* ������š���ѯʱ������(�졢�ܡ��¡����¡����ȡ���) */
    char caTimeFlag[10] = "";
    char caApname[32] = "";
    int iReturn = 0;
    /* ����Ϣ���ݰ� psMsgHead ����ȡָ�������ı��� */
    iReturn = utMsgGetSomeNVar(psMsgHead, 2,
                               "timevalue", UT_TYPE_STRING, sizeof(caTimeFlag) - 1, caTimeFlag,
                               "apname", UT_TYPE_STRING, sizeof(caApname) - 1, caApname);

    printf("timevalue = %s\n", caTimeFlag);
    printf("apname = %s\n", caApname);

    //1.���ݵ�ǰ�������ɱ���
    char table_name[1024] = "";
    char  year[10];
    char  mon[10];
    memset(year, 0, sizeof(year));
    memset(mon, 0 , sizeof(mon));
    time_t now;
    time(&now);
    timeToStringPlace(now, year, mon);
    int syear = atoi(year);
    int smonth = atoi(mon);
    snprintf(table_name + strlen(table_name), 1024 - strlen(table_name), "ncmactermatt_if_%4u%02u", syear, smonth);

    //2.���ݲ�ѯʱ������ѡ����Ӧʱ������
    char caStartDate[32] = "";
    char caEndDate[32] = "";

    char sql[4096] = "";
    char sqlTmp[4096] = "";
    snprintf(sql, sizeof(sql), "select mac , count(stime) from %s where stime >= ", table_name);

    if(strcmp(caTimeFlag, "null") == 0)     //��ѯ���죺Ĭ��
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 1 DAY)) ");
    }
    else if(strcmp(caTimeFlag, "1") == 0)   //��ѯ���죺�û�ѡ��
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 1 DAY)) ");
    }
    else if(strcmp(caTimeFlag, "2") == 0)   //�������
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 3 DAY)) ");
    }
    else if(strcmp(caTimeFlag, "3") == 0)   //���һ��
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 7 DAY)) ");
    }
    else if(strcmp(caTimeFlag, "4") == 0)   //���һ��
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 1 MONTH)) ");
    }
    else if(strcmp(caTimeFlag, "5") == 0)   //�������
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 3 MONTH)) ");
    }
    else if(strcmp(caTimeFlag, "6") == 0)   //�������
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 6 MONTH)) ");
    }
    else    //�������
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 6 MONTH)) ");
    }

    //printf(sqlTmp);
    printf("\n");

    /* ��ԭ����sql�����Ч�ַ���β����׷���� sqlTmp */
    snprintf(sql + strlen(sql), sizeof(sql) - strlen(sql), "%s", sqlTmp);
    snprintf(sql + strlen(sql), sizeof(sql) - strlen(sql), " and stime <= (UNIX_TIMESTAMP(NOW())) and apname like '%c%s%c' GROUP BY mac ORDER BY 2 desc limit 10 ", '%', caApname, '%');

    printf("\n");
    printf("\n");
    printf("%s", sql);
    printf("\n");

    int iNum = 0, iRet = 0;
    unsigned long dwCountMax = 0;
    pasDbCursor *psCur = NULL;
    psCur = pasDbOpenSql(sql, 0);
    if(psCur != NULL)
    {
        printf("\n psCur is not null\n\n");
        char caMac[36] = "";
        unsigned long dwCount = 0;
        int nRet = 0;
        while(0 == (nRet = pasDbFetchInto(psCur, UT_TYPE_STRING, 32, &caMac,
                                          UT_TYPE_LONG,  20, &dwCount)) || 1405 == nRet)
        {
            iNum++;
            if(iNum > 1)
            {
                utPltPutLoopVar(psDbHead, "dh", iNum, ",");
            }
            utPltPutLoopVarF(psDbHead, "mac", iNum, "%s", caMac);
            utPltPutLoopVarF(psDbHead, "count", iNum, "%lu", dwCount);

            if(dwCount >= dwCountMax)
            {
                dwCountMax = dwCount;
            }

            //�������
            memset(caMac, 0, sizeof(caMac));
            dwCount = 0;
        }
    }

    pasDbCloseCursor(psCur);
    utPltPutVarF(psDbHead, "result", "%d\n", iNum);
    utPltPutVarF(psDbHead, "max", "%lu\n", dwCountMax);
    printf("final iNum = %d\n", iNum);
    utPltOutToHtml(iFd, psMsgHead, psDbHead, "mac/infoquery/mobileap/ChosenApTerminalmacTop.htm");
    return 0;
}

/* �ƶ��ɼ��豸�²鿴ͼ��2��ָ��AP�������ܼ�ʱ��(�����û�ѡ���ʱ��㡢�������ƻ���) */
int ncsMobileap_Chosenplace_PeopleCrowedTime(utShmHead *psShmHead, int iFd, utMsgHead *psMsgHead)
{
    /* ��ʼ��ģ�����ݻ����� */
    utPltDbHead *psDbHead = utPltInitDb();

    /* �����ݰ���ʾ����,��������Ҫ���ڵ��ԡ�
    ��ʾʱ����ʾ���ݰ���ͷ����Ȼ����ʾ���ݰ������ݡ�*/
    utMsgPrintMsg(psMsgHead);

    /* ������š���ѯʱ������(�졢�ܡ��¡����¡����ȡ���) */
    char caTimeFlag[10] = "";
    char caApname[32] = "";
    int iReturn = 0;
    /* ����Ϣ���ݰ� psMsgHead ����ȡָ�������ı��� */
    iReturn = utMsgGetSomeNVar(psMsgHead, 2,
                               "timevalue", UT_TYPE_STRING, sizeof(caTimeFlag) - 1, caTimeFlag,
                               "apname", UT_TYPE_STRING, sizeof(caApname) - 1, caApname);

    printf("\n");
    printf("timevalue = %s\n", caTimeFlag);
    printf("apname = %s\n", caApname);

    //1.���ݵ�ǰ�������ɱ���
    char table_name[1024] = "";
    char  year[10];
    char  mon[10];
    memset(year, 0, sizeof(year));
    memset(mon, 0 , sizeof(mon));
    time_t now;
    time(&now);
    timeToStringPlace(now, year, mon);
    int syear = atoi(year);
    int smonth = atoi(mon);
    snprintf(table_name + strlen(table_name), 1024 - strlen(table_name), "ncmactermatt_if_%4u%02u", syear, smonth);

    //2.���ݲ�ѯʱ������ѡ����Ӧʱ������
    char caStartDate[32] = "";
    char caEndDate[32] = "";

    char sql[4096] = "";
    char sqlTmp[4096] = "";
    snprintf(sql, sizeof(sql), "select apname, count(*) as '���ִ���', HOUR(FROM_UNIXTIME(d.stime)) as hourtime from %s d where d.stime >= ", table_name);

    if(strcmp(caTimeFlag, "null") == 0)     //��ѯ���죺Ĭ��
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 1 DAY)) ");
    }
    else if(strcmp(caTimeFlag, "1") == 0)   //��ѯ���죺�û�ѡ��
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 1 DAY)) ");
    }
    else if(strcmp(caTimeFlag, "2") == 0)   //�������
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 3 DAY)) ");
    }
    else if(strcmp(caTimeFlag, "3") == 0)   //���һ��
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 7 DAY)) ");
    }
    else if(strcmp(caTimeFlag, "4") == 0)   //���һ��
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 1 MONTH)) ");
    }
    else if(strcmp(caTimeFlag, "5") == 0)   //�������
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 3 MONTH)) ");
    }
    else if(strcmp(caTimeFlag, "6") == 0)   //�������
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 6 MONTH)) ");
    }
    else    //�������
    {
        snprintf(sqlTmp, sizeof(sqlTmp), " UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 6 MONTH)) ");
    }

    //printf(sqlTmp);
    printf("\n");

    /* ��ԭ����sql�����Ч�ַ���β����׷���� sqlTmp */
    snprintf(sql + strlen(sql), sizeof(sql) - strlen(sql), "%s", sqlTmp);
    snprintf(sql + strlen(sql), sizeof(sql) - strlen(sql), " and d.stime <= (UNIX_TIMESTAMP(NOW())) and d.apname like '%c%s%c' GROUP BY hourtime ORDER BY d.stime asc ", '%', caApname, '%');


    printf("\n");
    printf("\n");
    printf("%s", sql);
    printf("\n");

    int iNum = 0, iRet = 0;
    unsigned long dwCountMax = 0;
    pasDbCursor *psCur = NULL;
    psCur = pasDbOpenSql(sql, 0);
    if(psCur != NULL)
    {
        printf("\n psCur is not null\n\n");
        char caApname[36] = "";
        unsigned long dwCount = 0;
        char caHour[36] = "";

        int nRet = 0;
        while(0 == (nRet = pasDbFetchInto(psCur, UT_TYPE_STRING, 32, &caApname,
                                          UT_TYPE_LONG,  20, &dwCount,
                                          UT_TYPE_STRING, 32, &caHour)) || 1405 == nRet)
        {
            iNum++;
            if(iNum > 1)
            {
                utPltPutLoopVar(psDbHead, "dh", iNum, ",");
            }

            utPltPutLoopVarF(psDbHead, "apname", iNum, "%lu", caApname);
            utPltPutLoopVarF(psDbHead, "count", iNum, "%lu", dwCount);
            utPltPutLoopVarF(psDbHead, "hour", iNum, "%s", caHour);

            if(dwCount >= dwCountMax)
            {
                dwCountMax = dwCount;
            }

            //�������
            memset(caApname, 0, sizeof(caApname));
            memset(caHour, 0, sizeof(caHour));
            dwCount = 0;
        }
    }

    pasDbCloseCursor(psCur);
    utPltPutVarF(psDbHead, "result", "%d\n", iNum);
    utPltPutVarF(psDbHead, "max", "%lu\n", dwCountMax);
    printf("final iNum = %d\n", iNum);
    utPltOutToHtml(iFd, psMsgHead, psDbHead, "mac/infoquery/mobileap/ChosenApPeopleCrowedTime.htm");
    return 0;
}



/* ʵʱ��Ϣ��ѯ(�ڴ��ȡ)�����ڴ��ȡҳ������Ϣ */
int ncsCurrent_FromRAM(utShmHead *psShmHead, int iFd, utMsgHead *psMsgHead)
{
    /* ��ʼ��ģ�����ݻ����� */
    utPltDbHead *psDbHead = utPltInitDb();
    utMsgPrintMsg(psMsgHead);

    // ��ೡ��ѡ�� groupid��username   // ���β�ѯ mac ����
    char caGroupId[32] = "";
    char caUsernamesByID[1024] = "";
    char caUsername[32] = "";

    char caMacPage[32] = "", caApmacPage[32] = "";

    /* �ؼ��ֲ�ѯ */
    char caKeyword[64] = "", caTemp_d[64] = "", caTemp[1024] = "";

    /* ѡ�񵼳��Ļ� */
    char caExport[10] = "";
    long lRet = 0;
    lRet = utMsgGetSomeNVar(psMsgHead, 4,
                            "currentexport", UT_TYPE_STRING, 9, caExport,
                            "groupid", UT_TYPE_STRING, 31, caGroupId,
                            "username", UT_TYPE_STRING, 31, caUsername,
                            "keyword", UT_TYPE_STRING, 63, caKeyword);

    //����ת����ת����GBK����̨ͨ���ַ���
    if(strlen(caKeyword) > 0)
    {
        strcpy(caTemp_d, pasCvtGBK(2, caKeyword, caTemp, 60));
        strcpy(caKeyword, caTemp_d);
    }

    printf(" ncsCurrent_FromRAM��groupid = %s, username = %s, keyword = %s\n", caGroupId, caUsername, caKeyword);
    /* ��ȡ���г����µļ�¼�� */
    int iServiceRecord = utShmHashRecord(psShmHead, NC_LNK_MACLOCATION);
    printf("���г�����ʵʱ��Ϣ��Ϊ��iServiceRecord = %d\n\n", iServiceRecord);


    /* �������� */
    FILE *fp;
    char caFilename[32];
    char caFile[128];
    char caPath[128];

    //ѡ�񵼳��Ļ�
    if(strlen(caExport) > 0)
    {
        printf(" fp caExport  = %s\n\n", caExport);
        sprintf(caFilename, "currentInfoLog.csv");
        sprintf(caPath, "%s", "/home/ncmysql/ncs");
        sprintf(caFile, "%s/%s", caPath, caFilename);
        fp = fopen(caFile, "w");
        if(fp == NULL)
        {
            printf("���ݵ�������\n\n");
            return 0;
        }
        fprintf(fp, "ʵʱ��Ϣ\n");  //����
        printf(" д��ʵʱ��Ϣ\n\n");
        ncUtlPrintCsv(fp, 15,
                      UT_TYPE_STRING, "��������",
                      UT_TYPE_STRING, "�ɼ��豸����",
                      UT_TYPE_STRING, "�ɼ�ʱ��",
                      UT_TYPE_STRING, "�����ն˳�ǿ",
                      UT_TYPE_STRING, "����ն˳�ǿ",
                      UT_TYPE_STRING, "�ն�MAC��ַ",
                      UT_TYPE_STRING, "�ɼ��豸����",
                      UT_TYPE_STRING, "�ɼ��豸γ��",
                      UT_TYPE_STRING, "�����ȵ�SSID",
                      UT_TYPE_STRING, "�����ȵ�MAC",
                      UT_TYPE_STRING, "�����ȵ��������",
                      UT_TYPE_STRING, "�������",
                      UT_TYPE_STRING, "�ɼ��豸���",
                      UT_TYPE_STRING, "�������",
                      UT_TYPE_STRING, "�ն�Ʒ��");
    }

    pasHashInfo sHashInfo;
    uchar *pHash;
    ncApSrvOnline *psAp;
    long lBase;
    char caSdate[32] = "", caMark[64] = "";
    char caMacStr[20] = "", caMacStr1[20] = "", caMacStr2[20] = "";

    //�������ơ��ɼ��豸���ơ��ɼ�ʱ�䡢�жϲɼ�ʱ���Ƿ���Ч
    char caServicename[32] = "", caDispname[32] = "", caStime[32] = "", caTempYear[32] = "";

    //����ɼ���ǿ������ɼ���ǿ    //�ն�MAC���ɼ��豸MAC
    long lRssi = 0, lUrssi = 0;
    char caMac[32] = "", caApmac[32] = "";

    //�ɼ��豸���ȡ�γ��    //�ȵ�ssid
    char caLongitude[32] = "", caLatitude[32] = "";
    char caSsid[32] = "";
    long lSecurity = 0;

    //������š��ɼ��豸��� //������ݡ��ն�Ʒ��
    char caServiceCode[32] = "", caApname[32] = "";
    char caVname[32] = "", caTermtype[32] = "";
    char caSplitServiceCode[32] = "";

    //����ǰ��40��ʵʱ��Ϣ����ǰ�����г���ʵʱ��Ϣ��������ǰ�����г�����Чʵʱ��Ϣ����
    int iNum = 0;
    int iNumControl = 0;
    int iMacCount = 0;

    // �û��˵�ѡ��� servicecodes ���û���½Ȩ���¿ɲ鿴������Χ servicecodes
    char caAuthorityGroupcodes[1024] = "";
    char caUserAuthJudge[20] = "";
    long iUserAuth = 0;                     //�û�Ȩ���ж�

    strcpy(caAuthorityGroupcodes, (const char*)getDsGroupcode());
    printf("�û�Ȩ���� caAuthorityGroupcodes = %s\n", caAuthorityGroupcodes);

    char caKeywordJudge[30] = "";           //�ж�������������� '@' �ַ�

    stCurInfoForty pStCurrentForty[40];     //ͳ��40��������ʵʱ��Ϣ����ʱ�����򷵻�ǰ̨
    memset(pStCurrentForty, 0, sizeof(stCurInfoForty) * 40);

    //���ѡ����� groupid ��ȡ��ǰgroupid������username�� caUsernamesByID
    if(strlen(caGroupId) > 0)
    {
        //���Ի�ȡ�༶�˵�������username
        snprintf(caUsernamesByID, sizeof(caUsernamesByID) - 1, "%s", myGetGroupCodeByGroupid(psShmHead, caGroupId));
    }

    ncLbsMacLocation *psMacLoc;
    pHash = (unsigned char *)utShmHashHead(psShmHead, NC_LNK_MACLOCATION);
    if(pHash)
    {
        psMacLoc = (ncLbsMacLocation *)pasHashFirst(pHash, &sHashInfo);
        //printf("pHash = %p\n", pHash);
        //printf("psMacLoc = %p\n", psMacLoc);
        while(psMacLoc)
        {
            psAp = (ncApSrvOnline *)ncMacLogGetOnlineApByMac(psShmHead, psMacLoc->apmac);
            if(psAp)
            {
                strcpy(caServicename, psAp->servicename);   //��������
                strcpy(caDispname, psAp->dispname);         //�ɼ��豸����
                strcpy(caStime, utTimFormat("%Y-%m-%d %H:%M:%S", psMacLoc->starttime)); //�ɼ�ʱ��

                strcpy(caMac, (const char*)pasCvtMacStr(psMacLoc->mac, caMacStr));      //�ն�MAC
                stpcpy(caLongitude, psMacLoc->longitude);
                stpcpy(caLatitude, psMacLoc->latitude);
                stpcpy(caSsid, psMacLoc->ssid);
                strcpy(caApmac, (const char*)pasCvtMacStr(psMacLoc->apmac, caMacStr1)); //�ɼ��豸MAC
                stpcpy(caVname, psMacLoc->name);
                stpcpy(caTermtype, psMacLoc->termtype);
                strcpy(caServiceCode, psAp->servicecode);   //�������
                strcpy(caApname, psAp->apname);             //�ɼ��豸���


                if((strlen(caAuthorityGroupcodes) > 0))     //��admin�û�����ȡ�û�Ȩ���¹�������Ϊ��
                {
                    if(strlen(caServiceCode) > 0)
                    {
                        memset(caUserAuthJudge, 0, sizeof(caUserAuthJudge));
                        strncpy(caUserAuthJudge, caServiceCode, 6);

                        //iUserAuth = isInGroupCode(caUserAuthJudge, caAuthorityGroupcodes);
                        char *p = strstr(caAuthorityGroupcodes, caUserAuthJudge);
                        if(!p)                  //Ȩ�޲���ָ������
                        {
                            psMacLoc = (ncLbsMacLocation *)pasHashNextS(&sHashInfo);
                            continue;
                        }
                    }
                }

                //��ȡת�����ʱ�����ڣ�ǰ��λΪ1970����Ϊ�������ݲ���ȡ
                memset(caTempYear, 0, sizeof(caTempYear));
                strncpy(caTempYear, caStime, 4);

                if((strlen(caServiceCode) > 0) && (strcmp(caTempYear, "1970") != 0))
                {
                    /* ѡ�񵼳��Ļ� */
                    if(strlen(caExport) > 0)
                    {
                        iNum++;
                        if(iNum >= 40)
                        {
                            iNumControl = iNum;
                        }
                        ncUtlPrintCsv(fp, 15,
                                      UT_TYPE_STRING, caServicename,
                                      UT_TYPE_STRING, caDispname,
                                      UT_TYPE_STRING, caStime,
                                      UT_TYPE_LONG, psMacLoc->lrssi,
                                      UT_TYPE_LONG, psMacLoc->urssi,
                                      UT_TYPE_STRING, caMac,
                                      UT_TYPE_STRING, psMacLoc->longitude,
                                      UT_TYPE_STRING, psMacLoc->latitude,
                                      UT_TYPE_STRING, psMacLoc->ssid,
                                      UT_TYPE_STRING, caApmac,
                                      UT_TYPE_LONG,   psMacLoc->encrypt,
                                      UT_TYPE_STRING, caServiceCode,
                                      UT_TYPE_STRING, caApname,
                                      UT_TYPE_STRING, psMacLoc->name,
                                      UT_TYPE_STRING, psMacLoc->termtype);
                    }
                    else
                    {
                        //���������Ϊ��ʱ��ʾ(iNum) 40�������г��� iNumControl �������г�����Ч���� iMacCount ��
                        if(strcmp(caKeyword, "") == 0 || (strcmp(caGroupId, "all") == 0))
                        {
                            iNumControl++;      //������ǰ������ʵʱ��Ϣ����
                            if(strcmp(caMac, "00:00:00:00:00:00") != 0)
                            {
                                iMacCount++;    //������ǰ��������Чʵʱ��Ϣ�������������������
                            }

                            if(iNumControl <= 40)
                            {
                                iNum++;
                                //��������Ҫ��40�����ݲ��뵽�ṹ�� pStCurrentForty
                                InsertItemToStuct(pStCurrentForty, iNum - 1, psAp, psMacLoc);
                            }
                            if(iNumControl <= 5)
                            {
                                //printf("psMacLoc->starttime = %lu, caStime = %s\n\n", psMacLoc->starttime, utTimFormat("%Y-%m-%d %H:%M:%S", psMacLoc->starttime));

                            }

                        }
                        else
                        {
                            /* ���caKeyword��һ���ַ�Ϊ '@' */
                            strncpy(caKeywordJudge, caKeyword, 1);
                            if(strcmp(caKeywordJudge, "@") == 0)
                            {
                                if((strlen(caGroupId) > 0))
                                {
                                    //��ȡ��ǰ�������ǰ6λ(groupcode)��groupid������groupcode�Ƚ�
                                    memset(caSplitServiceCode, 0, sizeof(caSplitServiceCode));
                                    strncpy(caSplitServiceCode, caServiceCode, 6);
                                    char *p = strstr(caUsernamesByID, caSplitServiceCode);
                                    if(p)
                                    {
                                        iNumControl++;      //������ǰ������ʵʱ��Ϣ����
                                        if(strcmp(caMac, "00:00:00:00:00:00") != 0)
                                        {
                                            iMacCount++;    //������ǰ��������Чʵʱ��Ϣ�������������������
                                        }
                                        //��������Ҫ��40�����������������
                                        if(iNumControl <= 40)
                                        {
                                            iNum++;
                                            InsertItemToStuct(pStCurrentForty, iNum - 1, psAp, psMacLoc);
                                        }
                                        if(iNumControl <= 5)
                                        {
                                            //printf("iNumControl <= 5 caUsernamesByID = %s, caServiceCode = %s, caSplitServiceCode = %s\n\n", caUsernamesByID, caServiceCode,caSplitServiceCode);
                                        }
                                    }
                                }
                                else
                                {
                                    //�û���ѡ�����˵����� username��(iNum) 40������ iNumControl ������Ч���� iMacCount ��
                                    if((strcmp(caUsername, caServiceCode) == 0))
                                    {
                                        iNumControl++;      //������ǰ������ʵʱ��Ϣ����
                                        if(strcmp(caMac, "00:00:00:00:00:00") != 0)
                                        {
                                            iMacCount++;    //������ǰ��������Чʵʱ��Ϣ�������������������
                                        }
                                        //��������Ҫ��40�����������������
                                        if(iNumControl <= 40)
                                        {
                                            iNum++;
                                            InsertItemToStuct(pStCurrentForty, iNum - 1, psAp, psMacLoc);
                                        }
                                    }
                                }

                                /* �ж������caKeyword �Ƿ��еڶ���'@'  �ַ�: ����У���ȡ�����ֵ��Ϊ�������� */
                                char *pKeywordServiceName = NULL, *pKeywordMac = NULL;
                                pKeywordServiceName = strtok_r(caKeyword, "@", &pKeywordMac);
                                if(strcmp(pKeywordMac, "") != 0)
                                {
                                    if(strstr(caServicename, caKeyword) || strstr(caMac, pKeywordMac) || strstr(caApmac, pKeywordMac))
                                    {
                                        iNumControl++;      //������ǰ������ʵʱ��Ϣ����
                                        if(strcmp(caMac, "00:00:00:00:00:00") != 0)
                                        {
                                            iMacCount++;    //������ǰ��������Чʵʱ��Ϣ�������������������
                                        }
                                        //��������Ҫ��40�����������������
                                        if(iNumControl <= 40)
                                        {
                                            iNum++;
                                            InsertItemToStuct(pStCurrentForty, iNum - 1, psAp, psMacLoc);
                                        }
                                        if(iNumControl <= 5)
                                        {
                                            printf("��'@'�ַ��û��ؼ�������\n");
                                            printf("pKeywordServiceName = %s\n", pKeywordServiceName);
                                            printf("pKeywordMac = %s, caMac = %s, caApmac = %s\n\n", pKeywordMac, caMac, caApmac);
                                        }
                                    }
                                }
                            }
                            else    //�û�����ؼ�������
                            {
                                /*if(iNumControl <= 5)
                                {
                                    printf("�û�����ؼ�������\n");
                                    printf("caKeyword = %s, caServicename = %s, caMac = %s, caApmac = %s\n\n", caKeyword, caServicename, caMac, caApmac);
                                } */

                                if(strstr(caServicename, caKeyword) || strstr(caMac, caKeyword) || strstr(caApmac, caKeyword) || (strcmp(caKeyword, caServicename) == 0) || (strcmp(caKeyword, caMac) == 0) || (strcmp(caKeyword, caApmac) == 0))
                                {
                                    iNumControl++;      //������ǰ������ʵʱ��Ϣ����
                                    if(strcmp(caMac, "00:00:00:00:00:00") != 0)
                                    {
                                        iMacCount++;    //������ǰ��������Чʵʱ��Ϣ�������������������
                                    }
                                    //��������Ҫ��40�����������������
                                    //if(iNumControl <= 40)
                                    if(iNumControl <= 40)
                                    {
                                        iNum++;
                                        InsertItemToStuct(pStCurrentForty, iNum - 1, psAp, psMacLoc);
                                    }
                                    if(iNumControl <= 5)
                                    {
                                        printf("�û��ؼ�������\n");
                                        printf("caKeyword = %s, caServicename = %s, caMac = %s, caApmac = %s\n\n", caKeyword, caServicename, caMac, caApmac);
                                    }
                                }
                            }
                        }

                    }
                }
            }
            else
            {
                //strcpy(caServiceCode,"is null");
                //printf("psAp = %p, caServiceCode = %s\n\n", psAp, caServiceCode);
            }

            psMacLoc = (ncLbsMacLocation *)pasHashNextS(&sHashInfo);
        }

        int iRet = 0;
        if(strcmp(caKeyword, "") == 0)
        {
            printf("�����Ϊ��ʱ��� JSON");
            //����ʱ�����򲢱���� pStCurrentForty
            choiseSort(pStCurrentForty, iNum);
            int i;
            for(i = 0; i < iNum; i++)
            {
                if(i > 0)
                {
                    utPltPutLoopVar(psDbHead, "dh", i + 1, ",");
                }

                //��������Ҫ��40�����������������
                outPutJson_current(psDbHead, pStCurrentForty, i);
            }
            iRet = 1;
            printf("��ǰ���г���ʵʱ����Ϊ = %d, ��Ч����Ϊ = %d\n\n", iNumControl, iMacCount);
        }
        printf("iRet = %d\n\n", iRet);
        if(!iRet)
        {
            printf("�����ǿ�ʱ��ѯ�������� JSON\n\n");

            /* ���caKeyword��һ���ַ�Ϊ '@' */
            strncpy(caKeywordJudge, caKeyword, 1);
            if(strcmp(caKeywordJudge, "@") == 0)
            {

                if((strlen(caGroupId) > 0))
                {
                    printf("�����ǿ�ʱ caGroupId ����0 ��� JSON\n\n");
                    printf("caUsername = %s, caServiceCode = %s\n", caUsername, caServiceCode);
                    //����ʱ�����򲢱���� pStCurrentForty
                    choiseSort(pStCurrentForty, iNum);
                    int i;
                    for(i = 0; i < iNum; i++)
                    {
                        if(i > 0)
                        {
                            utPltPutLoopVar(psDbHead, "dh", i + 1, ",");
                        }

                        //��������Ҫ��40�����������������
                        outPutJson_current(psDbHead, pStCurrentForty, i);
                    }
                    printf("caGroupId = %s ʵʱ����Ϊ = %d, ��Ч����Ϊ = %d\n\n", caGroupId, iNumControl, iMacCount);
                }
                else
                {
                    if((strlen(caUsername) > 0))
                    {
                        printf("�����ǿ�ʱ caUsername ����0 ��� JSON\n\n");
                        //����ʱ�����򲢱���� pStCurrentForty
                        choiseSort(pStCurrentForty, iNum);
                        int i;
                        for(i = 0; i < iNum; i++)
                        {
                            if(i > 0)
                            {
                                utPltPutLoopVar(psDbHead, "dh", i + 1, ",");
                            }

                            //��������Ҫ��40�����������������
                            outPutJson_current(psDbHead, pStCurrentForty, i);
                        }
                        printf("��ǰָ������ caUsername = %s ʵʱ����Ϊ = %d, ��Ч����Ϊ = %d\n\n", caUsername, iNumControl, iMacCount);
                    }
                }
            }
            else
            {
                printf("�û��ؼ��ֲ�ѯ��\n\n");
                int i;
                for(i = 0; i < iNum; i++)
                {
                    if(strstr(pStCurrentForty[i].caServicename, caKeyword) || strstr(pStCurrentForty[i].caMac, caKeyword) || strstr(pStCurrentForty[i].caApmac, caKeyword) || (strcmp(caKeyword, pStCurrentForty[i].caServicename) == 0) || (strcmp(caKeyword, pStCurrentForty[i].caMac) == 0) || (strcmp(caKeyword, pStCurrentForty[i].caApmac) == 0))
                    {
                        if(i > 0)
                        {
                            utPltPutLoopVar(psDbHead, "dh", i + 1, ",");
                        }

                        //��������Ҫ��40�����������������
                        outPutJson_current(psDbHead, pStCurrentForty, i);

                        if(i <= 5)
                        {
                            printf("�û��ؼ��ֲ�ѯʱ������ iNum = %d, i = %d\n\n", iNum, i);
                        }
                    }
                }
            }
        }
    }
    else
    {
        printf(" pHash is NULL\n\n");
    }

    /* ѡ�񵼳��Ļ� */
    if(strlen(caExport) > 0)
    {
        fclose(fp);
        utPltFileDownload(iFd, "application/text", caPath, caFilename, caFilename);
        remove(caFile);
        return 0;
    }
    else
    {
        utPltPutVarF(psDbHead, "result", "%d", iNumControl);
        utPltPutVarF(psDbHead, "maccount", "%d", iMacCount);
        utPltOutToHtml(iFd, psMsgHead, psDbHead, "mac/infoquery/currentinfo/CurrentInfo.htm");
    }

    return 0;
}


//ע����д������ϵͳ
int procapWeb001Fun_infoquery(utShmHead *psShmHead)
{
    /* MAC��־��ѯ */
    pasSetTcpFunName("ncsMacLog_mactermlist_v4", ncsMacLog_mactermlist_v4, 0);
    /* MAC��־��ѯ����������1��Ƶ�����ֵ�ʱ�� */
    pasSetTcpFunName("ncsMacLog_ChosenMac_TimeOftenCount", ncsMacLog_ChosenMac_TimeOftenCount, 0);
    /* MAC��־��ѯ����������2��Ƶ�����ֵĳ��� */
    pasSetTcpFunName("ncsMacLog_ChosenMac_PlaceOftenCount", ncsMacLog_ChosenMac_PlaceOftenCount, 0);
    /* MAC��־��ѯ����������3��Ƶ�����ֵĳ������� */
    pasSetTcpFunName("ncsMacLog_ChosenMac_PlaceTypeOftenCount", ncsMacLog_ChosenMac_PlaceTypeOftenCount, 0);
    /* MAC��־��ѯ����ݲ鿴 */
    pasSetTcpFunName("ncsMacLog_ChosenMac_IDCheck", ncsMacLog_ChosenMac_IDCheck, 0);
    /* MAC��־��ѯ����ȡ������Ϣ */
    pasSetTcpFunName("ncsMacLog_ChosenMac_GetMacGroupInfo", ncsMacLog_ChosenMac_GetMacGroupInfo, 0);
    /* MAC��־��ѯ��������� */
    pasSetTcpFunName("ncsMacLog_ChosenMac_JoinMacGroup", ncsMacLog_ChosenMac_JoinMacGroup, 0);
    /* MAC��־��ѯ���ն�mac ��ʷssid�б� */
    pasSetTcpFunName("ncsMacLog_ChosenMac_DistinctSsid", ncsMacLog_ChosenMac_DistinctSsid, 0);
    /* MAC��־��ѯ��list ��������֤�˺Ź��ܣ���ѯvname��ص�mac�µ�vname��vdisp */
    pasSetTcpFunName("ncsMacLog_ChosenMac_NetAuthID", ncsMacLog_ChosenMac_NetAuthID, 0);
    /* MAC��־��ѯ����������� "����ѡ��"������ǰ̨��״�˵� */
    pasSetTcpFunName("ncsMacLog_ChosenMac_ChoseQueryPlace", ncsMacLog_ChosenMac_ChoseQueryPlace, 0);


    /* �ȵ��ѯ */
    pasSetTcpFunName("ncsHotSpot_infolist_v4", ncsHotSpot_infolist_v4, 0);
    //��ǺϹ桢�ǺϹ�
    pasSetTcpFunName("ncsHotSpot_MarkRuleorNot", ncsHotSpot_MarkRuleorNot, 0);
    pasUtlMac2VendorInit("ncoui.dat", 30000);




    /* ������Ϣ��ѯ */
    pasSetTcpFunName("ncsPlace_mactermlist_v4", ncsPlace_mactermlist_v4, 0);
    //�鿴ͼ��1������Ƶ�����ֵ��ն�TOP10ͳ��(�����û�ѡ���ʱ��㡢�ɼ��豸���ƻ���)
    pasSetTcpFunName("ncsPlace_Chosenplace_TerminalmacTop", ncsPlace_Chosenplace_TerminalmacTop, 0);
    //�鿴ͼ��2��ָ�������������ܼ�ʱ��(�����û�ѡ���ʱ��㡢�������ƻ���)
    pasSetTcpFunName("ncsPlace_Chosenplace_PeopleCrowedTime", ncsPlace_Chosenplace_PeopleCrowedTime, 0);




    /* �ƶ��ɼ��豸 */
    pasSetTcpFunName("ncsMobileap_mactermlist_v4", ncsMobileap_mactermlist_v4, 0);
    //�鿴ͼ��1������Ƶ�����ֵ��ն�TOP10ͳ��(�����û�ѡ���ʱ��㡢�ɼ��豸���ƻ���)
    pasSetTcpFunName("ncsMobileap_Chosenplace_TerminalmacTop", ncsMobileap_Chosenplace_TerminalmacTop, 0);
    //�鿴ͼ��2��ָ�������������ܼ�ʱ��(�����û�ѡ���ʱ��㡢�������ƻ���)
    pasSetTcpFunName("ncsMobileap_Chosenplace_PeopleCrowedTime", ncsMobileap_Chosenplace_PeopleCrowedTime, 0);




    /* ʵʱ��Ϣ */
    pasSetTcpFunName("ncsCurrent_FromRAM", ncsCurrent_FromRAM, 0);

    return 0;
}







