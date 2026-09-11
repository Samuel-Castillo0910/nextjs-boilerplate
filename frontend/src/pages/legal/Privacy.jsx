export default function Privacy() {
  return (
    <main id="main-content" className="container" style={{ padding: "0 32px" }}>
      <section className="glass-panel" style={{ padding: "36px 32px", margin: "16px 0", maxWidth: "760px" }}>
        <h1>Política de privacidad</h1>
        <p style={{ fontSize: "0.85rem" }}>Última actualización: [fecha real de publicación]</p>

        <p>
          Este es un borrador base. Debe ser revisado por un abogado antes de publicarse, para
          ajustarlo a la Ley 1581 de 2012 (Colombia), al RGPD si hay usuarios en la Unión Europea,
          y a cualquier otra ley aplicable a los países donde opere el sitio.
        </p>

        <h2>1. Responsable del tratamiento</h2>
        <p>
          [Razón social real], NIT [número real], con domicilio en [dirección real], es responsable
          del tratamiento de los datos personales recolectados en este sitio.
        </p>

        <h2>2. Datos que recolectamos</h2>
        <p>Solo recolectamos los datos estrictamente necesarios para cada finalidad:</p>
        <ul>
          <li>Formulario de contacto: nombre, correo electrónico y el mensaje enviado</li>
          <li>Cookies de analítica (solo si das tu consentimiento explícito)</li>
        </ul>
        <p>No recolectamos datos sensibles ni datos de menores de edad a través de este sitio.</p>

        <h2>3. Finalidad del tratamiento</h2>
        <p>Usamos tus datos únicamente para responder tus consultas y, si lo autorizas, para entender el uso del sitio con fines de mejora.</p>

        <h2>4. Tus derechos</h2>
        <p>
          Puedes conocer, actualizar, rectificar y solicitar la supresión de tus datos, así como
          revocar tu autorización, escribiendo a [correo real de contacto de datos].
        </p>

        <h2>5. Conservación</h2>
        <p>Conservamos tus datos solo durante el tiempo necesario para atender tu solicitud, salvo obligación legal de conservarlos por más tiempo.</p>

        <h2>6. Terceros y proveedores</h2>
        <p>
          [Detallar aquí cualquier proveedor externo que procese datos: hosting, analítica,
          correo transaccional, etc., incluyendo dónde se almacenan los datos.]
        </p>

        <h2>7. Contacto</h2>
        <p>Para ejercer tus derechos o resolver dudas: [correo real] · [teléfono real].</p>
      </section>
    </main>
  );
}
