/* ---------------------------
   DOM SHORTCUTS
----------------------------*/
const displayEl = document.getElementById("displayValue");
const modeLabel = document.getElementById("modeLabel");
const padEl = document.getElementById("pad");
const sciPanel = document.getElementById("sciPanel");
const sciSwitch = document.getElementById("sciSwitch");
const themeSwitch = document.getElementById("themeSwitch");
const themeLabel = document.getElementById("themeLabel");

const copyBtn = document.getElementById("copyBtn");
const soundBtn = document.getElementById("soundBtn");
const vibeBtn = document.getElementById("vibeBtn");
const historyBtn = document.getElementById("historyBtn");

const historyPanel = document.getElementById("historyPanel");
const closeHistory = document.getElementById("closeHistory");
const clearHistory = document.getElementById("clearHistory");
const historyList = document.getElementById("historyList");

/* ---------------------------
   STATE
----------------------------*/
let display = "0";
let stored = null;
let pendingOp = null;
let resetNext = false;

/* ---------------------------
   SOUND SYSTEM
----------------------------*/
let soundEnabled = JSON.parse(localStorage.getItem("soundEnabled") || "true");

const clickSound = new Audio(
"data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA="
);

function playClick() {
    if (!soundEnabled) return;
    clickSound.currentTime = 0;
    clickSound.play();
}

/* ---------------------------
   VIBRATION SYSTEM
----------------------------*/
let vibeEnabled = JSON.parse(localStorage.getItem("vibeEnabled") || "true");

function vibe(ms = 60) {
    if (!vibeEnabled) return;
    if (!("vibrate" in navigator)) return;
    navigator.vibrate(ms);
}

/* ---------------------------
   THEME SYSTEM
----------------------------*/
let lightMode = JSON.parse(localStorage.getItem("lightMode") || "false");

function applyTheme() {
    if (lightMode) {
        document.body.classList.add("light-mode");
        themeLabel.textContent = "Dark";
        themeSwitch.checked = true;
    } else {
        document.body.classList.remove("light-mode");
        themeLabel.textContent = "Light";
        themeSwitch.checked = false;
    }
}
applyTheme();

themeSwitch.addEventListener("change", () => {
    lightMode = themeSwitch.checked;
    localStorage.setItem("lightMode", JSON.stringify(lightMode));
    applyTheme();
});

/* ---------------------------
   DISPLAY
----------------------------*/
function refresh() {
    displayEl.textContent = display;
}

function pressNum(n) {
    playClick();

    if (resetNext) {
        display = (n === ".") ? "0." : n;
        resetNext = false;
    } else {
        if (display === "0" && n !== ".") display = n;
        else if (n === "." && display.includes(".")) return;
        else display += n;
    }
    refresh();
}

/* ---------------------------
   COPY RESULT
----------------------------*/
copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(display);
    playClick();
    vibe(40);
    copyBtn.textContent = "✔";
    setTimeout(() => copyBtn.textContent = "📋", 700);
});

/* ---------------------------
   CLEAR / BACKSPACE / ± / %
----------------------------*/
function clearAll() {
    playClick();
    display = "0";
    stored = null;
    pendingOp = null;
    resetNext = false;
    refresh();
}

function plusMinus() {
    playClick();
    display = display.startsWith("-") ? display.slice(1) : "-" + display;
    refresh();
}

function backspace() {
    playClick();
    display = display.length > 1 ? display.slice(0, -1) : "0";
    refresh();
}

function percent() {
    playClick();
    display = String(parseFloat(display) / 100);
    refresh();
}

/* ---------------------------
   OPERATORS (Backed by FLASK)
----------------------------*/
function operatorPressed(op) {
    playClick();
    vibe(25);

    if (pendingOp && !resetNext) doEquals();

    stored = display;
    pendingOp = op;
    resetNext = true;
    modeLabel.textContent = op;
}

const endpoint = {
    add: "/add/",
    subtract: "/sub/",
    multiply: "/mul/",
    divide: "/div/"
};

async function doEquals() {
    if (!pendingOp) return;

    let url = `${endpoint[pendingOp]}${stored}/${display}`;
    try {
        let res = await fetch(url);
        let json = await res.json();
        let ans =
            json["Your Answer is"] ??
            json["key"] ??
            JSON.stringify(json);

        addHistory(`${stored} ${pendingOp} ${display} = ${ans}`);
        display = String(ans);
    } catch {
        display = "Error";
    }

    stored = null;
    pendingOp = null;
    resetNext = true;
    refresh();
}

/* ---------------------------
   KEYPAD BUTTONS
----------------------------*/
padEl.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    vibe(20);

    if (btn.dataset.num !== undefined) {
        return pressNum(btn.dataset.num);
    }

    let act = btn.dataset.action;
    if (!act) return;

    if (act === "clear") return clearAll();
    if (act === "backspace") return backspace();
    if (act === "plusminus") return plusMinus();
    if (act === "percent") return percent();
    if (act === "equals") return doEquals();

    return operatorPressed(act);
});

/* ---------------------------
   SCIENTIFIC FUNCTIONS
----------------------------*/
sciSwitch.addEventListener("change", () => {
    sciPanel.classList.toggle("show", sciSwitch.checked);
});

document.querySelectorAll(".sci-grid button").forEach((btn) => {
    btn.addEventListener("click", async () => {
        playClick();
        vibe(30);

        btn.classList.add("sci-active");
        setTimeout(() => btn.classList.remove("sci-active"), 200);

        let fn = btn.dataset.sci;
        let x = display;
        let url = "";

        if (fn === "pow") {
            let y = document.getElementById("sciPowY").value || 2;
            url = `/pow/${x}/${y}`;
        } else if (fn === "rand") {
            let n = document.getElementById("sciRandN").value || 10;
            url = `/rand/${n}`;
        } else {
            url = `/${fn}/${x}`;
        }

        try {
            let res = await fetch(url);
            let json = await res.json();
            let ans =
                json["Your Answer is"] ??
                json["key"] ??
                JSON.stringify(json);

            addHistory(`${fn}(${x}) = ${ans}`);
            display = String(ans);
        } catch {
            display = "Error";
        }

        resetNext = true;
        refresh();
    });
});

/* ---------------------------
   HISTORY PANEL
----------------------------*/
function addHistory(line) {
    let item = document.createElement("div");
    item.textContent = line;
    historyList.appendChild(item);
}

historyBtn.addEventListener("click", () => {
    playClick();
    historyPanel.classList.add("show");
});

closeHistory.addEventListener("click", () => {
    playClick();
    historyPanel.classList.remove("show");
});

clearHistory.addEventListener("click", () => {
    playClick();
    historyList.innerHTML = "";
});

/* ---------------------------
   KEYBOARD SUPPORT
----------------------------*/
document.addEventListener("keydown", (e) => {
    if (/[0-9]/.test(e.key)) pressNum(e.key);
    if (e.key === ".") pressNum(".");
    if (e.key === "Enter") doEquals();
    if (e.key === "Backspace") backspace();
    if (e.key === "+") operatorPressed("add");
    if (e.key === "-") operatorPressed("subtract");
    if (e.key === "*") operatorPressed("multiply");
    if (e.key === "/") operatorPressed("divide");
});

/* Initial load */
refresh();
