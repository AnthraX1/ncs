/*

*/
#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include "bab_list.h"

/**
* ����һ���б���ͷ����ַ��ͷ�������ݲ�ʹ��
*/
s_eachpoint* createPointList()
{
    s_eachpoint* pFirstNode = (s_eachpoint*)malloc(sizeof(s_eachpoint));
    memset(pFirstNode, 0, sizeof(s_eachpoint));
    pFirstNode->pNext = NULL;
    return pFirstNode;
}

/**
* �ͷ��б�ռ�õ������ڴ�
*/
int destroyPointList(s_eachpoint* pFirstNode)
{
    s_eachpoint* pNextNode = NULL;
    if(!pFirstNode)
        return -1;
    free(pFirstNode);

    s_eachpoint* pNode = pFirstNode->pNext;
    while(pNode)
    {
        pNextNode = pNode->pNext;
        free(pNode);
        pNode = pNextNode;
    }
    return 0;
}

/**
* �൱�ڿ������캯��
*/
s_eachpoint* createNodeByData(s_eachpoint* pPoint)
{
    s_eachpoint* insertNode = (s_eachpoint*)malloc(sizeof(s_eachpoint));
    memset(insertNode, 0, sizeof(s_eachpoint));
    insertNode->cid = pPoint->cid;
    memcpy(insertNode->mac, pPoint->mac, sizeof(insertNode->mac));
    insertNode->starttime = pPoint->starttime;
    insertNode->endtime = pPoint->endtime;
    memcpy(insertNode->servicecode, pPoint->servicecode, sizeof(insertNode->servicecode));
    return insertNode;
}


/**
* ��starttime��С�����˳����뵽����
*/
int addToPointList(s_eachpoint* pFirstNode, s_eachpoint* pPoint)
{
    s_eachpoint* insertNode = NULL;
    s_eachpoint* pNextNode = NULL;
    s_eachpoint* pBeforeNode = pFirstNode;
    if(!pFirstNode)
        return -1;
    s_eachpoint* pNode = pFirstNode->pNext;//��һ�����
    // DO:Ҫ�ж����Ƿ�ȡ����һ�����
    if(pNode)
    {
        //printf("next stime=%llu, first stime=%llu", pPoint->starttime, pNode->starttime);
        if(pPoint->starttime < pNode->starttime)
        {
          //  printf(",�����һ����ǰ\n");
            insertNode = createNodeByData(pPoint);
            pFirstNode->pNext = insertNode;
            insertNode->pNext = pNode;
            return 0;
        }
    }

    while(pNode)
    {
        //����Ѿ������һ��������⴦��,ֱ�Ӳ��뵽��󼴿�
        if(!pNode->pNext)
        {
            //printf("�Ѿ������һ�����������\n");
            insertNode = createNodeByData(pPoint);
            pNode->pNext = insertNode;
            insertNode->pNext = NULL;
            return 0;
        }
        else
        {
           // printf("bStime=%llu, pStime=%llu nStime=%llu", pNode->starttime , pPoint->starttime, pNode->pNext->starttime);
            if((pNode->starttime < pPoint->starttime) && (pNode->pNext->starttime > pPoint->starttime))
            {
                pNextNode = pNode ->pNext;
               // printf("�뵽pNode֮��\n");
                insertNode = createNodeByData(pPoint);
                pNode->pNext = insertNode;
                insertNode->pNext = pNextNode;
                return 0;
            }
        }
        pBeforeNode = pNode;
        pNode = pNode->pNext;
    }
  //  printf("�����һ�����������\n");
    insertNode = createNodeByData(pPoint);
    pBeforeNode->pNext = insertNode;
    insertNode->pNext = NULL;
    return 0;
}

/**
*���ݶ��ƹ��򣬺ϲ�����starttime��1Сʱ�ڣ�servicecode��ͬ�Ľ��
*/
int reOrganizePointList(s_eachpoint* pFirstNode)
{
    if(!pFirstNode)
        return -1;
    s_eachpoint* pNode = pFirstNode->pNext;
    s_eachpoint* pNextNode = NULL;
    while(pNode)
    {
        pNextNode = pNode->pNext;
        if(!pNextNode)
            return 0;
        //printf("next stime=%llu, current stime=%llu", pNextNode->starttime, pNode->starttime);
        if(pNextNode->starttime - pNode->starttime < 3600)
        {
            if(strcmp(pNextNode->servicecode, pNode->servicecode) == 0)
            {
            	//printf(",�ϲ�\n");
				if(pNextNode->starttime>pNode->endtime)
                	pNode->endtime = pNextNode->starttime;
                pNode->pNext = pNextNode->pNext;
                free(pNextNode);
                continue;
            }else{
				//printf(",�����л����ϲ�\n");
				//printf("my etime=%llu, next stime=%llu\n", pNode->endtime, pNextNode->starttime);
				pNode->endtime = pNextNode->starttime;
				
			}
        }
        else
        {
            //printf(",���ϲ�\n");
			if(pNode->endtime>pNextNode->starttime)
			{
				//printf("but etime=%llu, next stime=%llu\n", pNode->endtime, pNextNode->starttime);
				pNode->endtime = pNextNode->starttime;				
			}
        }
        pNode = pNode->pNext;
    }
}

/**
* չʾ�б�
*/


/**
* ȡ�б���
*/
ulong getPointListLength(s_eachpoint* pFirstNode)
{
	if(!pFirstNode)
       return -1;
	s_eachpoint* pNode = pFirstNode->pNext;
	ulong lLen = 0;
	while(pNode){
		lLen++;
		pNode = pNode->pNext;
	}
	return lLen;
}



