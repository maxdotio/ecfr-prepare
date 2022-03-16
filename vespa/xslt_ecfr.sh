#FILE=ecfr/title1.json
#xsltproc -o $FILE ../ecfr2vespa.xslt ../xml/ECFR-title1.xml
for i in {1..50} 
do 
	echo $i
	java -jar ../saxon/saxon-he-10.5.jar -s:../xml/ECFR-title$i.xml -xsl:../ecfr2vespa.xslt -o:ecfr/title$i.json
done
