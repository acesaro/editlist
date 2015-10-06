import os
import json

from flask import Flask, render_template
app = Flask(__name__)

lists_dir = 'app/var/lists'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/v1/lists/_all')
def lists_all():
    lists = []
    for file in os.listdir(lists_dir):
        list = {'name': file, 'entries': []}
        with open('%s/%s' % (lists_dir, file)) as f:
            content = f.readlines()
        for entry in content:
            list['entries'].append(entry)
        lists.append(list)

    return json.dumps(lists)

