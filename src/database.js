(async () => {
    const mongoose = require('mongoose');
    try {
        await mongoose.connect('mongodb://localhost:27017/notas', {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        console.log('DB Online');
    } catch (e) {
        console.log('error zoe:', e)
    }
})();