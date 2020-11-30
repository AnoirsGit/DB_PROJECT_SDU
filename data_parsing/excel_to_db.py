import pandas as pd
from pandas import DataFrame, read_excel
import numpy as np
import cx_Oracle

book_df = pd.read_excel (r'D:\Users\Almas\Documents\GitHub\DB_PROJECT_SDU\data_parsing\book-listing(cleaned).xlsx')

try:
    #create connection
    #connect('user', 'password', 'host port and service')
    dsn = cx_Oracle.makedsn("localhost", 1521, sid="orcl")
    connection = cx_Oracle.connect("BOSS", "bosspassesbook", dsn, encoding="UTF-8")
except Exception as err:
    print('Error when connecting to database', err)
else:
    print(connection.version)
    try:
        cur = connection.cursor()
        sql_book_insert = """
        BEGIN
            
        END;
        """
