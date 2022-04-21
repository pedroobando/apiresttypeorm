# apiresttypeorm v.1.0.1

### Una API bajo restfull, la cual se conecta a una base de datos de sqlite, manejando solamente una tabla de usarios.

### El apirest solo realiza CRUD. Muy rapido y confiable para majenar pocos datos y sin un motor de base de datos, creo que vale la pena.

## Docker

Con docker-compose, se crea todo imagen y contenedor dpara el apirestservident y imagen y contenedor para la base de dato mdbservident, pero tambien se puden crear por separados.

### Ejecucion en docker, por separado.

```bash
sudo docker build -t apiservident:v1 .  <creacion de la imagen>
sudo docker run --name apiservident -it -p 5420:5420 apiservident:v1  <creacion del contenedor>
```

### Ejecucion en docker. especificamente con docker-compose, planificado en modo desarrollo.

```bash
sudo docker-compose up -d
```
