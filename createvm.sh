#!/bin/bash

#Disk must be created in advance
azure vm create-from devops-days stuff/vminfo.json --location "West Europe"
