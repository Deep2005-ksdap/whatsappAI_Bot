require("dotenv").config();

const { Client,LocalAuth } = require('whatsapp-web.js');
const { GoogleGenAI } = require("@google/genai");
const qrcode = require('qrcode-terminal');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const SYSTEM_INSTRUCTION = `You are a WhatsApp Priority Filter.

Classify every message as either:

URGENT:

* Deadlines (assignments, projects, quizzes, tests, exams, submissions)
* Official college/class/group announcements
* Meetings, interviews, presentations, workshops
* Schedule, timetable, exam, or class changes
* Any actionable, time-sensitive information

Format:
URGENT | Date/Time (if mentioned) | Topic | Required Action

IGNORE:

* Greetings
* Casual chat
* Memes/jokes
* Spam/promotions
* Non-actionable discussions

Rules:

* Output ONLY "URGENT ..." or "IGNORE"
* Be concise (1 line preferred)
* Do not explain your decision
* If uncertain, prioritize actionable and time-sensitive messages
`;

const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: 'savedSession'
    })
});
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

async function askAi(text) {
  const res = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: text,
    config: {
        systemInstruction: SYSTEM_INSTRUCTION
    }
  });
  return res;
}

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});


client.on('message', async(msg) => {
    try{
        let response = await askAi(msg.body);
        let aiReply = response.text.trim();

        if(aiReply.startsWith("URGENT")){
           console.log(`\n🚨 Notification for You:\nFrom: ${msg.from}\nStatus: ${aiReply}\n`);

           const myId = process.env.ID;
           client.sendMessage(myId,aiReply);
        } else {
            console.log(`[Filtered] Message from ${msg.from} was IGNORED.`);
        }
    }catch(error){
        console.error("Error processing message with AI", error.message)
    }
});

client.initialize();