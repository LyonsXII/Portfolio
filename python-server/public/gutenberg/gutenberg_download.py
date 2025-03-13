import os

os.system('apt install libdb5.3-dev')
os.system('pip install gutenberg')
os.system('pip install requests')

import pandas as pd
import requests
import numpy as np
from bs4 import BeautifulSoup
from urllib.request import urlopen
from gutenberg.acquire import load_etext
from gutenberg.cleanup import strip_headers

# only removes funny tokens for English texts
def remove_funny_tokens(text):
    tokens = text.split()
    sample = ' '.join(' '.join(tokens).replace('xe2x80x9c', ' ').replace('xe2x80x9d', ' ')\
                                      .replace('xe2x80x94', ' ').replace('xe2x80x99', "'")\
                                      .replace('xe2x80x98', "'").split())
    return sample

# clean newlines, carriage returns and tabs
def clean_text(text):
    cleaned_listed_text = []
    listed_text = list(text)

    for iter in range(len(listed_text) - 1):
        if (listed_text[iter] == '\\' and listed_text[iter + 1] == 'n') or \
            (listed_text[iter] == 'n' and listed_text[iter - 1] == '\\'):
            continue
        elif listed_text[iter] == '\\' and listed_text[iter + 1] == 'r' or \
            (listed_text[iter] == 'r' and listed_text[iter - 1] == '\\'):
            continue
        elif listed_text[iter] == '\\' and listed_text[iter + 1] == 't' or \
            (listed_text[iter] == 't' and listed_text[iter - 1] == '\\'):
            continue
        elif listed_text[iter] == '\\':
            continue
        else:
            cleaned_listed_text.append(listed_text[iter])

    cleaned_text = ''.join([str(char) for char in cleaned_listed_text])
    cleaned_text = remove_funny_tokens(cleaned_text)

    return ''.join(cleaned_text)

# Ensure output directory exists
os.makedirs("books", exist_ok=True)

# Open metadata file
df_metadata = pd.read_csv('gutenberg_metadata.csv')

# Remove row if no author listed, data not useful as training data
df_metadata = df_metadata.dropna(subset=['Author'])
df_metadata = df_metadata[df_metadata['Author'].str.strip() != ""]

# Create list for updated metadata (includes file paths / whether data is missing)
updated_metadata_list = []

for key, row in df_metadata.iterrows():
    book_id = int(row['Link'].split('/')[-1])
    text_file_path = f"books/{book_id}.txt"

    # Skip if file already downloaded (book falls under multiple categories e.g. animals, animals-wild)
    if os.path.exists(text_file_path):
        continue
    
    text = np.nan
    try:
        # Download text using project gutenberg API
        text = strip_headers(load_etext(etextno=book_id, 
                                        mirror='http://www.mirrorservice.org/sites/ftp.ibiblio.org/pub/docs/books/gutenberg/')).strip()
        text = ' '.join(' '.join(' '.join(text.split('\n')).split('\t')).split('\r'))
        text = ' '.join(text.split())
        text = clean_text(str(text))
    except:
        try:
            # Fetch plain text via web scraping 
            page = requests.get(row['Link'])
            soup = BeautifulSoup(page.content, 'html.parser')
            text_link = 'http://www.gutenberg.org' + soup.find_all("a", string="Plain Text UTF-8")[0]['href']
            http_response_object = urlopen(text_link)

            text = strip_headers(str(http_response_object.read()))
            text = ' '.join(' '.join(' '.join(text.split('\n')).split('\t')).split('\r'))
            text = ' '.join(text.split())
            text = clean_text(str(text))
        except:
            print("Couldn't acquire text for " + row['Title'] + ' with ID ' + str(book_id) + '. Link: ' + row['Link'])
            
    if text and isinstance(text, str) and text.strip() != "":
        # Save text to file
        try:
          with open(text_file_path, "w", encoding="utf-8") as f:
              f.write(text)
        except:
            # print(f'Failed to write file: {book_id}')
            continue
    else:
        continue

    # Store metadata
    updated_metadata_list.append({
        "ID": book_id,
        "Author": row['Author'],
        "Title": row['Title'],
        "Bookshelf": row['Bookshelf'],
        "Text File": text_file_path
    })

# Save updated metadata to CSV
df_updated_metadata = pd.DataFrame(updated_metadata_list)
df_updated_metadata.to_csv("gutenberg_updated_metadata.csv", index=False)

print(f'{len(df_updated_metadata)} books downloaded.')