// Get elements from the DOM
const chatbotContainer = document.querySelector('.chatbot-container');
const openChatBtn = document.getElementById('open-chat-btn');
const closeChatBtn = document.getElementById('close-chat');
const chatBody = document.getElementById('chat-body');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const suggestionBox = document.createElement('div'); // Create a suggestion box element
suggestionBox.classList.add('suggestion-box'); // Style as needed
chatbotContainer.appendChild(suggestionBox); // Append to the chatbot container

// Show welcome message when the chatbot opens
openChatBtn.addEventListener('click', () => {
    chatbotContainer.style.display = 'flex';
    openChatBtn.style.display = 'none';
    showWelcomeMessage();
});

closeChatBtn.addEventListener('click', () => {
    chatbotContainer.style.display = 'none';
    openChatBtn.style.display = 'block';
});

// Function to display welcome message with contact info
function showWelcomeMessage() {
    const welcomeMessage = `
        Welcome to our company! How can I assist you today? 
        Feel free to ask any questions.
        Contact us at: 
        Phone: +123-456-7890 
        Email: contact@yourcompany.com
    `;
    appendMessage(welcomeMessage, 'bot');
}

// Send user message and get bot response
sendBtn.addEventListener('click', () => {
    const message = userInput.value.trim();
    if (message) {
        appendMessage(message, 'user');
        getBotResponse(message);
        userInput.value = ''; // Clear the input after sending
        suggestionBox.innerHTML = ''; // Clear suggestions after sending the message
    }
});

// Function to append user or bot message to the chat body
function appendMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(type === 'user' ? 'user-message' : 'bot-message');
    messageElement.innerText = message;
    chatBody.appendChild(messageElement);
    chatBody.scrollTop = chatBody.scrollHeight; // Scroll to the bottom
}

// FAQs and introductory phrases
const faqs = {
    "hi": "Hello! How can I help you today?",
    "hai": "Hello! How can I help you today?",
    "hello": "Hi there! How can I assist you?",
    "Do you take approvals": "Yes, we are authorized to take Approvals in all municipalities in Oman, Khazaeen, Madayan.",
    "how are you?": "I am just a bot, but I'm here to assist you!",
    "what services do you provide?": "We specialize in steel structure design, RCC design, steel erection, and construction management.",
    "what is rcc?": "RCC stands for Reinforced Cement Concrete. It is concrete that is strengthened with steel reinforcement bars (rebars).",
    "what is the cost of steel erection?": "Steel erection costs vary based on the size, location, and complexity of the project. Contact us for a detailed estimate.",
    "how long does it take to complete a steel structure project?": "Project timelines depend on the project size and complexity. Generally, small projects may take a few weeks, while larger ones can take several months.",
    "do you offer steel detailing services?": "Yes, we provide comprehensive steel detailing services, including shop drawings and fabrication drawings.",
    "what is the difference between steel and rcc structures?": "Steel structures are lightweight, durable, and can be erected quickly, while RCC structures provide more rigidity and are commonly used for heavy loads.",
    "what is the lifespan of a steel structure?": "A properly maintained steel structure can last up to 50 years or more, depending on environmental factors.",
    "do you provide 3D modeling of steel and RCC designs?": "Yes, we offer 3D modeling and design services for both steel and RCC structures.",
    "how do you ensure quality in construction projects?": "We have stringent QA/QC procedures in place, which include regular inspections, material testing, and adherence to building codes.",
    "what is a PEB structure?": "PEB stands for Pre-Engineered Building. It is a structure designed and fabricated in a factory, which reduces on-site construction time.",
    "can you help with permitting and regulatory approvals?": "Yes, we can assist with obtaining the necessary permits and approvals for your construction project.",
    "do you offer steel structure maintenance services?": "Yes, we provide ongoing maintenance services to ensure the longevity of your steel structures.",
    "what are the advantages of using steel in construction?": "Steel offers strength, flexibility, durability, and faster construction times compared to traditional materials.",
    "do you handle large-scale commercial steel projects?": "Yes, we have experience in handling large-scale commercial and industrial steel erection projects.",
    "what materials do you use for RCC construction?": "We use high-quality cement, aggregates, water, and steel rebars for all RCC construction projects.",
    "how do you ensure the safety of workers during steel erection?": "We follow strict safety protocols and provide workers with proper training, equipment, and safety gear to minimize risks.",
    "what is the typical thickness of an RCC slab?": "The thickness of an RCC slab generally ranges from 100mm to 150mm, depending on the structural requirements.",
    "can you help with foundation design?": "Yes, we offer foundation design services for both steel and RCC structures.",
    "what codes do you follow for steel and RCC design?": "We follow international design codes such as IS Code, Eurocode, and ACI, depending on project requirements."
};

// Function to generate bot responses
function getBotResponse(message) {
    const userMessage = message.toLowerCase();
    let response = faqs[userMessage] || "Sorry, I didn't understand that. Can you try asking something else?";
    appendMessage(response, 'bot');
}

// Search for related FAQs and show suggestions
userInput.addEventListener('input', () => {
    const query = userInput.value.toLowerCase().trim();
    if (query) {
        showSuggestions(query);
    } else {
        suggestionBox.innerHTML = ''; // Clear suggestions if no input
    }
});

// Function to show suggestions based on user input
function showSuggestions(query) {
    const matchingQuestions = Object.keys(faqs).filter(question => question.includes(query));
    if (matchingQuestions.length > 0) {
        suggestionBox.innerHTML = ''; // Clear previous suggestions
        matchingQuestions.forEach(question => {
            const suggestionItem = document.createElement('div');
            suggestionItem.classList.add('suggestion-item'); // Style it as needed
            suggestionItem.innerText = question;
            suggestionBox.appendChild(suggestionItem);

            // When suggestion is clicked, fill input and send the message
            suggestionItem.addEventListener('click', () => {
                userInput.value = question;
                sendBtn.click(); // Trigger sending the message
                suggestionBox.innerHTML = ''; // Clear suggestions after click
            });
        });
    } else {
        suggestionBox.innerHTML = ''; // Clear if no match
    }
}

// Allow pressing 'Enter' to send the message
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendBtn.click();
    }
});
