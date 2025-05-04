curl --request POST \
  --url 'https://atividade-auth-pg.vercel.app/users/register' \
  --header 'Content-Type: application/json' \
  --data '{
    "username": "Rodrigo",
    "email": "user@user.com"
    }'