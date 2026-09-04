

curl -X POST http://localhost:3000/api/v1/veiculos \
-H "Content-Type: application/json" \
-d '{"placa":"AAA-1111","montadora":"Scania","modelo":"R450"}' > crud_result.log

curl -X POST http://localhost:3000/api/v1/veiculos \
-H "Content-Type: application/json" \
-d '{"placa":"BBB-2222","montadora":"Volvo","modelo":"FH"}' >> crud_result.log

curl -X PUT http://localhost:3000/api/v1/veiculos/1 \
-H "Content-Type: application/json" \
-d '{"placa":"AAA-1111","montadora":"Scania","modelo":"R450","status":"EM_ROTA"}' >> crud_result.log

curl -X DELETE http://localhost:3000/api/v1/veiculos/2 >> crud_result.log
