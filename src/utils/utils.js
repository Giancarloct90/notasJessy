const TipoNota = require('../models/tipoNota');
const FueDirDep = require('../models/fueDirDep');
const ContadorNotas = require('../models/contadorNotas');
const Notas = require('../models/notas');

// FUNCTION GETFECHA
const getFecha = () => {
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    return {
        fechaTotal: `${dias[new Date().getDay()]} ${new Date().getDate()} de ${meses[new Date().getMonth()]} del ${new Date().getFullYear()}`,
        mes: `${meses[new Date().getMonth()]}`,
        anio: `${new Date().getFullYear()}`
    }
};

// FUNCTION GET ALL NOTE
const getAllNotas = async (tipoNota) => {
    try {
        let notasBD = await Notas.find({
            tipo: tipoNota,
            disponible: true
        });
        return notasBD;
    } catch (e) {
        console.log('Error tratando de obtener todas las Notas');
    }
};

// GET ALL TIPONOTAS
const getTipoNotas = async () => {
    let tipoNotaDB;
    try {
        tipoNotaDB = await TipoNota.find({
            disponible: true
        });
        return tipoNotaDB;
    } catch (e) {
        console.log('Error Tratando de obtener tipoNotas');
    }
};

// GET FUEDIRDEP
const getFueDirDep = async () => {
    let fueDirDepDB;
    try {
        fueDirDepDB = await FueDirDep.find({
            disponible: true
        });
        return fueDirDepDB;
    } catch (e) {
        console.log('Error tratando de obtener fueDirDep');
    }
};

// GET CONTADOR NOTAS
const getContadorNotas = async (tipo) => {
    let contadorNotasDB;
    try {
        contadorNotasDB = await ContadorNotas.find({
            tipo: tipo
        });
        return contadorNotasDB;
    } catch (e) {
        console.log('Error tratando de obtener contadorNotas');
    }
};

// GET MOUNT OF THE NOTES
// const getMonthNotes = async (tipoNota) => {
//     let meses = [];
//     let mesesF = [];
//     let mesesFF = [];
//     let total = {};
//     let i = 0;
//     let arrAnios = await getAniosReport(tipoNota);
//     let notasDB;
//     arrAnios.map(async (anio, index) => {
//         notasDB = await Notas.find({
//             tipo: tipoNota,
//             disponible: true,
//             anio: anio
//         }).select({
//             "mes": 1
//         });
//         // console.log(notasDB);
//         notasDB.map(async (nota) => await meses.push(nota.mes));
//         total.anio = anio;
//         new Set(meses).forEach((mes) => {
//             total[`mes${i}`] = mes;
//             i++
//         });
//         mesesF.push(total);
//         i = 0;
//         total = {};
//         meses = [];
//         console.log(mesesF);
//     });
//     // console.log('H', mesesF);
// }
// const getMonthNotes = async (tipoNota) => {
//     let meses = [];
//     let mesesF = [];
//     let mesesFF = [];
//     let total = {};
//     let final = [];
//     let i = 0;
//     let f;
//     let arrAnios = await getAniosReport(tipoNota);
//     // console.log(arrAnios);
//     let notasDB;
//     arrAnios.map(anio => {
//         f = Notas.find({
//             tipo: tipoNota,
//             disponible: true,
//             anio: anio
//         }).select({
//             "mes": 1
//         }).then(notasDB => {
//             notasDB.map((nota) => meses.push(nota.mes));
//             // console.log(meses);
//             mesesf = meses.filter(function (item, pos) {
//                 return meses.indexOf(item) == pos;
//             })
//             // console.log(mesesf);
//             total.anio = anio;
//             mesesf.map(mes => {
//                 total[`mes${i}`] = mes;
//                 i++;
//             });
//             final.push(total);
//             total = {};
//             i = 0;
//             return final;
//             // console.log(total);
//         }).catch(e => console.log(e));
//         // console.log(final);

//     });
//     console.log(await f);

//     // console.log(await Promise.all(mesesFF));

//     // let finalf =  Promise(final).then(e=>console.log(e));

//     // const results = await Promise.all(final);
//     // console.log(results);

