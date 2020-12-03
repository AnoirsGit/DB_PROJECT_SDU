create or replace PACKAGE books_pck AS
    PROCEDURE book_insert(
        p_amazond_index IN book.amazon_index%TYPE,
        p_image_url IN book.image_url%TYPE,
        p_title IN book.title%TYPE,
        p_author IN book.author%TYPE,
        p_price IN book.price%TYPE,
        p_category_id IN book.category_id%TYPE,
        p_date IN VARCHAR2
        );
    PROCEDURE category_insert(
        p_category_name IN categories.category_name%TYPE
    );
    TYPE cats_list IS TABLE OF VARCHAR2(100) INDEX BY BINARY_INTEGER;
END books_pck;
/

create or replace PACKAGE BODY books_pck AS
    PROCEDURE book_insert(
        p_amazond_index IN book.amazon_index%TYPE,
        p_image_url IN book.image_url%TYPE,
        p_title IN book.title%TYPE,
        p_author IN book.author%TYPE,
        p_price IN book.price%TYPE,
        p_category_id IN book.category_id%TYPE,        
        p_date IN VARCHAR2
    )
    AS
    BEGIN
        INSERT INTO book(
            amazon_index,
            image_url,
            title,
            author,
            price,
            category_id,
            written_date
        )
        VALUES(
            p_amazond_index,
            p_image_url,
            p_title,
            p_author,
            p_price,
            p_category_id,
            to_date(p_date, 'MM/DD/YYYY')
        );
        COMMIT;
    END book_insert;

    PROCEDURE category_insert(
        p_category_name IN categories.category_name%TYPE
    )
    AS
        e_category_already_exists EXCEPTION;
        PRAGMA exception_init( e_category_already_exists, -20001 );
        c_list books_pck.cats_list;
        cnt NUMBER;
        i NUMBER := 1;
        j NUMBER := 1;
        v_check BOOLEAN;
    BEGIN
        SELECT COUNT(*)
            INTO cnt
            FROM categories;
            
        WHILE i <= cnt
        LOOP
            SELECT LOWER(category_name)
                INTO c_list(i)
                FROM categories WHERE category_id = i;
            i := i + 1;
        END LOOP;
    
        v_check := FALSE;
    
        WHILE j <= cnt LOOP
            --dbms_output.put_line(c_list(j));
            IF LOWER(c_list(j)) = LOWER(p_category_name) THEN v_check := TRUE;
            END IF;
            j := j + 1;
        END LOOP;
        
        IF v_check THEN
            DBMS_OUTPUT.PUT_LINE('this category already exists');
            RAISE e_category_already_exists;
        ELSE
            INSERT INTO categories(
                category_name
            )
            VALUES(
                p_category_name
            );
            COMMIT;
        END IF;
    END category_insert;
END books_pck;
/