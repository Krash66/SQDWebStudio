CREATE TABLE JVCHILD
(
    JVMAST_JVCHILD_JPD            CHAR(7)        NOT NULL
   ,JVMAST_JVCHILD_MEDICAL_REL    CHAR(1)        NOT NULL
   ,JVMAST_JVCHILD_BILINGUAL      CHAR(1)        NOT NULL
   ,JVMAST_JVCHILD_CNTY_OF_RESID  CHAR(3)        NOT NULL
   ,JVMAST_JVCHILD_PROGRAM        CHAR(2)        NOT NULL
   ,JVMAST_JVCHILD_BIRTH_VER_BY   CHAR(1)        NOT NULL
   ,JVMAST_JVCHILD_PLACE_OF_BIRTH CHAR(20)       NOT NULL
   ,JVMAST_JVCHILD_HAIR_COLOR     CHAR(3)        NOT NULL
   ,JVMAST_JVCHILD_EYE_COLOR      CHAR(3)        NOT NULL
   ,JVMAST_JVCHILD_HEIGHT         CHAR(3)        NOT NULL
   ,JVMAST_JVCHILD_WEIGHT         CHAR(3)        NOT NULL
   ,JVMAST_JVCHILD_DISTING_MARKS  CHAR(25)       NOT NULL
   ,JVMAST_JVCHILD_MARITAL_STATUS CHAR(1)        NOT NULL
   ,JVMAST_JVCHILD_RELIG_PREF     CHAR(3)        NOT NULL
   ,JVMAST_JVCHILD_ADDRESS        CHAR(30)       NOT NULL
   ,JVMAST_JVCHILD_CITY           CHAR(15)       NOT NULL
   ,JVMAST_JVCHILD_STATE          CHAR(2)        NOT NULL
   ,JVMAST_JVCHILD_ZIP_CODE       CHAR(5)        NOT NULL
   ,JVMAST_JVCHILD_AREA_CODE      CHAR(3)        NOT NULL
   ,JVMAST_JVCHILD_PH_EXCH        CHAR(3)        NOT NULL
   ,JVMAST_JVCHILD_PH_LAST_4      CHAR(4)        NOT NULL
   ,JVMAST_JVCHILD_SCHOOL_STATUS  CHAR(2)        NOT NULL
   ,JVMAST_JVCHILD_CUR_LAST_GRADE CHAR(2)        NOT NULL
   ,JVMAST_JVCHILD_SCHOOL_ATTEND  CHAR(4)        NOT NULL
   ,JVMAST_JVCHILD_LIVES_WITH     CHAR(4)        NOT NULL
   ,JVMAST_JVCHILD_SIBLINGS       CHAR(2)        NOT NULL
   ,JVMAST_JVCHILD_EMPL_NAME      CHAR(25)       NOT NULL
   ,JVMAST_JVCHILD_WK_AREA_CODE   CHAR(3)        NOT NULL
   ,JVMAST_JVCHILD_WK_PH_EXCH     CHAR(3)        NOT NULL
   ,JVMAST_JVCHILD_WK_PH_LAST_4   CHAR(4)        NOT NULL
   ,JVMAST_JVCHILD_CHILD_GANG_CODECHAR(8)        NOT NULL
   ,JVMAST_JVCHILD_CITIZEN        CHAR(2)        NOT NULL
   ,JVMAST_JVCHILD_DANGER_SELF    CHAR(1)        NOT NULL
   ,JVMAST_JVCHILD_DANGER_OTHERS  CHAR(1)        NOT NULL
   ,JVMAST_JVCHILD_RUNAWAY_HOME   CHAR(1)        NOT NULL
   ,JVMAST_JVCHILD_RUNAWAY_PLACE  CHAR(1)        NOT NULL
   ,JVMAST_JVCHILD_SETS_FIRES     CHAR(1)        NOT NULL
   ,JVMAST_JVCHILD_PRIMARY_LANG   CHAR(3)        NOT NULL
   ,JVMAST_JVCHILD_SUBSTANCE_ABUSECHAR(1)        NOT NULL
   ,JVMAST_JVCHILD_ALCOHOL        CHAR(1)        NOT NULL
   ,JVMAST_JVCHILD_INHALANTS      CHAR(1)        NOT NULL
   ,JVMAST_JVCHILD_MARIJUANA      CHAR(1)        NOT NULL
   ,JVMAST_JVCHILD_COCAINE        CHAR(1)        NOT NULL
   ,JVMAST_JVCHILD_ABUSE_NEGLECT  CHAR(1)        NOT NULL
   ,JVMAST_JVCHILD_PHYSICAL       CHAR(1)        NOT NULL
   ,JVMAST_JVCHILD_SEXUAL         CHAR(1)        NOT NULL
   ,JVMAST_JVCHILD_EMOTIONAL      CHAR(1)        NOT NULL
   ,JVMAST_JVCHILD_NEGLECT        CHAR(1)        NOT NULL
   ,JVMAST_JVCHILD_ABANDONMENT    CHAR(1)        NOT NULL
   ,JVMAST_JVCHILD_FAM_GANG       CHAR(1)        NOT NULL
   ,JVMAST_JVCHILD_FAM_GANG_CODE  CHAR(3)        NOT NULL
   ,JVMAST_JVCHILD_SSN            CHAR(9)        NOT NULL
   ,JVMAST_JVCHILD_TDL_NO         CHAR(8)        NOT NULL
   ,JVMAST_JVCHILD_SEALED_STATUS  CHAR(1)        NOT NULL
   ,JVMAST_JVCHILD_WHOSE_PHONE    CHAR(30)       NOT NULL
   ,JVMAST_JVCHILD_LST_CHG_USER   CHAR(10)       NOT NULL
   ,JVMAST_JVCHILD_LST_CHG_DATE   CHAR(16)       NOT NULL
   ,JVMAST_JVCHILD_ASL_YEAR       CHAR(4)        NOT NULL
   ,JVMAST_JVCHILD_ASL_MONTH      CHAR(2)        NOT NULL
   ,JVMAST_JVCHILD_ASL_DAY        CHAR(2)        NOT NULL
   ,JVMAST_JVCHILD_ASL            CHAR(1)        NOT NULL
   ,JVMAST_JVCHILD_DOD            CHAR(16)       NOT NULL
   ,JVMAST_JVCHILD_DOD_YEAR       CHAR(4)        NOT NULL
   ,JVMAST_JVCHILD_DOD_MONTH      CHAR(2)        NOT NULL
   ,JVMAST_JVCHILD_DOD_DAY        CHAR(2)        NOT NULL
   ,JVMAST_JVCHILD_MAILING_ADDRESSCHAR(35)       NOT NULL
   ,JVMAST_JVCHILD_ARCHIVE        CHAR(5)        NOT NULL
   ,JVMAST_JVCHILD_SID            CHAR(8)        NOT NULL
   ,JVMAST_JVCHILD_REFER_SEQ      CHAR(3)        NOT NULL
   ,JVMAST_JVCHILD_DRUG_COURT     CHAR(1)        NOT NULL
   ,JVCHILD                       CHAR(7)        NOT NULL
   ,CRMARIT                       CHAR(1)        NOT NULL
   ,CRZIPCD                       CHAR(5)        NOT NULL
   ,CRSCHSTA                      CHAR(2)        NOT NULL
   ,CRSCHGRD                      CHAR(2)        NOT NULL
   ,CRCITZN                       CHAR(2)        NOT NULL
);
