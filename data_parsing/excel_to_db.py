import pandas as pd
from pandas import DataFrame, read_excel
import numpy as np
import cx_Oracle

book_df = pd.read_excel (r'D:\Users\Almas\Documents\GitHub\DB_PROJECT_SDU\data_parsing\final_data.xlsx')

date_converter = {
    'jan': '0',
    'feb': '1',
    'mar': '2',
    'apr': '3',
    'may': '4',
    'jun': '5',
    'jul': '6',
    'aug': '7',
    'sep': '8',
    'oct': '9',
    'nov': '10',
    'dec': '11'
}

for i in range(0, len(book_df)):
    tmp_date = list(book_df.values[i, 7])
    tmp_data = date_converter[(book_df.at[i, 'date'][0:3]).lower()]
    tmp_date.pop(0) 
    tmp_date.pop(1)
    tmp_date[0] = tmp_data[0]
    output_str = "".join(tmp_date)
    book_df.at[i, 'date'] = output_str

try:
    #create connection
    #connect('user', 'password', 'host port and service')
    dsn = cx_Oracle.makedsn("localhost", 1521, sid="orcl")
    connection = cx_Oracle.connect("BOSS", "bosspassesbook", dsn)
except Exception as err:
    print('Error when connecting to database', err)
else:
    print(connection.version)
    try:
        cur = connection.cursor()
        sql_book_insert = """
        BEGIN
            books_pck.book_insert(:v_amazon_id, :v_img_url, :v_title, :v_author, :v_price, :v_cat_id, :v_date, :v_cat_name);
        END;
        """
        
        # for i in range(0, 1):
            # print(book_df.values[i, 1],book_df.values[i, 2],book_df.values[i, 3],book_df.values[i, 4],book_df.values[i, 5],book_df.values[i, 6],book_df.values[i, 7],book_df.values[i, 8])
        cur.execute(sql_book_insert,
                    v_amazon_id = str(book_df.values[0, 1]),
                    v_img_url = str(book_df.values[0, 2]),
                    v_title = str(book_df.values[0, 3]),
                    v_author = str(book_df.values[0, 4]),
                    v_price = str(book_df.values[0, 5]),
                    v_cat_id = int(book_df.values[0, 6]),
                    v_date = str(book_df.values[0, 7]),
                    v_cat_name = str(book_df.values[0, 8]))
    except Exception as nani:
        print('Error when inserting data to db', nani)

print()
print(type((book_df.values[0, 5])))