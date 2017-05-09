     ******************************************************************
     * DCLGEN TABLE(BCBSDB24.XX1_AMI_MBR_REV)                         *
     *        LIBRARY(SCOTTQ.DDLLIB(AMIREV))                          *
     *        ACTION(REPLACE)                                         *
     *        LANGUAGE(COBOL)                                         *
     *        STRUCTURE(HOMER)                                        *
     *        QUOTE                                                   *
     * ... IS THE DCLGEN COMMAND THAT MADE THE FOLLOWING STATEMENTS   *
     ******************************************************************
          EXEC SQL DECLARE BCBSDB24.XX1_AMI_MBR_REV TABLE
          ( CNT_ID_NBR                     CHAR(12) NOT NULL,
            MBR_ID_NBR                     CHAR(12) NOT NULL,
            REV_EFF_DT                     DATE NOT NULL,
            SYS_KEY_TS                     TIMESTAMP NOT NULL,
            APPL_ID_NBR                    CHAR(3) NOT NULL,
            CO_ID_NBR                      CHAR(1) NOT NULL,
            REV_TRM_DT                     DATE NOT NULL,
            REV_FLAG_CD                    CHAR(4) NOT NULL,
            REV_VOID_CD                    CHAR(2) NOT NULL,
            SYS_UPDT_TS                    TIMESTAMP NOT NULL,
            SYS_ERROR_CD                   INTEGER NOT NULL,
            CASE_ID_NBR                    CHAR(16) NOT NULL,
            IMAGE_REC_NBR                  DECIMAL(11, 0) NOT NULL,
            SQDSTCK                        CHAR(16) NOT NULL
          ) END-EXEC.
     ******************************************************************
     * COBOL DECLARATION FOR TABLE BCBSDB24.XX1_AMI_MBR_REV           *
     ******************************************************************
      01  HOMER.
          10 CNT-ID-NBR           PIC X(12).
          10 MBR-ID-NBR           PIC X(12).
          10 REV-EFF-DT           PIC X(10).
          10 SYS-KEY-TS           PIC X(26).
          10 APPL-ID-NBR          PIC X(3).
          10 CO-ID-NBR            PIC X(1).
          10 REV-TRM-DT           PIC X(10).
          10 REV-FLAG-CD          PIC X(4).
          10 REV-VOID-CD          PIC X(2).
          10 SYS-UPDT-TS          PIC X(26).
          10 SYS-ERROR-CD         PIC S9(9) USAGE COMP.
          10 CASE-ID-NBR          PIC X(16).
          10 IMAGE-REC-NBR        PIC S9(11)V USAGE COMP-3.
          10 SQDSTCK              PIC X(16).
     ******************************************************************
     * THE NUMBER OF COLUMNS DESCRIBED BY THIS DECLARATION IS 14      *
     ******************************************************************
