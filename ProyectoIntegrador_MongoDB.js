use('ProyectoIntegrador_G4');


// crear colección arquidiócesis
// Esta colección almacena información sobre las arquidiócesis a las que pertenecen las
// parroquias. Incluye campos como nombre, región y un identificador único.
db.createCollection("arquidiocesis", {
  capped: false,
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "arquidiocesis",
      description:
        "Define las arquidiócesis a las que pertenecen las parroquias.",
      required: ["_id", "nombre", "region"],
      properties: {
        _id: {
          bsonType: "objectId",
          description:
            "Identificador único del documento (gestión automática por MongoDB)",
        },
        nombre: {
          bsonType: "string",
          description: "Nombre de la entidad",
          minLength: 1,
          maxLength: 50,
        },
        region: {
          bsonType: "string",
          description: "Región geográfica correspondiente",
          minLength: 1,
          maxLength: 100,
        },
      },
      additionalProperties: false,
    },
  },
  validationLevel: "strict", 
  validationAction: "error", 
});


// Insertar datos de ejemplo en la colección arquidiócesis
const arq1 = ObjectId();
const arq2 = ObjectId();
const arq3 = ObjectId();

db.getCollection('arquidiocesis').insertMany([
  { _id: arq1, nombre: "Quito", region: "Sierra Norte" },
  { _id: arq2, nombre: "Guayaquil", region: "Costa Sur" },
  { _id: arq3, nombre: "Cuenca", region: "Sierra Centro" }
]);

// ----------------------------------------------------------------------------


// crear colección catequista
// Esta colección almacena información sobre los catequistas que imparten formación religiosa
// Incluye campos como nombres, apellidos, rol, teléfono, correo y dirección
db.createCollection("catequistas", {
  capped: false,
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "catequistas",
      description: "Tabla que muestra la información de los catequistas",
      required: [
        "_id",
        "nombres",
        "apellidos",
        "rol",
        "telefono",
        "correo",
        "direccion",
      ],
      properties: {
        _id: {
          bsonType: "objectId",
          description: "Identificador único del documento",
        },
        nombres: {
          bsonType: "string",
          description: "Nombres del usuario o persona",
          minLength: 1,
          maxLength: 50,
        },
        apellidos: {
          bsonType: "string",
          description: "Apellidos del usuario o persona",
          minLength: 1,
          maxLength: 50,
        },
        rol: {
          bsonType: "string",
          description: "Rol que desempeña la persona",
          minLength: 1,
          maxLength: 50,
        },
        telefono: {
          bsonType: "string",
          description: "Número telefónico de contacto",
          minLength: 1,
          maxLength: 20,
          pattern: "^[0-9]{7,15}$",
        },
        correo: {
          bsonType: "string",
          description: "Correo electrónico de la persona",
          minLength: 1,
          maxLength: 50,
          pattern: "^.+@.+\\..+$",
        },
        direccion: {
          bsonType: "string",
          description: "Dirección física de residencia",
          minLength: 1,
          maxLength: 200,
        },
      },
      additionalProperties: false,
    },
  },
  validationLevel: "strict",
  validationAction: "error",
});

// Insertar datos de ejemplo en la colección catequistas
const cat1 = ObjectId();
const cat2 = ObjectId();
const cat3 = ObjectId();

db.getCollection('catequistas').insertMany([
  {
    _id: cat1,
    nombres: "Ana María",
    apellidos: "López Sánchez",
    rol: "Coordinadora",
    telefono: "0987654321",
    correo: "ana.lopez@example.com",
    direccion: "Av. Siempre Viva 123"
  },
  {
    _id: cat2,
    nombres: "José Luis",
    apellidos: "Martínez Rivera",
    rol: "Catequista",
    telefono: "0998765432",
    correo: "jose.martinez@example.com",
    direccion: "Calle Los Álamos 456"
  },
  {
    _id: cat3,
    nombres: "Carmen Elena",
    apellidos: "Bravo Torres",
    rol: "Catequista",
    telefono: "0954321890",
    correo: "carmen.bravo@example.com",
    direccion: "Pasaje Libertad 789"
  }
]);


