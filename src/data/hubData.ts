export interface Study {
  id: string;
  title: string;
  authors: string;
  year: number;
  source: string;
  category: 'Psicología' | 'Economía' | 'Sociología' | 'Medio Ambiente';
  summary: string;
  methodology: string;
  keyFindings: string[];
  link?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  age: number;
  profile: 'Senior (60+)' | 'DINK' | 'Profesional' | 'Padre/Madre Arrepentido';
  quote: string;
  story: string;
  location?: string;
}

export interface Book {
  title: string;
  author: string;
  year: number;
  description: string;
  tags: string[];
  coverUrl?: string;
  link?: string;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  origin?: string;
}

export interface TestQuestion {
  id: number;
  text: string;
  category: 'lifestyle' | 'emotional' | 'financial';
  options: {
    text: string;
    points: number; // Positive points lean towards Childfree, negative/lower towards Parenting
  }[];
}

export const studiesData: Study[] = [
  {
    id: 'study-1',
    title: 'Prevalencia y satisfacción de los adultos libre de hijos (Childfree) en Michigan',
    authors: 'Zachary P. Neal, Jennifer Watling Neal',
    year: 2021,
    source: 'PLOS ONE / Universidad Estatal de Michigan (MSU)',
    category: 'Psicología',
    summary: 'Este estudio pionero midió de manera precisa la cantidad de adultos que eligen activamente no tener hijos y comparó su nivel de satisfacción con la vida frente a los padres y las personas sin hijos por circunstancias biológicas.',
    methodology: 'Encuesta representativa en el estado de Michigan, EE. UU., con una muestra de 1,000 adultos, controlando factores demográficos y excluyendo a personas indecisas o biológicamente infértiles que deseaban tener hijos.',
    keyFindings: [
      'Aproximadamente el 21.6% (1 de cada 5 adultos) en Michigan se identificaron como libre de hijos (childfree).',
      'No se encontraron diferencias estadísticamente significativas en la satisfacción con la vida entre los adultos childfree y aquellos con hijos.',
      'Los adultos childfree no reportaron mayores niveles de arrepentimiento en edades avanzadas en comparación con los padres una vez jubilados.',
      'Se identificó que el estigma social hacia el grupo childfree sigue siendo alto, a pesar de su gran tamaño demográfico.'
    ],
    link: 'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0252528'
  },
  {
    id: 'study-2',
    title: 'Tendencias demográficas en la redefinición de la familia y el aumento de hogares sin hijos',
    authors: 'Pew Research Center',
    year: 2023,
    source: 'Pew Social & Demographic Trends',
    category: 'Sociología',
    summary: 'Una encuesta exhaustiva sobre los cambios en las actitudes de los adultos en edad fértil con respecto a tener descendencia en un panorama económico y ambiental cambiante.',
    methodology: 'Estudio cuantitativo nacional en EE. UU. con encuestas telefónicas y en línea a más de 8,000 adultos de entre 18 y 49 años.',
    keyFindings: [
      'El 47% de los adultos estadounidenses menores de 50 años que no tienen hijos dicen que es "muy probable" o "algo probable" que nunca los tengan (frente al 37% en 2018).',
      'Las razones principales citadas son: el simple deseo de no tenerlos (57%), el impacto en la libertad personal (44%), motivos financieros (38%) y la preocupación por el cambio climático (26%).',
      'El matrimonio y la paternidad ya no se perciben como hitos obligatorios para la realización personal en las generaciones millenial y Gen Z.'
    ],
    link: 'https://www.pewresearch.org/social-trends/2021/11/19/growing-share-of-childless-u-s-adults-look-unlikely-to-have-children/'
  },
  {
    id: 'study-3',
    title: 'La curva en U de la satisfacción matrimonial y el impacto de la paternidad',
    authors: 'Jean M. Twenge, W. Keith Campbell, Carter A. Foster',
    year: 2003,
    source: 'Journal of Marriage and Family',
    category: 'Psicología',
    summary: 'Un meta-análisis de décadas de investigación que evalúa cómo la transición a la paternidad afecta la calidad y la felicidad del matrimonio en comparación con parejas que permanecen libre de hijos.',
    methodology: 'Análisis sistemático de 148 estudios que involucraron a más de 45,000 parejas en total para trazar la satisfacción conyugal a lo largo del ciclo vital.',
    keyFindings: [
      'Existe una caída significativa en la satisfacción marital inmediatamente después del nacimiento del primer hijo, manteniéndose baja durante la crianza activa.',
      'La satisfacción marital tiende a recuperarse sustancialmente una vez que el último hijo se va del hogar ("nido vacío").',
      'Las parejas childfree muestran una trayectoria de satisfacción marital significativamente más estable y alta a lo largo del tiempo, al no sufrir el estrés de la transición de roles.',
      'El conflicto financiero y la división desigual de las tareas domésticas son los principales catalizadores del declive matrimonial tras ser padres.'
    ]
  },
  {
    id: 'study-4',
    title: 'La brecha de emisiones individuales: El impacto climático de las decisiones de estilo de vida',
    authors: 'Seth Wynes, Kimberly A. Nicholas',
    year: 2017,
    source: 'Environmental Research Letters',
    category: 'Medio Ambiente',
    summary: 'Este influyente estudio calcula y compara el impacto de las diferentes acciones individuales recomendadas para mitigar el calentamiento global, cuantificando la huella de carbono a largo plazo de la reproducción.',
    methodology: 'Cálculo del ciclo de vida y contabilidad de carbono agregada, analizando escenarios en países desarrollados y asignando a los padres una fracción de las emisiones de sus futuros descendientes.',
    keyFindings: [
      'Tener un hijo menos equivale a un ahorro de aproximadamente 58.6 toneladas de CO2 equivalente por año en países con altos ingresos.',
      'Esta decisión tiene un impacto climático decenas de veces mayor que vivir sin auto (2.4 t CO2/año), evitar un vuelo transatlántico (1.6 t CO2/año) o llevar una dieta vegetal (0.8 t CO2/año).',
      'El estudio concluye que las políticas de educación y la libre elección reproductiva son herramientas ambientales de alta prioridad.'
    ],
    link: 'https://iopscience.iop.org/article/10.1088/1748-9326/aa7541'
  },
  {
    id: 'study-5',
    title: 'Madres arrepentidas: Un análisis sociopolítico de la maternidad obligatoria',
    authors: 'Orna Donath',
    year: 2015,
    source: 'Signs: Journal of Women in Culture and Society',
    category: 'Sociología',
    summary: 'Estudio cualitativo pionero que rompió el tabú social de las madres que aman a sus hijos pero que, si pudieran retroceder el tiempo, elegirían no haber sido madres.',
    methodology: 'Entrevistas cualitativas en profundidad con una muestra de 23 madres israelíes de diversas edades y procedencias socioeconómicas.',
    keyFindings: [
      'Es posible amar profundamente a los hijos y, simultáneamente, experimentar un arrepentimiento persistente respecto a la adopción del rol de madre.',
      'El arrepentimiento no se debe necesariamente a la falta de ayuda del padre o a dificultades económicas, sino a la pérdida total de soberanía personal y la insatisfacción intrínseca con la maternidad.',
      'La sociedad suele patologizar este arrepentimiento etiquetándolo como depresión posparto o inestabilidad mental, silenciando una realidad sociológica estructurada.'
    ]
  },
  {
    id: 'study-6',
    title: 'El costo de la crianza de clase media en la Ciudad de Guatemala: Educación y salud privada como mandatos sociales',
    authors: 'ASIES (Asociación de Investigación y Estudios Sociales) / Datos INE',
    year: 2022,
    source: 'Boletín Socioeconómico de Guatemala (ENIGH)',
    category: 'Economía',
    summary: 'Análisis del costo de oportunidad y el gasto real de crianza que enfrentan las familias metropolitanas de clase media en Guatemala para criar a un hijo hasta la mayoría de edad, condicionado por la dependencia de servicios privados.',
    methodology: 'Cálculo a partir de la Encuesta Nacional de Ingresos y Gastos de los Hogares (ENIGH) del INE, cruzado con matrículas de colegios privados y aranceles hospitalarios del área metropolitana.',
    keyFindings: [
      'Un hogar promedio de clase media en la Ciudad de Guatemala gasta entre Q750,000 y Q1.8 millones de Quetzales por hijo hasta los 18 años.',
      'La educación privada representa entre el 35% y el 45% del presupuesto de crianza mensual, debido a la baja cobertura e infraestructura pública de calidad.',
      'La salud y seguros privados (pediatras, emergencias y pólizas médicas) demandan un desembolso promedio de Q800 a Q1,800 mensuales por niño.',
      'El costo de un hijo representa entre el 30% y el 45% de los ingresos de una pareja profesional de clase media en Guatemala, limitando su capacidad de ahorro para su jubilación.'
    ]
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Carmen',
    age: 73,
    profile: 'Senior (60+)',
    quote: 'La gente me decía: "Te vas a arrepentir cuando seas vieja". Ahora tengo 73 años, he tenido una vida maravillosa y libre, y no me arrepiento ni por un segundo.',
    story: 'Mi esposo y yo decidimos en los años 70 que no queríamos hijos. En esa época la presión era tremenda, nos veían como bichos raros. Pero nos mantuvimos firmes. Nos dedicamos a nuestras carreras (yo fui profesora y él arquitecto), viajamos por todo el mundo, estudiamos pasiones y ahorramos lo suficiente para tener una vejez digna en una comunidad de retiro de primer nivel. Hoy en día tengo amigos muy cercanos, sobrinos y vecinos que me visitan. La idea de que necesitas hijos para "no estar solo" en la vejez es una falacia. Nadie te garantiza que tus hijos te cuidarán o vivirán en tu misma ciudad.',
    location: 'Barcelona, España'
  },
  {
    id: 'test-2',
    name: 'Diego y Sofía',
    age: 34,
    profile: 'DINK',
    quote: 'Nos encanta ser DINKs (Doble Ingreso, Sin Hijos). Nos da la libertad de cambiar de carrera, viajar el fin de semana y disfrutar del silencio.',
    story: 'Llevamos 8 años casados. Tomamos la decisión en conjunto antes de casarnos. Descubrimos que ninguno de los dos sentía esa "llamada de la naturaleza". Nos dimos cuenta de que podíamos construir una vida que girara en torno a nuestros propios términos. Trabajamos en tecnología e investigación. Si decidimos irnos de viaje el viernes por la noche, solo empacamos y nos vamos. Financieramente, nos permite ahorrar un alto porcentaje de nuestros ingresos y donar a causas que nos importan. Adoptamos un perro y nos consideramos una familia completa. No nos falta nada.',
    location: 'Santiago, Chile'
  },
  {
    id: 'test-3',
    name: 'Laura',
    age: 42,
    profile: 'Padre/Madre Arrepentido',
    quote: 'Amo a mis hijos, pero si tuviera la información y la madurez que tengo hoy, habría elegido no tenerlos. Ser madre destruyó mi identidad.',
    story: 'Tengo dos hijos preciosos de 10 y 12 años. Hago todo por ellos y soy una madre dedicada. Sin embargo, si soy completamente honesta con mi propia alma: la maternidad ha sido una prisión. Fui madre por inercia social; pensé que era el "siguiente paso natural" en la vida. Nadie me habló del cansancio crónico perpetuo, de cómo tu matrimonio pasa a un plano estrictamente logístico, o de cómo tu cerebro es secuestrado por la preocupación las 24 horas. Perdí mi carrera científica y mi salud mental se deterioró. Desearía que la sociedad normalizara hablar de esto para que las personas que no son aptas o no lo desean con cada fibra de su ser, no caigan en esta trampa por pura presión social.',
    location: 'Ciudad de México, México'
  },
  {
    id: 'test-4',
    name: 'Mateo',
    age: 29,
    profile: 'Profesional',
    quote: 'Elegí la vasectomía a los 27 años. Fue la mejor decisión de salud y autonomía corporal que he tomado.',
    story: 'Siempre supe que no quería hijos, desde que era adolescente. Cuando cumplí 26 años, decidí buscar la vasectomía de forma definitiva. Tuve que pasar por varios médicos que se negaban, cuestionando mi capacidad de decidir a mi edad. Finalmente encontré un urólogo profesional que respetó mi autonomía. El proceso fue simple y rápido. Sentí un alivio enorme. Mi vida está centrada en la música y mi emprendimiento. La paternidad demanda un nivel de energía, paciencia y entrega que yo prefiero canalizar en el arte y en mí mismo. No es egoísmo; al contrario, es tener la responsabilidad de no traer a un ser humano al mundo si no estás 100% comprometido a criarlo.',
    location: 'Medellín, Colombia'
  }
];

