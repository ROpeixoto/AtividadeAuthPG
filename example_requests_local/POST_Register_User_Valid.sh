curl --request POST \
  --url 'http://localhost:3000/users/register' \
  --header 'Content-Type: application/json' \
  --data '{
    "username": "Rodrigo",
    "password": "Senha123",
    "email": "rodrigo@mail.com"
    }'