db.getCollection('catequistas').insertMany([
  {
    nombres: "Ana María",
    apellidos: "López Sánchez",
    rol: "Coordinadora",
    telefono: "0987654321",
    correo: "ana.lopez@example.com",
    direccion: "Av. Siempre Viva 123"
  },
  {
    nombres: "José Luis",
    apellidos: "Martínez Rivera",
    rol: "Catequista",
    telefono: "0998765432",
    correo: "jose.martinez@example.com",
    direccion: "Calle Los Álamos 456"
  },
  {
    nombres: "Carmen Elena",
    apellidos: "Bravo Torres",
    rol: "Catequista",
    telefono: "0954321890",
    correo: "carmen.bravo@example.com",
    direccion: "Pasaje Libertad 789"
  }
]);

// ----------------------------------------------------------------------------

// crear colección parroquias
// Esta colección almacena información sobre las parroquias eclesiásticas
// Incluye campos como nombre, teléfono, dirección, si es principal, y referencias a la arquidiócesis y al párroco asignado
db.createCollection("parroquias", {
  capped: false,
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "parroquias",
      description:
        "Representa las parroquias eclesiásticas donde se registran y agrupan los catequizados.",
      required: [
        "_id",
        "nombre_parroquia",
        "telefono",
        "direccion",
        "es_principal",
        "arquideosis_id",
        "parroco_id",
      ],
      properties: {
        _id: {
          bsonType: "objectId",
          description: "Identificador único del documento",
        },
        nombre_parroquia: {
          bsonType: "string",
          description: "Nombre oficial de la parroquia",
          minLength: 1,
          maxLength: 50,
        },
        telefono: {
          bsonType: "string",
          description: "Número de contacto de la parroquia",
          minLength: 1,
          maxLength: 20,
          pattern: "^[0-9]{7,15}$",
        },
        direccion: {
          bsonType: "string",
          description: "Dirección de la parroquia",
          minLength: 1,
          maxLength: 500,
        },
        es_principal: {
          bsonType: "bool",
          description: "Indica si es la parroquia principal",
        },
        arquideosis_id: {
          bsonType: "objectId",
          description: "Referencia a la arquidiócesis correspondiente",
        },
        parroco_id: {
          bsonType: "objectId",
          description: "Referencia al párroco asignado",
        },
      },
      additionalProperties: false,
    },
  },
  validationLevel: "strict",
  validationAction: "error",
});


// Insertar datos de ejemplo en la colección parroquias
const par1 = ObjectId();
const par2 = ObjectId();
const par3 = ObjectId();

db.getCollection('parroquias').insertMany([
  {
    _id: par1,
    nombre_parroquia: "Parroquia San José",
    telefono: "022345678",
    direccion: "Av. El Inca y 6 de Diciembre",
    es_principal: true,
    arquideosis_id: arq1,
    parroco_id: cat1
  },
  {
    _id: par2,
    nombre_parroquia: "Parroquia La Merced",
    telefono: "023456789",
    direccion: "Calle Bolívar y Rocafuerte",
    es_principal: false,
    arquideosis_id: arq2,
    parroco_id: cat2
  },
  {
    _id: par3,
    nombre_parroquia: "Parroquia Cristo Rey",
    telefono: "024567890",
    direccion: "Av. Loja y Tarqui",
    es_principal: true,
    arquideosis_id: arq3,
    parroco_id: cat3
  }
]);

// ----------------------------------------------------------------------------


