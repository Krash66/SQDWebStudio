     ******************************************************************
     * DCLGEN TABLE(BCBSDB24.XX1_AGENCY_NAME)                         *
     *        LIBRARY(SCOTTQ.DDLLIB(XXAGENCY))                        *
     *        ACTION(REPLACE)                                         *
     *        LANGUAGE(COBOL)                                         *
     *        STRUCTURE(HOMER)                                        *
     *        QUOTE                                                   *
     * ... IS THE DCLGEN COMMAND THAT MADE THE FOLLOWING STATEMENTS   *
     ******************************************************************
          EXEC SQL DECLARE BCBSDB24.XX1_AGENCY_NAME TABLE
          ( AGENCY_CLIENT_ID               CHAR(7) NOT NULL,
            AGENCY_ID_NBR                  CHAR(12) NOT NULL,
            AGENT_ID_NBR                   CHAR(12) NOT NULL,
            AGENCY_TYPE_CD                 CHAR(1) NOT NULL,
            APPL_ID_NBR                    CHAR(3) NOT NULL,
            CO_ID_NBR                      CHAR(1) NOT NULL,
            AGENCY_BUS_NAME                CHAR(50) NOT NULL,
            AGENT_L_NAME                   CHAR(25) NOT NULL,
            AGENT_F_NAME                   CHAR(20) NOT NULL,
            AGENT_INIT_M_NAME              CHAR(1) NOT NULL,
            AGENT_TITLE_TEXT               CHAR(4) NOT NULL,
            AGENT_TYPE_TEXT                CHAR(20) NOT NULL,
            AGENT_TYPE_CD                  CHAR(6) NOT NULL,
            SYS_UPDT_TS                    TIMESTAMP NOT NULL,
            SYS_ERROR_CD                   INTEGER NOT NULL,
            AGENCY_ADMIN_CD                CHAR(1) NOT NULL,
            AGENCY_PREFER_CD               CHAR(1) NOT NULL,
            ADDR_CHK_TEXT                  CHAR(20) NOT NULL,
            ADDR_CHK_CD                    CHAR(6) NOT NULL,
            ADDR_CORRSP_TEXT               CHAR(20) NOT NULL,
            ADDR_CORRSP_CD                 CHAR(6) NOT NULL,
            AGENCY_STATUS_TEXT             CHAR(26) NOT NULL,
            AGENCY_REGN_CD                 CHAR(2) NOT NULL,
            CHK_PULL_CD                    CHAR(1) NOT NULL,
            CHK_RECV_CD                    CHAR(1) NOT NULL,
            AGENCY_LIC_NBR                 CHAR(9) NOT NULL,
            AGENT_REP_NBR                  CHAR(12) NOT NULL,
            AGENT_BIRTH_DT                 DATE NOT NULL,
            AGENT_NAME_SFX                 CHAR(10) NOT NULL,
            SQDSTCK                        CHAR(16) NOT NULL
          ) END-EXEC.
     ******************************************************************
     * COBOL DECLARATION FOR TABLE BCBSDB24.XX1_AGENCY_NAME           *
     ******************************************************************
      01  HOMER.
          10 AGENCY-CLIENT-ID     PIC X(7).
          10 AGENCY-ID-NBR        PIC X(12).
          10 AGENT-ID-NBR         PIC X(12).
          10 AGENCY-TYPE-CD       PIC X(1).
          10 APPL-ID-NBR          PIC X(3).
          10 CO-ID-NBR            PIC X(1).
          10 AGENCY-BUS-NAME      PIC X(50).
          10 AGENT-L-NAME         PIC X(25).
          10 AGENT-F-NAME         PIC X(20).
          10 AGENT-INIT-M-NAME    PIC X(1).
          10 AGENT-TITLE-TEXT     PIC X(4).
          10 AGENT-TYPE-TEXT      PIC X(20).
          10 AGENT-TYPE-CD        PIC X(6).
          10 SYS-UPDT-TS          PIC X(26).
          10 SYS-ERROR-CD         PIC S9(9) USAGE COMP.
          10 AGENCY-ADMIN-CD      PIC X(1).
          10 AGENCY-PREFER-CD     PIC X(1).
          10 ADDR-CHK-TEXT        PIC X(20).
          10 ADDR-CHK-CD          PIC X(6).
          10 ADDR-CORRSP-TEXT     PIC X(20).
          10 ADDR-CORRSP-CD       PIC X(6).
          10 AGENCY-STATUS-TEXT   PIC X(26).
          10 AGENCY-REGN-CD       PIC X(2).
          10 CHK-PULL-CD          PIC X(1).
          10 CHK-RECV-CD          PIC X(1).
          10 AGENCY-LIC-NBR       PIC X(9).
          10 AGENT-REP-NBR        PIC X(12).
          10 AGENT-BIRTH-DT       PIC X(10).
          10 AGENT-NAME-SFX       PIC X(10).
          10 SQDSTCK              PIC X(16).
     ******************************************************************
     * THE NUMBER OF COLUMNS DESCRIBED BY THIS DECLARATION IS 30      *
     ******************************************************************
