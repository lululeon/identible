terraform {
  required_version = "~> 1.0.7"

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

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

locals {
  prefix = "${var.prefix}-${terraform.workspace}"

  common_tags = {
    Environment = terraform.workspace
    Project     = var.project
    ManagedBy   = "Terraform"
  }
}
