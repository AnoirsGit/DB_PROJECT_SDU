CREATE OR REPLACE PACKAGE books_pck AS
	PROCEDURE book_insert(
        p_amazond_index IN book.amazon_index%TYPE,
        p_image IN book.image%TYPE,
        p_image_url IN book.image_url%TYPE,
        p_title IN book.title%TYPE,
        p_author IN book.author%TYPE,
        p_price IN book.price%TYPE,
        p_date IN book.written_date%TYPE,
        p_category_id IN book.category_id%TYPE,
        p_category_name IN categories.category_name%TYPE
		);     
    TYPE cats_list IS TABLE OF VARCHAR2(100) INDEX BY BINARY_INTEGER;
END books_pck;
/

CREATE OR REPLACE PACKAGE BODY books_pck AS
	PROCEDURE book_insert(
        p_amazond_index IN book.amazon_index%TYPE,
        p_image IN book.image%TYPE,
        p_image_url IN book.image_url%TYPE,
        p_title IN book.title%TYPE,
        p_author IN book.author%TYPE,
        p_price IN book.price%TYPE,
        p_date IN book.written_date%TYPE,
        p_category_id IN book.category_id%TYPE,
        p_category_name IN categories.category_name%TYPE
	)
	AS
        c_list books_pck.cats_list;
        cnt NUMBER;
        i NUMBER := 0;
    BEGIN
        SELECT COUNT(*)
            INTO cnt
            FROM categories;
        WHILE i < cnt
        LOOP
            SELECT category_name 
                INTO c_list(i) 
                FROM categories WHERE category_id = i;
            i := i + 1;
        END LOOP;
        IF c_list.EXISTS(p_category_name) THEN
            DBMS_OUTPUT.PUT_LINE('this category already exists');
        ELSE
            INSERT INTO categories(
                category_id,
                category_name
            )
            VALUES(
                p_category_id,
                p_category_name
            );
        END IF;
        
		INSERT INTO book(
            amazon_index,
            image,
            image_url,
            title,
            author,
            price,
            category_id,
            written_date
		)
		VALUES(
            p_amazond_index,
            p_image,
            p_image_url,
            p_title,
            p_author,
            p_price,
            p_category_id,
            p_date
		);
		COMMIT;
	END book_insert;
END books_pck;
/
