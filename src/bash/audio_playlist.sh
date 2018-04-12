#!/bin/sh

#aktuelle CD ausgeben
echo $1

mocp --server
mocp --clear
mocp --stop
mocp -a $1
mocp --play