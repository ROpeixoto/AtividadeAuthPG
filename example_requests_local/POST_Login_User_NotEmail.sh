curl --request POST \
  --url 'http://localhost:3000/users/login' \
  --header 'Content-Type: application/json' \
  --data '{
    "username": "RodrigoPeixoto",
    "password": "Senha123",
    "email": "seila@seila.com"
    }'