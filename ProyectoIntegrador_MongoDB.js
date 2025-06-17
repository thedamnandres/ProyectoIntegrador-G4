use("ProyectoIntegrador_G4");


// crear colección arquidiócesis
// Esta colección almacena información sobre las arquidiócesis a las que pertenecen las
// parroquias. Incluye campos como nombre, región y un identificador único.
db.createCollection("arquideosis", {
  capped: false,
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "arquideosis",
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


// crear colección catequista
// Esta colección almacena información sobre los catequistas que imparten formación religiosa
// Incluye campos como nombres, apellidos, rol, teléfono, correo y dirección
db.createCollection("catequista", {
  capped: false,
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "catequista",
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

// crear colección persona
// Esta colección almacena los datos personales de los catequizados registrados en el sistema
// Incluye campos como cédula, nombres, apellidos, fecha de nacimiento, sexo
// y otros datos relevantes para la gestión de los catequizados
db.createCollection("persona", {
  capped: false,
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "persona",
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


console.log(`Done`);
