provider "aws" {
  region = "us-east-1"
}

resource "aws_security_group" "db_sg" {
  name        = "rds_security_group"
  description = "Security group for RDS PostgreSQL instance"

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "rds-db-sg"
  }
}

resource "aws_db_instance" "postgres" {
  allocated_storage    = 20
  storage_type         = "gp2"
  engine               = "postgres"
  engine_version       = "14.16"
  instance_class       = "db.t4g.micro"
  db_name              = "corpoeciencia"
  username             = "postgres"
  password             = "postgres"
  db_subnet_group_name = aws_db_subnet_group.subnet_group.name
  vpc_security_group_ids = [aws_security_group.db_sg.id]
  backup_retention_period = 7
  multi_az             = false
  publicly_accessible  = true
  skip_final_snapshot  = true
  max_allocated_storage = 100
  
  tags = {
    Name = "corpoeciencia-db"
  }
}


resource "aws_db_subnet_group" "subnet_group" {
  name        = "corpoeciencia-db-subnet-group"
  description = "Database subnet group"
  subnet_ids  = ["subnet-0e450bba21525342f", "subnet-0ff57d6cd055d5828"]

  tags = {
    Name = "corpoeciencia-db-subnet-group"
  }
}

output "db_endpoint" {
  value = aws_db_instance.postgres.endpoint
}