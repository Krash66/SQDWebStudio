--------------------------------------------------------
--           PROJECT: Bella
--       ENVIRONMENT: Env1
--            SYSTEM: sysOra
--------------------------------------------------------
JOBNAME BellaUN;
REPORT engRep1 EVERY 100;
COMMIT EVERY 50 FORCE;
DATEFORMAT ISO;

RDBMS DB2 db2Out;

-- ------------------------------------------------------
--           Data Definition Section
-- ------------------------------------------------------

DESCRIPTION SQLDDL
/+
CREATE TABLE CATDLVY
(
    CADLVY_CACC_NO   CHAR(7)   
   ,CADLVY_CD        CHAR(2)   
   ,CADLVY_SEQ       NUMBER(5) 
   ,CADLVY_ID1       CHAR(9) 
   ,CADLVY_ID2       CHAR(50)
   ,CADLVY_UPDT_LOGN CHAR(8) 
   ,CADLVY_UPDT_DTM  CHAR(26)
   ,CADLVY_COMP1     CHAR(2) 
   ,CADLVY_COMP2     CHAR(2) 
   ,CADLVY_COMP3     CHAR(2) 
   ,CADLVY_COMP4     CHAR(2) 
   ,CADLVY_COMP5     CHAR(2) 
   ,CADLVY_COMP6     CHAR(2) 
   ,CADLVY_COMP7     CHAR(2) 
   ,CADLVY_COMP8     CHAR(2) 
   ,CADLVY_COMP9     CHAR(2) 
   ,CADLVY_COMP10    CHAR(2) 
   ,CADLVY_COMP11    CHAR(2) 
   ,CADLVY_COMP12    CHAR(2) 
   ,CADLVY_COMP13    CHAR(2) 
   ,CADLVY_COMP14    CHAR(2) 
);+/
              AS o_CATDLVY;

-- ------------------ *** Exception Datastore *** ------------------------
DATASTORE cdc://OraHost/CDCExcept/CDCUNLOAD OF BINARY AS EX_CDCUNLOAD DESCRIBED BY DUMMY;

DATASTORE cdc://OraHost:3333/OraSYS/BellaUN
          OF HSSUNLOAD
          AS CDCUNLOAD
          DESCRIBED BY
                    o_CATDLVY
;

DESCRIPTION SQLDDL
/+
CREATE TABLE CATDLVY
(
  CADLVY_CACC_NO                 DECIMAL(7, 0)  NOT NULL,
  CADLVY_CD                      CHAR(2)        NOT NULL,
  CADLVY_SEQ                     DECIMAL(5, 0)  NOT NULL,
  CADLVY_ID1                     CHAR(9),
  CADLVY_ID2                     CHAR(50),
  CADLVY_UPDT_LOGN               CHAR(8)        NOT NULL,
  CADLVY_UPDT_DTM                TIMESTAMP      NOT NULL,
  CADLVY_COMP1                   CHAR(2)        NOT NULL,
  CADLVY_COMP2                   CHAR(2)        NOT NULL,
  CADLVY_COMP3                   CHAR(2)        NOT NULL,
  CADLVY_COMP4                   CHAR(2)        NOT NULL,
  CADLVY_COMP5                   CHAR(2)        NOT NULL,
  CADLVY_COMP6                   CHAR(2)        NOT NULL,
  CADLVY_COMP7                   CHAR(2)        NOT NULL,
  CADLVY_COMP8                   CHAR(2)        NOT NULL,
  CADLVY_COMP9                   CHAR(2)        NOT NULL,
  CADLVY_COMP10                  CHAR(2)        NOT NULL,
  CADLVY_COMP11                  CHAR(2)        NOT NULL,
  CADLVY_COMP12                  CHAR(2)        NOT NULL,
  CADLVY_COMP13                  CHAR(2)        NOT NULL,
  CADLVY_COMP14                  CHAR(2)        NOT NULL
)+/
              AS CATDLVY;

DATASTORE TargetTBL
          OF Relational
          AS Tdb2
          DESCRIBED BY
                    CATDLVY
          FOR Change
;

-- ------------------------------------------------------
--           Field Specification Section
-- ------------------------------------------------------

-- ------------------------------------------------------
--           Procedure Section
-- ------------------------------------------------------

CREATE PROC UnProc AS SELECT
{
     .CADLVY_CACC_NO  =  .CADLVY_CACC_NO
     .CADLVY_CD  =  .CADLVY_CD
     .CADLVY_SEQ  =  .CADLVY_SEQ
     .CADLVY_ID1  =  .CADLVY_ID1
     .CADLVY_ID2  =  .CADLVY_ID2
     .CADLVY_UPDT_LOGN  =  .CADLVY_UPDT_LOGN
     .CADLVY_UPDT_DTM  =  .CADLVY_UPDT_DTM
     .CADLVY_COMP1  =  .CADLVY_COMP1
     .CADLVY_COMP2  =  .CADLVY_COMP2
     .CADLVY_COMP3  =  .CADLVY_COMP3
     .CADLVY_COMP4  =  .CADLVY_COMP4
     .CADLVY_COMP5  =  .CADLVY_COMP5
     .CADLVY_COMP6  =  .CADLVY_COMP6
     .CADLVY_COMP7  =  .CADLVY_COMP7
     .CADLVY_COMP8  =  .CADLVY_COMP8
     .CADLVY_COMP9  =  .CADLVY_COMP9
     .CADLVY_COMP10  =  .CADLVY_COMP10
     .CADLVY_COMP11  =  .CADLVY_COMP11
     .CADLVY_COMP12  =  .CADLVY_COMP12
     .CADLVY_COMP13  =  .CADLVY_COMP13
     .CADLVY_COMP14  =  .CADLVY_COMP14
}
FROM CDCUNLOAD;


-- ------------------------------------------------------
--           Main Section
-- ------------------------------------------------------

PROCESS INTO
       Tdb2
SELECT
{
{
    CALLPROC(UnProc)
}

}
FROM CDCUNLOAD;
