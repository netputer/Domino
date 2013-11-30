#!/usr/bin/env bash
#====================================
# Domino start script
#====================================

_NODE_URL="http://nodejs.org/dist/v0.10.22/node-v0.10.22.pkg"

## check download command
DownloadCommand="wget"
which wget >/dev/null 2>&1
if [ $? -ne 0 ]
then

    which curl >/dev/null 2>&1
    if [ $? -ne 0 ]
    then
        echo "Can't find wget and curl, please check and try again"
        exit 1
    else
        DownloadCommand="curl"
    fi
fi

#====================================
# Download
#====================================
download() {
    _URL=$1;
    _TARGET=$2;

    echo -n "download [$_URL]......"
    if [ "$DownloadCommand" = "wget" ]; then
        wget -O "$_TARGET" "$_URL"
    else
        curl "$_URL" > "$_TARGET"
    fi

    if [ $? -ne 0 ]
    then
        echo "download $_URL error"
        exit 1
    else
        echo "ok"
    fi
}

download "$_NODE_URL" "node.pkg"
open "node.pkg"


#====================================
# install Domino
#====================================
installDomino() {
    npm i grunt-cli -g
    npm i yo -g
    npm i bower -g
    npm i generator-wdj -g
    gem sources --remove https://rubygems.org/
    gem sources --remove https://rubygems.org
    gem sources -a http://ruby.taobao.org
    gem install compass --pre
}
installDomino
