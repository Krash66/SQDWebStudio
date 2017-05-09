     ******************************************************************
     * DCLGEN TABLE(BCBSDB24.XX1_AGENCY_FEE)                          *
     *        LIBRARY(SCOTTQ.DDLLIB(AGENCY))                          *
     *        ACTION(REPLACE)                                         *
     *        LANGUAGE(COBOL)                                         *
     *        STRUCTURE(HOMER)                                        *
     *        QUOTE                                                   *
     * ... IS THE DCLGEN COMMAND THAT MADE THE FOLLOWING STATEMENTS   *
     ******************************************************************
          EXEC SQL DECLARE BCBSDB24.XX1_AGENCY_FEE TABLE
          ( GRP_ID_NBR                     CHAR(9) NOT NULL,
            GRP_AGENCY_SEQ_NBR             CHAR(2) NOT NULL,
            PKG_ID_NBR                     CHAR(2) NOT NULL,
            PKG_LOB_CD                     CHAR(2) NOT NULL,
            AGENCY_SEQ_NBR                 CHAR(1) NOT NULL,
            APPL_ID_NBR                    CHAR(3) NOT NULL,
            CO_ID_NBR                      CHAR(1) NOT NULL,
            AGENCY_ID_NBR                  CHAR(12) NOT NULL,
            AGENT_ID_NBR                   CHAR(12) NOT NULL,
            AGENCY_SPLIT_PCT               DECIMAL(5, 4) NOT NULL,
            AGENCY_REIMB_CD                CHAR(2) NOT NULL,
            AGENCY_RATE_CD                 CHAR(4) NOT NULL,
            AGENCY_DOLLAR_CD               CHAR(4) NOT NULL,
            AGENCY_RULE_CD                 CHAR(3) NOT NULL,
            AGENCY_OVRIDE_PCT              DECIMAL(5, 4) NOT NULL,
            AGENCY_FEE_AMT                 DECIMAL(11, 2) NOT NULL,
            SYS_UPDT_TS                    TIMESTAMP NOT NULL,
            SYS_ERROR_CD                   INTEGER NOT NULL,
            SQDSTCK                        CHAR(16) NOT NULL
          ) END-EXEC.
     ******************************************************************
     * COBOL DECLARATION FOR TABLE BCBSDB24.XX1_AGENCY_FEE            *
     ******************************************************************
      01  HOMER.
          10 GRP-ID-NBR           PIC X(9).
          10 GRP-AGENCY-SEQ-NBR   PIC X(2).
          10 PKG-ID-NBR           PIC X(2).
          10 PKG-LOB-CD           PIC X(2).
          10 AGENCY-SEQ-NBR       PIC X(1).
          10 APPL-ID-NBR          PIC X(3).
          10 CO-ID-NBR            PIC X(1).
          10 AGENCY-ID-NBR        PIC X(12).
          10 AGENT-ID-NBR         PIC X(12).
          10 AGENCY-SPLIT-PCT     PIC S9(1)V9(4) USAGE COMP-3.
          10 AGENCY-REIMB-CD      PIC X(2).
          10 AGENCY-RATE-CD       PIC X(4).
          10 AGENCY-DOLLAR-CD     PIC X(4).
          10 AGENCY-RULE-CD       PIC X(3).
          10 AGENCY-OVRIDE-PCT    PIC S9(1)V9(4) USAGE COMP-3.
          10 AGENCY-FEE-AMT       PIC S9(9)V9(2) USAGE COMP-3.
          10 SYS-UPDT-TS          PIC X(26).
          10 SYS-ERROR-CD         PIC S9(9) USAGE COMP.
          10 SQDSTCK              PIC X(16).
     ******************************************************************
     * THE NUMBER OF COLUMNS DESCRIBED BY THIS DECLARATION IS 19      *
     ******************************************************************
