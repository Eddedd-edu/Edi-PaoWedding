(function () {
    "use strict";

    /* ====================================================
       1. BASE DE DATOS LOCAL DE INVITADOS
       ==================================================== */
    const listaInvitados = {
        "PAPIYMA": { nombre: "Papá y Má", cupos: 2 },
        "STIVE":  { nombre: "Stiwar", cupos: 1 },
        "MAMI":  { nombre: "Mamá", cupos: 1 },
        "ANGJAV":  { nombre: "Manita y Javi", cupos: 2 },
        "ERES":   { nombre: "Padre y Madre", cupos: 2 },
        "ROBFAR":   { nombre: "Don Rowel y Tía Farly", cupos: 2 },
        "CARKEV":   { nombre: "Tía Carmenza y Tío Kevin", cupos: 2 }
    };

    /* ====================================================
       2. URL DEL GOOGLE APPS SCRIPT PARA R.S.V.P.
       ==================================================== */
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx8EWLLccIEabQW-TgEtmDzv7pPt0aC_70zkW5nyL4AO6d5oXAHiKPWIndFYsZYR_CD/exec';

    /* ====================================================
       3. CONTADOR REGRESIVO
       ==================================================== */
    const weddingDate = new Date("2026-12-12T15:00:00-05:00").getTime();
    const elDias = document.getElementById("days");
    const elHoras = document.getElementById("hours");
    const elMinutos = document.getElementById("minutes");
    const elSegundos = document.getElementById("seconds");

    function actualizarContador() {
        const ahora = Date.now();
        const distancia = weddingDate - ahora;

        if (distancia <= 0) {
            elDias.textContent = "00";
            elHoras.textContent = "00";
            elMinutos.textContent = "00";
            elSegundos.textContent = "00";
            return;
        }

        elDias.textContent = String(Math.floor(distancia / 86400000)).padStart(2, '0');
        elHoras.textContent = String(Math.floor((distancia % 86400000) / 3600000)).padStart(2, '0');
        elMinutos.textContent = String(Math.floor((distancia % 3600000) / 60000)).padStart(2, '0');
        elSegundos.textContent = String(Math.floor((distancia % 60000) / 1000)).padStart(2, '0');
    }
    actualizarContador();
    setInterval(actualizarContador, 1000);

    /* ====================================================
       4. ANIMACIÓN INNOVADORA: EFECTO DE HOJAS CAYENDO (HERO)
       ==================================================== */
    function crearEfectoHojas() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const hero = document.getElementById('hero-header');
        const iconosHojas = ['🍂', '🍁', '🍃', '💍','🍀'];
        const maxHojas = 12;

        for (let i = 0; i < maxHojas; i++) {
            const hoja = document.createElement('div');
            hoja.className = 'hoja-caida';
            hoja.innerText = iconosHojas[Math.floor(Math.random() * iconosHojas.length)];
            hoja.style.left = Math.random() * 100 + '%';
            hoja.style.top = Math.random() * -20 + 'px';
            
            const duracion = Math.random() * 5 + 6;
            const retraso = Math.random() * -10;
            
            hoja.style.animation = `caerHoja ${duracion}s linear ${retraso}s infinite`;
            hero.appendChild(hoja);
        }

        const estiloAnimacion = document.createElement('style');
        estiloAnimacion.innerHTML = `
            @keyframes caerHoja {
                0% { transform: translateY(0) rotate(0deg); opacity: 0; }
                10% { opacity: 0.7; }
                90% { opacity: 0.4; }
                100% { transform: translateY(105vh) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(estiloAnimacion);
    }
    crearEfectoHojas();

    /* ====================================================
       5. INTERSECTION OBSERVER (REVELACIÓN AL HACER SCROLL)
       ==================================================== */
    const opcionesObserver = { threshold: 0.12, rootMargin: "0px 0px -40px 0px" };

    const observerElementos = new IntersectionObserver(function(entradas, observer) {
        entradas.forEach(function(entrada) {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visible');
                observer.unobserve(entrada.target);
            }
        });
    }, opcionesObserver);

    document.querySelectorAll('.revelar-elemento').forEach(function(el) {
        observerElementos.observe(el);
    });

    document.querySelectorAll('.timeline-item').forEach(function(el, index) {
        observerElementos.observe(el);
        el.style.transitionDelay = `${index * 0.1}s`;
    });

    /* ====================================================
       6. AGREGAR AL CALENDARIO (.ics)
       ==================================================== */
    const btnCalendario = document.getElementById('btn-calendario');
    btnCalendario.addEventListener('click', function (e) {
        e.preventDefault();
        const icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Boda Edi & Pao//ES',
            'BEGIN:VEVENT',
            'UID:' + Date.now() + '@boda-edipao',
            'DTSTAMP:20260101T000000Z',
            'DTSTART:20261212T200000Z',
            'DTEND:20261213T030000Z',
            'SUMMARY:Boda de Edi & Pao',
            'DESCRIPTION:Ceremonia y celebración en el Hotel Iguaima, Cañón del Combeima, Ibagué.',
            'LOCATION:Hotel Iguaima, Cañón del Combeima, Ibagué, Tolima',
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\r\n');

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const enlace = document.createElement('a');
        enlace.href = url;
        enlace.download = 'boda-edi-pao.ics';
        document.body.appendChild(enlace);
        enlace.click();
        document.body.removeChild(enlace);
        URL.revokeObjectURL(url);
    });

    /* ====================================================
       7. LÓGICA DEL FORMULARIO RSVP CON RESTRICCIÓN DE USO
       ==================================================== */
    const inputCodigo = document.getElementById('codigo-acceso');
    const errorMensaje = document.getElementById('error-mensaje');
    const loginSection = document.getElementById('login-section');
    const formulario = document.getElementById('formulario-confirmacion');
    const asistenciaSelect = document.getElementById('asistencia');
    const divPases = document.getElementById('div-pases');
    const selectPases = document.getElementById('numero-pases');
    const btnSubmit = document.getElementById('btn-submit');
    const formError = document.getElementById('form-error');

    function validarCodigo() {
        const codigo = inputCodigo.value.toUpperCase().trim();
        const invitado = listaInvitados[codigo];

        if (!invitado) {
            errorMensaje.innerHTML = '<i class="fa-solid fa-circle-exclamation" aria-hidden="true"></i> Código no válido. Intenta de nuevo.';
            errorMensaje.classList.remove('oculto');
            inputCodigo.setAttribute('aria-invalid', 'true');
            return;
        }

        if (localStorage.getItem('rsvp_confirmado_' + codigo)) {
            errorMensaje.innerHTML = '<i class="fa-solid fa-circle-info" aria-hidden="true"></i> Este código ya fue utilizado para confirmar asistencia.';
            errorMensaje.classList.remove('oculto');
            return;
        }

        errorMensaje.classList.add('oculto');
        loginSection.classList.add('oculto');
        formulario.classList.remove('oculto');

        document.getElementById('saludo-invitado').textContent = `¡Bienvenido(a), ${invitado.nombre}!`;
        document.getElementById('nombre-interno').value = invitado.nombre;
        document.getElementById('codigo-interno').value = codigo;
        document.getElementById('max-pases').textContent = invitado.cupos;

        selectPases.innerHTML = '';
        for (let i = 1; i <= invitado.cupos; i++) {
            const opcion = document.createElement('option');
            opcion.value = String(i);
            opcion.textContent = i === 1 ? '1 persona' : `${i} personas`;
            selectPases.appendChild(opcion);
        }

        formulario.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    document.getElementById('btn-validar').addEventListener('click', validarCodigo);
    inputCodigo.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); validarCodigo(); }
    });

    asistenciaSelect.addEventListener('change', function () {
        if (this.value === "Sí, asistiré") divPases.classList.remove('oculto');
        else divPases.classList.add('oculto');
    });

    formulario.addEventListener('submit', function (e) {
        e.preventDefault();
        formError.classList.add('oculto');

        if (!asistenciaSelect.value || !document.getElementById('hospedaje').value) {
            formError.textContent = 'Por favor completa todos los campos obligatorios.';
            formError.classList.remove('oculto');
            return;
        }

        btnSubmit.textContent = "Enviando...";
        btnSubmit.disabled = true;

        const codigoUsado = document.getElementById('codigo-interno').value;
        const datos = {
            codigo: codigoUsado,
            nombre: document.getElementById('nombre-interno').value,
            asistencia: asistenciaSelect.value,
            asistentes: asistenciaSelect.value === 'Sí, asistiré' ? selectPases.value : 0,
            hospedaje: document.getElementById('hospedaje').value,
            restricciones: document.getElementById('menu').value.trim() || 'Ninguna'
        };

        fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: { 'Content-Type': 'text/plain;charset=utf-8' }
        })
        .then(function (respuesta) {
            if (!respuesta.ok) throw new Error('Respuesta no válida del servidor');
            return respuesta.json().catch(function () { return {}; });
        })
        .then(function () {
            localStorage.setItem('rsvp_confirmado_' + codigoUsado, 'true');
            document.getElementById('rsvp-modulo').innerHTML =
                '<div class="confirmacion-final">' +
                '<i class="fa-solid fa-circle-check" aria-hidden="true"></i>' +
                '<h3 class="fuente-elegante">¡Gracias!</h3>' +
                '<p>Tu confirmación ha sido recibida con éxito. ¡Nos vemos el 12 de diciembre!</p>' +
                '</div>';
        })
        .catch(function (error) {
            console.error('Error al enviar RSVP:', error);
            formError.textContent = 'Hubo un problema al enviar tu confirmación. Por favor intenta de nuevo.';
            formError.classList.remove('oculto');
            btnSubmit.textContent = "Confirmar Asistencia";
            btnSubmit.disabled = false;
        });
    });

    /* ====================================================
       8. MODAL DRESS CODE
       ==================================================== */
    const modal = document.getElementById('modal-dress-code');
    const modalClose = document.getElementById('modal-close');

    window.abrirModal = function () {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };
    function cerrarModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
    modal.addEventListener('click', function (e) {
        if (e.target === modal) cerrarModal();
    });
    modalClose.addEventListener('click', cerrarModal);
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.style.display === 'block') cerrarModal();
    });
})();
