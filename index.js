const container = document.querySelector(".container")
const button = document.querySelector(".button")

button?.addEventListener("click", () => {
  const text = document.createElement("p")
  text.textContent = "привет"
  container?.append(text)
})