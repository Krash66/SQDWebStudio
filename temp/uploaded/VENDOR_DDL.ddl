CREATE TABLE VENDOR
(
    VENDID                        CHAR(3)        NOT NULL
   ,VEND_NAME                     CHAR(10)       NOT NULL
   ,VEND_COMPANY                  CHAR(10)       NOT NULL
   ,VEND_ADDRESS                  CHAR(20)       NOT NULL
   ,VEND_CITY                     CHAR(10)       NOT NULL
   ,VEND_STATE                    CHAR(2)        NOT NULL
   ,VEND_ZIP                      CHAR(5)        NOT NULL
   ,VENDZIP                       CHAR(5)        NOT NULL
   ,PFK_COMPNAME                  CHAR(10)       NOT NULL
);