// }

const getMonthNotes = async (tipoNota) => {
    let final = [];
    let arrAnios = await getAniosReport(tipoNota);
    final = arrAnios.map(async anio => {
        let notasDB = await getNotes(tipoNota, anio);
        mesesSinDuplicar = await getMonthWithDuplicate(notasDB);
        return await getFullArrray(anio, mesesSinDuplicar);
    });
    // console.log(await Promise.all(final));
    return await Promise.all(final);
}

// GET THE FULL ARRAY
const getFullArrray = async (anio, mesesf) => {
    let total = {},
        i = 0;
    total.anio = anio;
    mesesf.map(mes => {
        total[`mes${i}`] = mes
        i++;
    });
    return total;
};

//GET MONTH WITHPUT DUPLICATE
const getMonthWithDuplicate = async notasDB => {
    let meses = notasDB.map((nota) => {
        return nota.mes
    });
    return mesesf = meses.filter(function (item, pos) {
        return meses.indexOf(item) == pos;
    })
};

// GET NOTES SEGUN ANIO AND TYPE
const getNotes = async (tipoNota, anio) => {
    return await Notas.find({
        tipo: tipoNota,
        disponible: true,
        anio: anio
    }).select({
        "mes": 1
    });
};

// GET ANIOS TO REPORTS
const getAniosReport = async (tipoNota) => {
    let aniosF = [];
    let anios = [];
    const notasDB = await Notas.find({
        tipo: tipoNota,
        disponible: true
    }).select('anio');
    notasDB.map(nota => anios.push(nota.anio));
    new Set(anios).forEach(anio => aniosF.push(anio));
    // console.log(aniosF);
    return aniosF;
};

// GET NOTES SEGUN ANIO Y MES
const getNotesAnioMes = async (anio, mes, tipo) => {
    const notasDB = await Notas.find({
        anio: anio,
        mes: mes,
        disponible: true,
        tipo: tipo
    });
    return notasDB;
};

// GENERATE DATA FOR PDF
const generateDadaForPdf = (notasDB, tipo1) => {
    // let tipo, notasDB;
    let tipo, procedencia, tipo2;
    let contentF = [];

    if (tipo1 === "R") {
        procedencia = "Procedencia";
        tipo = 'RECIBIDAS';
        tipo2 = 'Recibida';
    }
    if (tipo1 === "E") {
        procedencia = "Destino";
        tipo = 'ENVIADAS';
        tipo2 = 'Enviada';
    }
    contentF.push(
        // TITULO
        {
            text: `\nREPORTE DE NOTAS ${tipo}\n\n`,
            style: 'header',
            fontSize: 16,
            alignment: 'center'
        },
    );
    notasDB.map(async notas => {
        contentF.push(

            // FECHA  
            {
                text: `Fecha: ${notas.fechaCreacion}`,
                fontSize: 11
            },

            // TIPO NOTA
            {
                text: `Tipo Nota: ${notas.tipoNota}`,
                fontSize: 11
            },

            // PROCEDENCIA
            {
                text: `${procedencia}: ${notas.procedencia}`,
                fontSize: 11
            },

            // NUMERO DE NOTA
            {
                text: `No. Nota: ${notas.numero}`,
                fontSize: 11
            },

            // RECIVIDA O ENVIADA
            {
                text: `${tipo2}`,
                fontSize: 11
            },

            // DESCRIPTION
            {
                text: `${notas.descripcion}`,
                fontSize: 11,
                alignment: 'justify'
            },

            // LINEA DEL FIN
            {
                text: `_____________________________________________________________________`,
                fontSize: 11
            }
        );
    });
    console.log(contentF);
    content = [
        // TITULO
        {
            text: `\nREPORTE DE NOTAS ${tipo}\n\n`,
            style: 'header',
            fontSize: 16,
            alignment: 'center'
        },
    ]

};

// EXPORTS
module.exports = {
    getFecha,
    getAllNotas,
    getTipoNotas,
    getFueDirDep,
    getContadorNotas,
    getMonthNotes,
    getAniosReport,
    getNotesAnioMes,
    generateDadaForPdf
};