import os
import json

from flask import Flask, render_template, request
app = Flask(__name__)

lists_dir = 'app/var/lists'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/v1/lists/_all', methods=['GET'])
def get_lists():
    if request.method == 'GET':
        lists = []
        for file in os.listdir(lists_dir):
            list = {'name': file, 'entries': []}
            with open('%s/%s' % (lists_dir, file)) as f:
                content = f.readlines()
            for entry in content:
                list['entries'].append(entry)
            lists.append(list)

        return json.dumps(lists)
    else:
        abort(405)

@app.route('/api/v1/lists/<list>', methods=['POST'])
def save_list(list):
    if request.method == 'POST':
        try:
            file = open(lists_dir)
        except:
            return "Invalid file specified.  Please create file on server as %s/%s/%s before attempting to save list entries to it." % (os.getcwd(), lists_dir, list)
        try:
            lines = json.loads(request.form['data'])
            for line in lines:
                print line
            return json.dumps(lines)
        except:
            return "Invalid JSON submitted"
    else:
        abort(405)

