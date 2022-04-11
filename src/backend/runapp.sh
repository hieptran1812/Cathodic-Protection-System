#!/bin/bash

while true
do
   currentDate=`date +"%T"`
   echo $currentDate
   if [[ "$currentDate" ==  "19:20:00" ]]; then
      echo "========schedule restart backend=========="
      PID=`lsof -i :5000 | awk '{print $2}'`
      echo $PID
      if [[ "" !=  "$PID" ]]; then
       sleep 2s
       echo "killing $PID"
       kill -9 $PID
       sleep 3s
       echo "$PID killed and start app.py"
       nohup python3 app.py &
       sleep2s
       echo "started app.py"
      fi
   fi
done

# ps -ef | grep python3 app.py | grep -v grep | awk '{print $2}' | xargs kill



# nohup python3 app.py &