// crear colección madres
// Esta colección almacena información de las madres de los catequizados
// Incluye campos como cédula, nombres, apellidos, teléfono y dirección
// Se asegura que los datos cumplan con un esquema específico para mantener la integridad de la colección
db.createCollection("madres", {
  capped: false,
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "madres",
      description: "Registro de las madres de los catequizados.",
      required: ["_id", "cedula", "nombres", "apellidos", "telefono", "direccion"],
      properties: {
        _id: {
          bsonType: "objectId",
          description: "Identificador único del documento"
        },
        cedula: {
          bsonType: "string",
          description: "Número de cédula del catequista",
          minLength: 10,
          maxLength: 10,
          pattern: "^[0-9]{10}$"
        },
        nombres: {
          bsonType: "string",
          description: "Nombres del catequista",
          minLength: 1,
          maxLength: 50
        },
        apellidos: {
          bsonType: "string",
          description: "Apellidos del catequista",
          minLength: 1,
          maxLength: 50
        },
        telefono: {
          bsonType: "string",
          description: "Teléfono del catequista",
          minLength: 7,
          maxLength: 15,
          pattern: "^[0-9]{7,15}$"
        },
        direccion: {
          bsonType: "string",
          description: "Dirección del catequista",
          minLength: 1,
          maxLength: 200
        }
      },
      additionalProperties: false
    }
  },
  validationLevel: "strict",
  validationAction: "error"
});

const madre1 = ObjectId();
const madre2 = ObjectId();
const madre3 = ObjectId();

db.getCollection('madres').insertMany([
  {
    _id: madre1,
    cedula: "1728394056",
    nombres: "Luisa Fernanda",
    apellidos: "García Ruiz",
    telefono: "0981112233",
    direccion: "Av. Amazonas N32-45"
  },
  {
    _id: madre2,
    cedula: "1728394066",
    nombres: "María Isabel",
    apellidos: "Pérez Jara",
    telefono: "0982223344",
    direccion: "Calle Guayaquil Oe2-11"
  },
  {
    _id: madre3,
    cedula: "1728394077",
    nombres: "Rosa Elena",
    apellidos: "Cedeño Muñoz",
    telefono: "0983334455",
    direccion: "Pasaje Manabí y Esmeraldas"
  }
]);

// ----------------------------------------------------------------------------


// crear colección padres
// Esta colección almacena información de los padres de los catequizados
// Incluye campos como cédula, nombres, apellidos, teléfono y dirección
db.createCollection("padres", {
  capped: false,
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "padres",
      description: "Registro de los padres de los catequizados.",
      required: ["_id", "cedula", "nombres", "apellidos", "telefono", "direccion"],
      properties: {
        _id: {
          bsonType: "objectId",
          description: "Identificador único del documento"
        },
        cedula: {
          bsonType: "string",
          description: "Número de cédula del representante",
          minLength: 10,
          maxLength: 10,
          pattern: "^[0-9]{10}$"
        },
        nombres: {
          bsonType: "string",
          description: "Nombres del representante",
          minLength: 1,
          maxLength: 50
        },
        apellidos: {
          bsonType: "string",
          description: "Apellidos del representante",
          minLength: 1,
          maxLength: 50
        },
        telefono: {
          bsonType: "string",
          description: "Teléfono del representante",
          minLength: 7,
          maxLength: 15,
          pattern: "^[0-9]{7,15}$"
        },
        direccion: {
          bsonType: "string",
          description: "Dirección del representante",
          minLength: 1,
          maxLength: 200
        }
      },
      additionalProperties: false
    }
  },
  validationLevel: "strict",
  validationAction: "error"
});

const padre1 = ObjectId();
const padre2 = ObjectId();
const padre3 = ObjectId();

db.getCollection('padres').insertMany([
  {
    _id: padre1,
    cedula: "0911223344",
    nombres: "Carlos Andrés",
    apellidos: "Ramírez Peña",
    telefono: "0994445566",
    direccion: "Av. La Prensa y Brasil"
  },
  {
    _id: padre2,
    cedula: "0911334455",
    nombres: "Jorge Alberto",
    apellidos: "Salazar Ríos",
    telefono: "0995556677",
    direccion: "Calle 10 de Agosto N18-32"
  },
  {
    _id: padre3,
    cedula: "0911445566",
    nombres: "Luis Fernando",
    apellidos: "Vallejo Andrade",
    telefono: "0996667788",
    direccion: "Calle García Moreno y Mejía"
  }
]);

