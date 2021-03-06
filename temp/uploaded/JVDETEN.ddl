CREATE TABLE JVDETEN
(
    JVMAST_JVDETEN_ADM_DATE9      CHAR(8)        NOT NULL
   ,JVMAST_JVDETEN_DET_TIME       CHAR(4)        NOT NULL
   ,JVMAST_JVDETEN_DET_REASON     CHAR(2)        NOT NULL
   ,JVMAST_JVDETEN_DET_STATUS     CHAR(2)        NOT NULL
   ,JVMAST_JVDETEN_CASEWORKER     CHAR(4)        NOT NULL
   ,JVMAST_JVDETEN_DA_MO          CHAR(2)        NOT NULL
   ,JVMAST_JVDETEN_DA_DAY         CHAR(2)        NOT NULL
   ,JVMAST_JVDETEN_HEARING_TYPE   CHAR(4)        NOT NULL
   ,JVMAST_JVDETEN_HEARING_MO     CHAR(2)        NOT NULL
   ,JVMAST_JVDETEN_HEARING_DAY    CHAR(2)        NOT NULL
   ,JVMAST_JVDETEN_HEARING_RESULT CHAR(4)        NOT NULL
   ,JVMAST_JVDETEN_HR_MO_1        CHAR(2)        NOT NULL
   ,JVMAST_JVDETEN_HR_DAY_1       CHAR(2)        NOT NULL
   ,JVMAST_JVDETEN_HR_MO_2        CHAR(2)        NOT NULL
   ,JVMAST_JVDETEN_HR_DAY_2       CHAR(2)        NOT NULL
   ,JVMAST_JVDETEN_HR_MO_3        CHAR(2)        NOT NULL
   ,JVMAST_JVDETEN_HR_DAY_3       CHAR(2)        NOT NULL
   ,JVMAST_JVDETEN_HR_MO_4        CHAR(2)        NOT NULL
   ,JVMAST_JVDETEN_HR_DAY_4       CHAR(2)        NOT NULL
   ,JVMAST_JVDETEN_HR_MO_5        CHAR(2)        NOT NULL
   ,JVMAST_JVDETEN_HR_DAY_5       CHAR(2)        NOT NULL
   ,JVMAST_JVDETEN_REL_DATE9      CHAR(8)        NOT NULL
   ,JVMAST_JVDETEN_REL_HRS        CHAR(2)        NOT NULL
   ,JVMAST_JVDETEN_REL_MIN        CHAR(2)        NOT NULL
   ,JVMAST_JVDETEN_RELEASED_TO    CHAR(30)       NOT NULL
   ,JVMAST_JVDETEN_REL_TO_RELAT   CHAR(2)        NOT NULL
   ,JVMAST_JVDETEN_1ST_OFFENSE    CHAR(5)        NOT NULL
   ,JVMAST_JVDETEN_2ND_OFFENSE    CHAR(5)        NOT NULL
   ,JVMAST_JVDETEN_OUT_OF_COUNTY  CHAR(1)        NOT NULL
   ,JVMAST_JVDETEN_TYC            CHAR(1)        NOT NULL
   ,JVMAST_JVDETEN_INS            CHAR(1)        NOT NULL
   ,JVMAST_JVDETEN_LEVEL          CHAR(1)        NOT NULL
   ,JVMAST_JVDETEN_RATING         CHAR(1)        NOT NULL
   ,JVMAST_JVDETEN_DET_WING       CHAR(1)        NOT NULL
   ,JVMAST_JVDETEN_DET_ROOM       CHAR(2)        NOT NULL
   ,JVMAST_JVDETEN_ATTORNEY_VISIT CHAR(2)        NOT NULL
   ,JVMAST_JVDETEN_ATTORNEY_CALL  CHAR(2)        NOT NULL
   ,JVMAST_JVDETEN_ATTY_VISIT_DATECHAR(16)       NOT NULL
   ,JVMAST_JVDETEN_VISIT_YEAR     CHAR(4)        NOT NULL
   ,JVMAST_JVDETEN_VISIT_MONTH    CHAR(2)        NOT NULL
   ,JVMAST_JVDETEN_VISIT_DAY      CHAR(2)        NOT NULL
   ,JVMAST_JVDETEN_ATTY_CALL_DATE CHAR(16)       NOT NULL
   ,JVMAST_JVDETEN_CALL_YEAR      CHAR(4)        NOT NULL
   ,JVMAST_JVDETEN_CALL_MONTH     CHAR(2)        NOT NULL
   ,JVMAST_JVDETEN_CALL_DAY       CHAR(2)        NOT NULL
   ,JVMAST_JVDETEN_VIS_REL_1      CHAR(2)        NOT NULL
   ,JVMAST_JVDETEN_COUNSELOR_VISITCHAR(2)        NOT NULL
   ,JVMAST_JVDETEN_FAMILY_VISIT   CHAR(2)        NOT NULL
   ,JVMAST_JVDETEN_SP_VIS_2       CHAR(26)       NOT NULL
   ,JVMAST_JVDETEN_VIS_REL_2      CHAR(2)        NOT NULL
   ,JVMAST_JVDETEN_NUM_VISITS     CHAR(2)        NOT NULL
   ,JVMAST_JVDETEN_DISPLINARY     CHAR(1)        NOT NULL
   ,JVMAST_JVDETEN_EXTRA_SUPER    CHAR(1)        NOT NULL
   ,JVMAST_JVDETEN_SRO            CHAR(1)        NOT NULL
   ,JVMAST_JVDETEN_NOTE_1         CHAR(70)       NOT NULL
   ,JVMAST_JVDETEN_NOTE_2         CHAR(70)       NOT NULL
   ,JVMAST_JVDETEN_NOTE_3         CHAR(25)       NOT NULL
   ,JVMAST_JVDETEN_FINAL_FLAG     CHAR(1)        NOT NULL
   ,JVMAST_JVDETEN_NON_SECURE     CHAR(1)        NOT NULL
   ,JVMAST_JVDETEN_ATTORNEY       CHAR(4)        NOT NULL
   ,JVMAST_JVDETEN_ADM_DATE_TIME  CHAR(28)       NOT NULL
   ,OUTPUT_JVDETEN_ADM_DATE       CHAR(8)        NOT NULL
   ,OUTPUT_JVDETEN_ADM_HRS        CHAR(2)        NOT NULL
   ,OUTPUT_JVDETEN_ADM_MIN        CHAR(2)        NOT NULL
   ,OUTPUT_JVDETEN_ADM_SEC        CHAR(2)        NOT NULL
   ,OUTPUT_JVDETEN_REL_DATE_TIME  CHAR(28)       NOT NULL
   ,OUTPUT_JVDETEN_REL_DATE9      CHAR(8)        NOT NULL
   ,OUTPUT_JVDETEN_REL_HRS        CHAR(2)        NOT NULL
   ,OUTPUT_JVDETEN_REL_MIN        CHAR(2)        NOT NULL
   ,OUTPUT_JVDETEN_REL_SEC        CHAR(2)        NOT NULL
   ,JVDETEN                       CHAR(8)        NOT NULL
   ,DETTIME                       CHAR(4)        NOT NULL
   ,DETSTAT                       CHAR(2)        NOT NULL
   ,DETFROM                       CHAR(4)        NOT NULL
   ,DETPLACE                      CHAR(4)        NOT NULL
   ,DETRELS                       CHAR(8)        NOT NULL
   ,DETTYPE                       CHAR(3)        NOT NULL
   ,/SX001                        CHAR(0)        NOT NULL
   ,PFK_JVREFER                   CHAR(7)        NOT NULL
   ,PFK_JVCHILD                   CHAR(7)        NOT NULL
);
