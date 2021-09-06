terraform {
  # see: https://www.terraform.io/docs/language/settings/backends/s3.html
  backend "s3" {
    # i.e. bucket name:
    bucket = "ntm.idbl.tfstate-bucket"
    # i.e. "folder" within bucket:
    key            = "idbl-state"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "ntm-idbl-tfstate-lockdb"
  }
}

provider "aws" {
  region  = "us-east-1"
  version = "~> 2.54.0"
}

locals {
  prefix = "${var.prefix}-${terraform.workspace}"
}
