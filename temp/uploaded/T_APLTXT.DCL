     ******************************************************************
     * DCLGEN TABLE(BCBSDB24.XX1_APL_TXT)                             *
     *        LIBRARY(SCOTTQ.DDLLIB(APLTXT))                          *
     *        ACTION(REPLACE)                                         *
     *        LANGUAGE(COBOL)                                         *
     *        STRUCTURE(HOMER)                                        *
     *        QUOTE                                                   *
     * ... IS THE DCLGEN COMMAND THAT MADE THE FOLLOWING STATEMENTS   *
     ******************************************************************
          EXEC SQL DECLARE BCBSDB24.XX1_APL_TXT TABLE
          ( APPEAL_ID_NBR                  CHAR(12) NOT NULL,
            CMTS_CAT_CD                    CHAR(2) NOT NULL,
            CMTS_SEQ_NBR                   CHAR(4) NOT NULL,
            CMTS_LINE_NBR                  CHAR(4) NOT NULL,
            APPL_ID_NBR                    CHAR(3) NOT NULL,
            CO_ID_NBR                      CHAR(1) NOT NULL,
            CMTS_FULL_TEXT                 CHAR(72) NOT NULL,
            SYS_UPDT_TS                    TIMESTAMP NOT NULL,
            SYS_ERROR_CD                   INTEGER NOT NULL,
            IMAGE_REC_NBR                  DECIMAL(11, 0) NOT NULL,
            SQDSTCK                        CHAR(16) NOT NULL
          ) END-EXEC.
     ******************************************************************
     * COBOL DECLARATION FOR TABLE BCBSDB24.XX1_APL_TXT               *
     ******************************************************************
      01  HOMER.
          10 APPEAL-ID-NBR        PIC X(12).
          10 CMTS-CAT-CD          PIC X(2).
          10 CMTS-SEQ-NBR         PIC X(4).
          10 CMTS-LINE-NBR        PIC X(4).
          10 APPL-ID-NBR          PIC X(3).
          10 CO-ID-NBR            PIC X(1).
          10 CMTS-FULL-TEXT       PIC X(72).
          10 SYS-UPDT-TS          PIC X(26).
          10 SYS-ERROR-CD         PIC S9(9) USAGE COMP.
          10 IMAGE-REC-NBR        PIC S9(11)V USAGE COMP-3.
          10 SQDSTCK              PIC X(16).
     ******************************************************************
     * THE NUMBER OF COLUMNS DESCRIBED BY THIS DECLARATION IS 11      *
     ******************************************************************
