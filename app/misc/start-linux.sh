#!/usr/bin/env bash
#====================================
# Domino start script
#====================================

_NODE_URL="http://nodejs.org/dist/v0.10.22/node-v0.10.22.tar.gz"

allpass='0'
checkfunc(){

    which $1
    if [ "$?" = "1" ]; then
        echo "Can't find command {$1}"
        allpass='1'
    fi
}
checkfunc "autoconf"
checkfunc "make"
checkfunc "python"
checkfunc "gcc"

if [ "$allpass" = "1" ]; then
    echo 'Please install these command then try again'
    exit 1
else
    echo 'Commond check complate!'
fi


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

download "$_NODE_URL" "node.tar.gz"
tar -zxvf node.tar.gz
_DIR=`ls -l | grep ^d | awk '{print $NF}'`


#====================================
# compare
#====================================
compare() {
    cd $_DIR
    ./configure
    make
    make install
}
compare

#====================================
# install Domino
#====================================
installDomino() {
    npm i grunt-cli -g
    npm i yo -g
    npm i bower -g
    npm i generator-wdj -g
    gem sources -r https://rubygems.org/
    gem sources -r https://rubygems.org
    gem sources -r http://rubygems.org
    gem sources -r http://rubygems.org/
    gem sources -a http://ruby.taobao.org
    gem install ruby-devel
    gem install compass --pre
}
installDomino

#====================================
# clear
#====================================
clear() {
    cd ..
    `rm -rf $_DIR`
    `rm node.tar.gz`
}
clear