// ----------------------------------------------------------------------------


// crear colección persona
// Esta colección almacena los datos personales de los catequizados registrados en el sistema
// Incluye campos como cédula, nombres, apellidos, fecha de nacimiento, sexo
// y otros datos relevantes para la gestión de los catequizados
db.createCollection("personas", {
  capped: false,
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "personas",
      description:
        "Contiene los datos personales de los catequizados registrados en el sistema.",
      required: [
        "_id",
        "cedula",
        "nombres",
        "apellidos",
        "fecha_nacimiento",
        "sexo",
        "rol",
        "telefono_domicilio",
        "direccion_domicilio",
        "unidad_educativa",
        "tipo_sangre",
        "contacto_emergencia",
        "parroquia_id",
      ],
      properties: {
        _id: {
          bsonType: "objectId",
          description: "Identificador único del documento",
        },
        cedula: {
          bsonType: "string",
          description: "Número de identificación de la persona",
          minLength: 10,
          maxLength: 10,
          pattern: "^[0-9]{10}$",
        },
        nombres: {
          bsonType: "string",
          description: "Nombres de la persona",
          minLength: 1,
          maxLength: 50,
        },
        apellidos: {
          bsonType: "string",
          description: "Apellidos de la persona",
          minLength: 1,
          maxLength: 50,
        },
        fecha_nacimiento: {
          bsonType: "date",
          description: "Fecha de nacimiento",
        },
        lugar_nacimiento: {
          bsonType: "string",
          description: "Lugar donde nació",
          minLength: 1,
          maxLength: 100,
        },
        edad: {
          bsonType: "number",
          description: "Edad actual",
          minimum: 0,
          maximum: 120,
        },
        sexo: {
          bsonType: "string",
          description: "Sexo biológico",
          minLength: 1,
          maxLength: 10,
        },
        rol: {
          bsonType: "string",
          description: "Rol dentro del sistema",
          minLength: 1,
          maxLength: 30,
        },
        telefono_domicilio: {
          bsonType: "string",
          description: "Teléfono del domicilio",
          minLength: 7,
          maxLength: 15,
          pattern: "^[0-9]{7,15}$",
        },
        direccion_domicilio: {
          bsonType: "string",
          description: "Dirección del domicilio",
          minLength: 1,
          maxLength: 100,
        },
        unidad_educativa: {
          bsonType: "string",
          description: "Nombre de la institución educativa",
          minLength: 1,
          maxLength: 100,
        },
        alergias: {
          bsonType: "string",
          description: "Alergias que padece",
          minLength: 0,
          maxLength: 200,
        },
        tipo_sangre: {
          bsonType: "string",
          description: "Tipo de sangre",
          minLength: 1,
          maxLength: 5,
        },
        contacto_emergencia: {
          bsonType: "string",
          description: "Persona de contacto en emergencias",
          minLength: 1,
          maxLength: 100,
        },
        consideraciones: {
          bsonType: "string",
          description: "Consideraciones médicas u observaciones",
          minLength: 0,
          maxLength: 200,
        },
        parroquia_id: {
          bsonType: "string",
          description: "Referencia a la parroquia de pertenencia",
          minLength: 1,
          maxLength: 50,
        },
        madre_id: {
          bsonType: "objectId",
          description: "Referencia a la madre",
        },
        padre_id: {
          bsonType: "objectId",
          description: "Referencia al padre",
        },
        bautismo: {
          bsonType: "object",
          description:
            "Subdocumento que registra la información del sacramento del bautismo recibido por la persona.",
          properties: {
            nombre_padrino: {
              bsonType: "string",
              description: "Nombre del padrino de bautismo",
              minLength: 1,
              maxLength: 50,
            },
            nombre_madrina: {
              bsonType: "string",
              description: "Nombre de la madrina de bautismo",
              minLength: 1,
              maxLength: 50,
            },
            nombre_abuelo_materno: {
              bsonType: "string",
              description: "Nombre del abuelo materno",
              minLength: 1,
              maxLength: 50,
            },
            nombre_abuela_materno: {
              bsonType: "string",
              description: "Nombre de la abuela materna",
              minLength: 1,
              maxLength: 50,
            },
            nombre_abuelo_paterno: {
              bsonType: "string",
              description: "Nombre del abuelo paterno",
              minLength: 1,
              maxLength: 50,
            },
            nombre_abuela_paterno: {
              bsonType: "string",
              description: "Nombre de la abuela paterna",
              minLength: 1,
              maxLength: 50,
            },
            fecha_bautizo: {
              bsonType: "date",
              description: "Fecha en que se realizó el bautizo",
            },
            lugar_bautizo: {
              bsonType: "string",
              description: "Lugar donde se realizó el bautizo",
              minLength: 1,
              maxLength: 100,
            },
          },
          additionalProperties: false,
        },
      },
      additionalProperties: false,
    },
  },
  validationLevel: "strict", 
  validationAction: "error", 
});


