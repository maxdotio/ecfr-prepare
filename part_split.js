var fs = require("fs");

function main() {
	for(var i=1;i<=50;i++) {
		if(i!=35) {
			var infile = "ecfr/title"+i+".json"
			console.log("Loading:",infile)
			var raw = fs.readFileSync(infile,'utf-8');
			var parts = raw.split("😀");
			var path = "parts/"+i+"/";
			var errs = "parts_error/"+i+"_";
			console.log(parts.length);
			fs.mkdirSync(path, { recursive: true });
			fs.mkdirSync("parts_error/", { recursive: true });
			for(var j=0;j<parts.length;j++) {
				try {
					var json = JSON.parse(parts[j]);
					var name = json.put.replace("id:ecfr:ecfr::","");
					if(!name.length) name = i;
					var outfile = path + name + ".json";
					fs.writeFileSync(outfile,JSON.stringify(json,null,2),"utf-8");
				} catch {
					var req = /\s+"/g;
					var res = /\\/g;
					var reh = /-\n+/g;
					var rew = /(\w)\n+/g;
					var rer = /"\n+(\w)/g;
					var part = parts[j].replace(req,'\"').replace(res,'\\\\').replace(reh,'-').replace(rew,'$1').replace(rer,'"$1');
					try {
						var json = JSON.parse(part);
						var name = json.put.replace("id:ecfr:ecfr::","");
						if(!name.length) name = i;
						var outfile = path + name + ".json";
						fs.writeFileSync(outfile,JSON.stringify(json,null,2),"utf-8");
					} catch {
						var outfile = errs + j + ".txt";
						fs.writeFileSync(outfile,parts[j],"utf-8");
					}
				}
			}
		}
	}
}

main();