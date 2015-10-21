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
                list['entries'].append(entry.replace('\n', ''))
            lists.append(list)

        return json.dumps(lists)
    else:
        abort(405)

@app.route('/api/v1/lists/<list>', methods=['POST'])
def save_list(list):
    lines = None
    if request.method == 'POST':
        file = open_file('%s/%s/%s' % (os.getcwd(), lists_dir, list))
        lines = load_json(request.form['data'])
        return write_file(file, lines)
    else:
        abort(405)

def open_file(path):
    try:
        file = open(path, 'w')
        return file
    except:
        return 'Invalid file specified.  Please create file on server as %s/%s/%s before attempting to save list entries to it.' % (os.getcwd(), lists_dir, list)

def load_json(json_string):
    try:
        lines = json.loads(json_string)
        return lines
    except:
        return 'Invalid JSON submitted'

def write_file(file, lines):
    try:
        for line in lines:
            file.write("%s\n" % line)
        file.close()
        return 'List written successfully'
    except Exception, e:
        return 'Could not write lines to file: %s' % e

