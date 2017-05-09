      * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
      *    COPYBOOK: P1ON.DT.STAR.COPYLIB(BHS1DEP)                    *
      * FOR SEGMENT: BHS1DEP                                          *
      * IN DATABASE: PCBHSPA0                                         *
      * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
       01 BHS1DEP-STRUCTURE-DATA-ITEM.
         05 CLS-KEY.
           10 CLS-PROC-PLAN-CD          PIC S9(4) COMP.
           10 CLS-EMP-ID                PIC X(13).
           10 CLS-EMP-ID-EXT            PIC X(6).
           10 CLS-KEY-FILLER            PIC X(1).
           10 CLS-DEP-NBR               PIC S9(4) COMP.
         05 CLS-CHUNK-ONE.
           10 CLS-FNAME                 PIC X(10).
           10 CLS-REL                   PIC X(2).
           10 CLS-LNAME                 PIC X(20).
         05 CLS-DOB                     PIC S9(8) COMP.
         05 CLS-CHUNK-TWO.
           10 CLS-CENT-IND-DEP          PIC X(1).
           10 CLS-SEX                   PIC X(1).
         05 FILLER                      PIC X(2).
         05 CLS-DATE                    PIC S9(8) COMP.
         05 CLS-CHUNK-THREE.
           10 CLS-TIME                  PIC S9(8) COMP
