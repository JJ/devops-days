#!/bin/bash

#Call with username and password
azure vm create devops-days -o vmdepot-51465-1-32 -l "West Europe" $1 $2 --ssh
azure vm endpoint create-multiple devops-days 80:80,443:443
ssh-copy-id -i ~/.ssh/id_rsa.pub $1@devops-days.cloudapp.net
