docker run -m 12G --detach --name vespa-ecfr --hostname vespa-ecfr \
    --publish 8080:8080 --publish 19112:19112 --publish 19071:19071 \
    vespaengine/vespa