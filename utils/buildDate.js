const intTwoChars = i => {
    return (`0${i}`).slice(-2);
}

const buildDate = () => {
    let date_ob = new Date();
    let date = intTwoChars(date_ob.getDate());
    let month = intTwoChars(date_ob.getMonth() + 1);
    let year = date_ob.getFullYear();
    return `${year}-${month}-${date}`;
}

module.exports = {buildDate}