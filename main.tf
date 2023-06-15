provider "aws" {
  region = var.region
}

resource "aws_instance" "vpn_server" {
  ami           = var.ami
  instance_type = var.instance_type

  vpc_security_group_ids = [aws_security_group.sg.id]
  subnet_id              = aws_subnet.main.id

  tags = {
    Name = "vpn_server"
  }
}

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "main" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"
}

resource "aws_instance" "vpn_server" {
  ami           = var.ami
  instance_type = "t2.micro"

  vpc_security_group_ids = [aws_security_group.sg.id]
  subnet_id              = aws_subnet.main.id

  tags = {
    Name = "vpn_server"
  }
}

resource "aws_route53_record" "vpn" {
  zone_id = var.zone_id
  name    = "vpn.example.com"
  type    = "A"
  ttl     = "300"
  records = [aws_instance.vpn_server.public_ip]
}

resource "aws_vpn_connection" "main" {
  customer_gateway_id = var.customer_gateway_id
  vpn_gateway_id      = var.vpn_gateway_id
  type                = "ipsec.1"
}

