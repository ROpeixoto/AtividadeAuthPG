curl --request POST \
  --url 'https://atividade-auth-pg.vercel.app/users/register' \
  --header 'Content-Type: application/json' \
  --data '{
    "username": "RodrigoPeixoto",
    "password": "Senha123",
    "email": "user@user.com"
    }'