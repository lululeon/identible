variable "prefix" {
  default = "idbl"
}

variable "project" {
  default = "Identible"
}

variable "db_username" {
  description = "Database username for RDS instance"
}

variable "db_password" {
  description = "Database password for RDS instance"
}

variable "bastion_key_name" {
  description = "ops-admin"
}
