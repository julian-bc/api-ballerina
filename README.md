# Api Ballerina
Esta API forma parte del sistema Ballerina, un proyecto IoT enfocado en el monitoreo inteligente de actividades piscícolas. La API permite registrar y consultar datos de oxígeno disuelto recolectados en tiempo real desde sensores en los estanques.

## Scripts disponibles
- `npm start`: Inicia el servidor principal del proyecto.
- `npm run seed`: Alimenta la base de datos con 10 documentos de prueba.

## Archivo `.env`
Asegúrate de tener un archivo `.env` en la raíz del proyecto con la siguiente configuración:

```env
MONGODB_URI=mongodb://root:password@localhost:27017
```
