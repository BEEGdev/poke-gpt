import dotenv from "dotenv";
import process from "node:process"

dotenv.config()

const API_KEY = process.env.API_KEY
const max_tokens = 100
const indications = `Responde en menos de ${max_tokens} y sin usar saltos de linea. Sólo un párrafo. `
const prompt = 'Hola, buenas noches' + indications
const model = 'text-davinci-002'
const API_URL = `https://api.openai.com/v1/engines/${model}/completions`

const headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${API_KEY}`
};

const body = {
  prompt,
  max_tokens,
  n: 1,
  stop: null
}

try {
  const response = await fetch(API_URL, { method: "POST", headers, body: JSON.stringify(body) });
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error('Posiblemente la API está caída')
}
