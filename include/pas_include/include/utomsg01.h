/* utomsg01.h
     Head File of Message Routine 
     Modified Date:2001/11/20  By Li Yunming In Redhat Linux 7.0
     Modified Date:1999/3/17   By Li Yunming In Solaris 2.51
     Modified Date:1999/3/8    By Charles Cha In Windows 98
     Create Date:  1998/12/1   By Li Yunming In Solaris 2.51  
 */
#ifndef  __UTOMSGDEF__
#define  __UTOMSGDEF__
/* #ifdef _WIN32  */
#include "utotype.h"
/*endif   _WIN32 */
#define UT_MSG_ALLOCSTEP    256
#define UT_MSG_VARLEN       16
/* In 2001/11/20  Upgrad the version from 100 to 200 */
#define UT_MSG_VERSION_v100    100
#define UT_MSG_VERSION_v200    200
#define UT_MSG_VERSION         200
#define UT_MSG_NOCRYPT      0
#define UT_MSG_CRYPT        1
#define UT_MSG_TEACRYPT     3
#define UT_MSG_NOCONFIRM    0
#define UT_MSG_CONFIRM      1
#define UT_MSG_RESEND       2

#define UT_MSG_CONFIRMMSG   3

#define UT_MSG_HOSTORDER       0
#define UT_MSG_HEADNORDER      1
#define UT_MSG_CONTENTNORDER   2
#define UT_MSG_NETWORKORDER    3

/* utMsgHead: cFlags  */
#define UT_MSG_NORMALMSG       0
#define UT_MSG_ONLYHEADMSG     1
#define UT_MSG_NOTALLMSG       2

#define UT_CODE_WEBREQUEST       201     /* Web请求      */
#define UT_CODE_REQUESTMSG       101
#define UT_CODE_RESPONSEMSG      102
#define UT_CODE_STATUSMSG        103
#define UT_CODE_CONFIRMMSG       104
#define UT_CODE_BIGPKGCONFIRM    106     /* 大数据包确认  */
#define UT_CODE_BIGPKGCONTINUE   107     /* 大数据包继续  */
#define UT_CODE_BIGPKGSTOP       108     /* 大数据包结束  */
#define UT_CODE_MULTPKGSTOP      110     /* 多数据包结束  */
#define UT_CODE_MULTPKGCONFIRM   111     /* 多数据包确认  */
#define UT_CODE_MULTPKGCONTINUE  112     /* 多数据包继续  */
#define UT_CODE_NOLIMITPKG       198
#define UT_CODE_ERRPKG           199     /* 错误的数据包  */

#define UT_FUN_STOPMSG           111
#define UT_CRYPT_DES             1
#define UT_CRYPT_TEA             2
#define UT_MSG_MAXVARLEN         128
/* Message Head */
typedef struct {
    uint4   lCode;       /*  Message Code                        */
    uint4   lBytes;      /*  Message Bytes include the head      */
    uint4   lMsgId;      /*  lMsgId                              */
    uint4   lCheckSum;   /*  Check Sum                           */
    uint4   lSendTime;   /*  Send Time                           */
    uint2   nVersion;    /*  Message Version                     */
    uchar   cCrypt;      /*  0-- No Crypt 1--DES  2--Tea         */
    uchar   cOrder;      /*  0-- Host Order  1-- Head Network Order  2---All NetWork Order */
    uint2   nReplyPort;  /*  0 -- Default   >0 Port Number                           */
    uint2   nFunCode;    /*  Function Code                       */
    uchar   cFlags;      /*  0--Complete 1--Only Head            */
    uchar   cConfirm;    /*  0 not confirm, 1 confirm  2 Resend ,r */
    uint2   nReserve;    /*  在UDP消息中作为重发的次数            */
    uint4   lReserve[2]; /* reverse                               */
    uint4   lFunCode;    /* 功能代码，在旧版本中为nFunCode ,  Modify 2001/8/21       */
    uint4   lMaxBytes;
} utMsgHead;


typedef struct {
    char    caVar[10];
    uint2   nType;
    uint4   lBytes;
} utMsgVar1;

typedef struct {
    uint2   nVarLen;
    uint2   nType;
    uint4   lBytes;
    char    caVar[UT_MSG_MAXVARLEN];
} utMsgVar2;

typedef utMsgVar2 utMsgVar;


typedef struct {
    uint4   lCode;      /* 消息代码 ######104                   */
    uint4   lMsgId;     /* 要确认的消息的标志                   */
}  utMsgConfirm;        /* 确认消息                             */

