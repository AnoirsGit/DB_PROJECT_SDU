CREATE TABLE Userss (
	user_id NUMBER NOT NULL,
	nickname VARCHAR2(100) UNIQUE NOT NULL,
	pass VARCHAR2(100) NOT NULL, --maybe wil store in hash for better security.
	phone_number NUMBER NOT NULL,
	CONSTRAINT userss_pk PRIMARY KEY (user_id)
);

/*These sequence and trigger below are used for an auto incrementation for the user_id*/
CREATE SEQUENCE USERSS_USER_ID_SEQ;

CREATE TRIGGER T_USERSS_USER_ID
  BEFORE INSERT ON Userss
  FOR EACH ROW
BEGIN
  SELECT USERSS_USER_ID_SEQ.NEXTVAL
  INTO :NEW.user_id
  FROM dual;
END;
/

CREATE TABLE Book (
	amazon_index NUMBER NOT NULL,
	image BLOB NOT NULL,
	image_url VARCHAR2(100) NOT NULL,
	title VARCHAR2(100) NOT NULL,
	author VARCHAR2(100) NOT NULL,
	price NUMBER(5,2) DEFAULT 0,
	category_id NUMBER NOT NULL,
	CONSTRAINT BOOK_PK PRIMARY KEY (amazon_index)
);
/

CREATE TABLE Categories (
	category_id NUMBER NOT NULL,
	category_name VARCHAR2(100) UNIQUE NOT NULL,
	CONSTRAINT CATEGORIES_PK PRIMARY KEY (category_id)
);

/*These sequence and trigger are used for auto incrementation for the catefory_id*/
CREATE SEQUENCE CATEGORIES_CATEGORY_ID_SEQ;

CREATE TRIGGER T_CATEGORIES_CATEGORY_ID
  BEFORE INSERT ON Categories
  FOR EACH ROW
BEGIN
  SELECT CATEGORIES_CATEGORY_ID_SEQ.NEXTVAL
  INTO :NEW.category_id
  FROM dual;
END;
/

--This table is connecting table for the every user and its books in its basket.
CREATE TABLE Basket (
	user_id NUMBER NOT NULL,
	amazon_index NUMBER NOT NULL);
/

--foregin key for Book table.
ALTER TABLE Book ADD CONSTRAINT Book_fk0 FOREIGN KEY (category_id) REFERENCES Categories(category_id);

--foregin keys for Basket table.
ALTER TABLE Basket ADD CONSTRAINT Basket_fk0 FOREIGN KEY (user_id) REFERENCES Userss(user_id);
ALTER TABLE Basket ADD CONSTRAINT Basket_fk1 FOREIGN KEY (amazon_index) REFERENCES Book(amazon_index);

/*
**********************
* 4 tables for now.
* 2 triggers.
* 2 sequences.
**********************
*/