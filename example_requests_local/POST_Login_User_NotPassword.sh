curl --request POST \
  --url 'http://localhost:3000/users/login' \
  --header 'Content-Type: application/json' \
  --data '{
    "username": "RodrigoPeixoto",
    "password": "Naoeminhasenha",
    "email": "user@user.com"
    }'