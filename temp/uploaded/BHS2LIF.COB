      * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
      *    COPYBOOK: P1ON.DT.STAR.COPYLIB(BHS2LIF)                    *
      * FOR SEGMENT: BHS2LIF                                          *
      * IN DATABASE: PCBHSPA0                                         *
      * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
       01 BHS2LIF-STRUCTURE-DATA-ITEM.
         05 LFT-KEY.
           10 LFT-GRP-NBR               PIC X(9).
           10 LFT-BEN-CD                PIC X(9).
           10 LFT-TIER                  PIC X(1).
           10 LFT-KEY-FILLER            PIC X(1).
         05 LFT-MED-LFT-1               PIC S9(8) COMP.
         05 LFT-MED-LFT-ADJ-1           PIC S9(8) COMP.
         05 LFT-MED-LFT-YR-1            PIC S9(4) COMP.
         05 LFT-REIMT-FLEX-AMT-1        PIC S9(4) COMP.
         05 LFT-REIM-FLX-AMT-SPT-1      PIC S9(8) COMP.
         05 LFT-REIM-APP-LFT-AMT-1      PIC S9(8) COMP.
         05 LFT-MED-LFT-2               PIC S9(8) COMP.
         05 LFT-MED-LFT-ADJ-2           PIC S9(8) COMP.
         05 LFT-MED-LFT-YR-2            PIC S9(4) COMP.
         05 LFT-REIMT-FLEX-AMT-2        PIC S9(4) COMP.
         05 LFT-REIM-FLX-AMT-SPT-2      PIC S9(8) COMP.
         05 LFT-REIM-APP-LFT-AMT-2      PIC S9(8) COMP.
         05 LFT-MED-LFT-3               PIC S9(8) COMP.
         05 LFT-MED-LFT-ADJ-3           PIC S9(8) COMP.
         05 LFT-MED-LFT-YR-3            PIC S9(4) COMP.
         05 LFT-REIMT-FLEX-AMT-3        PIC S9(4) COMP.
         05 LFT-REIM-FLX-AMT-SPT-3      PIC S9(8) COMP.
         05 LFT-REIM-APP-LFT-AMT-3      PIC S9(8) COMP.
         05 LFT-PSY-LFT                 PIC S9(8) COMP.
         05 LFT-REIMT-CT                PIC S9(4) COMP.
         05 FILLER                      PIC X(14)
