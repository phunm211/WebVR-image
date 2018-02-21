VideoDir='./MOS' #'./session1'; './session2'
i=0
for entry in "$VideoDir"/*
do
  	echo "$entry"
	((i++))
	ListVideo=''$ListVideo'<option value="'$entry'">'$(basename "${entry%.*}")'</option>'
done
echo $i
sed -i "16s|.*|<select id=\"mylist\" size=\"$i\">$ListVideo</select>|" ./index.html
http-server -p 8000
