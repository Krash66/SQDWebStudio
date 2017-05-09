     ******************************************************************
     * DCLGEN TABLE(BCBSDB24.XX1_AMI_CR_BANK)                         *
     *        LIBRARY(SCOTTQ.DDLLIB(AMIBANK))                         *
     *        ACTION(REPLACE)                                         *
     *        LANGUAGE(COBOL)                                         *
     *        STRUCTURE(HOMER)                                        *
     *        QUOTE                                                   *
     * ... IS THE DCLGEN COMMAND THAT MADE THE FOLLOWING STATEMENTS   *
     ******************************************************************
          EXEC SQL DECLARE BCBSDB24.XX1_AMI_CR_BANK TABLE
          ( CNT_ID_NBR                     CHAR(12) NOT NULL,
            MBR_ID_NBR                     CHAR(12) NOT NULL,
            CTR_BUS_CD                     CHAR(2) NOT NULL,
            CTR_PGM_CD                     CHAR(2) NOT NULL,
            CTR_CARR_CD                    CHAR(2) NOT NULL,
            DIV_ID_NBR                     CHAR(10) NOT NULL,
            SVC_ID_NBR                     CHAR(16) NOT NULL,
            APPL_ID_NBR                    CHAR(3) NOT NULL,
            CO_ID_NBR                      CHAR(1) NOT NULL,
            CTR_ADJ_CD                     CHAR(1) NOT NULL,
            CTR_APPLY_DT                   DATE NOT NULL,
            SVC_COB_ACCUR_AMT              DECIMAL(11, 2) NOT NULL,
            SVC_COB_REIMB_AMT              DECIMAL(11, 2) NOT NULL,
            CTR_UPDATE_DT                  DATE NOT NULL,
            IMAGE_REC_NBR                  DECIMAL(10, 0) NOT NULL,
            SYS_UPDT_TS                    TIMESTAMP NOT NULL,
            SYS_ERROR_CD                   INTEGER NOT NULL,
            SQDSTCK                        CHAR(16) NOT NULL
          ) END-EXEC.
     ******************************************************************
     * COBOL DECLARATION FOR TABLE BCBSDB24.XX1_AMI_CR_BANK           *
     ******************************************************************
      01  HOMER.
          10 CNT-ID-NBR           PIC X(12).
          10 MBR-ID-NBR           PIC X(12).
          10 CTR-BUS-CD           PIC X(2).
          10 CTR-PGM-CD           PIC X(2).
          10 CTR-CARR-CD          PIC X(2).
          10 DIV-ID-NBR           PIC X(10).
          10 SVC-ID-NBR           PIC X(16).
          10 APPL-ID-NBR          PIC X(3).
          10 CO-ID-NBR            PIC X(1).
          10 CTR-ADJ-CD           PIC X(1).
          10 CTR-APPLY-DT         PIC X(10).
          10 SVC-COB-ACCUR-AMT    PIC S9(9)V9(2) USAGE COMP-3.
          10 SVC-COB-REIMB-AMT    PIC S9(9)V9(2) USAGE COMP-3.
          10 CTR-UPDATE-DT        PIC X(10).
          10 IMAGE-REC-NBR        PIC S9(10)V USAGE COMP-3.
          10 SYS-UPDT-TS          PIC X(26).
          10 SYS-ERROR-CD         PIC S9(9) USAGE COMP.
          10 SQDSTCK              PIC X(16).
     ******************************************************************
     * THE NUMBER OF COLUMNS DESCRIBED BY THIS DECLARATION IS 18      *
     ******************************************************************
