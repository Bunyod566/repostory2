// --- DARK VA LIGHT REJIM (THEME TOGGLE) ---

const themeToggle = document.getElementById("themeToggle");
const themeOptions = document.querySelectorAll("[data-theme-choice]");

// Sahifa yuklanganda saqlangan rejimni tekshirish
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
});

// Sidebar'dagi tugma bosilganda (Light <-> Dark o'tish)
if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        setTheme(newTheme);
    });
}

// Settings sahifasidagi tanlov tugmalari uchun
themeOptions.forEach(button => {
    button.addEventListener("click", () => {
        const selectedTheme = button.getAttribute("data-theme-choice");
        setTheme(selectedTheme);
    });
});

// Rejimni o'rnatish va saqlash funksiyasi
function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    // Settings sahifasidagi tugmalarning holatini (active/pressed) yangilash
    themeOptions.forEach(button => {
        const choice = button.getAttribute("data-theme-choice");
        if (choice === theme) {
            button.setAttribute("aria-pressed", "true");
            button.classList.add("active");
        } else {
            button.setAttribute("aria-pressed", "false");
            button.classList.remove("active");
        }
    });

    // Sidebar'dagi tugma matni yoki ikonkasini o'zgartirish (ixtiyoriy)
    if (themeToggle) {
        if (theme === "dark") {
            themeToggle.innerHTML = "<span>☀️</span> Kunduzgi rejim";
        } else {
            themeToggle.innerHTML = "<span>☾</span> Rejimni almashtirish";
        }
    }
}

const imageInput = document.getElementById("imageInput");
const previewImage = document.getElementById("previewImage");
const previewText = document.getElementById("previewText");


// RASM YUKLASH

imageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) {
        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {

        previewImage.src = event.target.result;

        previewImage.style.display = "block";

        previewText.style.display = "none";
    };

    reader.readAsDataURL(file);
});


// TUSHUNTIRISH

function explainLesson() {

    const subject =
        document.getElementById("subject").value;

    const question =
        document.getElementById("question").value.trim();

    const result =
        document.getElementById("result");

    const quiz =
        document.getElementById("quiz");


    if (!question) {

        result.innerHTML = `
            <div class="result-icon">⚠️</div>

            <h3>Savolingizni yozing</h3>

            <p>
                Masalan:
                "Kasrlarni qanday qo‘shamiz?"
            </p>
        `;

        return;
    }


    let explanation = "";


    if (subject === "matematika") {

        explanation = `
            <h3>📐 Matematika</h3>

            <p>
                <strong>Savol:</strong> ${question}
            </p>

            <br>

            <p>
                Matematik masalani yechishda avval
                berilgan ma’lumotlarni ajratib olamiz.
                Keyin kerakli formulani tanlaymiz
                va bosqichma-bosqich yechamiz.
            </p>

            <br>

            <p>
                💡 Maslahat: Masalani birdaniga javobga
                o‘tmasdan, kichik qismlarga bo‘lib ko‘ring.
            </p>
        `;

        quiz.innerHTML = `
            <h3>🧩 Mini-test</h3>

            <p class="quiz-question">
                Matematik masalani yechishda birinchi
                nima qilish kerak?
            </p>

            <button
                class="quiz-option"
                onclick="checkAnswer(this, false)"
            >
                A) Tasodifiy javob yozish
            </button>

            <button
                class="quiz-option"
                onclick="checkAnswer(this, true)"
            >
                B) Berilgan ma’lumotlarni aniqlash
            </button>

            <button
                class="quiz-option"
                onclick="checkAnswer(this, false)"
            >
                C) Javobni taxmin qilish
            </button>

            <p id="quizResult"></p>
        `;

    }


    else if (subject === "fizika") {

        explanation = `
            <h3>⚡ Fizika</h3>

            <p>
                <strong>Savol:</strong> ${question}
            </p>

            <br>

            <p>
                Fizik masalalarda berilgan kattaliklarni
                yozib olamiz, ularning birliklarini tekshiramiz
                va mos formuladan foydalanamiz.
            </p>

            <br>

            <p>
                💡 Maslahat: Har doim birliklarga e’tibor bering.
            </p>
        `;

    }


    else if (subject === "ingliz") {

        explanation = `
            <h3>🇬🇧 Ingliz tili</h3>

            <p>
                <strong>Savol:</strong> ${question}
            </p>

            <br>

            <p>
                Ingliz tilida mavzuni tushunish uchun
                asosiy qoida, misollar va istisnolarni
                birgalikda ko‘rib chiqish foydali.
            </p>

            <br>

            <p>
                💡 Maslahat: Yangi qoidani kamida
                3 ta misolda ishlatib ko‘ring.
            </p>
        `;

    }


    else if (subject === "informatika") {

        explanation = `
            <h3>💻 Informatika</h3>

            <p>
                <strong>Savol:</strong> ${question}
            </p>

            <br>

            <p>
                Informatikada muammoni avval tushunamiz,
                keyin algoritm tuzamiz va so‘ng kodga aylantiramiz.
            </p>

            <br>

            <p>
                💡 Maslahat: Kod yozishdan oldin
                algoritmni oddiy tilda yozib ko‘ring.
            </p>
        `;

    }


    else {

        explanation = `
            <h3>📚 ${subject}</h3>

            <p>
                <strong>Savol:</strong> ${question}
            </p>

            <br>

            <p>
                Ushbu mavzuni tushunish uchun asosiy
                tushunchalarni ajratib olib, ularni
                misollar yordamida o‘rganish kerak.
            </p>
        `;
    }


    result.innerHTML = explanation;
}


// TEST TEKSHIRISH

function checkAnswer(button, correct) {

    const quizResult =
        document.getElementById("quizResult");


    if (correct) {

        quizResult.innerHTML =
            "✅ To‘g‘ri! Barakalla!";

        quizResult.style.marginTop = "15px";
        quizResult.style.fontWeight = "700";

    } else {

        quizResult.innerHTML =
            "❌ Noto‘g‘ri. Yana bir marta urinib ko‘ring.";

        quizResult.style.marginTop = "15px";
        quizResult.style.fontWeight = "700";
    }
}