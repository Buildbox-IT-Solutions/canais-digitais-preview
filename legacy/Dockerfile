FROM php:8.3-cli-alpine

WORKDIR /app

# Copia todo o projeto
COPY . .

# Porta do servidor PHP built-in
EXPOSE 8000

# Sobe o preview usando o router.php do projeto
CMD ["php", "-S", "0.0.0.0:8000", "router.php"]