// Insertar datos de ejemplo en la colección persona
const persona1 = ObjectId();
const persona2 = ObjectId();
const persona3 = ObjectId();

db.getCollection('personas').insertMany([
  {
    _id: persona1,
    cedula: "1102839475",
    nombres: "Juan",
    apellidos: "Ramírez García",
    fecha_nacimiento: new Date("2010-05-12"),
    lugar_nacimiento: "Quito",
    edad: 14,
    sexo: "M",
    rol: "Catequizando",
    telefono_domicilio: "022222333",
    direccion_domicilio: "Av. Colón N12-34",
    unidad_educativa: "Unidad Educativa La Salle",
    alergias: "Ninguna",
    tipo_sangre: "O+",
    contacto_emergencia: "Luisa Fernanda García",
    consideraciones: "Ninguna",
    parroquia_id: "001", // puedes reemplazar con ObjectId() real si lo prefieres
    madre_id: madre1,
    padre_id: padre1,
    bautismo: {
      nombre_padrino: "José Hernández",
      nombre_madrina: "Lucía Gómez",
      nombre_abuelo_materno: "Julio García",
      nombre_abuela_materno: "Martha Ruiz",
      nombre_abuelo_paterno: "Eduardo Ramírez",
      nombre_abuela_paterno: "Carmen Peña",
      fecha_bautizo: new Date("2011-08-15"),
      lugar_bautizo: "Parroquia San José"
    }
  },
  {
    _id: persona2,
    cedula: "1102849586",
    nombres: "Carla",
    apellidos: "Salazar Pérez",
    fecha_nacimiento: new Date("2009-10-20"),
    lugar_nacimiento: "Guayaquil",
    edad: 15,
    sexo: "F",
    rol: "Catequizando",
    telefono_domicilio: "023333444",
    direccion_domicilio: "Calle Venezuela 15-20",
    unidad_educativa: "Colegio Americano",
    alergias: "Penicilina",
    tipo_sangre: "A+",
    contacto_emergencia: "María Isabel Pérez",
    consideraciones: "Usa inhalador",
    parroquia_id: "002",
    madre_id: madre2,
    padre_id: padre2,
    bautismo: {
      nombre_padrino: "Antonio Ruiz",
      nombre_madrina: "Sofía Jara",
      nombre_abuelo_materno: "Luis Pérez",
      nombre_abuela_materno: "Ana Jara",
      nombre_abuelo_paterno: "Carlos Salazar",
      nombre_abuela_paterno: "Julia Ríos",
      fecha_bautizo: new Date("2010-12-01"),
      lugar_bautizo: "Parroquia La Merced"
    }
  },
  {
    _id: persona3,
    cedula: "1102859697",
    nombres: "Esteban",
    apellidos: "Vallejo Cedeño",
    fecha_nacimiento: new Date("2011-03-02"),
    lugar_nacimiento: "Cuenca",
    edad: 13,
    sexo: "M",
    rol: "Catequizando",
    telefono_domicilio: "024444555",
    direccion_domicilio: "Av. Loja y Tarqui",
    unidad_educativa: "Escuela San Antonio",
    alergias: "Gluten",
    tipo_sangre: "B+",
    contacto_emergencia: "Rosa Elena Cedeño",
    consideraciones: "Debe evitar pan",
    parroquia_id: "003",
    madre_id: madre3,
    padre_id: padre3,
    bautismo: {
      nombre_padrino: "Marco Andrade",
      nombre_madrina: "Patricia Muñoz",
      nombre_abuelo_materno: "Óscar Cedeño",
      nombre_abuela_materno: "Teresa Muñoz",
      nombre_abuelo_paterno: "Ramiro Vallejo",
      nombre_abuela_paterno: "María Andrade",
      fecha_bautizo: new Date("2012-06-22"),
      lugar_bautizo: "Parroquia Cristo Rey"
    }
  }
]);

