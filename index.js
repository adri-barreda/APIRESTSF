const express = require("express");
const jsforce = require("jsforce");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

// Configuración de Salesforce
const SF_LOGIN_URL = process.env.SF_LOGIN_URL || "https://login.salesforce.com";
const SF_USERNAME = process.env.SF_USERNAME;
const SF_PASSWORD = process.env.SF_PASSWORD;
const SF_TOKEN = process.env.SF_TOKEN;

// Función para conectar con Salesforce
async function connectToSalesforce() {
    const conn = new jsforce.Connection({
        loginUrl: SF_LOGIN_URL,
    });
    await conn.login(SF_USERNAME, SF_PASSWORD + SF_TOKEN);
    return conn;
}

// Ruta para actualizar el campo Informaci_n_Typeforms__c de un Lead
app.post("/api/updateLeadTypeformInfo", async (req, res) => {
    const { searchField, searchValue, typeformInfo } = req.body;

    if (!searchField || !searchValue || !typeformInfo) {
        return res.status(400).json({ error: "Faltan parámetros requeridos" });
    }

    try {
        const conn = await connectToSalesforce();

        // Buscar el Lead
        const query = `SELECT Id FROM Lead WHERE ${searchField} = '${searchValue}' LIMIT 1`;
        const result = await conn.query(query);

        if (result.records.length === 0) {
            throw new Error(
                `No se encontró ningún lead con ${searchField} = ${searchValue}`,
            );
        }

        const leadId = result.records[0].Id;

        // Actualizar el campo Informaci_n_Typeforms__c del Lead
        const updateResult = await conn.sobject("Lead").update({
            Id: leadId,
            Informaci_n_Typeforms__c: typeformInfo,
        });

        if (updateResult.success) {
            res.json({ message: "Lead actualizado con éxito" });
        } else {
            throw new Error(
                "Error al actualizar el lead: " +
                    updateResult.errors.join(", "),
            );
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Ruta para obtener los campos del Lead (opcional, pero útil para depuración)
app.get("/api/getLeadFields", async (req, res) => {
    try {
        const conn = await connectToSalesforce();
        const describe = await conn.describe("Lead");
        const fields = describe.fields.map((field) => ({
            name: field.name,
            label: field.label,
            type: field.type,
        }));
        res.json({ fields });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