typedef struct {
    uint4   lCode;      /*  Message Code                        */
    uint4   lBytes;     /*  Message Bytes include the head      */
    uint4   lMsgId;     /*  lMsgId                              */
    uint4   lSendTime;  /*  Send Time                           */
    uint4   lCheckSum;  /*  Check Sum                           */
    uint2   nVersion;   /*  Message Version                     */
    uchar   cCrypt;     /*  0-- No Crypt                        */
    uchar   cOrder;     /*  0-- Host Order  1-- Head Network Order  2---All NetWork Order */
}  utMsgStatus;
 

typedef struct utComUdpMsgBuf{
    utMsgHead sMsgHead;
    char    caBuffer[4096 - sizeof(utMsgHead)];
} utMsgBuffer;

#ifdef	__cplusplus /* added by client */
extern "C" {
#endif	/* __cplusplus */ 

   
/* utomsg01.c  */
void utMsgSetValidCode(long lMsgCode);
void utMsgSetReserve(int i1,long l1,long l2,long l3);
void utMsgSetReplyPort(int  iPort);
int utMsgIsValidCode(long lMsgCode);
long  utMsgGetCode();

#ifdef _WIN32
#include "picqcnet.h"
PICQCNET_API utMsgHead *utMsgInit(unsigned long  lCode,
                     unsigned short nFunCode,
                     unsigned long  lMsgId,
                     unsigned long  lMaxBytes);
PICQCNET_API int utMsgAdd_s(utMsgHead **psMsgHead,char *pVarName,char *pVarValue);
PICQCNET_API int utMsgAdd_v(utMsgHead **psMsgHead,char *pVarName,char *pVarValue, 
                    unsigned long lLen);
PICQCNET_API int utMsgAdd_l(utMsgHead **psMsgHead,char *pVarName, long lVarValue);
PICQCNET_API int utMsgAdd_n(utMsgHead **psMsgHead,char *pVarName,short nVarValue);
PICQCNET_API int utMsgHton(utMsgHead *psMsgHead);
PICQCNET_API int utMsgNtoh(utMsgHead *psMsgHead);
PICQCNET_API int utMsgHton0(utMsgHead *psMsgHead);
PICQCNET_API int utMsgHton1(char *pContent, unsigned long lBytes);
PICQCNET_API int utMsgNtoh1(char *pContent,unsigned long lBytes);
PICQCNET_API int utMsgNtoh0(utMsgHead *psMsgHead);
PICQCNET_API char *utMsgGetVar_s(utMsgHead *psMsgHead,char *pVarName);
PICQCNET_API char *utMsgGetVar_v(utMsgHead *psMsgHead,char *pVarName,
        unsigned long *lBytes);
PICQCNET_API long utMsgGetVar_l(utMsgHead *psMsgHead,char *pVarName);
PICQCNET_API short utMsgGetVar_n(utMsgHead *psMsgHead,char *pVarName);
PICQCNET_API int utMsgReset(utMsgHead *psMsgHead,unsigned long  lCode,
                     unsigned short nFunCode,
                     unsigned long  lMsgId);
PICQCNET_API void utMsgFree(utMsgHead *psMsgHead);
#else
/* utomsg01.c */
void utMsgSetCurMsgHead(utMsgHead *psMsgHead);
utMsgHead *utMsgGetCurMsgHead();
void utMsgSetReplyPort(int  iPort);
int utMsgGetReplyPort();
void utMsgSetValidCode(long lMsgCode);
void utMsgSetReserve(int i1,long l1,long l2,long l3);
int utMsgIsValidCode(long lMsgCode);
long utMsgGetCode();
int utMsgIsConfirmMsg(long lMsgCode);
utMsgHead *utMsgInitName(unsigned long  lCode,
                     char *pFunName,
                     unsigned long  lMsgId,
                     unsigned long  lMaxBytes);
utMsgHead *utMsgInit(unsigned long  lCode,
                     unsigned long  lFunCode,
                     unsigned long  lMsgId,
                     unsigned long  lMaxBytes);
int utMsgAdd_s(utMsgHead **psMsgHead0,char *pVarName,char *pVarValue);
int utMsgAdd_v(utMsgHead **psMsgHead0,char *pVarName,char *pVarValue,
                unsigned long lLen);
int utMsgAdd_l(utMsgHead **psMsgHead0,char *pVarName,long lVarValue);
int utMsgAdd_ll(utMsgHead **psMsgHead0,char *pVarName,long long llVarValue);
int utMsgAdd_n(utMsgHead **psMsgHead0,char *pVarName,short nVarValue);
int utMsgHton(utMsgHead *psMsgHead);
int utMsgHton0(utMsgHead *psMsgHead);
int utMsgHton1(char *pContent, unsigned long lBytes);
int utMsgHton1_v100(char *pContent, unsigned long lBytes);
int utMsgNtoh(utMsgHead *psMsgHead);
int utMsgNtoh1(char *pContent,unsigned long lBytes);
int utMsgNtoh1_v100(char *pContent,unsigned long lBytes);
int utMsgNtoh0(utMsgHead *psMsgHead);
char *utMsgGetVar_sd(utMsgHead *psMsgHead,char *pVarName,char *pDefault);
char *utMsgGetVar_s(utMsgHead *psMsgHead,char *pVarName);
char *utMsgGetMutlVar_s(utMsgHead *psMsgHead,char *pVarName,int iNum);
char *utMsgGetVar_s_v100(utMsgHead *psMsgHead,char *pVarName);
int utMsgDelVar(utMsgHead *psMsgHead,char *pVarName);
int utMsgDelVar_v100(utMsgHead *psMsgHead,char *pVarName);
char *utMsgGetVar_v(utMsgHead *psMsgHead,char *pVarName,
        unsigned long *lBytes);
char *utMsgGetVar_v_v100(utMsgHead *psMsgHead,char *pVarName,
        unsigned long *lBytes);
long utMsgGetVar_ld(utMsgHead *psMsgHead,char *pVarName,long lDefault);
long utMsgGetVar_l(utMsgHead *psMsgHead,char *pVarName);
long long utMsgGetVar_ll(utMsgHead *psMsgHead,char *pVarName);
long long utMsgGetVar_ll_v100(utMsgHead *psMsgHead,char *pVarName);
short utMsgGetVar_n(utMsgHead *psMsgHead,char *pVarName);
short utMsgGetVar_n_v100(utMsgHead *psMsgHead,char *pVarName);
int utMsgGetThatVar(utMsgHead *psMsgHead,
            utMsgVar *psMsgVar,char *pValue,short iNum);
int utMsgGetThatVar_v100(utMsgHead *psMsgHead,
            utMsgVar *psMsgVar,char *pValue,short iNum);
int utMsgGetVar(utMsgHead *psMsgHead,
            utMsgVar *psMsgVar,char *pValue,char *pVarName);
int utMsgGetVar_v100(utMsgHead *psMsgHead,
            utMsgVar *psMsgVar,char *pValue,char *pVarName);
void utMsgFree(utMsgHead *psMsgHead);
int utMsgReset(utMsgHead *psMsgHead,unsigned long  lCode,
                     unsigned long  lFunCode,
                     unsigned long  lMsgId);
int utMsgAllRecord(utMsgHead *psMsgHead,char *pHead,
     int utMsgDoRecord(char *pHead,char *pVar,short nType,long lLen,char *pValue));
int utMsgAllRecord_v100(utMsgHead *psMsgHead,char *pHead,
     int utMsgDoRecord(char *pHead,char *pVar,short nType,long lLen,char *pValue));
int utMsgPrintMsg(utMsgHead *psMsgHead);
int utMsgPrint(char *pHead,char *pVar,short nType,long lLen,char *pValue);
int utMsgCvtStrBuf(utMsgHead *psMsgHead,char *pBuf,char *pName);
int utMsgCvt00(char *pBuf,char *pVar,short nType,long lLen,char *pValue);
int utMsgPrintMsgHead(utMsgHead *psMsgHead);
int utMsgGetSomeVar(utMsgHead *psMsgHead,int iNumVar,...);
int utMsgGetSomeNVar(utMsgHead *psMsgHead,int iNumVar,...);
int utMsgGetRecord(utMsgHead *psMsgHead,int iNumVar,...);
int utMsgAddSomeVar(utMsgHead **psMsgHead,int iNumVar,...);
int utMsgSysPrint(utMsgHead *psMsgHead,char *pMsg);
int utMsgFPrintMsg(utMsgHead *psMsgHead,char *pTitle);
/* utomsg02.c */
int pasMsgTeaEnCode(utMsgHead **psMsgHead0,char *pKey);
int pasMsgTeaDeCode(utMsgHead **psMsgHead0,char *pKey);
/* utomsg03.c */
int pasGetSomeNVar(utMsgHead *psMsgHead,int iNumVar,...);
int utMsgOutMsgToLog(int iFile,int iLevel,utMsgHead *psMsgHead,char *pMsg,...);


/* utostr13.c */
int pasSetDebug(int iFlags);
int pasIsDebug();
int pasDebugSaveMsg(unsigned long lIp,unsigned short nPort,utMsgHead *psMsgHead,char iFlags);
int pasTcpAddSendBytes(unsigned long lBytes);
int pasTcpAddRecvBytes(unsigned long lBytes);
int pasTcpGetRecvBytes();
int pasTcpSetRecvBytes(unsigned long lBytes);
int pasTcpGetSendBytes();
int pasTcpSetSendBytes(unsigned long lBytes);
int utTcpSendMsgBack(int iFd,utMsgHead *psMsgHead,int iFlags);
                            
#endif


#ifdef	__cplusplus /* added by client */
}
#endif	/* __cplusplus */
#endif

