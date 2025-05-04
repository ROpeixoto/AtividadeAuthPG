curl --request POST \
  --url 'https://atividade-auth-pg.vercel.app/users/login' \
  --header 'Content-Type: application/json' \
  --data '{
    "username": "RodrigoPeixoto",
    "password": "Senha123"
    }'