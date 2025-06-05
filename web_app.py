#!/usr/bin/env python3
"""
Simple HTTP server for serving the mini web app
This is used for local development and testing
"""

import http.server
import socketserver
import os
from pathlib import Path

PORT = 5000
DIRECTORY = "static"

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Add security headers
        self.send_header('X-Frame-Options', 'ALLOWALL')
        self.send_header('X-Content-Type-Options', 'nosniff')
        super().end_headers()

def main():
    """Start the web server"""
    # Change to project directory
    os.chdir(Path(__file__).parent)
    
    with socketserver.TCPServer(("0.0.0.0", PORT), MyHTTPRequestHandler) as httpd:
        print(f"Serving mini web app at http://0.0.0.0:{PORT}")
        print(f"Directory: {os.path.abspath(DIRECTORY)}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server...")
            httpd.shutdown()

if __name__ == "__main__":
    main()
