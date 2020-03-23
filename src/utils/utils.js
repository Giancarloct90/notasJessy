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
const getMonthNotes = async (tipoNota) => {
    let meses = [];
    let mesesF = [];
    let mesesFF = [];
    let total = {};
    let i = 0;
    let arrAnios = await getAniosReport(tipoNota);
    // console.log(arrAnios);
    let notasDB;
    const final = arrAnios.map(async (anio, index) => {
        notasDB = await Notas.find({
            tipo: tipoNota,
            disponible: true,
            anio: anio
        }).select({
            "mes": 1
        });
        // console.log(notasDB);
        notasDB.map(async (nota) => await meses.push(nota.mes));
        total.anio = anio;
        new Set(meses).forEach((mes) => {
            total[`mes${i}`] = mes;
            i++
        });
        mesesF.push(total);
        i = 0;
        total = {};
        meses = [];
        console.log(mesesF);
        return mesesF;
    });
    // const results = await Promise.all(final);
    // console.log(results);

}

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

// EXPORTS 
module.exports = {
    getFecha,
    getAllNotas,
    getTipoNotas,
    getFueDirDep,
    getContadorNotas,
    getMonthNotes,
    getAniosReport
};