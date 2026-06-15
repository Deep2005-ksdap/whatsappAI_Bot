# AI WhatsApp Priority Filter

## Why I Built This

I used to miss important quizzes, assignment deadlines, and meetings because most communication in my college happens through WhatsApp groups.

The problem was not that the information wasn't available. The problem was that important messages were buried under hundreds of casual chats, memes, and discussions. Since I don't keep checking WhatsApp every few minutes, I would often notice important announcements too late.

One day I thought:

> What if AI could monitor my WhatsApp messages and notify me only when something important arrives?

This project is my attempt to solve that problem.

---

## What It Does

The bot monitors incoming WhatsApp messages in real time and sends only important messages to my personal WhatsApp account.

Examples of messages considered important:

* Quiz announcements
* Assignment deadlines
* Exam schedules
* Project submissions
* Meetings
* Workshops
* Timetable changes
* Any actionable and time-sensitive information

Messages like greetings, casual conversations, memes, and spam are ignored.

---

## How It Works

1. The bot listens for incoming WhatsApp messages.
2. Every message is sent to Gemini API.
3. Gemini classifies the message as either:

   * URGENT
   * IGNORE
4. If the message is classified as URGENT, the bot forwards the alert to my personal WhatsApp number.
5. If the message is classified as IGNORE, nothing happens.

---

## Tech Stack

* Node.js
* whatsapp-web.js
* Gemini API
* dotenv

---

## Concepts I Learned While Building This

* WhatsApp Web automation
* Using external APIs
* Prompt engineering
* Event-driven programming
* Session management with LocalAuth
* Async/Await and error handling

---

## Example

Incoming Message:

"Quiz on Database Management Systems tomorrow at 10 AM."

AI Output:

URGENT | Tomorrow 10 AM | DBMS Quiz | Prepare for quiz

Incoming Message:

"Good morning everyone 😊"

AI Output:

IGNORE

---

## Future Improvements

* Daily summary of important messages
* Database storage for announcements
* Web dashboard
* Better personalization based on user preferences

---

## Setup

1. Clone the repository

```bash
git clone <your-repository-url>
```

2. Install dependencies

```bash
npm install
```

3. Create a .env file

```env
GEMINI_API_KEY=your_api_key
ID=your_whatsapp_id
```

4. Start the bot

```bash
node index.js
```

5. Scan the QR code using WhatsApp.

The session will be saved automatically, so you won't need to scan the QR code every time.

---

## Note

This project was built primarily as a learning project and to solve a real problem I personally faced. While building it, I got hands-on experience with automation, APIs, and integrating AI into a real-world workflow.
