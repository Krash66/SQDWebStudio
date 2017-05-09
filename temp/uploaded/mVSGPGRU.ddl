CREATE TABLE VSGPGRU
(
   GA_GRP_NO_ID                  CHAR(6)        NOT NULL
   ,GA_SUBGR_NO                   CHAR(3)        NOT NULL
   ,GA_GRP_STAS_CD                SMALLINT       NOT NULL
   ,GA_EFF_DT                     DECIMAL(7,0)   NOT NULL
   ,GA_TERM_DT                    DECIMAL(7,0)   NOT NULL
   ,GA_MRK_ID_NUM                 CHAR(4)        NOT NULL
   ,GA_INDY_CD                    CHAR(4)        NOT NULL
   ,GA_GRP_SERV_NM                CHAR(50)       NOT NULL
   ,GA_CHG_BK_CD                  SMALLINT       NOT NULL
   ,GA_GD_APPL_CD                 SMALLINT       NOT NULL
   ,GA_TIME_FILE_MO               DECIMAL(3,0)   NOT NULL
   ,GA_GRC_DY_CD                  DECIMAL(3,0)   NOT NULL
   ,GA_OCR_RECV_CD                SMALLINT       NOT NULL
   ,GA_CLAIM_STP_PROC_DT          DECIMAL(7,0)   NOT NULL
   ,GA_CLAIM_STOP_EFF_DT          DECIMAL(7,0)   NOT NULL
   ,GA_CLAIM_STOP_CD              SMALLINT       NOT NULL
   ,GA_JEOP_CD                    SMALLINT       NOT NULL
   ,GA_PREV_GRP_NO                CHAR(6)        NOT NULL
   ,GA_PREV_SGP_NO                CHAR(3)        NOT NULL
   ,GA_FRWD_GRP_NO                CHAR(6)        NOT NULL
   ,GA_FRWD_SGP_NO                CHAR(3)        NOT NULL
   ,GA_CNTY_CD                    SMALLINT       NOT NULL
   ,GA_TYPE_COV_CD                SMALLINT       NOT NULL
   ,GA_COMM_TY_CD                 SMALLINT       NOT NULL
   ,GA_UNA_CSH_IND                CHAR(1)        NOT NULL
   ,GA_CMBL_GRP_NO                CHAR(6)        NOT NULL
   ,GA_CMBL_SUBGR_NO              CHAR(3)        NOT NULL
   ,GRUPKEYI                      CHAR(9)        NOT NULL
   ,GRUPSTAC                      CHAR(2)        NOT NULL
   ,MARKNUMI                      CHAR(4)        NOT NULL
   ,GRUPSERM                      CHAR(50)       NOT NULL
   ,CMBLGRPI                      CHAR(9)        NOT NULL
);