// ----------------------------------------------------------------------------


// crear colección sacramentos
// Esta colección almacena información sobre los sacramentos ofrecidos en el proceso de catequesis
// Incluye campos como nombre y descripción del sacramento
// Se asegura que los datos cumplan con un esquema específico para mantener la integridad de la colección
db.createCollection("sacramentos", {
  capped: false,
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "sacramentos",
      description:
        "Lista de los diferentes sacramentos ofrecidos en el proceso de catequesis.",
      required: ["_id", "nombre", "descripcion"],
      properties: {
        _id: {
          bsonType: "objectId",
          description: "Identificador único del documento",
        },
        nombre: {
          bsonType: "string",
          description: "Nombre del sacramento",
          minLength: 1,
          maxLength: 50,
        },
        descripcion: {
          bsonType: "string",
          description: "Descripción general del sacramento",
          minLength: 1,
          maxLength: 500,
        },
      },
      additionalProperties: false,
    },
  },
  validationLevel: "strict",
  validationAction: "error",
});

// Insertar datos de ejemplo en la colección sacramentos
const sac1 = ObjectId(); // Iniciación
const sac2 = ObjectId(); // Reconciliación
const sac3 = ObjectId(); // Primera Comunión
const sac4 = ObjectId(); // Estudio Bíblico
const sac5 = ObjectId(); // Confirmación I
const sac6 = ObjectId(); // Confirmación II

db.getCollection('sacramentos').insertMany([
  { _id: sac1, nombre: "Iniciación", descripcion: "Primer acercamiento a la fe cristiana" },
  { _id: sac2, nombre: "Reconciliación", descripcion: "Sacramento del perdón y la misericordia" },
  { _id: sac3, nombre: "Primera Comunión", descripcion: "Participación inicial en la Eucaristía" },
  { _id: sac4, nombre: "Estudio Bíblico", descripcion: "Formación catequética mediante la Biblia" },
  { _id: sac5, nombre: "Confirmación I", descripcion: "Preparación inicial para la Confirmación" },
  { _id: sac6, nombre: "Confirmación II", descripcion: "Etapa final de preparación para la Confirmación" }
]);

// ----------------------------------------------------------------------------


