
        // OBJETO CON FUNCIONES DE VALIDACIÓN
        // Cada propiedad es el ID de un campo y su valor es una función que valida ese campo
        const validators = {
            // Validación para el campo nombre completo
            nombreCompleto: (value) => {
                // Verificar que tenga más de 6 caracteres
                if (value.length <= 6) {
                    return "El nombre debe tener más de 6 caracteres";
                }
                // Verificar que tenga al menos un espacio (para separar nombre y apellido)
                if (!value.includes(' ')) {
                    return "El nombre debe tener al menos un espacio";
                }
                // Separar por espacios y verificar que realmente haya nombre y apellido
                const words = value.trim().split(' ');
                if (words.length < 2 || words.some(word => word.length === 0)) {
                    return "Debe incluir nombre y apellido separados por espacio";
                }
                // Si llegamos aquí, no hay errores
                return null;
            },

            // Validación para el campo email
            email: (value) => {
                // Expresión regular para validar formato de email
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    return "Ingresa un email válido";
                }
                return null; // Sin errores
            },

            // Validación para el campo contraseña
            contrasenia: (value) => {

                if (value.length <= 8) {
                    return "La contraseña debe tener más de 8 caracteres";
                }
                if (!(/[a-zA-Z]/.test(value) && /\d/.test(value))) {
                    return "La contraseña debe contener letras y números";
                }
                return null;
            },

            // Validación para el campo edad
            edad: (value) => {
                const edadNum = parseInt(value, 10);
                if (isNaN(edadNum) || edadNum < 18) {
                    return "Debes tener al menos 18 años";
                }
                return null;
            },
            
            // Validación para el campo telefono
            telefono: (value) => {
                if (!/^\d{7,}$/.test(value)) {
                    return "El teléfono debe tener al menos 7 dígitos y no contener símbolos";
                }
                return null;
            },
            
            // Validación para el campo direccion
            direccion: (value) => {
                if (value.length < 5) {
                    return "La dirección debe tener al menos 5 caracteres";
                }
                if (!/[a-zA-Z]/.test(value) || !/\d/.test(value)) {
                    return "La dirección debe contener letras y números";
                }
                if (!value.includes(' ')) {
                    return "La dirección debe tener al menos un espacio";
                }
                return null;
            },
            
            // Validación para el campo Ciudad
            ciudad: (value) => {
                if (value.length < 3) {
                    return "La ciudad debe tener al menos 3 caracteres";
                }
                return null;
            },
            
            // Validación para el campo Codigo Postal
            cp: (value) => {
                if (value.length < 3) {
                    return "El código postal debe tener al menos 3 caracteres";
                }
                return null;
            },
            
            // Validación para el campo DNI
            dni: (value) => {
                if (!/^\d{7,8}$/.test(value)) {
                    return "El DNI debe tener 7 u 8 dígitos numéricos";
                }
                return null;
            },
            
        };

        // FUNCIÓN PARA MOSTRAR MENSAJES DE ERROR
        // Recibe el ID del campo y el mensaje de error a mostrar
        function showError(fieldId, message) {
            const field = document.getElementById(fieldId); // Obtener el input
            const errorDiv = document.getElementById(`error-${fieldId}`); // Obtener el div del mensaje
            
            field.classList.add('error'); // Agregar clase CSS para estilo de error
            errorDiv.textContent = message; // Establecer el texto del error
            errorDiv.classList.add('show'); // Agregar clase para mostrar con animación
        }

        // FUNCIÓN PARA LIMPIAR MENSAJES DE ERROR
        // Recibe el ID del campo del cual limpiar el error
        function clearError(fieldId) {
            const field = document.getElementById(fieldId);
            const errorDiv = document.getElementById(`error-${fieldId}`);
            
            field.classList.remove('error'); // Quitar clase de error del input
            errorDiv.textContent = ''; // Limpiar texto del mensaje
            errorDiv.classList.remove('show'); // Ocultar mensaje con animación
        }

        // FUNCIÓN PRINCIPAL DE VALIDACIÓN
        // Valida un campo específico y muestra/oculta errores según corresponda
        function validateField(fieldId) {
            const field = document.getElementById(fieldId);
            const value = field.value.trim(); // Obtener valor sin espacios al inicio/final
            
            // Verificar si el campo está vacío
            if (!value) {
                showError(fieldId, 'Este campo es obligatorio');
                return false; // Validación falló
            }

            // Buscar la función de validación específica para este campo
            const validator = validators[fieldId];
            if (validator) {
                const error = validator(value); // Ejecutar validación
                if (error) {
                    showError(fieldId, error); // Mostrar error si existe
                    return false;
                } else {
                    clearError(fieldId); // Limpiar error si validación pasó
                    return true;
                }
            }
            return true; // Si no hay validador específico, considerar válido
        }

        // ARRAY CON LOS IDs DE TODOS LOS CAMPOS A VALIDAR
        const fields = ['nombreCompleto', 'email','contrasenia','edad','telefono','direccion','ciudad','cp','dni'];
        
        // CONFIGURAR EVENT LISTENERS PARA CADA CAMPO
        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            
            // Evento 'blur': se ejecuta cuando el usuario sale del campo (pierde el foco)
            field.addEventListener('blur', () => {
                validateField(fieldId); // Validar cuando el usuario termine de editar
            });
            
            // Evento 'focus': se ejecuta cuando el usuario entra al campo (obtiene el foco)
            field.addEventListener('focus', () => {
                clearError(fieldId); // Limpiar error para que el usuario pueda corregir
            });
        });

        // FUNCIONALIDAD BONUS: TÍTULO DINÁMICO
        const nombreField = document.getElementById('nombreCompleto');
        const titleElement = document.getElementById('dynamicTitle');

        // Función que actualiza el título basándose en el nombre ingresado
        function updateTitle() {
            const nombre = nombreField.value.trim();
            if (nombre) {
                // Si hay texto, mostrar "HOLA [NOMBRE]" en mayúsculas
                titleElement.textContent = `HOLA ${nombre.toUpperCase()}`;
            } else {
                // Si no hay texto, mostrar solo "HOLA"
                titleElement.textContent = 'HOLA';
            }
        }

        // Agregar event listeners para actualizar el título en tiempo real
        nombreField.addEventListener('keydown', updateTitle); // Al presionar teclas
        nombreField.addEventListener('focus', updateTitle);   // Al enfocar el campo
        nombreField.addEventListener('input', updateTitle);   // Al cambiar el contenido

        // CONFIGURACIÓN DEL MODAL (VENTANA EMERGENTE)
        const modal = document.getElementById('modal');
        const closeBtn = document.getElementsByClassName('close')[0];

        // Cerrar modal cuando se hace clic en la X
        closeBtn.onclick = function() {
            modal.style.display = 'none';
        }

        // Cerrar modal cuando se hace clic fuera de él
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }

        // MANEJO DEL ENVÍO DEL FORMULARIO
        document.getElementById('mainForm').addEventListener('submit', function(e) {
            e.preventDefault(); // Prevenir envío normal del formulario
            
            let hasErrors = false; // Flag para saber si hay errores
            const errors = []; // Array para recopilar errores
            
            // VALIDAR TODOS LOS CAMPOS
            fields.forEach(fieldId => {
                if (!validateField(fieldId)) {
                    hasErrors = true;
                    // Recopilar información del error para el modal
                    const field = document.getElementById(fieldId);
                    const label = field.previousElementSibling.textContent; // Obtener texto del label
                    const errorMsg = document.getElementById(`error-${fieldId}`).textContent;
                    errors.push(`${label}: ${errorMsg}`);
                }
            });

            // PREPARAR Y MOSTRAR EL MODAL
            const modalTitle = document.getElementById('modalTitle');
            const modalBody = document.getElementById('modalBody');
            
            if (hasErrors) {
                // Si hay errores, mostrar lista de errores
                modalTitle.textContent = 'Errores en el Formulario';
                modalBody.innerHTML = `
                    <div class="error-list">
                        <h3>Por favor, corrige los siguientes errores:</h3>
                        <ul>
                            ${errors.map(error => `<li>${error}</li>`).join('')}
                        </ul>
                    </div>
                `;
            } else {
                // Si no hay errores, mostrar datos del formulario
                modalTitle.textContent = 'Formulario Enviado Correctamente';
                const formData = new FormData(this); // Obtener datos del formulario
                let dataHtml = '';
                
                // Generar HTML para mostrar cada campo y su valor
                for (let [key, value] of formData.entries()) {
                    const label = document.querySelector(`label[for="${key}"]`).textContent;
                    dataHtml += `
                        <div class="data-item">
                            <div class="data-label">${label}:</div>
                            <div>${value}</div>
                        </div>
                    `;
                }
                
                modalBody.innerHTML = dataHtml;
            }
            
            // Mostrar el modal
            modal.style.display = 'block';
        });