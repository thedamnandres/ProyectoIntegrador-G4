use('ProyectoIntegrador_G4');

db.createCollection("arquideosis", {
  capped: false,
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "arquideosis",
      description:
        "Define las arquidiócesis a las que pertenecen las parroquias.",
      required: ["nombre", "region"],
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
  validationLevel: "strict", // Aplica siempre la validación
  validationAction: "error", // Rechaza documentos que no cumplan
});
db.createCollection("catequista", {
  capped: false,
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "catequista",
      description: "Tabla que muestra la información de los catequistas",
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

        },
        correo: {
          bsonType: "string",
          description: "Correo electrónico de la persona",
          minLength: 1,
          maxLength: 50,

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
  validationLevel: "off",
  validationAction: "warn",
});

db.createCollection("parroquias", {
  capped: false,
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "parroquias",
      description:
        "Representa las parroquias eclesiásticas donde se registran y agrupan los catequizados.",
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
  validationLevel: "off",
  validationAction: "warn",
});

//YO
db.createCollection("persona", {
  capped: false,
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "persona",
      description:
        "Contiene los datos personales de los catequizados registrados en el sistema.",
      properties: {
        _id: {
          bsonType: "objectId",
          description: "Identificador único del documento",
        },
        cedula: {
          bsonType: "string",
          description: "Número de identificación de la persona",
          minLength: 10, maxLength: 10
        },
        nombres: {
          bsonType: "string",
          description: "Nombres de la persona",
          minLength: 1, maxLength: 50
        },
        apellidos: {
          bsonType: "string",
          description: "Apellidos de la persona",
          minLength: 1, maxLength: 50
        },
        fecha_nacimiento: {
          bsonType: "date",
          description: "Fecha de nacimiento",
        },
        lugar_nacimiento: {
          bsonType: "string",
          description: "Lugar donde nació",
          minLength: 1, maxLength: 100
        },
        edad: {
          bsonType: "number",
          description: "Edad actual",
          minimum: 0, maximum: 120
        },
        sexo: {
          bsonType: "string",
          description: "Sexo biológico",
          minLength: 1, maxLength: 10 
        },
        rol: {
          bsonType: "string",
          description: "Rol dentro del sistema",
          minLength: 1, maxLength: 30
        },
        telefono_domicilio: {
          bsonType: "string",
          description: "Teléfono del domicilio",
          minLength: 7, maxLength: 15 
        },
        direccion_domicilio: {
          bsonType: "string",
          description: "Dirección del domicilio",
          minLength: 1, maxLength: 100
        },
        unidad_educativa: {
          bsonType: "string",
          description: "Nombre de la institución educativa",
          minLength: 1, maxLength: 100
        },
        alergias: {
          bsonType: "string",
          description: "Alergias que padece",
          minLength: 0, maxLength: 200
        },
        tipo_sangre: {
          bsonType: "string",
          description: "Tipo de sangre",
          minLength: 1, maxLength: 5 
        },
        contacto_emergencia: {
          bsonType: "string",
          description: "Persona de contacto en emergencias",
           minLength: 1, maxLength: 100
        },
        consideraciones: {
          bsonType: "string",
          description: "Consideraciones médicas u observaciones",
          minLength: 0, maxLength: 200 
        },
        parroquia_id: {
          bsonType: "string",
          description: "Referencia a la parroquia de pertenencia",
          minLength: 1, maxLength: 50 
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
              minLength: 1, maxLength: 50
            },
            nombre_madrina: {
              bsonType: "string",
              description: "Nombre de la madrina de bautismo",
              minLength: 1, maxLength: 50
            },
            nombre_abuelo_materno: {
              bsonType: "string",
              description: "Nombre del abuelo materno",
              minLength: 1, maxLength: 50 
            },
            nombre_abuela_materno: {
              bsonType: "string",
              description: "Nombre de la abuela materna",
              minLength: 1, maxLength: 50
            },
            nombre_abuelo_paterno: {
              bsonType: "string",
              description: "Nombre del abuelo paterno",
              minLength: 1, maxLength: 50 
            },
            nombre_abuela_paterno: {
              bsonType: "string",
              description: "Nombre de la abuela paterna",
              minLength: 1, maxLength: 50
            },
            fecha_bautizo: {
              bsonType: "date",
              description: "Fecha en que se realizó el bautizo",
            },
            lugar_bautizo: {
              bsonType: "string",
              description: "Lugar donde se realizó el bautizo",
              minLength: 1, maxLength: 100
            },
          },
          additionalProperties: false,
        },
      },
      additionalProperties: false,
    },
  },
  validationLevel: "strict", // Aplica siempre la validación
  validationAction: "error", // Rechaza documentos que no cumplan
});



//YO
db.createCollection("sacramentos", {
  capped: false,
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "sacramentos",
      description:
        "Lista de los diferentes sacramentos ofrecidos en el proceso de catequesis.",
      properties: {
        _id: {
          bsonType: "objectId",
          description: "Identificador único del documento",
        },
        nombre: {
          bsonType: "string",
          description: "Nombre del sacramento",
        },
        descripcion: {
          bsonType: "string",
          description: "Descripción general del sacramento",
        },
      },
      additionalProperties: false,
    },
  },
  validationLevel: "off",
  validationAction: "warn",
});

