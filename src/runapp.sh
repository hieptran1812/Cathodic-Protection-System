#!/bin/bash

while true
do
   currentDate=`date +"%T"`
   echo $currentDate
   # cd ./backend
   PID=`ps -eaf | grep python3 app.py | grep -v grep | awk '{print $2}'`
   echo $PID
#    if [[ "" !=  "$PID" ]]; then
#       echo "killing $PID"
#       kill -9 $PID
#    fi
done

# ps -ef | grep python3 app.py | grep -v grep | awk '{print $2}' | xargs kill



# nohup python3 app.py &