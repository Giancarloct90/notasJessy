const notify = (msj1) => {
    if (msj1) {
        alertify.set('notifier', 'position', 'top-right');
        alertify.success(`${msj1}`);
    }
};

const acortarDescripcion = (str, num) => {
    if (str.length <= num) {
        return str
    }
    return str.slice(0, num) + '...';
};