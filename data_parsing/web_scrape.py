from selenium import webdriver
from selenium.webdriver.common.keys import Keys #import this to acces simple keyboard keys via selenium
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from bs4 import BeautifulSoup
import pandas as pd

PATH = "D:\Program Files (x86)\chromedriver.exe" #path for chromedriver executional file so that selenium can run through it.
#options = webdriver.ChromeOptions()
#options.add_argument('--incognito')
#options.add_argument('--headless') #to make it without actually opening browser

driver = webdriver.Chrome(PATH)
#------------------------------------------------old columns
amazon_index = []
image_url = []
title = []
author = []
price = []
category_id = []
category_name = []
#------------------------------------------------new columns
price = [] #List to store price of a books
release_date = [] #List to store price of a books
description = [] #info about book
# driver.get("https://www.amazon.com/b?node=283155")
# print(driver.title)

# #searching for a books.
# search = driver.find_element_by_id("twotabsearchtextbox")
# search.send_keys("1451685246")
# search.send_keys(Keys.RETURN)
driver.get("https://www.amazon.com/s?k=" + "1451685246" + "&i=stripbooks-intl-ship&ref=nb_sb_noss")
# try:
#     element = WebDriverWait(driver, 10).until(
#         EC.presence_of_element_located((By.CLASS_NAME, 'a-offscreen'))
#     )
# except:
#     driver.quit()
# print("SUCCCEEEEEEEEEEEEEEEEEESSSSSSSSSSSSSSSSSSSFFFFFFFFUUUUUUUUULLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLl")

# cururl = driver.current_url
# driver.get(cururl)

content = driver.page_source
soup = BeautifulSoup(content, features="html.parser")

soup_price = soup.find(name='div', attrs={'data-index':'0'}).find(name='span', attrs={'class':'a-offscreen'})
#<span class="a-offscreen">$7.49</span>
if soup_price is not None:
    print(soup_price.text)
else:
    print("Can't find the price")
    soup_price = ""

soup_date = soup.find(name='div', attrs={'data-index':'0'}).find(name='div', attrs={'class':'a-row'}).find(name='span', attrs={'class':'a-text-normal', 'dir':'auto'})
if soup_date is not None:
    print(soup_date.text)
else:
    print("Can't find date")
    soup_date = ""
#<span class="a-size-base a-color-secondary a-text-normal" dir="auto">Sep 23, 2014</span>