export const booksData: Book[] = [
  {
    title: 'The Baby Matrix',
    author: 'Laura Carroll',
    year: 2012,
    description: 'Un análisis profundo de los mitos de la maternidad/paternidad y el "natalismo" (la creencia social de que todos deben procrear). El libro desglosa cómo la sociedad presiona a los individuos mediante ideas preconcebidas y ofrece un camino para liberarse de estas suposiciones.',
    tags: ['Natalismo', 'Sociología', 'Presión Social'],
    link: 'https://www.amazon.com/dp/0615642993'
  },
  {
    title: 'Childfree by Choice',
    author: 'Dr. Amy Blackstone',
    year: 2019,
    description: 'La socióloga Amy Blackstone explora la historia y la realidad de las personas que eligen no tener hijos. Basado en investigaciones y en su propia experiencia personal, el libro explora cómo las personas libre de hijos contribuyen de maneras valiosas y a menudo invisibles a sus familias y comunidades.',
    tags: ['Sociología', 'Felicidad', 'Comunidad'],
    link: 'https://www.amazon.com/dp/1524744095'
  },
  {
    title: 'Regretful Motherhood (Madres Arrepentidas)',
    author: 'Orna Donath',
    year: 2016,
    description: 'La obra completa basada en el estudio sociológico realizado en Israel. Aborda de frente y con gran empatía el tabú social del arrepentimiento materno, distinguiéndolo del rechazo al hijo e iluminando la opresión que genera la maternidad como mandato de género.',
    tags: ['Psicología', 'Maternidad', 'Tabúes'],
    link: 'https://www.amazon.com/dp/1522614917'
  },
  {
    title: 'La vida sin hijos',
    author: 'Lina AbuJamra',
    year: 2021,
    description: 'Un libro centrado en el desarrollo de la identidad personal y profesional fuera de la estructura familiar tradicional. Ofrece reflexiones sobre cómo encontrar propósito, trascendencia y felicidad sin necesidad de procrear.',
    tags: ['Autoayuda', 'Propósito', 'Identidad'],
    link: 'https://www.amazon.com/dp/0310137517'
  }
];

