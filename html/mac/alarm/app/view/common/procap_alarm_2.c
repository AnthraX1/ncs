/* ������---�й�Web��Ӧ��
     Modify 2002/9/9   by Liyunming*/
#define PAS_SRCFILE      9889     
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
#include"dlfcn.h"
int ncsAlarmInfoShow(utShmHead *psShmHead, int iFd,utMsgHead *psMsgHead)
{
	pasDbCursor *psCur;
	
	char caWhere[16];     //��������
	char caMac[24];       //MAC��ַ
	int  iStatus;         //״̬
	int  iTime = 0;       //�澯ʱ��
	long lMS = 0;         //������־
	int  iRule = 0;       //��������
	char caMessage[256];  //�澯����
	int  iNum = 0;
	
	utPltDbHead *psDbHead;
	int iReturn, i;
	
	psCur = pasDbOpenSqlF("select servicecode,mac,flags,stime,msid,ruleid,message from ncscasemacwarnlog  group by servicecode,mac,flags,stime,msid,ruleid,message ");//�������
	if(NULL == psCur) {
	
		return 0;
	}
	psDbHead = utPltInitDb();//��ʼ��������
	
	memset(caWhere, 0, sizeof(caWhere));
	memset(caMac, 0, sizeof(caMac));
	memset(caMessage, 0, sizeof(caMessage));
	
	
	//ȡ��ǰ��¼�����ݵ��������
	iReturn = pasDbFetchInto(psCur, UT_TYPE_STRING,15, caWhere,
									UT_TYPE_STRING,23,caMac,
									UT_TYPE_ULONG,4,&iStatus,
									UT_TYPE_ULONG,4,&iTime,
									UT_TYPE_ULONG,4,&lMS,
									UT_TYPE_ULONG,4,&iRule,
									UT_TYPE_STRING,253,caMessage);

	
	while(0 == iReturn || 1405 == iReturn) {
		
		if(iNum > 0) {
			utPltPutLoopVar(psDbHead,"dh",iNum+1,",");
		}
		iNum ++;
		
		utPltPutLoopVar(psDbHead,"servicecode",iNum,caWhere);
		utPltPutLoopVar(psDbHead,"mac",iNum,caMac);
		utPltPutLoopVarF(psDbHead,"flags",iNum,"%lu",iStatus);
		utPltPutLoopVarF(psDbHead,"stime",iNum,"%lu",iTime);
		utPltPutLoopVarF(psDbHead,"msid",iNum,"%lu",lMS);
		utPltPutLoopVarF(psDbHead,"ruleid",iNum,"%lu",iRule);
		utPltPutLoopVar(psDbHead,"message",iNum,caMessage);
		
		memset(caWhere, 0, sizeof(caWhere));
		memset(caMac, 0, sizeof(caMac));
		iStatus = 0;
		iTime = 0;
		lMS = 0;
		iRule = 0;
		memset(caMessage, 0, sizeof(caMessage));
		
		iReturn = pasDbFetchInto(psCur, UT_TYPE_STRING,15, caWhere,
									UT_TYPE_STRING,23,caMac,
									UT_TYPE_ULONG,4,&iStatus,
									UT_TYPE_ULONG,4,&iTime,
									UT_TYPE_ULONG,4,&lMS,
									UT_TYPE_ULONG,4,&iRule,
									UT_TYPE_STRING,253,caMessage);	
	}
	pasDbCloseCursor(psCur);
	utPltPutVarF(psDbHead,"TotRec","%d",iNum);
	utPltOutToHtml(iFd,psMsgHead,psDbHead,"mac/alarm/mac_warnlog.htm");
	
	return 0;	
}

int procapAlarmSetFun_2(utShmHead *psShmHead){
	pasSetTcpFunName("ncsAlarmInfoShow",ncsAlarmInfoShow,0);	
}