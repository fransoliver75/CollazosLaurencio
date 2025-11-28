document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("futForm");
  const resultado = document.getElementById("resultado");

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    // Tomamos todos los valores del formulario
    const datos = {
      resumen: form.resumen.value,
      dependencia: form.dependencia.value,
      apellido_paterno: form.apellido_paterno.value,
      apellido_materno: form.apellido_materno.value,
      nombres: form.nombres.value,
      dni: form.dni.value,
      ruc: form.ruc.value,
      ce: form.ce.value,
      correo: form.correo.value,
      tipo_via: form.tipo_via.value,
      nombre_via: form.nombre_via.value,
      num_inmueble: form.num_inmueble.value,
      provincia: form.provincia.value,
      distrito: form.distrito.value,
      referencia: form.referencia.value,
      fundamentacion: form.fundamentacion.value,
      lugar: form.lugar.value,
      fecha: form.fecha.value
    };

    // Mostramos el resultado debajo del formulario
    resultado.innerHTML = `
      <h3>📋 Resumen de la Información Ingresada</h3>
      <p><strong>Resumen del pedido:</strong> ${datos.resumen}</p>
      <p><strong>Dependencia:</strong> ${datos.dependencia}</p>
      <p><strong>Solicitante:</strong> ${datos.apellido_paterno} ${datos.apellido_materno}, ${datos.nombres}</p>
      <p><strong>DNI:</strong> ${datos.dni} | <strong>RUC:</strong> ${datos.ruc} | <strong>C.E.:</strong> ${datos.ce}</p>
      <p><strong>Correo:</strong> ${datos.correo}</p>
      <p><strong>Dirección:</strong> ${datos.tipo_via} ${datos.nombre_via} N° ${datos.num_inmueble}, ${datos.provincia} - ${datos.distrito}. Ref: ${datos.referencia}</p>
      <p><strong>Fundamentación:</strong> ${datos.fundamentacion}</p>
      <p><strong>Lugar:</strong> ${datos.lugar} | <strong>Fecha:</strong> ${datos.fecha}</p>
    `;
  });
});