export const glossaryData: GlossaryTerm[] = [
  {
    term: 'Childfree (Libre de Hijos)',
    definition: 'Personas que deciden de forma voluntaria, consciente y permanente no tener hijos biológicos ni adoptivos. Se diferencia de "childless" por el factor de la elección activa.',
    origin: 'Surgido en los años 70 en EE. UU. como término de autoafirmación del movimiento feminista y la libre elección.'
  },
  {
    term: 'Childless (Sin Hijos por Circunstancias)',
    definition: 'Personas que no tienen hijos pero que desearían o hubieran deseado tenerlos, debido a infertilidad, falta de pareja adecuada, problemas financieros, salud o factores externos fuera de su control directo.',
    origin: 'Término descriptivo tradicional inglés.'
  },
  {
    term: 'DINK (Double Income, No Kids)',
    definition: 'Acrónimo que define a parejas donde ambos miembros tienen ingresos económicos y no tienen hijos. Suele asociarse con un mayor poder adquisitivo discrecional y flexibilidad de estilo de vida.',
    origin: 'Popularizado en los años 80 durante el auge financiero de Wall Street.'
  },
  {
    term: 'DINKWAD / DINKWAC',
    definition: 'Variantes de DINK. DINKWAD: "Double Income, No Kids, With A Dog" (Con un perro). DINKWAC: "Double Income, No Kids, With A Cat" (Con un gato). Refleja hogares que canalizan su afecto y cuidado hacia mascotas.',
    origin: 'Término moderno de la cultura de redes sociales.'
  },
  {
    term: 'Natalismo / Pronatalismo',
    definition: 'Ideología social, política y religiosa que promueve la reproducción y el tener hijos como el principal deber de los ciudadanos y el máximo objetivo de la realización humana, marginalizando a quienes deciden lo contrario.',
    origin: 'Sociología de la población.'
  },
  {
    term: 'SINK (Single Income, No Kids)',
    definition: 'Persona soltera con ingresos propios y sin hijos, que prioriza su desarrollo personal, carrera profesional e independencia financiera individual.',
    origin: 'Variante moderna del acrónimo DINK.'
  }
];

