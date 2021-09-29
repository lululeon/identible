resource "aws_vpc" "main" {
  # max number of hosts
  cidr_block = "10.1.0.0/16"

  enable_dns_support = true

  # friendly hostnames!
  enable_dns_hostnames = true

  tags = merge(
    local.common_tags,
    { "Name" = "${local.prefix}-vpc" }
  )
}


# impl public internet access
resource "aws_internet_gateway" "main" {
  # lives in the vpc just created above
  vpc_id = aws_vpc.main.id

  tags = merge(
    local.common_tags,
    { "Name" = "${local.prefix}-main-gw" }
  )
}
