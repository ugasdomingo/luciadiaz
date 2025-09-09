export const medical_history_questions = [
    {
        title: 'Preguntas generales',
        questions: [
            { question: 'Nombre Completo', type: 'text' },
            { question: 'Fecha de Nacimiento', type: 'date' },
            { question: 'Contacto de Emergencia (Ej: +34 123 45 67 89)', type: 'tel' },
            { question: 'Documento de Identificación', type: 'text' },
            { question: 'Nacionalidad', type: 'text' },
            { question: 'Dirección de Residencia', type: 'text' },
            { question: 'Dirección de Trabajo', type: 'text' },
            { question: 'Ocupación', type: 'text' },
            { question: 'Estado Civil', type: 'text' },
            { question: '¿Quien le sugirió la consulta?', type: 'text' },
            { question: '¿Tiene seguro médico?', type: 'text' }
        ]
    },
    {
        title: 'Antededentes Médicos',
        questions: [
            { question: '¿Sufre alguna enfermedad actualmente? indique cual(es)', type: 'textarea' },
            { question: '¿Ha sufrido alguna enfermedad en el pasado? indique cual(es)', type: 'textarea' },
            { question: 'Indique las fechas de las enfermedades anteriores (si aplica)', type: 'textarea' },
            { question: '¿Se encuentra bajo tratamiento médico actualmente? indique cual(es)', type: 'textarea' },
            { question: 'Indique las dosis y frecuencia de los medicamentos (si aplica)', type: 'textarea' },
            { question: 'Nombre y teléfono del médico tratante (si aplica)', type: 'text' },
            { question: '¿Has estado en tratamiento psicológico o psiquiátrico? indique cual(es)', type: 'textarea' }
        ]
    },
    {
        title: 'Informacióm Matrimonial',
        questions: [
            { question: 'Nombre de la pareja', type: 'text' },
            { question: 'Edad de la pareja', type: 'text' },
            { question: 'Ocupación de la pareja', type: 'text' },
            { question: 'Grado de formación de la pareja', type: 'text' },
            { question: 'Tipo de relación (Matrimonio, Noviazgo, Convivencia)', type: 'text' },
            { question: 'Tiempos de relación', type: 'text' },
            { question: 'Matrimonio anterior suyos (si aplica, indica fecha y edades de los hijos)', type: 'textarea' },
            { question: 'Matrimonio anterior de la pareja (si aplica, indica fecha y edades de los hijos)', type: 'textarea' },
            { question: 'Del 1 al 10 tu grado de satisfacción con comunicaión con tu pareja', type: 'number' },
            { question: 'Del 1 al 10 tu grado de satisfacción con roles y responsabilidades en el hogar', type: 'number' },
            { question: 'Del 1 al 10 tu grado de satisfacción con manifestaciones afectivas de tu pareja', type: 'number' },
            { question: 'Del 1 al 10 tu grado de satisfacción con realciones sexuales', type: 'number' },
            { question: 'Del 1 al 10 tu grado de satisfacción con actividades sociales compartidas', type: 'number' },
            { question: 'Del 1 al 10 tu grado de satisfacción con recreación y tiempo libre', type: 'number' },
            { question: 'Del 1 al 10 tu grado de satisfacción con manejo de finanzas', type: 'number' },
            { question: 'Del 1 al 10 tu grado de satisfacción con métodos de crianza de los hijos', type: 'number' },
            { question: 'Del 1 al 10 tu grado de satisfacción con relación con familia política', type: 'number' }
        ]
    },
    {
        title: 'Información de los hijos',
        questions: [
            { question: '¿Tiene hijos?', type: 'text' },
            { question: 'Número de hijos', type: 'number' },
            { question: 'Edades de los hijos', type: 'text' },
            { question: 'Del 1 al 10 tu grado de satisfacción con la relación con cada uno de tus hijos', type: 'number' }
        ]
    },
    {
        title: 'Información de la familia',
        questions: [
            { question: 'Indica el nombre, parentesco y grado de satisfacción (del 1 al 10) con un miembro de tu familia', type: 'textarea' },
            { question: 'Indica el nombre, parentesco y grado de satisfacción (del 1 al 10) con un miembro de tu familia', type: 'textarea' },
            { question: 'Indica el nombre, parentesco y grado de satisfacción (del 1 al 10) con un miembro de tu familia', type: 'textarea' },
            { question: 'Indica el nombre, parentesco y grado de satisfacción (del 1 al 10) con un miembro de tu familia', type: 'textarea' },
            { question: 'Indica el nombre, parentesco y grado de satisfacción (del 1 al 10) con un miembro de tu familia', type: 'textarea' },
            { question: 'Si existen o han existido problemas mentales o emocionales en tu familia, por favor descríbalos.', type: 'textarea' },
            { question: 'Cómo describiría el tipo de realaciones que predominan en tu familia? (familia unida, independiente, distante, conflictiva, etc.)', type: 'textarea' }
        ]
    },
    {
        title: 'Información Religiosa',
        questions: [
            { question: 'Pertenece a alguna religión?', type: 'text' },
            { question: 'Del 1 al 10 indique ¿Qué tan creyente es usted?', type: 'number' },
            { question: 'Del 1 al 10 indique ¿Qué tan practicante es usted?', type: 'number' }
        ]
    },
    {
        title: 'Ambiente Social',
        questions: [
            { question: '¿Con quién vive actualmente? (indique nombre, edad y parentesco)', type: 'textarea' },
            { question: '¿Qué personas son importante para usted? Incluya personas con quieres actualmente tiene alguna realción continua o permanente, Nore pita ninguno de los nombres que dio en la pregunta anterior. (indique nombre, edad y parentesco)', type: 'textarea' },
            { question: 'Del 1 al 10 ¿Con qué frecuencia participa usted en actividades sociales? (Reuniones con amigos fiestas, paseos, etc.)', type: 'number' },
            { question: 'Del 1 al 10 ¿Qué tan satisfecho está usted con sus actividades sociales?', type: 'number' }
        ]
    },
    {
        title: 'Información Académica',
        questions: [
            { question: 'Describa en orden cronológico los colegios en los cuales ha estudiado', type: 'textarea' },
            { question: 'Describa en orden cronológico sus estudios universitarios', type: 'textarea' },
            { question: 'Del 1 al 10 ¿Cómo es o fue, en general, su desempeño académico?', type: 'number' },
            { question: 'Del 1 al 10 ¿Cuál es tu nivel de satisfación con el estudio, si te encuentras estudiando actualmente?', type: 'number' }
        ]
    },
    {
        title: 'Información Laboral',
        questions: [
            { question: '¿Estás trabajando actualmente?', type: 'text' },
            { question: '¿Cuál es tu ocupación actual?', type: 'text' },
            { question: 'Nombre de la empresa', type: 'text' },
            { question: 'Cargo', type: 'text' },
            { question: 'Describa con precisión lo que hace, incluyendo funciones específicas', type: 'textarea' },
            { question: '¿Cuál es tu horario de trabajo?', type: 'text' },
            { question: '¿Qué trabajos has desepeñado anteriormente? (indica nombre de la empresa, cargo, fecha y motivo de retiro)', type: 'textarea' },
            { question: 'Del 1 al 10 ¿Cuál es tu grado de satisfacción en el Desarrollo Personal?', type: 'number' },
            { question: 'Del 1 al 10 ¿Cuál es tu grado de satisfacción en la Remuneración Económica?', type: 'number' },
            { question: 'Del 1 al 10 ¿Cuál es tu grado de satisfacción en las Realciones Laborales?', type: 'number' },
            { question: 'Del 1 al 10 ¿Cuál es tu grado de tensión o estrés por su trabajo?', type: 'number' }
        ]
    },
    {
        title: 'Adiciones, Intereses y Recreación',
        questions: [
            { question: 'Escribe las actividades que haces actualmente en tu tiempo libre, incluye la frecuencia con la que las realizas (diario, semanal, mensual) y del 1 al 5 la satisfacción que te producen', type: 'textarea' },
            { question: 'Escribe las aficiones o intereses que tenías en el pasado y actualmente ya no tienes, incluye la frecuencia con la que las realizabas (diario, semanal, mensual) y del 1 al 5 la satisfacción que te producían', type: 'textarea' },
            { question: '¿Qué tipo de aficiones o actividades de recreación que no estás realizando en la actualidad te gustaría desarrollar en el futuro?, incluye la frecuencia con que las harías (diario, semanal, mensual) y del 1 al 5 la satisfacción que te producirían', type: 'textarea' },
            { question: 'Del 1 al 10 ¿Cuál es tu nivel de satisfacción actual en tus adiciones, intereses y recreación?', type: 'number' }
        ]
    },
    {
        title: 'Autodescripción',
        questions: [
            { question: 'Describe tu aspecto físico, ¿Cómo es usted?', type: 'textarea' },
            { question: '¿Cuáles son tus preferencias? ¿Qué te gusta? ¿Qué cosas, personas, situaciones o actividades te producen agrado o placer?', type: 'textarea' },
            { question: '¿Qué cosas, personas, situaciones o actividades específicas te producen nervios, incomodidad, tensión o tristeza?', type: 'textarea' },
            { question: '¿Qué tipo de reacciones tiene usted cuando está de mal genio? ¿Qué cosas hace?', type: 'textarea' },
            { question: '¿Qué tipo de reacciones tiene usted cuando está nerviosa(o) o tensa(o)?', type: 'textarea' },
            { question: 'Generalmente, ¿Qué hace y cómo reacciona cuando esta triste?', type: 'textarea' },
            { question: '¿Cuáles son tus cualidades personales? ¿Qué diría una persona que le conoce bien si le preguntan cuáles son sus puntos positivos? Por favor sea específica(o)', type: 'textarea' },
            { question: '¿Cuáles son tus limitaciones personales? ¿Qué diría una persona que le conoce bien si le preguntan cuáles son sus principales defectos? Por favor sea específica(o)', type: 'textarea' }
        ]
    },
    {
        title: 'Motivo de Consulta',
        questions: [
            { question: 'Por favor, describe las principales razones, problemas o quejas por los cuales ha decidido buscar asesoría psicológica', type: 'textarea' },
            { question: '¿Desde cuándo has tenido estás dificultades?', type: 'textarea' },
            { question: '¿A qué cree que se deben estos problemas?', type: 'textarea' },
            { question: '¿Qué personas, situaciones o actividades parecen producir o empeorar estas dificultades?', type: 'textarea' },
            { question: '¿Qué personas, situaciones o actividades parecen ayudar o mejorar estas dificultades?', type: 'textarea' },
            { question: '¿A quién le ha pedido consejo respecto a estos problemas? ¿Cuándo y con qué resultados?', type: 'textarea' }
        ]
    },
    {
        title: 'Otras áreas de ajuste',
        questions: [
            { question: '¿Tiene o ha tenido dificultades para hacerse respetar y para hacer valer sus derechos, o para expresar desacuerdo o resentimiento cuando es apropiado, o para impedir que otras personas se aprovechen de Usted? Por favor, explique.', type: 'textarea' },
            { question: '¿Tiene o ha tenido períodos de profunda tristeza o depresión en los que no siente ánimo para desempeñar ninguna actividad? Por favor, explique', type: 'textarea' },
            { question: '¿Ha tenido o tiene actualmente dificultades de tipo sexual?', type: 'textarea' },
            { question: '¿Tiene o ha tenido alguna dificultad en establecer o mantener relaciones satisfactorias de amistad con otras personas? Por favor, explique detalladamente', type: 'textarea' },
            { question: '¿Tiene o ha tenido alguna dificultad para establecer relaciones afectivas con otras personas? Por favor, explique', type: 'textarea' },
            { question: '¿Tiene o ha tenido algún tipo de temor muy intenso ante alguna situación u objeto que interfiera con su actividad normal?', type: 'textarea' },
            { question: '¿Tiene dolores de cabeza con frecuencia?', type: 'textarea' },
            { question: '¿Tiene o ha tenido problemas para controlar su consumo de bebidas alcohólicas? Por favor, explique', type: 'textarea' },
            { question: '¿Ha probado alguna vez marihuana, cocaína, drogas heroicas, u otras sustancias no prescritas médicamente? Por favor, explique.', type: 'textarea' },
            { question: '¿Qué espera obtener del presente tratamiento psicológico?', type: 'textarea' },
            { question: '¿Qué otra información que no haya estado incluida en el presente cuestionario considera que podría ser útil para el tratamiento?', type: 'textarea' }
        ]
    }
];