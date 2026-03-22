// ===== Automated Tests for Weather App =====
// These tests check that our app files are correct
// Run with: npm test

const fs = require("fs");   // File system module (built into Node.js)
const path = require("path"); // Path module (built into Node.js)

// Track test results
let passed = 0;
let failed = 0;

// ===== Helper function to run a test =====
function test(name, condition) {
    if (condition) {
        console.log(`  ✅ PASS: ${name}`);
        passed++;
    } else {
        console.log(`  ❌ FAIL: ${name}`);
        failed++;
    }
}

// ===== Get file paths =====
const rootDir = path.join(__dirname, "..");
const htmlFile = path.join(rootDir, "index.html");
const cssFile = path.join(rootDir, "style.css");
const jsFile = path.join(rootDir, "script.js");

console.log("\n🧪 Running Weather App Tests...\n");

// ===== Test 1: Check if required files exist =====
console.log("📁 File Existence Tests:");
test("index.html exists", fs.existsSync(htmlFile));
test("style.css exists", fs.existsSync(cssFile));
test("script.js exists", fs.existsSync(jsFile));

// ===== Test 2: Check HTML content =====
console.log("\n📄 HTML Content Tests:");
const html = fs.readFileSync(htmlFile, "utf-8");
test("HTML has a title", html.includes("<title>"));
test("HTML has city input field", html.includes('id="cityInput"'));
test("HTML has search button", html.includes('id="searchBtn"'));
test("HTML has weather card", html.includes('id="weatherCard"'));
test("HTML has temperature display", html.includes('id="temperature"'));
test("HTML loads style.css", html.includes('href="style.css"'));
test("HTML loads config.js", html.includes('src="config.js"'));
test("HTML loads script.js", html.includes('src="script.js"'));

// ===== Test 3: Check CSS content =====
console.log("\n🎨 CSS Content Tests:");
const css = fs.readFileSync(cssFile, "utf-8");
test("CSS has body styles", css.includes("body"));
test("CSS has container styles", css.includes(".container"));
test("CSS has search-box styles", css.includes(".search-box"));
test("CSS has weather-card styles", css.includes(".weather-card"));

// ===== Test 4: Check JavaScript content =====
console.log("\n⚙️ JavaScript Content Tests:");
const js = fs.readFileSync(jsFile, "utf-8");
test("JS has getWeather function", js.includes("function getWeather"));
test("JS has displayWeather function", js.includes("function displayWeather"));
test("JS has showError function", js.includes("function showError"));
test("JS uses fetch API", js.includes("fetch("));
test("JS has click event listener", js.includes('addEventListener("click"'));
test("JS does NOT have hardcoded API key", !js.includes("ff3060c71269327bc59ba2a864f79bb0"));

// ===== Test 5: Check Dockerfile exists =====
console.log("\n🐳 Docker Tests:");
const dockerFile = path.join(rootDir, "Dockerfile");
test("Dockerfile exists", fs.existsSync(dockerFile));

// ===== Results =====
console.log("\n" + "=".repeat(40));
console.log(`📊 Results: ${passed} passed, ${failed} failed`);
console.log("=".repeat(40) + "\n");

// Exit with error code if any test failed (this stops CI/CD)
if (failed > 0) {
    process.exit(1); // Exit code 1 = failure
} else {
    console.log("🎉 All tests passed!\n");
    process.exit(0); // Exit code 0 = success
}
