var fs = require("fs");

var heads = {};

function get_heading_text(name,heads) {
	var heading = [];
	var cursor = name.split('_');
	while (cursor.length) {
		cursor.pop();
		cursor_name = cursor.join('_');
		if(heads[cursor_name]) heading.unshift(heads[cursor_name]);
	}
	heading_text = '> ' + heading.join(' > ');
	return heading_text;
}

function split_part_json(path,part,i) {
	//Parse the part and get the paragraph id (kept in 'name')
	var json = JSON.parse(part);
	var name = json.put.replace("id:ecfr:ecfr::","");
	if(!name.length) name = i.toString(); //Title root

	//Add the heading tree to the document
	heads[name] = json.fields.head;
	var heading = get_heading_text(name,heads);
	json.fields.heading = heading;
	json.fields.text = heading + '\n' + json.fields.p.join('\n');

	//Save the file in the title parts directory
	var outfile = path + name + ".json";
	fs.writeFileSync(outfile,JSON.stringify(json,null,2),"utf-8");
	return json;
}

function main() {
	for(var i=1;i<=50;i++) {
		if(i!=35) {
			var sep = "";
			var jsonl = "jsonl/title"+i+".jsonl"
			var infile = "ecfr/title"+i+".json"
			console.log("Loading:",infile)
			var raw = fs.readFileSync(infile,'utf-8');
			var parts = raw.split("😀");
			var path = "parts/"+i+"/";
			var errs = "parts_error/"+i+"_";
			console.log(parts.length);
			fs.mkdirSync(path, { recursive: true });
			fs.mkdirSync("parts_error/", { recursive: true });
			fs.mkdirSync("jsonl/", { recursive: true });
			heads = {};
			for(var j=0;j<parts.length;j++) {
				var json = null;
				try {
					json = split_part_json(path,parts[j],i);
				} catch {
					var req = /\s+"/g;
					var res = /\\/g;
					var reh = /-\n+/g;
					var rew = /(\w)\n+/g;
					var rer = /"\n+(\w)/g;
					var part = parts[j].replace(req,'\"').replace(res,'\\\\').replace(reh,'-').replace(rew,'$1').replace(rer,'"$1');
					try {
						json = split_part_json(path,part,i);
					} catch (ex) {
						var outfile = errs + j + ".txt";
						console.log(ex)
						var err = {"err":ex,"part":parts[j]}
						fs.writeFileSync(outfile,JSON.stringify(err),"utf-8");
					}
				}
				if (json) {
					var qjson = json.fields;
					qjson.id = json.put;
					fs.appendFileSync(jsonl, sep + JSON.stringify(qjson))
					sep = "\n";
				}
			}
		}
	}
}

main();