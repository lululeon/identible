output "db_host" {
  # get the allocated ip address of the db
  value = aws_db_instance.main.address
}

output "bastion_host" {
  # get the hostname of the bastion for when we need to connect to it
  value = aws_instance.bastion.public_dns
}
