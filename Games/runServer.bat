@echo off
cd C:\Users\Joakim\Documents\GitHub\Zaitzer.github.io\Games\
start chrome http://10.0.0.123:8080/motemikser.html
python -m http.server 8080 --bind 10.0.0.123
