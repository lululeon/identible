output "db_host" {
  # get the allocated ip address of the db
  value = aws_db_instance.main.address
}
