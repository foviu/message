let rejectionCount = 0;


const TELEGRAM_TOKEN = "7104038985:AAEtKI2A-P4G3klsFNbLFr08RZs-UgI2UEY";
const CHAT_ID = "974527711";

function sendTelegramMessage(text) {
    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: text
        })
    }).catch(error => {
        console.error("Telegram error:", error);
    });
}

window.onload = function () {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;
            sendTelegramMessage(`📨 Someone just opened the love confession page!\n🌐 IP: ${ip}`);
        })
        .catch(error => {
            console.error("Error fetching IP:", error);
            sendTelegramMessage("📨 Someone just opened the love confession page!\n⚠️ Failed to get IP.");
        });
};

function revealConfession() {
    document.getElementById("love-message").style.display = "block";
    document.getElementById("response-buttons").style.display = "block";
}

function acceptLove() {
    document.getElementById("response-message").innerText = "You just made my day! 💕 I'm so happy you feel the same! \n you can write somthing :";
    document.getElementById("response-message").style.display = "block";
    document.getElementById("video-container").style.display = "block";
    document.getElementById("comment-section").style.display = "block";
    document.getElementById("response-buttons").style.display = "none";
    sendTelegramMessage("✅ She accepted the confession! ❤️");

}


function rejectLove() {
    rejectionCount++;

    const message = document.getElementById("response-message");
    message.style.display = "block";

    if (rejectionCount === 1) {
        message.innerText = "Are you sure? 😢";
        sendTelegramMessage("⚠️ She clicked reject. Asking for confirmation.");
    } else if (rejectionCount >= 2) {
        message.innerText = "Thank you for reading ❤️ Wishing you happiness.";
        document.getElementById("video-container").style.display = "none";
        document.getElementById("comment-section").style.display = "block";
        document.getElementById("response-buttons").style.display = "none";
        sendTelegramMessage("❌ She confirmed the rejection. 💔💔");
    }
}

function sendComment() {
    const comment = document.getElementById("user-comment").value.trim();
    const status = document.getElementById("comment-status");
    if (comment.length === 0) {
        status.style.color = "red";
        status.innerText = "Please write a message before sending.";
        return;
    }
    sendTelegramMessage("💬 User comment: " + comment);
    status.style.color = "lightgreen";
    status.innerText = "Message sent, thank you!";
    document.getElementById("user-comment").value = "";
}


// Falling hearts
const heartsContainer = document.getElementById("hearts");

function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️‍🔥";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (Math.random() * 3 + 3) + "s";
    heart.style.fontSize = (Math.random() * 10 + 15) + "px";
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
}

setInterval(createHeart, 300);
