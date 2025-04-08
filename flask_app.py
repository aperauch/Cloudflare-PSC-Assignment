from flask import Flask, request, jsonify
app = Flask(__name__)

@app.route('/', methods=['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'])
def headers():
    # Retrieve all request headers
    headers_dict = dict(request.headers)
    # Return headers as JSON
    return jsonify(headers_dict)

if __name__ == '__main__':
    # Add the Let’s Encrypt public and private keys
    context = (r'./ssl/server.pem', r'./ssl/privkey.pem')
    # Modify the server to bind on port 443 and use the certs
    app.run(host='0.0.0.0', port=443, ssl_context=context)
