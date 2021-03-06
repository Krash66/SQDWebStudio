CREATE TABLE SRECOMMS
(
        ORIGIN     CHAR(4)
       ,APPLMNEM     CHAR(4)
       ,CURR_DATE     CHAR(8)
       ,REC_TYP     CHAR(4)
       ,CONCAT_KEY     CHAR(16)
       ,RSRVD_DATA     HALFW(2)
       ,LAST_UPDT_DATE     CHAR(8)
       ,LAST_UPDT_TIME     CHAR(6)
       ,COMM_TYPE     CHAR(4)
       ,COMM_AMT     PACKED(8)
       ,COMM_CODE     CHAR(1)
       ,COMM_ORIDE_IND     CHAR(1)
       ,COMM_DR_ACCT_NO     CHAR(10)
       ,COMM_CHRG_CURR_TYPE_CODE     CHAR(1)
       ,TXBLE_CODE     CHAR(1)
       ,TAX_RATE     PACKED(4)
       ,ENTRY_TYPE     CHAR(3)
       ,CORR_PYMT_CHRG_TYPE     CHAR(1)
       ,PRICE_CURR_CODE     CHAR(4)
       ,ACCT_BILLG_STTS     CHAR(1)
       ,CHRG_AMT     PACKED(8)
       ,PFK_KFLDC2     C(12)   NOT NULL
);