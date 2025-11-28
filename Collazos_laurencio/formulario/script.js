// Mostrar un formulario y ocultar los demás
function mostrar(id) {
  document.querySelectorAll(".formulario").forEach(f => f.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

// Limpiar formulario
function limpiar(form) {
  form.reset();
}

// Guardar datos en localStorage
document.querySelectorAll("form").forEach(form => {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    let registros = JSON.parse(localStorage.getItem(form.id) || "[]");
    registros.push(data);
    localStorage.setItem(form.id, JSON.stringify(registros));
    alert("✅ Datos guardados en " + form.id);
    form.reset();
  });
});

// Exportar a CSV
function exportar(form) {
  let registros = JSON.parse(localStorage.getItem(form.id) || "[]");
  if (registros.length === 0) return alert("⚠️ No hay datos guardados.");

  let campos = Object.keys(registros[0]);
  let csv = [campos.join(",")];
  registros.forEach(r => {
    csv.push(campos.map(c => r[c]).join(","));
  });

  let blob = new Blob([csv.join("\n")], { type: "text/csv" });
  let link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = form.id + ".csv";
  link.click();
}
