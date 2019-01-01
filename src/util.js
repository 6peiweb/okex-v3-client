const getInstrumentId = (currency) => {
  return {
    TheWeek: `${currency}-USD-190104`,
    NextWeek: `${currency}-USD-190111`,
    Quarter: `${currency}-USD-190329`
  }
}

module.exports = {
  getInstrumentId
}