// crear colección niveles
// Esta colección almacena los niveles de preparación catequética correspondientes a cada sacramento
// Incluye campos como nombre de la parroquia, descripción del nivel, referencias al sacramento,
// parroquia, catequista y materiales de estudio
db.createCollection("niveles", {
  capped: false,
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "niveles",
      description:
        "Contiene los niveles de preparación catequética correspondientes a cada sacramento.",
      required: ["_id", "nombre_parroquia", "descripcion", "sacramento_id", "parroquia_id", "catequista_id", "libros"],
      properties: {
        _id: {
          bsonType: "objectId",
          description: "Identificador único del documento"
        },
        nombre_parroquia: {
          bsonType: "string",
          description: "Nombre de la parroquia asociada",
          minLength: 1,
          maxLength: 100
        },
        descripcion: {
          bsonType: "string",
          description: "Descripción del nivel o curso",
          minLength: 1,
          maxLength: 200
        },
        sacramento_id: {
          bsonType: "objectId",
          description: "Referencia al sacramento relacionado"
        },
        parroquia_id: {
          bsonType: "objectId",
          description: "Referencia a la parroquia"
        },
        catequista_id: {
          bsonType: "objectId",
          description: "Referencia al catequista responsable"
        },
        libros: {
          bsonType: "object",
          description: "Materiales de estudio incluidos en el nivel",
          required: ["titulo", "descripcion"],
          properties: {
            titulo: {
              bsonType: "string",
              description: "Título del libro o recurso",
              minLength: 1,
              maxLength: 100
            },
            descripcion: {
              bsonType: "string",
              description: "Descripción del contenido del libro",
              minLength: 1,
              maxLength: 200
            }
          },
          additionalProperties: false
        }
      },
      additionalProperties: false
    }
  },
  validationLevel: "strict", 
  validationAction: "error" 
});

// Insertar datos de ejemplo en la colección niveles
const niv1 = ObjectId();
const niv2 = ObjectId();
const niv3 = ObjectId();

db.getCollection('niveles').insertMany([
  {
    _id: niv1,
    nombre_parroquia: "Parroquia San José",
    descripcion: "Nivel introductorio para niños de 7 años",
    sacramento_id: sac1,
    parroquia_id: par1,
    catequista_id: cat1,
    libros: {
      titulo: "Descubriendo mi fe",
      descripcion: "Material básico de iniciación cristiana"
    }
  },
  {
    _id: niv2,
    nombre_parroquia: "Parroquia La Merced",
    descripcion: "Nivel para preparación de primera comunión",
    sacramento_id: sac3,
    parroquia_id: par2,
    catequista_id: cat2,
    libros: {
      titulo: "Camino a la Eucaristía",
      descripcion: "Libro guía para la Primera Comunión"
    }
  },
  {
    _id: niv3,
    nombre_parroquia: "Parroquia Cristo Rey",
    descripcion: "Nivel final de Confirmación II para adolescentes",
    sacramento_id: sac6,
    parroquia_id: par3,
    catequista_id: cat3,
    libros: {
      titulo: "Confirmados en la Fe",
      descripcion: "Texto para la etapa final de Confirmación"
    }
  }
]);

// ----------------------------------------------------------------------------


// crear colección grupos
// Esta colección almacena información sobre los grupos de catequizados organizados por parroquia y
// periodo. Incluye campos como nombre del grupo, periodo, parroquia y catequista asignado
db.createCollection("grupos", {
  capped: false,
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "grupos",
      description: "Agrupaciones de catequizados por parroquia y periodo.",
      required: ["_id", "nombre", "periodo", "parroquia_id", "catequista_id"],
      properties: {
        _id: {
          bsonType: "objectId",
          description: "Identificador único del documento"
        },
        nombre: {
          bsonType: "string",
          description: "Nombre del nivel de formación",
          minLength: 1,
          maxLength: 50
        },
        periodo: {
          bsonType: "number",
          description: "Año o ciclo correspondiente al nivel",
          minimum: 2000,
          maximum: 2100
        },
        parroquia_id: {
          bsonType: "objectId",
          description: "Referencia a la parroquia que ofrece el nivel"
        },
        catequista_id: {
          bsonType: "objectId",
          description: "Referencia al catequista encargado"
        }
      },
      additionalProperties: false
    }
  },
  validationLevel: "strict", 
  validationAction: "error" 
});

// Insertar datos de ejemplo en la colección grupos
const grupo1 = ObjectId();
const grupo2 = ObjectId();
const grupo3 = ObjectId();

db.getCollection('grupos').insertMany([
  {
    _id: grupo1,
    nombre: "Grupo Iniciación A",
    periodo: 2024,
    parroquia_id: par1,
    catequista_id: cat1
  },
  {
    _id: grupo2,
    nombre: "Grupo Primera Comunión B",
    periodo: 2025,
    parroquia_id: par2,
    catequista_id: cat2
  },
  {
    _id: grupo3,
    nombre: "Grupo Confirmación II C",
    periodo: 2025,
    parroquia_id: par3,
    catequista_id: cat3
  }
]);

