from selenium import webdriver
from bs4 import BeautifulSoup
import pandas as pd

driver = webdriver.Chrome()

price = [] #List to store 
release_date = [] #List to store price of the product
driver.get("")