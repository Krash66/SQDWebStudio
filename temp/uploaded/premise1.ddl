CREATE TABLE premise1
(
    CHGOP                         CHAR(1)        NOT NULL
   ,PARTITION                     CHAR(1)        NOT NULL
   ,REP_ID_H                      CHAR(13)       NOT NULL
   ,PREM_H                        DECIMAL(11,0)  NOT NULL
   ,DTE_CRT                       CHAR(10)       NOT NULL
   ,CA_BLL_CYC_H                  CHAR(2)        NOT NULL
   ,DIST_DOE_ID_F                 CHAR(1)        NOT NULL
   ,DIST_DUNS_ID_F                CHAR(1)        NOT NULL
);
