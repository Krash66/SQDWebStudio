000010**  BILLING RATES SEGMENT IS USED TO RECORD THE RATES BY LINE
000020**  OF BUSINESS AND CONTRACT TYPE FOR EACH CONTRACT IN THE
000030**  PACKAGE.
000040** FILE/SEGMENT ID.-VSGPBLR    COBOL PREFIX-GF
000050**         IMS KEY FIELD ID.---CTRTTPEC
000060**         KEY FIELD TAG ID.---GF-CON-TY-CD
000070** ********  VARIABLE LENGTH SEGMENT  ***********************
000080** SSA FIELDS THIS SEGM SEGMTPEC, RATEEFVD, AND NULLTRMD
000090     01  GF-VSGPBLRC.
000100         05  GF-SEGM-LGT-CD      PIC 9(4)         COMP.
000110         05  GF-CON-TY-CD        PIC 9(4)         COMP.
000120         05  GF-SEGM-TY-CD       PIC X(2).
000130         05  GF-RTE-EFF-DT       PIC 9(7)         COMP-3.
000140         05  GF-TERM-DT          PIC 9(7)         COMP-3.
000150         05  GF-DT-PRCS          PIC 9(7)         COMP-3.
000160         05  GF-RTE-STAS-CD      PIC 9(4)         COMP.
000170             88 GF-RS-ACTIVE                   VALUE IS  01.
000180             88 GF-RS-IN-SETUP                 VALUE IS  02.
000190         05  GF-VFF-02-1.
000200             07  GF-OCCR-CNT-NO  PIC 9(4)         COMP.
000210             07  GF-BILL-RTES.
000220                 09  GF-NGRP-BILL-RTE
000230                                 PIC 9(3)V99      COMP-3
000240                                                   OCCURS  0010
000250        TIMES INDEXED BY GFX-NGRP-BILL-RTE.
000260         05  GF-VFF-01-1
000270                       REDEFINES GF-VFF-02-1.
000280             07  GF-DBCR-VAL     PIC S9(3)V99     COMP-3.
000290             07  GF-GRP-BILL-RATE
000300                                 PIC 9(3)V99      COMP-3.
000310         05  GF-VFF-03-1
000320                       REDEFINES GF-VFF-02-1.
000330             07  GF-MAX-CHD-NO   PIC 9(2)         COMP-3.
000340             07  GF-CHD-RTE      PIC S9(3)V99     COMP-3.

