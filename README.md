# ecfr-prepare

Downloads and converts the eCFR to JSON format.

# Prerequisites

- Java Runtime: ```sudo apt-get install default-jre```
- Node.js v16: https://github.com/nvm-sh/nvm

# Download and Convert the content

Just run the following command:

```bash
./acquire.sh
```

This will create a ```parts``` folder in the same directory of all the json sections.

The folder structure follows the title hierarchy with appropriately named files and metadata breakout in the respective documents.

# Using the content

The output JSON format can be imported and used with the Vespa search engine.

If you're using this with https://github.com/maxdotio/mighty-batch, then once the conversion is done simply move the parts folder: ```mv parts ~/path/to/mighty-batch/```

# License

Apache 2.0

# Third-party Notice

This repository contains and distributes a mirror of the Saxon XPath processor, under the Mozilla Public License, copyright James Clark.

See https://github.com/maxdotio/ecfr-prepare/tree/main/saxon/notices for more information.