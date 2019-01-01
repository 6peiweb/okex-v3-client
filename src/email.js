const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')

const transporter = nodemailer.createTransport(smtpTransport({
  host: "smtp.qq.com",          // 主机
  secure: true,                 // 使用SSL
  secureConnection: true,       // 使用SSL
  port: 465,                    // SMTP端口
  auth: {
    user: '2771873200@qq.com',  // 账号
    pass: 'qpvanztraorsddaj'    // SMTP密码
  }
}))

const getContent = (options) => {
  return {
    from: 'OKEx爆仓中心<2771873200@qq.com>',
    to: `${options.to}`,
    subject: '点位已触发',
    text: options.text
  }
}

const sendMail = (options) => new Promise((resolve, reject) => {
  transporter.sendMail(getContent(options), (err, res) => {
    transporter.close()
    !err ? resolve(res) : reject(err);
  });
})

module.exports = {
  sendMail
}