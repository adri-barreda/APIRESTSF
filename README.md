# Salesforce Lead Updater

Este proyecto proporciona una API REST para actualizar el campo 'Informaci_n_Typeforms__c' de un Lead en Salesforce.

## Requisitos previos

- Node.js (versión 12 o superior)
- Una cuenta de Salesforce con permisos para acceder y modificar Leads
- Credenciales de Salesforce (nombre de usuario, contraseña y token de seguridad)

## Instalación

1. Clona este repositorio o descarga los archivos del proyecto.

2. Navega al directorio del proyecto en tu terminal.

3. Instala las dependencias necesarias:

   ```
   npm install express jsforce body-parser dotenv
   ```

4. Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

   ```
   SF_LOGIN_URL=https://login.salesforce.com
   SF_USERNAME=tu_usuario_de_salesforce
   SF_PASSWORD=tu_contraseña_de_salesforce
   SF_TOKEN=tu_token_de_seguridad_de_salesforce
   ```

   Reemplaza los valores con tus credenciales de Salesforce.

## Uso

1. Inicia el servidor:

   ```
   node server.js
   ```

   El servidor se iniciará en el puerto 3000 por defecto. Puedes cambiar esto configurando una variable de entorno PORT.

2. Para actualizar el campo 'Informaci_n_Typeforms__c' de un Lead, envía una solicitud POST a `/api/updateLeadTypeformInfo` con el siguiente cuerpo JSON:

   ```json
   {
     "searchField": "Email",
     "searchValue": "ejemplo@email.com",
     "typeformInfo": "Nueva información del typeform"
   }
   ```

   - `searchField`: Puede ser "Email" o "Phone", dependiendo de cómo quieras buscar el Lead.
   - `searchValue`: El valor correspondiente al campo de búsqueda (email o número de teléfono del Lead).
   - `typeformInfo`: La nueva información que quieres guardar en el campo 'Informaci_n_Typeforms__c'.

3. La API responderá con un JSON indicando si la actualización fue exitosa o si hubo algún error.

## Endpoints

- POST `/api/updateLeadTypeformInfo`: Actualiza el campo 'Informaci_n_Typeforms__c' de un Lead.
- GET `/api/getLeadFields`: Obtiene una lista de todos los campos disponibles en el objeto Lead (útil para depuración).

## Integración con otras herramientas

Para integrar este backend con otra herramienta:

1. La herramienta debe hacer una solicitud HTTP POST a la URL donde esté alojado este servidor, seguido de `/api/updateLeadTypeformInfo`.

2. La solicitud debe incluir un cuerpo JSON con los campos `searchField`, `searchValue`, y `typeformInfo`.

3. La solicitud debe tener el encabezado `Content-Type: application/json`.

4. Procesa la respuesta JSON para determinar si la actualización fue exitosa o si hubo algún error.

## Seguridad

Asegúrate de que este servidor se ejecute en un entorno seguro, ya que maneja credenciales sensibles de Salesforce. No expongas las variables de entorno o las credenciales en entornos públicos o no seguros.

## Soporte

Si encuentras algún problema o tienes alguna pregunta, por favor abre un issue en este repositorio.