export const testQuestions: TestQuestion[] = [
  {
    id: 1,
    text: '¿Cómo imaginas tu fin de semana ideal a largo plazo?',
    category: 'lifestyle',
    options: [
      { text: 'Con total flexibilidad: levantarme tarde, leer, viajar de improviso o pasar tiempo en mis pasatiempos.', points: 10 },
      { text: 'Un balance: algunas actividades organizadas en casa y otras salidas tranquilas con amigos.', points: 5 },
      { text: 'Planificando actividades familiares, asistiendo a eventos escolares o jugando con niños pequeños.', points: 0 }
    ]
  },
  {
    id: 2,
    text: 'Cuando piensas en tus ingresos económicos futuros, ¿cuál es tu prioridad?',
    category: 'financial',
    options: [
      { text: 'Maximizar mi ahorro, invertir en mí, viajar o retirarme temprano con alta comodidad.', points: 10 },
      { text: 'Asegurar mi estabilidad básica, compartiendo algunos gastos con seres queridos o mascotas.', points: 5 },
      { text: 'Destinar una gran parte a la educación, alimentación y bienestar de mis hijos, sin importar el sacrificio.', points: 0 }
    ]
  },
  {
    id: 3,
    text: '¿Cómo manejas el ruido constante, el caos y la falta de espacio personal?',
    category: 'emotional',
    options: [
      { text: 'Me sobrepasa rápidamente; necesito el silencio, el orden y la soledad para recargar mi energía mental.', points: 10 },
      { text: 'Lo tolero por periodos cortos de tiempo, pero necesito mi santuario de tranquilidad al final del día.', points: 5 },
      { text: 'Lo manejo bien, me adapto al caos cotidiano y puedo lidiar con el ruido constante sin perder la paciencia.', points: 0 }
    ]
  },
  {
    id: 4,
    text: '¿Qué peso tiene para ti la presión o expectativa de tu familia sobre darles nietos/sobrinos?',
    category: 'lifestyle',
    options: [
      { text: 'Ninguno. Mi vida es mía y sus expectativas sobre mi cuerpo o futuro no definen mis decisiones.', points: 10 },
      { text: 'Me genera cierta incomodidad o culpa, pero tengo claro que es mi propia vida la que está en juego.', points: 5 },
      { text: 'Es un factor importante; valoro la continuidad familiar y la alegría de mis padres al expandir la familia.', points: 0 }
    ]
  },
  {
    id: 5,
    text: '¿Qué sientes al interactuar con niños pequeños (sobrinos, hijos de amigos, etc.)?',
    category: 'emotional',
    options: [
      { text: 'Me agrada verlos o jugar un rato, pero me da un alivio inmenso cuando los devuelvo a sus padres.', points: 10 },
      { text: 'Me mantengo neutral o distante; no me generan particular interés ni incomodidad.', points: 7 },
      { text: 'Me encantan, disfruto cuidarlos de forma activa y me imagino haciéndolo todos los días.', points: 0 }
    ]
  },
  {
    id: 6,
    text: 'Al proyectar tu vejez (70-80 años), ¿cuál es tu mayor deseo?',
    category: 'lifestyle',
    options: [
      { text: 'Haber sido fiel a mí mismo, tener amistades sólidas, tranquilidad financiera y no haber vivido bajo mandatos.', points: 10 },
      { text: 'Tener una red de apoyo variada: amigos, sobrinos, comunidad local o vecinos.', points: 7 },
      { text: 'Estar rodeado de hijos y nietos, viendo cómo continúa mi linaje familiar y mi legado genético.', points: 0 }
    ]
  },
  {
    id: 7,
    text: '¿Qué tan importante es para ti tener libertad total para cambiar de carrera, emprender o mudar de ciudad?',
    category: 'lifestyle',
    options: [
      { text: 'Es crucial; no me sentiría cómodo teniendo que decidir basado en la cercanía de escuelas o la estabilidad escolar de otros.', points: 10 },
      { text: 'Moderadamente importante, aunque podría adaptarme si tuviera responsabilidades compartidas.', points: 5 },
      { text: 'Prefiero la estabilidad permanente y no me importa atarme a un lugar para darle un hogar fijo a mi familia.', points: 0 }
    ]
  },
  {
    id: 8,
    text: '¿Cómo evalúas el impacto ambiental y sobrepoblación del planeta en tu decisión reproductiva?',
    category: 'financial', // clasificado en finanzas/recursos globales
    options: [
      { text: 'Es un argumento ético fuerte para mí; considero que no traer más humanos es una postura ecológica consciente.', points: 10 },
      { text: 'Es algo que pienso a veces, pero no es el principal factor determinante en mi vida privada.', points: 5 },
      { text: 'No influye en absoluto; considero que los problemas del mundo no deben interferir en mi deseo de paternidad.', points: 0 }
    ]
  },
  {
    id: 9,
    text: '¿Cómo reaccionas ante la idea de la "pérdida de identidad" y que tu vida gire 100% en torno a otro ser durante años?',
    category: 'emotional',
    options: [
      { text: 'Me aterra o me genera rechazo; valoro demasiado mi individualidad, mis proyectos y mi autonomía.', points: 10 },
      { text: 'Me preocupa, pero creo que con límites podría conservar algo de mi propio espacio.', points: 4 },
      { text: 'Lo acepto gustosamente; considero que sacrificarse por un hijo es un acto hermoso y natural.', points: 0 }
    ]
  },
  {
    id: 10,
    text: '¿Cuál es tu postura ante el costo financiero directo de criar a un hijo (estimado en $200,000+ USD hasta los 18 años)?',
    category: 'financial',
    options: [
      { text: 'Prefiero usar ese dinero para asegurar mi jubilación, viajar, estudiar o tener un colchón de inversión holgado.', points: 10 },
      { text: 'Es una cifra abrumadora, me genera estrés pensar en estar económicamente ajustado durante dos décadas.', points: 7 },
      { text: 'El dinero va y viene; trabajaré lo necesario y haré los sacrificios económicos que hagan falta por un hijo.', points: 0 }
    ]
  }
];
