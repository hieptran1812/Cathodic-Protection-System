#!/bin/bash



# PID=`ps -eaf | grep python3 app.py | grep -v grep | awk '{print $2}'`
# if [[ "" !=  "$PID" ]]; then
#   echo "killing $PID"
#   kill -9 $PID
# fi

currentDate=`date`
echo $currentDate


# ps -ef | grep python3 app.py | grep -v grep | awk '{print $2}' | xargs kill

# cd ./backend

# nohup python3 app.py &