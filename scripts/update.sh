#!/bin/bash

# Source and destination folders, relative to the scripts folder.
SRC=../../TaptOgFunnetApp-Core/www/
DEST=../www/

cp -Rv $SRC $DEST

echo "Files written to $DEST"
