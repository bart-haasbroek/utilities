module.exports = {
    uniquify(arr, compareFn) {
        compareFn = compareFn ? compareFn : (list, entry) => list.indexOf(entry) === -1;
        return arr.reduce((list, entry) => {
            return compareFn(list, entry) ? [...list, entry] : list
        }, [])
    }
}

