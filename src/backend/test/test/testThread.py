s = str(input())
res = int(s.replace(s[0], ''))
ans = s[0]
for i in range(1, len(s)):
   tmp = s[i]
   s = int(s.replace(s[i], ''))
   if s < res:
      res = s
      s = str(s)
      s = s[:i] + tmp + s[i:]
      ans = tmp
   else:
      s = str(s)
      s = s[:i] + tmp + s[i:]
   print(ans)


# Create two threads as follows
# while 1:
#    try:
#       _thread.start_new_thread( print_time, ("Thread-1", 2, ) )
#       _thread.start_new_thread( print_time, ("Thread-2", 4, ) )
#    except:
#       print("Error: unable to start thread")

# print('ok')