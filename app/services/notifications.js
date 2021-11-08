'use strict';
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const config = require('../../config');
const logger = require('../logger');
const { defaultError } = require('../errors');

exports.sendEmailRegister = async (name, lastName, email) => {
  try {
    const oAuth2Client = new google.auth.OAuth2(
      config.common.stmp.clientID,
      config.common.stmp.clientSecret,
      config.common.stmp.redirectURI
    );
    oAuth2Client.setCredentials({ refresh_token: config.common.stmp.refreshToken });
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAUTH2',
        user: config.common.stmp.user,
        clientId: config.common.stmp.clientID,
        clientSecret: config.common.stmp.clientSecret,
        refreshToken: config.common.stmp.refreshToken,
        accessToken
      }
    });
    const mailOptions = {
      from: `No reply <${config.common.stmp.user}`,
      to: email,
      subject: 'Weet - Registro Exitoso',
      html: `
        <table bgcolor='#0273E8' border='0' width="650" align='center' style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">
          <tr>
            <td>
                <table border='0' align='center' style="padding-left: 25px; padding-right: 25px">
                        <tr>
                            <h2 style="color: white; margin: 0px; text-align: center;">
                                ¡Welcome to Weet!
                            </h2>
                        </tr>
                </table>
            </td>
          </tr>
          <tr>
            <td>
              <table border='0' align='center' style="color: white; padding: 25px; padding-top: 0px">
                <tr>
                  <h3 style="color: white; margin: 0px; text-align: center;">
                    ${name} ${lastName}, your account was created correctly.
                  </h3>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `
    };
    await transporter.sendMail(mailOptions);
  } catch (err) {
    logger.error(err);
    throw defaultError(err);
  }
};
