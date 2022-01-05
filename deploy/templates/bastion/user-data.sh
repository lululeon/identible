#! /bin/bash

sudo yum update -y
sudo amazon-linux-extras install -y docker
sudo systemctl enable docker.service
sudo systemctl start docker.service

# add the standard ec2-user on ec2 instances to the docker user group so that it can run docker
sudo usermod -aG docker ec2-user
