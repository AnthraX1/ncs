#include <unistd.h>
#include <stdlib.h>
#include <unistd.h>
#include <signal.h>
#include <stdio.h>
#include <fcntl.h>
#include <netdb.h>
#include <errno.h>
#include <string.h>
#include <pthread.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <sys/wait.h>
#include <sys/ioctl.h>
#include <sys/stat.h>
#include <sys/time.h>
#include <sys/ipc.h>
#include <sys/shm.h>
#include <netinet/in.h>
#include <netinet/ip.h>
#include <netinet/tcp.h>
#include "config.h"
#include <pcap.h>
#include "utoall.h"
#include "pasdef.h"
#define PAS_SRCFILE    3101
#include <stdio.h>
#include <time.h>
#include <stdlib.h>
#include <errno.h>
#include <string.h>
#include <sys/time.h>
#include "utoall.h"
#include "ncsdef.h"
#include "pasutl.h"
#include "pasdb.h"
#include "pasmessage.h"
#include "ncapi.h"
#include "ncmac.h"


#include <time.h>
#include <malloc.h>
#include <pthread.h>
#include "string.h"
#include <stdlib.h>
#include <sys/stat.h>
#include <sys/types.h>


#include "pas_acbm.h"
#include "ncsdef.h"

struct db_nctermsysalarm
{
	uint4 sid;//    int   unsigned auto_increment primary key,
    char alarmcode[14];//     char(14),                                -- �澯�����
    char alarmlevel[32];//    char(32) default ' ',                -- �澯���� 1-���� 2-��֤ 3-һ��
    char devtype[4];//       char(4),                             -- 01 -AP 02-���� 03-�������� 04-�ϼ�ƽ̨
    uint4 alarmtime;//          int default 0,                         -- �澯ʱ��
    uint4 updatetime;//         int default 0,                  -- �澯�ϱ�ʱ��
    char description[128];//          char(128),                          -- �澯����
    uint4 status;//           int default 0,                    -- 0δȷ�� 1-��ȷ��      
};

static int insertDeviceAlarmToDB(struct db_nctermsysalarm* pPlaceData)
{
	char sql[2048] = "";
	long lCount = 0;
	int iReturn = 0;
	//�ȶ�ȡһ���Ƿ��Ѿ����ڸó�����δȷ�ϸ澯��Ϣ
	memset(sql, 0, sizeof(sql));
    sprintf(sql, "select count(*) from nctermsysalarm where alarmcode='%s' and devtype='%s' and description='%s' and status=%lu",
		pPlaceData->alarmcode, pPlaceData->devtype, pPlaceData->description, pPlaceData->status);
    iReturn = pasDbOneRecord(sql, 0, UT_TYPE_LONG, 4, &lCount);
    if(iReturn != 0 || lCount> 0)
    {
    	printf("sql=%s, iret=%d, lcount=%d\n", sql, iReturn, lCount);
        return 0;
    }
	//���뵽���ݿ�
    memset(sql, 0, sizeof(sql));
	sprintf(sql, "insert into nctermsysalarm(alarmcode,alarmlevel,devtype,alarmtime,updatetime,description,status) \
        	values(%lu,'%s','%s','%s',%llu,%llu,'%s','%s',%lu) ",
                pPlaceData->alarmcode, pPlaceData->alarmlevel,pPlaceData->devtype,pPlaceData->alarmtime,
                pPlaceData->updatetime,pPlaceData->description, pPlaceData->status);
    iReturn = pasDbExecSqlF(sql);    
    return 0;
}

static int ncsStatMacDevWarnEx(utShmHead *psShmHead)
{
	pasDbCursor *psCur;
    char sql[2048] = "";
	unsigned char* pHash_task = NULL;
	//struct s_nctermtask* psTask = NULL;
	//struct s_nctermtask tmpTask;
	pasLHashInfo sHashInfo;
	long taskCount = 0;
	long lSumTask = 0;
    int iReturn = pasConnect(psShmHead);
    if(iReturn < 0)
    {
		printf("conn psShmHead fail iReturn=%d\n", iReturn);
        sleep(60);
        return 0;
    }
	struct db_nctermsysalarm tmpPlaceData;
	ncsOnline *psOnline;
	ncsClient *psClient;
    while(1)
    {	
    	//������߳���������澯��
	    psClient = (ncsClient *)utShmArray(psShmHead, NCS_LNK_CLIENT);
	    if(psClient)
	    {
	        int lSumUser;
	        int i = 0;
	        lSumUser = utShmArrayRecord(psShmHead, NCS_LNK_CLIENT);
	        for(i = 0; i < lSumUser; i++)
	        {
	            psOnline = (ncsOnline *)ncsUtlGetOnlineById(psShmHead, psClient[i].userid);
				if(!isInOnlinePlaceMemory(psShmHead, psClient[i].username))
				{
					memset(&tmpPlaceData, 0, sizeof(struct db_nctermsysalarm));
					memcpy(tmpPlaceData.alarmcode,"10007",5);
					memcpy(tmpPlaceData.alarmlevel,"1", 1);
					strcpy(tmpPlaceData.description, psClient[i].username);
					memcpy(tmpPlaceData.devtype,"02",2);
					tmpPlaceData.status = 0;
					tmpPlaceData.updatetime = time(0);
					tmpPlaceData.alarmtime = time(0);
					insertDeviceAlarmToDB(&tmpPlaceData);
				}
	        }
	    }
		//��������豸����澯��
		
    	
		
    	sleep(60);
    }
}

main()
{
    utShmHead *psShmHead;
    char *pHash;
    pasHashInfo sHashInfo;
    int  iCount;
    char caTemp[64];
    uint4 lTime=time(0);
    unsigned long lBase;
    ncsOnline *psOnline;
    ncsClient *psClient;
    int i,iReturn;
    psShmHead = utComShmOpen("/home/ncmysql/ncs/bin/pqconf_ncs.cnf");
 	if(psShmHead == NULL) {
   	    printf(" Share Memory Open Error i==%d\n",i);
   	    return (-1);
    }
	ncsStatMacDevWarnEx(psShmHead);
    return 0;
}