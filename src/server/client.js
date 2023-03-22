import dotenv from "dotenv";
import process from "node:process"

dotenv.config()

const API_KEY = process.env.API_KEY
const max_tokens = 300
const player1 = 'Gastly'
const player2 = 'Pikachu'
const prompt = ` Dame única y exclusivamente  el dialogo no te enrolles, de 2 pokemon llamados ${player1} y ${player2}. Imagina que estamos en un combate de chistes y cada uno de los pokemon tiene que decir una frase (80 caracteres máximo). Devuélveme el diálogo entre los dos pokemon, en formato de lista (sólo una lista de 6 ítems). Ve al grano, omite todo lo que no sea la lista (por supuesto, claro, etc...). Responde en menos de ${max_tokens} `
const model = 'gpt-3.5-turbo'
const API_URL = `https://api.openai.com/v1/chat/completions`

const headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${API_KEY}`
};

const body = {
  messages: [
    {
      role: 'user',
      content: prompt
    }
  ],
  model,
  max_tokens,
  n: 1,
  stop: null
}

try {
  const response = await fetch(API_URL, { method: "POST", headers, body: JSON.stringify(body) });
  const data = await response.json();
  const { content } = data.choices[0].message;
  const listMessages = content.replace("\n", "").replace("\n", "").split("\n")
  const messages = listMessages.map((message) => message.substring(3))
  console.log(messages)
} catch (error) {
  console.error('Posiblemente la API está caída')
}

//content.replace("\n", "").replace("\n", "").split("\n")
//listMessage.map((message) => message.substring(3) )
