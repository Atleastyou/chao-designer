const moment = {
  getTime (time) {
    return `${this.getYear(time)}-${this.getMonth(time)}-${this.getDay(time)}`
  },
  getYear (time) {
    time = time || new Date().getTime()
    let year = new Date(time).getFullYear()
    return year
  },
  getMonth (time) {
    time = time || new Date().getTime()
    let month = new Date(time).getMonth() + 1
    return month < 10 ? '0' + month : month
  },
  getDay (time) {
    time = time || new Date().getTime()
    const day = new Date(time).getDate()
    return day < 10 ? '0' + day : day
  }
}

export default moment