#! /bin/bash

# copy assets to the mount point
mkdir -p $STATICS_DEST
rsync -av --progress ./src/static $STATICS_DEST --exclude .git
echo "\n"
echo "--------------- finished copying statics ---------------"
