resource "aws_db_subnet_group" "main" {
  # No idea why this resource type doesn't fully rely on the typical 'Name' tag. Oh well...
  name = "${local.prefix}-main"
  subnet_ids = [
    aws_subnet.private_a.id,
    aws_subnet.private_b.id,
  ]

  # Name tag still needed, else name won't show in console.
  tags = merge(
    local.common_tags,
    { "Name" = "${local.prefix}-main" }
  )
}

# control access to this resource (virtual firewall for the db instance)
resource "aws_security_group" "rds" {
  description = "Allow access to RDS database instance"

  # this resource type WILL use 'name' below in the way 'Name' tag works... so we don't need the latter anymore.
  name = "${local.prefix}-rds-inbound-access"

  vpc_id = aws_vpc.main.id

  ingress {
    protocol = "tcp"

    # port number RANGE, not port direction
    from_port = 5432
    to_port   = 5432

    security_groups = [
      aws_security_group.bastion.id
    ]
  }

  tags = local.common_tags
}

resource "aws_db_instance" "main" {
  # think of this as db server name, for aws console purposes
  identifier = "${local.prefix}-db"

  # think of this as the name of the default database, on the db server above
  # (you can have multiple databases)
  name = "identible"

  # general-purpose SSD 
  storage_type = "gp2"

  # gigabytes. For gp2 instances, valid range is 20 to 65536.
  allocated_storage = 20

  # pg version (aws docs will list valid supported versions for each db engine available with RDS)
  engine         = "postgres"
  engine_version = "12.7"

  instance_class = "db.t2.micro"

  # populated by either 1) prompt at runtime, or 2) 'terraform.tfvars' file, or 3) env vars TF_VAR_<varname>
  username       = var.db_username
  password       = var.db_password


  # Keep N days of backups. N:=0 bcos not bothering with backups at this time.
  backup_retention_period = 0

  # Even though we spread our subnets out across AZs, we're not bothering with
  # the corresponding redundancy here, for $cheapskate reasons
  multi_az = false

  # when destroying instance, we don't care about a last snapshot.
  # (also, the snapshot name is unique, so you'd need to finagle a timestamp
  # or something for this to always work beyond just the first time, in ci/cd)
  skip_final_snapshot = true

  # where we'll provision this
  db_subnet_group_name = aws_db_subnet_group.main.name

  # how we'll firewall it
  vpc_security_group_ids = [aws_security_group.rds.id]

  tags = merge(
    local.common_tags,
    { "Name" = "${local.prefix}-main" }
  )
}
