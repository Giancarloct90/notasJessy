const notify = (msj1, msj2) => {
    console.log('eee');
    alertify.set('notifier', 'position', 'top-right');
    alertify.success(`${msj1} ${msj2}`);
};

const acortarDescripcion = (str, num) => {
    if (str.length <= num) {
        return str
    }
    return str.slice(0, num) + '...';
};