db.createCollection("madres", {
  capped: false,
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "madres",
      description: "Registro de las madres de los catequizados.",
      properties: {
        _id: {
          bsonType: "objectId",
          description: "Identificador único del documento",
        },
        cedula: {
          bsonType: "string",
          description: "Número de cédula del catequista",
          minLength: 1,
          maxLength: 20,

        },
        nombres: {
          bsonType: "string",
          description: "Nombres del catequista",
          minLength: 1,
          maxLength: 50,

        },
        apellidos: {
          bsonType: "string",
          description: "Apellidos del catequista",
          minLength: 1,
          maxLength: 50,

        },
        telefono: {
          bsonType: "string",
          description: "Teléfono del catequista",
          minLength: 1,
          maxLength: 20,

        },
        direccion: {
          bsonType: "string",
          description: "Dirección del catequista",
          minLength: 1,
          maxLength: 200,

        },
      },
      additionalProperties: false,
    },
  },
  validationLevel: "off",
  validationAction: "warn",
});


db.createCollection("niveles", {
  capped: false,
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "niveles",
      description:
        "Contiene los niveles de preparación catequética correspondientes a cada sacramento.",
      properties: {
        _id: {
          bsonType: "objectId",
          description: "Identificador único del documento",
        },
        nombre_parroquia: {
          bsonType: "string",
          description: "Nombre de la parroquia asociada",
          minLength: 1, maxLength: 100
        },
        descripcion: {
          bsonType: "string",
          description: "Descripción del nivel o curso",
          minLength: 1, maxLength: 200
        },
        sacramento_id: {
          bsonType: "objectId",
          description: "Referencia al sacramento relacionado",
        },
        parroquia_id: {
          bsonType: "objectId",
          description: "Referencia a la parroquia",
        },
        catequista_id: {
          bsonType: "objectId",
          description: "Referencia al catequista responsable",
        },
        libros: {
          bsonType: "object",
          description: "Materiales de estudio incluidos en el nivel",
          properties: {
            titulo: {
              bsonType: "string",
              description: "Título del libro o recurso",
              minLength: 1, maxLength: 100
            },
            descripcion: {
              bsonType: "string",
              description: "Descripción del contenido del libro",
              minLength: 1, maxLength: 200
            },
          },
          additionalProperties: false,
        },
      },
      additionalProperties: false,
    },
  },
  validationLevel: "strict", // Aplica siempre la validación
  validationAction: "error", // Rechaza documentos que no cumplan
});

db.createCollection("padres", {
  capped: false,
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "padres",
      description: "Registro de los padres de los catequizados.",
      properties: {
        _id: {
          bsonType: "objectId",
          description: "Identificador único del documento",
        },
        cedula: {
          bsonType: "string",
          description: "Número de cédula del representante",
          minLength: 1,
          maxLength: 20,

        },
        nombres: {
          bsonType: "string",
          description: "Nombres del representante",
          minLength: 1,
          maxLength: 50,

        },
        apellidos: {
          bsonType: "string",
          description: "Apellidos del representante",
          minLength: 1,
          maxLength: 50,

        },
        telefono: {
          bsonType: "string",
          description: "Teléfono del representante",
          minLength: 1,
          maxLength: 20,

        },
        direccion: {
          bsonType: "string",
          description: "Dirección del representante",
          minLength: 1,
          maxLength: 200,

        },
      },
      additionalProperties: false,
    },
  },
  validationLevel: "off",
  validationAction: "warn",
});

db.createCollection("grupos", {
  capped: false,
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "grupos",
      description: "Agrupaciones de catequizados por parroquia y periodo.",
      properties: {
        _id: {
          bsonType: "objectId",
          description: "Identificador único del documento",
        },
        nombre: {
          bsonType: "string",
          description: "Nombre del nivel de formación",
          minLength: 1, maxLength: 50 
        },
        periodo: {
          bsonType: "number",
          description: "Año o ciclo correspondiente al nivel",
          minimum: 2000, maximum: 2100
        },
        parroquia_id: {
          bsonType: "objectId",
          description: "Referencia a la parroquia que ofrece el nivel",
        },
        catequista_id: {
          bsonType: "objectId",
          description: "Referencia al catequista encargado",
        },
      },
      additionalProperties: false,
    },
  },
  validationLevel: "strict", // Aplica siempre la validación
  validationAction: "error", // Rechaza documentos que no cumplan
});

db.createCollection("inscripciones", {
  capped: false,
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "inscripciones",
      description:
        "Registra la participación de una persona en un nivel catequético.",
      properties: {
        _id: {
          bsonType: "objectId",
          description: "Identificador único del documento",
        },
        persona_id: {
          bsonType: "objectId",
          description: "Referencia a la persona inscrita",
        },
        nivel_id: {
          bsonType: "objectId",
          description: "Referencia al nivel o curso inscrito",
        },
        fecha_inscripcion: {
          bsonType: "date",
          description: "Fecha de inscripción",
        },
        estado_pago: {
          bsonType: "string",
          description: "Estado del pago realizado",
          minLength: 1, maxLength: 20 
        },
        observaciones: {
          bsonType: "string",
          description: "Comentarios adicionales sobre la inscripción",
          minLength: 0, maxLength: 200
        },
      },
      additionalProperties: false,
    },
  },
  validationLevel: "strict", // Aplica siempre la validación
  validationAction: "error", // Rechaza documentos que no cumplan
});


//YO
db.createCollection("certificados", {
  capped: false,
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "certificados",
      description:
        "Registro de certificados emitidos a una persona por sacramentos recibidos.",
      properties: {
        _id: {
          bsonType: "objectId",
          description: " Identificador único del documento",
        },
        persona_id: {
          bsonType: "objectId",
          description: "Referencia a la persona involucrada",
        },
        descripcion: {
          bsonType: "string",
          description:
            "Descripción de la actividad, situación o registro asociado",
        },
      },
      additionalProperties: false,
    },
  },
  validationLevel: "off",
  validationAction: "warn",
});


console.log(`Done`);