# Configuração do provedor AWS
provider "aws" {
  region = "us-east-1"  # Altere para a sua região desejada
}

# Criando o grupo de segurança para a instância RDS
resource "aws_security_group" "db_sg" {
  name        = "rds_security_group"
  description = "Security group for RDS PostgreSQL instance"

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Permitir acesso de qualquer IP (ajuste conforme necessário)
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

# Criando a instância RDS PostgreSQL
resource "aws_db_instance" "postgres" {
  allocated_storage    = 20  # O Free Tier permite até 20 GB
  storage_type         = "gp2"
  engine               = "postgres"
  engine_version       = "14.16"
  instance_class       = "db.t4g.micro"  # Classe de instância do Free Tier
  db_name              = "corpoeciencia"  # Alterado de 'name' para 'db_name'
  username             = "postgres"
  password             = "postgres"  # A senha deve ser alterada para algo mais seguro
  db_subnet_group_name = aws_db_subnet_group.subnet_group.name
  vpc_security_group_ids = [aws_security_group.db_sg.id]
  backup_retention_period = 7  # Período de backup de 7 dias
  multi_az             = false  # Para não incorrer em custos adicionais
  publicly_accessible  = true  # Acesso público (modifique conforme necessidade)
  skip_final_snapshot  = true  # Evita custos de snapshot final ao excluir a instância
  max_allocated_storage = 100  # Máximo de 100 GB (ajuste conforme necessário)
  
  tags = {
    Name = "corpoeciencia-db"
  }
}


# Criando um grupo de sub-redes para a instância RDS (substitua com suas subnets)
resource "aws_db_subnet_group" "subnet_group" {
  name        = "corpoeciencia-db-subnet-group"
  description = "Database subnet group"
  subnet_ids  = ["subnet-0e450bba21525342f", "subnet-0ff57d6cd055d5828"]  # Altere para as suas subnets

  tags = {
    Name = "corpoeciencia-db-subnet-group"
  }
}

# Saída do endpoint do RDS para usar na conexão
output "db_endpoint" {
  value = aws_db_instance.postgres.endpoint
}
