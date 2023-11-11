import chalk from "chalk"


export default {
  logLevel: 1,
  name: `${chalk.green("[")}${chalk.yellow("@")}${chalk.green("]")}`,

  log: function (...a) {
    console.log(this.name, a.join(' '))
  },

  info: function (...a) {
    console.info(this.name, a.join(' '))
  },

  warn: function (...a) {
    console.warn(this.name, a.join(' '))
  },

  error: function (...a) {
    console.error(this.name, a.join(' '))
  }

}
