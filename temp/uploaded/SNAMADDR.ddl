CREATE TABLE GBS_SNAMADDR_NAME_ADDR
(
     ETL_SOURCE_APPLY_DTTM              TIMESTAMP          NOT NULL
    ,ETL_SOURCE_CAPTURE_DTTM            TIMESTAMP          NOT NULL
    ,ETL_SOURCE_CDC_ACTION_CODE         CHAR(1 BYTE)       NOT NULL
    ,ETL_SOURCE_KEY                     VARCHAR2(256 BYTE) NOT NULL
    ,ETL_SOURCE_SYSTEM_INSTANCE         VARCHAR2(15 BYTE)  NOT NULL
    ,ETL_SOURCE_SYSTEM_ORIGIN           VARCHAR2(10 BYTE)  NOT NULL
-- Parent Keys
-- IMS Header
    ,EQ_RSRVD_DATA                      NUMBER(5,0)
    ,EQ_LAST_UPDT_DATE                  NUMBER(8,0)
    ,EQ_LAST_UPDT_TIME                  NUMBER(6,0)
-- Segment Key
    ,EQ_BR_NO                           VARCHAR2(4 CHAR)   NOT NULL
    ,EQ_CUST_NO                         NUMBER(5,0)        NOT NULL
    ,EQ_LOCN_ID                         NUMBER(2,0)        NOT NULL
-- Segment Data
    ,EQ_ADDR_NAME                       VARCHAR2(34 CHAR)
    ,EQ_ADDR_LINE_1                     VARCHAR2(32 CHAR)
    ,EQ_ADDR_LINE_2                     VARCHAR2(32 CHAR)
    ,EQ_ADDR_LINE_3                     VARCHAR2(32 CHAR)
    ,EQ_GIRO_NO                         VARCHAR2(13 CHAR)
    ,EQ_KOREN_GIRO_NO                   VARCHAR2(7 CHAR)
    ,EQ_TEST_KEY_CODE                   CHAR(1 CHAR)
    ,EQ_LANG_CODE                       VARCHAR2(2 CHAR)
    ,EQ_ISO_CNTRY_CODE_DOM              VARCHAR2(2 CHAR)
    ,EQ_DLTN_IND                        CHAR(1 CHAR)
    ,EQ_BANK_SORT_CODE                  VARCHAR2(10 CHAR)
    ,EQ_ETABL_CODE                      VARCHAR2(5 CHAR)
    ,EQ_GUICH_CODE                      VARCHAR2(5 CHAR)
    ,EQ_SPNSH_BANK_SORT_CODE_PRFX       NUMBER(4,0)
    ,EQ_SPNSH_BANK_SORT_CODE_LOCN       NUMBER(4,0)
    ,EQ_ZERO_VALUE_6                    NUMBER(6,0)
    ,EQ_JPNSE_BANK_SORT_CODE_LOCN       NUMBER(4,0)
    ,EQ_FED_WIRE_ID                     NUMBER(9,0)
    ,EQ_SBACN_CLRNG_NO                  NUMBER(5,0)
    ,EQ_BRZLN_CITY_ID                   NUMBER(4,0)
    ,EQ_BANK_CODE                       CHAR(1 CHAR)
    ,EQ_TT_CHRG_CODE                    CHAR(1 CHAR)
    ,EQ_EFT_KEY                         VARCHAR2(4 CHAR)
-- Group Item
    ,EQ_HOL_CODE                        VARCHAR2(5 CHAR)
    ,EQ_ISO_CNTRY_CODE                  VARCHAR2(2 CHAR)
    ,EQ_ISO_RGN_CODE                    VARCHAR2(2 CHAR)
    ,EQ_CHIPS_ID                        NUMBER(6,0)
    ,EQ_CHAPS_ID                        NUMBER(6,0)
    ,EQ_ADDR_NAME_FIRST_DLIM            NUMBER(3,0)
    ,EQ_ADDR_NAME_LAST_DLIM             NUMBER(3,0)
    ,EQ_ADDR_NAME_SORT_FLD              VARCHAR2(20 CHAR)
    ,EQ_A90_IND                         CHAR(1 CHAR)
    ,EQ_LOCN_EXIST_IND                  CHAR(1 CHAR)
    ,EQ_GMT_STD_DEVN                    NUMBER(5,2)
    ,EQ_AGENTS_CLRNG_CODE               VARCHAR2(4 CHAR)
    ,EQ_AID_CODE                        NUMBER(6,0)
);
