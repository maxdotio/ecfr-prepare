#!/bin/bash

#Get the XML
#mkdir xml
#cd xml
#wget -i ../ecfr_urls.txt
#cd ..

#Transform the XML to JSON
mkdir ecfr
for i in {1..50}
do
	echo $i
	java -jar saxon/saxon-he-10.5.jar -s:xml/ECFR-title$i.xml -xsl:ecfr2vespa.xslt -o:ecfr/title$i.json
done

