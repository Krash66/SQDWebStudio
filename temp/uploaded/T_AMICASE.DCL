     ******************************************************************
     * DCLGEN TABLE(BCBSDB24.XX1_AMI_CASE)                            *
     *        LIBRARY(SCOTTQ.DDLLIB(AMICASE))                         *
     *        ACTION(REPLACE)                                         *
     *        LANGUAGE(COBOL)                                         *
     *        STRUCTURE(HOMER)                                        *
     *        QUOTE                                                   *
     * ... IS THE DCLGEN COMMAND THAT MADE THE FOLLOWING STATEMENTS   *
     ******************************************************************
          EXEC SQL DECLARE BCBSDB24.XX1_AMI_CASE TABLE
          ( CASE_ID_NBR                    CHAR(16) NOT NULL,
            CNT_ID_NBR                     CHAR(12) NOT NULL,
            MBR_ID_NBR                     CHAR(12) NOT NULL,
            USER_ID_NBR                    CHAR(8) NOT NULL,
            DIAG_ID_1_NBR                  CHAR(6) NOT NULL,
            DIAG_ID_2_NBR                  CHAR(6) NOT NULL,
            DIAG_ID_3_NBR                  CHAR(6) NOT NULL,
            DIAG_ID_4_NBR                  CHAR(6) NOT NULL,
            DIAG_ID_5_NBR                  CHAR(6) NOT NULL,
            CASE_STATUS_CD                 CHAR(2) NOT NULL,
            PRV_ID_NBR                     CHAR(12) NOT NULL,
            CASE_ACTION_CD                 CHAR(2) NOT NULL,
            CASE_EFF_DT                    DATE NOT NULL,
            CASE_STATUS_DT                 DATE NOT NULL,
            CASE_REVIEW_DT                 DATE NOT NULL,
            CASE_UPDT_DT                   DATE NOT NULL,
            CASE_VOID_CD                   CHAR(2) NOT NULL,
            SYS_KEY_TS                     TIMESTAMP NOT NULL,
            APPL_ID_NBR                    CHAR(3) NOT NULL,
            CO_ID_NBR                      CHAR(1) NOT NULL,
            SYS_UPDT_TS                    TIMESTAMP NOT NULL,
            SYS_ERROR_CD                   INTEGER NOT NULL,
            IMAGE_REC_NBR                  DECIMAL(11, 0) NOT NULL,
            SQDSTCK                        CHAR(16) NOT NULL
          ) END-EXEC.
     ******************************************************************
     * COBOL DECLARATION FOR TABLE BCBSDB24.XX1_AMI_CASE              *
     ******************************************************************
      01  HOMER.
          10 CASE-ID-NBR          PIC X(16).
          10 CNT-ID-NBR           PIC X(12).
          10 MBR-ID-NBR           PIC X(12).
          10 USER-ID-NBR          PIC X(8).
          10 DIAG-ID-1-NBR        PIC X(6).
          10 DIAG-ID-2-NBR        PIC X(6).
          10 DIAG-ID-3-NBR        PIC X(6).
          10 DIAG-ID-4-NBR        PIC X(6).
          10 DIAG-ID-5-NBR        PIC X(6).
          10 CASE-STATUS-CD       PIC X(2).
          10 PRV-ID-NBR           PIC X(12).
          10 CASE-ACTION-CD       PIC X(2).
          10 CASE-EFF-DT          PIC X(10).
          10 CASE-STATUS-DT       PIC X(10).
          10 CASE-REVIEW-DT       PIC X(10).
          10 CASE-UPDT-DT         PIC X(10).
          10 CASE-VOID-CD         PIC X(2).
          10 SYS-KEY-TS           PIC X(26).
          10 APPL-ID-NBR          PIC X(3).
          10 CO-ID-NBR            PIC X(1).
          10 SYS-UPDT-TS          PIC X(26).
          10 SYS-ERROR-CD         PIC S9(9) USAGE COMP.
          10 IMAGE-REC-NBR        PIC S9(11)V USAGE COMP-3.
          10 SQDSTCK              PIC X(16).
     ******************************************************************
     * THE NUMBER OF COLUMNS DESCRIBED BY THIS DECLARATION IS 24      *
     ******************************************************************