// ----------------------------------------------------------------------------


// crear colección inscripciones
// Esta colección almacena las inscripciones de los catequizados a los diferentes niveles de formación
// Incluye campos como persona inscrita, nivel al que se inscribe, fecha de inscripción
// y estado del pago realizado
db.createCollection("inscripciones", {
  capped: false,
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "inscripciones",
      description:
        "Registra la participación de una persona en un nivel catequético.",
      required: ["_id", "persona_id", "nivel_id", "fecha_inscripcion", "estado_pago"],
      properties: {
        _id: {
          bsonType: "objectId",
          description: "Identificador único del documento"
        },
        persona_id: {
          bsonType: "objectId",
          description: "Referencia a la persona inscrita"
        },
        nivel_id: {
          bsonType: "objectId",
          description: "Referencia al nivel o curso inscrito"
        },
        fecha_inscripcion: {
          bsonType: "date",
          description: "Fecha de inscripción"
        },
        estado_pago: {
          bsonType: "string",
          description: "Estado del pago realizado",
          minLength: 1,
          maxLength: 20
        },
        observaciones: {
          bsonType: "string",
          description: "Comentarios adicionales sobre la inscripción",
          minLength: 0,
          maxLength: 200
        }
      },
      additionalProperties: false
    }
  },
  validationLevel: "strict", 
  validationAction: "error"
});

// Insertar datos de ejemplo en la colección inscripciones
const insc1 = ObjectId();
const insc2 = ObjectId();
const insc3 = ObjectId();

db.getCollection('inscripciones').insertMany([
  {
    _id: insc1,
    persona_id: persona1,
    nivel_id: niv1,
    fecha_inscripcion: new Date("2024-01-15"),
    estado_pago: "Pagado",
    observaciones: "Ninguna"
  },
  {
    _id: insc2,
    persona_id: persona2,
    nivel_id: niv2,
    fecha_inscripcion: new Date("2024-02-20"),
    estado_pago: "Pendiente",
    observaciones: "Pago en dos cuotas"
  },
  {
    _id: insc3,
    persona_id: persona3,
    nivel_id: niv3,
    fecha_inscripcion: new Date("2024-03-10"),
    estado_pago: "Pagado",
    observaciones: "Becado por parroquia"
  }
]);

// ----------------------------------------------------------------------------


// crear colección certificados
// Esta colección almacena los certificados emitidos a las personas por los sacramentos recibidos
// Incluye campos como persona involucrada, descripción del certificado y otros detalles relevantes
db.createCollection("certificados", {
  capped: false,
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "certificados",
      description:
        "Registro de certificados emitidos a una persona por sacramentos recibidos.",
      required: ["_id", "persona_id", "descripcion"],
      properties: {
        _id: {
          bsonType: "objectId",
          description: " Identificador único del documento"
        },
        persona_id: {
          bsonType: "objectId",
          description: "Referencia a la persona involucrada"
        },
        descripcion: {
          bsonType: "string",
          description: "Descripción de la actividad, situación o registro asociado",
          minLength: 1,
          maxLength: 500
        }
      },
      additionalProperties: false
    }
  },
  validationLevel: "strict",
  validationAction: "error"
});

// Insertar datos de ejemplo en la colección certificados
const cert1 = ObjectId();
const cert2 = ObjectId();
const cert3 = ObjectId();

db.getCollection('certificados').insertMany([
  {
    _id: cert1,
    persona_id: persona1,
    descripcion: "Certificado de participación en Iniciación"
  },
  {
    _id: cert2,
    persona_id: persona2,
    descripcion: "Certificado de Primera Comunión"
  },
  {
    _id: cert3,
    persona_id: persona3,
    descripcion: "Certificado de Confirmación II"
  }
]);

// ----------------------------------------------------------------------------

console.log(`Done`);

